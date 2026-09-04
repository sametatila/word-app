import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, formatXp, type BoardView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { SkeletonLine, SkeletonRows } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, PodiumIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import type { Palette } from "../theme/colors";
import { EmptyCard, SectionTitle } from "./common";

function medal(rank: number, colors: Palette): string {
  return rank === 1 ? colors.streak : rank === 2 ? colors.info : rank === 3 ? colors.success : colors.textMuted;
}

/** Arkadaşlar arası haftalık tablo — Sıralama ekranının satır biçimiyle birebir. */
export function FriendsBoard({ compact = false }: { compact?: boolean }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [board, setBoard] = useState<BoardView | null>(null);
  useEffect(() => { social.board().then(setBoard).catch(() => setBoard({ rows: [], start: "", daysLeft: 0 })); }, []);
  // Satır iskeleti gerçek satırla aynı yükseklikte (40 arma + 12+12 dolgu).
  if (!board) {
    return (
      <View>
        {!compact ? <SkeletonLine variant="caption" width={190} style={{ marginBottom: spacing.sm, marginLeft: 4, marginTop: spacing.lg }} /> : null}
        <SkeletonRows count={4} height={64} />
      </View>
    );
  }
  if (board.rows.length < 2) return <EmptyCard icon={PodiumIcon} tint={colors.info} title={t("friendsboard.no_one_to_compete_with_yet")} text={t("friendsboard.add_friends_to_see_each_other_in")} />;
  const me = board.rows.find((r) => r.isMe);
  const above = me && me.rank > 1 ? board.rows.find((r) => r.rank === me.rank - 1) : null;
  const gap = me && above ? Math.max(0, above.xp - me.xp) : 0;
  return (
    <View>
      {!compact ? <SectionTitle title={t("friendsboard.among_friends_this_week")} right={board.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: board.daysLeft })} /> : null}
      <View style={{ gap: spacing.sm }}>
        {board.rows.map((r) => {
          const mc = medal(r.rank, colors);
          return (
            <PressableScale key={r.userId} disabled={r.isMe || !r.username} onPress={() => r.username && nav.navigate("User", { username: r.username })} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 12, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, r.rank <= 3 ? softShadow(mc, 4) : {}]}>
              <View style={{ width: 30, alignItems: "center" }}><Text variant="h3" color={mc}>{r.rank}</Text></View>
              <PersonAvatar userId={r.userId} name={r.name} size={40} ring={r.rank <= 3 ? mc : null} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={r.isMe ? colors.primary : colors.text} numberOfLines={1}>{r.name ?? t("social.student")}{r.isMe ? t("social.you_paren") : ""}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <FlameIcon color={colors.streak} size={12} /><Text variant="micro" color={colors.textMuted}>{t("social.days_streak", { n: r.streak })}</Text>
                </View>
              </View>
              <Text variant="h3" color={r.isMe ? colors.primary : colors.text}>{formatXp(r.xp)}</Text>
              <Text variant="micro" color={colors.textMuted}>XP</Text>
            </PressableScale>
          );
        })}
      </View>
      {me && gap > 0 ? (
        <Card padded style={{ marginTop: spacing.md, alignItems: "center", backgroundColor: colors.primarySoft, borderColor: colors.primary }}>
          <Text variant="bodyStrong" color={colors.primary}>{t("friendsboard.gap", { name: above?.name?.split(" ")[0] ?? t("friendsboard.the_one_above"), xp: formatXp(gap) })}</Text>
        </Card>
      ) : null}
    </View>
  );
}
