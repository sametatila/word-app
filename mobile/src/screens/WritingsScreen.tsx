import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ReportSheet } from "../ui/ReportSheet";
import { AiNotice } from "../ui/AiNotice";
import { ArrowBackIcon, WriteIcon } from "../ui/icons";
import { SkeletonCard, SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { fetchWritings, type Writing } from "../game/writings";
import { useTheme, spacing, radii, type Palette } from "../theme";

/** Tür -> sözlük anahtarı. */
const KIND_KEY: Record<string, string> = { writing: "unitkind.write", speaking: "unitkind.speaking" };

function scoreTone(score: number | null, colors: Palette): string {
  if (score === null) return colors.textMuted;
  return score >= 70 ? colors.success : score >= 40 ? colors.streak : colors.danger;
}

function WritingCard({ w, colors, onReport }: { w: Writing; colors: Palette; onReport: (w: Writing) => void }) {
  const [open, setOpen] = useState(false);
  const score = w.result?.score?.overall ?? null;
  const tone = scoreTone(score, colors);
  return (
    <PressableScale onPress={() => setOpen((o) => !o)}>
      <Card padded style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: score === null ? colors.surface2 : tone + "22" }}>
            <Text variant="h3" color={tone}>{score ?? "…"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{t(KIND_KEY[w.kind] ?? "") || w.kind} · {w.level}</Text>
            <Text variant="caption" color={colors.textMuted} numberOfLines={open ? undefined : 2}>{w.answer}</Text>
          </View>
        </View>
        {open && score === null ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("writings.puanlanacak")}</Text> : null}
        {open && score !== null ? (
          <PressableScale onPress={() => onReport(w)} hitSlop={8} accessibilityLabel={t("writings.degerlendirmeyi_bildir")} style={{ alignSelf: "flex-start", marginTop: spacing.sm }}>
            <Text variant="micro" color={colors.textFaint}>{t("writings.degerlendirmeyi_bildir")}</Text>
          </PressableScale>
        ) : null}
        <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>{w.day}</Text>
      </Card>
    </PressableScale>
  );
}

export function WritingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [items, setItems] = useState<Writing[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [report, setReport] = useState<Writing | null>(null); // "Bildir" açık olan değerlendirme

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    fetchWritings().then((it) => { if (alive) { setItems(it); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("writings.yazilarim")}</Text>
      </View>
      {phase === "loading" ? (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} style={{ marginBottom: spacing.md }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <SkeletonTile size={48} />
                <View style={{ flex: 1 }}>
                  <SkeletonLine variant="bodyStrong" width="45%" />
                  <SkeletonLine variant="caption" width="100%" />
                  <SkeletonLine variant="caption" width="70%" />
                </View>
              </View>
              <SkeletonLine variant="micro" width={72} style={{ marginTop: spacing.sm }} />
            </SkeletonCard>
          ))}
        </ScrollView>
      ) : phase === "error" || (items && items.length === 0) ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}><WriteIcon color={colors.primary} size={36} /></View>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("writings.henuz_degerlendirilmis_yazin_yok_yazma_alist")}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          <AiNotice variant="output" style={{ marginBottom: spacing.md }} />
          {(items ?? []).map((w) => <WritingCard key={w.id} w={w} colors={colors} onReport={setReport} />)}
        </ScrollView>
      )}
      <ReportSheet visible={!!report} kind="assessment" refId={report ? String(report.id) : ""} content={report ? JSON.stringify(report.result ?? {}) : ""} onClose={() => setReport(null)} />
    </View>
  );
}
