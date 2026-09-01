import Sound from "react-native-sound";
import { Platform } from "react-native";

/**
 * Kısa ses efektleri (doğru/yanlış/dokunuş) — haptikle birlikte geri bildirim.
 * Sesler android/app/src/main/res/raw'da. ÖNEMLİ: Android res/raw kaynağı UZANTISIZ
 * adla bulunur ("correct"); ".mp3" ile aranırsa bulunamaz ve hiç çalmaz. iOS'ta
 * bundle uzantılı ister. Ayrıca modül açılırken önden yüklenir ki ilk çağrıda hazır
 * olsun. Ses açılamazsa sessizce yutulur (haptik yine çalışır).
 */
try { Sound.setCategory("Playback", false); } catch { /* yut */ }

const cache: Record<string, Sound | null | undefined> = {};
const fileName = (name: string) => (Platform.OS === "android" ? name : `${name}.mp3`);

function preload(name: string): void {
  if (cache[name] !== undefined) return;
  try {
    const s = new Sound(fileName(name), Sound.MAIN_BUNDLE, (e) => { if (e) cache[name] = null; });
    cache[name] = s;
  } catch {
    cache[name] = null;
  }
}

// Modül açılışında önden yükle.
(["correct", "wrong", "tap"] as const).forEach(preload);

export function sfx(kind: "correct" | "wrong" | "tap"): void {
  try {
    const s = cache[kind];
    if (s === undefined) { preload(kind); return; }
    if (!s) return;
    s.stop(() => { s.setVolume(kind === "tap" ? 0.4 : 0.85); s.play(); });
  } catch { /* yut */ }
}
