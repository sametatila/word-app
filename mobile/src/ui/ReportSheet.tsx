import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { View, Modal, Pressable, ScrollView, TextInput } from "react-native";
import type { ScrollViewInstance } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { RadioDot } from "./RadioDot";
import { CorrectIcon } from "./icons";
import { REPORT_DETAIL_MAX, reasonsFor, sendReport, type ReportKind, type ReportReason, type ReportSurface, type ReportTarget } from "../lib/report";
import { useModalKeyboard } from "../lib/useKeyboardHeight";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";
import { DIALOG_MAX_WIDTH, dialogActionsStacked } from "../lib/useLayout";
import { FIELD, Field } from "./Field";


/**
 * "Bu içeriği bildir" alt kartı — ConfirmDialog ile aynı dil (karartılmış zemin,
 * ortalanmış kart). Sebep seçilir, gönderilir, kısa teşekkürle kapanır.
 *
 * `kind="content"` öğrenme içeriği (bkz. `ui/ReportFlag`): kendi başlığı ve
 * sebepleri, isteğe bağlı ayrıntı alanı, `surface` + `target` gövdeye ekleniyor.
 * Sunucu aynı hedefi 24 saat içinde ikinci kez görürse `duplicate` diyor;
 * kullanıcıya "zaten bildirdin" gösteriliyor, hata değil.
 */
/* Başlık ve giriş türden: kişi bildiriminde "yapay zekâ yanıtı" metni çıkıyordu (lig
   satırı, profil; App Review kaydı 2026-10-08). Web `report-dialog` aynı eşleme. */
const TITLE: Record<ReportKind, string> = { content: "reportsheet.content_title", user: "reportsheet.user_title", assessment: "reportsheet.assessment_title", chat: "reportsheet.report_this_content" };
const LEAD: Record<ReportKind, string> = { content: "reportsheet.content_lead", user: "reportsheet.user_lead", assessment: "reportsheet.assessment_lead", chat: "reportsheet.if_ai_reply_felt_inappropriate" };

/* YAZILAN AYRINTI KAYBOLMUYOR (QA F-0082). Geri tuşu kartı kapatıyor ve
   ayrıntı siliniyordu; aynı hedef yeniden açılınca sebep ve metin geri gelir.
   Gönderilince silinir. Yalnız bellekte (uygulama kapanınca gider). */
const drafts = new Map<string, { reason: ReportReason | null; detail: string }>();

export function ReportSheet({ visible, kind, refId, content, surface, target, onClose }: {
  visible: boolean; kind: ReportKind; refId: string; content: string;
  surface?: ReportSurface; target?: ReportTarget; onClose: () => void;
}) {
  const { colors } = useTheme();
  const isContent = kind === "content";
  const sendLabel = isContent ? t("reportsheet.send") : t("common.send");
  const stacked = dialogActionsStacked(t("common.discard"), sendLabel);
  const draftKey = `${kind}:${refId}`;
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [detail, setDetail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error" | "too_fast">("idle");
  const [duplicate, setDuplicate] = useState(false);
  /* Ayrıntı alanı klavyeyi açıyor: kart klavyenin üstünde kalsın, sığmazsa
     içi kaysın (küçük telefon + büyük yazı). Android'de Modal'ın klavyesi
     ölçülemiyor; o zaman kart ekranın üst yarısına çıkıyor (`useModalKeyboard`). */
  const mk = useModalKeyboard();
  const kb = mk.inset;
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollViewInstance>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (visible) { const d = drafts.get(draftKey); setReason(d?.reason ?? null); setDetail(d?.detail ?? ""); setDuplicate(false); setState("idle"); } }, [visible]);
  useEffect(() => {
    if (!visible || state === "done") return;
    if (detail.trim()) drafts.set(draftKey, { reason, detail });
    else drafts.delete(draftKey);
  }, [visible, draftKey, reason, detail, state]);

  async function submit() {
    if (!reason || state === "sending") return;
    setState("sending");
    const out = await sendReport(kind, refId, reason, content, isContent ? { surface, target, detail } : {});
    setDuplicate(out === "duplicate");
    if (out === "ok" || out === "duplicate") drafts.delete(draftKey);
    setState(out === "error" || out === "too_fast" ? out : "done");
    if (out === "ok" || out === "duplicate") setTimeout(onClose, 1300);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: mk.blind ? "flex-start" : "center", padding: spacing.xl, paddingTop: mk.blind ? insets.top + spacing.md : spacing.xl, paddingBottom: spacing.xl + kb }}>
        {/* Arka plan erişilebilirlik ağacından çıkıyor — bkz. `ConfirmDialog`
            içindeki not. */}
        <Pressable
          onPress={() => {}}
          accessibilityViewIsModal
          accessibilityRole="alert"
          /* Adı başlıktan — bkz. `ui/ConfirmDialog` içindeki not. */
          accessibilityLabel={t(TITLE[kind])}
          style={[{ width: "100%", maxWidth: DIALOG_MAX_WIDTH, maxHeight: mk.blind ? Math.max(220, Math.round(frame.height / 2) - insets.top - spacing.md) : Math.max(240, frame.height - kb - spacing.xl * 2), backgroundColor: colors.surface, borderRadius: radii.xl, overflow: "hidden" }, softShadow("#000000", 24)]}>
          <ScrollView ref={scroll} automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: spacing.xl, gap: spacing.sm }} bounces={false}>
          {state === "done" ? (
            /* Sonuç duyuruluyor — web `report-dialog` içindeki nota bak:
               kutu açık kalıyor, içi yerinde değişiyor. */
            <View accessibilityLiveRegion="polite" style={{ alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md }}>
              <View style={{ width: ds(56), height: ds(56), borderRadius: radii.pill, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                <CorrectIcon color={colors.successText} size={28} />
              </View>
              <Text variant="h3">{t("reportsheet.reported")}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{duplicate ? t("report.already") : t("reportsheet.thanks_we_ll_look_into_it")}</Text>
            </View>
          ) : (
            <>
              <Text variant="h2">{t(TITLE[kind])}</Text>
              <Text variant="caption" color={colors.textMuted}>{t(LEAD[kind])}</Text>
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
                /* Alan bloğu (`ui/Field`): listeden 12, etiket → kutu 8 (4'tü;
                   web `report-dialog` aynı sayılar). */
                <Field label={t("reportsheet.detail_label")} style={{ marginTop: FIELD.stack }}>
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
                    /* Odakta alan ve altındaki düğmeler görünsün: kart küçülünce içerik sona kayıyor. */
                    onFocus={() => { mk.focus.onFocus(); setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 250); }}
                    onBlur={mk.focus.onBlur}
                    style={{ minHeight: 72, maxHeight: 140, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, color: colors.text, fontSize: 15 }}
                  />
                </Field>
              ) : null}
              {state === "error" || state === "too_fast" ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.dangerText}>{t(state === "too_fast" ? "reportsheet.too_fast" : "reportsheet.couldn_t_send_try_again")}</Text> : null}
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
