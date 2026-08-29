import { api } from "../api/client";
import { todayStr } from "./session";
import type { Round, AnswerOut } from "./session";

/**
 * Haftalık kullanım sınavı — web ile aynı sözleşme (/api/weekly, DEPLOY'LU).
 * Haftada tek hak; turlar oynanır, sonuç yüzde puan olarak döner. Yanlışlar
 * SRS'te pekişmişten düşer (sunucu tarafı). Demo yok.
 */
export type WeeklyStatus = {
  week: string;
  done: boolean;
  short: boolean;
  score: number | null;
  correct: number | null;
  total: number | null;
  mastered: number;
};

export type WeeklyPayload = { status: WeeklyStatus; rounds: Round[] };
export type WeeklyResult = { week: string; score: number; correct: number; total: number; saved: boolean };

/** Durum + (yapılmadıysa) sınav turları. */
export function fetchWeekly(day = todayStr()): Promise<WeeklyPayload> {
  return api<WeeklyPayload>(`/api/weekly?day=${day}`);
}

/** Cevapları yazar; hafta içinde ikinci gönderim kaydedilmez (tek hak). */
export function submitWeekly(answers: AnswerOut[], day: string, seconds: number): Promise<WeeklyResult> {
  return api<WeeklyResult>("/api/weekly", { method: "POST", body: JSON.stringify({ answers, day, seconds }) });
}
