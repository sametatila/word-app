import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton, SkeletonBar, SkeletonLine, textHeight } from "../ui/Skeleton";
import { useTheme, spacing, radii } from "../theme";

/**
 * Tur ekranı iskeleti — Oyun / Günün turu / Haftalık sınav / Seviye testi hep
 * aynı kabuğu kullanır: üstte çıkış düğmesi + ilerleme çubuğu + sayaç, altında
 * soru kartı ve şıklar.
 *
 * Ortalanmış spinner yerine bu çiziliyor: spinner ekranın ortasındayken tur
 * gelince her şey birden yukarı sıçrıyordu; iskelet gerçek düzenin yerinde
 * durduğu için geçiş yerinde oluyor.
 */
export function RoundSkeleton({ options = 4, label = false }: { options?: number; label?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <Skeleton height={44} width={44} radius={radii.md} />
        <View style={{ flex: 1 }}><SkeletonBar height={10} /></View>
        <SkeletonLine variant="bodyStrong" width={38} />
      </View>
      {label ? <SkeletonLine variant="caption" width={140} style={{ alignSelf: "center", marginBottom: spacing.md }} /> : null}
      {/* soru kartı: gerçek kartla aynı dolgu (dikey xxxl) */}
      <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
        <SkeletonLine variant="micro" width={104} />
        <SkeletonLine variant="display" width="65%" style={{ marginTop: spacing.sm }} />
        <Skeleton height={22} width={22} radius={11} style={{ marginTop: spacing.sm }} />
      </View>
      <View style={{ gap: spacing.md }}>
        {Array.from({ length: options }, (_, i) => (
          <Skeleton key={i} height={textHeight("bodyStrong") + spacing.lg * 2 + 3} radius={radii.lg} />
        ))}
      </View>
    </View>
  );
}
