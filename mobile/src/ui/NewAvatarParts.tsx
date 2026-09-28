import React from "react";
import { Image, View } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { useTheme, spacing, radii, ds } from "../theme";
import type { UnlockedPart } from "../lib/avatarLayers";

/** Gösterilen en fazla ikon; gerisi sayı olarak. */
const SHOWN = 4;

/**
 * Bir kazanımla açılan avatar parçaları — kutlamanın ikinci ödülü
 * (rozet kartı, lig sonucu). Sunucu yalnız 3B katalog açıkken ve gerçekten
 * yeni açılan parça varken `parts` gönderiyor; yoksa hiçbir şey çizilmez.
 * Web karşılığı `components/new-avatar-parts`.
 */
export function NewAvatarParts({ parts, compact = false }: { parts?: UnlockedPart[]; compact?: boolean }) {
  const { colors } = useTheme();
  if (!parts?.length) return null;
  const shown = parts.slice(0, SHOWN);
  const rest = parts.length - shown.length;
  const px = ds(compact ? 32 : 48);
  return (
    <View
      style={compact
        ? { marginTop: spacing.sm }
        : { marginTop: spacing.md, alignSelf: "stretch", alignItems: "center", backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: spacing.md, paddingHorizontal: spacing.md }}
    >
      <Text variant="micro" color={colors.primaryText} style={{ textTransform: "uppercase", letterSpacing: 1 }}>
        {t("achu.new_parts")}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs }}>
        {shown.map((p) => (
          <Image key={p.id} source={{ uri: p.icon }} style={{ width: px, height: px }} resizeMode="contain" accessibilityIgnoresInvertColors />
        ))}
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: compact ? "left" : "center" }}>
        {shown.map((p) => p.name).join(", ")}
        {rest > 0 ? ` +${rest}` : ""}
      </Text>
    </View>
  );
}
