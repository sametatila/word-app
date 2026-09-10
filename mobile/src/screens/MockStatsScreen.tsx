import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SkeletonBar, SkeletonCard, SkeletonLine } from "../ui/Skeleton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ChevronRightIcon } from "../ui/icons";
import { fetchMockStats, failReason, type MockStats } from "../game/mockExam";
import { loadLocalResults } from "../game/mockExamLocal";
import { mockCourseOf, mockPaperById, mockSkillLabel, type MockSkill } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii } from "../theme";

/**
 * Deneme sınavı istatistiği.
 *
 * Üç kırılım var çünkü üçü üç ayrı soruya cevap veriyor: BÖLÜM "hangi becerim
 * zayıf", SEVİYE "bu seviyeyi geçiyor muyum", GEÇMİŞ "ilerliyor muyum".
 * Dördüncü blok yarım kalan denemeler — sınav yarıda bırakıldıysa kullanıcı
 * bunu ancak burada görür.
 *
 * Sayılar SUNUCUDAN geliyor ve yalnız sunucuda puanlanmış denemeleri
 * kapsıyor: ağ yokken çözülen bir bölüm istatistiğe girmiyor ve oynatıcı bunu
 * o ekranda da söylüyor.
 */
export function MockStatsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [data, setData] = useState<MockStats | null>(null);
  const [err, setErr] = useState<string | null>(null);
  /** Sayılar cihazdan mı geliyor — sunucu ulaşılamadığındaki yedek. */
  const [local, setLocal] = useState(false);
  const [busy, setBusy] = useState(true);

  const load = useCallback(async () => {
    setBusy(true);
    try {
      setData(await fetchMockStats());
      setLocal(false);
      setErr(null);
    } catch (e) {
      /*
        Sunucuya ulaşılamıyorsa ekran boş kalmıyor: cihazdaki sonuçlardan aynı
        kırılımlar kuruluyor. Bu sayılar sunucu istatistiği DEĞİL ve ekran bunu
        söylüyor — ama "hiçbir şey göremiyorsun" demekten iyisi.
      */
      setErr(failReason(e));
      setData(await localStats());
      setLocal(true);
    }
    setBusy(false);
  }, []);
  useEffect(() => { void load(); }, [load]);

  const label = (paperId: string) => {
    const p = mockPaperById(paperId);
    return p ? `${p.level} · ${t("mockexams.paper", { n: p.no })}` : paperId;
  };
  /*
    Bölüm adı sınavın dilinde yazılır ("Lesen" / "Reading"), arayüz dilinde
    değil. Tek satırlık bir denemede dil kâğıttan çözülüyor; toplam kırılımda
    kâğıt yok, orada kullanıcının kendi kursu esas alınıyor.
  */
  const mine = mockCourseOf(currentCourseId());
  const skillOf = (skill: string, paperId?: string) =>
    mockSkillLabel(paperId ? mockPaperById(paperId)?.course ?? mine : mine, skill as MockSkill);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("mockstats.title")}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={busy && !!data} onRefresh={() => void load()} tintColor={colors.primary} />}
      >
        {busy && !data ? (
          /*
            SPINNER YERİNE İSKELET — sayfanın gerçek yapısında.
            `ui/Skeleton`ın kuralı bu ("düz spinner yerine içeriğin ŞEKLİNİ ve
            YÜKSEKLİĞİNİ gösterir") ve rozet ekranı bu dönüşümü daha önce
            yapmıştı. Burada ortada dönen bir çark vardı: veri gelince üç kart
            birden beliriyor ve içerik yukarı sıçrıyordu. Webin karşılığı
            (`app/(app)/mock-exams/stats/loading.tsx`) zaten iskelet çiziyor ve
            yorumu "mobil aynı anda kendi iskeletini çiziyor" DİYORDU - artık
            doğru.
          */
          <View>
            <SkeletonCard style={{ marginBottom: spacing.md }}>
              <SkeletonLine variant="micro" width={90} />
              {[0, 1, 2, 3].map((i) => (
                <View key={i} style={{ marginTop: spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <SkeletonLine variant="body" width={110} />
                    <SkeletonLine variant="bodyStrong" width={44} />
                  </View>
                  <SkeletonBar height={4} style={{ marginTop: 4 }} />
                  <SkeletonLine variant="micro" width={130} style={{ marginTop: 2 }} />
                </View>
              ))}
            </SkeletonCard>
            <SkeletonCard style={{ marginBottom: spacing.md }}>
              <SkeletonLine variant="micro" width={80} />
              {[0, 1, 2].map((i) => (
                <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm }}>
                  <SkeletonLine variant="body" width={40} />
                  <SkeletonLine variant="bodyStrong" width={90} />
                </View>
              ))}
            </SkeletonCard>
            <SkeletonCard>
              <SkeletonLine variant="micro" width={70} />
              {[0, 1, 2].map((i) => (
                <View key={i} style={{ marginTop: spacing.sm }}>
                  <SkeletonLine variant="body" width="70%" />
                  <SkeletonLine variant="micro" width={120} style={{ marginTop: 2 }} />
                </View>
              ))}
            </SkeletonCard>
          </View>
        ) : !data || data.attempts === 0 ? (
          <>
            {data?.running?.length ? <Running data={data} colors={colors} nav={nav} label={label} skillOf={skillOf} /> : null}
            <Card padded><Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{t("mockstats.empty")}</Text></Card>
          </>
        ) : (
          <>
            {local ? (
              <Card padded style={{ marginBottom: spacing.md }}>
                <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>
                  {t(`mockexam.fail_${err ?? "unreachable"}`)}
                </Text>
                <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 18 }}>{t("mockstats.local_note")}</Text>
              </Card>
            ) : null}
            {data.running.length ? <Running data={data} colors={colors} nav={nav} label={label} skillOf={skillOf} /> : null}

            <Card padded style={{ marginBottom: spacing.md }}>
              <Text variant="micro" color={colors.textMuted}>{t("mockstats.by_skill")}</Text>
              {data.bySkill.map((s) => (
                <View key={s.skill} style={{ marginTop: spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                    <Text variant="body">{skillOf(s.skill)}</Text>
                    <Text variant="bodyStrong" color={s.pct >= 60 ? colors.successText : colors.dangerText}>%{s.pct}</Text>
                  </View>
                  <View style={{ height: 4, borderRadius: 2, backgroundColor: colors.surface2, marginTop: 4 }}>
                    <View style={{ height: 4, borderRadius: 2, width: `${s.pct}%`, backgroundColor: s.pct >= 60 ? colors.success : colors.danger }} />
                  </View>
                  <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2 }}>
                    {t("mockstats.attempts_best", { n: s.attempts, best: s.best })}
                  </Text>
                </View>
              ))}
            </Card>

            <Card padded style={{ marginBottom: spacing.md }}>
              <Text variant="micro" color={colors.textMuted}>{t("mockstats.by_level")}</Text>
              {data.byLevel.map((l) => (
                <View key={l.level} style={{ flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm }}>
                  <Text variant="body">{l.level}</Text>
                  <Text variant="bodyStrong">{t("mockstats.passed_of", { passed: l.passed, n: l.attempts })}</Text>
                </View>
              ))}
            </Card>

            <Card padded>
              <Text variant="micro" color={colors.textMuted}>{t("mockstats.recent")}</Text>
              {data.recent.map((r) => (
                <View key={r.id} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
                  <View style={{ flex: 1 }}>
                    <Text variant="body">{label(r.paperId)} · {skillOf(r.skill, r.paperId)}</Text>
                    <Text variant="micro" color={colors.textMuted}>{t("mockexam.score", { correct: r.correct, total: r.total })}</Text>
                  </View>
                  <Text variant="bodyStrong" color={r.passed ? colors.successText : colors.dangerText}>%{r.score}</Text>
                </View>
              ))}
            </Card>
          </>
        )}
      </ScrollView>
    </View>
  );
}

