import React from "react";
import { Text as RNText, type TextProps } from "react-native";
import { useTheme, typography } from "../theme";

type Variant = keyof typeof typography;
/**
 * Sistem yazı ölçeği korunur (erişilebilirlik) ama 1.5 katla sınırlanır: 2x'te
 * sabit yükseklikli tur kartları kırpılıyordu. Gerektiğinde prop ile aşılabilir.
 */
export function Text({ variant = "body", color, style, maxFontSizeMultiplier = 1.5, ...rest }: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useTheme();
  return <RNText maxFontSizeMultiplier={maxFontSizeMultiplier} style={[typography[variant], { color: color ?? colors.text }, style]} {...rest} />;
}
