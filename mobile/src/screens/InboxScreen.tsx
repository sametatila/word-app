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
import { UserPlusIcon, HandshakeIcon, BellIcon, TargetIcon, CheckIcon, FlameIcon, InboxIcon, LockIcon, ChevronRightIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import type { Palette } from "../theme/colors";
import { EmptyCard, ErrorText, IconTile, Pill, ReactionGlyph, ScreenHeader, reactionTone, type IconCmp } from "../social/common";
import { setUnreadGlobal } from "../social/useUnread";

/** Bildirim türü → ikon karosu rengi (Profil menüsündeki satır karoları gibi). */
function tileFor(n: NotificationView, colors: Palette): { icon: IconCmp; tint: string } {
  switch (n.type) {
    case "friend_request": return { icon: UserPlusIcon, tint: colors.info };
    case "friend_accepted": return { icon: HandshakeIcon, tint: colors.success };
    case "nudge": return { icon: BellIcon, tint: colors.streak };
    case "quest_invite": case "quest_accepted": return { icon: TargetIcon, tint: colors.primary };
    case "quest_completed": return { icon: CheckIcon, tint: colors.success };
    case "friend_milestone": return { icon: FlameIcon, tint: colors.streak };
    default: return { icon: InboxIcon, tint: colors.primary };
  }
}

/** Gelen kutusu — tek kart, hairline satırlar (Profil menüsü kurgusu): arma, ikon karosu, metin, okunmamış nokta. */
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

  const body = !user
    ? <EmptyCard icon={LockIcon} title="Giriş gerekli" text="Bildirimler hesabına bağlı." action="Giriş yap" onAction={() => nav.navigate("Auth")} />
    : items === null
      ? <Skeleton height={260} radius={26} />
      : !items.length
        ? <EmptyCard icon={InboxIcon} title="Bildirim yok" text="Arkadaşlık istekleri, tepkiler, dürtmeler ve görev haberleri burada toplanır." />
        : (
          <View>
            <Card padded style={{ paddingVertical: 0 }}>
              {items.map((n, i) => {
                const { icon, tint } = tileFor(n, colors);
                const reaction = n.type === "reaction" && typeof n.detail.reaction === "string" ? (n.detail.reaction as ReactionKind) : null;
                return (
                  <PressableScale key={n.id} onPress={() => open(n)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: i === items.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
                    {n.actor ? <PersonAvatar userId={n.actor.userId} name={n.actor.name} size={40} /> : <IconTile icon={icon} tint={tint} size={40} />}
                    <View style={{ flex: 1 }}>
                      <Text variant={n.read ? "body" : "bodyStrong"} style={{ lineHeight: 20 }}>{notificationText(n)}</Text>
                      <Text variant="micro" color={colors.textFaint} style={{ marginTop: 2 }}>{timeAgo(n.createdAt)}</Text>
                    </View>
                    {reaction ? (
                      <View style={{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: reactionTone(reaction, colors) + "22" }}>
                        <ReactionGlyph kind={reaction} size={18} colors={colors} />
                      </View>
                    ) : n.actor ? (
                      <View style={{ width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>{React.createElement(icon, { color: tint, size: 18 })}</View>
                    ) : <ChevronRightIcon color={colors.textFaint} size={20} />}
                    {!n.read ? <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} /> : null}
                  </PressableScale>
                );
              })}
            </Card>
            {cursor ? <View style={{ marginTop: spacing.lg, alignItems: "center" }}><Pill label={busy ? "Yükleniyor" : "Daha eski"} tone="ghost" disabled={busy} onPress={() => void load(cursor)} /></View> : null}
          </View>
        );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Gelen kutusu" subtitle="İstekler, tepkiler, dürtmeler, görevler" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {body}
        <ErrorText text={err} />
      </ScrollView>
    </View>
  );
}
