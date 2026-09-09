import "server-only";
import { asc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { skillExercises } from "@/lib/db/schema";
import { isLibraryExercise, type CefrLevel, type SkillExercise, type SkillId } from "./types";
import { itemCount } from "./meta";
import { BUNDLED_EXERCISES } from "./bundled";

export { SKILL_LABEL_KEYS, SKILL_ORDER, LEVEL_ORDER, itemCount, xpFor } from "./meta";

/**
 * Repoda yazılan içerik: `npm run db:seed:skills` bunun tamamını Neon'daki
 * `skill_exercises` tablosuna yükler. Çalışma zamanında içerik veritabanından
 * okunur; tablo boşsa ya da veritabanına ulaşılamazsa bu gömülü kopya devreye
 * girer — uygulama hiçbir durumda boş ekranla kalmaz.
 *
 * İki kurs yan yana yaşar: zh-* egzersizleri `course: "gsw-zh"` taşır ve
 * yalnızca Zürih kursundaki öğrenciye listelenir.
 *
 * Listenin kendisi bundled.ts'te durur; oradan yükleyici ve doğrulayıcı
 * script'ler de okuyabilsin diye (bu modül server-only).
 */
export { BUNDLED_EXERCISES };

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
  /**
   * Patika ünitesi (1 tabanlı) ya da null. İki havuzun ayrımı bu alandan
   * yapılıyor: Patika yalnız üniteli egzersizi yerleştirir, Beceriler yalnız
   * ünitesiz olanı listeler. Veritabanı yolunda jsonb'den okunur; tablo
   * satırında ayrı sütun yok ve olması da gerekmiyor.
   */
  unit: number | null;
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
    unit: e.unit ?? null,
  };
}

/** Patika'nın yerleştirdiği havuz: yalnız bir üniteye bağlı egzersizler. */
export function pathMetas(list: SkillMeta[]): SkillMeta[] {
  return list.filter((m) => m.unit != null);
}

/** Beceriler kütüphanesi: Patika'da yeri olmayan, öğrencinin kendi seçtiği egzersizler. */
export function libraryMetas(list: SkillMeta[]): SkillMeta[] {
  return list.filter((m) => m.unit == null);
}

export async function listExerciseMeta(course = "de"): Promise<SkillMeta[]> {
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
        unit: sql<number | null>`(${skillExercises.data}->>'unit')::int`,
      })
      .from(skillExercises)
      .where(eq(skillExercises.course, course))
      .orderBy(asc(skillExercises.level), asc(skillExercises.skill), asc(skillExercises.position));
    if (rows.length) return rows.map((r) => ({ ...r, unit: r.unit ?? null })) as SkillMeta[];
  } catch (err) {
    console.error("[skills] liste veritabanından okunamadı, gömülü içerik kullanılıyor", err);
  }
  return BUNDLED_EXERCISES.filter((e) => (e.course ?? "de") === course).map(toMeta);
}

export { isLibraryExercise };

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
