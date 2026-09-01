import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronRightIcon, WalkIcon, MicIcon, CheckIcon, XIcon, ShareIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { ProgressRing } from "../ui/ProgressRing";
import { DEMO_WORDS, type Word } from "../data/demoWords";
import { track } from "../lib/track";
import { shareResult } from "../lib/share";
import { fetchSession, submitAnswers, todayStr, type AnswerOut, type Round } from "../game/session";
import { useAuth } from "../lib/AuthContext";
import { speakAndWaitVoiced, currentVoiceId } from "../lib/tts";
import { TURKISH_VOICE } from "../lib/voices";
import { ensureMicPermission, listenOnce, stopListening, setKeepAwake, azureListenOnce, startWalkService, stopWalkService, onScreenState, speakServerTts, nativeDelay } from "../lib/stt";
import { spokenMatches, parseSkipDe, encourage, parseConfirm } from "../lib/voiceMatch";
import { sfx, setSfxScreenOff } from "../lib/sfx";
import { haptic } from "../lib/haptics";
import { useTheme, spacing, radii, softShadow } from "../theme";

const withArtikel = (w: { artikel?: string | null; de: string }) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
const gap = (ms = 850) => nativeDelay(ms); // native (arka planda da çalışır; RN setTimeout ekran-kapalıda durur)

type Phase = "intro" | "teaching" | "speaking" | "listening" | "judging" | "continue" | "done" | "stopped" | "denied";
type Verdict = "correct" | "wrong" | "skip" | "unheard" | null;

/** Yürüyüş kelimesi — demo Word + oyunların gösterdiği İngilizce gloss (`en`). */
type WalkWord = { id: number; de: string; tr: string; artikel?: Word["artikel"]; en?: string | null };
/** Web walk turu: tek kelime + tür (intro = yeni kelimeyi öğret; speak = sor). */
type WalkRound = { word: WalkWord; kind: "intro" | "speak" };

// "Duyamadım" penceresi: son 4 turun 3'ü sessizse turu durdur (web ile aynı).
const UNHEARD_WINDOW = 4;
const UNHEARD_LIMIT = 3;

const mapWord = (w: { id: number; de: string; tr: string; artikel?: string | null; en?: string | null }): WalkWord =>
  ({ id: w.id, de: w.de, tr: w.tr, artikel: (w.artikel as Word["artikel"]) ?? undefined, en: w.en ?? null });
const mapRounds = (rs: Round[]): WalkRound[] =>
  rs.filter((r) => r.word).map((r) => ({ word: mapWord(r.word!), kind: r.game === "intro" ? "intro" : "speak" }));
