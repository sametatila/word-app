import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, FlameIcon, BoltIcon, LearnIcon, TrophyIcon, BellIcon, LogoutIcon, CrownIcon, ShareIcon, SettingsIcon, PodiumIcon, CheckIcon, WriteIcon, FaceIcon, HandshakeIcon, InboxIcon } from "../ui/icons";
import { Avatar } from "../ui/Avatar";
import { SkeletonCard, SkeletonLine, SkeletonPill, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { shareInvite } from "../lib/share";
import { useMe, formatDuration, formatXp } from "../lib/useMe";
import { usePremium } from "../lib/usePremium";
import { billingAvailable } from "../lib/billing";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useLayout } from "../lib/useLayout";

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  return (
    <Card padded style={{ width: gridItemWidth, gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}

function Row({ icon: Icon, label, tint, colors, last, onPress }: { icon: (p: { color: string; size: number }) => React.ReactElement; label: string; tint: string; colors: Palette; last?: boolean; onPress?: () => void }) {
  return (
    <PressableScale onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={tint} size={20} />
      </View>
      <Text variant="bodyStrong" style={{ flex: 1 }}>{label}</Text>
      <ChevronRightIcon color={colors.textFaint} size={20} />
    </PressableScale>
  );
}

export function ProfileScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, signOut } = useAuth();
  const { me, loading: meLoading } = useMe();
  const premium = usePremium();
  // Misafir modu yok: kullanıcı her zaman var. Adı yoksa e-posta adından türet.
  const displayName = user?.name?.trim() || user?.email?.split("@")[0] || t("profile.student");
  const [confirmOut, setConfirmOut] = useState(false);
  async function reallySignOut() { setConfirmOut(false); await signOut(); nav.reset({ index: 0, routes: [{ name: "Auth" }] }); }
  // Veri gelmeden rakam gösterilmez (uydurma "1.2k" yok): yükleniyor kartı var.
  const xpLabel = me ? formatXp(me.xp) : "—";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* başlık */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2" style={{ flex: 1 }}>{t("profile.profil")}</Text>
        <PressableScale hitSlop={4} onPress={() => nav.navigate("Settings")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <SettingsIcon color={colors.text} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* kimlik kartı */}
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <PressableScale onPress={() => nav.navigate("Avatar")} accessibilityLabel={t("profile.avatarini_duzenle")} style={softShadow(colors.primary, 10)}>
            <Avatar size={76} />
          </PressableScale>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{displayName}</Text>
          <Text variant="caption" color={colors.textMuted}>{user?.email ?? t("profile.not_signed_in")}</Text>
          {/* Rozetler yüklenmeden de yerini tutar: sonradan belirince kimlik
              kartı uzayıp altındaki her şeyi aşağı itmesin. */}
          {meLoading ? (
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <SkeletonPill width={104} height={textHeight("bodyStrong") + 12} />
              <SkeletonPill width={96} height={textHeight("bodyStrong") + 12} />
            </View>
          ) : me ? (
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.streak + "22", borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
                <FlameIcon color={colors.streak} size={16} /><Text variant="bodyStrong" color={colors.streak}>{t("profile.days", { n: me.streak })}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
                <BoltIcon color={colors.primary} size={16} /><Text variant="bodyStrong" color={colors.primary}>{xpLabel} XP</Text>
              </View>
            </View>
          ) : null}
        </Card>

        {/* istatistik ızgarası — yalnız gerçek veriyle; misafirde uydurma sayı yok */}
        {me ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <StatTile value={String(me.mastered)} label={t("profile.ogrenilen_kelime")} color={colors.primary} colors={colors} />
            <StatTile value={String(me.streak)} label={t("profile.gun_serisi")} color={colors.streak} colors={colors} />
            <StatTile value={String(me.xp).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} label={t("profile.toplam_xp")} color={colors.success} colors={colors} />
            <StatTile value={formatDuration(me.seconds)} label={t("profile.bu_hafta_sure")} color={colors.info} colors={colors} />
          </View>
        ) : (
          // Kısa "yükleniyor" kartı yerine ızgaranın kendi iskeleti: dört karo
          // gelince ekran iki satır boyu uzamıyor.
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            {[0, 1, 2, 3].map((i) => (
              <SkeletonCard key={i} style={{ width: gridItemWidth, gap: 2 }}>
                <SkeletonLine variant="h1" width="60%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </View>
        )}

        {/* premium: yalnız mağaza entegrasyonu canlıyken (satın alınamayan şey vaat edilmez) */}
        {!billingAvailable() ? null : premium ? (
          <View style={{ borderRadius: radii.xl, backgroundColor: colors.successSoft, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
              <CrownIcon color="#fff" size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color={colors.success}>{t("profile.premium_uye")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("profile.tum_ozellikler_acik_tesekkurler")}</Text>
            </View>
            <CheckIcon color={colors.success} size={22} />
          </View>
        ) : (
          <PressableScale onPress={() => nav.navigate("Paywall")} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
              <CrownIcon color="#fff" size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color="#fff">{t("profile.premium_a_gec")}</Text>
              <Text variant="caption" color="#ffffffcc">{t("profile.sinirsiz_konusma_tam_sinav_hazirligi")}</Text>
            </View>
            <ChevronRightIcon color="#fff" size={22} />
          </PressableScale>
        )}

        {/* ayar satırları — görünüm / okuma sesi / dil artık Ayarlar'da */}
        <Card padded style={{ paddingVertical: 0 }}>
          <Row icon={FaceIcon} label={t("profile.avatarini_duzenle")} tint={colors.primary} colors={colors} onPress={() => nav.navigate("Avatar")} />
          <Row icon={LearnIcon} label={t("profile.kelimelerim")} tint={colors.primary} colors={colors} onPress={() => nav.navigate("Words")} />
          <Row icon={TrophyIcon} label={t("profile.basarimlar")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Achievements")} />
          <Row icon={CheckIcon} label={t("profile.neler_yapabilirim")} tint={colors.success} colors={colors} onPress={() => nav.navigate("Cando")} />
          <Row icon={WriteIcon} label={t("profile.yazilarim")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Writings")} />
          <Row icon={PodiumIcon} label={t("profile.haftalik_siralama")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Leaderboard")} />
          <Row icon={HandshakeIcon} label={t("profile.arkadaslar")} tint={colors.success} colors={colors} onPress={() => nav.navigate("Friends", undefined)} />
          <Row icon={InboxIcon} label={t("profile.gelen_kutusu")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Inbox")} />
          <Row icon={ShareIcon} label={t("profile.arkadasini_davet_et")} tint={colors.success} colors={colors} onPress={() => shareInvite()} />
          <Row icon={BellIcon} label={t("profile.bildirimler")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Notifications")} last />
        </Card>

        <PressableScale onPress={() => setConfirmOut(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: spacing.lg, paddingVertical: spacing.md }}>
          <LogoutIcon color={colors.danger} size={20} />
          <Text variant="bodyStrong" color={colors.danger}>{t("profile.cikis_yap")}</Text>
        </PressableScale>
      </ScrollView>

      <ConfirmDialog
        visible={confirmOut}
        title={t("profile.cikis_yap")}
        message={t("profile.signout_confirm")}
        confirmLabel={t("profile.signout")}
        cancelLabel={t("common.vazgec")}
        destructive
        onConfirm={reallySignOut}
        onCancel={() => setConfirmOut(false)}
      />
    </View>
  );
}
