import "server-only";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { hasActionsTable } from "@/lib/moderation-admin";
import { storeReviews } from "@/lib/store-reviews";
import { RESPONSE_SLA, SLA_SOON, slaState, type QueueId, type QueueSummary } from "@/lib/response-sla";

export type { QueueSummary };

/**
 * GERİ DÖNÜŞ BEKLEYENLER — kuyruk başına açık iş, süresi yaklaşan, süresi geçen
 * ve en eski iş. Ana paneldeki kart ve uyarı motoru (`lib/alerts`) aynı özeti
 * okuyor; süre tanımları `lib/response-sla`.
 *
 * İçerik geri bildirimi GRUP düzeyinde sayılıyor: aynı soruyu beş kişinin
 * bildirmesi tek iş, süresi grubun en eski açık bildiriminden başlıyor.
 * Mağaza yorumu yalnız cevapsız 1-2★ (Play API son 7 günün metinli yorumlarını
 * veriyor; daha eskisi burada görünmez, konsolda görünür).
 */

type Row = Record<string, unknown>;
async function rows(q: ReturnType<typeof sql>): Promise<Row[]> {
  const r = (await db.execute(q)) as unknown;
  if (Array.isArray(r)) return r as Row[];
  return ((r as { rows?: Row[] }).rows ?? []) as Row[];
}
const num = (v: unknown) => Number(v) || 0;
const iso = (v: unknown) => (v instanceof Date ? v.toISOString() : v ? new Date(String(v)).toISOString() : null);

/** Saat tabanlı kuyruk: eşikler SQL'de (`hours` × SLA_SOON ve `hours`). */
function hourCuts(queue: QueueId) {
  const h = RESPONSE_SLA[queue].hours ?? 48;
  return { soon: `${Math.round(h * SLA_SOON * 60)} minutes`, late: `${h} hours` };
}

async function sqlQueue(queue: QueueId, from: ReturnType<typeof sql>): Promise<QueueSummary> {
  const c = hourCuts(queue);
  try {
    const [r] = await rows(sql`
      with q as (${from})
      select count(*)::int open,
        count(*) filter (where at < now() - ${c.soon}::interval and at >= now() - ${c.late}::interval)::int soon,
        count(*) filter (where at < now() - ${c.late}::interval)::int late,
        min(at) oldest
      from q`);
    return { queue, open: num(r?.open), soon: num(r?.soon), late: num(r?.late), oldest: iso(r?.oldest) };
  } catch (err) {
    return { queue, open: 0, soon: 0, late: 0, oldest: null, error: (err as Error).message?.slice(0, 120) ?? "sorgu başarısız" };
  }
}

export async function responseQueues(fresh = false): Promise<QueueSummary[]> {
  const ready = await hasActionsTable().catch(() => false);
  const [users, ai, content, reviews] = await Promise.all([
    sqlQueue(
      "user_report",
      ready
        ? sql`select r.created_at at from user_reports r where not exists (select 1 from moderation_actions m where m.target = 'user_report' and m.ref_id = r.id)`
        : sql`select r.created_at at from user_reports r`,
    ),
    sqlQueue("ai_report", sql`select created_at at from content_reports where status = 'open' and kind <> 'content'`),
    sqlQueue(
      "content_feedback",
      sql`select min(created_at) at from content_reports r where status = 'open' and kind = 'content'
          group by coalesce(r.group_key, 'legacy:' || r.kind || ':' || r.ref)`,
    ),
    reviewQueue(fresh),
  ]);
  return [users, ai, content, reviews];
}

async function reviewQueue(fresh: boolean): Promise<QueueSummary> {
  const out: QueueSummary = { queue: "store_review", open: 0, soon: 0, late: 0, oldest: null };
  try {
    const { results } = await storeReviews(fresh);
    const errors = results.filter((r) => r.configured && r.error).map((r) => r.error);
    if (errors.length) out.error = errors.join(" · ").slice(0, 120);
    for (const r of results) {
      for (const rv of r.reviews) {
        if (!(rv.rating > 0 && rv.rating <= 2) || rv.answered || !rv.at) continue;
        const s = slaState("store_review", rv.at);
        if (!s) continue;
        out.open++;
        if (s.level === "late") out.late++;
        else if (s.level === "soon") out.soon++;
        if (!out.oldest || Date.parse(rv.at) < Date.parse(out.oldest)) out.oldest = new Date(Date.parse(rv.at)).toISOString();
      }
    }
  } catch (err) {
    out.error = (err as Error).message?.slice(0, 120) ?? "okunamadı";
  }
  return out;
}
