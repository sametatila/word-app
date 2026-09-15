import React, { useCallback, useEffect, useRef, useState } from "react";
import { t as tx } from "../lib/i18n";
import { View, Animated, Easing, Linking, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronRightIcon, WalkIcon, MicIcon, CheckIcon, XIcon, ShareIcon, SpeakerIcon, SparkIcon, RepeatIcon, InboxIcon } from "../ui/icons";
import { FlowScreen, FlowTopBar, FlowActions, FlowNote, ResultHero, StatRow, CoverBody, StateBody } from "../ui/flow";
import { track } from "../lib/track";
import { shareResult } from "../lib/share";
import { fetchSession, submitAnswers, todayStr, type AnswerOut, type Round } from "../game/session";
import { useAuth } from "../lib/AuthContext";
import { speakAndWaitVoiced, currentVoiceId } from "../lib/tts";
import { bridgeReady, bridgeStop } from "../lib/ttsBridge";
import { usePremiumStatus, notePremiumGate } from "../lib/premium";
import { narrationVoice } from "../lib/voices";
import { currentLang, nativeLangName, targetLangName, formatPercent } from "../lib/i18n";
import { ensureMicPermission, ensureWalkNotificationPermission, listenOnce, stopListening, setKeepAwake, azureListenOnce, startWalkService, stopWalkService, onScreenState, onWalkStop, onWalkServiceFailed, speakServerTts, stopServerTts, nativeDelay, nativeHttpGet } from "../lib/stt";
import { currentTargetLocale } from "../lib/courses";
import { API_BASE } from "../api/client";
import { spokenMatches, parseSkip, skipWord, encourage, parseConfirm } from "../lib/voiceMatch";
import { sfx, setSfxScreenOff, sfxDurationMs } from "../lib/sfx";
import { bumpStats } from "../lib/statsSignal";
import { haptic } from "../lib/haptics";
import { reduceMotion } from "../lib/reduceMotion";
import { useTheme, spacing, radii, softShadow, fillOf } from "../theme";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";
import { MicDisclosure, type MicDisclosureMode } from "../ui/MicDisclosure";
import { hasMicConsent, setMicConsent } from "../lib/micConsent";
import { decideAiConsent, fetchAiConsent, requestAiConsent, type AiConsentProcessor } from "../lib/aiConsent";

const withArtikel = (w: { artikel?: string | null; de: string }) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
const gap = (ms = 850) => nativeDelay(ms); // native (arka planda da çalışır; RN setTimeout ekran-kapalıda durur)
/* Azure'a gönderilen kayıt penceresi. Sabit yazılıydı ve iki yerde ayrı ayrı
   duruyordu; ölçüm (`walk_listen` değeri = gönderilen saniye) buna baktığı için
   tek ada bağlandı — pencere değişirse ölçü kendiliğinden onunla değişir. */
const AZURE_WINDOW_MS = 3000;

type Phase = "intro" | "teaching" | "speaking" | "listening" | "judging" | "continue" | "done" | "stopped" | "denied" | "error";
type Verdict = "correct" | "wrong" | "skip" | "unheard" | null;

/** Yürüyüş kelimesi — demo Word + oyunların gösterdiği İngilizce gloss (`en`). */
type Artikel = "der" | "die" | "das";
type WalkWord = { id: number; de: string; tr: string; artikel?: Artikel; en?: string | null };
/** Web walk turu: tek kelime + tür (intro = yeni kelimeyi öğret; speak = sor). */
type WalkRound = { word: WalkWord; kind: "intro" | "speak" };

// "Duyamadım" penceresi: son 4 turun 3'ü sessizse turu durdur (web ile aynı).
const UNHEARD_WINDOW = 4;
const UNHEARD_LIMIT = 3;

const mapWord = (w: { id: number; de: string; tr: string; artikel?: string | null; en?: string | null }): WalkWord =>
  ({ id: w.id, de: w.de, tr: w.tr, artikel: (w.artikel as Artikel | null) ?? undefined, en: w.en ?? null });
/* Süzgeç ile ünlem AYRI iki iddia: süzgeç değişirse ünlem sessizce yalan
   söylemeye başlar. Tek geçişte hem eleme hem dönüştürme yapılıyor. */
const mapRounds = (rs: Round[]): WalkRound[] =>
  rs.flatMap((r) => (r.word ? [{ word: mapWord(r.word), kind: r.game === "intro" ? "intro" as const : "speak" as const }] : []));

/**
 * Yürüyüş modu — web `components/walk-player.tsx` akışının birebir mobil karşılığı.
 *
 * Kuyruk: GET /api/session?walk=1 → tam ~20 tur, HER KELİME BİR KEZ (karışık oyun turu
 * değil; tekrar yok). Devam turu ?skip=<sorulanlar> ile gelir. İlerleme SRS üzerinden
 * paylaşılır (POST /api/answers) — walk session_state yazmaz, `progress` göndermez.
 *
 * Tur türleri:
 *  - intro (yeni kelime): SORULMAZ, öğretilir → sırayla "Yeni kelime." (Emel) → Almanca
 *    (Katja) → Türkçe anlam (Emel) → Almanca (Katja). Hemen ardından aynı kelimenin
 *    speak turu gelir ve sorar.
 *  - speak: yalnız Türkçe ipucu (Emel) → kullanıcı Almancayı SÖYLER (native STT) →
 *    doğru (ses + Almanca okunur) / yanlış ("Doğrusu:" + Almanca) / duyamadım
 *    ("Duyamadım." + Almanca). ASLA aynı kelime tekrar sorulmaz — sıradakine geçilir.
 *
 * Ekran çerçevesi Kelimelerine çalış ile aynı: sol X, orta ilerleme, sağ sayaç.
 */
/**
 * Cevap ve onay pencereleri — web `components/walk-player` ile AYNI SAYILAR.
 *
 * İkisi de zaten sekiz ve yedi saniyeydi, yani bugün ayrışma yoktu; kusur
 * sayının burada düz yazılı olmasıydı. Webde ikisi adıyla duruyor ve
 * gerekçeleri orada yazılı (kayıt konuşma bitince kapandığı için cömert
 * olabiliyor); burada adsız birer rakamdı, biri değişse öteki sessizce eski
 * kalırdı. Ad web'dekiyle birebir aynı, o yüzden ayrışmayı "ortak sayısal
 * sabitler" kapısı kendiliğinden yakalıyor.
 *
 * Ekran KAPALI yolun kendi penceresi var (`azureListenOnce`, 4000): orada VAD
 * yok, sabit pencere kaydediliyor ve webin böyle bir kipi hiç yok.
 */
const ANSWER_WINDOW_MS = 8000;
const CONFIRM_SILENCE_MS = 7000;

