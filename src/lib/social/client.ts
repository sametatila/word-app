import { LEAGUE_TIERS, type FeedItem, type FriendRow, type LeagueOutcome, type PublicUser, type QuestView, type ReactionKind, type ReactionSummary, type Relation } from "./types";
import { USERNAME_CHANGE_COOLDOWN_DAYS } from "@/lib/social/username";
import { translate, localeOf, formatNumber, isNativeLang, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
import { readLangCookie } from "@/lib/i18n/set-lang";

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

/**
 * Hata kodu → SÖZLÜK ANAHTARI. Anahtarlar mobilin sözlüğünden (`social.err_*`):
 * iki taraf aynı cümleyi kullanıyor.
 */
export const ERROR_KEYS: Record<string, string> = {
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
  // Sunucu biyografideki bağlantı/iletişim bilgisi/küfür için bu kodu
  // dönüyordu ama haritada yoktu: kod `failed`e düşüyor ve kullanıcı
  // "Bağlantı kurulamadı" görüyordu. Sebebini bilmeden aynı metni tekrar
  // tekrar kaydetmeye çalışıyordu. Mobil baştan beri doğru cümleyi veriyor.
  bio_invalid: "social.err_bio_invalid",
  week_over: "social.err_week_over",
  bad_request: "social.err_bad_request",
  database: "social.err_database",
  failed: "social.err_offline",
};

/**
 * Hata metni, kullanıcının dilinde.
 *
 * Dil ÇEREZDEN okunuyor: bu modül bir bileşen değil (yirmi sekiz çağrı yeri
 * var ve çoğu olay işleyicisinin içinde), kancadan okuyamaz. Çerez profilin
 * aynası — `lib/i18n/server` bunu açıklıyor.
 */
export function errorText(err: unknown, lang?: NativeLang): string {
  const code = err instanceof SocialClientError ? err.code : "failed";
  const l = lang ?? (isNativeLang(readLangCookie()) ? (readLangCookie() as NativeLang) : DEFAULT_NATIVE);
  /* Bekleme süresi cümlenin içinde DÜZ SAYI değil: `social.err_username_cooldown`
     `{n}` taşıyor ve sayı kuralın kendi sabitinden geliyor. Öteki anahtarlar
     `{n}` kullanmıyor, fazladan değişken zararsız. */
  return translate(l, ERROR_KEYS[code] ?? ERROR_KEYS.failed, { n: USERNAME_CHANGE_COOLDOWN_DAYS });
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

export type LeagueRowView = {
  rank: number;
  userId: string;
  name: string | null;
  username: string | null;
  level: string;
  xp: number;
  streak: number;
  isMe: boolean;
};

export type LeagueView = {
  weekStart: string;
  tier: number;
  daysLeft: number;
  rows: LeagueRowView[];
  promote: number;
  demote: number;
  result: { weekStart: string; tier: number; nextTier: number; rank: number; xp: number; outcome: LeagueOutcome } | null;
};

/** Lig adının sözlük anahtarı — basamak dizinden, sınır dışı değer en alta düşer. */
export function tierKey(tier: number): string {
  return `league.tier_${LEAGUE_TIERS[Math.max(0, Math.min(LEAGUE_TIERS.length - 1, tier))]}`;
}

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
  league: () => call<LeagueView>("/api/social/league"),
  leagueSeen: () => call<{ ok: true }>("/api/social/league", { method: "POST", body: json({ action: "seen" }) }),
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
export function timeAgo(iso: string, lang: NativeLang, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - Date.parse(iso)) / 1000));
  if (s < 60) return translate(lang, "social.ago_now");
  const m = Math.round(s / 60);
  if (m < 60) return translate(lang, "social.ago_min", { n: m });
  const h = Math.round(m / 60);
  if (h < 24) return translate(lang, "social.ago_hour", { n: h });
  const d = Math.round(h / 24);
  if (d < 7) return translate(lang, "social.ago_day", { n: d });
  return new Date(iso).toLocaleDateString(localeOf(lang), { day: "numeric", month: "short" });
}

