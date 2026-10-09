import React, { useCallback, useState } from "react";
import { useStatsBump } from "../lib/statsSignal";
import { flushPendingItems } from "../game/pathProgress";
import { DECAY_DAYS } from "../lib/learningRules";
import { View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { routeFromHref } from "../lib/pushRoute";
import { t, formatDay } from "../lib/i18n";
import { api } from "../api/client";
import { todayStr } from "../game/session";
import { trendOf, verdictOf, type Trend } from "../lib/growthVerdict";
import { useLayout } from "../lib/useLayout";
import { Text } from "./Text";
import { Card } from "./Card";
import { CardGrid } from "./CardGrid";
import { PressableScale } from "./PressableScale";
import { ChevronNextIcon, ForwardIcon } from "./icons";
import { barPct } from "./Bar";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "./Skeleton";
import Svg, { Path as SvgPath } from "react-native-svg";
import { useTheme, spacing, radii, softShadow, soft, onTint, type Palette } from "../theme";

/**
 * Gelişim ekranının ÖLÇÜM yüzü — "Nasıl gidiyorum" kartı ve "Zaman içinde".
 *
 * Eskiden tek bir panel vardı ("Gelişim · A1": ekran başlığını tekrarlıyordu)
 * ve "Nasıl gidiyorum" diye açılan satır yalnız sekiz haftalık çizgileri
 * gösteriyordu. Şimdi kart cevabın kendisi: düz dilde hüküm cümlesi, her
 * becerinin bandı ve gidişatı (dört hafta öncesine göre ±3; kanıt azsa "az
 * ölçüm") ve altında sıradaki adım. Çizgiler ve kilometre taşları ayrı kartta.
 *
 * Rapor tek istekle geliyor (`useGrowth`), iki kart aynı veriyi okuyor. Web
 * karşılığı `src/components/progress-panel.tsx`.
 *
 * Gün İSTEMCİNİN yerel günü: uç gün gelmezse sunucunun UTC gününe düşüyor ve
 * gece yarısına yakın açılan rapor bir gün kaymış seriyle çiziliyor.
 */
type WeekPoint = { week: string; value: number | null; n: number };
type Band = "beginner" | "developing" | "solid" | "mastered";
type Prof = { skill: string; label: string; now: number | null; before: number | null; band: Band | null; n?: number };
type NextStep = { skill: string; label: string; reason: string; href: string; title: string; minutes: number };
export type Growth = {
  level: string;
  evidenceCount: number;
  proficiency: Prof[];
  next: NextStep | null;
  summary: { text: string };
  weeks: string[];
  series: { writing: WeekPoint[]; speaking: WeekPoint[]; usage: WeekPoint[]; answers: WeekPoint[] };
  milestones: { at: string; text: string }[];
};

/**
 * GELİŞİM ODAKTA VE SAYILAR DEĞİŞİNCE TAZELENİYOR (2026-10-06, Samet'in bildirimi:
 * "Sıradaki"den açtığı telaffuz alıştırmasını bitirip döndü, öneri değişmedi). Rapor
 * yalnız ekran kurulurken çekiliyordu; alıştırma ekranı `goBack()` ile kurulu
 * Gelişim'e dönüyor ve eski öneri kalıyordu (web her açılışta ve `lernomi:stats`te
 * çekiyor). Önce çevrimdışı bekleyen sonuçlar gidiyor. Tazelemede eski rapor ekranda
 * kalıyor; hata eski raporu silmiyor.
 */
export function useGrowth(): Growth | null | undefined {
  const [data, setData] = useState<Growth | null | undefined>(undefined);
  const bump = useStatsBump();
  useFocusEffect(
    useCallback(() => {
      if (bump < 0) return;
      let alive = true;
      void (async () => {
        await flushPendingItems().catch(() => {});
        const g = await api<Partial<Growth>>(`/api/growth?day=${todayStr()}`);
        if (!alive) return;
        /* Gövde doğrulanıyor: 200 dönen ama biçimi tutmayan bir cevapta
           `proficiency.map` patlıyor ve kart değil bütün ekran iniyor. */
        setData(Array.isArray(g?.proficiency) ? (g as Growth) : null);
      })().catch(() => { if (alive) setData((prev) => prev ?? null); });
      return () => { alive = false; };
    }, [bump]),
  );
  return data;
}

/** Bant → renk. Web `BAND_TONE` ile aynı eşleme (rose/flame/brand/mint). */
function bandTint(band: Band | null, colors: Palette): string {
  switch (band) {
    case "beginner": return colors.danger;
    case "developing": return colors.streak;
    case "mastered": return colors.success;
    default: return colors.primary;
  }
}

const TREND_KEY: Record<Trend, string> = {
  up: "progp.trend_up",
  down: "progp.trend_down",
  flat: "progp.trend_flat",
  new: "progp.trend_new",
  low: "progp.trend_low",
};
const TREND_MARK: Record<Trend, string> = { up: "▲", down: "▼", flat: "→", new: "•", low: "•" };

/** Kartın başlığı — kartın DIŞINDA, `h3` (Öğren ve Profil'in bölüm başlığı). */
export function HowAmIDoingHead({ data }: { data: Growth | null | undefined }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.md, marginBottom: spacing.sm, paddingHorizontal: spacing.xs }}>
      <Text accessibilityRole="header" variant="h3">{t("progp.how_am_i_doing")}</Text>
      {data === undefined ? (
        <SkeletonLine variant="caption" width={120} />
      ) : data && data.proficiency.some((p) => p.now !== null) ? (
        <Text variant="caption" color={colors.textMuted}>{t("progp.window", { n: data.evidenceCount, days: DECAY_DAYS })}</Text>
      ) : null}
    </View>
  );
}

