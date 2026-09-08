/**
 * Web'e ÖZEL arayüz metinleri — mobilde karşılığı olmayan ekranların anahtarları.
 *
 * Buraya yalnız web'de var olan yüzeylerin metni girer (açılış sayfası, yönetim
 * ekranı, kurulum rehberi, hayatta kalma modu gibi). Mobilde de olan bir metin
 * BURAYA yazılmaz: onun yeri `mobile/src/i18n/de.ts` ve oradan
 * `scripts/i18n-pull.mjs` ile geliyor. İki yerde birden tanımlı bir anahtarda
 * bu dosya kazanır (bkz. lib/i18n/dict.ts) — yani yanlışlıkla kopyalanan bir
 * anahtar sessizce mobilden ayrışır.
 */
export const deWeb: Record<string, string> = {
  /* Kahraman kartındaki iki rozet — mobilde henüz sabit yazılı (bkz. tr.ts). */
  "learn.due_count": "{n} Wiederholung",
  "learn.new_count": "{n} neu",
  /* Web'e özel mod. */
  "learn.survival": "Überleben",
  "learn.survival_pitch": "40 s · bis die Zeit abläuft",
  /* Süre birimi — bkz. tr.ts notu. */
  "common.hours_minutes": "{h} Std. {m} Min.",
  "common.hours": "{h} Std.",
  /* Günün görevleri — sunucuda çözülüyor, bkz. tr.ts notu. */
  "quest.reviews10": "10 Wörter wiederholen",
  "quest.reviews25": "25 Wörter wiederholen",
  "quest.newWords3": "3 neue Wörter lernen",
  "quest.artikel5": "5 Artikel richtig haben",
  "quest.listen5": "5 Wörter am Klang erkennen",
  "quest.daily": "Tagesrunde spielen",
  "quest.skill1": "Eine Fertigkeitsübung abschließen",
  "quest.lesson1": "Ein Gespräch abschließen",
  "quests.resets_midnight": "wird um Mitternacht erneuert",
  "quests.all_three_done": "Heute alle drei geschafft",
  "quests.all_three_done_sub": "Du hast alle drei beendet",
};
