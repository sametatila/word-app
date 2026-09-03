import { and, eq, ilike, inArray, ne, notInArray, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { achievementCount } from "@/lib/achievements";
import { bioAllowed, usernameAllowed } from "@/lib/moderation";
import { track } from "@/lib/events";
import { feed } from "./activity";
import { blockedEitherWay, blockedSet } from "./blocks";
import { daysBetween, serverToday } from "./dates";
import { SocialError } from "./errors";
import { mutualFriendCount, relation, relations } from "./friends";
import { unreadCount } from "./notify";
import { limited } from "./ratelimit";
import { friendIds, weeklyXpFor } from "./stats";
import { friendStreaks } from "./streaks";
import { BIO_MAX, USERNAME_CHANGE_COOLDOWN_DAYS, normalizeBio, normalizeUsername, usernameQuery } from "./username";
import { assignOne, ensureUsernames } from "./usernames";
import { VISIBILITIES, type FeedItem, type PublicUser, type Relation, type Visibility } from "./types";

export type SocialMe = {
  userId: string;
  name: string | null;
  username: string;
  bio: string | null;
  level: string;
  visibility: Visibility;
  allowRequests: boolean;
  showInSuggestions: boolean;
  showActivity: boolean;
  usernameChangedAt: string | null;
  usernameChangeAvailableIn: number;
  counts: { friends: number; incoming: number; outgoing: number; unread: number };
};

/** Kullanıcı adı yoksa görünen addan türetip yazar (yarışa dayanıklı, bkz. usernames.ts). Sosyal ekran hep bir adla açılır. */
export async function ensureUsername(userId: string): Promise<string> {
  const [p] = await db.select({ username: profiles.username, name: profiles.displayName }).from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p) throw new SocialError("not_found", 404);
  if (p.username) return p.username;
  const assigned = await assignOne(userId, p.name);
  if (!assigned) throw new SocialError("database", 500);
  return assigned;
}

export async function socialMe(userId: string): Promise<SocialMe> {
  const username = await ensureUsername(userId);
  const [p] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p) throw new SocialError("not_found", 404);
  const [friends, unread, pending] = await Promise.all([
    friendIds(userId),
    unreadCount(userId),
    db.execute(sql`
      select
        count(*) filter (where addressee_id = ${userId} and status = 'pending')::int as incoming,
        count(*) filter (where requester_id = ${userId} and status = 'pending')::int as outgoing
      from friendships where addressee_id = ${userId} or requester_id = ${userId}
    `),
  ]);
  const pend = (pending as unknown as { rows: { incoming: number; outgoing: number }[] }).rows?.[0];
  const changedAt = p.usernameChangedAt ? new Date(p.usernameChangedAt) : null;
  const sinceChange = changedAt ? daysBetween(changedAt.toISOString().slice(0, 10), serverToday()) : USERNAME_CHANGE_COOLDOWN_DAYS;
  return {
    userId,
    name: p.displayName,
    username,
    bio: p.bio,
    level: p.level,
    visibility: p.visibility as Visibility,
    allowRequests: p.allowRequests,
    showInSuggestions: p.showInSuggestions,
    showActivity: p.showActivity,
    usernameChangedAt: changedAt ? changedAt.toISOString() : null,
    usernameChangeAvailableIn: Math.max(0, USERNAME_CHANGE_COOLDOWN_DAYS - sinceChange),
    counts: { friends: friends.length, incoming: Number(pend?.incoming ?? 0), outgoing: Number(pend?.outgoing ?? 0), unread },
  };
}

export type SocialPatch = {
  username?: unknown;
  bio?: unknown;
  visibility?: unknown;
  allowRequests?: unknown;
  showInSuggestions?: unknown;
  showActivity?: unknown;
};

/**
 * Sosyal ayarları günceller. Kullanıcı adı: geçerli, benzersiz, 14 günde bir
 * (otomatik atanan ilk ad serbestçe değiştirilir — kullanıcı seçmediği adı
 * "değiştirmiş" sayılmaz). Alan alan doğrulanır; geçersiz alan tüm isteği
 * düşürür, kısmi yazım olmaz.
 */
