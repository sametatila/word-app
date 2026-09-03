/**
 * "Kelimelerim" ekranı için demo kelime listesi (API'siz / misafir). Gerçek
 * liste authed'de /api/words'ten gelir. Durum SRS'ten türer: new/learning/mastered.
 */
export type WordStatus = "new" | "learning" | "mastered";
export type WordRow = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  niveau: string;
  status: WordStatus;
};

/** Durum -> sözlük anahtarı; etiket kullanım anında t() ile çözülür. */
export const STATUS_KEY: Record<WordStatus, string> = {
  new: "words.status_new",
  learning: "words.status_learning",
  mastered: "words.status_mastered",
};

