import { api, ApiError } from "./client";

/**
 * Sosyal API istemcisi — web'deki lib/social/client.ts'in aynası. Tipler
 * sunucunun döndüğüyle birebir; metin yardımcıları (akış cümlesi, bildirim
 * cümlesi, hata metni) da burada ki iki platform aynı Türkçeyi konuşsun.
 */
export const REACTION_KINDS = ["cheer", "fire", "heart", "strong", "star", "wow"] as const;
export type ReactionKind = (typeof REACTION_KINDS)[number];
export const REACTION_LABELS: Record<ReactionKind, string> = { cheer: "Alkış", fire: "Ateş", heart: "Kalp", strong: "Güçlü", star: "Yıldız", wow: "Vay" };

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

const ERROR_TEXT: Record<string, string> = {
  unauthorized: "Oturum gerekli.",
  forbidden: "Bu işlem için yetkin yok.",
  self: "Kendinle yapamazsın.",
  not_found: "Kullanıcı bulunamadı.",
  requests_closed: "Bu kişi arkadaşlık isteği kabul etmiyor.",
  declined_recent: "İsteğin reddedildi; bir hafta sonra yeniden deneyebilirsin.",
  rate_limited: "Çok hızlı. Biraz sonra tekrar dene.",
  not_friends: "Bunun için önce arkadaş olmalısınız.",
  already_exists: "Bu hafta zaten bir görevin var.",
  username_invalid: "Kullanıcı adı 3-20 karakter; küçük harf, rakam ve alt çizgi.",
  username_taken: "Bu kullanıcı adı alınmış.",
  username_cooldown: "Kullanıcı adı 14 günde bir değişir.",
  week_over: "Bu haftanın süresi doldu.",
  bad_request: "Geçersiz istek.",
  database: "Bir şeyler ters gitti. Tekrar dene.",
};

export function errorText(err: unknown): string {
  if (err instanceof ApiError) return ERROR_TEXT[err.message] ?? "Bağlantı kurulamadı.";
  return "Bağlantı kurulamadı.";
}

export const formatXp = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

export function timeAgo(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 60) return "az önce";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} dk önce`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} sa önce`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d} gün önce`;
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
}

export function feedText(item: FeedItem): string {
  const p = item.payload;
  switch (item.type) {
    case "streak_milestone": return `${Number(p.days ?? 0)} günlük seriye ulaştı`;
    case "achievement": return `"${String(p.title ?? "rozet")}" rozetini açtı`;
    case "friend_joined": return `${String(p.friendName ?? "biri")} ile arkadaş oldu`;
    case "quest_completed": return `${String(p.partnerName ?? "arkadaşı")} ile ${formatXp(Number(p.targetXp ?? 0))} XP'lik ortak görevi tamamladı`;
    case "weekly_top": return `geçen hafta ${Number(p.rank ?? 0)}. oldu (${formatXp(Number(p.xp ?? 0))} XP)`;
    case "friend_streak": return `${String(p.friendName ?? "arkadaşı")} ile ${Number(p.days ?? 0)} günlük ortak seriye ulaştı`;
    default: return "bir kilometre taşına ulaştı";
  }
}

function describeShort(type: string, p: Record<string, unknown>): string {
  switch (type) {
    case "streak_milestone": return `${Number(p.days ?? 0)} günlük serine`;
    case "achievement": return `"${String(p.title ?? "rozet")}" rozetine`;
    case "quest_completed": return "ortak görevine";
    case "weekly_top": return `haftanın ${Number(p.rank ?? 0)}. sırasına`;
    case "friend_joined": return "yeni arkadaşlığına";
    default: return "paylaşımına";
  }
}

export function notificationText(n: NotificationView): string {
  const who = n.actor?.name ?? "Biri";
  const d = n.detail;
  const payload = (d.payload as Record<string, unknown>) ?? {};
  switch (n.type) {
    case "friend_request": return `${who} seni arkadaş olarak eklemek istiyor`;
    case "friend_accepted": return `${who} arkadaşlık isteğini kabul etti`;
    case "reaction": return `${who} ${d.eventType ? describeShort(String(d.eventType), payload) : "paylaşımına"} tepki gönderdi`;
    case "nudge": return d.kind === "cheer" ? `${who} seni alkışladı` : `${who} seni dürttü: bugün bir tur?`;
    case "quest_invite": return `${who} seni ${formatXp(Number(d.targetXp ?? 0))} XP'lik ortak göreve davet etti`;
    case "quest_accepted": return `${who} ortak görevi kabul etti`;
    case "quest_completed": return `${who} ile ortak görevi tamamladınız`;
    case "friend_milestone": return `${who} ${d.eventType ? describeShort(String(d.eventType), payload) : "bir kilometre taşına"} ulaştı`;
    default: return "Yeni bir şey oldu";
  }
}
