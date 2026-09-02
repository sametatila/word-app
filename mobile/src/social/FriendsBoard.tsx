import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, formatXp, type BoardView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
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
  if (!board) return <Skeleton height={160} radius={20} />;
  if (board.rows.length < 2) return <EmptyCard icon={PodiumIcon} tint={colors.info} title="Henüz yarışacak kimse yok" text="Arkadaş ekleyince bu haftanın XP'sinde birbirinizi görürsünüz." />;
  const me = board.rows.find((r) => r.isMe);
  const above = me && me.rank > 1 ? board.rows.find((r) => r.rank === me.rank - 1) : null;
  const gap = me && above ? Math.max(0, above.xp - me.xp) : 0;
  return (
    <View>
      {!compact ? <SectionTitle title="Arkadaşlar arasında bu hafta" right={board.daysLeft === 1 ? "son gün" : `${board.daysLeft} gün kaldı`} /> : null}
      <View style={{ gap: spacing.sm }}>
        {board.rows.map((r) => {
          const mc = medal(r.rank, colors);
          return (
            <PressableScale key={r.userId} disabled={r.isMe || !r.username} onPress={() => r.username && nav.navigate("User", { username: r.username })} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 12, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }, r.rank <= 3 ? softShadow(mc, 4) : {}]}>
              <View style={{ width: 30, alignItems: "center" }}><Text variant="h3" color={mc}>{r.rank}</Text></View>
              <PersonAvatar userId={r.userId} name={r.name} size={40} ring={r.rank <= 3 ? mc : null} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={r.isMe ? colors.primary : colors.text} numberOfLines={1}>{r.name ?? "Öğrenci"}{r.isMe ? " (sen)" : ""}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <FlameIcon color={colors.streak} size={12} /><Text variant="micro" color={colors.textMuted}>{r.streak} gün seri</Text>
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
          <Text variant="bodyStrong" color={colors.primary}>{above?.name?.split(" ")[0] ?? "Bir üstteki"}ne {formatXp(gap)} XP kaldı</Text>
        </Card>
      ) : null}
    </View>
  );
}
