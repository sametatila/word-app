#!/usr/bin/env node
/**
 * Seviye çekirdeği (docs/plan/level-progress.md) — bankadaki kelimelerin RESMÎ çekirdek seviyesi.
 *
 *   node scripts/core-build.mjs <listeler-dizini>   data/core/{de,en}.json üretir
 *   npm run check:core                              veriyi bankaya karşı denetler (CI; listeler gerekmez)
 *
 * Listeler DEPOYA GİRMEZ (telif); dizinde şu dosyaların METNİ (pdf → txt) beklenir:
 *   A1_SD1_Wortliste_02.txt, Goethe-Zertifikat_A2_Wortliste.txt, Goethe-Zertifikat_B1_Wortliste.txt,
 *   The_Oxford_3000_by_CEFR_level.txt, The_Oxford_5000_by_CEFR_level.txt
 * Kaynak adresleri planda. Depoda yalnız BİZİM kelimelerimizin kimliği ve çekirdek seviyesi kalır.
 *
 * Kurallar:
 *   Almanca A1/A2/B1: Goethe listesi (A1 → A1; yalnız A2 listesinde → A2; yalnız B1 → B1).
 *   Almanca B2/C1: resmî liste yok → bankada o seviye etiketli, henüz çekirdek olmayan kelimelerden
 *     sıklık listesinde (data/a2-expansion/de_50k.txt) en sık geçen 1.000'er kelime.
 *   İngilizce A1–C1: Oxford 3000/5000 CEFR seviyesi.
 * Aynı kelimenin bankada birden çok anlamı (kimliği) varsa hepsi aynı çekirdek seviyesini alır.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const LV = ["A1", "A2", "B1", "B2", "C1"];
const DE_FREQ_CORE = 1000;
const CHECK = process.argv.includes("--check");
const norm = (w) => w.toLowerCase().replace(/^(der|die|das|the|to|a|an)\s+/, "").replace(/\(.*?\)/g, "").trim();

const bankDE = JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8"));
const bankEN = fs.readFileSync(path.join(ROOT, "data/app/words-en.json"), "utf8").trim().split("\n").map((l) => JSON.parse(l));

if (CHECK) {
  const errors = [];
  for (const [lang, bank] of [["de", bankDE], ["en", bankEN]]) {
    const file = path.join(ROOT, `data/core/${lang}.json`);
    if (!fs.existsSync(file)) { errors.push(`${lang}: data/core/${lang}.json yok`); continue; }
    const core = JSON.parse(fs.readFileSync(file, "utf8"));
    const ids = new Set(bank.map((w) => w.id));
    const seen = new Set();
    for (const l of LV) {
      const list = core.levels?.[l] ?? [];
      if (list.length < 100) errors.push(`${lang} ${l}: çekirdek ${list.length} < 100`);
      for (const id of list) {
        if (!ids.has(id)) errors.push(`${lang} ${l}: kimlik ${id} bankada yok (kelime silinmiş ya da yeniden numaralanmış: yeniden üret)`);
        if (seen.has(id)) errors.push(`${lang}: kimlik ${id} iki seviyede`);
        seen.add(id);
      }
    }
    console.log(`${lang}: ${LV.map((l) => `${l} ${core.levels?.[l]?.length ?? 0}`).join(" · ")}`);
  }
  if (errors.length) { console.error(`✗ ${errors.length} sorun:\n  ${errors.slice(0, 20).join("\n  ")}`); process.exit(1); }
  console.log("✓ seviye çekirdeği tutarlı");
  process.exit(0);
}

const dir = process.argv[2];
if (!dir) { console.error("kullanım: node scripts/core-build.mjs <listeler-dizini> | --check"); process.exit(2); }
const read = (f) => fs.readFileSync(path.join(dir, f), "utf8");

/* Goethe başlık kelimesi: küçük artikel + Büyük isim, ya da satır başında küçük harfli kelime +
   virgül/çift boşluk/son. Örnek cümleler büyük harfle başlıyor, sayılmıyor. */
