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
  /** Rol yapma / konuşma pratiğinde bir günde gönderilebilen tur. */
  roleplayTurns: 300,
  /** Sunucu tarafı konuşma tanıma isteği. */
  sttRequests: 400,
  /** Telaffuz puanlama isteği. */
  pronounceRequests: 120,
  /** İçerik bildirimi. */
  reports: 20,
} as const;
