import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { skillExercises } from "@/lib/db/schema";
import type { CefrLevel, SkillExercise, SkillId } from "./types";
import { itemCount } from "./meta";
import { a1 } from "./content/a1";
import { a2 } from "./content/a2";
import { b1 } from "./content/b1";
import { b2 } from "./content/b2";
import { c1 } from "./content/c1";

export { SKILL_LABELS, SKILL_ORDER, LEVEL_ORDER, itemCount, xpFor } from "./meta";

/**
 * Repoda yazılan içerik: `npm run db:seed:skills` bunun tamamını Neon'daki
 * `skill_exercises` tablosuna yükler. Çalışma zamanında içerik veritabanından
 * okunur; tablo boşsa ya da veritabanına ulaşılamazsa bu gömülü kopya devreye
 * girer — uygulama hiçbir durumda boş ekranla kalmaz.
 */
export const BUNDLED_EXERCISES: SkillExercise[] = [...a1, ...a2, ...b1, ...b2, ...c1];

const bundledById = new Map(BUNDLED_EXERCISES.map((e) => [e.id, e]));

/** Hub listesi için hafif satır — jsonb içerik istemciye inmez. */
export type SkillMeta = {
  id: string;
  skill: SkillId;
  level: CefrLevel;
  title: string;
  genre: string;
  minutes: number;
  items: number;
};

function toMeta(e: SkillExercise): SkillMeta {
  return {
    id: e.id,
    skill: e.skill,
    level: e.level,
    title: e.title,
    genre: e.genre,
    minutes: e.minutes,
    items: itemCount(e),
  };
}

export async function listExerciseMeta(): Promise<SkillMeta[]> {
  try {
    const rows = await db
      .select({
        id: skillExercises.id,
        skill: skillExercises.skill,
        level: skillExercises.level,
        title: skillExercises.title,
        genre: skillExercises.genre,
        minutes: skillExercises.minutes,
        items: skillExercises.items,
      })
      .from(skillExercises)
      .orderBy(asc(skillExercises.level), asc(skillExercises.skill), asc(skillExercises.position));
    if (rows.length) return rows as SkillMeta[];
  } catch (err) {
    console.error("[skills] liste veritabanından okunamadı, gömülü içerik kullanılıyor", err);
  }
  return BUNDLED_EXERCISES.map(toMeta);
}

export async function getExercise(id: string): Promise<SkillExercise | undefined> {
  try {
    const [row] = await db
      .select({ data: skillExercises.data })
      .from(skillExercises)
      .where(eq(skillExercises.id, id));
    if (row?.data) return row.data as SkillExercise;
  } catch (err) {
    console.error("[skills] egzersiz veritabanından okunamadı, gömülü içerik kullanılıyor", err);
  }
  return bundledById.get(id);
}
