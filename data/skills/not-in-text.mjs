/**
 * Sözlükçesinde metinde geçmeyen kelime bulunan egzersizleri listeler:
 *   `node data/skills/metinde-yok.mjs > data/skills/METINDE-YOK.md`
 *
 * Bu bir çeviri kusuru değil **içerik** kusuru, o yüzden sözlükçe yenileme
 * hattı ona dokunmuyor: bir egzersizin sözlükçesinin hangi maddeyi taşıyacağı
 * ayrı bir karar ve o kararı veren kişi metni de değiştirebilir. Hat yalnızca
 * bulup bildiriyor.
 *
 * İki bağımsız kaynak birleştiriliyor. Paketi üreten ajan metni okuyup
 * `metindeYok` alanına yazdıklarını bildiriyor; `contains` ise aynı soruyu
 * Almanca morfolojisiyle mekanik olarak soruyor. Rapora ikisinin **birlikte**
 * doğruladıkları giriyor — ajan yanılabilir, denetleyici de gevşek olabilir,
 * ama ikisinin aynı anda yanılması çok daha zor.
 */
import { readdirSync, readFileSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const IN = `${ROOT}data/skills/in`;
const OUT = `${ROOT}data/skills/out`;

const egzersiz = new Map();
for (const f of readdirSync(IN).filter((f) => f.endsWith(".json") && !f.startsWith("_")))
  for (const e of JSON.parse(readFileSync(`${IN}/${f}`, "utf8")).egzersizler) egzersiz.set(e.id, e);

const satirlar = [];
let onaylanan = 0;
let itirazli = 0;
for (const f of readdirSync(OUT).filter((f) => f.endsWith(".json")).sort())
  for (const r of JSON.parse(readFileSync(`${OUT}/${f}`, "utf8"))) {
    const e = egzersiz.get(r.id);
    if (!e?.metin) continue;
    const bildirilen = r.metindeYok ?? [];
    if (!bildirilen.length) continue;
    const onayli = bildirilen.filter((w) => !contains(e.metin, w));
    itirazli += bildirilen.length - onayli.length;
    if (!onayli.length) continue;
    onaylanan += onayli.length;
    satirlar.push({
      id: r.id,
      level: e.level,
      skill: e.skill,
      title: e.title,
      eksik: onayli,
      toplam: (e.gloss ?? []).length,
    });
  }

satirlar.sort((a, b) => b.eksik.length / b.toplam - a.eksik.length / a.toplam || a.id.localeCompare(b.id));

console.log("# Metinde geçmeyen sözlükçe maddeleri\n");
console.log(
  `Sözlükçenin işi **bu metindeki** kelimeleri açıklamak. Aşağıdaki ${onaylanan} madde\n` +
    `kendi egzersizinin metninde hiçbir biçimde geçmiyor — çekimli, ayrılmış ya da\n` +
    `bileşik hâlde de yok. ${satirlar.length} egzersizi ilgilendiriyor.\n`,
);
console.log(
  "Liste iki bağımsız kaynağın kesişimi: paketi üreten ajan metni okuyup bildirdi,\n" +
    "`contains` aynı soruyu Almanca morfolojisiyle mekanik olarak sordu. Ajanların\n" +
    `bildirdiği ${onaylanan + itirazli} maddenin ${itirazli} tanesini denetleyici buluyor;\n` +
    "onlar rapora girmedi.\n",
);
console.log("Yeniden üretmek için: `node data/skills/metinde-yok.mjs`\n");
console.log("Oran, sözlükçenin ne kadarının metinle ilgisiz olduğunu gösteriyor.\n");
console.log("| egzersiz | seviye | tür | oran | metinde geçmeyenler |");
console.log("| --- | --- | --- | --- | --- |");
for (const s of satirlar)
  console.log(
    `| \`${s.id}\` ${s.title} | ${s.level} | ${s.skill} | ${s.eksik.length}/${s.toplam} | ${s.eksik.map((w) => `\`${w}\``).join(", ")} |`,
  );
