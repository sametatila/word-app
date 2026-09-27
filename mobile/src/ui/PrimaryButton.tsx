import React from "react";
import { ActivityIndicator, type StyleProp, type ViewStyle } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * BİRİNCİL DÜĞME — uygulamanın tek dolu düğmesi.
 *
 * `FlowActions`in birincil düğmesiydi ve ondan başka ortak bir düğme yoktu:
 * ekranlar aynı düğmeyi elle kuruyordu ve 2026-09-27 taraması on beşten fazla
 * kopya buldu. Kopyalar dört ayrı dolguda (14, 11, spacing.md, spacing.lg), iki
 * yazı boyunda (bodyStrong, h3) ve üç gölgede çiziliyordu; meşgulken kimi
 * dönen gösterge, kimi "..." yazıyordu ve kimi meşgulken yeniden basılabiliyordu.
 *
 *   size "lg" — ekranın ana eylemi (FlowActions ile aynı; web `btn btn-primary py-4`)
 *   size "md" — kartın içindeki eylem (yeniden giriş, "Uygula"; web `py-3`)
 *   tone "destructive" — geri alınamayan eylem (hesap silme)
 *
 * Meşgulken düğme basılamaz ve yazının yerinde dönen gösterge durur.
 */
export function PrimaryButton({
  label,
  onPress,
  disabled = false,
  busy = false,
  icon,
  tone = "primary",
  size = "lg",
  style,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  busy?: boolean;
  icon?: React.ReactNode;
  tone?: "primary" | "destructive";
  size?: "lg" | "md";
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const fill = tone === "destructive" ? colors.danger : colors.primary;
  const ink = tone === "destructive" ? colors.onFill : colors.onPrimary;
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled || busy}
      accessibilityLabel={label}
      accessibilityState={{ disabled: disabled || busy, busy }}
      style={[
        {
          borderRadius: radii.lg,
          backgroundColor: disabled ? colors.surface2 : fill,
          paddingVertical: size === "lg" ? spacing.lg : spacing.md,
          paddingHorizontal: spacing.lg,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: spacing.sm,
        },
        disabled ? {} : softShadow(fill, 10),
        style,
      ]}
    >
      {busy ? <ActivityIndicator color={ink} /> : icon}
      <Text variant={size === "lg" ? "h3" : "bodyStrong"} color={disabled ? colors.textFaint : ink}>{label}</Text>
    </PressableScale>
  );
}
