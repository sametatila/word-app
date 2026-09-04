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
import { ArrowBackIcon, ChevronRightIcon, ReadIcon, ListenIcon, WriteIcon, BoltIcon, LockIcon } from "../ui/icons";
import { SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useMe } from "../lib/useMe";
import { usePremium } from "../lib/usePremium";
import { billingAvailable } from "../lib/billing";
import { useMicrophone } from "../lib/useMicrophone";
import { listSkillMeta } from "../data/skills";
import { currentCourseId } from "../lib/courses";
import { examCatalogFor, type ExamModule } from "../data/exams";
import { loadOnboardingPrefs } from "../lib/onboardingPrefs";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Sınav hazırlık (§4 — sınav-hazırlığı ürünleştirme). Goethe/telc modülleri:
 * Lesen/Hören (ücretsiz, gerçek okuma/dinleme alıştırmaları) + Schreiben/Sprechen
 * (premium). Uydurma ilerleme yok; modüller gerçek içeriğe bağlı.
 */
/** Beceriden ikona — katalog veri, ikon görünüm; ikisi ayrı dosyada durur. */
const SKILL_ICON: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  reading: (p) => <ReadIcon {...p} />,
  listening: (p) => <ListenIcon {...p} />,
  writing: (p) => <WriteIcon {...p} />,
  speaking: (p) => <BoltIcon {...p} />,
};

export function ExamPrepScreen() {
  const mic = useMicrophone();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [exam, setExam] = useState(0);
  const { me, loading: meLoading } = useMe();
  // Mağaza entegrasyonu canlı değilken kilit yok: satın alınamayan bir şeyin arkasına
  // içerik saklanmaz (Play "bozuk işlevsellik"). Canlıysa premium modüller kilitli.
  const premium = usePremium() || !billingAvailable();
  // Misafirde yerleştirme sınavının belirlediği seviye (prefs); yoksa A1.
  // Sınav kataloğu kursun HEDEF diline bağlı: İngilizce kursu seçen kullanıcıya
  // Goethe/telc gösterilmiyor (bkz. data/exams).
  const catalog = examCatalogFor(currentCourseId());
  const [guestLevel, setGuestLevel] = useState<string | null>(null);
  const [prefsRead, setPrefsRead] = useState(false);
  useEffect(() => {
    if (meLoading || me) return;
    void loadOnboardingPrefs().then((p) => { setGuestLevel(p.level ?? null); setPrefsRead(true); });
  }, [me, meLoading]);
  const level = me?.level ?? guestLevel ?? "A1";
  // Modül listesi seviyeye bağlı: seviye kesinleşmeden çizilirse liste sonradan
  // uzayıp kısalıyor. Kesinleşene dek aynı boyda iskelet durur.
  const levelReady = !meLoading && (!!me || prefsRead);
  const overallPct = me && me.totalWords ? Math.min(100, Math.round((me.mastered / me.totalWords) * 100)) : null;

  function openModule(m: ExamModule) {
    if (m.premium && !premium) { nav.navigate("Paywall"); return; }
    const ex = listSkillMeta(level, m.skill as "reading" | "listening" | "writing")[0];
    if (ex) nav.navigate("Item", { id: ex.id, kind: m.kind, title: ex.title ?? m.label });
  }

  function countFor(m: ExamModule): number {
    if (m.skill === "speaking") return 0;
    return listSkillMeta(level, m.skill as "reading" | "listening" | "writing").length;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("examprep.exam_prep")}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* seviye + sınav seçimi */}
        <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View>
              <Text variant="micro" color={colors.textMuted}>{t("examprep.level")}</Text>
              <Text variant="h1" color={colors.primary}>{level}</Text>
            </View>
            {meLoading ? (
              <View style={{ alignItems: "flex-end" }}>
                <SkeletonLine variant="micro" width={92} />
                <SkeletonLine variant="h1" width={56} />
              </View>
            ) : overallPct !== null ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text variant="micro" color={colors.textMuted}>{t("examprep.word_coverage")}</Text>
                <Text variant="h1">%{overallPct}</Text>
              </View>
            ) : null}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md }}>
            {catalog.exams.map((e, i) => {
              const active = exam === i;
              return (
                <PressableScale key={e} onPress={() => setExam(i)} style={{ flex: 1, paddingVertical: 10, borderRadius: radii.md, alignItems: "center", borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : "transparent" }}>
                  <Text variant="caption" color={active ? colors.primary : colors.textMuted}>{e}</Text>
                </PressableScale>
              );
            })}
          </View>
        </Card>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{t("examprep.modules")}</Text>
        <View style={{ gap: spacing.md }}>
          {!levelReady ? [0, 1, 2].map((i) => (
            <SkeletonCard key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <SkeletonTile size={48} />
              <View style={{ flex: 1 }}>
                <SkeletonLine variant="h3" width={92} />
                <SkeletonLine variant="caption" width="62%" />
              </View>
              <SkeletonLine variant="h3" width={20} />
            </SkeletonCard>
          )) : catalog.modules.filter((m) => countFor(m) > 0 && (mic || m.skill !== "speaking")).map((m) => {
            // İçeriği olmayan modül hiç çizilmez: çalışmayan "yakında" satırı yok.
            const tint = colors[m.tint as keyof Palette] as string;
            const n = countFor(m);
            const gated = m.premium && billingAvailable();
            const sub = `${t(m.subKey)} · ${t("examprep.exercises", { n })}${gated ? " · Premium" : ""}`;
            return (
              <PressableScale key={m.key} onPress={() => openModule(m)}>
                <Card padded style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View style={[{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    {SKILL_ICON[m.skill]({ color: "#fff", size: 24 })}
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text variant="h3">{m.label}</Text>
                      {gated && (
                        <View style={{ backgroundColor: colors.streak + "26", borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                          <Text variant="micro" color={colors.streak}>{t("examprep.premium")}</Text>
                        </View>
                      )}
                    </View>
                    <Text variant="caption" color={colors.textMuted}>{sub}</Text>
                  </View>
                  {gated && !premium ? <LockIcon color={colors.streak} size={20} /> : <ChevronRightIcon color={colors.textFaint} size={20} />}
                </Card>
              </PressableScale>
            );
          })}
          {/* Kursun sınav kataloğu yoksa liste sessizce boş kalırdı; sebebi
              yazılıyor. Katalog var ama seviyede içerik yoksa modül satırı
              zaten çizilmiyor (yukarıdaki countFor süzgeci). */}
          {levelReady && !catalog.modules.length ? (
            <Card padded>
              <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("examprep.this_course_has_no_exam")}</Text>
            </Card>
          ) : null}
        </View>

        {billingAvailable() ? (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.lg, textAlign: "center", lineHeight: 18 }}>
            {t("examprep.lesen_and_horen_are_free")}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
