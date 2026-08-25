import { normalizeSpoken } from "./speech";

/**
 * Diyalog eşleştirme — senaryolu ama dallanan konuşma.
 *
 * Ne olduğu konusunda dürüst olmak gerekir: bu bir sohbet **modeli** değil.
 * Açık uçlu bir muhatap için dil modeli gerekir ve o ücretsiz değildir. Burada
 * yapılan şey **niyet eşleştirme**: sınırlı bir tema içinde (kafede sipariş,
 * randevu alma) öğrencinin verebileceği cevaplar önceden yazılır, tanıyıcının
 * döndürdüğü metinde bu cevapların anahtar kökleri aranır ve tutan dala göre
 * konuşma devam eder.
 *
 * Bu, kapalı bir tema için şaşırtıcı ölçüde iyi çalışır: kafede "kahve",
 * "Tee", "Wasser", "mit Milch", "ohne Zucker" gibi sayılı yol vardır. Sınırı
 * da açıktır — yazılmamış bir şey söylenirse anlaşılmaz ve diyalog örnek
 * göstererek yardım eder.
 *
 * Cümlenin tamamını değil kökleri aramanın sebebi: tanıyıcı çekimi ve
 * noktalamayı her seferinde farklı yazar, öğrenci de tam cümle kurmayabilir.
 * "kaffee" kökü hem "Einen Kaffee, bitte" hem "Ich hätte gern einen Kaffee"
 * içinde bulunur.
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

/** Üçten kısa kökler yalnızca tam kelime olarak aranır. */
const WHOLE_WORD_MAX = 3;

/**
 * Bir kökün metinde geçip geçmediği.
 *
 * Uzun kökler parça olarak aranır ("möcht" → "möchte", "möchten"). Kısa kökler
 * ("ja", "ein") parça olarak aransaydı "ja" kelimesi "Januar" içinde,
 * "ein" ise "keine" içinde bulunurdu — tam tersi anlamlar.
 */
function contains(words: string[], haystack: string, stem: string): boolean {
  const needle = normalizeSpoken(stem);
  if (!needle) return false;
  if (needle.includes(" ")) return haystack.includes(needle);
  return needle.length <= WHOLE_WORD_MAX ? words.includes(needle) : haystack.includes(needle);
}

export type DialogueMatch = { reply: DialogueReply; score: number; matched: string[] };

/**
 * Söylenene en çok uyan dalı seçer; hiçbiri tutmazsa null.
 *
 * Puan, tutan kök sayısıdır: "einen Kaffee mit Milch" hem kahve hem süt dalına
 * uyuyorsa daha çok kökü tutan kazanır. Eşitlikte içerikteki sıra korunur —
 * yazar en olası cevabı başa koyabilsin.
 */
export function matchReply(transcript: string, replies: DialogueReply[]): DialogueMatch | null {
  const haystack = normalizeSpoken(transcript);
  if (!haystack) return null;
  const words = haystack.split(" ");

  let best: DialogueMatch | null = null;
  for (const reply of replies) {
    const matched = reply.match.filter((stem) => contains(words, haystack, stem));
    if (!matched.length) continue;
    if (!best || matched.length > best.score) best = { reply, score: matched.length, matched };
  }
  return best;
}

/**
 * Konuşma boyunca kullanılan hedef kalıplar.
 *
 * Pekiştirme kısmı bu: sonunda öğrenciye "şunları kullandın, şunlara hiç
 * gelmedin" denir. Ölçü gerçek — uydurma bir yüzde değil, konuşmada fiilen
 * tutan dalların taşıdığı kalıplar.
 */
export function usedTargets(path: DialogueReply[]): string[] {
  const out = new Set<string>();
  for (const reply of path) for (const target of reply.uses ?? []) out.add(target);
  return [...out];
}

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
