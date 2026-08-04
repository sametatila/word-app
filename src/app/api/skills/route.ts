import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles, userSkills } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { ensureProfile, shiftDay } from "@/lib/session";
import { getExercise, itemCount, xpFor } from "@/lib/skills";

export const dynamic = "force-dynamic";

/**
 * Beceri egzersizi tamamlandığında XP ve seri işler.
 *
 * XP istemciden gelmez: egzersiz veritabanından bulunur, doğru sayısı madde
 * sayısıyla sınırlanır ve puan sunucuda hesaplanır. Aynı egzersizi tekrar
 * çözmek XP kasmaya izin vermez: user_skills'teki en iyi skora göre yalnızca
 * iyileşme farkı eklenir. Kelime SRS'i ile karışmaması için günlük tekrar
 * hedefi (reviews) kelime oyunlarına aittir; burada XP/süre/seri güncellenir.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const exercise = await getExercise(parsed.id);
  if (!exercise) return NextResponse.json({ error: "unknown_exercise" }, { status: 400 });

  const total = itemCount(exercise);
  const correct = Math.min(total, parsed.correct);

  try {
    const profile = await ensureProfile(userId);
    const today = parsed.day;

    // En iyi skoru oku: XP yalnızca ilk tamamlamada ya da skor iyileşince eklenir.
    const [prev] = await db
      .select()
      .from(userSkills)
      .where(and(eq(userSkills.userId, userId), eq(userSkills.exerciseId, exercise.id)));
    const prevBest = prev ? Math.min(prev.correct, total) : null;
    const best = Math.max(correct, prevBest ?? 0);
    const xpGained = Math.max(0, xpFor(exercise, best) - (prevBest === null ? 0 : xpFor(exercise, prevBest)));

    await db
      .insert(userSkills)
      .values({ userId, exerciseId: exercise.id, correct: best, total, attempts: 1 })
      .onConflictDoUpdate({
        target: [userSkills.userId, userSkills.exerciseId],
        set: {
          correct: best,
          total,
          attempts: sql`${userSkills.attempts} + 1`,
          lastAt: new Date(),
        },
      });

    await db
      .insert(dailyStats)
      .values({ userId, day: today, xp: xpGained, seconds: parsed.seconds })
      .onConflictDoUpdate({
        target: [dailyStats.userId, dailyStats.day],
        set: {
          xp: sql`${dailyStats.xp} + ${xpGained}`,
          seconds: sql`${dailyStats.seconds} + ${parsed.seconds}`,
        },
      });

    let { currentStreak, longestStreak } = profile;
    if (profile.lastActiveDay !== today) {
      currentStreak = profile.lastActiveDay === shiftDay(today, -1) ? profile.currentStreak + 1 : 1;
      longestStreak = Math.max(profile.longestStreak, currentStreak);
    }

    await db
      .update(profiles)
      .set({
        currentStreak,
        longestStreak,
        lastActiveDay: today,
        totalXp: profile.totalXp + xpGained,
      })
      .where(eq(profiles.userId, userId));

    return NextResponse.json({
      xpGained,
      totalXp: profile.totalXp + xpGained,
      currentStreak,
      longestStreak,
      bestCorrect: best,
      total,
      repeat: prevBest !== null,
    });
  } catch (err) {
    console.error("[skills]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function parseBody(body: unknown) {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (typeof b.id !== "string" || b.id.length > 20) return null;
  if (typeof b.correct !== "number" || !Number.isInteger(b.correct) || b.correct < 0) return null;
  const day =
    typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day)
      ? b.day
      : new Date().toISOString().slice(0, 10);
  const seconds =
    typeof b.seconds === "number" ? Math.max(0, Math.min(3600, Math.round(b.seconds))) : 0;
  return { id: b.id, correct: b.correct, day, seconds };
}
