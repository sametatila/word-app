import words from "../../data/app/words.json";
import { foldWord } from "./speech-rules";

/**
 * Kural motorunun aradığı Almanca sözlük.
 *
 * Türetilen bir sapma ancak gerçek bir Almanca kelimeye denk geliyorsa işe
 * yarıyor: tanıyıcı yalnızca sözlükteki kelimeleri yazar, var olmayan bir
 * biçim asla dönmez (bkz. speech-rules.ts).
 *
 * İki kaynaktan kuruluyor:
 *
 *   1. **Madde başları.** Temiz ama yalnızca sözlük biçimi — çekimli hâller
 *      yok, oysa cümlelerde çoğunlukla onlar geçiyor.
 *   2. **Örnek cümlelerdeki biçimler**, en az iki kez geçenler. Eşik ölçülerek
 *      seçildi: tek kez geçen belirteçlerin çoğu gürültü (özel ad, kısaltma,
 *      yabancı kelime) ve bunlar sözlüğe girdiğinde motor „Herr → Her“ gibi
 *      var olmayan kelimeleri gerçek sanıyordu. İki kez geçme, kelimenin
 *      gerçekten Almanca olduğunun ucuz ama etkili bir kanıtı.
 *
 * Ölçüm: madde başı 8.315 → eşikli sözlük 10.747 kelime, üretilen doğrulanmış
 * karışma çifti 24 → 49.
 */

/** Örnek cümlelerden bir biçimin kabul edilmesi için gereken tekrar sayısı. */
const MIN_OCCURRENCES = 2;

const TOKEN_SPLIT = /[.,!?;:„“”"'`´()[\]…\s]+/;

function build(): Set<string> {
  const rows = words as { de: string; beispiel?: string; course?: string }[];
  // Züritüütsch maddeleri dışarıda: lehçe biçimleri Almanca sapma aramasında
  // yanlış eşleşme üretirdi (bkz. zh-speaking.ts, orada motor hiç çalışmıyor).
  const german = rows.filter((r) => !r.course || r.course === "de");

  const lexicon = new Set(german.map((r) => foldWord(r.de)));

  const seen = new Map<string, number>();
  for (const row of german) {
    for (const token of (row.beispiel ?? "").split(TOKEN_SPLIT)) {
      if (token.length < 3) continue;
      const key = foldWord(token);
      seen.set(key, (seen.get(key) ?? 0) + 1);
    }
  }
  for (const [key, count] of seen) {
    if (count >= MIN_OCCURRENCES) lexicon.add(key);
  }
  return lexicon;
}

/** Bir kez kurulur; sözlük değişmediği için tekrar hesaplamanın anlamı yok. */
let cached: Set<string> | null = null;

export function germanLexicon(): Set<string> {
  if (!cached) cached = build();
  return cached;
}
