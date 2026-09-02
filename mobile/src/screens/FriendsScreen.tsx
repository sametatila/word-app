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
import { SettingsIcon, ShareIcon, HandshakeIcon, UserPlusIcon, InboxIcon, ChevronRightIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { Chip, EmptyCard, ErrorText, HeaderButton, Pill, ScreenHeader, StatPill } from "../social/common";
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

/**
 * Sosyal merkez — Profil ekranıyla aynı kurgu: başlık, ortalanmış kimlik kartı
 * (arma + ad + pill rozetler), Premium-blok tarzı davet CTA'sı, Ayarlar çipleriyle
 * sekmeler, altında kartlar. Misafir için giriş daveti.
 */
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
    try { await Share.share({ message: `Nomi'de Almanca çalışıyorum. Arkadaş ol, birlikte hedef tutturalım: ${API_BASE}/u/${me.username}` }); } catch { /* kapatıldı */ }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title="Arkadaşlar" />
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          <EmptyCard icon={HandshakeIcon} tint={colors.success} title="Arkadaşlar için giriş yap" text="Arkadaş ekle, akışta tepki ver, birlikte haftalık hedef tuttur. Hesabın cihazlar arasında ortak." action="Giriş yap" onAction={() => nav.navigate("Auth")} />
        </View>
      </View>
    );
  }

  const incoming = data?.incoming.length ?? me?.counts.incoming ?? 0;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Arkadaşlar" right={<HeaderButton icon={SettingsIcon} label="Sosyal ayarlar" onPress={() => nav.navigate("SocialSettings")} />} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {me ? (
          <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
            <View style={softShadow(colors.primary, 10)}><PersonAvatar userId={me.userId} name={me.name} size={76} /></View>
            <Text variant="h2" style={{ marginTop: spacing.md }}>{me.name ?? "İsimsiz öğrenci"}</Text>
            <Text variant="caption" color={colors.textMuted}>@{me.username}</Text>
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
              <StatPill icon={HandshakeIcon} label={`${me.counts.friends} arkadaş`} tint={colors.success} soft={colors.successSoft} />
              {incoming > 0 ? <StatPill icon={UserPlusIcon} label={`${incoming} istek`} tint={colors.streak} /> : null}
              {me.counts.unread > 0 ? <StatPill icon={InboxIcon} label={`${me.counts.unread} yeni`} tint={colors.primary} soft={colors.primarySoft} /> : null}
            </View>
          </Card>
        ) : <Skeleton height={190} radius={26} style={{ marginTop: spacing.sm, marginBottom: spacing.lg }} />}

        <PressableScale onPress={() => void share()} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
          <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
            <ShareIcon color="#fff" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h3" color="#fff">Arkadaşını davet et</Text>
            <Text variant="caption" color="#ffffffcc">Profil bağlantını gönder, aynı hafta birlikte çalışın</Text>
          </View>
          <ChevronRightIcon color="#fff" size={22} />
        </PressableScale>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.lg }}>
          {TABS.map((t) => <Chip key={t.key} label={t.label} active={tab === t.key} onPress={() => setTab(t.key)} badge={t.key === "requests" ? incoming : undefined} />)}
        </ScrollView>

        {tab === "friends" ? (
          data === null ? <View style={{ gap: spacing.md }}><Skeleton height={150} radius={26} /><Skeleton height={150} radius={26} /></View> : (
            <View>
              {data.friends.length ? (
                <FriendRows friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
              ) : (
                <EmptyCard icon={UserPlusIcon} tint={colors.success} title="Henüz arkadaşın yok" text="Kullanıcı adıyla ara ya da davet bağlantını gönder. Arkadaşlar birbirinin serisini görür, tepki verir, birlikte görev yapar." action="Arkadaş bul" onAction={() => setTab("find")} />
              )}
              <FriendsBoard />
            </View>
          )
        ) : null}
        {tab === "feed" ? <FeedList onFindFriends={() => setTab("find")} /> : null}
        {tab === "quests" ? (data === null || !me ? <Skeleton height={150} radius={26} /> : <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} />) : null}
        {tab === "requests" ? (data === null ? <Skeleton height={120} radius={26} /> : <Requests incoming={data.incoming} outgoing={data.outgoing} onChanged={() => void reload()} />) : null}
        {tab === "find" ? <Find onChanged={() => void reload()} /> : null}
        <ErrorText text={err} />
        {err ? <View style={{ marginTop: spacing.md, alignItems: "center" }}><Pill label="Tekrar dene" tone="ghost" onPress={() => void reload()} /></View> : null}
      </ScrollView>
    </View>
  );
}
