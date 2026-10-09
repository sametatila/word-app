import React, { useEffect, useState } from "react";
import { t, formatNumber } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { SettingsIcon, AccountIcon, BackIcon, ChevronNextIcon, CorrectIcon, EditIcon, MyWordsIcon, MyWritingsIcon, PremiumIcon, StreakIcon } from "../ui/icons";
import { AvatarStage, derivedAvatar } from "../ui/Avatar";
import { Skeleton, SkeletonLine } from "../ui/Skeleton";
import { AchievementIcon } from "../ui/achievementIcon";
import { useAuth } from "../lib/AuthContext";
import { useMe } from "../lib/useMe";
import { useAvatar, parseAvatar } from "../lib/avatar";
import { usePremiumStatus } from "../lib/premium";
import { hasMockExams } from "../data/exams";
import { currentCourseId, courseOrDefault } from "../lib/courses";
import { currentLang } from "../lib/i18n";
import { api } from "../api/client";
import { social, tierName, type LeagueView } from "../api/social";
import type { Achievement } from "../data/achievements";
import { useTheme, spacing, radii, softShadow, cardShadow, TIER_COLOR, type Palette } from "../theme";
import { GuestAccountCard } from "../ui/GuestAccountCard";
import { ReferralCard } from "../ui/ReferralCard";

/**
 * PROFİL — "sen" ekranı (2026-09-28, Samet'in kararı; taslak F2,
 * `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Üstte SAHNE: kullanıcının avatar arka planı ve büyük Nomi (3B katalog
 * açıkken göğüsten yukarı katmanlar, kapalıyken 2B daire; bkz. ui/Avatar
 * `AvatarStage`). İçerik sahnenin üstüne bir kâğıt gibi biniyor.
 *
 * Yalnız "sen": ad ve "Avatarı düzenle", seri · XP · lig sırası tek satırda,
 * Gelişim (Kelimelerim, Yapabildiklerim, Yazılarım), son başarımlar, Premium.
 *
 * KALKANLAR ve yeni yerleri: Bildirimler (başlıktaki zil), Arkadaşlar ve
 * haftalık lig (Topluluk sekmesi), davet (Topluluk), Çıkış yap ve Hesabı sil
 * (Ayarlar). Profilde başlıkta zaten olan bir şey tekrar edilmiyor.
 */
type Board = { rows: Achievement[]; unlockedCount: number; total: number };

/*
 * SON BAŞARIM TAHTASI BELLEKTE (kullanıcı başına). Satır sunucu cevabından
 * sonra araya giriyor ve altındaki Premium kartını, daveti ve silme satırını
 * ~90 dp aşağı itiyordu (QA F-0070 sınıfı). Artık profile ikinci girişte
 * hemen çiziliyor (arkada tazeleniyor); ilk girişte yeri iskelet tutuyor.
 */
let lastBoard: { uid: string; board: Board } | null = null;

