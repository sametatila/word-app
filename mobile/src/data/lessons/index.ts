/**
 * Ders kataloğu — mobil paket. scripts/dump-lessons-mobile.ts üretir (web'in
 * LESSONS'ından, seviye başına bir JSON). Web dersi koddan okuyor; mobil de
 * öyle çünkü /api/lesson yalnız SONUCU kaydeder, içeriği sunmaz.
 */
import { courseOrDefault, currentCourseId } from "../../lib/courses";
import a1 from "./de-a1.json";
import a2 from "./de-a2.json";
import b1 from "./de-b1.json";
import b2 from "./de-b2.json";
import c1 from "./de-c1.json";

export type Segment = { lang: "tr" | "de"; text: string };
export type Expectation =
  | { kind: "confirm" }
  | { kind: "repeat"; target: string }
  | { kind: "produce"; target: string; accept?: string[]; hint: Segment[] }
  | { kind: "truefalse"; statement: string; answer: boolean; why: Segment[] };
export type LectureStep = { say: Segment[]; expect?: Expectation };
export type VocabItem = { de: string; tr: string };
export type PatternItem = { de: string; tr: string };
export type LessonRoleplay = {
  scene: string; partner: string; opening: string; openingTr: string; goal: string; minTurns?: number;
};
export type Lesson = {
  id: string; level: string; course: string; icon: string;
  title: string; titleTr: string; summary: string; minutes: number; focusId: string;
  vocab: VocabItem[]; patterns: PatternItem[]; lecture: LectureStep[]; roleplay: LessonRoleplay;
};

/**
 * Paketler kurs → seviye biçiminde. Bugün yalnız Almanca paketi var; yeni bir
 * dilin paketi eklendiğinde buraya bir satır giriyor.
 */
const BY_COURSE: Record<string, Record<string, Lesson[]>> = {
  de: { A1: a1 as Lesson[], A2: a2 as Lesson[], B1: b1 as Lesson[], B2: b2 as Lesson[], C1: c1 as Lesson[] },
};

/**
 * Kursun ders paketi.
 *
 * Yükleyici eskiden kursu hiç bilmiyordu: "Zürih Almancası" seçen kullanıcı
 * Hochdeutsch dersleri görüyordu. Aynı hedef dili paylaşan bir kursun paketine
 * düşmek meşru (gsw-zh → de: ikisi de Almanca, lehçe farkı), ama **farklı bir
 * dile asla düşülmez** — İngilizce kursta Almanca ders göstermektense hiç ders
 * göstermemek doğrudur.
 */
function bundleFor(course: string): Record<string, Lesson[]> | undefined {
  const own = BY_COURSE[course];
  if (own) return own;
  const target = courseOrDefault(course).targetLang;
  for (const id of Object.keys(BY_COURSE)) {
    if (courseOrDefault(id).targetLang === target) return BY_COURSE[id];
  }
  return undefined;
}

const ALL: Lesson[] = Object.values(BY_COURSE).flatMap((byLevel) => Object.values(byLevel).flat());
const INDEX: Record<string, Lesson> = {};
for (const l of ALL) INDEX[l.id] = l;

export function lessonsForLevel(level: string, course: string = currentCourseId()): Lesson[] {
  return bundleFor(course)?.[level] ?? [];
}
export function findLesson(id: string): Lesson | undefined { return INDEX[id]; }

/** Puanlanan adım sayısı — ders kaydının paydası (üretim + doğru/yanlış). */
export function scoredSteps(l: Lesson): number {
  return l.lecture.filter((s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse").length;
}
