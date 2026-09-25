import React from "react";
import { View } from "react-native";
import { t } from "../lib/i18n";
import { whenText, type UnlockCopy } from "../lib/unlock";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { CheckIcon, LockIcon } from "./icons";
import { useTheme, spacing, radii } from "../theme";

/**
 * KİLİT AÇMA İLERLEMESİ — hakkı biten ya da kilitli her yüzeyde aynı kart.
 *
 * Kullanıcı hiçbir kilitte "ne yapacağım" diye kalmamalı: kart kalan hakkı,
 * bir sonraki hakkın iki koşulunu (açık olanları bitir · 7 günlük seri) ve
 * ne zaman açılacağını tek bakışta söylüyor; yanında Premium'la hemen açma
 * yolu. Cümleler `lib/unlock`ta seçiliyor, sayılar sunucudan — web aynı kartı
 * aynı kuralla çiziyor.
 *
 * `lead` kartın üstündeki kilit cümlesi ("Bu Konuşma adımı kilitli"); verilmezse
 * kalan hak/bitti cümlesi başlık oluyor.
 */
export function UnlockProgress({ copy, lead, onPremium, compact = false }: { copy: UnlockCopy; lead?: string; onPremium?: (() => void) | null; compact?: boolean }) {
  const { colors } = useTheme();
  const when = whenText(copy, t);
  return (
    <View
      accessibilityRole="summary"
      style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, padding: compact ? spacing.md : spacing.lg, gap: spacing.sm }}
    >
      {lead ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <LockIcon color={colors.textMuted} size={18} />
          <Text variant="bodyStrong" style={{ flex: 1 }}>{lead}</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        {!lead && copy.spent ? <LockIcon color={colors.textMuted} size={16} /> : null}
        <Text variant={lead ? "caption" : "bodyStrong"} color={lead ? colors.textMuted : colors.text} style={{ flex: 1 }}>
          {t(copy.headline.key, copy.headline.params)}
        </Text>
      </View>
      {copy.conditions.length ? (
        <View style={{ gap: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted} style={{ letterSpacing: 0.5 }}>{t("unlock.title")}</Text>
          {copy.conditions.map((c) => (
            <View key={c.line.key} style={{ gap: spacing.xs }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: c.ok ? colors.success : "transparent",
                    borderWidth: c.ok ? 0 : 2,
                    borderColor: colors.border,
                  }}
                >
                  {c.ok ? <CheckIcon color={colors.onFill} size={12} /> : null}
                </View>
                <Text variant="caption" color={c.ok ? colors.successText : colors.text} style={{ flex: 1 }}>
                  {t(c.line.key, c.line.params)}
                </Text>
              </View>
              {c.bar && c.bar.max > 0 ? (
                <View
                  accessibilityRole="progressbar"
                  accessibilityValue={{ min: 0, max: c.bar.max, now: Math.min(c.bar.value, c.bar.max) }}
                  style={{ marginLeft: spacing.xxl, height: 6, borderRadius: radii.pill, backgroundColor: colors.border, overflow: "hidden" }}
                >
                  <View style={{ width: `${Math.round((100 * Math.min(c.bar.value, c.bar.max)) / c.bar.max)}%`, height: "100%", borderRadius: radii.pill, backgroundColor: colors.streak }} />
                </View>
              ) : null}
            </View>
          ))}
        </View>
      ) : null}
      {when ? <Text variant="caption" color={colors.textMuted}>{when}</Text> : null}
      {onPremium ? (
        <PressableScale
          onPress={onPremium}
          accessibilityRole="button"
          style={{ marginTop: spacing.xs, borderRadius: radii.md, backgroundColor: colors.primary, paddingVertical: spacing.md, alignItems: "center" }}
        >
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("unlock.premium_now")}</Text>
        </PressableScale>
      ) : null}
    </View>
  );
}
