import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
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
import { FlameIcon, HandshakeIcon, BellIcon, TargetIcon, LockIcon, XIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import type { Palette } from "../theme/colors";
import { EmptyCard, ErrorText, Pill, ScreenHeader, SectionTitle, StatPill } from "../social/common";
import { FeedCard } from "../social/FeedList";
import { UserActionButton } from "../social/UserActionButton";

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  return (
    <Card padded style={{ width: "47.5%", gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

/** Kişi profili — Profil ekranının kurgusu: ortalanmış kimlik kartı, StatTile ızgarası, kartlar. */
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
    social.profile(username).then((d) => { setData(d); setRel(d.relation); }).catch((e) => { if (e instanceof ApiError && e.status === 404) setNotFound(true); else setErr(errorText(e)); });
  }, [username, user]);

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    try { await fn(); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }

  const wrap = (child: React.ReactNode) => (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profil")} />
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, gap: spacing.md }}>{child}</View>
    </View>
  );
  if (!user) return wrap(<EmptyCard icon={LockIcon} title={t("user.giris_gerekli")} text={t("user.profilleri_gormek_icin_giris_yap")} action={t("user.giris_yap")} onAction={() => nav.navigate("Auth")} />);
  if (notFound) return wrap(<EmptyCard icon={XIcon} tint={colors.danger} title={t("user.kullanici_bulunamadi")} text={t("user.baglanti_eski_olabilir_ya_da_bu")} />);
  if (!data) return wrap(<><Skeleton height={220} radius={26} /><Skeleton height={100} radius={26} /><ErrorText text={err} /></>);

  const u = data.user;
  const isSelf = data.relation === "self";
  const friends = rel === "friends";
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("user.profil")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={softShadow(friends ? colors.success : colors.primary, 10)}><PersonAvatar userId={u.userId} name={u.name} size={76} ring={friends ? colors.success : null} /></View>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{u.name ?? "İsimsiz öğrenci"}</Text>
          <Text variant="caption" color={colors.textMuted}>@{u.username} · {u.level} · {new Date(data.joined).toLocaleDateString("tr-TR", { month: "short", year: "numeric" })}</Text>
          {data.bio ? <Text variant="body" color={colors.text} style={{ marginTop: spacing.sm, textAlign: "center", lineHeight: 21 }}>{data.bio}</Text> : null}
          {(data.mutual > 0 || data.friendStreak > 0) ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.md }}>
              {data.mutual > 0 ? <StatPill icon={HandshakeIcon} label={`${data.mutual} ortak arkadaş`} tint={colors.info} /> : null}
              {data.friendStreak > 0 ? <StatPill icon={FlameIcon} label={`${data.friendStreak} gün birlikte`} tint={colors.success} soft={colors.successSoft} /> : null}
            </View>
          ) : null}
          {!isSelf ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginTop: spacing.lg }}>
              <UserActionButton userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} small={false} />
              {friends ? (
                <>
                  <Pill label={t("user.durt")} tone="ghost" icon={BellIcon} disabled={busy} onPress={() => void act(() => social.nudge(u.userId, "remind"), "Dürttün")} />
                  <Pill label={t("user.gorev")} tone="ghost" icon={TargetIcon} disabled={busy} onPress={() => void act(() => social.inviteQuest(u.userId), "Görev daveti gitti")} />
                </>
              ) : null}
            </View>
          ) : null}
          {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: spacing.sm }}>{msg}</Text> : null}
        </Card>

        {data.stats ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <StatTile value={String(data.stats.currentStreak)} label={t("user.gun_serisi")} color={colors.streak} colors={colors} />
            <StatTile value={formatXp(data.stats.weeklyXp)} label={t("user.bu_hafta_xp")} color={colors.primary} colors={colors} />
            <StatTile value={formatXp(data.stats.totalXp)} label={t("user.toplam_xp")} color={colors.success} colors={colors} />
            <StatTile value={String(data.stats.achievements)} label={t("user.rozet")} color={colors.accent} colors={colors} />
          </View>
        ) : (
          <View style={{ marginBottom: spacing.lg }}>
            <EmptyCard icon={LockIcon} tint={colors.textMuted} title={data.visibility === "friends" ? "Yalnız arkadaşlarına açık" : "Gizli profil"} text={data.visibility === "friends" ? "Arkadaş olunca seri, XP ve rozetlerini görürsün." : "Bu kişi istatistiklerini paylaşmıyor."} />
          </View>
        )}

        {data.recent.length ? (
          <View>
            <SectionTitle title={t("user.son_kilometre_taslari")} />
            {data.recent.map((it) => <FeedCard key={it.id} item={friends || isSelf ? it : { ...it, isMine: true }} />)}
          </View>
        ) : null}

        {!isSelf ? (
          <View style={{ marginTop: spacing.lg, alignItems: "center" }}>
            <PressableScale onPress={() => setMore((m) => !m)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
              <Text variant="caption" color={colors.textMuted}>{more ? "Gizle" : "Engelle / Şikayet et"}</Text>
            </PressableScale>
            {more ? (
              <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
                <Pill label={t("user.engelle")} tone="danger" disabled={busy} onPress={() => Alert.alert("Engelle", `${u.name ?? "Bu kişi"} engellensin mi? Arkadaşlık ve görevler silinir; kendisine bildirim gitmez.`, [
                  { text: "Vazgeç", style: "cancel" },
                  { text: "Engelle", style: "destructive", onPress: () => void act(async () => { await social.block(u.userId); nav.goBack(); }, "Engellendi") },
                ])} />
                <Pill label={t("user.sikayet_et")} tone="ghost" disabled={busy} onPress={() => Alert.alert("Şikayet sebebi", undefined, [
                  { text: "Spam", onPress: () => void act(() => social.report(u.userId, "spam"), "Şikayet alındı") },
                  { text: "Taciz", onPress: () => void act(() => social.report(u.userId, "abuse"), "Şikayet alındı") },
                  { text: "Sahte hesap", onPress: () => void act(() => social.report(u.userId, "impersonation"), "Şikayet alındı") },
                  { text: "Vazgeç", style: "cancel" },
                ])} />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
