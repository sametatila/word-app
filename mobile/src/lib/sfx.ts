import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules, Platform } from "react-native";
import { bridgeReady, bridgeSfx, type SfxKind } from "./ttsBridge";
import { SFX_NOTES } from "./sfxNotes";

/** Ekran-kapalı SFX için native ton sentezi + arka planda çalışan gecikme (Handler). */
const LernomiSfx = NativeModules.LernomiSpeech as
  | { playSfx?: (kind: string) => void; delay?: (ms: number) => Promise<boolean> }
  | undefined;

// Her sesin süresi (ms) — nota tablosundan: en geç biten notanın start+dur'u + küçük pay.
const SFX_DUR: Record<string, number> = Object.fromEntries(
  Object.entries(SFX_NOTES).map(([k, notes]) => [
    k,
    Math.round(Math.max(...notes.map((n) => n[1] + n[2])) * 1000) + 20,
  ]),
);

/**
 * Kısa ses efektleri (doğru/yanlış/dokunuş/mic aç-kapa/bitiş) — haptikle birlikte geri bildirim.
 * Üç çalma yolu da `sfxNotes.ts`'teki aynı nota tablosunu çalar (ekran-kapalı native sentez,
 * WebView köprüsü, mp3 yedeği) → her yerde aynı ses.
 * Yedek mp3'ler iki pakette de var; `scripts/render-sfx.py` ikisine birden yazıyor: Android
 * `android/app/src/main/res/raw`, iOS `ios/Lernomi/sfx` (iOS'ta paket KÖKÜNE düz kopyalanır,
 * alt klasöre değil — bkz. betiğin başı). ÖNEMLİ: Android res/raw kaynağı UZANTISIZ adla
 * bulunur ("correct"); ".mp3" ile aranırsa bulunamaz ve hiç çalmaz. iOS'ta bundle uzantılı
 * ister. Ayrıca modül açılırken önden yüklenir ki ilk çağrıda hazır olsun. Ses açılamazsa
 * sessizce yutulur (haptik yine çalışır).
 */
try { Sound.setCategory("Playback", false); } catch { /* yut */ }

/**
 * OYUN SESLERİ AÇIK MI — web `lib/sfx` `soundEnabled` ile aynı tercih.
 *
 * Mobilde böyle bir anahtar YOKTU: sesleri susturmanın tek yolu telefonu
 * kısmaktı ve bu TTS'i de susturuyordu - yani sessiz bir yerde çalışmak
 * isteyen kullanıcı telaffuzu da kaybediyordu. Web ikisini ayırıyor ("telaffuz
 * sesi ayrı — bu kapalıyken de çalışır") ve aynı ayrım burada da geçerli:
 * bu bayrak YALNIZ kısa efektleri kapatıyor, `speakTarget` etkilenmiyor.
 *
 * Tercih AÇILIŞTA okunuyor (`loadSoundPref`); okunmadan önce varsayılan açık.
 */
const SOUND_KEY = "lernomi:sound";
let soundOn = true;

export async function loadSoundPref(): Promise<boolean> {
  try { soundOn = (await AsyncStorage.getItem(SOUND_KEY)) !== "off"; } catch { soundOn = true; }
  return soundOn;
}
export function soundEnabled(): boolean { return soundOn; }
export async function setSoundEnabled(on: boolean): Promise<void> {
  soundOn = on;
  try { if (on) await AsyncStorage.removeItem(SOUND_KEY); else await AsyncStorage.setItem(SOUND_KEY, "off"); } catch { /* yut */ }
}

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
(["correct", "wrong", "tap", "micon", "micoff", "finish", "premium"] as const).forEach(preload);

// Ekran-kapalı: WebView köprüsü askıya alınıp sustuğu için native res/raw'a düş (arka planda çalar).
let screenOffMode = false;
export function setSfxScreenOff(v: boolean): void { screenOffMode = v; }

