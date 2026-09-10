/**
 * Örnek cümle ayıklama — web `src/lib/example.ts` ile AYNI kural.
 *
 * Mobilde bunun basitleştirilmiş bir kopyası `game/rounds.tsx` içinde
 * duruyordu: yalnız satır sonuna ve " / " ayracına bakıyordu. Havuzdaki
 * 497 madde numaralı bir derleme ("1. … 2. …") ve 53 madde cümleleri
 * boşluksuz eğik çizgiyle ayırıyor; mobil bu maddelerde üç cümlelik bloğu
 * TEK örnek cümle sayıp olduğu gibi ekrana basıyordu. Kısaltma listesi de
 * yoktu, yani "vor ca. 6000 Jahren" cümlesi "vor ca." diye kesiliyordu.
 *
 * Kısaltmalar İÇERİK, arayüz metni değil - bu yüzden `i18n-scan` dışında
 * (SKIP_CONTENT) ve karşılığı `check:parity` 49 ile bağlı.
 */

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
  // İngilizce
  "mr",
  "mrs",
  "ms",
  "jr",
  "sr",
  "vs",
  "approx",
  // Türkçe
  "vb",
  "bkz",
  "sn",
  "yy",
  "örn",
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
    // Kaynakta 53 maddede cümleler eğik çizgiyle ayrılmış ve çizgiden önce
    // boşluk yok: "Die Zeitung ist auf dem Tisch./ Auf dem Foto…". Cümle sonu
    // aranırken noktalamadan sonra boşluk beklendiği için bu maddelerde hiç
    // sınır bulunamıyor, üç cümlelik blok tek "örnek cümle" sayılıyordu —
    // boşluk doldurma turu da bu bloğu olduğu gibi ekrana basıyordu.
    //
    // Yalnızca noktalamanın hemen ardından gelen çizgi sınır sayılır. Cümle
    // **içindeki** alternatif çizgileri ("Ist das Ihr Hund/Ihre Katze?",
    // "Am Sonntag/am Abend") bölmek yanlış olurdu: onlar tek bir ifadedir.
    .replace(/([.!?])\s*\/\s*/g, "$1 ")
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
