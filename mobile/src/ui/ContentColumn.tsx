import React from "react";
import { View } from "react-native";
import { useLayout } from "../lib/useLayout";
import { ErrorBoundary } from "./ErrorBoundary";

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
export function ContentColumn({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  const { contentWidth, wideContentWidth } = useLayout();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={{ flex: 1, width: "100%", maxWidth: wide ? wideContentWidth : contentWidth }}>{children}</View>
    </View>
  );
}

/**
 * React Navigation'ın `screenLayout` biçimi — ekranın içeriğini sarmalar.
 *
 * Sıra: `Screen.layout` → `Group.screenLayout` → gezginin `screenLayout`'u.
 * Sekmeleri barındıran ekran bilerek DIŞARIDA bırakılıyor (bkz. RootStack).
 *
 * ÇÖKME SINIRI DA BURADA. Üçünden yalnız BİRİ uygulanıyor (en özel olan
 * kazanıyor), yani sınırı ayrı bir `screenLayout` olarak eklemek düzeni
 * ezerdi. İkisi birlikte sarmalanınca her ekran hem sütununu hem sınırını
 * alıyor ve sınır EKRAN BAŞINA oluyor: bir ekran çökse sekme çubuğu ve
 * gezinme ayakta kalıyor, kullanıcı başka bir yere geçebiliyor. Web'de
 * karşılığı `app/(app)/error.tsx` (kabuğun altındaki sınır).
 */
export const contentColumnLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <ContentColumn>{children}</ContentColumn>
  </ErrorBoundary>
);

/**
 * IZGARA ekranlarının düzeni — yatay tablette dar sütundan çıkar.
 *
 * Kartların satır ölçüsü yok: 1280dp'lik bir ekranda ızgarayı 720'de tutmak
 * ekranın yarısını zemine bırakıyordu, oysa aynı yerde bir sıraya dört kart
 * sığıyor. Yalnız ızgara sistemine girmiş ekranlara veriliyor; metin ağırlıklı
 * ekranlar dar sütunda kalıyor, orada genişlik okunaklık kaybı demek.
 *
 * Dikeyde ve telefonda `contentColumnLayout` ile aynı sonucu verir. Çökme
 * sınırı ondaki gibi burada da (bkz. yukarıdaki not).
 */
export const wideColumnLayout = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    <ContentColumn wide>{children}</ContentColumn>
  </ErrorBoundary>
);
