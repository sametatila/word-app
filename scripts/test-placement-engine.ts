/**
 * Seviye testi v2 — benzetim kapısı (`npm run test:placement`, docs/plan/placement-v2.md).
 *
 * Veritabanı ve ağ gerektirmez. Bilinen yetenekte (θ) sanal kullanıcılar testi uçtan uca
 * çözer: öz değerlendirme → kelime kartları → uyarlanabilir sorular. Motorun modeline
 * BİLEREK uymayan veriyle: her maddenin gerçek zorluğu etiketinden sapıyor (σ 0,35),
 * ayırt ediciliği 0,8–1,6 arası rastgele, insanlar kendi seviyesini ±1 yanlış biliyor.
 * Üç davranış: dürüst ("bilmiyorum" der), tahminci (hiç "bilmiyorum" demez), abartan
 * (kelime kartlarında uydurmalara da "biliyorum" der).
 *
 * Banka verilirse (`--bank data/placement/de.json`) gerçek madde ve kartlarla, yoksa
 * sentetik bankayla koşar. Eşikler (planda gerekçesiyle): tam isabet ≥ %70, kabul ≥ %85,
 * ±1 içinde ≥ %99,5, iki seviye sapma ≤ %0,5. Sıfır hata 4 dakikada gerçekçi değil: sınırdaki
 * kişi iki seviye arasında; sonuç ekranı "X'e yakın" der, ±1 seçtirir, ilk hafta düzeltir.
 * Eski 8 soruluk test aynı insanlarla karşılaştırılır (bilgi için).
 */
import fs from "node:fs";
import {
  LEVELS, LEVEL_THETA, type Level, type BankItem, type VocabCard, type Session,
  newSession, nextItem, shouldStop, result, difficulty, levelOf, VOCAB_SHIFT,
} from "../src/lib/placement-engine";

let seed = Number(process.env.PLACEMENT_SIM_SEED) || 20261003;
const rng = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const gauss = () => Math.sqrt(-2 * Math.log(rng() || 1e-9)) * Math.cos(2 * Math.PI * rng());
const sig = (x: number) => 1 / (1 + Math.exp(-x));

type Bank = { items: BankItem[]; cards: VocabCard[] };

function syntheticBank(): Bank {
  const items: BankItem[] = [];
  const cards: VocabCard[] = [];
  for (const level of LEVELS) {
    [-0.3, -0.15, 0, 0, 0.15, 0.3, -0.2, 0.2, 0, 0.1].forEach((offset, i) =>
      items.push({ id: `${level}-${i}`, level, offset, kind: i % 2 ? "reading" : "cloze", options: ["a", "b", "c", "d"], answer: 0 }));
    [-0.2, 0, 0.2].forEach((offset, i) =>
      items.push({ id: `${level}-L${i}`, level, offset, kind: "listening", options: ["a", "b", "c"], answer: 0 }));
    for (let i = 0; i < 5; i++) cards.push({ id: `${level}-w${i}`, word: `${level}w${i}`, level });
  }
  for (let i = 0; i < 8; i++) cards.push({ id: `p${i}`, word: `p${i}`, level: null });
  return { items, cards };
}

function loadBank(file: string): Bank {
  const raw = JSON.parse(fs.readFileSync(file, "utf8")) as Bank;
  return { items: raw.items, cards: raw.cards };
}

type Profile = "durust" | "tahminci" | "abartan";

/** Bir insanın testi çözmesi; döner: önerilen seviye ve soru sayısı. */
function take(theta: number, profile: Profile, bank: Bank, truth: Map<string, { b: number; a: number }>): { level: Level; near: Level | null; items: number } {
  const self = levelOf(theta + gauss() * 0.8);
  const known: Record<string, boolean> = {};
  for (const c of bank.cards) {
    if (c.level === null) known[c.id] = profile === "abartan" ? rng() < 0.5 : rng() < 0.05;
    else {
      const p = sig(theta - (LEVEL_THETA[c.level] + VOCAB_SHIFT + gauss() * 0.4));
      known[c.id] = rng() < p || (profile === "abartan" && rng() < 0.4);
    }
  }
  const s: Session = newSession(self, bank.cards, known, true);
  const map = new Map(bank.items.map((it) => [it.id, it]));
  while (!shouldStop(s, map)) {
    const it = nextItem(s, bank.items, rng);
    if (!it) break;
    const t = truth.get(it.id)!;
    const knows = rng() < sig(t.a * (theta - t.b));
    if (knows) s.responses.push({ id: it.id, choice: it.answer });
    else if (profile === "durust" && rng() < 0.6) s.responses.push({ id: it.id, choice: "dontknow" });
    else {
      const pick = Math.floor(rng() * it.options.length);
      s.responses.push({ id: it.id, choice: pick });
    }
  }
  const r = result(s, bank.items);
  return { level: r.level, near: r.near, items: r.items };
}

