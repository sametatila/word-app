import { useCallback, useRef } from "react";
import type { ContentReport, ReportSurface } from "../lib/report";
import type { Round } from "./session";
import type { RoundAnswerInfo } from "./rounds";

/**
 * Kelime turunun içerik bildirimi — günlük tur, pratik, meydan okuma ve patron
 * aynı `RoundView`u oynatıyor, bildirim paketi de tek yerde kuruluyor.
 *
 * Hedef kelime (`words.id`) + oyun: panel aynı kelimeye farklı oyunlardan
 * gelen bildirimleri bir arada görüyor. Kelimesiz tur (sunucu bir gün
 * üretirse) tur kimliğine düşüyor.
 */
export function roundReport(round: Round, surface: ReportSurface, answer: RoundAnswerInfo | null, sub?: string): ContentReport {
  const word = round.word ?? round.words?.[0];
  const options = (round.options ?? []).map((o) => (typeof o === "string" ? o : o.text));
  const sentence = typeof round.sentence === "string" ? round.sentence : round.sentence ? (round.sentence.native ?? round.sentence.tr) : undefined;
  return {
    surface,
    target: { type: "word", id: word ? String(word.id) : round.id, game: round.game, ...(sub ? { sub } : {}) },
    snapshot: {
      game: round.game,
      ...(word ? { word: `${word.artikel ? word.artikel + " " : ""}${word.de}`, meaning: word.tr, ...(word.en ? { meaningEn: word.en } : {}) } : {}),
      ...(round.words && round.words.length > 1 ? { words: round.words.map((w) => w.de) } : {}),
      ...(sentence ? { sentence } : {}),
      ...(round.claim ? { claim: round.claim.text } : {}),
      ...(options.length ? { options } : {}),
      ...(answer?.answer ?? round.answer ? { correct: answer?.answer ?? (Array.isArray(round.answer) ? round.answer.join(" ") : round.answer) } : {}),
      ...(answer ? { you: answer.you, wasCorrect: answer.correct } : {}),
    },
  };
}

/**
 * Ekranın tuttuğu son cevaplar (tur kimliğine göre) + bayrağın paketi.
 * Bayrak ancak dokununca paketi kuruyor; cevap o ana kadar verildiyse içinde.
 */
export function useRoundReport(surface: ReportSurface, sub?: string) {
  const answers = useRef(new Map<string, RoundAnswerInfo>());
  const onAnswer = useCallback((a: RoundAnswerInfo, r: Round) => { answers.current.set(r.id, a); }, []);
  const reportFor = useCallback((round: Round) => () => roundReport(round, surface, answers.current.get(round.id) ?? null, sub), [surface, sub]);
  return { onAnswer, reportFor };
}
