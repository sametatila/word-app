import React from "react";
import { View } from "react-native";
import { Screen } from "../ui/Screen";
import { Text } from "../ui/Text";
import { SkillsIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";

export function SkillsScreen() {
  const { colors } = useTheme();
  return (
    <Screen scroll={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingBottom: 80 }}>
        <View style={{ width: 96, height: 96, borderRadius: 28, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}>
          <SkillsIcon color={colors.primary} size={44} />
        </View>
        <Text variant="h1">Beceriler</Text>
        <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text variant="caption" color={colors.textMuted}>Yapım aşamasında</Text>
        </View>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", maxWidth: 280, lineHeight: 22 }}>
          Bu bölüm yakında. Farklı bir kurgu üzerinde çalışıyoruz — okuma, dinleme, yazma ve daha fazlası burada olacak.
        </Text>
      </View>
    </Screen>
  );
}
