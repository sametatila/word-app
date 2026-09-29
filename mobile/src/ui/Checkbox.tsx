import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { PressableScale } from "./PressableScale";
import { CheckIcon } from "./icons";
import { useTheme, spacing, radii, ds } from "../theme";

/**
 * Onay kutusu satırı — kutu + etiket, satırın tamamı basılabilir.
 *
 * İki kopyası vardı ve iki ayrı dil konuşuyordu: 2FA "bu cihaza güven"
 * kutusu 22 px, 6 px yarıçap ve yazı olarak "✓" çiziyordu; hesap silme
 * onayı 26 px, `radii.sm` ve `CheckIcon`. Tek yer burası; kutu 24, web
 * `components/checkbox` ile aynı.
 *
 * `tone="danger"`: geri dönüşü olmayan bir işe verilen onay (hesap silme).
 */
export function Checkbox({
  checked,
  onChange,
  tone = "primary",
  accessibilityLabel,
  style,
  children,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  tone?: "primary" | "danger";
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  const fill = tone === "danger" ? colors.danger : colors.primary;
  const ink = tone === "danger" ? colors.onFill : colors.onPrimary;
  const box = ds(24);
  return (
    <PressableScale
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={accessibilityLabel}
      style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.sm }, style]}
    >
      <View style={{ width: box, height: box, borderRadius: radii.sm, borderWidth: 1.5, borderColor: checked ? fill : colors.border, backgroundColor: checked ? fill : "transparent", alignItems: "center", justifyContent: "center" }}>
        {checked ? <CheckIcon color={ink} size={16} /> : null}
      </View>
      <View style={{ flex: 1 }}>{children}</View>
    </PressableScale>
  );
}
