/**
 * Züritüütsch örnek cümleleri denetler:
 *   `node data/zurich/beispiel/check.mjs a1-001`
 *
 * Almanca hattındaki denetleyicinin lehçe karşılığı, iki farkla:
 *
 *   - Kelime arama kuralları Züritüütsch'e göre: ön ek listesi başka
 *     (`abe`, `ufe`, `zäme`), umlaut düzleştirmesi aynı ama uzun ünlü çift
 *     yazıldığı için kök karşılaştırması ünlü tekrarını yutuyor
 *     (`Huus` ↔ `Hus`, `bliibe` ↔ `blibe`).
 *   - Çeviri denetimi yok: lehçe cümlesinin Türkçe ve İngilizce karşılığı
 *     ayrıca yazılmıyor, Almanca cümleden devralınıyor. Buradaki asıl soru
 *     cümlenin **aynı şeyi söyleyip söylemediği**; mekanik olarak
 *     ölçülebilen kısmı sayılar ve özel isimlerin örtüşmesi.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const ROOT = new URL("../../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();
const IN = `${ROOT}data/zurich/beispiel/in`;
const OUT = `${ROOT}data/zurich/beispiel/out`;

/**
 * Karşılaştırma biçimi: umlaut düzleşir, ß→ss, tire düşer, uzun ünlünün çift
 * yazımı teke iner. Son iki kural Dieth yazımının doğrudan sonucu — aynı kelime
 * `Ziit` ve `Zit` diye iki türlü yazılabiliyor, ve `T-Shirt` madde başlığında
 * tireli, cümlede de tireli ama kök karşılaştırması tireyi atıyordu.
 */
const flat = (t) =>
  String(t ?? "")
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ß/g, "ss")
    .replace(/[àâá]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[îï]/g, "i")
    .replace(/ç/g, "c")
    .replace(/-/g, "")
    .replace(/([aeiou])\1+/g, "$1");

/** Aynı harflere inen anahtarlar birleşir: "gaa" (gehen) ve "gää" (geben). */
const flatKey = (t) => flat(t).replace(/[^a-z]/g, "");

/** Züritüütsch'te çekimde kökten kopabilen ön ekler. */
const SEPARABLE =
  /^(abe|ufe|ine|use|witer|zame|vora|zrug|verbi|fascht|furt|unter|uber|vor|zue|na|dur|mit|los|fri|wag|har|us|uf|ab|um|bi|hi|a)(.{2,})$/;

/**
 * Züritüütsch'ün düzensiz fiilleri.
 *
 * Almanca tarafındakiyle aynı sorun ama daha keskin: lehçede en sık kullanılan
 * fiillerin gövdesi çekimde tanınmaz hâle geliyor (sii → isch, choo → chunt,
 * wöle → wotsch). Mevcut 8266 cümle üzerinde ölçüldü — bu liste olmadan
 * denetleyici doğru cümlelerin %2.8'ini "kelime yok" diye reddediyordu.
 */
const IRREGULAR = {
  sii: ["isch", "bisch", "bi", "sind", "sind", "gsii", "wär"],
  haa: ["hat", "hät", "hasch", "han", "händ", "ghaa"],
  gaa: ["gaat", "gaasch", "gang", "gange"],
  choo: ["chunt", "chunsch", "chume", "chomed", "choo"],
  gsee: ["gsent", "gsee", "gsehsch"],
  gää: ["git", "gisch", "gaben", "gee"],
  nää: ["nimt", "nimsch", "name", "gno"],
  schtaa: ["schtaat", "gschtande"],
  laa: ["laat", "laasch", "gla"],
  tue: ["tuet", "tuesch", "taa"],
  wusse: ["wais", "waisch", "wusst"],
  sage: ["sait", "saisch", "gsait"],
  wole: ["wot", "wotsch", "wand", "wei"],
  muese: ["mues", "muesch", "mand"],
  chone: ["cha", "chasch", "chond", "chond"],
  dorfe: ["darf", "darfsch"],
  solle: ["sott", "sottsch"],
  moge: ["mag", "magsch"],
  esse: ["isst", "gasse"],
  gfale: ["gfalt", "gfalsch"],
};

// Anahtarlar düzleştirilmiş biçimle aranıyor; "gaa" ile "gää" aynı harflere
// indiği için değerleri birleştiriliyor.
const IRREGULAR_RAW = IRREGULAR;
for (const [k, v] of Object.entries(IRREGULAR_RAW)) {
  const key = flatKey(k);
  IRREGULAR[key] = [...new Set([...(IRREGULAR[key] ?? []), ...v])];
}

