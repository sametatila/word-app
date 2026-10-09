import React from "react";
import { Pressable, Switch, View, type StyleProp, type ViewStyle } from "react-native";
import { Text } from "./Text";
import { useTheme, spacing } from "../theme";
import { MIN_TOUCH } from "./touch";

/**
 * AÇ/KAPA SATIRI — başlık + açıklama + anahtar; SATIRIN TAMAMI anahtar.
 *
 * QA F-0051 (build 22): anahtarlar küçük bir hedefti; RN `Switch`in `hitSlop`u
 * yok ve dokunma yalnız 51×31'lik anahtarın üstünde çalışıyordu. Satır artık
 * tek bir "switch" (ekran okuyucu da onu tek öğe olarak okuyor, adı başlık);
 * anahtar görsel kalıyor ve okuyucudan gizli (iki kez okunmasın). Aynı kalıp
 * turdaki bahis satırında zaten vardı (`GameScreen` `StageCard`).
 *
 * `style`: satır kabının kenar/dolgusu (çağıranın listesine göre).
 */
export function SwitchRow({ title, sub, value, onValueChange, disabled = false, tint, style, children }: {
  title: string;
  sub?: string | null;
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  /** Açıkken iz rengi; varsayılan marka turuncusu. */
  tint?: string;
  style?: StyleProp<ViewStyle>;
  /** Başlığın altında ek düğüm (ör. iskelet alt satır). */
  children?: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => { if (!disabled) onValueChange(!value); }}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityLabel={title}
      accessibilityHint={sub ?? undefined}
      accessibilityState={{ checked: value, disabled }}
      style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: MIN_TOUCH }, style]}
    >
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{title}</Text>
        {sub ? <Text variant="caption" color={colors.textMuted}>{sub}</Text> : null}
        {children}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={title}
        trackColor={{ true: tint ?? colors.primary, false: colors.surface2 }}
        thumbColor="#fff"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      />
    </Pressable>
  );
}
