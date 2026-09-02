import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, feedText, timeAgo, type FeedItem } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, PrimaryButton } from "./common";
import { ReactionBar } from "./ReactionBar";

export function FeedCard({ item }: { item: FeedItem }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const open = () => { if (item.user.username) nav.navigate("User", { username: item.user.username }); };
  return (
    <Card padded style={{ marginBottom: spacing.sm }}>
      <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
        <PressableScale onPress={open}><PersonAvatar userId={item.user.userId} name={item.user.name} size={40} /></PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="body" style={{ lineHeight: 20 }}>
            <Text variant="bodyStrong">{item.isMine ? "Sen" : item.user.name ?? "İsimsiz öğrenci"}</Text> {feedText(item)}
          </Text>
          <Text variant="micro" color={colors.textFaint}>{timeAgo(item.createdAt)}</Text>
          <ReactionBar eventId={item.id} summary={item.reactions} disabled={item.isMine} />
        </View>
      </View>
    </Card>
  );
}

export function FeedList({ onFindFriends }: { onFindFriends?: () => void }) {
  const [items, setItems] = useState<FeedItem[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const load = useCallback(async (after: string | null) => {
    setBusy(true);
    try {
      const page = await social.feed(after);
      setItems((prev) => (after && prev ? [...prev, ...page.items] : page.items));
      setCursor(page.nextCursor);
      setErr(null);
    } catch (e) {
      setErr(errorText(e));
      setItems((prev) => prev ?? []);
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => { void load(null); }, [load]);

  if (items === null) return <View style={{ gap: spacing.sm }}><Skeleton height={84} /><Skeleton height={84} /><Skeleton height={84} /></View>;
  if (!items.length) return <EmptyCard title="Akış henüz boş" text="Arkadaşlarının seri, rozet ve görev haberleri burada görünür; sen de tepki verirsin." action={onFindFriends ? "Arkadaş bul" : undefined} onAction={onFindFriends} />;
  return (
    <View>
      {items.map((it) => <FeedCard key={it.id} item={it} />)}
      {cursor ? <PrimaryButton label={busy ? "Yükleniyor" : "Daha eski"} tone="ghost" disabled={busy} onPress={() => void load(cursor)} /> : null}
      <ErrorText text={err} />
    </View>
  );
}
