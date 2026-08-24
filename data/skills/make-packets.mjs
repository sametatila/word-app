/**
 * Beceri sözlükçesi paketlerini üretir: `node data/skills/make-packets.mjs [boyut]`
 *
 * Paket birimi **egzersiz**, kelime değil: sözlükçe karşılığı ancak metin
 * okunarak seçilebiliyor. Alışveriş ilanındaki `das Angebot` "teklif" değil
 * "indirim"dir ve bunu ancak ilanı okuyan biri bilir. Bu yüzden her pakete
 * egzersizin **tam metni** giriyor — okuma parçası, dinleme bölümleri, yazma
 * uyaranı ya da konuşma cümleleri.
 *
 * `havuz` alanı kritik. Aynı kelimeye iki ekranda iki farklı karşılık vermek
 * uygulamayı kendisiyle çelişir hâle getiriyordu: Almanca kursunun 895
 * sözlükçe maddesinden 392'si kelime havuzundan farklı bir karşılık veriyordu
 * (Kuchen "pasta, kek" ↔ "kek", abfahren "kalkmak, hareket etmek" ↔
 * "kalkmak"). Havuzun karşılığı pakete konuyor ki ajan aramak zorunda kalmasın
 * ve ancak metin gerçekten başka bir anlam kullanıyorsa ondan ayrılsın.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const ROOT = new URL("../..", import.meta.url).pathname;
const SIZE = Number(process.argv[2] || 8);

/** İçerik TypeScript'te ve derlemeye gömülü; JSON'a tsx üzerinden çıkarılıyor. */
const dumpPath = `${ROOT}data/skills/.exercises.json`;
execFileSync(
  "npx",
  [
    "tsx",
    "-e",
    `import { BUNDLED_EXERCISES } from "./src/lib/skills/bundled";
     import { writeFileSync } from "node:fs";
     writeFileSync(${JSON.stringify(dumpPath)}, JSON.stringify(BUNDLED_EXERCISES));`,
  ],
  { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] },
);
const exercises = JSON.parse(readFileSync(dumpPath, "utf8"));

/** Kelime havuzunun yenilenmiş karşılıkları (data/meanings/out). */
const words = JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8"));
const byId = new Map(words.map((w) => [w.id, w]));
const havuz = new Map();
for (const f of readdirSync(`${ROOT}data/meanings/out`).filter((f) => f.endsWith(".json"))) {
  for (const m of JSON.parse(readFileSync(`${ROOT}data/meanings/out/${f}`, "utf8"))) {
    const w = byId.get(m.id);
    if (w) havuz.set(w.de.toLocaleLowerCase("de-DE"), { tr: m.tr, en: m.en });
  }
}

/** Madde başlığından artikeli düşürerek havuzda arar. */
const havuzda = (de) =>
  havuz.get(de.replace(/^(der|die|das|de|d|s)\s+/i, "").toLocaleLowerCase("de-DE"));

/** Egzersizin öğrencinin gördüğü Almanca gövdesi. */
function govde(e) {
  if (e.skill === "reading") return e.text ?? "";
  if (e.skill === "listening")
    return (e.segments ?? []).map((s) => (s.speaker ? `${s.speaker}: ${s.text}` : s.text)).join("\n");
  if (e.skill === "writing")
    return (e.tasks ?? [])
      .map((t) => (t.kind === "build" ? t.answer : [t.stimulus, t.sample].filter(Boolean).join("\n\n")))
      .join("\n\n");
  if (e.tasks) return e.tasks.map((t) => t.de).join("\n");
  if (e.dialogue) return e.dialogue.map((d) => d.say ?? d.prompt ?? "").filter(Boolean).join("\n");
  return "";
}

mkdirSync(`${ROOT}data/skills/in`, { recursive: true });
mkdirSync(`${ROOT}data/skills/out`, { recursive: true });

const index = [];
let alan = 0;
for (const course of ["de", "gsw-zh"]) {
  const rows = exercises.filter((e) => (e.course ?? "de") === course);
  const slugBase = course === "de" ? "de" : "zh";

  for (let i = 0; i < rows.length; i += SIZE) {
    const slug = `${slugBase}-${String(Math.floor(i / SIZE) + 1).padStart(3, "0")}`;
    const paket = rows.slice(i, i + SIZE).map((e) => {
      const kayit = {
        id: e.id,
        skill: e.skill,
        level: e.level,
        title: e.title,
        genre: e.genre,
        intro: e.intro,
        metin: govde(e),
        gloss: (e.gloss ?? []).map((g) => {
          const h = havuzda(g.de);
          return { de: g.de, mevcutTr: g.tr, ...(h ? { havuz: h } : {}) };
        }),
      };
      if (e.skill === "writing") {
        const free = (e.tasks ?? []).filter((t) => t.kind === "free");
        if (free.length)
          kayit.phrases = free.flatMap((t) =>
            (t.phrases ?? []).map((p) => ({ de: p.de, mevcutTr: p.tr })),
          );
      }
      if (e.skill === "speaking") {
        if (e.tasks) kayit.tasks = e.tasks.map((t) => ({ de: t.de, mevcutTr: t.tr }));
        if (e.targets)
          kayit.targets = e.targets.map((t) => ({ de: t.de, mevcutTr: t.tr }));
      }
      alan +=
        kayit.gloss.length +
        (kayit.phrases?.length ?? 0) +
        (kayit.tasks?.length ?? 0) +
        (kayit.targets?.length ?? 0);
      return kayit;
    });

    writeFileSync(
      `${ROOT}data/skills/in/${slug}.json`,
      JSON.stringify({ paket: slug, course, egzersizler: paket }, null, 1) + "\n",
    );
    index.push({ paket: slug, course, egzersiz: paket.length });
  }
}

writeFileSync(`${ROOT}data/skills/in/_index.json`, JSON.stringify(index, null, 1) + "\n");
const bitmis = index.filter((p) => existsSync(`${ROOT}data/skills/out/${p.paket}.json`)).length;
console.log(`${exercises.length} egzersiz → ${index.length} paket (${SIZE}'lik), ${alan} alan`);
for (const c of ["de", "gsw-zh"]) {
  const p = index.filter((x) => x.course === c);
  console.log(`  ${c}: ${p.length} paket, ${p.reduce((s, x) => s + x.egzersiz, 0)} egzersiz`);
}
console.log(`havuzda karşılığı bulunan sözlükçe kelimesi: ${havuz.size} kayıtlık havuz`);
console.log(`çıktısı hazır olan: ${bitmis}/${index.length}`);
