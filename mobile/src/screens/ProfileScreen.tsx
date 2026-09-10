import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { goFriends } from "../lib/goFriends";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { MenuRow } from "../ui/MenuRow";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, FlameIcon, BoltIcon, TrophyIcon, LogoutIcon, CrownIcon, ShareIcon, SettingsIcon, PodiumIcon, CheckIcon, HandshakeIcon, InboxIcon } from "../ui/icons";
import { Avatar } from "../ui/Avatar";
import { SkeletonCard, SkeletonLine, SkeletonPill, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { shareInvite } from "../lib/share";
import { useMe, formatXp } from "../lib/useMe";
import { usePremiumStatus } from "../lib/premium";
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


export function ProfileScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, signOut } = useAuth();
  const { me, loading: meLoading } = useMe();
  // Tam durum: davet kodu da buradan geliyor (paylaşım bağlantısı onu taşıyor).
  const { status: premiumStatus } = usePremiumStatus();
  const premium = !!premiumStatus?.premium;
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
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2" style={{ flex: 1 }}>{t("profile.profile")}</Text>
        <PressableScale accessibilityLabel={t("settings.settings")} hitSlop={4} onPress={() => nav.navigate("Settings")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <SettingsIcon color={colors.text} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* kimlik kartı */}
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <PressableScale onPress={() => nav.navigate("Avatar")} accessibilityLabel={t("profile.edit_your_avatar")} style={softShadow(colors.primary, 10)}>
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
                <FlameIcon color={colors.streakText} size={16} /><Text variant="bodyStrong" color={colors.streakText}>{t("profile.days", { n: me.streak })}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
                <BoltIcon color={colors.primaryText} size={16} /><Text variant="bodyStrong" color={colors.primaryText}>{xpLabel} XP</Text>
              </View>
            </View>
          ) : null}
        </Card>

        {/*
          İKİ KARO, DÖRT DEĞİL. Profil kimliktir, ölçüm tablosu değil: öğrenilen
          kelime ve toplam süre Gelişim ekranında zaten duruyor ve burada birebir
          tekrar ediyorlardı. Kalan ikisi kimliğin parçası — seri "ne kadar
          düzenlisin", XP "ne kadar biriktirdin" der ve ikisi herkese açık
          profilde de görünür (bkz. lib/social/profile publicProfile).
        */}
        {me ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            <StatTile value={String(me.streak)} label={t("profile.day_streak")} color={colors.streak} colors={colors} />
            <StatTile value={String(me.xp).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} label={t("profile.total_xp")} color={colors.success} colors={colors} />
          </View>
        ) : (
          // Kısa "yükleniyor" kartı yerine ızgaranın kendi iskeleti: dört karo
          // gelince ekran iki satır boyu uzamıyor.
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md, marginBottom: spacing.lg }}>
            {[0, 1].map((i) => (
              <SkeletonCard key={i} style={{ width: gridItemWidth, gap: 2 }}>
                <SkeletonLine variant="h1" width="60%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </View>
        )}

        {/*
          Premium bandı MAĞAZADAN BAĞIMSIZ görünüyor.

          Eskiden `billingAvailable()` arkasındaydı ve gerekçesi "satın
          alınamayan şey vaat edilmez"di. Doğru bir kural ama yanlış yere
          uygulanmıştı: bant satın almaya değil, PAYWALL SAYFASINA götürüyor ve o
          sayfada mağazadan bağımsız çalışan iki şey var — promo kodu ve davet
          ödülü. İkisi de bugün premium olmanın gerçek yolu. Bant gizliyken o
          yollara hiçbir yerden ulaşılamıyordu; kullanıcı kazandığı ödülü
          bozduramıyordu.

          Vaat kuralı yerinde duruyor: satın alma DÜĞMESİ hâlâ yalnız mağaza
          canlıyken çiziliyor (PaywallScreen).
        */}
        {premium ? (
          <View style={{ borderRadius: radii.xl, backgroundColor: colors.successSoft, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
              <CrownIcon color="#fff" size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color={colors.successText}>{t("profile.premium_member")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("profile.all_features_unlocked_thank_you")}</Text>
            </View>
            <CheckIcon color={colors.success} size={22} />
          </View>
        ) : (
          <PressableScale onPress={() => nav.navigate("Paywall")} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
              <CrownIcon color="#fff" size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color="#fff">{t("profile.go_premium")}</Text>
              <Text variant="caption" color="#ffffffcc">{t("profile.unlimited_speaking_full_exam")}</Text>
            </View>
            <ChevronRightIcon color="#fff" size={22} />
          </PressableScale>
        )}

        {/*
          MENÜNÜN KURALI: burada duran şey ya KİMLİĞİN ya da BAŞKALARIYLA
          İLİŞKİN. Kendi ölçün Gelişim ekranında.

          Buradan taşınanlar: Kelimelerim (Gelişim'de "kelime ustalığı"
          kartının detayı), Yapabildiklerim (yeterlik ölçüsü), Yazılarım
          (değerlendirilmiş üretimin arşivi). Kaldırılanlar: "Avatarını
          düzenle" (avatarın kendisi zaten o ekranı açıyor) ve "Bildirimler"
          (içeriği ayar; Ayarlar → Uygulama'ya taşındı).

          Başarımlar KALIYOR çünkü rozet sayısı herkese açık profilde
          görünüyor: statü işareti, yani kimliğin parçası. Haftalık sıralama da
          kalıyor — o bir ölçüm değil, başkalarıyla kıyas.
        */}
        <Card padded style={{ paddingVertical: 0 }}>
          <MenuRow icon={TrophyIcon} label={t("profile.achievements")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Achievements")} />
          <MenuRow icon={PodiumIcon} label={t("profile.weekly_leaderboard")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Leaderboard")} />
          <MenuRow icon={HandshakeIcon} label={t("profile.friends")} tint={colors.success} colors={colors} onPress={() => goFriends(nav)} />
          <MenuRow icon={InboxIcon} label={t("profile.inbox")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Inbox")} />
          <MenuRow icon={ShareIcon} label={t("profile.invite_friend")} tint={colors.success} colors={colors} onPress={() => shareInvite(premiumStatus?.referral?.code)} last />
        </Card>

        {/*
          HESAPTAN ÇIKIŞ İKİLİSİ — en altta, birlikte.

          "Hesabı sil" Ayarlar'ın EN ÜSTÜNDEKİ hesap bölümünde, ad kutusunun
          hemen altında duruyordu: yıkıcı bir eylem, sık kullanılan bir alanın
          bir dokunuş yanında. Yeri burası çünkü (1) çıkış yap zaten burada ve
          ikisi aynı işin iki ucu, (2) yıkıcı eylem grubun SONUNDA durur,
          (3) mağaza kuralları (App Store 5.1.1(v), Play veri silme) "kolay
          bulunur" istiyor — profil sekmesinin dibi, ayarların ortasından daha
          kolay bulunur.
        */}
        <PressableScale onPress={() => setConfirmOut(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: spacing.lg, paddingVertical: spacing.md }}>
          <LogoutIcon color={colors.danger} size={20} />
          <Text variant="bodyStrong" color={colors.dangerText}>{t("profile.log_out")}</Text>
        </PressableScale>

        <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityLabel={t("settings.delete_account")} style={{ alignItems: "center", paddingVertical: spacing.sm }}>
          <Text variant="caption" color={colors.textMuted}>{t("settings.delete_account")}</Text>
        </PressableScale>
      </ScrollView>

      <ConfirmDialog
        visible={confirmOut}
        title={t("profile.log_out")}
        message={t("profile.signout_confirm")}
        confirmLabel={t("profile.signout")}
        cancelLabel={t("common.discard")}
        destructive
        onConfirm={reallySignOut}
        onCancel={() => setConfirmOut(false)}
      />
    </View>
  );
}
