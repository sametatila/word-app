/**
 * Anlam paketlerini denetler: `node data/meanings/check.mjs a1-001`
 *
 * Argüman bir paket adı, bir seviye öneki (`a1`) ya da `all` olabilir.
 *
 * Denetleyici yalnızca **mekanik** kusurları yakalar: çok anlamlılık, parantez,
 * kelimeyi içermeyen cümle, bozuk uzunluk, dil karışması, eksik madde. Anlamın
 * doğru olup olmadığını ölçemez — o insanın ve üreten ajanın işidir. Buna
 * rağmen buradaki kontroller elle yapılamayacak kadar çok: 8267 maddede
 * gözle bakılabilecek şey yalnızca örnektir.
 *
 * Ayrım bilerek: `hata` uygulamayı durdurur, `uyarı` durdurmaz. Uyarı, doğru
 * olabilecek ama şüphe uyandıran şeydir (ikizler, sıra dışı uzunluk); hepsini
 * hataya çevirmek ajanı doğru işi bozmaya iterdi.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const ROOT = new URL("../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();
const IN = `${ROOT}data/meanings/in`;
const OUT = `${ROOT}data/meanings/out`;

import { contains } from "./contains.mjs";

/** Sonundaki nokta cümleyi bitirmeyen kısaltmalar. */
const ABBR =
  /\b(z\.\s?B|bzw|usw|ca|Dr|Prof|Nr|etc|inkl|evtl|ggf|vgl|Mio|Mrd|St|Mr|Mrs|Ms|Jr|Sr|vs|approx|vb|bkz|sn)\.$/i;

