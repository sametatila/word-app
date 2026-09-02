import { and, desc, gte, lt, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats } from "@/lib/db/schema";
import { emitActivity } from "./activity";
import { shiftDay, weekStart } from "./dates";
import { finalizeExpiredQuests } from "./quests";
import { claimOnce } from "./ratelimit";

/**
 * Hafta kapanışı — cron YOK (sunucuda zamanlayıcı kurulu değil), o yüzden
 * "geçen haftayı kapat" işini yeni haftanın ilk sosyal okuması yapar. İş bir
 * kez yapılır: claimOnce aynı hafta anahtarını üç instance arasında tek
 * kişiye verir. Yapılan: geçen haftanın ilk üçüne akış olayı, süresi dolan
 * ortak görevleri kapatma.
 */
export async function closeWeekIfNeeded(today: string): Promise<void> {
  const thisWeek = weekStart(today);
  const lastWeek = shiftDay(thisWeek, -7);
  const mine = await claimOnce(`weekly_close:${lastWeek}`, 60 * 86_400);
  if (!mine) return;
  try {
    await finalizeExpiredQuests(today);
    // Süresi bir günden fazla geçmiş hız-sınırı sayaçları: tablo sonsuza dek büyümesin.
    await db.execute(sql`delete from rate_limits where reset_at < now() - interval '1 day' and key not like 'weekly_close:%'`);
    const top = await db
      .select({ userId: dailyStats.userId, xp: sql<number>`sum(${dailyStats.xp})::int` })
      .from(dailyStats)
      .where(and(gte(dailyStats.day, lastWeek), lt(dailyStats.day, thisWeek)))
      .groupBy(dailyStats.userId)
      .having(sql`sum(${dailyStats.xp}) > 0`)
      .orderBy(desc(sql`sum(${dailyStats.xp})`))
      .limit(3);
    // Tek kişilik hafta sıralama değildir (leaderboard.tsx ile aynı kural).
    if (top.length < 2) return;
    for (let i = 0; i < top.length; i++) {
      await emitActivity(top[i].userId, "weekly_top", { rank: i + 1, xp: Number(top[i].xp), week: lastWeek });
    }
  } catch (err) {
    console.error("[social:weekly]", err);
  }
}
