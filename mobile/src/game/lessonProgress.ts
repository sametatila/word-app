/**
 * Biten Patika adımlarının cihaz kaydı — /api/immersion canlı olmadan
 * ilerleme. Ders id'leri ve beceri egzersizi id'leri aynı kümede (hepsi item
 * ref'i). Sunucuya da yazılır (/api/lesson, /api/skills); bu yerel set yalnız
 * gerçek track gelene kadar Patika'ya hangi adımın bittiğini söyler.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "nomi-items-done";
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

/**
 * Yarım kalan dersin cihazda saklanması (web lesson-player RESUME_KEY karşılığı).
 * Anlatım uzun; ortasında çıkan öğrenci baştan başlamamalı. Yalnız anlatım fazı
 * saklanır (konuşma sona yakın; gerekirse baştan). 3 günden eski kayıt atılır.
 */
const RESUME_PREFIX = "nomi-lesson-resume:";
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
