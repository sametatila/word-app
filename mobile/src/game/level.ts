import { api } from "../api/client";

/**
 * Seviye ilerlemesi — sunucu sözleşmesi (/api/level, docs/plan/level-progress.md).
 * Hazırlık sabit çekirdekte yeterlikten (kelime + Patika); %60'ta seviye sınavı önerilir,
 * geçilen sınav bir üst seviyeyi açar (geçiş onayla).
 */
export type LevelStatus = {
  level: string;
  next: string | null;
  readiness: { vocab: number; path: number; total: number; ready: boolean };
  advance: string | null;
};

export function fetchLevelStatus(): Promise<LevelStatus> {
  return api<LevelStatus>("/api/level");
}

export function advanceLevel(to: string): Promise<{ ok: boolean; level?: string }> {
  return api<{ ok: boolean; level?: string }>("/api/level", { method: "POST", body: JSON.stringify({ action: "advance", to }) });
}
