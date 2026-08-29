import React, { useRef } from "react";
import { Animated, Pressable, type PressableProps, type StyleProp, type ViewStyle } from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Dokununca hafif küçülen basılabilir sarmalayıcı — modern/yumuşak his.
 *
 * Stil doğrudan tek bir Animated Pressable'a uygulanır (ayrı iç sarmalayıcı
 * yok): böylece `flex`, `alignItems`, padding gibi yerleşim stilleri gerçekten
 * bu elemana geçer — iç View'e verilseydi dış Pressable içerik kadar daralır,
 * satırda 1/3 yeri kaplamazdı (alt tab bar'ın sola yığılma hatası buydu).
 */
export function PressableScale({ children, style, onPressIn, onPressOut, ...rest }: Omit<PressableProps, "children" | "style"> & { style?: StyleProp<ViewStyle>; children?: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <AnimatedPressable
      onPressIn={(e) => { Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start(); onPressIn?.(e); }}
      onPressOut={(e) => { Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start(); onPressOut?.(e); }}
      style={[style, { transform: [{ scale }] }]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}
