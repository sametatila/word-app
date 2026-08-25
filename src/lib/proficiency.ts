import type { CefrLevel } from "@/lib/skills/types";

/**
 * Beceri yetkinlik modeli (plan WP-50) — saf, açıklanabilir.
 *
 * Beceri × seviye için **kanıt puanı**: son 30 günün puanlı öğelerinin
 * ağırlıklı ortalaması. Ağırlıklar kaynağa göre — sınav ×3, AI değerlendirme
 * ×2, egzersiz ×1 — ve zamana göre sönümlü (30 günde sıfıra iner, doğrusal).
 * Elo/IRT bilerek yok: veri az, açıklanabilirlik öncelikli; profil "neden
 * gelişiyor" sorusuna "son 3 egzersizin ortalaması 62" diye cevap verebilmeli.
 *
 * Bantlar: < 40 başlangıç · 40–69 gelişiyor · 70–84 sağlam · ≥ 85 ustalaştı.
 * Kanıt yoksa bant yok (null): "başlangıç" demek ölçüm demektir, yokluk değil.
 */

export type ProficiencySkill = "reading" | "listening" | "writing" | "speaking" | "grammar" | "vocab";
export const PROFICIENCY_SKILLS: ProficiencySkill[] = ["reading", "listening", "writing", "speaking", "grammar", "vocab"];
export const PROFICIENCY_LABELS: Record<ProficiencySkill, string> = {
  reading: "Okuma",
  listening: "Dinleme",
  writing: "Yazma",
  speaking: "Konuşma",
  grammar: "Dilbilgisi",
  vocab: "Kelime",
};

export type EvidenceSource = "exam" | "assessment" | "exercise";
export const SOURCE_WEIGHT: Record<EvidenceSource, number> = { exam: 3, assessment: 2, exercise: 1 };
export const DECAY_DAYS = 30;

export type Evidence = {
  skill: ProficiencySkill;
  level: CefrLevel;
  /** 0–100 */
  score: number;
  source: EvidenceSource;
  at: Date;
};

export type Band = "başlangıç" | "gelişiyor" | "sağlam" | "ustalaştı";

export type Cell = {
  /** Ağırlıklı ortalama 0–100; kanıt yoksa null. */
  score: number | null;
  band: Band | null;
  /** Kanıt sayısı (sönümle sıfırlananlar hariç). */
  n: number;
  /** Toplam etkin ağırlık — güven göstergesi. */
  weight: number;
};

export type Proficiency = Record<ProficiencySkill, Partial<Record<CefrLevel, Cell>>>;

export function bandOf(score: number): Band {
  if (score >= 85) return "ustalaştı";
  if (score >= 70) return "sağlam";
  if (score >= 40) return "gelişiyor";
  return "başlangıç";
}

/** Zaman sönümü: bugün 1, 30 gün önce 0 (doğrusal). */
export function decay(at: Date, now: Date): number {
  const days = (now.getTime() - at.getTime()) / 86400000;
  if (days <= 0) return 1;
  if (days >= DECAY_DAYS) return 0;
  return 1 - days / DECAY_DAYS;
}

export function computeProficiency(evidence: Evidence[], now = new Date()): Proficiency {
  const acc = new Map<string, { sum: number; weight: number; n: number }>();
  for (const e of evidence) {
    const w = SOURCE_WEIGHT[e.source] * decay(e.at, now);
    if (w <= 0) continue;
    const key = `${e.skill}|${e.level}`;
    const a = acc.get(key) ?? { sum: 0, weight: 0, n: 0 };
    a.sum += Math.max(0, Math.min(100, e.score)) * w;
    a.weight += w;
    a.n++;
    acc.set(key, a);
  }
  const out = {} as Proficiency;
  for (const skill of PROFICIENCY_SKILLS) {
    out[skill] = {};
    for (const level of ["A1", "A2", "B1", "B2", "C1"] as CefrLevel[]) {
      const a = acc.get(`${skill}|${level}`);
      if (!a || a.weight <= 0) continue;
      const score = Math.round(a.sum / a.weight);
      out[skill][level] = { score, band: bandOf(score), n: a.n, weight: Math.round(a.weight * 10) / 10 };
    }
  }
  return out;
}

/**
 * "Sıradaki en iyi adım" için sıralama: kullanıcının seviyesinde en düşük
 * kanıtlı beceri; hiç kanıtı olmayan beceri hepsinden önce gelir (ölçülmemiş
 * olan, düşük ölçülenden daha acil). Eşitlikte sabit sıra (okuma → kelime).
 */
export function weakestSkill(prof: Proficiency, level: CefrLevel, among: ProficiencySkill[] = PROFICIENCY_SKILLS): ProficiencySkill {
  let best: { skill: ProficiencySkill; score: number } | null = null;
  for (const skill of among) {
    const cell = prof[skill]?.[level];
    const score = cell?.score ?? -1;
    if (!best || score < best.score) best = { skill, score };
  }
  return best?.skill ?? among[0];
}
