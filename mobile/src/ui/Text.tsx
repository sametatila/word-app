import React from "react";
import { PixelRatio, Text as RNText, type TextProps } from "react-native";
import { useTheme, typography, lineHeightRatio } from "../theme";

type Variant = keyof typeof typography;

/** Satır kutusunun en düşük oranı — gerekçe aşağıda (Android kırpması). */
const MIN_LINE_RATIO = 1.25;
/**
 * Sistem yazı ölçeği korunur (erişilebilirlik) ama 1.5 katla sınırlanır: 2x'te
 * sabit yükseklikli tur kartları kırpılıyordu. Gerektiğinde prop ile aşılabilir.
 */
export function Text({ variant = "body", color, style, maxFontSizeMultiplier = 1.5, ...rest }: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useTheme();
  /*
   * SATIR YÜKSEKLİĞİ ÖLÇEKTEN, ÇAĞRI YERİNDEN DEĞİL.
   *
   * Ölçek satır yüksekliği taşımıyordu ve yüz altmış üç çağrı yeri onu elle
   * yazıyordu — tek bir varyantta altı ayrı değer vardı. Oran artık
   * `lineHeightRatio`da ve web `--text-*--line-height` ile aynı sayı.
   *
   * PUNTO ÖLÇEĞİYLE ÇARPILIYOR: React Native `fontSize`ı erişilebilirlik
   * ölçeğiyle büyütüyor ama sabit bir `lineHeight`ı büyütmüyor, yani elle
   * yazılan değerlerin hepsinde büyük yazıda satırlar üst üste biniyordu.
   * Tavan bileşenin kendi `maxFontSizeMultiplier`ı ile aynı.
   */
  const olcek = Math.min(PixelRatio.getFontScale(), maxFontSizeMultiplier);
  const punto = (typography[variant].fontSize ?? 15) * olcek;
  /*
   * SATIR KUTUSUNUN TABANI (Android kırpması).
   *
   * Android bir satırı verilen `lineHeight` kadar çiziyor ve harf o kutuya
   * sığmazsa KESİYOR — CSS'in aksine, orada taşan harf komşu satırın üstüne
   * binip yine de görünüyor. Yazı tipinin kendi yüksekliği (çıkan + inen)
   * yaklaşık 1,17 em; ölçekteki en sıkı iki oran (`display` 1,15 ve `h1` 1,2)
   * tam o sınırda duruyordu.
   *
   * Almancada bedeli her turda görünüyordu: "Ä/Ö/Ü" noktaları üstten,
   * "g/j/p/y" kuyrukları alttan kesiliyordu — soru kartı, ekran başlıkları,
   * kelime listesi, hepsinde.
   *
   * Oran tablosuna DOKUNULMUYOR (web `--text-*--line-height` ile birebir
   * aynı kalmalı); taban yalnız çizim anında uygulanıyor.
   */
  const satir = Math.round(punto * Math.max(lineHeightRatio[variant], MIN_LINE_RATIO) * 10) / 10;
  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[typography[variant], { lineHeight: satir, color: color ?? colors.text }, style]}
      {...rest}
    />
  );
}
