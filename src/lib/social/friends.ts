import { and, desc, eq, gte, inArray, ne, notInArray, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { friendQuests, friendships, profiles, userBlocks } from "@/lib/db/schema";
import { track } from "@/lib/events";
import { emitActivity } from "./activity";
import { blockedEitherWay, blockedSet } from "./blocks";
import { daysBetween, serverToday, shiftDay } from "./dates";
import { SocialError } from "./errors";
import { notify } from "./notify";
import { limited } from "./ratelimit";
import { friendIds, friendRows, publicUsers, weeklyXpFor } from "./stats";
import { friendStreaks } from "./streaks";
import type { FriendRow, PublicUser, Relation } from "./types";
import { ensureUsernames } from "./usernames";

/**
 * Arkadaşlık durum makinesi.
 *
 * İki kullanıcı arasında en fazla BİR satır yaşar (yön: kim istedi). Kurallar:
 *  - none → istek → outgoing/incoming (pending)
 *  - incoming'e istek gönderilirse OTOMATİK kabul: iki tarafın da niyeti belli,
 *    "sen de beni ekle" diye bekletmek anlamsız.
 *  - declined: reddeden görmez; isteyen 7 gün sonra yeniden isteyebilir. Süresiz
 *    engel değil (bunun için engelleme var), süresiz istek de değil (taciz olur).
 *  - accepted → çıkarma sessizdir (bildirim yok), ortak görev iptal olur.
 */
const DECLINE_COOLDOWN_DAYS = 7;

async function pairRows(a: string, b: string) {
  return db
    .select()
    .from(friendships)
    .where(
      or(
        and(eq(friendships.requesterId, a), eq(friendships.addresseeId, b)),
        and(eq(friendships.requesterId, b), eq(friendships.addresseeId, a)),
      ),
    );
}

function declinedRecently(respondedAt: Date | null): boolean {
  if (!respondedAt) return false;
  return daysBetween(respondedAt.toISOString().slice(0, 10), serverToday()) < DECLINE_COOLDOWN_DAYS;
}

export async function relation(me: string, other: string): Promise<{ state: Relation; friendshipId: number | null }> {
  if (me === other) return { state: "self", friendshipId: null };
  const [myBlock] = await db
    .select({ b: userBlocks.blockedId })
    .from(userBlocks)
    .where(and(eq(userBlocks.blockerId, me), eq(userBlocks.blockedId, other)))
    .limit(1);
  if (myBlock) return { state: "blocked", friendshipId: null };
  const rows = await pairRows(me, other);
  const acc = rows.find((r) => r.status === "accepted");
  if (acc) return { state: "friends", friendshipId: acc.id };
  const out = rows.find((r) => r.requesterId === me && r.status === "pending");
  if (out) return { state: "outgoing", friendshipId: out.id };
  const inc = rows.find((r) => r.addresseeId === me && r.status === "pending");
  if (inc) return { state: "incoming", friendshipId: inc.id };
  const dec = rows.find((r) => r.requesterId === me && r.status === "declined" && declinedRecently(r.respondedAt));
  if (dec) return { state: "declined", friendshipId: dec.id };
  return { state: "none", friendshipId: null };
}

/** Birden çok kişi için tek seferde — arama ve öneri listeleri düğmeyi buna göre çizer. */
export async function relations(me: string, others: string[]): Promise<Map<string, Relation>> {
  const map = new Map<string, Relation>();
  if (!others.length) return map;
  for (const o of others) map.set(o, o === me ? "self" : "none");
  const blocks = await db
    .select({ b: userBlocks.blockedId })
    .from(userBlocks)
    .where(and(eq(userBlocks.blockerId, me), inArray(userBlocks.blockedId, others)));
  for (const b of blocks) map.set(b.b, "blocked");
  const rows = await db
    .select()
    .from(friendships)
    .where(
      or(
        and(eq(friendships.requesterId, me), inArray(friendships.addresseeId, others)),
        and(eq(friendships.addresseeId, me), inArray(friendships.requesterId, others)),
      ),
    );
  for (const r of rows) {
    const other = r.requesterId === me ? r.addresseeId : r.requesterId;
    if (map.get(other) === "blocked") continue;
    if (r.status === "accepted") map.set(other, "friends");
    else if (r.status === "pending") map.set(other, r.requesterId === me ? "outgoing" : "incoming");
    else if (r.status === "declined" && r.requesterId === me && declinedRecently(r.respondedAt)) map.set(other, "declined");
  }
  return map;
}

export async function sendRequest(me: string, other: string): Promise<{ state: Relation; friendshipId: number }> {
  if (me === other) throw new SocialError("self", 400);
  if (await blockedEitherWay(me, other)) throw new SocialError("not_found", 404);
  const [target] = await db
    .select({ allowRequests: profiles.allowRequests })
    .from(profiles)
    .where(eq(profiles.userId, other))
    .limit(1);
  if (!target) throw new SocialError("not_found", 404);
  if (!target.allowRequests) throw new SocialError("requests_closed", 403);

  const rows = await pairRows(me, other);
  const acc = rows.find((r) => r.status === "accepted");
  if (acc) return { state: "friends", friendshipId: acc.id };
  const inc = rows.find((r) => r.addresseeId === me && r.status === "pending");
  if (inc) {
    await respondRequest(me, inc.id, "accept");
    return { state: "friends", friendshipId: inc.id };
  }
  const out = rows.find((r) => r.requesterId === me && r.status === "pending");
  if (out) return { state: "outgoing", friendshipId: out.id };
  const mine = rows.find((r) => r.requesterId === me);
  if (mine && mine.status === "declined" && declinedRecently(mine.respondedAt)) {
    throw new SocialError("declined_recent", 429);
  }
  const rl = await limited("friendRequest", me);
  if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);

  let id: number;
  if (mine) {
    await db
      .update(friendships)
      .set({ status: "pending", createdAt: new Date(), respondedAt: null })
      .where(eq(friendships.id, mine.id));
    id = mine.id;
  } else {
    // Karşı tarafın eski reddedilmiş isteği varsa siler: çift artık tek satırla temsil edilsin.
    const theirs = rows.find((r) => r.requesterId === other);
    if (theirs) await db.delete(friendships).where(eq(friendships.id, theirs.id));
    const [row] = await db
      .insert(friendships)
      .values({ requesterId: me, addresseeId: other })
      .returning({ id: friendships.id });
    id = row.id;
  }
  const meP = (await publicUsers([me])).get(me);
  await notify(
    other,
    { type: "friend_request", actorId: me, refType: "friendship", refId: id },
    {
      title: "Yeni arkadaşlık isteği",
      body: `${meP?.name ?? "Biri"} seni arkadaş olarak eklemek istiyor`,
      url: "/friends?tab=requests",
      tag: "friend-request",
    },
  );
  await track(me, "friend_request", serverToday());
  return { state: "outgoing", friendshipId: id };
}

