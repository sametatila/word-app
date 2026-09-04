import React, { useEffect, useState } from "react";
import { t, dateLocale } from "../lib/i18n";
import { Alert, ScrollView, View } from "react-native";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, formatXp, type PublicProfileView, type Relation } from "../api/social";
import { ApiError } from "../api/client";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, HandshakeIcon, BellIcon, TargetIcon, LockIcon, XIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import type { Palette } from "../theme/colors";
import { useLayout } from "../lib/useLayout";
import { EmptyCard, ErrorText, Pill, ScreenHeader, SectionTitle, StatPill } from "../social/common";
import { FeedCard } from "../social/FeedList";
import { UserActionButton } from "../social/UserActionButton";

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  return (
    <Card padded style={{ width: gridItemWidth, gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/** Kişi profili — Profil ekranının kurgusu: ortalanmış kimlik kartı, StatTile ızgarası, kartlar. */
export function UserScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
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

  useEffect(() => {
    if (!user) return;
    social.profile(username).then((d) => { setData(d); setRel(d.relation); }).catch((e) => { if (e instanceof ApiError && e.status === 404) setNotFound(true); else setErr(errorText(e)); });
  }, [username, user]);

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
  if (!user) return wrap(<EmptyCard icon={LockIcon} title={t("user.sign_in_required")} text={t("user.sign_in_to_see_profiles")} action={t("user.sign_in")} onAction={() => nav.navigate("Auth")} />);
  if (notFound) return wrap(<EmptyCard icon={XIcon} tint={colors.danger} title={t("user.user_not_found")} text={t("user.link_may_be_old_or_this_profile")} />);
  if (!data) return wrap(
    <>
      {/* Kimlik kartı + istatistik ızgarası: gerçek düzenin ölçüleriyle. */}
      <SkeletonCard style={{ alignItems: "center" }}>
        <SkeletonTile size={76} radius={38} />
        <SkeletonLine variant="h2" width={172} style={{ marginTop: spacing.md }} />
        <SkeletonLine variant="caption" width={198} />
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg }}>
          <SkeletonPill width={124} height={41} />
          <SkeletonPill width={84} height={41} />
        </View>
      </SkeletonCard>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {[0, 1, 2, 3].map((i) => (
          <SkeletonCard key={i} style={{ width: gridItemWidth, gap: 2 }}>
            <SkeletonLine variant="h1" width="55%" />
            <SkeletonLine variant="caption" width="80%" />
          </SkeletonCard>
        ))}
      </View>
      <ErrorText text={err} />
    </>,
  );

  const u = data.user;
  const isSelf = data.relation === "self";
  const friends = rel === "friends";
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profile")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={softShadow(friends ? colors.success : colors.primary, 10)}><PersonAvatar userId={u.userId} name={u.name} size={76} ring={friends ? colors.success : null} /></View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{u.name ?? t("social.unnamed")}</Text>
          <Text variant="caption" color={colors.textMuted}>@{u.username} · {u.level} · {new Date(data.joined).toLocaleDateString(dateLocale(), { month: "short", year: "numeric" })}</Text>
          {data.bio ? <Text variant="body" color={colors.text} style={{ marginTop: spacing.sm, textAlign: "center", lineHeight: 21 }}>{data.bio}</Text> : null}
          {(data.mutual > 0 || data.friendStreak > 0) ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.md }}>
              {data.mutual > 0 ? <StatPill icon={HandshakeIcon} label={t("social.mutual", { n: data.mutual })} tint={colors.info} /> : null}
              {data.friendStreak > 0 ? <StatPill icon={FlameIcon} label={t("social.days_together", { n: data.friendStreak })} tint={colors.success} soft={colors.successSoft} /> : null}
            </View>
          ) : null}
          {!isSelf ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.lg }}>
              <UserActionButton userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} small={false} />
              {friends ? (
                <>
                  <Pill label={t("user.nudge")} tone="ghost" icon={BellIcon} disabled={busy} onPress={() => void act(() => social.nudge(u.userId, "remind"), t("social.nudged_you"))} />
                  <Pill label={t("user.task")} tone="ghost" icon={TargetIcon} disabled={busy} onPress={() => void act(() => social.inviteQuest(u.userId), t("social.quest_sent"))} />
                </>
              ) : null}
            </View>
          ) : null}
          {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: spacing.sm }}>{msg}</Text> : null}
        </Card>

        {data.stats ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <StatTile value={String(data.stats.currentStreak)} label={t("user.day_streak")} color={colors.streak} colors={colors} />
            <StatTile value={formatXp(data.stats.weeklyXp)} label={t("user.xp_this_week")} color={colors.primary} colors={colors} />
            <StatTile value={formatXp(data.stats.totalXp)} label={t("user.total_xp")} color={colors.success} colors={colors} />
            <StatTile value={String(data.stats.achievements)} label={t("user.badge")} color={colors.accent} colors={colors} />
          </View>
        ) : (
          <View style={{ marginBottom: spacing.lg }}>
            <EmptyCard icon={LockIcon} tint={colors.textMuted} title={t(data.visibility === "friends" ? "user.visible_friends" : "user.private_profile")} text={t(data.visibility === "friends" ? "user.friends_see_stats" : "user.no_stats_shared")} />
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
            <PressableScale onPress={() => setMore((m) => !m)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
              <Text variant="caption" color={colors.textMuted}>{t(more ? "user.hide" : "user.block_or_report")}</Text>
            </PressableScale>
            {more ? (
              <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
                <Pill label={t("user.block_2")} tone="danger" disabled={busy} onPress={() => Alert.alert(t("user.block"), t("user.block_confirm", { name: u.name ?? t("social.this_person") }), [
                  { text: t("common.discard"), style: "cancel" },
                  { text: t("user.block"), style: "destructive", onPress: () => void act(async () => { await social.block(u.userId); nav.goBack(); }, t("user.blocked_done")) },
                ])} />
                <Pill label={t("user.report")} tone="ghost" disabled={busy} onPress={() => Alert.alert(t("user.report_reason"), undefined, [
                  { text: t("user.report_spam"), onPress: () => void act(() => social.report(u.userId, "spam"), t("user.report_done")) },
                  { text: t("user.report_abuse"), onPress: () => void act(() => social.report(u.userId, "abuse"), t("user.report_done")) },
                  { text: t("user.report_fake"), onPress: () => void act(() => social.report(u.userId, "impersonation"), t("user.report_done")) },
                  { text: t("common.discard"), style: "cancel" },
                ])} />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
