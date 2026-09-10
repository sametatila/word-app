/**
 * Almanca biçim yardımcıları — web `src/lib/german.ts` ile AYNI yerde, aynı ad.
 *
 * `umlautStem` gramer notunun içinde duruyordu (`game/wordGrammar`) ve oradaki
 * harf haritası (`{ a: "ä", ... }`) mobil `i18n-scan`i kırıyordu: tarayıcı tek
 * harfli dizgeleri çevrilmemiş metin sanıyor. Harf tablosu arayüz metni değil,
 * bu yüzden dosya sayımdan muaf tutuldu (`SKIP_CONTENT`) - ve muafiyetin bir
 * kapısı var: `check:parity` "umlaut govdesi" gövdeyi webinkiyle dizge dizge
 * karşılaştırıyor. Web tarafında aynı dört harf ham metin tabanında yazılıydı.
 */

/** Umlautlu gövde — web `lib/german` `umlautStem` ile aynı. */
export function umlautStem(stem: string): string {
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
