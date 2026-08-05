import type { MissedWord, SessionProgress } from "@/lib/types";

/** Özet ekranı zaten ilk 6 kelimeyi gösteriyor; gerisi sayı olarak anılıyor. */
const MAX_MISSED = 60;

/**
 * İstemciden gelen tur ilerlemesini doğrular.
 *
 * İlerleme kullanıcının kendi verisidir ama yine de dış girdidir: sayılar
 * sınırlanır, "zorlandıkların" listesi kırpılır ve metinler kısaltılır ki
 * kayıtlı tur satırı istemcinin gönderdiği kadar büyüyemesin.
 */
export function parseProgress(value: unknown): SessionProgress | null {
  if (typeof value !== "object" || value === null) return null;
  const p = value as Record<string, unknown>;

  const index = int(p.index, 0, 500);
  const correct = int(p.correct, 0, 5000);
  const total = int(p.total, 0, 5000);
  const xp = int(p.xp, 0, 500000);
  if (index === null || correct === null || total === null || xp === null) return null;

  const missed: MissedWord[] = [];
  if (Array.isArray(p.missed)) {
    for (const raw of p.missed.slice(0, MAX_MISSED)) {
      if (typeof raw !== "object" || raw === null) continue;
      const m = raw as Record<string, unknown>;
      if (typeof m.id !== "number" || !Number.isInteger(m.id)) continue;
      if (typeof m.de !== "string" || typeof m.tr !== "string") continue;
      missed.push({ id: m.id, de: m.de.slice(0, 120), tr: m.tr.slice(0, 200) });
    }
  }

  return { index, correct, total, xp, missed };
}

function int(value: unknown, min: number, max: number): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(max, Math.max(min, Math.round(value)));
}
