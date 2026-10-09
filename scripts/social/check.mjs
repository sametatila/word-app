#!/usr/bin/env node
/*
  Bölüm denetimi: bütün bölümler yüklenir (kelime words.json'da mı, ses var mı, şablon var mı), tekrar engeli
  uygulanır, bölüm listesi basılır.

  npm run social:check

  Çıkış 1: aynı yaklaşımda tekrar eden kelime, yüklenemeyen bölüm ya da takvim kuralı (30 günden yakın ortak kelime
  dahil). Farklı yaklaşımlar arası daha uzak ortak kelime uyarıdır.
  Yeni bölüm yazınca önce bu, sonra npm run social:gallery + social:audit, en son social:render.
*/
import { loadEpisodes, duplicates, schedule } from "./lib/episodes.mjs";

const { episodes } = await loadEpisodes();
const dup = duplicates(episodes);
const sch = schedule(episodes); // takvim kuralları; ayrıntılı takvim: npm run social:plan
const errors = [...dup.errors, ...sch.errors];
const warnings = [...dup.warnings, ...sch.warnings];
const by = {};
for (const e of episodes) (by[e.approach] ||= []).push(e);
for (const [ap, list] of Object.entries(by).sort()) {
  console.log(`\n${ap} (${list.length})`);
  for (const e of list) console.log(`  ${e.id.padEnd(22)} ${e.status.padEnd(8)} ${e.slot ? `▸ ${e.slot}` : "".padEnd(18)} ${e.created || ""}${e.published ? ` · yayın ${e.published}` : ""}  ${e.used.length} kelime`);
}
console.log("");
for (const w of warnings) console.warn(`~ ${w}`);
for (const e of errors) console.error(`✗ ${e}`);
console.log(errors.length ? `\n${errors.length} hata` : `\n✓ ${episodes.length} bölüm, tekrar yok`);
process.exitCode = errors.length ? 1 : 0;
