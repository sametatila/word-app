import React from "react";
import { View, Modal, Pressable } from "react-native";
import { Text } from "./Text";
import { t } from "../lib/i18n";
import { PressableScale } from "./PressableScale";
import { useTheme, spacing, radii, softShadow, DIALOG_FILL, DIALOG_INK } from "../theme";

/**
 * Uygulama tasarımına uygun onay modalı (native Alert yerine). Karartılmış zemin
 * üzerinde ortalanmış kart: başlık, mesaj, Vazgeç + onay butonu. Yıkıcı işlemde
 * (destructive) onay butonu tehlike (kırmızı) rengiyle çizilir. Zemine dokununca
 * kapanır; karta dokunuş kapatmaz.
 */
export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel = t("common.confirm"),
  cancelLabel = t("common.discard"),
  destructive,
  onConfirm,
  onCancel,
}: {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const { colors } = useTheme();
  /* Dolgu TEMAYA DUYARLI DEĞİL ve `theme/colors` `DIALOG_FILL`den geliyor:
     gerekçesi ve kontrast ölçümleri orada yazılı (koyu temada `colors.danger`
     açık pembeye dönüyor ve beyaz yazıyla 2.06 veriyordu). */
  const accent = destructive ? DIALOG_FILL.destructive : DIALOG_FILL.primary;
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onCancel}>
      <Pressable onPress={onCancel} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
        {/* EKRAN OKUYUCU İÇİN DE BİR DİYALOG. RN `Modal`i görsel olarak
            öne geliyor ama erişilebilirlik ağacında arka plan ERİŞİLEBİLİR
            kalıyordu: VoiceOver kart bitince arkadaki ekranı okumaya devam
            ediyor, kullanıcı hangi soruyu cevapladığını kaybediyordu. Webde
            bu bedava geliyor (`<dialog>` arka planı inert yapıyor);
            `accessibilityViewIsModal` onun karşılığı. */}
        <Pressable
          onPress={() => {}}
          accessibilityViewIsModal
          accessibilityRole="alert"
          /* Kutunun ADI başlığın kendisi: rol tek başına "uyarı" diyor, neyin
             sorulduğunu söylemiyor. Web karşılığı `aria-labelledby` ile aynı
             başlığı kutunun adı yapıyor. */
          accessibilityLabel={title}
          style={[{ width: "100%", maxWidth: 400, backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, gap: spacing.xs }, softShadow("#000000", 24)]}>
          <Text variant="h2">{title}</Text>
          {message ? <Text variant="body" color={colors.textMuted} style={{ marginTop: 2 }}>{message}</Text> : null}
          <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.lg }}>
            <PressableScale onPress={onCancel} style={{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 14, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.text}>{cancelLabel}</Text>
            </PressableScale>
            <PressableScale onPress={onConfirm} style={[{ flex: 1, borderRadius: radii.lg, backgroundColor: accent, paddingVertical: 14, alignItems: "center" }, softShadow(accent, 8)]}>
              <Text variant="bodyStrong" color={DIALOG_INK}>{confirmLabel}</Text>
            </PressableScale>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
