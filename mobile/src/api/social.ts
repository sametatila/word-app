import { api, ApiError } from "./client";
import { t, dateLocale } from "../lib/i18n";

/**
 * Sosyal API istemcisi — web'deki lib/social/client.ts'in aynası. Tipler
 * sunucunun döndüğüyle birebir; metin yardımcıları (akış cümlesi, bildirim
 * cümlesi, hata metni) da burada ki iki platform aynı Türkçeyi konuşsun.
 */
export const REACTION_KINDS = ["cheer", "fire", "heart", "strong", "star", "wow"] as const;
export type ReactionKind = (typeof REACTION_KINDS)[number];
/** Tepki adı (erişilebilirlik etiketi). Sabit nesne DEĞİL: t() dil yüklenmeden çağrılamaz. */
export function reactionLabel(kind: ReactionKind): string {
  return t(`social.reaction_${kind}`);
}

export type Relation = "self" | "none" | "friends" | "outgoing" | "incoming" | "declined" | "blocked";
export type Visibility = "public" | "friends" | "private";
export type PublicUser = { userId: string; name: string | null; username: string | null; level: string };
export type FriendRow = PublicUser & { friendshipId: number; currentStreak: number; weeklyXp: number; lastActiveDay: string | null; friendStreak: number; since: string };
export type ReactionSummary = { counts: Partial<Record<ReactionKind, number>>; total: number; mine: ReactionKind | null; names: string[] };
export type FeedItem = { id: number; type: string; payload: Record<string, unknown>; createdAt: string; user: PublicUser; reactions: ReactionSummary; isMine: boolean };
export type QuestView = {
  id: number; status: "invited" | "active" | "completed" | "failed" | "cancelled"; weekStart: string; targetXp: number; partner: PublicUser;
  invitedByMe: boolean; myXp: number; partnerXp: number; totalXp: number; pct: number; daysLeft: number; completedAt: string | null;
};
export type SocialMe = {
  userId: string; name: string | null; username: string; bio: string | null; level: string; visibility: Visibility;
  allowRequests: boolean; showInSuggestions: boolean; showActivity: boolean; usernameChangedAt: string | null; usernameChangeAvailableIn: number;
  counts: { friends: number; incoming: number; outgoing: number; unread: number };
};
export type PendingView = { friendshipId: number; user: PublicUser; createdAt: string };
export type FriendsView = { friends: FriendRow[]; incoming: PendingView[]; outgoing: PendingView[]; nudgedToday: string[]; today: string };
export type SearchHit = PublicUser & { relation: Relation; currentStreak: number };
export type Suggestion = PublicUser & { mutual: number; reason: "mutual" | "level" | "active"; currentStreak: number };
export type BoardRow = { rank: number; userId: string; name: string | null; username: string | null; level: string; xp: number; streak: number; isMe: boolean };
export type BoardView = { rows: BoardRow[]; start: string; daysLeft: number };
export type NotificationView = { id: number; type: string; read: boolean; createdAt: string; actor: PublicUser | null; ref: { type: string; id: number } | null; detail: Record<string, unknown> };
export type PublicProfileView = {
  user: PublicUser; bio: string | null; visibility: Visibility; relation: Relation; friendshipId: number | null; canRequest: boolean; mutual: number;
  friendStreak: number; joined: string;
  stats: { currentStreak: number; longestStreak: number; totalXp: number; weeklyXp: number; achievements: number; lastActiveDay: string | null } | null;
  recent: FeedItem[];
};

const j = (b: unknown) => JSON.stringify(b);

export const social = {
  me: () => api<SocialMe>("/api/social/me"),
  updateMe: (patch: Record<string, unknown>) => api<SocialMe>("/api/social/me", { method: "PATCH", body: j(patch) }),
  friends: () => api<FriendsView>("/api/social/friends"),
  request: (userId: string) => api<{ state: Relation; friendshipId: number }>("/api/social/friends", { method: "POST", body: j({ userId }) }),
  remove: (userId: string) => api<{ ok: true }>("/api/social/friends", { method: "DELETE", body: j({ userId }) }),
  respond: (id: number, action: "accept" | "decline") => api<{ ok: true; state: Relation }>("/api/social/friends/respond", { method: "POST", body: j({ id, action }) }),
  suggestions: () => api<{ suggestions: Suggestion[] }>("/api/social/friends/suggestions"),
  search: (q: string) => api<{ q: string; hits: SearchHit[] }>(`/api/social/users/search?q=${encodeURIComponent(q)}`),
  profile: (username: string) => api<PublicProfileView>(`/api/social/users/${encodeURIComponent(username)}`),
  feed: (cursor?: string | null) => api<{ items: FeedItem[]; nextCursor: string | null }>(`/api/social/feed${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`),
  react: (eventId: number, kind: ReactionKind) => api<ReactionSummary>("/api/social/reactions", { method: "POST", body: j({ eventId, kind }) }),
  unreact: (eventId: number) => api<ReactionSummary>("/api/social/reactions", { method: "DELETE", body: j({ eventId }) }),
  nudge: (userId: string, kind: "remind" | "cheer") => api<{ id: number; remainingToday: number }>("/api/social/nudges", { method: "POST", body: j({ userId, kind }) }),
  quests: () => api<{ quests: QuestView[]; today: string }>("/api/social/quests"),
  inviteQuest: (userId: string) => api<QuestView>("/api/social/quests", { method: "POST", body: j({ userId }) }),
  questAction: (id: number, action: "accept" | "decline" | "cancel") => api<{ ok: true }>(`/api/social/quests/${id}`, { method: "POST", body: j({ action }) }),
  board: () => api<BoardView>("/api/social/leaderboard"),
  notifications: (cursor?: number | null) => api<{ items: NotificationView[]; nextCursor: number | null; unread: number }>(`/api/social/notifications${cursor ? `?cursor=${cursor}` : ""}`),
  markRead: (ids: number[] | "all") => api<{ ok: true; unread: number }>("/api/social/notifications", { method: "POST", body: j(ids === "all" ? { all: true } : { ids }) }),
  blocks: () => api<{ blocked: (PublicUser & { since: string })[] }>("/api/social/blocks"),
  block: (userId: string) => api<{ ok: true }>("/api/social/blocks", { method: "POST", body: j({ userId }) }),
  unblock: (userId: string) => api<{ ok: true }>("/api/social/blocks", { method: "DELETE", body: j({ userId }) }),
  report: (userId: string, reason: string, detail?: string) => api<{ ok: true }>("/api/social/reports", { method: "POST", body: j({ userId, reason, detail }) }),
};

