import React, { useCallback, useEffect, useState } from "react";
import { t as tx } from "../lib/i18n";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import type { RootTabParams } from "../navigation/RootTabs";
import { social, errorText, type FriendsView, type SocialMe } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { track } from "../lib/track";
import { Text } from "../ui/Text";
import { AppHeader } from "../ui/AppHeader";
import { PressableScale } from "../ui/PressableScale";
import { ShareIcon, HandshakeIcon, UserPlusIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { Chip, EmptyCard, ErrorText, Pill } from "../social/common";
import { FriendRows, FriendCardSkeleton } from "../social/FriendRows";
import { FriendsBoard } from "../social/FriendsBoard";
import { FeedList } from "../social/FeedList";
import { LeagueBoard } from "../social/LeagueBoard";
import { shareInvite } from "../lib/share";
import { usePremiumStatus } from "../lib/premium";
import { Quests } from "../social/Quests";
import { Requests } from "../social/Requests";
import { Find } from "../social/Find";
import { GuestAccountCard } from "../ui/GuestAccountCard";
import { Screen } from "../ui/Screen";

type Tab = "league" | "friends" | "feed";
/** Sekme etiketleri — t() çağrı anında (dil modül yüklenirken hazır değil). */
const TAB_KEYS: { key: Tab; label: string }[] = [
  { key: "league", label: "leaderboard.league" },
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
];

/**
 * TOPLULUK — dördüncü sekme (2026-09-28, Samet'in kararı;
 * `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Arkadaş sekmesiydi: kimlik kartı, dişli (sosyal ayarlar), davet şeridi,
 * Arkadaşlar · Akış · Bul ve dipte ikinci bir haftalık tablo. Lig ise yalnız
 * Profil menüsünden açılıyordu. Şimdi üç üst sekme:
 *
 *   - LİG (ilk açılan): kendi grubun, "Arkadaşlar" süzgeciyle. Arkadaş
 *     tablosu artık yalnız burada.
 *   - ARKADAŞLAR: gelen istekler, ortak görev, liste, arama (eski "Bul"),
 *     gönderilen istekler ve tek davet (`/r/KOD`; katılan kişi arkadaşlık
 *     isteği gönderir).
 *   - AKIŞ.
 *
 * Kimlik kartı ve dişli kalktı: kimlik Profil'de, sosyal ayarlar Ayarlar ›
 * Hesap / Gizlilik'te. Eski `?tab=find` Arkadaşlar'a düşüyor.
 */
export function FriendsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootTabParams, "Friends">>();
  const { user } = useAuth();
  const { status: premiumStatus } = usePremiumStatus();
  const want = route.params?.tab === "find" ? "friends" : (route.params?.tab as Tab | undefined);
  const [tab, setTab] = useState<Tab>(TAB_KEYS.some((k) => k.key === want) ? (want as Tab) : "league");
  useEffect(() => { if (want && TAB_KEYS.some((k) => k.key === want)) setTab(want as Tab); }, [want]);
  const [board, setBoard] = useState<"group" | "friends">("group");
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
      /* AĞ HATASI "KİMSE YOK" DEĞİL: hata boş bir görünüme çevrilmiyor.
         Önceki veri varsa o kalıyor; hiç yoksa sekme hata kartını gösteriyor. */
      setErr(errorText(e));
    }
  }, [user]);
  useEffect(() => { void reload(); }, [reload]);

  /* Misafir: sekme görünür ama tek kart (hesap oluşturma). */
  if (user?.guest) {
    return (
      <Screen>
        <AppHeader title={tx("nav.friends")} />
        <GuestAccountCard icon={HandshakeIcon} tint={colors.success} title={tx("guest.social_title")} text={tx("guest.social_body")} />
      </Screen>
    );
  }

  if (!user) {
    return (
      <Screen>
        <AppHeader title={tx("nav.friends")} />
        <EmptyCard icon={HandshakeIcon} tint={colors.success} title={tx("friends.sign_in_for_friends")} text={tx("friends.add_friends_react_in_feed_hit")} action={tx("friends.sign_in")} onAction={() => nav.navigate("Auth")} />
      </Screen>
    );
  }

  const incoming = data?.incoming.length ?? me?.counts.incoming ?? 0;
  const showErrLine = !!err && !(tab === "friends" && (data === null || !me));
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Alt dolgu 96: yüzen sekme çubuğunun altında kalan içerik olmasın (ui/Screen ile aynı ölçü). */}
      <KeyboardAwareScroll contentContainerStyle={{ paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + 96 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <AppHeader title={tx("nav.friends")} />

        {/* ÜST SEKMELER — aynı ekranın üç görünümü (bkz. parity 258). */}
        <View accessibilityRole="tablist" style={{ flexDirection: "row", backgroundColor: colors.surface2, borderRadius: radii.lg, padding: 3, marginBottom: spacing.lg }}>
          {TAB_KEYS.map((it) => {
            const on = tab === it.key;
            const n = it.key === "friends" ? incoming : 0;
            return (
              <PressableScale key={it.key} onPress={() => setTab(it.key)} accessibilityRole="tab" accessibilityState={{ selected: on }} style={[{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 9, borderRadius: radii.md, backgroundColor: on ? colors.primary : "transparent" }]}>
                {/* Seçili sekme DOLU turuncu + beyaz, gölgesiz (2026-09-29 Samet:
                    seçim B, dolu turuncu çip; web `friends-hub` aynı). Rozet
                    turuncunun üstünde beyaz zemine döner. */}
                <Text variant="bodyStrong" color={on ? colors.onPrimary : colors.textMuted} numberOfLines={1}>{tx(it.label)}</Text>
                {n > 0 ? <View style={{ minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 5, alignItems: "center", justifyContent: "center", backgroundColor: on ? colors.onPrimary : colors.primary }}><Text variant="micro" color={on ? colors.primaryOnWhite : colors.onPrimary} style={{ fontWeight: "800" }}>{n > 9 ? "9+" : n}</Text></View> : null}
              </PressableScale>
            );
          })}
        </View>

        {tab === "league" ? (
          <View>
            {/* Grubum / Arkadaşlar — aynı haftanın iki tablosu; arkadaş tablosu yalnız burada. */}
            <ScrollView accessibilityRole="tablist" horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm, paddingBottom: spacing.md }}>
              <Chip role="tab" label={tx("community.my_group")} active={board === "group"} onPress={() => setBoard("group")} />
              <Chip role="tab" label={tx("social.tab_friends")} active={board === "friends"} onPress={() => setBoard("friends")} />
            </ScrollView>
            {board === "group" ? <LeagueBoard /> : <FriendsBoard compact />}
          </View>
        ) : null}

        {tab === "friends" ? (
          <View>
            {err && (data === null || !me) ? (
              <EmptyCard live="assertive" icon={HandshakeIcon} tint={colors.info} title={tx("friends.couldn_t_load")} text={tx("social.err_offline")} action={tx("friends.try_again")} onAction={() => void reload()} />
            ) : data === null || !me ? (
              [0, 1].map((i) => <FriendCardSkeleton key={i} />)
            ) : (
              <>
                {/* Sıra bilinçli: cevap bekleyen iş (gelen istek), bu haftanın
                    taahhüdü (ortak görev), liste, sonra arama. */}
                <Requests incoming={data.incoming} outgoing={data.outgoing} side="incoming" onChanged={() => void reload()} />
                {data.friends.length ? <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} /> : null}
                {data.friends.length ? (
                  <FriendRows friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
                ) : (
                  <EmptyCard icon={UserPlusIcon} tint={colors.success} title={tx("friends.no_friends_yet")} text={tx("friends.search_by_username_or_send_your")} />
                )}
                <Find onChanged={() => void reload()} />
                <Requests incoming={data.incoming} outgoing={data.outgoing} side="outgoing" onChanged={() => void reload()} />
              </>
            )}
            {/* TEK DAVET — ödüllü kod bağlantısı (`/r/KOD`): katılan kişi davet edene
                arkadaşlık isteği gönderir, kabul edince ortak seri başlar. */}
            <PressableScale onPress={() => { track("share", 0, "invite"); void shareInvite(premiumStatus?.referral?.code); }} accessibilityRole="button" style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.xl, borderWidth: 1, borderStyle: "dashed", borderColor: colors.primary, padding: spacing.lg, marginTop: spacing.lg }}>
              <ShareIcon color={colors.primaryText} size={22} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong" color={colors.primaryText}>{tx("friends.invite_friend")}</Text>
                <Text variant="caption" color={colors.textMuted}>{tx("community.invite_sub")}</Text>
              </View>
            </PressableScale>
          </View>
        ) : null}

        {tab === "feed" ? <FeedList onFindFriends={() => setTab("friends")} /> : null}

        {/* Hata kartı çizildiyse aynı hata ikinci kez yazılmıyor: bu satır yalnız elde veri VARKEN konuşuyor. */}
        <ErrorText text={showErrLine ? err : null} />
        {showErrLine ? <View style={{ marginTop: spacing.md, alignItems: "center" }}><Pill label={tx("friends.try_again")} tone="ghost" onPress={() => void reload()} /></View> : null}
      </KeyboardAwareScroll>
    </View>
  );
}