export async function updateSocialSettings(userId: string, patch: SocialPatch): Promise<SocialMe> {
  const [p] = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  if (!p) throw new SocialError("not_found", 404);
  const set: Partial<typeof profiles.$inferInsert> = {};
  const changed: string[] = [];

  if (patch.username !== undefined) {
    const u = normalizeUsername(patch.username);
    if (!u) throw new SocialError("username_invalid", 400);
    // Kullanıcı adı herkese görünür ve arama sonucunda çıkar: karakter kümesi
    // bağlantıyı zaten eliyor, küfür süzgeci burada (Play UGC).
    if (!usernameAllowed(u)) throw new SocialError("username_invalid", 400);
    if (u !== p.username) {
      if (p.usernameChangedAt) {
        const since = daysBetween(new Date(p.usernameChangedAt).toISOString().slice(0, 10), serverToday());
        if (since < USERNAME_CHANGE_COOLDOWN_DAYS) throw new SocialError("username_cooldown", 429, (USERNAME_CHANGE_COOLDOWN_DAYS - since) * 86_400);
      }
      const taken = await db.select({ id: profiles.userId }).from(profiles).where(and(eq(profiles.username, u), ne(profiles.userId, userId))).limit(1);
      if (taken.length) throw new SocialError("username_taken", 409);
      set.username = u;
      set.usernameChangedAt = new Date();
      changed.push("username");
    }
  }
  if (patch.bio !== undefined) {
    if (patch.bio !== null && typeof patch.bio !== "string") throw new SocialError("bad_request", 400);
    if (typeof patch.bio === "string" && patch.bio.length > BIO_MAX * 4) throw new SocialError("bad_request", 400);
    const bio = normalizeBio(patch.bio);
    // Biyografi profil sayfasında herkese açık tek serbest metin; bağlantı,
    // e-posta, telefon ve küfür için görünen adla aynı süzgeçten geçiyor.
    if (bio && !bioAllowed(bio)) throw new SocialError("bio_invalid", 400);
    set.bio = bio;
    changed.push("bio");
  }
  if (patch.visibility !== undefined) {
    if (typeof patch.visibility !== "string" || !(VISIBILITIES as readonly string[]).includes(patch.visibility)) throw new SocialError("bad_request", 400);
    set.visibility = patch.visibility;
    changed.push("visibility");
  }
  for (const key of ["allowRequests", "showInSuggestions", "showActivity"] as const) {
    if (patch[key] !== undefined) {
      if (typeof patch[key] !== "boolean") throw new SocialError("bad_request", 400);
      set[key] = patch[key] as boolean;
      changed.push(key);
    }
  }
  if (Object.keys(set).length) {
    await db.update(profiles).set(set).where(eq(profiles.userId, userId));
    for (const c of changed) await track(userId, "social_settings", serverToday(), 0, c);
  }
  return socialMe(userId);
}

export type PublicProfile = {
  user: PublicUser;
  bio: string | null;
  visibility: Visibility;
  relation: Relation;
  friendshipId: number | null;
  canRequest: boolean;
  mutual: number;
  friendStreak: number;
  joined: string;
  stats: {
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
    weeklyXp: number;
    achievements: number;
    lastActiveDay: string | null;
  } | null;
  recent: FeedItem[];
};

/**
 * Herkese açık profil. Engel iki yönde de "bulunamadı" verir — engellenen
 * kişi engellendiğini profil sayfasından çıkaramamalı. İstatistik ve akış
 * görünürlüğe göre: public herkese, friends yalnız arkadaşa, private kimseye.
 */
