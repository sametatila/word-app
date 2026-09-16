import { api } from "../api/client";

/**
 * Haftalık quiz — mobilin sunucuyla tek teması.
 *
 * DOSYA ADI KORUNDU (`weekly`): ekran, gezinme kaydı ve push derin bağlantısı
 * bu ada bağlı. Değişen şey içerik — eski haftalık sınavın tur listesi yerine
 * quiz maddeleri.
 *
 * CEVAP ANAHTARI BU TİPLERDE YOK ve bu bir eksiklik değil, kurgunun kendisi:
 * sunucu maddeleri `answer`/`why` alanları düşürülmüş olarak yolluyor. Doğruluk
 * ancak gönderimden sonra, `submitQuiz`in döndürdüğü dökümle öğreniliyor —
 * istemci hiçbir yerde "doğru mu" kararı vermiyor.
 */

export type QuizBlock = "read" | "listen" | "grammar" | "vocab" | "personal";

export type QuizClientItem = {
  id: string;
  block: QuizBlock;
  ref?: string;
  stem: string;
  options: string[];
  targets: string[];
};

export type QuizStimulus =
  | { kind: "text"; id: string; genre: string; genreTr: string; title?: string; body: string }
  | { kind: "audio"; id: string; genre: string; genreTr: string; segments: { speaker?: string; text: string }[]; plays: 1 | 2 };

export type Quiz = {
  id: string;
  theme: string;
  themeTr: string;
  level: string;
  stimuli: QuizStimulus[];
  items: QuizClientItem[];
};

export type QuizScoredItem = {
  itemId: string;
  block: QuizBlock;
  chosen: number | null;
  answer: number;
  correct: boolean;
  /** Yanlıştan sonra gösterilen açıklama — sonucun asıl değeri burada. */
  why: string;
  targets: string[];
};

export type QuizScore = {
  correct: number;
  total: number;
  pct: number;
  byBlock: { block: QuizBlock; correct: number; total: number }[];
  items: QuizScoredItem[];
  /** Geri bildirim bandının çeviri anahtarı. Geçme çizgisi YOK. */
  band: string;
};

export type QuizPayload = {
  week: string;
  done: boolean;
  empty?: boolean;
  quiz: Quiz | null;
  score?: QuizScore;
};

/** Haftanın quiz'i ya da (bitmişse) sonucu. Gün GÖNDERİLMİYOR: hafta sunucuda. */
export async function fetchQuiz(): Promise<QuizPayload> {
  return api<QuizPayload>("/api/quiz");
}

/**
 * Cevapları gönderir. Gönderilen tek şey madde kimliği → seçilen şıkkın sırası;
 * puanlamayı sunucu yapıyor.
 */
export async function submitQuiz(answers: Record<string, number>): Promise<{ saved: boolean; score: QuizScore }> {
  return api<{ saved: boolean; score: QuizScore }>("/api/quiz", {
    method: "POST",
    body: JSON.stringify({ answers }),
  });
}
