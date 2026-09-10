import PAPERS from "./papers.json";
import PAPERS_EN from "./papers-en.json";
import { courseOrDefault, type CourseId } from "../../lib/courses";
import { nativeMockPaper, nativeMockText } from "../../lib/nativeContent";

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
 * dolayısıyla aynı sınava hazırlanır. İngilizcenin kendi kâğıtları var
 * (`papers-en.json`) ve yapıları Almancadan farklı: A2'den itibaren dil
 * sistemi görevleri, B2'den itibaren kelime türetme ve anahtar sözcükle
 * dönüştürme okuma bölümünün içinde duruyor.
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
  | (ItemBase & { kind: "gap"; text: string; cue?: string; accept: string[] });

export type MockRubric = {
  minWords?: number;
  minutes?: number;
  points: { de: string; tr: string }[];
  sample: string;
  criteria: string[];
};

export type MockFormat =
  | "mcq" | "truefalse" | "yesno" | "match" | "gap" | "gapMcq" | "notes" | "mixed" | "writing" | "speaking"
  /** Anahtar sözcükle cümle dönüştürme — maddenin metni iki satır, `cue` anahtar sözcük. */
  | "transform";

/**
 * Karşılıklı konuşmanın tek adımı: `partner` replikleri sesle okunur (TTS),
 * `you` adımlarında mikrofon açılır ve söylenen cihazın tanıyıcısıyla yazıya
 * çevrilir (STT). Ses sunucuya gitmez, yalnız döküm gider.
 */
export type MockTurn =
  | { who: "partner"; de: string; tr: string }
  | { who: "you"; hint: string; expect: string; seconds: number };

