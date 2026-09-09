/**
 * Kümülatif kelime kapısı — İNGİLİZCE.
 *
 * NEDEN AYRI DOSYA. `vocab-gate.cjs` Almancaya özgü ve parametrelenemez:
 * havuzu `data/app/words.json`, sözcük regexleri `[a-zäöüß]`, biçimbilimi
 * ayrılabilen önek / ge-…-t ortacı / da-bileşiği üzerine kurulu ve kümülatif
 * kümesini `mobile/src/data/lessons/de-*.json` dosyalarından alıyor. Her
 * kuralı başka bir dilin kuralı; içine bir `if (dil === "en")` koymak iki
 * dilin morfolojisini tek gövdede tutmak olurdu ve ikisi de okunmaz hale
 * gelirdi.
 *
 * VERDİĞİ ŞEY. Bir seviyeye kadar ÖĞRETİLMİŞ sözcük kümesi ve bir metnin o
 * kümenin dışına ne kadar çıktığını ölçen `olc`. Çıktı biçimi Almanca
 * kapıyla aynı (`{ tok, disi }`), böylece denetim iki kursu tek kod yoluyla
 * raporluyor.
 *
 * KESİN BİR KAPI DEĞİL — Almanca kapıda olduğu gibi. İngilizcede çekim zayıf
 * ama TÜRETİM güçlü: `predict → predictability → predictably`. Kapı türetim
 * eklerini soyup köke bakıyor; bu bazen fazla geçirgen (kökü bilen öğrenci
 * her türevini bilmez), bazen fazla sıkı (deyimsel türev kökten çıkmaz).
 * Amaç oranı görmek ve gözden kaçan ağır sözcüğü yakalamak.
 */
const fs = require("fs");
const R = process.cwd();

/* ── veri ─────────────────────────────────────────────────────────────── */

/** Havuz JSONL: her satır bir kelime kaydı. `de` alanı HEDEF terimi tutuyor
 *  (tarihsel ad; bkz. scripts/seed-english.ts). */