export function ProfileScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me, loading: meLoading } = useMe();
  const { status: premiumStatus } = usePremiumStatus();
  const premium = !!premiumStatus?.premium;
  const guest = Boolean(user?.guest);
  const local = useAvatar();
  const cfg = local ?? parseAvatar(me?.avatar) ?? derivedAvatar(user?.id ?? "?");
  const displayName = guest ? t("guest.name") : me?.name?.trim() || user?.name?.trim() || user?.email?.split("@")[0] || t("profile.student");

  const [username, setUsername] = useState<string | null>(null);
  const [league, setLeague] = useState<LeagueView | null>(null);
  const [board, setBoard] = useState<Board | null>(() => (user && lastBoard?.uid === user.id ? lastBoard.board : null));
  const [boardFailed, setBoardFailed] = useState(false);
  useEffect(() => {
    if (!user || guest) return;
    let alive = true;
    social.me().then((m) => { if (alive) setUsername(m.username); }).catch(() => {});
    social.league().then((l) => { if (alive) setLeague(l); }).catch(() => {});
    return () => { alive = false; };
  }, [user, guest]);
  useEffect(() => {
    if (!user) return;
    let alive = true;
    api<Partial<Board>>("/api/achievements")
      .then((d) => {
        if (!(Array.isArray(d?.rows) && typeof d.total === "number" && typeof d.unlockedCount === "number")) throw new Error("board");
        const b = { rows: d.rows, unlockedCount: d.unlockedCount, total: d.total };
        lastBoard = { uid: user.id, board: b };
        if (alive) setBoard(b);
      })
      .catch(() => { if (alive) setBoardFailed(true); });
    return () => { alive = false; };
  }, [user]);

  const course = courseOrDefault(me?.course ?? currentCourseId()).label[currentLang()];
  const sub = [username ? `@${username}` : null, me ? `${course} · ${me.level}` : null].filter(Boolean).join(" · ");
  const myRank = league?.rows.find((r) => r.isMe)?.rank ?? null;
  const recent = (board?.rows ?? []).filter((a) => a.unlocked).sort((a, b) => String(b.unlockedAt ?? "").localeCompare(String(a.unlockedAt ?? ""))).slice(0, 3);
  const goLeague = () => nav.navigate("Tabs", { screen: "Friends", params: { tab: "league" } });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <AvatarStage config={cfg} height={300 + insets.top} inset={28}>
          <View style={{ position: "absolute", top: insets.top + spacing.sm, left: spacing.lg, right: spacing.lg, flexDirection: "row", justifyContent: "space-between" }}>
            <StageButton label={t("common.back")} onPress={() => (nav.canGoBack() ? nav.goBack() : nav.navigate("Tabs"))}><BackIcon color={colors.text} size={22} /></StageButton>
            <StageButton label={t("settings.settings")} onPress={() => nav.navigate("Settings")}><SettingsIcon color={colors.text} size={22} /></StageButton>
          </View>
        </AvatarStage>

        {/* KÂĞIT — sahnenin üstüne biniyor; köşeleri yuvarlak, zemin sayfanın zemini. */}
        <View style={{ marginTop: -28, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, backgroundColor: colors.bg, paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text accessibilityRole="header" variant="h1" numberOfLines={1}>{displayName}</Text>
              {sub ? <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{sub}</Text> : meLoading ? <SkeletonLine variant="caption" width={160} /> : null}
            </View>
            <PressableScale onPress={() => nav.navigate("Avatar")} accessibilityRole="button" accessibilityLabel={t("profile.edit_avatar")} style={[{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primary, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }, softShadow(colors.primary, 8)]}>
              <EditIcon color={colors.onPrimary} size={16} />
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("profile.edit_avatar")}</Text>
            </PressableScale>
          </View>

          {/* SERİ · XP · LİG — tek kart, üç sütun. Lig sütunu Topluluk › Lig'i açıyor. */}
          <View style={[{ flexDirection: "row", backgroundColor: colors.surface, borderRadius: radii.xl, borderWidth: 1, borderColor: colors.hairline }, cardShadow(colors, 8)]}>
            <Stat value={me ? String(me.streak) : meLoading ? null : "–"} label={t("profile.day_streak")} icon={<StreakIcon color={colors.streakText} size={18} />} colors={colors} />
            <Stat value={me ? formatNumber(me.xp) : meLoading ? null : "–"} label={t("profile.total_xp")} colors={colors} divider />
            {guest ? null : (
              <PressableScale onPress={goLeague} accessibilityRole="button" accessibilityLabel={league ? `${tierName(league.tier)}, ${myRank ?? "–"}` : t("leaderboard.league")} style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderLeftWidth: 1, borderLeftColor: colors.hairline }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <View style={{ width: 14, height: 16, borderTopLeftRadius: 4, borderTopRightRadius: 4, borderBottomLeftRadius: 8, borderBottomRightRadius: 8, backgroundColor: TIER_COLOR.gold }} />
                  <Text variant="h2">{myRank ? `${myRank}.` : "–"}</Text>
                </View>
                <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{league ? tierName(league.tier) : t("leaderboard.league")}</Text>
              </PressableScale>
            )}
          </View>

          {guest ? <GuestAccountCard icon={AccountIcon} title={t("guest.profile_title")} text={t("guest.profile_body")} /> : null}

          {/* GELİŞİM — seri 0 olunca alev kayboluyordu ve buraya giden tek yol oydu. */}
          <View style={{ gap: spacing.sm }}>
            <Head title={t("appheader.progress")} action={t("profile.see_all")} onAction={() => nav.navigate("Progress")} colors={colors} />
            <View style={{ flexDirection: "row", gap: spacing.sm }}>
              <Tile icon={<MyWordsIcon color={colors.primaryText} size={18} />} value={me ? formatNumber(me.mastered) : meLoading ? null : "–"} label={t("profile.my_words")} onPress={() => nav.navigate("Words")} colors={colors} />
              <Tile icon={<CorrectIcon color={colors.primaryText} size={18} />} label={t("profile.what_can_i_do")} onPress={() => nav.navigate("Cando")} colors={colors} />
              <Tile icon={<MyWritingsIcon color={colors.primaryText} size={18} />} label={t("profile.my_posts")} onPress={() => nav.navigate("Writings")} colors={colors} />
            </View>
          </View>

          {/* SON BAŞARIMLAR — en yeni üç; hiç yoksa kart yok, "Tümü" duruyor. Her
              rozet duvarı KENDİSİNE kaydırarak açıyor (`focus`), başına değil. */}
          <View style={{ gap: spacing.sm }}>
            <Head title={t("profile.achievements")} action={board ? `${board.unlockedCount}/${board.total}` : t("profile.see_all")} onAction={() => nav.navigate("Achievements")} colors={colors} />
            {!board && !boardFailed ? (
              <View accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={{ flexDirection: "row", gap: spacing.sm }}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={{ flex: 1, alignItems: "center", gap: 6 }}>
                    <Skeleton height={56} width={56} radius={28} />
                    <SkeletonLine variant="micro" width="70%" />
                  </View>
                ))}
              </View>
            ) : recent.length ? (
              <View style={{ flexDirection: "row", gap: spacing.sm }}>
                {recent.map((a) => (
                  <PressableScale key={a.id} onPress={() => nav.navigate("Achievements", { focus: a.id })} accessibilityLabel={a.title} style={{ flex: 1, alignItems: "center", gap: 6 }}>
                    <View style={{ width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", backgroundColor: TIER_COLOR[a.tier] }}>
                      <AchievementIcon glyph={a.glyph} color="#fff" size={26} />
                    </View>
                    <Text variant="micro" color={colors.textMuted} numberOfLines={2} style={{ textAlign: "center" }}>{a.title}</Text>
                  </PressableScale>
                ))}
              </View>
            ) : null}
          </View>

          {/* PREMIUM — üyeye abonelik satırı (yönetim Paywall'da), olmayana tek kart. */}
          {premium ? (
            <PressableScale onPress={() => nav.navigate("Paywall")} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline }}>
              <PremiumIcon color={colors.streakText} size={22} />
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("profile.premium_member")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("profile.all_features_unlocked_thank_you")}</Text>
              </View>
              <ChevronNextIcon color={colors.textFaint} size={20} />
            </PressableScale>
          ) : premiumStatus ? (
            <PressableScale onPress={() => nav.navigate("Paywall")} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.primary, borderRadius: radii.xl, padding: spacing.lg }, softShadow(colors.primary, 10)]}>
              <PremiumIcon color={colors.onPrimary} size={24} />
              <View style={{ flex: 1 }}>
                <Text variant="h3" color={colors.onPrimary}>{t("profile.go_premium")}</Text>
                <Text variant="caption" color={colors.onPrimary} style={{ opacity: 0.85 }}>{t(hasMockExams(currentCourseId()) ? "profile.premium_band_exams" : "profile.premium_band")}</Text>
              </View>
              <ChevronNextIcon color={colors.onPrimary} size={22} />
            </PressableScale>
          ) : null}

          {/* DAVET Premium ekranından buraya taşındı (paywall yeniden tasarımı,
              2026-09-29): karşılığı arkadaşlık bağı, satın almayla ilgisi yok.
              Misafirde sunucu kod üretmiyor (`referral` null). */}
          {premiumStatus?.referral && !guest ? <ReferralCard referral={premiumStatus.referral} /> : null}

          {/* MİSAFİR SİLME YOLU PROFİLDE (mağaza ön inceleme B24). Gizlilik §11,
              şartlar, destek sayfası ve inceleme notları üç dilde "Profil › Misafir
              verilerini sil" diyor; profil yeniden çizilince (3e90264ea) satır
              yalnız Ayarlar'ın dibinde kalmıştı ve inceleyici notu izleyip
              bulamazdı. Kapı `test:legal`. */}
          {guest ? (
            <PressableScale onPress={() => nav.navigate("DeleteAccount")} accessibilityLabel={t("guest.delete_row")} accessibilityRole="button" style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" color={colors.dangerText}>{t("guest.delete_row")}</Text>
            </PressableScale>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

/** Sahnenin üstündeki yuvarlak düğme — zemin yarı saydam yüzey, arka plan ne olursa okunur. */
function StageButton({ label, onPress, children }: { label: string; onPress: () => void; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <PressableScale hitSlop={4} onPress={onPress} accessibilityLabel={label} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface }}>
      {children}
    </PressableScale>
  );
}

