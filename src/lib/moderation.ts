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
 * - `INFIX` sözcüğün içinde her yerde arar; sözcükler arası birleşik metinde ise
 *           yalnız bir sözcüğün başından başlayıp sınırı aşan eşleşme sayılır
 *           ("amına koyayım" düşer, "Bu eksiktir" ⊃ siktir düşmez). Yalnız uzun
 *           ve ayırt edici köklerde güvenli.
 * - `STEM`  sözcük başında arar, sonuna ek gelebilir ("piçler", "fuckyou").
 *           Almanca/İngilizce bileşikler yüzünden zorunlu: Ti-schlampe,
 *           Bro-schüre, who-reports ⊃ whore, vi-scount ⊃ cunt.
 * - `WORD`  iki yanı da sınır olan tam sözcük. Aufmerk-samk-eit, Gott gibi
 *           gerçek Almanca sözcükleri kurtaran kip.
 * - `EXACT` yalnız girdinin tamamı buysa. "am", "mk", "dick" gibi hem küfür
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
/** Yıldızın yerini tutan iç işaret (Unicode özel kullanım alanı; hiçbir girdide
 *  gerçek karakter olarak geçmez). */
const WILD = "";
/** İşaret kaçamağı: s!ktir, a$$hole. YALNIZ iki harfin ARASINDA uygulanır —
 *  yoksa "merhaba!" → "merhabai" olur ve normal metni bozar. Bitişik işaretler
 *  ("$$") tek öbek sayılır, iki yanına da harf aranır.
 *
 *  `*` belirli bir harfe çevrilmez: "f*ck", "sh*t", "d*ck" sansür yıldızıdır ve
 *  her seferinde başka bir harfin yerini tutar. İki harf arasındaki yıldız bir
 *  JOKER olur; `abusive` jokerli sözcüğü her harfle deneyip bakar (CNT-5). */
const LEET_PUNCT = new Map(Object.entries({
  "@": "a", "$": "s", "!": "i", "|": "i", "+": "t", "€": "e", "(": "c", "*": WILD,
}));
/** ASCII katmanının katlaması. */
const ASCII_FOLD = new Map(Object.entries({
  "ı": "i", "ş": "s", "ç": "c", "ğ": "g", "ö": "o", "ü": "u", "â": "a", "î": "i", "û": "u", "é": "e", "ß": "ss",
}));

const EDGE = /[^\p{L}\p{N}]+/u;
const HAS_LETTER = /\p{L}/u;
/** Ardışık tekrarı teke indirir: "fuuuck" → "fuck". Nicelik sınırlı (ReDoS). */
const REPEAT = /(\p{L}|\p{N})\1{1,4094}/gu;
const collapse = (s: string) => s.replace(REPEAT, "$1");
/** Aynı harf üç kez üst üste: bilerek uzatılmış yazım ("fuuuck", "amkkk").
 *  Daraltma YALNIZ bu durumda denenir. Gerçek sözcüklerde en çok çift harf var
 *  ("Hürrem", "Sikkim", "Kussmaul"); çift harfi daraltmak "hurrem"→"hurem" ⊃
 *  "hure" gibi yanlış pozitifler üretiyordu (CNT-4). */
const ELONGATED = /(\p{L})\1\1/u;

function asciiFold(word: string): string {
  let out = "";
  for (const c of word) out += ASCII_FOLD.get(c) ?? c;
  return out;
}

/**
 * Metni sözcüklere ayırır: NFKC → homoglif → Türkçe küçük harf → leet.
 * Ayraçlar (nokta, tire, boşluk, alt çizgi) sözcük sınırıdır; "a.m.k" üç sözcük
 * olur ve birleştirilince yine "amk" verir. Salt rakam öbekleri atılır, yoksa
 * "59" → "sg", "56" → "ss" gibi uydurma eşleşmeler doğuyor. İki harf arasındaki
 * `*` sözcüğün içinde WILD olarak kalır.
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
/* "amına/amina" kök değil tam sözcük: kök hâli "Aminata" gibi gerçek adları
   yakalıyordu; "amına koyayım" zaten sözcükler arası `amınakoy` ile düşüyor.
   "puşt" da tam sözcük: Almanca "Puste/pusten" (nefes) köke takılıyordu. */
const TR_STEMS = [
  "götüne", "götünü", "götünde", "gotune", "sikik", "sikim", "sikin", "sikil",
  "sikti", "piçkuru", "taşak", "kancığ",
];
const TR_WORDS = new Set([
  "piç", "oç", "göt", "sik", "amcık", "yarrak", "ibne", "gavat", "şerefsiz", "amına",
  "kancık", "dürzü", "kaşar",
]);
const TR_EXACT = new Set(["am", "mk"]);

/** ASCII katmanı — Türkçe harfsiz yazımlar ve yabancı sözcükler. Buradaki hiçbir
 *  girdi "sik" içermez; o kökler yukarıdaki katmanda. */
