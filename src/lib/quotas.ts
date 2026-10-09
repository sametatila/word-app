/**
 * Günlük kota sabitleri — hem uçların uyguladığı sınır, hem kullanım
 * şartlarında yazılı söz.
 *
 * Sayılar dört ayrı uç dosyasında yerel `const` olarak duruyordu ve
 * `lib/legal` içindeki `FAIR_USE` tablosu onların ELLE tutulmuş kopyasıydı —
 * tablonun kendi yorumu bile "route dosyalarındaki sabitler" diyordu. Bugün
 * dördü de tutuyordu; biri değişse şartlar sayfası eski sınırı söylemeye
 * devam ederdi ve kullanıcı, metinde yazan sınıra varmadan 429 alırdı.
 *
 * Kaynak burası: uçlar buradan okuyor, `FAIR_USE` buradan türetiliyor.
 * Sınırlar dürüst ağır kullanımın çok üstünde; amaç otomasyon ve kötüye
 * kullanımı engellemek.
 */
export const DAILY_QUOTAS = {
  /** Sohbet / sohbette bir günde gönderilebilen tur. */
  chatTurns: 300,
  /** Sunucu tarafı konuşma tanıma isteği. */
  sttRequests: 400,
  /** Telaffuz puanlama isteği. */
  pronounceRequests: 120,
} as const;
/* İçerik bildiriminin günlük kotası YOK (Samet, 2026-10-09): her bildirim
   içeriği düzeltmenin yolu; 20'lik sınır hata bulan kullanıcıyı ve QA hesabını
   susturuyordu. Otomasyona karşı yalnız dakikalık sel koruması var
   (`app/api/reports` `REPORT_BURST`), şartlarda sayı olarak geçmiyor. */
