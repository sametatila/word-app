/**
 * Rol yapma alanlarının İngilizcesini denetler:
 *   `node data/lessons/roleplay/check.mjs [paket|all]`
 *
 * Dört alanın dördü ayrı bir ŞEY ve kurallar buna göre ayrışıyor:
 *
 * - `scene` öğrenciye verilen GÖREV: emir kipinde, cümle, noktalamayla biter.
 * - `partner` karşıdakinin kim olduğu: ÖBEK ("a curious but polite neighbour"),
 *   cümle değil. Nokta ile bitmesi cümleye dönmüş olduğunu gösterir — meta
 *   hattındaki başlık/özet ayrımının aynısı.
 * - `openingEn` Almanca `opening`in çevirisi. Tek denetlenebilir değişmezi
 *   var: SORU İŞARETİ ve SAYI kaynaktakiyle aynı olmalı. Almanca "Wie heißen
 *   Sie?" soruysa İngilizcesi de sorudur; "um 8 Uhr" 8'i taşıyorsa çeviri de
 *   taşır.
 * - `goal` başarı koşulu: cümle.
 *
 * Kapsam ayrı bir soru: paket denetimi yazılanın geçerliliğine bakar, kapsam
 * "580 dersin hepsi dört alanını aldı mı"ya.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractRoleplay } from "./make.mjs";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();
const src = new Map(extractRoleplay().map((r) => [r.lesson, r]));

/** Harfe bitişik olmayan sayılar: CO2, B2, mp3 miktar değildir. */
const numbers = (t) =>
  [...String(t ?? "").matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort().join(",");

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json")).sort()) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${r.lesson} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.lesson} — ${m}`);
      if (written.has(r.lesson)) H("aynı ders iki pakette");
      const s0 = src.get(r.lesson);

      const scene = String(r.sceneEn ?? "").trim();
      const partner = String(r.partnerEn ?? "").trim();
      const open = String(r.openingEn ?? "").trim();
      const goal = String(r.goalEn ?? "").trim();

      if (!scene) H("scene boş");
      else if (!/[.!?]$/.test(scene)) H("scene noktalama ile bitmiyor");
      else if (scene.length < 30) H(`scene çok kısa (${scene.length})`);
      else if (s0 && scene.length > s0.scene.length * 2)
        U(`scene çok uzamış (${scene.length}, Türkçesi ${s0.scene.length})`);

      if (!partner) H("partner boş");
      else if (/[.]$/.test(partner)) U("partner nokta ile bitiyor — öbek değil cümle yazılmış olabilir");
      else if (partner.length > 90) U(`partner uzun (${partner.length})`);

      if (!open) H("openingEn boş");
      else if (s0) {
        const q = (t) => (/\?\s*$/.test(t) ? "?" : /!\s*$/.test(t) ? "!" : ".");
        if (q(open) !== q(s0.opening))
          H(`openingEn noktalaması kaynakla uyuşmuyor: «${s0.opening}» → «${open}»`);
        if (numbers(open) !== numbers(s0.opening))
          H(`openingEn sayıları kaynakla uyuşmuyor: «${s0.opening}» → «${open}»`);
      }

      if (!goal) H("goal boş");
      else if (!/[.!?]$/.test(goal)) H("goal noktalama ile bitmiyor");
      else if (goal.length < 25) H(`goal çok kısa (${goal.length})`);

      for (const h of usSpelling(`${scene} ${partner} ${open} ${goal}`))
        U(`Amerikan yazımı ${h}`);

      written.set(r.lesson, true);
    }
  }

for (const lesson of written.keys())
  if (!src.has(lesson)) errors.push(`  [pakete ait değil] ${lesson}`);

let coverage = null;
if (ARG === "all") {
  const rows = [...src.keys()];
  const missing = rows.filter((l) => !written.has(l)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dersin İngilizce rol yapma alanları yok`);
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
  `\nözet: ${written.size} ders · ${written.size * 4} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
