import React, { useCallback, useEffect, useState } from "react";
import { t as tx, currentLang } from "../lib/i18n";
import { courseOrDefault, currentCourseId } from "../lib/courses";
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
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { SettingsIcon, ShareIcon, HandshakeIcon, UserPlusIcon, InboxIcon, ChevronRightIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { Chip, EmptyCard, ErrorText, HeaderButton, Pill, ScreenHeader, StatPill } from "../social/common";
import { FriendRows, FriendCardSkeleton } from "../social/FriendRows";
import { FriendsBoard } from "../social/FriendsBoard";
import { FeedList } from "../social/FeedList";
import { Quests, QuestsSkeleton } from "../social/Quests";
import { Requests, RequestCardSkeleton } from "../social/Requests";
import { Find } from "../social/Find";

type Tab = "friends" | "feed" | "quests" | "requests" | "find";
/** Sekme etiketleri — t() çağrı anında (dil modül yüklenirken hazır değil). */
const TAB_KEYS: { key: Tab; label: string }[] = [
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
  { key: "quests", label: "friends.tab_quests" },
  { key: "requests", label: "friends.tab_requests" },
  { key: "find", label: "friends.tab_find" },
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
  const [tab, setTab] = useState<Tab>(TAB_KEYS.some((tab) => tab.key === initial) ? initial : "friends");
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
    try { await Share.share({ message: tx("friends.share_text", { dil: courseOrDefault(currentCourseId()).label[currentLang()], link: `${API_BASE}/u/${me.username}` }) }); } catch { /* kapatıldı */ }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <ScreenHeader title={tx("friends.arkadaslar")} />
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
          <EmptyCard icon={HandshakeIcon} tint={colors.success} title={tx("friends.arkadaslar_icin_giris_yap")} text={tx("friends.arkadas_ekle_akista_tepki_ver_birlikte")} action={tx("friends.giris_yap")} onAction={() => nav.navigate("Auth")} />
        </View>
      </View>
    );
  }

  const incoming = data?.incoming.length ?? me?.counts.incoming ?? 0;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={tx("friends.arkadaslar")} right={<HeaderButton icon={SettingsIcon} label={tx("friends.sosyal_ayarlar")} onPress={() => nav.navigate("SocialSettings")} />} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {me ? (
          <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
            <View style={softShadow(colors.primary, 10)}><PersonAvatar userId={me.userId} name={me.name} size={76} /></View>
            <Text variant="h2" style={{ marginTop: spacing.md }}>{me.name ?? tx("social.unnamed")}</Text>
            <Text variant="caption" color={colors.textMuted}>@{me.username}</Text>
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
              <StatPill icon={HandshakeIcon} label={tx("friends.count_friends", { n: me.counts.friends })} tint={colors.success} soft={colors.successSoft} />
              {incoming > 0 ? <StatPill icon={UserPlusIcon} label={tx("friends.count_requests", { n: incoming })} tint={colors.streak} /> : null}
              {me.counts.unread > 0 ? <StatPill icon={InboxIcon} label={tx("friends.count_new", { n: me.counts.unread })} tint={colors.primary} soft={colors.primarySoft} /> : null}
            </View>
          </Card>
        ) : (
          // Kimlik kartı iskeleti: arma + ad + kullanıcı adı + rozet şeridi.
          <SkeletonCard style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
            <SkeletonTile size={76} radius={38} />
            <SkeletonLine variant="h2" width={168} style={{ marginTop: spacing.md }} />
            <SkeletonLine variant="caption" width={104} />
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
              <SkeletonPill width={104} height={25} />
              <SkeletonPill width={82} height={25} />
            </View>
          </SkeletonCard>
        )}

        <PressableScale onPress={() => void share()} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
          <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
            <ShareIcon color="#fff" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h3" color="#fff">{tx("friends.arkadasini_davet_et")}</Text>
            <Text variant="caption" color="#ffffffcc">{tx("friends.profil_baglantini_gonder_ayni_hafta_birlikte")}</Text>
          </View>
          <ChevronRightIcon color="#fff" size={22} />
        </PressableScale>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.lg }}>
          {TAB_KEYS.map((it) => <Chip key={it.key} label={tx(it.label)} active={tab === it.key} onPress={() => setTab(it.key)} badge={it.key === "requests" ? incoming : undefined} />)}
        </ScrollView>

        {tab === "friends" ? (
          data === null ? <View>{[0, 1].map((i) => <FriendCardSkeleton key={i} />)}</View> : (
            <View>
              {data.friends.length ? (
                <FriendRows friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
              ) : (
                <EmptyCard icon={UserPlusIcon} tint={colors.success} title={tx("friends.henuz_arkadasin_yok")} text={tx("friends.kullanici_adiyla_ara_ya_da_davet")} action={tx("friends.arkadas_bul")} onAction={() => setTab("find")} />
              )}
              <FriendsBoard />
            </View>
          )
        ) : null}
        {tab === "feed" ? <FeedList onFindFriends={() => setTab("find")} /> : null}
        {tab === "quests" ? (data === null || !me ? <QuestsSkeleton /> : <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} />) : null}
        {tab === "requests" ? (data === null ? <View>{[0, 1].map((i) => <RequestCardSkeleton key={i} />)}</View> : <Requests incoming={data.incoming} outgoing={data.outgoing} onChanged={() => void reload()} />) : null}
        {tab === "find" ? <Find onChanged={() => void reload()} /> : null}
        <ErrorText text={err} />
        {err ? <View style={{ marginTop: spacing.md, alignItems: "center" }}><Pill label={tx("friends.tekrar_dene")} tone="ghost" onPress={() => void reload()} /></View> : null}
      </ScrollView>
    </View>
  );
}
