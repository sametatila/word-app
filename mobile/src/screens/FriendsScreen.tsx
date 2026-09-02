import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, type FriendsView, type SocialMe } from "../api/social";
import { API_BASE } from "../api/client";
import { useAuth } from "../lib/AuthContext";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { SettingsIcon, ShareIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { EmptyCard, ErrorText, PrimaryButton, ScreenHeader } from "../social/common";
import { FriendRows } from "../social/FriendRows";
import { FriendsBoard } from "../social/FriendsBoard";
import { FeedList } from "../social/FeedList";
import { Quests } from "../social/Quests";
import { Requests } from "../social/Requests";
import { Find } from "../social/Find";

type Tab = "friends" | "feed" | "quests" | "requests" | "find";
const TABS: { key: Tab; label: string }[] = [
  { key: "friends", label: "Arkadaşlar" },
  { key: "feed", label: "Akış" },
  { key: "quests", label: "Görevler" },
  { key: "requests", label: "İstekler" },
  { key: "find", label: "Bul" },
];

/** Sosyal merkez — web'deki /friends ile aynı beş sekme. Misafir için giriş daveti. */
export function FriendsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "Friends">>();
  const { user } = useAuth();
  const initial = (route.params?.tab as Tab | undefined) ?? "friends";
  const [tab, setTab] = useState<Tab>(TABS.some((t) => t.key === initial) ? initial : "friends");
  const [me, setMe] = useState<SocialMe | null>(null);
  const [data, setData] = useState<FriendsView | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const reload = useCallback(async () => {
    if (!user) return;
    try {
      const [m, d] = await Promise.all([social.me(), social.friends()]);
      setMe(m);
      setData(d);
      setErr(null);
    } catch (e) {
      setErr(errorText(e));
      setData((prev) => prev ?? { friends: [], incoming: [], outgoing: [], nudgedToday: [], today: "" });
    }
  }, [user]);
  useEffect(() => { void reload(); }, [reload]);

  async function share() {
    if (!me) return;
    track("share", 0, "profile");
    try {
      await Share.share({ message: `Nomi'de Almanca çalışıyorum. Arkadaş ol, birlikte hedef tutturalım: ${API_BASE}/u/${me.username}` });
    } catch { /* paylaşım kapatıldı */ }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Arkadaşlar" />
        <View style={{ paddingHorizontal: spacing.lg }}>
          <EmptyCard title="Arkadaşlar için giriş yap" text="Arkadaş ekle, akışta tepki ver, birlikte haftalık hedef tuttur. Hesabın cihazlar arasında ortak." action="Giriş yap" onAction={() => nav.navigate("Auth")} />
        </View>
      </View>
    );
  }

  const incoming = data?.incoming.length ?? me?.counts.incoming ?? 0;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader
        title="Arkadaşlar"
        subtitle={me ? `@${me.username} · ${me.counts.friends} arkadaş` : undefined}
        right={
          <PressableScale onPress={() => nav.navigate("SocialSettings")} accessibilityLabel="Sosyal ayarlar" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <SettingsIcon color={colors.text} size={20} />
          </PressableScale>
        }
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {me ? (
          <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
            <PersonAvatar userId={me.userId} name={me.name} size={44} />
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" numberOfLines={1}>{me.name ?? "İsimsiz öğrenci"}</Text>
              <Text variant="micro" color={colors.textMuted}>Profil bağlantın: /u/{me.username}</Text>
            </View>
            <PressableScale onPress={() => void share()} style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primary, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 8 }}>
              <ShareIcon color={colors.onPrimary} size={15} />
              <Text variant="caption" color={colors.onPrimary} style={{ fontWeight: "700" }}>Davet et</Text>
            </PressableScale>
          </Card>
        ) : <Skeleton height={68} style={{ marginBottom: spacing.md }} />}

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingBottom: spacing.md }}>
          {TABS.map((t) => {
            const active = tab === t.key;
            return (
              <PressableScale key={t.key} onPress={() => setTab(t.key)} style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: active ? colors.primary : colors.surface2 }}>
                <Text variant="caption" color={active ? colors.onPrimary : colors.text} style={{ fontWeight: "700" }}>{t.label}</Text>
                {t.key === "requests" && incoming > 0 ? (
                  <View style={{ minWidth: 18, height: 18, borderRadius: 9, backgroundColor: colors.streak, alignItems: "center", justifyContent: "center", paddingHorizontal: 4 }}>
                    <Text variant="micro" color="#fff" style={{ fontWeight: "800", fontSize: 10, lineHeight: 12 }}>{incoming}</Text>
                  </View>
                ) : null}
              </PressableScale>
            );
          })}
        </ScrollView>

        <ErrorText text={err} />
        {tab === "friends" ? (
          data === null ? <View style={{ gap: spacing.sm }}><Skeleton height={72} /><Skeleton height={72} /></View> : (
            <View style={{ gap: spacing.lg }}>
              {data.friends.length ? (
                <FriendRows friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
              ) : (
                <EmptyCard title="Henüz arkadaşın yok" text="Kullanıcı adıyla ara ya da davet bağlantını gönder. Arkadaşlar birbirinin serisini görür, tepki verir, birlikte görev yapar." action="Arkadaş bul" onAction={() => setTab("find")} />
              )}
              <FriendsBoard />
            </View>
          )
        ) : null}
        {tab === "feed" ? <FeedList onFindFriends={() => setTab("find")} /> : null}
        {tab === "quests" ? (data === null || !me ? <Skeleton height={110} /> : <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} />) : null}
        {tab === "requests" ? (data === null ? <Skeleton height={72} /> : <Requests incoming={data.incoming} outgoing={data.outgoing} onChanged={() => void reload()} />) : null}
        {tab === "find" ? <Find onChanged={() => void reload()} /> : null}
        {err ? <View style={{ marginTop: spacing.md }}><PrimaryButton label="Tekrar dene" tone="ghost" onPress={() => void reload()} /></View> : null}
      </ScrollView>
    </View>
  );
}
