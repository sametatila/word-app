#!/usr/bin/env node
/**
 * Seviye testi v2 — banka ve motor senkronu + kapı (docs/plan/placement-v2.md).
 *
 *   npm run placement:sync    data/placement/*.json → src/lib/placement-bank.ts ve
 *                             mobile/src/data/placementBank.ts (birebir aynı), motor →
 *                             mobile/src/lib/placementEngine.ts (birebir kopya).
 *   npm run check:placement   bankayı denetler; üretilen dosyalar güncel değilse düşer (CI).
 *
 * Kaynakta DOĞRU ŞIK HER ZAMAN İLK sırada (yazması ve gözden geçirmesi kolay). Üretimde şıklar
 * madde kimliğinden türeyen sabit bir sırayla karıştırılır: aynı madde her yerde aynı sırada,
 * ama doğru cevap hep ilk değil.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const LANGS = ["de", "en"];
const MIN = { cloze: 5, reading: 3, listening: 3 };
const OPTIONS = { cloze: 4, reading: 4, listening: 3 };
const CARDS_PER_LEVEL = 8;
const PSEUDO_MIN = 12;

const errors = [];
const fail = (m) => errors.push(m);

/** Kimlikten sabit tohum (FNV-1a) → Fisher–Yates. */
function seeded(id) {
  let h = 2166136261;
  for (const ch of id) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return () => { h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x9e3779b9) >>> 0; return h / 4294967296; };
}
function shuffled(arr, id) {
  const rng = seeded(id);
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Kelime bankası: uydurma kelime gerçek bir kelimeyle çakışmasın. */
function bankWords(lang) {
  if (lang === "de") return new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")).map((w) => w.de.toLowerCase()));
  return new Set(fs.readFileSync(path.join(ROOT, "data/app/words-en.json"), "utf8").trim().split("\n").map((l) => JSON.parse(l).de.toLowerCase()));
}
const bare = (w) => w.replace(/^(der|die|das)\s+/i, "").toLowerCase();

const out = {};
for (const lang of LANGS) {
  const src = JSON.parse(fs.readFileSync(path.join(ROOT, `data/placement/${lang}.json`), "utf8"));
  const ids = new Set();
  const cards = [];
  for (const level of LEVELS) {
    const list = src.cards?.[level] ?? [];
    if (list.length < CARDS_PER_LEVEL) fail(`${lang} kart ${level}: ${list.length} < ${CARDS_PER_LEVEL}`);
    list.forEach((word, i) => cards.push({ id: `${lang}-w-${level.toLowerCase()}-${i + 1}`, word, level }));
  }
  const pseudo = src.cards?.pseudo ?? [];
  if (pseudo.length < PSEUDO_MIN) fail(`${lang} uydurma kelime ${pseudo.length} < ${PSEUDO_MIN}`);
  const known = bankWords(lang);
  const realCards = new Set(cards.map((c) => bare(c.word)));
  pseudo.forEach((word, i) => {
    if (known.has(bare(word)) || realCards.has(bare(word))) fail(`${lang} uydurma "${word}" gerçek bir kelime (kelime bankasında)`);
    cards.push({ id: `${lang}-p-${i + 1}`, word, level: null });
  });
  const seen = new Set();
  for (const c of cards) { if (seen.has(bare(c.word))) fail(`${lang} kart tekrarı: ${c.word}`); seen.add(bare(c.word)); }

  const items = [];
  for (const it of src.items) {
    const where = `${lang} ${it.id}`;
    if (ids.has(it.id)) fail(`${where}: kimlik tekrarı`);
    ids.add(it.id);
    if (!new RegExp(`^${lang}-(a1|a2|b1|b2|c1)-[crl]\\d+$`).test(it.id)) fail(`${where}: kimlik biçimi`);
    if (!LEVELS.includes(it.level) || !it.id.includes(`-${it.level.toLowerCase()}-`)) fail(`${where}: seviye/kimlik uyuşmuyor`);
    if (!(it.kind in OPTIONS)) { fail(`${where}: tür ${it.kind}`); continue; }
    if (it.kind[0] !== it.id.split("-")[2][0]) fail(`${where}: tür/kimlik harfi uyuşmuyor`);
    if (typeof it.offset !== "number" || Math.abs(it.offset) > 0.3) fail(`${where}: offset −0,3…0,3`);
    if (it.options?.length !== OPTIONS[it.kind]) fail(`${where}: ${OPTIONS[it.kind]} şık olmalı`);
    const norm = (it.options ?? []).map((o) => o.trim().toLowerCase());
    if (new Set(norm).size !== norm.length) fail(`${where}: şık tekrarı`);
    if (it.kind === "cloze" && (it.text?.split("___").length ?? 0) !== 2) fail(`${where}: boşluk (___) tam bir kez`);
    if (it.kind === "reading" && (!it.text || !it.question)) fail(`${where}: okuma metni ve soru`);
    if (it.kind === "listening" && (!it.audio || !it.question)) fail(`${where}: dinleme metni ve soru`);
    if (it.audio && it.audio.length > 300) fail(`${where}: dinleme metni 300 karakteri aşıyor`);
    const options = shuffled(it.options, it.id);
    items.push({
      id: it.id, level: it.level, offset: it.offset, kind: it.kind,
      ...(it.text ? { text: it.text } : {}), ...(it.question ? { question: it.question } : {}), ...(it.audio ? { audio: it.audio } : {}),
      options, answer: options.indexOf(it.options[0]),
    });
  }
  for (const level of LEVELS) {
    for (const kind of Object.keys(MIN)) {
      const n = items.filter((x) => x.level === level && x.kind === kind).length;
      if (n < MIN[kind]) fail(`${lang} ${level} ${kind}: ${n} < ${MIN[kind]}`);
    }
  }
  /* Karıştırma doğru cevabı belli bir yere yığmasın (ör. hep ilk). */
  const firstShare = items.filter((x) => x.answer === 0).length / items.length;
  if (firstShare > 0.45) fail(`${lang}: doğru cevap %${Math.round(firstShare * 100)} ilk şıkta`);
  out[lang] = { cards, items };
}

const HEADER = `/* ÜRETİLDİ — elle düzenleme. Kaynak data/placement/*.json, \`npm run placement:sync\`.
   Web (src/lib/placement-bank.ts) ve mobil (mobile/src/data/placementBank.ts) birebir aynı. */\n`;
const bankTs = `${HEADER}import type { BankItem, VocabCard } from "${"<ENGINE>"}";

export type PlacementItem = BankItem & { text?: string; question?: string; audio?: string };
export type PlacementBank = { cards: VocabCard[]; items: PlacementItem[] };

export const PLACEMENT_BANK: Record<"de" | "en", PlacementBank> = ${JSON.stringify(out, null, 2)};
`;
const engineSrc = fs.readFileSync(path.join(ROOT, "src/lib/placement-engine.ts"), "utf8");
const targets = [
  [path.join(ROOT, "src/lib/placement-bank.ts"), bankTs.replace("<ENGINE>", "@/lib/placement-engine")],
  [path.join(ROOT, "mobile/src/data/placementBank.ts"), bankTs.replace("<ENGINE>", "../lib/placementEngine")],
  [path.join(ROOT, "mobile/src/lib/placementEngine.ts"), `/* ÜRETİLDİ — src/lib/placement-engine.ts'in birebir kopyası (\`npm run placement:sync\`). Burada değiştirme. */\n${engineSrc}`],
];
for (const [file, content] of targets) {
  const cur = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (cur === content) continue;
  if (CHECK) fail(`${path.relative(ROOT, file)} güncel değil: npm run placement:sync`);
  else { fs.writeFileSync(file, content); console.log(`yazıldı  ${path.relative(ROOT, file)}`); }
}

for (const lang of LANGS) console.log(`${lang}: ${out[lang].items.length} madde, ${out[lang].cards.filter((c) => c.level).length} kelime + ${out[lang].cards.filter((c) => !c.level).length} uydurma`);
if (errors.length) { console.error(`\n✗ ${errors.length} sorun:\n  ${errors.join("\n  ")}`); process.exit(1); }
console.log("✓ seviye testi bankası tutarlı");
