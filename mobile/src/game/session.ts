import { api } from "../api/client";

/**
 * GERÇEK oyun oturumu — web API'siyle aynı sözleşme (Neon'dan gerçek kelimeler
 * + SRS). GET /api/session gerçek turları döndürür, POST /api/answers cevapları
 * yazar (SRS'i günceller). Demo YOK: veri kullanıcının kendi hesabından gelir.
 */
export type RoundWord = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  en: string | null;
  typ: string;
  niveau: string;
  beispiel: string | null;
  beispielTr: string | null;
  beispielEn?: string | null;
  formen: string | null;
  isNew: boolean;
};

export type Option = { text: string; sub: string | null };

/** Web Round union'ının pratik hâli — her oyun kendi alanlarını okur. */
export type Round = {
  id: string;
  game: string;
  word?: RoundWord;
  words?: RoundWord[];
  options?: Option[];
  direction?: "de-tr" | "tr-de";
  sentence?: string;
  sentenceTr?: string | null;
  sentenceEn?: string | null;
  answer?: string;
  claim?: Option;
  isTrue?: boolean;
  blank?: string;
  tokens?: string[];
  correctOrder?: string[];
  prompt?: string;
  /** order: cümle sonu noktalaması (son kelimeyi ele vermesin diye ayrı durur). */
  tail?: string;
  /** translate: kabul edilen başka kuruluşlar. */
  alternatives?: string[];
};

export type SessionMeta = {
  dueCount: number;
  newToday: number;
  reviewsToday: number;
  dailyGoal: number;
  currentStreak: number;
  totalXp: number;
  displayName: string | null;
  level: string;
};

/** Yarım kalan turun sunucudaki durumu — kaldığın yerden devam için. */
export type ResumeState = { index: number; correct: number; total: number; xp: number; missed: unknown[] };

export type SessionPayload = { rounds: Round[]; resume: ResumeState | null; meta: SessionMeta };

/** Oturum ilerlemesi — cevaplarla birlikte gidip `session_state.index`'i ilerletir
    (böylece kapatıp açınca tur baştan tekrar oynanmaz ve çift sayılmaz). */
export type SessionProgress = { index: number; correct: number; total: number; xp: number };

export type AnswerOut = {
  wordId: number;
  game: string;
  correct: boolean;
  latencyMs: number;
  quality?: number;
  detail?: string;
};

export function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Günün turu (gerçek). Oturum yoksa ApiError(401) fırlar — çağıran girişe yönlendirir. */
export function fetchSession(day = todayStr(), opts?: { extra?: boolean; walk?: boolean }): Promise<SessionPayload> {
  const q = `${opts?.extra ? "&extra=1" : ""}${opts?.walk ? "&walk=1" : ""}`;
  return api<SessionPayload>(`/api/session?day=${day}${q}`);
}

/** Cevapları sunucuya yazar (SRS + XP + seri güncellenir). `progress` verilirse
    oturum konumu da (index) kaydedilir — kaldığın yerden devam için. */
export async function submitAnswers(answers: AnswerOut[], day: string, seconds: number, progress?: SessionProgress): Promise<void> {
  await api("/api/answers", { method: "POST", body: JSON.stringify({ answers, day, seconds, ...(progress ? { progress } : {}) }) });
}
