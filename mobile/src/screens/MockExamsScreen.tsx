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
import { ArrowBackIcon } from "../ui/icons";
import { SkeletonLine } from "../ui/Skeleton";
import { useMe } from "../lib/useMe";
import { currentCourseId } from "../lib/courses";
import { examCatalogFor } from "../data/exams";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii } from "../theme";

/**
 * Deneme sınavları.
 *
 * Ekran eskiden "Sınav hazırlık"tı ve başka yerlerin içeriğini tekrar
 * ediyordu: Lesen/Hören/Schreiben modülleri Beceriler sekmesindeki
 * egzersizlerdi (burada yalnız her becerinin İLK'i açılıyordu, yani eksik bir
 * kopya), seviye ve modül kâğıtları ise `lib/exam.ts`in ders içeriğinden
 * ürettiği, Patika türevi sınavlardı. İkisi de kaldırıldı.
 *
 * Burası artık yalnız DENEME SINAVI listeliyor: elle yazılmış, kendi başına
 * duran kâğıtlar (`data/exams.ts`). Öğren sekmesindeki kapı, liste boş olsa
 * bile açık: kursun sınav kataloğu varsa kutucuk çiziliyor. Liste boşken bu
 * ekran uydurma bir satır ya da "yakında" göstermiyor, olduğu gibi söylüyor —
 * o seviyede henüz sınav yok.
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

  const mocks = examCatalogFor(currentCourseId()).mocks.filter((m) => m.level === level);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("mockexams.title")}</Text>
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
        ) : mocks.length ? (
          // Satırlar bilerek TIKLANMIYOR: kâğıdı oynatacak bir ekran henüz yok.
          // Eski oynatıcı (ExamScreen) ders içeriğinden üretilen kâğıtlara göre
          // yazılmıştı; elle yazılan deneme sınavının biçimi belli olunca
          // buraya bağlanacak. Sahte bir kapı bırakmaktansa satır sessiz duruyor.
          <View style={{ gap: spacing.md }}>
            {mocks.map((m) => (
              <Card key={m.id} padded>
                <Text variant="bodyStrong">{m.label}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("mockexams.minutes", { n: m.minutes })}</Text>
              </Card>
            ))}
          </View>
        ) : (
          <Card padded>
            <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("mockexams.none_for_level", { level })}</Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