function goethe(text) {
  const out = new Set();
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\t/g, " ").trim();
    let m = line.match(/^(der|die|das)\s+([A-ZÄÖÜ][A-Za-zÄÖÜäöüß-]+)/);
    if (m) { out.add(m[2].toLowerCase()); continue; }
    m = line.match(/^([a-zäöüß][a-zäöüß-]{1,})(?=,|\s{2,}|\s*$)/);
    if (m) out.add(m[1]);
  }
  return out;
}
function oxford(text, into) {
  let cur = null;
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (/^(A1|A2|B1|B2|C1)$/.test(line)) { cur = line; continue; }
    if (!cur) continue;
    const m = line.match(/^([a-z][a-z' -]*?)(?:\d)?\s+(?:n\.|v\.|adj\.|adv\.|prep\.|conj\.|det\.|pron\.|exclam\.|number|modal|indefinite|definite|auxiliary|linking|ordinal|infinitive)/i);
    if (m) for (const w of m[1].split(",")) { const k = w.trim().toLowerCase(); if (!into.has(k)) into.set(k, cur); }
  }
}

const gA1 = goethe(read("A1_SD1_Wortliste_02.txt"));
const gA2 = goethe(read("Goethe-Zertifikat_A2_Wortliste.txt"));
const gB1 = goethe(read("Goethe-Zertifikat_B1_Wortliste.txt"));
const deLevel = (w) => (gA1.has(w) ? "A1" : gA2.has(w) ? "A2" : gB1.has(w) ? "B1" : null);
const freq = new Map(fs.readFileSync(path.join(ROOT, "data/a2-expansion/de_50k.txt"), "utf8").trim().split("\n").map((l, i) => [l.split(/\s+/)[0].toLowerCase(), i + 1]));

const out = { de: Object.fromEntries(LV.map((l) => [l, []])), en: Object.fromEntries(LV.map((l) => [l, []])) };
const taken = new Set();
for (const w of bankDE) {
  const l = deLevel(norm(w.de));
  if (l) { out.de[l].push(w.id); taken.add(w.id); }
}
for (const l of ["B2", "C1"]) {
  const cand = bankDE
    .filter((w) => w.niveau === l && !taken.has(w.id) && freq.has(norm(w.de)))
    .sort((a, b) => freq.get(norm(a.de)) - freq.get(norm(b.de)));
  /* Aynı kelimenin anlamları birlikte girer: 1.000 farklı KELİME (kimlik değil). */
  const words = [];
  for (const w of cand) { const k = norm(w.de); if (!words.includes(k)) words.push(k); if (words.length >= DE_FREQ_CORE) break; }
  const pick = new Set(words);
  for (const w of cand) if (pick.has(norm(w.de))) { out.de[l].push(w.id); taken.add(w.id); }
}
const ox = new Map();
oxford(read("The_Oxford_3000_by_CEFR_level.txt"), ox);
oxford(read("The_Oxford_5000_by_CEFR_level.txt"), ox);
for (const w of bankEN) { const l = ox.get(norm(w.de)); if (l) out.en[l].push(w.id); }

for (const lang of ["de", "en"]) {
  const levels = Object.fromEntries(LV.map((l) => [l, out[lang][l].sort((a, b) => a - b)]));
  const body = {
    _: "ÜRETİLDİ — scripts/core-build.mjs. Bankadaki kelimelerin resmî çekirdek seviyesi (docs/plan/level-progress.md). Elle düzenleme.",
    source: lang === "de" ? "Goethe A1/A2/B1 kelime listeleri; B2/C1 sıklık (de_50k, 1.000 kelime)" : "Oxford 3000/5000 CEFR seviyeleri",
    levels,
  };
  fs.mkdirSync(path.join(ROOT, "data/core"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, `data/core/${lang}.json`), JSON.stringify(body) + "\n");
  console.log(`${lang}: ${LV.map((l) => `${l} ${levels[l].length}`).join(" · ")}`);
}
