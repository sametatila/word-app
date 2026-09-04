"use client";

/**
 * Beceri egzersizlerinin tamamlanma durumu — sunucu asıl, cihaz önbellek (WP-01).
 *
 * Eskiden yalnız localStorage'daydı: cihaz değişince kayboluyor, analitikte
 * görünmüyordu. Şimdi gerçek kayıt `user_skills` tablosunda; buradaki kopya
 * iki iş görüyor: ekran açılır açılmaz (ağ beklemeden) bir şey gösterebilmek
 * ve çevrimdışı bitirilen egzersizi "bitti" diye hatırlamak.
 *
 * Birleştirme kuralı basit: egzersiz başına en iyi doğru sayısı kazanır.
 * Sunucu ile cihaz çelişirse yüksek olan alınır; "silme" diye bir işlem yok.
 *
 * Tek seferlik taşıma: ilk senkronda cihazdaki eski kayıtlar sunucuya
 * PUT edilir (XP verilmez, bkz. lib/skills/record.ts) ve bayrak yazılır.
 */

const KEY = "lernomi-skills-v1";
const MIGRATED_KEY = "lernomi-skills-migrated";

export type SkillRecord = {
  /** Doğru madde sayısı (en iyi deneme). */
  correct: number;
  /** Toplam madde sayısı. */
  total: number;
  /** ISO tarih — son tamamlama. */
  at: string;
  /** Son denemenin puanı 0–100 (sunucudan; yerel kayıtta yoksa doğru/toplam). */
  score?: number;
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

function writeSkillProgress(all: SkillProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent("lernomi:skills", { detail: all }));
  } catch {
    /* depolama kapalıysa sessizce geç */
  }
}

/** Sunucu ya da başka bir kaynaktan gelen kayıtları önbellekle birleştirir. */
export function mergeSkillProgress(incoming: SkillProgress): SkillProgress {
  const all = readSkillProgress();
  for (const [id, rec] of Object.entries(incoming)) {
    const cur = all[id];
    if (!cur || rec.correct > cur.correct || (rec.correct === cur.correct && rec.at > cur.at)) {
      all[id] = { ...cur, ...rec };
    }
  }
  writeSkillProgress(all);
  return all;
}

export function recordSkillResult(id: string, correct: number, total: number, score?: number) {
  if (typeof window === "undefined") return;
  const all = readSkillProgress();
  const prev = all[id];
  all[id] = {
    correct: Math.max(prev?.correct ?? 0, correct),
    total,
    at: new Date().toISOString(),
    score: score ?? (total > 0 ? Math.round((100 * correct) / total) : 0),
  };
  writeSkillProgress(all);
}

type ServerStatus = Record<
  string,
  { correct: number; total: number; lastScore: number | null; lastAt: string }
>;

function fromServer(progress: ServerStatus): SkillProgress {
  const out: SkillProgress = {};
  for (const [id, s] of Object.entries(progress)) {
    out[id] = { correct: s.correct, total: s.total, at: s.lastAt, score: s.lastScore ?? undefined };
  }
  return out;
}

let syncing: Promise<SkillProgress> | null = null;

/**
 * Sunucudan okur, önbellekle birleştirir, `nomi:skills` olayını atar.
 * Aynı anda iki çağrı tek istek yapar. Ağ yoksa önbellek döner — hata yok.
 */
export function syncSkillProgress(): Promise<SkillProgress> {
  if (typeof window === "undefined") return Promise.resolve({});
  if (syncing) return syncing;
  syncing = (async () => {
    try {
      const local = readSkillProgress();
      let migrated = false;
      try {
        migrated = localStorage.getItem(MIGRATED_KEY) === "1";
      } catch {
        migrated = true; // depolama yoksa taşınacak bir şey de yok
      }
      const localIds = Object.keys(local);

      if (!migrated && localIds.length) {
        const res = await fetch("/api/skills", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            records: localIds.map((id) => ({ id, ...local[id] })),
          }),
        });
        if (res.ok) {
          const data = (await res.json()) as { progress: ServerStatus };
          try {
            localStorage.setItem(MIGRATED_KEY, "1");
          } catch {
            /* bayrak yazılamazsa bir sonraki açılışta yeniden denenir; PUT idempotent */
          }
          return mergeSkillProgress(fromServer(data.progress));
        }
        if (res.status === 401) return local;
      }

      const res = await fetch("/api/skills");
      if (!res.ok) return local;
      const data = (await res.json()) as { progress: ServerStatus };
      if (!migrated) {
        try {
          localStorage.setItem(MIGRATED_KEY, "1");
        } catch {
          /* yukarıdaki gibi */
        }
      }
      return mergeSkillProgress(fromServer(data.progress));
    } catch {
      return readSkillProgress();
    } finally {
      syncing = null;
    }
  })();
  return syncing;
}
