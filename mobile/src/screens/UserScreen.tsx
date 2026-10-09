import React, { useEffect, useState } from "react";
import { t, formatDay, dateLocale, formatNumber } from "../lib/i18n";
import { ScrollView, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, type PublicProfileView, type Relation } from "../api/social";
import { ApiError } from "../api/client";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { Avatar } from "../ui/Avatar";
import { PressableScale } from "../ui/PressableScale";
import { WarningIcon, SharedStreakIcon, TabFriendsIcon, RemindersIcon, QuestIcon, LockedIcon, NoResultsIcon, PrivacyIcon } from "../ui/icons";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ReportSheet } from "../ui/ReportSheet";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";
import type { Palette } from "../theme/colors";
import { useLayout } from "../lib/useLayout";
import { CardGrid } from "../ui/CardGrid";
import { EmptyCard, Pill, ScreenHeader, SectionTitle, StatPill } from "../social/common";
import { FeedCard } from "../social/FeedList";
import { UserActionButton } from "../social/UserActionButton";
import { GuestAccountCard } from "../ui/GuestAccountCard";

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  return (
    <Card padded style={{ flex: 1, gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/** Kişi profili — Profil ekranının kurgusu: ortalanmış kimlik kartı, StatTile ızgarası, kartlar. */
export function UserScreen() {
  const { colors } = useTheme();
  const { gridColumns } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const route = useRoute<RouteProp<RootStackParams, "User">>();
  const { user } = useAuth();
  const username = route.params.username;
  const [data, setData] = useState<PublicProfileView | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [rel, setRel] = useState<Relation>("none");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [more, setMore] = useState(false);
  const [confirmBlock, setConfirmBlock] = useState(false);
  const [reporting, setReporting] = useState(false);
  // Hata kartındaki "tekrar dene" bu sayacı artırıp profili yeniden istiyor.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user || user.guest) return;
    social.profile(username).then((d) => { setData(d); setRel(d.relation); }).catch((e) => { if (e instanceof ApiError && e.status === 404) setNotFound(true); else setErr(errorText(e)); });
  }, [username, user, attempt]);

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    try { await fn(); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }

  const wrap = (child: React.ReactNode) => (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profile")} />
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.md }}>{child}</View>
    </View>
  );
  if (user?.guest) return wrap(<GuestAccountCard title={t("guest.social_title")} text={t("guest.social_body")} />);
  if (!user) return wrap(<EmptyCard icon={LockedIcon} title={t("user.sign_in_required")} text={t("user.sign_in_to_see_profiles")} action={t("user.sign_in")} onAction={() => nav.navigate("Auth")} />);
  if (notFound) return wrap(<EmptyCard icon={NoResultsIcon} tint={colors.danger} title={t("user.user_not_found")} text={t("user.link_may_be_old_or_this_profile")} />);
  /* HATA İSKELETTE KALMIYOR: iskelet "yükleniyor" diyor ve altındaki kırmızı
     satırla birlikte sonsuza dek duruyordu; tekrar deneme yolu da yoktu. */
  if (!data && err) return wrap(<EmptyCard live="assertive" icon={WarningIcon} tint={colors.danger} title={t("user.profile")} text={err} action={t("common.try_again")} onAction={() => { setErr(null); setAttempt((n) => n + 1); }} />);
  /* İskelet `wrap`tan değil gerçek dalın kabından geçiyor: `wrap` kartları 12
     aralıkla diziyor, gerçek ekranda kimlik kartının altı 16. Izgara da
     gerçekteki gibi altı karo (dört çiziliyordu, içerik gelince bir satır
     uzuyordu). */
  if (!data) return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profile")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false} scrollEnabled={false}>
      {/* Kimlik kartı + istatistik ızgarası: gerçek düzenin ölçüleriyle. */}
      <SkeletonCard style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
        <SkeletonTile size={ds(76)} radius={38} />
        <SkeletonLine variant="h2" width={172} style={{ marginTop: spacing.md }} />
        <SkeletonLine variant="caption" width={198} />
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
          <SkeletonPill width={124} height={41} />
          <SkeletonPill width={84} height={41} />
        </View>
      </SkeletonCard>
      <CardGrid columns={gridColumns} balance stretch>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonCard key={i} style={{ flex: 1, gap: 2 }}>
            <SkeletonLine variant="h1" width="55%" />
            <SkeletonLine variant="caption" width="80%" />
          </SkeletonCard>
        ))}
      </CardGrid>
      </ScrollView>
    </View>
  );

  const u = data.user;
  const isSelf = data.relation === "self";
  const friends = rel === "friends";
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profile")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={softShadow(friends ? colors.success : colors.primary, 10)}><Avatar userId={u.userId} name={u.name} avatar={u.avatar} size={ds(76)} ring={friends ? colors.success : null} /></View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{u.name ?? t("social.unnamed")}</Text>
          <Text variant="caption" color={colors.textMuted}>@{u.username} · {u.level} · {new Date(data.joined).toLocaleDateString(dateLocale(), { month: "short", year: "numeric" })}</Text>
          {(data.mutual > 0 || data.friendStreak > 0) ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.md }}>
              {data.mutual > 0 ? <StatPill icon={TabFriendsIcon} label={t("social.mutual", { n: data.mutual })} tint={colors.info} /> : null}
              {data.friendStreak > 0 ? <StatPill icon={SharedStreakIcon} label={t("social.days_together", { n: data.friendStreak })} tint={colors.success} soft={colors.successSoft} /> : null}
            </View>
          ) : null}
          {!isSelf ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.lg }}>
              <UserActionButton userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} small={false} />
              {friends ? (
                <>
                  <Pill label={t("user.nudge")} tone="ghost" icon={RemindersIcon} disabled={busy} onPress={() => void act(() => social.nudge(u.userId, "remind"), t("social.nudged_you"))} />
                  <Pill label={t("user.task")} tone="ghost" icon={QuestIcon} disabled={busy} onPress={() => void act(() => social.inviteQuest(u.userId), t("social.quest_sent"))} />
                </>
              ) : null}
            </View>
          ) : null}
          {/* HATA `assertive`, BASARI `polite` (bkz. `PaywallScreen`). */}
          {msg ? <Text accessibilityLiveRegion={ok ? "polite" : "assertive"} variant="caption" color={ok ? colors.successText : colors.dangerText} style={{ marginTop: spacing.sm }}>{msg}</Text> : null}
        </Card>

        {data.stats ? (
          <CardGrid columns={gridColumns} balance stretch style={{ marginBottom: spacing.lg }}>
            <StatTile value={String(data.stats.currentStreak)} label={t("user.day_streak")} color={colors.streakText} colors={colors} />
            <StatTile value={formatNumber(data.stats.weeklyXp)} label={t("user.xp_this_week")} color={colors.primaryText} colors={colors} />
            <StatTile value={formatNumber(data.stats.totalXp)} label={t("user.total_xp")} color={colors.successText} colors={colors} />
            <StatTile value={String(data.stats.achievements)} label={t("user.badge")} color={colors.accentText} colors={colors} />
            {/*
              EN UZUN SERİ VE SON AKTİF GÜN sunucudan geliyordu ama hiç
              çizilmiyordu: tip iki alanı da taşıyor (`PublicProfileView`),
              ekran dördünü gösterip ikisini düşürüyordu. Web profili altısını
              da yazıyor. "Son aktif" bir arkadaşa dürtme göndermeden önce
              bakılan şey; onsuz dürtme körlemesine gidiyordu.
            */}
            <StatTile value={String(data.stats.longestStreak)} label={t("user.longest_streak")} color={colors.streakText} colors={colors} />
            <StatTile value={data.stats.lastActiveDay ? formatDay(data.stats.lastActiveDay) : "—"} label={t("user.last_active")} color={colors.textMuted} colors={colors} />
          </CardGrid>
        ) : (
          <View style={{ marginBottom: spacing.lg }}>
            <EmptyCard icon={PrivacyIcon} tint={colors.textMuted} title={t(data.visibility === "friends" ? "user.visible_friends" : "user.private_profile")} text={t(data.visibility === "friends" ? "user.friends_see_stats" : "user.no_stats_shared")} />
          </View>
        )}

        {data.recent.length ? (
          <View>
            <SectionTitle title={t("user.recent_milestones")} />
            {data.recent.map((it) => <FeedCard key={it.id} item={friends || isSelf ? it : { ...it, isMine: true }} />)}
          </View>
        ) : null}

        {!isSelf ? (
          <View style={{ marginTop: spacing.lg, alignItems: "center" }}>
            <PressableScale onPress={() => setMore((m) => !m)} style={{ paddingHorizontal: 14, paddingVertical: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
              <Text variant="caption" color={colors.textMuted}>{t(more ? "user.hide" : "user.block_or_report")}</Text>
            </PressableScale>
            {more ? (
              <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
                <Pill label={t("user.block_2")} tone="danger" disabled={busy} onPress={() => setConfirmBlock(true)} />
                {/* ŞİKÂYET ORTAK SAYFADAN (lig tablosuyla ve webdeki diyalogla aynı
                    sebepler): sebep seçilip ayrıca gönderiliyor. Eskiden sistem
                    uyarı penceresiydi ve iki platformda iki ayrı liste vardı. */}
                <Pill label={t("user.report")} tone="ghost" disabled={busy} onPress={() => setReporting(true)} />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>

      <ReportSheet visible={reporting} kind="user" refId={u.userId} content={u.name ?? ""} onClose={() => setReporting(false)} />
      <ConfirmDialog
        visible={confirmBlock}
        title={t("user.block")}
        message={t("user.block_confirm", { name: u.name ?? t("social.this_person") })}
        confirmLabel={t("user.block")}
        cancelLabel={t("common.discard")}
        destructive
        onConfirm={() => { setConfirmBlock(false); void act(async () => { await social.block(u.userId); nav.goBack(); }, t("user.blocked_done")); }}
        onCancel={() => setConfirmBlock(false)}
      />
    </View>
  );
}
