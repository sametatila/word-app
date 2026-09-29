import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, Modal, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { RadioDot } from "./RadioDot";
import { CheckIcon } from "./icons";
import { REPORT_DETAIL_MAX, reasonsFor, sendReport, type ReportKind, type ReportReason, type ReportSurface, type ReportTarget } from "../lib/report";
import { useKeyboardInset } from "../lib/useKeyboardHeight";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";
import { DIALOG_MAX_WIDTH, dialogActionsStacked } from "../lib/useLayout";


/**
 * "Bu içeriği bildir" alt kartı — ConfirmDialog ile aynı dil (karartılmış zemin,
 * ortalanmış kart). Sebep seçilir, gönderilir, kısa teşekkürle kapanır.
 *
 * `kind="content"` öğrenme içeriği (bkz. `ui/ReportFlag`): kendi başlığı ve
 * sebepleri, isteğe bağlı ayrıntı alanı, `surface` + `target` gövdeye ekleniyor.
 * Sunucu aynı hedefi 24 saat içinde ikinci kez görürse `duplicate` diyor;
 * kullanıcıya "zaten bildirdin" gösteriliyor, hata değil.
 */
export function ReportSheet({ visible, kind, refId, content, surface, target, onClose }: {
  visible: boolean; kind: ReportKind; refId: string; content: string;
  surface?: ReportSurface; target?: ReportTarget; onClose: () => void;
}) {
  const { colors } = useTheme();
  const isContent = kind === "content";
  const sendLabel = isContent ? t("reportsheet.send") : t("common.send");
  const stacked = dialogActionsStacked(t("common.discard"), sendLabel);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [detail, setDetail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [duplicate, setDuplicate] = useState(false);
  /* Ayrıntı alanı klavyeyi açıyor: kart klavyenin üstünde kalsın, sığmazsa
     içi kaysın (küçük telefon + büyük yazı). */
  const kb = useKeyboardInset();
  const frame = useSafeAreaFrame();

  useEffect(() => { if (visible) { setReason(null); setDetail(""); setDuplicate(false); setState("idle"); } }, [visible]);

  async function submit() {
    if (!reason || state === "sending") return;
    setState("sending");
    const out = await sendReport(kind, refId, reason, content, isContent ? { surface, target, detail } : {});
    setDuplicate(out === "duplicate");
    setState(out === "error" ? "error" : "done");
    if (out !== "error") setTimeout(onClose, 1300);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: spacing.xl, paddingBottom: spacing.xl + kb }}>
        {/* Arka plan erişilebilirlik ağacından çıkıyor — bkz. `ConfirmDialog`
            içindeki not. */}
        <Pressable
          onPress={() => {}}
          accessibilityViewIsModal
          accessibilityRole="alert"
          /* Adı başlıktan — bkz. `ui/ConfirmDialog` içindeki not. */
          accessibilityLabel={isContent ? t("reportsheet.content_title") : t("reportsheet.report_this_content")}
          style={[{ width: "100%", maxWidth: DIALOG_MAX_WIDTH, maxHeight: Math.max(240, frame.height - kb - spacing.xl * 2), backgroundColor: colors.surface, borderRadius: radii.xl, overflow: "hidden" }, softShadow("#000000", 24)]}>
          <ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: spacing.xl, gap: spacing.sm }} bounces={false}>
          {state === "done" ? (
            /* Sonuç duyuruluyor — web `report-dialog` içindeki nota bak:
               kutu açık kalıyor, içi yerinde değişiyor. */
            <View accessibilityLiveRegion="polite" style={{ alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md }}>
              <View style={{ width: ds(56), height: ds(56), borderRadius: radii.pill, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                <CheckIcon color={colors.successText} size={28} />
              </View>
              <Text variant="h3">{t("reportsheet.reported")}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{duplicate ? t("report.already") : t("reportsheet.thanks_we_ll_look_into_it")}</Text>
            </View>
          ) : (
            <>
              <Text variant="h2">{isContent ? t("reportsheet.content_title") : t("reportsheet.report_this_content")}</Text>
              <Text variant="caption" color={colors.textMuted}>{isContent ? t("reportsheet.content_lead") : t("reportsheet.if_ai_reply_felt_inappropriate")}</Text>
              <View accessibilityRole="radiogroup" style={{ gap: spacing.xs, marginTop: spacing.sm }}>
                {reasonsFor(kind).map((r) => {
                  const active = reason === r.key;
                  return (
                    <PressableScale key={r.key} onPress={() => setReason(r.key)} accessibilityRole="radio" accessibilityState={{ selected: active }} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 44, paddingVertical: isContent ? 8 : 10, paddingHorizontal: spacing.md, borderRadius: radii.md, borderWidth: 1, borderColor: active ? colors.primary : colors.border, backgroundColor: colors.surface }}>
                      {/* Radyo satırı: seçiliyken dolgu yok, turuncu kenar (2026-09-29 Samet: seçim B). */}
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyStrong" color={active ? colors.primaryText : colors.text}>{r.label}</Text>
                        {r.sub ? <Text variant="micro" color={colors.textMuted}>{r.sub}</Text> : null}
                      </View>
                      <RadioDot selected={active} />
                    </PressableScale>
                  );
                })}
              </View>
              {isContent ? (
                <View style={{ gap: spacing.xs, marginTop: spacing.sm }}>
                  <Text variant="caption" color={colors.textMuted}>{t("reportsheet.detail_label")}</Text>
                  <TextInput
                    value={detail}
                    onChangeText={(v) => setDetail(v.slice(0, REPORT_DETAIL_MAX))}
                    maxLength={REPORT_DETAIL_MAX}
                    multiline
                    autoCapitalize="sentences"
                    textAlignVertical="top"
                    placeholder={t("reportsheet.detail_placeholder")}
                    placeholderTextColor={colors.textFaint}
                    accessibilityLabel={t("reportsheet.detail_label")}
                    style={{ minHeight: 72, maxHeight: 140, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.text, fontSize: 15 }}
                  />
                </View>
              ) : null}
              {state === "error" ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.dangerText}>{t("reportsheet.couldn_t_send_try_again")}</Text> : null}
              {/* Onay kutusuyla aynı kural (bkz. `ConfirmDialog`): uzun etikette alt alta. */}
              <View style={{ flexDirection: stacked ? "column" : "row", gap: stacked ? spacing.sm : spacing.md, marginTop: spacing.md }}>
                <PressableScale onPress={onClose} style={{ flex: stacked ? undefined : 1, paddingHorizontal: spacing.md, borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 14, alignItems: "center" }}>
                  <Text variant="bodyStrong" color={colors.text}>{t("common.discard")}</Text>
                </PressableScale>
                <PressableScale onPress={submit} disabled={!reason || state === "sending"} accessibilityState={{ disabled: !reason }} style={[{ flex: stacked ? undefined : 1, paddingHorizontal: spacing.md, borderRadius: radii.lg, backgroundColor: reason ? colors.primary : colors.surface2, paddingVertical: 14, alignItems: "center" }, reason ? softShadow(colors.primary, 8) : {}]}>
                  <Text variant="bodyStrong" color={reason ? colors.onPrimary : colors.textFaint}>{state === "sending" ? "..." : sendLabel}</Text>
                </PressableScale>
              </View>
            </>
          )}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
