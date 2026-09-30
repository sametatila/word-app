import React, { useEffect, useState } from "react";
import { Modal, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { LockedIcon } from "./icons";
import { FlowActions, FlowNote, FlowTopBar, StateBody } from "./flow";
import { useAuth } from "../lib/AuthContext";
import { apiBase, fetchWithTimeout } from "../api/client";
import { useTheme, spacing } from "../theme";
import { ContentColumn } from "./ContentColumn";

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
  /* Misafirin adı yok: kâğıtta "Öğrenci" yazıyor. Neden ve adın nasıl
     geleceği kâğıdın üstünde söyleniyor. */
  const guest = Boolean(useAuth().user?.guest);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  /* "Tekrar dene" bu sayacı artırıyor; yükleme etkisi yeniden koşuyor. */
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let alive = true;
    setSvg(null);
    setFailed(false);
    fetchWithTimeout(`${apiBase()}/api/certificate/${examId}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        const text = await r.text();
        if (alive) setSvg(text);
      })
      .catch(() => { if (alive) setFailed(true); });
    return () => { alive = false; };
  }, [visible, examId, attempt]);

  /* Kâğıt kabına sığsın ve koyu temada beyaz bir dikdörtgen olarak patlamasın
     diye kendi zeminiyle sarılıyor; `viewport` olmadan WebView SVG'yi gerçek
     piksel boyunda çiziyor ve telefonda taşıyor. */
  const html = svg
    ? `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:${spacing.md}px;background:${colors.bg};display:flex;align-items:center;justify-content:center;min-height:100%}svg{max-width:100%;height:auto}</style>${svg}`
    : "";

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onClose}>
      {/* Tam ekran sayfa: arka plandaki ekran erişilebilirlik ağacında
          kalmasın — bkz. `ConfirmDialog` içindeki not. */}
      <View accessibilityViewIsModal accessibilityLabel={t("exam.open_certificate")} style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }}>
        {/* Modal gezginin DIŞINDA: ekranlarla aynı kolon burada elle veriliyor. */}
        <ContentColumn>
        {/* Bilgi ekranı: üstte X yok, yalnız başlık; çıkış dipteki "Kapat"
            (öteki bilgi ekranlarıyla aynı, `FlowActions` `close`). Donanım
            geri tuşu `onRequestClose` ile kapatıyor. */}
        <View style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}>
          <FlowTopBar title={t("exam.open_certificate")} />
        </View>
        {guest && !failed ? (
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
            <FlowNote icon={<LockedIcon color={colors.textMuted} size={16} />} text={t("guest.certificate_name")} />
          </View>
        ) : null}
        {failed ? (
          <View style={{ flex: 1, paddingHorizontal: spacing.lg }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
              <StateBody alert title={t("exam.certificate_failed")} />
            </View>
          </View>
        ) : svg === null ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator color={colors.primary} /></View>
        ) : (
          <WebView
            originWhitelist={["*"]}
            source={{ html }}
            style={{ flex: 1, backgroundColor: colors.bg }}
            // Kâğıt statik SVG; script çalıştırmaya gerek yok. Sunucudan gelen
            // HTML üzerinde JS kapalı: sertifika ucu ileride kullanıcı-etkili bir
            // metin gömerse oluşacak WebView-içi XSS'i sıfır işlev kaybıyla kapatır
            // (güvenlik denetimi #11).
            javaScriptEnabled={false}
            // Kâğıt kendi içinde bağlantı taşımıyor; gezinme kapalı kalsın.
            onShouldStartLoadWithRequest={() => false}
          />
        )}
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md }}>
          {failed
            ? <FlowActions primary={{ label: t("common.try_again"), onPress: () => setAttempt((n) => n + 1) }} close={onClose} />
            : <FlowActions primary={{ label: t("common.close"), onPress: onClose }} />}
        </View>
        </ContentColumn>
      </View>
    </Modal>
  );
}