/** Eski test: A1×3, A2×2, B1×2, B2×1; 4 şık, "bilmiyorum" yok; doğru sayısıyla eşik. */
function oldTest(theta: number): Level {
  const levels: Level[] = ["A1", "A1", "A1", "A2", "A2", "B1", "B1", "B2"];
  let correct = 0;
  for (const l of levels) {
    const knows = rng() < sig(1.2 * (theta - (LEVEL_THETA[l] + gauss() * 0.35)));
    if (knows || rng() < 0.25) correct++;
  }
  return correct <= 2 ? "A1" : correct <= 4 ? "A2" : correct <= 6 ? "B1" : "B2";
}

const bankArg = process.argv.indexOf("--bank");
const bank = bankArg > 0 ? loadBank(process.argv[bankArg + 1]) : syntheticBank();
const truth = new Map(bank.items.map((it) => [it.id, { b: difficulty(it) + gauss() * 0.35, a: 0.8 + rng() * 0.8 }]));
const PER_CELL = Number(process.env.PLACEMENT_SIM_N) || 400;

/* KABUL: tam isabet YA DA gerçek yeri sınıra 0,25 logitten yakın olup komşu seviyeyi almak
   (o kişi gerçekten iki seviye arasında; sonuç ekranı "X'e yakın" der ve ±1 seçtirir). */
const CUTS = [-1.5, -0.5, 0.5, 1.5];
const atEdge = (theta: number) => CUTS.some((c) => Math.abs(theta - c) < 0.25);
let exact = 0, within1 = 0, off2 = 0, total = 0, items = 0, accept = 0;
let oldExact = 0, oldOff2 = 0;
console.log(`\nSeviye testi benzetimi (${bankArg > 0 ? process.argv[bankArg + 1] : "sentetik banka"}, hücre başına ${PER_CELL} kişi)`);
console.log("gerçek  profil     tam  kabul  ±1    2+   soru | eski-tam eski-2+");
for (const level of LEVELS) {
  for (const profile of ["durust", "tahminci", "abartan"] as Profile[]) {
    let e = 0, w = 0, o = 0, n = 0, oe = 0, oo = 0, ac = 0;
    for (let k = 0; k < PER_CELL; k++) {
      // Seviye bandının içinden; uçlar bandı aşar (C1 üstü, A1 altı gerçek insanlar).
      const lo = level === "A1" ? -3 : LEVEL_THETA[level] - 0.5;
      const hi = level === "C1" ? 3 : LEVEL_THETA[level] + 0.5;
      const theta = lo + rng() * (hi - lo);
      const r = take(theta, profile, bank, truth);
      const d = Math.abs(LEVELS.indexOf(r.level) - LEVELS.indexOf(level));
      if (d === 0) e++;
      if (d === 0 || (d === 1 && atEdge(theta))) ac++;
      if (d <= 1) w++;
      if (d >= 2) o++;
      n += r.items;
      const old = oldTest(theta);
      const od = Math.abs(LEVELS.indexOf(old) - LEVELS.indexOf(level));
      if (od === 0) oe++;
      if (od >= 2) oo++;
    }
    exact += e; accept += ac; within1 += w; off2 += o; total += PER_CELL; items += n; oldExact += oe; oldOff2 += oo;
    const pc = (x: number) => `${Math.round((100 * x) / PER_CELL)}%`.padStart(4);
    console.log(`${level}      ${profile.padEnd(9)} ${pc(e)} ${pc(ac)}  ${pc(w)} ${pc(o)} ${(n / PER_CELL).toFixed(1).padStart(5)} | ${pc(oe)}    ${pc(oo)}`);
  }
}
const P = (x: number) => Math.round((1000 * x) / total) / 10;
console.log(`\nTOPLAM  tam %${P(exact)} · kabul %${P(accept)} · ±1 %${P(within1)} · 2+ sapma %${P(off2)} · ortalama ${(items / total).toFixed(1)} soru`);
console.log(`ESKİ    tam %${P(oldExact)} · 2+ sapma %${P(oldOff2)}`);

const fails: string[] = [];
if (P(exact) < 70) fails.push(`tam isabet %${P(exact)} < %70`);
if (P(accept) < 85) fails.push(`kabul %${P(accept)} < %85`);
if (P(within1) < 99.5) fails.push(`±1 içinde %${P(within1)} < %99,5`);
if (P(off2) > 0.5) fails.push(`2+ seviye sapma %${P(off2)} > %0,5`);
if (fails.length) { console.log(`\n✗ ${fails.join(" · ")}`); process.exit(1); }
console.log("\n✓ eşikler tutuyor");
