/**
 * Rol yapma senaryosunun İngilizcesini denetler:
 *   `node data/lessons/script/check.mjs [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; ikisi bu alana özgü:
 *
 * - **İpucu ALMANCA örneği taşır ve o örnek çevrilmez.** `cue` alanının
 *   yarısı "Adını söyle: Ich heiße …" biçiminde: Türkçe yönerge artı
 *   Almanca kalıp. Kalıp dersin ÖĞRETTİĞİ şey; çevrilirse öğrenci
 *   söyleyeceği cümleyi göremez. Kapı Almanca parçanın olduğu gibi
 *   kaldığını ölçüyor.
 * - **Muhatabın repliği İKİ dilde var.** `askTr` Almanca `ask`in
 *   karşılığı; İngilizcesi de o repliğin karşılığı olmalı, yeni bir
 *   cümle değil. Uzunluk çok saparsa uyarı veriliyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractScript } from "./make.mjs";
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

/*
  İki noktadan SONRAKİ Almanca örnek. "Adını söyle: Ich heiße …" satırında
  öğrenciye verilen kalıp iki noktadan sonra duruyor ve olduğu gibi
  kalmalı. Ölçüt gevşek bilerek: her `cue` örnek taşımıyor.
*/
const sample = (t) => {
  const i = String(t).indexOf(": ");
  return i < 0 ? null : String(t).slice(i + 2).trim();
};

const src = new Map(extractScript().map((r) => [r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(r.tr)) H("aynı dize iki pakette");
      const row = src.get(r.tr);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        if (row.kind === "cue") {
          const s = sample(r.tr);
          if (s && !en.includes(s)) H(`Almanca örnek düşmüş: «${s.slice(0, 34)}»`);
        }
        if (row.kind === "askTr" && (en.length > r.tr.length * 2 + 12 || en.length * 2 + 12 < r.tr.length))
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);
        for (const h of usSpelling(en)) U(`Amerikan yazımı ${h}`);
      }
      written.set(r.tr, en);
    }
  }

let coverage = null;
if (ARG === "all") {
  const rows = extractScript();
  const missing = rows.filter((r) => !written.has(r.tr)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dizenin İngilizcesi yok`);
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
