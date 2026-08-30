import Tts from "react-native-tts";

/**
 * Almanca sesli okuma (TTS) — Android TextToSpeech.
 *
 * ÖNEMLİ dayanıklılık: eskiden `setDefaultLanguage("de-DE")` başarısız olursa
 * (cihazda Almanca ses verisi kurulu değilse) TÜM TTS kapanıyordu — yani ses
 * hiç çıkmıyordu. Artık motor varsa TTS AÇIK kalır; Almanca ayrı denenir,
 * yoksa ses verisi kurulumu istenir ama konuşma yine de yapılır (varsayılan
 * sesle). Motor hiç yoksa (bazı emülatörler) sessizce devre dışı kalır.
 */
let ready: Promise<boolean> | null = null;
export let germanReady = false;

async function init(): Promise<boolean> {
  try {
    await Tts.getInitStatus();
  } catch {
    // TTS motoru yok (ör. emülatör). Ses çıkmaz; çağıran kelimeyi gösterir.
    return false;
  }
  // Almanca sesi AYRI: başarısız olsa da TTS'i kapatma.
  try {
    await Tts.setDefaultLanguage("de-DE");
    germanReady = true;
  } catch {
    germanReady = false;
    try { (Tts as { requestInstallData?: () => void }).requestInstallData?.(); } catch { /* yut */ }
  }
  try { await Tts.setDefaultRate(0.42); } catch { /* yut */ }
  try { (Tts as { setIgnoreSilentSwitch?: (v: string) => void }).setIgnoreSilentSwitch?.("ignore"); } catch { /* yut */ }
  return true;
}

export function ttsAvailable(): Promise<boolean> {
  if (!ready) ready = init();
  return ready;
}

/** Metni seslendirir (fire-and-forget). Motor varsa, Almanca sesi olmasa bile konuşur. */
export function speakGerman(text: string): void {
  if (!text) return;
  void ttsAvailable().then((ok) => {
    if (!ok) return;
    try {
      Tts.stop();
      Tts.speak(text, {
        androidParams: { KEY_PARAM_PAN: 0, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: "STREAM_MUSIC" },
        rate: 0.42,
        iosVoiceId: "",
      });
    } catch { /* yut */ }
  });
}
