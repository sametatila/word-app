import { api } from "../api/client";
import { todayStr } from "./session";

/**
 * GERÇEK seviye testi — web ile aynı sözleşme (/api/placement, DEPLOY EDİLMİŞ).
 * Kelime maddeleri sunucudan (seviye seviye), puanlama da sunucuda. Demo YOK:
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

/**
 * SON ALMA + YENİDEN ALINABİLİR Mİ.
 *
 * `GET /api/placement` bunu baştan beri veriyor ve web soruyor: test 30 günde
 * bir alınabiliyor, arada "N gün sonra" deniyor. MOBİL HİÇ SORMUYORDU - ve
 * sunucu bu bekleme süresini ZORLAMIYOR (yalnız bildiriyor), yani Android'de
 * test istenildiği kadar tekrarlanabiliyor ve her bitiş yeni bir kayıt yazıp
 * seviyeyi değiştirebiliyordu. Sık tekrar seviye tahminini "ezber"e çevirir;
 * kuralın kendisi `RETAKE_DAYS` yorumunda yazılı.
 */
export type PlacementStatus = {
  last: (PlacementRecord & { at: string; accepted: string | null }) | null;
  canRetake: boolean;
  retakeDays: number;
};

export function fetchPlacementStatus(): Promise<PlacementStatus> {
  return api<PlacementStatus>("/api/placement");
}

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

/** Cevapları sunucuya verir; gerçek önerilen seviyeyi (sunucu puanlaması) döndürür. */
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
