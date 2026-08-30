import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { ProgressRing } from "../ui/ProgressRing";
import { RoundView } from "../game/rounds";
import { fetchWeekly, submitWeekly, type WeeklyStatus } from "../game/weekly";
import { todayStr } from "../game/session";
import type { Round, AnswerOut } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow } from "../theme";

type Phase = "loading" | "auth" | "error" | "play" | "submitting" | "done";

export function WeeklyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);

  const answers = useRef<AnswerOut[]>([]);
  const day = useRef("");
  const roundStart = useRef(0);
  const startedAt = useRef(0);
  const submitted = useRef(false);

  async function load() {
    setPhase("loading");
    try {
      const p = await fetchWeekly();
      const st: WeeklyStatus = p.status;
      day.current = todayStr();
      if (st.done) {
        setResult({ score: st.score ?? 0, correct: st.correct ?? 0, total: st.total ?? 0 });
        setPhase("done");
        return;
      }
      const list = p.rounds ?? [];
      if (!list.length) { setResult({ score: 0, correct: 0, total: 0 }); setPhase("done"); return; }
      answers.current = [];
      setRounds(list);
      setIdx(0);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      track("session_start", 0, "weekly");
      setPhase("play");
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  useEffect(() => { load(); }, []);

  function onDone(ok: boolean, batch?: { wordId: number; correct: boolean }[]) {
    const r = rounds[idx];
    const lat = Math.max(0, Date.now() - roundStart.current);
    if (batch && batch.length && r) {
      for (const b of batch) if (b.wordId) answers.current.push({ wordId: b.wordId, game: r.game, correct: b.correct, latencyMs: lat });
    } else {
      const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
      if (wordId && r) answers.current.push({ wordId, game: r.game, correct: ok, latencyMs: lat });
    }
    roundStart.current = Date.now();
    const next = idx + 1;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    if (submitted.current) return;
    submitted.current = true;
    setPhase("submitting");
    track("session_done", answers.current.filter((a) => a.correct).length, "weekly");
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await submitWeekly(answers.current, day.current, secs);
      setResult({ score: res.score, correct: res.correct, total: res.total });
    } catch {
      // sunucuya yazılamadıysa yerel doğrulukla göster
      const total = answers.current.length;
      const correct = answers.current.filter((a) => a.correct).length;
      setResult({ score: total ? Math.round((100 * correct) / total) : 0, correct, total });
    }
    setPhase("done");
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading" || phase === "submitting") {
    return <View style={[pad, { alignItems: "center", justifyContent: "center" }]}><ActivityIndicator size="large" color={colors.primary} /><Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.lg }}>{phase === "submitting" ? "Sonucun işleniyor..." : "Haftalık sınav yükleniyor..."}</Text></View>;
  }

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>Haftalık sınav için giriş yap</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>Öğrendiklerini haftada bir ölç — ilerlemeni gör.</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="h3" color="#fff">Giriş yap / Kayıt ol</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>Haftalık sınav yüklenemedi</Text>
        <PressableScale onPress={load} style={[{ marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color="#fff">Tekrar dene</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const score = result?.score ?? 0;
    const done = (result?.total ?? 0) > 0;
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ProgressRing size={160} stroke={15} pct={score} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>%{score}</Text>
            <Text variant="micro" color={colors.textMuted}>başarı</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{done ? "Bu haftalık bu kadar" : "Şu an sınav yok"}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {done ? `${result?.total} sorudan ${result?.correct} doğru. Haftada tek hak — gelecek hafta yeniden.` : "Yeterince pekişmiş kelimen olunca haftalık sınav açılır."}
          </Text>
          <PressableScale onPress={() => nav.goBack()} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="bodyStrong" color="#fff">Bitir</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
