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
import { API_BASE } from "../api/client";

type SpeechNative = {
  start(locale: string): Promise<boolean>;
  stop(): void;
  cancel(): void;
  destroy(): void;
  isAvailable(): Promise<boolean>;
  setKeepAwake(on: boolean): void;
  startRecording(): Promise<boolean>;
  stopRecording(): Promise<string | null>;
  startWalkService(): void;
  stopWalkService(): void;
  startScreenWatch(): void;
  stopScreenWatch(): void;
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

/** Mikrofonlu foreground service — güç tuşuyla ekran kapansa da arka planda mic açık kalsın. */
export function startWalkService(): void { try { Native?.startWalkService(); } catch { /* yut */ } }
export function stopWalkService(): void { try { Native?.stopWalkService(); } catch { /* yut */ } }

/** Ekran güç-tuşu on/off olaylarını dinle. cb(true)=kapandı, cb(false)=açıldı. Aboneliği kapatan fonksiyon döner. */
export function onScreenState(cb: (off: boolean) => void): () => void {
  try { Native?.startScreenWatch(); } catch { /* yut */ }
  if (!emitter) return () => { try { Native?.stopScreenWatch(); } catch { /* yut */ } };
  const a = emitter.addListener("NomiScreenOff", () => cb(true));
  const b = emitter.addListener("NomiScreenOn", () => cb(false));
  return () => { a.remove(); b.remove(); try { Native?.stopScreenWatch(); } catch { /* yut */ } };
}

/**
 * Sunucu (Azure) STT — ekran-kapalı/cepte yolu. Ham ses kaydeder (16 kHz mono WAV),
 * /api/stt'e (mode=walk, Azure önde) gönderir, metni döndürür. Ekran AÇIKken ücretsiz
 * native kullanılır (bkz. listenOnce); bu YALNIZ cepte/ekran-kapalı için (paralı).
 * VAD yok — sabit pencere kaydeder; kullanıcı o sürede söyler. Auth çerezle (paylaşımlı jar).
 */
export async function azureListenOnce(target: string, windowMs = 3500): Promise<string[] | null> {
  if (!Native) return null;
  try {
    const ok = await Native.startRecording().catch((e) => { console.log("AZURE start fail:", String(e)); return false; });
    if (!ok) return null;
    await new Promise<void>((r) => setTimeout(() => r(), windowMs));
    const path = await Native.stopRecording().catch(() => null);
    console.log("AZURE clip:", path);
    if (!path) return null;
    const form = new FormData();
    // RN FormData dosya parçası: file:// uri + tip. Sunucu Azure için WAV bekliyor.
    form.append("audio", { uri: "file://" + path, name: "clip.wav", type: "audio/wav" } as unknown as Blob);
    form.append("language", "de");
    form.append("mode", "walk");
    if (target) form.append("expected", target);
    const res = await fetch(`${API_BASE}/api/stt`, { method: "POST", body: form });
    const body = await res.text().catch(() => "");
    console.log("AZURE resp:", res.status, body.slice(0, 180));
    if (!res.ok) return null;
    const j = JSON.parse(body) as { text?: string };
    const t = (j?.text ?? "").trim();
    return t ? [t] : null;
  } catch (e) {
    console.log("AZURE err:", String(e));
    return null;
  }
}
