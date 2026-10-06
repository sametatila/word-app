import "server-only";
import { collectAlerts } from "@/lib/alerts";
import { alertLinks } from "@/lib/admin-links";
import { cached } from "@/lib/admin-query";
import { moderationData, openContentGroups, reporterRecords, type ReporterRecord } from "@/lib/moderation-admin";
import { storeReviews } from "@/lib/store-reviews";
import { slaState, type QueueId } from "@/lib/response-sla";
import { QUEUE_ALERT_FAMILIES, rankOf, sortInbox, type Inbox, type InboxClaude, type InboxItem } from "@/lib/admin-inbox-shared";
import { openClaudeTasks, taskKey, type ClaudeTask } from "@/lib/claude-tasks";

export type { Inbox, InboxItem } from "@/lib/admin-inbox-shared";

/**
 * GELEN İŞLER — panelin açılış kuyruğu (tipler ve sıra `admin-inbox-shared`).
 *
 * Kaynaklar sayfalarıyla aynı: şikâyetler `moderationData` (Moderasyon),
 * içerik grupları `openContentGroups` (İçerik geri bildirimi), yorumlar
 * `storeReviews` (Mağaza), uyarılar `collectAlerts` (Telegram). Şikâyet ve
 * içerik ÖNBELLEKSİZ: bir karar verildikten sonra yenilenen kuyrukta o iş
 * kalmamalı. Uyarılar ve mağaza yorumları kendi önbelleklerinden (60 sn /
 * mağaza API'si): ikisi de dış kaynak ve karar paneldeki bir düğmeyle değil,
 * koşul düzelince ya da konsolda cevap verilince kapanıyor.
 */

/** Süre alanları; tarih okunamazsa iş kuyruğa girmez (`slaState` null). */
function sla(queue: QueueId, created: string, now: number) {
  const s = slaState(queue, created, now);
  return s ? { created, due: s.due, rank: rankOf({ kind: "queue", level: s.level }) } : null;
}

export async function loadInbox(): Promise<Inbox> {
  const now = Date.now();
  const errors: string[] = [];
  const [mod, groups, reviews, alerts, claude] = await Promise.all([
    moderationData().catch((err) => {
      errors.push(`Şikâyetler okunamadı: ${(err as Error).message?.slice(0, 120)}`);
      return null;
    }),
    openContentGroups().catch((err) => {
      errors.push(`İçerik geri bildirimi okunamadı: ${(err as Error).message?.slice(0, 120)}`);
      return [];
    }),
    storeReviews().catch((err) => {
      errors.push(`Mağaza yorumları okunamadı: ${(err as Error).message?.slice(0, 120)}`);
      return null;
    }),
    cached("admin:alerts", 60_000, false, () => collectAlerts()).catch((err) => {
      errors.push(`Uyarılar okunamadı: ${(err as Error).message?.slice(0, 120)}`);
      return null;
    }),
    openClaudeTasks().catch((err) => {
      errors.push(`Claude'a bırakılan işler okunamadı: ${(err as Error).message?.slice(0, 120)}`);
      return new Map<string, ClaudeTask>();
    }),
  ]);
  const claudeOf = (queue: string, ref: string | number): InboxClaude | null => {
    const t = claude.get(taskKey(queue, String(ref)));
    return t && (t.status === "waiting" || t.status === "done") ? { status: t.status, note: t.note, result: t.result, at: t.createdAt, doneAt: t.doneAt } : null;
  };
  /* "Claude bitirdi" işi en üste: kontrol edip kapatmak Samet'in sırası. Bekleyen iş
     yanıt süresine göre sırasında kalıyor (süre işliyor). */
  const boost = (c: InboxClaude | null, rank: number) => (c?.status === "done" ? -1 : rank);

  const items: InboxItem[] = [];
  for (const r of mod?.userReports ?? []) {
    const t = sla("user_report", r.at, now);
    if (t) { const c = claudeOf("user_report", r.id); items.push({ kind: "user_report", queue: "user_report", report: r, id: `user_report:${r.id}`, cat: "sikayet", ...t, rank: boost(c, t.rank), claude: c }); }
  }
  for (const r of mod?.contentReports ?? []) {
    const t = sla("ai_report", r.at, now);
    if (t) { const c = claudeOf("ai_report", r.id); items.push({ kind: "ai_report", queue: "ai_report", report: r, id: `ai_report:${r.id}`, cat: "sikayet", ...t, rank: boost(c, t.rank), claude: c }); }
  }
  for (const g of groups) {
    const t = sla("content_feedback", g.first, now);
    if (t) { const c = claudeOf("content_feedback", g.key); items.push({ kind: "content", queue: "content_feedback", group: g, id: `content:${g.key}`, cat: "icerik", ...t, rank: boost(c, t.rank), claude: c }); }
  }
  for (const res of reviews?.results ?? []) {
    if (res.configured && res.error) errors.push(`${res.store === "ios" ? "App Store" : "Google Play"} yorumları okunamadı: ${res.error}`);
    for (const rv of res.reviews) {
      if (!(rv.rating > 0 && rv.rating <= 2) || rv.answered || !rv.at) continue;
      const t = sla("store_review", rv.at, now);
      if (t) items.push({ kind: "review", queue: "store_review", review: rv, id: `review:${rv.store}:${rv.id}`, cat: "yorum", ...t });
    }
  }
  for (const a of alerts?.value ?? []) {
    if (QUEUE_ALERT_FAMILIES.has(a.key.split(":")[0])) continue;
    items.push({ kind: "alert", id: `alert:${a.key}`, cat: "sistem", level: a.level, text: a.text, links: alertLinks(a.key), rank: rankOf({ kind: "alert", level: a.level }), due: null, created: null });
  }

  const ids = [
    ...(mod?.userReports ?? []).map((r) => r.reporter.id),
    ...(mod?.contentReports ?? []).map((r) => r.reporter.id),
    ...groups.flatMap((g) => g.reporterIds),
  ];
  const reporters = await reporterRecords(ids).catch((err) => {
    errors.push(`Bildirenlerin geçmişi okunamadı: ${(err as Error).message?.slice(0, 120)}`);
    return {} as Record<string, ReporterRecord>;
  });

  return { items: sortInbox(items), ready: mod?.ready ?? false, now, errors, reporters };
}
