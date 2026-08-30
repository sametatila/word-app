/**
 * Konuşma tanıma (STT) — @react-native-voice/voice. Yürüyüş modunun aktif
 * hatırlama döngüsü bunu kullanır: kullanıcı cevabı SÖYLER, metne çevrilir.
 *
 * Cihaz notu: HyperOS ekran kapanınca mikrofonu susturuyor (cep modu bloklu);
 * ekran açıkken kusursuz. Tanıma yoksa çağıran elle "bildim/bilmedim"e düşer.
 */
import Voice from "@react-native-voice/voice";
import { PermissionsAndroid, Platform } from "react-native";

export async function ensureMicPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return true;
  try {
    const g = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: "Mikrofon izni",
      message: "Konuşarak cevap verebilmen için mikrofon erişimi gerekiyor.",
      buttonPositive: "İzin ver",
      buttonNegative: "Vazgeç",
    });
    return g === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export async function sttAvailable(): Promise<boolean> {
  try { return !!(await Voice.isAvailable()); } catch { return false; }
}

/** Tek atışlık dinleme: ilk sonucu (ya da zaman aşımı/hata) döndürür. */
export function listenOnce(locale = "de-DE", timeoutMs = 6000): Promise<string | null> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (t: string | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      try { Voice.stop(); } catch { /* yut */ }
      Voice.onSpeechResults = () => {};
      Voice.onSpeechError = () => {};
      resolve(t);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    Voice.onSpeechResults = (e: { value?: string[] }) => finish(e?.value?.[0] ?? null);
    Voice.onSpeechError = () => finish(null);
    (async () => {
      try { await Voice.start(locale); } catch { finish(null); }
    })();
  });
}

export function stopListening(): void {
  try { void Voice.stop(); } catch { /* yut */ }
}
