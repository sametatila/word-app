import type { NativeLang } from "@/lib/i18n/dict";
import { grammarNote, typLabel, type RoundWord } from "./types";

/**
 * "isim · çoğul: die Häuser" — tür ve (varsa) çoğul/çekim notu tek satırda.
 *
 * Mobil `game/wordGrammar` `grammarLine` karşılığı; iki parça `types.ts`teki
 * `typLabel` ve `grammarNote`tan geliyor (tanıtım kartı aynı ikisini yan yana
 * yazıyor). Sonuç katmanında cevaptan SONRA çiziliyor: yazma turunda sorunun
 * altına konsaydı çoğulu, yani cevabın bir parçasını ele verirdi.
 */
export function grammarLine(word: RoundWord, lang: NativeLang): string {
  /* Fiil çıkarımı Türkçe mastar ekine bakıyor (bkz. `typLabel`), mobil de
     `word.tr` veriyor — arayüz dilindeki anlam değil. */
  const typ = typLabel(word.typ, word.tr, lang);
  const note = grammarNote(word, lang);
  return note ? `${typ} · ${note}` : typ;
}
