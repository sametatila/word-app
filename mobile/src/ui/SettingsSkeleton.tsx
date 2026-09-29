import React from "react";
import { View, Platform } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { SkeletonLine, SkeletonText } from "./Skeleton";
import { spacing, radii, type Palette } from "../theme";
import { googleSupported } from "../lib/googleAuth";
import { appleSupported } from "../lib/appleAuth";

/**
 * Ayarlar › Hesap ve Güvenlik'in yükleme hâlleri — gerçek bileşenin şekli.
 *
 * Giriş yöntemleri, parola/iki adım satırları ve oturum listesi ağdan
 * geliyor ve gelene kadar HİÇ çizilmiyordu: bölüm etiketi boş kalıyor, liste
 * gelince altındaki her şey aşağı itiliyordu (Güvenlik'te parola ve iki adım
 * satırları sonradan beliriyordu). Web aynı yerde aynı şekli çiziyor
 * (`components/settings-skeleton`).
 *
 * Yazısı bilinen yer gerçek çeviriyle (`SkeletonText`: görünmez metin,
 * ölçülen satır başına çubuk): sarılma her dilde gerçeğiyle aynı. Veriye
 * bağlı yer çubuk.
 */

/** Satırın sağındaki küçük eylem düğmesi (`paddingHorizontal md`, `paddingVertical sm`, `radii.md`). */
function ActionSlot({ label, colors }: { label: string; colors: Palette }) {
  return (
    <View style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: radii.md, backgroundColor: colors.surface2 }}>
      <Text variant="caption" accessible={false} style={{ opacity: 0 }}>{label}</Text>
    </View>
  );
}

/** Kapalı `ChangePassword` / `TwoFactor`: soluk açıklama + sağda düğme. */
export function ActionRowSkeleton({ text, action, colors }: { text: string; action: string; colors: Palette }) {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ gap: spacing.xs }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <SkeletonText variant="caption" text={text} />
        </View>
        <ActionSlot label={action} colors={colors} />
      </View>
    </View>
  );
}

/**
 * `LinkedAccounts` listesi: en sık durum parolayla açılmış hesap (tek yöntem)
 * ve platformun teklif ettiği sağlayıcılar bağlı değil.
 */
export function SignInMethodsSkeleton({ colors }: { colors: Palette }) {
  const teklif = [...(googleSupported() ? ["Google"] : []), ...(Platform.OS === "ios" && appleSupported() ? ["Apple"] : [])];
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <SkeletonText variant="bodyStrong" text={t("links.credential")} />
        </View>
        <SkeletonText variant="caption" text={t("links.only_method")} />
      </View>
      {teklif.map((ad) => (
        <View key={ad} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
          <View style={{ flex: 1 }}>
            <SkeletonText variant="bodyStrong" text={ad} />
            <SkeletonText variant="caption" text={t("links.not_linked")} />
          </View>
          <ActionSlot label={t("links.link")} colors={colors} />
        </View>
      ))}
    </View>
  );
}

/** `ActiveSessions` listesinin bir satırı — aygıt ve tarih veriye bağlı, çubuk. */
export function SessionRowSkeleton({ colors }: { colors: Palette }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10 }}
    >
      <View style={{ flex: 1 }}>
        <SkeletonLine variant="bodyStrong" width="45%" />
        <SkeletonLine variant="caption" width="70%" />
      </View>
      <ActionSlot label={t("sessions.revoke")} colors={colors} />
    </View>
  );
}
