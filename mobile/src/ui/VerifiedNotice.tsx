import React, { useEffect, useRef } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { useTheme, spacing } from "../theme";
import { PressableScale } from "./PressableScale";
import { FlowNote } from "./flow";
import { CorrectIcon } from "./icons";

/**
 * "E-POSTAN DOĞRULANDI, GİRİŞ YAP" — tek seferlik not.
 *
 * Bu cihazın beklemediği bir doğrulama bağlantısı açıldığında adres doğrulanıyor
 * ama oturum açılmıyor (bkz. lib/pendingVerify). Kullanıcı neden giriş ekranında
 * kaldığını bilsin. Biçim ve süre `GuestClaimNotice` ile aynı.
 */
const NOTICE_MS = 6000;

export function VerifiedNotice({ onClose }: { onClose: () => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  /* Kapatıcı her çizimde yeni olabilir; süre yalnız ilk görünüşte kuruluyor. */
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const id = setTimeout(() => close.current(), NOTICE_MS);
    return () => clearTimeout(id);
  }, []);

  const text = t("verify.verified_now_sign_in");
  return (
    <View pointerEvents="box-none" style={{ position: "absolute", left: 0, right: 0, top: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
      <PressableScale onPress={onClose} accessibilityRole="button" accessibilityLabel={text} accessibilityHint={t("common.close")} accessibilityLiveRegion="polite" hitSlop={14} style={{ minHeight: 44, justifyContent: "center" }}>
        <FlowNote tone="ok" icon={<CorrectIcon color={colors.successText} size={16} />} text={text} />
      </PressableScale>
    </View>
  );
}
