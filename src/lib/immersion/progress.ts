import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { userSkills } from "@/lib/db/schema";
import { lessonBoard } from "@/lib/lessons/progress";
import type { Completion } from "./state";

/**
 * Faz 3 tamamlanma adaptörü — mevcut ilerleme kaynaklarını immersion'ın saf
 * gating katmanına (state.ts `Completion`) çevirir. Yeni tablo yok:
 * - ders "bitti" = userLessons.roleplayDone (lessonBoard üzerinden)
 * - beceri "bitti" = userSkills.lastScore ≥ 70 (eski beceri eşiğiyle aynı: 70)
 *
 * Her kaynak ayrı denenir; biri okunamazsa o küme boş kalır, sayfa yine açılır.
 */
const DONE_PCT = 70;

export async function immersionCompletion(userId: string, course: string): Promise<Completion> {
  const doneLessons = new Set<string>();
  const doneSkills = new Set<string>();
  // "Denendi" ayrı tutuluyor: patika kapısı bunu kullanıyor, ünite tamamlanması
  // hâlâ "bitti"ye bakıyor. İkisini birleştirmek üniteleri hak edilmeden açardı.
  const triedLessons = new Set<string>();
  const triedSkills = new Set<string>();

  try {
    const cards = await lessonBoard(userId, course);
    for (const c of cards) {
      if (c.state?.roleplayDone) doneLessons.add(c.lesson.id);
      // Kayıt varsa ders en az bir kez açılıp cevaplanmıştır.
      if (c.state) triedLessons.add(c.lesson.id);
    }
  } catch (err) {
    console.error("[immersion] ders ilerlemesi okunamadı", err);
  }

  try {
    const rows = await db
      .select({ exerciseId: userSkills.exerciseId, lastScore: userSkills.lastScore })
      .from(userSkills)
      .where(eq(userSkills.userId, userId));
    for (const r of rows) {
      if ((r.lastScore ?? 0) >= DONE_PCT) doneSkills.add(r.exerciseId);
      // Satırın kendisi denemenin kanıtı; puanı yetmemiş olabilir.
      triedSkills.add(r.exerciseId);
    }
  } catch (err) {
    console.error("[immersion] beceri ilerlemesi okunamadı", err);
  }

  return {
    lessonDone: (ref) => doneLessons.has(ref),
    skillDone: (ref) => doneSkills.has(ref),
    lessonAttempted: (ref) => triedLessons.has(ref),
    skillAttempted: (ref) => triedSkills.has(ref),
  };
}
