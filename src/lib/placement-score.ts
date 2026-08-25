import type { CefrLevel } from "@/lib/skills/types";

/**
 * Yerleştirme testi — puanlama ve uyarlama kuralları (plan WP-40). Saf;
 * istemci uyarlamayı, sunucu sonucu buradan hesaplar, test betiği sınar.
 *
 * Test dört aşama: kelime, dilbilgisi (seviye seviye, uyarlanabilir),
 * okuma ve dinleme (A2 + B1 metin). Aşama tahmini = %75'i geçilen en yüksek
 * seviye; öneri = dört tahminin alt medyanı (iki ortadan küçüğü). Medyan,
 * ortalamadan daha dürüst: tek bir güçlü beceri (okuma B2) kişiyi B2'ye
 * taşımamalı, tek bir zayıf beceri de A1'e çekmemeli.
 */

export const PLACEMENT_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
/** Bir seviyenin "geçildi" sayılması için doğru oranı (kelime/dilbilgisi: 6 ve 3 madde). */
export const PASS_RATIO = 0.75;
/** Okuma/dinleme metin başına 3 soru: 2/3 geçer — 3/3 istemek tek soruya seviye bağlamak olurdu. */
export const TEXT_PASS_RATIO = 2 / 3;
export function passRatioFor(stage: PlacementStage): number {
  return stage === "reading" || stage === "listening" ? TEXT_PASS_RATIO : PASS_RATIO;
}

export type PlacementStage = "vocab" | "grammar" | "reading" | "listening";

export type PlacementAnswer = {
  stage: PlacementStage;
  level: CefrLevel;
  itemId: string;
  correct: boolean;
};

export type StageEstimate = {
  stage: PlacementStage;
  /** Geçilen en yüksek seviye; hiçbiri geçilmediyse null. */
  level: CefrLevel | null;
  /** Seviye başına doğru/toplam. */
  byLevel: Partial<Record<CefrLevel, { correct: number; total: number }>>;
};

export type PlacementResult = {
  suggested: CefrLevel;
  perSkill: Record<PlacementStage, CefrLevel | null>;
  estimates: StageEstimate[];
  /** Toplam doğru oranı, 0–100 — olay değeri. */
  score: number;
};

export function levelIndex(level: CefrLevel): number {
  return PLACEMENT_LEVELS.indexOf(level);
}

/** Uyarlama: bir seviyedeki doğru oranı geçtiyse sıradaki seviye, yoksa null (aşama biter). */
export function nextLevel(level: CefrLevel, correct: number, total: number): CefrLevel | null {
  if (total === 0 || correct / total < PASS_RATIO) return null;
  const i = levelIndex(level);
  return i + 1 < PLACEMENT_LEVELS.length ? PLACEMENT_LEVELS[i + 1] : null;
}

export function estimateStage(stage: PlacementStage, answers: PlacementAnswer[]): StageEstimate {
  const byLevel: StageEstimate["byLevel"] = {};
  for (const a of answers.filter((x) => x.stage === stage)) {
    const b = (byLevel[a.level] ??= { correct: 0, total: 0 });
    b.total++;
    if (a.correct) b.correct++;
  }
  // Sınanmayan seviye atlanır (okuma/dinleme A1'den başlamaz); sınanan ilk
  // seviyeden itibaren art arda geçilenlerin en yükseği alınır.
  let level: CefrLevel | null = null;
  for (const l of PLACEMENT_LEVELS) {
    const b = byLevel[l];
    if (!b || b.total === 0) continue;
    if (b.correct / b.total >= passRatioFor(stage) - 1e-9) level = l;
    else break;
  }
  return { stage, level, byLevel };
}

export function scorePlacement(answers: PlacementAnswer[]): PlacementResult {
  const stages: PlacementStage[] = ["vocab", "grammar", "reading", "listening"];
  const estimates = stages.map((s) => estimateStage(s, answers));
  const perSkill = Object.fromEntries(estimates.map((e) => [e.stage, e.level])) as PlacementResult["perSkill"];
  // Alt medyan: hiç geçilmeyen aşama 0 (A1'in altı) sayılır ama öneri A1'den
  // aşağı inemez. Cevaplanmamış aşama (atlandı) medyana girmez.
  const idx = estimates
    .filter((e) => Object.keys(e.byLevel).length > 0)
    .map((e) => (e.level ? levelIndex(e.level) + 1 : 0))
    .sort((a, b) => a - b);
  const median = idx.length ? idx[Math.floor((idx.length - 1) / 2)] : 0;
  const suggested = PLACEMENT_LEVELS[Math.max(0, Math.min(PLACEMENT_LEVELS.length - 1, median - 1))] ?? "A1";
  const total = answers.length;
  const correct = answers.filter((a) => a.correct).length;
  return { suggested, perSkill, estimates, score: total ? Math.round((100 * correct) / total) : 0 };
}

/** Türkçe tek cümle gerekçe: "okuman B1, konuşman A2". */
export function describePerSkill(perSkill: PlacementResult["perSkill"]): string {
  const label: Record<PlacementStage, string> = { vocab: "kelime", grammar: "dilbilgisi", reading: "okuma", listening: "dinleme" };
  return (Object.keys(perSkill) as PlacementStage[])
    .filter((s) => perSkill[s] !== undefined)
    .map((s) => `${label[s]} ${perSkill[s] ?? "A1 altı"}`)
    .join(" · ");
}
