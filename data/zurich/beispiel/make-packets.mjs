/**
 * Züritüütsch örnek cümle paketlerini üretir:
 *   `node data/zurich/beispiel/make-packets.mjs [seviye|paket|all]`
 *
 * Paketler Almanca paketlerle **birebir aynı adı ve aynı maddeleri** taşıyor.
 * Bunun sebebi çevirinin tek yerde durması: lehçe cümlesinin Türkçe ve
 * İngilizce karşılığı ayrıca yazılmıyor, Almanca cümlenin karşılığı olduğu
 * gibi devralınıyor. İki hattın aynı bölünmeyi kullanması, bir maddenin
 * Almancası hazırken lehçesinin hazır olmadığı ara durumları paket düzeyinde
 * görünür kılıyor.
 *
 * Yalnızca Almancası yenilenmiş paketler üretilir: lehçe cümlesi, karşılığını
 * devralacağı cümle yazılmadan yazılamaz.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";

const ROOT = new URL("../../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const words = new Map(
  JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8")).map((w) => [w.id, w]),
);

/** Züritüütsch biçim ve bugünkü lehçe cümlesi. */
const gsw = new Map();
for (const f of readdirSync(`${ROOT}data/zurich`).filter((f) => /^chunk-\d+\.json$/.test(f))) {
  for (const r of JSON.parse(readFileSync(`${ROOT}data/zurich/${f}`, "utf8"))) gsw.set(r.id, r);
}

const IN = `${ROOT}data/zurich/beispiel/in`;
mkdirSync(IN, { recursive: true });
mkdirSync(`${ROOT}data/zurich/beispiel/out`, { recursive: true });

const ready = readdirSync(`${ROOT}data/meanings/out`)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""))
  .filter((slug) => ARG === "all" || slug === ARG || slug.startsWith(`${ARG}-`))
  .sort();

if (!ready.length) {
  console.log("Almancası yenilenmiş paket yok — önce data/meanings/out doldurulmalı.");
  process.exit(0);
}

let total = 0;
let missing = 0;
for (const slug of ready) {
  const de = JSON.parse(readFileSync(`${ROOT}data/meanings/out/${slug}.json`, "utf8"));
  const packetWords = [];
  for (const m of de) {
    const src = words.get(m.id);
    const z = gsw.get(m.id);
    // Lehçe karşılığı olmayan madde atlanır: kaynağı olmayan bir kayıt
    // üretmek, seed-zurich'in yüklemeyi durdurması demek.
    if (!src || !z) {
      missing++;
      continue;
    }
    packetWords.push({
      id: m.id,
      gsw: z.gsw,
      artikel: z.artikel ?? null,
      hd: `${src.artikel ? src.artikel + " " : ""}${src.de}`,
      niveau: src.niveau,
      beispielDe: m.beispiel,
      currentGsw: z.beispiel || "",
    });
  }
  if (!packetWords.length) continue;
  writeFileSync(
    `${IN}/${slug}.json`,
    JSON.stringify({ packet: slug, words: packetWords }, null, 1) + "\n",
  );
  total += packetWords.length;
}

const finished = ready.filter((s) =>
  existsSync(`${ROOT}data/zurich/beispiel/out/${s}.json`),
).length;
console.log(`${ready.length} paket, ${total} madde${missing ? ` (${missing} maddenin lehçe karşılığı yok)` : ""}`);
console.log(`çıktısı hazır olan: ${finished}/${ready.length}`);
