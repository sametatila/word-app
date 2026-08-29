import { api } from "../api/client";
import { todayStr } from "./session";
import type { Round } from "./session";

/**
 * Günün turu (günlük yarışma) — web ile aynı sözleşme (/api/daily, DEPLOY'LU).
 * Aynı kurs+seviyedeki herkes aynı turu oynar, günde tek hak, puan tablosu.
 * Puanlama formülü web'deki lib/daily-score ile AYNI (ekranla tablo ayrışmasın).
 */
const BASE_POINTS = 100;
const FAST_MS = 2000;
const SLOW_MS = 8000;
const MAX_SPEED_BONUS = 50;
const MAX_STREAK_MULTIPLIER = 1.5;

/** Bir cevabın puanı: taban + hız bonusu, seri çarpanıyla. Yanlış → 0. */
export function scoreAnswer(correct: boolean, latencyMs: number, combo: number): number {
  if (!correct) return 0;
  const span = SLOW_MS - FAST_MS;
  const over = Math.max(0, Math.min(span, latencyMs - FAST_MS));
  const speed = Math.round(MAX_SPEED_BONUS * (1 - over / span));
  const streak = combo >= 3 ? Math.min(MAX_STREAK_MULTIPLIER, 1 + (combo - 2) * 0.1) : 1;
  return Math.round((BASE_POINTS + speed) * streak);
}

export type DailyBoardRow = { rank: number; name: string | null; score: number; correct: number; total: number; isMe: boolean };
export type DailyPlayed = { score: number; correct: number; total: number; bestCombo: number };
export type DailyPayload = { day: string; level: string; course: string; rounds: Round[]; played: DailyPlayed | null; board: DailyBoardRow[] };
export type DailyResult = { saved: boolean; xpGained: number; board: DailyBoardRow[] };

/** Günün turunu getirir: oynanmadıysa turlar, oynandıysa sonuç; her hâlde tablo. */
export function fetchDaily(day = todayStr()): Promise<DailyPayload> {
  return api<DailyPayload>(`/api/daily?day=${day}`);
}

/** Sonucu yazar (puan sunucuda tavanlanır); güncel tabloyu döndürür. */
export function submitDaily(input: { day: string; correct: number; score: number; bestCombo: number; seconds: number }): Promise<DailyResult> {
  return api<DailyResult>("/api/daily", { method: "POST", body: JSON.stringify(input) });
}
