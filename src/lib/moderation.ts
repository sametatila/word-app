/**
 * Başkalarına görünen kullanıcı metni için moderasyon (görünen ad, kullanıcı adı).
 * Amaç: bağlantı/e-posta/telefon gibi kişisel veri ve reklam, kontrol karakterleri ve
 * açık küfür/hakaret geçmesin. Yanlış pozitif (masum adın reddi) küfürden daha kötü
 * bir deneyim; kalan boşluğu kullanıcı bildirimi (content_reports, user_reports) ve
 * insan incelemesi kapatır.
 *
 * Süzgeç iki katmanlı, çünkü uygulama Türkçe **ve** Almanca öğretiyor:
 *
 * - **Türkçe katman** — ı/i, ş/s, ö/o ayrımı DURUR. "sik" içeren her kök yalnız
 *   burada aranır: ASCII'ye katlanınca "sıkmış→sikmis", "sıkıcı→sikici",
 *   "karmaşıktır→karmasiktir" olur ve masum sözcük küfüre dönüşür.
 * - **ASCII katmanı** — ı→i, ş→s, ğ→g... katlanır; yabancı sözcükleri ve Türkçe
 *   harfsiz yazılmış kaçamakları ("sürtük"→"surtuk") yakalar.
 *
 * Her girdi kendi eşleme kipini taşır; kip ölçümle seçildi (ayrıntı: karşılaştırma
 * scripts/test-moderation.ts gövdesinde):
 *
 * - `INFIX` her yerde arar. Yalnız uzun ve ayırt edici köklerde güvenli.
 * - `STEM`  sözcük başında arar, sonuna ek gelebilir ("piçler", "fuckyou").
 *           Almanca/İngilizce bileşikler yüzünden zorunlu: Ti-schlampe,
 *           Bro-schüre, who-reports ⊃ whore, vi-scount ⊃ cunt.
 * - `WORD`  iki yanı da sınır olan tam sözcük. Aufmerk-samk-eit, Gott, dick
 *           gibi gerçek Almanca sözcükleri kurtaran kip.
 * - `EXACT` yalnız girdinin tamamı buysa. "am", "mk" gibi hem küfür kısaltması
 *           hem masum sözcük olanlar burada.
 */
// Sınırlı nicelikler (ReDoS koruması). Eski `+` / `{2,}` çalıştırıcıları uzun
// girdide O(n²) geri-izlemeye yol açıyor, tek bir 1 MB gövde event-loop'u
// kilitliyordu (güvenlik denetimi #3). Üst sınırlar RFC azamileri (yerel 64,
// etiket 63) ve makul biçim uzunlukları; gerçek adres/e-posta/telefon tespiti
// DEĞİŞMEDİ (parite: scripts/test-moderation.ts).
const URL_OR_CONTACT = /(https?:\/\/|www\.|\.[a-z]{2,24}\/|@[a-z0-9_]{2,64}|[\w.+-]{1,64}@[\w-]{1,63}\.[a-z]{2,24}|\+?\d[\d\s().-]{7,32}\d)/i;
const CONTROL = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028-\u202f\ufeff]/;

/**
 * Moderasyon süzgeçlerine giren en uzun makul metin. Görünen ad (40) bunun çok
 * altında; ötesi meşru bir alan değil ve normalleştirme hiç çalıştırılmadan
 * reddedilir — çağıran kırpmayı unutsa bile emniyet freni. Asıl sınır çağıranda
 * (api/profile, social/profile); bu son savunma.
 */
const MAX_MODERATED_LEN = 4096;

/* ------------------------------------------------------------------ */
/* Normalizasyon                                                       */
/* ------------------------------------------------------------------ */

/** Latin harfi taklit eden Kiril/Yunan harfleri. Tam genişlik ve matematik
 *  varyantlarını (ｆｕｃｋ, 𝐟𝐮𝐜𝐤) NFKC zaten düzleştiriyor. */
const HOMOGLYPH = new Map(Object.entries({
  "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x", "ѕ": "s", "і": "i", "ј": "j",
  "к": "k", "м": "m", "т": "t", "в": "b", "н": "h",
  "ο": "o", "α": "a", "ε": "e", "ν": "v", "υ": "u", "ρ": "p", "τ": "t", "ι": "i", "κ": "k", "μ": "m",
  "σ": "s", "χ": "x", "γ": "y",
}));
/** Rakam kaçamağı: s1kt1r, 0rospu, y4rr4k. */
const LEET_DIGIT = new Map(Object.entries({
  "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b", "9": "g",
}));
/** İşaret kaçamağı: s!ktir, a$$hole. YALNIZ iki harfin ARASINDA uygulanır —
 *  yoksa "merhaba!" → "merhabai" olur ve normal metni bozar. Bitişik işaretler
 *  ("$$") tek öbek sayılır, iki yanına da harf aranır. */
