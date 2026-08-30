/**
 * RevenueCat (gerçek satın alma) yapılandırması — LANSMAN İÇİN DOLDURULACAK.
 *
 * Kod tarafı hazır: anahtar girilince uygulama otomatik "gerçek satın alma"
 * moduna geçer (paywall gerçek fiyatları çeker, satın alma + geri yükleme çalışır,
 * premium özellikler açılır). Anahtar boşken satın alma devre dışıdır ve paywall
 * huni (ölçüm) modunda çalışır — yani bu dosya doldurulana dek hiçbir şey bozulmaz.
 *
 * Yapılacaklar (yalnız mağaza/panel tarafı — kod değişmez):
 *  1) RevenueCat panelinde proje aç; Android (Google Play) + iOS (App Store)
 *     uygulamalarını ekle. Her platformun "Public SDK Key"ini aşağıya yapıştır.
 *  2) Play Console / App Store Connect'te abonelik ürünlerini (yıllık/aylık) oluştur.
 *  3) RevenueCat'te bir "premium" entitlement'ı + bir "default" offering'i bu
 *     ürünlere bağla. (entitlementId aşağıdakiyle aynı olmalı.)
 */
export const REVENUECAT = {
  androidKey: "", // "goog_..." — RevenueCat Android Public SDK Key
  iosKey: "",     // "appl_..." — RevenueCat iOS Public SDK Key
  entitlementId: "premium",
};

export function billingConfigured(platform: "android" | "ios"): boolean {
  return (platform === "ios" ? REVENUECAT.iosKey : REVENUECAT.androidKey).length > 0;
}
