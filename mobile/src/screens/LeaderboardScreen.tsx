import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, FlatList, ScrollView, Pressable } from "react-native";
import { FriendsBoard } from "../social/FriendsBoard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ReportSheet } from "../ui/ReportSheet";
import { SkeletonRows } from "../ui/Skeleton";
import { ArrowBackIcon, FlameIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import type { LeaderboardWeek, LeaderboardRow } from "../data/leaderboard";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

function medalColor(rank: number, colors: Palette): string {
  return rank === 1 ? colors.streak : rank === 2 ? "#9aa3ad" : rank === 3 ? "#b08d57" : colors.textMuted;
}

export function LeaderboardScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [week, setWeek] = useState<LeaderboardWeek | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [report, setReport] = useState<LeaderboardRow | null>(null); // basılı tutulan satır (UGC bildirimi)
  // Herkes | Arkadaşlar — aynı hafta, iki küme. Arkadaş tablosu sosyal API'den.
  const [mode, setMode] = useState<"all" | "friends">("all");

  // Uydurma tablo yok: yüklenene dek boş, hata olursa "tekrar dene".
  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    setPhase("loading");
    api<LeaderboardWeek>("/api/leaderboard")
      .then((d) => { if (alive) { if (d?.rows) { setWeek(d); setPhase("ready"); } else setPhase("error"); } })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, attempt]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("leaderboard.leaderboard")}</Text>
          <Text variant="caption" color={colors.textMuted}>{week ? t("leaderboard.this_week_left", { n: week.daysLeft }) : t("leaderboard.this_week")}</Text>
        </View>
      </View>

      {/* Ayarlar'daki Chip dili: kenarlıklı, radius md; pill değil. */}
      <View style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        {([["all", "leaderboard.everyone"], ["friends", "social.tab_friends"]] as const).map(([k, label]) => (
          <PressableScale key={k} onPress={() => setMode(k)} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: mode === k ? colors.primary : colors.border, backgroundColor: mode === k ? colors.primarySoft : colors.surface }}>
            <Text variant="bodyStrong" color={mode === k ? colors.primary : colors.textMuted}>{t(label)}</Text>
          </PressableScale>
        ))}
      </View>

      {mode === "friends" ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {user ? <FriendsBoard compact /> : <Text variant="body" color={colors.textMuted}>{t("leaderboard.sign_in_for_friends_board")}</Text>}
        </ScrollView>
      ) : phase === "loading" ? (
        // Satır iskeleti gerçek satırla aynı yükseklikte (44 arma + 12+12 dolgu).
        <SkeletonRows count={9} height={68} style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md }} />
      ) : phase !== "ready" || !week ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.md, paddingHorizontal: spacing.xl }}>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("leaderboard.couldn_t_load_leaderboard")}</Text>
          <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.primary}>{t("common.try_again")}</Text>
          </PressableScale>
        </View>
      ) : (
      <FlatList
        data={week.rows}
        keyExtractor={(r) => r.userId}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.sm }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: r }: { item: LeaderboardRow }) => {
          const mc = medalColor(r.rank, colors);
          const initial = ((r.name ?? "?").trim()[0] ?? "?").toUpperCase();
          return (
            <Pressable onLongPress={r.isMe ? undefined : () => setReport(r)} delayLongPress={400} accessibilityLabel={r.isMe ? undefined : t("leaderboard.report_hint", { name: r.name ?? t("social.student") })} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 12, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, r.rank <= 3 ? softShadow(mc, 4) : {}]}>
              <View style={{ width: 30, alignItems: "center" }}>
                <Text variant="h3" color={mc}>{r.rank}</Text>
              </View>
              <View style={{ width: 44, height: 44, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: r.isMe ? colors.primary : colors.surface2 }}>
                <Text variant="bodyStrong" color={r.isMe ? "#fff" : colors.textMuted}>{initial}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={r.isMe ? colors.primary : colors.text}>{r.name ?? t("social.student")}{r.isMe ? t("social.you_paren") : ""}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <FlameIcon color={colors.streak} size={12} />
                  <Text variant="micro" color={colors.textMuted}>{t("social.days_streak", { n: r.streak })}</Text>
                </View>
              </View>
              <Text variant="h3" color={r.isMe ? colors.primary : colors.text}>{String(r.xp).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Text>
              <Text variant="micro" color={colors.textMuted}>XP</Text>
            </Pressable>
          );
        }}
      />
      )}
      <ReportSheet visible={!!report} kind="user" refId={report?.userId ?? ""} content={report?.name ?? ""} onClose={() => setReport(null)} />
    </View>
  );
}
