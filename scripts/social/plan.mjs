#!/usr/bin/env node
/*
  Yayın takvimi: saati olan bölümleri gün gün basar, takvim kurallarını denetler (lib/episodes.mjs schedule()).

  npm run social:plan                  takvim + denetim (depodaki bölümler)

  Canlı takvim stüdyoda (lernomi.app/studio): sunucu işçisi bölümleri social_episodes'a aktarır; stüdyoda değiştirilen
  saat oradadır, depoya geri yazılmaz.

  Çıkış 1: takvim kuralı ya da tekrar engeli hatası.
*/
import { loadEpisodes, duplicates, schedule, SLOTS } from "./lib/episodes.mjs";

const { episodes } = await loadEpisodes();
const dup = duplicates(episodes);
const sch = schedule(episodes);
const entries = episodes.filter((e) => e.slot).sort((a, b) => a.slot.localeCompare(b.slot)).map((e) => ({ id: e.id, slot: e.slot, status: e.status, title: e.data.copy?.title || e.id }));
const DAY_TR = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
let day = "";
for (const e of entries) {
  const d = e.slot.slice(0, 10);
  if (d !== day) {
    day = d;
    console.log(`\n${d} ${DAY_TR[new Date(`${d}T12:00:00Z`).getUTCDay()]}`);
  }
  console.log(`  ${e.slot.slice(11)}  ${e.id.padEnd(22)} ${e.status.padEnd(7)} ${e.title}`);
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
console.log(errors.length ? `\n${errors.length} hata` : `\n✓ ${entries.length} bölüm takvimde, ${days.size} gün`);
process.exitCode = errors.length ? 1 : 0;
