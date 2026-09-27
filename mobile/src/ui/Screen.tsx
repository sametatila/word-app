import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme, spacing } from "../theme";

/** Yüzen sekme çubuğunun içerikten istediği alt pay (çubuk + boşluk). */
export const TAB_BAR_SPACE = 96;

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pad = { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + TAB_BAR_SPACE };
  if (!scroll) return <View style={[{ flex: 1, backgroundColor: colors.bg }, pad]}>{children}</View>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={pad} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
