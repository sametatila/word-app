import { sql } from "drizzle-orm";
import { db } from "@/lib/db";

/**
 * Veritabanı tabanlı hız sınırı.
 *
 * Bellek-içi sayaç burada yanlış olurdu: renk başına üç Node instance var ve
 * nginx istekleri dağıtıyor; üç ayrı sayaç, sınırı üçe katlardı. Tek atomik
 * upsert pencereyi de sayacı da aynı satırda tutar; yarış yok, kilit yok.
 *
 * Dönen `ok` sayım sınırı aşmadıysa true. Aşan istek de sayılır — bu kasıtlı:
 * sınırı zorlayan istemci pencereyi uzatmaz ama sayacı da sıfırlayamaz.
 */
export type RateResult = { ok: boolean; count: number; retryAfterSec: number };

export async function consume(key: string, limit: number, windowSec: number): Promise<RateResult> {
  const res = await db.execute(sql`
    insert into rate_limits (key, count, reset_at)
    values (${key}, 1, now() + make_interval(secs => ${windowSec}))
    on conflict (key) do update set
      count = case when rate_limits.reset_at <= now() then 1 else rate_limits.count + 1 end,
      reset_at = case when rate_limits.reset_at <= now() then now() + make_interval(secs => ${windowSec}) else rate_limits.reset_at end
    returning count, greatest(0, extract(epoch from (reset_at - now())))::int as retry
  `);
  const row = (res as unknown as { rows: { count: number; retry: number }[] }).rows?.[0];
  const count = Number(row?.count ?? 1);
  return { ok: count <= limit, count, retryAfterSec: Number(row?.retry ?? windowSec) };
}

/**
 * Tek seferlik iş kilidi: aynı anahtar için ilk çağıran true alır, pencere
 * boyunca diğerleri false. Cron'suz sunucuda "haftayı kapat" gibi işleri ilk
 * okuyan isteğin bir kez yapmasını sağlar.
 */
export async function claimOnce(key: string, windowSec: number): Promise<boolean> {
  const r = await consume(key, 1, windowSec);
  return r.count === 1;
}

const DAY = 86_400;
const MIN = 60;

/** Kapsam → (sınır, pencere). Sayılar docs/plan/social.md ile aynı. */
export const LIMITS = {
  friendRequest: { limit: 50, window: DAY },
  search: { limit: 30, window: MIN },
  reaction: { limit: 300, window: DAY },
  nudgeTotal: { limit: 20, window: DAY },
  nudgePerFriend: { limit: 1, window: DAY },
  questInvite: { limit: 5, window: DAY },
  report: { limit: 10, window: DAY },
  block: { limit: 50, window: DAY },
} as const;

export function limited(scope: keyof typeof LIMITS, userId: string, extra = ""): Promise<RateResult> {
  const { limit, window } = LIMITS[scope];
  return consume(`${scope}:${userId}${extra ? `:${extra}` : ""}`, limit, window);
}
