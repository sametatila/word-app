/**
 * Demo seviye testi soruları (API'siz). Gerçek test sunucudan (/api/placement)
 * uyarlanabilir; bu, artan zorlukta kısa bir çoktan seçmeli set. Her sorunun bir
 * seviyesi var; skor → tahmini CEFR seviyesi.
 */
export type PlacementQ = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2";
  prompt: string;
  question: string;
  answer: string;
  options: string[];
};

export const DEMO_PLACEMENT: PlacementQ[] = [
  { id: "p1", level: "A1", prompt: "Boşluğu doldur", question: "Ich ___ Emma.", answer: "heiße", options: ["heiße", "heißt", "heißen", "heiße ich"] },
  { id: "p2", level: "A1", prompt: "Doğru artikel", question: "___ Hund ist groß.", answer: "Der", options: ["Der", "Die", "Das", "Den"] },
  { id: "p3", level: "A1", prompt: "Türkçesi?", question: "das Wasser", answer: "su", options: ["su", "ekmek", "süt", "kapı"] },
  { id: "p4", level: "A2", prompt: "Boşluğu doldur", question: "Gestern ___ ich im Kino.", answer: "war", options: ["war", "bin", "habe", "bist"] },
  { id: "p5", level: "A2", prompt: "Doğru edat", question: "Ich interessiere mich ___ Musik.", answer: "für", options: ["für", "auf", "an", "mit"] },
  { id: "p6", level: "B1", prompt: "Boşluğu doldur", question: "Wenn ich Zeit ___, würde ich reisen.", answer: "hätte", options: ["hätte", "habe", "hatte", "haben"] },
  { id: "p7", level: "B1", prompt: "Doğru bağlaç", question: "Ich bleibe zu Hause, ___ es regnet.", answer: "weil", options: ["weil", "obwohl", "trotzdem", "denn ob"] },
  { id: "p8", level: "B2", prompt: "Boşluğu doldur", question: "Das Projekt, ___ wir arbeiten, ist wichtig.", answer: "an dem", options: ["an dem", "auf dem", "in dem", "mit dem"] },
];

/** Doğru sayısından tahmini seviye. */
export function estimateLevel(correct: number): string {
  if (correct <= 2) return "A1";
  if (correct <= 4) return "A2";
  if (correct <= 6) return "B1";
  return "B2";
}
