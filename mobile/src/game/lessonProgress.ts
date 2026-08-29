/**
 * Biten Patika adımlarının cihaz kaydı — /api/immersion canlı olmadan
 * ilerleme. Ders id'leri ve beceri egzersizi id'leri aynı kümede (hepsi item
 * ref'i). Sunucuya da yazılır (/api/lesson, /api/skills); bu yerel set yalnız
 * gerçek track gelene kadar Patika'ya hangi adımın bittiğini söyler.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "wortspiel-items-done";
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
