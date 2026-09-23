import React, { useEffect, useState, useSyncExternalStore } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { openLegal } from "../lib/legal";
import { acceptTerms, clearTermsUpdate, currentTermsUpdate, subscribeTerms, syncAccountPrefs } from "../lib/accountSync";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";

/**
 * "ŞARTLAR GÜNCELLENDİ" — tek seferlik not (hukuk denetimi LEG-11; web
 * `components/account-sync` `TermsBanner` karşılığı).
 *
 * Not KÖKTE ve ALTTA: hangi ekranda açılırsa açılsın görünsün, ama akışı
 * kesmesin (kapı değil, bilgi). İki metne bağlantı veriyor; "Anladım" güncel
 * sürümü hesaba yazıyor ve not kapanıyor. Hesap tercihlerinin eşitlenmesi de
 * buradan tetikleniyor: oturum açılınca (ve hesap değişince) bir kez
 * (bkz. lib/accountSync).
 */
export function TermsUpdateNotice() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const update = useSyncExternalStore(subscribeTerms, currentTermsUpdate, currentTermsUpdate);
  const [busy, setBusy] = useState(false);
  const userId = user?.id ?? null;

  useEffect(() => {
    if (!userId) { clearTermsUpdate(); return; }
    void syncAccountPrefs();
  }, [userId]);

  if (!user || !update) return null;

  async function ok() {
    if (busy) return;
    setBusy(true);
    await acceptTerms();
    setBusy(false);
  }

  const title = t("terms.updated_title");
  return (
    <View pointerEvents="box-none" style={{ position: "absolute", left: 0, right: 0, bottom: insets.bottom + spacing.md, paddingHorizontal: spacing.lg }}>
      <View
        accessibilityLiveRegion="polite"
        accessibilityLabel={title}
        style={[{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, gap: spacing.sm }, softShadow("#000000", 12)]}
      >
        <Text variant="bodyStrong">{title}</Text>
        <Text variant="caption" color={colors.textMuted}>{t("terms.updated_body", { version: update.version })}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          <PressableScale onPress={() => openLegal("terms")} accessibilityRole="link" hitSlop={8}>
            <Text variant="caption" color={colors.primaryText} style={{ textDecorationLine: "underline" }}>{t("terms.read_terms")}</Text>
          </PressableScale>
          <PressableScale onPress={() => openLegal("privacy")} accessibilityRole="link" hitSlop={8}>
            <Text variant="caption" color={colors.primaryText} style={{ textDecorationLine: "underline" }}>{t("terms.read_privacy")}</Text>
          </PressableScale>
        </View>
        <PressableScale onPress={() => void ok()} disabled={busy} accessibilityRole="button" style={{ alignSelf: "flex-end", backgroundColor: colors.primary, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 10 }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("terms.ok")}</Text>
        </PressableScale>
      </View>
    </View>
  );
}
