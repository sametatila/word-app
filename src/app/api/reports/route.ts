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
import { derivePackItem, parseReportBody } from "@/lib/content-feedback";
import { APP_VERSION } from "@/lib/version";

export const dynamic = "force-dynamic";

/**
 * İçerik bildirimi — Play "Yapay zekâ ile üretilen içerik" politikası: kullanıcı
 * uygulamadan çıkmadan rahatsız edici bir yapay zekâ yanıtını bildirebilmeli.
 * 2026-09-28'den beri öğrenme içeriği de (her ekrandaki "Bildir"); sözleşme
 * `docs/plan/content-feedback.md`, doğrulama `lib/content-feedback`.
 *
 *   POST { kind, ref, reason, content, surface?, target?, detail?, context? }
 *     kind    "chat" | "assessment" | "content" | "user" (eski lider tablosu adı)
 *     ref     chat: "<conversationId>:<turn>" · puanlı kısım "<conversationId>:scored:<turn>"
 *             assessment: kayıt kimliği ("Yazdıklarım") · anlık sonuç "<yüzey>:<kimlik>"
 *             content: `${target.type}:${target.id}`(+`:${target.sub}`); yoksa sunucu kuruyor
 *     reason  yapay zekâ: "inappropriate" | "offensive" | "wrong" | "impersonation" | "other"
 *             content: "wrong_answer" | "typo" | "translation" | "audio" | "unclear" | "technical" | "inappropriate" | "other"
 *     content ekranda görünenin anlık görüntüsü (≤ 4000 karakter) — chat_logs 30 günde
 *             silindiği için metin burada da saklanır; inceleme kaydın süresine bağlı kalmaz.
 *     target  { type, id, sub?, game? } — content için zorunlu; `pack/item` ondan türetiliyor.
 *     detail  kullanıcının açıklaması (≤ 500), düz metin; süzgeçten geçmiyor.
 *     context { platform, appVersion, course, nativeLang, contentVersion }
 *
 * Aynı kullanıcı aynı hedefi (grup anahtarı; eski gövdede kind+ref) 24 saat içinde
 * ikinci kez bildirirse satır açılmaz: `{ ok: true, duplicate: true }`.
 *
 * Yaptırım otomatik değil: kayıt yönetim panosunda (lernomi.app/admin/moderation)
 * insan okur. Günde kullanıcı başına `DAILY_QUOTAS.reports` bildirim (kötüye
 * kullanım sınırı). Misafir de bildirebilir.
 */
const DAILY_LIMIT = DAILY_QUOTAS.reports;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const parsed = parseReportBody(body);
  if (!parsed.ok) return NextResponse.json({ error: "bad_request", field: parsed.error }, { status: 400 });
  const r = parsed.value;
  const { kind, reason, ref, content } = r;

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

  const derived = r.targetType && r.targetId ? derivePackItem(r.targetType, r.targetId, r.course) : null;
  /* Tekrar denetimi: yeni gövdede grup anahtarı, eski gövdede tür + ref. */
  const same = r.groupKey ? eq(contentReports.groupKey, r.groupKey) : and(eq(contentReports.kind, kind), eq(contentReports.ref, ref));

  try {
    const out = await db.transaction(async (tx) => {
      /* Aynı kişi + aynı hedef için eşzamanlı iki istek (çift dokunuş) iki satır
         açmasın: işlem sonuna kadar süren danışma kilidi. */
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${`report:${userId}:${r.groupKey ?? `${kind}:${ref}`}`}))`);
      const dup = await tx
        .select({ id: contentReports.id })
        .from(contentReports)
        .where(and(eq(contentReports.userId, userId), same, gte(contentReports.createdAt, sql`now() - interval '1 day'`)))
        .limit(1);
      if (dup.length) return "duplicate" as const;

      const [row] = await tx
        .select({ n: sql<number>`count(*)::int` })
        .from(contentReports)
        .where(and(eq(contentReports.userId, userId), gte(contentReports.createdAt, sql`now() - interval '1 day'`)));
      if ((row?.n ?? 0) >= DAILY_LIMIT) return "quota" as const;

      await tx.insert(contentReports).values({
        userId,
        kind,
        ref,
        reason,
        content,
        surface: r.surface,
        targetType: r.targetType,
        targetId: r.targetId,
        targetSub: r.targetSub,
        game: r.game,
        pack: derived?.pack ?? null,
        item: derived?.item ?? null,
        detail: r.detail,
        platform: r.platform,
        /* Web sürümü istemciden gelmiyor (package.json tarayıcı paketine girmesin):
           web bildirimi sunucunun kendi sürümüyle yazılıyor. */
        appVersion: r.appVersion ?? (r.platform === "web" ? APP_VERSION : null),
        course: r.course,
        nativeLang: r.nativeLang,
        contentVersion: r.contentVersion,
        groupKey: r.groupKey,
      });
      return "ok" as const;
    });
    if (out === "quota") return NextResponse.json({ error: "quota" }, { status: 429 });
    if (out === "duplicate") return NextResponse.json({ ok: true, duplicate: true });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[reports]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
