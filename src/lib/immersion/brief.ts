import type { CefrLevel } from "@/lib/skills/types";
import type { Lesson, PatternItem, VocabItem } from "@/lib/lessons/types";
import { lessonsFor } from "@/lib/lessons/index";
import { MODULE_SIZE, moduleTheme } from "@/lib/lessons/modules";
import { UNIT_LESSONS } from "./build";

/**
 * İçerik brief'i — "diğer item tipleri lesson'a göre türetilir" ilkesinin somut
 * hâli (bkz. docs/plan/immersion.md §İçerik stratejisi).
 *
 * Her ünite için, kendi 4 dersinden tema + hedef kelime/kalıp/cando'yu toplar.
 * Bu, o üniteye yazılacak temalı okuma/dinleme/yazma/quiz/gramer içeriğinin
 * ŞARTNAMESİdir: yeni içerik bu kelimeleri/kalıpları/temayı kullanmalı ki
 * ünitenin dersleriyle aynı dünyada olsun. Saf ve DB'siz — test edilebilir.
 */

export type UnitBrief = {
  unitId: string;
  index: number;
  level: CefrLevel;
  course: string;
  theme: string;
  lessonIds: string[];
  /** Derslerin başlıkları (Almanca) — sahnenin adları. */
  lessonTitles: string[];
  /** Birleşik cando etiketleri (WP-43). */
  cando: string[];
  /** Birleşik kelime havuzu (de'ye göre tekilleştirilmiş). */
  vocab: VocabItem[];
  /** Birleşik kalıp havuzu (de'ye göre tekilleştirilmiş). */
  patterns: PatternItem[];
  /** Bu üniteye desenden beklenen yeni içerik slotları. */
  needs: { read: number; listen: number; write: number };
};

function uniq(xs: string[]): string[] {
  return [...new Set(xs)];
}
function dedupeBy<T>(xs: T[], key: (x: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of xs) {
    const k = key(x);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(x);
  }
  return out;
}

/** Saf çekirdek: brief'leri verilen derslerden kurar (buildTrack ile aynı 4'erli bölme). */
export function buildUnitBriefs(course: string, level: CefrLevel, lessons: Lesson[]): UnitBrief[] {
  const briefs: UnitBrief[] = [];
  const count = Math.ceil(lessons.length / UNIT_LESSONS);
  const levelLower = level.toLowerCase();

  for (let u = 0; u < count; u++) {
    const index = u + 1;
    const unitLessons = lessons.slice(u * UNIT_LESSONS, u * UNIT_LESSONS + UNIT_LESSONS);
    const theme = moduleTheme(level, Math.floor((u * UNIT_LESSONS) / MODULE_SIZE)) || `${level} · Ünite ${index}`;
    briefs.push({
      unitId: `${course}-${levelLower}-u${String(index).padStart(2, "0")}`,
      index,
      level,
      course,
      theme,
      lessonIds: unitLessons.map((l) => l.id),
      lessonTitles: unitLessons.map((l) => l.title),
      cando: uniq(unitLessons.flatMap((l) => l.cando ?? [])),
      vocab: dedupeBy(unitLessons.flatMap((l) => l.vocab), (v) => v.de),
      patterns: dedupeBy(unitLessons.flatMap((l) => l.patterns), (p) => p.de),
      needs: { read: 2, listen: 2, write: 2 },
    });
  }
  return briefs;
}

/** DB'siz sarmalayıcı: seviyenin derslerini katalogdan alıp brief'leri kurar. */
export function unitBriefs(course: string, level: CefrLevel): UnitBrief[] {
  const lessons = lessonsFor(course).filter((l) => l.level === level);
  return buildUnitBriefs(course, level, lessons);
}
