import React, { useEffect } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { useTheme, spacing } from "../theme";
import { PressableScale } from "./PressableScale";
import { FlowNote } from "./flow";
import { CheckIcon } from "./icons";

/**
 * MİSAFİR HESABA GEÇTİ — tek seferlik not (mağaza ön inceleme B24).
 *
 * Birleşme sunucuda sessizce oluyor; kullanıcı ilerlemesinin nereye gittiğini
 * görmezse "misafirken yaptıklarım kayboldu mu" diye soruyor. Not KÖKTE:
 * birleşme e-posta girişinden de, Android'deki Apple devrinden de, doğrulama
 * bağlantısından da gelebiliyor ve her yolun kendi ekranı yok. Dokununca ya da
 * birkaç saniye sonra kapanıyor; ekran okuyucu duyuruyor.
 */
const NOTICE_MS = 6000;

export function GuestClaimNotice() {
  const { claimNotice, clearClaimNotice } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!claimNotice) return;
    const id = setTimeout(clearClaimNotice, NOTICE_MS);
    return () => clearTimeout(id);
  }, [claimNotice, clearClaimNotice]);

  if (!claimNotice) return null;
  const text = t(claimNotice === "merged" ? "guest.claim_merged" : "guest.claim_moved");
  return (
    <View pointerEvents="box-none" style={{ position: "absolute", left: 0, right: 0, top: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
      <PressableScale onPress={clearClaimNotice} accessibilityRole="button" accessibilityLabel={text} accessibilityHint={t("common.close")} accessibilityLiveRegion="polite" hitSlop={14} style={{ minHeight: 44, justifyContent: "center" }}>
        <FlowNote tone="ok" icon={<CheckIcon color={colors.successText} size={16} />} text={text} />
      </PressableScale>
    </View>
  );
}
