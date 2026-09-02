/**
 * Beceri egzersizlerini mobil pakete döker (data/skills/.exercises.json'dan).
 * de kursu, immersion türleri (reading/listening/writing; speaking düştü).
 * İçerik statik olduğu için doğrudan JSON kopyası yeter.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = join(process.cwd(), "data/skills/.exercises.json");
const raw = JSON.parse(readFileSync(src, "utf8"));
const arr = Array.isArray(raw) ? raw : raw.exercises || Object.values(raw);
// Dökülecek kurs: `node scripts/dump-skills-mobile.mjs <kurs>` (varsayılan "de").
// Sabit "de" yazılıydı; ikinci bir dilde bu betik yine Almanca havuzu yazardı.
const course = (process.argv[2] ?? "de").toLowerCase();
const keep = arr.filter(
  (e) => (e.course ?? "de") === course && ["reading", "listening", "writing"].includes(e.skill),
);
if (!keep.length) {
  console.error(`"${course}" kursu için egzersiz yok — paket yazılmadı.`);
  process.exit(1);
}
// Almanca paketi tarihsel adıyla kalıyor (mobil onu böyle import ediyor);
// yeni kurslar kendi dosyalarına yazılır.
const out = join(process.cwd(), course === "de"
  ? "mobile/src/data/skills/exercises.json"
  : `mobile/src/data/skills/exercises-${course}.json`);
writeFileSync(out, JSON.stringify(keep));
const by = {};
for (const e of keep) by[e.skill] = (by[e.skill] || 0) + 1;
console.log(course, "yazıldı", keep.length, JSON.stringify(by));
