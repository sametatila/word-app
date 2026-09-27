import React, { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { t } from "../lib/i18n";
import { PressableScale } from "./PressableScale";
import { ReportSheet } from "./ReportSheet";
import { FlagIcon } from "./icons";
import { snapshotText, targetRef, type ContentReport } from "../lib/report";
import { useTheme } from "../theme";

/**
 * Öğrenme içeriğindeki bir sorunu bildiren küçük bayrak — her öğe/soru kartının
 * başlık satırında, cevaptan sonra da yerinde duruyor (spec
 * `docs/plan/content-feedback.md` › Arayüz). Kart durumunu kendisi tutuyor.
 *
 * Görünen simge küçük (18), dokunma alanı 44×44: başlık satırını büyütmeden
 * erişilebilirlik ölçüsünü karşılıyor. `report` bir fonksiyon da olabilir;
 * anlık görüntü (kullanıcının cevabı dahil) ANCAK dokununca kuruluyor.
 */
export function ReportFlag({ report, onOpen, style }: {
  report: ContentReport | (() => ContentReport);
  /** Sayfa açılırken (ör. yürüyüş turunu duraklatmak için). */
  onOpen?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();
  const [open, setOpen] = useState<ContentReport | null>(null);
  return (
    <>
      <PressableScale
        onPress={() => { onOpen?.(); setOpen(typeof report === "function" ? report() : report); }}
        accessibilityRole="button"
        accessibilityLabel={t("report.flag_a11y")}
        style={[{ width: 44, height: 44, alignItems: "center", justifyContent: "center" }, style]}
      >
        <FlagIcon color={colors.textFaint} size={18} />
      </PressableScale>
      <ReportSheet
        visible={!!open}
        kind="content"
        refId={open ? targetRef(open.target) : ""}
        content={open ? snapshotText(open.snapshot) : ""}
        surface={open?.surface}
        target={open?.target}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