const LEET_PUNCT = new Map(Object.entries({
  "@": "a", "$": "s", "!": "i", "|": "i", "+": "t", "€": "e", "(": "c",
}));
/** ASCII katmanının katlaması. */
const ASCII_FOLD = new Map(Object.entries({
  "ı": "i", "ş": "s", "ç": "c", "ğ": "g", "ö": "o", "ü": "u", "â": "a", "î": "i", "û": "u", "é": "e", "ß": "ss",
}));

const EDGE = /[^\p{L}\p{N}]+/u;
const HAS_LETTER = /\p{L}/u;
/** Ardışık tekrarı teke indirir: "fuuuck" → "fuck". Nicelik sınırlı (ReDoS). */
const REPEAT = /(\p{L}|\p{N})\1{1,4094}/gu;
const collapse = (s: string) => s.replace(REPEAT, "$1");

function asciiFold(word: string): string {
  let out = "";
  for (const c of word) out += ASCII_FOLD.get(c) ?? c;
  return out;
}

/**
 * Metni sözcüklere ayırır: NFKC → homoglif → Türkçe küçük harf → leet.
 * Ayraçlar (nokta, tire, boşluk, alt çizgi) sözcük sınırıdır; "a.m.k" üç sözcük
 * olur ve birleştirilince yine "amk" verir. Salt rakam öbekleri atılır, yoksa
 * "59" → "sg", "56" → "ss" gibi uydurma eşleşmeler doğuyor.
 */
