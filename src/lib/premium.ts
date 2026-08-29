import "server-only";

/**
 * Premium yetki (entitlement) — TEK kaynak (dönüşüm planı §4).
 *
 * Gating'in tamamı buradan geçer: bir premium özelliği (sınırsız konuşma,
 * Goethe/telc tam sınav hazırlığı, sınırsız tur) kilitleyen her yer `isPremium`
 * sorar. Böylece premium bir gün açıldığında tek bir yerin dönmesi yeter.
 *
 * Şimdilik faturalandırma/mağaza entegrasyonu YOK — herkes ücretsiz katmanda.
 * Bu bilinçli: paywall ve huni ölçümü (paywall_view → purchase_done) önce
 * kurulur, gerçek satın alma yolu (App Store / Play / web ödeme) sonra bağlanır.
 * O gün geldiğinde bu fonksiyon abonelik durumunu okuyacak; çağıranlar değişmez.
 */
export async function isPremium(userId: string | null): Promise<boolean> {
  if (!userId) return false;
  // TODO(WP-90): abonelik durumu (mağaza makbuzu / web ödeme) buraya bağlanır.
  return false;
}

/** Premium'a özel yetenekler — paywall ve kilit metinleri tek yerden. */
export const PREMIUM_FEATURES = {
  speaking: "Sınırsız konuşma alıştırması",
  exam_full: "Goethe & telc tam sınav hazırlığı",
  unlimited_tour: "Sınırsız kelime turu — günlük limit yok",
} as const;

export type PremiumFeature = keyof typeof PREMIUM_FEATURES;

/** Aylık/yıllık planlar — web ve mobil aynı fiyatları göstersin diye tek yerde. */
export const PREMIUM_PLANS = [
  { key: "yearly", label: "Yıllık", monthly: "₺79/ay", note: "₺948 yıllık — 2 ay bedava", badge: "En avantajlı" },
  { key: "monthly", label: "Aylık", monthly: "₺99/ay", note: "İstediğin zaman iptal", badge: null },
] as const;

export type PremiumPlan = (typeof PREMIUM_PLANS)[number]["key"];
