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
import { FlameIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import type { Palette } from "../theme/colors";
import { EmptyCard } from "./common";

function medal(rank: number, colors: Palette): string {
  return rank === 1 ? colors.streak : rank === 2 ? colors.info : rank === 3 ? colors.success : colors.textMuted;
}

/** Arkadaşlar arası haftalık tablo — LeaderboardScreen ile aynı satır biçimi. */
export function FriendsBoard({ compact = false }: { compact?: boolean }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [board, setBoard] = useState<BoardView | null>(null);
  useEffect(() => { social.board().then(setBoard).catch(() => setBoard({ rows: [], start: "", daysLeft: 0 })); }, []);
  if (!board) return <Skeleton height={140} />;
  if (board.rows.length < 2) return <EmptyCard title="Henüz yarışacak kimse yok" text="Arkadaş ekleyince bu haftanın XP'sinde birbirinizi görürsünüz." />;
  const me = board.rows.find((r) => r.isMe);
  const above = me && me.rank > 1 ? board.rows.find((r) => r.rank === me.rank - 1) : null;
  const gap = me && above ? Math.max(0, above.xp - me.xp) : 0;
  return (
    <View>
      {!compact ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline", marginBottom: spacing.sm }}>
          <Text variant="h3">Arkadaşlar arasında bu hafta</Text>
          <Text variant="caption" color={colors.textMuted}>{board.daysLeft === 1 ? "son gün" : `${board.daysLeft} gün kaldı`}</Text>
        </View>
      ) : null}
      <View style={{ gap: spacing.sm }}>
        {board.rows.map((r) => {
          const mc = medal(r.rank, colors);
          return (
            <PressableScale key={r.userId} disabled={r.isMe || !r.username} onPress={() => r.username && nav.navigate("User", { username: r.username })} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, paddingHorizontal: spacing.md, paddingVertical: 10, backgroundColor: r.isMe ? colors.primarySoft : colors.surface, borderWidth: 1, borderColor: r.isMe ? colors.primary : colors.hairline }}>
              <View style={{ width: 26, alignItems: "center" }}><Text variant="h3" color={mc}>{r.rank}</Text></View>
              <PersonAvatar userId={r.userId} name={r.name} size={36} ring={r.rank <= 3 ? mc : null} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={r.isMe ? colors.primary : colors.text} numberOfLines={1}>{r.name ?? "Öğrenci"}{r.isMe ? " (sen)" : ""}</Text>
                {r.streak > 0 ? <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}><FlameIcon color={colors.streak} size={11} /><Text variant="micro" color={colors.textMuted}>{r.streak} gün</Text></View> : null}
              </View>
              <Text variant="h3" color={r.isMe ? colors.primary : colors.text}>{formatXp(r.xp)}</Text>
              <Text variant="micro" color={colors.textMuted}>XP</Text>
            </PressableScale>
          );
        })}
      </View>
      {me && gap > 0 ? (
        <Card padded style={{ marginTop: spacing.sm, alignItems: "center" }}>
          <Text variant="caption" color={colors.primary} style={{ fontWeight: "700" }}>{above?.name?.split(" ")[0] ?? "Bir üstteki"}ne {formatXp(gap)} XP kaldı.</Text>
        </Card>
      ) : null}
    </View>
  );
}
