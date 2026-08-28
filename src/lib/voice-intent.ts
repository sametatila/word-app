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

/** Almanca harfleri sadeleştirir (ß→ss, ä→ae…) ve küçük harfe indirir. */
export function foldGerman(text: string): string {
  return text
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * "Bilmiyorum / geç" niyeti — YÜRÜYÜŞ için, ALMANCA işaretle.
 *
 * Yürüyüşte tanıyıcı de-DE kipinde çalışıyor ve Türkçe "bilmiyorum"u güvenilir
 * yakalayamıyor: Türkçe konuşmayı Almanca fonemlere çeviriyor, çıkan çöp metin
 * öngörülemez. Bu yüzden teslim işareti ALMANCA veriliyor — "weiter", "weiß
 * nicht", "keine Ahnung" — bunları de-DE tanıyıcı zaten kusursuz döndürüyor.
 *
 * Bir teslim YANLIŞ cevap değil: kelime gerçekten unutulduğu için değil,
 * öğrenci dürüstçe bilmediğini söylediği için tekrar planına yazılmaz; karşılığı
 * kısa bir motive ve doğrusunu okumak. Çağıran taraf bunu YALNIZ cevap hedefe
 * UYMADIĞINDA soruyor — böylece hedefin kendisi "weiter" gibi bir kelime olsa
 * bile doğru cevap yanlışlıkla teslim sayılmıyor.
 *
 * Kısa sözcükler tam-sözcük (alt dizede yanlış eşleşmesin: "weitergehen"
 * içinde "weiter"), uzun kalıplar alt dize olarak aranıyor.
 */
const SKIP_DE_WORDS = new Set(["weiter", "ueberspringen", "naechste", "naechstes"]);
const SKIP_DE_PHRASES = ["weiss nicht", "weiss es nicht", "keine ahnung", "keine idee", "kein plan"];

export function parseSkipDe(text: string): boolean {
  const folded = foldGerman(text);
  if (!folded) return false;
  const words = new Set(folded.split(" "));
  if ([...SKIP_DE_WORDS].some((w) => words.has(w))) return true;
  return SKIP_DE_PHRASES.some((p) => folded.includes(p));
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
