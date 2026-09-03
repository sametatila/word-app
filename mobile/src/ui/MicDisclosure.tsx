import React from "react";
import { t } from "../lib/i18n";
import { View, Modal, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { MicIcon, CheckIcon } from "./icons";
import { openLegal } from "../lib/legal";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const POINTS = [
  "Yürüyüş modunu sen başlatırsın; mikrofon yalnız o sırada açıktır ve sürekli bir bildirimden bunu görürsün.",
  "Ekran kapalıyken ya da telefon cebindeyken de dinlemeye devam eder; bitirmek için uygulamaya dönüp durdurursun.",
  "Ekran kapalıyken söylediklerin, yazıya çevrilmek için kısa ses kayıtları olarak sunucumuza ve konuşma tanıma sağlayıcılarımıza (Microsoft Azure ve benzeri) gönderilir.",
  "Ses kaydı saklanmaz; yalnız tanınan metin ve beklenen kelime tutulur.",
];

function Point({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
      <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center", marginTop: 2 }}>
        <CheckIcon color={colors.primary} size={14} />
      </View>
      <Text variant="body" style={{ flex: 1, lineHeight: 22 }}>{text}</Text>
    </View>
  );
}

/**
 * Belirgin açıklama ve rıza ekranı (Play "Prominent disclosure"): sistem mikrofon
 * izninden ÖNCE, ne toplandığı, neden, nereye gittiği ve nasıl durdurulacağı.
 * Onay olumlu bir eylemle verilir; Vazgeç mikrofonu hiç açmaz.
 */
export function MicDisclosure({ visible, onAccept, onCancel }: { visible: boolean; onAccept: () => void; onCancel: () => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent onRequestClose={onCancel}>
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScrollView contentContainerStyle={{ paddingTop: insets.top + spacing.xxl, paddingHorizontal: spacing.xl, paddingBottom: spacing.xl, gap: spacing.lg }} showsVerticalScrollIndicator={false}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary, alignSelf: "center" }, softShadow(colors.primary, 12)]}>
            <MicIcon color="#fff" size={36} />
          </View>
          <Text variant="display" style={{ textAlign: "center" }}>{t("micdisclosure.mikrofon_ve_ses_verisi")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>
            Yürüyüş modu sesle çalışır. Başlamadan önce sesinin nasıl kullanıldığını bil.
          </Text>
          <View style={{ gap: spacing.md, marginTop: spacing.sm }}>
            {POINTS.map((p) => <Point key={p} text={p} colors={colors} />)}
          </View>
          <PressableScale onPress={() => openLegal("privacy")} hitSlop={6} accessibilityRole="link" style={{ alignSelf: "center", paddingVertical: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.primary}>{t("micdisclosure.gizlilik_politikasini_oku")}</Text>
          </PressableScale>
        </ScrollView>
        <View style={{ paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.lg, gap: spacing.sm }}>
          <PressableScale onPress={onAccept} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{t("micdisclosure.kabul_ediyorum_basla")}</Text>
          </PressableScale>
          <PressableScale onPress={onCancel} style={{ paddingVertical: spacing.md, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.vazgec")}</Text>
          </PressableScale>
        </View>
      </View>
    </Modal>
  );
}
