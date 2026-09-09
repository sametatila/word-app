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
 * Aynı kural kümesi İNGİLİZCE ve ALMANCA için.
 *
 * Soru kullanıcının dilinde soruluyor, dolayısıyla cevap da o dilde geliyor:
 * yalnız Türkçe sözcüklere bakan bir ayrıştırıcı İngilizce "yes" diyen
 * kullanıcıyı hiç anlamaz ve tur iki kez sorup sessizce biterdi. Sözcükler
 * tam-sözcük, kalıplar alt dize olarak aranıyor — Türkçedeki ile aynı kural.
 */
const NO_WORDS_EN = new Set(["no", "nope", "stop", "quit", "enough", "later", "cancel", "done", "finish"]);
const YES_WORDS_EN = new Set(["yes", "yeah", "yep", "sure", "ok", "okay", "continue", "go", "keep", "more", "again"]);
const NO_PHRASES_EN = ["not now", "i m done", "that s enough", "no thanks", "stop here"];
const YES_PHRASES_EN = ["go on", "keep going", "let s go", "one more", "why not"];

const NO_WORDS_DE = new Set(["nein", "nee", "stopp", "stop", "aufhoeren", "genug", "spaeter", "fertig", "schluss", "abbrechen"]);
const YES_WORDS_DE = new Set(["ja", "jaa", "klar", "gerne", "weiter", "los", "okay", "ok", "weitermachen", "natuerlich"]);
const NO_PHRASES_DE = ["nicht mehr", "keine lust", "das reicht", "fuer heute", "lieber nicht"];
const YES_PHRASES_DE = ["mach weiter", "weiter machen", "noch eins", "warum nicht", "gerne weiter"];

/** Latin harfli genel katlama — İngilizce için yeterli. */
function foldPlain(text: string): string {
  return text
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Söylenenin niyeti. Anlaşılmazsa `null` — çağıran taraf soruyu tekrarlar.
 * Emin olunamayan bir cevabı EVET saymak, kullanıcıyı istemediği bir tura
 * sokardı; HAYIR saymak ise turu sessizce bitirirdi. İkisi de sormaktan kötü.
 *
 * `lang` soruyu SORDUĞUMUZ dil: kullanıcı hangi dilde soruldu ise o dilde
 * cevap veriyor.
 */
export function parseConfirm(text: string, lang: "tr" | "en" | "de" = "tr"): Confirm {
  const folded = lang === "tr" ? foldTurkish(text) : lang === "de" ? foldGerman(text) : foldPlain(text);
  if (!folded) return null;
  const words = folded.split(" ");
  const [noWords, yesWords, noPhrases, yesPhrases] =
    lang === "en"
      ? [NO_WORDS_EN, YES_WORDS_EN, NO_PHRASES_EN, YES_PHRASES_EN]
      : lang === "de"
        ? [NO_WORDS_DE, YES_WORDS_DE, NO_PHRASES_DE, YES_PHRASES_DE]
        : [NO_WORDS, YES_WORDS, NO_PHRASES, YES_PHRASES];

  // Olumsuzluk ÖNCE: "devam etmeyelim" içinde "devam" da geçiyor.
  if (noPhrases.some((p) => folded.includes(p))) return "no";
  if (words.some((w) => noWords.has(w))) return "no";

  if (yesPhrases.some((p) => folded.includes(p))) return "yes";
  if (words.some((w) => yesWords.has(w))) return "yes";

  return null;
}

/**
 * "Doğru mu yanlış mı" hükmü — konuşma dersindeki `truefalse` adımı.
 *
 * Ayrıştırma `parseConfirm` ile aynı sorunu taşıyordu: hüküm yalnız Türkçe
 * sözcüklerle aranıyordu ve soru kullanıcının dilinde sorulunca cevabı
 * hiç anlaşılmıyordu.
 */
const TRUE_WORDS: Record<string, string[]> = {
  tr: ["dogru", "evet", "katiliyorum"],
  en: ["true", "right", "correct", "yes"],
  de: ["richtig", "stimmt", "ja", "wahr"],
};
const FALSE_WORDS: Record<string, string[]> = {
  tr: ["yanlis", "hayir", "katilmiyorum"],
  en: ["false", "wrong", "incorrect", "no"],
  de: ["falsch", "nein", "unwahr"],
};

export function parseJudgment(text: string, lang: "tr" | "en" | "de" = "tr"): boolean | null {
  const folded = lang === "tr" ? foldTurkish(text) : lang === "de" ? foldGerman(text) : foldPlain(text);
  if (!folded) return null;
  const words = new Set(folded.split(" "));
  const yes = (TRUE_WORDS[lang] ?? TRUE_WORDS.tr).some((w) => words.has(w));
  const no = (FALSE_WORDS[lang] ?? FALSE_WORDS.tr).some((w) => words.has(w));
  if (yes === no) return null; // ikisi birden ya da hiçbiri: hüküm yok
  return yes;
}
