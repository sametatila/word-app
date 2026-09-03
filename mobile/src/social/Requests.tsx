import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { social, errorText, timeAgo, type PendingView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { UserPlusIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, Pill, SectionTitle } from "./common";

export function Requests({ incoming, outgoing, onChanged }: { incoming: PendingView[]; outgoing: PendingView[]; onChanged: () => void }) {
  const { colors } = useTheme();
  if (!incoming.length && !outgoing.length) return <EmptyCard icon={UserPlusIcon} tint={colors.info} title={t("requests.bekleyen_istek_yok")} text="Gelen istekler burada birikir; gönderdiklerini de buradan iptal edersin." />;
  return (
    <View>
      {incoming.length ? (<><SectionTitle title={t("requests.gelen")} right={`${incoming.length}`} />{incoming.map((r) => <RequestCard key={r.friendshipId} r={r} incoming onChanged={onChanged} />)}</>) : null}
      {outgoing.length ? (<><SectionTitle title={t("requests.gonderilen")} right={`${outgoing.length}`} />{outgoing.map((r) => <RequestCard key={r.friendshipId} r={r} incoming={false} onChanged={onChanged} />)}</>) : null}
    </View>
  );
}

function RequestCard({ r, incoming, onChanged }: { r: PendingView; incoming: boolean; onChanged: () => void }) {
  const { colors } = useTheme();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try { await fn(); onChanged(); } catch (e) { setErr(errorText(e)); setBusy(false); }
  }
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <PersonAvatar userId={r.user.userId} name={r.user.name} size={48} />
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{r.user.name ?? "İsimsiz öğrenci"}</Text>
          <Text variant="caption" color={colors.textMuted}>{r.user.username ? `@${r.user.username} · ` : ""}{r.user.level} · {timeAgo(r.createdAt)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
        {incoming ? (
          <>
            <View style={{ flex: 1 }}><Pill label={t("requests.kabul_et")} block disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "accept"))} /></View>
            <Pill label={t("requests.reddet")} tone="ghost" disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "decline"))} />
          </>
        ) : (
          <Pill label={t("requests.istegi_iptal_et")} tone="ghost" block disabled={busy} onPress={() => void act(() => social.remove(r.user.userId))} />
        )}
      </View>
      <ErrorText text={err} />
    </Card>
  );
}
