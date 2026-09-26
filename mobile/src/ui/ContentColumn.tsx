import React from "react";
import { View } from "react-native";
import { useLayout } from "../lib/useLayout";
import { useLang } from "../lib/i18n";
import { ErrorBoundary } from "./ErrorBoundary";

/**
 * İçerik kolonu — geniş ekranda ortalı ve HER EKRANDA AYNI genişlikte
 * (tek kaynak `useLayout` › `contentWidthFor`).
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
  /*
    DİL DEĞİŞİNCE EKRAN YENİDEN KURULUYOR. `useLang()` yalnız çağrıldığı
    bileşeni yeniden çiziyor; sekmelerde ve yığında bekleyen ekranlar eski
    dilde kalıyordu. Görüldü (tablet turu, 2026-09-26): Türkçe cihazda İngilizce
    hesapla giriş yapınca sekme adları İngilizceye döndü, Öğren ekranının
    başlığı Türkçe kaldı. Ayarlar'dan dil değiştirmek de aynı karışıklığı
    bırakıyordu. Her ekran bu kolondan geçtiği için anahtar burada: dil
    değişince içerik yeni dilde baştan kuruluyor, gezinme yığını yerinde kalıyor.
  */
  const lang = useLang();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View key={lang} style={{ flex: 1, width: "100%", maxWidth: contentWidth }}>{children}</View>
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
