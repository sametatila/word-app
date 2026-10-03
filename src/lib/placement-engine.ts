/**
 * Seviye testi v2 — ölçüm motoru (docs/plan/placement-v2.md).
 *
 * SAF ve BAĞIMSIZ: hiçbir modül içe aktarmıyor, çünkü bu dosya mobilde birebir kopya
 * olarak duruyor (`npm run placement:sync` → mobile/src/lib/placementEngine.ts,
 * `check:parity` eşitliği denetliyor). Burada değiştir, senkronla; mobil kopyaya dokunma.
 *
 * Model: yetenek θ (logit). Madde zorluğu seviyesinden (A1 −2 … C1 +2) ve ince
 * ayarından (±0,3). Doğru cevap olasılığı 3PL benzeri: c + (1 − c)·σ(a(θ − b)),
 * c = 1/şık sayısı. "Bilmiyorum" tahmin payı olmayan yanlış: 1 − σ(a(θ − b)).
 * Kelime kartları ayrı değerlendirilir (gerçek kelimeye "biliyorum" olasılığı
 * g + (1 − g)·σ(θ − b), g = uydurmalara "biliyorum" oranı) ve öz değerlendirmeyle birlikte
 * ÖNSELİ kurar; sonsal ızgarada (EAP), seviye en çok olasılığı toplayan bant.
 */

export const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
export type Level = (typeof LEVELS)[number];

/** Seviye merkezleri (logit). Kesimler iki merkezin ortası. */
export const LEVEL_THETA: Record<Level, number> = { A1: -2, A2: -1, B1: 0, B2: 1, C1: 2 };
const CUTS = [-1.5, -0.5, 0.5, 1.5];

/** Soru maddesi (boşluk doldurma, kısa okuma, dinleme). */
export type BankItem = {
  id: string;
  level: Level;
  /** Seviye içi ince ayar (logit): −0,3 kolay, 0 çekirdek, +0,3 zor. */
  offset?: number;
  kind: "cloze" | "reading" | "listening";
  options: string[];
  answer: number;
};

/** Kelime kartı: `level` null ise UYDURMA kelime. */
export type VocabCard = { id: string; word: string; level: Level | null };

export type Response = { id: string; choice: number | "dontknow" };

export const ITEM_A = 1.0;
/** Kelime tanıma soruya göre zayıf kanıt. */
export const VOCAB_A = 1.0;
/** Kelime tahmininin önseldeki belirsizliği: güvenilir / uydurmalara ara sıra (≥ %20) "biliyorum". */
export const VOCAB_SD = 1.0;
export const VOCAB_SD_UNRELIABLE = 1.6;
/** Önselin en dar hâli: sorular her zaman sonucu değiştirebilsin. */
export const PRIOR_SD_FLOOR = 0.8;
/** Uydurmaların ≥ %37,5'ine (8'de 3) "biliyorum" → kelime kartları sonuca HİÇ katılmaz. */
export const FALSE_ALARM_DROP = 0.375;
/** Seviye L kelimesini tanımak L sorusunu çözmekten kolay: tanıma zorluğu merkezin altında. */
export const VOCAB_SHIFT = -0.8;
export const PRIOR_SD = 1.2;
export const MIN_ITEMS = 8;
export const MAX_ITEMS = 15;
/** Durma: sonsal olasılığın bu kadarı TEK seviyenin bandında toplandıysa ölçüm yeterli. */
export const STOP_CONFIDENCE = 0.85;
/** Dinleme sorularının sırası (0'dan; ses kapalıysa atlanır). */
export const LISTENING_SLOTS = [3, 7];

const GRID: number[] = Array.from({ length: 161 }, (_, i) => -4 + i * 0.05);

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

export function difficulty(item: { level: Level; offset?: number }): number {
  return LEVEL_THETA[item.level] + (item.offset ?? 0);
}

/** Uydurma kelimelere "biliyorum" oranı; az kart için 0,02–0,6 arasına sıkıştırılır. */
export function falseAlarmRate(cards: VocabCard[], known: Record<string, boolean>): number {
  const pseudo = cards.filter((c) => c.level === null && c.id in known);
  if (!pseudo.length) return 0.02;
  const yes = pseudo.filter((c) => known[c.id]).length / pseudo.length;
  return Math.min(0.6, Math.max(0.02, yes));
}

export type Session = {
  /** Öz değerlendirme seviyesi (önsel merkez). */
  self: Level;
  /** Kelime kartları ve cevapları (id → biliyorum). */
  cards: VocabCard[];
  known: Record<string, boolean>;
  responses: Response[];
  /** Ses kapalıysa (kullanıcı "şu an dinleyemiyorum" dedi) dinleme maddesi seçilmez. */
  audio: boolean;
};

