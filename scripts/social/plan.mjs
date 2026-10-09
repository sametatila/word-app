#!/usr/bin/env node
/*
  Yayın takvimi: saati olan bölümleri gün gün basar, takvim kurallarını denetler (lib/episodes.mjs schedule()).

  npm run social:plan                  takvim + denetim
  npm run social:plan -- --write       ayrıca data/social/plan.json (web admin bunu gösterir; commit edilir)

  Çıkış 1: takvim kuralı ya da tekrar engeli hatası.
*/
import fs from "node:fs";
import { loadEpisodes, duplicates, schedule, SLOTS } from "./lib/episodes.mjs";
import { PLAN, planEntries, planJson } from "./lib/plan.mjs";

const { episodes } = await loadEpisodes();
const dup = duplicates(episodes);
const sch = schedule(episodes);
const entries = planEntries(episodes);
const DAY_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
let day = "";
for (const e of entries) {
  const d = e.slot.slice(0, 10);
  if (d !== day) {
    day = d;
    console.log(`\n${d} ${DAY_TR[new Date(`${d}T12:00:00Z`).getUTCDay()]}`);
  }
  console.log(`  ${e.slot.slice(11)}  ${e.id.padEnd(22)} ${(e.duration ? `${e.duration} sn` : "—").padEnd(8)} ${e.status.padEnd(7)} ${e.title}`);
}
const days = new Set(entries.map((e) => e.slot.slice(0, 10)));
for (const d of days) {
  const n = entries.filter((e) => e.slot.startsWith(d)).length;
  if (n < SLOTS.length) sch.warnings.push(`${d}: ${n}/${SLOTS.length} saat dolu`);
}
console.log("");
for (const w of [...dup.warnings, ...sch.warnings]) console.warn(`~ ${w}`);
const errors = [...dup.errors, ...sch.errors];
for (const e of errors) console.error(`✗ ${e}`);
if (process.argv.includes("--write")) {
  fs.writeFileSync(PLAN, planJson(entries));
  console.log(`→ data/social/plan.json (${entries.length} bölüm)`);
} else if (!fs.existsSync(PLAN) || fs.readFileSync(PLAN, "utf8") !== planJson(entries)) {
  console.warn("~ data/social/plan.json güncel değil: npm run social:plan -- --write");
}
console.log(errors.length ? `\n${errors.length} hata` : `\n✓ ${entries.length} bölüm takvimde, ${days.size} gün`);
process.exitCode = errors.length ? 1 : 0;
