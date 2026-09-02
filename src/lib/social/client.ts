import type { FeedItem, FriendRow, PublicUser, QuestView, ReactionKind, ReactionSummary, Relation } from "./types";

/**
 * Tarayıcı tarafı sosyal API istemcisi. Hata gövdesi `{ error: kod }`;
 * `SocialClientError.code` ile Türkçe metin seçilir (bkz. errorText).
 */
export class SocialClientError extends Error {
  constructor(
    public readonly code: string,
    public readonly status: number,
    public readonly retryAfterSec: number | null,
  ) {
    super(code);
  }
}

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: "same-origin",
    cache: "no-store",
    ...init,
    headers: { "content-type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    let code = "failed";
    try {
      code = ((await res.json()) as { error?: string }).error ?? code;
    } catch {
      /* gövde yok */
    }
    const ra = res.headers.get("retry-after");
    throw new SocialClientError(code, res.status, ra ? Number(ra) : null);
  }
  return (await res.json()) as T;
}

const json = (body: unknown) => JSON.stringify(body);

export const ERROR_TEXT: Record<string, string> = {
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
  failed: "Bağlantı kurulamadı.",
};

export function errorText(err: unknown): string {
  if (err instanceof SocialClientError) return ERROR_TEXT[err.code] ?? ERROR_TEXT.failed;
  return ERROR_TEXT.failed;
}

export type SocialMeView = {
  userId: string;
  name: string | null;
  username: string;
  bio: string | null;
  level: string;
  visibility: "public" | "friends" | "private";
  allowRequests: boolean;
  showInSuggestions: boolean;
  showActivity: boolean;
  usernameChangedAt: string | null;
  usernameChangeAvailableIn: number;
  counts: { friends: number; incoming: number; outgoing: number; unread: number };
};

export type PendingView = { friendshipId: number; user: PublicUser; createdAt: string };
export type FriendsView = { friends: FriendRow[]; incoming: PendingView[]; outgoing: PendingView[]; nudgedToday: string[]; today: string };
export type SearchHitView = PublicUser & { relation: Relation; currentStreak: number };
export type SuggestionView = PublicUser & { mutual: number; reason: "mutual" | "level" | "active"; currentStreak: number };
export type BoardView = {
  rows: { rank: number; userId: string; name: string | null; username: string | null; level: string; xp: number; streak: number; isMe: boolean }[];
  start: string;
  daysLeft: number;
};
export type NotificationView = {
  id: number;
  type: string;
  read: boolean;
  createdAt: string;
  actor: PublicUser | null;
  ref: { type: string; id: number } | null;
  detail: Record<string, unknown>;
};
export type PublicProfileView = {
  user: PublicUser;
  bio: string | null;
  visibility: "public" | "friends" | "private";
  relation: Relation;
  friendshipId: number | null;
  canRequest: boolean;
  mutual: number;
  friendStreak: number;
  joined: string;
  stats: { currentStreak: number; longestStreak: number; totalXp: number; weeklyXp: number; achievements: number; lastActiveDay: string | null } | null;
  recent: FeedItem[];
};

