import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { usageCounters } from "@/lib/db/schema";

/**
 * Kota sayaçları — ücretsiz katmanın sınırları ve premium'un adil kullanım tavanı.
 *
 * SAYAÇ SUNUCUDA. İstemciye sorulmuyor, istemciden gelen bir sayı da kabul
 * edilmiyor: kota bir FATURA kapısı (Azure STT, Mistral) ve istemcinin
 * söylediği sayıya dayanan bir kapı, kapı değildir.
 *
 * GÜN SINIRI UTC. Kullanıcının yerel günü değil — yoksa cihaz saat dilimini
 * değiştiren biri günlük kotayı istediği kadar sıfırlar. Türkiye'de sıfırlama
 * saat 03:00'e denk geliyor, yani neredeyse hiç kimsenin oturumunun ortasına
 * gelmiyor. Haftalık sayaç ISO haftası (pazartesi başlangıç).
 */

export type Period = "day" | "week" | "all";

/** ISO hafta numarası — "2026-W37". Pazartesi başlar, yılın ilk perşembesi 1. haftadadır. */
function isoWeek(d: Date): string {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  // Perşembeye kaydır: ISO haftası hangi yıla ait, o günden anlaşılıyor.
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function periodKey(period: Period, now: Date = new Date()): string {
  if (period === "all") return "all";
  if (period === "week") return isoWeek(now);
  return now.toISOString().slice(0, 10);
}

export type QuotaCheck = {
  allowed: boolean;
  used: number;
  limit: number;
  remaining: number;
  /** Sınır ne zaman yenileniyor — arayüz "yarın yeniden" diyebilsin. */
  period: Period;
};

/** Sayacı okur (yazmaz). */
export async function getUsage(userId: string, key: string, period: Period, now?: Date): Promise<number> {
  try {
    const [row] = await db
      .select({ count: usageCounters.count })
      .from(usageCounters)
      .where(
        and(
          eq(usageCounters.userId, userId),
          eq(usageCounters.key, key),
          eq(usageCounters.period, periodKey(period, now)),
        ),
      )
      .limit(1);
    return row?.count ?? 0;
  } catch {
    // Sayaç okunamadı: 0 sayılıyor, yani kapı AÇIK kalıyor. Ters tarafa düşmek
    // (okunamadı diye kapatmak) geçici bir veritabanı hıçkırığında ödeme yapmış
    // kullanıcıyı ürününden eder; buradaki risk ise birkaç fazladan çağrı.
    return 0;
  }
}

/** Kotayı kontrol eder — SAYMAZ. Kullanım gerçekleştiğinde ayrıca `bumpUsage` çağrılır. */
export async function checkQuota(
  userId: string,
  key: string,
  period: Period,
  limit: number,
  now?: Date,
): Promise<QuotaCheck> {
  const used = await getUsage(userId, key, period, now);
  const remaining = Math.max(0, limit - used);
  return { allowed: used < limit, used, limit, remaining, period };
}

/**
 * Sayacı artırır ve yeni değeri döndürür.
 *
 * Kullanım GERÇEKLEŞTİKTEN sonra çağrılır, kontrol anında değil: kontrolde
 * artırmak, kullanıcı vazgeçtiğinde ya da istek hata verdiğinde hakkını yakardı.
 */
export async function bumpUsage(userId: string, key: string, period: Period, by = 1, now?: Date): Promise<number> {
  const p = periodKey(period, now);
  try {
    const [row] = await db
      .insert(usageCounters)
      .values({ userId, key, period: p, count: by })
      .onConflictDoUpdate({
        target: [usageCounters.userId, usageCounters.key, usageCounters.period],
        set: { count: sql`${usageCounters.count} + ${by}`, updatedAt: new Date() },
      })
      .returning({ count: usageCounters.count });
    return row?.count ?? by;
  } catch {
    return by;
  }
}

/** Ömürlük kotalarda seviyeye bağlı anahtar: "speaking_lesson:A1". */
export const levelKey = (base: string, level: string): string => `${base}:${level}`;
