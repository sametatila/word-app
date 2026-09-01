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

/**
 * TEK temiz mekanizma: kelime başına TEK oturum. Tanıyıcının erken kapanmaması için
 * "minimum kayıt süresi" ve "konuşma sonrası sessizlik" seçenekleriyle açılır (mic
 * kullanıcıya yeter süre açık kalsın). Sonuç gelince döner; hata/sessizlik olursa
 * null (yeniden açma YOK — restart tanıyıcı durumunu bozup sonraki kelimede mic'i
 * hiç açmıyordu). Her kelime taze bir başlatma alır.
 */
export function listenOnce(locale = "de-DE", windowMs = 9000): Promise<string | null> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (t: string | null) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      Voice.onSpeechResults = () => {};
      Voice.onSpeechError = () => {};
      try { Voice.stop(); } catch { /* yut */ }
      resolve(t);
    };
    const timer = setTimeout(() => finish(null), windowMs); // güvenlik üst sınırı
    Voice.onSpeechResults = (e: { value?: string[] }) => finish((e?.value?.[0] ?? "").trim() || null);
    Voice.onSpeechError = () => finish(null);
    Voice.start(locale, {
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 6000,
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 2200,
      EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 2200,
    }).catch(() => finish(null));
  });
}

export function stopListening(): void {
  try { void Voice.stop(); } catch { /* yut */ }
}
