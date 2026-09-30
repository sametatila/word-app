import React from "react";
import { PixelRatio, Platform, Text as RNText, type TextProps } from "react-native";
import { useTheme, typography, lineHeightRatio } from "../theme";
import { useMinLineRatio } from "./fontFit";

type Variant = keyof typeof typography;

/**
 * Sistem yazı ölçeği korunur (erişilebilirlik) ama 1.5 katla sınırlanır: 2x'te
 * sabit yükseklikli tur kartları kırpılıyordu. Gerektiğinde prop ile aşılabilir.
 */
export function Text({ variant = "body", color, style, maxFontSizeMultiplier = 1.5, ...rest }: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useTheme();
  /* Satır kutusunun en düşük oranı — gerekçe aşağıda (Android kırpması);
     cihazın yazı tipinden ölçülüyor, bkz. `fontFit`. */
  const minLineRatio = useMinLineRatio();
  /*
   * SATIR YÜKSEKLİĞİ ÖLÇEKTEN, ÇAĞRI YERİNDEN DEĞİL.
   *
   * Ölçek satır yüksekliği taşımıyordu ve yüz altmış üç çağrı yeri onu elle
   * yazıyordu — tek bir varyantta altı ayrı değer vardı. Oran artık
   * `lineHeightRatio`da ve web `--text-*--line-height` ile aynı sayı.
   *
   * Erişilebilirlik ölçeği satıra RN tarafından uygulanıyor (aşağıda).
   */
  /*
   * SATIR YÜKSEKLİĞİNİ ÖLÇEKLEMEK REACT NATIVE'İN İŞİ — bizim değil
   * (2026-09-30, Samet'in Samsung'unda "Almanca öğren"in "ğ"si alttan,
   * başka ekranlarda "Ö/İ" noktaları üstten kesikti; emülatörde ölçek 1
   * olduğu için görünmüyordu).
   *
   * Satırı burada `getFontScale()` ile çarpıyorduk ve RN onu BİR KEZ DAHA
   * çarpıyor: iOS `lineHeight × min(ölçek, tavan)` (RCTAttributedTextUtils),
   * Android Fabric `toPixelFromSP(lineHeight)` yani TAVANSIZ ölçek
   * (TextAttributeProps). Punto ise tek kez ve tavanlı ölçekleniyor. Çizilen
   * oran `oran × ölçek` oluyordu: yazı boyu küçük seçili telefonda (ölçek
   * < 1) satır yazı tipinin kendi yüksekliğinin altına iniyor ve harf
   * kesiliyordu; büyük seçilide satır aralıkları gereksiz açılıyordu.
   *
   * Artık satır ÖLÇEKSİZ punto × oran veriliyor; Android'de tavansız
   * çarpımı tavanlı punto ölçeğine indiren düzeltme katsayısıyla. Çizilen
   * satır her cihazda `punto × ölçek(tavanlı) × oran`; 1× ölçekte eskisiyle
   * birebir aynı, `Skeleton.textHeight` de tam bunu hesaplıyor.
   */
  const olcek = Math.min(PixelRatio.getFontScale(), maxFontSizeMultiplier > 0 ? maxFontSizeMultiplier : Infinity);
  const olcekliyor = rest.allowFontScaling !== false;
  const satirCarpani = olcekliyor && Platform.OS === "android" ? olcek / Math.max(PixelRatio.getFontScale(), 0.01) : 1;
  const punto = (typography[variant].fontSize ?? 15) * satirCarpani;
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
   * aynı kalmalı); taban yalnız çizim anında uygulanıyor. Taban 1,25 Roboto
   * içindi; üretici yazı tipi daha uzunsa `fontFit` onu ölçüp büyütüyor.
   */
  const satir = Math.round(punto * Math.max(lineHeightRatio[variant], minLineRatio) * 10) / 10;
  return (
    <RNText
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      /*
       * `includeFontPadding: false` — Android kırpmasının asıl sebebi.
       *
       * Android varsayılan olarak her satıra yazı tipinin kendi üst/alt
       * dolgusunu ekliyor (Roboto'da satır kutusu ~1,37 em oluyor). Biz açıkça
       * daha küçük bir `lineHeight` verince sistem kutuyu o değere SIKIŞTIRIP
       * taşanı kesiyordu — Türkçe "İ" noktası üstten, "g/j/p/y" kuyrukları
       * alttan. Dolgu kapatılınca kutu tam olarak yazının kendi yüksekliği
       * (çıkan + inen, ~1,17 em) oluyor ve aşağıdaki 1,25 tabanı ona rahat
       * yetiyor. CSS'te zaten böyle davranıyor, yani web ile de eşitleniyor.
       */
      style={[typography[variant], { lineHeight: satir, includeFontPadding: false, color: color ?? colors.text }, style]}
      {...rest}
    />
  );
}
