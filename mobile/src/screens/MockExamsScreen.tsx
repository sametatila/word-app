import React, { useCallback, useEffect, useState } from "react";
import { t, formatPercent } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon, ExamIcon, LockIcon } from "../ui/icons";
import { EmptyCard } from "../social/common";
import { SkeletonLine } from "../ui/Skeleton";
import { useMe } from "../lib/useMe";
import { currentCourseId } from "../lib/courses";
import { mockPapersFor, mockSkillLabel, partPoints, type MockLevel, type MockPaper, type MockSkill } from "../data/exams";
import { localPartStates, type PartState } from "../game/mockExamLocal";
import { fetchMockAccess, type MockAccess } from "../game/mockExam";
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
const LEVELS: MockLevel[] = ["A1", "A2", "B1", "B2", "C1"];

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
  // Kendi seviyen liste açılınca seçili gelir, ama başka bir seviyeye
  // bakmak serbest: bir üst seviyeyi görmek hedefi somutlaştırıyor, bir alt
  // seviyeyi çözmek de sınav biçimini öğrenmenin en ucuz yolu. Web'deki
  // liste sayfası da aynı şekilde seviye değiştirtiyor.
  const [picked, setPicked] = useState<MockLevel | null>(null);
  const level = picked ?? me?.level ?? guestLevel ?? "A1";
  // Liste seviyeye bağlı: seviye kesinleşmeden çizilirse sonradan uzayıp
  // kısalıyor. Kesinleşene dek aynı boyda iskelet durur.
  const levelReady = !meLoading && (!!me || prefsRead);
  const overallPct = me && me.totalWords ? Math.min(100, Math.round((me.mastered / me.totalWords) * 100)) : null;

  const papers = mockPapersFor(currentCourseId(), level);

  /*
    Bölümlerin durumu: bitti mi, kaç aldın, yarım mı kaldı.

    Kaynak CİHAZ, sunucu değil. Sebep: sunucuya ulaşılamadığında da bu sorunun
    bir cevabı olmalı — kullanıcı bir bölümü çözdüğünü listede görebilmeli.
    Sunucuda puanlanmış sonuçlar ayrıca `synced` işaretini taşıyor ve rozet
    bunu ayırt ediyor; istatistik ekranı yine sunucunun sayılarını gösteriyor.

    Odaklanınca yeniden okunuyor: sınavdan dönüldüğünde liste güncel olsun.
  */
  /*
   * KİLİT LİSTEDE GÖRÜNÜYOR.
   *
   * Sunucu seviye başına kaç kâğıdın açık olduğunu biliyor; ekran artık
   * soruyor. Okunamazsa (ağ yok, misafir) `null` kalıyor ve hiçbir şey
   * kilitli çizilmiyor: uydurma bir kilit, gerçek bir kilitten daha kötü.
   */
  const [access, setAccess] = useState<MockAccess | null>(null);
  useEffect(() => {
    if (!me) { setAccess(null); return; }
    let dead = false;
    void fetchMockAccess(level).then((a) => { if (!dead) setAccess(a); }).catch(() => { if (!dead) setAccess(null); });
    return () => { dead = true; };
  }, [me, level]);
  const isLocked = (id: string) => (access ? !access.unlocked.includes(id) : false);

  const [states, setStates] = useState<Record<string, Record<string, PartState>>>({});
  const readStates = useCallback(() => {
    let dead = false;
    void (async () => {
      const out: Record<string, Record<string, PartState>> = {};
      for (const p of papers) {
        out[p.id] = await localPartStates(p.id, p.parts.map((x) => x.skill) as MockSkill[]);
      }
      if (!dead) setStates(out);
    })();
    return () => { dead = true; };
    // `papers` seviyeye bağlı ve her çizimde yeni dizi; kimliği seviyeden alıyoruz.
  }, [level]); // eslint-disable-line react-hooks/exhaustive-deps
  useFocusEffect(readStates);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text accessibilityRole="header" variant="h2" style={{ flex: 1 }}>{t("mockexams.title")}</Text>
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
              <Text variant="h1" color={colors.primaryText}>{level}</Text>
            </View>
            {meLoading ? (
              <View style={{ alignItems: "flex-end" }}>
                <SkeletonLine variant="micro" width={92} />
                <SkeletonLine variant="h1" width={56} />
              </View>
            ) : overallPct !== null ? (
              <View style={{ alignItems: "flex-end" }}>
                <Text variant="micro" color={colors.textMuted}>{t("mockexams.word_coverage")}</Text>
                <Text variant="h1">{formatPercent(overallPct)}</Text>
              </View>
            ) : null}
          </View>
        </Card>

        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, marginBottom: spacing.md }}>
          {LEVELS.map((lv) => {
            const on = lv === level;
            return (
              <PressableScale
                key={lv}
                onPress={() => setPicked(lv)}
                accessibilityLabel={lv}
                accessibilityState={{ selected: on }}
                style={{
                  paddingVertical: spacing.xs,
                  paddingHorizontal: spacing.md,
                  borderRadius: radii.pill,
                  backgroundColor: on ? colors.primarySoft : colors.surface2,
                  borderWidth: 1,
                  borderColor: on ? colors.primary : "transparent",
                }}
              >
                <Text variant="bodyStrong" color={on ? colors.primaryText : colors.textMuted}>{lv}</Text>
              </PressableScale>
            );
          })}
        </View>

        {!levelReady ? (
          <Card padded>
            <SkeletonLine variant="h3" width={140} />
            <SkeletonLine variant="caption" width="70%" />
          </Card>
        ) : papers.length ? (
          <>
            <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
              {t("mockexams.intro")}
            </Text>
            {/* Kaç kâğıdın açık olduğu LİSTEDEN ÖNCE söyleniyor: kuralı kilide
                çarptıktan sonra öğrenmek, kuralı hiç söylememekle aynı şey. */}
            {access && !access.premium ? (
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
                {t("mockpack.free_note", { n: access.freeLimit })}
              </Text>
            ) : null}
            {access?.premium && papers.some((p) => isLocked(p.id)) ? (
              <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.md }}>
                {access.unlockOnComplete
                  ? t("mockpack.unlock_hint_both", { pct: access.unlockPct })
                  : t("mockpack.unlock_hint_score", { pct: access.unlockPct })}
              </Text>
            ) : null}
            {papers.map((p) => (
              <PaperCard
                key={p.id}
                paper={p}
                states={states[p.id] ?? {}}
                locked={isLocked(p.id)}
                showPlans={!access?.premium}
                onOpen={(skill) => nav.navigate("MockExam", { paperId: p.id, skill })}
                onPlans={() => nav.navigate("Paywall")}
              />
            ))}
          </>
        ) : (
          /* Boş hâl EV KALIBINDA (`EmptyCard`) ve metin bir ÇIKIŞ YOLU
             söylüyor: kâğıtlar seviyeye bağlı ve seviye çubuğu bu kartın
             hemen üstünde duruyor — onu söylemeyen tek cümle, kullanıcıya
             kâğıt hiç yokmuş gibi geliyordu. */
          <EmptyCard
            icon={ExamIcon}
            tint={colors.info}
            title={t("mockexams.empty_title")}
            text={t("mockexams.none_for_level", { level })}
          />
        )}
      </ScrollView>
    </View>
  );
}