/**
 * Madde başlığından gerçek kelimelere açılım.
 * "ere/em/en" üç ayrı biçimdir; dönüşlü zamir cümlede çekimlenir ("sich
 * aamälde" → "mich aamälde") ve başlığın parçası sayılmaz.
 */
function forms(raw) {
  const out = new Set();
  for (const alt of String(raw ?? "").split("/")) {
    const s = alt
      .replace(/^\s*(de|d|s)\s+/i, "")
      .replace(/\b(sich|mich|mi|dich|di|eus|sech)\b/gi, " ")
      .replace(/[.,]+$/, "")
      .replace(/\s+/g, " ")
      .trim();
    if (s) out.add(s);
  }
  return out.size ? [...out] : [String(raw ?? "")];
}

/** Çekim ekleri — her biri ayrı ayrı denenir, biri kısa kök bırakırsa atlanır. */
const SUFFIXES = ["ere", "le", "et", "st", "t", "n", "e", "s"];

/**
 * Bir parçanın aranacak kökleri.
 *
 * Tek bir kök yetmiyor: "fääle" için "-le" atılınca geriye "fa" kalıyor ve
 * arama çöküyor, "-e" atılınca ise "fal" kalıyor ve "fäält" bulunuyor. Bu
 * yüzden ekler tek tek deneniyor ve üç harften kısa kalan sonuç atılıyor.
 * Sınırsız kısaltma tehlikeli olurdu: "Disco" üç harfe inseydi "Diskothek"
 * de kabul edilirdi — oysa yakalanması gereken tam olarak o.
 */
function roots(part) {
  const bare = flatKey(part);
  const out = new Set([bare]);
  for (const suf of SUFFIXES) {
    if (bare.endsWith(suf) && bare.length - suf.length >= 3) out.add(bare.slice(0, -suf.length));
  }
  // Çoğulda gövde ünlüsü a → e oluyor ve lehçede ä ile değil e ile yazılıyor
  // (Gascht → Gescht, Schtadt → Schtedt); düzleştirme bunu yakalamıyor.
  for (const r of [...out]) if (r.includes("a")) out.add(r.replace(/a([^a]*)$/, "e$1"));
  // Perfekt'te ayrılabilir fiilin ön eki kopmaz, araya "g" girer:
  // "aahaa" → "aaghaa", "uffale" → "ufgfale", "ablehne" → "abglehnt".
  // Ön ek ayrı bir kelime olarak aranınca bu biçimler hiç bulunamıyordu.
  const sep = bare.match(SEPARABLE);
  if (sep) out.add(`${sep[1]}g${sep[2]}`);
  return [...out].filter(Boolean);
}

function contains(sentence, headword) {
  const hay = flat(sentence);
  const kelime = (t) => new RegExp(`(?<![a-z])${t}(?![a-z])`).test(hay);
  const bas = (t) => new RegExp(`(?<![a-z])${t}`).test(hay);
  const kok = (r) => hay.includes(r.slice(0, Math.max(4, r.length - 2)));

  /**
   * Aramanın katılığı kökün değil **madde başlığının** uzunluğuna bakar.
   *
   * Kök, uzun ünlü teke indiği için başlıktan kısa olabiliyor ("Oor" → "or")
   * ve iki harfli sayılıp tam kelime aranınca "Ooreweh" içinde bulunamıyordu.
   * Karar başlığın kendi uzunluğuyla veriliyor: iki harfli madde tam kelime
   * olmalı ("ab" gövde sayılsa "aber" de sayılırdı), üç harfli madde bileşik
   * içinde de durabilir, dörtten uzunu serbest gövdedir.
   */
  const ara = (r, uzunluk) => {
    if (!r) return false;
    if (uzunluk <= 2) return kelime(r);
    if (uzunluk === 3) return bas(r) || hay.includes(r);
    return kok(r);
  };

  const parcaVar = (part) => {
    const bare = flatKey(part);
    if (!bare) return true;
    const uzunluk = part.replace(/[^\p{L}]/gu, "").length;
    if (roots(part).some((r) => ara(r, uzunluk))) return true;

    const sep = bare.match(SEPARABLE);
    if (sep && kelime(sep[1])) {
      const govde = sep[2];
      if (roots(govde).some((r) => ara(r, govde.length))) return true;
      const irrSep = IRREGULAR[sep[2]];
      if (irrSep?.some((f) => ara(flatKey(f), flatKey(f).length))) return true;
    }

    const irr = IRREGULAR[bare];
    return irr ? irr.some((f) => ara(flatKey(f), flatKey(f).length)) : false;
  };

  return forms(headword).some((form) => form.split(/\s+/).every(parcaVar));
}

