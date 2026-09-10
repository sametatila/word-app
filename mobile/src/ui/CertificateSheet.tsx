import React, { useEffect, useState } from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { XIcon } from "./icons";
import { API_BASE, fetchWithTimeout } from "../api/client";
import { useTheme, spacing, radii } from "../theme";

/**
 * Sertifika — geçilmiş (deneme olmayan) bir sınavın paylaşılabilir kâğıdı.
 *
 * Uç aylardır hazırdı ve yorumu "bu ucu mobil de çağırıyor" diyordu
 * (`api/certificate/[id]`), ama mobilde ONU ÇAĞIRAN HİÇBİR ŞEY YOKTU: sınavı
 * geçen Android kullanıcısı ödülünü hiç görmüyordu. Web sonuç kartının
 * altında bağlantı olarak açıyor.
 *
 * SİSTEM TARAYICISINDA AÇILMIYOR, içeride çiziliyor: oturum çerezle taşınıyor
 * ve o çerez uygulamanın kendi ağ katmanında (bkz. `api/client`). Bağlantıyı
 * tarayıcıya vermek 401 döndürürdü. Kâğıt SVG olduğu için WebView'e olduğu
 * gibi verilebiliyor.
 */
export function CertificateSheet({ examId, visible, onClose }: { examId: number; visible: boolean; onClose: () => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    setSvg(null);
    setFailed(false);
    fetchWithTimeout(`${API_BASE}/api/certificate/${examId}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        const text = await r.text();
        if (alive) setSvg(text);
      })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [visible, examId]);

  /* Kâğıt kabına sığsın ve koyu temada beyaz bir dikdörtgen olarak patlamasın
     diye kendi zeminiyle sarılıyor; `viewport` olmadan WebView SVG'yi gerçek
     piksel boyunda çiziyor ve telefonda taşıyor. */
  const html = svg
    ? `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:12px;background:${colors.bg};display:flex;align-items:center;justify-content:center;min-height:100%}svg{max-width:100%;height:auto}</style>${svg}`
    : "";

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}>
          <Text variant="h3" style={{ flex: 1 }}>{t("exam.open_certificate")}</Text>
          <PressableScale hitSlop={4} onPress={onClose} accessibilityLabel={t("common.close")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <XIcon color={colors.text} size={22} />
          </PressableScale>
        </View>
        {failed ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}>
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("exam.certificate_failed")}</Text>
          </View>
        ) : svg === null ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator color={colors.primary} /></View>
        ) : (
          <WebView
            originWhitelist={["*"]}
            source={{ html }}
            style={{ flex: 1, backgroundColor: colors.bg }}
            // Kâğıt kendi içinde bağlantı taşımıyor; gezinme kapalı kalsın.
            onShouldStartLoadWithRequest={() => false}
          />
        )}
      </View>
    </Modal>
  );
}
