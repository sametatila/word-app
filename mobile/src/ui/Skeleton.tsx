import React, { useEffect, useRef } from "react";
import { Animated, type ViewStyle } from "react-native";
import { useTheme, radii } from "../theme";

/**
 * Yükleme iskeleti — düz spinner yerine içeriğin şeklini gösterir (algılanan
 * hız artar). Nazik bir nabızla parıldar; native driver ile ucuz.
 */
export function Skeleton({ height = 16, width = "100%", radius = radii.md, style }: {
  height?: number; width?: ViewStyle["width"]; radius?: number; style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const a = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(a, { toValue: 1, duration: 850, useNativeDriver: true }),
      Animated.timing(a, { toValue: 0, duration: 850, useNativeDriver: true }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [a]);
  const opacity = a.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] });
  return <Animated.View style={[{ height, width, borderRadius: radius, backgroundColor: colors.surface2, opacity }, style]} />;
}
