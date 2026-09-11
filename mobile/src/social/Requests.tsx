import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { View } from "react-native";
import { social, errorText, timeAgo, type PendingView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Avatar } from "../ui/Avatar";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { useTheme, spacing } from "../theme";
import { ErrorText, Pill, SectionTitle } from "./common";

/**
 * Bekleyen istekler. `side` verilmezse iki yön de çizilir.
 *
 * Kendi sekmesi VARDI ve o sekme haftanın neredeyse tamamında boştu: istek
 * gelmesi istisna, sekme ise kalıcı. Artık gelen istekler arkadaş listesinin
 * başında, gönderilenler "Bul" ekranının altında — her biri ait olduğu işin
 * yanında. Boşken hiçbir şey çizilmiyor.
 */
export function Requests({ incoming, outgoing, onChanged, side }: { incoming: PendingView[]; outgoing: PendingView[]; onChanged: () => void; side?: "incoming" | "outgoing" }) {
  const showIn = side !== "outgoing" && incoming.length > 0;
  const showOut = side !== "incoming" && outgoing.length > 0;
  if (!showIn && !showOut) return null;
  return (
    <View>
      {showIn ? (<><SectionTitle title={t("requests.incoming")} right={`${incoming.length}`} />{incoming.map((r) => <RequestCard key={r.friendshipId} r={r} incoming onChanged={onChanged} />)}</>) : null}
      {showOut ? (<><SectionTitle title={t("requests.sent")} right={`${outgoing.length}`} />{outgoing.map((r) => <RequestCard key={r.friendshipId} r={r} incoming={false} onChanged={onChanged} />)}</>) : null}
    </View>
  );
}

/** RequestCard iskeleti — kimlik satırı + düğme şeridi. */
export function RequestCardSkeleton() {
  return (
    <SkeletonCard style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <SkeletonTile size={48} radius={24} />
        <View style={{ flex: 1 }}>
          <SkeletonLine variant="h3" width="55%" />
          <SkeletonLine variant="caption" width="70%" />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
        <SkeletonPill width="100%" height={40} style={{ flex: 1 }} />
        <SkeletonPill width={96} height={40} />
      </View>
    </SkeletonCard>
  );
}

function RequestCard({ r, incoming, onChanged }: { r: PendingView; incoming: boolean; onChanged: () => void }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
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
        {/*
          PROFİLE GİDEN YOL YOKTU. İstek kartından kişinin profiline
          bakılamıyordu: kullanıcı kimi kabul ettiğini görmeden karar
          veriyordu. Web satırı baştan beri açıyor. Yol AVATAR — akış kartının
          kuralı (`FeedList`) ve iki uygulamada da aynı.
        */}
        {r.user.username ? (
          <PressableScale hitSlop={4} accessibilityLabel={r.user.name ?? t("social.unnamed")} onPress={() => nav.navigate("User", { username: r.user.username! })}>
            <Avatar userId={r.user.userId} name={r.user.name} avatar={r.user.avatar} size={48} />
          </PressableScale>
        ) : (
          <Avatar userId={r.user.userId} name={r.user.name} avatar={r.user.avatar} size={48} />
        )}
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{r.user.name ?? t("social.unnamed")}</Text>
          <Text variant="caption" color={colors.textMuted}>{r.user.username ? `@${r.user.username} · ` : ""}{r.user.level} · {timeAgo(r.createdAt)}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
        {incoming ? (
          <>
            <View style={{ flex: 1 }}><Pill label={t("requests.accept")} block disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "accept"))} /></View>
            <Pill label={t("requests.decline")} tone="ghost" disabled={busy} onPress={() => void act(() => social.respond(r.friendshipId, "decline"))} />
          </>
        ) : (
          <Pill label={t("requests.cancel_request")} tone="ghost" block disabled={busy} onPress={() => void act(() => social.remove(r.user.userId))} />
        )}
      </View>
      <ErrorText text={err} />
    </Card>
  );
}