function sentenceCount(text) {
  // Cümle sınırı: noktalama + boşluk + büyük harf. Kısaltmalar sayılmaz.
  let n = 1;
  const re = /[.!?]+\s+(?=[A-ZÄÖÜ0-9"„«])/g;
  let m;
  while ((m = re.exec(text))) {
    if (!ABBR.test(text.slice(0, m.index + 1))) n++;
  }
  return n;
}

const words_ = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/* ── denetim ────────────────────────────────────────────────────────────── */

const TR_LETTER = /[ıİğĞşŞ]/;

function inspect(packet) {
  const src = JSON.parse(readFileSync(`${IN}/${packet}.json`, "utf8"));
  const errors = [];
  const warnings = [];
  const push = (bucket, id, de, label, message) =>
    bucket.push(`  [${label}] ${id} ${de} — ${message}`);

  if (!existsSync(`${OUT}/${packet}.json`)) return { packet, absent: true, errors, warnings };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${packet}.json`, "utf8"));
  } catch (e) {
    errors.push(`  [bozuk json] ${e.message}`);
    return { packet, errors, warnings, items: 0 };
  }
  if (!Array.isArray(out)) {
    errors.push("  [bozuk json] çıktı bir dizi değil");
    return { packet, errors, warnings, items: 0 };
  }

  const byId = new Map(out.map((r) => [r.id, r]));
  const expected = src.words.map((k) => k.id);
  const missing = expected.filter((id) => !byId.has(id));
  const extra = out.map((r) => r.id).filter((id) => !expected.includes(id));
  if (missing.length) errors.push(`  [eksik madde] ${missing.join(", ")}`);
  if (extra.length) errors.push(`  [pakete ait olmayan] ${extra.join(", ")}`);
  if (out.length !== new Set(out.map((r) => r.id)).size)
    errors.push("  [yinelenen id] aynı madde birden çok kez yazılmış");

  const trCounter = new Map();

  for (const k of src.words) {
    const r = byId.get(k.id);
    if (!r) continue;
    const de = k.de;
    const H = (label, message) => push(errors, k.id, de, label, message);
    const U = (label, message) => push(warnings, k.id, de, label, message);

    for (const field of ["tr", "en", "beispiel", "beispielTr", "beispielEn"]) {
      if (typeof r[field] !== "string" || !r[field].trim()) H("boş alan", field);
    }
    if (errors.length && (!r.tr || !r.en || !r.beispiel)) continue;

    const tr = (r.tr ?? "").trim();
    const en = (r.en ?? "").trim();
    const bsp = (r.beispiel ?? "").trim();
    const bspTr = (r.beispielTr ?? "").trim();
    const bspEn = (r.beispielEn ?? "").trim();

    /* tr — tek karşılık */
    if (/[,;/]/.test(tr)) H("çok anlamlı tr", `"${tr}" — virgül/çizgi ile ikinci anlam`);
    if (/[()[\]]/.test(tr)) H("parantezli tr", `"${tr}"`);
    if (/\s(ya da|veya)\s/i.test(tr)) H("çok anlamlı tr", `"${tr}" — "ya da" ile ikinci anlam`);
    if (tr.length > 40) H("uzun tr", `${tr.length} karakter: "${tr}"`);
    if (words_(tr) > 5) U("uzun tr", `${words_(tr)} kelime: "${tr}"`);
    // Belirsiz artikelin isim karşılığına sızması ("der Tisch → bir masa")
    // gerçek bir kusur; ama "bir daha", "bir yerde", "bir araya gelmek" gibi
    // deyimlerde "bir" kelimenin parçası. Kural yalnızca isimlerde geçerli.
    if (k.typ === "Nomen" && /^bir\s/i.test(tr)) U("şüpheli tr", `"${tr}"`);
    if (/^(the|a|an)\s/i.test(tr)) U("şüpheli tr", `"${tr}" — İngilizce sızmış olabilir`);

    /* en — tek karşılık, fiiller "to" ile */
    if (/[,;/]/.test(en)) H("çok anlamlı en", `"${en}"`);
    if (/[()[\]]/.test(en)) H("parantezli en", `"${en}"`);
    if (en.length > 40) H("uzun en", `${en.length} karakter: "${en}"`);
    if (TR_LETTER.test(en)) H("dil karışması", `en alanında Türkçe harf: "${en}"`);
    if (en.toLocaleLowerCase("tr-TR") === tr.toLocaleLowerCase("tr-TR"))
      U("tr = en", `"${tr}" — ikisi aynı, alıntı kelime değilse hata`);
    /**
     * Fiil mi?
     *
     * Türkçe mastar eki `-mek`/`-mak` ile bittiği için karşılık genelde bunu
     * ele veriyor, ama Türkçede aynı ekle biten **isimler** de var: "ekmek"
     * (das Brot) ve "yemek" (das Essen). Bunlar fiil sayılınca denetleyici
     * `en` alanında "to …" istiyor ve ajanı `"to bread"` yazmaya ya da
     * karşılığı bozmaya zorluyordu — nitekim iki pakette tam olarak bu oldu.
     * Kaynak zaten isim diyorsa ek yanıltıcıdır ve kaynak kazanır.
     */
    const isVerb = k.typ === "Verb" || (k.typ !== "Nomen" && /(mek|mak)$/.test(tr));
    // Kip fiillerinin İngilizce karşılığı mastar almaz: "möchten" → "would
    // like", "dürfen" → "may". Kural yalnızca "to …" kabul edince ajan
    // möchten'e wollen ile birebir aynı karşılığı ("to want") vermek zorunda
    // kaldı ve iki kelime hiçbir turda ayırt edilemez hâle geldi.
    const verbForm = /^(to|would|can|may|must|should|shall|might)\s/;
    if (isVerb && !verbForm.test(en))
      H("fiilde mastar yok", `"${en}" — fiiller "to …" (ya da kip fiili) biçiminde yazılır`);
    if (!isVerb && /^to\s/.test(en)) U("fiil olmayanda to", `"${en}"`);

    /* beispiel — tek, tam, kelimeyi içeren cümle */
    if (!/[.!?]$/.test(bsp)) H("bozuk cümle", `sonu noktalama değil: "${bsp}"`);
    if (/^\d+[.)]/.test(bsp) || /\s\d+\.\s/.test(bsp)) H("numaralı derleme", `"${bsp}"`);
    if (/\bvergl\b|\bsiehe\b|\bvgl\./i.test(bsp)) H("sözlük artığı", `"${bsp}"`);
    if (/\s\/\s|\S\/\s|\s\/\S/.test(bsp)) H("varyant listesi", `eğik çizgi: "${bsp}"`);
    if (sentenceCount(bsp) > 1) H("çok cümleli", `"${bsp}"`);
    const n = words_(bsp);
    if (n < 3 || n > 13) H("cümle uzunluğu", `${n} kelime: "${bsp}"`);
    else if (n < 4 || n > 12) U("cümle uzunluğu", `${n} kelime: "${bsp}"`);
    if (!contains(bsp, de)) H("kelime cümlede yok", `"${de}" ∉ "${bsp}"`);
    if (!/^[A-ZÄÖÜ„"»]/.test(bsp)) U("küçük harfle başlıyor", `"${bsp}"`);

    /* çeviriler */
    for (const [name, text] of [["beispielTr", bspTr], ["beispielEn", bspEn]]) {
      if (!text) continue;
      if (/^\d+[.)]/.test(text) || /\s\d+\.\s/.test(text)) H("numaralı çeviri", `${name}: "${text}"`);
      if (sentenceCount(text) > 1) H("çok cümleli çeviri", `${name}: "${text}"`);
      if (!/[.!?…]$/.test(text)) U("bozuk çeviri", `${name} noktalama ile bitmiyor: "${text}"`);
    }
    if (TR_LETTER.test(bspEn)) H("dil karışması", `beispielEn Türkçe harf taşıyor: "${bspEn}"`);
    if (bspTr && bspTr === bspEn) H("aynı çeviri", "beispielTr ile beispielEn birebir aynı");
    if (/\?$/.test(bsp) !== /\?$/.test(bspTr)) U("soru uyuşmazlığı", `"${bsp}" ↔ "${bspTr}"`);
    if (/\?$/.test(bsp) !== /\?$/.test(bspEn)) U("soru uyuşmazlığı", `"${bsp}" ↔ "${bspEn}"`);
    const ratio = (t) => (bsp.length ? t.length / bsp.length : 1);
    if (bspTr && (ratio(bspTr) < 0.35 || ratio(bspTr) > 2.5))
      U("çeviri uzunluğu", `beispielTr oransız: "${bsp}" ↔ "${bspTr}"`);
    if (bspEn && (ratio(bspEn) < 0.35 || ratio(bspEn) > 2.5))
      U("çeviri uzunluğu", `beispielEn oransız: "${bsp}" ↔ "${bspEn}"`);

    const trKey = tr.toLocaleLowerCase("tr-TR");
    trCounter.set(trKey, [...(trCounter.get(trKey) ?? []), de]);
  }

  /* Paket içi ikizler: aynı Türkçe karşılığı alan iki kelime, İngilizcede de
     aynıysa öğrenci ikisini hiçbir turda ayırt edemez. */
  for (const [k, list] of trCounter) {
    if (list.length < 2) continue;
    const enSet = new Set(
      list.map((de) => {
        const id = src.words.find((x) => x.de === de)?.id;
        return (byId.get(id)?.en ?? "").toLowerCase();
      }),
    );
    if (enSet.size === 1) errors.push(`  [ayırt edilemez ikiz] "${k}" = ${list.join(", ")} (İngilizcesi de aynı)`);
    else warnings.push(`  [aynı tr] "${k}" = ${list.join(", ")} (İngilizceleri farklı)`);
  }

  return { packet, errors, warnings, items: out.length };
}

/* ── çalıştır ───────────────────────────────────────────────────────────── */

const all = readdirSync(IN)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const selected =
  ARG === "all" ? all : all.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!selected.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let errorCount = 0;
let warningCount = 0;
let pending = 0;
let items = 0;
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
  if (r.errors.length || r.warnings.length) {
    console.log(`\n${p}  (${r.items} madde)`);
    r.errors.forEach((h) => console.log(h));
    r.warnings.forEach((u) => console.log(u));
  } else if (selected.length === 1) {
    console.log(`${p}: ${r.items} madde, temiz.`);
  }
}

/**
 * Paketler arası ayırt edilemez ikizler.
 *
 * Paket içi denetim bunu göremiyor: `man` A1'in ilk paketinde, `Mensch` çok
 * sonrasında ve ikisi de "insan" almaya aday. Aynı Türkçe **ve** aynı
 * İngilizce karşılığı alan iki farklı kelime hiçbir turda ayırt edilemez —
 * çoktan seçmelide iki özdeş şık çıkar ve hangisi seçilirse seçilsin biri
 * yanlış sayılır.
 *
 * Uyarı, hata değil: ikisi gerçekten eşanlamlıysa (anfangen/beginnen) aynı
 * karşılığı almaları doğrudur ve zorlama bir ayrım Türkçeyi bozar.
 */
if (selected.length > 1) {
  const source = new Map();
  for (const p of all)
    for (const k of JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8")).words)
      source.set(k.id, k.de);

  const groups = new Map();
  for (const p of selected) {
    if (!existsSync(`${OUT}/${p}.json`)) continue;
    let rows;
    try {
      rows = JSON.parse(readFileSync(`${OUT}/${p}.json`, "utf8"));
    } catch {
      continue;
    }
    for (const r of rows) {
      if (!r?.tr || !r?.en) continue;
      const key = `${r.tr.toLocaleLowerCase("tr-TR")}|${r.en.toLowerCase()}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(`${source.get(r.id) ?? r.id} [${p}]`);
    }
  }

  const twins = [...groups].filter(([, list]) => list.length > 1);
  if (twins.length) {
    console.log("\n── paketler arası ayırt edilemez ikizler ──");
    for (const [key, list] of twins.slice(0, 40))
      console.log(`  "${key.split("|")[0]}" / "${key.split("|")[1]}" = ${list.join(", ")}`);
    if (twins.length > 40) console.log(`  … ve ${twins.length - 40} tane daha`);
    warningCount += twins.length;
  }
}

console.log(
  `\nözet: ${selected.length - pending}/${selected.length} paket üretilmiş, ${items} madde · ${errorCount} hata · ${warningCount} uyarı`,
);
process.exit(errorCount ? 1 : 0);
