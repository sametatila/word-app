import { normalizeSpoken } from "../lib/speech";
import type { DialogueReply } from "../lib/native";

/**
 * Niyet eşleştirme — web `lib/dialogue.ts` ile AYNI kurallar.
 *
 * Kapalı temalı senaryolarda öğrencinin söylediği, dalların `match` köklerine
 * göre eşleştiriliyor. Model gerekmiyor: sağlayıcı kapalıyken de konuşma
 * çalışsın diye (bkz. `game/offlineRoleplay`).
 */

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
    const matched = (reply.match ?? []).filter((stem) => contains(words, haystack, stem));
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
