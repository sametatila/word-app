import React, { useRef } from "react";
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import { reduceMotion } from "../lib/reduceMotion";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Dokununca hafif küçülen basılabilir sarmalayıcı — modern/yumuşak his.
 *
 * Stil doğrudan tek bir Animated Pressable'a uygulanır (ayrı iç sarmalayıcı
 * yok): böylece `flex`, `alignItems`, padding gibi yerleşim stilleri gerçekten
 * bu elemana geçer — iç View'e verilseydi dış Pressable içerik kadar daralır,
 * satırda 1/3 yeri kaplamazdı (alt tab bar'ın sola yığılma hatası buydu).
 */
export function PressableScale({ children, style, onPressIn, onPressOut, disabled, ...rest }: Omit<PressableProps, "children" | "style"> & { style?: StyleProp<ViewStyle>; children?: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <AnimatedPressable
      accessibilityRole="button"
      /* "Hareketi azalt" açıkken ölçek yayı çalışmıyor; dokunma geri bildirimi
         yine var (ses/titreşim çağıranlarda, sistem basma vurgusu her yerde).
         Düğmenin İŞİ değişmiyor, yalnız hareket kalkıyor. */
      onPressIn={(e) => { if (!reduceMotion()) Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start(); onPressIn?.(e); }}
      onPressOut={(e) => { if (!reduceMotion()) Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start(); onPressOut?.(e); }}
      /*
       * DEVRE DIŞI OLMAK TEK BİR SÖNÜKLÜKLE ANLATILIYOR.
       *
       * `Pressable` kapalıyken hiçbir şey değiştirmiyor: dokunma çalışmıyor
       * ama düğme CANLI görünüyordu. Her çağrı yeri bunu kendi çözüyordu ve
       * ölçüm BEŞ ayrı değer buldu (0.4, 0.45, 0.5, 0.6 ve renk takası) —
       * aynı durum uygulamanın beş yerinde beş farklı güçte okunuyordu.
       * Web'de de üç değer vardı (40/50/60); orada `.input:disabled` zaten
       * 0.6 diyordu ve ölçek ona getirildi. Tek yer burası, tek değer 0.6.
       *
       * "Başka maddede kullanılmış" soluklugu (0.45) BUNUN DIŞINDA ve öyle
       * kalmalı: o şık devre dışı değil, yine basılabiliyor (bkz.
       * `MockExamScreen`); iki platformda da aynı değer.
       */
      disabled={disabled}
      style={[style, { transform: [{ scale }] }, disabled ? { opacity: 0.6 } : null]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
