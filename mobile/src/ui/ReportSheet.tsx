import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, Modal, Pressable } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { CheckIcon } from "./icons";
import { reasonsFor, sendReport, type ReportKind, type ReportReason } from "../lib/report";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * "Bu içeriği bildir" alt kartı — ConfirmDialog ile aynı dil (karartılmış zemin,
 * ortalanmış kart). Sebep seçilir, gönderilir, kısa teşekkürle kapanır.
 */
export function ReportSheet({ visible, kind, refId, content, onClose }: {
  visible: boolean; kind: ReportKind; refId: string; content: string; onClose: () => void;
}) {
  const { colors } = useTheme();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => { if (visible) { setReason(null); setState("idle"); } }, [visible]);

  async function submit() {
    if (!reason || state === "sending") return;
    setState("sending");
    const ok = await sendReport(kind, refId, reason, content);
    setState(ok ? "done" : "error");
    if (ok) setTimeout(onClose, 1300);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.55)", alignItems: "center", justifyContent: "center", padding: spacing.xl }}>
        <Pressable onPress={() => {}} style={[{ width: "100%", maxWidth: 400, backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.xl, gap: spacing.sm }, softShadow("#000000", 24)]}>
          {state === "done" ? (
            <View style={{ alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md }}>
              <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: colors.successSoft, alignItems: "center", justifyContent: "center" }}>
                <CheckIcon color={colors.success} size={28} />
              </View>
              <Text variant="h3">{t("reportsheet.reported")}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("reportsheet.thanks_we_ll_look_into_it")}</Text>
            </View>
          ) : (
            <>
              <Text variant="h2">{t("reportsheet.report_this_content")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("reportsheet.if_ai_reply_felt_inappropriate")}</Text>
              <View style={{ gap: spacing.xs, marginTop: spacing.sm }}>
                {reasonsFor(kind).map((r) => {
                  const active = reason === r.key;
                  return (
                    <PressableScale key={r.key} onPress={() => setReason(r.key)} accessibilityRole="radio" accessibilityState={{ selected: active }} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, paddingHorizontal: spacing.md, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
                      <View style={{ flex: 1 }}>
                        <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{r.label}</Text>
                        <Text variant="micro" color={colors.textMuted}>{r.sub}</Text>
                      </View>
                      <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                        {active ? <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
                      </View>
                    </PressableScale>
                  );
                })}
              </View>
              {state === "error" ? <Text variant="caption" color={colors.danger}>{t("reportsheet.couldn_t_send_try_again")}</Text> : null}
              <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
                <PressableScale onPress={onClose} style={{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 14, alignItems: "center" }}>
                  <Text variant="bodyStrong" color={colors.text}>{t("common.discard")}</Text>
                </PressableScale>
                <PressableScale onPress={submit} disabled={!reason || state === "sending"} accessibilityState={{ disabled: !reason }} style={[{ flex: 1, borderRadius: radii.lg, backgroundColor: reason ? colors.primary : colors.surface2, paddingVertical: 14, alignItems: "center" }, reason ? softShadow(colors.primary, 8) : {}]}>
                  <Text variant="bodyStrong" color={reason ? "#fff" : colors.textFaint}>{state === "sending" ? "..." : t("common.send")}</Text>
                </PressableScale>
              </View>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
