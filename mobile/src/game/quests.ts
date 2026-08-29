import { api } from "../api/client";
import { todayStr } from "./session";

/** Günün görevleri — web /api/quests ile aynı (DEPLOY'LU). Günlük hedefler +
    ilerleme; tamamlananlar XP kazandırır. */
export type Quest = { id: string; label: string; href: string; target: number; done: number; xp: number; claimed: boolean };
export type QuestBoard = { quests: Quest[]; allDone: boolean; allClaimed: boolean };

export function fetchQuests(day = todayStr()): Promise<QuestBoard> {
  return api<QuestBoard>(`/api/quests?day=${day}`);
}
