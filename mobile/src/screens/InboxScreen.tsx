import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, notificationText, timeAgo, type NotificationView, type ReactionKind } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, PrimaryButton, ReactionGlyph, ScreenHeader } from "../social/common";
import { setUnreadGlobal } from "../social/useUnread";

/** Gelen kutusu — açılınca hepsi okundu; satır ilgili ekrana götürür. */
export function InboxScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const [items, setItems] = useState<NotificationView[] | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function load(after: number | null) {
    setBusy(true);
    try {
      const page = await social.notifications(after);
      setItems((prev) => (after && prev ? [...prev, ...page.items] : page.items));
      setCursor(page.nextCursor);
      if (!after && page.unread > 0) { await social.markRead("all"); setUnreadGlobal(0); }
    } catch (e) { setErr(errorText(e)); setItems((prev) => prev ?? []); } finally { setBusy(false); }
  }
  useEffect(() => { if (user) void load(null); }, [user]);

  function open(n: NotificationView) {
    switch (n.type) {
      case "friend_request": nav.navigate("Friends", { tab: "requests" }); break;
      case "friend_accepted": if (n.actor?.username) nav.navigate("User", { username: n.actor.username }); else nav.navigate("Friends", undefined); break;
      case "quest_invite": case "quest_accepted": case "quest_completed": nav.navigate("Friends", { tab: "quests" }); break;
      case "nudge": nav.navigate("Tabs"); break;
      default: nav.navigate("Friends", { tab: "feed" });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Gelen kutusu" subtitle="İstekler, tepkiler, dürtmeler, görevler" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {!user ? <EmptyCard title="Giriş gerekli" text="Bildirimler hesabına bağlı." action="Giriş yap" onAction={() => nav.navigate("Auth")} /> :
          items === null ? <View style={{ gap: spacing.sm }}><Skeleton height={64} /><Skeleton height={64} /><Skeleton height={64} /></View> :
          !items.length ? <EmptyCard title="Bildirim yok" text="Arkadaşlık istekleri, tepkiler, dürtmeler ve görev haberleri burada toplanır." /> : (
            <View>
              <Card padded={false}>
                {items.map((n, i) => (
                  <PressableScale key={n.id} onPress={() => open(n)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md, borderBottomWidth: i === items.length - 1 ? 0 : 1, borderBottomColor: colors.hairline, backgroundColor: n.read ? "transparent" : colors.primarySoft }}>
                    {n.actor ? <PersonAvatar userId={n.actor.userId} name={n.actor.name} size={38} /> : <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: colors.surface2 }} />}
                    <View style={{ flex: 1 }}>
                      <Text variant="body" style={{ lineHeight: 19 }}>{notificationText(n)}</Text>
                      <Text variant="micro" color={colors.textFaint}>{timeAgo(n.createdAt)}</Text>
                    </View>
                    {n.type === "reaction" && typeof n.detail.reaction === "string" ? <ReactionGlyph kind={n.detail.reaction as ReactionKind} size={18} colors={colors} /> : null}
                  </PressableScale>
                ))}
              </Card>
              {cursor ? <View style={{ marginTop: spacing.md }}><PrimaryButton label={busy ? "Yükleniyor" : "Daha eski"} tone="ghost" disabled={busy} onPress={() => void load(cursor)} /></View> : null}
            </View>
          )}
        <ErrorText text={err} />
      </ScrollView>
    </View>
  );
}
