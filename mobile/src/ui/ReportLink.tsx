import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { ReportSheet } from "./ReportSheet";
import type { ReportKind } from "../lib/report";
import { useTheme } from "../theme";

/**
 * "Bildir" bağlantısı + kendi bildirim kartı — bir yapay zekâ çıktısının altına
 * tek satırla konuyor.
 *
 * Ders sohbetinde her yapay zekâ yanıtının altında "Bildir" vardı ama rol yapma
 * sınavının yanıtlarında ve alıştırmanın hemen ardından gelen yapay zekâ
 * değerlendirmesinde yoktu (denetim CNT-6); raporlama yalnız sonradan
 * "Yazdıklarım" geçmişinden yapılabiliyordu. Play "AI-Generated Content"
 * politikası ve şartlar §6 ("yanıtın altındaki Bildir") çıktının olduğu yerde
 * bildirmeyi istiyor. Kart durumunu kendisi tuttuğu için çağıran ekranın ayrıca
 * `ReportSheet` kurması gerekmiyor.
 *
 * `content` bildirilen metnin kendisi: sunucu onu saklıyor, çünkü kaynak kayıt
 * (ör. rol yapma günlüğü) 30 günde siliniyor ve inceleme ona bağlı kalmamalı.
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

export function ReportLink({ kind, refId, content, style }: {
  kind: Exclude<ReportKind, "user">;
  refId: string;
  content: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <>
      <PressableScale onPress={() => setOpen(true)} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("conversation.report_this_answer")} style={style}>
        <Text variant="micro" color={colors.textFaint}>{t("conversation.report")}</Text>
      </PressableScale>
      <ReportSheet visible={open} kind={kind} refId={refId} content={content} onClose={() => setOpen(false)} />
    </>
  );
}
