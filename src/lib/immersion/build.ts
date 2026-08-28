import type { CefrLevel } from "@/lib/skills/types";
import type { Lesson } from "@/lib/lessons/types";
import { MODULE_SIZE, moduleTheme } from "@/lib/lessons/modules";
import { lessonsFor } from "@/lib/lessons/index";
import { listExerciseMeta, type SkillMeta } from "@/lib/skills/index";
import { hasAuthoredGrammar } from "./content";
import type { ImmersionItem, ImmersionItemKind, ImmersionTrack, ImmersionUnit } from "./types";

/**
 * Track builder — mevcut ders + beceri egzersizlerinden slot desenine göre
 * üniteler kurar (bkz. docs/plan/immersion.md). Saf ve DB'siz: ham malzemeyi
 * argüman alır, böylece test edilebilir. DB'ye dokunan ince sarmalayıcı
 * `loadTrack` altta.
 *
 * Ders = TEK iskelet: ünite dersleri 4'erli tüketir, temasını onlardan alır.
 * Beceri egzersizleri havuzdan sırayla akar; biterse slot boş (`ref: null`)
 * kalır — içerik ünite temasına göre sonradan doldurulacak. grammar/quiz/
 * checkpoint bugün daima yer tutucu (motorları var, içerikleri sonra).
 */

/** Ünite başına ders sayısı (sahibin kararı: 4 lesson + 2 read + 2 listen + 2 write). */
export const UNIT_LESSONS = 4;
/** Kaç ünitede bir grup/sayfa sınırı (gating + pagination). */
export const GROUP_SIZE = 10;

/**
 * Her ünitenin temel deseni: 4 lesson + 2 read + 2 listen + 2 write, serpiştirilmiş
 * (her dersi bir beceri izler).
 */
const BASE_PATTERN: ImmersionItemKind[] = [
  "lesson", "read", "lesson", "listen", "lesson", "write", "lesson", "read", "listen", "write",
];

/**
 * Ünitenin item deseni — TAM TAKIM: temel + grammar + quiz + checkpoint.
 * Sahibin kararı: her ünite eksiksiz şablon taşır (ilk ünite dâhil). İçerik
 * zamanla dolar — grammar/quiz/checkpoint yer tutucudan türetilene/yazılana.
 */
function slotPlan(): ImmersionItemKind[] {
  return [...BASE_PATTERN, "grammar", "quiz", "checkpoint"];
}

const SKILL_TITLE: Record<"read" | "listen" | "write", string> = {
  read: "Okuma", listen: "Dinleme", write: "Yazma",
};

/** Ünite teması — ilk dersinin düştüğü modülden; taşarsa seviye+sıra. */
function unitTheme(level: CefrLevel, firstLessonIndex: number, unitIndex: number): string {
  const theme = moduleTheme(level, Math.floor(firstLessonIndex / MODULE_SIZE));
  return theme || `${level} · Ünite ${unitIndex}`;
}

export type BuildTrackInput = {
  course: string;
  level: CefrLevel;
  /** Bu seviyenin dersleri, katalog sırasıyla. */
  lessons: Lesson[];
  /** Bu seviyenin beceri egzersiz meta'ları (havuzdan sırayla tüketilir). */
  reading?: SkillMeta[];
  listening?: SkillMeta[];
  writing?: SkillMeta[];
  /** Grup boyutu (varsayılan GROUP_SIZE). */
  groupSize?: number;
};

export function buildTrack(input: BuildTrackInput): ImmersionTrack {
  const { course, level, lessons } = input;
  const groupSize = input.groupSize ?? GROUP_SIZE;
  const levelLower = level.toLowerCase();
  const pools: Record<"read" | "listen" | "write", SkillMeta[]> = {
    read: input.reading ?? [],
    listen: input.listening ?? [],
    write: input.writing ?? [],
  };
  const cursors = { read: 0, listen: 0, write: 0 };
  const unitCount = Math.ceil(lessons.length / UNIT_LESSONS);
  const units: ImmersionUnit[] = [];

  for (let u = 0; u < unitCount; u++) {
    const index = u + 1;
    const unitId = `${course}-${levelLower}-u${String(index).padStart(2, "0")}`;
    const unitLessons = lessons.slice(u * UNIT_LESSONS, u * UNIT_LESSONS + UNIT_LESSONS);
    const items: ImmersionItem[] = [];
    const counters: Partial<Record<ImmersionItemKind, number>> = {};
    let lessonCursor = 0;

    for (const kind of slotPlan()) {
      const n = (counters[kind] = (counters[kind] ?? 0) + 1);
      const id = `${unitId}-${kind}${n}`;
      if (kind === "lesson") {
        const lesson = unitLessons[lessonCursor++];
        if (!lesson) continue; // kısmi son ünitede boş ders slotu üretilmez
        items.push({ id, kind, ref: lesson.id, title: lesson.title, titleTr: lesson.titleTr, icon: lesson.icon });
      } else if (kind === "read" || kind === "listen" || kind === "write") {
        const meta = pools[kind][cursors[kind]++];
        items.push({
          id, kind,
          ref: meta?.id ?? null,
          title: meta?.title ?? SKILL_TITLE[kind],
          titleTr: meta?.genre ?? SKILL_TITLE[kind],
        });
      } else if (kind === "grammar") {
        // Gramer türetilemez; yalnız elle yazılmış üniteler için oynanabilir,
        // yoksa "yakında" (ref=null).
        const gRef = hasAuthoredGrammar(unitId) ? unitId : null;
        items.push({ id, kind, ref: gRef, title: "Dil bilgisi", titleTr: "Odak alıştırması" });
      } else if (kind === "quiz") {
        // quiz/checkpoint ünitenin brief'inden TÜRETİLİR (deriveQuiz) → oynanabilir.
        // ref = unitId: oynatıcı rotası hangi üniteden soru üreteceğini bundan bilir.
        items.push({ id, kind, ref: unitId, title: "Tekrar", titleTr: "Karışık hatırlama" });
      } else {
        items.push({ id, kind, ref: unitId, title: "Kontrol Noktası", titleTr: "Üniteyi bitir" });
      }
    }

    units.push({
      id: unitId,
      index,
      group: Math.floor(u / groupSize),
      level,
      course,
      theme: unitTheme(level, u * UNIT_LESSONS, index),
      items,
      lessonCount: items.filter((it) => it.kind === "lesson").length,
    });
  }

  return { course, level, units, groupSize };
}

/** DB'den okuyup buildTrack'i çağıran ince sarmalayıcı. */
export async function loadTrack(course: string, level: CefrLevel): Promise<ImmersionTrack> {
  const lessons = lessonsFor(course).filter((l) => l.level === level);
  const metas = await listExerciseMeta(course);
  const byLevel = metas.filter((m) => m.level === level);
  return buildTrack({
    course,
    level,
    lessons,
    reading: byLevel.filter((m) => m.skill === "reading"),
    listening: byLevel.filter((m) => m.skill === "listening"),
    writing: byLevel.filter((m) => m.skill === "writing"),
  });
}
