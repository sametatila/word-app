import { api } from "../api/client";
import { todayStr } from "./session";

/** Günün görevleri — web /api/quests ile aynı (DEPLOY'LU). Günlük hedefler +
    ilerleme; tamamlananlar XP kazandırır. */
export type Quest = { id: string; label: string; href: string; target: number; done: number; xp: number; claimed: boolean };
export type QuestBoard = { quests: Quest[]; allDone: boolean; allClaimed: boolean };

/**
 * ÖDÜLÜ AL — mobilde bu yol HİÇ YOKTU.
 *
 * `/api/quests` POST ödülü veriyor (`claimQuest`) ve yeni panoyu geri
 * döndürüyor. Mobil yalnız GET yapıyordu: kullanıcı günün görevini
 * tamamlıyor, satır "tamam" görünüyor ama XP HİÇ ALINMIYORDU - tip zaten
 * `claimed` ve `xp` alanlarını taşıyordu, alacak düğme yoktu. Web baştan beri
 * alıyor (`quest-card` `claim`).
 *
 * `questId: "all"` üçü birden bitince açılan toplu ödül; sunucu aynı uçtan
 * veriyor.
 */
export function claimQuest(questId: string, day: string): Promise<QuestBoard & { xp: number }> {
  return api<QuestBoard & { xp: number }>("/api/quests", {
    method: "POST",
    body: JSON.stringify({ questId, day }),
  });
}

export function fetchQuests(day = todayStr()): Promise<QuestBoard> {
  return api<QuestBoard>(`/api/quests?day=${day}`);
}
