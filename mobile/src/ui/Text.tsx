import React from "react";
import { Text as RNText, type TextProps } from "react-native";
import { useTheme, typography } from "../theme";

type Variant = keyof typeof typography;
export function Text({ variant = "body", color, style, ...rest }: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useTheme();
  return <RNText style={[typography[variant], { color: color ?? colors.text }, style]} {...rest} />;
}
