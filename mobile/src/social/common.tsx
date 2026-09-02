import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import type { ReactionKind } from "../api/social";
import { HeartIcon, StarIcon, PartyIcon, SparkIcon, FlameIcon, BoltIcon } from "../ui/icons";
import type { Palette } from "../theme/colors";

/** Sosyal ekranların ortak başlığı: geri + başlık + isteğe bağlı sağ öğe. */
export function ScreenHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      <PressableScale onPress={() => (nav.canGoBack() ? nav.goBack() : nav.navigate("Tabs"))} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <ChevronLeftIcon color={colors.text} size={24} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="h2">{title}</Text>
        {subtitle ? <Text variant="caption" color={colors.textMuted}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function EmptyCard({ title, text, action, onAction }: { title: string; text: string; action?: string; onAction?: () => void }) {
  const { colors } = useTheme();
  return (
    <Card padded style={{ alignItems: "center", gap: spacing.sm }}>
      <Text variant="h3" style={{ textAlign: "center" }}>{title}</Text>
      <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 20 }}>{text}</Text>
      {action && onAction ? <PrimaryButton label={action} onPress={onAction} /> : null}
    </Card>
  );
}

export function PrimaryButton({ label, onPress, disabled, small, tone }: { label: string; onPress: () => void; disabled?: boolean; small?: boolean; tone?: "primary" | "ghost" | "danger" }) {
  const { colors } = useTheme();
  const t = tone ?? "primary";
  const bg = t === "primary" ? colors.primary : t === "danger" ? colors.dangerSoft : colors.surface2;
  const fg = t === "primary" ? colors.onPrimary : t === "danger" ? colors.danger : colors.text;
  return (
    <PressableScale onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.5 : 1, backgroundColor: bg, borderRadius: radii.pill, paddingHorizontal: small ? 12 : 18, paddingVertical: small ? 7 : 11, alignItems: "center", justifyContent: "center" }}>
      <Text variant={small ? "caption" : "bodyStrong"} color={fg} style={{ fontWeight: "700" }}>{label}</Text>
    </PressableScale>
  );
}

export function ErrorText({ text }: { text: string | null }) {
  const { colors } = useTheme();
  if (!text) return null;
  return <Text variant="caption" color={colors.danger} style={{ marginTop: spacing.xs }}>{text}</Text>;
}

export function reactionTone(kind: ReactionKind, colors: Palette): string {
  switch (kind) {
    case "fire": return colors.streak;
    case "heart": return colors.danger;
    case "strong": return colors.accent;
    case "wow": return colors.info;
    default: return colors.primary;
  }
}

export function ReactionGlyph({ kind, size = 16, colors }: { kind: ReactionKind; size?: number; colors: Palette }) {
  const color = reactionTone(kind, colors);
  switch (kind) {
    case "cheer": return <PartyIcon color={color} size={size} />;
    case "fire": return <FlameIcon color={color} size={size} />;
    case "heart": return <HeartIcon color={color} size={size} />;
    case "strong": return <BoltIcon color={color} size={size} />;
    case "star": return <StarIcon color={color} size={size} />;
    default: return <SparkIcon color={color} size={size} />;
  }
}

/** Satır düzeni: avatar + iki satır metin + sağ eylem. Tüm listeler bunu kullanır. */
export function PersonRow({ avatar, title, subtitle, right, onPress, note, colors, last }: { avatar: React.ReactNode; title: React.ReactNode; subtitle?: React.ReactNode; right?: React.ReactNode; onPress?: () => void; note?: React.ReactNode; colors: Palette; last?: boolean }) {
  return (
    <View style={{ borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, paddingHorizontal: spacing.md }}>
        <PressableScale onPress={onPress} disabled={!onPress}>{avatar}</PressableScale>
        <PressableScale onPress={onPress} disabled={!onPress} style={{ flex: 1, minWidth: 0 }}>
          <View>{title}</View>
          {subtitle ? <View style={{ marginTop: 2 }}>{subtitle}</View> : null}
          {note ? <View style={{ marginTop: 2 }}>{note}</View> : null}
        </PressableScale>
        {right}
      </View>
    </View>
  );
}