export async function respondRequest(me: string, friendshipId: number, action: "accept" | "decline"): Promise<void> {
  const [row] = await db.select().from(friendships).where(eq(friendships.id, friendshipId)).limit(1);
  if (!row || row.addresseeId !== me || row.status !== "pending") throw new SocialError("not_found", 404);
  const now = new Date();
  if (action === "decline") {
    await db.update(friendships).set({ status: "declined", respondedAt: now }).where(eq(friendships.id, friendshipId));
    return;
  }
  await db.update(friendships).set({ status: "accepted", respondedAt: now }).where(eq(friendships.id, friendshipId));
  const users = await publicUsers([me, row.requesterId]);
  const meP = users.get(me);
  const them = users.get(row.requesterId);
  // İki tarafın da akışında "arkadaş oldu" — akış okunurken çift kaydı aynı çift için tekilleştirir.
  await emitActivity(me, "friend_joined", { friendId: row.requesterId, friendName: them?.name ?? null, friendUsername: them?.username ?? null });
  await emitActivity(row.requesterId, "friend_joined", { friendId: me, friendName: meP?.name ?? null, friendUsername: meP?.username ?? null });
  await notify(
    row.requesterId,
    { type: "friend_accepted", actorId: me, refType: "friendship", refId: friendshipId },
    {
      title: "Artık arkadaşsınız",
      body: `${meP?.name ?? "Biri"} isteğini kabul etti`,
      url: meP?.username ? `/u/${meP.username}` : "/friends",
      tag: "friend-accepted",
    },
  );
  await track(me, "friend_accept", serverToday());
}

