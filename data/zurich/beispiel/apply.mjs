/**
 * Paket çıktısını kurar:
 *   `node data/zurich/beispiel/apply.mjs a1-001`
 *
 * SPEC paketteki HER maddenin çıktıda olmasını istiyor, ama maddelerin çoğunda
 * cümle değişmiyor (triyaj: 8.267'nin 7.084'ü korunabilir). Korunanları elle
 * kopyalamak hem gereksiz emek hem de kopyalarken bozma riski — bu yüzden
 * çıktı burada kuruluyor:
 *
 *   out/<paket>.json  =  in/<paket>.json'daki `currentGsw`
 *                        ÜSTÜNE  fix/<paket>.json'daki yeniden yazılanlar
 *
 * `fix/` yalnızca DEĞİŞENLERİ taşır: `[{ "id": 417, "beispiel": "…" }]`.
 * Böylece bir paketin diff'i "neyi elle yazdım"ı gösteriyor, elli maddelik bir
 * kopyayı değil.
 *
 * Doğrulama ayrı adımda: `node data/zurich/beispiel/check.mjs <paket>`.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";

const ROOT = new URL("../../..", import.meta.url).pathname;
const IN = `${ROOT}data/zurich/beispiel/in`;
const FIX = `${ROOT}data/zurich/beispiel/fix`;
const OUT = `${ROOT}data/zurich/beispiel/out`;
const ARG = (process.argv[2] || "all").toLowerCase();

mkdirSync(OUT, { recursive: true });
mkdirSync(FIX, { recursive: true });

const packets = readdirSync(IN)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((p) => ARG === "all" || p === ARG || p.startsWith(`${ARG}-`))
  .sort();

let built = 0;
let written = 0;
let kept = 0;

for (const p of packets) {
  const src = JSON.parse(readFileSync(`${IN}/${p}.json`, "utf8"));
  const fixPath = `${FIX}/${p}.json`;
  const fixes = existsSync(fixPath)
    ? new Map(JSON.parse(readFileSync(fixPath, "utf8")).map((r) => [r.id, String(r.beispiel ?? "").trim()]))
    : new Map();

  // fix/ içinde pakete ait olmayan bir id varsa sessizce yutulmaz: büyük
  // ihtimalle yanlış dosyaya yazılmıştır ve o madde hiç düzelmemiş olur.
  const ids = new Set(src.words.map((k) => k.id));
  const stray = [...fixes.keys()].filter((id) => !ids.has(id));
  if (stray.length) {
    console.error(`${p}: pakete ait olmayan id — ${stray.join(", ")}`);
    process.exitCode = 1;
    continue;
  }

  const out = src.words.map((k) => {
    const fixed = fixes.get(k.id);
    if (fixed) written++;
    else kept++;
    return { id: k.id, beispiel: fixed ?? String(k.currentGsw ?? "").trim() };
  });

  writeFileSync(`${OUT}/${p}.json`, `${JSON.stringify(out, null, 1)}\n`);
  built++;
}

console.log(`${built} paket kuruldu · ${written} yeniden yazıldı · ${kept} korundu`);
