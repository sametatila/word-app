/**
 * Biten Patika adımlarının cihaz kaydı — /api/immersion canlı olmadan
 * ilerleme. Ders id'leri ve beceri egzersizi id'leri aynı kümede (hepsi item
 * ref'i). Sunucuya da yazılır (/api/lesson, /api/skills); bu yerel set yalnız
 * gerçek track gelene kadar Patika'ya hangi adımın bittiğini söyler.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/client";

const KEY = "lernomi-items-done";
let cache: Set<string> | null = null;

export async function getDoneItems(): Promise<Set<string>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set<string>();
  }
  return cache;
}

export async function markItemDone(id: string): Promise<void> {
  const s = await getDoneItems();
  if (s.has(id)) return;
  s.add(id);
  try { await AsyncStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* yut */ }
}

export function isItemDoneSync(id: string): boolean {
  return cache?.has(id) ?? false;
}

/** Egzersiz başına son puan — sunucudan gelen durum, yerelde önbellekli. */
const SCORE_KEY = "lernomi-item-scores";
let scoreCache: Record<string, number> | null = null;

export async function getItemScores(): Promise<Record<string, number>> {
  if (scoreCache) return scoreCache;
  try {
    const raw = await AsyncStorage.getItem(SCORE_KEY);
    scoreCache = raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    scoreCache = {};
  }
  return scoreCache;
}

/**
 * SUNUCUDAKİ DURUMU YERELE KATAR.
 *
 * Yerel küme yalnız BU cihazda bitirilenleri biliyordu: webde ya da başka bir
 * telefonda çalışılan egzersizler Android'de hiç bitmemiş görünüyordu ve
 * "sıradaki" önerisi baştan başlıyordu. Sunucu durumu (`GET /api/skills`)
 * aylardır duruyor ve mobilde onu okuyan hiçbir şey yoktu (web
 * `syncSkillProgress` ile okuyor).
 *
 * Birleştirme TEK YÖNLÜ değil: sunucudan gelenler yerele ekleniyor, yerelde
 * olup sunucuda olmayanlar (çevrimdışı bitirilmiş) korunuyor.
 */
export async function syncItemProgress(level?: string): Promise<void> {
  try {
    const r = await api<{ progress?: Record<string, { correct: number; total: number; lastScore: number | null; lastAt: string }> }>(
      `/api/skills${level ? `?level=${encodeURIComponent(level)}` : ""}`,
    );
    const progress = r?.progress;
    if (!progress) return;
    const s = await getDoneItems();
    const scores = await getItemScores();
    let degisti = false;
    for (const [id, v] of Object.entries(progress)) {
      if (!s.has(id)) { s.add(id); degisti = true; }
      const puan = v.lastScore ?? (v.total > 0 ? Math.round((100 * v.correct) / v.total) : null);
      if (puan !== null && scores[id] !== puan) { scores[id] = puan; degisti = true; }
    }
    if (!degisti) return;
    scoreCache = scores;
    try { await AsyncStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* yut */ }
    try { await AsyncStorage.setItem(SCORE_KEY, JSON.stringify(scores)); } catch { /* yut */ }
  } catch { /* çevrimdışı: yerel küme yeterli */ }
}

/** Egzersiz bitince puanı da yerele yazılır (web `recordSkillResult` karşılığı). */
export async function recordItemScore(id: string, score: number): Promise<void> {
  const scores = await getItemScores();
  if (scores[id] === score) return;
  scores[id] = score;
  scoreCache = scores;
  try { await AsyncStorage.setItem(SCORE_KEY, JSON.stringify(scores)); } catch { /* yut */ }
}

/**
 * Yarım kalan dersin cihazda saklanması (web lesson-player RESUME_KEY karşılığı).
 * Anlatım uzun; ortasında çıkan öğrenci baştan başlamamalı. Yalnız anlatım fazı
 * saklanır (konuşma sona yakın; gerekirse baştan). 3 günden eski kayıt atılır.
 */
const RESUME_PREFIX = "lernomi-lesson-resume:";
const RESUME_TTL_MS = 3 * 86400000;

export type LessonResume = { cursor: number; correct: number; at: number };

export async function saveLessonResume(id: string, cursor: number, correct: number): Promise<void> {
  try {
    await AsyncStorage.setItem(RESUME_PREFIX + id, JSON.stringify({ cursor, correct, at: Date.now() }));
  } catch { /* yut */ }
}

export async function loadLessonResume(id: string): Promise<LessonResume | null> {
  try {
    const raw = await AsyncStorage.getItem(RESUME_PREFIX + id);
    if (!raw) return null;
    const v = JSON.parse(raw) as LessonResume;
    if (!v || typeof v.cursor !== "number" || typeof v.at !== "number") return null;
    if (Date.now() - v.at > RESUME_TTL_MS) return null;
    if (v.cursor <= 0) return null;
    return v;
  } catch {
    return null;
  }
}

export async function clearLessonResume(id: string): Promise<void> {
  try { await AsyncStorage.removeItem(RESUME_PREFIX + id); } catch { /* yut */ }
}
