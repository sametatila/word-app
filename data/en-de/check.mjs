/**
 * İngilizce örnek cümlelerin Almanca çevirisini denetler:
 *   `node data/en-de/check.mjs [paket|seviye|all]`
 *
 * Ayrım bilerek: `hata` üretimi durdurur, `uyarı` durdurmaz. Uyarı, doğru
 * olabileceği gibi yanlış da olabilen bir işaret; hataya çevirmek yazarı doğru
 * işi bozmaya iterdi.
 *
 * DENETLEYİCİ YENİDEN YAZILMIYOR. Almanca `contains` zaten var ve 8.267 madde
 * üzerinde çalışılmış (`data/meanings/contains.mjs`): ayrılabilir ön ekler,
 * güçlü fiil gövdeleri, çoğul ünlü değişimi. İkinci bir kopya çıkarmak, iki
 * kopyanın ayrışması demekti.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const IN = `${ROOT}data/en-de/in`;
const OUT = `${ROOT}data/en-de/out`;
const ARG = (process.argv[2] || "all").toLowerCase();

/** Cümledeki sayılar — çeviri sayıyı değiştiremez. */
const numbers = (t) => [...String(t ?? "").matchAll(/\d+/g)].map((m) => m[0]).sort().join(",");
const words_ = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;

const packets = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((p) => ARG === "all" || p === ARG || p.startsWith(`${ARG}-`))
  .sort();

const errors = [];
const warnings = [];
let items = 0;
let pending = 0;

for (const p of packets) {
  const src = JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8"));
  const path = `${OUT}/${p}.json`;
  if (!existsSync(path)) {
    pending++;
    continue;
  }

  let rows;
  try {
    rows = JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    errors.push(`  [bozuk json] ${p}: ${e.message}`);
    continue;
  }
  if (!Array.isArray(rows)) {
    errors.push(`  [bozuk json] ${p}: çıktı bir dizi değil`);
    continue;
  }

  const want = new Set(src.words.map((k) => k.id));
  const got = new Map(rows.map((r) => [r.id, String(r.beispielDe ?? "").trim()]));
  const missing = [...want].filter((id) => !got.has(id));
  const extra = [...got.keys()].filter((id) => !want.has(id));
  if (missing.length) errors.push(`  [eksik madde] ${p}: ${missing.join(", ")}`);
  if (extra.length) errors.push(`  [pakete ait olmayan] ${p}: ${extra.join(", ")}`);
  if (got.size !== rows.length) errors.push(`  [yinelenen id] ${p}`);

  for (const k of src.words) {
    const de = got.get(k.id);
    if (de === undefined) continue;
    items++;
    const H = (m) => errors.push(`  [${p}] ${k.id} «${k.en}» — ${m}`);
    const U = (m) => warnings.push(`  [${p}] ${k.id} «${k.en}» — ${m}`);

    if (!de) {
      H("boş");
      continue;
    }
    if (!/[.!?]$/.test(de)) H("noktalama ile bitmiyor");
    // Son işareti atıp kalanda cümle sınırı arıyoruz: "Dr." gibi kısaltmalar
    // büyük harf istemediği için sonrası boşluk+harf olarak aranıyor.
    if (/[.!?]\s+\S/.test(de.replace(/[.!?]$/, ""))) H("birden çok cümle");
    const n = words_(de);
    if (n < 3 || n > 16) H(`uzunluk ${n} (3–16 bekleniyor)`);
    if (numbers(de) !== numbers(k.beispiel))
      H(`sayı "${numbers(de)}" ≠ İngilizce "${numbers(k.beispiel)}"`);
    if (/\?$/.test(de) !== /\?$/.test(k.beispiel)) H("soru/düz cümle uyuşmuyor");
    if (!contains(de, k.deGloss)) H(`«${k.deGloss}» cümlede yok`);

    if (de === k.beispiel) U("İngilizce cümlenin aynısı — çevrilmemiş olabilir");
    const ratio = n / Math.max(1, words_(k.beispiel));
    if (ratio > 1.5 || ratio < 0.6) U(`uzunluk oranı ${ratio.toFixed(2)} (${n} ↔ ${words_(k.beispiel)})`);
  }
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
  if (warnings.length > 20) console.log(`  … ${warnings.length - 20} tane daha`);
}
console.log(
  `\nözet: ${packets.length - pending}/${packets.length} paket üretilmiş, ${items} madde · ` +
    `${errors.length} hata · ${warnings.length} uyarı`,
);
process.exit(errors.length ? 1 : 0);