function Stat({ value, label, icon, colors, divider }: { value: string | null; label: string; icon?: React.ReactNode; colors: Palette; divider?: boolean }) {
  return (
    <View style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderLeftWidth: divider ? 1 : 0, borderLeftColor: colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
        {icon}
        {value === null ? <SkeletonLine variant="h2" width={40} /> : <Text variant="h2">{value}</Text>}
      </View>
      <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{label}</Text>
    </View>
  );
}

function Head({ title, action, onAction, colors }: { title: string; action: string; onAction: () => void; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingHorizontal: spacing.xs }}>
      <Text accessibilityRole="header" variant="h3">{title}</Text>
      <PressableScale onPress={onAction} hitSlop={8} accessibilityRole="button">
        <Text variant="bodyStrong" color={colors.primaryText}>{action} ›</Text>
      </PressableScale>
    </View>
  );
}

function Tile({ icon, value, label, onPress, colors }: { icon: React.ReactNode; value?: string | null; label: string; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} accessibilityRole="button" accessibilityLabel={value ? `${label}, ${value}` : label} style={{ flex: 1 }}>
      <Card padded style={{ gap: 6, minHeight: 96, padding: spacing.md }}>
        <View style={{ width: 30, height: 30, borderRadius: radii.sm, alignItems: "center", justifyContent: "center", backgroundColor: colors.primarySoft }}>{icon}</View>
        {value !== undefined ? (value === null ? <SkeletonLine variant="h3" width={36} /> : <Text variant="h3">{value}</Text>) : null}
        <Text variant="caption" color={colors.textMuted} numberOfLines={2}>{label}</Text>
      </Card>
    </PressableScale>
  );
}
