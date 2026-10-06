import { normalizeSpoken } from "./speech";

/**
 * Diyalog yardımcıları.
 *
 * Açık diyalog (aşağıda): yapay zekâ muhatabıyla konuşmada hedef kalıpların
 * kullanılıp kullanılmadığı ve konuşmanın ne zaman kapanacağı.
 *
 * `DialogueTurn`/`DialogueReply`: becerilerin senaryolu diyalog içeriğinin
 * tipi (`lib/skills/types`). Konuşma adımının niyet eşleştirmeli çevrimdışı
 * sohbeti 2026-10-05'te kaldırıldı (Samet): sohbet yalnız yapay zekâyla,
 * izinsiz kullanıcıda atlanıyor (`api/conversation` muafiyeti).
 */

export type DialogueReply = {
  /** Bu dalı seçen anahtar kökler — en az biri geçmeli. */
  match: string[];
  /** Uygulamanın karşılığı (Almanca). */
  say: string;
  sayTr: string;
  /** Sonraki turun kimliği; yoksa konuşma burada biter. */
  next?: string;
  /** Bu cevapla kullanılmış sayılan hedef kalıplar — sonunda özetlenir. */
  uses?: string[];
};

export type DialogueTurn = {
  id: string;
  /** Uygulamanın sorusu (Almanca) ve Türkçe karşılığı. */
  ask: string;
  askTr: string;
  /** Ne diyebileceğine dair Türkçe yönlendirme; baştan görünür. */
  cue: string;
  replies: DialogueReply[];
  /** Hiçbir dal tutmazsa: karşılık + söylenebilecek somut bir örnek. */
  fallback: { say: string; sayTr: string; example: string };
};

/* ───────────── açık diyalog (WP-23) ───────────── */

/** Tamamlanma: en az bu kadar tur VE bu kadar hedef kalıp; üst sınırda her hâlde kapanır. */
export const DIALOGUE_MIN_TURNS = 4;
export const DIALOGUE_MIN_TARGETS = 3;
export const DIALOGUE_MAX_TURNS = 8;

/**
 * Açık diyalogda kalıp kullanımı yerel eşleştirmeyle: kalıbın "…" öncesi
 * gövdesi ("Ich hätte gern") öğrencinin söylediklerinde geçiyor mu. Modelin
 * işaretlemesi yerine bu seçildi: küçük modeller işaret satırını düşürüyor,
 * yerel arama ise her turda aynı ölçüyü uyguluyor. "/" ile ayrılmış
 * seçeneklerin ("bar / mit Karte") herhangi biri yeter.
 */
export function targetsUsed(targets: { de: string }[], texts: string[]): string[] {
  const hay = normalizeSpoken(texts.join(" "));
  const out: string[] = [];
  for (const t of targets) {
    const variants = t.de.split("/").map((v) => normalizeSpoken(v.split(/…|\.\.\./)[0]).trim()).filter((v) => v.length >= 3);
    if (variants.some((v) => hay.includes(v))) out.push(t.de);
  }
  return out;
}

/** Konuşma kapanmalı mı: hedef ve tur eşiği ya da üst sınır. */
export function dialogueDone(userTurns: number, usedCount: number): boolean {
  return userTurns >= DIALOGUE_MAX_TURNS || (userTurns >= DIALOGUE_MIN_TURNS && usedCount >= DIALOGUE_MIN_TARGETS);
}
