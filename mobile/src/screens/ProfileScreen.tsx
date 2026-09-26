import React, { useState } from "react";
import { t, formatNumber } from "../lib/i18n";
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
import { ArrowBackIcon, ChevronRightIcon, FlameIcon, BoltIcon, TrophyIcon, LogoutIcon, CrownIcon, ShareIcon, SettingsIcon, PodiumIcon, HandshakeIcon, InboxIcon, SparkIcon } from "../ui/icons";
import { MyAvatar } from "../ui/Avatar";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { shareInvite } from "../lib/share";
import { useMe, formatXp } from "../lib/useMe";
import { usePremiumStatus } from "../lib/premium";
import { hasMockExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette, soft, ds } from "../theme";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useLayout } from "../lib/useLayout";
import { CardGrid } from "../ui/CardGrid";
import { GuestAccountCard } from "../ui/GuestAccountCard";

function StatTile({ value, label, color, colors }: { value: string; label: string; color: string; colors: Palette }) {
  return (
    <Card padded style={{ gap: 2 }}>
      <Text variant="h1" color={color}>{value}</Text>
      <Text variant="caption" color={colors.textMuted}>{label}</Text>
    </Card>
  );
}


export function ProfileScreen() {
  const { colors } = useTheme();
  const { gridColumns } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, signOut } = useAuth();
  const { me, loading: meLoading } = useMe();
  // Tam durum: davet kodu da buradan geliyor (paylaşım bağlantısı onu taşıyor).
  const { status: premiumStatus, loading: premiumLoading } = usePremiumStatus();
  const premium = !!premiumStatus?.premium;
  /* MİSAFİR (mağaza ön inceleme B24): adı ve e-postası yok; kimlik kartı
     "Misafir" diyor, kartın altında hesap oluşturma çağrısı duruyor. Hesapta
     adı yoksa e-posta adından türet. */
  const guest = Boolean(user?.guest);
  const displayName = guest ? t("guest.name") : user?.name?.trim() || user?.email?.split("@")[0] || t("profile.student");
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
        <Text accessibilityRole="header" variant="h2" style={{ flex: 1 }}>{t("profile.profile")}</Text>
        <PressableScale accessibilityLabel={t("settings.settings")} hitSlop={4} onPress={() => nav.navigate("Settings")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <SettingsIcon color={colors.text} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* kimlik kartı */}
        <Card style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <PressableScale onPress={() => nav.navigate("Avatar")} accessibilityLabel={t("profile.edit_your_avatar")} style={softShadow(colors.primary, 10)}>
            <MyAvatar userId={user?.id ?? ""} name={me?.name ?? null} serverAvatar={me?.avatar} size={ds(76)} />
          </PressableScale>
          <Text variant="h2" style={{ marginTop: spacing.md }}>{displayName}</Text>
          <Text variant="caption" color={colors.textMuted}>{guest ? t("guest.subline") : user?.email ?? t("profile.not_signed_in")}</Text>
          {/* Rozetler yüklenmeden de yerini tutar: sonradan belirince kimlik
              kartı uzayıp altındaki her şeyi aşağı itmesin. */}
          {meLoading ? (
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <SkeletonPill width={104} height={textHeight("bodyStrong") + 12} />
              <SkeletonPill width={96} height={textHeight("bodyStrong") + 12} />
            </View>
          ) : me ? (
            <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.md }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: soft(colors.streak), borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
                <FlameIcon color={colors.streakText} size={16} /><Text variant="bodyStrong" color={colors.streakText}>{t("profile.days", { n: me.streak })}</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
                <BoltIcon color={colors.primaryText} size={16} /><Text variant="bodyStrong" color={colors.primaryText}>{xpLabel} XP</Text>
              </View>
            </View>
          ) : null}
        </Card>

        {/* Misafir: ilerlemenin hesapta durması için tek çağrı (bkz. ui/GuestAccountCard). */}
        {guest ? (
          <View style={{ marginBottom: spacing.lg }}>
            <GuestAccountCard icon={SparkIcon} title={t("guest.profile_title")} text={t("guest.profile_body")} />
          </View>
        ) : null}

        {/*
          İKİ KARO, DÖRT DEĞİL. Profil kimliktir, ölçüm tablosu değil: öğrenilen
          kelime ve toplam süre Gelişim ekranında zaten duruyor ve burada birebir
          tekrar ediyorlardı. Kalan ikisi kimliğin parçası — seri "ne kadar
          düzenlisin", XP "ne kadar biriktirdin" der ve ikisi herkese açık
          profilde de görünür (bkz. lib/social/profile publicProfile).

          Binlik ayracı SÖZLÜKTEN (`formatNumber`). Burada elle yazılmış bir
          düzenli ifade vardı ve ayracı "." olarak KODA GÖMÜYORDU: İngilizce
          arayüzde de "1.240" çıkıyordu. Aynı karo kişi profilinde
          (UserScreen `StatTile`) ve webin iki profil karosunda zaten
          `formatNumber` kullanıyor.
        */}
        {/*
          ÜÇ HÂL, İKİ DEĞİL. Izgara yalnız `me`ye bakıyordu: okuma patlayınca
          (`me` null, `loading` bitmiş) iki karo SONSUZA KADAR iskelet
          çiziyordu. Aynı dosyanın on beş satır yukarısındaki rozetleri
          `meLoading ? iskelet : me ? rozet : null` ile doğru yazılmıştı —
          aynı ekranda iki ayrı kalıp. Izgara da ona çekildi: sayı yoksa karo
          hiç çizilmiyor, kimlik kartı ve menü satırları yerinde kalıyor
          (bkz. Gelişim ekranı, §321 — orada ekranın TAMAMI sayıya bağlı
          olduğu için hata kartı çiziliyor).
        */}
        {meLoading ? (
          // Kısa "yükleniyor" kartı yerine ızgaranın kendi iskeleti: iki karo
          // gelince ekran bir satır boyu uzamıyor.
          <CardGrid columns={gridColumns} balance style={{ marginBottom: spacing.lg }}>
            {[0, 1].map((i) => (
              <SkeletonCard key={i} style={{ gap: 2 }}>
                <SkeletonLine variant="h1" width="60%" />
                <SkeletonLine variant="caption" width="85%" />
              </SkeletonCard>
            ))}
          </CardGrid>
        ) : me ? (
          <CardGrid columns={gridColumns} balance style={{ marginBottom: spacing.lg }}>
            <StatTile value={String(me.streak)} label={t("profile.day_streak")} color={colors.streakText} colors={colors} />
            <StatTile value={formatNumber(me.xp)} label={t("profile.total_xp")} color={colors.successText} colors={colors} />
          </CardGrid>
        ) : null}

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
        {/*
          PREMIUM ÜYEYE "PREMIUM OL" GÖSTERİLMEZ. Bant yalnız `premium`
          değerine bakıyordu, o da durum inene kadar false: soğuk açılışta
          premium üye kendi profilinde bir an mavi "Premium ol" çağrısını
          görüyor, sonra yeşil "Premium üye" bandına dönüyordu (durum bir kez
          indikten sonra modülde önbellekli, yani hata yalnız ilk açılışta
          görünüyor ve gözden kaçıyor). İki bant da aynı yükseklikte, iskelet
          de öyle: bant yerine oturunca altındaki menü kaymıyor.
        */}
        {premiumLoading && !premiumStatus ? (
          <SkeletonCard style={{ borderRadius: radii.xl, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
            <SkeletonTile size={46} radius={radii.md} />
            <View style={{ flex: 1 }}>
              <SkeletonLine variant="h3" width="46%" />
              <SkeletonLine variant="caption" width="78%" />
            </View>
          </SkeletonCard>
        ) : premium ? (
          /* DOKUNULABİLİR. Eskiden düz bir View'du ve premium kullanıcının
             paywall'a giden başka yolu yoktu (kilit ekranları premium'da
             çıkmıyor): abone "Aboneliği yönet"e, inceleme hesabı da (premium)
             satın alma ekranına uygulama içinden ulaşamıyordu. Paywall'ın
             premium dalı durumu, bitiş tarihini ve yönetim bağlantısını gösteriyor. */
          <PressableScale onPress={() => nav.navigate("Paywall")} style={{ borderRadius: radii.xl, backgroundColor: colors.successSoft, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
              <CrownIcon color={colors.onFill} size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color={colors.successText}>{t("profile.premium_member")}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("profile.all_features_unlocked_thank_you")}</Text>
            </View>
            <ChevronRightIcon color={colors.successText} size={22} />
          </PressableScale>
        ) : (
          <PressableScale onPress={() => nav.navigate("Paywall")} style={[{ borderRadius: radii.xl, backgroundColor: colors.primary, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.lg }, softShadow(colors.primary, 10)]}>
            <View style={{ width: 46, height: 46, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: "#ffffff2e" }}>
              <CrownIcon color="#fff" size={26} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="h3" color="#fff">{t("profile.go_premium")}</Text>
              {/* "Sınırsız" değil, gerçek kapsam: premium'un adil kullanım tavanı var (paywall'da yazılı). */}
              <Text variant="caption" color="#ffffffcc">{t(hasMockExams(currentCourseId()) ? "profile.premium_band_exams" : "profile.premium_band")}</Text>
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
        {/* Misafirde yalnız rozetler: sıralama, arkadaşlar, gelen kutusu ve davet
            hesap istiyor ve kimlik kartının altındaki çağrı bunu zaten söylüyor. */}
        <Card padded style={{ paddingVertical: 0 }}>
          <MenuRow icon={TrophyIcon} label={t("profile.achievements")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Achievements")} last={guest} />
          {!guest && (
            <>
              <MenuRow icon={PodiumIcon} label={t("profile.weekly_leaderboard")} tint={colors.info} colors={colors} onPress={() => nav.navigate("Leaderboard")} />
              <MenuRow icon={HandshakeIcon} label={t("profile.friends")} tint={colors.success} colors={colors} onPress={() => goFriends(nav)} />
              <MenuRow icon={InboxIcon} label={t("profile.inbox")} tint={colors.streak} colors={colors} onPress={() => nav.navigate("Inbox")} />
              <MenuRow icon={ShareIcon} label={t("profile.invite_friend")} tint={colors.success} colors={colors} onPress={() => shareInvite(premiumStatus?.referral?.code)} last />
            </>
          )}
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

          İKİNCİ KAPI AYARLAR › HESAP'TA (2026-09-14). Buradaki bağlantı tek
          başına kalınca bütün metinlerin anlattığı yol ("Profil › Ayarlar ›
          Hesap › Hesabı sil") boşa düşmüştü; satır orada grubun sonuna geri
          kondu. İkisi aynı ekranı açıyor.
        */}
        {/* MİSAFİRİN ÇIKIŞI YOK: giriş yöntemi olmadığı için geri dönemez. Yerine
            "Misafir verilerini sil" var — hesap silmenin misafirdeki karşılığı,
            aynı ekran (bkz. DeleteAccountScreen). */}
        {guest ? (
          <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityLabel={t("guest.delete_row")} style={{ alignItems: "center", marginTop: spacing.lg, paddingVertical: spacing.md }}>
            <Text variant="bodyStrong" color={colors.dangerText}>{t("guest.delete_row")}</Text>
          </PressableScale>
        ) : (
          <>
            <PressableScale onPress={() => setConfirmOut(true)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.sm, marginTop: spacing.lg, paddingVertical: spacing.md }}>
              <LogoutIcon color={colors.dangerText} size={20} />
              <Text variant="bodyStrong" color={colors.dangerText}>{t("profile.log_out")}</Text>
            </PressableScale>

            <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityLabel={t("settings.delete_account")} style={{ alignItems: "center", paddingVertical: spacing.sm }}>
              <Text variant="caption" color={colors.textMuted}>{t("settings.delete_account")}</Text>
            </PressableScale>
          </>
        )}
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
