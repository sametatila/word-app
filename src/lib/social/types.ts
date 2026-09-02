/**
 * Sosyal katmanın kapalı sözlükleri. Her liste `as const`: API'ye gelen değer
 * bu listelerde yoksa 400 döner; serbest metin yalnız `bio` ve şikayet detayı.
 * Tepkiler emoji DEĞİL adlandırılmış türdür; ikonu istemci çizer (SVG).
 */
export const REACTION_KINDS = ["cheer", "fire", "heart", "strong", "star", "wow"] as const;
export type ReactionKind = (typeof REACTION_KINDS)[number];
export const REACTION_LABELS: Record<ReactionKind, string> = {
  cheer: "Alkış",
  fire: "Ateş",
  heart: "Kalp",
  strong: "Güçlü",
  star: "Yıldız",
  wow: "Vay",
};

export const ACTIVITY_TYPES = [
  "streak_milestone",
  "achievement",
  "friend_joined",
  "quest_completed",
  "weekly_top",
  "friend_streak",
] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const VISIBILITIES = ["public", "friends", "private"] as const;
export type Visibility = (typeof VISIBILITIES)[number];

export const NUDGE_KINDS = ["remind", "cheer"] as const;
export type NudgeKind = (typeof NUDGE_KINDS)[number];

export const NOTIFICATION_TYPES = [
  "friend_request",
  "friend_accepted",
  "reaction",
  "nudge",
  "quest_invite",
  "quest_accepted",
  "quest_completed",
  "friend_milestone",
] as const;
export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export const REPORT_REASONS = ["spam", "abuse", "impersonation", "other"] as const;
export type ReportReason = (typeof REPORT_REASONS)[number];

/** Seride kutlanan eşikler — akışa yalnız bunlar düşer, her gün değil. */
export const STREAK_MILESTONES = [3, 7, 14, 30, 50, 100, 200, 365, 500, 1000] as const;

/** Arkadaş serisinde kutlanan eşikler. */
export const FRIEND_STREAK_MILESTONES = [7, 30, 100] as const;

/** İki kullanıcı arasındaki durum — istemci düğmeyi buna göre çizer. */
export type Relation =
  | "self"
  | "none"
  | "friends"
  | "outgoing" // ben istedim, cevap bekliyor
  | "incoming" // o istedi, ben cevaplayacağım
  | "declined" // reddedildi ve yeniden isteme süresi dolmadı
  | "blocked"; // ben engelledim (engellendiğimi asla görmem)

/** Listelerde görünen asgari kimlik: aynı avatar her yerde aynı userId'den türer. */
export type PublicUser = {
  userId: string;
  name: string | null;
  username: string | null;
  level: string;
};

export type FriendRow = PublicUser & {
  friendshipId: number;
  currentStreak: number;
  weeklyXp: number;
  lastActiveDay: string | null;
  /** İkisinin de çalıştığı ardışık gün sayısı (bugün ya da dün biten). */
  friendStreak: number;
  since: string;
};

export type ReactionSummary = {
  counts: Partial<Record<ReactionKind, number>>;
  total: number;
  mine: ReactionKind | null;
  /** Son tepki verenlerden en çok üç ad — "Ali, Ayşe ve 2 kişi". */
  names: string[];
};

export type FeedItem = {
  id: number;
  type: ActivityType;
  payload: Record<string, unknown>;
  createdAt: string;
  user: PublicUser;
  reactions: ReactionSummary;
  isMine: boolean;
};

export type QuestView = {
  id: number;
  status: "invited" | "active" | "completed" | "failed" | "cancelled";
  weekStart: string;
  targetXp: number;
  partner: PublicUser;
  invitedByMe: boolean;
  myXp: number;
  partnerXp: number;
  totalXp: number;
  pct: number;
  daysLeft: number;
  completedAt: string | null;
};
