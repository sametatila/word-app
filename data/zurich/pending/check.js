/**
 * Paket denetimi — merge.js'ten önce çalıştırılır.
 *
 * merge.js biçimsel bütünlüğü denetliyor (id, artikel, ß, boş gsw). Burada asıl
 * pahalı hatayı yakalıyoruz: **yerelleştirme**. seed-zurich.ts, Almanca cümleyle
 * Züritüütsch cümlenin sayıları ve yer adları örtüşmezse o maddenin Türkçe
 * çevirisini düşürüyor (translationFits). Önceki turda bu sessizce 374 maddeye
 * mal oldu — paket paket görülmeliydi.
 *
 *   node check.js            → tüm paketler
 *   node check.js part-03    → tek paket
 */
const fs = require("fs");
const path = require("path");

const ROOT = "/mnt/windows/Users/LinkinqArk/Desktop/Workspace/word-app";
const IN = __dirname;
const OUT = path.join(__dirname, "zh-out");

// seed-zurich.ts ile birebir aynı ölçüt.
const PLACES =
  /\b(Berlin|München|Münche|Hamburg|Köln|Frankfurt|Wien|Dresden|Leipzig|Stuttgart|Bonn|Bremen|Mainz|Heidelberg|Zürich|Züri|Winterthur|Basel|Bern|Luzern|Genf|Chur|Thun)\b/g;
const digits = (s) => (s.match(/\d+/g) ?? []).sort().join(",");
const places = (s) =>
  [...new Set((s.match(PLACES) ?? []).map((p) => (p === "Zürich" ? "Züri" : p)))].sort().join(",");
const fits = (de, gsw) => digits(de) === digits(gsw) && places(de) === places(gsw);

/** Züritüütsch'te sık ayrılan/öne gelen ekler — çekimde kökten kopabiliyor. */
const PREFIXES = /^(abe|ufe|ine|use|wiiter|zäme|voraa|naa|vor|zue|uus|us|uf|aa|ii|ab|an|mit|frei|über|unter|durch|um|ver|be|ent|er|ge)/;

/**
 * Cümle kelimenin kökünü taşıyor mu?
 *
 * Düz önek karşılaştırması işe yaramıyor: "abmaane" cümlede "abgmaant",
 * "heile" ise "gheilt" olarak geçiyor ve ikisi de doğru. Bu yüzden ayrılabilen
 * önek soyulup kalan kök aranır; kısa kelimelerde eşik üç harfe iner.
 */
function containsWord(gsw, sentence) {
  // Artikel ve dönüşlü "sich" kelimenin parçası değil, cümlede ayrı durur.
  const w = String(gsw || "")
    .replace(/^(de|d|s)\s+/, "")
    .replace(/^sich\s+/, "")
    .toLowerCase();
  if (w.length < 3) return true;
  const hay = sentence.toLowerCase();
  const roots = [w, w.replace(PREFIXES, "")].filter((r) => r.length >= 3);
  return roots.some((r) => hay.includes(r.slice(0, Math.min(4, r.length))));
}

const only = process.argv[2];
const parts = fs
  .readdirSync(IN)
  .filter((f) => /^part-\d+\.json$/.test(f))
  .filter((f) => !only || f.startsWith(only))
  .sort();

let totalItems = 0;
let totalBad = 0;

for (const f of parts) {
  const outPath = path.join(OUT, f);
  if (!fs.existsSync(outPath)) {
    console.log(`${f.padEnd(14)} —  çıktı yok`);
    continue;
  }
  const src = JSON.parse(fs.readFileSync(path.join(IN, f), "utf8"));
  let out;
  try {
    out = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch (e) {
    console.log(`${f.padEnd(14)} ✗  JSON bozuk: ${e.message}`);
    totalBad++;
    continue;
  }

  const srcById = new Map(src.map((r) => [r.id, r]));
  const problems = { sayi: [], id: [], artikel: [], sz: [], bos: [], kelime: [], yerel: [] };

  if (out.length !== src.length) problems.sayi.push(`${out.length} ≠ ${src.length}`);

  for (const g of out) {
    const s = srcById.get(g.id);
    if (!s) {
      problems.id.push(g.id);
      continue;
    }
    if (!g.gsw || !String(g.gsw).trim()) problems.bos.push(g.id);
    if (g.artikel != null && !["de", "d", "s"].includes(g.artikel))
      problems.artikel.push(`${g.id}:${g.artikel}`);
    if (/ß/.test(JSON.stringify(g))) problems.sz.push(g.id);

    if (g.beispiel && !containsWord(g.gsw, g.beispiel))
      problems.kelime.push(`${g.gsw} → ${g.beispiel}`);

    // Asıl kapı: çeviri devralınabilecek mi?
    const de = (s.beispiel || "").split(/(?<=[.!?])\s+/)[0];
    if (de && g.beispiel && !fits(de, g.beispiel))
      problems.yerel.push(`${g.id} | DE: ${de} | ZH: ${g.beispiel}`);
  }

  const counts = Object.entries(problems).filter(([, v]) => v.length);
  totalItems += out.length;
  const yerelPct = ((problems.yerel.length / Math.max(1, out.length)) * 100).toFixed(1);

  if (!counts.length) {
    console.log(`${f.padEnd(14)} ✓  ${out.length} madde, sorun yok`);
  } else {
    totalBad++;
    console.log(
      `${f.padEnd(14)} ✗  ${out.length} madde — ` +
        counts.map(([k, v]) => `${k}:${v.length}`).join(" · ") +
        (problems.yerel.length ? `  (yerelleştirme %${yerelPct})` : ""),
    );
    for (const [k, v] of counts) {
      for (const line of v.slice(0, 3)) console.log(`     ${k}: ${line}`);
    }
  }
}

console.log(`\ntoplam ${totalItems} madde · sorunlu paket: ${totalBad}`);
