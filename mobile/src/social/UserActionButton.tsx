import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { social, errorText, type Relation } from "../api/social";
import { Text } from "../ui/Text";
import { AddFriendIcon, CorrectIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import { ErrorText, Pill } from "./common";
import { ConfirmDialog } from "../ui/ConfirmDialog";

/** İlişkiye göre tek pill: Ekle · İstek gönderildi · Kabul et · Arkadaş (çıkar). */
export function UserActionButton({ userId, relation, friendshipId, canRequest = true, onChange, small = true }: { userId: string; relation: Relation; friendshipId?: number | null; canRequest?: boolean; onChange?: (r: Relation) => void; small?: boolean }) {
  const { colors } = useTheme();
  const [state, setState] = useState<Relation>(relation);
  const [fid, setFid] = useState<number | null>(friendshipId ?? null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirmRemove, setConfirmRemove] = useState(false);

  async function run(fn: () => Promise<Relation>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try { const next = await fn(); setState(next); onChange?.(next); } catch (e) { setErr(errorText(e)); } finally { setBusy(false); }
  }
  if (state === "self") return null;
  if (state === "blocked") return <Text variant="caption" color={colors.textMuted}>{t("useractionbutton.blocked")}</Text>;
  if (state === "declined") return <Text variant="caption" color={colors.textMuted}>{t("useractionbutton.in_week")}</Text>;

  let btn: React.ReactNode;
  if (state === "friends") {
    btn = <Pill label={t("useractionbutton.friends")} tone="soft" icon={CorrectIcon} small={small} disabled={busy} onPress={() => setConfirmRemove(true)} />;
  } else if (state === "outgoing") {
    btn = <Pill label={t("useractionbutton.request_sent")} tone="ghost" small={small} disabled={busy} onPress={() => void run(async () => { await social.remove(userId); return "none"; })} />;
  } else if (state === "incoming") {
    btn = <Pill label={t("useractionbutton.accept")} small={small} disabled={busy} onPress={() => void run(async () => { if (fid) await social.respond(fid, "accept"); else await social.request(userId); return "friends"; })} />;
  } else {
    btn = <Pill label={t("useractionbutton.add")} icon={AddFriendIcon} small={small} disabled={busy || !canRequest} onPress={() => void run(async () => { const r = await social.request(userId); setFid(r.friendshipId); return r.state; })} />;
  }
  /*
   * KAPALI DÜĞMENİN SEBEBİ YAZIYOR. Kişi istek kabul etmiyorsa pill sönük
   * duruyordu ve kullanıcı neden basamadığını hiç öğrenemiyordu - dokunup
   * hata almak bile mümkün değil, çünkü düğme kapalı. Web sebebi başlık
   * balonunda söylüyor (`title`); mobilde balon yok, satır olarak yazılıyor.
   */
  return (
    <View style={{ alignItems: "flex-end" }}>
      {btn}
      {!canRequest && state === "none" ? <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "right" }}>{t("social.err_requests_closed")}</Text> : null}
      <ErrorText text={err} />
      <ConfirmDialog
        visible={confirmRemove}
        title={t("social.unfriend")}
        message={t("useractionbutton.no_notice")}
        confirmLabel={t("social.remove")}
        cancelLabel={t("common.discard")}
        destructive
        onConfirm={() => { setConfirmRemove(false); void run(async () => { await social.remove(userId); return "none"; }); }}
        onCancel={() => setConfirmRemove(false)}
      />
    </View>
  );
}
