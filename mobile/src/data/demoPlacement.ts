import { courseOrDefault } from "../lib/courses";

/**
 * Giriş öncesi seviye testi soruları. Oturum açıkken gerçek test sunucudan gelir
 * (/api/placement); bu set yalnız hesap açılmadan önceki yol için.
 *
 * Veri PARİTEYE bağlı: anahtar `<anadil>-<kurs>`. Eskiden tek bir sabit diziydi,
 * yani İngilizce kursu seçen kullanıcıya Almanca dilbilgisi soruluyordu. İçeriği
 * olmayan paritede "Testle belirle" seçeneği hiç gösterilmez (OnboardingScreen).
 *
 * Yönerge metni (`promptKey`) çeviriden gelir; soru ve şıklar paritenin kendi
 * içeriğidir. Aynı hedef dili paylaşan kursa düşülür (gsw-zh → de), başka dile asla.
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


/* İngilizce anadil için TEK FARK anlam sorusu. Öteki yedi soru Almanca
   dilbilgisi ölçüyor: soru da şıklar da Almanca, yani anadilden bağımsız.
   Türetiliyor, kopyalanmıyor — kopya olsaydı biri düzeltilip öteki
   unutulurdu ve iki parite aynı testi ölçmez olurdu. */
const EN_DE: PlacementQ[] = TR_DE.map((q) =>
  q.id === "p3" ? { ...q, answer: "water", options: ["water", "bread", "milk", "door"] } : q,
);

/* Almanca anadil, İNGİLİZCE kurs: sorular İngilizce, anlam şıkları Almanca.
   Aynı beceri sırası: çekim, artikel, anlam, geçmiş zaman, edat, koşul,
   bağlaç, ilgi cümlesi — seviye dağılımı da aynı (A1×3, A2×2, B1×2, B2×1),
   çünkü `estimateLevel` eşikleri sekiz soruya göre. */
const DE_EN: PlacementQ[] = [
  { id: "p1", level: "A1", promptKey: "placement.fill_blank", question: "My name ___ Emma.", answer: "is", options: ["is", "am", "are", "be"] },
  { id: "p2", level: "A1", promptKey: "placement.right_article", question: "___ sun is very bright today.", answer: "The", options: ["The", "A", "An", "Some"] },
  { id: "p3", level: "A1", promptKey: "rounds.ask_native", question: "the water", answer: "Wasser", options: ["Wasser", "Brot", "Milch", "Tür"] },
  { id: "p4", level: "A2", promptKey: "placement.fill_blank", question: "Yesterday I ___ at the cinema.", answer: "was", options: ["was", "am", "have", "were"] },
  { id: "p5", level: "A2", promptKey: "placement.right_preposition", question: "I am interested ___ music.", answer: "in", options: ["in", "on", "at", "with"] },
  { id: "p6", level: "B1", promptKey: "placement.fill_blank", question: "If I ___ time, I would travel.", answer: "had", options: ["had", "have", "would have", "having"] },
  { id: "p7", level: "B1", promptKey: "placement.right_conjunction", question: "I stay at home ___ it is raining.", answer: "because", options: ["because", "although", "however", "despite"] },
  { id: "p8", level: "B2", promptKey: "placement.fill_blank", question: "The project ___ we are working is important.", answer: "on which", options: ["on which", "in which", "at which", "with which"] },
];

const BY_PAIR: Record<string, PlacementQ[]> = { "tr-de": TR_DE, "en-de": EN_DE, "de-en": DE_EN };

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
/** Doğru sayısından tahmini seviye. */
export function estimateLevel(correct: number): string {
  if (correct <= 2) return "A1";
  if (correct <= 4) return "A2";
  if (correct <= 6) return "B1";
  return "B2";
}
