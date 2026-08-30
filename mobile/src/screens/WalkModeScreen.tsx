import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, WalkIcon, CheckIcon, XIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { DEMO_WORDS, type Word } from "../data/demoWords";
import { track } from "../lib/track";
import { fetchSession, submitAnswers, todayStr, type AnswerOut } from "../game/session";
import { useAuth } from "../lib/AuthContext";
import { speakAndWait } from "../lib/tts";
import { ensureMicPermission, sttAvailable, listenOnce, stopListening } from "../lib/stt";
import { useTheme, spacing, radii, softShadow } from "../theme";

const withArtikel = (w: { artikel?: string | null; de: string }) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
const wait = (ms: number) => new Promise<void>((r) => setTimeout(() => r(), ms));

/** Söylenen Almanca ~ beklenen: artikel aranmaz, umlaut katlanır, fazla kelime bağışlanır. */
function fold(s: string): string {
  return s.toLocaleLowerCase("de-DE").replace(/[.,!?;:"'’]/g, "").replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/\b(der|die|das)\b/g, "").replace(/\s+/g, " ").trim();
}
function spokenMatch(heard: string, de: string): boolean {
  const h = fold(heard), d = fold(de);
  return !!d && (h === d || h.includes(d) || d.includes(h));
}

type Step = "prompt" | "recall" | "reveal" | "done";

/**
 * Yürüyüş modu (§4 — manşet). Web'in aktif sesli-hatırlama döngüsünün mobil
 * karşılığı: Türkçe ipucu SESLİ okunur → kullanıcı Almancayı SÖYLER (STT) →
 * hüküm verilir → SRS'e (/api/answers, "speak") yazılır → sıradaki. Mikrofon
 * yoksa/başarısızsa elle "Bildim/Bilmedim"e düşer (yine SRS'e yazar).
 */
export function WalkModeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [list, setList] = useState<Word[]>(DEMO_WORDS);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState<Step>("prompt");
  const [heard, setHeard] = useState("");
  const [verdict, setVerdict] = useState<"correct" | "wrong" | null>(null);
  const [micOn, setMicOn] = useState(false);
  const [running, setRunning] = useState(true);
  const [tally, setTally] = useState({ correct: 0, total: 0 });
  const startedAt = useRef(Date.now());
  const wordStart = useRef(Date.now());
  const runRef = useRef(0);
  const mounted = useRef(true);
  const word = list[idx];
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => { track("walk_start", 0); return () => { mounted.current = false; runRef.current++; stopListening(); }; }, []);

  // Gerçek tur (oturumlu) + mikrofon durumu.
  useEffect(() => {
    let alive = true;
    if (user) {
      fetchSession(undefined, { walk: true })
        .then((p) => {
          const ws = (p.rounds ?? []).map((r) => r.word).filter((w): w is NonNullable<typeof w> => !!w)
            .map((w) => ({ id: w.id, de: w.de, tr: w.tr, artikel: (w.artikel as Word["artikel"]) ?? undefined }));
          if (alive && ws.length) setList(ws);
        })
        .catch(() => {});
    }
    (async () => { const ok = (await ensureMicPermission()) && (await sttAvailable()); if (alive) setMicOn(ok); })();
    return () => { alive = false; };
  }, [user]);

  // Nabız animasyonu (dinlerken/konuşurken).
  useEffect(() => {
    if (!running) { pulse.stopAnimation(); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [running, step]);

  // ÇEKİRDEK döngü: her kelimede ipucu→dinle/bekle→cevabı aç.
  useEffect(() => {
    if (!running || step === "done" || !word) return;
    const my = ++runRef.current;
    const alive = () => my === runRef.current && mounted.current;
    (async () => {
      setHeard(""); setVerdict(null); setStep("prompt"); wordStart.current = Date.now();
      await speakAndWait(word.tr, "tr-TR"); // Türkçe ipucu
      if (!alive()) return;
      let ok: boolean | null = null;
      setStep("recall");
      if (micOn) {
        const h = await listenOnce("de-DE", 6000); // Almanca cevabı dinle
        if (!alive()) return;
        if (h) { setHeard(h); ok = spokenMatch(h, word.de); }
      } else {
        await wait(2200); // hatırlama payı
        if (!alive()) return;
      }
      setStep("reveal");
      await speakAndWait(withArtikel(word), "de-DE"); // doğru cevabı seslendir
      if (!alive()) return;
      if (ok !== null) { setVerdict(ok ? "correct" : "wrong"); await wait(900); if (!alive()) return; grade(ok); }
      // ok === null → elle "Bildim/Bilmedim" beklenir
    })();
    return () => { runRef.current++; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, running, micOn]);

  function grade(ok: boolean) {
    setTally((t) => ({ correct: t.correct + (ok ? 1 : 0), total: t.total + 1 }));
    if (user && typeof word?.id === "number") {
      const a: AnswerOut = { wordId: word.id, game: "speak", correct: ok, latencyMs: Math.max(0, Date.now() - wordStart.current) };
      void submitAnswers([a], todayStr(), Math.round((Date.now() - startedAt.current) / 1000)).catch(() => {});
    }
    if (idx + 1 >= list.length) setStep("done");
    else setIdx((i) => i + 1);
  }

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.1] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const stepLabel = step === "prompt" ? "İpucu okunuyor…" : step === "recall" ? (micOn ? "Şimdi Almancasını söyle" : "Almancasını hatırla…") : "Cevap";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2" style={{ flex: 1 }}>Yürüyüş modu</Text>
        <PressableScale onPress={() => setMicOn((v) => !v)} style={{ backgroundColor: micOn ? colors.primarySoft : colors.surface2, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 7 }}>
          <Text variant="caption" color={micOn ? colors.primary : colors.textMuted}>{micOn ? "Sesli" : "Elle"}</Text>
        </PressableScale>
      </View>

      {step === "done" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Celebrate show={step === "done"} />
          <Mascot mood="celebrate" size={110} />
          <Text variant="display">Tur bitti</Text>
          <Text variant="h2" color={colors.primary}>{tally.correct}/{tally.total} doğru</Text>
          <PressableScale onPress={() => nav.goBack()} style={[{ alignSelf: "stretch", borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>Bitir</Text>
          </PressableScale>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.info + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
            <WalkIcon color={colors.info} size={16} /><Text variant="caption" color={colors.info}>Eller serbest · kulakla öğren</Text>
          </View>

          <View style={{ alignItems: "center", marginTop: spacing.xxxl, marginBottom: spacing.xl, minHeight: 150, justifyContent: "center" }}>
            <Text variant="caption" color={colors.textMuted}>kelime {idx + 1}/{list.length}</Text>
            {/* İpucu Türkçe; cevap açılınca Almanca öne çıkar. */}
            <Text variant="display" color={step === "reveal" ? colors.text : colors.textMuted} style={{ marginTop: spacing.sm, textAlign: "center" }}>
              {step === "reveal" ? withArtikel(word) : word.tr}
            </Text>
            {step === "reveal" && <Text variant="h3" color={colors.textMuted} style={{ marginTop: 4 }}>{word.tr}</Text>}
            {heard ? <Text variant="caption" color={verdict === "correct" ? colors.success : colors.danger} style={{ marginTop: spacing.sm }}>duyduğum: “{heard}”</Text> : null}
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{stepLabel}</Text>
          </View>

          {/* nabız halkası */}
          <View style={{ alignItems: "center", justifyContent: "center", height: 120 }}>
            <Animated.View style={{ position: "absolute", width: 92, height: 92, borderRadius: 46, backgroundColor: verdict === "wrong" ? colors.danger : verdict === "correct" ? colors.success : colors.primary, opacity: ringOpacity, transform: [{ scale: ringScale }] }} />
            <Animated.View style={{ transform: [{ scale }] }}>
              <View style={[{ width: 92, height: 92, borderRadius: 46, backgroundColor: verdict === "wrong" ? colors.danger : verdict === "correct" ? colors.success : colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 14)]}>
                {verdict === "correct" ? <CheckIcon color="#fff" size={40} /> : verdict === "wrong" ? <XIcon color="#fff" size={40} /> : <WalkIcon color="#fff" size={40} />}
              </View>
            </Animated.View>
          </View>

          {/* elle derecelendirme (mikrofon kapalıyken ya da hüküm yokken, cevap açıkken) */}
          {step === "reveal" && verdict === null ? (
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.xl, alignSelf: "stretch" }}>
              <PressableScale onPress={() => grade(false)} style={{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.surface, borderWidth: 1.5, borderColor: colors.danger, paddingVertical: 15, alignItems: "center" }}>
                <Text variant="bodyStrong" color={colors.danger}>Bilemedim</Text>
              </PressableScale>
              <PressableScale onPress={() => grade(true)} style={[{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.success, paddingVertical: 15, alignItems: "center" }, softShadow(colors.success, 8)]}>
                <Text variant="bodyStrong" color="#fff">Bildim</Text>
              </PressableScale>
            </View>
          ) : (
            <PressableScale onPress={() => { runRef.current++; stopListening(); if (idx + 1 >= list.length) setStep("done"); else setIdx((i) => i + 1); }} style={{ marginTop: spacing.xl, flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: spacing.sm }}>
              <Text variant="bodyStrong" color={colors.textMuted}>Atla</Text><ChevronRightIcon color={colors.textMuted} size={18} />
            </PressableScale>
          )}
        </View>
      )}

      {step !== "done" && (
        <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", paddingHorizontal: spacing.xxl, paddingBottom: insets.bottom + spacing.lg }}>
          {micOn ? "İpucunu duy, Almancasını söyle — eller serbest." : "Sesli mod için üstteki “Elle”ye dokunup mikrofonu aç."}
        </Text>
      )}
    </View>
  );
}
