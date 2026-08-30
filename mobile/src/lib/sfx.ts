import Sound from "react-native-sound";

/**
 * Kısa ses efektleri (doğru/yanlış/dokunuş) — haptikle birlikte geri bildirim.
 * Sesler android/app/src/main/res/raw'da; bir kez yüklenip yeniden çalınır.
 * Ses motoru yoksa/açılamazsa sessizce yutulur (haptik yine çalışır).
 */
try { Sound.setCategory("Ambient", false); } catch { /* yut */ }

const cache: Record<string, Sound | null | undefined> = {};
function load(name: string): Sound | null {
  if (cache[name] !== undefined) return cache[name] ?? null;
  try {
    const s = new Sound(`${name}.mp3`, Sound.MAIN_BUNDLE, (e) => { if (e) cache[name] = null; });
    cache[name] = s;
    return s;
  } catch {
    cache[name] = null;
    return null;
  }
}

export function sfx(kind: "correct" | "wrong" | "tap"): void {
  try {
    const s = load(kind);
    if (!s) return;
    s.stop(() => { s.setVolume(kind === "tap" ? 0.4 : 0.7); s.play(); });
  } catch { /* yut */ }
}
