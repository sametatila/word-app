import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, profiles } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile, shiftDay } from "@/lib/session";
import { getExercise, itemCount, xpFor } from "@/lib/skills";

export const dynamic = "force-dynamic";

/**
 * Beceri egzersizi tamamlandığında XP ve seri işler.
 *
 * XP istemciden gelmez: egzersiz derlemeye gömülü içerikten bulunur, doğru
 * sayısı madde sayısıyla sınırlanır ve puan sunucuda hesaplanır. Kelime SRS'i
 * ile karışmaması için yalnızca XP/süre/seri güncellenir; günlük tekrar
 * hedefi (reviews) kelime oyunlarına aittir.
 */
export async function POST(req: Request) {
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

  const correct = Math.min(itemCount(exercise), parsed.correct);
  const xpGained = xpFor(exercise, correct);

  try {
    const profile = await ensureProfile(userId);
    const today = parsed.day;

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
