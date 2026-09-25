import { matchReply, usedTargets } from "./dialogue";
import { normalizeSpoken } from "../lib/speech";
import { courseOrDefault } from "../lib/courses";
import type { DialogueReply, DialogueTurn } from "../lib/native";
import type { Conversation } from "../data/conversations";

/**
 * Çevrimdışı rol yapma — web `lib/conversations/offline-chat.ts` ile aynı akış.
 *
 * Ders geçme koşulu konuşmanın YAPILMASINI istiyor; konuşma yalnız modelle
 * çalışsaydı sağlayıcı kapalıyken Android'de hiçbir ders geçilemezdi — ve
 * bugün durum tam olarak buydu (bkz. web-parity §11.9). Aynı sahne modelsiz
 * oynanıyor:
 *
 *   1. Dersin `chat.script`i varsa: niyet eşleştirme motoru
 *      (`game/dialogue`) — kapalı temalı, dallanan senaryo. Yazılmamış bir
 *      cevap "anlaşılmadı" olur ve örnek gösterilir.
 *   2. Senaryo yoksa: "hedef kalıpları kullan" görevi — dersin kalıpları
 *      sırayla istenir, söylenende kalıbın kökü aranır.
 *
 * Çıktı model cevabıyla AYNI biçimde (`[SAY]` işareti): oynatıcı iki yolu da
 * aynı baloncukla çiziyor ve öneri çipleri aynı ayrıştırıcıdan çıkıyor.
 */

/** Web `chat-format` ile aynı işaret; `game/chat` da aynısını kullanıyor. */
const SUGGESTION_MARK = "[SAY]";

export type OfflineState = {
  /** Senaryo modunda geçerli tur; kalıp modunda null. */
  turnId: string | null;
  /** Tutan dallar — özette "şunları kullandın" için. */
  path: DialogueReply[];
  /** Kalıp modunda kullanılmış kalıplar (hedef dilde). */
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
  /** Mikrofon etiketine düşen yönlendirme — ANAHTAR, metin değil. */
  hint: Hint | null;
  ended: boolean;
};

/**
 * Mikrofon etiketine düşen yönlendirme: ANAHTAR + değişkenler.
 *
 * Metin DEĞİL — çeviri gösterildiği yerde yapılıyor (`ConversationScreen`), webin
 * aynı kararı gibi. Boş anahtar + `text` değişkeni "olduğu gibi göster"
 * demek: senaryo dalının `cue`su içerikten geliyor.
 */
export type Hint = { key: string; vars?: Record<string, string> };

/**
 * Karşı tarafın kalıp modundaki cümleleri — HEDEF DİLDE.
 *
 * Web bunları Almanca SABİT yazıyor ve İngilizce kursta da Almanca çıkıyor.
 * Partner hedef dili konuşuyor, o yüzden tablo kursun hedef diline göre
 * seçiliyor. `check:parity` iki tabloyu karşılaştırıyor.
 */
const COACH: Record<string, { allDone: string; next: (p: string) => string; notUnderstood: (p: string) => string; closed: string }> = {
  de: {
    allDone: "Sehr gut, Sie haben alle Redemittel benutzt. Danke, das war alles!",
    next: (p) => `Gut! Jetzt bitte: „${p}“.`,
    notUnderstood: (p) => `Hm, das habe ich nicht verstanden. Sagen Sie bitte: „${p}“.`,
    closed: "Danke, das war alles. Bis zum nächsten Mal!",
  },
  en: {
    allDone: "Great, you used all the phrases. Thanks, that's all!",
    next: (p) => `Good! Now please say: “${p}”.`,
    notUnderstood: (p) => `Hm, I didn't get that. Please say: “${p}”.`,
    closed: "Thanks, that's all. See you next time!",
  },
};

const coachFor = (course: string) => COACH[courseOrDefault(course).targetLang] ?? COACH.de;

export function hasScript(conversation: Conversation): boolean {
  return Boolean(conversation.chat.script?.length);
}

function turnById(conversation: Conversation, id: string | null): DialogueTurn | undefined {
  if (!id) return undefined;
  return conversation.chat.script?.find((t) => t.id === id);
}

