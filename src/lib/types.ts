export type GameId =
  | "intro"
  | "match"
  | "choice"
  | "artikel"
  | "cloze"
  | "scramble"
  | "typing";

export const GAME_LABELS: Record<GameId, string> = {
  intro: "Yeni Kelime",
  match: "Eşleştirme",
  choice: "Doğru Anlam",
  artikel: "Artikel Yarışı",
  cloze: "Cümleyi Tamamla",
  scramble: "Harf Bulmacası",
  typing: "Yazarak Hatırla",
};

export type RoundWord = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string | null;
  formen: string | null;
  isNew: boolean;
};

export type Round =
  | { id: string; game: "intro"; word: RoundWord }
  | { id: string; game: "match"; words: RoundWord[] }
  | { id: string; game: "choice"; word: RoundWord; options: string[]; direction: "de-tr" | "tr-de" }
  | { id: string; game: "artikel"; word: RoundWord }
  | { id: string; game: "cloze"; word: RoundWord; sentence: string; answer: string; options: string[] }
  | { id: string; game: "scramble"; word: RoundWord }
  | { id: string; game: "typing"; word: RoundWord };

export type Answer = {
  wordId: number;
  game: GameId;
  correct: boolean;
  latencyMs: number;
  hintUsed?: boolean;
};

export type SessionPayload = {
  rounds: Round[];
  meta: {
    dueCount: number;
    newToday: number;
    reviewsToday: number;
    dailyGoal: number;
    currentStreak: number;
    totalXp: number;
    displayName: string | null;
  };
};

export type AnswerResult = {
  xpGained: number;
  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  reviewsToday: number;
  dailyGoal: number;
  goalReached: boolean;
};
