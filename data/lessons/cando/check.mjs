/**
 * Can-do ifadelerinin İngilizcesini denetler:
 *   `node data/lessons/cando/check.mjs [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; ikisi bu alana özgü:
 *
 * - **Birinci tekil korunur.** Kaynak "…yapabilirim" diyor, yani öğrencinin
 *   kendi ağzından. "I can …" dışına çıkan bir çeviri ("The learner can…",
 *   "Being able to…") ekranın sesini değiştirir — Yapabildiklerim ekranı bir
 *   yeterlik listesi değil, öğrencinin kendi cümlesi.
 * - **İki ifade tek karşılığa düşemez.** 131 ifadenin tamamı AYRI bir
 *   yeterlik; ikisi aynı İngilizceye düşerse ekranda tekrar görünür ve
 *   aradaki fark kaybolur.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractCando } from "./make.mjs";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();

const src = new Map(extractCando().map((r) => [r.id, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${r.id} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.id} — ${m}`);
      if (written.has(r.id)) H("aynı ifade iki pakette");
      const row = src.get(r.id);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(row.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(row.tr)}» → «${end(en)}»`);
        const a = numbers(row.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        if (!/^I can\b/.test(en)) H(`birinci tekil değil: «${en.slice(0, 46)}»`);
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(r.id, en);
    }
  }

const byEn = new Map();
for (const [id, en] of written) {
  const k = en.toLowerCase();
  (byEn.get(k) ?? byEn.set(k, []).get(k)).push(id);
}
for (const [en, g] of byEn)
  if (g.length > 1) errors.push(`  [aynı karşılık] «${en.slice(0, 50)}» — ${g.join(" / ")}`);

let coverage = null;
if (ARG === "all") {
  const rows = extractCando();
  const missing = rows.filter((r) => !written.has(r.id)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} ifadenin İngilizcesi yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
}
console.log(
  `\nözet: ${written.size} ifade · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
