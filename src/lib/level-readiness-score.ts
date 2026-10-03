/**
 * Seviye hazırlığı — SAF puan (docs/plan/level-progress.md). Veri `lib/level-readiness`ten.
 *
 * Kelime (%50): seviyenin RESMÎ çekirdeğinde (data/core) bankada bulunan kelimeler; pekişmiş
 * (aralık ≥ 21 gün) = 1, öğreniliyor (aralık ≥ 1 gün: en az bir doğru tekrar) = 0,5.
 * Patika (%50): seviyenin konuşmaları (ünitelerin çekirdeği; beceri adımları zenginleştirme).
 * Üretim ayrıca sayılmaz: seviye sınavı ölçüyor (konuşma + yazma + cümle kurma %50).
 * Eşik %60 (Samet, 2026-10-03; Goethe/telc/ÖSD'nin geçme eşiği).
 */
export const READY_AT = 60;

export type ReadinessInput = { coreTotal: number; mastered: number; learning: number; pathTotal: number; pathDone: number };
export type Readiness = { vocab: number; path: number; total: number; ready: boolean };

export function readinessScore(x: ReadinessInput): Readiness {
  const vocab = x.coreTotal > 0 ? Math.min(100, Math.round((100 * (x.mastered + 0.5 * x.learning)) / x.coreTotal)) : 0;
  const path = x.pathTotal > 0 ? Math.min(100, Math.round((100 * x.pathDone) / x.pathTotal)) : 0;
  /* Bir parça ölçülemiyorsa (kursta o seviyenin Patika'sı yok) yalnız öteki sayılır. */
  const total = x.coreTotal > 0 && x.pathTotal > 0 ? Math.round((vocab + path) / 2) : x.coreTotal > 0 ? vocab : path;
  return { vocab, path, total, ready: total >= READY_AT };
}
