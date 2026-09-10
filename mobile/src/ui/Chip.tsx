import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { useTheme, radii } from "../theme";

/**
 * Seçim çipi — seviye, günlük hedef, dil, saat, sekme.
 *
 * PILL DEĞİL: yarıçap `md`, 1,5 px kenarlık, seçiliyken yumuşak turuncu zemin
 * ve turuncu yazı. Bu ayrım bilinçli ve iki yerde daha yazılıydı
 * (`SettingsScreen`, `LeaderboardScreen` yorumları): dolu turuncu hap
 * KELİME LİSTESİNİN süzgeci; seçim çipi ondan farklı görünmeli, yoksa
 * "süzüyorum" ile "seçtim" aynı dili konuşur.
 *
 * Dört kopya halinde yaşıyordu — Ayarlar, Bildirimler, sosyal ortak modül ve
 * Sıralama'da satır içi. Dolgular üçünde üç türlüydü (14/9, 16/10, 16/9) ve
 * aynı ekranın iki çipi yan yana gelince fark görünüyordu. Tek yer burası.
 */
export function Chip({
  label,
  active,
  onPress,
  badge,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  /** Sağdaki sayı rozeti (bekleyen istek gibi); 0 ve undefined çizilmez. */
  badge?: number;
}) {
  const { colors } = useTheme();
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 16,
        paddingVertical: 9,
        borderRadius: radii.md,
        borderWidth: 1.5,
        borderColor: active ? colors.primary : colors.border,
        backgroundColor: active ? colors.primarySoft : colors.surface,
      }}
    >
      <Text variant="bodyStrong" color={active ? colors.onPrimarySoft : colors.textMuted}>{label}</Text>
      {badge ? (
        <View style={{ minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.streak, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }}>
          <Text variant="micro" color={colors.badgeInk} style={{ fontSize: 10, lineHeight: 12 }}>{badge}</Text>
        </View>
      ) : null}
    </PressableScale>
  );
}
