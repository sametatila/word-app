/**
 * Ders sözlükçesini ikiye ayırır: türetilebilen ve elle okunması gereken.
 *
 * TÜRETMENİN SINIRI ÖLÇÜLDÜ, VARSAYILMADI. Almanca başlığın kelime havuzunda
 * karşılığı olması yetmiyor — havuzdaki `en`in DOĞRU olması gerekiyor. Ders
 * sözlükçesi kelimenin BU DERSTEKİ anlamını taşıyor, havuz ise birinci sözlük
 * anlamını. İkisi ayrıştığında türetme yanlış karşılık verir:
 *
 *   bitte      ders «lütfen»     ↔ havuz «rica»       (en: request)
 *   schreiben  ders «yazmak»     ↔ havuz «resmî yazı» (en: letter)
 *   groß       ders «uzun boylu» ↔ havuz «büyük»      (en: grand)
 *
 * Ayrışmayı ölçen şey Türkçe: dersin `tr`i havuzun `tr`iyle birebir aynıysa
 * iki taraf aynı anlamı kastediyor ve havuzun `en`i güvenle alınır. Farklıysa
 * madde okunmalı — çoğu yalnız sözcük tercihidir ama ayırt etmek için okumak
 * gerekiyor, ve bu ayrımı makine yapamaz.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { extractVocab } from "./extract.mjs";

const ROOT = new URL("../../../", import.meta.url).pathname;
const OUT = `${ROOT}data/lessons/vocab`;
const norm = (s) => String(s).toLowerCase().replace(/^(der|die|das)\s+/, "").trim();

const pool = new Map();
for (const r of JSON.parse(readFileSync(`${ROOT}data/app/words.json`, "utf8")))
  if (r.de && r.en) pool.set(norm(r.de), { tr: r.tr, en: r.en });

const rows = extractVocab();
const derived = [];
const todo = [];
for (const r of rows) {
  const w = pool.get(norm(r.de));
  const agree = w && String(w.tr ?? "").toLowerCase().trim() === r.tr.toLowerCase().trim();
  if (agree) derived.push({ lesson: r.lesson, de: r.de, en: w.en });
  else todo.push({ ...r, poolTr: w?.tr ?? null, poolEn: w?.en ?? null });
}

mkdirSync(`${OUT}/in`, { recursive: true });
mkdirSync(`${OUT}/out`, { recursive: true });
writeFileSync(`${OUT}/derived.json`, `${JSON.stringify(derived, null, 1)}\n`);

// Paketler 50'şer madde: en→de hattında bu boy hem tek turda bitiyor hem de
// bir hatanın etkisini paket sınırında tutuyor.
const SIZE = 50;
let n = 0;
for (let i = 0; i < todo.length; i += SIZE) {
  n++;
  const name = `v-${String(n).padStart(3, "0")}`;
  writeFileSync(`${OUT}/in/${name}.json`, `${JSON.stringify({ packet: name, words: todo.slice(i, i + SIZE) }, null, 1)}\n`);
}

console.log(`${rows.length} girdi · ${derived.length} türetildi (%${((100 * derived.length) / rows.length).toFixed(1)}) · ${todo.length} elle (${n} paket)`);
