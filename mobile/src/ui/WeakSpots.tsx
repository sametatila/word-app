import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, formatPercent } from "../lib/i18n";
import { api } from "../api/client";
import { Text } from "./Text";
import { Card } from "./Card";
import { PressableScale } from "./PressableScale";
import { SkeletonBar, SkeletonLine } from "./Skeleton";
import { useTheme, spacing, radii } from "../theme";

/**
 * Zayıf noktalar — son otuz günün ilk üç hata türü, karıştırılan kelimeler,
 * zayıf kurallar.
 *
 * MOBILDE HİÇ YOKTU. Uç (`/api/errors`) ve rapor katmanı aylardır duruyordu,
 * web profilinde bir kart onu okuyordu; Android'de onu çağıran hiçbir şey
 * yoktu — yani "neyi yanlış yapıyorum" sorusunun cevabı tek platformdaydı.
 * Üstelik sınav sonucundaki ipucu ("zayıf bölüm için profilde 'Zayıf
 * noktaların' var") mobilde OLMAYAN bir yere işaret ediyordu.
 *
 * Hata yoksa kart hiç çizilmiyor: boş bir "zayıf noktan yok" kartı ne bilgi
 * verir ne motive eder (web de öyle).
 */
type ErrorShare = { type: string; label: string; n: number; pct: number; href: string | null; gameLabel: string | null };
type ConfusionPair = { wordId: number; de: string; artikel: string | null; tr: string; with: string; n: number };
type ErrorReport = { days: number; totalWrong: number; types: ErrorShare[]; confusions: ConfusionPair[]; weakRules: string[] };

/** `/learn/game?game=artikel` → mobil tek-oyun pratiği. */
function gameOf(href: string | null): string | null {
  const m = href?.match(/[?&]game=([a-z_]+)/);
  return m ? m[1] : null;
}

export function WeakSpots() {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [report, setReport] = useState<ErrorReport | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    api<Partial<ErrorReport>>("/api/errors")
      .then((d) => {
        if (!alive) return;
        /* Gövde doğrulanıyor: 200 dönen ama biçimi tutmayan bir cevapta
           `types.length` patlıyor ve kart değil bütün ekran iniyordu.
           Web aynı denetimi yapıyor. */
        setReport(Array.isArray(d?.types) && Array.isArray(d?.weakRules) ? (d as ErrorReport) : null);
      })
      .catch(() => { if (alive) setReport(null); });
    return () => { alive = false; };
  }, []);

  if (report === undefined) {
    return (
      /* YÜKLEME DUYURULUYOR — §152'nin artığı: kök düzeltme `SkeletonCard`tan
         geçen ekranları kapsıyordu, bu kart iskeletini KENDİ kuruyor. Web aynı
         kartta `role="status" aria-busy` + etiket taşıyor. */
      <Card padded accessibilityRole="progressbar" accessibilityState={{ busy: true }} accessibilityLabel={t("weak.loading")} style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
        <SkeletonLine variant="micro" width={120} />
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ gap: 4 }}>
            <SkeletonLine variant="caption" width="70%" />
            <SkeletonBar height={6} />
          </View>
        ))}
      </Card>
    );
  }
  if (!report || (!report.types.length && !report.weakRules.length)) return null;

  return (
    <Card padded style={{ marginBottom: spacing.lg, gap: spacing.sm }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.sm }}>
        <Text variant="bodyStrong">{t("weak.title")}</Text>
        <Text variant="micro" color={colors.textMuted}>{t("weak.window", { days: report.days, wrong: report.totalWrong })}</Text>
      </View>

      {report.types.slice(0, 3).map((x) => {
        const game = gameOf(x.href);
        return (
          <View key={x.type} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text variant="caption" color={colors.text}>{x.label}</Text>
                <Text variant="micro" color={colors.textMuted}>{x.n} · {formatPercent(x.pct)}</Text>
              </View>
              <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 4 }}>
                <View style={{ height: "100%", width: `${x.pct}%`, backgroundColor: colors.danger, borderRadius: 3 }} />
              </View>
            </View>
            {game ? (
              <PressableScale onPress={() => nav.navigate("Game", { game })} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
                <Text variant="micro" color={colors.primaryText}>{t("weak.study")}</Text>
              </PressableScale>
            ) : null}
          </View>
        );
      })}

      {report.confusions.length ? (
        <View style={{ marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted}>{t("weak.confusions")}</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {report.confusions.slice(0, 5).map((c) => (
              <View key={`${c.wordId}-${c.with}`} style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
                <Text variant="micro" color={colors.text}>
                  {c.artikel ? `${c.artikel} ` : ""}{c.de} = {c.tr}, {c.with} {t("weak.not")}
                </Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {report.weakRules.length ? (
        <View style={{ marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted}>{t("weak.rules")}</Text>
          {report.weakRules.slice(0, 3).map((r) => (
            <View key={r} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm, marginTop: 4 }}>
              <Text variant="caption" color={colors.text} style={{ flex: 1 }}>{r}</Text>
              <PressableScale onPress={() => nav.navigate("Tabs", { screen: "Path" })} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
                <Text variant="micro" color={colors.primaryText}>{t("weak.go_to_lesson")}</Text>
              </PressableScale>
            </View>
          ))}
        </View>
      ) : null}
    </Card>
  );
}
