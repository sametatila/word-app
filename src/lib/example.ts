/**
 * Örnek cümle ayıklama.
 *
 * Goethe listesindeki `beispiel` alanı çoğu maddede tek cümledir, ama 497
 * maddede numaralı bir derlemedir ("1. … 2. … 3. …") ve bir kısmı "- " ile
 * başlar. Doğrudan cümle sonuna göre bölmek bu maddelerde ilk parça olarak
 * "1." veriyordu: tanıtım kartı ve kelime listesi boş bir numara gösteriyor,
 * boşluk doldurma oyunu ise cümleyi hiç kuramıyordu.
 *
 * Türkçe çeviriler aynı numaralandırmayı koruduğu için bu işlev iki dilde de
 * çalışır; ilk Almanca cümlenin karşılığı ilk Türkçe parçadır.
 */

/** Sonundaki nokta cümleyi bitirmeyen kısaltmalar ("vor ca. 6000 Jahren"). */
const ABBREVIATIONS = new Set([
  "ca",
  "bzw",
  "usw",
  "evtl",
  "bzgl",
  "nr",
  "dr",
  "prof",
  "hr",
  "fr",
  "st",
  "mio",
  "mrd",
  "inkl",
  "zzgl",
  "ggf",
  "etc",
  "tel",
  "str",
  "vgl",
  "max",
  "min",
  "abb",
  "jh",
  "bspw",
]);

/** "z. B." gibi tek harfli kısaltmalar da cümleyi bitirmez. */
function endsWithAbbreviation(text: string): boolean {
  const m = text.match(/(\p{L}+)\.$/u);
  if (!m) return false;
  return m[1].length === 1 || ABBREVIATIONS.has(m[1].toLowerCase());
}

export function firstExample(text: string | null | undefined): string | null {
  if (!text) return null;
  const body = text
    .replace(/^\s*-\s*/, "") // kaynakta bazı maddeler tire ile başlıyor
    .replace(/^\s*\d+\.\s*/, "") // "1. " madde numarası
    .trim();
  // Sonraki madde numarası ("2. ") de cümle sonu sayılır.
  const item = body.split(/\s+\d+\.\s+/)[0];

  const boundary = /[.!?]\s+/g;
  let m: RegExpExecArray | null;
  while ((m = boundary.exec(item))) {
    const candidate = item.slice(0, m.index + 1);
    if (!endsWithAbbreviation(candidate)) return candidate.trim() || null;
  }
  return item.trim() || null;
}
