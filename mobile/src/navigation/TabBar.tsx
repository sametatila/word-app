import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme, radii, spacing, softShadow } from "../theme";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { LearnIcon, PathIcon, SkillsIcon } from "../ui/icons";
import { track } from "../lib/track";

const NAV_KEY: Record<string, string> = { Learn: "learn", Path: "immersion", Skills: "skills" };

const ICONS: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  Learn: (p) => <LearnIcon {...p} />, Path: (p) => <PathIcon {...p} />, Skills: (p) => <SkillsIcon {...p} />,
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ position: "absolute", left: spacing.lg, right: spacing.lg, bottom: insets.bottom + spacing.sm }}>
      <View style={[{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: radii.xxl, padding: 7, borderWidth: 1, borderColor: colors.hairline }, softShadow("#5a3418", 16)]}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          const label = (descriptors[route.key].options.title ?? route.name) as string;
          const Icon = ICONS[route.name];
          return (
            <PressableScale key={route.key} onPress={() => { const e = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true }); if (!focused && !e.defaultPrevented) { track("nav", i, NAV_KEY[route.name]); navigation.navigate(route.name); } }}
              accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: focused }}
              style={{ flex: 1, alignItems: "center", paddingVertical: 9, borderRadius: radii.lg, backgroundColor: focused ? colors.primarySoft : "transparent" }}>
              {Icon?.({ color: focused ? colors.primary : colors.textMuted, size: 23 })}
              <Text variant="micro" color={focused ? colors.primary : colors.textMuted} style={{ marginTop: 3 }}>{label}</Text>
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}
