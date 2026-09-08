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
  /* Süre birimi — bkz. tr.ts notu. */
  "common.hours_minutes": "{h} h {m} min",
  "common.hours": "{h} h",
  /* Günün görevleri — sunucuda çözülüyor, bkz. tr.ts notu. */
  "quest.reviews10": "Review 10 words",
  "quest.reviews25": "Review 25 words",
  "quest.newWords3": "Learn 3 new words",
  "quest.artikel5": "Get 5 articles right",
  "quest.listen5": "Identify 5 words by ear",
  "quest.daily": "Play today's round",
  "quest.skill1": "Finish one skill exercise",
  "quest.lesson1": "Complete one conversation",
  "quests.resets_midnight": "resets at midnight",
  "quests.all_three_done": "All three done today",
  "quests.all_three_done_sub": "You finished all three",
};