/** Arka planda da çalışan gecikme (native Handler); RN setTimeout ekran-kapalı durur. */
function waitMs(ms: number): Promise<void> {
  try { if (LernomiSfx?.delay) return LernomiSfx.delay(ms).then(() => undefined).catch(() => undefined); } catch { /* yut */ }
  return new Promise((r) => setTimeout(r, ms));
}

function playNow(kind: SfxKind): void {
  try {
    // Ekran kapalı: WebView köprüsü de react-native-sound de arka planda çalmıyor → native ton sentezi.
    if (screenOffMode) { LernomiSfx?.playSfx?.(kind); return; }
    // Öncelik: WebAudio köprüsü — web ile birebir sentez, çalıştığı KANITLI çıkış (TTS de buradan).
    if (bridgeReady()) { bridgeSfx(kind); return; }
    /*
     * Köprü hazır DEĞİL ve ekran açık: NATIVE ton sentezi. Aynı nota tablosu, aynı ses.
     *
     * Burada eskiden doğrudan mp3 yedeğine düşülüyordu ve o yedek RELEASE APK'SINDA
     * HİÇ YOKTU. Sebep: `res/raw/*.mp3` dosyalarına kodda `R.raw.correct` diye atıf
     * yok — react-native-sound onları adla açıyor — ve kaynak küçültücü statik atıf
     * göremediği için hepsini atıyor. Ölçüldü 2026-09-09: üretilen APK'da ne bir
     * .mp3 girdisi var ne `raw` kaynak tipi; küçültücü raporunda yedi satır birden
     * "raw:correct … is not reachable".
     *
     * `res/raw/keep.xml` ile korumak işe YARAMIYOR: React Native'in paketleme görevi
     * aynı adlı dosyayı `build/generated/res/react/<variant>/raw/keep.xml` olarak
     * kendisi üretiyor (JS'ten gelen görselleri korumak için) ve üretilen kaynak
     * dizini `src/main/res`i eziyor — elle yazılan keep.xml birleştirmeyi kaybediyor.
     *
     * Küçültücüyle boğuşmak yerine yol değişti: native sentez iki platformda da var
     * (Kotlin `playSfx`, Swift `playSfx`), ekran açıkken de çalışıyor ve zaten aynı
     * tabloyu çalıyor. Böylece bu dalın hiçbir dosyaya bağımlılığı kalmadı.
     */
    if (LernomiSfx?.playSfx) { LernomiSfx.playSfx(kind); return; }
    // Son çare: mp3 (debug yapısı, ya da native modülün bulunmadığı bir ortam).
    const s = cache[kind];
    if (s === undefined) { preload(kind); return; }
    if (!s) return;
    s.stop(() => { s.setVolume(kind === "tap" ? 0.4 : 0.85); s.play(); });
  } catch { /* yut */ }
}

/** Bir sesin süresi (ms) — nota tablosundan türer, sabit yazılmaz. Jingle'dan sonra
 *  konuşmayı başlatan yer bunu kullanıyor (WalkModeScreen, premium bilgilendirmesi). */
export function sfxDurationMs(kind: SfxKind): number { return SFX_DUR[kind] ?? 300; }

let lastKind = "";
let lastAt = 0;
// Sesleri SIRAYA sok — micoff (mikrofon kapanma) ile doğru/yanlış sesi üst üste binebiliyordu
// (native STT/Azure sonucu micoff bitmeden gelince). Önceki ses bitene kadar yeniyi ötele;
// gecikme native Handler'la (ekran-kapalı da çalışır). Böylece her koşulda tek tek çalarlar.
let busyUntil = 0;
export function sfx(kind: SfxKind): void {
  if (!soundOn) return; // kullanıcı kapattı: efektler susuyor, konuşma sesi değil
  const now = Date.now();
  if (kind === lastKind && now - lastAt < 120) return; // aynı sesi kısa sürede çift çalma (dedupe)
  lastKind = kind; lastAt = now;
  const wait = Math.min(600, Math.max(0, busyUntil - now));
  busyUntil = now + wait + (SFX_DUR[kind] ?? 300);
  if (wait > 0) void waitMs(wait).then(() => playNow(kind));
  else playNow(kind);
}
