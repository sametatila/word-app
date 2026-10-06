import Sound from "react-native-sound";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules, Platform } from "react-native";
import { bridgeReady, bridgeSfx, type SfxKind } from "./ttsBridge";
import { SFX_NOTES, type SfxLayer } from "./sfxNotes";

/** Ekran-kapalı SFX için native ton sentezi + arka planda çalışan gecikme (Handler). */
const LernomiSfx = NativeModules.LernomiSpeech as
  | {
      playSfx?: (spec: string) => void;
      delay?: (ms: number) => Promise<boolean>;
      /** Yalnız Android (senkron): zil modu sessiz/titreşim mi. */
      sfxSilent?: () => boolean;
    }
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
(["correct", "wrong", "tap", "micon", "micoff", "finish", "premium", "near", "streak"] as const).forEach(preload);

/*
 * MP3 YEDEĞİ OLMAYAN SESLER — iOS: `near` / `streak` mp3'leri `ios/Lernomi/sfx`e
 * yazıldı ama Xcode hedefine eklenmedi (mp3'ler tek tek dosya referansı, klasör
 * referansı değil → project.pbxproj değişikliği ister). Dosya bulunamazsa bu sese
 * düşülüyor; bu dal zaten son çare (köprü ve native sentez varken hiç gelinmez).
 *  - near → start: iki yumuşak sinüs nota, yükselen. "correct"e düşmek YANLIŞ olurdu:
 *    neredeyse-doğru cevaba "doğru" demek geri bildirimi yalana çevirir.
 *  - streak → unlock: yükselen üçgen parıltı, aynı "kazandın" ailesi.
 */
const MP3_FALLBACK: Partial<Record<SfxKind, SfxKind>> = { near: "start", streak: "unlock" };

/*
 * SESSİZ TUŞ / ZİL MODU — oyun efektleri telefonun sessiz ayarına uyuyor, telaffuz
 * (TTS) uymuyor (dil öğrenirken sesi duymak işin kendisi).
 *
 * iOS: kapı Swift'te (`LernomiSpeech.playSfx` → `sfxSilenced`). JS sessiz tuşu
 * okuyamaz; Swift de ayrı bir yöntemle soramıyor çünkü yeni yöntem `LernomiSpeech.m`
 * dışa aktarımı ister. Bu yüzden iOS'ta efektler ekran açıkken de native sentezden
 * gidiyor (köprüden değil) — kapı tek yerde, üç yolun hepsini kapsıyor. Açılışta boş
 * tarifle bir kez çağrılıyor: Swift sessiz tuş yoklamasını başlatıyor, ses çalmıyor
 * (yoksa sessizdeki telefonda turun ilk sesi yoklama sonucunu beklemeden çalardı).
 *
 * Android: ZİL MODUNA BAKILMIYOR (2026-10-06, Samet'in bildirimi: "uygulama geneli
 * sfx'lerin hiçbiri çalışmıyor"). 2026-09-28'den beri `getRingerMode()` NORMAL
 * değilse efekt susuyordu; telefonların çoğu titreşimde durduğu için efektler
 * fiilen hiç çalmıyordu. Android'de uygulama sesleri zil moduna değil MEDYA ses
 * seviyesine bağlı (sistem ayarı); susturmanın yolu uygulamadaki ses anahtarı
 * (`soundOn`) ya da medya sesi. Native `sfxSilent` duruyor ama çağrılmıyor.
 */
if (Platform.OS === "ios") { try { LernomiSfx?.playSfx?.(""); } catch { /* yut */ } }

// Ekran-kapalı: WebView köprüsü askıya alınıp sustuğu için native res/raw'a düş (arka planda çalar).
let screenOffMode = false;
export function setSfxScreenOff(v: boolean): void { screenOffMode = v; }

/*
  YÜRÜYÜŞ OTURUMU: Android'de zil modu kapısı kalktığı için (yukarıdaki SESSİZ TUŞ
  notu) muafiyet de gereksizleşti; çağrı duruyor, iOS'ta muafiyet Swift'te
  (`walkSessionHeld`, LernomiSpeech.swift `sfxExempt`).
*/
export function setSfxWalkSession(_v: boolean): void { /* Android'de kapı yok */ }

/** Arka planda da çalışan gecikme (native Handler); RN setTimeout ekran-kapalı durur. */
function waitMs(ms: number): Promise<void> {
  try { if (LernomiSfx?.delay) return LernomiSfx.delay(ms).then(() => undefined).catch(() => undefined); } catch { /* yut */ }
  return new Promise((r) => setTimeout(r, ms));
}

function playNow(kind: SfxKind, spec: string): void {
  try {
    // Ekran kapalı: WebView köprüsü de react-native-sound de arka planda çalmıyor → native ton sentezi.
    if (screenOffMode) { LernomiSfx?.playSfx?.(spec); return; }
    // iOS: sessiz tuş kapısı native'de → efektler hep oradan (yukarıdaki SESSİZ TUŞ notu).
    if (Platform.OS === "ios" && LernomiSfx?.playSfx) { LernomiSfx.playSfx(spec); return; }
    // Öncelik: WebAudio köprüsü — web ile birebir sentez, çalıştığı KANITLI çıkış (TTS de buradan).
    if (bridgeReady()) { bridgeSfx(spec); return; }
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
    if (LernomiSfx?.playSfx) { LernomiSfx.playSfx(spec); return; }
    // Son çare: mp3 (debug yapısı, ya da native modülün bulunmadığı bir ortam). Kombo
    // perdesi burada YOK: dosya sabit, merdiven yalnız sentez yollarında yükseliyor.
    let s = cache[kind];
    if (s === undefined) { preload(kind); return; }
    const alt = MP3_FALLBACK[kind];
    if (!s && alt) { s = cache[alt]; kind = alt; }
    if (!s) return;
    s.stop(() => { s.setVolume(kind === "tap" ? 0.4 : 0.85); s.play(); });
  } catch { /* yut */ }
}

