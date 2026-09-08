/**
 * Web'e ÖZEL arayüz metinleri — mobilde karşılığı olmayan ekranların anahtarları.
 *
 * Buraya yalnız web'de var olan yüzeylerin metni girer (açılış sayfası, yönetim
 * ekranı, kurulum rehberi, hayatta kalma modu gibi). Mobilde de olan bir metin
 * BURAYA yazılmaz: onun yeri `mobile/src/i18n/tr.ts` ve oradan
 * `scripts/i18n-pull.mjs` ile geliyor. İki yerde birden tanımlı bir anahtarda
 * bu dosya kazanır (bkz. lib/i18n/dict.ts) — yani yanlışlıkla kopyalanan bir
 * anahtar sessizce mobilden ayrışır.
 */
export const trWeb: Record<string, string> = {
  /*
   * Kahraman kartındaki iki rozet. Mobilde bu iki metin ekranın İÇİNDE sabit
   * yazılı (`M/src/screens/LearnScreen.tsx`) — yani orada da çevrilmiyor.
   * Anahtar burada açıldı; mobil tarafa da taşınması gereken bir eksik.
   */
  "learn.due_count": "{n} tekrar",
  "learn.new_count": "{n} yeni",
  /* Hayatta kalma modu web'e özel: mobilde böyle bir mod yok. */
  "learn.survival": "Hayatta kalma",
  "learn.survival_pitch": "40 sn · süre bitene kadar",
  /*
   * Süre birimi. Dakika için paylaşılan `skills.dk` var; saatli biçimin
   * anahtarı yoktu — mobilde `formatDuration` "3s 20dk" diye SABİT yazıyor,
   * yani orada da çevrilmiyor. Web bunu anahtara bağladı; mobil tarafın da
   * kapatması gereken bir eksik.
   */
  "common.hours_minutes": "{h} sa {m} dk",
  "common.hours": "{h} sa",
};
