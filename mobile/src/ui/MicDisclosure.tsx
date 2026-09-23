import React from "react";
import { t } from "../lib/i18n";
import { View, Modal, Platform, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { MicIcon, CheckIcon } from "./icons";
import { openLegal } from "../lib/legal";
import { ProcessorList } from "./AiConsentSheet";
import type { AiConsentProcessor } from "../lib/aiConsent";
import { useTheme, spacing, radii, softShadow, type Palette, ds } from "../theme";
import { ContentColumn } from "./ContentColumn";

/**
 * Ekranın üç kullanımı — iki mağazanın kuralı birbirinin TERSİ olduğu için.
 *
 *   consent  Android: Play'in "belirgin açıklama ve rıza" ekranı. Ne toplandığı,
 *            nereye gittiği (sağlayıcılar adıyla) ve olumlu bir onay; "Vazgeç"
 *            açık kalmalı — Play "şimdi değil" seçeneğini öneriyor.
 *   prime    iOS: sistem mikrofon izninden hemen önceki ekran. Apple HIG burada
 *            TEK düğme istiyor ("Devam"), kişinin sistem penceresini görmeden
 *            ekrandan çıkmasına izin vermiyor; bu kalıp için somut retler var.
 *            Sesin üçüncü taraflara gönderilmesi ayrı bir rıza: izin
 *            penceresinden SONRA, iki düğmeli yapay zekâ izni ekranında soruluyor
 *            (bkz. WalkModeScreen `askVoiceConsent`). Sağlayıcı listesi o yüzden
 *            burada yok, orada.
 *   info     İki platformda da girişteki "Mikrofon ve ses verisi" bağlantısı:
 *            yalnız okumak için, sonrasında izin penceresi YOK — kapatılabilir.
 */
export type MicDisclosureMode = "consent" | "prime" | "info";

/**
 * Açıklama maddeleri — sabit dizi değil FONKSİYON: t() modül yüklenirken çağrılsaydı
 * dil tercihi (loadLang) henüz okunmamış olurdu ve metin her zaman Türkçe donardı.
 *
 * PLATFORMA GÖRE AYRI: Android metni "sürekli bir bildirimden görürsün" ve
 * "uygulamaya dönüp durdurursun" diyor; iOS'ta kalıcı bildirim yok, dinleme
 * kilit ekranındaki denetimden ve kulaklık düğmesinden duruyor.
 */
function points(guest: boolean): string[] {
  if (Platform.OS === "ios") {
    return [
      t("micdisclosure.ios_you_start"),
      t("micdisclosure.ios_keeps_listening"),
      t(guest ? "micdisclosure.guest_device_only" : "micdisclosure.ios_voice_later"),
      t("micdisclosure.audio_is_not_stored_only"),
    ];
  }
  return [
    t("micdisclosure.you_start_walk_mode_yourself"),
    t("micdisclosure.it_keeps_listening_while_screen"),
    /* Misafirde ses sunucuya hiç gitmiyor (ekran kapalı yol hesap istiyor). */
    t(guest ? "micdisclosure.guest_device_only" : "micdisclosure.while_screen_is_off_what_you_say"),
    t("micdisclosure.audio_is_not_stored_only"),
  ];
}

function Point({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center", marginTop: 2 }}>
        <CheckIcon color={colors.primaryText} size={14} />
      </View>
      <Text variant="body" style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

/**
 * Belirgin açıklama ekranı: sistem mikrofon izninden ÖNCE, ne toplandığı, neden,
 * nereye gittiği ve nasıl durdurulacağı. Kip, düğmeleri ve sağlayıcı listesini
 * belirliyor (yukarıdaki not).
 */
export function MicDisclosure({ visible, mode, onAccept, onCancel, processors, processorsFailed, guest = false }: {
  visible: boolean;
  mode: MicDisclosureMode;
  /** consent: onay · prime: sistem izin penceresine geç · info: kullanılmıyor */
  onAccept: () => void;
  /** consent: vazgeç · info: kapat · prime: YOK (HIG) */
  onCancel: () => void;
  /**
   * Sesin gidebileceği sağlayıcılar — sunucudan, gizlilik politikasının
   * tablosundan. Android metni "aşağıda adları yazılı" diyor; liste o sözün karşılığı.
   */
  processors: AiConsentProcessor[] | null;
  processorsFailed: boolean;
  /** Misafir: ses sunucuya gitmiyor; sağlayıcı listesi ve sunucu maddesi yok. */
  guest?: boolean;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const showProcessors = mode !== "prime" && !guest;
  /* İzin öncesi ekranda donanım geri tuşu da çıkış değil: iOS'ta zaten yok,
     ama kip yanlışlıkla Android'de kullanılırsa da sistem penceresi atlanmasın. */
  const requestClose = mode === "prime" ? () => {} : onCancel;
  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={requestClose}>
      {/* ROL VE AD. Arka plan erişilebilirlik ağacından çıkıyordu ama kutunun
          KENDİSİ adsızdı: ekran okuyucu "mikrofon ve ses verisi" başlığını
          ancak içerik okunmaya başlayınca söylüyordu. Web karşılığı
          `aria-labelledby` ile başlığı kutunun adı yapıyor. */}
      <View
        accessibilityViewIsModal
        accessibilityRole="alert"
        accessibilityLabel={t("micdisclosure.microphone_and_voice_data")}
        style={{ flex: 1, backgroundColor: colors.bg }}
      >
        {/* Modal gezginin DIŞINDA çiziliyor, yani ekranların kolonunu almıyor:
            tablette kenardan kenara yayılıyordu. Aynı kolon burada da. */}
        <ContentColumn>
        <ScrollView contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingHorizontal: spacing.xl, paddingBottom: spacing.xl, gap: spacing.lg }} showsVerticalScrollIndicator={false}>
          <View style={[{ width: ds(72), height: ds(72), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, alignSelf: "center" }, softShadow(colors.primary, 12)]}>
            <MicIcon color={colors.onPrimary} size={36} />
          </View>
          <Text variant="display" style={{ textAlign: "center" }}>{t("micdisclosure.microphone_and_voice_data")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>
            {t("micdisclosure.walk_mode_works_with_your_voice")}
          </Text>
          <View style={{ gap: spacing.md, marginTop: spacing.sm }}>
            {points(guest).map((p) => <Point key={p} text={p} colors={colors} />)}
          </View>
          {showProcessors ? <ProcessorList processors={processors} failed={processorsFailed} colors={colors} /> : null}
          <PressableScale onPress={() => openLegal("privacy")} hitSlop={6} accessibilityRole="link" style={{ alignSelf: "center", paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.primaryText}>{t("micdisclosure.read_privacy_policy")}</Text>
          </PressableScale>
        </ScrollView>
        <View style={{ paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.lg, gap: spacing.sm }}>
          {mode === "info" ? (
            <PressableScale onPress={onCancel} accessibilityRole="button" style={{ borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingVertical: spacing.lg, alignItems: "center" }}>
              <Text variant="h3" color={colors.text}>{t("common.close")}</Text>
            </PressableScale>
          ) : (
            <PressableScale onPress={onAccept} accessibilityRole="button" style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color={colors.onPrimary}>{t(mode === "prime" ? "common.continue_2" : "micdisclosure.i_agree_start")}</Text>
            </PressableScale>
          )}
          {mode === "consent" ? (
            <PressableScale onPress={onCancel} accessibilityRole="button" style={{ paddingVertical: spacing.md, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.textMuted}>{t("common.discard")}</Text>
            </PressableScale>
          ) : null}
        </View>
        </ContentColumn>
      </View>
    </Modal>
  );
}
