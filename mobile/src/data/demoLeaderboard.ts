/**
 * Demo haftalık sıralama (API'siz / misafir). Gerçek tablo authed'de
 * /api/leaderboard'tan gelir (aynı şekil: LeaderboardWeek).
 */
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

export const DEMO_LEADERBOARD: LeaderboardWeek = {
  start: "2026-08-24",
  daysLeft: 4,
  rows: [
    { rank: 1, userId: "u1", name: "Elif", xp: 2340, streak: 21, isMe: false },
    { rank: 2, userId: "u2", name: "Can", xp: 1980, streak: 14, isMe: false },
    { rank: 3, userId: "u3", name: "Zeynep", xp: 1720, streak: 9, isMe: false },
    { rank: 4, userId: "me", name: "Misafir", xp: 1240, streak: 7, isMe: true },
    { rank: 5, userId: "u5", name: "Mert", xp: 1100, streak: 5, isMe: false },
    { rank: 6, userId: "u6", name: "Aslı", xp: 940, streak: 12, isMe: false },
    { rank: 7, userId: "u7", name: "Deniz", xp: 720, streak: 3, isMe: false },
    { rank: 8, userId: "u8", name: "Burak", xp: 610, streak: 6, isMe: false },
    { rank: 9, userId: "u9", name: "Selin", xp: 480, streak: 2, isMe: false },
    { rank: 10, userId: "u10", name: "Kaan", xp: 350, streak: 4, isMe: false },
  ],
};
