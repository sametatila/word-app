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
  const hasWord = (t) => new RegExp(`(?<![a-z])${t}(?![a-z])`).test(hay);
  const hasStart = (t) => new RegExp(`(?<![a-z])${t}`).test(hay);
  const hasRoot = (r) => hay.includes(r.slice(0, Math.max(4, r.length - 2)));

  /**
   * Aramanın katılığı kökün değil **madde başlığının** uzunluğuna bakar.
   *
   * Kök, uzun ünlü teke indiği için başlıktan kısa olabiliyor ("Oor" → "or")
   * ve iki harfli sayılıp tam kelime aranınca "Ooreweh" içinde bulunamıyordu.
   * Karar başlığın kendi uzunluğuyla veriliyor: iki harfli madde tam kelime
   * olmalı ("ab" gövde sayılsa "aber" de sayılırdı), üç harfli madde bileşik
   * içinde de durabilir, dörtten uzunu serbest gövdedir.
   */
  const search = (r, headLen) => {
    if (!r) return false;
    if (headLen <= 2) return hasWord(r);
    if (headLen === 3) return hasStart(r) || hay.includes(r);
    return hasRoot(r);
  };

  const partPresent = (part) => {
    const bare = flatKey(part);
    if (!bare) return true;
    const headLen = part.replace(/[^\p{L}]/gu, "").length;
    if (roots(part).some((r) => search(r, headLen))) return true;

    const sep = bare.match(SEPARABLE);
    if (sep && hasWord(sep[1])) {
      const stem = sep[2];
      if (roots(stem).some((r) => search(r, stem.length))) return true;
      const irrSep = IRREGULAR[sep[2]];
      if (irrSep?.some((f) => search(flatKey(f), flatKey(f).length))) return true;
    }

    const irr = IRREGULAR[bare];
    return irr ? irr.some((f) => search(flatKey(f), flatKey(f).length)) : false;
  };

  return forms(headword).some((form) => form.split(/\s+/).every(partPresent));
}

const words_ = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const numbers = (s) => (s.match(/\d+/g) ?? []).sort().join(",");

function inspect(packet) {
  const src = JSON.parse(readFileSync(`${IN}/${packet}.json`, "utf8"));
  const errors = [];
  const warnings = [];
  if (!existsSync(`${OUT}/${packet}.json`)) return { packet, absent: true, errors, warnings };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${packet}.json`, "utf8"));
  } catch (e) {
    return { packet, errors: [`  [bozuk json] ${e.message}`], warnings, items: 0 };
  }

  const byId = new Map(out.map((r) => [r.id, r]));
  const missing = src.words.filter((k) => !byId.has(k.id)).map((k) => k.id);
  if (missing.length) errors.push(`  [eksik madde] ${missing.join(", ")}`);
  const extra = out.map((r) => r.id).filter((id) => !src.words.some((k) => k.id === id));
  if (extra.length) errors.push(`  [pakete ait olmayan] ${extra.join(", ")}`);

  let kept = 0;
  for (const k of src.words) {
    const r = byId.get(k.id);
    if (!r) continue;
    const b = (r.beispiel ?? "").trim();
    const H = (label, message) => errors.push(`  [${label}] ${k.id} ${k.gsw} — ${message}`);
    const U = (label, message) => warnings.push(`  [${label}] ${k.id} ${k.gsw} — ${message}`);

    if (!b) {
      H("boş cümle", "beispiel yok");
      continue;
    }
    if (b === k.currentGsw) kept++;
    if (!/[.!?]$/.test(b)) H("bozuk cümle", `sonu noktalama değil: "${b}"`);
    if (/^\d+[.)]/.test(b) || /\s\d+\.\s/.test(b)) H("numaralı derleme", `"${b}"`);
    if (/[.!?]\s+\S/.test(b.replace(/[.!?]$/, ""))) H("çok cümleli", `"${b}"`);
    if (/\bß\b|ß/.test(b)) H("ß kullanılmış", `Züritüütsch'te ß yok: "${b}"`);
    const n = words_(b);
    if (n < 3 || n > 13) H("cümle uzunluğu", `${n} kelime: "${b}"`);
    if (!contains(b, k.gsw)) H("kelime cümlede yok", `"${k.gsw}" ∉ "${b}"`);
    // Çeviri Almanca cümleden devralınıyor: sayılar örtüşmezse çeviri yalan söyler.
    if (numbers(b) !== numbers(k.beispielDe))
      H("sayı uyuşmazlığı", `"${k.beispielDe}" ↔ "${b}" — çeviri devralınamaz`);
    if (/\?$/.test(b) !== /\?$/.test(k.beispielDe))
      U("soru uyuşmazlığı", `"${k.beispielDe}" ↔ "${b}"`);
  }

  return { packet, errors, warnings, items: out.length, kept };
}

const all = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const selected = ARG === "all" ? all : all.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!selected.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let errorCount = 0;
let warningCount = 0;
let pending = 0;
let items = 0;
let kept = 0;
for (const p of selected) {
  const r = inspect(p);
  if (r.absent) {
    pending++;
    if (selected.length === 1) console.log(`${p}: çıktı yok`);
    continue;
  }
  errorCount += r.errors.length;
  warningCount += r.warnings.length;
  items += r.items;
  kept += r.kept ?? 0;
  if (r.errors.length || r.warnings.length) {
    console.log(`\n${p}  (${r.items} madde)`);
    r.errors.forEach((h) => console.log(h));
    r.warnings.forEach((u) => console.log(u));
  } else if (selected.length === 1) {
    console.log(`${p}: ${r.items} madde, temiz (${r.kept} korundu).`);
  }
}

console.log(
  `\nözet: ${selected.length - pending}/${selected.length} paket üretilmiş, ${items} madde (${kept} korundu) · ${errorCount} hata · ${warningCount} uyarı`,
);
process.exit(errorCount ? 1 : 0);
