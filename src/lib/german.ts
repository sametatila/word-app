/**
 * Almanca biçimbilgisi yardımcıları.
 *
 * Hem sunucuda (tur kurulurken) hem istemcide (dilbilgisi notu yazılırken)
 * aynı kuralların geçerli olması gerekir; bu yüzden ortak bir yerde durur.
 */

/**
 * Kökün son ünlüsünü umlautlar: "Arzt" → "Ärzt", "Haus" → "Häus".
 *
 * Büyük harf ayrıca ele alınır. Almanca isimler büyük harfle başlar ve
 * ünlüsü yalnızca baştaki harf olan kelimeler vardır (Amt, Angst, Apfel,
 * Arzt); yalnızca küçük harf aranırsa bunlar hiç umlautlanmaz ve "die
 * Arzte" gibi var olmayan bir çoğul üretilir.
 */
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
  const map: Record<string, string> = {
    a: "ä", o: "ö", u: "ü",
    A: "Ä", O: "Ö", U: "Ü",
  };
  return stem.slice(0, last.index) + map[last[0]] + stem.slice(last.index + 1);
}