export function WalkModeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();

  const [rounds, setRounds] = useState<WalkRound[]>([]);
  const [idx, setIdx] = useState(0);
  const [curWord, setCurWord] = useState<WalkWord>({ id: 0, de: "", tr: "", en: null });
  const [phase, setPhase] = useState<Phase>("intro");
  /* Açıklama ekranı ve KİPİ: Android'de rıza (iki düğme), iOS'ta sistem izninden
     önceki tek düğmeli ekran, girişteki bağlantıda yalnız okuma (bkz. MicDisclosure). */
  const [disclosure, setDisclosure] = useState<MicDisclosureMode | null>(null);
  /* Android 13+'ta bildirim izni verilmediyse servis bildirimi görünmüyor; ekranda
     bunun ve nasıl durdurulacağının söylenmesi için (B23). */
  const [notifHidden, setNotifHidden] = useState(false);
  /* Açıklamada adları sayılan ses sağlayıcıları (sunucudan, politikanın tablosu). */
  const [voiceProcessors, setVoiceProcessors] = useState<AiConsentProcessor[] | null>(null);
  const [voiceProcessorsFailed, setVoiceProcessorsFailed] = useState(false);
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [heard, setHeard] = useState("");
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [noMore, setNoMore] = useState(false);
  const [bgUnavailable, setBgUnavailable] = useState(false);
  const [greeting, setGreeting] = useState(false); // Başla sonrası kısa TTS karşılama
  const screenOffRef = useRef(false); // ücretsiz yol güvenilmez → Azure (adı Android'den; aşağıdaki nota bak)

  /**
   * EKRAN KAPALI YOL PREMIUM. Sunucu `/api/stt`i `mode=walk` geldiğinde
   * `canPocketWalk` ile kapatıyor; ücretsiz katmanda günlük hak SIFIR, yani
   * ücretsiz bir hesapta bu yol HER ZAMAN 403 döner.
   *
   * Eskiden bu reddi kimse anlatmıyordu: `azureListenOnce` her hatayı `null`a
   * çeviriyor, tur da onu "duyamadım" diye okuyordu. Kullanıcı mikrofonunun
   * bozuk olduğunu sanıyordu — cihazda ölçüldü (2026-09-09): üç kelimede üç
   * kez 403, ekranda üç kez "duyamadım".
   */
  const { status: premium } = usePremiumStatus();
  const pocketGateRef = useRef<boolean | null>(null);
  const premiumToldRef = useRef(false);
  useEffect(() => {
    pocketGateRef.current = premium?.gates?.pocket_walk?.allowed ?? null;
  }, [premium]);
  /** Kapı KESİN kapalı mı (bilinmiyorsa false — bilmediğimiz için susmayız, deneriz). */
  const pocketGateClosed = () => pocketGateRef.current === false;
  const nativeListeningRef = useRef(false); // şu an native dinliyor mu (kesinti gelince hızlı kesmek için)
  const listenCut = useRef(false); // dinlemeyi BİZ kestik mi — boş sonuç kullanıcının sessizliği sayılmasın

  const runToken = useRef(0);
  const mounted = useRef(true);
  const startedAt = useRef(Date.now());
  const wordStart = useRef(Date.now());
  const unheardWin = useRef<boolean[]>([]);
  /**
   * Yürüyüşün bitiş SEBEBİ bir kez yazılıyor.
   *
   * Web `walk-player` bu olayı baştan beri yazıyor ve sözlükteki yorum sebebi
   * söylüyor: "yürüyüş nasıl bitti" sorusu ancak buradan cevaplanıyor, tahminle
   * değil. Mobil yalnız `walk_start` yazıyordu, yani Android tarafında hiçbir
   * yürüyüşün nasıl bittiği bilinmiyordu (bkz. web-parity §11.32).
   *
   * Kod tablosu websitesiyle aynı; bir kez yazılıyor çünkü bitiş yolları
   * birbirini çağırıyor (`askContinue` → `finishDone`).
   */
  const walkEnded = useRef(false);
  function endWalk(reason: number) {
    if (walkEnded.current) return;
    walkEnded.current = true;
    track("walk_end", reason);
  }

  const tallyRef = useRef({ correct: 0, total: 0 });
  /* Bitiş ekranının "yeni kelime" ve "süre" sayıları. Tur sayacıyla aynı
     yerlerde sıfırlanıyor: ikisi aynı turu anlatmalı. `endedAt` bitişte bir
     kez yazılıyor ki süre ekran yeniden çizildikçe kaymasın. */
  const taughtRef = useRef(0);
  const endedAt = useRef<number | null>(null);
  const manualResolve = useRef<((v: boolean | "skip") => void) | null>(null);
  const pulse = useRef(new Animated.Value(0)).current;

  // İlerleme — walk STATELESS: cevaplar SRS'e yazılır (progress YOK). Sorulanları skip için biriktir.
  const day = useRef(todayStr());
  const answers = useRef<AnswerOut[]>([]);
  const askedIds = useRef<Set<number>>(new Set());

  // TTS: ekran kapalı YA DA köprü (WebView) hazır değilse (ekran yeni uyandı, bildirim vb.) NATIVE
  // /api/tts (neural, arka planda çalar) — cihaz-TTS'e (robotik) düşmeden, durmadan, sesi koruyarak.
  // Köprü hazırsa (normal ekran-açık) köprüyü kullan.
  // sayNative: ÖĞRETMENİN sesi (kullanıcının anadili). Eskiden sayTR adıyla
  // doğrudan TURKISH_VOICE kullanıyordu — anadili Türkçe olmayan kullanıcıya
  // anlatım yine Türkçe okunurdu. sayTarget: öğrenilen dilin sesi (kurstan).
  const sayNative = (txt: string) => {
    const v = narrationVoice(currentLang());
    return screenOffRef.current || !bridgeReady() ? speakServerTts(v, txt) : speakAndWaitVoiced(txt, v);
  };
  const sayTarget = (txt: string) => (screenOffRef.current || !bridgeReady() ? speakServerTts(currentVoiceId(), txt) : speakAndWaitVoiced(txt, currentVoiceId()));

  /** Biriken cevapları SRS'e yaz (progress YOK — walk stateless). Tur sonunda + çıkışta. */
  function flush(final = false) {
    if (!user) return;
    const pending = answers.current;
    if (!pending.length) return;
    answers.current = [];
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    /* Başarısız batch BELLEĞE geri konmuyor: `submitAnswers` onu cihazdaki
       kuyruğa yazıyor ve bağlantı dönünce kendisi gönderiyor. İkisini birden
       yapmak aynı cevapları İKİ KEZ gönderirdi - SRS ve XP çift sayardı. */
    void submitAnswers(pending, day.current, final ? secs : 0).catch(() => { /* kuyruğa alındı */ });
  }

  /*
    Walk kuyruğunu yükle (walk=1). Resume YOK — her yürüyüş taze due kelimelerle
    başlar.

    HATA BİR SONUÇ DEĞİL. Burada `catch` sessizdi ("girişsiz/hatada demo kalır")
    ve o yorum eskimişti: demo yolu kaldırılınca geriye BOŞ kuyruk kalıyordu.
    Kullanıcı "Başla"ya basınca mikrofon izni isteniyor, ekran kilidi açılıyor,
    arka plan servisi başlıyor, karşılama okunuyor ve tur hemen "Tur bitti!
    0/0 · kaydedildi" ekranına düşüyordu: bir ağ hatası BİTMİŞ TUR gibi
    gösteriliyordu. Web `walk-player` ayrı bir hata ekranı çiziyor.
  */
  const loadQueue = useCallback(() => {
    if (!user) return;
    setPhase("intro");
    fetchSession(day.current, { walk: true }).then((p) => {
      if (!mounted.current) return;
      const wr = mapRounds(p.rounds ?? []);
      if (wr.length) { setRounds(wr); setCurWord(wr[0].word); return; }
      // Tekrar zamanı gelen kelime yok: bitiş ekranının kendi "kalmadı" hâli.
      setNoMore(true); setPhase("done");
    }).catch(() => { if (mounted.current) setPhase("error"); });
  }, [user]);

  useEffect(() => { loadQueue(); }, [loadQueue]);

  // Mount/unmount — çıkışta biriken cevapları yaz.
  useEffect(() => {
    // Ref NESNELERİ kopyalanır, .current değil: temizlik çıkış anındaki canlı
    // değerleri okur.
    const mountedRef = mounted;
    const tokenRef = runToken;
    track("walk_start", 0);
    mountedRef.current = true;
    return () => { mountedRef.current = false; tokenRef.current++; stopListening(); setKeepAwake(false); stopWalkService(); flush(true); };
    // flush bilerek bağımlılıkta değil: efekt yalnız mount/unmount içindir, onu
    // eklemek her render'da temizliği çalıştırıp cevapları erkenden gönderirdi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Ekran durumu → kaynak seçimi. İKİ PLATFORM AYNI OLAYI DİNLEMİYOR:
   *
   *   Android  ACTION_SCREEN_OFF / ACTION_SCREEN_ON (LernomiSpeechModule.kt) — YALNIZ güç
   *            tuşu. Başka uygulamaya geçmek tetiklemez; mikrofon tipli ön plan servisi
   *            sayesinde ücretsiz native tanıyıcı orada da çalışmayı sürdürür.
   *   iOS      didEnterBackground / willEnterForeground (LernomiSpeech.swift) — kilit AMA
   *            uygulama değiştirme, bildirime dokunma ve gelen çağrı da.
   *
   * Ayrıştırma iOS'ta native tarafta DA yapılamıyor: güç tuşunu haber veren genel bir API
   * yok, protectedDataWillBecomeUnavailable yalnız parola varsa ve gecikmeli düşüyor,
   * SpringBoard'ın kilit bildirimi ise özel API (Guidelines 2.5.1 riski). Yani "iOS'ta da
   * yalnız kilidi dinleyelim" seçeneği yok.
   *
   * Eşleme bilerek kabul edildi. Bayrağın sorduğu şey "ekran kapalı mı" değil, "ÜCRETSİZ
   * YOL çalışıyor mu": iOS'ta uygulama arka plana düşer düşmez WebView köprüsü KESİN olarak
   * askıya alınıyor, native SFSpeechRecognizer'ın arka planda çalıştığı ise DOĞRULANMADI.
   * Yanlış tarafa düşmenin bedeli simetrik değil — fazladan bir Azure çağrısı kuruş,
   * sessizce başarısız bir tanıma "duyamadım" sayılıp üç turda yürüyüşü durduruyor.
   *
   * Gecikme (debounce) EKLENMEDİ: kısa kesintide bayrağı geciktirmek o aralıkta sorulan
   * kelimeyi arka planda ölü olabilecek tanıyıcıya yollar, yani parayı kurtarıp turu riske
   * atar. Kısa kesintinin asıl zararı bunun yerine aşağıda kapatıldı (listenCut).
   *
   * Bu bayrak TTS ve SFX için tek karar verici DEĞİL; ikisi de ayrıca bridgeReady() bakıyor,
   * o yüzden köprü öldüğünde ses zaten native yola düşer.
   */
  useEffect(() => {
    const unsub = onScreenState((off) => {
      screenOffRef.current = off;
      /* CEBE GEÇİŞ ÖLÇÜLÜYOR — webin `walk_switch`iyle aynı sözlük: 1 = cebe
         alındı ("armed"), 0 = ekrana dönüldü ("visible"). Web bu geçişi baştan
         sayıyordu, Android saymıyordu: turun kaçının cepte geçtiği, yani Azure
         faturasını hangi kipin yazdığı yalnız webden görülüyordu. */
      track("walk_switch", off ? 1 : 0, off ? "armed" : "visible");
      setSfxScreenOff(off); // köprü susar → SFX native ton sentezi
      // Kesinti native dinleme SIRASINDA geldiyse tanıyıcı ölür: 8 sn zaman aşımını bekleme,
      // hemen kes ve kelimeyi bir kez daha sor (bkz. judgeSpeak).
      if (off && nativeListeningRef.current) { listenCut.current = true; try { stopListening(); } catch { /* yut */ } }
      // KONUŞMANIN karşılığı — yukarıdaki satır dinlemeyi kesiyordu, konuşmayı kimse kesmiyordu.
      // Ekran kapalıyken köprü çalamaz (WebView ses odağını bırakır) ve bitiş mesajı hiç gelmez;
      // bekleyeni burada serbest bırakmazsak tur o utterance'ta donuyor. Serbest kalınca bir
      // sonraki cümle zaten native yola düşüyor (`say`/`sayTarget` screenOffRef'e bakıyor).
      if (off) { try { bridgeStop(); } catch { /* yut */ } }
      // Ekran kapalı yol premium'a kapalıysa SÖYLE. Tek sefer: her kelimede
      // tekrarlamak turu anlatıma çevirirdi. Ekran açıkken tur normal sürüyor,
      // mesaj da bunu söylüyor — kullanıcı çıkmaz sokakta bırakılmıyor.
      if (off && pocketGateClosed() && !premiumToldRef.current) {
        premiumToldRef.current = true;
        setBgUnavailable(true);
        // ÇALAN SESİ ÖNCE KES. Yukarıdaki `bridgeStop()` yalnız WebView yolunu
        // susturuyor; o sırada native yoldan (`speakServerTts`) bir cümle
        // çalıyorsa dokunmuyordu — köprü hazır değilken sayNative zaten native
        // yola düşüyor. Sonuç: bilgilendirme, süren cümlenin ÜSTÜNE biniyordu.
        stopServerTts();
        // Jingle ÖNCE, söz sonra. Kullanıcı telefonu cebine koymuş ve ekranı
        // kapatmış; araya giren bir cümlenin önce kendini duyurması gerekiyor.
        // Bekleme süresi nota tablosundan türüyor (`sfxDurationMs`), sabit
        // yazılmıyor: jingle değişirse söz kendiliğinden ona göre kayar.
        sfx("premium");
        track("walk_listen", 0, "stt:premium"); // web `walk-player` ile aynı ad
        notePremiumGate("pocket_walk"); // kilide takılan an ölçülüyor (bkz. lib/premium)
        void nativeDelay(sfxDurationMs("premium")).then(() => sayNative(tx("walkmode.screen_off_premium")));
      }
    });
    return () => { unsub(); stopWalkService(); };
  }, []);

  // Nabız halkası — YALNIZ dinlerken (mikrofon açıkken); konuşurken sakin.
  useEffect(() => {
    const active = phase === "listening";
    if (!active) { pulse.stopAnimation(); pulse.setValue(0); return; }
    /* "Hareketi azalt": dinleme nabzı hiç başlamıyor. Mikrofonun açık olduğunu
       renk ve etiket söylüyor; nabız yalnız dikkat çekiyor. */
    if (reduceMotion()) return;
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [phase, pulse]);

  function waitManual(): Promise<boolean | "skip"> {
    return new Promise((resolve) => { manualResolve.current = resolve; });
  }
  function resolveManual(v: boolean | "skip") {
    const r = manualResolve.current; manualResolve.current = null;
    if (r) r(v);
  }

  /**
   * Ücretsiz native dinleme turu. TRICK: önce mic AÇILIR, ~180 ms SONRA "şimdi konuş" sesi
   * çalar — kullanıcı sesi duyar duymaz başlasa bile mic zaten açıktır, kısa kelimenin ilk
   * hecesi kaçmaz. `listenCut` her turda sıfırlanır: dönüşte true ise sonuç kullanıcının
   * sessizliği değil, araya giren kesintidir.
   */
  async function listenNative(): Promise<{ k: "v"; heard: string[] } | { k: "m" }> {
    listenCut.current = false;
    nativeListeningRef.current = true;
    const race = Promise.race([
      listenOnce(currentTargetLocale(), ANSWER_WINDOW_MS).then((h) => ({ k: "v" as const, heard: h ?? [] })),
      waitManual().then(() => ({ k: "m" as const })),
    ]);
    const miconTimer = setTimeout(() => sfx("micon"), 180);
    const r = await race;
    clearTimeout(miconTimer);
    nativeListeningRef.current = false;
    stopListening();
    sfx("micoff");
    return r;
  }

  /** Yeni kelimeyi öğret (intro turu): anons + Almanca + Türkçe + Almanca. Soru YOK. */
  async function teachIntro(w: WalkWord, alive: () => boolean): Promise<boolean> {
    setPhase("teaching"); setVerdict(null); setHeard(""); wordStart.current = Date.now();
    const target = withArtikel(w);
    await sayNative(tx("walk.new_word")); if (!alive()) return true;
    await sayTarget(target); if (!alive()) return true;
    await sayNative(w.tr); if (!alive()) return true;
    await sayTarget(target); if (!alive()) return true;
    if (user && typeof w.id === "number") answers.current.push({ wordId: w.id, game: "intro", correct: true, latencyMs: 0 });
    taughtRef.current += 1;
    return false;
  }

  /** Kelimeyi sor (speak turu). justTaught: az önce intro'da öğretilen kelime → "Şimdi sen söyle".
      "stopped" = duyamadım penceresi turu durdurdu. */
  async function judgeSpeak(w: WalkWord, alive: () => boolean, justTaught: boolean): Promise<"ok" | "stopped"> {
    setPhase("speaking"); setVerdict(null); setHeard(""); wordStart.current = Date.now();
    if (justTaught) { await sayNative(tx("walk.your_turn")); if (!alive()) return "ok"; } // yeni kelime → geçiş
    await sayNative(w.tr); // Türkçe ipucu (Emel)
    if (!alive()) return "ok";

    await gap(150); // TTS kuyruğu kısaca otursun (mic kendi sesimizi kapmasın)
    if (!alive()) return "ok";
    setPhase("listening");
    // Kaynak: ücretsiz yol güvenilmez (Android: ekran kapalı · iOS: uygulama arka planda —
    // yukarıdaki uzun nota bak) → sunucu (Azure) STT, paralı. Yoksa native.
    const useAzure = screenOffRef.current;
    /* DİNLEMENİN SONUCU ÖLÇÜLÜYOR — web `walk-player` ile aynı biçim:
       `kaynak:sonuç`, value = gönderilen saniye × 10 (ücretsiz native yolda
       sunucuya bir şey gitmiyor, 0). Android'de tek ölçülen şey turun başı ve
       sonuydu; ARADA tanıyıcının ne yaptığı hiç yazılmıyordu — hangi kaynağın
       kaç kez boş döndüğü, kesintinin ne sıklıkta turu böldüğü ve Azure'un
       kaç saniye ses aldığı yalnız webden görülebiliyordu. */
    const noteHeard = (kaynak: "native" | "azure", r: { k: "v"; heard: string[] } | { k: "m" }, saniye = 0) => {
      const sonuc = r.k === "m" ? "manual" : r.heard.length ? "ok" : listenCut.current ? "cut" : "silence";
      track("walk_listen", Math.round(saniye * 10), `${kaynak}:${sonuc}`);
    };
    let res: { k: "v"; heard: string[] } | { k: "m" };
    if (useAzure && pocketGateClosed()) {
      // Kapı kapalıysa Azure'u HİÇ ÇAĞIRMIYORUZ: her deneme 3 saniyelik kayıt,
      // bir yükleme ve kesin bir 403 demek. Bunun yerine kullanıcıyı bekliyoruz —
      // ekranı açarsa tur ücretsiz native tanıyıcıyla kaldığı yerden sürüyor.
      // Gerekçe ekran-kapandı işleyicisindeki notta; mesaj orada bir kez okunuyor.
      res = await waitManual().then(() => ({ k: "m" as const }));
    } else if (useAzure) {
      // Azure: micon HEMEN (setTimeout arka planda durur); micoff kayıt biter bitmez (upload'dan
      // ÖNCE) → verdict'le çakışmaz. Sonra ~1sn upload, sonra verdict.
      sfx("micon");
      res = await Promise.race([
        azureListenOnce(withArtikel(w), AZURE_WINDOW_MS, () => sfx("micoff")).then((h) => ({ k: "v" as const, heard: h ?? [] })),
        waitManual().then(() => ({ k: "m" as const })),
      ]);
      noteHeard("azure", res, AZURE_WINDOW_MS / 1000);
    } else {
      res = await listenNative();
      noteHeard("native", res);
      // Boş sonuç iki ayrı şey olabilir: kullanıcı susmuştur, ya da dinlemeyi biz kesmişizdir
      // (araya kesinti girdi, tanıyıcı öldü). İkincisini "duyamadım" saymak haksız — üç
      // duyamadım turu bitiriyor. Kelimeyi bir kez daha sor: hâlâ arka plandaysak Azure ile,
      // kullanıcı geri döndüyse yine ücretsiz native ile. iOS'ta buranın önemi büyük: orada
      // bildirime dokunmak bile kesinti sayılıyor, yani bu dal Android'dekinden çok daha sık
      // çalışıyor. `screenOffRef` şartı korunuyor — kesme bize ulaşmadan tanıyıcı kendi
      // ölmüş olabilir; koşul eskisinin üstüne EKLENİYOR, hiçbir durumda daha az tekrar yok.
      if (res.k === "v" && res.heard.length === 0 && (listenCut.current || screenOffRef.current) && alive()) {
        await sayNative(w.tr);
        res = screenOffRef.current
          ? { k: "v" as const, heard: (await azureListenOnce(withArtikel(w), AZURE_WINDOW_MS, () => sfx("micoff"))) ?? [] }
          : await listenNative();
        noteHeard(screenOffRef.current ? "azure" : "native", res, screenOffRef.current ? AZURE_WINDOW_MS / 1000 : 0);
      }
    }
    manualResolve.current = null;
    if (!alive()) return "ok";

    let result: "correct" | "wrong" | "skip" | "unheard";
    let said = "";
    if (res.k === "m") {
      result = "skip";
    } else {
      // TÜM tanıyıcı adaylarını değerlendir — doğru cevap çoğu zaman ilk aday DEĞİL
      // (ör. "er" için tanıyıcı ["ja","ja im","er","eher"] döndürüyor; "er" 3. adayda).
      // Web de böyle: spokenMatches(heard[], ...). Tek adaya bakmak kısa kelimeleri kaçırıyordu.
      const adaylar = res.heard;
      said = adaylar[0] ?? "";
      if (said) setHeard(said); // ilk adayı göster (STT mi eşleşme mi belli olsun)
      // Tanıyıcı kısa sözcüğe fazladan kelime ekliyor ("er" → "er im in") ve 2-harfli hedef
      // içerme kuralına (form.length >= CONTAINS_MIN) takılıyor. Tam ifadeyi VE tek tek
      // kelimeleri aday yap → hedef kelime nerede geçerse geçsin exact eşleşsin.
      const cands = adaylar.flatMap((h) => [h, ...h.split(/\s+/)]).filter(Boolean);
      const unheard = adaylar.length === 0;
      const ok = !unheard && spokenMatches(cands, [withArtikel(w), w.de]);
      // Sarmalayıcı şart: parseSkip'in ikinci parametresi dil, ama .some()
      // ikinci argüman olarak dizinin index'ini geçirir.
      const skipped = !unheard && !ok && adaylar.some((h) => parseSkip(h));
      result = unheard ? "unheard" : skipped ? "skip" : ok ? "correct" : "wrong";
    }

    // "Duyamadım" penceresi — üst üste sessizlikte turu durdur (web ile aynı).
    if (result === "unheard") {
      unheardWin.current.push(true);
      if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
      if (unheardWin.current.filter(Boolean).length >= UNHEARD_LIMIT) {
        setVerdict("unheard"); setPhase("judging");
        endWalk(3);
        await sayNative(tx("walk.mic_silent"));
        setKeepAwake(false); stopWalkService();
        if (alive()) setPhase("stopped");
        return "stopped";
      }
    } else {
      unheardWin.current.push(false);
      if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
    }

    // Geri bildirim (web): doğru → ses + Almanca okunur; yanlış → "Doğrusu:" + Almanca;
    // duyamadım → "Duyamadım." + Almanca; atla → cesaret + Almanca. Kelime TEKRAR SORULMAZ.
    const target = withArtikel(w);
    setPhase("judging");
    if (result === "correct") {
      setVerdict("correct"); haptic("correct");
      await sayTarget(target);
      recordSpeak(w, true);
    } else if (result === "wrong") {
      setVerdict("wrong"); haptic("wrong");
      await sayNative(tx("walk.correct_is")); await sayTarget(target);
      recordSpeak(w, false);
    } else if (result === "skip") {
      setVerdict("skip");
      await sayNative(encourage()); await sayTarget(target);
      bumpTally(false); // atla: SRS'e yazılmaz ama tur sayısına dahil (sayaç /toplam tutarlı)
    } else {
      setVerdict("unheard");
      await sayNative(tx("walk.not_heard")); await sayTarget(target);
      bumpTally(false); // duyulmadı: SRS'e yazılmaz (kelime due kalır) ama tur sayısına dahil
    }
    return "ok";
  }

  // Gösterim sayacı (correct/total) — TUR-bazlı: her tur (doğru/yanlış/atla/duyamadım) toplama
  // girer ki üstteki idx/rounds sayacıyla tutarlı olsun. SRS'e ayrı yazılır (yalnız doğru/yanlış).
  function bumpTally(ok: boolean) {
    tallyRef.current = { correct: tallyRef.current.correct + (ok ? 1 : 0), total: tallyRef.current.total + 1 };
    setTally(tallyRef.current);
  }
  function recordSpeak(w: WalkWord, ok: boolean) {
    bumpTally(ok);
    if (user && typeof w.id === "number") {
      answers.current.push({ wordId: w.id, game: "speak", correct: ok, latencyMs: Math.max(0, Date.now() - wordStart.current) });
    }
  }

  async function runLoop(rs: WalkRound[], startIdx: number) {
    const my = ++runToken.current;
    const alive = () => my === runToken.current && mounted.current;
    let lastIntroId = -1; // az önce intro'da öğretilen kelime → sonraki speak'te "Şimdi sen söyle"
    for (let i = startIdx; i < rs.length; i++) {
      if (!alive()) return;
      setIdx(i);
      const { word, kind } = rs[i];
      setCurWord(word);
      if (kind === "intro") {
        if (await teachIntro(word, alive)) return;
        lastIntroId = word.id;
      } else {
        askedIds.current.add(word.id);
        const status = await judgeSpeak(word, alive, word.id === lastIntroId);
        lastIntroId = -1;
        if (status === "stopped" || !alive()) return;
      }
      await gap(550); // turlar arası nefes (web 850 → mobilde daha akıcı)
    }
    if (!alive()) return;
    flush(true); // tur bitti — SRS'e yaz
    sfx("finish"); // tamamlanma sesi
    bumpStats(); // yürüyüş bitti: XP/seri değişti
    // Güç tuşuyla ekran kapalı (eller serbest) → sesli "Devam edelim mi?"; ekran açık → görsel özet + butonlar.
    if (screenOffRef.current) { await askContinue(alive); return; }
    setKeepAwake(false); stopWalkService();
    endedAt.current = Date.now();
    setPhase("done");
    void sayNative(tx("walk.tour_done", { total: tallyRef.current.total, correct: tallyRef.current.correct }));
  }

  /** Başla: önce uygulama içi açıklama ve onay (bir kez), sonra sistem izni ve tur. */
  /**
   * Başla: önce açıklama ve onay, sonra sistem izni ve tur.
   *
   * ONAYIN İKİ YARISI VAR. Cihazdaki bayrak "bu telefonda mikrofon açıklaması
   * okundu" diyor; sunucudaki ses rızası (`ai_voice`) ise ekran kapalıyken sesin
   * sağlayıcıya gidebilmesinin şartı — uç izin yoksa sesi iletmiyor. İkisi
   * ayrışabilir: başka bir cihazda ya da webde geri alınmış olabilir. Sunucu
   * "izin yok" diyorsa açıklama yeniden gösteriliyor; okunamıyorsa (ağ yok)
   * cihazdaki bayrakla başlanıyor, çünkü ekran açık yol sunucuya hiç gitmiyor.
   */
  /** Ses sağlayıcılarının listesi ve sunucudaki ses rızası — açıklama ekranları için. */
  async function loadVoiceConsent(): Promise<boolean | null> {
    try {
      const info = await fetchAiConsent();
      setVoiceProcessors(info.processors.ai_voice);
      setVoiceProcessorsFailed(false);
      return info.statuses.ai_voice.state === "granted";
    } catch {
      setVoiceProcessorsFailed(true);
      return null;
    }
  }

  async function beginWalk() {
    /*
      iOS: İZİN ÖNCESİ EKRAN TEK DÜĞMELİ (Apple HIG). İlk kullanımda "Devam et" →
      sistem mikrofon ve konuşma tanıma izni → sonra, ekran kapalı yol açıksa, sesin
      sağlayıcılara gönderilmesi için AYRI rıza (`askVoiceConsent`). Ekran bir kez
      görüldükten sonra doğrudan başlanıyor; izin durumunu sistem hatırlıyor.
    */
    if (Platform.OS === "ios") {
      if (!(await hasMicConsent())) { setDisclosure("prime"); return; }
      await start(rounds);
      return;
    }
    const local = await hasMicConsent();
    const serverGranted = await loadVoiceConsent();
    if (local && serverGranted !== false) { await start(rounds); return; }
    setDisclosure("consent");
  }
  async function acceptDisclosure() {
    const mode = disclosure;
    await setMicConsent(true);
    /* Android rızası sunucuya YALNIZ alıcı listesi gösterildiyse yazılıyor:
       adları görülmemiş sağlayıcılara izin alınmış sayılmaz. iOS'un izin öncesi
       ekranı rıza değil; ses rızası izin penceresinden sonra ayrıca soruluyor. */
    if (mode === "consent" && voiceProcessors) {
      try { await decideAiConsent("ai_voice", true); } catch { /* ağ yok: ekran açık yol yine çalışır */ }
    }
    setDisclosure(null);
    await start(rounds);
  }

  /** Girişteki "Mikrofon ve ses verisi" bağlantısı: okumak için, izin penceresi açmadan. */
  function showDisclosureInfo() {
    void loadVoiceConsent();
    setDisclosure(Platform.OS === "ios" ? "info" : "consent");
  }

  /**
   * iOS: ses rızası, sistem izni VERİLDİKTEN sonra ve yalnız gerektiğinde. Ekran
   * kapalı yol premium; kapısı kesin kapalıysa sorulmuyor (gidecek ses yok). Karar
   * verilmişse ("declined" dahil) ekran kendiliğinden açılmıyor.
   */
  async function askVoiceConsent() {
    if (pocketGateClosed()) return;
    try {
      const info = await fetchAiConsent();
      const state = info.statuses.ai_voice.state;
      if (state === "unset" || state === "outdated") await requestAiConsent("ai_voice");
    } catch { /* okunamadı: sunucu izin yoksa sesi göndermiyor, tur ekran açıkken sürüyor */ }
  }

  async function start(rs: WalkRound[], greet = true) {
    // Boş kuyrukla yürüyüş başlatmak mikrofon izni isteyip hemen "bitti"
    // demek olurdu; bitiş ekranının "tekrar kalmadı" hâli doğrusu.
    if (!rs.length) { setNoMore(true); setPhase("done"); return; }
    const granted = await ensureMicPermission();
    if (!granted) { setPhase("denied"); return; }
    if (Platform.OS === "android") setNotifHidden(!(await ensureWalkNotificationPermission()));
    if (Platform.OS === "ios" && greet) await askVoiceConsent();
    if (!mounted.current) return;
    setKeepAwake(true); // ekran turu boyunca sönmesin
    startWalkService(); // güç tuşuyla ekran kapansa da arka planda mic açık kalsın (Azure yolu)
    startedAt.current = Date.now();
    tallyRef.current = { correct: 0, total: 0 }; setTally(tallyRef.current);
    taughtRef.current = 0; endedAt.current = null;
    unheardWin.current = [];
    sfx("start"); // yürüyüşün açılışı — web `walk-player` aynı yerde çalıyor
    if (greet) {
      // Kısa TTS karşılama — doğrudan ilk kelimeye dalmadan.
      setVerdict(null); setHeard(""); setGreeting(true); setPhase("speaking");
      await sayNative(tx("walk.greeting", { lang: targetLangName() }));
      /* TESLİM İŞARETİ BİR KEZ SÖYLENİYOR. Atlama baştan beri tanınıyordu
         (`parseSkip`) ama varlığı hiçbir yerde YAZMIYOR ve SÖYLENMİYORDU:
         bilmediği kelimede tıkanan kullanıcı ya susuyor (duyulmadı sayılıyor)
         ya da yanlış bir şey söylüyordu. Web girişte bir kez okuyor. */
      await sayNative(tx("walk.skip_hint_before"));
      await sayTarget(skipWord());
      await sayNative(tx("walk.skip_hint_after"));
      setGreeting(false);
      if (!mounted.current) return;
    }
    void runLoop(rs, 0);
  }

  // Devam / yeni tur: sorulanları skip ederek taze walk kuyruğu getir. Tekrar kalmadıysa bildir.
  async function newTour() {
    setPhase("intro"); setNoMore(false);
    try {
      const p = await fetchSession(day.current, { walk: true, skip: Array.from(askedIds.current) });
      const wr = mapRounds(p.rounds ?? []);
      if (wr.length) { setRounds(wr); setCurWord(wr[0].word); start(wr, false); return; }
      setNoMore(true); setPhase("done"); void sayNative(tx("walk.no_more"));
    } catch { setPhase("error"); }
  }

  function finishDone() { setKeepAwake(false); stopWalkService(); endedAt.current = Date.now(); setPhase("done"); }

  /** Ekran kapalı tur sonu: mikrofonu bir kez açıp evet/hayır dinle (parseConfirm). */
  async function listenConfirm(alive: () => boolean): Promise<boolean | null> {
    setPhase("continue");
    sfx("micon");
    // Ekran kapalı → Azure (Türkçe evet/hayır); ekran açık → native.
    let yanit: string[] | null;
    if (screenOffRef.current) {
      yanit = await azureListenOnce("", 4000, () => sfx("micoff"), "tr");
    } else {
      yanit = await listenOnce(currentTargetLocale(), CONFIRM_SILENCE_MS);
      sfx("micoff");
    }
    if (!alive() || !yanit) return null;
    for (const s of yanit) { const c = parseConfirm(s); if (c !== null) return c; }
    return null;
  }

  /** Sorulanları skip ederek taze walk kuyruğu getir, döngüyü sürdür. */
  async function continueTour(alive: () => boolean) {
    try {
      let payload: { rounds?: Round[] } | null;
      if (screenOffRef.current) {
        // ekran-kapalı: native GET (RN fetch arka planda takılıyor)
        const skip = Array.from(askedIds.current).slice(-200).join(",");
        const url = `${API_BASE}/api/session?day=${day.current}&walk=1${skip ? `&skip=${skip}` : ""}`;
        const body = await nativeHttpGet(url);
        payload = body ? (JSON.parse(body) as { rounds?: Round[] }) : null;
      } else {
        payload = await fetchSession(day.current, { walk: true, skip: Array.from(askedIds.current) });
      }
      const wr = mapRounds(payload?.rounds ?? []);
      if (!alive()) return;
      if (wr.length) {
        tallyRef.current = { correct: 0, total: 0 }; setTally(tallyRef.current);
        taughtRef.current = 0; endedAt.current = null;
        unheardWin.current = []; startedAt.current = Date.now();
        setRounds(wr);
        void runLoop(wr, 0);
        return;
      }
      endWalk(2);
      await sayNative(tx("walk.no_more")); setNoMore(true); finishDone();
    } catch { finishDone(); }
  }

  /** Cepte (eller serbest) tur sonunda sesli devam sorusu — web askContinue ile aynı. */
  async function askContinue(alive: () => boolean) {
    const c = tallyRef.current;
    setPhase("continue");
    await sayNative(tx("walk.tour_done_continue", { total: c.total, correct: c.correct }));
    if (!alive()) return;
    let yes = await listenConfirm(alive);
    if (yes === null && alive()) {
      await sayNative(tx("walk.continue_yes_no"));
      yes = await listenConfirm(alive);
    }
    if (!alive()) return;
    if (yes === true) { await sayNative(tx("walk.continuing")); await continueTour(alive); }
    else {
      /* Cevap alınamadıysa da 1: webin `askContinue`ı yalnız "yes"|"no"
         döndürüyor ve cevapsız soruyu "no" sayıyor, yani aynı kod. */
      endWalk(1);
      if (yes === false) await sayNative(tx("walk.goodbye"));
      finishDone();
    }
  }

  function stopAndLeave() { endWalk(6); runToken.current++; stopListening(); setKeepAwake(false); stopWalkService(); nav.goBack(); }
  // Bildirimdeki "Durdur": mikrofon kapanır, biriken cevaplar yazılır, tur özeti gösterilir.
  const stopFromNotification = useRef<() => void>(() => {});
  stopFromNotification.current = () => { endWalk(6); runToken.current++; stopListening(); flush(true); finishDone(); };
  useEffect(() => onWalkStop(() => stopFromNotification.current()), []);

  /**
   * Arka plan yolu kurulamadıysa (ön plan servisi / ses oturumu) kullanıcıya söyle.
   * Tur durmuyor: ekran açıkken her şey çalışıyor, kaybolan yalnız ekran kapalıyken
   * dinlemeye devam etmek. Sessiz kalmak, kullanıcının telefonu cebine koyup turun
   * neden bittiğini anlamaması demekti.
   */
  useEffect(() => onWalkServiceFailed(() => { track("walk_switch", 1, "arm-failed"); setBgUnavailable(true); }), []);
  // Tur sürerken çıkış onaylı (donanım geri + X): mikrofon açık ve tur yarım.
  const inSession = phase === "teaching" || phase === "speaking" || phase === "listening" || phase === "judging" || phase === "continue" || phase === "stopped";
  const back = useBackConfirm(inSession);
  function onBackPress() { if (inSession) back.ask(); else stopAndLeave(); }
  function skipNow() { resolveManual("skip"); }

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const teaching = phase === "teaching";
  const reveal = phase === "judging" || teaching; // Almanca göster: cevap açılınca veya öğretirken
  const listening = phase === "listening";
  /* DOLU daire + beyaz glif: zemin TEMAYA DUYARSIZ (`theme` `fillOf`).
     Rol renkleri koyu temada pastele dönüyor ve 42 px'lik beyaz glif
     görünmüyordu (ölçümler `theme/colors` `fillOf` başlığında). Boş hâl
     `surface2` kalıyor — orada glif zaten `textFaint`, beyaz değil. */
  const dotColor = verdict === "correct" ? fillOf("success") : verdict === "wrong" ? fillOf("danger") : listening ? fillOf("primary") : colors.surface2;
  const stepLabel = teaching ? tx("walkmode.step_new_word") : phase === "speaking" ? tx("walkmode.step_hint") : phase === "listening" ? tx("walkmode.step_say_now", { target: targetLangName() }) : verdict === "unheard" ? tx("walkmode.step_unheard") : verdict === "skip" ? tx("walkmode.step_skipped") : verdict === "correct" ? tx("walkmode.step_correct") : verdict === "wrong" ? tx("walkmode.step_answer") : "";
  // Sayaç SORU (speak) turlarını gösterir; intro (öğretme) turları soru değil — done (tally) ile tutarlı.
  const speakTotal = rounds.filter((r) => r.kind === "speak").length || rounds.length;
  const speakStep = Math.min(speakTotal, rounds.slice(0, idx).filter((r) => r.kind === "speak").length + (rounds[idx]?.kind === "speak" ? 1 : 0));
  const donePct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const doneMin = Math.max(1, Math.round(((endedAt.current ?? Date.now()) - startedAt.current) / 60000));

  /**
   * Arka plan yolu kurulamadıysa tek satırlık uyarı. Turu durdurmuyor; söylediği
   * tek şey ekran kapatılırsa dinlemenin süremeyeceği. Yalnız native tarafın
   * bildirdiği gerçek bir hatada çiziliyor (LernomiWalkServiceFailed).
   */
  /**
   * Android 13+'ta bildirim izni verilmediyse: dinleme bildirimi görünmeyecek ve
   * "Durdur" oradan basılamayacak. Tur durmuyor; nasıl durdurulacağı söyleniyor.
   */
  const notifWarning = () => (notifHidden ? (
    <View accessibilityLiveRegion="polite" style={{ marginHorizontal: spacing.lg, marginTop: -spacing.md, marginBottom: spacing.lg, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface2 }}>
      <Text variant="caption" color={colors.textMuted}>{tx("walkmode.notif_hidden")}</Text>
    </View>
  ) : null);

  const bgWarning = () => (bgUnavailable ? (
    <View style={{ marginHorizontal: spacing.lg, marginTop: -spacing.md, marginBottom: spacing.lg, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface2 }}>
      <Text variant="caption" color={colors.textMuted}>{tx("walkmode.background_unavailable")}</Text>
    </View>
  ) : null);

  const topBar = (withProgress: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
      <PressableScale hitSlop={4} onPress={onBackPress} accessibilityLabel={tx("walkmode.exit_walk_mode")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
      {withProgress ? (
        <>
          <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${Math.round((speakStep / Math.max(1, speakTotal)) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
          </View>
          <Text variant="bodyStrong" color={colors.textMuted}>{speakStep}/{speakTotal}</Text>
        </>
      ) : (
        <View style={{ flex: 1 }} />
      )}
    </View>
  );

  /* Oynatıcı içindeki durum ekranları (karşılama, duraklama): üst çubuk ve
     ilerleme yerinde, gövde durum şablonu, düğmeler altta sabit. */
  const inPlayer = (body: React.ReactNode, actions?: React.ReactNode) => (
    <>
      {topBar(true)}
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: spacing.lg }}>{body}</View>
      {actions ? <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md }}>{actions}</View> : null}
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {phase === "intro" ? (
        /* KAPAK ŞABLONU. Eski tek paragraflık tanıtım ikonlu kural
           satırlarına bölündü; açıklama bağlantısı altta metin düğmesi. */
        <FlowScreen
          top={<FlowTopBar onClose={onBackPress} />}
          actions={
            <FlowActions
              primary={{ label: tx("common.start"), onPress: () => { void beginWalk(); } }}
              tertiary={{ label: tx("walkmode.about_microphone_and_voice_data"), onPress: showDisclosureInfo }}
            />
          }
        >
          <CoverBody
            icon={WalkIcon}
            tint={fillOf("accent")}
            eyebrow={tx("learn.walk_mode")}
            title={tx("walkmode.listen_and_say_it")}
            pitch={tx("walkmode.cover_pitch")}
            rules={[
              { icon: SpeakerIcon, text: tx("walkmode.rule_hint", { nativeLang: nativeLangName() }) },
              { icon: MicIcon, text: tx("walkmode.rule_say", { target: targetLangName() }) },
              { icon: SparkIcon, text: tx("walkmode.rule_teach") },
              { icon: CheckIcon, text: tx("walkmode.rule_verdict") },
              { icon: RepeatIcon, text: tx("walkmode.rule_continue") },
            ]}
          />
        </FlowScreen>
      ) : phase === "done" && noMore && tally.total === 0 ? (
        /* BUGÜNLÜK KELİME YOK — bitmiş bir tur değil, boş kuyruk: durum şablonu. */
        <FlowScreen center actions={<FlowActions primary={{ label: tx("common.go_back"), onPress: () => nav.goBack() }} />}>
          <StateBody mood="think" title={tx("walkmode.done_no_more")} body={tx("walkmode.done_no_more_sub")} />
        </FlowScreen>
      ) : phase === "done" ? (
        /* SONUÇ ŞABLONU (GameScreen ile aynı dil): band → üç sayı → not →
           altta sabit düğmeler. Halka kalktı: bandın ana sayısı aynı bilgi.
           Kutlama eşiği eskisi gibi %60. */
        <FlowScreen
          celebrate={tally.total > 0 && donePct >= 60}
          top={<FlowTopBar onClose={() => nav.goBack()} />}
          actions={
            <FlowActions
              primary={noMore ? { label: tx("common.finish"), onPress: () => nav.goBack() } : { label: tx("walkmode.continue"), onPress: newTour }}
              secondary={tally.total > 0 ? { label: tx("common.share"), icon: <ShareIcon color={colors.text} size={19} />, onPress: () => shareResult(tally.correct, tally.total) } : null}
              tertiary={noMore ? null : { label: tx("common.finish"), onPress: () => nav.goBack() }}
            />
          }
        >
          {/* TURUN SONUCU DUYURULUYOR (bkz. web-parity 11.337): bandın kendi canlı bölgesi. */}
          <ResultHero
            eyebrow={tx("learn.walk_mode")}
            title={tx("walkmode.done_title")}
            figure={`${tally.correct}/${tally.total || 0}`}
            sub={tx("walkmode.done_saved")}
            mood={tally.total > 0 ? (donePct >= 60 ? "celebrate" : "happy") : "idle"}
          />
          {tally.total > 0 ? (
            <StatRow items={[
              { value: formatPercent(donePct), label: tx("summary.accuracy") },
              ...(taughtRef.current > 0 ? [{ value: String(taughtRef.current), label: tx("walkmode.stat_new") }] : []),
              { value: tx("time.minutes_short", { m: doneMin }), label: tx("walkmode.stat_time") },
            ]} />
          ) : null}
          {noMore ? <FlowNote icon={<InboxIcon color={colors.textMuted} size={16} />} text={tx("walkmode.done_no_more_sub")} /> : null}
        </FlowScreen>
      ) : phase === "stopped" ? (
        inPlayer(
          <StateBody mood="think" title={tx("walkmode.i_paused_round")} body={tx("walkmode.i_haven_t_heard_you_for_while")} />,
          <FlowActions
            primary={{ label: tx("walkmode.continue"), onPress: () => { unheardWin.current = []; void runLoop(rounds, idx); } }}
            tertiary={{ label: tx("common.finish"), onPress: () => nav.goBack() }}
          />,
        )
      ) : phase === "error" ? (
        <FlowScreen center actions={<FlowActions primary={{ label: tx("common.try_again"), onPress: loadQueue }} tertiary={{ label: tx("common.go_back"), onPress: () => nav.goBack() }} />}>
          <StateBody alert mood="sad" title={tx("walk.error_title")} body={tx("walk.error_sub")} />
        </FlowScreen>
      ) : phase === "denied" ? (
        /* iOS'ta reddedilen izin uygulamadan YENİDEN İSTENEMİYOR: sistem penceresi
           bir kez gösteriliyor. "İzin ver ve başla" orada hiçbir şey yapmayan
           bir döngüydü; doğru yol Ayarlar. Android'de yeniden sormak mümkün. */
        <FlowScreen
          center
          actions={
            <FlowActions
              primary={{ label: tx(Platform.OS === "ios" ? "walkmode.open_settings" : "walkmode.allow_and_start"), onPress: () => { if (Platform.OS === "ios") void Linking.openSettings().catch(() => {}); else void start(rounds); } }}
              tertiary={{ label: tx("common.discard"), onPress: () => nav.goBack() }}
            />
          }
        >
          <StateBody mood="think" title={tx("walkmode.microphone_needed")} body={tx("walkmode.walk_mode_works_by_voice_allow")} />
        </FlowScreen>
      ) : greeting ? (
        <>
          {topBar(true)}
          {bgWarning()}
          {notifWarning()}
          {/* Karşılama okunurken: durum şablonu, düğme yok (ses bitince tur kendiliğinden başlıyor). */}
          <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: spacing.lg }}>
            <StateBody mood="wave" title={tx("walkmode.here_we_go")} body={tx("walkmode.listen_first_word_coming_up")} />
          </View>
        </>
      ) : (
        <>
          {topBar(true)}
          {bgWarning()}
          {notifWarning()}
          <View style={{ flex: 1, paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.md }}>
            {/* durum rozeti */}
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: (teaching ? colors.primary : colors.info) + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
                <WalkIcon color={teaching ? colors.primaryText : colors.infoText} size={15} />
                <Text variant="caption" color={teaching ? colors.primaryText : colors.infoText}>{tx(teaching ? "walkmode.badge_teaching" : "walkmode.badge_walking")}</Text>
              </View>
            </View>

            {/* orta: kelime + mikrofon + durum */}
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.xxl }}>
              <View style={{ alignItems: "center", gap: 6, minHeight: 96, justifyContent: "center" }}>
                <Text variant="display" color={colors.text} style={{ textAlign: "center" }}>{reveal ? withArtikel(curWord) : curWord.tr}</Text>
                {/* İngilizce gloss — diğer oyunlardaki gibi (kısa/belirsiz kelimede hangi Almanca beklendiğini netleştirir). */}
                {!reveal && curWord.en ? <Text variant="h3" color={colors.textFaint} style={{ textAlign: "center" }}>{curWord.en}</Text> : null}
                {reveal ? <Text variant="h3" color={colors.textMuted} style={{ textAlign: "center" }}>{curWord.en ? `${curWord.tr} · ${curWord.en}` : curWord.tr}</Text> : null}
              </View>

              <View style={{ alignItems: "center", justifyContent: "center", minHeight: 104 }}>
                {listening ? <Animated.View style={{ position: "absolute", width: 96, height: 96, borderRadius: 48, backgroundColor: dotColor, opacity: ringOpacity, transform: [{ scale: ringScale }] }} /> : null}
                <Animated.View style={{ transform: [{ scale: listening ? scale : 1 }] }}>
                  <View style={[{ width: 96, height: 96, borderRadius: 48, backgroundColor: dotColor, alignItems: "center", justifyContent: "center" }, listening ? softShadow(colors.primary, 14) : {}]}>
                    {verdict === "correct" ? <CheckIcon color="#fff" size={42} /> : verdict === "wrong" ? <XIcon color="#fff" size={42} /> : <MicIcon color={listening ? "#fff" : colors.textFaint} size={42} />}
                  </View>
                </Animated.View>
              </View>

              <View style={{ alignItems: "center", gap: spacing.xs, minHeight: 46 }}>
                <Text variant="bodyStrong" color={verdict === "correct" ? colors.successText : verdict === "wrong" ? colors.dangerText : listening ? colors.primaryText : colors.textMuted}>{stepLabel}</Text>
                {heard ? <Text variant="caption" color={verdict === "correct" ? colors.successText : colors.dangerText}>{tx("walkmode.heard", { text: heard })}</Text> : null}
              </View>
            </View>

            {/* alt: Atla */}
            <View style={{ alignItems: "center", gap: spacing.xs }}>
              {phase === "listening" ? (
                <PressableScale onPress={skipNow} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: spacing.sm }}>
                  <Text variant="bodyStrong" color={colors.textMuted}>{tx("walkmode.skip")}</Text><ChevronRightIcon color={colors.textMuted} size={18} />
                </PressableScale>
              ) : (
                <View style={{ height: 40 }} />
              )}
            </View>
          </View>
        </>
      )}

      <ConfirmDialog
        visible={back.visible}
        title={tx("walkmode.end_walk")}
        message={tx("walkmode.back_message")}
        confirmLabel={tx("common.finish")}
        cancelLabel={tx("common.continue_2")}
        destructive
        onConfirm={() => { back.cancel(); stopAndLeave(); }}
        onCancel={back.cancel}
      />
      <MicDisclosure visible={disclosure !== null} mode={disclosure ?? "info"} processors={voiceProcessors} processorsFailed={voiceProcessorsFailed} onAccept={() => { void acceptDisclosure(); }} onCancel={() => setDisclosure(null)} />
    </View>
  );
}
