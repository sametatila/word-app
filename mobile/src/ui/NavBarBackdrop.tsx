import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme";

/**
 * Android gezinme çubuğunun (3 tuş ya da jest çizgisi) ZEMİNİ — tek yerde.
 *
 * NEDEN: edge-to-edge altında gezinme çubuğu saydam ve içerik onun altına
 * uzanıyor. Oyun ekranları kendi köklerinde `insets.bottom` kadar dolgu
 * bırakıyordu, yani orada tuşların altı düz zemindi; menüler, sekmeler,
 * sınav ve ayar ekranlarında bu yoktu ve kaydırılan içerik tuşların arkasından
 * akıyordu. Otuzdan fazla ekranı tek tek düzeltmek yerine zemin kökte çiziliyor:
 * her ekran oyundaki görünümü kendiliğinden alıyor ve yeni bir ekran bunu
 * unutamıyor.
 *
 * Dokunuşları GEÇİRİYOR (`pointerEvents="none"`) ve yalnız çubuğun kendi
 * yüksekliği kadar: altındaki alan zaten sistemin, uygulamanın değil. Ekranların
 * kaydırma içeriğindeki `insets.bottom + …` dip payı YERİNDE kalıyor — son öğe
 * bu zeminin arkasında kalmasın diye o pay gerekli.
 *
 * iOS'ta çizilmiyor: ana ekran çizgisinin arkasından akan içerik platformun
 * kendi dili ve orada tuş yok.
 */
export function NavBarBackdrop() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  if (Platform.OS !== "android" || insets.bottom <= 0) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: insets.bottom, backgroundColor: colors.bg }}
    />
  );
}
