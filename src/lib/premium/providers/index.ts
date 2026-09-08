import "server-only";
import type { StoreAdapter } from "../ports";
import { revenuecat } from "./revenuecat";

/**
 * Kayıtlı mağaza sağlayıcıları.
 *
 * SAĞLAYICI EKLEMEK/DEĞİŞTİRMEK: yeni bir adaptör dosyası yazıp bu haritaya bir
 * satır eklemek yeterli. Webhook ucu `/api/premium/webhook/<ad>` olarak
 * kendiliğinden açılır; gating, promo, referans, admin ve istemcilerin hiçbiri
 * değişmez. Aynı anda birden çok sağlayıcı açık olabilir — mağazadan alan
 * kullanıcı RevenueCat'ten, web'den alan Stripe'tan gelir ve ikisi de aynı
 * deftere yazar.
 *
 * Eski `/api/premium/webhook` yolu RevenueCat'e yönlendiriliyor (geriye uyum).
 */
export const ADAPTERS: Record<string, StoreAdapter> = {
  revenuecat,
};

export const DEFAULT_ADAPTER = "revenuecat";

export function adapterFor(name: string | undefined): StoreAdapter | null {
  return ADAPTERS[(name ?? DEFAULT_ADAPTER).toLowerCase()] ?? null;
}
