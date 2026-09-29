import React from "react";
import { View } from "react-native";
import { useTheme, ds } from "../theme";

/**
 * Radyo satırının göstergesi: halka + seçiliyse iç nokta.
 *
 * Beş satır kendi halkasını çiziyordu ve üç boy vardı (20/9, 22/10,
 * 24/12). Rol ve seçili durum SATIRDA kalıyor (`accessibilityRole="radio"`);
 * bu yalnız görüntü, ekran okuyucudan gizli.
 */
export function RadioDot({ selected, onFill = false }: {
  selected: boolean;
  /** Dolu turuncu seçili karonun içinde (NotifPrime saat karosu): halka ve
      nokta `onPrimary` (2026-09-29 Samet: seçim B, dolu turuncu çip). */
  onFill?: boolean;
}) {
  const { colors } = useTheme();
  const ring = ds(22);
  const dot = ds(10);
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width: ring, height: ring, borderRadius: ring / 2, borderWidth: 1.5, borderColor: selected ? (onFill ? colors.onPrimary : colors.primary) : colors.border, alignItems: "center", justifyContent: "center" }}
    >
      {selected ? <View style={{ width: dot, height: dot, borderRadius: dot / 2, backgroundColor: onFill ? colors.onPrimary : colors.primary }} /> : null}
    </View>
  );
}