export function newSession(self: Level, cards: VocabCard[], known: Record<string, boolean>, audio = true): Session {
  return { self, cards, known, responses: [], audio };
}

/**
 * Kelime kartlarının TEK tahmini: kartlar yalnız kendi başına (düz önsel) ızgarada
 * değerlendirilir. Kartlar birbirine bağlı (aynı kişi aynı eğilimle cevaplıyor); her kartı
 * ayrı kanıt saymak 30 kartın 15 soruyu ezmesi demekti. Özet tahmin önsele girer, sonucu
 * sorular belirler. Döner: tahmin ve ağırlık (0 = kartlar yok sayılır).
 */
export function vocabEstimate(cards: VocabCard[], known: Record<string, boolean>): { theta: number; weight: number } {
  const f = falseAlarmRate(cards, known);
  const real = cards.filter((c) => c.level !== null && c.id in known);
  if (!real.length || f >= FALSE_ALARM_DROP) return { theta: 0, weight: 0 };
  const lp = GRID.map((th) => real.reduce((a, c) => {
    const p = f + (1 - f) * sigmoid(VOCAB_A * (th - (LEVEL_THETA[c.level as Level] + VOCAB_SHIFT)));
    return a + Math.log(known[c.id] ? p : 1 - p);
  }, 0));
  const max = Math.max(...lp);
  const w = lp.map((x) => Math.exp(x - max));
  const z = w.reduce((a, b) => a + b, 0);
  const theta = GRID.reduce((a, th, i) => a + th * w[i], 0) / z;
  /* Kelime tahmininin önseldeki ağırlığı (1/varyans): güvenilirken SS 1,0, şüpheliyken 1,6. */
  return { theta, weight: f >= 0.2 ? 1 / (VOCAB_SD_UNRELIABLE ** 2) : 1 / (VOCAB_SD ** 2) };
}

/** Önsel: öz değerlendirme ve kelime tahmininin ağırlıklı birleşimi. */
export function prior(s: Session): { mean: number; sd: number } {
  const ws = 1 / (PRIOR_SD ** 2);
  const v = vocabEstimate(s.cards, s.known);
  const mean = (ws * LEVEL_THETA[s.self] + v.weight * v.theta) / (ws + v.weight);
  return { mean, sd: Math.max(PRIOR_SD_FLOOR, 1 / Math.sqrt(ws + v.weight)) };
}

/** Izgaradaki her θ için log olabilirlik + önsel. */
function logPosterior(s: Session, bank: Map<string, BankItem>): number[] {
  const pr = prior(s);
  return GRID.map((th) => {
    let lp = -((th - pr.mean) ** 2) / (2 * pr.sd * pr.sd);
    for (const r of s.responses) {
      const it = bank.get(r.id);
      if (!it) continue;
      const core = sigmoid(ITEM_A * (th - difficulty(it)));
      if (r.choice === "dontknow") lp += Math.log(1 - core);
      else {
        const c = 1 / Math.max(2, it.options.length);
        const p = c + (1 - c) * core;
        lp += Math.log(r.choice === it.answer ? p : 1 - p);
      }
    }
    return lp;
  });
}

/** `confidence`: sonsal olasılığın tahmin edilen seviyenin bandına düşen payı. */
export type Estimate = { theta: number; sd: number; level: Level; confidence: number };

export function estimate(s: Session, bank: Map<string, BankItem>): Estimate {
  const lp = logPosterior(s, bank);
  const max = Math.max(...lp);
  const w = lp.map((x) => Math.exp(x - max));
  const z = w.reduce((a, b) => a + b, 0);
  const mean = GRID.reduce((a, th, i) => a + th * w[i], 0) / z;
  const v = GRID.reduce((a, th, i) => a + (th - mean) ** 2 * w[i], 0) / z;
  /* Seviye: sonsal ortalamanın değil, en çok olasılığı toplayan BANDIN seviyesi —
     sınıflandırma sorusu "θ kaç" değil "hangi seviye". */
  const mass = LEVELS.map(() => 0);
  GRID.forEach((th, i) => { mass[LEVELS.indexOf(levelOf(th))] += w[i] / z; });
  const best = mass.indexOf(Math.max(...mass));
  return { theta: mean, sd: Math.sqrt(v), level: LEVELS[best], confidence: mass[best] };
}

export function levelOf(theta: number): Level {
  let i = 0;
  while (i < CUTS.length && theta >= CUTS[i]) i++;
  return LEVELS[i];
}