export function HowAmIDoing({ data }: { data: Growth | null | undefined }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const go = (href: string) => {
    const route = routeFromHref(href);
    if (route) (nav.navigate as (n: string, p?: object) => void)(route.name, route.params);
  };

  if (data === undefined) {
    return (
      /* YÜKLEME DUYURULUYOR (web aynı kartta `role="status" aria-busy`).
         İskelet gerçek kartın sırasında: hüküm, altı beceri satırı, sıradaki adım. */
      <Card padded accessibilityRole="progressbar" accessibilityState={{ busy: true }} accessibilityLabel={t("progp.loading")} style={{ gap: spacing.md }}>
        <SkeletonLine variant="bodyStrong" width="80%" />
        <CardGrid minItemWidth={280} balance>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
                <SkeletonLine variant="bodyStrong" width={110} />
                <SkeletonLine variant="caption" width={70} />
              </View>
              <SkeletonBar height={6} />
            </View>
          ))}
        </CardGrid>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, backgroundColor: colors.surface2, padding: spacing.md }}>
          <SkeletonTile size={40} />
          <View style={{ flex: 1 }}>
            <SkeletonLine variant="bodyStrong" width="60%" />
            <SkeletonLine variant="caption" width="80%" />
          </View>
        </View>
      </Card>
    );
  }
  if (!data) return null;

  const v = verdictOf(data.proficiency);
  const step = data.next;
  const route = step ? routeFromHref(step.href) : null;

  /* BOŞ HÂL. Yeni kullanıcı kartı GÖRÜYOR (web aynı): kısa açıklama + tek düğme. */
  if (!v.measured) {
    return (
      <Card padded style={{ gap: spacing.xs }}>
        <Text variant="bodyStrong">{t("progp.empty_title")}</Text>
        <Text variant="body" color={colors.textMuted}>{t("progp.empty_text")}</Text>
        <PressableScale
          onPress={() => go(step?.href ?? "/learn")}
          accessibilityRole="button"
          style={[{ alignSelf: "flex-start", marginTop: spacing.sm, backgroundColor: colors.primary, borderRadius: radii.pill, paddingHorizontal: spacing.xl, paddingVertical: 11 }, softShadow(colors.primary, 6)]}
        >
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.start")}</Text>
        </PressableScale>
      </Card>
    );
  }

  const headline = [
    v.firm === 0 ? t("progp.verdict_early") : null,
    v.up ? t("progp.verdict_up", { n: v.up }) : null,
    v.down ? t("progp.verdict_down", { n: v.down }) : null,
    v.firm > 0 && !v.up && !v.down ? t("progp.verdict_steady") : null,
    v.focus ? t("progp.verdict_focus", { skill: v.focus }) : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Card padded style={{ gap: spacing.md }}>
      <Text variant="bodyStrong">{headline}</Text>

      <CardGrid minItemWidth={280} balance>
        {data.proficiency
          .filter((p) => p.now !== null)
          .map((p) => {
            const tr = trendOf(p);
            const tint = bandTint(p.band, colors);
            const trendColor = tr === "up" ? colors.successText : tr === "down" ? colors.dangerText : colors.textMuted;
            return (
              <View key={p.skill} style={{ gap: 6 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flexShrink: 1 }}>
                    <Text variant="bodyStrong" numberOfLines={1} style={{ flexShrink: 1 }}>{p.label}</Text>
                    {p.band ? (
                      <View style={{ backgroundColor: soft(tint, colors), borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 }}>
                        <Text variant="micro" color={onTint(tint, colors)}>{t(`band.${p.band}`)}</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "baseline", gap: spacing.sm }}>
                    {tr ? <Text variant="caption" color={trendColor}>{TREND_MARK[tr]} {t(TREND_KEY[tr])}</Text> : null}
                    <Text variant="bodyStrong">{p.now}</Text>
                  </View>
                </View>
                <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
                  <View style={{ height: "100%", width: `${barPct(p.now ?? 0)}%`, backgroundColor: tint, borderRadius: 3 }} />
                </View>
              </View>
            );
          })}
      </CardGrid>

      {/* Ölçülmeyen beceriler TEK satırda (web aynı). */}
      {v.unmeasured.length ? (
        <Text variant="caption" color={colors.textMuted}>
          {t("progp.unmeasured", { n: v.unmeasured.length })} · {v.unmeasured.join(", ")}
        </Text>
      ) : null}

      {/* Önerilen adım hükmün hemen altında. Adres tanınmıyorsa satır HİÇ
          çizilmiyor - hiçbir yere gitmeyen bir düğme, olmayan düğmeden kötü. */}
      {step && route ? (
        <PressableScale
          onPress={() => go(step.href)}
          accessibilityRole="button"
          style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, backgroundColor: soft(colors.primary, colors), padding: spacing.md }}
        >
          <View style={[{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 6)]}>
            <ForwardIcon color={colors.onPrimary} size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{t("skills.next")}: {step.title}</Text>
            <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{step.reason} · {t("skills.dk", { n: step.minutes })}</Text>
          </View>
          <View style={{ backgroundColor: colors.primary, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 6 }}>
            <Text variant="caption" color={colors.onPrimary}>{t("common.start")}</Text>
          </View>
        </PressableScale>
      ) : null}
    </Card>
  );
}

