import { and, gt, gte, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats } from "@/lib/db/schema";
import { emitActivity } from "./activity";
import { shiftDay } from "./dates";
import { claimOnce } from "./ratelimit";
import { friendIds, publicUsers } from "./stats";
import { FRIEND_STREAK_MILESTONES } from "./types";

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
 *
 * Sayının yanında iki bayrak daha dönüyor: bugün İKİSİ de çalıştı mı
 * (`bothToday`) ve arkadaş bugün çalıştı mı (`friendToday`). İkisi de zaten
 * elde olan veriden okunuyor ve arayüzün asıl işine yarıyor — "ortak seri
 * bugün kırılıyor" uyarısı ve dürtmenin hangi türde gideceği (çalışmadıysa
 * hatırlatma, çalıştıysa alkış).
 */
const WINDOW_DAYS = 365;

export type FriendStreak = { days: number; bothToday: boolean; friendToday: boolean };

export async function friendStreaks(me: string, friendIds: string[], today: string): Promise<Map<string, FriendStreak>> {
  const out = new Map<string, FriendStreak>();
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
    const bothToday = mine.has(today) && theirs.has(today);
    let day = today;
    // Bugün ikisinden biri henüz oynamadıysa zincir dünden sayılır.
    if (!bothToday) day = shiftDay(today, -1);
    let n = 0;
    while (n < WINDOW_DAYS && mine.has(day) && theirs.has(day)) {
      n++;
      day = shiftDay(day, -1);
    }
    out.set(f, { days: n, bothToday, friendToday: theirs.has(today) });
  }
  return out;
}

/**
 * Ortak seri kilometre taşlarını akışa düşürür.
 *
 * Bu olay türü (`friend_streak`) tasarlanmış, üç dilde metni yazılmış ve
 * dağıtım listesine konmuştu ama HİÇBİR YERDEN yayınlanmıyordu: uygulamanın
 * en güçlü sosyal sinyali, arkadaş listesindeki küçük bir rozetten ibaret
 * kalmıştı. Burası o eksik ucu bağlıyor.
 *
 * Günde bir kez çağrılıyor (kullanıcının kendi serisi ilerlediğinde) ve yalnız
 * eşiğe TAM oturan zincirler kutlanıyor. Aynı çift aynı eşiği ikinci kez
 * kutlamasın diye kilit `claimOnce`ta: iki arkadaş aynı gün oynadığında ikisi
 * de bu yoldan geçer, olay bir kez yazılır.
 */
export async function celebrateFriendStreaks(userId: string, today: string): Promise<void> {
  const friends = await friendIds(userId);
  if (!friends.length) return;
  const streaks = await friendStreaks(userId, friends, today);
  for (const [friendId, co] of streaks) {
    if (!co.bothToday) continue; // zincir bugün ilerlemedi
    if (!(FRIEND_STREAK_MILESTONES as readonly number[]).includes(co.days)) continue;
    const pair = [userId, friendId].sort().join(":");
    if (!(await claimOnce(`fstreak:${pair}:${co.days}`, 400 * 86_400))) continue;
    const users = await publicUsers([userId, friendId]);
    for (const [self, other] of [[userId, friendId], [friendId, userId]] as const) {
      const o = users.get(other);
      await emitActivity(self, "friend_streak", { friendId: other, friendName: o?.name ?? null, days: co.days });
    }
  }
}
