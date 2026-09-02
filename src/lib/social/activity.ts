import { and, desc, eq, inArray, lt, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityEvents, profiles } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { serverToday } from "./dates";
import { notify } from "./notify";
import { reactionSummaries } from "./reactions";
import { friendIds, publicUsers } from "./stats";
import { STREAK_MILESTONES, type ActivityType, type FeedItem } from "./types";

/**
 * Akış olayları: yazma ve okuma.
 *
 * Yalnız kilometre taşları yazılır. Kullanıcı akış üretmeyi kapatmışsa
 * (showActivity=false) olay HİÇ yazılmaz — sonradan gizlemek yerine; gizlilik
 * kararı geriye dönük "aslında yazılmıştı" ile çelişmemeli.
 */
export function streakMilestoneCrossed(prev: number, next: number): number | null {
  let hit: number | null = null;
  for (const m of STREAK_MILESTONES) if (prev < m && next >= m) hit = m;
  return hit;
}

/** Arkadaşların gelen kutusuna düşen (push'suz) olay türleri. */
const FANOUT: ActivityType[] = ["streak_milestone", "achievement", "quest_completed", "weekly_top", "friend_streak"];
const FANOUT_CAP = 100;

export async function emitActivity(userId: string, type: ActivityType, payload: Record<string, unknown>): Promise<number | null> {
  const [p] = await db.select({ show: profiles.showActivity }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p || !p.show) return null;
  const [row] = await db.insert(activityEvents).values({ userId, type, payload }).returning({ id: activityEvents.id });
  if (FANOUT.includes(type)) {
    const friends = (await friendIds(userId)).slice(0, FANOUT_CAP);
    for (const f of friends) {
      await notify(f, { type: "friend_milestone", actorId: userId, refType: "event", refId: row.id });
    }
  }
  return row.id;
}

function parseCursor(cursor: string | null): { at: Date; id: number } | null {
  if (!cursor) return null;
  const [iso, idRaw] = cursor.split("|");
  const at = new Date(iso);
  const id = Number(idRaw);
  if (Number.isNaN(at.getTime()) || !Number.isInteger(id)) return null;
  return { at, id };
}

/**
 * Arkadaş akışı: benim + arkadaşlarımın olayları, yeniden eskiye, imleçli.
 * İmleç (createdAt, id) çifti — aynı saniyede iki olay sayfa sınırında
 * kaybolmasın. "Arkadaş oldu" olayı iki tarafta da yazıldığı için aynı çift
 * sayfada bir kez gösterilir.
 */
export async function feed(
  me: string,
  cursor: string | null,
  limit = 20,
  onlyUser?: string,
): Promise<{ items: FeedItem[]; nextCursor: string | null }> {
  const ids = onlyUser ? [onlyUser] : [me, ...(await friendIds(me))];
  const c = parseCursor(cursor);
  const rows = await db
    .select()
    .from(activityEvents)
    .where(
      and(
        inArray(activityEvents.userId, ids),
        c
          ? or(lt(activityEvents.createdAt, c.at), and(eq(activityEvents.createdAt, c.at), lt(activityEvents.id, c.id)))
          : sql`true`,
      ),
    )
    .orderBy(desc(activityEvents.createdAt), desc(activityEvents.id))
    .limit(limit + 1);
  const more = rows.length > limit;
  const page = rows.slice(0, limit);

  const seenPairs = new Set<string>();
  const kept = page.filter((r) => {
    if (r.type !== "friend_joined") return true;
    const other = String((r.payload as Record<string, unknown>).friendId ?? "");
    const key = [r.userId, other].sort().join(":");
    if (seenPairs.has(key)) return false;
    seenPairs.add(key);
    return true;
  });

  const [users, reactions] = await Promise.all([
    publicUsers([...new Set(kept.map((r) => r.userId))]),
    reactionSummaries(kept.map((r) => r.id), me),
  ]);
  const items: FeedItem[] = kept.map((r) => ({
    id: r.id,
    type: r.type as ActivityType,
    payload: (r.payload ?? {}) as Record<string, unknown>,
    createdAt: new Date(r.createdAt).toISOString(),
    user: users.get(r.userId) ?? { userId: r.userId, name: null, username: null, level: "A1" },
    reactions: reactions.get(r.id) ?? { counts: {}, total: 0, mine: null, names: [] },
    isMine: r.userId === me,
  }));
  const last = page[page.length - 1];
  const nextCursor = more && last ? `${new Date(last.createdAt).toISOString()}|${last.id}` : null;
  if (!onlyUser) await track(me, "feed_view", serverToday(), items.length);
  return { items, nextCursor };
}
