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
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sentenceContainsWord as containsWord } from "../../../src/lib/headword";

const IN = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(IN, "zh-out");

// seed-zurich.ts ile birebir aynı ölçüt.
const PLACES =
  /\b(Berlin|München|Münche|Hamburg|Köln|Frankfurt|Wien|Dresden|Leipzig|Stuttgart|Bonn|Bremen|Mainz|Heidelberg|Zürich|Züri|Winterthur|Basel|Bern|Luzern|Genf|Chur|Thun)\b/g;
const digits = (s: string) => (s.match(/\d+/g) ?? []).sort().join(",");
const places = (s: string) =>
  [...new Set((s.match(PLACES) ?? []).map((p) => (p === "Zürich" ? "Züri" : p)))].sort().join(",");
const fits = (de: string, gsw: string) => digits(de) === digits(gsw) && places(de) === places(gsw);


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
  const src = JSON.parse(fs.readFileSync(path.join(IN, f), "utf8")) as { id: number; beispiel?: string }[];
  let out: Record<string, unknown>[];
  try {
    out = JSON.parse(fs.readFileSync(outPath, "utf8"));
  } catch (e: unknown) {
    console.log(`${f.padEnd(14)} ✗  JSON bozuk: ${(e as Error).message}`);
    totalBad++;
    continue;
  }

  const srcById = new Map((src as { id: number; beispiel?: string }[]).map((r) => [r.id, r]));
  const problems: Record<string, string[]> = { count: [], id: [], artikel: [], sz: [], empty: [], word: [], localized: [] };

  if (out.length !== src.length) problems.count.push(`${out.length} ≠ ${src.length}`);

  for (const g of out as { id: number; gsw?: string; artikel?: string | null; beispiel?: string }[]) {
    const s = srcById.get(g.id);
    if (!s) {
      problems.id.push(String(g.id));
      continue;
    }
    if (!g.gsw || !String(g.gsw).trim()) problems.empty.push(String(g.id));
    if (g.artikel != null && !["de", "d", "s"].includes(g.artikel))
      problems.artikel.push(`${g.id}:${g.artikel}`);
    if (/ß/.test(JSON.stringify(g))) problems.sz.push(String(g.id));

    if (g.beispiel && !containsWord(g.gsw ?? "", g.beispiel))
      problems.word.push(`${g.gsw} → ${g.beispiel}`);

    // Asıl kapı: çeviri devralınabilecek mi?
    const de = (s.beispiel || "").split(/(?<=[.!?])\s+/)[0];
    if (de && g.beispiel && !fits(de, g.beispiel))
      problems.localized.push(`${g.id} | DE: ${de} | ZH: ${g.beispiel}`);
  }

  const counts = Object.entries(problems).filter(([, v]) => v.length);
  totalItems += out.length;
  const localizedPct = ((problems.localized.length / Math.max(1, out.length)) * 100).toFixed(1);

  if (!counts.length) {
    console.log(`${f.padEnd(14)} ✓  ${out.length} madde, sorun yok`);
  } else {
    totalBad++;
    console.log(
      `${f.padEnd(14)} ✗  ${out.length} madde — ` +
        counts.map(([k, v]) => `${k}:${v.length}`).join(" · ") +
        (problems.localized.length ? `  (yerelleştirme %${localizedPct})` : ""),
    );
    for (const [k, v] of counts) {
      for (const line of v.slice(0, 3)) console.log(`     ${k}: ${line}`);
    }
  }
}

console.log(`\ntoplam ${totalItems} madde · sorunlu paket: ${totalBad}`);
