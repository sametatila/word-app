import "server-only";
import { premiumConfig } from "./config";
import { isPremiumCached, resolveEntitlement, grantBonus, daysToMinutes } from "./entitlement";
import { PREMIUM_GATES, describeLimits, type CopyLine, type PremiumGate } from "./gates";

/**
 * Premium yetkisinin DIŞ YÜZEYİ — uygulamanın geri kalanı yalnız burayı görür.
 *
 * Kural: `@/lib/premium` dışında hiçbir dosya `entitlements`, `premium_grants`
 * ya da bir sağlayıcı adını bilmez. Bu, sağlayıcı bağımsızlığının uygulanabilir
 * hâli — "RevenueCat'i çıkaracağız" dendiğinde aranacak yer tek bir klasör.
 *
 * Alt modüller: `gates` (sınırların tanımı), `config` (panelden yürürlükteki
 * değerler), `entitlement` (hesap ve yazma), `access` (kilit kararları),
 * `promo`, `referral`, `quota`, `providers/*` (mağaza adaptörleri).
 */

export { premiumConfig, savePremiumConfig, parsePremiumConfig, clearPremiumConfigCache } from "./config";
export {
  DEFAULT_PREMIUM_CONFIG,
  PREMIUM_GATES,
  describeLimits,
  type PremiumConfig,
  type PremiumGate,
  type PlanPrice,
  type CopyLine,
} from "./gates";
export {
  resolveEntitlement,
  grantBonus,
  applyStoreEvent,
  revokeEntitlement,
  daysToMinutes,
  type EntitlementView,
  type BonusSource,
} from "./entitlement";
export { checkQuota, getUsage, bumpUsage, levelKey, type QuotaCheck, type Period } from "./quota";
export { findPremiumAccount, type PremiumAccount } from "./account";

/**
 * Premium mi — SICAK YOL.
 *
 * Önbellekten (`profiles.premium_until`) okuyor, hesap yapmıyor. Hesabı
 * `resolveEntitlement` yapıyor ve önbelleği o tazeliyor; kullanıcı uygulamayı
 * her açtığında `/api/premium/status` çağrıldığı için önbellek pratikte hep
 * taze. Aradaki tek fark, bekleyen bir bonusun çalışmaya başlaması: o da ilk
 * `resolveEntitlement`te oluyor.
 */
export async function isPremium(userId: string | null): Promise<boolean> {
  return isPremiumCached(userId);
}

/** Premium'a özel yetenekler — paywall ve kilit metinleri tek yerden. */
export const PREMIUM_FEATURES = PREMIUM_GATES;
export type PremiumFeature = PremiumGate;

/**
 * Elle premium verme (admin) — gün cinsinden, bakiyeye eklenir.
 *
 * Eski `grantPremium(userId, until, source)` imzasının yerini aldı. Fark
 * bilinçli: mutlak bir tarih YAZMAK, mağaza penceresiyle bonusu aynı sütunda
 * karıştırırdı ve bir sonraki yenileme onu silerdi. Gün eklemek her iki
 * bileşenle de doğru davranıyor.
 */
export async function grantPremiumDays(
  userId: string,
  days: number,
  opts: { actor?: string | null; note?: string | null } = {},
): Promise<void> {
  await grantBonus(userId, daysToMinutes(days), {
    source: "manual",
    actor: opts.actor ?? null,
    note: opts.note ?? `${days} gün elle verildi`,
  });
}

/**
 * Paywall'ın gösterdiği kapsam listesi — yapılandırmadan üretiliyor.
 * Çeviri anahtarı + parametre döner; cümleyi istemci kendi diliyle kurar.
 */
export async function premiumCopy(): Promise<{ free: CopyLine[]; premium: CopyLine[] }> {
  return describeLimits(await premiumConfig());
}

/** Kullanıcının tam yetki görünümü — profil ve paywall bunu gösterir. */
export async function premiumStatus(userId: string | null) {
  if (!userId) return null;
  return resolveEntitlement(userId);
}
