import React from "react";
import { View } from "react-native";
import { useTheme } from "../theme";

/**
 * Kart içi ilerleme çubuğu — İKİ BOY.
 *
 * Elle çizilen çubuklar dört ayrı yükseklikteydi (4, 6, 8, 10) ve aynı
 * ekranda iki boy yan yana geliyordu. Boy rolden geliyor:
 *   - `inline` (6): liste satırı, kart içindeki ikincil ölçü.
 *   - `hero` (10): ekranın ya da kartın ana ölçüsü.
 * Yuvarlak ilerleme satırları (`FlowProgress`) bunun dışında.
 *
 * `extra`: ana dolgunun arkasından gelen açık ikinci bölüm (ör. "görülmüş"
 * kısmı, koyu bölüm "pekişmiş"). Verildiğinde oranlar olduğu gibi çiziliyor.
 */
export const BAR_HEIGHT = { inline: 6, hero: 10 } as const;

export function Bar({ pct, tint, size = "inline", extra }: { pct: number; tint: string; size?: keyof typeof BAR_HEIGHT; extra?: { pct: number; tint: string } }) {
  const { colors } = useTheme();
  const height = BAR_HEIGHT[size];
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: colors.surface2, overflow: "hidden", flexDirection: "row" }}>
      {extra ? (
        <>
          <View style={{ width: `${clamp(pct)}%`, backgroundColor: tint }} />
          <View style={{ width: `${clamp(extra.pct)}%`, backgroundColor: extra.tint }} />
        </>
      ) : (
        // Sıfırda da ince bir uç: çubuğun boş değil "başlamamış" olduğu görünsün.
        <View style={{ width: `${Math.max(3, clamp(pct))}%`, backgroundColor: tint, borderRadius: height / 2 }} />
      )}
    </View>
  );
}
