import React from "react";
import { PixelRatio, Text as RNText, type TextProps } from "react-native";
import { useTheme, typography, lineHeightRatio } from "../theme";

type Variant = keyof typeof typography;
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
  const satir = Math.round(punto * lineHeightRatio[variant] * 10) / 10;
  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[typography[variant], { lineHeight: satir, color: color ?? colors.text }, style]}
      {...rest}
    />
  );
}