function PaperCard({ paper, states, locked, showPlans, onOpen, onPlans }: { paper: MockPaper; states: Record<string, PartState>; locked: boolean; showPlans: boolean; onOpen: (skill: MockPaper["parts"][number]["skill"]) => void; onPlans: () => void }) {
  const { colors } = useTheme();
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>{t("mockexams.paper", { n: paper.no })}</Text>
        {locked ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 2, paddingHorizontal: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
            <LockIcon color={colors.textMuted} size={12} />
            <Text variant="micro" color={colors.textMuted}>{t("mockpack.locked")}</Text>
          </View>
        ) : null}
      </View>
      <Text variant="bodyStrong" style={{ marginTop: 2 }}>{paper.theme}</Text>
      <Text variant="caption" color={colors.textMuted}>{paper.themeTr}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexams.minutes", { n: paper.minutes })}</Text>

      <View style={{ marginTop: spacing.sm, opacity: locked ? 0.6 : 1 }}>
        {paper.parts.map((part) => {
          const pts = partPoints(part);
          return (
            /* Kilitli bölüm BASILAMIYOR: dokunulabilir bırakılsaydı basan kişi
               yine sınavın içinde 403 görürdü. */
            <PressableScale
              key={part.skill}
              disabled={locked}
              accessibilityState={{ disabled: locked }}
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
                <Text variant="bodyStrong">{mockSkillLabel(paper.course, part.skill)}</Text>
                <Text variant="micro" color={colors.textMuted}>
                  {pts ? t("mockexams.part_summary", { minutes: part.minutes, n: pts }) : t("mockexams.part_open", { minutes: part.minutes })}
                </Text>
              </View>
              <PartBadge state={states[part.skill] ?? null} />
              {locked ? <LockIcon color={colors.textMuted} size={18} /> : <ChevronRightIcon color={colors.textMuted} size={20} />}
            </PressableScale>
          );
        })}
      </View>
      {locked && showPlans ? (
        <PressableScale onPress={onPlans} style={{ marginTop: spacing.md, borderRadius: radii.md, backgroundColor: colors.primary, paddingVertical: 12, alignItems: "center" }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("gate.see_plans")}</Text>
        </PressableScale>
      ) : null}
    </Card>
  );
}

/** Bölüm rozeti: yarım kaldı · puan · yalnız cihazda hesaplanmış puan. */
function PartBadge({ state }: { state: PartState }) {
  const { colors } = useTheme();
  if (!state) return null;
  const running = state === "running";
  const tone = running ? colors.streak : state.passed ? colors.success : colors.danger;
  const label = running
    ? t("mockexams.state_running")
    : t(state.synced ? "mockexams.state_done" : "mockexams.state_local", { pct: state.pct });
  return (
    <View style={{ paddingVertical: 2, paddingHorizontal: spacing.sm, borderRadius: radii.pill, backgroundColor: colors.surface, marginRight: spacing.xs }}>
      <Text variant="micro" color={tone}>{label}</Text>
    </View>
  );
}