/** Arkadaşlıktan çıkar ya da bekleyen isteği iptal et/reddet — sessiz. */
export async function removeFriend(me: string, other: string): Promise<void> {
  await db
    .delete(friendships)
    .where(
      or(
        and(eq(friendships.requesterId, me), eq(friendships.addresseeId, other)),
        and(eq(friendships.requesterId, other), eq(friendships.addresseeId, me)),
      ),
    );
  await db
    .update(friendQuests)
    .set({ status: "cancelled" })
    .where(
      and(
        inArray(friendQuests.status, ["invited", "active"]),
        or(
          and(eq(friendQuests.userAId, me), eq(friendQuests.userBId, other)),
          and(eq(friendQuests.userAId, other), eq(friendQuests.userBId, me)),
        ),
      ),
    );
}

export async function listFriends(me: string, today: string): Promise<FriendRow[]> {
  const rows = await friendRows(me);
  if (!rows.length) return [];
  const ids = rows.map((r) => r.friendId);
  const [users, weekly, streaks, prof] = await Promise.all([
    publicUsers(ids),
    weeklyXpFor(ids, today),
    friendStreaks(me, ids, today),
    db
      .select({ userId: profiles.userId, currentStreak: profiles.currentStreak, lastActiveDay: profiles.lastActiveDay })
      .from(profiles)
      .where(inArray(profiles.userId, ids)),
  ]);
  const profMap = new Map(prof.map((p) => [p.userId, p]));
  return rows
    .map((r) => {
      const u = users.get(r.friendId);
      const p = profMap.get(r.friendId);
      return {
        userId: r.friendId,
        name: u?.name ?? null,
        username: u?.username ?? null,
        level: u?.level ?? "A1",
        friendshipId: r.friendshipId,
        currentStreak: p?.currentStreak ?? 0,
        weeklyXp: weekly.get(r.friendId) ?? 0,
        lastActiveDay: p?.lastActiveDay ? String(p.lastActiveDay) : null,
        friendStreak: streaks.get(r.friendId) ?? 0,
        since: new Date(r.since).toISOString(),
      };
    })
    .sort((a, b) => b.weeklyXp - a.weeklyXp || b.currentStreak - a.currentStreak || (a.name ?? "").localeCompare(b.name ?? "", "tr"));
}

export type PendingRequest = { friendshipId: number; user: PublicUser; createdAt: string };

export async function pendingRequests(me: string): Promise<{ incoming: PendingRequest[]; outgoing: PendingRequest[] }> {
  const rows = await db
    .select()
    .from(friendships)
    .where(and(eq(friendships.status, "pending"), or(eq(friendships.requesterId, me), eq(friendships.addresseeId, me))))
    .orderBy(desc(friendships.createdAt));
  const ids = rows.map((r) => (r.requesterId === me ? r.addresseeId : r.requesterId));
  const users = await publicUsers(ids);
  const view = (r: (typeof rows)[number]): PendingRequest => {
    const other = r.requesterId === me ? r.addresseeId : r.requesterId;
    return {
      friendshipId: r.id,
      user: users.get(other) ?? { userId: other, name: null, username: null, level: "A1" },
      createdAt: new Date(r.createdAt).toISOString(),
    };
  };
  return {
    incoming: rows.filter((r) => r.addresseeId === me).map(view),
    outgoing: rows.filter((r) => r.requesterId === me).map(view),
  };
}

export async function mutualFriendCount(me: string, other: string): Promise<number> {
  const [a, b] = await Promise.all([friendIds(me), friendIds(other)]);
  const set = new Set(a);
  return b.filter((x) => set.has(x)).length;
}

export type Suggestion = PublicUser & { mutual: number; reason: "mutual" | "level" | "active"; currentStreak: number };

