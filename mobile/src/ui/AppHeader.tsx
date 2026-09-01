import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { FlameIcon } from "./icons";
import { useAuth } from "../lib/AuthContext";
import { useMe } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Sekmeler arası ortak üst başlık (Learn / Patika / Beceriler): solda başlık
 * (+ opsiyonel üst satır), sağda seri rozeti + profil avatarı. Böylece kimlik
 * (seri, profil) her sekmede sürer. Avatar profile götürür.
 */
export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me } = useMe();
  const streak = me?.streak ?? 0;
  const initial = ((user?.name ?? "Öğrenci").trim()[0] ?? "Ö").toUpperCase();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
      <View style={{ flex: 1 }}>
        {subtitle ? <Text variant="caption" color={colors.textMuted}>{subtitle}</Text> : null}
        <Text variant="display">{title}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        {streak > 0 && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.streak + "22", borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 8 }}>
            <FlameIcon color={colors.streak} size={16} />
            <Text variant="bodyStrong" color={colors.streak}>{streak}</Text>
          </View>
        )}
        <PressableScale onPress={() => nav.navigate("Profile")} accessibilityLabel="Profil" style={[{ width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 6)]}>
          <Text variant="h3" color="#fff">{initial}</Text>
        </PressableScale>
      </View>
    </View>
  );
}