function words(text: string): string[] {
  let mapped = "";
  for (const c of text.normalize("NFKC")) mapped += HOMOGLYPH.get(c) ?? c;
  mapped = mapped.toLocaleLowerCase("tr-TR");

  const chars = [...mapped];
  let joined = "";
  for (let i = 0; i < chars.length; i++) {
    if (!LEET_PUNCT.has(chars[i])) { joined += chars[i]; continue; }
    let son = i;
    while (son + 1 < chars.length && LEET_PUNCT.has(chars[son + 1])) son++;
    const arada = HAS_LETTER.test(chars[i - 1] ?? "") && HAS_LETTER.test(chars[son + 1] ?? "");
    for (; i <= son; i++) joined += arada ? LEET_PUNCT.get(chars[i]) : chars[i];
    i = son;
  }

  const out: string[] = [];
  for (const raw of joined.split(EDGE)) {
    if (!raw || !HAS_LETTER.test(raw)) continue;
    let word = "";
    for (const c of raw) word += LEET_DIGIT.get(c) ?? c;
    out.push(word);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Sözlük                                                              */
/* ------------------------------------------------------------------ */

/** Türkçe katman — ı/i ayrımı korunduğu için "sik" kökleri burada güvenli.
 *  Hem Türkçe yazım hem Türkçe harfsiz klavye yazımı listelenir. */
const TR_INFIX = [
  "sikici", "sikiş", "sikis", "sikişme", "sikisme", "siktir", "siktır", "sikeyim", "sikiyim",
  "sikerim", "siktim", "siktiğim", "siktigim", "sikmiş", "sikmis", "amınakoy", "aminakoy",
  "yarrağ", "götlek", "götveren", "gotveren",
];
const TR_STEMS = [
  "amına", "amina", "götüne", "götünü", "götünde", "gotune", "sikik", "sikim", "sikin", "sikil",
  "sikti", "puşt", "pust",
];
const TR_WORDS = new Set(["piç", "oç", "göt", "sik", "amcık", "yarrak", "ibne", "gavat", "şerefsiz"]);
const TR_EXACT = new Set(["am", "mk"]);

/** ASCII katmanı — Türkçe harfsiz yazımlar ve yabancı sözcükler. Buradaki hiçbir
 *  girdi "sik" içermez; o kökler yukarıdaki katmanda. */
const ASCII_INFIX = [
  "orospu", "oruspu", "orspu", "orospucocugu", "amcik", "amcigi", "aminakoy", "aminaco",
  "yarrak", "yarram", "gotveren", "gotlek", "kahpe", "kaltak", "kevase", "surtuk", "pezevenk",
  "godos", "serefsiz", "gerizekali", "yavsak",
  "hurensohn", "wichser", "arschloch", "missgeburt", "fotze",
  "fuck", "phuck", "motherfuck", "faggot", "wanker", "asshole",
];
const ASCII_STEMS = [
  "yarak", "fuk", "fck", "gavat", "ibne", "pust", "nutte", "cunt", "twat", "retard", "slut",
  "wixer", "bastard", "dummkopf", "idiot", "hure", "kack", "schlampe", "whore", "nigger", "bitch",
];
const ASCII_WORDS = new Set(["amk", "amq", "aq", "fag", "cock", "wichs", "arsch"]);
const ASCII_EXACT = new Set(["am", "oc", "mk", "pic"]);

/**
 * Öbek hakaretler: tek tek masum ya da fazla riskli olan sözcüklerden kurulu,
 * birleşince tartışmasız olan kalıplar ("bacı kovalayan", "ana avrat"). Türkçe
 * hakaret üretken olduğu için bu liste hiçbir zaman tam olmayacak — kalan boşluk
 * bildirme + yönetici incelemesi ve 14 günlük kullanıcı adı bekleme süresiyle
 * kapanır. Ayraç kaldırıldıktan sonra arandığı için "baci_kovalayan" da düşer.
 */
const COMPOUND_INSULTS = [
  "bacikovalayan", "bacikovala", "anaavrat", "essoglu", "essekoglu", "itoglu", "kopekoglu",
  "amcikagzi", "sikimsonik", "yarrakkafa", "sikkafa", "gotkafa", "ibnetor", "gavatoglu",
  "ananisikeyim", "ananisikim", "avradinisikeyim", "sulalenisikeyim", "avradini",
];

/**
 * Sözcük düzeyi eşlemeden muaf tutulan gerçek adlar. Kısa tutuluyor: her girdi
 * ölçülmüş bir yanlış pozitifi karşılıyor (Bitchell ⊃ bitch, Nigeria/Nigar ⊃
 * nigger, Amina ⊃ amına). Muafiyet YALNIZ sözcük düzeyindedir; birleşik metinde
 * arama yine tüm sözcükler üzerinden yapılır, yoksa "amina koyayim" kaçardı.
 */
const ALLOWLIST = new Set(["bitchell", "nigeria", "nigar", "amina"]);

/* ------------------------------------------------------------------ */
/* Eşleme                                                              */
/* ------------------------------------------------------------------ */

type Layer = {
  infix: readonly string[];
  stems: readonly string[];
  words: ReadonlySet<string>;
  exact: ReadonlySet<string>;
};

const TR_LAYER: Layer = { infix: TR_INFIX, stems: TR_STEMS, words: TR_WORDS, exact: TR_EXACT };
const ASCII_LAYER: Layer = {
  infix: [...ASCII_INFIX, ...COMPOUND_INSULTS],
  stems: ASCII_STEMS,
  words: ASCII_WORDS,
  exact: ASCII_EXACT,
};

/**
 * `kept` beyaz listeyle süzülmüş sözcükler (sözcük düzeyi kipler),
 * `all` süzülmemiş hepsi (birleşik metinde arama).
 */
function matches(kept: string[], all: string[], layer: Layer): boolean {
  if (!all.length) return false;
  const joined = all.join("");

  if (layer.exact.has(joined)) return true;
  for (const w of kept) if (layer.words.has(w) || layer.words.has(collapse(w))) return true;
  if (all.length > 1 && layer.words.has(joined)) return true; // "a.m.k" → "amk"

  for (const w of kept) {
    const c = collapse(w);
    for (const stem of layer.stems) {
      // Daraltılmış biçim yalnız sözcük gerçekten daraldıysa denenir; yoksa
      // "nigeria" ↔ collapse("nigger")="niger" gibi uydurma eşleşme doğuyor.
      if (w.startsWith(stem) || (c !== w && c.startsWith(collapse(stem)))) return true;
    }
  }

  for (const needle of layer.infix) if (joined.includes(needle)) return true;
  // Uzatılmış yazım ("orospuuu") daraltılınca yalnız BAŞTAN aranır: serbest
  // içerik araması "sayarak" ⊃ collapse("yarrak") gibi tuzaklara düşüyor.
  const shrunk = collapse(joined);
  if (shrunk !== joined) {
    for (const needle of layer.infix) if (shrunk.startsWith(collapse(needle))) return true;
  }
  return false;
}

/** Küfür/hakaret içeriyor mu — iki alanın da ortak süzgeci. */
function abusive(text: string): boolean {
  const all = words(text);
  if (!all.length) return false;
  const ascii = all.map(asciiFold);
  const trKept = all.filter((w) => !ALLOWLIST.has(asciiFold(w)));
  const asciiKept = ascii.filter((w) => !ALLOWLIST.has(w));
  return matches(trKept, all, TR_LAYER) || matches(asciiKept, ascii, ASCII_LAYER);
}

/**
 * Görünen ad: başkalarına görünür (sıralama, arkadaş listesi, akış).
 * Bağlantı/iletişim bilgisi, kontrol karakteri ve küfür kabul edilmez.
 */
export function displayNameAllowed(name: string): boolean {
  if (name.length > MAX_MODERATED_LEN) return false;
  if (CONTROL.test(name)) return false;
  if (URL_OR_CONTACT.test(name)) return false;
  return !abusive(name);
}

/**
 * Kullanıcı adı: karakter kümesi (a-z0-9_) zaten bağlantı, e-posta, telefon ve
 * kontrol karakterini dışarıda bırakıyor — geriye küfür süzgeci kalıyor.
 * Alt çizgi sınır sayıldığı için "kral_amk" da yakalanır.
 */
export function usernameAllowed(username: string): boolean {
  if (username.length > MAX_MODERATED_LEN) return false;
  return !abusive(username);
}
