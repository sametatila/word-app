import { t } from "../lib/i18n";

/**
 * Notun okuduğu ALANLAR kadarı — `RoundWord` da `WordRow` da bunu karşılıyor.
 * Tam tipi istemek, aynı iki alanı taşıyan kelime listesi satırını dışarıda
 * bırakıyordu.
 */
type GrammarWord = { de: string; artikel: string | null; typ: string; formen: string | null };

/**
 * Kelimenin dilbilgisi bilgisi — web `components/games/types.ts` içindeki
 * `typLabel` ve `grammarNote` ile BİREBİR aynı kurallar.
 *
 * Sunucu her kelimede `typ` (Nomen/Verb/...) ve `formen` (çoğul kalıbı ya da
 * fiil çekimi) gönderiyor ve web bunları üç yerde çiziyor: yeni kelime turu,
 * yazma turu ve kelime listesi. Mobil iki alanı da HİÇ okumuyordu - tip ikisini
 * de taşıyor ama hiçbir ekran açmıyordu. Yani Android'de öğrenci bir kelimenin
 * isim mi fiil mi olduğunu ve çoğulunun ne olduğunu hiç görmüyordu.
 */

/** Umlautlu gövde — web `lib/german` `umlautStem` ile aynı. */
function umlautStem(stem: string): string {
  // "au" ikili ünlüsü tek parça umlautlanır: Haus → Häuser, Baum → Bäume.
  const au = stem.toLowerCase().lastIndexOf("au");
  if (au >= 0) {
    const upper = stem[au] === stem[au].toUpperCase();
    return `${stem.slice(0, au)}${upper ? "Äu" : "äu"}${stem.slice(au + 2)}`;
  }
  const matches = [...stem.matchAll(/[aouAOU]/g)];
  const last = matches[matches.length - 1];
  if (!last || last.index === undefined) return stem;
  const map: Record<string, string> = { a: "ä", o: "ö", u: "ü", A: "Ä", O: "Ö", U: "Ü" };
  return stem.slice(0, last.index) + map[last[0]] + stem.slice(last.index + 1);
}

/**
 * Tür etiketi. `typ` alanı her zaman dolu değil; Türkçe karşılığın mastar eki
 * (-mek/-mak) fiili ele veriyor ve web de aynı yedeğe başvuruyor.
 */
export function typLabel(typ: string, tr: string): string {
  if (typ === "Nomen") return t("words.typ_noun");
  if (typ === "Verb" || /(mek|mak)(\s*,|$)/.test(tr)) return t("words.typ_verb");
  return t("words.typ_other");
}

/**
 * Ekranda gösterilecek dilbilgisi notu.
 * Ham PDF gösterimi ("¨-e", "(Sg.)") yerine öğrencinin okuyabileceği bir metin.
 */
export function grammarNote(word: GrammarWord): string | null {
  const raw = word.formen?.trim();
  if (!raw) return null;
  if (/^\(?Sg\.?\)?$/i.test(raw)) return t("words.no_plural");
  if (/^\(?Pl\.?\)?$/i.test(raw)) return t("words.plural_only");

  if (word.artikel) {
    const m = raw.match(/^(¨)?-?\s*(\w*)$/);
    if (m) {
      const stem = m[1] ? umlautStem(word.de) : word.de;
      const suffix = m[2] ?? "";
      // Çoğul biçimin kendisi Almanca kalıyor; çevrilen yalnız etiket.
      return t("words.plural_is", { form: `die ${stem}${suffix}` });
    }
    return t("words.plural_is", { form: raw });
  }
  return raw; // fiil çekimleri olduğu gibi
}

/** "isim · çoğul: die Häuser" — iki parça da varsa nokta ile birleşir. */
export function grammarLine(word: GrammarWord, tr: string): string {
  const note = grammarNote(word);
  return note ? `${typLabel(word.typ, tr)} · ${note}` : typLabel(word.typ, tr);
}
