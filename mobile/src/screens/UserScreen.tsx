import React, { useEffect, useState } from "react";
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
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, HandshakeIcon, TrophyIcon } from "../ui/icons";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, PrimaryButton, ScreenHeader } from "../social/common";
import { FeedCard } from "../social/FeedList";
import { UserActionButton } from "../social/UserActionButton";

/** Herkese açık profil (/u/<kullanıcıadı>). Görünürlük sunucuda uygulanır. */
export function UserScreen() {
  const { colors } = useTheme();
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
    social.profile(username).then((d) => { setData(d); setRel(d.relation); }).catch((e) => {
      if (e instanceof ApiError && e.status === 404) setNotFound(true); else setErr(errorText(e));
    });
  }, [username, user]);

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    try { await fn(); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }

  if (!user) return <View style={{ flex: 1, backgroundColor: colors.bg }}><ScreenHeader title="Profil" /><View style={{ paddingHorizontal: spacing.lg }}><EmptyCard title="Giriş gerekli" text="Profilleri görmek için giriş yap." action="Giriş yap" onAction={() => nav.navigate("Auth")} /></View></View>;
  if (notFound) return <View style={{ flex: 1, backgroundColor: colors.bg }}><ScreenHeader title="Profil" /><View style={{ paddingHorizontal: spacing.lg }}><EmptyCard title="Kullanıcı bulunamadı" text="Bağlantı eski olabilir ya da bu profil sana kapalı." /></View></View>;
  if (!data) return <View style={{ flex: 1, backgroundColor: colors.bg }}><ScreenHeader title="Profil" /><View style={{ paddingHorizontal: spacing.lg, gap: spacing.md }}><Skeleton height={120} /><Skeleton height={80} /><ErrorText text={err} /></View></View>;

  const u = data.user;
  const isSelf = data.relation === "self";
  const friends = rel === "friends";
  const stat = (label: string, value: string, tone: string, icon?: React.ReactNode) => (
    <Card padded style={{ flex: 1, minWidth: "30%", alignItems: "center", paddingVertical: 10 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>{icon}<Text variant="h3" color={tone}>{value}</Text></View>
      <Text variant="micro" color={colors.textMuted}>{label}</Text>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Profil" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }} showsVerticalScrollIndicator={false}>
        <Card padded>
          <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "flex-start" }}>
            <PersonAvatar userId={u.userId} name={u.name} size={64} ring={friends ? colors.success : null} />
            <View style={{ flex: 1 }}>
              <Text variant="h2" numberOfLines={1}>{u.name ?? "İsimsiz öğrenci"}</Text>
              <Text variant="caption" color={colors.textMuted}>@{u.username} · {u.level}</Text>
              {data.bio ? <Text variant="body" style={{ marginTop: 6, lineHeight: 20 }}>{data.bio}</Text> : null}
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                {data.mutual > 0 ? <Text variant="micro" color={colors.textMuted}>{data.mutual} ortak arkadaş</Text> : null}
                {data.friendStreak > 0 ? <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}><HandshakeIcon color={colors.success} size={12} /><Text variant="micro" color={colors.success}>{data.friendStreak} gün birlikte</Text></View> : null}
                <Text variant="micro" color={colors.textFaint}>Katılım {new Date(data.joined).toLocaleDateString("tr-TR", { month: "short", year: "numeric" })}</Text>
              </View>
            </View>
          </View>
          {!isSelf ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.sm, marginTop: spacing.md }}>
              <UserActionButton userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} small={false} />
              {friends ? (
                <>
                  <PrimaryButton label="Dürt" tone="ghost" disabled={busy} onPress={() => void act(() => social.nudge(u.userId, "remind"), "Dürttün")} />
                  <PrimaryButton label="Ortak görev" tone="ghost" disabled={busy} onPress={() => void act(() => social.inviteQuest(u.userId), "Görev daveti gitti")} />
                </>
              ) : null}
              <PressableScale onPress={() => setMore((m) => !m)} style={{ marginLeft: "auto" }}><Text variant="micro" color={colors.textFaint}>Daha fazla</Text></PressableScale>
            </View>
          ) : null}
          {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: 6 }}>{msg}</Text> : null}
          {more && !isSelf ? (
            <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
              <PrimaryButton label="Engelle" small tone="danger" disabled={busy} onPress={() => Alert.alert("Engelle", `${u.name ?? "Bu kişi"} engellensin mi? Arkadaşlık ve görevler silinir; kendisine bildirim gitmez.`, [
                { text: "Vazgeç", style: "cancel" },
                { text: "Engelle", style: "destructive", onPress: () => void act(async () => { await social.block(u.userId); nav.goBack(); }, "Engellendi") },
              ])} />
              <PrimaryButton label="Şikayet et" small tone="ghost" disabled={busy} onPress={() => Alert.alert("Şikayet sebebi", undefined, [
                { text: "Spam", onPress: () => void act(() => social.report(u.userId, "spam"), "Şikayet alındı") },
                { text: "Taciz", onPress: () => void act(() => social.report(u.userId, "abuse"), "Şikayet alındı") },
                { text: "Sahte hesap", onPress: () => void act(() => social.report(u.userId, "impersonation"), "Şikayet alındı") },
                { text: "Vazgeç", style: "cancel" },
              ])} />
            </View>
          ) : null}
        </Card>

        {data.stats ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {stat("Seri", String(data.stats.currentStreak), colors.streak, <FlameIcon color={colors.streak} size={14} />)}
            {stat("Bu hafta", `${formatXp(data.stats.weeklyXp)}`, colors.primary)}
            {stat("Toplam XP", formatXp(data.stats.totalXp), colors.primary)}
            {stat("En uzun seri", String(data.stats.longestStreak), colors.streak)}
            {stat("Rozet", String(data.stats.achievements), colors.accent, <TrophyIcon color={colors.accent} size={14} />)}
            {stat("Son aktif", data.stats.lastActiveDay ? new Date(`${data.stats.lastActiveDay}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }) : "—", colors.textMuted)}
          </View>
        ) : (
          <Card padded style={{ alignItems: "center" }}><Text variant="body" color={colors.textMuted}>{data.visibility === "friends" ? "İstatistikler yalnız arkadaşlarına açık." : "Bu profil gizli."}</Text></Card>
        )}

        {data.recent.length ? (
          <View>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, fontWeight: "700" }}>SON KİLOMETRE TAŞLARI</Text>
            {data.recent.map((it) => <FeedCard key={it.id} item={friends || isSelf ? it : { ...it, isMine: true }} />)}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