export type MockTask = {
  id: string;
  no: number;
  format: MockFormat;
  goal: string;
  /** Görevin kendi süresi (dakika); yoksa bölüm süresi bölüştürülür. */
  minutes?: number;
  /** Konuşma görevinde hazırlık süresi (saniye). */
  prepSeconds?: number;
  /** Tek kişilik konuşma görevinde konuşma süresi (saniye). */
  speakSeconds?: number;
  /** Karşılıklı konuşma adımları. */
  exchange?: MockTurn[];
  prompt: string;
  promptTr: string;
  texts?: MockStimulus[];
  options?: MockOption[];
  /** Eşleştirmede aynı şık birden çok maddenin cevabı olabilir mi (çoklu eşleştirme). */
  reuseOptions?: boolean;
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

/** Kâğıdın kursu = hedef dil. Züritüütsch kendi kâğıdını taşımaz, Almancayı çözer. */
export type MockCourse = "de" | "en";

export type MockPaper = {
  id: string;
  course: MockCourse;
  level: MockLevel;
  no: number;
  theme: string;
  themeTr: string;
  minutes: number;
  parts: MockPart[];
};

const ALL = PAPERS as unknown as MockPaper[];
const ALL_EN = PAPERS_EN as unknown as MockPaper[];

/** Geçme eşiği (yüzde) — bölüm başına. `src/lib/mock-exams/types.ts` ile aynı. */
export const MOCK_PASS_PCT = 60;

/** Bölümün makinece puanlanan madde sayısı; yazma/konuşma görevlerinde 0. */
export function partPoints(part: MockPart): number {
  return part.tasks.reduce((a, t) => a + (t.format === "writing" || t.format === "speaking" ? 0 : t.items.length), 0);
}

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Görevlere düşen süre (saniye) — `src/lib/mock-exams/types.ts` içindeki
 * `taskSeconds` ile AYNI kural.
 *
 * İki yerde durmasının nedeni paket: mobil `src/` göremiyor, kâğıt JSON
 * olarak geliyor. İkisi birlikte değişir; ayrılırlarsa oynatıcının saati
 * kâğıdın kendi süresiyle çelişir.
 */
function workload(task: MockTask): number {
  let w = 0;
  for (const s of task.texts ?? []) {
    if (s.kind === "text") w += wordCount(s.body) / 120;
    else w += (s.segments.reduce((a, x) => a + wordCount(x.text), 0) / 140) * s.plays + 0.25;
  }
  for (const o of task.options ?? []) w += wordCount(`${o.label} ${o.body ?? ""}`) / 120;
  w += task.items.length * 0.5;
  if (task.format === "writing") w += (task.rubric?.minWords ?? 40) / 8;
  if (task.format === "speaking") w += task.rubric?.minutes ?? 3;
  return Math.max(w, 0.5);
}

export function taskSeconds(part: MockPart): number[] {
  const total = part.minutes * 60;
  const explicit = part.tasks.map((t) => (t.minutes ? t.minutes * 60 : null));
  if (explicit.every((x) => x !== null)) return explicit as number[];
  const weights = part.tasks.map(workload);
  const sum = weights.reduce((a, x) => a + x, 0) || 1;
  const out = weights.map((w) => Math.max(60, Math.round((total * w) / sum)));
  out[out.length - 1] += total - out.reduce((a, x) => a + x, 0);
  return out;
}

/** Yazma/konuşma görevi mi — nesnel puanı olmayan görevler. */
export const isOpenTask = (t: MockTask) => t.format === "writing" || t.format === "speaking";

/**
 * Hedef dile göre katalog. Kurs kimliğine göre DEĞİL: Züritüütsch'ün hedefi de
 * Almanca ve aynı kâğıtları çözüyor, ayrı bir katalog gerekmiyor.
 */
const BY_TARGET: Record<string, MockPaper[]> = { de: ALL, en: ALL_EN };

/*
  LİSTE ile KÂĞIT farklı davranıyor ve fark bilinçli.

  `mockPapersFor` bir katalog döndürüyor: satırda Almanca tema (`theme`) ve
  altında ana dildeki karşılığı (`themeTr`) var. Orada hep-ya-hiç kuralı
  yanlış olurdu — bir dizesi eksik diye kâğıdı listeden gizlemek, sınavı
  yok saymaktır. O yüzden yalnız o alan eşleniyor.

  `mockPaperById` ise çözülecek kâğıdın kendisi: yönerge, durum tarifi,
  ölçütler ve gerekçeler birlikte çevrilir ya da hiçbiri çevrilmez.
*/
export function mockPapersFor(course: CourseId, level?: string): MockPaper[] {
  const list = BY_TARGET[courseOrDefault(course).targetLang] ?? [];
  return (level ? list.filter((p) => p.level === level) : list)
    .slice()
    .sort((a, b) => a.no - b.no)
    .map((p) => (p.course === "de" ? { ...p, themeTr: nativeMockText("themeTr", p.themeTr) } : p));
}

export function mockPaperById(id: string): MockPaper | null {
  const p = [...ALL, ...ALL_EN].find((x) => x.id === id);
  return p ? nativeMockPaper(p) : null;
}

/** Kursun deneme sınavı KATALOĞU var mı — Öğren sekmesindeki kutucuğun koşulu. */
export function supportsMockExams(course: CourseId): boolean {
  return courseOrDefault(course).targetLang in BY_TARGET;
}

/** Kursta gerçekten deneme sınavı VAR mı — vaat içeren metinlerin koşulu. */
export function hasMockExams(course: CourseId): boolean {
  return mockPapersFor(course).length > 0;
}

/**
 * Kâğıdın KENDİ dilindeki etiketler — `src/lib/mock-exams/types.ts` içindeki
 * `MOCK_LABELS` ile aynı tablo.
 *
 * Arayüz sözlüğünde (i18n) DURMUYOR ve durmamalı: bunlar arayüz metni değil
 * sınav metni. `mockexam.richtig` anahtarı üç sözlükte de Almanca sabitlenmişti
 * ve İngilizce kâğıt "Richtig / Falsch" düğmeleriyle açılırdı — kullanıcının
 * arayüz dili ne olursa olsun. Etiket kâğıttan gelir.
 */
export const MOCK_LABELS: Record<MockCourse, { skill: Record<MockSkill, string>; bool: [string, string]; yesno: [string, string] }> = {
  de: {
    skill: { reading: "Lesen", listening: "Hören", writing: "Schreiben", speaking: "Sprechen" },
    bool: ["Richtig", "Falsch"],
    yesno: ["Ja", "Nein"],
  },
  en: {
    skill: { reading: "Reading", listening: "Listening", writing: "Writing", speaking: "Speaking" },
    bool: ["True", "False"],
    yesno: ["Yes", "No"],
  },
};

/** Kursun sınav dili — Züritüütsch Almanca kâğıtları çözdüğü için hedef dile bakılıyor. */
export function mockCourseOf(course: CourseId | string | null | undefined): MockCourse {
  return courseOrDefault(course).targetLang;
}

export function mockSkillLabel(course: MockCourse, skill: MockSkill): string {
  return MOCK_LABELS[course].skill[skill];
}

export function mockBoolLabels(course: MockCourse, format: MockFormat): [string, string] {
  return format === "yesno" ? MOCK_LABELS[course].yesno : MOCK_LABELS[course].bool;
}
