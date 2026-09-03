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

export const STATUS_LABEL: Record<WordStatus, string> = {
  new: "Yeni",
  learning: "Öğreniyor",
  mastered: "Pekişti",
};