const words_ = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const sayilar = (s) => (s.match(/\d+/g) ?? []).sort().join(",");

function denetle(paket) {
  const src = JSON.parse(readFileSync(`${IN}/${paket}.json`, "utf8"));
  const hatalar = [];
  const uyarilar = [];
  if (!existsSync(`${OUT}/${paket}.json`)) return { paket, yok: true, hatalar, uyarilar };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${paket}.json`, "utf8"));
  } catch (e) {
    return { paket, hatalar: [`  [bozuk json] ${e.message}`], uyarilar, madde: 0 };
  }

  const byId = new Map(out.map((r) => [r.id, r]));
  const eksik = src.kelimeler.filter((k) => !byId.has(k.id)).map((k) => k.id);
  if (eksik.length) hatalar.push(`  [eksik madde] ${eksik.join(", ")}`);
  const fazla = out.map((r) => r.id).filter((id) => !src.kelimeler.some((k) => k.id === id));
  if (fazla.length) hatalar.push(`  [pakete ait olmayan] ${fazla.join(", ")}`);

  let korunan = 0;
  for (const k of src.kelimeler) {
    const r = byId.get(k.id);
    if (!r) continue;
    const b = (r.beispiel ?? "").trim();
    const H = (etiket, mesaj) => hatalar.push(`  [${etiket}] ${k.id} ${k.gsw} — ${mesaj}`);
    const U = (etiket, mesaj) => uyarilar.push(`  [${etiket}] ${k.id} ${k.gsw} — ${mesaj}`);

    if (!b) {
      H("boş cümle", "beispiel yok");
      continue;
    }
    if (b === k.mevcutGsw) korunan++;
    if (!/[.!?]$/.test(b)) H("bozuk cümle", `sonu noktalama değil: "${b}"`);
    if (/^\d+[.)]/.test(b) || /\s\d+\.\s/.test(b)) H("numaralı derleme", `"${b}"`);
    if (/[.!?]\s+\S/.test(b.replace(/[.!?]$/, ""))) H("çok cümleli", `"${b}"`);
    if (/\bß\b|ß/.test(b)) H("ß kullanılmış", `Züritüütsch'te ß yok: "${b}"`);
    const n = words_(b);
    if (n < 3 || n > 13) H("cümle uzunluğu", `${n} kelime: "${b}"`);
    if (!contains(b, k.gsw)) H("kelime cümlede yok", `"${k.gsw}" ∉ "${b}"`);
    // Çeviri Almanca cümleden devralınıyor: sayılar örtüşmezse çeviri yalan söyler.
    if (sayilar(b) !== sayilar(k.beispielDe))
      H("sayı uyuşmazlığı", `"${k.beispielDe}" ↔ "${b}" — çeviri devralınamaz`);
    if (/\?$/.test(b) !== /\?$/.test(k.beispielDe))
      U("soru uyuşmazlığı", `"${k.beispielDe}" ↔ "${b}"`);
  }

  return { paket, hatalar, uyarilar, madde: out.length, korunan };
}

const hepsi = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const secili = ARG === "all" ? hepsi : hepsi.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!secili.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let hata = 0;
let uyari = 0;
let bekleyen = 0;
let madde = 0;
let korunan = 0;
for (const p of secili) {
  const r = denetle(p);
  if (r.yok) {
    bekleyen++;
    if (secili.length === 1) console.log(`${p}: çıktı yok`);
    continue;
  }
  hata += r.hatalar.length;
  uyari += r.uyarilar.length;
  madde += r.madde;
  korunan += r.korunan ?? 0;
  if (r.hatalar.length || r.uyarilar.length) {
    console.log(`\n${p}  (${r.madde} madde)`);
    r.hatalar.forEach((h) => console.log(h));
    r.uyarilar.forEach((u) => console.log(u));
  } else if (secili.length === 1) {
    console.log(`${p}: ${r.madde} madde, temiz (${r.korunan} korundu).`);
  }
}

console.log(
  `\nözet: ${secili.length - bekleyen}/${secili.length} paket üretilmiş, ${madde} madde (${korunan} korundu) · ${hata} hata · ${uyari} uyarı`,
);
process.exit(hata ? 1 : 0);
