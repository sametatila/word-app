import React from "react";
import { View } from "react-native";
import { useLayout, gridItemWidthFor } from "../lib/useLayout";
import { spacing } from "../theme";

/**
 * Yığılmış kart listesini geniş ekranda sütunlara böler.
 *
 * NEDEN GEREKLİ: kabı genişletmek tek başına yetmiyor. Izgara ekranlarında
 * kazanç doğrudan (kartlar zaten sarmalanıyor, sayıları artıyor) ama gezinme
 * ekranlarının çoğu kartları DİKEY YIĞIYOR — orada kap genişleyince kart da
 * uzuyor ve 1270dp genişliğinde tek bir "devam et" kartı çıkıyor. Sütunun
 * baştan koruduğu şey buydu; doğru çözüm kabı dar tutmak değil, listeyi
 * sütunlara bölmek.
 *
 * Sütun sayısı kartın en az genişliğinden çıkıyor, en çok üç: gezinme kartları
 * ünite karolarından daha yoğun, dörde bölününce başlıkları kırpılıyor.
 * Telefonda ve dar kapta hiç sarmalamıyor — çocuklar olduğu gibi geçiyor, yani
 * o cihazlarda düzen birebir eskisi.
 */
export function CardGrid({
  children,
  minItemWidth = 420,
}: {
  children: React.ReactNode;
  /** Bir kartın altına düşmemesi gereken genişlik (dp). */
  minItemWidth?: number;
}) {
  const { wideContentWidth } = useLayout();
  const sutun = Math.min(3, Math.max(1, Math.floor(wideContentWidth / minItemWidth)));
  if (sutun < 2) return <>{children}</>;
  const genislik = gridItemWidthFor(sutun as 2 | 3);
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, alignItems: "flex-start" }}>
      {React.Children.toArray(children).map((c, i) => (
        <View key={i} style={{ width: genislik }}>
          {c}
        </View>
      ))}
    </View>
  );
}
