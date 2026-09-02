import React, { useState } from "react";
import { Alert, View } from "react-native";
import { social, errorText, type Relation } from "../api/social";
import { Text } from "../ui/Text";
import { UserPlusIcon, CheckIcon } from "../ui/icons";
import { useTheme } from "../theme";
import { ErrorText, Pill } from "./common";

/** İlişkiye göre tek pill: Ekle · İstek gönderildi · Kabul et · Arkadaş (çıkar). */
export function UserActionButton({ userId, relation, friendshipId, canRequest = true, onChange, small = true }: { userId: string; relation: Relation; friendshipId?: number | null; canRequest?: boolean; onChange?: (r: Relation) => void; small?: boolean }) {
  const { colors } = useTheme();
  const [state, setState] = useState<Relation>(relation);
  const [fid, setFid] = useState<number | null>(friendshipId ?? null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run(fn: () => Promise<Relation>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try { const next = await fn(); setState(next); onChange?.(next); } catch (e) { setErr(errorText(e)); } finally { setBusy(false); }
  }
  if (state === "self") return null;
  if (state === "blocked") return <Text variant="caption" color={colors.textMuted}>Engelli</Text>;
  if (state === "declined") return <Text variant="caption" color={colors.textMuted}>Bir hafta sonra</Text>;

  let btn: React.ReactNode;
  if (state === "friends") {
    btn = <Pill label="Arkadaş" tone="soft" icon={CheckIcon} small={small} disabled={busy} onPress={() => Alert.alert("Arkadaşlıktan çıkar", "Bildirim gitmez.", [{ text: "Vazgeç", style: "cancel" }, { text: "Çıkar", style: "destructive", onPress: () => void run(async () => { await social.remove(userId); return "none"; }) }])} />;
  } else if (state === "outgoing") {
    btn = <Pill label="İstek gönderildi" tone="ghost" small={small} disabled={busy} onPress={() => void run(async () => { await social.remove(userId); return "none"; })} />;
  } else if (state === "incoming") {
    btn = <Pill label="Kabul et" small={small} disabled={busy} onPress={() => void run(async () => { if (fid) await social.respond(fid, "accept"); else await social.request(userId); return "friends"; })} />;
  } else {
    btn = <Pill label="Ekle" icon={UserPlusIcon} small={small} disabled={busy || !canRequest} onPress={() => void run(async () => { const r = await social.request(userId); setFid(r.friendshipId); return r.state; })} />;
  }
  return <View style={{ alignItems: "flex-end" }}>{btn}<ErrorText text={err} /></View>;
}
