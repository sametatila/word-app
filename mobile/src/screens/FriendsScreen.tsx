import React, { useCallback, useEffect, useState } from "react";
import { t as tx, currentLang } from "../lib/i18n";
import { courseOrDefault, currentCourseId } from "../lib/courses";
import { ScrollView, Share, View } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import type { RootTabParams } from "../navigation/RootTabs";
import { social, errorText, type FriendsView, type SocialMe } from "../api/social";
import { PRIMARY_BASE } from "../api/client";
import { useAuth } from "../lib/AuthContext";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { MyAvatar } from "../ui/Avatar";
import { useLayout } from "../lib/useLayout";
import { AppHeader } from "../ui/AppHeader";
import { PressableScale } from "../ui/PressableScale";
import { SettingsIcon, ShareIcon, HandshakeIcon, UserPlusIcon, InboxIcon, ChevronRightIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";
import { Chip, EmptyCard, ErrorText, HeaderButton, Pill, StatPill } from "../social/common";
import { FriendRows, FriendCardSkeleton } from "../social/FriendRows";
import { FriendsBoard } from "../social/FriendsBoard";
import { FeedList } from "../social/FeedList";
import { Quests } from "../social/Quests";
import { Requests } from "../social/Requests";
import { Find } from "../social/Find";
import { GuestAccountCard } from "../ui/GuestAccountCard";

type Tab = "friends" | "feed" | "find";
/** Sekme etiketleri — t() çağrı anında (dil modül yüklenirken hazır değil). */
const TAB_KEYS: { key: Tab; label: string }[] = [
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
  { key: "find", label: "friends.tab_find" },
];

/**
 * Sosyal merkez — Profil ekranıyla aynı kurgu: başlık, ortalanmış kimlik kartı
 * (arma + ad + pill rozetler), Premium-blok tarzı davet CTA'sı, Ayarlar
 * çipleriyle sekmeler, altında kartlar. Misafir için giriş daveti.
 *
 * BEŞ SEKMEYDİ, ÜÇE İNDİ. "İstekler" haftanın neredeyse tamamında boştu —
 * istek gelmesi istisna, sekme ise sürekli. "Görevler" ise tek bir kart
 * taşıyordu: sunucu kişi başına aynı anda tek ortak göreve izin veriyor, yani
 * o sekme tanım gereği hiçbir zaman bir listeye dönüşemezdi. İkisi de asıl
 * işlerinin yanına taşındı: gelen istekler ve bu haftanın görevi arkadaş
 * listesinin başında, gönderilen istekler "Bul"un altında.
 *
 * Artık bir SEKME ekranı (kök yığında değil): başlıkta geri düğmesi yok.
 */
export function FriendsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { compactHeight } = useLayout();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootTabParams, "Friends">>();
  const { user } = useAuth();
  const initial = (route.params?.tab as Tab | undefined) ?? "friends";
  const [tab, setTab] = useState<Tab>(TAB_KEYS.some((k) => k.key === initial) ? initial : "friends");
  const [me, setMe] = useState<SocialMe | null>(null);
  const [data, setData] = useState<FriendsView | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const reload = useCallback(async () => {
    // Sosyal katman hesap istiyor: misafirde istek atılmıyor (sunucu 403 dönerdi).
    if (!user || user.guest) return;
    try {
      const [m, d] = await Promise.all([social.me(), social.friends()]);
      setMe(m);
      setData(d);
      setErr(null);
    } catch (e) {
      /* AĞ HATASI "KİMSE YOK" DEĞİL. Hata boş bir görünüme çevriliyordu
         (`friends: []`) ve sekme "henüz arkadaşın yok" kartına düşüyordu:
         bağlantı koptuğunda arkadaşları olan kullanıcı onların silindiğini
         görüyordu. Sıralama kartı aynı kararı kendi içinde veriyor
         (`FriendsBoard`), iki yüzey artık aynı. Önceki veri varsa o kalıyor;
         hiç yoksa sekme hata kartını gösteriyor. */
      setErr(errorText(e));
    }
  }, [user]);
  useEffect(() => { void reload(); }, [reload]);

  async function share() {
    if (!me) return;
    track("share", 0, "profile");
    try { await Share.share({ message: tx("friends.share_text", { lang: courseOrDefault(currentCourseId()).label[currentLang()], link: `${PRIMARY_BASE}/u/${me.username}?src=invite` }) }); } catch { /* kapatıldı */ }
  }

  if (user?.guest) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
        <AppHeader title={tx("friends.friends")} />
        <View>
          <GuestAccountCard icon={HandshakeIcon} tint={colors.success} title={tx("guest.social_title")} text={tx("guest.social_body")} />
        </View>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
        <AppHeader title={tx("friends.friends")} />
        <View>
          <EmptyCard icon={HandshakeIcon} tint={colors.success} title={tx("friends.sign_in_for_friends")} text={tx("friends.add_friends_react_in_feed_hit")} action={tx("friends.sign_in")} onAction={() => nav.navigate("Auth")} />
        </View>
      </View>
    );
  }

  const incoming = data?.incoming.length ?? me?.counts.incoming ?? 0;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Alt dolgu 96: yüzen sekme çubuğunun altında kalan içerik olmasın
          (ui/Screen ile aynı ölçü). Bu ekran bir yığın ekranıyken çubuk yoktu
          ve xxl yetiyordu. */}
      <KeyboardAwareScroll contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + 96 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* SEKME BAŞLIĞI — Öğren, Patika ve Beceriler ile AYNI (`AppHeader`):
            seri, gelen kutusu, profil; `Screen` ile aynı üst dolgu. Arkadaşlar
            sonradan sekme olduğunda kendi küçük `TabHeader`ıyla kalmıştı ve
            sekmeler arasında başlık boyu ile sağdaki kimlik değişiyordu.
            Sosyal ayarların dişlisi başlığa sığmıyor (dar telefonda dört düğme
            başlığı ezer), kimlik kartının köşesinde. */}
        <AppHeader title={tx("friends.friends")} />
        {/* KISA EKRANDA KİMLİK KARTI YATAY: avatar solda, ad ve rozetler sağda.
            Dikey yığın (76'lık avatar + ad + kullanıcı adı + rozetler) davet
            şeridiyle birlikte iPhone SE'nin bütün ekranını dolduruyor, sekmenin
            asıl içeriği (arkadaş listesi) hiç görünmüyordu (2026-09-22). */}
        {me && compactHeight ? (
          <Card style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.md }}>
            <View style={softShadow(colors.primary, 8)}><MyAvatar userId={me.userId} name={me.name} serverAvatar={me.avatar} size={ds(56)} /></View>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text variant="h3" numberOfLines={1}>{me.name ?? tx("social.unnamed")}</Text>
              <Text variant="caption" color={colors.textMuted} numberOfLines={1}>@{me.username}</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, marginTop: spacing.xs }}>
                <StatPill icon={HandshakeIcon} label={tx("friends.count_friends", { n: me.counts.friends })} tint={colors.success} soft={colors.successSoft} />
                {incoming > 0 ? <StatPill icon={UserPlusIcon} label={tx("friends.count_requests", { n: incoming })} tint={colors.streak} /> : null}
                {me.counts.unread > 0 ? <StatPill icon={InboxIcon} label={tx("friends.count_new", { n: me.counts.unread })} tint={colors.primary} soft={colors.primarySoft} /> : null}
              </View>
            </View>
            <HeaderButton icon={SettingsIcon} label={tx("friends.social_settings")} onPress={() => nav.navigate("SocialSettings")} />
          </Card>
        ) : me ? (
          <Card style={{ alignItems: "center", marginBottom: spacing.lg }}>
            <View style={{ position: "absolute", top: spacing.md, right: spacing.md }}>
              <HeaderButton icon={SettingsIcon} label={tx("friends.social_settings")} onPress={() => nav.navigate("SocialSettings")} />
            </View>
            {/* KENDİ avatarın: yerel seçim anında görünsün (başlıktaki ile aynı kaynak). */}
            <View style={softShadow(colors.primary, 10)}><MyAvatar userId={me.userId} name={me.name} serverAvatar={me.avatar} size={ds(76)} /></View>
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
          <SkeletonCard style={{ alignItems: "center", marginBottom: spacing.lg }}>
            <SkeletonTile size={ds(76)} radius={38} />
            <SkeletonLine variant="h2" width={168} style={{ marginTop: spacing.md }} />
            <SkeletonLine variant="caption" width={104} />
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
              <SkeletonPill width={104} height={25} />
              <SkeletonPill width={82} height={25} />
            </View>
          </SkeletonCard>
        )}

        <PressableScale onPress={() => void share()} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: compactHeight ? spacing.md : spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
          <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
            <ShareIcon color="#fff" size={24} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="h3" color="#fff">{tx("friends.invite_friend")}</Text>
            {/* Kısa ekranda şerit tek satır: açıklama başlığın söylediğini tekrarlıyor. */}
            {compactHeight ? null : <Text variant="caption" color="#ffffffcc">{tx("friends.send_your_profile_link_and_study")}</Text>}
          </View>
          <ChevronRightIcon color="#fff" size={22} />
        </PressableScale>

        {/* SEKME ŞERİDİ — aynı ekranın dört görünümü (bkz. parity 258). */}
        <ScrollView accessibilityRole="tablist" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.lg }}>
          {TAB_KEYS.map((it) => <Chip key={it.key} role="tab" label={tx(it.label)} active={tab === it.key} onPress={() => setTab(it.key)} badge={it.key === "friends" ? incoming : undefined} />)}
        </ScrollView>

        {tab === "friends" ? (
          <View>
            {/*
              İSKELET YÜKLENEN DÜZENİN KENDİSİ OLMALI.

              Önce üç kart vaat ediliyordu: gelen istek kartı, ortak görev
              kartı ve iki arkadaş kartı. Oysa gelen istek istisna (haftanın
              neredeyse tamamında hiç yok) ve görev kartı ancak arkadaşı olana
              çiziliyor. Yükleme bitince iki kart birden kayboluyor, altındaki
              sıralama tablosu da o an kendi iskeletine başlıyordu: ekran
              önce uzuyor, sonra kısalıyor, sonra yine uzuyordu.

              Artık iskelet yalnız BEKLENEN düzeni çiziyor (arkadaş kartları)
              ve sıralama tablosu iki durumda da yerinde duruyor — kendi
              iskeletini kendisi yönetiyor, yani o blok hiç yerinden
              oynamıyor. Koşullu kartlar için iskelet çizilmiyor: olmayan bir
              kartın sözünü vermek, onu hiç vaat etmemekten kötü.
            */}
            {err && (data === null || !me) ? (
              <EmptyCard live="assertive" icon={HandshakeIcon} tint={colors.info} title={tx("friends.couldn_t_load")} text={tx("social.err_offline")} />
            ) : data === null || !me ? (
              [0, 1].map((i) => <FriendCardSkeleton key={i} />)
            ) : (
              <>
                {/* Sıra bilinçli: cevap bekleyen iş (gelen istek), bu haftanın
                    taahhüdü (ortak görev), sonra liste. */}
                <Requests incoming={data.incoming} outgoing={data.outgoing} side="incoming" onChanged={() => void reload()} />
                {data.friends.length ? <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} /> : null}
                {data.friends.length ? (
                  <FriendRows friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
                ) : (
                  <EmptyCard icon={UserPlusIcon} tint={colors.success} title={tx("friends.no_friends_yet")} text={tx("friends.search_by_username_or_send_your")} action={tx("friends.find_friends")} onAction={() => setTab("find")} />
                )}
              </>
            )}
            <FriendsBoard />
          </View>
        ) : null}
        {tab === "feed" ? <FeedList onFindFriends={() => setTab("find")} /> : null}
        {tab === "find" ? (
          <View>
            <Find onChanged={() => void reload()} />
            {data ? <Requests incoming={data.incoming} outgoing={data.outgoing} side="outgoing" onChanged={() => void reload()} /> : null}
          </View>
        ) : null}
        <ErrorText text={err} />
        {err ? <View style={{ marginTop: spacing.md, alignItems: "center" }}><Pill label={tx("friends.try_again")} tone="ghost" onPress={() => void reload()} /></View> : null}
      </KeyboardAwareScroll>
    </View>
  );
}
