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
import { currentTargetLocale, currentTargetLang } from "./courses";
import { t } from "./i18n";
import { API_BASE } from "../api/client";

type SpeechNative = {
  start(locale: string): Promise<boolean>;
  stop(): void;
  cancel(): void;
  destroy(): void;
  isAvailable(locale: string): Promise<boolean>;
  setKeepAwake(on: boolean): void;
  startRecording(): Promise<boolean>;
  stopRecording(): Promise<string | null>;
  startWalkService(): void;
  stopWalkService(): void;
  startScreenWatch(): void;
  stopScreenWatch(): void;
  playTtsUrl(url: string): Promise<boolean>;
  stopTts(): void;
  delay(ms: number): Promise<boolean>;
  uploadStt(url: string, wavPath: string, language: string, expected: string): Promise<string | null>;
  playSfx(kind: string): void;
  httpGet(url: string): Promise<string | null>;
  /** Native HTTP yalnız bu adrese çıkar (çerez başka hosta gitmez). */
  setApiBase(base: string): void;
};

const Native = NativeModules.NomiSpeech as SpeechNative | undefined;
const emitter = Native ? new NativeEventEmitter(NativeModules.NomiSpeech) : null;
// Native HTTP allowlist: uploadStt/httpGet/playTtsUrl yalnız API sunucusuna (https) çıkar.
try { Native?.setApiBase?.(API_BASE); } catch { /* yut */ }

export async function ensureMicPermission(): Promise<boolean> {
  if (Platform.OS !== "android") return true; // iOS izinleri native tarafta (SFSpeech) istenir
  try {
    const g = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: t("micperm.mikrofon_izni"),
      message: t("micperm.yuruyus_modunda_soyledigin_kelimey"),
      buttonPositive: t("micperm.izin_ver"),
      buttonNegative: t("common.vazgec"),
    });
    return g === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}

export async function sttAvailable(locale = currentTargetLocale()): Promise<boolean> {
  // Yerel kod artık native tarafa geçiyor: kontrol sabit "de-DE" ile yapılırsa
  // İngilizce kursta, cihazda Almanca tanıma yoksa mikrofon hiç açılmıyordu.
  try { return !!(await Native?.isAvailable(locale)); } catch { return false; }
}

/**
 * Kelime başına TEK oturum. Final sonuç gelince döner; final gelmezse en iyi
 * ara-sonuç (partial); hata/sessizlik/timeout olursa en iyi partial ya da null.
 * Bitişte modül yok edilir (destroy) — sonraki kelime taze bir başlatma alır.
 */
export function listenOnce(locale = currentTargetLocale(), windowMs = 9000): Promise<string[] | null> {
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

/**
 * Ekran-kapalı TTS — /api/tts MP3'ünü NATIVE MediaPlayer ile çalar (arka planda çalışır;
 * WebView köprüsü ekran kapanınca askıya alınıp susuyor). Neural ses (Katja/Emel) korunur.
 * Bitene kadar bekler. Çerez native tarafta CookieManager'dan alınır (auth).
 */
export async function speakServerTts(voice: string, text: string, slow = false): Promise<void> {
  if (!Native || !text) return;
  const url = `${API_BASE}/api/tts?v=${encodeURIComponent(voice)}&t=${encodeURIComponent(text)}${slow ? "&r=slow" : ""}`;
  try { await Native.playTtsUrl(url); } catch { /* yut */ }
}
export function stopServerTts(): void { try { Native?.stopTts(); } catch { /* yut */ } }

/**
 * Arka planda da çalışan gecikme. RN'in setTimeout'u app arka plana (ekran kapalı) geçince
 * DURUYOR → yürüyüş döngüsü takılıyordu. Native Handler (foreground-service ile süreç canlı)
 * durmaz. Native yoksa (iOS/eski) setTimeout'a düşer.
 */
export function nativeDelay(ms: number): Promise<void> {
  try {
    if (Native?.delay) return Native.delay(ms).then(() => undefined).catch(() => undefined);
  } catch { /* yut */ }
  return new Promise<void>((r) => setTimeout(() => r(), ms));
}

/** Mikrofonlu foreground service — güç tuşuyla ekran kapansa da arka planda mic açık kalsın. */
export function startWalkService(): void { try { Native?.startWalkService(); } catch { /* yut */ } }
export function stopWalkService(): void { try { Native?.stopWalkService(); } catch { /* yut */ } }

/** Bildirimdeki "Durdur" eylemi (foreground service) — JS oturumu kapatır. Aboneliği kapatan fonksiyon döner. */
export function onWalkStop(cb: () => void): () => void {
  if (!emitter) return () => {};
  const sub = emitter.addListener("NomiWalkStop", cb);
  return () => sub.remove();
}

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
export async function azureListenOnce(target: string, windowMs = 3000, onStop?: () => void, lang = currentTargetLang()): Promise<string[] | null> {
  if (!Native) return null;
  try {
    const ok = await Native.startRecording().catch(() => false);
    if (!ok) return null;
    await nativeDelay(windowMs);
    const path = await Native.stopRecording().catch(() => null);
    onStop?.(); // mic kapandı — micoff burada (upload'dan ÖNCE; verdict'le çakışmaz)
    if (!path) return null;
    // POST'u NATIVE yap — RN fetch ekran-kapalı (arka plan) takılıyor; native thread çalışır.
    const text = await Native.uploadStt(`${API_BASE}/api/stt`, path, lang, target ?? "").catch(() => null);
    return text ? [text.trim()] : null;
  } catch {
    return null;
  }
}

/** Ekran-kapalı devam turunda /api/session GET (RN fetch arka planda takılıyor). Gövde ya da null. */
export async function nativeHttpGet(url: string): Promise<string | null> {
  try { if (Native?.httpGet) return await Native.httpGet(url); } catch { /* yut */ }
  return null;
}
