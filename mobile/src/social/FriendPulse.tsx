import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, formatXp, type QuestView } from "../api/social";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { ArrowRightIcon } from "../ui/icons";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useTheme, spacing } from "../theme";
import { Bar } from "./common";

/**
 * Öğren ekranı nabzı — ActionRow biçimi: arma, h3, caption/çubuk, ok. Yalnız
 * görev/davet varsa. Yüklenirken aynı yükseklikte iskelet: cevap gelince satır
 * araya girip altındaki bölümleri aşağı itmesin.
 */
export function FriendPulse() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [q, setQ] = useState<QuestView | null>(null);
  const [loading, setLoading] = useState(() => !!user);
  useEffect(() => {
    if (!user) { setQ(null); setLoading(false); return; }
    let alive = true;
    setLoading(true);
    social.quests()
      .then((r) => { if (alive) setQ(r.quests.find((x) => x.status === "active" || x.status === "invited") ?? null); })
      .catch(() => { if (alive) setQ(null); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [user]);
  if (loading) {
    return (
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderWidth: 1.5, borderColor: colors.hairline, marginBottom: spacing.xl }}>
        <SkeletonTile size={44} radius={22} />
        <View style={{ flex: 1 }}>
          <SkeletonLine variant="h3" width="72%" />
          <View style={{ marginTop: 6 }}>
            <SkeletonBar height={6} />
            <SkeletonLine variant="micro" width="45%" style={{ marginTop: 3 }} />
          </View>
        </View>
        <SkeletonLine variant="h3" width={34} />
      </Card>
    );
  }
  if (!q) return null;
  const invited = q.status === "invited";
  return (
    <PressableScale onPress={() => nav.navigate("Friends", { tab: "quests" })} style={{ marginBottom: spacing.xl }}>
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderColor: invited ? colors.info : colors.primary, borderWidth: 1.5 }}>
        <PersonAvatar userId={q.partner.userId} name={q.partner.name} size={44} ring={invited ? colors.info : colors.primary} />
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{invited ? (q.invitedByMe ? t("friendpulse.waiting") : t("friendpulse.invited_you", { ad: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })) : t("friendpulse.shared", { ad: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })}</Text>
          {invited ? (
            <Text variant="caption" color={colors.textMuted}>{t("friendpulse.target", { xp: formatXp(q.targetXp), durum: q.invitedByMe ? t("friendpulse.awaiting") : t("friendpulse.accept") })}</Text>
          ) : (
            <View style={{ marginTop: 6 }}>
              <Bar pct={q.pct} tint={colors.primary} />
              <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{t("friendpulse.progress", { simdi: formatXp(q.totalXp), hedef: formatXp(q.targetXp), n: q.daysLeft })}</Text>
            </View>
          )}
        </View>
        {!invited ? <Text variant="h3" color={colors.primary}>{q.pct}%</Text> : <ArrowRightIcon color={colors.textFaint} size={20} />}
      </Card>
    </PressableScale>
  );
}
