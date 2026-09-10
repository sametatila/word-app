/**
 * `word()` şablonunun İngilizcesini denetler:
 *   `node data/lessons/word/check.mjs [paket|all]`
 *
 * Kurallar anlatım kapısıyla aynı aileden; ikisi bu alana özgü:
 *
 * - **Çerçevede yer tutucu korunur.** `{}` kelimenin karşılığının gireceği
 *   yer; düşerse şablon çalışır ama cümle kelimeyi hiç söylemez ve bu
 *   ekranda görünmez — ders sessizce boşalır.
 * - **Sekiz sıra sözcüğü sekiz ayrı karşılık ister.** İkisi aynı olursa
 *   öğrenci kaçıncı kelimede olduğunu duymaz; kaynak sırayı bilerek
 *   söylüyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractWord } from "./make.mjs";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();

/** Son noktalama sınıfı — anlatım kapısının aynısı. */
const end = (t) => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/** Harfe bitişik olmayan sayılar; C1, B2 gibi kodlar miktar değildir. */
const numbers = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();

const src = new Map(extractWord().map((r) => [r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 40))} — ${m}`);
      if (written.has(r.tr)) H("aynı dize iki pakette");
      if (!src.has(r.tr)) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        if (r.kind === "frame" && !en.includes("{}")) H("çerçevede {} yer tutucusu yok");
        if (r.kind === "frame" && r.tr.includes("not") && !/\bnot\b/.test(en))
          U("çerçevede not yer tutucusu kaybolmuş olabilir");
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(r.tr, en);
    }
  }

/*
  Sekiz sıra sözcüğü ayrı ayrı duyulmalı. Aynı karşılığa düşen ikisi
  ekranda görünmez: ders akar ama "kaçıncı kelime" bilgisi silinir.
*/
const ord = [...written].filter(([tr]) => src.get(tr)?.kind === "ordinal");
const byEn = new Map();
for (const [tr, en] of ord) (byEn.get(en.toLowerCase()) ?? byEn.set(en.toLowerCase(), []).get(en.toLowerCase())).push(tr);
for (const [en, g] of byEn)
  if (g.length > 1) errors.push(`  [sıra] «${en}» iki sözcüğe birden verilmiş: ${g.join(" / ")}`);

let coverage = null;
if (ARG === "all") {
  const rows = extractWord();
  const missing = rows.filter((r) => !written.has(r.tr));
  coverage = { rows: rows.length, missing: missing.length };
  if (missing.length) errors.push(`  [kapsam] ${missing.length} dizenin İngilizcesi yok`);
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
  `\nözet: ${written.size} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
