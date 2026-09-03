import React from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { Text } from "./Text";
import { SparkIcon } from "./icons";
import { useTheme, spacing, radii } from "../theme";

/**
 * "Karşındaki yapay zekâ" bildirimi.
 *
 * Kullanım şartları (§6) ve gizlilik politikası, bir dil modeliyle
 * etkileşildiğinin uygulamada açıkça söylendiğini taahhüt ediyor; Play'in
 * üretken yapay zekâ politikası da bunu istiyor. Bildirim bilerek KALICI ve
 * kapatılamaz: bir kez görünüp akışta yukarı kayan bir baloncuk, uzun bir
 * konuşmanın ortasına giren kullanıcı için yok hükmünde.
 *
 * `variant`:
 *  - "character" — konuşulan taraf bir karakter (rol yapma). Gerçek kişi değil.
 *  - "output"    — metni/puanı üreten taraf model (değerlendirme). Yanılabilir.
 */
export function AiNotice({ variant, style }: { variant: "character" | "output"; style?: object }) {
  const { colors } = useTheme();
  const text = t(variant === "character" ? "ai.notice_character" : "ai.notice_output");
  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={text}
      style={[{
        flexDirection: "row", alignItems: "center", gap: spacing.sm,
        paddingHorizontal: spacing.md, paddingVertical: 8,
        borderRadius: radii.md, backgroundColor: colors.surface2,
      }, style]}
    >
      <SparkIcon color={colors.textMuted} size={14} />
      <Text variant="micro" color={colors.textMuted} style={{ flex: 1, lineHeight: 16 }}>{text}</Text>
    </View>
  );
}