/** Bir sesin süresi (ms) — nota tablosundan türer, sabit yazılmaz. Jingle'dan sonra
 *  konuşmayı başlatan yer bunu kullanıyor (WalkModeScreen, premium bilgilendirmesi). */
export function sfxDurationMs(kind: SfxKind): number { return SFX_DUR[kind] ?? 300; }

/*
 * YÜKSELEN SERİ (kombo merdiveni) — web `lib/sfx` `LADDER` / `COMBO_IDLE_MS` /
 * `correctCue` ile BİREBİR: her ardışık doğruda kök bir pentatonik basamak çıkıyor,
 * 25 sn sessizlikte başa dönüyor, 4. doğrudan itibaren üstte ışıltı (`sparkle`).
 * Mobilin doğru sesi webinkinden farklı bir ezgi (D10 ksilofon arpeji, kökü C5) —
 * perde kaydırmayla kökü basamağın frekansına oturuyor: oran = basamak / 523.25.
 * Sayaç sesin kendi belleğinde (web gibi); tur başında GameScreen `resetCombo()` çağırır.
 */
const COMBO_LADDER = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];
const COMBO_IDLE_MS = 25_000;
const CORRECT_ROOT = 523.25; // SFX_NOTES.correct kökü (C5)
let combo = 0;
let lastCorrectAt = 0;

/** Kombo merdivenini başa sarar — yeni tur başlarken çağrılır (web `resetCombo`). */
export function resetCombo(): void { combo = 0; lastCorrectAt = 0; }

/** Şu anki kombo basamağı (0 tabanlı; web `comboStep`). */
export function comboStep(): number { return combo; }

/**
 * Çalma tarifi: "ad[+katman][@oran]" — köprü, Kotlin ve Swift aynı biçimi çözüyor
 * (bkz. sfxNotes.ts başı). Oran 1 ise yazılmıyor.
 */
export function sfxSpec(kind: SfxKind, ratio = 1, layers: readonly SfxLayer[] = []): string {
  const name = [kind, ...layers].join("+");
  // Makine dizgisi, ekrana çıkmıyor: altı basamağa yuvarlanmış oran (toFixed değil —
  // parity "sayacin ondalik ayraci" ekrandaki sayıları arıyor).
  return Math.abs(ratio - 1) < 1e-9 ? name : `${name}@${Math.round(ratio * 1e6) / 1e6}`;
}

/** Merdiveni bir basamak ilerletir; dönen değer bu cevabın basamağı (0 tabanlı). */
function climb(): number {
  const now = Date.now();
  if (now - lastCorrectAt > COMBO_IDLE_MS) combo = 0;
  lastCorrectAt = now;
  return combo++;
}

/** Doğru cevabın tarifi (web `correctCue`). */
function correctSpec(): string {
  const root = COMBO_LADDER[Math.min(climb(), COMBO_LADDER.length - 1)];
  return sfxSpec("correct", root / CORRECT_ROOT, combo >= 4 ? ["sparkle"] : []);
}

/** Ses kapalıyken de kombo sayacı akıyor (web `play` ile aynı): ses açılınca merdiven
 *  kullanıcının gerçekte kaçıncı doğruda olduğunu göstersin. */
function countSilently(kind: SfxKind): void {
  if (kind === "correct" || kind === "near") combo++;
  if (kind === "wrong") combo = 0;
}

let lastKind = "";
let lastAt = 0;
// Sesleri SIRAYA sok — iki ses üst üste binebiliyor (ör. mikrofon açılışının
// hemen ardından gelen bir karar sesi). Önceki ses bitene kadar yeniyi ötele;
// gecikme native Handler'la (ekran-kapalı da çalışır). Böylece tek tek çalarlar.
let busyUntil = 0;
export function sfx(kind: SfxKind): void {
  if (__DEV__) console.log("PROBE sfx", kind, "screenOff=", screenOffMode, "acik=", soundOn);
  if (!soundOn) return countSilently(kind); // kullanıcı kapattı: efektler susuyor, konuşma sesi değil
  const now = Date.now();
  if (kind === lastKind && now - lastAt < 120) return; // aynı sesi kısa sürede çift çalma (dedupe)
  lastKind = kind; lastAt = now;
  if (kind === "wrong") combo = 0;
  /* Neredeyse kabul edilmiş bir cevap: seriyi kırmıyor, merdiveni bir basamak
     ilerletiyor — ama kendi sesiyle, perde kaydırmadan (web `play("near")` aynı). */
  if (kind === "near") climb();
  const spec = kind === "correct" ? correctSpec() : kind;
  const wait = Math.min(600, Math.max(0, busyUntil - now));
  busyUntil = now + wait + (SFX_DUR[kind] ?? 300);
  if (wait > 0) void waitMs(wait).then(() => playNow(kind, spec));
  else playNow(kind, spec);
}
