import { api } from "../api/client";
import { todayStr } from "./session";

/**
 * GERÇEK seviye testi — web ile aynı sözleşme (/api/placement, DEPLOY EDİLMİŞ).
 * Kelime maddeleri Neon'dan (seviye seviye), puanlama sunucuda. Demo YOK:
 * oturum açık kullanıcı gerçek testi alır, misafir ekranda demo'ya düşer.
 */
export type PlacementVocab = {
  id: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  de: string;
  artikel: string | null;
  options: string[];
  answer: number; // doğru şıkkın index'i
};

type PlacementTest = { vocab: Record<string, PlacementVocab[]> };

export type PlacementAnswer = {
  stage: "vocab";
  level: PlacementVocab["level"];
  itemId: string;
  correct: boolean;
};

export type PlacementRecord = {
  id: number;
  suggested: string;
  score: number;
  perSkill: Record<string, string | null>;
};

const LEVELS: PlacementVocab["level"][] = ["A1", "A2", "B1", "B2"];

/** Testi başlatır ve kelime maddelerini artan seviye sırasında düzleştirir. */
export async function startPlacement(): Promise<PlacementVocab[]> {
  const r = await api<{ test: PlacementTest }>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "start" }),
  });
  const out: PlacementVocab[] = [];
  for (const lvl of LEVELS) for (const it of r.test?.vocab?.[lvl] ?? []) out.push(it);
  return out;
}

/** Cevapları sunucuya verir; gerçek önerilen seviyeyi (Neon puanlaması) döndürür. */
export async function finishPlacement(answers: PlacementAnswer[]): Promise<PlacementRecord> {
  return api<PlacementRecord>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "finish", answers, day: todayStr() }),
  });
}

/** Önerilen seviyeyi kabul eder — profili günceller (sunucu tarafı). */
export async function acceptPlacement(id: number, level: string): Promise<void> {
  await api("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "accept", id, level }),
  });
}
