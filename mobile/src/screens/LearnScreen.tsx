import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, BoltIcon, WalkIcon, ExamIcon, ArrowRightIcon, PodiumIcon, CrownIcon, QuizIcon, CheckIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe, formatXp } from "../lib/useMe";
import { Mascot } from "../ui/Mascot";
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

export function LearnScreen() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user } = useAuth();
  const { me } = useMe();
  const initial = ((user?.name ?? "Öğrenci").trim()[0] ?? "Ö").toUpperCase();
  const greeting = user?.name ? `Merhaba ${user.name.split(" ")[0]}` : "Merhaba";
  const level = me?.level ?? "A1";
  const mastered = me?.mastered ?? 0;
  const totalWords = me?.totalWords ?? 0;
  const streak = me?.streak ?? 0;
  const pct = totalWords ? Math.min(100, Math.round((mastered / totalWords) * 100)) : 0;

  return (
    <Screen>
      {/* başlık */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg }}>
        <View>
          <Text variant="caption" color={colors.textMuted}>{greeting}</Text>
          <Text variant="display">Almanca öğren</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          {streak > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: colors.streak + "22", borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 8 }}>
              <FlameIcon color={colors.streak} size={16} /><Text variant="bodyStrong" color={colors.streak}>{streak}</Text>
            </View>
          )}
          <PressableScale onPress={() => nav.navigate("Profile")} style={[{ width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 6)]}>
            <Text variant="h3" color="#fff">{initial}</Text>
          </PressableScale>
        </View>
      </View>

      {/* GÜNLÜK TUR — dil-içerik öncelikli kahraman (fitness halkası değil) */}
      <PressableScale onPress={() => nav.navigate("Game")}>
        <View style={[{ borderRadius: radii.xl, overflow: "hidden", backgroundColor: colors.primary, marginBottom: spacing.xl }, softShadow(colors.primary, 14)]}>
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
            <Mascot mood="wave" size={66} />
          </View>
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

      {/* diğer öğrenme yolları */}
      <Text variant="h3" color={colors.textMuted} style={{ marginBottom: spacing.md }}>Daha fazlası</Text>
      <ActionRow title="Pratik" subtitle="Tek bir oyunu kendi kelimelerinle çalış" tint={colors.primary} icon={QuizIcon} onPress={() => nav.navigate("Practice")} />
      <ActionRow title="Günün turu" subtitle="Herkesle aynı yarışma · sıralamaya gir" tint={colors.info} icon={PodiumIcon} onPress={() => nav.navigate("Daily")} />
      <ActionRow title="Haftalık sınav" subtitle="Öğrendiklerini ölç · haftada bir" tint={colors.success} icon={CrownIcon} onPress={() => nav.navigate("Weekly")} />
      <ActionRow title="Günün görevleri" subtitle="Günlük hedefler · XP kazan" tint={colors.streak} icon={CheckIcon} onPress={() => nav.navigate("Quests")} />
      <ActionRow title="Yürüyüş modu" subtitle="Kulakla öğren, ellerin serbest" tint={colors.accent} icon={WalkIcon} onPress={() => nav.navigate("Walk")} />
      <ActionRow title="Sınav hazırlık" subtitle="Goethe & telc — hedefe yönelik" tint={colors.streak} icon={ExamIcon} onPress={() => nav.navigate("ExamPrep")} />
    </Screen>
  );
}
