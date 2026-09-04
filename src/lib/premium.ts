import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";

/**
 * Premium yetki (entitlement) — TEK kaynak (dönüşüm planı §4).
 *
 * Gating'in tamamı buradan geçer: bir premium özelliği (sınırsız konuşma,
 * tam sınav hazırlığı, sınırsız tur) kilitleyen her yer `isPremium`
 * sorar. Böylece premium bir gün açıldığında tek bir yerin dönmesi yeter.
 *
 * Yetki `profiles.premium_until` sütununda: null ya da geçmiş → ücretsiz,
 * gelecekteki bir tarih → premium. Bu alanı YALNIZ sunucu yazar (`grantPremium`)
 * ve o da doğrulanmış bir kaynaktan çağrılır — mağaza webhook'u ya da web ödeme
 * onayı. İstemci hiçbir zaman doğrudan premium set edemez: profil POST'u bu
 * alanı whitelist'e almaz, olay ucu yalnız telemetri yazar. Satın alma yolu
 * (RevenueCat) henüz BAĞLI DEĞİL; altyapı hazır, kaynağı sonra bağlanacak (WP-90).
 */
export async function isPremium(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  try {
    const [row] = await db
      .select({ until: profiles.premiumUntil })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);
    return Boolean(row?.until && row.until.getTime() > Date.now());
  } catch {
    return false;
  }
}

/** Premium yetki kaynağı — muhasebe/geri izleme için (webhook, web ödeme, elle). */
export type PremiumSource = "revenuecat" | "web" | "manual";

/**
 * Yetki ver/uzat. YALNIZ doğrulanmış bir kaynaktan çağrılır (mağaza webhook'u,
 * web ödeme onayı, admin). İstemci girdisiyle asla çağrılmamalı. `until` UTC
 * abonelik bitişi; uzatmada mevcut bitişten değil, sağlayıcının bildirdiği yeni
 * bitişten yazılır (tek kaynak sağlayıcıdır).
 */
export async function grantPremium(userId: string, until: Date, _source: PremiumSource): Promise<void> {
  await db.update(profiles).set({ premiumUntil: until }).where(eq(profiles.userId, userId));
}

/** Yetkiyi hemen kaldır (iade/iptal/ihtilaf). */
export async function revokePremium(userId: string): Promise<void> {
  await db.update(profiles).set({ premiumUntil: null }).where(eq(profiles.userId, userId));
}

/** Premium'a özel yetenekler — paywall ve kilit metinleri tek yerden. */
export const PREMIUM_FEATURES = {
  speaking: "Sınırsız konuşma alıştırması",
  exam_full: "Tam sınav hazırlığı",
  unlimited_tour: "Sınırsız kelime turu — günlük limit yok",
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

/** Aylık/yıllık planlar — web ve mobil aynı fiyatları göstersin diye tek yerde. */
export const PREMIUM_PLANS = [
  { key: "yearly", label: "Yıllık", monthly: "₺79/ay", note: "₺948 yıllık — 2 ay bedava", badge: "En avantajlı" },
  { key: "monthly", label: "Aylık", monthly: "₺99/ay", note: "İstediğin zaman iptal", badge: null },
] as const;

export type PremiumPlan = (typeof PREMIUM_PLANS)[number]["key"];
