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
  setKeepAwake(on: boolean): void;
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
export function listenOnce(locale = "de-DE", windowMs = 9000): Promise<string[] | null> {
  return new Promise((resolve) => {
    if (!Native || !emitter) { resolve(null); return; }
    let done = false;
    let best = "";
    let endTimer: ReturnType<typeof setTimeout> | null = null;
    let quietTimer: ReturnType<typeof setTimeout> | null = null;

    // TÜM adayları döndür — kısa kelimede doğru cevap çoğu zaman ilk aday değil
    // (ör. "er" için ["ja","ja im","er","eher"]); çağıran hepsini eşleştirir.
    const finish = (vals: string[] | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      if (endTimer) clearTimeout(endTimer);
      if (quietTimer) clearTimeout(quietTimer);
      subs.forEach((s) => s.remove());
      try { Native.destroy(); } catch { /* yut */ }
      resolve(vals && vals.length ? vals : best ? [best] : null);
    };

    const subs = [
      emitter.addListener("NomiSpeechResults", (e: { value?: string[] }) =>
        finish((e?.value ?? []).map((s) => (s ?? "").trim()).filter(Boolean)),
      ),
      emitter.addListener("NomiSpeechPartial", (e: { value?: string[] }) => {
        const t = (e?.value?.[0] ?? "").trim();
        if (t) {
          best = t;
          // Partial-tabanlı endpointing: yeni partial ~800ms gelmezse kullanıcı bitmiştir → dön.
          // Motor endpointing'i WEB_SEARCH ile güvenilmez (bazen hiç bitirmeyip 8sn takılıyor).
          if (quietTimer) clearTimeout(quietTimer);
          quietTimer = setTimeout(() => finish([best]), 800);
        }
      }),
      emitter.addListener("NomiSpeechEnd", () => {
        // Konuşma bitti; final birazdan gelmeli. Gelmezse kısa emniyetle partial'a düş.
        if (endTimer) clearTimeout(endTimer);
        endTimer = setTimeout(() => finish(null), 1500);
      }),
      emitter.addListener("NomiSpeechError", () => finish(null)),
    ];

    const timer = setTimeout(() => finish(null), windowMs); // güvenlik üst sınırı
    Native.start(locale).catch(() => finish(null));
  });
}

export function stopListening(): void {
  try { Native?.stop(); } catch { /* yut */ }
}

/** Ekran uykusunu engelle/bırak (yürüyüş turu boyunca ekran sönmesin). */
export function setKeepAwake(on: boolean): void {
  try { Native?.setKeepAwake(on); } catch { /* yut */ }
}
