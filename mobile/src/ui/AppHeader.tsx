import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { FlameIcon } from "./icons";
import { Avatar } from "./Avatar";
import { useMe } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { InboxBell } from "../social/InboxBell";

/**
 * Sekmeler arası ortak üst başlık (Learn / Patika / Beceriler): solda başlık
 * (+ opsiyonel üst satır), sağda seri rozeti + profil avatarı. Böylece kimlik
 * (seri, profil) her sekmede sürer. Avatar profile götürür.
 */
export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me } = useMe();
  const streak = me?.streak ?? 0;
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
      <View style={{ flex: 1 }}>
        {/* Alt satır her zaman ayrılır (boşsa da) ki başlık yüksekliği ve sağdaki
            seri/profil konumu Learn, Patika ve Beceriler'de birebir aynı hizada olsun. */}
        <Text variant="caption" color={colors.textMuted}>{subtitle ?? " "}</Text>
        <Text variant="display">{title}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        {streak > 0 && (
          <PressableScale onPress={() => nav.navigate("Progress")} accessibilityLabel="Gelişim" style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.streak + "22", borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 8 }}>
            <FlameIcon color={colors.streak} size={16} />
            <Text variant="bodyStrong" color={colors.streak}>{streak}</Text>
          </PressableScale>
        )}
        {/* Sosyal gelen kutusu: istek, tepki, dürtme. Mobilde uzak push yok; rozet buradan. */}
        <InboxBell />
        <PressableScale onPress={() => nav.navigate("Profile")} accessibilityLabel="Profil" style={softShadow(colors.primary, 6)}>
          <Avatar size={44} />
        </PressableScale>
      </View>
    </View>
  );
}
