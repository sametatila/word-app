import React from "react";
import { View, type ViewProps } from "react-native";
import { useTheme, radii, spacing, softShadow } from "../theme";

export function Card({ style, children, padded = true, glass = false, ...rest }: ViewProps & { padded?: boolean; glass?: boolean }) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        { backgroundColor: glass ? colors.surfaceGlass : colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline },
        softShadow("#5a3418", 10),
        padded && { padding: spacing.lg },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}
