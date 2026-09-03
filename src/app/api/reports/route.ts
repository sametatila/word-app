import { NextResponse } from "next/server";
import { and, eq, gte, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { db } from "@/lib/db";
import { contentReports } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

/**
 * İçerik bildirimi — Play "Yapay zekâ ile üretilen içerik" politikası: kullanıcı
 * uygulamadan çıkmadan rahatsız edici bir yapay zekâ yanıtını bildirebilmeli.
 *
 *   POST { kind, ref, reason, content }
 *     kind    "roleplay" | "assessment"   (ileride "user" — lider tablosu adı)
 *     ref     roleplay: "<lessonId>:<turn>" · assessment: kayıt kimliği
 *     reason  "inappropriate" | "offensive" | "wrong" | "impersonation" | "other"
 *     content bildirilen metin (≤ 4000 karakter) — roleplay_logs 30 günde silindiği
 *             için metin burada da saklanır; inceleme kaydın süresine bağlı kalmaz.
 *
 * Yaptırım otomatik değil: kayıt yönetim panosunda (exfe.me/admin › Loglar) insan
 * okur. Günde kullanıcı başına 20 bildirim (kötüye kullanım sınırı).
 */
const KINDS = new Set(["roleplay", "assessment", "user"]);
const REASONS = new Set(["inappropriate", "offensive", "wrong", "impersonation", "other"]);
const DAILY_LIMIT = 20;
const MAX_CONTENT = 4000;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: { kind?: unknown; ref?: unknown; reason?: unknown; content?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const kind = typeof body.kind === "string" && KINDS.has(body.kind) ? body.kind : null;
  const reason = typeof body.reason === "string" && REASONS.has(body.reason) ? body.reason : null;
  const ref = typeof body.ref === "string" ? body.ref.trim().slice(0, 120) : "";
  const content = typeof body.content === "string" ? body.content.trim().slice(0, MAX_CONTENT) : "";
  if (!kind || !reason || !ref) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
    const [row] = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(contentReports)
      .where(and(eq(contentReports.userId, userId), gte(contentReports.createdAt, sql`now() - interval '1 day'`)));
    if ((row?.n ?? 0) >= DAILY_LIMIT) return NextResponse.json({ error: "quota" }, { status: 429 });

    await db.insert(contentReports).values({ userId, kind, ref, reason, content: content || null });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reports]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
