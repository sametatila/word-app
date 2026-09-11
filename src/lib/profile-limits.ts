/**
 * PROFİL ALANLARININ SINIRLARI — uç ile arayüzün tek ortak kaynağı.
 *
 * Aynı üç sınır beş yerde yazılıydı: uç (`api/profile` `clampInt`/`slice`),
 * web ayar formundaki iki kaydırıcı ve ad kutusu, mobilin aynı üç kutusu.
 * Beşi de aynıydı; biri değişse ötekiler sessizce eski kalır ve kullanıcı
 * **seçebildiği** bir değerin kaydedilmediğini görürdü — arayüz kabul ediyor,
 * uç kırpıyor.
 *
 * Mobil bu dosyayı içe aktaramıyor (ayrı paket); orada aynı sayılar
 * `lib/profileDefaults` içinde duruyor ve `check:parity` ikisini
 * karşılaştırıyor.
 */
export const PROFILE_LIMITS = {
  /** Günlük tekrar hedefi. */
  dailyGoal: { min: 5, max: 120 },
  /** Günde yeni kelime — sıfır geçerli: "yeni kelime istemiyorum". */
  newPerDay: { min: 0, max: 40 },
  /** Görünen adın karakter sınırı. */
  displayNameMax: 40,
} as const;
