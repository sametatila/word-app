import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { userLessons, userSkills } from "@/lib/db/schema";
import { CANDO, type Cando } from "@/lib/cando";
import { candoForExercise, candoForLesson } from "@/lib/cando-map";
import { LESSONS } from "@/lib/lessons";
import { listExerciseMeta } from "@/lib/skills";
import type { CefrLevel } from "@/lib/skills/types";

/**
 * Kullanıcının yapabilirlik kanıtı (WP-43, adım 4).
 *
 * Bir ifade "kanıtlı" ⇔ ona bağlı en az iki içerik tamamlandı (ders geçildi
 * ya da egzersiz ≥ %70); tek içerik "gelişiyor". Sınav bölümleri (WP-41/42)
 * geldiğinde üçüncü kanıt türü olur ve eşik "≥2 içerik + son sınav ≥ %70"e
 * çıkar. Materialize edilmez; profil açılışında sorguyla hesaplanır — kanıt
 * tabloları zaten var, yeni tablo yalnız ikinci bir doğruluk kaynağı olurdu.
 */

export type CandoEvidence = {
  cando: Cando;
  state: "proven" | "progressing" | "none";
  /** Tamamlanan bağlı içerik sayısı / bağlı içerik sayısı. */
  done: number;
  total: number;
};

export type CandoSummary = {
  items: CandoEvidence[];
  /** Seviye başına kanıtlı / toplam ifade. */
  byLevel: Record<CefrLevel, { proven: number; total: number }>;
};

const PASS_RATIO = 0.7;

export async function candoSummary(userId: string, course: string): Promise<CandoSummary> {
  const [lessonRows, skillRows, metas] = await Promise.all([
    db.select().from(userLessons).where(eq(userLessons.userId, userId)),
    db.select({ exerciseId: userSkills.exerciseId, correct: userSkills.correct, total: userSkills.total, lastScore: userSkills.lastScore }).from(userSkills).where(eq(userSkills.userId, userId)),
    listExerciseMeta(course),
  ]);
  const passedLessons = new Set(lessonRows.filter((r) => r.roleplayDone && r.total > 0 && r.correct / r.total >= PASS_RATIO).map((r) => r.lessonId));
  const doneExercises = new Set(
    skillRows.filter((r) => (r.lastScore ?? 0) >= 70 || (r.total > 0 && r.correct / r.total >= PASS_RATIO)).map((r) => r.exerciseId),
  );

  const total = new Map<string, number>();
  const done = new Map<string, number>();
  const bump = (ids: string[], isDone: boolean) => {
    for (const id of ids) {
      total.set(id, (total.get(id) ?? 0) + 1);
      if (isDone) done.set(id, (done.get(id) ?? 0) + 1);
    }
  };
  for (const l of LESSONS.filter((l) => l.course === (course === "gsw-zh" ? "gsw-zh" : "de"))) bump(candoForLesson(l), passedLessons.has(l.id));
  for (const m of metas) bump(candoForExercise(m), doneExercises.has(m.id));

  const items: CandoEvidence[] = CANDO.filter((c) => !c.retired).map((c) => {
    const d = done.get(c.id) ?? 0;
    return { cando: c, state: d >= 2 ? "proven" : d === 1 ? "progressing" : "none", done: d, total: total.get(c.id) ?? 0 };
  });
  const byLevel = { A1: { proven: 0, total: 0 }, A2: { proven: 0, total: 0 }, B1: { proven: 0, total: 0 }, B2: { proven: 0, total: 0 }, C1: { proven: 0, total: 0 } } as CandoSummary["byLevel"];
  for (const it of items) {
    byLevel[it.cando.level].total++;
    if (it.state === "proven") byLevel[it.cando.level].proven++;
  }
  return { items, byLevel };
}
