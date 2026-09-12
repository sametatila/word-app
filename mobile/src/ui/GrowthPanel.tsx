import React, { useEffect, useState } from "react";
import { DECAY_DAYS } from "../lib/learningRules";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { routeFromHref } from "../lib/pushRoute";
import { t, dateLocale } from "../lib/i18n";
import { api } from "../api/client";
import { todayStr } from "../game/session";
import { Text } from "./Text";
import { Card } from "./Card";
import { PressableScale } from "./PressableScale";
import { SkeletonBar, SkeletonLine } from "./Skeleton";
import Svg, { Path as SvgPath } from "react-native-svg";
import { useTheme, spacing, radii, type Palette } from "../theme";

/**
 * Gelişim paneli — "neredeyim" ve "şimdi ne yapmalıyım".
 *
 * MOBILDE HİÇ YOKTU. `/api/growth` ve rapor katmanı aylardır duruyor, web
 * profilinde bir panel onu okuyor; Android'de çağıran hiçbir şey yoktu
 * (web-parity 11.136).
 *
 * Bu ilk parça panelin ÖLÇÜM yüzünü taşıyor: seviye + kanıt sayısı, haftalık
 * özet cümlesi, altı beceride yeterlik (şimdi, dört hafta önceye göre değişim,
 * bant) ve önerilen sıradaki adım. Sekiz haftalık seri grafikleri ile
 * kilometre taşları ayrı bir turda gelecek — panelin webdeki hâlinde de onlar
 * kapalı bir ayrıntı bölümünde duruyor.
 *
 * Gün İSTEMCİNİN yerel günü: uç gün gelmezse sunucunun UTC gününe düşüyor ve
 * gece yarısına yakın açılan rapor bir gün kaymış seriyle çiziliyor.
 */
