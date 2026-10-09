/**
 * GÜNLÜK HEDEF SAYACI — web ikizi `src/lib/daily-goal` (aynı biçim).
 *
 * Hedef günün TEKRAR (cevap) sayısı; bir tur 20 kelimede ~24 cevap verir ve
 * çalışkan bir günde sayı hedefin katlarına çıkıyor. "157 / 20" okunmuyordu
 * (QA F-0086): sayı hedefte duruyor, fazlası ayrıca yazılıyor: "20/20 ✓ +137".
 */
export function goalCount(done: number, goal: number): string {
  const d = Math.max(0, Math.round(done));
  if (goal <= 0) return String(d);
  if (d < goal) return `${d}/${goal}`;
  const extra = d - goal;
  return extra > 0 ? `${goal}/${goal} ✓ +${extra}` : `${goal}/${goal} ✓`;
}
