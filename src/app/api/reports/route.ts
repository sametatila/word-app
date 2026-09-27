import { NextResponse } from "next/server";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { and, eq, gte, sql } from "drizzle-orm";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { db } from "@/lib/db";
import { contentReports } from "@/lib/db/schema";
import { reportUser } from "@/lib/social/blocks";
import { limited } from "@/lib/social/ratelimit";
import type { ReportReason } from "@/lib/social/types";

export const dynamic = "force-dynamic";

/**
 * İçerik bildirimi — Play "Yapay zekâ ile üretilen içerik" politikası: kullanıcı
 * uygulamadan çıkmadan rahatsız edici bir yapay zekâ yanıtını bildirebilmeli.
 *
 *   POST { kind, ref, reason, content }
 *     kind    "chat" | "assessment" | "user" (lider tablosu adı)
 *     ref     chat: "<conversationId>:<turn>" · puanlı kısım "<conversationId>:scored:<turn>"
 *             assessment: kayıt kimliği ("Yazdıklarım") · anlık sonuç "<yüzey>:<kimlik>"
 *             ("writing:…", "speaking:…", "exam:…", "word:…"; web ve mobil aynı)
 *     reason  "inappropriate" | "offensive" | "wrong" | "impersonation" | "other"
 *     content bildirilen metin (≤ 4000 karakter) — chat_logs 30 günde silindiği
 *             için metin burada da saklanır; inceleme kaydın süresine bağlı kalmaz.
 *
 * Yaptırım otomatik değil: kayıt yönetim panosunda (lernomi.app/admin › Loglar) insan
 * okur. Günde kullanıcı başına 20 bildirim (kötüye kullanım sınırı).
 */
/* "user" yalnız eski sürümler için: aşağıda `user_reports`a yönleniyor. */
const KINDS = new Set(["chat", "assessment", "user"]);
const REASONS = new Set(["inappropriate", "offensive", "wrong", "impersonation", "other"]);
const DAILY_LIMIT = DAILY_QUOTAS.reports;
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

  /* KULLANICI ŞİKÂYETİ TEK KUYRUKTA (`user_reports`). Lig tablosunun bildirimi
     buraya, profilinki `/api/social/reports`a gidiyordu: iki tablo, iki sebep
     listesi, panelin kullanıcı sayfası yalnız birini sayıyordu. Yeni istemciler
     doğrudan sosyal uca gidiyor; bu dal eski uygulama sürümleri için. */
  if (kind === "user") {
    if (ref === userId) return NextResponse.json({ error: "bad_request" }, { status: 400 });
    const rl = await limited("report", userId);
    if (!rl.ok) return NextResponse.json({ error: "quota" }, { status: 429 });
    const eski: Record<string, ReportReason> = { inappropriate: "inappropriate", offensive: "abuse", impersonation: "impersonation", wrong: "other", other: "other" };
    try {
      await reportUser(userId, ref.slice(0, 64), eski[reason] ?? "other", content ? content.slice(0, 500) : null);
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[reports]", err);
      return NextResponse.json({ error: "database" }, { status: 500 });
    }
  }

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
