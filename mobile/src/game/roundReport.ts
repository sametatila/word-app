import { glossOf } from "./gloss";
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
 *
 * Anlam ANADİLDE (`glossOf`), öğrencinin ekranda gördüğü satır: `word.tr`
 * İngilizce ve Almanca anadilde ekranda hiç görünmeyen Türkçe karşılıktı.
 * Şıklar sunucudan zaten anadilde geliyor, olduğu gibi.
 */
export function roundReport(round: Round, surface: ReportSurface, answer: RoundAnswerInfo | null, sub?: string): ContentReport {
  const word = round.word ?? round.words?.[0];
  const g = word ? glossOf(word) : null;
  const options = (round.options ?? []).map((o) => (typeof o === "string" ? o : o.text));
  const sentence = typeof round.sentence === "string" ? round.sentence : round.sentence ? (round.sentence.native ?? round.sentence.tr) : undefined;
  return {
    surface,
    target: { type: "word", id: word ? String(word.id) : round.id, game: round.game, ...(sub ? { sub } : {}) },
    snapshot: {
      game: round.game,
      ...(word ? { word: `${word.artikel ? word.artikel + " " : ""}${word.de}`, meaning: g?.text ?? "", ...(g?.sub ? { meaningSub: g.sub } : {}) } : {}),
      ...(round.words && round.words.length > 1 ? { words: round.words.map((w) => w.de) } : {}),
      ...(sentence ? { sentence } : {}),
      ...(round.claim ? { claim: round.claim.text } : {}),
      ...(options.length ? { options } : {}),
      ...(answer?.answer ?? round.answer ? { correct: answer?.answer ?? (Array.isArray(round.answer) ? round.answer.join(" ") : round.answer) } : {}),
      ...(answer ? { you: answer.you, wasCorrect: answer.correct } : {}),
    },
  };
}
