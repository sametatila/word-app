/**
 * Adaptif tekrar motoru — SM-2 türevi.
 *
 * Tasarım kararı: kullanıcı hiçbir zaman "tekrar et" diye bir yere girmez.
 * Oyun oynarken verilen cevaplar kalite puanına (0-5) çevrilir ve kelimenin
 * bir sonraki gösterim zamanı buradan hesaplanır. Zamanı gelen kelimeler
 * oturum kuyruğuna kendiliğinden karışır.
 */

export type SrsState = {
  state: number; // 0 yeni, 1 öğreniliyor, 2 tekrar
  ease: number;
  intervalDays: number;
  reps: number;
  lapses: number;
  correctStreak: number;
  leech: boolean;
  dueAt: Date;
  lastReviewedAt?: Date | null;
};

/** Oyunun zorluğuna göre "hızlı cevap" eşiği (ms). */
const GAME_TIME_BUDGET: Record<string, number> = {
  intro: 12000,
  match: 30000,
  choice: 8000,
  artikel: 6000,
  cloze: 14000,
  scramble: 20000,
  typing: 18000,
  // Cümle dizmek okumayı da içerir: bütçe kelime turlarından geniş.
  order: 26000,
  plural: 9000,
  // Sesi dinlemek zaman alır; sabırsız bir bütçe herkesi yavaş gösterirdi.
  listen: 12000,
};

/**
 * Cevabı 0-5 kalite puanına çevirir.
 * Yanlış → 0-1, doğru ama yavaş → 3, normal → 4, hızlı → 5.
 */
export function grade(
  game: string,
  correct: boolean,
  latencyMs: number,
  hintUsed = false,
): number {
  const budget = GAME_TIME_BUDGET[game] ?? 10000;
  if (!correct) return latencyMs > budget * 1.5 ? 0 : 1;
  if (hintUsed) return 3;
  const ratio = latencyMs / budget;
  if (ratio > 1) return 3;
  if (ratio > 0.5) return 4;
  return 5;
}

const MIN_EASE = 1.3;
const LEARNING_STEPS_MIN = [1, 5]; // dakika

/** Bir sonraki durumu hesaplar. Saf fonksiyon — test edilebilir. */
export function schedule(prev: SrsState, quality: number, now = new Date()): SrsState {
  const next: SrsState = { ...prev };

  if (quality < 3) {
    // Hata: kelime öğrenme adımına düşer, kısa süre sonra tekrar gelir.
    next.state = 1;
    next.reps = 0;
    next.correctStreak = 0;
    next.lapses = prev.lapses + 1;
    next.ease = Math.max(MIN_EASE, prev.ease - 0.2);
    next.intervalDays = 0;
    next.leech = next.lapses >= 6;
    next.dueAt = addMinutes(now, LEARNING_STEPS_MIN[0]);
    return next;
  }

  next.correctStreak = prev.correctStreak + 1;
  next.reps = prev.reps + 1;
  // SM-2 kolaylık güncellemesi
  next.ease = clamp(
    prev.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
    MIN_EASE,
    3.0,
  );

  if (prev.state === 0) {
    // İlk doğru cevap: aynı oturumda bir kez daha görülsün.
    next.state = 1;
    next.intervalDays = 0;
    next.dueAt = addMinutes(now, LEARNING_STEPS_MIN[1]);
    return next;
  }

  if (prev.state === 1) {
    // Öğrenme adımından mezuniyet
    next.state = 2;
    next.intervalDays = quality >= 5 ? 3 : 1;
    next.dueAt = addDays(now, next.intervalDays);
    return next;
  }

  // Aynı gün ikinci kez doğru bilinmesi aralığı büyütmez; yoksa 6 dakikalık bir
  // oturumda kelime haftalar sonrasına atılır ve kesin unutulur.
  const sameDay =
    prev.lastReviewedAt != null &&
    now.getTime() - new Date(prev.lastReviewedAt).getTime() < 20 * 3600 * 1000;
  if (sameDay && prev.intervalDays > 0) {
    next.state = 2;
    next.intervalDays = prev.intervalDays;
    next.dueAt = addDays(now, prev.intervalDays);
    return next;
  }

  // Tekrar aşaması
  const base = prev.intervalDays > 0 ? prev.intervalDays : 1;
  const factor = quality >= 5 ? next.ease * 1.15 : quality === 4 ? next.ease : next.ease * 0.8;
  next.state = 2;
  next.intervalDays = clamp(round1(base * factor), 1, 365);
  next.dueAt = addDays(now, next.intervalDays);
  return next;
}

export const xpForQuality = (q: number) => (q >= 5 ? 12 : q >= 4 ? 10 : q >= 3 ? 7 : 3);

function addDays(d: Date, days: number) {
  return new Date(d.getTime() + days * 86400000);
}
function addMinutes(d: Date, min: number) {
  return new Date(d.getTime() + min * 60000);
}
function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}
function round1(v: number) {
  return Math.round(v * 10) / 10;
}