export async function publicProfile(viewer: string, usernameRaw: string): Promise<PublicProfile> {
  const username = normalizeUsername(usernameRaw);
  if (!username) throw new SocialError("not_found", 404);
  const [p] = await db.select().from(profiles).where(eq(profiles.username, username)).limit(1);
  if (!p) throw new SocialError("not_found", 404);
  const uid = p.userId;
  if (viewer !== uid && (await blockedEitherWay(viewer, uid))) throw new SocialError("not_found", 404);
  const rel = await relation(viewer, uid);
  const isSelf = viewer === uid;
  const visibility = p.visibility as Visibility;
  const canSee = isSelf || visibility === "public" || (visibility === "friends" && rel.state === "friends");
  const today = serverToday();
  const [mutual, weekly, ach, streaks, recent] = await Promise.all([
    isSelf ? Promise.resolve(0) : mutualFriendCount(viewer, uid),
    canSee ? weeklyXpFor([uid], today) : Promise.resolve(new Map<string, number>()),
    canSee ? achievementCount(uid) : Promise.resolve(0),
    rel.state === "friends" ? friendStreaks(viewer, [uid], today) : Promise.resolve(new Map<string, number>()),
    canSee ? feed(viewer, null, 5, uid) : Promise.resolve({ items: [] as FeedItem[], nextCursor: null }),
  ]);
  return {
    user: { userId: uid, name: p.displayName, username, level: p.level },
    bio: canSee ? p.bio : null,
    visibility,
    relation: rel.state,
    friendshipId: rel.friendshipId,
    canRequest: !isSelf && p.allowRequests && (rel.state === "none" || rel.state === "incoming"),
    mutual,
    friendStreak: streaks.get(uid) ?? 0,
    joined: new Date(p.createdAt).toISOString(),
    stats: canSee
      ? {
          currentStreak: p.currentStreak,
          longestStreak: p.longestStreak,
          totalXp: p.totalXp,
          weeklyXp: weekly.get(uid) ?? 0,
          achievements: ach,
          lastActiveDay: p.lastActiveDay ? String(p.lastActiveDay) : null,
        }
      : null,
    recent: recent.items,
  };
}

export type SearchHit = PublicUser & { relation: Relation; currentStreak: number };

/**
 * Kullanıcı arama: kullanıcı adı öneki ya da görünen ad parçası. Gizli profil
 * yalnız TAM kullanıcı adıyla bulunur — gizlilik "aranınca çıkmam" demektir,
 * "adımı bilen bile bulamasın" değil (o, engelleme). En az iki karakter,
 * dakikada 30 arama.
 */
export async function searchUsers(me: string, qRaw: string): Promise<SearchHit[]> {
  const q = qRaw.trim();
  if (q.length < 2) return [];
  const rl = await limited("search", me);
  if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);
  const uq = usernameQuery(q);
  const blocked = [...(await blockedSet(me)), me];
  const like = `%${q.replace(/[%_\\]/g, (m) => `\\${m}`)}%`;
  const rows = await db
    .select({ userId: profiles.userId, name: profiles.displayName, username: profiles.username, level: profiles.level, currentStreak: profiles.currentStreak })
    .from(profiles)
    .where(
      and(
        notInArray(profiles.userId, blocked),
        or(
          uq ? eq(profiles.username, uq) : sql`false`,
          and(
            ne(profiles.visibility, "private"),
            or(uq ? ilike(profiles.username, `${uq}%`) : sql`false`, ilike(profiles.displayName, like)),
          ),
        ),
      ),
    )
    .orderBy(sql`case when ${profiles.username} = ${uq} then 0 else 1 end`, sql`${profiles.currentStreak} desc`)
    .limit(20);
  // Adı olmayan eski hesaplara burada ad verilir; sonuç satırı adıyla döner.
  const nameless = rows.filter((r) => !r.username).map((r) => r.userId);
  if (nameless.length) {
    await ensureUsernames(nameless);
    const fresh = await db.select({ userId: profiles.userId, username: profiles.username }).from(profiles).where(inArray(profiles.userId, nameless));
    const map = new Map(fresh.map((f) => [f.userId, f.username]));
    for (const r of rows) if (!r.username) r.username = map.get(r.userId) ?? null;
  }
  const rels = await relations(me, rows.map((r) => r.userId));
  return rows.map((r) => ({ userId: r.userId, name: r.name, username: r.username, level: r.level, currentStreak: r.currentStreak, relation: rels.get(r.userId) ?? "none" }));
}

/** Davet bağlantısıyla gelen `?u=<username>` — profil sayfasına yönlendirmek için. */
export async function userIdByUsername(usernameRaw: string): Promise<string | null> {
  const username = normalizeUsername(usernameRaw);
  if (!username) return null;
  const [p] = await db.select({ userId: profiles.userId }).from(profiles).where(eq(profiles.username, username)).limit(1);
  return p?.userId ?? null;
}
