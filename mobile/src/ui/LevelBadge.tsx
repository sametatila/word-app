import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { t, formatPercent } from "../lib/i18n";
import { useTheme, radii } from "../theme";

/**
 * Seçilen CEFR seviyesi ve o seviyenin pekişme durumu — web
 * `components/level-badge` karşılığı.
 *
 * Burada bilerek bir rütbe yok. Seviye kullanıcının kendi beyanıdır ve yalnızca
 * profilden değişir; gösterilen şey biriktirdiği kelimedir. Ölçü yalnızca artar
 * — kimseye "geriye gittin" denmez, çünkü bir oturumun doğruluk oranı zaten
 * yetkinliği değil kuyruğun bileşimini ölçer.
 *
 * Oturum başlığında webde vardı, mobilde HİÇ YOKTU: sayı sunucudan
 * `meta.coverage` ile geliyor ve mobilin `SessionMeta` tipi o alanı tanımıyordu,
 * yani sessizce düşüyordu (bkz. web-parity §11.22).
 *
 * Renkler web `TONE` tablosuyla aynı roller: A1 mint, A2 sky, B1 violet,
 * B2 marka, C1 rose. Zemin bir kimlik değil bilgi taşıyıcısı, o yüzden dolu
 * renk + `onFill` yazı.
 */
function toneOf(level: string, colors: ReturnType<typeof useTheme>["colors"]): string {
  switch (level) {
    case "A1": return colors.success;
    case "A2": return colors.info;
    case "B1": return colors.accent;
    case "B2": return colors.primary;
    case "C1": return colors.danger;
    default: return colors.primary;
  }
}

export function LevelBadge({ level, mastered, total, compact = false }: { level: string; mastered: number; total: number; compact?: boolean }) {
  const { colors } = useTheme();
  const tone = toneOf(level, colors);
  const pct = total > 0 ? Math.min(100, (mastered / total) * 100) : 0;
  return (
    <View style={compact ? { flexDirection: "row", alignItems: "center", gap: 8 } : undefined}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <View style={{ backgroundColor: tone, borderRadius: radii.sm, paddingHorizontal: 8, paddingVertical: 2 }}>
            <Text variant="bodyStrong" color={colors.onFill}>{level}</Text>
          </View>
          {!compact ? (
            <Text variant="caption" color={colors.textMuted} numberOfLines={1} style={{ flex: 1 }}>
              {mastered > 0 ? t("level.mastered_count", { n: mastered }) : t("level.mastered_none")}
            </Text>
          ) : null}
        </View>
        {!compact && total > 0 ? (
          <Text variant="caption" color={colors.textMuted}>
            {pct < 1 && mastered > 0 ? t("common.pct_lt1") : formatPercent(pct)}
          </Text>
        ) : null}
      </View>
      {!compact ? (
        <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 6 }}>
          <View style={{ height: "100%", width: `${Math.max(pct, mastered > 0 ? 1.5 : 0)}%`, backgroundColor: tone, borderRadius: 3 }} />
        </View>
      ) : null}
    </View>
  );
}
