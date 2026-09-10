/**
 * Seviye sayacı: `node data/lessons/roleplay/level.mjs`
 *
 * Ayrı bir betik çünkü commit iletisine yazılan seviye iddiası İKİ KEZ
 * yanlış çıktı (meta hattında "B1 bitti" 100/180'ken, burada 175/180'ken).
 * Sebebi hep aynıydı: sayım commit ile aynı komutta çalıştırıldı, yani
 * ileti çıktıyı görmeden yazıldı. Bu betik önce çalıştırılır, sonra ileti.
 */
import { readFileSync, readdirSync } from "node:fs";
import { extractRoleplay } from "./make.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const rows = extractRoleplay();
const done = new Set();
for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json")))
  for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) done.add(r.lesson);

const lvl = (id) => (id.match(/^de-([a-c][12])-/)?.[1] ?? "?").toUpperCase();
const t = {};
for (const r of rows) {
  const L = lvl(r.lesson);
  t[L] ??= { all: 0, done: 0 };
  t[L].all++;
  if (done.has(r.lesson)) t[L].done++;
}
console.log(
  Object.entries(t)
    .map(([L, v]) => `${L} ${v.done}/${v.all}${v.done === v.all ? " ✓" : ""}`)
    .join("   "),
);
const src = new Map(rows.map((r) => [r.lesson, r]));
let q = 0, d = 0;
for (const l of done) {
  if (/\?\s*$/.test(src.get(l).opening)) q++;
  else d++;
}
console.log(`${done.size}/${rows.length} ders · ${done.size * 4}/${rows.length * 4} dize · açılış: ${q} soru · ${d} nokta`);
