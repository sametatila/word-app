import React, { useEffect, useRef, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ShareIcon } from "../ui/icons";
import { shareResult } from "../lib/share";
import { ProgressRing } from "../ui/ProgressRing";
import { RoundView } from "../game/rounds";
import { fetchSession, submitAnswers, todayStr, type Round, type SessionMeta, type AnswerOut } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow } from "../theme";

type Phase = "loading" | "auth" | "error" | "play" | "done";

/**
 * GERÇEK kelime turu — Neon verisiyle. /api/session'dan gerçek turları çeker
 * (kullanıcının kendi kelimeleri + SRS zamanlaması), oynatır, /api/answers'a
 * yazar (SRS/XP/seri güncellenir). Oturum yoksa girişe yönlendirir. Demo yok.
 */
export function GameScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [phase, setPhase] = useState<Phase>("loading");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [meta, setMeta] = useState<SessionMeta | null>(null);
  const [idx, setIdx] = useState(0);
  const [finalCorrect, setFinalCorrect] = useState(0);
  const answers = useRef<AnswerOut[]>([]);
  const startedAt = useRef(0);
  const roundStart = useRef(0);
  const day = useRef(todayStr());

  async function load() {
    setPhase("loading");
    try {
      const p = await fetchSession(day.current);
      answers.current = [];
      setRounds(p.rounds ?? []);
      setMeta(p.meta ?? null);
      setIdx(0);
      startedAt.current = Date.now();
      roundStart.current = Date.now();
      track("session_start", 0, "session");
      if ((p.rounds?.length ?? 0) === 0) { setFinalCorrect(0); setPhase("done"); }
      else setPhase("play");
    } catch (e) {
      setPhase(e instanceof ApiError && e.status === 401 ? "auth" : "error");
    }
  }
  useEffect(() => { load(); }, []);

  function onDone(ok: boolean) {
    const r = rounds[idx];
    const wordId = r?.word?.id ?? r?.words?.[0]?.id ?? 0;
    if (wordId && r) answers.current.push({ wordId, game: r.game, correct: ok, latencyMs: Math.max(0, Date.now() - roundStart.current) });
    roundStart.current = Date.now();
    const next = idx + 1;
    if (next >= rounds.length) void finish();
    else setIdx(next);
  }

  async function finish() {
    const ok = answers.current.filter((a) => a.correct).length;
    setFinalCorrect(ok);
    setPhase("done");
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    track("session_done", ok, "session");
    try { if (answers.current.length) await submitAnswers(answers.current, day.current, secs); } catch { /* ölçüm/yazma sessizce düşer */ }
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading") {
    return <View style={[pad, { alignItems: "center", justifyContent: "center" }]}><ActivityIndicator size="large" color={colors.primary} /><Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.lg }}>Turun hazırlanıyor...</Text></View>;
  }

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>Gerçek turun için giriş yap</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>Kendi kelimelerin ve ilerlemenle oyna — her şey hesabında kaydolur.</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">Giriş yap / Kayıt ol</Text>
        </PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>Tur yüklenemedi</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.xxl }}>Bağlantını kontrol edip tekrar dene.</Text>
        <PressableScale onPress={load} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color="#fff">Tekrar dene</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = answers.current.length;
    const pct = total ? Math.round((finalCorrect / total) * 100) : 0;
    return (
      <View style={pad}>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ProgressRing size={150} stroke={14} pct={pct} track={colors.surface2} from={colors.gradientA[0]} to={colors.gradientA[1]}>
            <Text variant="display" color={colors.primary}>{finalCorrect}/{total || 0}</Text>
            <Text variant="micro" color={colors.textMuted}>doğru</Text>
          </ProgressRing>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{total ? "Tur bitti! 🎉" : "Bugünlük bu kadar"}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {total ? "İlerlemen kaydedildi." : "Şu an tekrar edilecek kelime yok — yarın yeniden gel."}
          </Text>
          <PressableScale onPress={load} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="bodyStrong" color="#fff">Devam et</Text></PressableScale>
          {total > 0 && (
            <PressableScale onPress={() => shareResult(finalCorrect, total)} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.md, borderWidth: 1.5, borderColor: colors.border }}>
              <ShareIcon color={colors.text} size={19} /><Text variant="bodyStrong" color={colors.text}>Paylaş</Text>
            </PressableScale>
          )}
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.md }}><Text variant="bodyStrong" color={colors.textMuted}>Bitir</Text></PressableScale>
        </View>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{idx + 1}/{rounds.length}</Text>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
