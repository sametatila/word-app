/**
 * Sesli evet/hayır.
 *
 * Yürürken modunda telefon cepte: tur bitince "devam edelim mi?" sorusuna
 * cevap ELLE verilemiyor. Tanıyıcıdan gelen Türkçe metni bir niyete çevirmek
 * gerekiyor.
 *
 * İki tuzak var ve ikisi de sessizce yanlış cevap üretir:
 *
 *   1. **Olumsuzlama.** "devam etmeyelim" içinde "devam" geçiyor; yalnızca
 *      olumlu sözcüklere bakan bir eşleştirici bunu EVET okur. Bu yüzden
 *      önce olumsuzluk aranıyor, olumluluk sonra.
 *   2. **Kısa sözcüklerin içinde geçmesi.** "dur" HAYIR demek ama "durum",
 *      "duruyor", "konduruyor" içinde de geçiyor. Kısa sözcükler bu yüzden
 *      alt dize olarak değil, TAM SÖZCÜK olarak aranıyor; yalnızca uzun ve
 *      ayırt edici kalıplar alt dize olarak taranıyor.
 *
 * Tanıyıcı çıktısı noktalama ve büyük harf konusunda kendi kurallarını
 * uyguluyor, ayrıca Türkçe harfleri bazen aksansız döndürüyor — o yüzden
 * karşılaştırma katlanmış (aksansız, küçük harf) metin üzerinde.
 */

export type Confirm = "yes" | "no" | null;

/** Aksanları düşürür ve küçük harfe indirir — Türkçe "I/İ" kuralıyla. */
export function foldTurkish(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[ıİ]/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/â/g, "a")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tam sözcük olarak arananlar — alt dize olarak aranırsa yanlış eşleşir. */
const NO_WORDS = new Set([
  "hayir", "yok", "yeter", "dur", "durduralim", "bitir", "bitirelim", "bitti",
  "kapat", "olmaz", "istemem", "kalsin", "sonra", "iptal", "vazgectim",
]);

const YES_WORDS = new Set([
  "evet", "devam", "edelim", "olur", "tamam", "tamamdir", "hadi", "basla",
  "baslayalim", "tabii", "tabi", "peki", "surdur", "isterim", "varim", "devamke",
]);

/** Uzun ve ayırt edici oldukları için alt dize olarak aranabilenler. */
const NO_PHRASES = ["istemiyor", "etmeyelim", "etmiyorum", "gerek yok", "yeterli", "simdilik"];
const YES_PHRASES = ["devam edelim", "devam et", "olsun", "neden olmasin"];

/**
 * "Bilmiyorum" niyeti.
 *
 * Kullanıcı cevabı bilmiyorsa Almanca kelime yerine Türkçe "bilmiyorum",
 * "bilemedim", "fikrim yok", "pas" gibi bir şey söylüyor. Bu bir YANLIŞ cevap
 * değil, bir teslim: yanlış saymak kelimeyi gerçekten unutulduğu için değil,
 * öğrenci dürüstçe "bilmiyorum" dediği için tekrar planına yazardı. Karşılığı
 * kısa bir motive ve doğrusunu okumak.
 *
 * Tanıyıcı Almanca kipte (de-DE) olduğu için Türkçe bu ifadeleri bozuk
 * döndürebiliyor; o yüzden hem tam kalıplar hem de ayırt edici kökler (bilmi-,
 * bileme-, fikrim, hatirla-) alt dize olarak taranıyor.
 */
const SKIP_PHRASES = [
  "bilmiyorum", "bilemedim", "bilemiyorum", "bilmem", "bilmiyom",
  "fikrim yok", "hicbir fikrim", "hic fikrim", "fikri yok",
  "hatirlamiyorum", "hatirlamadim", "aklima gelmiyor", "aklimda degil",
  "emin degilim", "unuttum", "gecelim", "gec", "pas", "bilmi", "bileme", "fikrim", "hatirla",
];

export function parseSkip(text: string): boolean {
  const folded = foldTurkish(text);
  if (!folded) return false;
  const words = new Set(folded.split(" "));
  // Kısa kökler (pas, gec) TAM sözcük; uzun kalıplar alt dize.
  if (words.has("pas") || words.has("gec") || words.has("gecelim")) return true;
  return SKIP_PHRASES.some((p) => p.length >= 5 && folded.includes(p));
}

/**
 * Söylenenin niyeti. Anlaşılmazsa `null` — çağıran taraf soruyu tekrarlar.
 * Emin olunamayan bir cevabı EVET saymak, kullanıcıyı istemediği bir tura
 * sokardı; HAYIR saymak ise turu sessizce bitirirdi. İkisi de sormaktan kötü.
 */
export function parseConfirm(text: string): Confirm {
  const folded = foldTurkish(text);
  if (!folded) return null;
  const words = folded.split(" ");

  // Olumsuzluk ÖNCE: "devam etmeyelim" içinde "devam" da geçiyor.
  if (NO_PHRASES.some((p) => folded.includes(p))) return "no";
  if (words.some((w) => NO_WORDS.has(w))) return "no";

  if (YES_PHRASES.some((p) => folded.includes(p))) return "yes";
  if (words.some((w) => YES_WORDS.has(w))) return "yes";

  return null;
}
