import Tts from "react-native-tts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { trackOnce } from "./track";
import { navigationRef } from "./pushRoute";
import { type Pace, type Pitch, type VoiceId, VOICES, resolveVoice, defaultVoice, conversationVoice, langOf, deviceRate } from "./voices";
import { splitForSpeech } from "./ttsText";
import { dialogueCast } from "./speakers";
import { speechLocaleOf, setCurrentCourse } from "./courses";
import { bridgePrefetch, bridgeReady, bridgeSpeak, bridgeSpeakAndWait, bridgeStop } from "./ttsBridge";
import { nativeDelay, speakServerTts, stopServerTts } from "./stt";
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
      // Eski bir Edge seçimi (Katja/Conrad…) kayıtlıysa cinsiyetine göre Defne/Aras'a çevriliyor.
      currentVoice = course
        ? resolveVoice(course, saved)
        : (VOICES.find((v) => v.id === saved)?.id ?? resolveVoice(currentCourse, saved));
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
  const female = voice.includes("Katja") || voice.includes("Leni") || voice.includes("Emel") || voice.includes("Defne");
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
  dialogueSeq++;
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
 * ulaşılamıyorsa: çevrimdışı çalışan konuşmada sessizlikten iyi.
 */
let speakSeq = 0;
/**
 * DİYALOG döngüsünün ayrı iptal jetonu.
 *
 * `speakSeq` tek başına yetmiyor: `speakAndWaitVoiced` kendi jetonunu alıyor
 * (`++speakSeq`) ve onu bekleyen dış döngünün jetonunu geçersizleştiriyor.
 * İki ayrı şey iki ayrı sayaçla izleniyor — biri TEK bir okumanın, öteki
 * REPLİK ZİNCİRİNİN iptali. `stopSpeaking` ikisini birden artırıyor; yeni bir
 * `speakTarget` ya da `speakDialogue` da zinciri kesiyor, çünkü ortada tek bir
 * ses kanalı var ve araya giren okuma zaten üstüne biner.
 */
let dialogueSeq = 0;
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

/* Temizleme ve BÖLME kuralı `ttsText`te, webin `lib/tts/text`iyle birebir
   aynı kopya (parite `npm run check:tts` 4. bölümde). Burada ayrı bir kopyası
   vardı ve `speakAndWaitVoiced` onu HİÇ çağırmıyordu: cihaz sesine düşülen her
   okumada "_____" yeniden "alt tire alt tire alt tire" diye okunuyordu. */
export { cleanForSpeech } from "./ttsText";

/**
 * Metni seslendirir (fire-and-forget). Ses/hız kullanıcı tercihinden;
 * `opts.voice` verilirse onu kullanır (ön izleme ve diyalog kadrosu),
 * `opts.slow` telaffuz için yavaşlatır, `opts.pitch` konuşmacıyı ayırır.
 */
