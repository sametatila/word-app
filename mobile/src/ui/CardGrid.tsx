import React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import { useLayout } from "../lib/useLayout";
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
 *
 * `columns` verilirse sütun sayısı ondan (karo ızgaraları: Patika, Pratik,
 * Profil, Başarımlar; `useLayout().gridColumns`) ve telefonda da ızgara.
 *
 * SATIR SATIR ÇİZİLİYOR, yüzde genişlikle DEĞİL. Kartlar önce `flexWrap` +
 * "%31,7 / %47,5" genişlikle diziliyordu; yüzde aradaki sabit boşluğu
 * bilmediği için ızgaranın sağ kenarı kolonun ~35dp içinde kalıyordu (iPad,
 * 2026-09-23) — üstündeki tam genişlik kartlarla hizasız. Şimdi her satır
 * `flex: 1` hücreler ve eksik satır boş hücreyle dolduruluyor: kenar her
 * genişlikte kolonun kenarı, son satırın kartları üsttekilerle aynı ölçüde.
 */
export function CardGrid({
  children,
  minItemWidth = 400,
  columns,
  stretch = false,
  style,
}: {
  children: React.ReactNode;
  /** Bir kartın altına düşmemesi gereken genişlik (dp). */
  minItemWidth?: number;
  /** Sabit sütun sayısı — verilirse `minItemWidth` hesaba girmiyor. */
  columns?: number;
  /** Bir satırdaki hücreler en uzun olanın boyuna uzasın (hücrenin kendisi
   *  `flex: 1` taşımalı). Kapalıyken her kart kendi boyunda. */
  stretch?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { contentWidth } = useLayout();
  const sutun = columns ?? Math.min(3, Math.max(1, Math.floor(contentWidth / minItemWidth)));
  if (sutun < 2) return <>{children}</>;
  const ogeler = React.Children.toArray(children);
  const satirlar: React.ReactNode[][] = [];
  for (let i = 0; i < ogeler.length; i += sutun) satirlar.push(ogeler.slice(i, i + sutun));
  return (
    <View style={[{ gap: spacing.md }, style]}>
      {satirlar.map((satir, r) => (
        <View key={r} style={{ flexDirection: "row", gap: spacing.md, alignItems: stretch ? "stretch" : "flex-start" }}>
          {satir.map((c, i) => (
            <View key={i} style={{ flex: 1, minWidth: 0 }}>
              {c}
            </View>
          ))}
          {Array.from({ length: sutun - satir.length }, (_, i) => <View key={`bos-${i}`} style={{ flex: 1 }} />)}
        </View>
      ))}
    </View>
  );
}
