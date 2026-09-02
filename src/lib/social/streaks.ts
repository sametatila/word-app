import { and, gt, gte, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats } from "@/lib/db/schema";
import { shiftDay } from "./dates";

/**
 * Arkadaş serisi: ikisinin de çalıştığı ardışık gün sayısı.
 *
 * Saklanmıyor, türetiliyor — iki kişinin günlük istatistiği zaten duruyor ve
 * "kim ne zaman çalıştı" tek doğruluk kaynağı o. Ayrı bir sayaç, iki
 * kullanıcının farklı saat dilimlerinde aynı günü farklı zamanlarda
 * kapatmasıyla er geç yanlış sayardı. Bugün ya da dün biten zincir sayılır:
 * bugün henüz oynamamış olmak seriyi bozmaz, akşam oynayınca devam eder.
 *
 * Bir yıllık pencere yeter; daha uzun seri "365+" olarak gösterilir.
 */
const WINDOW_DAYS = 365;

export async function friendStreaks(me: string, friendIds: string[], today: string): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  if (!friendIds.length) return out;
  const since = shiftDay(today, -WINDOW_DAYS);
  const rows = await db
    .select({ userId: dailyStats.userId, day: dailyStats.day })
    .from(dailyStats)
    .where(and(inArray(dailyStats.userId, [me, ...friendIds]), gte(dailyStats.day, since), gt(dailyStats.xp, 0)));
  const days = new Map<string, Set<string>>();
  for (const r of rows) {
    const s = days.get(r.userId) ?? new Set<string>();
    s.add(String(r.day));
    days.set(r.userId, s);
  }
  const mine = days.get(me) ?? new Set<string>();
  for (const f of friendIds) {
    const theirs = days.get(f) ?? new Set<string>();
    let day = today;
    // Bugün ikisinden biri henüz oynamadıysa zincir dünden sayılır.
    if (!(mine.has(day) && theirs.has(day))) day = shiftDay(today, -1);
    let n = 0;
    while (n < WINDOW_DAYS && mine.has(day) && theirs.has(day)) {
      n++;
      day = shiftDay(day, -1);
    }
    out.set(f, n);
  }
  return out;
}
