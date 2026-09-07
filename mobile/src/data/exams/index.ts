import PAPERS from "./papers.json";
import { courseOrDefault, type CourseId } from "../../lib/courses";

/**
 * Deneme sınavları — elle yazılmış, kendi başına duran sınav kâğıtları.
 *
 * Bu ekran eskiden "Sınav hazırlık"tı ve iki şeyi listeliyordu, ikisi de
 * BAŞKA YERİN içeriğiydi: beceri alıştırmalarının eksik bir kopyası ve
 * `lib/exam.ts`in ders içeriğinden ürettiği Patika türevi kâğıtlar. İkisi de
 * kaldırıldı. Buradaki kâğıtlar hiçbir yerden türetilmiyor; kaynakları
 * `src/lib/mock-exams` altında duruyor ve `npm run dump:mock-exams` ile
 * `papers.json` olarak buraya dökülüyor. Yani içerik tek yerde yazılıyor,
 * mobil onun türevi.
 *
 * Hedef dile bağlanması bilinçli: Zürih Almancası kursunun hedefi de Almanca,
 * dolayısıyla aynı sınava hazırlanır. İngilizce kursunun karşılığı yok.
 *
 * İKİ AYRI SORU, İKİ AYRI FONKSİYON — karıştırılırsa ya kapı kapanır ya da
 * olmayan bir şeyin sözü verilir:
 *   supportsMockExams  kursun deneme sınavı KATALOĞU var mı → Öğren
 *                      sekmesindeki kutucuğun koşulu. Liste boşken de kapı
 *                      açık kalır; ekran o zaman dürüst boş durumunu gösterir.
 *   hasMockExams       kursta gerçekten sınav VAR mı → vaat içeren metinlerin
 *                      (paywall) koşulu. Olmayan sınavın sözü verilmez.
 */

export type MockLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type MockSkill = "reading" | "listening" | "writing" | "speaking";

export type MockStimulus =
  | {
      kind: "text";
      id: string;
      genre: string;
      genreTr: string;
      title?: string;
      /** Boşluklar `{{n}}` ile işaretli; `n` maddenin numarası. */
      body: string;
      gloss?: { de: string; tr: string; en?: string; hd?: string; note?: string }[];
    }
  | {
      kind: "audio";
      id: string;
      genre: string;
      genreTr: string;
      title?: string;
      situation: string;
      /** Kaç kez dinletilir — oynatıcı bu sayıyı sınır olarak uyguluyor. */
      plays: 1 | 2;
      segments: { speaker?: string; text: string }[];
      gloss?: { de: string; tr: string; en?: string; hd?: string; note?: string }[];
    };

export type MockOption = { key: string; label: string; body?: string };

type ItemBase = { id: string; no: number; ref?: string; explain: string };
export type MockItem =
  | (ItemBase & { kind: "mcq"; text: string; options: string[]; answer: number })
  | (ItemBase & { kind: "bool"; text: string; answer: boolean })
  | (ItemBase & { kind: "match"; text: string; answer: string })
  | (ItemBase & { kind: "gap"; text: string; accept: string[] });

export type MockRubric = {
  minWords?: number;
  minutes?: number;
  points: { de: string; tr: string }[];
  sample: string;
  criteria: string[];
};

export type MockFormat =
  | "mcq" | "truefalse" | "yesno" | "match" | "gap" | "gapMcq" | "notes" | "mixed" | "writing" | "speaking";

export type MockTask = {
  id: string;
  no: number;
  format: MockFormat;
  goal: string;
  prompt: string;
  promptTr: string;
  texts?: MockStimulus[];
  options?: MockOption[];
  items: MockItem[];
  rubric?: MockRubric;
};

export type MockPart = {
  skill: MockSkill;
  minutes: number;
  instruction: string;
  instructionTr: string;
  tasks: MockTask[];
};

export type MockPaper = {
  id: string;
  course: "de";
  level: MockLevel;
  no: number;
  theme: string;
  themeTr: string;
  minutes: number;
  parts: MockPart[];
};

const ALL = PAPERS as unknown as MockPaper[];

/** Geçme eşiği (yüzde) — bölüm başına. `src/lib/mock-exams/types.ts` ile aynı. */
export const MOCK_PASS_PCT = 60;

/** Bölümün makinece puanlanan madde sayısı; yazma/konuşma görevlerinde 0. */
export function partPoints(part: MockPart): number {
  return part.tasks.reduce((a, t) => a + (t.format === "writing" || t.format === "speaking" ? 0 : t.items.length), 0);
}

/** Hedef dili Almanca olan kurslar bu kataloğu görür. */
const BY_TARGET: Record<string, MockPaper[]> = { de: ALL };

export function mockPapersFor(course: CourseId, level?: string): MockPaper[] {
  const list = BY_TARGET[courseOrDefault(course).targetLang] ?? [];
  return (level ? list.filter((p) => p.level === level) : list).slice().sort((a, b) => a.no - b.no);
}

export function mockPaperById(id: string): MockPaper | null {
  return ALL.find((p) => p.id === id) ?? null;
}

/** Kursun deneme sınavı KATALOĞU var mı — Öğren sekmesindeki kutucuğun koşulu. */
export function supportsMockExams(course: CourseId): boolean {
  return courseOrDefault(course).targetLang in BY_TARGET;
}

/** Kursta gerçekten deneme sınavı VAR mı — vaat içeren metinlerin koşulu. */
export function hasMockExams(course: CourseId): boolean {
  return mockPapersFor(course).length > 0;
}
