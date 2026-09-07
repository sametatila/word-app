import React from "react";
import { View } from "react-native";
import { useLayout } from "../lib/useLayout";

/**
 * İçerik sütunu — geniş ekranda okunabilir genişlikte ve ortalı.
 *
 * NEDEN EKRAN BAŞINA, UYGULAMANIN TAMAMINA DEĞİL: sütun eskiden kökte, tüm
 * gezginin çevresindeydi. Sonucu şuydu: yatay tablette (1366dp) SEKME ÇUBUĞU da
 * 720'lik şeride giriyor, iki yanında birer avuç boşlukla ortada asılı kalıyordu
 * — tablet uygulaması gibi değil, mektup kutusuna sığdırılmış telefon uygulaması
 * gibi. Doğru ayrım: KABUK (sekme çubuğu, zemin) ekran kadar geniş, İÇERİK
 * okunabilir sütunda.
 *
 * Telefonda hiçbir şey değişmiyor: sütun üst sınırı (520dp) en geniş telefondan
 * da geniş, yani `maxWidth` orada hiç bağlamıyor.
 */
export function ContentColumn({ children }: { children: React.ReactNode }) {
  const { contentWidth } = useLayout();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1, width: "100%", maxWidth: contentWidth }}>{children}</View>
    </View>
  );
}

/**
 * React Navigation'ın `screenLayout` biçimi — ekranın içeriğini sarmalar.
 *
 * Sıra: `Screen.layout` → `Group.screenLayout` → gezginin `screenLayout`'u.
 * Sekmeleri barındıran ekran bilerek DIŞARIDA bırakılıyor (bkz. RootStack).
 */
export const contentColumnLayout = ({ children }: { children: React.ReactNode }) => (
  <ContentColumn>{children}</ContentColumn>
);
