import Tts from "react-native-tts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trackOnce } from "./track";
import { navigationRef } from "./pushRoute";
import { type Pace, type VoiceId, VOICES, resolveVoice, defaultVoice, langOf, deviceRate } from "./voices";
import { speechLocaleOf, setCurrentCourse } from "./courses";
import { bridgeReady, bridgeSpeak, bridgeSpeakAndWait, bridgeStop } from "./ttsBridge";
import { speakServerTts, stopServerTts } from "./stt";
import { API_BASE, fetchWithTimeout } from "../api/client";

/**
 * Almanca sesli okuma (TTS) — cihazın TextToSpeech motoru.
 *
 * ÖNEMLİ dayanıklılık: eskiden `setDefaultLanguage("de-DE")` başarısız olursa
 * (cihazda Almanca ses verisi yoksa) TÜM TTS kapanıyordu. Artık motor varsa
 * TTS AÇIK kalır; Almanca ayrı denenir, yoksa ses verisi kurulumu istenir ama
 * konuşma yine de yapılır. Motor hiç yoksa sessizce devre dışı kalır.
 *
 * GERÇEK ses: okuma önce Edge KÖPRÜSÜ'nden geçer (lib/ttsBridge → /api/tts),
 * yani web'le BİREBİR aynı Katja/Conrad/Leni/Jan çalar. Köprü hazır değilse
 * (yükleniyor/çevrimdışı) cihaz TTS'ine düşülür ve seçilen sesin dil+cinsiyet
 * en yakını cihazda uygulanır. Tercih `lernomi-voice`'ta ve profiles.voice'ta.
 */
const VOICE_KEY = "lernomi-voice";
let ready: Promise<boolean> | null = null;
/** Cihaz TTS'i hedef dilde konuşmaya hazır mı (dil paketi kurulu mu). */
export let targetReady = false;

let currentCourse = "de";
let currentVoice: VoiceId = defaultVoice("de");
let voiceLoaded = false;

/** Cihaz seslerinin bir kez okunan listesi (react-native-tts Voice tipi). */
type DeviceVoice = Awaited<ReturnType<typeof Tts.voices>>[number];
let deviceVoices: DeviceVoice[] | null = null;
const deviceVoiceCache = new Map<VoiceId, string | null>();

async function init(): Promise<boolean> {
  try {
    await Tts.getInitStatus();
  } catch {
    return false;
  }
  try {
    // Hedef dil kurstan geliyor (de-DE / de-CH / en-US); sabit "de-DE" yazılıydı
    // ve İngilizce kursta cihaz yanlış dil paketini hazırlardı.
    await Tts.setDefaultLanguage(speechLocaleOf(currentCourse));
    targetReady = true;
  } catch {
    targetReady = false;
    try { (Tts as { requestInstallData?: () => void }).requestInstallData?.(); } catch { /* yut */ }
  }
  await applyRate(deviceRate(false));
  try { (Tts as { setIgnoreSilentSwitch?: (v: string) => void }).setIgnoreSilentSwitch?.("ignore"); } catch { /* yut */ }
  try {
    deviceVoices = await Tts.voices();
  } catch { deviceVoices = null; }
  return true;
}

export function ttsAvailable(): Promise<boolean> {
  if (!ready) ready = init();
  return ready;
}

/** Saklı ses tercihini yükler (uygulama açılışında bir kez). */
export async function loadVoicePref(course?: string): Promise<VoiceId> {
  if (course) { currentCourse = course; setCurrentCourse(course); }
  if (!voiceLoaded) {
    try {
      const saved = await AsyncStorage.getItem(VOICE_KEY);
      // Kurs bilinmeden yükleniyorsa kayıtlı seçime GÜVEN (kaydederken zaten
      // kursa göre doğrulanmıştı); kurs verildiyse ona göre doğrula.
      currentVoice = course
        ? resolveVoice(course, saved)
        : (VOICES.find((v) => v.id === saved)?.id ?? defaultVoice(currentCourse));
    } catch { currentVoice = defaultVoice(currentCourse); }
    voiceLoaded = true;
  } else if (course) {
    currentVoice = resolveVoice(course, currentVoice);
  }
  return currentVoice;
}