/** Akış olayının cümlesi — sunucudaki describeEvent ile aynı anlam, burada özne dahil. */
export function feedText(item: FeedItem, lang: NativeLang): string {
  const p = item.payload;
  const T = (k: string, v?: Record<string, string | number>) => translate(lang, k, v);
  switch (item.type) {
    case "streak_milestone":
      return T("social.feed_streak", { n: Number(p.days ?? 0) });
    case "achievement":
      return T("social.feed_badge", { badge: String(p.title ?? T("social.feed_a_badge")) });
    case "friend_joined":
      return T("social.feed_friend", { name: String(p.friendName ?? T("social.feed_someone")) });
    case "quest_completed":
      return T("social.feed_quest", {
        name: String(p.partnerName ?? T("social.feed_a_friend")),
        /* Binlik ayraçlı: hemen altındaki `weekly_top` da öyle ve mobil her
           ikisini de ayraçla yazıyor. Ham sayı olarak "3000 XP" cümlenin
           içinde iki platformda farklı görünüyordu. */
        xp: formatNumber(Number(p.targetXp ?? 0), lang),
      });
    case "weekly_top":
      return T("social.feed_weekly", {
        rank: Number(p.rank ?? 0),
        xp: formatNumber(Number(p.xp ?? 0), lang),
      });
    case "friend_streak":
      return T("social.feed_costreak", {
        name: String(p.friendName ?? T("social.feed_a_friend")),
        n: Number(p.days ?? 0),
      });
    case "league_up":
      return T("social.feed_league", { league: T(tierKey(Number(p.tier ?? 0))) });
    default:
      return T("social.feed_default");
  }
}

/** Gelen kutusu satırının cümlesi. */
export function notificationText(n: NotificationView, lang: NativeLang): string {
  const T = (k: string, v?: Record<string, string | number>) => translate(lang, k, v);
  const who = n.actor?.name ?? T("social.notif_someone");
  const d = n.detail;
  switch (n.type) {
    case "friend_request":
      return T("social.notif_friend_request", { who });
    case "friend_accepted":
      return T("social.notif_friend_accepted", { who });
    case "reaction": {
      const ev = d.eventType
        ? describeShort(String(d.eventType), (d.payload as Record<string, unknown>) ?? {}, lang)
        : T("social.on_default");
      return T("social.notif_reaction", { who, item: ev });
    }
    case "nudge":
      return d.kind === "cheer" ? T("social.notif_cheer", { who }) : T("social.notif_nudge", { who });
    case "quest_invite":
      /* Ayraçlı — akıştaki aynı sayı gibi (yukarı bkz.) ve mobil ile aynı. */
      return T("social.notif_quest_invite", { who, xp: formatNumber(Number(d.targetXp ?? 0), lang) });
    case "quest_accepted":
      return T("social.notif_quest_accepted", { who });
    case "quest_completed":
      return T("social.notif_quest_done", { who });
    case "league_up":
      return T("social.notif_league_up", { league: T(tierKey(Number((d.payload as Record<string, unknown>)?.tier ?? 0))) });
    case "friend_milestone":
      return T("social.notif_milestone", {
        who,
        event: d.eventType
          ? describeShort(String(d.eventType), (d.payload as Record<string, unknown>) ?? {}, lang)
          : T("social.on_default"),
      });
    default:
      return T("social.notif_default");
  }
}

function describeShort(type: string, p: Record<string, unknown>, lang: NativeLang): string {
  switch (type) {
    case "streak_milestone":
      return translate(lang, "social.on_streak", { n: Number(p.days ?? 0) });
    case "achievement":
      return translate(lang, "social.on_badge", {
        badge: String(p.title ?? translate(lang, "social.feed_a_badge")),
      });
    case "quest_completed":
      return translate(lang, "social.on_quest");
    case "weekly_top":
      return translate(lang, "social.on_weekly", { rank: Number(p.rank ?? 0) });
    case "friend_joined":
      return translate(lang, "social.on_friend");
    case "league_up":
      return translate(lang, "social.on_league");
    default:
      return translate(lang, "social.on_default");
  }
}
