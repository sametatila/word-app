/** Haftalık sıralama — /api/leaderboard cevabının biçimi (web ile aynı). */
export type LeaderboardRow = {
  rank: number;
  userId: string;
  name: string | null;
  xp: number;
  streak: number;
  isMe: boolean;
};
export type LeaderboardWeek = {
  rows: LeaderboardRow[];
  start: string;
  daysLeft: number;
};
