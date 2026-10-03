import { and, desc, eq, inArray, lt, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityEvents, profiles } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { serverToday } from "./dates";
import { notifyMany } from "./notify";
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
    // Tek toplu ekleme: yüz arkadaşı olan biri için yüz ayrı INSERT atılıyordu.
    await notifyMany(friends, { type: "friend_milestone", actorId: userId, refType: "event", refId: row.id });
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
  const myFriends = await friendIds(me);
  const ids = onlyUser ? [onlyUser] : [me, ...myFriends];
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

  const [users, reactions, hidden] = await Promise.all([
    publicUsers([...new Set(kept.map((r) => r.userId))]),
    reactionSummaries(kept.map((r) => r.id), me),
    hiddenThirdParties(me, myFriends, kept.map((r) => thirdParty(r.payload)).filter((x): x is string => !!x)),
  ]);
  const items: FeedItem[] = kept.map((r) => ({
    id: r.id,
    type: r.type as ActivityType,
    payload: maskThirdParty((r.payload ?? {}) as Record<string, unknown>, hidden),
    createdAt: new Date(r.createdAt).toISOString(),
    user: users.get(r.userId) ?? { userId: r.userId, name: null, username: null, level: "A1", avatar: null },
    reactions: reactions.get(r.id) ?? { counts: {}, total: 0, mine: null, names: [] },
    isMine: r.userId === me,
  }));
  const last = page[page.length - 1];
  const nextCursor = more && last ? `${new Date(last.createdAt).toISOString()}|${last.id}` : null;
  if (!onlyUser) await track(me, "feed_view", serverToday(), items.length);
  return { items, nextCursor };
}

/** Olayın bahsettiği ÜÇÜNCÜ kişi ("A, B ile arkadaş oldu"daki B). */
function thirdParty(payload: unknown): string | null {
  const id = (payload as Record<string, unknown> | null)?.friendId;
  return typeof id === "string" && id ? id : null;
}

/**
 * ÜÇÜNCÜ KİŞİNİN GÖRÜNÜRLÜĞÜ. "Arkadaş oldu" ve ortak seri olayları karşı
 * tarafın adını taşıyor; o kişi profilini gizli yapmışsa (ya da "yalnız
 * arkadaşlar" deyip bakan onun arkadaşı değilse) adı, arkadaşının akışı
 * üzerinden yabancılara sızmamalı (gizlilik §4a, güvenlik denetimi O14).
 * Ad olay yazılırken yüke girdiği için maske okurken uygulanıyor: görünürlük
 * sonradan değişse de geçerli olan bugünkü tercih.
 */
async function hiddenThirdParties(me: string, myFriends: string[], ids: string[]): Promise<Set<string>> {
  const others = [...new Set(ids)].filter((id) => id !== me);
  if (!others.length) return new Set();
  const friends = new Set(myFriends);
  const rows = await db
    .select({ userId: profiles.userId, visibility: profiles.visibility })
    .from(profiles)
    .where(inArray(profiles.userId, others));
  const vis = new Map(rows.map((r) => [r.userId, r.visibility]));
  return new Set(
    others.filter((id) => {
      const v = vis.get(id);
      return v !== "public" && !(v === "friends" && friends.has(id));
    }),
  );
}

function maskThirdParty(payload: Record<string, unknown>, hidden: Set<string>): Record<string, unknown> {
  const id = thirdParty(payload);
  if (!id || !hidden.has(id)) return payload;
  return { ...payload, friendId: null, friendName: null, friendUsername: null };
}
