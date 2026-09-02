import { inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { daysLeftInWeek, weekStart } from "./dates";
import { friendIds, weeklyXpFor } from "./stats";
import { ensureUsernames } from "./usernames";

export type FriendBoardRow = {
  rank: number;
  userId: string;
  name: string | null;
  username: string | null;
  level: string;
  xp: number;
  streak: number;
  isMe: boolean;
};

/**
 * Arkadaşlar arası haftalık tablo. Genel tablonun (getLeaderboard) kuralı
 * korunur: haftalık XP, sonra seri; kaynak daily_stats. Fark yalnız küme —
 * ben + arkadaşlarım. Tek kişiyse tablo yine döner; arayüz "arkadaş ekle"
 * boş durumunu gösterir.
 */
export async function friendsLeaderboard(me: string, today: string): Promise<{ rows: FriendBoardRow[]; start: string; daysLeft: number }> {
  const ids = [me, ...(await friendIds(me))];
  await ensureUsernames(ids);
  const [weekly, prof] = await Promise.all([
    weeklyXpFor(ids, today),
    db
      .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level, streak: profiles.currentStreak })
      .from(profiles)
      .where(inArray(profiles.userId, ids)),
  ]);
  const rows = prof
    .map((p) => ({ userId: p.userId, name: p.name, username: p.username, level: p.level, xp: weekly.get(p.userId) ?? 0, streak: p.streak, isMe: p.userId === me }))
    .sort((a, b) => b.xp - a.xp || b.streak - a.streak || (a.name ?? "").localeCompare(b.name ?? "", "tr"))
    .map((r, i) => ({ rank: i + 1, ...r }));
  return { rows, start: weekStart(today), daysLeft: daysLeftInWeek(today) };
}
