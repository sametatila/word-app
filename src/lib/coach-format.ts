/**
 * Koç cevabının biçimi — tek kaynak.
 *
 * `chat-format.ts` ile aynı gerekçe: biçim kuralı hem üretim yolunda hem
 * testte kullanılıyor, iki yerde ayrı yazılırsa test gerçekte gösterileni
 * ölçmemeye başlıyor. Bu dosya `server-only` değil, çünkü test betiği de
 * içeri alıyor.
 */

/** Kalın/italik işaretleri: model istenmese de markdown yazıyor, arayüz düz metin. */
const EMPHASIS = /\*\*?([^*]+)\*\*?/g;
/** Cümlenin tamamını saran tırnak olarak sayılan karakterler. */
const WRAP_QUOTES = /["“”]/g;

/** Gösterilecek metnin üst sınırı — koç tek cümle konuşuyor. */
const MAX_CHARS = 300;

/**
 * Cevabın tek satıra indirilmesi.
 *
 * Küçük modeller istenmese de sık sık madde işareti, markdown vurgusu ya da
 * "Tabii!" gibi bir giriş cümlesi ekliyor. Bunları istemde yasaklamak
 * yetmiyor — çıktıda temizlemek daha güvenilir.
 */
export function tidy(raw: string): string {
  const line = raw
    .split("\n")
    .map((l) => l.replace(/^[-*•\d.)\s]+/, "").trim())
    .find((l) => l.length > 0);
  if (!line) return "";
  return unwrap(line.replace(EMPHASIS, "$1")).slice(0, MAX_CHARS);
}

/**
 * Cümlenin tamamını saran tırnağı kaldırır.
 *
 * Baştaki ve sondaki tırnağı koşulsuz kırpmak yanlış olurdu: koçun en tipik
 * cevabı tırnakla **başlıyor** — `"schön" kelimesindeki ö sesini...`. Orada
 * kırpma cümleyi bozar. Bu yüzden yalnızca metinde tam iki tırnak varsa ve
 * ikisi de uçlardaysa kaldırılıyor; kelime tırnakları olduğu gibi kalıyor.
 */
function unwrap(line: string): string {
  const quotes = line.match(WRAP_QUOTES);
  if (!quotes || quotes.length !== 2) return line;
  if (!/^["“]/.test(line) || !/["”]$/.test(line)) return line;
  return line.slice(1, -1).trim();
}
