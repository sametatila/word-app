import "server-only";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles } from "@/lib/db/schema";
import { onActivityAwarded } from "@/lib/social/hooks";
import { ANSWERS_DAILY_XP_CAP, cappedDailyXp } from "@/lib/xp";

/**
 * Bir çalışmanın hesaba işlenmesi: XP, günlük istatistik ve seri.
 *
 * Bu üçü daha önce her özellik tarafından ayrı ayrı yazılıyordu ve sonuç
 * tutarsızdı: kelime oyunları üçünü de güncelliyor, beceriler XP ve seriyi
 * güncelliyor, **konuşmalar hiçbirini güncellemiyordu**. Konuşma çalışan bir öğrenci
 * o gün hiç uğramamış sayılıyordu — puanı artmıyor, günlük ısı haritasında
 * görünmüyor ve en kötüsü, o gün çalışmış olmasına rağmen serisi kırılıyordu.
 *
 * Tek geçit olması, yeni bir öğrenme yolu eklendiğinde üç şeyi birden
 * hatırlamak zorunda kalmamak demek.
 */

/** Onarım ayda bir: her kaçırılan günü affeden bir seri, seri olmaktan çıkar. */
const STREAK_REPAIR_COOLDOWN_DAYS = 30;

export function shiftDay(day: string, delta: number) {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

/**
 * İstemciden gelen günü sunucu-bugününün ±1 gününe sıkıştırır.
 *
 * `day` istemci belirliyor (saat dilimi + çevrimdışı senkron için gerekli), ama
 * yalnız biçimi (`YYYY-MM-DD`) doğrulanınca 2020/2099 tarihli aktivite kabul
 * ediliyordu: ileriye yazım seriyi (`nextStreak`), gün-bazlı rozetleri ve
 * geçmiş hafta sıralamasını şişirebilir. Meşru aralık dar — gece yarısında
 * yerel gün UTC'nin +1'i, geç ulaşan/çevrimdışı istek -1 olabilir; bu pencere
 * dışı bir "gün" gerçek aktivite değildir. Aralık dışı ya da bozuk → bugün.
 */
export function clampDay(raw: unknown, serverToday = new Date().toISOString().slice(0, 10)): string {
  if (typeof raw !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(raw)) return serverToday;
  if (raw < shiftDay(serverToday, -1) || raw > shiftDay(serverToday, 1)) return serverToday;
  return raw;
}

export type StreakInput = {
  lastActiveDay: string | null;
  currentStreak: number;
  longestStreak: number;
  streakRepairAt: string | null;
};

export type StreakOutcome = {
  currentStreak: number;
  longestStreak: number;
  /** Bir gün kaçırılmıştı ve seri sıfırlanmak yerine kaldığı yerden sürdü. */
  repaired: boolean;
};

/**
 * Seri onarılabilir mi?
 *
 * Üç koşul: ortada korunmaya değer bir seri olmalı, kaçırılan gün TEK bir gün
 * olmalı ve hak bu ay kullanılmamış olmalı. İki gün ve fazlası onarılmıyor —
 * o artık bir aksama değil, bırakmış olmak; oradan dönen kişiye yeni bir
 * başlangıç dürüst olan.
 */
function canRepair(profile: StreakInput, today: string): boolean {
  if (profile.currentStreak < 2) return false;
  if (profile.lastActiveDay !== shiftDay(today, -2)) return false;
  if (!profile.streakRepairAt) return true;
  return profile.streakRepairAt <= shiftDay(today, -STREAK_REPAIR_COOLDOWN_DAYS);
}

/** Bugünkü çalışmadan sonra serinin ne olacağı. Saf fonksiyon. */
export function nextStreak(profile: StreakInput, today: string): StreakOutcome {
  if (profile.lastActiveDay === today) {
    return {
      currentStreak: profile.currentStreak,
      longestStreak: profile.longestStreak,
      repaired: false,
    };
  }

  /*
    Gün GERİ gidiyorsa seri DOKUNULMUYOR.

    Uçların bir kısmı günü kullanıcının yerel gününden (`localDay`), bir kısmı
    sunucunun UTC gününden türetiyordu; gece çalışan bir kullanıcıda (UTC+3,
    yerel gün ilerlemiş ama UTC hâlâ dün) bu iki değer FARKLI oluyor ve
    `lastActiveDay` bir ileri bir geri zıplıyordu. Geri giden gün ya bu gürültü
    ya da geç ulaşan bir istek — ikisi de gerçek bir "yeni gün" değil, dolayısıyla
    seriyi ne artırır ne de sıfırlar. Ölçüldü: Samet 10 gün kesintisiz çalıştığı
    hâlde serisi 2'ye düşmüştü, longest 10 kalmıştı.
  */
  if (profile.lastActiveDay && today < profile.lastActiveDay) {
    return {
      currentStreak: profile.currentStreak,
      longestStreak: profile.longestStreak,
      repaired: false,
    };
  }

  let currentStreak: number;
  let repaired = false;
  if (profile.lastActiveDay === shiftDay(today, -1)) {
    currentStreak = profile.currentStreak + 1;
  } else if (canRepair(profile, today)) {
    // Kaçırılan gün seriye EKLENMİYOR — affedilen şey kopukluk, çalışılmayan
    // gün değil.
    currentStreak = profile.currentStreak + 1;
    repaired = true;
  } else {
    currentStreak = 1;
  }

  return {
    currentStreak,
    longestStreak: Math.max(profile.longestStreak, currentStreak),
    repaired,
  };
}

export type AwardResult = StreakOutcome & {
  xpGained: number;
  totalXp: number;
};

/**
 * Kelime oyunları DIŞINDAKİ öğrenme yollarının kaydı: beceriler, konuşmalar.
 *
 * Kelime oyunları bu geçidi kullanmıyor çünkü aynı işlemde SRS güncellemesi,
 * pekişen kelime sayımı ve tekrar kuyruğu hesabı da yapılıyor; oradaki yazım
 * `submitAnswers` içinde kalıyor ama seri hesabı için aynı `nextStreak`
 * fonksiyonunu çağırıyor.
 *
 * `reviews` sayacı bilerek artırılmıyor: günlük hedef ("20 tekrar") kelime
 * tekrarını ölçüyor ve bir okuma alıştırmasını tekrar saymak o hedefi
 * anlamsızlaştırırdı. XP, süre ve seri ise gerçek çalışmadır ve sayılır.
 */
export async function awardActivity(
  userId: string,
  today: string,
  xpGained: number,
  seconds: number,
): Promise<AwardResult> {
  const asked = Math.max(0, Math.round(xpGained));
  const secs = Math.max(0, Math.min(7200, Math.round(seconds)));

  /*
   * TEK İŞLEM, PROFİL SATIRI KİLİTLİ (güvenlik denetimi 2026-10-03, D1).
   *
   * Eskiden profil okunup `totalXp: profile.totalXp + xp` yazılıyordu: paralel
   * iki kayıt birbirinin XP'sini eziyordu ve günlük satıra tavan yoktu. Şimdi
   * aynı kullanıcının kayıtları sırayla işleniyor; günlük XP, kelime oyunlarının
   * tavanıyla aynı satırda sınırlanıyor (`ANSWERS_DAILY_XP_CAP`, lig bu satırdan
   * sıralanıyor) ve toplama yalnız günlük satıra gerçekten giren XP ekleniyor.
   */
  const out = await db.transaction(async (tx) => {
    const [profile] = await tx.select().from(profiles).where(eq(profiles.userId, userId)).for("update").limit(1);
    if (!profile) throw new Error(`profil bulunamadı: ${userId}`);

    const [prior] = await tx
      .select({ xp: dailyStats.xp })
      .from(dailyStats)
      .where(and(eq(dailyStats.userId, userId), eq(dailyStats.day, today)))
      .limit(1);
    const xp = cappedDailyXp(prior?.xp ?? 0, asked);

    await tx
      .insert(dailyStats)
      .values({ userId, day: today, xp, seconds: secs })
      .onConflictDoUpdate({
        target: [dailyStats.userId, dailyStats.day],
        set: {
          xp: sql`LEAST(${dailyStats.xp} + ${xp}, ${ANSWERS_DAILY_XP_CAP})`,
          seconds: sql`${dailyStats.seconds} + ${secs}`,
        },
      });

    const streak = nextStreak(profile, today);

    // `lastActiveDay` yalnızca İLERİ gider: geri giden bir gün (saat dilimi
    // gürültüsü, geç istek) kaydı geriletip ertesi günü "kaçırılmış" göstermesin.
    const lastActiveDay = profile.lastActiveDay && today < profile.lastActiveDay ? profile.lastActiveDay : today;

    const [updated] = await tx
      .update(profiles)
      .set({
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastActiveDay,
        totalXp: sql`${profiles.totalXp} + ${xp}`,
        ...(streak.repaired ? { streakRepairAt: today } : {}),
      })
      .where(eq(profiles.userId, userId))
      .returning({ totalXp: profiles.totalXp });
    return { streak, xp, previousStreak: profile.currentStreak, totalXp: updated?.totalXp ?? profile.totalXp + xp };
  });
  const { streak, xp } = out;

  // Sosyal katman: seri eşiği geçildiyse akışa olay, aktif ortak görev hedefe
  // ulaştıysa tamamlanma. Hata fırlatmaz (bkz. lib/social/hooks.ts).
  await onActivityAwarded(userId, today, out.previousStreak, streak.currentStreak);

  return { ...streak, xpGained: xp, totalXp: out.totalXp };
}