export function speakTarget(
  text: string,
  opts?: {
    slow?: Pace | boolean;
    voice?: VoiceId;
    pitch?: Pitch;
    /**
     * KELİME KATMANI — günlük tur, pratik, yürüyüş, kelime listesi. Adres `k=w` taşıyor ve sunucu metni
     * yalnız seçilen karakterin (Defne/Aras) önceden üretilmiş dosyasından veriyor; tabloda yoksa okuma
     * atlanıyor. Edge'e de cihaz sesine de düşülmüyor (Samet'in kararı, 2026-09-23; web `speakWord`).
     */
    word?: boolean;
  },
): void {
  /*
    UZUN METİN BÖLÜNÜYOR — bu yol eskiden sessizliğe çıkıyordu.

    Metin olduğu gibi tek istekte gidiyordu ve uç 600 karakterin üstünü 400
    `bad_text` ile REDDEDİYOR, kırpmıyor. Ölçüldü: 120 okuma alıştırmasının
    85'i (en uzunu 2245 karakter) "Sesli oku"ya basıldığında hiç ses
    vermiyordu — üstelik zararsız da değildi: köprü iki hatadan sonra
    "sağlıksız" sayılıp OTURUMUN GERİ KALANINI cihaz sesine düşürüyordu, yani
    bir uzun metin bütün uygulamanın sesini bozuyordu. Konuşma anlatımının
    birleştirilmiş replikleri, sohbet cevapları ve seviye tespitinin
    birleştirilmiş bölümleri de aynı tavana açıktı.

    Kısa metinler — kelime turu, tek cümle, yani çağrıların ezici çoğunluğu —
    tek parça kalıyor ve eski yoldan gidiyor: adres birebir aynı, ısınmış
    önbellek girdilerinin hiçbiri boşa düşmüyor.
  */
  const parts = splitForSpeech(text);
  if (!parts.length) return;
  /* HANGİ EKRANDA SES DİNLENİYOR — ekran başına bir kez. Web aynı olayı aynı
     adla yazıyor (`speak-button` `trackOnce("tts_play", 0, ekran)`); Android
     hiç yazmıyordu, yani panelde ses kullanımı yalnız webden görünüyordu ve
     "sesi kimse kullanmıyor" gibi okunuyordu. Her kelimede değil ekran
     başına: yoksa sayı ölçüm değil gürültü olur. */
  /* Rota bilinmiyorsa "unknown": "?" `kind` biçim denetiminden geçmiyor ve olay
     etiketsiz yazılıyordu (sunucu `cleanKind`). */
  trackOnce("tts_play", 0, navigationRef.isReady() ? (navigationRef.getCurrentRoute()?.name ?? "unknown") : "unknown");
  const voice = opts?.voice ?? currentVoice;
  // Süren bir replik zinciri varsa kesiliyor: tek ses kanalı var, araya giren
  // okuma zaten üstüne binerdi ve zincir arkasından devam ederdi.
  dialogueSeq++;
  if (parts.length === 1) {
    speakOne(parts[0], voice, opts?.slow ?? false, opts?.pitch ?? "mid", opts?.word ?? false);
    return;
  }
  /* Çok parçalı metin `speakAndWaitVoiced`e devrediliyor: köprüde tek bir
     `Audio` nesnesi var ve ikinci çağrı birincisini keser, yani parçalar
     beklenerek zincirlenmek ZORUNDA — ve o işlev zaten tam bunu yapıyor.
     Burada ikinci bir zincir yazmak aynı mantığın iki kopyası olurdu. */
  void speakAndWaitVoiced(text, voice, { slow: opts?.slow, pitch: opts?.pitch, word: opts?.word });
}

