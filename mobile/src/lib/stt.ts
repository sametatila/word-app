/**
 * Konuşma tanıma (STT) — kendi native modülümüz `NomiSpeech` (Android
 * SpeechRecognizer / iOS SFSpeechRecognizer). @react-native-voice (2022, bakımsız)
 * yerine geçer. Yürüyüş modunun aktif hatırlama döngüsü kullanır: kullanıcı cevabı
 * SÖYLER, metne çevrilir.
 *
 * Modül kelime başına TAZE recognizer kuruyor → eski kütüphanedeki "ikinci kelimede
 * mikrofon hiç açılmıyor" ve "sonuç null gelince çöküyor" sorunları kökten yok.
 *
 * Cihaz notu: HyperOS ekran kapanınca mikrofonu susturuyor (cep modu bloklu);
 * ekran açıkken kusursuz.
 */
import { NativeEventEmitter, NativeModules, PermissionsAndroid, Platform } from "react-native";

type SpeechNative = {
  start(locale: string): Promise<boolean>;
  stop(): void;
  cancel(): void;
  destroy(): void;
  isAvailable(): Promise<boolean>;
};

const Native = NativeModules.NomiSpeech as SpeechNative | undefined;
const emitter = Native ? new NativeEventEmitter(NativeModules.NomiSpeech) : null;

export async function ensureMicPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return true; // iOS izinleri native tarafta (SFSpeech) istenir
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
  try { return !!(await Native?.isAvailable()); } catch { return false; }
}

/**
 * Kelime başına TEK oturum. Final sonuç gelince döner; final gelmezse en iyi
 * ara-sonuç (partial); hata/sessizlik/timeout olursa en iyi partial ya da null.
 * Bitişte modül yok edilir (destroy) — sonraki kelime taze bir başlatma alır.
 */
export function listenOnce(locale = "de-DE", windowMs = 9000): Promise<string | null> {
  return new Promise((resolve) => {
    if (!Native || !emitter) { resolve(null); return; }
    let done = false;
    let best = "";
    let endTimer: ReturnType<typeof setTimeout> | null = null;

    const finish = (t: string | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (endTimer) clearTimeout(endTimer);
      subs.forEach((s) => s.remove());
      try { Native.destroy(); } catch { /* yut */ }
      resolve(t);
    };

    const subs = [
      emitter.addListener("NomiSpeechResults", (e: { value?: string[] }) =>
        finish((e?.value?.[0] ?? "").trim() || best || null),
      ),
      emitter.addListener("NomiSpeechPartial", (e: { value?: string[] }) => {
        const t = (e?.value?.[0] ?? "").trim();
        if (t) best = t;
      }),
      emitter.addListener("NomiSpeechEnd", () => {
        // Konuşma bitti; final birazdan gelmeli. Gelmezse kısa emniyetle partial'a düş.
        if (endTimer) clearTimeout(endTimer);
        endTimer = setTimeout(() => finish(best || null), 1500);
      }),
      emitter.addListener("NomiSpeechError", () => finish(best || null)),
    ];

    const timer = setTimeout(() => finish(best || null), windowMs); // güvenlik üst sınırı
    Native.start(locale).catch(() => finish(null));
  });
}

export function stopListening(): void {
  try { Native?.stop(); } catch { /* yut */ }
}
