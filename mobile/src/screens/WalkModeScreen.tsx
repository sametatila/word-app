import React, { useEffect, useRef, useState } from "react";
import { t as tx } from "../lib/i18n";
import { View, Animated, Easing, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronRightIcon, WalkIcon, MicIcon, CheckIcon, XIcon, ShareIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { ProgressRing } from "../ui/ProgressRing";
import { track } from "../lib/track";
import { shareResult } from "../lib/share";
import { fetchSession, submitAnswers, todayStr, type AnswerOut, type Round } from "../game/session";
import { useAuth } from "../lib/AuthContext";
import { speakAndWaitVoiced, currentVoiceId } from "../lib/tts";
import { bridgeReady } from "../lib/ttsBridge";
import { narrationVoice } from "../lib/voices";
import { currentLang, nativeLangName, targetLangName } from "../lib/i18n";
import { ensureMicPermission, listenOnce, stopListening, setKeepAwake, azureListenOnce, startWalkService, stopWalkService, onScreenState, onWalkStop, speakServerTts, nativeDelay, nativeHttpGet } from "../lib/stt";
import { currentTargetLocale } from "../lib/courses";
import { API_BASE } from "../api/client";
import { spokenMatches, parseSkip, encourage, parseConfirm } from "../lib/voiceMatch";
import { sfx, setSfxScreenOff } from "../lib/sfx";
import { haptic } from "../lib/haptics";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";
import { MicDisclosure } from "../ui/MicDisclosure";
import { hasMicConsent, setMicConsent } from "../lib/micConsent";

const withArtikel = (w: { artikel?: string | null; de: string }) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
const gap = (ms = 850) => nativeDelay(ms); // native (arka planda da çalışır; RN setTimeout ekran-kapalıda durur)

type Phase = "intro" | "teaching" | "speaking" | "listening" | "judging" | "continue" | "done" | "stopped" | "denied";
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
const mapRounds = (rs: Round[]): WalkRound[] =>
  rs.filter((r) => r.word).map((r) => ({ word: mapWord(r.word!), kind: r.game === "intro" ? "intro" : "speak" }));

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
export function WalkModeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();

  const [rounds, setRounds] = useState<WalkRound[]>([]);
  const [idx, setIdx] = useState(0);
  const [curWord, setCurWord] = useState<WalkWord>({ id: 0, de: "", tr: "", en: null });
  const [phase, setPhase] = useState<Phase>("intro");
  const [disclosure, setDisclosure] = useState(false); // belirgin açıklama ve rıza (ilk kullanım)
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [heard, setHeard] = useState("");
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [noMore, setNoMore] = useState(false);
  const [pocket, setPocket] = useState(false); // "cebe koy": ekran siyah ama AÇIK (tanıyıcı çalışsın)
  const [greeting, setGreeting] = useState(false); // Başla sonrası kısa TTS karşılama
  const pocketRef = useRef(false);
  const setPocketMode = (on: boolean) => { pocketRef.current = on; setPocket(on); };
  const screenOffRef = useRef(false); // ücretsiz yol güvenilmez → Azure (adı Android'den; aşağıdaki nota bak)
  const nativeListeningRef = useRef(false); // şu an native dinliyor mu (kesinti gelince hızlı kesmek için)
  const listenCut = useRef(false); // dinlemeyi BİZ kestik mi — boş sonuç kullanıcının sessizliği sayılmasın

  const runToken = useRef(0);
  const mounted = useRef(true);
  const startedAt = useRef(Date.now());
  const wordStart = useRef(Date.now());
  const unheardWin = useRef<boolean[]>([]);
  const tallyRef = useRef({ correct: 0, total: 0 });
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
    void submitAnswers(pending, day.current, final ? secs : 0).catch(() => { answers.current = pending.concat(answers.current); });
  }

  // Walk kuyruğunu yükle (walk=1). Resume YOK — her yürüyüş taze due kelimelerle başlar.
  useEffect(() => {
    let alive = true;
    if (user) {
      fetchSession(day.current, { walk: true }).then((p) => {
        const wr = mapRounds(p.rounds ?? []);
        if (alive && wr.length) { setRounds(wr); setCurWord(wr[0].word); }
      }).catch(() => { /* girişsiz/hatada demo kalır */ });
    }
    return () => { alive = false; };
  }, [user]);

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
      setSfxScreenOff(off); // köprü susar → SFX native ton sentezi
      // Kesinti native dinleme SIRASINDA geldiyse tanıyıcı ölür: 8 sn zaman aşımını bekleme,
      // hemen kes ve kelimeyi bir kez daha sor (bkz. judgeSpeak).
      if (off && nativeListeningRef.current) { listenCut.current = true; try { stopListening(); } catch { /* yut */ } }
    });
    return () => { unsub(); stopWalkService(); };
  }, []);

  // Nabız halkası — YALNIZ dinlerken (mikrofon açıkken); konuşurken sakin.
  useEffect(() => {
    const active = phase === "listening";
    if (!active) { pulse.stopAnimation(); pulse.setValue(0); return; }
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
      listenOnce(currentTargetLocale(), 8000).then((h) => ({ k: "v" as const, heard: h ?? [] })),
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
    // Kaynak: cebe koy YA DA ücretsiz yol güvenilmez (Android: ekran kapalı · iOS: uygulama
    // arka planda — yukarıdaki uzun nota bak) → sunucu (Azure) STT, paralı. Yoksa native.
    const useAzure = pocketRef.current || screenOffRef.current;
    let res: { k: "v"; heard: string[] } | { k: "m" };
    if (useAzure) {
      // Azure: micon HEMEN (setTimeout arka planda durur); micoff kayıt biter bitmez (upload'dan
      // ÖNCE) → verdict'le çakışmaz. Sonra ~1sn upload, sonra verdict.
      sfx("micon");
      res = await Promise.race([
        azureListenOnce(withArtikel(w), 3000, () => sfx("micoff")).then((h) => ({ k: "v" as const, heard: h ?? [] })),
        waitManual().then(() => ({ k: "m" as const })),
      ]);
    } else {
      res = await listenNative();
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
          ? { k: "v" as const, heard: (await azureListenOnce(withArtikel(w), 3000, () => sfx("micoff"))) ?? [] }
          : await listenNative();
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
      const heard = res.heard;
      said = heard[0] ?? "";
      if (said) setHeard(said); // ilk adayı göster (STT mi eşleşme mi belli olsun)
      // Tanıyıcı kısa sözcüğe fazladan kelime ekliyor ("er" → "er im in") ve 2-harfli hedef
      // içerme kuralına (form.length >= CONTAINS_MIN) takılıyor. Tam ifadeyi VE tek tek
      // kelimeleri aday yap → hedef kelime nerede geçerse geçsin exact eşleşsin.
      const cands = heard.flatMap((h) => [h, ...h.split(/\s+/)]).filter(Boolean);
      const unheard = heard.length === 0;
      const ok = !unheard && spokenMatches(cands, [withArtikel(w), w.de]);
      // Sarmalayıcı şart: parseSkip'in ikinci parametresi dil, ama .some()
      // ikinci argüman olarak dizinin index'ini geçirir.
      const skipped = !unheard && !ok && heard.some((h) => parseSkip(h));
      result = unheard ? "unheard" : skipped ? "skip" : ok ? "correct" : "wrong";
    }

    // "Duyamadım" penceresi — üst üste sessizlikte turu durdur (web ile aynı).
    if (result === "unheard") {
      unheardWin.current.push(true);
      if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
      if (unheardWin.current.filter(Boolean).length >= UNHEARD_LIMIT) {
        setVerdict("unheard"); setPhase("judging");
        await sayNative(tx("walk.mic_silent"));
        setKeepAwake(false); stopWalkService(); setPocketMode(false);
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
      setVerdict("correct"); haptic("correct"); sfx("correct");
      await sayTarget(target);
      recordSpeak(w, true);
    } else if (result === "wrong") {
      setVerdict("wrong"); haptic("wrong"); sfx("wrong");
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
    // Cepte YA DA güç tuşuyla ekran kapalı (eller serbest) → sesli "Devam edelim mi?"; ekran açık → görsel özet + butonlar.
    if (pocketRef.current || screenOffRef.current) { await askContinue(alive); return; }
    setKeepAwake(false); stopWalkService();
    setPhase("done");
    void sayNative(tx("walk.tour_done", { total: tallyRef.current.total, correct: tallyRef.current.correct }));
  }

  /** Başla: önce uygulama içi açıklama ve onay (bir kez), sonra sistem izni ve tur. */
  async function beginWalk() {
    if (await hasMicConsent()) { await start(rounds); return; }
    setDisclosure(true);
  }
  async function acceptDisclosure() {
    await setMicConsent(true);
    setDisclosure(false);
    await start(rounds);
  }

  async function start(rs: WalkRound[], greet = true) {
    const granted = await ensureMicPermission();
    if (!granted) { setPhase("denied"); return; }
    setKeepAwake(true); // ekran turu boyunca sönmesin
    startWalkService(); // güç tuşuyla ekran kapansa da arka planda mic açık kalsın (Azure yolu)
    startedAt.current = Date.now();
    tallyRef.current = { correct: 0, total: 0 }; setTally(tallyRef.current);
    unheardWin.current = [];
    if (greet) {
      // Kısa TTS karşılama — doğrudan ilk kelimeye dalmadan.
      setVerdict(null); setHeard(""); setGreeting(true); setPhase("speaking");
      await sayNative(tx("walk.greeting", { lang: targetLangName() }));
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
    } catch { setPhase("done"); }
  }

  function finishDone() { setKeepAwake(false); stopWalkService(); setPocketMode(false); setPhase("done"); }

  /** Cepte tur sonu: mikrofonu bir kez açıp evet/hayır dinle (parseConfirm). */
  async function listenConfirm(alive: () => boolean): Promise<boolean | null> {
    setPhase("continue");
    sfx("micon");
    // Cepte/ekran-kapalı → Azure (Türkçe evet/hayır); ekran açık → native.
    let heard: string[] | null;
    if (pocketRef.current || screenOffRef.current) {
      heard = await azureListenOnce("", 4000, () => sfx("micoff"), "tr");
    } else {
      heard = await listenOnce(currentTargetLocale(), 7000);
      sfx("micoff");
    }
    if (!alive() || !heard) return null;
    for (const s of heard) { const c = parseConfirm(s); if (c !== null) return c; }
    return null;
  }

  /** Sorulanları skip ederek taze walk kuyruğu getir, döngüyü sürdür. */
  async function continueTour(alive: () => boolean) {
    try {
      let payload: { rounds?: Round[] } | null;
      if (pocketRef.current || screenOffRef.current) {
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
        unheardWin.current = []; startedAt.current = Date.now();
        setRounds(wr);
        void runLoop(wr, 0);
        return;
      }
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
    else { if (yes === false) await sayNative(tx("walk.goodbye")); finishDone(); }
  }

  function stopAndLeave() { runToken.current++; stopListening(); setKeepAwake(false); stopWalkService(); nav.goBack(); }
  // Bildirimdeki "Durdur": mikrofon kapanır, biriken cevaplar yazılır, tur özeti gösterilir.
  const stopFromNotification = useRef<() => void>(() => {});
  stopFromNotification.current = () => { runToken.current++; stopListening(); flush(true); finishDone(); };
  useEffect(() => onWalkStop(() => stopFromNotification.current()), []);
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
  const dotColor = verdict === "correct" ? colors.success : verdict === "wrong" ? colors.danger : listening ? colors.primary : colors.surface2;
  const stepLabel = teaching ? tx("walkmode.step_new_word") : phase === "speaking" ? tx("walkmode.step_hint") : phase === "listening" ? tx("walkmode.step_say_now", { target: targetLangName() }) : verdict === "unheard" ? tx("walkmode.step_unheard") : verdict === "skip" ? tx("walkmode.step_skipped") : verdict === "correct" ? tx("walkmode.step_correct") : verdict === "wrong" ? tx("walkmode.step_answer") : "";
  // Sayaç SORU (speak) turlarını gösterir; intro (öğretme) turları soru değil — done (tally) ile tutarlı.
  const speakTotal = rounds.filter((r) => r.kind === "speak").length || rounds.length;
  const speakStep = Math.min(speakTotal, rounds.slice(0, idx).filter((r) => r.kind === "speak").length + (rounds[idx]?.kind === "speak" ? 1 : 0));
  const donePct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const donePad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {phase === "intro" ? (
        <>
          {topBar(false)}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg }}>
            <Mascot mood="wave" size={120} />
            <Text variant="display" style={{ textAlign: "center" }}>{tx("walkmode.listen_and_say_it")}</Text>
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>
              {tx("walkmode.intro_text", { nativeLang: nativeLangName(), target: targetLangName() })}
            </Text>
            <PressableScale onPress={() => { void beginWalk(); }} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.md }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color="#fff">{tx("common.start")}</Text>
            </PressableScale>
            <PressableScale onPress={() => setDisclosure(true)} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.xs }}>
              <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{tx("walkmode.about_microphone_and_voice_data")}</Text>
            </PressableScale>
          </View>
        </>
      ) : phase === "done" ? (
        // Diğer oyunlarla (GameScreen) bütünlük: sağ üst X, ProgressRing, mascot, Tur bitti + Devam/Paylaş/Bitir.
        <View style={donePad}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={tx("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Celebrate show={tally.total > 0 && donePct >= 60} />
            <Mascot mood={tally.total > 0 ? (donePct >= 60 ? "celebrate" : "happy") : "idle"} size={104} />
            <ProgressRing size={150} stroke={14} pct={donePct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
              <Text variant="display" color={colors.primary}>{tally.correct}/{tally.total || 0}</Text>
              <Text variant="micro" color={colors.textMuted}>{tx("walkmode.correct")}</Text>
            </ProgressRing>
            <Text variant="h1" style={{ marginTop: spacing.xl }}>{tx(noMore ? "walkmode.done_no_more" : "walkmode.done_title")}</Text>
            <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
              {tx(noMore ? "walkmode.done_no_more_sub" : "walkmode.done_saved")}
            </Text>
            {!noMore && (
              <PressableScale onPress={newTour} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color="#fff">{tx("walkmode.continue")}</Text></PressableScale>
            )}
            {tally.total > 0 && (
              <PressableScale onPress={() => shareResult(tally.correct, tally.total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
                <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>{tx("common.share")}</Text>
              </PressableScale>
            )}
            <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>{tx("common.finish")}</Text></PressableScale>
          </View>
        </View>
      ) : phase === "stopped" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Mascot mood="idle" size={100} />
          <Text variant="h2" style={{ textAlign: "center" }}>{tx("walkmode.i_paused_round")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("walkmode.i_haven_t_heard_you_for_while")}</Text>
          <PressableScale onPress={() => { unheardWin.current = []; void runLoop(rounds, idx); }} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{tx("walkmode.continue")}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{tx("common.finish")}</Text>
          </PressableScale>
        </View>
      ) : phase === "denied" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <MicIcon color={colors.textMuted} size={64} />
          <Text variant="h2" style={{ textAlign: "center" }}>{tx("walkmode.microphone_needed")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("walkmode.walk_mode_works_by_voice_allow")}</Text>
          <PressableScale onPress={() => start(rounds)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{tx("walkmode.allow_and_start")}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{tx("common.discard")}</Text>
          </PressableScale>
        </View>
      ) : greeting ? (
        <>
          {topBar(true)}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg }}>
            <Mascot mood="wave" size={124} />
            <Text variant="h1">{tx("walkmode.here_we_go")}</Text>
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("walkmode.listen_first_word_coming_up")}</Text>
          </View>
        </>
      ) : (
        <>
          {topBar(true)}
          <View style={{ flex: 1, paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.md }}>
            {/* durum rozeti */}
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: (teaching ? colors.primary : colors.info) + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
                <WalkIcon color={teaching ? colors.primary : colors.info} size={15} />
                <Text variant="caption" color={teaching ? colors.primary : colors.info}>{tx(teaching ? "walkmode.badge_teaching" : "walkmode.badge_walking")}</Text>
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

              <View style={{ alignItems: "center", gap: 4, minHeight: 46 }}>
                <Text variant="bodyStrong" color={verdict === "correct" ? colors.success : verdict === "wrong" ? colors.danger : listening ? colors.primary : colors.textMuted}>{stepLabel}</Text>
                {heard ? <Text variant="caption" color={verdict === "correct" ? colors.success : colors.danger}>{tx("walkmode.heard", { text: heard })}</Text> : null}
              </View>
            </View>

            {/* alt: Atla + Cebe koy */}
            <View style={{ alignItems: "center", gap: spacing.xs }}>
              {phase === "listening" ? (
                <PressableScale onPress={skipNow} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: spacing.sm }}>
                  <Text variant="bodyStrong" color={colors.textMuted}>{tx("walkmode.skip")}</Text><ChevronRightIcon color={colors.textMuted} size={18} />
                </PressableScale>
              ) : (
                <View style={{ height: 40 }} />
              )}
              {/* Cebe koy: ekran siyah ama AÇIK kalır (tanıyıcı çalışsın); eller serbest, tur sonunda sesli devam. */}
              <PressableScale onPress={() => setPocketMode(true)} style={{ paddingVertical: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted}>{tx("walkmode.pocket_it_dim_screen")}</Text>
              </PressableScale>
            </View>
          </View>
        </>
      )}

      {/* Cepte kipi: tam ekran siyah katman. Ekran teknik olarak AÇIK kalır (tanıyıcı
          susmaz); dokununca uyanır. Web'in "ekranı karart" yaklaşımının birebiri. */}
      {pocket ? (
        <Pressable onPress={() => setPocketMode(false)} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
          <MicIcon color="#1c1c1c" size={44} />
          <Text variant="caption" color="#2a2a2a" style={{ marginTop: 14 }}>{tx("walkmode.listening_tap_to_wake")}</Text>
        </Pressable>
      ) : null}
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
      <MicDisclosure visible={disclosure} onAccept={() => { void acceptDisclosure(); }} onCancel={() => setDisclosure(false)} />
    </View>
  );
}