/** Komşu seviyeye 0,25 logitten yakınsa o seviye ("B2'ye yakın"); değilse null. */
export function nearLevel(theta: number): Level | null {
  const i = LEVELS.indexOf(levelOf(theta));
  if (i < CUTS.length && CUTS[i] - theta < 0.25) return LEVELS[i + 1];
  if (i > 0 && theta - CUTS[i - 1] < 0.25) return LEVELS[i - 1];
  return null;
}

/**
 * Durma: güven eşiği YETMEZ, seviyenin kendisi de sınanmış olmalı — önerilen seviyeden
 * en az 2, komşularından (varsa) en az 1'er soru cevaplanmış. Benzetimde görüldü: şans
 * eseri 7 doğru, yalnız biri C1 sorusu, sonuç "C1 %90" → gerçek B1. Kapsam yoksa sıradaki
 * madde (`nextItem`) eksik seviyeye yönelir.
 */
export function coverageGap(s: Session, bank: Map<string, BankItem>, level: Level): Level | null {
  const count = (l: Level) => s.responses.filter((r) => bank.get(r.id)?.level === l).length;
  const i = LEVELS.indexOf(level);
  if (count(level) < 2) return level;
  if (i + 1 < LEVELS.length && count(LEVELS[i + 1]) < 1) return LEVELS[i + 1];
  if (i > 0 && count(LEVELS[i - 1]) < 1) return LEVELS[i - 1];
  return null;
}

export function shouldStop(s: Session, bank: Map<string, BankItem>): boolean {
  const n = s.responses.length;
  if (n >= MAX_ITEMS) return true;
  if (n < MIN_ITEMS) return false;
  const e = estimate(s, bank);
  return e.confidence >= STOP_CONFIDENCE && coverageGap(s, bank, e.level) === null;
}

/**
 * Sıradaki madde: HEDEFE en yakın zorluktaki 3 kullanılmamış maddeden biri (rng ile;
 * herkes aynı sırayı görmesin). Hedef, tahmine en yakın SEVİYE SINIRI: soru "θ tam kaç"
 * değil "sınırın hangi yanında" (sınıflandırma testlerinin yerleşik seçimi); sınırın
 * dibindeki madde iki komşu seviyeyi en iyi ayırır. Dinleme yalnız `LISTENING_SLOTS` sırasında ve ses açıksa;
 * öteki sıralarda boşluk doldurma ve okuma dönüşümlü. Uygun madde yoksa herhangi bir tür.
 */
export function nextItem(s: Session, items: BankItem[], rng: () => number = Math.random): BankItem | null {
  const bank = new Map(items.map((it) => [it.id, it]));
  const used = new Set(s.responses.map((r) => r.id));
  const n = s.responses.length;
  const e = estimate(s, bank);
  const est = e.theta;
  /* Hedef: kesinleşmeye yakınsa ve bir seviye hiç sınanmadıysa o seviyenin merkezi;
     değilse tahmine en yakın sınır. */
  const gap = n >= MIN_ITEMS - 2 ? coverageGap(s, bank, e.level) : null;
  const th = gap ? LEVEL_THETA[gap] : CUTS.reduce((best, c) => (Math.abs(c - est) < Math.abs(best - est) ? c : best), CUTS[0]);
  const lastKind = n ? bank.get(s.responses[n - 1].id)?.kind : undefined;
  const wantListening = s.audio && LISTENING_SLOTS.includes(n);
  const pool = items.filter((it) => !used.has(it.id));
  const prefer = pool.filter((it) =>
    wantListening ? it.kind === "listening" : it.kind !== "listening" && it.kind !== lastKind,
  );
  const fallback = pool.filter((it) => s.audio || it.kind !== "listening");
  const cands = (prefer.length ? prefer : fallback).sort((a, b) => Math.abs(difficulty(a) - th) - Math.abs(difficulty(b) - th));
  if (!cands.length) return null;
  const top = cands.slice(0, 3);
  return top[Math.min(top.length - 1, Math.floor(rng() * top.length))];
}

export type Result = { level: Level; near: Level | null; theta: number; sd: number; confidence: number; items: number };

export function result(s: Session, items: BankItem[]): Result {
  const bank = new Map(items.map((it) => [it.id, it]));
  const e = estimate(s, bank);
  return { level: e.level, near: nearLevel(e.theta), theta: e.theta, sd: e.sd, confidence: e.confidence, items: s.responses.length };
}

/** Sonuçta seçilebilecek seviyeler: önerilen ve bir altı/üstü. */
export function adjustable(level: Level): Level[] {
  const i = LEVELS.indexOf(level);
  return LEVELS.filter((_, j) => Math.abs(j - i) <= 1);
}