const ASCII_INFIX = [
  "orospu", "oruspu", "orspu", "orosbu", "orospucocugu", "amcik", "amcigi", "aminakoy", "aminaco",
  "yarrak", "yarram", "dalyarak", "pickurusu", "gotveren", "gotlek", "kahpe", "kaltak", "kevase",
  "surtuk", "pezevenk", "godos", "serefsiz", "gerizekali", "yavsak",
  "hurensohn", "wichser", "arschloch", "missgeburt", "fotze", "schwuchtel", "fickdich", "fickeuch",
  "siegheil",
  "fuck", "fvck", "phuck", "motherfuck", "faggot", "wanker", "asshole",
];
/* Sözcük başında aranan kökler. Kısa ve masum sözcüklerle çakışanlar (fuk →
   fukara/Fukushima, kack → Kaçkar, cunt → Cunta, pust → Puste) tam sözcüğe
   taşındı (CNT-4). "nazi" bilerek kök DEĞİL: Nazım, Nazif, Nazilli, nazik. */
const ASCII_STEMS = [
  "yarak", "fck", "gavat", "ibne", "nutte", "twat", "retard", "slut",
  "wixer", "bastard", "dummkopf", "idiot", "hure", "schlampe", "whore", "nigger", "nigga", "bitch",
  "shit", "porn", "dickhead", "kanake", "spast", "hitler", "kancik", "kancig", "durzu",
];
const ASCII_WORDS = new Set([
  "amk", "amq", "aq", "fag", "cock", "wichs", "arsch",
  "fuk", "cunt", "cunts", "kack", "kacke", "pust", "pustlar", "tasak",
  "pussy", "pussies", "rape", "raped", "rapist", "kike", "kikes", "tranny", "trannies",
  "fick", "ficken", "ficker", "neger", "negerin", "negern", "negers", "nazi", "nazis",
]);
/* "dick" yalnız girdinin TAMAMIYSA: Almancada "kalın" demek ve kendi ders
   içeriğimizde geçiyor; "Dickinson" gibi adlar da serbest kalmalı. */
const ASCII_EXACT = new Set(["am", "oc", "mk", "pic", "dick"]);

/**
 * Öbek hakaretler: tek tek masum ya da fazla riskli olan sözcüklerden kurulu,
 * birleşince tartışmasız olan kalıplar ("bacı kovalayan", "ana avrat"). Türkçe
 * hakaret üretken olduğu için bu liste hiçbir zaman tam olmayacak — kalan boşluk
 * bildirme + yönetici incelemesi ve 14 günlük kullanıcı adı bekleme süresiyle
 * kapanır. Ayraç kaldırıldıktan sonra arandığı için "baci_kovalayan" da düşer.
 * YALNIZ sözcük başında aranır: "Yiğitoğlu" ⊃ "itoglu", "İslam Çıkrıkçı" ⊃
 * "amcik" gibi gerçek adlar ortada eşleşiyordu (CNT-4).
 */
const COMPOUND_INSULTS = [
  "bacikovalayan", "bacikovala", "anaavrat", "essoglu", "essekoglu", "itoglu", "kopekoglu",
  "amcikagzi", "sikimsonik", "yarrakkafa", "sikkafa", "gotkafa", "ibnetor", "gavatoglu",
  "ananisikeyim", "ananisikim", "avradinisikeyim", "sulalenisikeyim", "avradini",
];

/**
 * Sözcük düzeyi eşlemeden muaf tutulan gerçek adlar ve masum sözcükler. Kısa
 * tutuluyor: her girdi ölçülmüş bir yanlış pozitifi karşılıyor (Bitchell ⊃
 * bitch, Nigeria/Nigar ⊃ nigger, Amina ⊃ amına, eksiktir ⊃ siktir — başlıktaki
 * "karmaşıktır" örneğinin Türkçe harfle yazılmış hâli; ders içeriğinde geçiyor
 * ve `test:moderation`ın içerik taraması 2026-09-22'de yakaladı).
 *
 * Muafiyet SÖZCÜK başınadır (CNT-4): eskiden yalnız girdinin tamamı tek bir
 * muaf sözcükse işliyordu, "Bu eksiktir" yine reddediliyordu. Sözcükler arası
 * arama muaf sözcüğü atlamaz ama bir eşleşmeyi ancak sözcük sınırını aşıyorsa
 * sayar, yani muaf sözcüğün kendi içindeki eşleşme hiçbir yoldan dönmez.
 */
const ALLOWLIST = new Set(["bitchell", "nigeria", "nigar", "amina", "eksiktir"]);
/** Bu öneklerle başlayan sözcükler muaf: "musiki(sever)", "Musik(mischung)" —
 *  içlerinde "sikis"/"sikmis" geçiyor. */
const ALLOW_PREFIXES = ["musik"];

function allowed(word: string): boolean {
  const f = asciiFold(word);
  return ALLOWLIST.has(f) || ALLOW_PREFIXES.some((p) => f.startsWith(p));
}