const DEMO_ROUNDS: WalkRound[] = DEMO_WORDS.map((w) => ({ word: w, kind: "speak" as const }));

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

  const [rounds, setRounds] = useState<WalkRound[]>(DEMO_ROUNDS);
  const [idx, setIdx] = useState(0);
  const [curWord, setCurWord] = useState<WalkWord>(DEMO_WORDS[0]);
  const [phase, setPhase] = useState<Phase>("intro");
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [heard, setHeard] = useState("");
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const [noMore, setNoMore] = useState(false);
  const [pocket, setPocket] = useState(false); // "cebe koy": ekran siyah ama AÇIK (tanıyıcı çalışsın)
  const [greeting, setGreeting] = useState(false); // Başla sonrası kısa TTS karşılama
  const pocketRef = useRef(false);
  const setPocketMode = (on: boolean) => { pocketRef.current = on; setPocket(on); };
  const screenOffRef = useRef(false); // güç tuşuyla ekran kapalı → Azure kaynağı
  const nativeListeningRef = useRef(false); // şu an native dinliyor mu (ekran kapanınca hızlı kesmek için)

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

  // Ekran kapalıyken TTS'i NATIVE MediaPlayer'la çal (WebView köprüsü askıda/sessiz); açıkken köprü.
  const sayTR = (t: string) => (screenOffRef.current ? speakServerTts(TURKISH_VOICE, t) : speakAndWaitVoiced(t, TURKISH_VOICE));
  const sayDE = (t: string) => (screenOffRef.current ? speakServerTts(currentVoiceId(), t) : speakAndWaitVoiced(t, currentVoiceId()));

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
    track("walk_start", 0);
    mounted.current = true;
    return () => { mounted.current = false; runToken.current++; stopListening(); setKeepAwake(false); stopWalkService(); flush(true); };
  }, []);

  // Güç-tuşu ekran on/off izle: kapalı→Azure, açık→native (kelime sınırında geçer, kesmez).
  // Ekran native dinleme SIRASINDA kapanırsa recognizer ölür → dinlemeyi hızlı kes ki
  // kelime Azure ile tekrar sorulabilsin (bkz. judgeSpeak).
  useEffect(() => {
    const unsub = onScreenState((off) => {
      screenOffRef.current = off;
      setSfxScreenOff(off); // ekran kapalı → SFX native res/raw (köprü susar)
      if (off && nativeListeningRef.current) { try { stopListening(); } catch { /* yut */ } }
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
  }, [phase]);

  function waitManual(): Promise<boolean | "skip"> {
    return new Promise((resolve) => { manualResolve.current = resolve; });
  }
  function resolveManual(v: boolean | "skip") {
    const r = manualResolve.current; manualResolve.current = null;
    if (r) r(v);
  }

  /** Yeni kelimeyi öğret (intro turu): anons + Almanca + Türkçe + Almanca. Soru YOK. */
  async function teachIntro(w: WalkWord, alive: () => boolean): Promise<boolean> {
    setPhase("teaching"); setVerdict(null); setHeard(""); wordStart.current = Date.now();
    const target = withArtikel(w);
    await sayTR("Yeni kelime."); if (!alive()) return true;
    await sayDE(target); if (!alive()) return true;
    await sayTR(w.tr); if (!alive()) return true;
    await sayDE(target); if (!alive()) return true;
    if (user && typeof w.id === "number") answers.current.push({ wordId: w.id, game: "intro", correct: true, latencyMs: 0 });
    return false;
  }

  /** Kelimeyi sor (speak turu). justTaught: az önce intro'da öğretilen kelime → "Şimdi sen söyle".
      "stopped" = duyamadım penceresi turu durdurdu. */
  async function judgeSpeak(w: WalkWord, alive: () => boolean, justTaught: boolean): Promise<"ok" | "stopped"> {
    setPhase("speaking"); setVerdict(null); setHeard(""); wordStart.current = Date.now();
    if (justTaught) { await sayTR("Şimdi sen söyle."); if (!alive()) return "ok"; } // yeni kelime → geçiş
    await sayTR(w.tr); // Türkçe ipucu (Emel)
    if (!alive()) return "ok";

    await gap(150); // TTS kuyruğu kısaca otursun (mic kendi sesimizi kapmasın)
    if (!alive()) return "ok";
    setPhase("listening");
    // TRICK: önce mic AÇILIR, ~180ms SONRA "şimdi konuş" sesi çalar. Böylece kullanıcı sesi
    // duyar duymaz başlasa bile mic zaten açık → kısa kelimenin ilk hecesi kaçmaz (güvenli).
    // Kaynak: cebe koy YA DA güç tuşuyla ekran kapalı → sunucu (Azure) STT (paralı). Ekran açık → ücretsiz native.
    const useAzure = pocketRef.current || screenOffRef.current;
    nativeListeningRef.current = !useAzure;
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
      // Native: mic-aç trick — mic açıldıktan ~180ms sonra micon (ilk hece kaçmasın).
      const listenP = Promise.race([
        listenOnce("de-DE", 8000).then((h) => ({ k: "v" as const, heard: h ?? [] })),
        waitManual().then(() => ({ k: "m" as const })),
      ]);
      const miconTimer = setTimeout(() => sfx("micon"), 180);
      res = await listenP;
      clearTimeout(miconTimer);
      stopListening();
      sfx("micoff");
      // Native dinleme SIRASINDA ekran kapandıysa recognizer ölür → boşsa aynı kelimeyi Azure ile tekrar.
      if (res.k === "v" && res.heard.length === 0 && screenOffRef.current && alive()) {
        await sayTR(w.tr);
        const h2 = await azureListenOnce(withArtikel(w), 3000, () => sfx("micoff"));
        res = { k: "v" as const, heard: h2 ?? [] };
      }
    }
    nativeListeningRef.current = false;
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
      const skipped = !unheard && !ok && heard.some(parseSkipDe);
      result = unheard ? "unheard" : skipped ? "skip" : ok ? "correct" : "wrong";
    }

    // "Duyamadım" penceresi — üst üste sessizlikte turu durdur (web ile aynı).
    if (result === "unheard") {
      unheardWin.current.push(true);
      if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
      if (unheardWin.current.filter(Boolean).length >= UNHEARD_LIMIT) {
        setVerdict("unheard"); setPhase("judging");
        await sayTR("Sesini duyamıyorum. Turu durdurdum; mikrofonu kontrol edip hazır olunca devam et.");
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
      await sayDE(target);
      recordSpeak(w, true);
    } else if (result === "wrong") {
      setVerdict("wrong"); haptic("wrong"); sfx("wrong");
      await sayTR("Doğrusu:"); await sayDE(target);
      recordSpeak(w, false);
    } else if (result === "skip") {
      setVerdict("skip");
      await sayTR(encourage()); await sayDE(target);
      // atla: SRS'e yazılmaz
    } else {
      setVerdict("unheard");
      await sayTR("Duyamadım."); await sayDE(target);
      // duyulmadı: SRS'e yazılmaz (kelime due kalır, sonraki yürüyüşte gelir) — web ile aynı
    }
    return "ok";
  }

  function recordSpeak(w: WalkWord, ok: boolean) {
    tallyRef.current = { correct: tallyRef.current.correct + (ok ? 1 : 0), total: tallyRef.current.total + 1 };
    setTally(tallyRef.current);
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
    // Cepte (eller serbest) → sesli "Devam edelim mi?"; ekran açık → görsel özet + butonlar.
    if (pocketRef.current) { await askContinue(alive); return; }
    setKeepAwake(false); stopWalkService();
    setPhase("done");
    void sayTR(`Tur bitti. ${tallyRef.current.total} sorudan ${tallyRef.current.correct} doğru.`);
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
      await sayTR("Hazırsan başlıyoruz. Türkçesini duy, Almancasını söyle.");
      setGreeting(false);
      if (!mounted.current) return;
    }
    void runLoop(rs, 0);
  }

  // Devam / yeni tur: sorulanları skip ederek taze walk kuyruğu getir. Tekrar kalmadıysa bildir.
  async function newTour() {
    if (!user) { start(DEMO_ROUNDS, false); return; }
    setPhase("intro"); setNoMore(false);
    try {
      const p = await fetchSession(day.current, { walk: true, skip: Array.from(askedIds.current) });
      const wr = mapRounds(p.rounds ?? []);
      if (wr.length) { setRounds(wr); setCurWord(wr[0].word); start(wr, false); return; }
      setNoMore(true); setPhase("done"); void sayTR("Bugünlük tekrar kalmadı.");
    } catch { setPhase("done"); }
  }

  function finishDone() { setKeepAwake(false); stopWalkService(); setPocketMode(false); setPhase("done"); }

  /** Cepte tur sonu: mikrofonu bir kez açıp evet/hayır dinle (parseConfirm). */
  async function listenConfirm(alive: () => boolean): Promise<boolean | null> {
    setPhase("continue");
    sfx("micon");
    const heard = await listenOnce("de-DE", 7000);
    sfx("micoff");
    if (!alive() || !heard) return null;
    for (const s of heard) { const c = parseConfirm(s); if (c !== null) return c; }
    return null;
  }

  /** Sorulanları skip ederek taze walk kuyruğu getir, döngüyü sürdür. */
  async function continueTour(alive: () => boolean) {
    try {
      const p = await fetchSession(day.current, { walk: true, skip: Array.from(askedIds.current) });
      const wr = mapRounds(p.rounds ?? []);
      if (!alive()) return;
      if (wr.length) {
        tallyRef.current = { correct: 0, total: 0 }; setTally(tallyRef.current);
        unheardWin.current = []; startedAt.current = Date.now();
        setRounds(wr);
        void runLoop(wr, 0);
        return;
      }
      await sayTR("Bugünlük tekrar kalmadı."); setNoMore(true); finishDone();
    } catch { finishDone(); }
  }

  /** Cepte (eller serbest) tur sonunda sesli devam sorusu — web askContinue ile aynı. */
  async function askContinue(alive: () => boolean) {
    const c = tallyRef.current;
    setPhase("continue");
    await sayTR(`Tur bitti. ${c.total} sorudan ${c.correct} doğru. Devam edelim mi?`);
    if (!alive()) return;
    let yes = await listenConfirm(alive);
    if (yes === null && alive()) {
      await sayTR("Devam edelim mi? Evet ya da hayır de.");
      yes = await listenConfirm(alive);
    }
    if (!alive()) return;
    if (yes === true) { await sayTR("Devam ediyoruz."); await continueTour(alive); }
    else { if (yes === false) await sayTR("Tamam, iyi günler."); finishDone(); }
  }

  function stopAndLeave() { runToken.current++; stopListening(); setKeepAwake(false); stopWalkService(); nav.goBack(); }
  function skipNow() { resolveManual("skip"); }

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const teaching = phase === "teaching";
  const reveal = phase === "judging" || teaching; // Almanca göster: cevap açılınca veya öğretirken
  const listening = phase === "listening";
  const dotColor = verdict === "correct" ? colors.success : verdict === "wrong" ? colors.danger : listening ? colors.primary : colors.surface2;
  const stepLabel = teaching ? "Yeni kelime" : phase === "speaking" ? "İpucu okunuyor…" : phase === "listening" ? "Şimdi Almancasını söyle" : verdict === "unheard" ? "Duyamadım" : verdict === "skip" ? "Atlandı" : verdict === "correct" ? "Doğru!" : verdict === "wrong" ? "Doğrusu" : "";
  const total = rounds.length;
  const donePct = tally.total ? Math.round((tally.correct / tally.total) * 100) : 0;
  const donePad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  const topBar = (withProgress: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, marginBottom: spacing.xl }}>
      <PressableScale onPress={stopAndLeave} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
      {withProgress ? (
        <>
          <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${Math.round(((idx + 1) / Math.max(1, total)) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
          </View>
          <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{total}</Text>
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
            <Text variant="display" style={{ textAlign: "center" }}>Dinle ve söyle</Text>
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>
              Türkçe ipucunu duyacaksın, sen Almancasını söyleyeceksin. Yeni kelimeyi önce birlikte öğreniriz. Yürürken, otururken — ekrana bakmadan.
            </Text>
            <PressableScale onPress={() => start(rounds)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.md }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color="#fff">Başla</Text>
            </PressableScale>
          </View>
        </>
      ) : phase === "done" ? (
        // Diğer oyunlarla (GameScreen) bütünlük: sağ üst X, ProgressRing, mascot, Tur bitti + Devam/Paylaş/Bitir.
        <View style={donePad}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Celebrate show={tally.total > 0 && donePct >= 60} />
            <Mascot mood={tally.total > 0 ? (donePct >= 60 ? "celebrate" : "happy") : "idle"} size={104} />
            <ProgressRing size={150} stroke={14} pct={donePct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
              <Text variant="display" color={colors.primary}>{tally.correct}/{tally.total || 0}</Text>
              <Text variant="micro" color={colors.textMuted}>doğru</Text>
            </ProgressRing>
            <Text variant="h1" style={{ marginTop: spacing.xl }}>{noMore ? "Bugünlük bu kadar" : "Tur bitti!"}</Text>
            <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
              {noMore ? "Şu an tekrar edilecek kelime yok — yarın yeniden gel." : "İlerlemen kaydedildi."}
            </Text>
            {!noMore && (
              <PressableScale onPress={newTour} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color="#fff">Devam et</Text></PressableScale>
            )}
            {tally.total > 0 && (
              <PressableScale onPress={() => shareResult(tally.correct, tally.total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
                <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>Paylaş</Text>
              </PressableScale>
            )}
            <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text></PressableScale>
          </View>
        </View>
      ) : phase === "stopped" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Mascot mood="idle" size={100} />
          <Text variant="h2" style={{ textAlign: "center" }}>Turu duraklattım</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Sesini bir süredir duyamadım. Mikrofonu kontrol edip devam edebilirsin.</Text>
          <PressableScale onPress={() => { unheardWin.current = []; void runLoop(rounds, idx); }} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">Devam et</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text>
          </PressableScale>
        </View>
      ) : phase === "denied" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <MicIcon color={colors.textMuted} size={64} />
          <Text variant="h2" style={{ textAlign: "center" }}>Mikrofon gerekli</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Yürüyüş modu sesli çalışır. Devam etmek için mikrofon iznini ver.</Text>
          <PressableScale onPress={() => start(rounds)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">İzin ver ve başla</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Vazgeç</Text>
          </PressableScale>
        </View>
      ) : greeting ? (
        <>
          {topBar(true)}
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg }}>
            <Mascot mood="wave" size={124} />
            <Text variant="h1">Başlıyoruz</Text>
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Dinle… birazdan ilk kelime.</Text>
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
                <Text variant="caption" color={teaching ? colors.primary : colors.info}>{teaching ? "Yeni kelime öğreniyoruz" : "Yürürken çalış · ekrana bakmadan"}</Text>
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

              <View style={{ alignItems: "center", justifyContent: "center", height: 104 }}>
                {listening ? <Animated.View style={{ position: "absolute", width: 96, height: 96, borderRadius: 48, backgroundColor: dotColor, opacity: ringOpacity, transform: [{ scale: ringScale }] }} /> : null}
                <Animated.View style={{ transform: [{ scale: listening ? scale : 1 }] }}>
                  <View style={[{ width: 96, height: 96, borderRadius: 48, backgroundColor: dotColor, alignItems: "center", justifyContent: "center" }, listening ? softShadow(colors.primary, 14) : {}]}>
                    {verdict === "correct" ? <CheckIcon color="#fff" size={42} /> : verdict === "wrong" ? <XIcon color="#fff" size={42} /> : <MicIcon color={listening ? "#fff" : colors.textFaint} size={42} />}
                  </View>
                </Animated.View>
              </View>

              <View style={{ alignItems: "center", gap: 4, minHeight: 46 }}>
                <Text variant="bodyStrong" color={verdict === "correct" ? colors.success : verdict === "wrong" ? colors.danger : listening ? colors.primary : colors.textMuted}>{stepLabel}</Text>
                {heard ? <Text variant="caption" color={verdict === "correct" ? colors.success : colors.danger}>duyduğum: “{heard}”</Text> : null}
              </View>
            </View>

            {/* alt: Atla + Cebe koy */}
            <View style={{ alignItems: "center", gap: spacing.xs }}>
              {phase === "listening" ? (
                <PressableScale onPress={skipNow} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: spacing.sm }}>
                  <Text variant="bodyStrong" color={colors.textMuted}>Atla</Text><ChevronRightIcon color={colors.textMuted} size={18} />
                </PressableScale>
              ) : (
                <View style={{ height: 40 }} />
              )}
              {/* Cebe koy: ekran siyah ama AÇIK kalır (tanıyıcı çalışsın); eller serbest, tur sonunda sesli devam. */}
              <PressableScale onPress={() => setPocketMode(true)} style={{ paddingVertical: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted}>Cebe koy · ekranı karart</Text>
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
          <Text variant="caption" color="#2a2a2a" style={{ marginTop: 14 }}>dinliyorum · dokun ve uyandır</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
