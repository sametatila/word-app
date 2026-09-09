/**
 * Beceri egzersizlerini mobil pakete döker — KAYNAKTAN.
 *
 * Eskisi (dump-skills-mobile.mjs) `data/skills/.exercises.json` adlı bir ara
 * dosyayı okuyordu: git'te izlenmiyordu, onu ÜRETEN hiçbir betik yoktu ve
 * elle bırakıldığı günden (24 Ağustos) kalmaydı. Yani kaynak `.ts` dosyaları
 * değiştiğinde mobil paket sessizce eski içerikte kalıyordu.
 *
 * Bu sürüm doğrudan BUNDLED_EXERCISES'i okur — web'in kullandığı aynı kaynak.
 *
 * Kullanım: npx tsx scripts/dump-skills-mobile.ts [kurs]   (varsayılan "de")
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";

const course = (process.argv[2] ?? "de").toLowerCase();
// Beş beceri: konuşma ve dil bilgisi Beceriler kütüphanesiyle (2026-09)
// geldi ve mobilde ItemScreen'de oynatıcıları var. Süzgeç yine de duruyor:
// tanınmayan bir beceri pakete girip mobilde boş ekran açmasın.
const SKILLS = ["reading", "listening", "writing", "speaking", "grammar"];
const keep = BUNDLED_EXERCISES.filter(
  (e) => ((e as { course?: string }).course ?? "de") === course && SKILLS.includes(e.skill),
);
if (!keep.length) {
  console.error(`"${course}" kursu için egzersiz yok — paket yazılmadı.`);
  process.exit(1);
}
// Almanca paketi tarihsel adıyla kalıyor (mobil onu böyle import ediyor).
const out = join(process.cwd(), course === "de"
  ? "mobile/src/data/skills/exercises.json"
  : `mobile/src/data/skills/exercises-${course}.json`);
writeFileSync(out, JSON.stringify(keep));

const by: Record<string, number> = {};
for (const e of keep) by[`${e.level}/${e.skill}`] = (by[`${e.level}/${e.skill}`] ?? 0) + 1;
console.log(course, "yazıldı", keep.length, JSON.stringify(by));
