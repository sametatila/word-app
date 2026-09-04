import React from "react";
import { t, targetLangName } from "../lib/i18n";
import { View, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Skeleton, SkeletonBar, SkeletonLine, textHeight } from "../ui/Skeleton";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BoltIcon, WalkIcon, ExamIcon, ArrowRightIcon, PodiumIcon, CrownIcon, QuizIcon, RepeatIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe, formatXp } from "../lib/useMe";
import { useUpdate } from "../lib/useUpdate";
import { useMicrophone } from "../lib/useMicrophone";
import { hasExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { Mascot } from "../ui/Mascot";
import { AppHeader } from "../ui/AppHeader";
import { DailyQuests } from "../ui/DailyQuests";
import { FriendPulse } from "../social/FriendPulse";
import { useTheme, spacing, radii, softShadow } from "../theme";

/** Alt aksiyon satırı — dil odaklı, sade. */
function ActionRow({ title, subtitle, tint, icon: Icon, onPress }: { title: string; subtitle: string; tint: string; icon: (p: { color: string; size: number }) => React.ReactElement; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <PressableScale onPress={onPress} style={{ marginBottom: spacing.md }}>
      <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
          <Icon color="#fff" size={24} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="h3">{title}</Text>
          <Text variant="caption" color={colors.textMuted}>{subtitle}</Text>
        </View>
        <ArrowRightIcon color={colors.textFaint} size={20} />
      </Card>
    </PressableScale>
  );
}

/** Öne çıkan kama döşemesi — plan: yürüyüş = manşet, sınav = painkiller. */
function WedgeTile({ title, pitch, tint, icon: Icon, onPress }: { title: string; pitch: string; tint: string; icon: (p: { color: string; size: number }) => React.ReactElement; onPress?: () => void }) {
  const { colors } = useTheme();
  return (
    <PressableScale onPress={onPress} style={{ flex: 1 }}>
      <Card padded style={{ minHeight: 132, borderColor: tint, borderWidth: 1.5, justifyContent: "space-between", gap: spacing.md }}>
        <View style={[{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 8)]}>
          <Icon color="#fff" size={24} />
        </View>
        <View>
          <Text variant="h3">{title}</Text>
          <Text variant="caption" color={colors.textMuted}>{pitch}</Text>
        </View>
      </Card>
    </PressableScale>
  );
}

export function LearnScreen() {
  const mic = useMicrophone();
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me, loading: meLoading } = useMe();
  const update = useUpdate();   // iOS'ta hep null (APK şeridi yok, bkz. lib/useUpdate)
  const greeting = user?.name ? t("learn.greeting_named", { name: user.name.split(" ")[0] }) : t("learn.greeting");
  // Sınav hazırlık yalnız sınavı olan kursta. İngilizce kursunda katalog boş
  // (bkz. data/exams.ts) — kart açık kalsaydı kullanıcıyı boş bir ekrana
  // götürür ve sınav vaadi diye o kursta karşılığı olmayan bir vaat verirdi.
  const exams = hasExams(currentCourseId());
  const level = me?.level ?? "A1";
  const mastered = me?.mastered ?? 0;
  const totalWords = me?.totalWords ?? 0;
  const streak = me?.streak ?? 0;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;
  const dailyGoal = me?.dailyGoal ?? 0;
  const reviewsToday = me?.reviewsToday ?? 0;
  const dueCount = me?.dueCount ?? 0;
  const newToday = me?.newToday ?? 0;
  const hasToday = me?.reviewsToday !== undefined; // canlı /api/me
  const goalPct = dailyGoal ? Math.min(100, Math.round((reviewsToday / dailyGoal) * 100)) : 0;

  return (
    <Screen>
      {update && (
        <PressableScale onPress={() => Linking.openURL(update.url)} style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.primarySoft, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: 12 }}>
            <BoltIcon color={colors.primary} size={20} />
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" color={colors.primary}>Yeni sürüm hazır · v{update.version}</Text>
              <Text variant="caption" color={colors.textMuted}>{t("learn.tap_to_download")}</Text>
            </View>
            <ArrowRightIcon color={colors.primary} size={18} />
          </View>
        </PressableScale>
      )}
      <AppHeader title={t("learn.learn", { lang: targetLangName() })} subtitle={greeting} />

      {/* GÜNLÜK TUR — dil-içerik öncelikli kahraman (fitness halkası değil) */}
      <PressableScale onPress={() => nav.navigate("Game")}>
        <View style={[{ borderRadius: radii.xl, overflow: "hidden", backgroundColor: colors.primary, marginBottom: spacing.xl }, softShadow(colors.primary, 14)]}>
          {/* Kısa rozetler — kartın sağ üstünde (tekrar / yeni) */}
          {hasToday && (dueCount > 0 || newToday > 0) && (
            <View style={{ position: "absolute", top: spacing.md, right: spacing.md, flexDirection: "row", gap: 6, zIndex: 2 }}>
              {dueCount > 0 && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#ffffff2e", borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 4 }}>
                  <RepeatIcon color="#fff" size={13} /><Text variant="micro" color="#fff">{dueCount} tekrar</Text>
                </View>
              )}
              {newToday > 0 && (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#ffffff2e", borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 4 }}>
                  <BoltIcon color="#fff" size={13} /><Text variant="micro" color="#fff">{newToday} yeni</Text>
                </View>
              )}
            </View>
          )}
          <View style={{ padding: spacing.xl, flexDirection: "row", alignItems: "flex-end", gap: spacing.md }}>
            <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: spacing.sm }}>
              <View style={{ width: 44, height: 44, borderRadius: radii.md, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
                <BoltIcon color="#fff" size={22} />
              </View>
              <Text variant="micro" color="#ffffffcc" style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("learn.daily_round")}</Text>
            </View>
            <Text variant="h1" color="#fff">{t("learn.practice_your_words")}</Text>
            <Text variant="body" color="#ffffffdd" style={{ marginTop: 4 }}>
              {t("learn.daily_pitch")}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: spacing.lg, backgroundColor: "#ffffff", borderRadius: radii.pill, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 11 }}>
              <Text variant="bodyStrong" color={colors.primary}>{t("common.start")}</Text>
              <ArrowRightIcon color={colors.primary} size={18} />
            </View>
            </View>
            <Mascot mood={streak > 0 ? "happy" : (me?.xp ?? 0) > 0 ? "sleep" : "wave"} size={66} />
          </View>
          {/* Hedef şeridi kahramanın İÇİNDE: veri gelmeden de aynı yeri kaplar,
              yoksa kart yükleme sonrası uzayıp altındaki her şeyi aşağı itiyordu. */}
          {meLoading ? (
            <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, marginTop: -spacing.sm }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Skeleton height={textHeight("micro")} width={78} radius={6} style={{ backgroundColor: "#ffffff40" }} />
                <Skeleton height={textHeight("micro")} width={40} radius={6} style={{ backgroundColor: "#ffffff40" }} />
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: "#ffffff40" }} />
            </View>
          ) : hasToday && dailyGoal > 0 ? (
            <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, marginTop: -spacing.sm }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text variant="micro" color="#ffffffdd">{t("learn.daily_goal")}</Text>
                <Text variant="micro" color="#ffffffdd">{reviewsToday}/{dailyGoal}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: "#ffffff40", overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.max(3, goalPct)}%`, backgroundColor: "#fff", borderRadius: 3 }} />
              </View>
            </View>
          ) : null}
        </View>
      </PressableScale>

      {/* dil ilerlemesi — sade satır (fitness metresi değil). Yalnız gerçek veri
          gelince; yoksa (misafir / uç henüz deploy değil) yanıltıcı 0 gösterme. */}
      {meLoading ? (
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <Skeleton height={textHeight("bodyStrong") + 8} width={44} radius={radii.sm} />
              <SkeletonLine variant="bodyStrong" width={150} />
            </View>
            <SkeletonLine variant="caption" width={56} />
          </View>
          <SkeletonBar height={8} />
        </Card>
      ) : me ? (
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 4 }}>
                <Text variant="bodyStrong" color={colors.primary}>{level}</Text>
              </View>
              <Text variant="bodyStrong">{t("learn.words_learned", { n: mastered })}</Text>
            </View>
            <Text variant="caption" color={colors.textMuted}>{formatXp(me.xp)} XP</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
          </View>
        </Card>
      ) : null}

      {/* GÜNÜN GÖREVLERİ — öne çıkanın ÜSTÜNDE, gömülü kutular (ayrı ekran yok) */}
      <DailyQuests />

      {/* Bu haftanın ortak görevi/daveti varsa tek satır nabız; yoksa hiç çizilmez. */}
      <FriendPulse />

      {/* ÖNE ÇIKAN — kama (plan): yürüyüş modu (farklılaştırıcı) + sınav hazırlık (painkiller) */}
      {mic || exams ? (
        <>
          <Text variant="h3" color={colors.textMuted} style={{ marginBottom: spacing.md, marginTop: spacing.sm }}>{t("learn.featured")}</Text>
          <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.xl }}>
            {mic ? <WedgeTile title={t("learn.walk_mode")} pitch={t("learn.walk_pitch")} tint={colors.accent} icon={WalkIcon} onPress={() => nav.navigate("Walk")} /> : null}
            {exams ? <WedgeTile title={t("learn.exam_prep")} pitch={t("learn.exam_pitch")} tint={colors.streak} icon={ExamIcon} onPress={() => nav.navigate("ExamPrep")} /> : null}
          </View>
        </>
      ) : null}

      {/* diğer öğrenme yolları */}
      <Text variant="h3" color={colors.textMuted} style={{ marginBottom: spacing.md }}>{t("learn.more")}</Text>
      <ActionRow title={t("learn.practice")} subtitle={t("learn.practice_one_game_with_your_own")} tint={colors.primary} icon={QuizIcon} onPress={() => nav.navigate("Practice")} />
      <ActionRow title={t("learn.daily_round_2")} subtitle={t("learn.same_challenge_for_everyone_get")} tint={colors.info} icon={PodiumIcon} onPress={() => nav.navigate("Daily")} />
      <ActionRow title={t("learn.weekly_quiz")} subtitle={t("learn.test_what_you_ve_learned_weekly")} tint={colors.success} icon={CrownIcon} onPress={() => nav.navigate("Weekly")} />
    </Screen>
  );
}