/** Ses tercihini ayarlar + saklar (profil seçimi buradan geçer). */
export async function setVoicePref(course: string, voice: VoiceId): Promise<void> {
  currentCourse = course;
  setCurrentCourse(course);
  currentVoice = resolveVoice(course, voice);
  voiceLoaded = true;
  try { await AsyncStorage.setItem(VOICE_KEY, currentVoice); } catch { /* yut */ }
}

export function currentVoiceId(): VoiceId {
  return currentVoice;
}

/**
 * Bir Edge ses id'sini cihazın en yakın sesine eşleştirir: önce dil (de-DE /
 * de-CH → yoksa de-DE), sonra cinsiyet (ad/kimlik ipucu ya da ≥2 aday varsa
 * konumsal). Bulunamazsa null → cihaz varsayılan dili kullanır.
 */
function deviceVoiceFor(voice: VoiceId): string | null {
  if (deviceVoiceCache.has(voice)) return deviceVoiceCache.get(voice) ?? null;
  if (!deviceVoices?.length) { deviceVoiceCache.set(voice, null); return null; }
  const lang = langOf(voice);
  const usable = deviceVoices.filter((v) => !v.notInstalled && v.language);
  let cands = usable.filter((v) => v.language!.toLowerCase().startsWith(lang.toLowerCase()));
  if (!cands.length && lang === "de-CH") cands = usable.filter((v) => v.language!.toLowerCase().startsWith("de"));
  if (!cands.length) { deviceVoiceCache.set(voice, null); return null; }
  cands = [...cands].sort((a, b) => (b.quality ?? 0) - (a.quality ?? 0));
  const female = voice.includes("Katja") || voice.includes("Leni") || voice.includes("Emel");
  const FEM = /(-x-[a-z]*f|female|femal|katja|hedda|leni|klara|amala|maja|-f-|women)/i;
  const MAL = /(-x-[a-z]*m|male|conrad|jan|bern|kilian|-m-|men)/i;
  const want = female ? FEM : MAL;
  const byName = cands.find((v) => want.test(`${v.id} ${v.name ?? ""}`));
  const picked = byName ?? (cands.length > 1 ? cands[female ? 0 : 1] : cands[0]);
  deviceVoiceCache.set(voice, picked.id);
  return picked.id;
}

/**
 * HIZ ANDROID'DE AYRICA KURULUYOR.
 *
 * `react-native-tts` Android'de `speak()`e verilen `rate` parametresini hiç
 * okumuyor (`TextToSpeechModule.speak` yalnız ses/akış/pan alıyor); hız
 * yalnız `setDefaultRate` ile değişiyor. Açılışta bir kez normal hız
 * kuruluyordu ve sonra hiç değişmiyordu: dinleme ekranındaki "Yavaş" düğmesi
 * Android'de hiçbir şey yapmıyordu. iOS `rate`i okuyor, orada zararsız.
 */
let appliedRate: number | null = null;
async function applyRate(rate: number): Promise<void> {
  if (appliedRate === rate) return;
  try { await Tts.setDefaultRate(rate); appliedRate = rate; } catch { /* yut */ }
}

async function applyVoice(voice: VoiceId): Promise<string> {
  const lang = langOf(voice);
  try { await Tts.setDefaultLanguage(lang); } catch { /* de-CH cihazda yoksa yut */ }
  const id = deviceVoiceFor(voice);
  if (id) { try { await Tts.setDefaultVoice(id); } catch { /* de-CH/ses yoksa yut */ } }
  return id ?? "";
}

/**
 * Okumayı keser — köprü de cihaz TTS'i de. Dinleme oynatıcısı bölüm bölüm
 * çalarken kullanıcı durdurunca ya da ekrandan çıkınca çağrılıyor.
 */
export function stopSpeaking(): void {
  speakSeq++;
  try { bridgeStop(); } catch { /* yut */ }
  try { stopServerTts(); } catch { /* yut */ }
  try { Tts.stop(); } catch { /* yut */ }
}

