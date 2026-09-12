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
  role,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  /** Sağdaki sayı rozeti (bekleyen istek gibi); 0 ve undefined çizilmez. */
  badge?: number;
  /**
   * TEK SEÇİMLİK GRUPTAKİ ÇİP RADYODUR.
   *
   * Çip `selected` durumunu baştan beri söylüyordu ama rolü `button`du:
   * TalkBack "düğme, seçili" diyor, yani kaç seçenek olduğu ve birini
   * seçmenin ötekini bıraktığı hiçbir yerde geçmiyordu. `radio` deyince
   * "radyo düğmesi, 5 ögeden 2., seçili" oluyor. Web karşılığı
   * `role="radio"` + `aria-checked` (bkz. parity 256).
   *
   * SEKME olarak kullanılan iki çağrı yeri (sıralama kipi, arkadaş
   * sekmeleri) bunu VERMİYOR: sekme bir radyo değil ve web'de de ayrı bir
   * anlatımı var (`aria-current`). Onlar `button` olarak kalıyor.
   */
  role?: "radio";
}) {
  const { colors } = useTheme();
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole={role ?? "button"}
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
