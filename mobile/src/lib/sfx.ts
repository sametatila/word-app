import Sound from "react-native-sound";
import { NativeModules, Platform } from "react-native";
import { bridgeReady, bridgeSfx, type SfxKind } from "./ttsBridge";

/** Ekran-kapalı SFX için native SoundPool (arka planda çalar; react-native-sound çalmıyor). */
const NomiSfx = NativeModules.NomiSpeech as { playSfx?: (kind: string) => void } | undefined;

/**
 * Kısa ses efektleri (doğru/yanlış/dokunuş/mic aç-kapa/bitiş) — haptikle birlikte geri bildirim.
 * Üç çalma yolu da `sfxNotes.ts`'teki aynı nota tablosunu çalar (ekran-kapalı native sentez,
 * WebView köprüsü, res/raw mp3 yedeği) → her yerde aynı ses.
 * Yedek mp3'ler android/app/src/main/res/raw'da (`scripts/render-sfx.py` üretir). ÖNEMLİ: Android res/raw kaynağı UZANTISIZ
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
(["correct", "wrong", "tap", "micon", "micoff", "finish"] as const).forEach(preload);

// Ekran-kapalı: WebView köprüsü askıya alınıp sustuğu için native res/raw'a düş (arka planda çalar).
let screenOffMode = false;
export function setSfxScreenOff(v: boolean): void { screenOffMode = v; }

let lastKind = "";
let lastAt = 0;
export function sfx(kind: SfxKind): void {
  const now = Date.now();
  if (kind === lastKind && now - lastAt < 120) return; // aynı sesi kısa sürede çift çalma (dedupe)
  lastKind = kind; lastAt = now;
  try {
    // Ekran kapalı: WebView köprüsü de react-native-sound de arka planda çalmıyor → native ton sentezi.
    if (screenOffMode) { try { NomiSfx?.playSfx?.(kind); } catch { /* yut */ } return; }
    // Öncelik: WebAudio köprüsü — web ile birebir sentez, çalıştığı KANITLI çıkış (TTS de buradan).
    if (bridgeReady()) { bridgeSfx(kind); return; }
    // Yedek: cihazda react-native-sound (her tür için kendi mp3'ü var).
    const s = cache[kind];
    if (s === undefined) { preload(kind); return; }
    if (!s) return;
    s.stop(() => { s.setVolume(kind === "tap" ? 0.4 : 0.85); s.play(); });
  } catch { /* yut */ }
}
