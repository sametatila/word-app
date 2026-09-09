import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { ChevronRightIcon } from "./icons";
import { spacing, radii, type Palette } from "../theme";

/**
 * Menü satırı — renkli ikon kutusu, etiket, sağda şevron.
 *
 * Profil ekranının içinde yaşıyordu; ölçüm satırları (Yapabildiklerim,
 * Yazılarım) Gelişim ekranına taşınınca iki ekranda birden gerekti. Kopyalamak
 * yerine buraya çıkarıldı: iki listenin satır yüksekliği, ayraç çizgisi ve
 * dokunma alanı tek yerden geliyor, biri değişince öteki geride kalmıyor.
 */
export function MenuRow({
  icon: Icon,
  label,
  tint,
  colors,
  last,
  onPress,
}: {
  icon: (p: { color: string; size: number }) => React.ReactElement;
  label: string;
  tint: string;
  colors: Palette;
  /** Son satırda alt çizgi çizilmez. */
  last?: boolean;
  onPress?: () => void;
}) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: last ? 0 : 1,
        borderBottomColor: colors.hairline,
      }}
    >
      <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={tint} size={20} />
      </View>
      <Text variant="bodyStrong" style={{ flex: 1 }}>{label}</Text>
      <ChevronRightIcon color={colors.textFaint} size={20} />
    </PressableScale>
  );
}
