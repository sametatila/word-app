/**
 * "Nasıl gidiyorum" — gelişim raporundan düz dilde hüküm.
 *
 * Sunucu her beceri için şimdiki puanı, dört hafta önceki puanı ve kanıt
 * sayısını gönderiyor (`/api/growth` `proficiency`). Hüküm istemcide ve SAF:
 * yeni sorgu yok, aynı rapordan türüyor.
 *
 * Mobil karşılığı `mobile/src/lib/growthVerdict.ts`; eşikler ve dallar birebir
 * (`check:parity` iki dosyanın sabitlerini karşılaştırıyor).
 */

/** Dört haftada bu kadar puan oynarsa "yükseliyor/düşüyor"; altı "sabit". */
export const TREND_STEP = 3;
/** Bundan az kanıtla kesin hüküm verilmiyor: "az ölçüm". */
export const LOW_EVIDENCE = 3;
/** Bu puanın altındaki en zayıf beceri başlıkta "geride kalıyor" diye anılıyor (bant "sağlam" 70). */
export const FOCUS_BELOW = 70;

export type Trend = "up" | "down" | "flat" | "new" | "low";

export type SkillPoint = { skill: string; label: string; now: number | null; before: number | null; n?: number };

/** Becerinin gidişatı; ölçülmemişse null. */
export function trendOf(p: SkillPoint): Trend | null {
  if (p.now === null) return null;
  /* Eski sunucu `n` göndermiyorsa kanıt yeterli sayılıyor: hüküm eskisi gibi. */
  if ((p.n ?? LOW_EVIDENCE) < LOW_EVIDENCE) return "low";
  if (p.before === null) return "new";
  const d = p.now - p.before;
  if (d >= TREND_STEP) return "up";
  if (d <= -TREND_STEP) return "down";
  return "flat";
}

export type Verdict = {
  /** Kaç becerinin gidişatı yukarı / aşağı (yalnız yeterli kanıtlı olanlar). */
  up: number;
  down: number;
  /** Ölçülmüş ama kanıtı az olanlar dahil ölçülen beceri sayısı. */
  measured: number;
  /** Kesin hüküm verilebilen (kanıtı yeterli) beceri sayısı. */
  firm: number;
  /** Başlıkta "geride kalıyor" denecek beceri — yoksa null. */
  focus: string | null;
  /** Henüz ölçülmemiş becerilerin adları. */
  unmeasured: string[];
};

export function verdictOf(points: SkillPoint[]): Verdict {
  let up = 0;
  let down = 0;
  let firm = 0;
  let measured = 0;
  let weakest: SkillPoint | null = null;
  const unmeasured: string[] = [];
  for (const p of points) {
    const tr = trendOf(p);
    if (tr === null) {
      unmeasured.push(p.label);
      continue;
    }
    measured++;
    if (tr === "low") continue;
    firm++;
    if (tr === "up") up++;
    if (tr === "down") down++;
    if (weakest === null || (p.now ?? 0) < (weakest.now ?? 0)) weakest = p;
  }
  const focus = weakest && firm >= 2 && (weakest.now ?? 0) < FOCUS_BELOW ? weakest.label : null;
  return { up, down, measured, firm, focus, unmeasured };
}
