import React, { useEffect, useMemo, useState } from "react";
import { t, dateLocale, formatNumber } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, CheckIcon, TrophyIcon } from "../ui/icons";
import { AchievementIcon } from "../ui/achievementIcon";
import { EmptyCard } from "../social/common";
import { Skeleton, SkeletonLine } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { GROUP_ORDER, GROUP_LABEL_KEY, type Achievement, type Tier, type AchGroup } from "../data/achievements";
import { useTheme, spacing, radii, softShadow, TIER_COLOR, type Palette } from "../theme";
import { useLayout } from "../lib/useLayout";

/** Grup başlığı — sözlükte karşılığı olmayan (sunucudan yeni gelen) grup ham adıyla çizilir. */
function groupLabel(group: string): string {
  const key = GROUP_LABEL_KEY[group as AchGroup];
  return key ? t(key) : group;
}

/**
 * Kademe rengi — web `components/achievement-badge.tsx` `TIER_COLOR` ile
 * BİREBİR. Dört değer de ayrışmıştı: gümüş burada mavi-griydi (#9aa3ad) ve
 * sıcak paletin içinde tek başına soğuk duruyordu, altın ve efsane de
 * semantik renklere bağlanmıştı.
 *
 * Rozetin üstünde beyaz ikon var, yani grafik eşiği 3.0 geçerli. Ölçüm:
 * bronz 3.09, gümüş 2.56, altın 2.88, efsane 4.91 - üçü sınırda ya da
 * altında. Ortak değerlerle: 4.44 / 3.79 / 3.62 / 6.83.
 */
function tierColor(tier: Tier): string {
  return TIER_COLOR[tier] ?? TIER_COLOR.legend;
}

function Badge({ a, colors }: { a: Achievement; colors: Palette }) {
  const { gridItemWidth } = useLayout();
  const tc = tierColor(a.tier);
  const pct = a.target ? Math.min(100, Math.round((a.done / a.target) * 100)) : 0;
  return (
    <View style={{ width: gridItemWidth, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.md, opacity: a.unlocked ? 1 : 0.92 }}>
      <View style={[{ width: 46, height: 46, borderRadius: 23, alignItems: "center", justifyContent: "center", backgroundColor: a.unlocked ? tc : colors.surface2 }, a.unlocked ? softShadow(tc, 6) : {}]}>
        {/* Rozetin KENDİ ikonu (sunucu `icon` alanında veriyor): eskiden hepsi
            kupaydı ve iki rozeti ayıran tek şey kademe rengiydi. Web baştan
            beri her rozeti kendi ikonuyla çiziyor. */}
        <AchievementIcon name={a.icon} color={a.unlocked ? "#fff" : colors.textFaint} size={24} />
      </View>
      <Text variant="bodyStrong" style={{ marginTop: spacing.sm }}>{a.title}</Text>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2 }}>{a.hint}</Text>
      {a.unlocked ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: spacing.sm }}>
          <CheckIcon color={colors.successText} size={14} /><Text variant="micro" color={colors.successText}>{t("achievements.earned")}</Text>
        </View>
      ) : (
        <View style={{ marginTop: spacing.sm }}>
          <View style={{ height: 5, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
            <View style={{ height: "100%", width: `${pct}%`, backgroundColor: tc, borderRadius: 3 }} />
          </View>
          {/* Sayilar yerelden gecirilyor: bin ayraci Turkcede nokta, Ingilizcede
              virgul - web duvari bastan beri boyle yaziyor. */}
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{formatNumber(a.done)}/{formatNumber(a.target)}</Text>
        </View>
      )}
    </View>
  );
}

type Board = { rows: Achievement[]; unlockedCount: number; total: number };

/** "Sıradaki" bölümünde kaç rozet gösterilir — web `achievement-wall` ile aynı. */
const NEXT_COUNT = 4;

/** Küçük büyük-harf etiket + rozet ızgarası; grup bölümleri ve "sıradaki" aynı kabı kullanıyor. */
function Section({ label, rows, colors }: { label: string; rows: Achievement[]; colors: Palette }) {
  if (!rows.length) return null;
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4 }}>{label.toLocaleUpperCase(dateLocale())}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {rows.map((a) => <Badge key={a.id} a={a} colors={colors} />)}
      </View>
    </View>
  );
}

