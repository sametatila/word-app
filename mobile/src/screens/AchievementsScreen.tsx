import React, { useEffect, useMemo, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, TrophyIcon, CheckIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { DEMO_ACHIEVEMENTS, GROUP_LABEL, type Achievement, type Tier, type AchGroup } from "../data/demoAchievements";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

function tierColor(t: Tier, colors: Palette): string {
  return t === "bronze" ? "#b08d57" : t === "silver" ? "#9aa3ad" : t === "gold" ? colors.streak : colors.accent;
}

function Badge({ a, colors }: { a: Achievement; colors: Palette }) {
  const tc = tierColor(a.tier, colors);
  const pct = a.target ? Math.min(100, Math.round((a.progress / a.target) * 100)) : 0;
  return (
    <View style={{ width: "47.5%", backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.md, opacity: a.unlocked ? 1 : 0.92 }}>
      <View style={[{ width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", backgroundColor: a.unlocked ? tc : colors.surface2 }, a.unlocked ? softShadow(tc, 6) : {}]}>
        {a.unlocked ? <TrophyIcon color="#fff" size={24} /> : <TrophyIcon color={colors.textFaint} size={24} />}
      </View>
      <Text variant="bodyStrong" style={{ marginTop: spacing.sm }}>{a.title}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2 }}>{a.hint}</Text>
      {a.unlocked ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: spacing.sm }}>
          <CheckIcon color={colors.success} size={14} /><Text variant="micro" color={colors.success}>Kazanıldı</Text>
        </View>
      ) : (
        <View style={{ marginTop: spacing.sm }}>
          <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${pct}%`, backgroundColor: tc, borderRadius: 3 }} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{a.progress}/{a.target}</Text>
        </View>
      )}
    </View>
  );
}

export function AchievementsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [remote, setRemote] = useState<Achievement[] | null>(null);

  useEffect(() => {
    if (!user) { setRemote(null); return; }
    let alive = true;
    api<{ rows: Achievement[] }>("/api/achievements")
      .then((d) => { if (alive) setRemote(Array.isArray(d?.rows) ? d.rows : null); })
      .catch(() => { if (alive) setRemote(null); });
    return () => { alive = false; };
  }, [user]);

  const list = remote ?? DEMO_ACHIEVEMENTS;
  const earned = list.filter((a) => a.unlocked).length;
  const groups = useMemo(() => {
    const g: Record<AchGroup, Achievement[]> = { streak: [], vocab: [], games: [] };
    for (const a of list) (g[a.group] ??= []).push(a);
    return g;
  }, [list]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">Başarımlar</Text>
          <Text variant="caption" color={colors.textMuted}>{earned}/{list.length} kazanıldı</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {(Object.keys(groups) as AchGroup[]).map((gk) =>
          groups[gk].length ? (
            <View key={gk} style={{ marginTop: spacing.lg }}>
              <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{GROUP_LABEL[gk].toUpperCase()}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                {groups[gk].map((a) => <Badge key={a.id} a={a} colors={colors} />)}
              </View>
            </View>
          ) : null,
        )}
      </ScrollView>
    </View>
  );
}
