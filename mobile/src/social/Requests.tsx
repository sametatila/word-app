import React, { useState } from "react";
import { View } from "react-native";
import { social, errorText, timeAgo, type PendingView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, PersonRow, PrimaryButton } from "./common";

export function Requests({ incoming, outgoing, onChanged }: { incoming: PendingView[]; outgoing: PendingView[]; onChanged: () => void }) {
  const { colors } = useTheme();
  if (!incoming.length && !outgoing.length) return <EmptyCard title="Bekleyen istek yok" text="Gelen istekler burada birikir; gönderdiklerini de buradan iptal edersin." />;
  return (
    <View style={{ gap: spacing.lg }}>
      {incoming.length ? (
        <View>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, fontWeight: "700" }}>GELEN</Text>
          <Card padded={false}>{incoming.map((r, i) => <Row key={r.friendshipId} r={r} incoming onChanged={onChanged} last={i === incoming.length - 1} />)}</Card>
        </View>
      ) : null}
      {outgoing.length ? (
        <View>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, fontWeight: "700" }}>GÖNDERİLEN</Text>
          <Card padded={false}>{outgoing.map((r, i) => <Row key={r.friendshipId} r={r} incoming={false} onChanged={onChanged} last={i === outgoing.length - 1} />)}</Card>
        </View>
      ) : null}
    </View>
  );
}

function Row({ r, incoming, onChanged, last }: { r: PendingView; incoming: boolean; onChanged: () => void; last: boolean }) {
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
    <PersonRow
      colors={colors}
      last={last}
      avatar={<PersonAvatar userId={r.user.userId} name={r.user.name} size={42} />}
      title={<Text variant="bodyStrong" numberOfLines={1}>{r.user.name ?? "İsimsiz öğrenci"} <Text variant="micro" color={colors.textMuted}>{r.user.username ? `@${r.user.username}` : ""}</Text></Text>}
      subtitle={<Text variant="micro" color={colors.textMuted}>{r.user.level} · {timeAgo(r.createdAt)}</Text>}
      note={<ErrorText text={err} />}
      right={
        incoming ? (
          <View style={{ gap: 6 }}>
            <PrimaryButton label="Kabul et" small disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "accept"))} />
            <PrimaryButton label="Reddet" small tone="ghost" disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "decline"))} />
          </View>
        ) : (
          <PrimaryButton label="İptal" small tone="ghost" disabled={busy} onPress={() => void act(() => social.remove(r.user.userId))} />
        )
      }
    />
  );
}
