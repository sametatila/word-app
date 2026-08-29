import Tts from "react-native-tts";

/**
 * Almanca sesli okuma (TTS) — web'deki speakGerman karşılığı. Android'in
 * TextToSpeech motorunu kullanır. Motor yoksa sessizce devre dışı kalır
 * (çağıran, ttsAvailable ile önce sorup kelimeyi göstermeye düşebilir).
 */
let state: "unknown" | "ok" | "fail" = "unknown";

export async function ttsAvailable(): Promise<boolean> {
  if (state !== "unknown") return state === "ok";
  try {
    await Tts.getInitStatus();
    await Tts.setDefaultLanguage("de-DE");
    await Tts.setDefaultRate(0.42);
    Tts.setIgnoreSilentSwitch?.("ignore");
    state = "ok";
    return true;
  } catch {
    state = "fail";
    return false;
  }
}

/** Metni Almanca seslendirir (fire-and-forget). Motor yoksa yutar. */
export function speakGerman(text: string): void {
  void ttsAvailable().then((ok) => {
    if (!ok) return;
    try { Tts.stop(); Tts.speak(text, { androidParams: { KEY_PARAM_PAN: 0, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: "STREAM_MUSIC" }, rate: 0.42, iosVoiceId: "" }); } catch { /* yut */ }
  });
}