/** Sunucu hata kodu -> sözlük anahtarı. Kod bilinmiyorsa bağlantı hatası varsayılır. */
const ERROR_KEY: Record<string, string> = {
  unauthorized: "social.err_unauthorized",
  forbidden: "social.err_forbidden",
  self: "social.err_self",
  not_found: "social.err_not_found",
  requests_closed: "social.err_requests_closed",
  declined_recent: "social.err_declined_recent",
  rate_limited: "social.err_rate_limited",
  not_friends: "social.err_not_friends",
  already_exists: "social.err_already_exists",
  username_invalid: "social.err_username_invalid",
  username_taken: "social.err_username_taken",
  username_cooldown: "social.err_username_cooldown",
  bio_invalid: "social.err_bio_invalid",
  week_over: "social.err_week_over",
  bad_request: "social.err_bad_request",
  database: "social.err_database",
};

export function errorText(err: unknown): string {
  const key = err instanceof ApiError ? ERROR_KEY[err.message] : undefined;
  return t(key ?? "social.err_offline");
}

export const formatXp = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function timeAgo(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 60) return t("social.ago_now");
  const m = Math.round(s / 60);
  if (m < 60) return t("social.ago_min", { n: m });
  const h = Math.round(m / 60);
  if (h < 24) return t("social.ago_hour", { n: h });
  const d = Math.round(h / 24);
  if (d < 7) return t("social.ago_day", { n: d });
  return new Date(iso).toLocaleDateString(dateLocale(), { day: "numeric", month: "short" });
}

/**
 * Akış cümlesi — 3. şahıs, özneden SONRA gelen kısım ("... 7 günlük seriye ulaştı").
 * Bildirim tarafı da bunu kullanıyor: arkadaşın kilometre taşı bildirimi eskiden
 * 2. şahıs parçayı ("serine") yeniden kullanıyordu, yani "Ali senin serine ulaştı"
 * gibi okunuyordu. Artık ikisi ayrı: burası 3. şahıs, `reactionTarget` 2. şahıs.
 */
function feedPhrase(type: string, p: Record<string, unknown>): string {
  switch (type) {
    case "streak_milestone": return t("social.feed_streak", { n: Number(p.days ?? 0) });
    case "achievement": return t("social.feed_badge", { badge: String(p.title ?? t("social.feed_a_badge")) });
    case "friend_joined": return t("social.feed_friend", { name: String(p.friendName ?? t("social.feed_someone")) });
    case "quest_completed": return t("social.feed_quest", { name: String(p.partnerName ?? t("social.feed_a_friend")), xp: formatXp(Number(p.targetXp ?? 0)) });
    case "weekly_top": return t("social.feed_weekly", { rank: Number(p.rank ?? 0), xp: formatXp(Number(p.xp ?? 0)) });
    case "friend_streak": return t("social.feed_costreak", { name: String(p.friendName ?? t("social.feed_a_friend")), n: Number(p.days ?? 0) });
    default: return t("social.feed_default");
  }
}

export function feedText(item: FeedItem): string {
  return feedPhrase(item.type, item.payload);
}

/** Tepkinin NEYE verildiği — 2. şahıs ("senin ... "), cümleye yer tutucu olarak girer. */
function reactionTarget(type: string, p: Record<string, unknown>): string {
  switch (type) {
    case "streak_milestone": return t("social.on_streak", { n: Number(p.days ?? 0) });
    case "achievement": return t("social.on_badge", { badge: String(p.title ?? t("social.feed_a_badge")) });
    case "quest_completed": return t("social.on_quest");
    case "weekly_top": return t("social.on_weekly", { rank: Number(p.rank ?? 0) });
    case "friend_joined": return t("social.on_friend");
    default: return t("social.on_default");
  }
}

export function notificationText(n: NotificationView): string {
  const who = n.actor?.name ?? t("social.notif_someone");
  const d = n.detail;
  const payload = (d.payload as Record<string, unknown>) ?? {};
  switch (n.type) {
    case "friend_request": return t("social.notif_friend_request", { who });
    case "friend_accepted": return t("social.notif_friend_accepted", { who });
    case "reaction": return t("social.notif_reaction", { who, item: reactionTarget(String(d.eventType ?? ""), payload) });
    case "nudge": return d.kind === "cheer" ? t("social.notif_cheer", { who }) : t("social.notif_nudge", { who });
    case "quest_invite": return t("social.notif_quest_invite", { who, xp: formatXp(Number(d.targetXp ?? 0)) });
    case "quest_accepted": return t("social.notif_quest_accepted", { who });
    case "quest_completed": return t("social.notif_quest_done", { who });
    case "friend_milestone": return t("social.notif_milestone", { who, event: feedPhrase(String(d.eventType ?? ""), payload) });
    default: return t("social.notif_default");
  }
}
