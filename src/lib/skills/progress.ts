"use client";

/**
 * Beceri egzersizlerinin tamamlanma durumu cihazda tutulur (localStorage):
 * çevrimdışı çalışır, veritabanı şemasına dokunmaz. XP ve seri sunucuda
 * /api/skills ile işlenir; burada yalnızca "hangi egzersiz bitti" bilgisi var.
 */

const KEY = "wortspiel-skills-v1";

export type SkillRecord = {
  /** Doğru madde sayısı (en iyi deneme). */
  correct: number;
  /** Toplam madde sayısı. */
  total: number;
  /** ISO tarih — son tamamlama. */
  at: string;
};

export type SkillProgress = Record<string, SkillRecord>;

export function readSkillProgress(): SkillProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SkillProgress) : {};
  } catch {
    return {};
  }
}

export function recordSkillResult(id: string, correct: number, total: number) {
  if (typeof window === "undefined") return;
  try {
    const all = readSkillProgress();
    const prev = all[id];
    all[id] = {
      correct: Math.max(prev?.correct ?? 0, correct),
      total,
      at: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("wortspiel:skills", { detail: all }));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}
