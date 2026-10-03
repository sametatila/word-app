import "server-only";
import { and, desc, eq, inArray, like, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { exams, profiles, userWords } from "@/lib/db/schema";
import { MASTERED_DAYS } from "@/lib/srs";
import { loadTrack } from "@/lib/immersion/build";
import { immersionCompletion } from "@/lib/immersion/progress";
import { courseOrDefault } from "@/lib/courses";
import { PASS_SECTION, PASS_TOTAL, type SectionScore } from "@/lib/exam-types";
import { readinessScore, type Readiness } from "@/lib/level-readiness-score";
import coreDe from "../../data/core/de.json";
import coreEn from "../../data/core/en.json";
import type { CefrLevel } from "@/lib/skills/types";

/**
 * SEVİYE İLERLEMESİ (docs/plan/level-progress.md) — hazırlık ve onaylı geçiş.
 *
 * Bir seviye "her şeyi bitirince" değil, SABİT çekirdekte yeterlikle biter: hazırlık %60'a varınca
 * seviye sınavı önerilir; sınavı geçen bir üst seviyeye geçmek ister mi diye sorulur (seviye yalnız
 * kabulde değişir: profil kuralı, sistem tek başına terfi etmez). İleri atlama: hazırlığı beklemeden
 * bir üst seviyenin sınavını geçen onun bir üstüne geçebilir.
 */
const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
const CORE: Record<"de" | "en", Record<CefrLevel, number[]>> = {
  de: coreDe.levels as Record<CefrLevel, number[]>,
  en: coreEn.levels as Record<CefrLevel, number[]>,
};

export type LevelStatus = {
  level: CefrLevel;
  next: CefrLevel | null;
  readiness: Readiness;
  /** Geçilmiş bir seviye sınavı bir üst seviyeyi açıyorsa: önerilecek seviye. */
  advance: CefrLevel | null;
};

/** Kayıtlı bölüm puanlarından BUGÜNKÜ eşikle geçti mi (eşik %70 → %60 indi; eski kayıt da sayılsın). */
function passedNow(score: number, answers: unknown): boolean {
  const a = answers as { sections?: SectionScore[]; trial?: boolean } | null;
  if (a?.trial) return false;
  const sections = a?.sections ?? [];
  return score >= PASS_TOTAL && sections.length > 0 && sections.every((s) => s.pct >= PASS_SECTION);
}

/** Geçilmiş seviye sınavlarından açılan en yüksek seviye (geçilen L → L+1; C1 → yok). */
async function unlockedByExam(userId: string): Promise<CefrLevel | null> {
  const rows = await db
    .select({ kind: exams.kind, score: exams.score, answers: exams.answers })
    .from(exams)
    .where(and(eq(exams.userId, userId), like(exams.kind, "level:%")))
    .orderBy(desc(exams.createdAt))
    .limit(50);
  let best = -1;
  for (const r of rows) {
    const i = LEVELS.indexOf(r.kind.split(":")[1] as CefrLevel);
    if (i >= 0 && passedNow(r.score, r.answers)) best = Math.max(best, i);
  }
  return best >= 0 && best + 1 < LEVELS.length ? LEVELS[best + 1] : null;
}

export async function levelStatus(userId: string): Promise<LevelStatus | null> {
  const [p] = await db.select({ level: profiles.level, course: profiles.course }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p) return null;
  const level = (LEVELS.includes(p.level as CefrLevel) ? p.level : "A1") as CefrLevel;
  const i = LEVELS.indexOf(level);
  const lang = courseOrDefault(p.course).targetLang;
  const core = CORE[lang][level] ?? [];

  const [w] = core.length
    ? await db
        .select({
          mastered: sql<number>`count(*) filter (where ${userWords.intervalDays} >= ${MASTERED_DAYS})::int`,
          learning: sql<number>`count(*) filter (where ${userWords.intervalDays} >= 1 and ${userWords.intervalDays} < ${MASTERED_DAYS})::int`,
        })
        .from(userWords)
        .where(and(eq(userWords.userId, userId), inArray(userWords.wordId, core)))
    : [{ mastered: 0, learning: 0 }];

  let pathTotal = 0;
  let pathDone = 0;
  try {
    const [track, completion] = await Promise.all([loadTrack(p.course, level), immersionCompletion(userId, p.course)]);
    for (const unit of track.units) {
      for (const it of unit.items) {
        if (it.kind !== "conversation" || it.ref === null) continue;
        pathTotal++;
        if (completion.conversationDone(it.ref)) pathDone++;
      }
    }
  } catch (err) {
    console.error("[level] patika okunamadı", err);
  }

  const readiness = readinessScore({ coreTotal: core.length, mastered: Number(w?.mastered ?? 0), learning: Number(w?.learning ?? 0), pathTotal, pathDone });
  const unlocked = await unlockedByExam(userId);
  const advance = unlocked && LEVELS.indexOf(unlocked) > i ? unlocked : null;
  return { level, next: i + 1 < LEVELS.length ? LEVELS[i + 1] : null, readiness, advance };
}

/** Onaylı geçiş: yalnız geçilmiş bir sınavın açtığı seviyeye (ya da altına, mevcut seviyenin üstü). */
export async function advanceLevel(userId: string, to: string): Promise<{ ok: boolean; level?: CefrLevel }> {
  const target = to as CefrLevel;
  if (!LEVELS.includes(target)) return { ok: false };
  const st = await levelStatus(userId);
  if (!st?.advance) return { ok: false };
  const ti = LEVELS.indexOf(target);
  if (ti <= LEVELS.indexOf(st.level) || ti > LEVELS.indexOf(st.advance)) return { ok: false };
  await db.update(profiles).set({ level: target }).where(eq(profiles.userId, userId));
  return { ok: true, level: target };
}