/* ------------------------------------------------------------------ */
/* Eşleme                                                              */
/* ------------------------------------------------------------------ */

type Layer = {
  infix: readonly string[];
  /** Yalnız sözcük başında aranan içerik kalıpları (öbek hakaretler). */
  compound: readonly string[];
  stems: readonly string[];
  words: ReadonlySet<string>;
  exact: ReadonlySet<string>;
};

const TR_LAYER: Layer = { infix: TR_INFIX, compound: [], stems: TR_STEMS, words: TR_WORDS, exact: TR_EXACT };
const ASCII_LAYER: Layer = {
  infix: ASCII_INFIX,
  compound: COMPOUND_INSULTS,
  stems: ASCII_STEMS,
  words: ASCII_WORDS,
  exact: ASCII_EXACT,
};

/** Tek sözcük (muaf değilse) kendi içinde küfür taşıyor mu. */
function wordHit(w: string, layer: Layer): boolean {
  const c = ELONGATED.test(w) ? collapse(w) : null;
  if (layer.words.has(w) || (c !== null && layer.words.has(c))) return true;
  for (const stem of layer.stems) {
    if (w.startsWith(stem) || (c !== null && c.startsWith(collapse(stem)))) return true;
  }
  for (const needle of layer.infix) {
    if (w.includes(needle) || (c !== null && c.includes(collapse(needle)))) return true;
  }
  for (const needle of layer.compound) {
    if (w.startsWith(needle) || (c !== null && c.startsWith(collapse(needle)))) return true;
  }
  return false;
}

/**
 * `ws` sözcükleri, `ok[i]` i. sözcüğün muaf olup olmadığı.
 *
 * Sözcükler arası arama ("a m k", "amına koyayım", "fick dich") birleşik metinde
 * yapılır ama bir eşleşme ancak (1) bir sözcüğün BAŞINDA başlıyor ve (2) en az bir
 * sözcük sınırını aşıyorsa sayılır. Sözcük içindeki eşleşmeleri zaten `wordHit`
 * buluyor; iki kural "Bu eksiktir" ⊃ "siktir" ve "İslam Çıkrıkçı" ⊃ "amcik" gibi
 * adlar arası rastlantıları eliyor (CNT-4).
 */
function matches(ws: string[], ok: boolean[], layer: Layer): boolean {
  if (!ws.length) return false;
  const joined = ws.join("");

  if (layer.exact.has(joined)) return true;
  for (let i = 0; i < ws.length; i++) if (!ok[i] && wordHit(ws[i], layer)) return true;
  if (ws.length < 2) return false;

  if (layer.words.has(joined)) return true; // "a.m.k" → "amk"
  const starts: number[] = [];
  let pos = 0;
  for (const w of ws) { starts.push(pos); pos += w.length; }
  for (const needle of [...layer.infix, ...layer.compound]) {
    for (let i = 0; i < ws.length - 1; i++) {
      if (needle.length > ws[i].length && joined.startsWith(needle, starts[i])) return true;
    }
  }
  // Uzatılmış yazım ("o r o s p u u u") daraltılınca yalnız BAŞTAN aranır:
  // serbest içerik araması "sayarak" ⊃ collapse("yarrak") gibi tuzaklara düşüyor.
  if (!ok[0] && ELONGATED.test(joined)) {
    const shrunk = collapse(joined);
    for (const needle of layer.infix) if (shrunk.startsWith(collapse(needle))) return true;
  }
  return false;
}

function abusiveWords(ws: string[]): boolean {
  if (!ws.length) return false;
  const ok = ws.map(allowed);
  return matches(ws, ok, TR_LAYER) || matches(ws.map(asciiFold), ok, ASCII_LAYER);
}

/** Jokerin denendiği harfler (Türkçe + Latin). */
const WILD_LETTERS = [..."abcçdefgğhıijklmnoöpqrsştuüvwxyz"];
/** En çok bu kadar joker açılır (32² = 1024 deneme); fazlası sansür değil süs. */
const MAX_WILD = 2;

function expandWild(w: string): string[] {
  let out = [w];
  while (out[0].includes(WILD)) {
    const next: string[] = [];
    for (const v of out) for (const l of WILD_LETTERS) next.push(v.replace(WILD, l));
    out = next;
  }
  return out;
}

/** Küfür/hakaret içeriyor mu — iki alanın da ortak süzgeci. */
function abusive(text: string): boolean {
  const all = words(text);
  if (!all.length) return false;
  // Joker düşürülmüş hâl: "f*ck" → "fck", "a.m*k" gibi karışık yazımlar.
  if (abusiveWords(all.map((w) => w.split(WILD).join("")))) return true;
  // Sansür yıldızı: jokerli her sözcük tek başına, her harfle denenir.
  for (const w of all) {
    const n = w.split(WILD).length - 1;
    if (n === 0 || n > MAX_WILD || w.length > 40) continue;
    for (const v of expandWild(w)) if (abusiveWords([v])) return true;
  }
  return false;
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
