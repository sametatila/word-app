import React, { useEffect, useRef, useState } from "react";
import { t, dateLocale } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, FlameIcon, BoltIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { Celebrate } from "../ui/Celebrate";
import { fetchDaily, submitDaily, scoreAnswer, type DailyBoardRow } from "../game/daily";
import type { Round } from "../game/session";
import { ApiError } from "../api/client";
import { track } from "../lib/track";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { useTheme, spacing, radii, softShadow, TIER_COLOR, type Palette } from "../theme";
import { sfx } from "../lib/sfx";

type Phase = "loading" | "auth" | "error" | "play" | "submitting" | "done";

/**
 * İlk üçün madalya rengi — ortak kademe ölçeğinden (`TIER_COLOR`).
 *
 * Üç değer burada elle yazılıydı ve rozet ekranındakilerle AYRIŞMIŞTI: gümüş
 * #9aa3ad (mavi-gri, sıcak paletin içinde tek başına soğuk duruyordu) ve
 * bronz #b08d57. Aynı çakışma rozet ekranında düzeltilmişti ama burası
 * gözden kaçmıştı - tek uygulamada iki ayrı bronz/gümüş/altın ölçeği vardı.
 *
 * Dördüncü ve sonrası madalyasız: rengi `null` dönüyor, çizim düz soluk
 * numaraya düşüyor.
 */
function medalColor(rank: number): string | null {
  return rank === 1 ? TIER_COLOR.gold : rank === 2 ? TIER_COLOR.silver : rank === 3 ? TIER_COLOR.bronze : null;
}

function Board({ rows, colors }: { rows: DailyBoardRow[]; colors: Palette }) {
  if (!rows.length) return <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg }}>{t("daily.be_first_to_play_today")}</Text>;
  return (
    <View style={{ gap: spacing.sm, marginTop: spacing.md }}>
      {rows.map((r) => {
        const mc = medalColor(r.rank);
        const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
        return (
          <View key={`${r.rank}-${r.name}`} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 11, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, mc ? softShadow(mc, 4) : {}]}>
            {/*
              İLK ÜÇ DOLU DAİRE, GERİSİ DÜZ NUMARA.
              Numara madalya rengiyle YAZILIYORDU ve açık temada üçü de
              okunmuyordu - ölçüm beyaz kart üstünde altın 2.88, gümüş 2.56,
              bronz 3.09; normal yazı eşiği 4.5. Hue'yu koruyup koyulaştırmak
              çözmüyor: okunabilir bir gümüş (#7b746a) madalyasız sıralamanın
              soluk tonundan (#7c6c5d) ayırt edilemiyor, yani ikinci sıra
              dördüncüyle aynı görünürdü.
              Uygulamanın kendi dili dolu zemin + beyaz içerik (seviye rozeti,
              başarı rozeti) ve o ölçekte üçü de eşiği geçiyor (4.44 / 3.79 /
              3.62; büyük-kalın yazı ve grafik eşiği 3.0).
            */}
            <View style={{ width: 26, alignItems: "center" }}>
              {mc ? (
                <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: mc }}>
                  <Text variant="bodyStrong" color="#fff">{r.rank}</Text>
                </View>
              ) : (
                <Text variant="h3" color={colors.textMuted}>{r.rank}</Text>
              )}
            </View>
            <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: r.isMe ? colors.primary : colors.surface2 }}>
              <Text variant="bodyStrong" color={r.isMe ? colors.onPrimary : colors.textMuted}>{initial}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" color={r.isMe ? colors.primaryText : colors.text}>{r.name ?? t("social.student")}{r.isMe ? t("social.you_paren") : ""}</Text>
              <Text variant="micro" color={colors.textMuted}>{t("common.n_correct", { correct: r.correct, total: r.total })}</Text>
            </View>
            <Text variant="h3" color={r.isMe ? colors.primaryText : colors.text}>{r.score.toLocaleString(dateLocale())}</Text>
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
  const doneGuard = useRef(-1);
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
    if (doneGuard.current === idx) return; // çift "Devam" koruması
    doneGuard.current = idx;
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
    if (rounds.length > 0) sfx("finish"); // tamamlanma sesi
    const secs = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      const res = await submitDaily({ day: day.current, correct: correctRef.current, score: scoreRef.current, bestCombo: bestComboRef.current, seconds: secs });
      setBoard(res.board ?? []);
    } catch { /* tablo eskisiyle kalır */ }
    setPhase("done");
  }

  const pad = { flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg } as const;

  if (phase === "loading" || phase === "submitting") return <RoundSkeleton />;

  if (phase === "auth") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="display" style={{ textAlign: "center" }}>{t("daily.sign_in_for_daily_round")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, marginBottom: spacing.xxl }}>{t("daily.play_same_round_as_everyone_and")}</Text>
        <PressableScale onPress={() => { nav.goBack(); nav.navigate("Auth"); }} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}><Text variant="h3" color={colors.onPrimary}>{t("daily.sign_in_sign_up")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "error") {
    return (
      <View style={[pad, { alignItems: "center", justifyContent: "center" }]}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("daily.couldn_t_load_daily_round")}</Text>
        <PressableScale onPress={load} style={[{ marginTop: spacing.xl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, paddingHorizontal: spacing.xxl, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="h3" color={colors.onPrimary}>{t("daily.try_again")}</Text></PressableScale>
        <PressableScale onPress={() => nav.goBack()} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "done") {
    const total = totalRef.current;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <Celebrate show />
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
          <Text variant="h2">{t("daily.daily_round")}</Text>
          <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        </View>
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <View style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.xl, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 12)]}>
            <Text variant="micro" color={colors.onPrimaryMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("daily.your_score")}</Text>
            <Text variant="display" color={colors.onPrimary} style={{ fontSize: 52, marginTop: 4 }}>{scoreRef.current.toLocaleString("tr-TR")}</Text>
            <View style={{ flexDirection: "row", gap: spacing.xl, marginTop: spacing.md }}>
              <View style={{ alignItems: "center" }}><Text variant="h3" color={colors.onPrimary}>{correctRef.current}/{total}</Text><Text variant="micro" color={colors.onPrimaryMuted}>{t("daily.correct")}</Text></View>
              <View style={{ alignItems: "center" }}><View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}><FlameIcon color={colors.onPrimary} size={18} /><Text variant="h3" color={colors.onPrimary}>{bestComboRef.current}</Text></View><Text variant="micro" color={colors.onPrimaryMuted}>{t("daily.best_streak")}</Text></View>
            </View>
          </View>
          <Text variant="h3" style={{ marginTop: spacing.xl, marginBottom: 2 }}>{t("daily.today_s_ranking")}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("daily.players_at_your_level")}</Text>
          <Board rows={board} colors={colors} />
          <PressableScale onPress={() => nav.goBack()} style={[{ marginTop: spacing.xxl, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 8)]}><Text variant="bodyStrong" color={colors.onPrimary}>{t("common.finish")}</Text></PressableScale>
        </ScrollView>
      </View>
    );
  }

  // play
  return (
    <View style={pad}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}><XIcon color={colors.textMuted} size={22} /></PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((idx / rounds.length) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          {comboView >= 3 && <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><FlameIcon color={colors.streakText} size={15} /><Text variant="bodyStrong" color={colors.streakText}>{comboView}</Text></View>}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}><BoltIcon color={colors.primaryText} size={15} /><Text variant="bodyStrong" color={colors.primaryText}>{scoreView.toLocaleString("tr-TR")}</Text></View>
        </View>
      </View>
      <RoundView key={rounds[idx]?.id ?? idx} round={rounds[idx]} onDone={onDone} />
    </View>
  );
}