/** Açılış: senaryonun ilk turu (açılış repliğiyle aynı) ya da dersin açılışı. */
export function offlineStart(conversation: Conversation): { state: OfflineState; opening: string; hint: Hint | null } {
  const script = conversation.chat.script;
  if (script?.length) {
    return {
      state: { turnId: script[0].id, path: [], usedPatterns: [], userTurns: 0, ended: false },
      opening: script[0].ask,
      hint: script[0].cue ? { key: "", vars: { text: script[0].cue } } : null,
    };
  }
  const first = conversation.patterns[0];
  return {
    state: { turnId: null, path: [], usedPatterns: [], userTurns: 0, ended: false },
    opening: conversation.chat.opening,
    hint: first ? { key: "chat.hint_use_pattern", vars: { pattern: first.de } } : null,
  };
}

/**
 * Kalıbın söylenende geçip geçmediği.
 *
 * Kalıp "Ich komme aus …" gibi boşluklu; asıl ayırt edici kökler uzun
 * kelimeler ("komme"). Dört harften uzun kökler varsa hepsi aranır; yoksa
 * ("Und dir?") kısa kelimelerin tamamı tam kelime olarak aranır.
 */
export function patternUsed(pattern: string, said: string, lang = "de"): boolean {
  const haystack = normalizeSpoken(said, lang);
  if (!haystack) return false;
  const words = haystack.split(" ");
  const stems = normalizeSpoken(pattern.replace(/…|\.\.\./g, " "), lang)
    .split(" ")
    .filter(Boolean);
  const long = stems.filter((s) => s.length >= 4);
  if (long.length) return long.every((s) => haystack.includes(s));
  return stems.length > 0 && stems.every((s) => words.includes(s));
}

function say(body: string, example?: string): string {
  return example ? `${body}\n${SUGGESTION_MARK} ${example}` : body;
}

export function offlineReply(conversation: Conversation, state: OfflineState, said: string): OfflineReply {
  const userTurns = state.userTurns + 1;
  const coach = coachFor(conversation.course);

  // ── Senaryo modu ──
  const turn = turnById(conversation, state.turnId);
  if (turn) {
    const match = matchReply(said, turn.replies);
    if (match) {
      const next = turnById(conversation, match.reply.next ?? null);
      const ended = !next;
      return {
        state: { ...state, turnId: next?.id ?? null, path: [...state.path, match.reply], userTurns, ended },
        content: match.reply.say,
        speak: match.reply.say,
        understood: true,
        hint: next?.cue ? { key: "", vars: { text: next.cue } } : null,
        ended,
      };
    }
    const fb = turn.fallback;
    return {
      state: { ...state, userTurns },
      content: say(fb.say, fb.example),
      speak: fb.say,
      understood: false,
      hint: { key: "chat.hint_not_understood", vars: { example: fb.example } },
      ended: false,
    };
  }
  if (state.turnId) {
    // Senaryo bitti ama öğrenci konuşmaya devam etti: kibarca kapat.
    return {
      state: { ...state, userTurns, ended: true },
      content: coach.closed,
      speak: coach.closed,
      understood: true,
      hint: null,
      ended: true,
    };
  }

  // ── Kalıp modu ──
  const patterns = conversation.patterns.map((p) => p.de);
  const used = new Set(state.usedPatterns);
  let understood = false;
  for (const p of patterns) {
    if (!used.has(p) && patternUsed(p, said, courseOrDefault(conversation.course).targetLang)) {
      used.add(p);
      understood = true;
    }
  }
  const remaining = patterns.filter((p) => !used.has(p));
  const ended = remaining.length === 0;
  const nextP = remaining[0];
  const example = nextP ? nextP.replace(/…|\.\.\./g, "...").trim() : undefined;
  const body = ended ? coach.allDone : understood ? coach.next(nextP) : coach.notUnderstood(nextP);
  return {
    state: { ...state, usedPatterns: [...used], userTurns, ended },
    content: say(body, ended ? undefined : example),
    speak: body,
    understood,
    hint: ended
      ? null
      : { key: understood ? "chat.hint_next_pattern" : "chat.hint_try_pattern", vars: { pattern: nextP } },
    ended,
  };
}

/** Özet: hangi kalıplar kullanıldı, puan 0–100. */
export function offlineSummary(conversation: Conversation, state: OfflineState): { used: string[]; missing: string[]; score: number } {
  const all = conversation.patterns.map((p) => p.de);
  const used = state.turnId !== null || state.path.length ? usedTargets(state.path) : state.usedPatterns;
  const usedSet = new Set(used);
  const missing = all.filter((p) => !usedSet.has(p));
  const score = all.length ? Math.round((100 * (all.length - missing.length)) / all.length) : state.ended ? 100 : 0;
  return { used: all.filter((p) => usedSet.has(p)), missing, score };
}
