import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, FlameIcon, BoltIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { fetchDaily, submitDaily, scoreAnswer, type DailyBoardRow } from "../game/daily";
import type { Round } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

type Phase = "loading" | "auth" | "error" | "play" | "submitting" | "done";

function medalColor(rank: number, colors: Palette): string {
  return rank === 1 ? colors.streak : rank === 2 ? "#9aa3ad" : rank === 3 ? "#b08d57" : colors.textMuted;
}

function Board({ rows, colors }: { rows: DailyBoardRow[]; colors: Palette }) {
  if (!rows.length) return <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg }}>Bugün ilk oynayan sen ol</Text>;
  return (
    <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
      {rows.map((r) => {
        const mc = medalColor(r.rank, colors);
        const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
        return (
          <View key={`${r.rank}-${r.name}`} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 11, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, r.rank <= 3 ? softShadow(mc, 4) : {}]}>
            <View style={{ width: 26, alignItems: "center" }}><Text variant="h3" color={mc}>{r.rank}</Text></View>
            <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: r.isMe ? colors.primary : colors.surface2 }}>
              <Text variant="bodyStrong" color={r.isMe ? "#fff" : colors.textMuted}>{initial}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" color={r.isMe ? colors.primary : colors.text}>{r.name ?? "Öğrenci"}{r.isMe ? " (sen)" : ""}</Text>
              <Text variant="micro" color={colors.textMuted}>{r.correct}/{r.total} doğru</Text>
            </View>
            <Text variant="h3" color={r.isMe ? colors.primary : colors.text}>{r.score.toLocaleString("tr-TR")}</Text>
          </View>
        );
      })}
    </View>
  );
}

export function DailyScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [idx, setIdx] = useState(0);
  const [board, setBoard] = useState<DailyBoardRow[]>([]);
  const [scoreView, setScoreView] = useState(0);
  const [comboView, setComboView] = useState(0);

  const day = useRef("");
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const correctRef = useRef(0);
  const totalRef = useRef(0);
  const roundStart = useRef(0);
  const startedAt = useRef(0);
  const submitted = useRef(false);

  async function load() {
    setPhase("loading");
    try {
      const p = await fetchDaily();
      day.current = p.day;
      setBoard(p.board ?? []);
      if (p.played) {
        // Bugün oynanmış: sonucu + tabloyu göster (günde tek hak).
        scoreRef.current = p.played.score;
        correctRef.current = p.played.correct;
        totalRef.current = p.played.total;
        bestComboRef.current = p.played.bestCombo;
        setPhase("done");
        return;
      }
      const list = p.rounds ?? [];
      if (!list.length) { setPhase("done"); return; }
      setRounds(list);
      totalRef.current = list.length;
      setIdx(0);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      track("session_start", 0, "daily");
      setPhase("play");
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  useEffect(() => { load(); }, []);

  function onDone(ok: boolean) {
    const lat = Math.max(0, Date.now() - roundStart.current);
    const running = ok ? comboRef.current + 1 : 0;
    scoreRef.current += scoreAnswer(ok, lat, running);
    comboRef.current = running;
    if (running > bestComboRef.current) bestComboRef.current = running;
    if (ok) correctRef.current += 1;
    setScoreView(scoreRef.current);
    setComboView(running);
    roundStart.current = Date.now();
    const next = idx + 1;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    if (submitted.current) return;
    submitted.current = true;
    setPhase("submitting");
    track("session_done", correctRef.current, "daily");
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await submitDaily({ day: day.current, correct: correctRef.current, score: scoreRef.current, bestCombo: bestComboRef.current, seconds: secs });
      setBoard(res.board ?? []);
    } catch { /* tablo eskisiyle kalır */ }
    setPhase("done");
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading" || phase === "submitting") {
    return <View style={[pad, { alignItems: "center", justifyContent: "center" }]}><ActivityIndicator size="large" color={colors.primary} /><Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.lg }}>{phase === "submitting" ? "Puanın işleniyor..." : "Günün turu yükleniyor..."}</Text></View>;
  }

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>Günün turu için giriş yap</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>Herkesle aynı turu oyna, günlük sıralamada yerini al.</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="h3" color="#fff">Giriş yap / Kayıt ol</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>Günün turu yüklenemedi</Text>
        <PressableScale onPress={load} style={[{ marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color="#fff">Tekrar dene</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = totalRef.current;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
          <Text variant="h2">Günün turu</Text>
          <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <View style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.xl, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 12)]}>
            <Text variant="micro" color="#ffffffcc" style={{ textTransform: "uppercase", letterSpacing: 1 }}>Puanın</Text>
            <Text variant="display" color="#fff" style={{ fontSize: 52, marginTop: 4 }}>{scoreRef.current.toLocaleString("tr-TR")}</Text>
            <View style={{ flexDirection: "row", gap: spacing.xl, marginTop: spacing.md }}>
              <View style={{ alignItems: "center" }}><Text variant="h3" color="#fff">{correctRef.current}/{total}</Text><Text variant="micro" color="#ffffffcc">doğru</Text></View>
              <View style={{ alignItems: "center" }}><View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}><FlameIcon color="#fff" size={18} /><Text variant="h3" color="#fff">{bestComboRef.current}</Text></View><Text variant="micro" color="#ffffffcc">en iyi seri</Text></View>
            </View>
          </View>
          <Text variant="h3" style={{ marginTop: spacing.xl, marginBottom: 2 }}>Günün sıralaması</Text>
          <Text variant="caption" color={colors.textMuted}>Aynı seviyede oynayanlar</Text>
          <Board rows={board} colors={colors} />
          <PressableScale onPress={() => nav.goBack()} style={[{ marginTop: spacing.xxl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="bodyStrong" color="#fff">Bitir</Text></PressableScale>
        </ScrollView>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {comboView >= 3 && <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><FlameIcon color={colors.streak} size={15} /><Text variant="bodyStrong" color={colors.streak}>{comboView}</Text></View>}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}><BoltIcon color={colors.primary} size={15} /><Text variant="bodyStrong" color={colors.primary}>{scoreView.toLocaleString("tr-TR")}</Text></View>
        </View>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
