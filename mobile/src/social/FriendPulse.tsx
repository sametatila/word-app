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
import { ArrowRightIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import { Bar } from "./common";

/** Öğren ekranı nabzı — ActionRow biçimi: arma, h3, caption/çubuk, ok. Yalnız görev/davet varsa. */
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
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderColor: invited ? colors.info : colors.primary, borderWidth: 1.5 }}>
        <PersonAvatar userId={q.partner.userId} name={q.partner.name} size={44} ring={invited ? colors.info : colors.primary} />
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{invited ? (q.invitedByMe ? "Görev daveti bekliyor" : `${q.partner.name?.split(" ")[0] ?? "Arkadaşın"} seni göreve çağırdı`) : `${q.partner.name?.split(" ")[0] ?? "Arkadaşın"} ile ortak görev`}</Text>
          {invited ? (
            <Text variant="caption" color={colors.textMuted}>Hedef birlikte {formatXp(q.targetXp)} XP · {q.invitedByMe ? "cevap bekleniyor" : "kabul et"}</Text>
          ) : (
            <View style={{ marginTop: 6 }}>
              <Bar pct={q.pct} tint={colors.primary} />
              <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{formatXp(q.totalXp)}/{formatXp(q.targetXp)} XP · {q.daysLeft} gün</Text>
            </View>
          )}
        </View>
        {!invited ? <Text variant="h3" color={colors.primary}>{q.pct}%</Text> : <ArrowRightIcon color={colors.textFaint} size={20} />}
      </Card>
    </PressableScale>
  );
}
