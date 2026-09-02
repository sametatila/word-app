import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, formatXp, type QuestView } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing } from "../theme";

/** Öğren ekranı nabzı: yalnız bu haftanın ortak görevi/daveti varsa çizilir. */
export function FriendPulse() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [q, setQ] = useState<QuestView | null>(null);
  useEffect(() => {
    if (!user) { setQ(null); return; }
    social.quests().then((r) => setQ(r.quests.find((x) => x.status === "active" || x.status === "invited") ?? null)).catch(() => setQ(null));
  }, [user]);
  if (!q) return null;
  const invited = q.status === "invited";
  return (
    <PressableScale onPress={() => nav.navigate("Friends", { tab: "quests" })} style={{ marginBottom: spacing.xl }}>
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <PersonAvatar userId={q.partner.userId} name={q.partner.name} size={36} ring={colors.info} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong" numberOfLines={1}>{invited ? (q.invitedByMe ? "Görev daveti bekliyor" : `${q.partner.name ?? "Arkadaşın"} seni göreve çağırdı`) : `${q.partner.name ?? "Arkadaşın"} ile ortak görev`}</Text>
          {invited ? (
            <Text variant="micro" color={colors.textMuted}>Hedef birlikte {formatXp(q.targetXp)} XP · {q.invitedByMe ? "cevap bekleniyor" : "kabul et"}</Text>
          ) : (
            <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 5 }}>
              <View style={{ height: "100%", width: `${q.pct}%`, backgroundColor: colors.primary }} />
            </View>
          )}
        </View>
        {!invited ? <Text variant="bodyStrong" color={colors.primary}>{q.pct}%</Text> : null}
      </Card>
    </PressableScale>
  );
}