/** Tek parçanın çalınması — köprü → native → cihaz sesi. */
function speakOne(clean: string, voice: VoiceId, slow: Pace | boolean, pitch: Pitch, word = false): void {
  // Önce Edge köprüsü (web ile birebir aynı ses); hazır değilse aynı ses native
  // oynatıcıdan; ikisi de yoksa ve sunucuya ulaşılamıyorsa cihaz TTS'i.
  if (bridgeReady()) {
    // Köprü hazırlanırken native yoldan başlamış bir okuma sürüyor olabilir: üst üste binmesin.
    if (nativePlaying) { stopServerTts(); nativePlaying = false; }
    bridgeSpeak(voice, clean, slow, pitch, word);
    return;
  }
  const seq = ++speakSeq;
  nativePlaying = true;
  try { Tts.stop(); } catch { /* yut */ }
  void speakServerTts(voice, clean, slow, pitch, word).then(async (played) => {
    if (seq === speakSeq) nativePlaying = false;
    // Kelime katmanı cihaz sesine hiç düşmüyor: seçilen karakter çalamıyorsa ses yok.
    if (played || word || seq !== speakSeq || !(await serverUnreachable())) return;
    const ok = await ttsAvailable();
    if (!ok || seq !== speakSeq) return;
    const rate = deviceRate(slow);
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
export function speakWithVoice(text: string, voice: VoiceId, word = false): void {
  // Karakter sesinin önizlemesi kelime katmanından bir cümle: Defne'yi seçtiren ekran Defne'nin kendi sesini çalmalı.
  speakTarget(text, { voice, word });
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
export async function speakAndWaitVoiced(
  text: string,
  voice: VoiceId,
  opts?: {
    slow?: Pace | boolean;
    onStart?: () => void;
    pitch?: Pitch;
    /**
     * Köprüyü ATLA, doğrudan native oynatıcıya git.
     *
     * Ekran kapalıyken WebView ses odağını bırakıp duraklıyor: köprü "hazır"
     * diyor ama hiçbir şey çalmıyor ve "end" mesajı da gelmiyor. Yürüyüş
     * modu bu yüzden ekran kapalıyken `speakServerTts`i DOĞRUDAN çağırıyordu
     * — ve o yol temizlemeyi de bölmeyi de atlıyordu: ham metin adrese
     * giriyor (aynı cümle için ikinci bir önbellek girdisi) ve 600 karakteri
     * aşan bir anlatım 400 ile reddedilip sessiz kalıyordu. Tam da ekranın
     * kapalı olduğu, yani sessizliğin en pahalı olduğu yerde.
     */
    native?: boolean;
    /** Kelime katmanı (yürüyüş modunun hedefi ve anlamı): yalnız Defne/Aras dosyası, cihaz sesine düşüş yok. */
    word?: boolean;
    /** Karakter anlatımı (yürüyüş yönergeleri): dosya varsa karakterin sesi, yoksa Edge karşılığı (`k=n`). */
    narration?: boolean;
  },
): Promise<void> {
  const kind: boolean | "n" = opts?.word ? true : opts?.narration ? "n" : false;
  /*
    İKİ HATA BİRDEN BURADAYDI.

    1. TEMİZLEME HİÇ UYGULANMIYORDU. `speakTarget` metni `cleanForSpeech`ten
       geçiriyordu, burası geçirmiyordu. Sunucu kendi kopyasıyla yeniden
       temizlediği için köprü ve native yollar kurtuluyordu ama CİHAZ SESİNE
       düşülen her okumada ham metin gidiyordu: "_____" yeniden "alt tire alt
       tire alt tire" diye okunuyordu. Dinleme oynatıcısı, deneme sınavı,
       eller serbest konuşma ve yürüyüş modu bu yoldan geçiyor.
    2. UZUNLUK SINIRI YOKTU. 600 karakterin üstü 400 dönüyor, yani ses hiç
       çıkmıyordu; üstelik köprü iki hatadan sonra oturum boyu sağlıksız
       sayılıyordu.
  */
  const parts = splitForSpeech(text);
  if (!parts.length) return;
  /*
    ÇOK PARÇALI METİN PEŞİN İNDİRİLİYOR.

    Mobilde boru hattı yok: parça i bitmeden i+1 istenmiyor, yani her sınır
    tam bir gidiş-dönüş. Sekiz parçalık bir okuma parçasında bu, metnin
    içine serpiştirilmiş beş saniyelik bir bekleme demek. Hepsini baştan
    indirmek o beklemeyi tamamen kaldırıyor — indirme köprünün İÇİNDE, yani
    çalacak olan `Audio` ile aynı HTTP önbelleğine yazılıyor.

    Tek parçalık metinde çağrılmıyor: zaten hemen çalınacak olan tek adresi
    bir de ayrıca istemek işi hızlandırmaz, yalnız ikinci bir istek açardı.
  */
  if (parts.length > 1 && !opts?.native) {
    bridgePrefetch(parts.map((t) => ({ voice, text: t, slow: opts?.slow ?? false, pitch: opts?.pitch, word: kind })));
  }
  const seq = ++speakSeq;
  /*
    DÜŞEN BİR PARÇA ZİNCİRİN KALANINI İPTAL ETMİYOR — ama sonsuza kadar da
    denemiyor.

    Bölme gelmeden önce bir metin TEK istekti: ya çalardı ya çalmazdı. Şimdi
    N istek var ve herhangi biri düşerse "kalanı da boş ver" demek, tek bir
    ağ hıçkırığının bütün okuma parçasını susturması demek olurdu. Web'in
    ses öğesi zinciri de düşen parçayı atlayıp devam ediyor
    (`chainWithElements` → `next()`), yani bu aynı zamanda parite.

    Üst üste iki düşüşte bırakılıyor: native oynatıcının tavanı 8 saniye ve
    her parçayı ayrı ayrı denemek (örneğin oturum düştüyse hepsi düşer)
    kullanıcıyı dakikalarca sessizlikte bekletirdi.
  */
  let ardarda = 0;
  for (let i = 0; i < parts.length; i++) {
    if (seq !== speakSeq) return;
    const first = i === 0;
    if (!opts?.native && bridgeReady()) {
      if (nativePlaying) { stopServerTts(); nativePlaying = false; }
      await bridgeSpeakAndWait(voice, parts[i], opts?.slow ?? false, first ? opts?.onStart : undefined, opts?.pitch, kind);
      continue;
    }
    if (first) opts?.onStart?.();
    // Köprü yoksa aynı nöral ses native oynatıcıdan (bkz. `stopSpeaking` üstündeki not).
    if (await speakServerTts(voice, parts[i], opts?.slow ?? false, opts?.pitch ?? "mid", kind)) { ardarda = 0; continue; }
    if (seq !== speakSeq) return;
    // Kelime katmanı cihaz sesine düşmüyor: parça atlanıyor (bkz. `speakTarget` `word`).
    if (opts?.word) continue;
    if (await serverUnreachable()) {
      // Yerel kod sesin id'sinden türüyor (langOf); eskiden "tr değilse de-DE"
      // yazılıydı ve İngilizce ses Almanca okunurdu.
      await speakAndWait(parts[i], langOf(voice), { slow: opts?.slow, voice });
      ardarda = 0;
      continue;
    }
    if (++ardarda >= 2) return;
  }
}

/** Diyalog repliği — kadro sesiyle birlikte, `speakDialogue`ın birimi. */
export type DialogueTurnAudio = { speaker?: string; text: string };

/**
 * Konuşmacı değişiminde bırakılan pay (ms) — sıra geçişinin duyulması için.
 * Web karşılığı `speak-button` `SPEAKER_GAP` (0,38 sn).
 */
const SPEAKER_GAP_MS = 380;

/**
 * Bir diyaloğu konuşmacı başına AYRI SESLE, sırayla okur.
 *
 * NEDEN. İçerik modeli konuşmacıyı taşıyor (`{ speaker?, text }`) ve etiket
 * ekranda gösteriliyordu ama ses tarafı onu okumuyordu: iki kişilik bir
 * konuşma tek ağızdan çalıyordu, yani dinleme alıştırmasının ölçtüğü asıl iş
 * (kimin ne dediğini ayırmak) kulakla yapılamıyordu. Deneme sınavı ekranı
 * sesleri döndürmeyi deniyordu ama `voicesFor` kurs başına yalnız İKİ ses
 * veriyor; üçüncü konuşmacı birincinin sesine sarıyordu. `dialogueCast` altı
 * konuşmacıya kadar ayrı ses (gerekirse perde kaydırmasıyla) veriyor.
 *
 * Kadro kullanıcının ses TERCİHİNE bakmıyor — gerekçe webdekiyle aynı: sabit
 * kadro bir diyaloğu bütün kullanıcılarda tek önbellek girdisi yapıyor.
 *
 * `onSegment` hangi repliğin okunduğunu bildiriyor (transkript vurgusu).
 * Dönüş, diyalog bittiğinde ya da `stopSpeaking()` çağrıldığında çözülüyor.
 */
export async function speakDialogue(
  course: string,
  segments: DialogueTurnAudio[],
  opts?: { slow?: boolean; onSegment?: (i: number) => void; onStart?: () => void },
): Promise<void> {
  const cast = dialogueCast(course, segments);
  const pace: Pace = opts?.slow ? "listenSlow" : "listen";
  const run = ++dialogueSeq;
  let previous = "";
  for (let i = 0; i < segments.length; i++) {
    if (run !== dialogueSeq) return;
    // Pay yalnız konuşmacı GERÇEKTEN değiştiğinde: aynı kişinin iki cümlesi
    // arasına sıra geçişi payı koymak konuşmayı kekeletirdi.
    const who = segments[i].speaker ?? "";
    if (i > 0 && who !== previous) await nativeDelay(SPEAKER_GAP_MS);
    previous = who;
    if (run !== dialogueSeq) return;
    opts?.onSegment?.(i);
    await speakAndWaitVoiced(segments[i].text, cast[i].voice, {
      slow: pace,
      pitch: cast[i].pitch,
      onStart: i === 0 ? opts?.onStart : undefined,
    });
  }
}

/** Paragraflar arasına konan pay (ms) — web `reading-player` ile aynı (0,5 sn). */
const PARAGRAPH_GAP_MS = 500;

/**
 * Uzun bir okuma parçasını PARAGRAF PARAGRAF okur — web `reading-player`in eşi.
 *
 * `speakTarget(text)` ile aynı şey değil ve olmamalı, çünkü webdeki düğme üç
 * şeyi birden yapıyor: paragrafı parça sınırı sayıyor (tek dizgeye eklenseydi
 * paragraf geçişi hiç duyulmazdı), dinleme hızını kullanıyor ve sesi metnin
 * dilinden SABİT seçiyor. Mobil yalnız `speakTarget(text)` çağırıyordu: hız
 * varsayılan (−%8 yerine −%20 olmalı) ve bölme sınırları farklıydı — yani aynı
 * parça iki platformda hiç kesişmeyen iki önbellek kümesi üretiyordu
 * (2 245 karakterlik bir metinde ~8+8 ayrı sentez).
 *
 * Ses seçilen karakterin Edge karşılığı (`conversationVoice`, web ile aynı): Defne → Katja/Jenny, Aras →
 * Conrad/Guy. Eskiden sabitti (tek önbellek girdisi); kelimede Aras, okumada kadın ses karışıklığı yüzünden
 * 2026-09-25'te karaktere bağlandı.
 */
export async function speakPassage(text: string, course: string, opts?: { slow?: boolean }): Promise<void> {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (!paragraphs.length) return;
  // Seçilen karakterin Edge karşılığı (web `conversationVoice`): okuma katmanı henüz kendi sesimizle üretilmedi.
  const voice = conversationVoice(course, currentVoice);
  const pace: Pace = opts?.slow ? "listenSlow" : "listen";
  // Bütün parçalar peşin: boru hattı yok, her paragraf sınırı yoksa bir
  // gidiş-dönüş olurdu.
  bridgePrefetch(paragraphs.flatMap((para) => splitForSpeech(para).map((t) => ({ voice, text: t, slow: pace }))));
  const run = ++dialogueSeq;
  for (let i = 0; i < paragraphs.length; i++) {
    if (run !== dialogueSeq) return;
    if (i > 0) await nativeDelay(PARAGRAPH_GAP_MS);
    if (run !== dialogueSeq) return;
    await speakAndWaitVoiced(paragraphs[i], voice, { slow: pace });
  }
}

/**
 * Diyaloğun seslerini ÇALMADAN indirir — ekran açılır açılmaz.
 *
 * Mobilde ön indirme hiç yoktu: replikler tek tek çalınıyor ve her sınırda
 * tam bir gidiş-dönüş oluyordu. Çalmayla AYNI kadrodan ve aynı hızdan
 * geçiyor, yoksa ısınan adres çalınacak adres olmazdı.
 */
export function prefetchDialogue(course: string, segments: DialogueTurnAudio[], slow = false): void {
  const cast = dialogueCast(course, segments);
  const pace = (slow ? "listenSlow" : "listen") as Pace;
  /*
    BÖLME ÖN İNDİRMEYE DE UYGULANIYOR.

    Burada metin yalnız `cleanForSpeech`ten geçiyordu ve uzun bir replik
    (içerikte 25 tane var, en uzunu 1 301 karakter) TEK parça olarak
    ısıtılıyordu — oysa çalma onu böler. Isınan adres hiç istenmeyen bir
    adres olurdu; üstelik uç onu 400 ile reddettiği için istek de boşa
    giderdi. Çalma neyi istiyorsa ön indirme de onu istemek zorunda.
  */
  bridgePrefetch(
    segments.flatMap((seg, i) =>
      splitForSpeech(seg.text).map((text) => ({ voice: cast[i].voice, text, slow: pace, pitch: cast[i].pitch })),
    ),
  );
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
