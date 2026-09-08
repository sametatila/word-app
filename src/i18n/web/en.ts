/**
 * Web'e ÖZEL arayüz metinleri — mobilde karşılığı olmayan ekranların anahtarları.
 *
 * Buraya yalnız web'de var olan yüzeylerin metni girer (açılış sayfası, yönetim
 * ekranı, kurulum rehberi, hayatta kalma modu gibi). Mobilde de olan bir metin
 * BURAYA yazılmaz: onun yeri `mobile/src/i18n/en.ts` ve oradan
 * `scripts/i18n-pull.mjs` ile geliyor. İki yerde birden tanımlı bir anahtarda
 * bu dosya kazanır (bkz. lib/i18n/dict.ts) — yani yanlışlıkla kopyalanan bir
 * anahtar sessizce mobilden ayrışır.
 */
export const enWeb: Record<string, string> = {
  /* Kahraman kartındaki iki rozet — mobilde henüz sabit yazılı (bkz. tr.ts). */
  "learn.due_count": "{n} review",
  "learn.new_count": "{n} new",
  /* Web'e özel mod. */
  "learn.survival": "Survival",
  "learn.survival_pitch": "40 s · until time runs out",
};
