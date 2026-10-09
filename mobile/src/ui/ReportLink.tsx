import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { ReportSheet } from "./ReportSheet";
import { ReportIcon } from "./icons";
import type { ReportKind } from "../lib/report";
import { useTheme, spacing } from "../theme";
import { hitSlopFor } from "./touch";

/**
 * "Bildir" bağlantısı + kendi bildirim kartı — bir yapay zekâ çıktısının altına
 * tek satırla konuyor.
 *
 * Konuşma sohbetinde her yapay zekâ yanıtının altında "Bildir" vardı ama sohbet
 * sınavının yanıtlarında ve alıştırmanın hemen ardından gelen yapay zekâ
 * değerlendirmesinde yoktu (denetim CNT-6); raporlama yalnız sonradan
 * "Yazdıklarım" geçmişinden yapılabiliyordu. Play "AI-Generated Content"
 * politikası ve şartlar §6 ("yanıtın altındaki Bildir") çıktının olduğu yerde
 * bildirmeyi istiyor. Kart durumunu kendisi tuttuğu için çağıran ekranın ayrıca
 * `ReportSheet` kurması gerekmiyor.
 *
 * `content` bildirilen metnin kendisi: sunucu onu saklıyor, çünkü kaynak kayıt
 * (ör. sohbet günlüğü) 30 günde siliniyor ve inceleme ona bağlı kalmamalı.
 */
/**
 * Anlık değerlendirmenin bildirim ref'i: sunucu kaydın kimliğini döndürdüyse
 * (`/api/assess` `id`) o — "Yazdıklarım" geçmişindeki bildirimle aynı ref,
 * panel iki yoldan geleni aynı kayda bağlıyor. Eski sunucu ya da kaydedilmemiş
 * sonuçta (id yok) çağıranın kendi ref'i.
 */
export function assessmentRef(id: unknown, fallback: string): string {
  return typeof id === "number" || (typeof id === "string" && id) ? String(id) : fallback;
}

/**
 * Uygulamanın TEK bildirim görünümü — küçük bayrak + "Bildir", soluk renk.
 *
 * Yapay zekâ çıktısının altındaki bağlantı (`ReportLink`) ve öğrenme içeriğinin
 * bildirimi (`ui/ReportFlag`) aynı düğmeyi çiziyor: öğrenci bildirmeyi her
 * yerde aynı biçimde tanıyor. Görünen parça küçük; dokunma alanı dolgu +
 * `hitSlop` ile 44pt'yi geçiyor. Etiket tek satır ve daralmıyor: dar sonuç
 * katmanında "Devam" daralıyor, bağlantı bölünmüyor.
 */
export function ReportButton({ onPress, label, style }: {
  onPress: () => void;
  /** Ekran okuyucu adı. */
  label: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  return (
    <PressableScale
      onPress={onPress}
      /* Görünen yükseklik: micro satırı (18) + 2×4 dolgu = 26; pay 48'e tamamlıyor
         (eskisi 10 → 46, QA F-0051). Etiket+bayrak zaten 48'den geniş, yanlara 8. */
      hitSlop={{ ...hitSlopFor(0, 26), left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={[{ flexDirection: "row", alignItems: "center", gap: spacing.xs, paddingVertical: spacing.xs, flexShrink: 0 }, style]}
    >
      <ReportIcon color={colors.textFaint} size={13} />
      <Text variant="micro" color={colors.textFaint} numberOfLines={1}>{t("conversation.report")}</Text>
    </PressableScale>
  );
}

export function ReportLink({ kind, refId, content, style }: {
  kind: Exclude<ReportKind, "user">;
  refId: string;
  content: string;
  style?: StyleProp<ViewStyle>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ReportButton onPress={() => setOpen(true)} label={t("conversation.report_this_answer")} style={style} />
      <ReportSheet visible={open} kind={kind} refId={refId} content={content} onClose={() => setOpen(false)} />
    </>
  );
}
