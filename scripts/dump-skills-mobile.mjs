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
const keep = arr.filter(
  (e) => (e.course ?? "de") === "de" && ["reading", "listening", "writing"].includes(e.skill),
);
const out = join(process.cwd(), "mobile/src/data/skills/exercises.json");
writeFileSync(out, JSON.stringify(keep));
const by = {};
for (const e of keep) by[e.skill] = (by[e.skill] || 0) + 1;
console.log("yazıldı", keep.length, JSON.stringify(by));
