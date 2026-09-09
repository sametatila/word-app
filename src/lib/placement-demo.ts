import { courseOrDefault } from "@/lib/courses";

/**
 * Giriş öncesi seviye testi soruları — hesap açılmadan önceki yol.
 *
 * Oturum açıkken gerçek test sunucudan geliyor (`/api/placement`) ve orada
 * puanlanıyor; bu set yalnız misafir için. Web'de misafir "Testle belirle"
 * dediğinde doğrudan giriş duvarına gönderiliyordu: kullanıcı seviyesini
 * ölçmeden hesap açmak zorundaydı, oysa testi istemesinin sebebi seviyesini
 * bilmemesi. Android aynı yerde sekiz soruluk bu örnek turu oynatıp sonucu
 * misafir tercihlerine yazıyor, hesap açılınca profile taşınıyor.
 *
 * Veri mobil `M/src/data/demoPlacement.ts` ile BİREBİR aynı ve öyle kalmalı:
 * aynı kullanıcı telefonda ve tarayıcıda aynı soruları görmeli.
 *
 * Anahtar PARİTE: `<anadil>-<kurs>`. İçeriği olmayan paritede seçenek hiç
 * gösterilmiyor. Yönerge metni (`promptKey`) çeviriden gelir; soru ve şıklar
 * paritenin kendi içeriğidir. Aynı hedef dili paylaşan kursa düşülür
 * (gsw-zh → de), başka dile ASLA.
 */
export type PlacementQ = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2";
  /** Yönerge sözlük anahtarı (soru değil): "Boşluğu doldur" gibi. */
  promptKey: string;
  question: string;
  answer: string;
  options: string[];
};

const TR_DE: PlacementQ[] = [
  { id: "p1", level: "A1", promptKey: "placement.fill_blank", question: "Ich ___ Emma.", answer: "heiße", options: ["heiße", "heißt", "heißen", "heiße ich"] },
  { id: "p2", level: "A1", promptKey: "placement.right_article", question: "___ Hund ist groß.", answer: "Der", options: ["Der", "Die", "Das", "Den"] },
  { id: "p3", level: "A1", promptKey: "rounds.ask_native", question: "das Wasser", answer: "su", options: ["su", "ekmek", "süt", "kapı"] },
  { id: "p4", level: "A2", promptKey: "placement.fill_blank", question: "Gestern ___ ich im Kino.", answer: "war", options: ["war", "bin", "habe", "bist"] },
  { id: "p5", level: "A2", promptKey: "placement.right_preposition", question: "Ich interessiere mich ___ Musik.", answer: "für", options: ["für", "auf", "an", "mit"] },
  { id: "p6", level: "B1", promptKey: "placement.fill_blank", question: "Wenn ich Zeit ___, würde ich reisen.", answer: "hätte", options: ["hätte", "habe", "hatte", "haben"] },
  { id: "p7", level: "B1", promptKey: "placement.right_conjunction", question: "Ich bleibe zu Hause, ___ es regnet.", answer: "weil", options: ["weil", "obwohl", "trotzdem", "denn ob"] },
  { id: "p8", level: "B2", promptKey: "placement.fill_blank", question: "Das Projekt, ___ wir arbeiten, ist wichtig.", answer: "an dem", options: ["an dem", "auf dem", "in dem", "mit dem"] },
];

const BY_PAIR: Record<string, PlacementQ[]> = { "tr-de": TR_DE };

function setFor(nativeLang: string, course: string): PlacementQ[] | undefined {
  const own = BY_PAIR[`${nativeLang}-${course}`];
  if (own) return own;
  const target = courseOrDefault(course).targetLang;
  for (const key of Object.keys(BY_PAIR)) {
    const cut = key.indexOf("-");
    if (key.slice(0, cut) === nativeLang && courseOrDefault(key.slice(cut + 1)).targetLang === target) return BY_PAIR[key];
  }
  return undefined;
}

export function demoPlacementFor(nativeLang: string, course: string): PlacementQ[] {
  return setFor(nativeLang, course) ?? [];
}

/** Bu paritede giriş öncesi seviye testi sunulabilir mi. */
export function hasDemoPlacement(nativeLang: string, course: string): boolean {
  return !!setFor(nativeLang, course);
}

/** Doğru sayısından tahmini seviye — eşikler mobille aynı. */
export function estimateLevel(correct: number): string {
  if (correct <= 2) return "A1";
  if (correct <= 4) return "A2";
  if (correct <= 6) return "B1";
  return "B2";
}