/**
 * Öneriler: önce ortak arkadaşı olanlar (çok olandan aza), sonra aynı
 * seviyede son yedi gün aktif olanlar. Kendisi, arkadaşları, bekleyen/
 * reddedilmiş istekleri ve engellileri dışarıda bırakır; öneriye çıkmayı
 * kapatan ya da gizli profil hiç görünmez. Tavan 20 — öneri listesi bir
 * rehber değil, bir başlangıçtır.
 */
export async function suggestions(me: string, today: string, limit = 20): Promise<Suggestion[]> {
  const [friends, blocked, pairs, meProfile] = await Promise.all([
    friendIds(me),
    blockedSet(me),
    db
      .select({ a: friendships.requesterId, b: friendships.addresseeId })
      .from(friendships)
      .where(or(eq(friendships.requesterId, me), eq(friendships.addresseeId, me))),
    db.select({ level: profiles.level }).from(profiles).where(eq(profiles.userId, me)).limit(1),
  ]);
  const excluded = new Set<string>([me, ...friends, ...blocked]);
  for (const p of pairs) excluded.add(p.a === me ? p.b : p.a);

  // Arkadaşın arkadaşları — ortak arkadaş sayısıyla.
  const mutual = new Map<string, number>();
  if (friends.length) {
    const fof = await db
      .select({ a: friendships.requesterId, b: friendships.addresseeId })
      .from(friendships)
      .where(and(eq(friendships.status, "accepted"), or(inArray(friendships.requesterId, friends), inArray(friendships.addresseeId, friends))));
    for (const r of fof) {
      const candidate = friends.includes(r.a) ? r.b : r.a;
      if (excluded.has(candidate)) continue;
      mutual.set(candidate, (mutual.get(candidate) ?? 0) + 1);
    }
  }
  const eligible = (visibility: string, show: boolean) => show && visibility !== "private";

  const out: Suggestion[] = [];
  const seen = new Set<string>();
  if (mutual.size) {
    const ids = [...mutual.keys()];
    await ensureUsernames(ids);
    const rows = await db
      .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level, visibility: profiles.visibility, show: profiles.showInSuggestions, currentStreak: profiles.currentStreak })
      .from(profiles)
      .where(inArray(profiles.userId, ids));
    for (const r of rows) {
      if (!eligible(r.visibility, r.show)) continue;
      out.push({ userId: r.userId, name: r.name, username: r.username, level: r.level, mutual: mutual.get(r.userId) ?? 0, reason: "mutual", currentStreak: r.currentStreak });
      seen.add(r.userId);
    }
    out.sort((a, b) => b.mutual - a.mutual || b.currentStreak - a.currentStreak);
  }
  if (out.length < limit) {
    const level = meProfile[0]?.level ?? "A1";
    const excludeList = [...excluded, ...seen];
    const rows = await db
      .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level, currentStreak: profiles.currentStreak })
      .from(profiles)
      .where(
        and(
          eq(profiles.showInSuggestions, true),
          ne(profiles.visibility, "private"),
          gte(profiles.lastActiveDay, shiftDay(today, -7)),
          excludeList.length ? notInArray(profiles.userId, excludeList) : sql`true`,
        ),
      )
      .orderBy(sql`case when ${profiles.level} = ${level} then 0 else 1 end`, desc(profiles.currentStreak))
      .limit(limit - out.length);
    const nameless = rows.filter((r) => !r.username).map((r) => r.userId);
    if (nameless.length) {
      await ensureUsernames(nameless);
      const fresh = await db.select({ userId: profiles.userId, username: profiles.username }).from(profiles).where(inArray(profiles.userId, nameless));
      const map = new Map(fresh.map((f) => [f.userId, f.username]));
      for (const r of rows) if (!r.username) r.username = map.get(r.userId) ?? null;
    }
    for (const r of rows) {
      out.push({ userId: r.userId, name: r.name, username: r.username, level: r.level, mutual: 0, reason: r.level === level ? "level" : "active", currentStreak: r.currentStreak });
    }
  }
  return out.slice(0, limit);
}
