import React, { useCallback, useEffect, useState } from "react";
import { t } from "../lib/i18n";
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
import { FlameIcon, TrophyIcon, HandshakeIcon, TargetIcon, PodiumIcon, SparkIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import type { Palette } from "../theme/colors";
import { EmptyCard, ErrorText, IconTile, Pill, type IconCmp } from "./common";
import { ReactionBar } from "./ReactionBar";

/** Olay türü → ikon karosu (Başarımlar/Görevler ile aynı görsel çapa). */
function eventTile(type: string, colors: Palette): { icon: IconCmp; tint: string } {
  switch (type) {
    case "streak_milestone": return { icon: FlameIcon, tint: colors.streak };
    case "achievement": return { icon: TrophyIcon, tint: colors.accent };
    case "friend_joined": return { icon: HandshakeIcon, tint: colors.success };
    case "quest_completed": return { icon: TargetIcon, tint: colors.primary };
    case "weekly_top": return { icon: PodiumIcon, tint: colors.info };
    default: return { icon: SparkIcon, tint: colors.primary };
  }
}

export function FeedCard({ item }: { item: FeedItem }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { icon, tint } = eventTile(item.type, colors);
  const open = () => { if (item.user.username && !item.isMine) nav.navigate("User", { username: item.user.username }); };
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <PressableScale onPress={open}><PersonAvatar userId={item.user.userId} name={item.user.name} size={44} /></PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{item.isMine ? "Sen" : item.user.name ?? "İsimsiz öğrenci"}</Text>
          <Text variant="caption" color={colors.textMuted}>{timeAgo(item.createdAt)}</Text>
        </View>
        <IconTile icon={icon} tint={tint} size={40} />
      </View>
      <Text variant="body" style={{ marginTop: spacing.md, lineHeight: 21 }}>{feedText(item)}</Text>
      <ReactionBar eventId={item.id} summary={item.reactions} disabled={item.isMine} />
    </Card>
  );
}

export function FeedList({ onFindFriends }: { onFindFriends?: () => void }) {
  const { colors } = useTheme();
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
    } catch (e) { setErr(errorText(e)); setItems((prev) => prev ?? []); } finally { setBusy(false); }
  }, []);
  useEffect(() => { void load(null); }, [load]);

  if (items === null) return <View style={{ gap: spacing.md }}><Skeleton height={140} radius={26} /><Skeleton height={140} radius={26} /></View>;
  if (!items.length) return <EmptyCard icon={SparkIcon} tint={colors.primary} title={t("feedlist.akis_henuz_bos")} text="Arkadaşlarının seri, rozet ve görev haberleri burada görünür; sen de tepki verirsin." action={onFindFriends ? "Arkadaş bul" : undefined} onAction={onFindFriends} />;
  return (
    <View>
      {items.map((it) => <FeedCard key={it.id} item={it} />)}
      {cursor ? <Pill label={busy ? "Yükleniyor" : "Daha eski"} tone="ghost" block disabled={busy} onPress={() => void load(cursor)} /> : null}
      <ErrorText text={err} />
    </View>
  );
}
