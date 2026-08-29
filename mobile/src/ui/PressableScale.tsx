import React, { useRef } from "react";
import { Animated, Pressable, type PressableProps, type ViewStyle } from "react-native";

/** Dokununca hafif küçülen basılabilir sarmalayıcı — modern/yumuşak his. */
export function PressableScale({ children, style, onPressIn, onPressOut, ...rest }: Omit<PressableProps, "children"> & { style?: ViewStyle; children?: React.ReactNode }) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      onPressIn={(e) => { Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start(); onPressIn?.(e); }}
      onPressOut={(e) => { Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40, bounciness: 6 }).start(); onPressOut?.(e); }}
      {...rest}
    >
      <Animated.View style={[{ transform: [{ scale }] }, style]}>{children}</Animated.View>
    </Pressable>
  );
}