/**
 * Sekiz haftalık çizgi — web `progress-panel` `Spark` ile AYNI geometri
 * (120×32, dört piksel iç boşluk, ölçülmemiş hafta çizgiyi KESİYOR).
 */
function Spark({ title, points, max, color, colors }: { title: string; points: WeekPoint[]; max?: number; color: string; colors: Palette }) {
  const values = points.map((p) => p.value);
  const top = max ?? Math.max(1, ...values.map((v) => v ?? 0));
  const W = 120;
  const H = 32;
  const step = W / Math.max(1, points.length - 1);
  let d = "";
  let open = false;
  values.forEach((v, i) => {
    if (v === null) { open = false; return; }
    const x = i * step;
    const y = H - (Math.min(v, top) / top) * (H - 4) - 2;
    d += `${open ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)} `;
    open = true;
  });
  const last = [...values].reverse().find((v) => v !== null) ?? null;
  return (
    <View style={{ flex: 1, minWidth: 132, gap: 2, borderRadius: radii.md, backgroundColor: colors.surface2, paddingHorizontal: 10, paddingVertical: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
        <Text variant="caption" color={colors.text}>{title}</Text>
        <Text variant="caption" color={colors.textMuted}>{last ?? "—"}</Text>
      </View>
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {d ? <SvgPath d={d.trim()} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
      </Svg>
    </View>
  );
}

/**
 * Zaman içinde — sekiz haftalık çizgiler ve kilometre taşları. Telefonda
 * kapalı, tablette açık gelir (web: 768 px ve üstü açık).
 */
export function GrowthTrends({ data }: { data: Growth | null | undefined }) {
  const { colors } = useTheme();
  const { wide } = useLayout();
  const [open, setOpen] = useState<boolean | null>(null);
  const shown = open ?? wide;
  if (!data || !data.weeks?.length) return null;
  const hasSeries = data.series ? Object.values(data.series).some((x) => x.some((p) => p.value !== null)) : false;
  if (!hasSeries && !data.milestones?.length) return null;

  return (
    <Card padded style={{ paddingVertical: spacing.md }}>
      <PressableScale
        onPress={() => setOpen(!shown)}
        accessibilityRole="button"
        accessibilityState={{ expanded: shown }}
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 32 }}
      >
        <Text variant="bodyStrong" style={{ flex: 1 }}>{t("progp.over_time")}</Text>
        <Text variant="caption" color={colors.textMuted}>{t("progp.n_weeks", { n: data.weeks.length })}</Text>
        <View style={{ transform: [{ rotate: shown ? "90deg" : "0deg" }] }}>
          <ChevronNextIcon color={colors.textMuted} size={18} />
        </View>
      </PressableScale>
      {shown ? (
        <View style={{ gap: spacing.md, marginTop: spacing.md }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
            {/* ÇİZGİ RENGİ METİN VARYANTINDAN: dolgu tonu (500) beyaz kart
                üstünde grafik eşiğini tutmuyordu; web aynı üç çizgiyi rol
                takma adıyla çiziyor ve açık temada o adlar tam bu değerler. */}
            <Spark title={t("exam.sec_writing")} points={data.series.writing} max={100} color={colors.primaryText} colors={colors} />
            <Spark title={t("exam.sec_speaking")} points={data.series.speaking} max={100} color={colors.successText} colors={colors} />
            <Spark title={t("exam.title")} points={data.series.usage} max={100} color={colors.streakText} colors={colors} />
            <Spark title={t("prog.answers")} points={data.series.answers} color={colors.textMuted} colors={colors} />
          </View>
          {data.milestones?.length ? (
            <View>
              <Text variant="micro" color={colors.textMuted} style={{ textTransform: "uppercase", letterSpacing: 1 }}>{t("progw.milestones")}</Text>
              {data.milestones.map((m) => (
                <View key={`${m.at}-${m.text}`} style={{ flexDirection: "row", alignItems: "baseline", gap: spacing.sm, marginTop: spacing.xs }}>
                  {/* Tarih arayüz dilinde; gün-yalnız dizgi `T00:00:00` ile okunuyor. */}
                  <Text variant="caption" color={colors.textMuted}>
                    {formatDay(m.at, { year: true })}
                  </Text>
                  <Text variant="body" color={colors.text} style={{ flex: 1 }}>{m.text}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </Card>
  );
}