type WeekPoint = { week: string; value: number | null; n: number };
type Prof = { skill: string; label: string; now: number | null; before: number | null; band: string | null };
type NextStep = { skill: string; label: string; reason: string; href: string; title: string; minutes: number };
type Growth = {
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
 * Sekiz haftalık çizgi — web `progress-panel` `Spark` ile AYNI geometri
 * (120×32, dört piksel iç boşluk, ölçülmemiş hafta çizgiyi KESİYOR).
 *
 * Kesme önemli: boşluğu sıfır saymak, ölçüm yapılmamış bir haftayı "puanın
 * dibe vurdu" diye çizerdi.
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
    <View style={{ flex: 1, minWidth: 132, gap: 2 }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" }}>
        <Text variant="micro" color={colors.textMuted}>{title}</Text>
        <Text variant="micro" color={colors.text}>{last ?? "—"}</Text>
      </View>
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        {d ? <SvgPath d={d.trim()} stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
      </Svg>
    </View>
  );
}

function tone(now: number | null, colors: Palette): string {
  if (now === null) return colors.surface2;
  if (now >= 75) return colors.success;
  if (now >= 45) return colors.primary;
  return colors.danger;
}

export function GrowthPanel() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [data, setData] = useState<Growth | null | undefined>(undefined);
  /* Ayrıntı KAPALI geliyor: yukarıdaki çubuklar "neredeyim" sorusuna zaten
     cevap veriyor, aşağısı cevabı beğenmeyip "neden" diye soran için. Web de
     aynı kararı veriyor (`Disclosure`). */
  const [detail, setDetail] = useState(false);

  useEffect(() => {
    let alive = true;
    api<Partial<Growth>>(`/api/growth?day=${todayStr()}`)
      .then((g) => {
        if (!alive) return;
        /* Gövde doğrulanıyor: 200 dönen ama biçimi tutmayan bir cevapta
           `proficiency.map` patlıyor ve panel değil bütün ekran iniyor.
           Web aynı denetimi yapıyor. */
        setData(Array.isArray(g?.proficiency) ? (g as Growth) : null);
      })
      .catch(() => { if (alive) setData(null); });
    return () => { alive = false; };
  }, []);

  if (data === undefined) {
    return (
      /* YÜKLEME DUYURULUYOR — §152'nin artığı: kök düzeltme `SkeletonCard`tan
         geçen ekranları kapsıyordu, bu kart iskeletini KENDİ kuruyor. Web aynı
         kartta `role="status" aria-busy` + etiket taşıyor. */
      <Card padded accessibilityRole="progressbar" accessibilityState={{ busy: true }} accessibilityLabel={t("progp.loading")} style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
        <SkeletonLine variant="bodyStrong" width={150} />
        <SkeletonLine variant="caption" width="90%" />
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={{ gap: spacing.xs }}>
            <SkeletonLine variant="micro" width="60%" />
            <SkeletonBar height={6} />
          </View>
        ))}
      </Card>
    );
  }
  if (!data) return null;
  /* Hiç ölçüm yoksa panel görünmüyor: "ölçülmedi" yazan altı çubuk, yeni
     kullanıcıya kendi eksikliğini gösteren bir liste demek (web de öyle). */
  const hasSeries = data.series ? Object.values(data.series).some((x) => x.some((p) => p.value !== null)) : false;
  if (!data.proficiency.some((p) => p.now !== null) && !hasSeries) return null;

  const step = data.next;
  const route = step ? routeFromHref(step.href) : null;

  return (
    <Card padded style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.sm }}>
        <Text variant="bodyStrong">{t("progress.progress")} · {data.level}</Text>
        <Text variant="micro" color={colors.textMuted}>{t("progp.window", { n: data.evidenceCount, days: DECAY_DAYS })}</Text>
      </View>

      {data.summary?.text ? <Text variant="caption" color={colors.text}>{data.summary.text}</Text> : null}

      {data.proficiency.map((p) => {
        const delta = p.now !== null && p.before !== null ? p.now - p.before : null;
        return (
          <View key={p.skill} style={{ gap: spacing.xs }}>
            <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.sm }}>
              <Text variant="micro" color={colors.text}>{p.label}</Text>
              <Text variant="micro" color={colors.textMuted}>
                {p.now === null ? t("assess.not_measured") : (
                  <>
                    {p.now}
                    {/* Değişim yalnızca dört hafta önce de ölçüm VARSA
                        gösteriliyor: yokluğu sıfır saymak, yeni başlayan
                        herkese "hiç ilerlemedin" demek olurdu. */}
                    {delta !== null && delta !== 0 ? (
                      <Text variant="micro" color={delta > 0 ? colors.successText : colors.dangerText}>
                        {" "}{delta > 0 ? "+" : "−"}{Math.abs(delta)}
                      </Text>
                    ) : null}
                    {p.band ? <Text variant="micro" color={colors.textMuted}>  {t(`band.${p.band}`)}</Text> : null}
                  </>
                )}
              </Text>
            </View>
            <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden" }}>
              <View style={{ height: "100%", width: `${p.now ?? 0}%`, backgroundColor: tone(p.now, colors), borderRadius: 3 }} />
            </View>
          </View>
        );
      })}

      {/* Önerilen adım ölçümün hemen altında: "buradasın" ile "şunu yap"
          arasında bir ekran mesafesi olmamalı (web aynı yerde tutuyor).
          Adres tanınmıyorsa düğme HİÇ çizilmiyor - hiçbir yere gitmeyen bir
          düğme, olmayan düğmeden kötü. */}
      {step && route ? (
        <PressableScale
          onPress={() => (nav.navigate as (n: string, p?: object) => void)(route.name, route.params)}
          style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xs, borderRadius: radii.md, backgroundColor: colors.surface2, paddingHorizontal: spacing.md, paddingVertical: 10 }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="caption" color={colors.text}>{t("skills.next")}: {step.title}</Text>
            <Text variant="micro" color={colors.textMuted} numberOfLines={1}>{step.reason} · {t("skills.dk", { n: step.minutes })}</Text>
          </View>
          <Text variant="micro" color={colors.primaryText}>{t("common.start")}</Text>
        </PressableScale>
      ) : null}

      {/* NASIL GİDİYORUM — sekiz haftalık seri ve kilometre taşları. */}
      {data.weeks?.length ? (
        <>
          <PressableScale
            onPress={() => setDetail((v) => !v)}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.xs, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline }}
          >
            <Text variant="caption" color={colors.text}>{t("progp.how_am_i_doing")}</Text>
            <Text variant="micro" color={colors.textMuted}>{t("progp.n_weeks", { n: data.weeks.length })}</Text>
          </PressableScale>
          {detail ? (
            <View style={{ gap: spacing.md, marginTop: spacing.sm }}>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
                {/* ÇİZGİ RENGİ METİN VARYANTINDAN. Dolgu tonu (500) beyaz kart
                    üstünde 2.77 / 3.55 / 2.88 veriyordu — grafik eşiği 3.0 ve
                    ikisi onu bile tutmuyor. Web aynı üç çizgiyi rol takma adıyla
                    çiziyor (`progress-panel`: `--color-brand`, `--color-mint`,
                    `--color-flame`) ve açık temada o adlar tam bu `*Text`
                    değerleri: 5.39 / 4.59 / 4.60. */}
                <Spark title={t("exam.sec_writing")} points={data.series.writing} max={100} color={colors.primaryText} colors={colors} />
                <Spark title={t("exam.sec_speaking")} points={data.series.speaking} max={100} color={colors.successText} colors={colors} />
                <Spark title={t("exam.title")} points={data.series.usage} max={100} color={colors.streakText} colors={colors} />
                <Spark title={t("prog.answers")} points={data.series.answers} color={colors.textMuted} colors={colors} />
              </View>
              {data.milestones?.length ? (
                <View>
                  <Text variant="micro" color={colors.textMuted}>{t("progw.milestones")}</Text>
                  {data.milestones.map((m) => (
                    <View key={`${m.at}-${m.text}`} style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
                      {/* Tarih arayüz dilinde -- web `progress-panel` içindeki nota bak:
                          gün-yalnız dizgi `T00:00:00` ile okunmazsa UTC kayması
                          tarihi bir gün geriye alır. */}
                      <Text variant="micro" color={colors.textFaint}>
                        {new Date(`${m.at}T00:00:00`).toLocaleDateString(dateLocale(), { day: "numeric", month: "short", year: "numeric" })}
                      </Text>
                      <Text variant="caption" color={colors.text} style={{ flex: 1 }}>{m.text}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          ) : null}
        </>
      ) : null}
    </Card>
  );
}
