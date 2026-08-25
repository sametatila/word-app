import { matchReply, usedTargets, type DialogueReply, type DialogueTurn } from "@/lib/dialogue";
import { normalizeSpoken } from "@/lib/speech";
import { SUGGESTION_MARK } from "@/lib/chat-format";
import type { Lesson } from "./types";

/**
 * Çevrimdışı rol yapma (plan WP-04).
 *
 * Ders geçme koşulu `roleplayDone && oran ≥ 0.7` (progress.ts). Konuşma
 * bölümü yalnız modelle çalışsaydı sağlayıcı kapalıyken hiçbir ders
 * geçilemezdi — ve sağlayıcılar ücretsiz katmanda, yani kapanmaları olağan.
 * Burada aynı sahne modelsiz oynanıyor:
 *
 *   1. Dersin `roleplay.script`i varsa: beceri diyaloglarının motoru
 *      (`lib/dialogue.ts` niyet eşleştirme) — kapalı temalı, dallanan,
 *      3–5 turluk senaryo. Yazılmamış bir cevap "anlaşılmadı" olur ve örnek
 *      gösterilir; bu, motorun bilinen sınırı ve dürüstçe ekranda söyleniyor.
 *   2. Senaryo yoksa: "hedef kalıpları kullan" görevi — dersin kalıpları
 *      (`lesson.patterns`) sırayla istenir, söylenende kalıbın kökü aranır.
 *
 * Çıktı, model cevabıyla aynı biçimde (`chat-format.ts` işaretleri): gövde +
 * `[SAY] örnek`. Oynatıcı iki yolu da aynı baloncukla çiziyor; öneri çipleri
 * de aynı ayrıştırıcıdan çıkıyor.
 */

export type OfflineState = {
  /** Senaryo modunda geçerli tur; kalıp modunda null. */
  turnId: string | null;
  /** Tutan dallar — özette "şunları kullandın" için. */
  path: DialogueReply[];
  /** Kalıp modunda kullanılmış kalıplar (de). */
  usedPatterns: string[];
  userTurns: number;
  /** Senaryo son tura geldi ya da bütün kalıplar kullanıldı. */
  ended: boolean;
};

export type OfflineReply = {
  state: OfflineState;
  /** Baloncuğa yazılacak içerik — `[SAY]` satırı öneri çipi olur. */
  content: string;
  /** Sesli okunacak kısım (işaretsiz). */
  speak: string;
  /** Söylenen anlaşıldı mı (dal tuttu / kalıp kullanıldı). */
  understood: boolean;
  /** Mikrofon etiketine düşen Türkçe yönlendirme. */
  hint: string | null;
  ended: boolean;
};

export function hasScript(lesson: Lesson): boolean {
  return Boolean(lesson.roleplay.script?.length);
}

function turnById(lesson: Lesson, id: string | null): DialogueTurn | undefined {
  if (!id) return undefined;
  return lesson.roleplay.script?.find((t) => t.id === id);
}

/** Açılış: senaryonun ilk turu (açılış repliğiyle aynı) ya da dersin açılışı. */
export function offlineStart(lesson: Lesson): { state: OfflineState; opening: string; hint: string | null } {
  const script = lesson.roleplay.script;
  if (script?.length) {
    return {
      state: { turnId: script[0].id, path: [], usedPatterns: [], userTurns: 0, ended: false },
      opening: script[0].ask,
      hint: script[0].cue,
    };
  }
  const first = lesson.patterns[0];
  return {
    state: { turnId: null, path: [], usedPatterns: [], userTurns: 0, ended: false },
    opening: lesson.roleplay.opening,
    hint: first ? `Kalıbı kullan: ${first.de}` : null,
  };
}

/**
 * Kalıbın söylenende geçip geçmediği.
 *
 * Kalıp "Ich komme aus …" gibi boşluklu; asıl ayırt edici kökler uzun
 * kelimeler ("komme"). Dört harften uzun kökler varsa hepsi aranır; yoksa
 * ("Und dir?") kısa kelimelerin tamamı tam kelime olarak aranır.
 */