export const social = {
  me: () => call<SocialMeView>("/api/social/me"),
  updateMe: (patch: Record<string, unknown>) => call<SocialMeView>("/api/social/me", { method: "PATCH", body: json(patch) }),
  friends: () => call<FriendsView>("/api/social/friends"),
  request: (userId: string) => call<{ state: Relation; friendshipId: number }>("/api/social/friends", { method: "POST", body: json({ userId }) }),
  remove: (userId: string) => call<{ ok: true }>("/api/social/friends", { method: "DELETE", body: json({ userId }) }),
  respond: (id: number, action: "accept" | "decline") =>
    call<{ ok: true; state: Relation }>("/api/social/friends/respond", { method: "POST", body: json({ id, action }) }),
  suggestions: () => call<{ suggestions: SuggestionView[] }>("/api/social/friends/suggestions"),
  search: (q: string) => call<{ q: string; hits: SearchHitView[] }>(`/api/social/users/search?q=${encodeURIComponent(q)}`),
  profile: (username: string) => call<PublicProfileView>(`/api/social/users/${encodeURIComponent(username)}`),
  feed: (cursor?: string | null) => call<{ items: FeedItem[]; nextCursor: string | null }>(`/api/social/feed${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ""}`),
  react: (eventId: number, kind: ReactionKind) => call<ReactionSummary>("/api/social/reactions", { method: "POST", body: json({ eventId, kind }) }),
  unreact: (eventId: number) => call<ReactionSummary>("/api/social/reactions", { method: "DELETE", body: json({ eventId }) }),
  nudge: (userId: string, kind: "remind" | "cheer") => call<{ id: number; remainingToday: number }>("/api/social/nudges", { method: "POST", body: json({ userId, kind }) }),
  quests: () => call<{ quests: QuestView[]; today: string }>("/api/social/quests"),
  inviteQuest: (userId: string) => call<QuestView>("/api/social/quests", { method: "POST", body: json({ userId }) }),
  questAction: (id: number, action: "accept" | "decline" | "cancel") => call<{ ok: true }>(`/api/social/quests/${id}`, { method: "POST", body: json({ action }) }),
  board: () => call<BoardView>("/api/social/leaderboard"),
  notifications: (cursor?: number | null) =>
    call<{ items: NotificationView[]; nextCursor: number | null; unread: number }>(`/api/social/notifications${cursor ? `?cursor=${cursor}` : ""}`),
  markRead: (ids: number[] | "all") =>
    call<{ ok: true; unread: number }>("/api/social/notifications", { method: "POST", body: json(ids === "all" ? { all: true } : { ids }) }),
  blocks: () => call<{ blocked: (PublicUser & { since: string })[] }>("/api/social/blocks"),
  block: (userId: string) => call<{ ok: true }>("/api/social/blocks", { method: "POST", body: json({ userId }) }),
  unblock: (userId: string) => call<{ ok: true }>("/api/social/blocks", { method: "DELETE", body: json({ userId }) }),
  report: (userId: string, reason: string, detail?: string) => call<{ ok: true }>("/api/social/reports", { method: "POST", body: json({ userId, reason, detail }) }),
};

/** "3 dk önce" — akış ve gelen kutusu için. */
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

/** Akış olayının Türkçe cümlesi — sunucudaki describeEvent ile aynı anlam, burada özne dahil. */
export function feedText(item: FeedItem): string {
  const p = item.payload;
  switch (item.type) {
    case "streak_milestone":
      return `${Number(p.days ?? 0)} günlük seriye ulaştı`;
    case "achievement":
      return `"${String(p.title ?? "rozet")}" rozetini açtı`;
    case "friend_joined":
      return `${String(p.friendName ?? "biri")} ile arkadaş oldu`;
    case "quest_completed":
      return `${String(p.partnerName ?? "arkadaşı")} ile ${Number(p.targetXp ?? 0)} XP'lik ortak görevi tamamladı`;
    case "weekly_top":
      return `geçen hafta ${Number(p.rank ?? 0)}. oldu (${Number(p.xp ?? 0).toLocaleString("tr-TR")} XP)`;
    case "friend_streak":
      return `${String(p.friendName ?? "arkadaşı")} ile ${Number(p.days ?? 0)} günlük ortak seriye ulaştı`;
    default:
      return "bir kilometre taşına ulaştı";
  }
}

/** Gelen kutusu satırının Türkçe cümlesi. */
export function notificationText(n: NotificationView): string {
  const who = n.actor?.name ?? "Biri";
  const d = n.detail;
  switch (n.type) {
    case "friend_request":
      return `${who} seni arkadaş olarak eklemek istiyor`;
    case "friend_accepted":
      return `${who} arkadaşlık isteğini kabul etti`;
    case "reaction": {
      const ev = d.eventType ? describeShort(String(d.eventType), (d.payload as Record<string, unknown>) ?? {}) : "paylaşımına";
      return `${who} ${ev} tepki gönderdi`;
    }
    case "nudge":
      return d.kind === "cheer" ? `${who} seni alkışladı` : `${who} seni dürttü: bugün bir tur?`;
    case "quest_invite":
      return `${who} seni ${Number(d.targetXp ?? 0)} XP'lik ortak göreve davet etti`;
    case "quest_accepted":
      return `${who} ortak görevi kabul etti`;
    case "quest_completed":
      return `${who} ile ortak görevi tamamladınız`;
    case "friend_milestone":
      return `${who} ${d.eventType ? describeShort(String(d.eventType), (d.payload as Record<string, unknown>) ?? {}) : "bir kilometre taşına"} ulaştı`;
    default:
      return "Yeni bir şey oldu";
  }
}

function describeShort(type: string, p: Record<string, unknown>): string {
  switch (type) {
    case "streak_milestone":
      return `${Number(p.days ?? 0)} günlük serine`;
    case "achievement":
      return `"${String(p.title ?? "rozet")}" rozetine`;
    case "quest_completed":
      return "ortak görevine";
    case "weekly_top":
      return `haftanın ${Number(p.rank ?? 0)}. sırasına`;
    case "friend_joined":
      return "yeni arkadaşlığına";
    default:
      return "paylaşımına";
  }
}