export function AchievementsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [board, setBoard] = useState<Board | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  // Uydurma tahta yok: yüklenene dek boş, hata olursa "tekrar dene".
  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    setPhase("loading");
    api<Partial<Board>>("/api/achievements")
      .then((d) => {
        if (!alive) return;
        /* Gövde körü körüne kabul edilmiyor: biçimi tutmayan bir cevapta
           sayaçlar `undefined` olur ve ilerleme şeridi NaN genişlik alırdı.
           Web de aynı denetimi yapıyor (`achievement-wall`). */
        if (Array.isArray(d?.rows) && typeof d.total === "number" && typeof d.unlockedCount === "number") {
          setBoard({ rows: d.rows, unlockedCount: d.unlockedCount, total: d.total });
          setPhase("ready");
        } else setPhase("error");
      })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, attempt]);

  const list = useMemo(() => board?.rows ?? [], [board]);
  /*
   * SAYAÇLAR SUNUCUDAN. Eskiden `list.filter(unlocked).length` ile yeniden
   * sayılıyordu; sunucu `unlockedCount` ve `total`ı zaten gönderiyor ve iki
   * sayının aynı kalacağının garantisi yok (satır listesi bir gün
   * sayfalanırsa yerel sayım sessizce yanlışa döner). Web sunucununkini
   * kullanıyor.
   */
  const earned = board?.unlockedCount ?? 0;
  const total = board?.total ?? 0;
  const pct = total ? Math.round((earned / total) * 100) : 0;

  /**
   * Bitmeye en yakın kilitli rozetler — web `achievement-wall` ile AYNI sıra.
   *
   * Sıra tamamlanma ORANINA göre: "48/50" ile "480/500" aynı oranda ama
   * ilkinin kalanı iki, ikincisinin yirmi. Eşitlikte küçük hedef öne alınıyor.
   */
  const upcoming = useMemo(
    () => list.filter((a) => !a.unlocked).sort((a, b) => b.done / b.target - a.done / a.target || a.target - b.target).slice(0, NEXT_COUNT),
    [list],
  );
  /** Hepsi açıldıysa "sıradaki" diye bir şey kalmaz; en son kazanılanlar gelir. */
  const recent = useMemo(
    () => list.filter((a) => a.unlocked && a.unlockedAt).sort((a, b) => ((a.unlockedAt ?? "") < (b.unlockedAt ?? "") ? 1 : -1)).slice(0, NEXT_COUNT),
    [list],
  );
  const lead = upcoming.length ? upcoming : recent;
  // Grup kovaları sunucudaki sırayla açılıyor; listede OLMAYAN bir grup gelirse
  // atılmıyor, sona ekleniyor. Eski hâli üç grup biliyordu ve dördüncüsü geldiğinde
  // etiketi `undefined` olup ekranı çökertiyordu.
  const groups = useMemo(() => {
    const g = new Map<string, Achievement[]>(GROUP_ORDER.map((k) => [k, []]));
    for (const a of list) {
      const bucket = g.get(a.group);
      if (bucket) bucket.push(a);
      else g.set(a.group, [a]);
    }
    return [...g.entries()].filter(([, rows]) => rows.length);
  }, [list]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("achievements.achievements")}</Text>
          {phase === "ready" ? <Text variant="caption" color={colors.textMuted}>{t("achievements.earned_count", { n: formatNumber(earned), total: formatNumber(total) })}</Text> : null}
        </View>
      </View>

      {phase === "loading" ? (
        // Ortalanmış spinner yerine tahtanın kendi iskeleti: içerik gelince
        // rozetler ortadan yukarı sıçramıyor, oldukları yerde beliriyor.
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {[0, 1, 2].map((g) => (
            <View key={g} style={{ marginTop: spacing.lg }}>
              <SkeletonLine variant="caption" width={96} style={{ marginBottom: spacing.sm, marginLeft: 4 }} />
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                {[0, 1].map((i) => <Skeleton key={i} height={140} width="47.5%" radius={radii.lg} />)}
              </View>
            </View>
          ))}
        </ScrollView>
      ) : phase !== "ready" ? (
        /* Hata durumu ÖTEKİ boş durumlarla aynı kabukta: simge karosu, başlık,
           sebep ve tekrar deneme. Çıplak bir cümle "ekran bozuk" gibi
           okunuyordu; web aynı yerde kupa simgeli kartı çiziyor
           (`achievement-wall`). */
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: spacing.lg }}>
          <EmptyCard
            live="assertive"
            icon={TrophyIcon}
            tint={colors.streak}
            title={t("achievements.achievements")}
            text={t("achievements.couldn_t_load_achievements")}
            action={t("common.try_again")}
            onAction={() => setAttempt((n) => n + 1)}
          />
        </View>
      ) : (
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* Kaçının açıldığı TEK BAKIŞTA: web duvarı bu şeridi baştan beri
            çiziyor, mobilde yalnız başlıktaki sayı vardı. */}
        <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: spacing.sm }}>
          <View style={{ height: "100%", width: `${pct}%`, backgroundColor: colors.primary, borderRadius: 3 }} />
        </View>
        {/* Önce "sıradaki" (hepsi açıldıysa "son kazanılan"), sonra gruplar. */}
        <Section label={t(upcoming.length ? "skills.next" : "achievements.recent")} rows={lead} colors={colors} />
        {groups.map(([gk, rows]) => (
          <Section key={gk} label={groupLabel(gk)} rows={rows} colors={colors} />
        ))}
      </ScrollView>
      )}
    </View>
  );
}