/**
 * SEÇİLEN SES YERİNE CİHAZ SESİ YOK.
 *
 * Köprü hazır değilken (açılışın ilk saniyeleri, girişten sonra yeniden
 * kurulurken, iki hatadan sonra) okuma doğrudan cihazın kendi sesine
 * gidiyordu: kullanıcı Katja'yı seçmişken bazen iPhone'un sesi konuşuyordu
 * ("hiç hoş değil"). Artık aynı nöral ses NATIVE oynatıcıyla çalıyor
 * (`speakServerTts`: `/api/tts` MP3'ü, oturum çereziyle — yürüyüş modunun
 * ekran kapalıyken zaten kullandığı yol). Cihaz sesi yalnız sunucuya HİÇ
 * ulaşılamıyorsa: çevrimdışı çalışan derste sessizlikten iyi.
 */
let speakSeq = 0;
/** Native oynatıcıda süren bir okuma var mı (köprüye geçerken kesmek için). */
let nativePlaying = false;
let probe = { at: 0, online: true };
async function serverUnreachable(): Promise<boolean> {
  if (Date.now() - probe.at < 30_000) return !probe.online;
  let online = true;
  try {
    await fetchWithTimeout(`${API_BASE}/api/config`, { timeoutMs: 2500 });
  } catch {
    online = false;
  }
  probe = { at: Date.now(), online };
  return !online;
}

/**
 * Metni seslendirir (fire-and-forget). Ses/hız kullanıcı tercihinden; `opts.voice`
 * verilirse onu kullanır (ön izleme), `opts.slow` telaffuz için yavaşlatır.
 */
/**
 * Okunacak metnin sadeleştirilmesi — web `lib/tts/edge` `cleanForSpeech`ün eşi.
 *
 * Parantezli açıklamalar (Hochdeutsch karşılıkları) ve eğik çizgiyle ayrılmış
 * seçenekler ekranda anlamlı ama sesli okunduğunda cümleyi bozuyor. Boşluk
 * doldurma çizgisi ("_____") ise düpedüz yanlış okunuyordu: motor onu "alt
 * tire alt tire alt tire" diye seslendiriyor ve cümlenin kendisi kayboluyordu.
 *
 * Kural webde baştan beri vardı, mobilde HİÇ yoktu: aynı cümle iki
 * uygulamada iki farklı şey olarak okunuyordu.
 */
