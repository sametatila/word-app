import { matchSentence, type TokenMark } from "@/lib/sentence-match";
import type { SpeechConfusion } from "@/lib/skills/types";
import type { SttWord } from "@/lib/stt";

/**
 * Telaffuz puanı — kelime düzeyi, sağlayıcıdan bağımsız (WP-20 faz 1).
 *
 * Fonem puanı veren ücretsiz Almanca API yok (bkz. pronunciation-providers.md);
 * elimizde transkript ve kelime zamanları var. Buradan ÜÇ ölçü çıkar:
 *   - kelime doğruluğu: hedef ↔ duyulan hizalaması (WP-10 `matchSentence`):
 *     tam / yakın (≤2 harf sapma) / yanlış-eksik. Yakın kelimeye bilinen
 *     sapma (`confusions`) denk geliyorsa ipucu o.
 *   - bütünlük: hedef kelimelerin kaçı duyuldu.
 *   - akıcılık: hece hızı (2–4,5 hece/sn doğal) ve 0,5 sn üstü duraklama
 *     sayısı (kelime zamanı varsa; yoksa toplam süreden).
 * overall = 0,6·kelime + 0,25·bütünlük + 0,15·akıcılık (0–100). Eşik 80.
 *
 * Bu bir "anlaşıldı mı" ölçüsüdür, fonem notu değil; kart bunu söyler.
 */
export type WordScore = {
  word: string;
  status: "ok" | "near" | "wrong" | "missing";
  heard?: string;
  /** Bilinen sapma ipucu (confusions). */
  hint?: string;
};

export type PronounceScore = {
  overall: number;
  wordAccuracy: number;
  completeness: number;
  fluency: number;
  words: WordScore[];
  /** Duyulan ama hedefte olmayan kelimeler. */
  extra: string[];
  /** Hece/sn — bilgi. */
  rate: number | null;
  pauses: number;
  transcript: string;
  passed: boolean;
};

export const PASS_SCORE = 80;

const fold = (s: string) => s.toLocaleLowerCase("de-DE").replace(/[.,!?;:„“"'’()]/g, "").replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").trim();

/** Kaba hece sayısı: ünlü kümeleri. */
export function syllables(text: string): number {
  const m = fold(text).match(/[aeiouy]+/g);
  return m ? m.length : 0;
}

function statusOf(mark: TokenMark): WordScore["status"] {
  if (mark === "same") return "ok";
  if (mark === "typo") return "near";
  if (mark === "moved") return "ok"; // sıra telaffuz değil
  return "missing";
}

export function scorePronunciation(target: string, transcript: string, opts: { words?: SttWord[]; duration?: number; confusions?: SpeechConfusion[] } = {}): PronounceScore {
  const text = transcript.trim();
  if (!text) {
    const words: WordScore[] = target.split(/\s+/).filter(Boolean).map((w) => ({ word: w, status: "missing" }));
    return { overall: 0, wordAccuracy: 0, completeness: 0, fluency: 0, words, extra: [], rate: null, pauses: 0, transcript: "", passed: false };
  }
  const m = matchSentence(text, target);
  const heardTokens = m.typed.map((t) => t.text);
  const words: WordScore[] = m.target.map((t, i) => {
    const status = statusOf(t.mark);
    const heard = status === "near" ? heardTokens.find((h) => fold(h) !== fold(t.text) && closeEnough(h, t.text)) : undefined;
    const conf = status !== "ok" ? (opts.confusions ?? []).find((c) => c.heard.some((h) => heardTokens.some((x) => fold(x) === fold(h)))) : undefined;
    return { word: t.text, status, heard: heard ?? (status === "missing" ? undefined : heardTokens[i]), hint: conf?.fix };
  });
  const extra = m.typed.filter((t) => t.mark === "extra").map((t) => t.text);

  const n = Math.max(1, words.length);
  const okN = words.filter((w) => w.status === "ok").length;
  const nearN = words.filter((w) => w.status === "near").length;
  const wordAccuracy = Math.round(((okN + 0.5 * nearN) / n) * 100);
  const completeness = Math.round(((okN + nearN) / n) * 100);

  // Akıcılık
  let rate: number | null = null;
  let pauses = 0;
  let fluency = 70; // süre bilgisi yoksa nötr
  const syl = syllables(text);
  const ws = opts.words?.filter((w) => Number.isFinite(w.start) && Number.isFinite(w.end)) ?? [];
  const speech = ws.length ? ws[ws.length - 1].end - ws[0].start : (opts.duration ?? 0);
  if (speech > 0.3 && syl > 0) {
    rate = syl / speech;
    for (let i = 1; i < ws.length; i++) if (ws[i].start - ws[i - 1].end > 0.5) pauses++;
    // 2–4,5 hece/sn doğal; dışına çıktıkça düşer; her duraklama −10
    const rateScore = rate >= 2 && rate <= 4.5 ? 100 : rate < 2 ? Math.max(0, 100 - (2 - rate) * 60) : Math.max(0, 100 - (rate - 4.5) * 40);
    fluency = Math.max(0, Math.round(rateScore - pauses * 10));
  }
  const extraPenalty = Math.min(20, extra.length * 5);
  const overall = Math.max(0, Math.min(100, Math.round(0.6 * wordAccuracy + 0.25 * completeness + 0.15 * fluency - extraPenalty)));
  return { overall, wordAccuracy, completeness, fluency, words, extra, rate: rate ? Math.round(rate * 10) / 10 : null, pauses, transcript: text, passed: overall >= PASS_SCORE };
}

function closeEnough(a: string, b: string): boolean {
  const x = fold(a);
  const y = fold(b);
  if (!x || !y) return false;
  if (x === y) return true;
  let d = 0;
  const lenDiff = Math.abs(x.length - y.length);
  if (lenDiff > 2) return false;
  // hızlı yaklaşık: ortak önek/sonek dışı fark
  let i = 0;
  while (i < x.length && i < y.length && x[i] === y[i]) i++;
  let j = 0;
  while (j < x.length - i && j < y.length - i && x[x.length - 1 - j] === y[y.length - 1 - j]) j++;
  d = Math.max(x.length, y.length) - i - j;
  return d <= 2;
}
