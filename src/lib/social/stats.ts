import { and, eq, gte, inArray, lt, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { dailyStats, friendships, profiles } from "@/lib/db/schema";
import { shiftDay, weekStart } from "./dates";
import type { PublicUser } from "./types";
import { ensureUsernames } from "./usernames";

/**
 * Sosyal katmanın paylaşılan sorguları. Ayrı dosyada olmalarının sebebi
 * bağımlılık yönü: friends.ts akışa olay yazar, activity.ts akışı okurken
 * arkadaş listesine bakar — ikisi de buraya bakar, birbirine değil.
 */

/** Kabul edilmiş arkadaşların kimlikleri (iki yön). */
export async function friendIds(userId: string): Promise<string[]> {
  const rows = await db
    .select({ a: friendships.requesterId, b: friendships.addresseeId })
    .from(friendships)
    .where(
      and(
        eq(friendships.status, "accepted"),
        or(eq(friendships.requesterId, userId), eq(friendships.addresseeId, userId)),
      ),
    );
  return rows.map((r) => (r.a === userId ? r.b : r.a));
}

/** Arkadaşlık kabul tarihiyle birlikte — "X'ten beri arkadaş". */
export async function friendRows(userId: string): Promise<{ friendId: string; friendshipId: number; since: Date }[]> {
  const rows = await db
    .select({ id: friendships.id, a: friendships.requesterId, b: friendships.addresseeId, at: friendships.respondedAt, created: friendships.createdAt })
    .from(friendships)
    .where(
      and(
        eq(friendships.status, "accepted"),
        or(eq(friendships.requesterId, userId), eq(friendships.addresseeId, userId)),
      ),
    );
  return rows.map((r) => ({ friendId: r.a === userId ? r.b : r.a, friendshipId: r.id, since: r.at ?? r.created }));
}

export async function publicUsers(ids: string[]): Promise<Map<string, PublicUser>> {
  const map = new Map<string, PublicUser>();
  if (!ids.length) return map;
  // Sosyal katman öncesi hesapların adı yok; listelendikleri anda atanır (bkz. usernames.ts).
  await ensureUsernames(ids);
  const rows = await db
    .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level })
    .from(profiles)
    .where(inArray(profiles.userId, ids));
  for (const r of rows) map.set(r.userId, { userId: r.userId, name: r.name, username: r.username, level: r.level });
  return map;
}

/** [start, end) aralığındaki XP toplamı, kullanıcı başına. Yeni sayaç yok: kaynak daily_stats. */
export async function xpBetween(ids: string[], start: string, end: string): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  if (!ids.length) return map;
  const rows = await db
    .select({ userId: dailyStats.userId, xp: sql<number>`coalesce(sum(${dailyStats.xp}), 0)::int` })
    .from(dailyStats)
    .where(and(inArray(dailyStats.userId, ids), gte(dailyStats.day, start), lt(dailyStats.day, end)))
    .groupBy(dailyStats.userId);
  for (const r of rows) map.set(r.userId, Number(r.xp));
  return map;
}

export function weeklyXpFor(ids: string[], today: string): Promise<Map<string, number>> {
  const start = weekStart(today);
  return xpBetween(ids, start, shiftDay(start, 7));
}