export function cleanForSpeech(text: string): string {
  return text
    // İsteğe bağlı ön ek birleşiyor: "(Back-)Ofen" → "Backofen", "Ofen" değil (web ile aynı).
    .replace(/\((\p{L}+)-\)\s*(\p{L}?)/gu, (_, pre: string, head: string) => pre + head.toLowerCase())
    .replace(/\(.*?\)/g, "")
    .replace(/_{2,}/g, " ")
    .replace(/[/–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function speakTarget(text: string, opts?: { slow?: Pace | boolean; voice?: VoiceId }): void {
  const clean = cleanForSpeech(text);
  if (!clean) return;
  /* HANGİ EKRANDA SES DİNLENİYOR — ekran başına bir kez. Web aynı olayı aynı
     adla yazıyor (`speak-button` `trackOnce("tts_play", 0, ekran)`); Android
     hiç yazmıyordu, yani panelde ses kullanımı yalnız webden görünüyordu ve
     "sesi kimse kullanmıyor" gibi okunuyordu. Her kelimede değil ekran
     başına: yoksa sayı ölçüm değil gürültü olur. */
  trackOnce("tts_play", 0, navigationRef.isReady() ? (navigationRef.getCurrentRoute()?.name ?? "?") : "?");
  const voice = opts?.voice ?? currentVoice;
  // Önce Edge köprüsü (web ile birebir aynı ses); hazır değilse aynı ses native
  // oynatıcıdan; ikisi de yoksa ve sunucuya ulaşılamıyorsa cihaz TTS'i.
  if (bridgeReady()) {
    // Köprü hazırlanırken native yoldan başlamış bir okuma sürüyor olabilir: üst üste binmesin.
    if (nativePlaying) { stopServerTts(); nativePlaying = false; }
    bridgeSpeak(voice, clean, opts?.slow ?? false);
    return;
  }
  const seq = ++speakSeq;
  nativePlaying = true;
  try { Tts.stop(); } catch { /* yut */ }
  void speakServerTts(voice, clean, opts?.slow ?? false).then(async (played) => {
    if (seq === speakSeq) nativePlaying = false;
    if (played || seq !== speakSeq || !(await serverUnreachable())) return;
    const ok = await ttsAvailable();
    if (!ok || seq !== speakSeq) return;
    const rate = deviceRate(opts?.slow);
    try {
      Tts.stop();
      const iosVoiceId = await applyVoice(voice);
      await applyRate(rate);
      Tts.speak(clean, {
        androidParams: { KEY_PARAM_PAN: 0, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: "STREAM_MUSIC" },
        rate,
        iosVoiceId,
      });
    } catch { /* yut */ }
  });
}

/** Ön izleme: belirli bir sesi hemen çalar (profil seçim ekranı). */
export function speakWithVoice(text: string, voice: VoiceId): void {
  speakTarget(text, { voice });
}

/**
 * Metni belirtilen dilde seslendirir ve BİTİNCE resolve olur — yürüyüş modunun
 * sıralaması için (önce konuş, sonra dinle). Almanca ise kullanıcı sesini
 * uygular; Türkçe (anlatım) sabit.
 */
/**
 * Belirli bir SESLE seslendirir ve BİTİNCE resolve olur (yürüyüş modu). Önce Edge
 * köprüsü — web'le birebir: Türkçe ipucu Emel, Almanca cevap kullanıcının seçtiği
 * Katja/Conrad. Köprü hazır değilse cihaz TTS'ine düşer (dil sesten türetilir).
 */
export async function speakAndWaitVoiced(text: string, voice: VoiceId, opts?: { slow?: Pace | boolean; onStart?: () => void }): Promise<void> {
  if (!text) return;
  if (bridgeReady()) {
    if (nativePlaying) { stopServerTts(); nativePlaying = false; }
    await bridgeSpeakAndWait(voice, text, opts?.slow ?? false, opts?.onStart);
    return;
  }
  opts?.onStart?.();
  // Köprü yoksa aynı nöral ses native oynatıcıdan (bkz. `stopSpeaking` üstündeki not).
  const seq = ++speakSeq;
  if (await speakServerTts(voice, text, opts?.slow ?? false)) return;
  if (seq !== speakSeq || !(await serverUnreachable())) return;
  // Yerel kod sesin id'sinden türüyor (langOf); eskiden "tr değilse de-DE"
  // yazılıydı ve İngilizce ses Almanca okunurdu.
  await speakAndWait(text, langOf(voice), { slow: opts?.slow, voice });
}

/**
 * @param lang Okunacak yerel kod. Varsayılan, kursun hedef dili — anlatım
 * (Türkçe) için çağıran açıkça "tr-TR" geçer.
 */
export function speakAndWait(text: string, lang: string = speechLocaleOf(currentCourse), opts?: { slow?: Pace | boolean; voice?: VoiceId }): Promise<void> {
  return new Promise((resolve) => {
    void ttsAvailable().then(async (ok) => {
      if (!ok || !text) { resolve(); return; }
      let done = false;
      let sub: { remove?: () => void } | undefined;
      const guard = setTimeout(() => finish(), 9000);
      function finish() { if (done) return; done = true; clearTimeout(guard); try { sub?.remove?.(); } catch { /* yut */ } resolve(); }
      try { sub = Tts.addEventListener("tts-finish", finish) as unknown as { remove?: () => void }; } catch { /* yut */ }
      try {
        Tts.stop();
        // Hedef dilde kullanıcının seçtiği ses uygulanır; anlatım (Türkçe)
        // sabit olduğu için yalnız dil ayarlanır. Ayrım artık "de-DE mi"
        // diye değil, "anlatım dili mi" diye yapılıyor — böylece İngilizce
        // kursta da kullanıcının sesi çalıyor.
        let iosVoiceId = "";
        if (lang !== "tr-TR") {
          iosVoiceId = await applyVoice(opts?.voice ?? currentVoice);
        } else {
          await Tts.setDefaultLanguage(lang).catch(() => {});
        }
        const rate = deviceRate(opts?.slow);
        await applyRate(rate);
        Tts.speak(text, { androidParams: { KEY_PARAM_PAN: 0, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: "STREAM_MUSIC" }, rate, iosVoiceId });
      } catch { finish(); }
    });
  });
}
