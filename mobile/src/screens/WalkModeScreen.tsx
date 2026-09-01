import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, WalkIcon, MicIcon, SpeakerIcon, CheckIcon, XIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { DEMO_WORDS, type Word } from "../data/demoWords";
import { track } from "../lib/track";
import { fetchSession, submitAnswers, todayStr, type AnswerOut } from "../game/session";
import { useAuth } from "../lib/AuthContext";
import { speakAndWaitVoiced, currentVoiceId } from "../lib/tts";
import { TURKISH_VOICE } from "../lib/voices";
import { ensureMicPermission, listenOnce, stopListening } from "../lib/stt";
import { spokenMatches, parseSkipDe, encourage } from "../lib/voiceMatch";
import { sfx } from "../lib/sfx";
import { haptic } from "../lib/haptics";
import { useTheme, spacing, radii, softShadow } from "../theme";

const withArtikel = (w: { artikel?: string | null; de: string }) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
const gap = (ms = 650) => new Promise<void>((r) => setTimeout(r, ms));

type Phase = "intro" | "speaking" | "listening" | "judging" | "done" | "stopped" | "denied";
type Verdict = "correct" | "wrong" | "skip" | "unheard" | null;

// "Duyamadım" penceresi: son 4 turun 3'ü sessizse turu durdur (web ile aynı).
const UNHEARD_WINDOW = 4;
const UNHEARD_LIMIT = 3;

/**
 * Yürüyüş modu (§4 — manşet). Web'in "yürürken modu" döngüsünün birebir mobil
 * karşılığı: Türkçe ipucu SESLİ (Emel) okunur → kullanıcı Almancayı SÖYLER (native
 * STT) → hüküm (spokenMatches) → doğru/yanlış/atla/Duyamadım geri bildirimi (doğru
 * cevap kullanıcının Katja/Conrad'ıyla okunur) → SRS'e ("speak") yazılır → sıradaki.
 * Sesler Edge köprüsünden (web'le birebir); mikrofon yoksa elle Bildim/Bilemedim.
 */
