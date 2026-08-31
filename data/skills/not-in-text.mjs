/**
 * Sözlükçesinde metinde geçmeyen kelime bulunan egzersizleri listeler:
 *   `node data/skills/not-in-text.mjs > data/skills/NOT-IN-TEXT.md`
 *
 * Bu bir çeviri kusuru değil **içerik** kusuru, o yüzden sözlükçe yenileme
 * hattı ona dokunmuyor: bir egzersizin sözlükçesinin hangi maddeyi taşıyacağı
 * ayrı bir karar ve o kararı veren kişi metni de değiştirebilir. Hat yalnızca
 * bulup bildiriyor.
 *
 * İki bağımsız kaynak birleştiriliyor. Paketi üreten ajan metni okuyup
 * `notInText` alanına yazdıklarını bildiriyor; `contains` ise aynı soruyu
 * Almanca morfolojisiyle mekanik olarak soruyor. Rapora ikisinin **birlikte**
 * doğruladıkları giriyor — ajan yanılabilir, denetleyici de gevşek olabilir,
 * ama ikisinin aynı anda yanılması çok daha zor.
 */
import { readdirSync, readFileSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const IN = `${ROOT}data/skills/in`;
const OUT = `${ROOT}data/skills/out`;

const exerciseById = new Map();
for (const f of readdirSync(IN).filter((f) => f.endsWith(".json") && !f.startsWith("_")))
  for (const e of JSON.parse(readFileSync(`${IN}/${f}`, "utf8")).exercises) exerciseById.set(e.id, e);

const rows = [];
let confirmed = 0;
let disputed = 0;
for (const f of readdirSync(OUT).filter((f) => f.endsWith(".json")).sort())
  for (const r of JSON.parse(readFileSync(`${OUT}/${f}`, "utf8"))) {
    const e = exerciseById.get(r.id);
    if (!e?.text) continue;
    const reported = r.notInText ?? [];
    if (!reported.length) continue;
    const verified = reported.filter((w) => !contains(e.text, w));
    disputed += reported.length - verified.length;
    if (!verified.length) continue;
    confirmed += verified.length;
    rows.push({
      id: r.id,
      level: e.level,
      skill: e.skill,
      title: e.title,
      missing: verified,
      total: (e.gloss ?? []).length,
    });
  }

rows.sort((a, b) => b.missing.length / b.total - a.missing.length / a.total || a.id.localeCompare(b.id));

console.log("# Metinde geçmeyen sözlükçe maddeleri\n");
console.log(
  `Sözlükçenin işi **bu metindeki** kelimeleri açıklamak. Aşağıdaki ${confirmed} madde\n` +
    `kendi egzersizinin metninde hiçbir biçimde geçmiyor — çekimli, ayrılmış ya da\n` +
    `bileşik hâlde de yok. ${rows.length} egzersizi ilgilendiriyor.\n`,
);
console.log(
  "Liste iki bağımsız kaynağın kesişimi: paketi üreten ajan metni okuyup bildirdi,\n" +
    "`contains` aynı soruyu Almanca morfolojisiyle mekanik olarak sordu. Ajanların\n" +
    `bildirdiği ${confirmed + disputed} maddenin ${disputed} tanesini denetleyici buluyor;\n` +
    "onlar rapora girmedi.\n",
);
console.log("Yeniden üretmek için: `node data/skills/not-in-text.mjs`\n");
console.log("Oran, sözlükçenin ne kadarının metinle ilgisiz olduğunu gösteriyor.\n");
console.log("| egzersiz | seviye | tür | oran | metinde geçmeyenler |");
console.log("| --- | --- | --- | --- | --- |");
for (const s of rows)
  console.log(
    `| \`${s.id}\` ${s.title} | ${s.level} | ${s.skill} | ${s.missing.length}/${s.total} | ${s.missing.map((w) => `\`${w}\``).join(", ")} |`,
  );
