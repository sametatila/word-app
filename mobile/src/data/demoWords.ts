/**
 * Demo A1 kelime kümesi — mobil "Tur" akışını API'siz göstermek için.
 *
 * Geçici: gerçek tur sunucudan (`/api/session`) gelecek; bu küme yalnızca
 * oyun mekaniğini ve tasarımı emülatörde doğrulamak için gömülü duruyor.
 * Çeviriler ve artikeller A1 düzeyinde doğru tutuldu.
 */
export type Word = {
  id: number;
  de: string;
  tr: string;
  artikel?: "der" | "die" | "das";
};

export const DEMO_WORDS: Word[] = [
  { id: 1, de: "Hund", tr: "köpek", artikel: "der" },
  { id: 2, de: "Katze", tr: "kedi", artikel: "die" },
  { id: 3, de: "Haus", tr: "ev", artikel: "das" },
  { id: 4, de: "Tisch", tr: "masa", artikel: "der" },
  { id: 5, de: "Frau", tr: "kadın", artikel: "die" },
  { id: 6, de: "Mann", tr: "adam", artikel: "der" },
  { id: 7, de: "Wasser", tr: "su", artikel: "das" },
  { id: 8, de: "Brot", tr: "ekmek", artikel: "das" },
  { id: 9, de: "Milch", tr: "süt", artikel: "die" },
  { id: 10, de: "Apfel", tr: "elma", artikel: "der" },
  { id: 11, de: "Tür", tr: "kapı", artikel: "die" },
  { id: 12, de: "Buch", tr: "kitap", artikel: "das" },
];

export const withArtikel = (w: Word): string => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
