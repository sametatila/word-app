/**
 * Biten derslerin cihaz kaydı — /api/immersion canlı olmadan Patika ilerlemesi.
 *
 * Sunucuya da yazılır (/api/lesson recordLesson); bu yerel set yalnız gerçek
 * track gelene kadar hangi dersin bittiğini Patika'ya söyler. Sunucu track'i
 * (gating + gerçek ilerleme) açıldığında usePatika onu tercih eder.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "wortspiel-lessons-done";
let cache: Set<string> | null = null;

export async function getDoneLessons(): Promise<Set<string>> {
  if (cache) return cache;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    cache = new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    cache = new Set<string>();
  }
  return cache;
}

export async function markLessonDone(id: string): Promise<void> {
  const s = await getDoneLessons();
  if (s.has(id)) return;
  s.add(id);
  try { await AsyncStorage.setItem(KEY, JSON.stringify([...s])); } catch { /* yut */ }
}

export function isLessonDoneSync(id: string): boolean {
  return cache?.has(id) ?? false;
}
