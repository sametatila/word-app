/**
 * RevenueCat genel (public) SDK anahtarları — SATIN ALMA arayüzü için.
 *
 * NE İŞE YARAR, NE İŞE YARAMAZ. Bu anahtarlar yalnız mağaza satın alma akışını
 * açıyor: fiyatları çekmek, ödeme ekranını göstermek, geri yüklemek. YETKİ
 * bunlardan gelmiyor — "premium miyim" sorusunun cevabı sunucuda
 * (`lib/premium.ts` → `/api/premium/status`). Bu yüzden anahtarlar boşken
 * uygulama bozulmuyor: satın alma yolu kapalı kalıyor, ama promo koduyla ya da
 * davet ödülüyle premium olan kullanıcı özelliklerini SORUNSUZ kullanıyor.
 *
 * Anahtarlar SIR DEĞİL: uygulama paketinde zaten gömülü ve RevenueCat bunları
 * "public" diye adlandırıyor. Gizli olan webhook sırrı (`REVENUECAT_WEBHOOK_AUTH`)
 * ve o yalnız sunucuda.
 *
 * `entitlementId` RevenueCat panosundaki entitlement kimliğiyle BİREBİR aynı
 * olmalı. Ayrışırsa satın alma tamamlanır ama SDK "yetki yok" der; sunucu
 * tarafı webhook'tan yine doğru yazar, yani kullanıcı premium olur — ama satın
 * alma ekranındaki geri bildirim yanlış görünür.
 *
 * Kurulumun tamamı (mağaza ürünleri, fiyatlar, deneme, webhook, entitlement,
 * offering) adım adım: `docs/premium/README.md` §3.
 */
export const REVENUECAT = {
  androidKey: "", // "goog_..." — RevenueCat › Project settings › API keys
  iosKey: "",     // "appl_..." — aynı yer, iOS uygulaması
  entitlementId: "premium",
};

/** Satın alma yolu açık mı. Yetki ile İLGİSİ YOK (bkz. dosya başı). */
export function billingConfigured(platform: "android" | "ios"): boolean {
  return (platform === "ios" ? REVENUECAT.iosKey : REVENUECAT.androidKey).length > 0;
}
