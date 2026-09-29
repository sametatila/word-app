import React from "react";
import { Platform, View } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { Card } from "./Card";
import { PrimaryButton } from "./PrimaryButton";
import { ShareIcon } from "./icons";
import { inviteLink, shareInvite } from "../lib/share";
import { useTheme, spacing, radii } from "../theme";

/**
 * Davet kartı — Profil'de.
 *
 * Premium ekranındaydı ve oraya ait değildi: davetin karşılığı premium süresi
 * değil, arkadaşlık bağı ve ortak seri (2026-09-17). Satın alma kararı verilen
 * ekranda planları ve fiyatı aşağı itiyordu (paywall yeniden tasarımı,
 * 2026-09-29). Web karşılığı `src/components/referral-card.tsx`.
 *
 * iOS'TA KOD DEĞİL BAĞLANTI: iOS'ta kod girilecek bir yer yok ve bilerek yok
 * (Guideline 3.1.1). Çıplak kodu orada göstermek, karşı tarafın hiçbir yere
 * giremeyeceği bir şeyi "paylaş" diye sunmak olurdu; her yerde çalışan şey
 * bağlantı. Android'de kod duruyor: "Kodun var mı?" orada uçtan uca çalışıyor.
 */
export function ReferralCard({ referral }: { referral: { code: string; invited: number } }) {
  const { colors } = useTheme();
  return (
    <Card padded>
      <Text accessibilityRole="header" variant="h3">{t("referral.title")}</Text>
      <Text variant="caption" style={{ marginTop: spacing.xs }}>{t("referral.explain")}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("referral.reward_note")}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
        <View style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.md, paddingVertical: 11, alignItems: "center", paddingHorizontal: spacing.sm }}>
          {Platform.OS !== "ios" ? (
            <Text variant="h3" style={{ letterSpacing: 4 }}>{referral.code}</Text>
          ) : (
            <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{inviteLink(referral.code)}</Text>
          )}
        </View>
        {/* Okunan ad görünen yazıyla aynı ("Paylaş"). */}
        <PrimaryButton size="md" label={t("common.share")} icon={<ShareIcon color={colors.onPrimary} size={16} />} onPress={() => void shareInvite(referral.code)} />
      </View>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
        {referral.invited === 0 ? t("referral.none_yet") : t("referral.invited", { n: referral.invited })}
      </Text>
    </Card>
  );
}
