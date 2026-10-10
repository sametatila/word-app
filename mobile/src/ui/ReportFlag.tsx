import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { t } from "../lib/i18n";
import { ReportSheet } from "./ReportSheet";
import { ReportButton } from "./ReportLink";
import { snapshotText, targetRef, type ContentReport } from "../lib/report";

/**
 * Öğrenme içeriğindeki bir sorunu bildiren "⚑ Bildir" bağlantısı (spec
 * `docs/plan/content-feedback.md` › Arayüz).
 *
 * YER: CEVAPTAN SONRA (Duolingo/Babbel düzeni, Samet 2026-09-28). Soru
 * ekranının başlığında ve ilerleme satırında duran simge bayrak her cihazda
 * göze batıyordu ve sınav sırasında dikkat dağıtıyordu. Artık sonuç
 * katmanında "Devam"ın solunda, alıştırmanın geri bildirim alanında, sonuç ve
 * gözden geçirme listelerinde duruyor. Görünümü yapay zekâ çıktısının
 * "Bildir"iyle (`ReportLink`) aynı düğme: `ReportButton`; yeri de onunla
 * aynı kural (içeriğin altında sol başta, cevap çubuğunda `inline`).
 *
 * `report` bir fonksiyon da olabilir; anlık görüntü (kullanıcının cevabı
 * dahil) ANCAK dokununca kuruluyor. Kart durumunu kendisi tutuyor.
 */
export function ReportFlag({ report, onOpen, onClose, style, inline }: {
  report: ContentReport | (() => ContentReport);
  /** Sayfa açılırken (ör. yürüyüş turunu ya da süreli turun sayacını duraklatmak için). */
  onOpen?: () => void;
  /** Sayfa kapanınca (gönderildi ya da vazgeçildi): süreli turun sayacı kaldığı yerden. */
  onClose?: () => void;
  style?: StyleProp<ViewStyle>;
  /** Satır içinde (cevap çubuğu, balonun eylem satırı): hizayı satır veriyor. */
  inline?: boolean;
}) {
  const [open, setOpen] = useState<ContentReport | null>(null);
  return (
    <>
      <ReportButton
        onPress={() => { onOpen?.(); setOpen(typeof report === "function" ? report() : report); }}
        label={t("report.flag_a11y")}
        style={style}
        inline={inline}
      />
      <ReportSheet
        visible={!!open}
        kind="content"
        refId={open ? targetRef(open.target) : ""}
        content={open ? snapshotText(open.snapshot) : ""}
        surface={open?.surface}
        target={open?.target}
        onClose={() => { setOpen(null); onClose?.(); }}
      />
    </>
  );
}