export function patternUsed(pattern: string, said: string): boolean {
  const haystack = normalizeSpoken(said);
  if (!haystack) return false;
  const words = haystack.split(" ");
  const stems = normalizeSpoken(pattern.replace(/…|\.\.\./g, " "))
    .split(" ")
    .filter(Boolean);
  const long = stems.filter((s) => s.length >= 4);
  if (long.length) return long.every((s) => haystack.includes(s));
  return stems.length > 0 && stems.every((s) => words.includes(s));
}

function say(body: string, example?: string): string {
  return example ? `${body}\n${SUGGESTION_MARK} ${example}` : body;
}

export function offlineReply(lesson: Lesson, state: OfflineState, said: string): OfflineReply {
  const userTurns = state.userTurns + 1;

  // ── Senaryo modu ──
  const turn = turnById(lesson, state.turnId);
  if (turn) {
    const match = matchReply(said, turn.replies);
    if (match) {
      const next = turnById(lesson, match.reply.next ?? null);
      const ended = !next;
      return {
        state: { ...state, turnId: next?.id ?? null, path: [...state.path, match.reply], userTurns, ended },
        content: match.reply.say,
        speak: match.reply.say,
        understood: true,
        hint: next?.cue ?? null,
        ended,
      };
    }
    const fb = turn.fallback;
    return {
      state: { ...state, userTurns },
      content: say(fb.say, fb.example),
      speak: fb.say,
      understood: false,
      hint: `Anlaşılmadı — ör. „${fb.example}“`,
      ended: false,
    };
  }
  if (state.turnId) {
    // Senaryo bitti ama öğrenci konuşmaya devam etti: kibarca kapat.
    return {
      state: { ...state, userTurns, ended: true },
      content: "Danke, das war alles. Bis zum nächsten Mal!",
      speak: "Danke, das war alles. Bis zum nächsten Mal!",
      understood: true,
      hint: null,
      ended: true,
    };
  }

  // ── Kalıp modu ──
  const patterns = lesson.patterns.map((p) => p.de);
  const used = new Set(state.usedPatterns);
  let understood = false;
  for (const p of patterns) {
    if (!used.has(p) && patternUsed(p, said)) {
      used.add(p);
      understood = true;
    }
  }
  const remaining = patterns.filter((p) => !used.has(p));
  const ended = remaining.length === 0;
  const nextP = remaining[0];
  const example = nextP ? nextP.replace(/…|\.\.\./g, "...").trim() : undefined;
  const body = ended
    ? "Sehr gut, Sie haben alle Redemittel benutzt. Danke, das war alles!"
    : understood
      ? `Gut! Jetzt bitte: „${nextP}“.`
      : `Hm, das habe ich nicht verstanden. Sagen Sie bitte: „${nextP}“.`;
  return {
    state: { ...state, usedPatterns: [...used], userTurns, ended },
    content: say(body, ended ? undefined : example),
    speak: body,
    understood,
    hint: ended ? null : `${understood ? "Sıradaki kalıp" : "Bu kalıbı dene"}: ${nextP}`,
    ended,
  };
}

/** Özet: hangi kalıplar kullanıldı, puan 0–100 (KPI `production_attempt` roleplay). */
export function offlineSummary(lesson: Lesson, state: OfflineState): { used: string[]; missing: string[]; score: number } {
  const all = lesson.patterns.map((p) => p.de);
  const used = state.turnId !== null || state.path.length ? usedTargets(state.path) : state.usedPatterns;
  const usedSet = new Set(used);
  const missing = all.filter((p) => !usedSet.has(p));
  const score = all.length ? Math.round((100 * (all.length - missing.length)) / all.length) : state.ended ? 100 : 0;
  return { used: all.filter((p) => usedSet.has(p)), missing, score };
}
