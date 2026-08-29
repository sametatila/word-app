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

export const DEMO_WORD_LIST: WordRow[] = [
  { id: 1, de: "Hund", artikel: "der", tr: "köpek", niveau: "A1", status: "mastered" },
  { id: 2, de: "Katze", artikel: "die", tr: "kedi", niveau: "A1", status: "mastered" },
  { id: 3, de: "Haus", artikel: "das", tr: "ev", niveau: "A1", status: "learning" },
  { id: 4, de: "Tisch", artikel: "der", tr: "masa", niveau: "A1", status: "learning" },
  { id: 5, de: "Frau", artikel: "die", tr: "kadın", niveau: "A1", status: "mastered" },
  { id: 6, de: "Mann", artikel: "der", tr: "adam", niveau: "A1", status: "learning" },
  { id: 7, de: "Wasser", artikel: "das", tr: "su", niveau: "A1", status: "mastered" },
  { id: 8, de: "Brot", artikel: "das", tr: "ekmek", niveau: "A1", status: "new" },
  { id: 9, de: "Milch", artikel: "die", tr: "süt", niveau: "A1", status: "new" },
  { id: 10, de: "Apfel", artikel: "der", tr: "elma", niveau: "A1", status: "learning" },
  { id: 11, de: "sprechen", artikel: null, tr: "konuşmak", niveau: "A2", status: "new" },
  { id: 12, de: "verstehen", artikel: null, tr: "anlamak", niveau: "A2", status: "learning" },
  { id: 13, de: "Reise", artikel: "die", tr: "seyahat", niveau: "A2", status: "new" },
  { id: 14, de: "wichtig", artikel: null, tr: "önemli", niveau: "A2", status: "new" },
  { id: 15, de: "Erfahrung", artikel: "die", tr: "deneyim", niveau: "B1", status: "new" },
];
