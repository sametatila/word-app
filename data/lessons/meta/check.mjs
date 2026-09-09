/**
 * Ders başlık ve özetlerinin İngilizcesini denetler:
 *   `node data/lessons/meta/check.mjs [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; iki tanesi bu alana özgü:
 *
 * - Özet bir CÜMLEDİR (ders neyi öğretiyor), başlık ise bir AD. Başlığın
 *   nokta ile bitmesi ya da özetin bitmemesi ikisinin karıştığını gösterir.
 * - Başlık, Almanca `title` alanının çevirisi DEĞİL: Almanca başlık dersin
 *   kendi cümlesidir ("Hallo!"), Türkçe başlık ise konunun adı ("Tanışma").
 *   İngilizcesi de konunun adı olmalı, o yüzden Almancanın aynısı uyarı.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractMeta } from "./make.mjs";
import { usSpelling } from "../spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors = [];
const warnings = [];
const written = new Map();
const german = new Map(extractMeta().map((r) => [r.lesson, r.title]));
const turkish = new Map(extractMeta().map((r) => [r.lesson, r.titleTr]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8"))) {
      const H = (m) => errors.push(`  [${packet}] ${r.lesson} — ${m}`);
      const U = (m) => warnings.push(`  [${packet}] ${r.lesson} — ${m}`);
      if (written.has(r.lesson)) H("aynı ders iki pakette");
      const t = String(r.titleEn ?? "").trim();
      const s = String(r.summaryEn ?? "").trim();
      if (!t) H("başlık boş");
      // Eşik mutlak DEĞİL: 580 Türkçe başlığın 578’i 40 karakterin altında,
      // ikisi ise Almanca bağlaç LİSTESİ taşıyor ("İkili bağlaçlar:
      // entweder…oder, sowohl…als auch, weder…noch" 59 karakter). Listeyi
      // İngilizcede kısaltmak bilgiyi atardı. Kural: KISA bir başlık uzun bir
      // başlığa dönüşmüşse uyar — yakalamak istediği şey zaten ad yerine
      // cümle yazılması, mutlak uzunluk değil.
      else if (t.length > 40 && t.length > (turkish.get(r.lesson)?.length ?? 0) + 8)
        U(`başlık uzun (${t.length}, Türkçesi ${turkish.get(r.lesson)?.length})`);
      else if (/[.]$/.test(t)) U("başlık nokta ile bitiyor — özetle karışmış olabilir");
      else if (german.get(r.lesson) && t.toLowerCase() === german.get(r.lesson).toLowerCase())
        U("başlık Almancanın aynısı — konu adı değil ders cümlesi yazılmış olabilir");
      if (!s) H("özet boş");
      else if (!/[.!?]$/.test(s)) H("özet noktalama ile bitmiyor");
      else if (s.length < 20) H(`özet çok kısa (${s.length})`);
      for (const h of usSpelling(`${t} ${s}`)) U(`Amerikan yazımı ${h}`);
      written.set(r.lesson, t);
    }
  }

for (const lesson of written.keys())
  if (!german.has(lesson)) errors.push(`  [pakete ait değil] ${lesson}`);

/*
  Aynı İngilizce başlığın iki derse düşmesi tek başına kusur DEĞİL: kaynakta
  7 Türkçe başlık 14 derste tekrar ediyor ("Kuaförde" hem A2'de hem B1'de,
  "Havalimanında", "Emeklilik"…). Orada tekrar bilgidir — aynı konu daha
  ileri seviyede yeniden ele alınıyor ve İngilizcesinin de tekrar etmesi
  gerekir.

  Kusur, Türkçeleri FARKLIYKEN İngilizcelerinin aynı olması: iki ayrı konu
  tek ada düşmüş demektir. weil/denn'de kaçınılan şeyin aynısı — ayıran
  bilgi başlıkta görünmez oluyor.
*/
const byTitle = new Map();
for (const [lesson, t] of written) {
  const k = t.toLowerCase();
  (byTitle.get(k) ?? byTitle.set(k, []).get(k)).push(lesson);
}
for (const group of byTitle.values()) {
  if (group.length < 2) continue;
  const trs = new Set(group.map((l) => turkish.get(l)));
  if (trs.size > 1)
    warnings.push(
      `  [aynı başlık] ${group.join(", ")} — «${written.get(group[0])}» ama Türkçeleri ayrı: ${[...trs].join(" / ")}`,
    );
}

let coverage = null;
if (ARG === "all") {
  const rows = extractMeta();
  const missing = rows.filter((r) => !written.has(r.lesson)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dersin İngilizce başlık/özeti yok`);
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
  `\nözet: ${written.size} ders · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
process.exit(errors.length ? 1 : 0);
