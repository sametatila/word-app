import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon } from "../ui/icons";
import { SkeletonLine } from "../ui/Skeleton";
import { useMe } from "../lib/useMe";
import { currentCourseId } from "../lib/courses";
import { mockPapersFor, partPoints, type MockPaper } from "../data/exams";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii } from "../theme";

/**
 * Deneme sınavları.
 *
 * Ekran eskiden "Sınav hazırlık"tı ve başka yerlerin içeriğini tekrar
 * ediyordu: Lesen/Hören/Schreiben modülleri Beceriler sekmesindeki
 * egzersizlerdi, seviye ve modül kâğıtları ise Patika türevi sınavlardı.
 * İkisi de kaldırıldı.
 *
 * Burası artık yalnız DENEME SINAVI listeliyor: elle yazılmış, kendi başına
 * duran kâğıtlar. Liste seviyeye göre süzülüyor; kâğıt BÖLÜM BÖLÜM açılıyor,
 * çünkü bir kâğıt 80 ile 205 dakika arasında sürüyor ve tek oturumda
 * çözülecek bir şey değil. Gerçek sınavlar da modüler: bölümler ayrı ayrı
 * alınabiliyor.
 *
 * Öğren sekmesindeki kapı, liste boş olsa bile açık: kursun sınav kataloğu
 * varsa kutucuk çiziliyor. Liste boşken bu ekran uydurma bir satır ya da
 * "yakında" göstermiyor, olduğu gibi söylüyor — o seviyede henüz sınav yok.
 */
export function MockExamsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { me, loading: meLoading } = useMe();
  // Misafirde yerleştirme sınavının belirlediği seviye (prefs); yoksa A1.
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  const level = me?.level ?? guestLevel ?? "A1";
  // Liste seviyeye bağlı: seviye kesinleşmeden çizilirse sonradan uzayıp
  // kısalıyor. Kesinleşene dek aynı boyda iskelet durur.
  const levelReady = !meLoading && (!!me || prefsRead);
  const overallPct = me && me.totalWords ? Math.min(100, Math.round((me.mastered / me.totalWords) * 100)) : null;

  const papers = mockPapersFor(currentCourseId(), level);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2" style={{ flex: 1 }}>{t("mockexams.title")}</Text>
        <PressableScale
          onPress={() => nav.navigate("MockStats")}
          accessibilityLabel={t("mockexams.stats")}
          style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.surface2 }}
        >
          <Text variant="micro" color={colors.textMuted}>{t("mockexams.stats")}</Text>
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text variant="micro" color={colors.textMuted}>{t("mockexams.level")}</Text>
              <Text variant="h1" color={colors.primary}>{level}</Text>
            </View>
            {meLoading ? (
              <View style={{ alignItems: "flex-end" }}>
                <SkeletonLine variant="micro" width={92} />
                <SkeletonLine variant="h1" width={56} />
              </View>
            ) : overallPct !== null ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text variant="micro" color={colors.textMuted}>{t("mockexams.word_coverage")}</Text>
                <Text variant="h1">%{overallPct}</Text>
              </View>
            ) : null}
          </View>
        </Card>

        {!levelReady ? (
          <Card padded>
            <SkeletonLine variant="h3" width={140} />
            <SkeletonLine variant="caption" width="70%" />
          </Card>
        ) : papers.length ? (
          <>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.md, lineHeight: 20 }}>
              {t("mockexams.intro")}
            </Text>
            {papers.map((p) => (
              <PaperCard key={p.id} paper={p} onOpen={(skill) => nav.navigate("MockExam", { paperId: p.id, skill })} />
            ))}
          </>
        ) : (
          <Card padded>
            <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("mockexams.none_for_level", { level })}</Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

function PaperCard({ paper, onOpen }: { paper: MockPaper; onOpen: (skill: MockPaper["parts"][number]["skill"]) => void }) {
  const { colors } = useTheme();
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <Text variant="micro" color={colors.textMuted}>{t("mockexams.paper", { n: paper.no })}</Text>
      <Text variant="bodyStrong" style={{ marginTop: 2 }}>{paper.theme}</Text>
      <Text variant="caption" color={colors.textMuted}>{paper.themeTr}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexams.minutes", { n: paper.minutes })}</Text>

      <View style={{ marginTop: spacing.sm }}>
        {paper.parts.map((part) => {
          const pts = partPoints(part);
          return (
            <PressableScale
              key={part.skill}
              onPress={() => onOpen(part.skill)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderRadius: radii.md,
                backgroundColor: colors.surface2,
                marginTop: spacing.xs,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t(`mockexam.skill_${part.skill}`)}</Text>
                <Text variant="micro" color={colors.textMuted}>
                  {pts ? t("mockexams.part_summary", { minutes: part.minutes, n: pts }) : t("mockexams.part_open", { minutes: part.minutes })}
                </Text>
              </View>
              <ChevronRightIcon color={colors.textMuted} size={20} />
            </PressableScale>
          );
        })}
      </View>
    </Card>
  );
}