const pool = fs
  .readFileSync(`${R}/data/app/words-en.json`, "utf8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

/** Ders sözlükçesi yalnız A1 ve A2 için var; üst seviyelerde havuz tek kaynak. */
const dersler = (lv) => {
  const f = `${R}/mobile/src/data/lessons/en-${lv}.json`;
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : [];
};

/* ── serbest sözcükler ────────────────────────────────────────────────── */

/**
 * Her seviyede serbest: işlev sözcükleri, sayılar, selamlaşma.
 *
 * Bunlar havuzda olsun olmasın ölçüme girmiyor. Sebep pratik: bir metnin
 * `the`, `of`, `which` kullanması hiçbir seviye hakkında bilgi vermiyor ve
 * havuzda eksik kalan tek bir işlev sözcüğü bütün oranı bozuyor.
 */
const SERBEST = new Set(
  `a an the this that these those there here it its
i you he she we they me him her us them my your his our their mine yours hers ours theirs
myself yourself himself herself itself ourselves yourselves themselves oneself
and or but so because if when while although though unless until since as than whether
whereas however nevertheless nonetheless moreover furthermore therefore thus hence
of in on at to for with from by about into over under after before during between among across
through against without within upon toward towards onto off out up down near beside behind
is are was were be been being am do does did done doing have has had having
will would shall should can could may might must ought need dare used
not no nor only just also very too much many more most some any all both each every either neither
few little less least several enough own same other another such quite rather almost
what which who whom whose where why how when
whatever whenever wherever whoever however whichever
none even ever never always often sometimes usually already yet still again
sixty seventy eighty ninety
one two three four five six seven eight nine ten eleven twelve twenty thirty forty fifty
hundred thousand million first second third fourth fifth
percent per cent euro euros pound pounds dollar dollars
mr mrs ms dr sir madam dear yours sincerely faithfully regards best wishes
hello hi thanks thank please sorry yes ok okay
now then today tomorrow yesterday morning afternoon evening night week month year day days
minute minutes hour hours second seconds o'clock
else cannot something someone somebody anything anyone anybody
everything everyone everybody nothing nobody
per hour kilometre kilometres metre metres
monday tuesday wednesday thursday friday saturday sunday
january february march april june july august september october november december
true false right wrong good bad new old
gap speaker writer text question answer
gonna wanna`
    .split(/\s+/)
    .filter(Boolean),
);

/* ── biçimbilim ───────────────────────────────────────────────────────── */

/** Kuralın üretemediği biçimler. Liste bilerek kısa: yalnız çok sık olanlar. */
const DUZENSIZ = {
  was: "be", were: "be", been: "be", am: "be", is: "be", are: "be",
  went: "go", gone: "go", took: "take", taken: "take", made: "make",
  said: "say", saw: "see", seen: "see", came: "come", got: "get", gotten: "get",
  gave: "give", given: "give", knew: "know", known: "know", thought: "think",
  brought: "bring", bought: "buy", caught: "catch", taught: "teach",
  found: "find", felt: "feel", held: "hold", kept: "keep", left: "leave",
  lost: "lose", met: "meet", paid: "pay", ran: "run", sat: "sit",
  sold: "sell", sent: "send", spoke: "speak", spoken: "speak", spent: "spend",
  stood: "stand", told: "tell", understood: "understand", wore: "wear",
  won: "win", wrote: "write", written: "write", began: "begin", begun: "begin",
  broke: "break", broken: "break", built: "build", chose: "choose", chosen: "choose",
  drove: "drive", driven: "drive", ate: "eat", eaten: "eat", fell: "fall", fallen: "fall",
  flew: "fly", flown: "fly", forgot: "forget", forgotten: "forget",
  grew: "grow", grown: "grow", heard: "hear", hid: "hide", hidden: "hide",
  laid: "lay", led: "lead", lent: "lend", meant: "mean", rose: "rise", risen: "rise",
  shown: "show", drawn: "draw", drew: "draw", blown: "blow", blew: "blow",
  became: "become", become: "become", sang: "sing", sung: "sing", slept: "sleep", stole: "steal", stolen: "steal",
  swam: "swim", swum: "swim", threw: "throw", thrown: "throw", woke: "wake", woken: "wake",
  children: "child", people: "person", men: "man", women: "woman",
  feet: "foot", teeth: "tooth", mice: "mouse", geese: "goose",
  lives: "life", wives: "wife", knives: "knife", leaves: "leaf",
  shelves: "shelf", halves: "half", thieves: "thief",
  better: "good", best: "good", worse: "bad", worst: "bad", further: "far", furthest: "far",
};

/** Kısaltmalar çözülüyor: "don't" → "do not". Katlama değil, ÇÖZÜMLEME. */
const KISALTMA = [
  [/\bcan't\b/gi, "can not"], [/\bwon't\b/gi, "will not"], [/\bshan't\b/gi, "shall not"],
  [/\bn't\b/gi, " not"], [/\b'll\b/gi, " will"], [/\b're\b/gi, " are"],
  [/\b've\b/gi, " have"], [/\b'd\b/gi, " would"], [/\b'm\b/gi, " am"],
  [/\b's\b/gi, " is"], [/\b's\b/g, ""],
];

/**
 * Bir belirteci olası KÖK biçimlerine indirger.
 *
 * Sırası önemli: önce düzensiz tablo, sonra çekim ekleri, en sonda türetim
 * ekleri. Türetim en sonda çünkü en geçirgen adım; `happiness`ten `happy`ye
 * inmek doğru ama `business`ten `busy`ye inmek yanlış — o yüzden türetim
 * adayları yalnızca havuzda GERÇEKTEN bulunuyorsa kabul ediliyor.
 */
/** Tek adımlık indirgeme: bir belirteçten bir adım geriye giden adaylar. */
function adim(w) {
  const out = new Set();
  const ekle = (x) => { if (x && x.length >= 2 && x !== w) out.add(x); };
  const cift = (x) => (/([bcdfgklmnprstvz])\1$/.test(x) ? x.slice(0, -1) : null);
  if (DUZENSIZ[w]) ekle(DUZENSIZ[w]);

  // çekim: çoğul / 3. tekil
  if (w.endsWith("ies") && w.length > 4) ekle(w.slice(0, -3) + "y");
  if (w.endsWith("ves") && w.length > 4) { ekle(w.slice(0, -3) + "f"); ekle(w.slice(0, -3) + "fe"); }
  if (w.endsWith("es") && w.length > 3) ekle(w.slice(0, -2));
  if (w.endsWith("s") && !w.endsWith("ss") && w.length > 3) ekle(w.slice(0, -1));

  // çekim: geçmiş / ortaç
  if (w.endsWith("ied") && w.length > 4) ekle(w.slice(0, -3) + "y");
  if (w.endsWith("ed") && w.length > 3) { ekle(w.slice(0, -2)); ekle(w.slice(0, -1)); ekle(cift(w.slice(0, -2))); }

  // çekim: -ing
  if (w.endsWith("ing") && w.length > 4) { ekle(w.slice(0, -3)); ekle(w.slice(0, -3) + "e"); ekle(cift(w.slice(0, -3))); }

  // derece
  if (w.endsWith("iest") && w.length > 5) ekle(w.slice(0, -4) + "y");
  if (w.endsWith("ier") && w.length > 4) ekle(w.slice(0, -3) + "y");
  if (w.endsWith("est") && w.length > 4) { ekle(w.slice(0, -3)); ekle(w.slice(0, -2)); ekle(cift(w.slice(0, -3))); }
  if (w.endsWith("er") && w.length > 3) { ekle(w.slice(0, -2)); ekle(w.slice(0, -1)); ekle(cift(w.slice(0, -2))); }

  /*
    Türetim ekleri. Sıra uzundan kısaya: `predictability` önce `-ility → -le`
    ile `predictable`a inmeli, `-ity` ile `predictabil`e değil. Tek adımda
    köke varmak şart değil — `adim` yinelemeli çağrılıyor ve zincir kendi
    kendine tamamlanıyor (predictability → predictable → predict).
  */
  for (const [ek, yerine] of [
    ["bility", "ble"], ["ility", "le"], ["ically", "ic"], ["ically", "y"],
    ["ation", "e"], ["ation", ""], ["ition", "e"], ["ness", ""],
    ["ment", ""], ["ance", ""], ["ence", ""], ["ancy", ""], ["ency", ""],
    ["ship", ""], ["hood", ""], ["able", ""], ["able", "e"], ["ible", ""],
    ["less", ""], ["atic", ""], ["ally", "al"], ["ally", ""],
    ["tion", "te"], ["tion", ""], ["sion", "de"], ["sion", "se"], ["sion", ""],
    ["ihood", "y"], ["icable", "y"], ["ication", "y"],
    ["ity", "e"], ["ity", ""], ["ist", ""], ["ism", ""], ["ful", ""],
    ["ive", "e"], ["ive", ""], ["ous", ""], ["ise", ""], ["ize", ""], ["ise", "ize"], ["ize", "ise"],
    ["isation", "ization"], ["ization", "isation"],
    ["bly", "ble"], ["ply", "ple"], ["ily", "y"], ["ly", ""], ["ly", "e"],
    ["al", ""], ["al", "e"], ["ic", ""], ["ry", ""], ["cy", "t"],
    // Havuzda kökü BULUNAN ama kapının bağlayamadığı zincirler:
    // growth→grow, retrieval→retrieve, prohibition→prohibit, widen→wide,
    // deception→deceive, verifiable→verify, practise→practice.
    ["th", ""], ["ion", ""], ["en", ""], ["en", "e"],
    ["ception", "ceive"], ["iable", "y"], ["ise", "ice"], ["ice", "ise"],
  ]) {
    if (w.endsWith(ek) && w.length > ek.length + 2) ekle(w.slice(0, -ek.length) + yerine);
  }

  // olumsuzluk ve yön önekleri
  for (const on of ["un", "in", "im", "ir", "il", "dis", "non", "mis", "re", "over", "under", "pre", "post", "anti", "co"]) {
    if (w.startsWith(on) && w.length > on.length + 3) ekle(w.slice(on.length));
  }
  return out;
}

/**
 * Bir belirteçten ulaşılabilecek bütün kök adayları — sabit noktaya kadar.
 *
 * Tek geçiş yetmiyor: İngilizcede türetim zincirleniyor
 * (`predict → predictable → predictability`) ve kapı zincirin her halkasını
 * çözebilmeli. Derinlik dörtle sınırlı ve küme büyüdükçe duruyor; sınırsız
 * indirgeme her sözcüğü iki harfe indirir ve kapı hiçbir şeyi yakalamaz.
 */
function kokler(w) {
  let frontier = new Set([w]);
  const all = new Set([w]);
  for (let d = 0; d < 4 && all.size < 60; d++) {
    const next = new Set();
    for (const x of frontier) for (const y of adim(x)) if (!all.has(y)) { all.add(y); next.add(y); }
    if (!next.size) break;
    frontier = next;
  }
  return all;
}

/* ── izin kümesi ──────────────────────────────────────────────────────── */

const parcala = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[^a-z' -]/g, " ")
    .split(/[\s'-]+/)
    .filter((x) => x.length > 1);

const ONCEKI = { a1: [], a2: ["A1"], b1: ["A1", "A2"], b2: ["A1", "A2", "B1"], c1: ["A1", "A2", "B1", "B2"] };

const katman = (lv) => {
  const acc = new Set();
  for (const r of pool) if (r.niveau === lv) for (const w of parcala(r.de)) acc.add(w);
  return acc;
};

const bellek = new Map();
/**
 * Seviyeye kadar öğretilmiş sözcükler.
 *
 * Alt seviyeler HAVUZ KATMANIYLA giriyor, ders sözlükçesiyle değil: Almanca
 * kapıda olduğu gibi, patika havuzun tamamını öğretmiyor ama kart motoru
 * seviye bandındaki her sözcüğü öğrenciye gösteriyor. Kendi seviyesi de havuz
 * katmanıyla giriyor; A1 ve A2'de ayrıca ders sözlükçesi ve kalıpları
 * ekleniyor, çünkü ders metinleri havuzda olmayan bağlaç ve kalıp taşıyor.
 */
function izinKumesi(seviye = "a1") {
  const lv = String(seviye).toLowerCase();
  if (bellek.has(lv)) return bellek.get(lv);
  const acc = new Set(SERBEST);
  for (const alt of ONCEKI[lv] || []) for (const w of katman(alt)) acc.add(w);
  for (const w of katman(lv.toUpperCase())) acc.add(w);
  for (const l of dersler(lv)) {
    for (const v of l.vocab || []) for (const w of parcala(v.de)) acc.add(w);
    for (const p of l.patterns || []) for (const w of parcala(p.de)) acc.add(w);
  }
  bellek.set(lv, acc);
  return acc;
}

/* ── ölçüm ────────────────────────────────────────────────────────────── */

const SAYI_RE = /^(\d+|[a-z]+(?:teen|ty)|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|hundred|thousand|million|billion)(?:st|nd|rd|th|s)?$/;

/**
 * Sıra sayıları — açık liste.
 *
 * SAYI_RE bunları yakalayamıyor çünkü biçim düzenli değil: `nine`+`th` "ninth"
 * vermiyor, `twelve`+`th` "twelfth" vermiyor. Kalıbı `[a-z]+th` diye gevşetmek
 * ise "month", "north", "health", "truth" sözcüklerini de sayı sayardı.
 * Sıra sayıları kapalı bir sınıf ve tıpkı `first`–`fifth` gibi hiçbir seviye
 * hakkında bilgi vermiyor; o yüzden ölçüme girmiyorlar.
 */
const SIRA_RE = /^(sixth|seventh|eighth|ninth|tenth|eleventh|twelfth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|thirtieth|fortieth|fiftieth|sixtieth|seventieth|eightieth|ninetieth|hundredth|thousandth)$/;

/**
 * `ham` metnini, `seviye`ye kadar öğretilenlere göre ölç.
 *
 * `ekIzin`: metne özel eklemeler (egzersizin kendi sözlükçesi gibi).
 * Döner: `{ tok, disi }` — ölçülen belirteçler ve havuz dışı kalanlar.
 */
function olc(ham0, seviye = "a1", ekIzin = []) {
  const izin = new Set(izinKumesi(seviye));
  for (const w of ekIzin) for (const x of parcala(w)) izin.add(x);

  let ham = String(ham0 || "");
  // "14th" belirteç üretirken rakam düşüyor ve geriye "th" kalıyordu; ek
  // rakamla birlikte siliniyor ki sayı, sayı olarak elensin.
  ham = ham.replace(/(\d)(st|nd|rd|th)\b/gi, "$1");
  // E-posta adresi ve alan adı sözcük değil: "kemal@post.net" ölçüme "post"
  // ve "net" sokuyordu ve ikisi de metnin kelime seviyesi hakkında hiçbir şey
  // söylemiyor. Adres bütün olarak siliniyor.
  ham = ham.replace(/\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/gi, " ");
  ham = ham.replace(/\bhttps?:\/\/\S+|\bwww\.\S+/gi, " ");
  for (const [re, to] of KISALTMA) ham = ham.replace(re, to);

  /*
    ÖZEL AD MUAFİYETİ. Cümle içinde büyük harfle başlayan ve havuzda hiç
    olmayan bir sözcük büyük olasılıkla bir addır (Marta, Porto, Alsdale).
    Onları "seviye dışı kelime" saymak metni haksız yere zor gösterirdi.
    Cümle başındaki büyük harf muaf değil: orada büyük harf ad işareti değil,
    yazım kuralı.
  */
  const adlar = new Set();
  for (const m of ham.matchAll(/[a-z,;:]\s+([A-Z][a-z]{2,})\b/g)) adlar.add(m[1].toLowerCase());
  for (const m of ham.matchAll(/\b([A-Z][a-z]+)\s+([A-Z][a-z]+)\b/g)) { adlar.add(m[1].toLowerCase()); adlar.add(m[2].toLowerCase()); }

  const tok = [];
  const disi = [];
  for (const m of ham.toLowerCase().matchAll(/[a-z][a-z'-]*/g)) {
    const w = m[0].replace(/^'+|'+$/g, "");
    if (w.length < 2) continue;
    if (SAYI_RE.test(w) || SIRA_RE.test(w)) continue;
    tok.push(w);
    if (adlar.has(w)) continue;
    // Tireli bileşik: parçalarının hepsi biliniyorsa bileşik de bilinir.
    const parts = w.includes("-") ? w.split("-").filter(Boolean) : [w];
    // Bileşiğin sayı olan parçası da elenir; yoksa "fifteen-year-old" bilinmeyen
    // sayılırdı çünkü sayılar izin kümesinde değil, ölçümün dışında tutuluyor.
    const bilinen = parts.every(
      (pt) => SAYI_RE.test(pt) || SIRA_RE.test(pt) || [...kokler(pt)].some((k) => izin.has(k)),
    );
    if (!bilinen) disi.push(w);
  }
  return { tok, disi };
}

/** Kısa özet — betiklerin bastığı satır. */
function ozet(ham, seviye, ekIzin) {
  const { tok, disi } = olc(ham, seviye, ekIzin);
  const freq = new Map();
  for (const d of disi) freq.set(d, (freq.get(d) ?? 0) + 1);
  return {
    pct: tok.length ? Math.round((100 * disi.length) / tok.length) : 0,
    tok: tok.length,
    disi: disi.length,
    top: [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w, n]) => `${w}×${n}`),
  };
}

module.exports = { SERBEST, olc, ozet, izinKumesi, kokler, parcala };
