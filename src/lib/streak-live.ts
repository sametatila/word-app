import { sql, type SQL } from "drizzle-orm";
import { profiles } from "@/lib/db/schema";
import { liveStreak } from "@/lib/premium/unlock";

/**
 * EKRANDA GÖRÜNEN SERİ — tek kaynak (QA F-0086, F-0087; 2026-10-09).
 *
 * `profiles.current_streak` yalnız kullanıcı çalışınca yazılıyor; üç gündür
 * gelmeyen birinin satırında hâlâ "5" duruyor. Bu değer olduğu gibi her yere
 * gidiyordu: kendi başlığı, Gelişim, profil, arkadaş listesi, lig, arama,
 * öneriler. Başkasının profilinde "Gün serisi 5" ile "Son aktif 6 Eki" (bugün
 * 9 Eki) yan yana duruyordu. Artık seriyi GÖSTEREN her uç bunu okuyor; ham
 * değer yalnız seriyi İLERLETEN hesapta (`lib/award` `nextStreak`) kalıyor.
 *
 * KURAL: son etkin gün "bugün" ya da "dün" ise seri yaşıyor, daha eskiyse 0
 * (`premium/unlock` `liveStreak`, kilit açma ölçüsüyle aynı karar).
 *
 * "BUGÜN" KİMİN GÜNÜ: `last_active_day` istemcinin yerel günü. Profildeki
 * `timezone` yalnız bildirim açanda cihazın değeri, ötekilerde varsayılan
 * (Europe/Istanbul). İkisinden ERKEN olanı alınıyor (profil saat dilimi ile
 * UTC): Avrupa ve Türkiye için bu UTC günü, yani yerel gece yarısından sonra
 * en çok birkaç saat iyimser; saat dilimi doğru kayıtlı batıdaki kullanıcı
 * kendi gününü görüyor. Kopmuş bir seriyi günlerce göstermekten iyi.
 */
export function shownStreak(
  row: { currentStreak: number; lastActiveDay: string | null; timezone?: string | null },
  now: Date = new Date(),
): number {
  return liveStreak(row.currentStreak, row.lastActiveDay ? String(row.lastActiveDay) : null, referenceDay(row.timezone ?? null, now));
}

/** Seri hesabının "bugün"ü: profil saat dilimindeki gün ile UTC gününden erken olanı. */
export function referenceDay(timezone: string | null, now: Date = new Date()): string {
  const utc = now.toISOString().slice(0, 10);
  if (!timezone) return utc;
  try {
    // en-CA biçimi "YYYY-AA-GG" veriyor.
    const local = new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
    return /^\d{4}-\d{2}-\d{2}$/.test(local) && local < utc ? local : utc;
  } catch {
    return utc;
  }
}

/**
 * Aynı kural SQL'de: `profiles` üzerinden seçilen satırın görünen serisi.
 * Sıralama (`order by`) da bununla yapılmalı, yoksa kopmuş seriler üstte kalır.
 */
export function shownStreakSql(): SQL<number> {
  return sql<number>`(case when ${profiles.lastActiveDay} >= least((now() at time zone ${profiles.timezone})::date, (now() at time zone 'UTC')::date) - 1 then ${profiles.currentStreak} else 0 end)::int`;
}
