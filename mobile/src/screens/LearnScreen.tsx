import React from "react";
import { View, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BoltIcon, WalkIcon, ExamIcon, ArrowRightIcon, PodiumIcon, CrownIcon, QuizIcon, RepeatIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe, formatXp } from "../lib/useMe";
import { useUpdate } from "../lib/useUpdate";
import { Mascot } from "../ui/Mascot";
import { AppHeader } from "../ui/AppHeader";
import { DailyQuests } from "../ui/DailyQuests";
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
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me } = useMe();
  const update = useUpdate();
  const greeting = user?.name ? `Merhaba ${user.name.split(" ")[0]}` : "Merhaba";
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
              <Text variant="caption" color={colors.textMuted}>İndirmek için dokun</Text>
            </View>
            <ArrowRightIcon color={colors.primary} size={18} />
          </View>
        </PressableScale>
      )}
      <AppHeader title="Almanca öğren" subtitle={greeting} />

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
              <View style={{ width: 40, height: 40, borderRadius: radii.md, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
                <BoltIcon color="#fff" size={22} />
              </View>
              <Text variant="micro" color="#ffffffcc" style={{ textTransform: "uppercase", letterSpacing: 1 }}>Günlük tur</Text>
            </View>
            <Text variant="h1" color="#fff">Kelimelerini çalış</Text>
            <Text variant="body" color="#ffffffdd" style={{ marginTop: 4 }}>
              Tekrar zamanı gelenleri pekiştir, yeni kelimeler öğren.
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: spacing.lg, backgroundColor: "#ffffff", borderRadius: radii.pill, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 11 }}>
              <Text variant="bodyStrong" color={colors.primary}>Başla</Text>
              <ArrowRightIcon color={colors.primary} size={18} />
            </View>
            </View>
            <Mascot mood={streak > 0 ? "happy" : (me?.xp ?? 0) > 0 ? "sleep" : "wave"} size={66} />
          </View>
          {hasToday && dailyGoal > 0 && (
            <View style={{ paddingHorizontal: spacing.xl, paddingBottom: spacing.lg, marginTop: -spacing.sm }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text variant="micro" color="#ffffffdd">Günlük hedef</Text>
                <Text variant="micro" color="#ffffffdd">{reviewsToday}/{dailyGoal}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: "#ffffff40", overflow: "hidden" }}>
                <View style={{ height: "100%", width: `${Math.max(3, goalPct)}%`, backgroundColor: "#fff", borderRadius: 3 }} />
              </View>
            </View>
          )}
        </View>
      </PressableScale>

      {/* dil ilerlemesi — sade satır (fitness metresi değil). Yalnız gerçek veri
          gelince; yoksa (misafir / uç henüz deploy değil) yanıltıcı 0 gösterme. */}
      {me && (
        <Card style={{ marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <View style={{ backgroundColor: colors.primarySoft, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 4 }}>
                <Text variant="bodyStrong" color={colors.primary}>{level}</Text>
              </View>
              <Text variant="bodyStrong">{mastered} kelime öğrenildi</Text>
            </View>
            <Text variant="caption" color={colors.textMuted}>{formatXp(me.xp)} XP</Text>
          </View>
          <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
          </View>
        </Card>
      )}

      {/* GÜNÜN GÖREVLERİ — öne çıkanın ÜSTÜNDE, gömülü kutular (ayrı ekran yok) */}
      <DailyQuests />

      {/* ÖNE ÇIKAN — kama (plan): yürüyüş modu (farklılaştırıcı) + sınav hazırlık (painkiller) */}
      <Text variant="h3" color={colors.textMuted} style={{ marginBottom: spacing.md, marginTop: spacing.sm }}>Öne çıkan</Text>
      <View style={{ flexDirection: "row", gap: spacing.md, marginBottom: spacing.xl }}>
        <WedgeTile title="Yürüyüş modu" pitch="Kulakla öğren, yürürken çalış" tint={colors.accent} icon={WalkIcon} onPress={() => nav.navigate("Walk")} />
        <WedgeTile title="Sınav hazırlık" pitch="Goethe & telc — hedefe yönelik" tint={colors.streak} icon={ExamIcon} onPress={() => nav.navigate("ExamPrep")} />
      </View>

      {/* diğer öğrenme yolları */}
      <Text variant="h3" color={colors.textMuted} style={{ marginBottom: spacing.md }}>Daha fazlası</Text>
      <ActionRow title="Pratik" subtitle="Tek bir oyunu kendi kelimelerinle çalış" tint={colors.primary} icon={QuizIcon} onPress={() => nav.navigate("Practice")} />
      <ActionRow title="Günün turu" subtitle="Herkesle aynı yarışma · sıralamaya gir" tint={colors.info} icon={PodiumIcon} onPress={() => nav.navigate("Daily")} />
      <ActionRow title="Haftalık sınav" subtitle="Öğrendiklerini ölç · haftada bir" tint={colors.success} icon={CrownIcon} onPress={() => nav.navigate("Weekly")} />
    </Screen>
  );
}
