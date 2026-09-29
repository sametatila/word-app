/**
 * ABONELİK DURUMUNUN CÜMLESİ — hangi anahtar, tarih gerekiyor mu.
 *
 * İki yüzey aynı cümleyi söylüyor: Premium sayfasının kapağı
 * (`premium-paywall`) ve Ayarlar › Abonelik paneli (`subscription-summary`,
 * 2026-09-29 Samet: web ayarlar masaüstü düzeni). Kural kopyalanırsa biri
 * "deneme bitiyor", öteki "etkin" derdi. Saf: "server-only" yok, istemci
 * bileşeni kullanıyor. Tarihi çağıran biçimliyor (arayüz dilinde, bkz.
 * `premium-paywall` `date`).
 *
 * ANAHTARLAR DÜZ YAZILI (bkz. `unlock-copy`): `i18n:check` ölü anahtarı
 * kaynakta düz metin olarak arıyor.
 */

/** Sunucunun `premiumStatus`unun istemciye giden biçimi (`/premium`, `/profile/settings/subscription`). */
export type PremiumStatusView = {
  premium: boolean;
  until: string | null;
  entSource: "store" | "bonus" | null;
  storeState: string | null;
  storePlatform: string | null;
  bonusDaysPending: number;
  bonusUntil: string | null;
};

/** Durum cümlesi — kaynağa ve mağaza durumuna göre değişiyor. `dated`: `{date}` = bitiş tarihi. */
export function premiumStateKey(status: PremiumStatusView | null | undefined): { key: string; dated: boolean } {
  if (!status || !status.premium) return { key: "premiumstate.free", dated: false };
  if (status.entSource === "bonus") return { key: "premiumstate.bonus_until", dated: true };
  if (status.storeState === "trial") return { key: "premiumstate.trial_until", dated: true };
  if (status.storeState === "canceled") return { key: "premiumstate.canceled_until", dated: true };
  if (status.storeState === "grace") return { key: "premiumstate.grace", dated: false };
  return { key: "premiumstate.active_until", dated: true };
}

/** Aboneliğin nereden yönetildiği — yalnız mağaza aboneliğinde. */
export function premiumManageKey(status: PremiumStatusView | null | undefined): string | null {
  if (!status?.premium || status.entSource !== "store") return null;
  if (status.storePlatform === "ios") return "premiumstate.manage_ios";
  if (status.storePlatform === "android") return "premiumstate.manage_android";
  return "premiumstate.manage_web";
}