export function WalkModeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();

  const [list, setList] = useState<Word[]>(DEMO_WORDS);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [verdict, setVerdict] = useState<Verdict>(null);
  const [heard, setHeard] = useState("");
  const [tally, setTally] = useState({ correct: 0, total: 0 });

  const runToken = useRef(0);
  const mounted = useRef(true);
  const startedAt = useRef(Date.now());
  const wordStart = useRef(Date.now());
  const unheardWin = useRef<boolean[]>([]);
  const tallyRef = useRef({ correct: 0, total: 0 });
  const manualResolve = useRef<((v: boolean | "skip") => void) | null>(null);
  const pulse = useRef(new Animated.Value(0)).current;

  const word = list[idx];

  useEffect(() => {
    track("walk_start", 0);
    mounted.current = true;
    let alive = true;
    if (user) {
      fetchSession(undefined, { walk: true }).then((p) => {
        const ws = (p.rounds ?? []).map((r) => r.word).filter((w): w is NonNullable<typeof w> => !!w)
          .map((w) => ({ id: w.id, de: w.de, tr: w.tr, artikel: (w.artikel as Word["artikel"]) ?? undefined }));
        if (alive && ws.length) setList(ws);
      }).catch(() => {});
    }
    return () => { alive = false; mounted.current = false; runToken.current++; stopListening(); };
  }, [user]);

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

  const sayTR = (t: string) => speakAndWaitVoiced(t, TURKISH_VOICE);
  const sayDE = (t: string) => speakAndWaitVoiced(t, currentVoiceId());

  function waitManual(): Promise<boolean | "skip"> {
    return new Promise((resolve) => { manualResolve.current = resolve; });
  }
  function resolveManual(v: boolean | "skip") {
    const r = manualResolve.current; manualResolve.current = null;
    if (r) r(v);
  }

  function record(w: Word, ok: boolean) {
    tallyRef.current = { correct: tallyRef.current.correct + (ok ? 1 : 0), total: tallyRef.current.total + 1 };
    setTally(tallyRef.current);
    if (user && typeof w.id === "number") {
      const a: AnswerOut = { wordId: w.id, game: "speak", correct: ok, latencyMs: Math.max(0, Date.now() - wordStart.current) };
      void submitAnswers([a], todayStr(), Math.round((Date.now() - startedAt.current) / 1000)).catch(() => {});
    }
  }

  async function runLoop(words: Word[], startIdx: number) {
    const my = ++runToken.current;
    const alive = () => my === runToken.current && mounted.current;
    for (let i = startIdx; i < words.length; i++) {
      if (!alive()) return;
      const w = words[i];
      setIdx(i); setVerdict(null); setHeard(""); wordStart.current = Date.now();

      setPhase("speaking");
      await sayTR(w.tr); // Türkçe ipucu (Emel)
      if (!alive()) return;

      // Cevabı topla: SESLİ (STT). "Atla" ile ses olmadan da geçilebilir.
      setPhase("listening");
      sfx("tap"); // mikrofon açıldı ipucu (web onOpen cue)
      const res = await Promise.race([
        listenOnce("de-DE", 8000).then((h) => ({ k: "v" as const, said: (h ?? "").trim() })),
        waitManual().then(() => ({ k: "m" as const })),
      ]);
      stopListening();
      sfx("tap"); // mikrofon kapandı ipucu (web onClose cue)
      manualResolve.current = null;
      if (!alive()) return;
      let result: "correct" | "wrong" | "skip" | "unheard";
      let said = "";
      if (res.k === "m") {
        result = "skip"; // Atla
      } else {
        said = res.said;
        const unheard = !said;
        const ok = !unheard && spokenMatches([said], [withArtikel(w), w.de]);
        const skipped = !unheard && !ok && parseSkipDe(said);
        result = unheard ? "unheard" : skipped ? "skip" : ok ? "correct" : "wrong";
      }

      // "Duyamadım" penceresi — üst üste sessizlikte turu durdur.
      if (result === "unheard") {
        unheardWin.current.push(true);
        if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
        if (unheardWin.current.filter(Boolean).length >= UNHEARD_LIMIT) {
          setVerdict("unheard"); setPhase("judging");
          await sayTR("Sesini duyamıyorum. Turu durdurdum; mikrofonu kontrol edip hazır olunca devam et.");
          if (alive()) setPhase("stopped");
          return;
        }
      } else {
        unheardWin.current.push(false);
        if (unheardWin.current.length > UNHEARD_WINDOW) unheardWin.current.shift();
      }

      // Geri bildirim (web akışı): DOĞRU ise kısa "Doğru" (Almancayı tekrar okumaya
      // gerek yok — bildin); YANLIŞ/atla/duyulmadı ise "Doğrusu:" + doğru Almanca okunur.
      setPhase("judging");
      if (result === "correct") {
        setVerdict("correct"); haptic("correct"); sfx("correct");
        await sayTR("Doğru.");
        record(w, true);
      } else if (result === "wrong") {
        setVerdict("wrong"); setHeard(said); haptic("wrong"); sfx("wrong");
        await sayTR("Doğrusu:"); await sayDE(withArtikel(w));
        record(w, false);
      } else if (result === "skip") {
        setVerdict("skip"); setHeard(said);
        await sayTR(encourage()); await sayDE(withArtikel(w));
        // atlama: SRS'e yazılmaz, yanlış sayılmaz
      } else {
        setVerdict("unheard");
        await sayTR("Duyamadım."); await sayDE(withArtikel(w));
        // sessizlik yanlış sayılmaz
      }
      if (!alive()) return;
      await gap();
    }
    if (!alive()) return;
    setPhase("done");
    void sayTR(`Tur bitti. ${tallyRef.current.total} sorudan ${tallyRef.current.correct} doğru.`);
  }

  async function start(fromIdx: number) {
    // Sesli mod mikrofon ister. Voice.isAvailable()'a GÜVENMİYORUZ (bazı cihazlarda
    // tanıyıcı kurulu olsa da yanlış false dönüyor); izin varsa doğrudan dinleriz.
    const granted = await ensureMicPermission();
    if (!granted) { setPhase("denied"); return; }
    startedAt.current = Date.now();
    if (fromIdx === 0) { tallyRef.current = { correct: 0, total: 0 }; setTally(tallyRef.current); unheardWin.current = []; }
    void runLoop(list, fromIdx);
  }

  function stopAndLeave() { runToken.current++; stopListening(); nav.goBack(); }
  function skipNow() { resolveManual("skip"); }

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const showAnswer = phase === "judging";
  const listening = phase === "listening";
  const dotColor = verdict === "wrong" ? colors.danger : verdict === "correct" ? colors.success : verdict === "unheard" ? colors.textMuted : listening ? colors.primary : colors.info;
  const stepLabel = phase === "speaking" ? "İpucu okunuyor…" : phase === "listening" ? "Şimdi Almancasını söyle" : verdict === "unheard" ? "Duyamadım" : verdict === "skip" ? "Atlandı" : verdict === "correct" ? "Doğru!" : verdict === "wrong" ? "Doğrusu" : "";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={stopAndLeave} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2" style={{ flex: 1 }}>Yürüyüş modu</Text>
        {phase !== "intro" && phase !== "done" && <Text variant="caption" color={colors.textMuted}>{idx + 1}/{list.length}</Text>}
      </View>

      {phase === "intro" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl, gap: spacing.lg }}>
          <Mascot mood="wave" size={120} />
          <Text variant="display" style={{ textAlign: "center" }}>Kulakla öğren</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>
            Türkçe ipucunu duyacaksın, sen Almancasını söyleyeceksin. Doğrusunu birlikte dinleriz. Yürürken, otururken — ekrana bakmadan.
          </Text>
          <PressableScale onPress={() => start(0)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.md }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">Başla</Text>
          </PressableScale>
        </View>
      ) : phase === "done" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Celebrate show />
          <Mascot mood="celebrate" size={110} />
          <Text variant="display">Tur bitti</Text>
          <Text variant="h2" color={colors.primary}>{tally.correct}/{tally.total} doğru</Text>
          <PressableScale onPress={() => start(0)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">Yeni tur</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text>
          </PressableScale>
        </View>
      ) : phase === "stopped" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Mascot mood="idle" size={100} />
          <Text variant="h2" style={{ textAlign: "center" }}>Turu duraklattım</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Sesini bir süredir duyamadım. Mikrofonu kontrol edip devam edebilirsin.</Text>
          <PressableScale onPress={() => { unheardWin.current = []; start(idx); }} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
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
          <PressableScale onPress={() => start(0)} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">İzin ver ve başla</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Vazgeç</Text>
          </PressableScale>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.info + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
            <WalkIcon color={colors.info} size={16} /><Text variant="caption" color={colors.info}>Kulakla öğren · yürürken çalış</Text>
          </View>

          {/* Gösterim SESLE senkron: konuşurken/dinlerken Türkçe ipucu; cevap
              açılınca (judging) Almanca doğru cevap öne çıkar (o an okunan da o). */}
          <View style={{ alignItems: "center", marginTop: spacing.xxxl, marginBottom: spacing.xl, minHeight: 150, justifyContent: "center" }}>
            <Text variant="display" color={showAnswer ? colors.text : colors.textMuted} style={{ marginTop: spacing.sm, textAlign: "center" }}>
              {showAnswer ? withArtikel(word) : word.tr}
            </Text>
            {showAnswer && <Text variant="h3" color={colors.textMuted} style={{ marginTop: 4 }}>{word.tr}</Text>}
            {heard ? <Text variant="caption" color={verdict === "correct" ? colors.success : colors.danger} style={{ marginTop: spacing.sm }}>duyduğum: “{heard}”</Text> : null}
            <Text variant="caption" color={verdict === "correct" ? colors.success : verdict === "wrong" ? colors.danger : colors.textMuted} style={{ marginTop: spacing.md }}>{stepLabel}</Text>
          </View>

          <View style={{ alignItems: "center", justifyContent: "center", height: 120 }}>
            {/* Nabız halkası YALNIZ dinlerken — mikrofonun gerçekten açık olduğu an. */}
            {listening ? <Animated.View style={{ position: "absolute", width: 92, height: 92, borderRadius: 46, backgroundColor: dotColor, opacity: ringOpacity, transform: [{ scale: ringScale }] }} /> : null}
            <Animated.View style={{ transform: [{ scale: listening ? scale : 1 }] }}>
              <View style={[{ width: 92, height: 92, borderRadius: 46, backgroundColor: dotColor, alignItems: "center", justifyContent: "center" }, softShadow(dotColor, 14)]}>
                {verdict === "correct" ? <CheckIcon color="#fff" size={40} /> : verdict === "wrong" ? <XIcon color="#fff" size={40} /> : phase === "speaking" ? <SpeakerIcon color="#fff" size={40} /> : <MicIcon color="#fff" size={40} />}
              </View>
            </Animated.View>
          </View>

          {/* Web'de elle onay YOK — yalnız sesli. Sesle geçmek istemezsen "Atla". */}
          {phase === "listening" ? (
            <PressableScale onPress={skipNow} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: spacing.xl, paddingVertical: spacing.sm }}>
              <Text variant="bodyStrong" color={colors.textMuted}>Atla</Text><ChevronRightIcon color={colors.textMuted} size={18} />
            </PressableScale>
          ) : (
            <View style={{ height: 60 }} />
          )}
        </View>
      )}
    </View>
  );
}
