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

/** Günün turu (gerçek). Oturum yoksa ApiError(401) fırlar — çağıran girişe yönlendirir.
    `game`: tek-oyun pratiği (web'deki oyun seçici — ör. yalnız "artikel").
    `fresh`: "yeni tura başla" — önce kayıtlı turu atar, sonra yenisini kurar. */
export async function fetchSession(day = todayStr(), opts?: { extra?: boolean; walk?: boolean; game?: string; fresh?: boolean; skip?: number[] }): Promise<SessionPayload> {
  if (opts?.fresh) { try { await api("/api/session", { method: "DELETE" }); } catch { /* yut */ } }
  // walk devam turları: sorulan kelimeleri hariç tut (sunucu en fazla 200 alır).
  const skip = opts?.skip && opts.skip.length ? `&skip=${opts.skip.slice(-200).join(",")}` : "";
  const q = `${opts?.extra ? "&extra=1" : ""}${opts?.walk ? "&walk=1" : ""}${opts?.game ? `&game=${opts.game}` : ""}${skip}`;
  return api<SessionPayload>(`/api/session?day=${day}${q}`);
}

/** Tek-oyun pratiğinde oynanabilecek türler (web PLAYABLE_GAMES ile aynı) + Türkçe adlar. */
export const PRACTICE_GAMES: { game: string; label: string }[] = [
  { game: "choice", label: "Doğru Anlam" },
  { game: "artikel", label: "Artikel Yarışı" },
  { game: "cloze", label: "Cümleyi Tamamla" },
  { game: "typing", label: "Yazarak Hatırla" },
  { game: "listen", label: "Kulaktan Tanı" },
  { game: "truefalse", label: "Doğru mu Yanlış mı" },
  { game: "match", label: "Eşleştirme" },
  { game: "scramble", label: "Harf Bulmacası" },
  { game: "order", label: "Cümleyi Diz" },
  { game: "plural", label: "Çoğul Bilmece" },
  { game: "translate", label: "Çevir" },
];

/** Cevapları sunucuya yazar (SRS + XP + seri güncellenir). `progress` verilirse
    oturum konumu da (index) kaydedilir — kaldığın yerden devam için. */
export async function submitAnswers(answers: AnswerOut[], day: string, seconds: number, progress?: SessionProgress): Promise<void> {
  await api("/api/answers", { method: "POST", body: JSON.stringify({ answers, day, seconds, ...(progress ? { progress } : {}) }) });
}
