import React, { useEffect, useMemo, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, TrophyIcon, CheckIcon } from "../ui/icons";
import { Skeleton, SkeletonLine } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { GROUP_ORDER, GROUP_LABEL_KEY, type Achievement, type Tier, type AchGroup } from "../data/achievements";
import { useTheme, spacing, radii, softShadow, TIER_COLOR, type Palette } from "../theme";
import { useLayout } from "../lib/useLayout";

/** Grup başlığı — sözlükte karşılığı olmayan (sunucudan yeni gelen) grup ham adıyla çizilir. */
function groupLabel(group: string): string {
  const key = GROUP_LABEL_KEY[group as AchGroup];
  return key ? t(key) : group;
}

/**
 * Kademe rengi — web `components/achievement-badge.tsx` `TIER_COLOR` ile
 * BİREBİR. Dört değer de ayrışmıştı: gümüş burada mavi-griydi (#9aa3ad) ve
 * sıcak paletin içinde tek başına soğuk duruyordu, altın ve efsane de
 * semantik renklere bağlanmıştı.
 *
 * Rozetin üstünde beyaz ikon var, yani grafik eşiği 3.0 geçerli. Ölçüm:
 * bronz 3.09, gümüş 2.56, altın 2.88, efsane 4.91 - üçü sınırda ya da
 * altında. Ortak değerlerle: 4.44 / 3.79 / 3.62 / 6.83.
 */
function tierColor(tier: Tier): string {
  return TIER_COLOR[tier] ?? TIER_COLOR.legend;
}

function Badge({ a, colors }: { a: Achievement; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  const tc = tierColor(a.tier);
  const pct = a.target ? Math.min(100, Math.round((a.done / a.target) * 100)) : 0;
  return (
    <View style={{ width: gridItemWidth, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.md, opacity: a.unlocked ? 1 : 0.92 }}>
      <View style={[{ width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", backgroundColor: a.unlocked ? tc : colors.surface2 }, a.unlocked ? softShadow(tc, 6) : {}]}>
        {a.unlocked ? <TrophyIcon color="#fff" size={24} /> : <TrophyIcon color={colors.textFaint} size={24} />}
      </View>
      <Text variant="bodyStrong" style={{ marginTop: spacing.sm }}>{a.title}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2 }}>{a.hint}</Text>
      {a.unlocked ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: spacing.sm }}>
          <CheckIcon color={colors.successText} size={14} /><Text variant="micro" color={colors.successText}>{t("achievements.earned")}</Text>
        </View>
      ) : (
        <View style={{ marginTop: spacing.sm }}>
          <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${pct}%`, backgroundColor: tc, borderRadius: 3 }} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{a.done}/{a.target}</Text>
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
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  // Uydurma tahta yok: yüklenene dek boş, hata olursa "tekrar dene".
  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    setPhase("loading");
    api<{ rows: Achievement[] }>("/api/achievements")
      .then((d) => { if (alive) { if (Array.isArray(d?.rows)) { setRemote(d.rows); setPhase("ready"); } else setPhase("error"); } })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, attempt]);

  const list = useMemo(() => remote ?? [], [remote]);
  const earned = list.filter((a) => a.unlocked).length;
  // Grup kovaları sunucudaki sırayla açılıyor; listede OLMAYAN bir grup gelirse
  // atılmıyor, sona ekleniyor. Eski hâli üç grup biliyordu ve dördüncüsü geldiğinde
  // etiketi `undefined` olup ekranı çökertiyordu.
  const groups = useMemo(() => {
    const g = new Map<string, Achievement[]>(GROUP_ORDER.map((k) => [k, []]));
    for (const a of list) {
      const bucket = g.get(a.group);
      if (bucket) bucket.push(a);
      else g.set(a.group, [a]);
    }
    return [...g.entries()].filter(([, rows]) => rows.length);
  }, [list]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("achievements.achievements")}</Text>
          {phase === "ready" ? <Text variant="caption" color={colors.textMuted}>{t("achievements.earned_count", { n: earned, total: list.length })}</Text> : null}
        </View>
      </View>

      {phase === "loading" ? (
        // Ortalanmış spinner yerine tahtanın kendi iskeleti: içerik gelince
        // rozetler ortadan yukarı sıçramıyor, oldukları yerde beliriyor.
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {[0, 1, 2].map((g) => (
            <View key={g} style={{ marginTop: spacing.lg }}>
              <SkeletonLine variant="caption" width={96} style={{ marginBottom: spacing.sm, marginLeft: 4 }} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                {[0, 1].map((i) => <Skeleton key={i} height={140} width="47.5%" radius={radii.lg} />)}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : phase !== "ready" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.md, paddingHorizontal: spacing.xl }}>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("achievements.couldn_t_load_achievements")}</Text>
          <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
          </PressableScale>
        </View>
      ) : (
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {groups.map(([gk, rows]) => (
          <View key={gk} style={{ marginTop: spacing.lg }}>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{groupLabel(gk).toUpperCase()}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
              {rows.map((a) => <Badge key={a.id} a={a} colors={colors} />)}
            </View>
          </View>
        ))}
      </ScrollView>
      )}
    </View>
  );
}
