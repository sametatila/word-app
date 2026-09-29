import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { useTheme, radii, spacing } from "../theme";

/**
 * Seçim çipi — seviye, günlük hedef, dil, saat, sekme.
 *
 * PILL DEĞİL: yarıçap `md`, 1 px kenarlık, seçiliyken DOLU marka turuncusu
 * + beyaz yazı (2026-09-29 Samet: seçim B, dolu turuncu çip). Önceki dil
 * (yumuşak turuncu zemin + turuncu yazı) koyu temada kahverengi bloklar
 * çiziyordu. Süzgeç hapıyla ayrım artık biçimde: seçim çipi `md` köşeli ve
 * kenarlıklı, süzgeç kenarlıksız pill. Web `.chip-active` aynı.
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
  variant = "select",
  tone = "primary",
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
   * SEKME BAŞKA BİR ŞEY. Sıralama kipi ve arkadaş sekmeleri bir seçenek
   * listesi değil, aynı ekranın iki GÖRÜNÜMÜ; onlar `tab` diyor ve
   * sarmalayıcıları `tablist`. Web karşılığı `role="tab"` +
   * `aria-selected`, `role="tablist"` içinde (bkz. parity 258).
   */
  role?: "radio" | "tab";
  /**
   * `filter`: KELİME LİSTESİNİN SÜZGECİ — yukarıda anlatılan dolu hap.
   * Seçiliyken `tone` rengiyle dolu, değilken `surface2`; kenarlık yok.
   * Seçili durum yine `accessibilityState`ten de söyleniyor.
   */
  variant?: "select" | "filter";
  /** Yalnız `filter`: dolgu rengi (seviye `info`, durum `primary`). */
  tone?: "primary" | "info";
}) {
  const { colors } = useTheme();
  if (variant === "filter") {
    const fill = tone === "info" ? colors.info : colors.primary;
    const ink = tone === "info" ? colors.onFill : colors.onPrimary;
    return (
      <PressableScale
        onPress={onPress}
        accessibilityRole={role ?? "button"}
        accessibilityState={{ selected: active }}
        style={{ paddingHorizontal: 14, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: active ? fill : colors.surface2 }}
      >
        <Text variant="caption" color={active ? ink : colors.textMuted}>{label}</Text>
      </PressableScale>
    );
  }
  return (
    <PressableScale
      onPress={onPress}
      accessibilityRole={role ?? "button"}
      accessibilityState={{ selected: active }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: spacing.lg,
        paddingVertical: 9,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: active ? colors.primary : colors.border,
        backgroundColor: active ? colors.primary : colors.surface,
      }}
    >
      <Text variant="bodyStrong" color={active ? colors.onPrimary : colors.textMuted}>{label}</Text>
      {badge ? (
        <View style={{ minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.streak, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xs }}>
          <Text variant="micro" color={colors.badgeInk}>{badge}</Text>
        </View>
      ) : null}
    </PressableScale>
  );
}