function Running({
  data, colors, nav, label, skillOf,
}: {
  data: MockStats;
  colors: ReturnType<typeof useTheme>["colors"];
  nav: NativeStackNavigationProp<RootStackParams>;
  label: (id: string) => string;
  skillOf: (skill: string, paperId?: string) => string;
}) {
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <Text variant="micro" color={colors.textMuted}>{t("mockstats.running")}</Text>
      {data.running.map((r) => (
        <PressableScale
          key={r.id}
          onPress={() => nav.navigate("MockExam", { paperId: r.paperId, skill: r.skill })}
          style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.md, backgroundColor: colors.surface2 }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{label(r.paperId)} · {skillOf(r.skill, r.paperId)}</Text>
            <Text variant="micro" color={colors.textMuted}>{t("mockstats.at_task", { n: r.taskIx + 1 })}</Text>
          </View>
          <ChevronRightIcon color={colors.textMuted} size={20} />
        </PressableScale>
      ))}
    </Card>
  );
}

/**
 * Cihazdaki sonuçlardan istatistik — sunucu ulaşılamadığında.
 *
 * Sunucununkiyle aynı biçimde dönüyor ki ekran iki kaynağı ayrı ayrı çizmek
 * zorunda kalmasın; farkı `local` bayrağı ve üstteki not söylüyor. Yarım kalan
 * denemeler burada listelenmiyor: onların kaydı kâğıt başına tutuluyor ve
 * liste ekranında rozet olarak zaten görünüyor.
 */
async function localStats(): Promise<MockStats> {
  const rows = await loadLocalResults();
  const bySkill = new Map<string, { attempts: number; correct: number; total: number; best: number }>();
  const byLevel = new Map<string, { attempts: number; passed: number }>();
  for (const r of rows) {
    if (r.total > 0) {
      const v = bySkill.get(r.skill) ?? { attempts: 0, correct: 0, total: 0, best: 0 };
      v.attempts++;
      v.correct += r.correct;
      v.total += r.total;
      v.best = Math.max(v.best, r.pct);
      bySkill.set(r.skill, v);
    }
    const l = byLevel.get(r.level) ?? { attempts: 0, passed: 0 };
    l.attempts++;
    if (r.passed) l.passed++;
    byLevel.set(r.level, l);
  }
  return {
    attempts: rows.length,
    bySkill: [...bySkill.entries()].map(([skill, v]) => ({
      skill: skill as MockSkill,
      attempts: v.attempts,
      pct: v.total ? Math.round((100 * v.correct) / v.total) : 0,
      best: v.best,
    })),
    byLevel: [...byLevel.entries()].map(([level, v]) => ({ level, ...v })),
    recent: rows.slice(0, 20).map((r, i) => ({
      id: -(i + 1),
      paperId: r.paperId,
      skill: r.skill,
      level: r.level,
      score: r.pct,
      correct: r.correct,
      total: r.total,
      passed: r.passed,
      finishedAt: r.at,
    })),
    running: [],
  };
}
