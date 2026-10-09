import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t, formatPercent } from "../lib/i18n";
import { useAuth } from "../lib/AuthContext";
import { bumpStats, useStatsBump } from "../lib/statsSignal";
import { advanceLevel, fetchLevelStatus, type LevelStatus } from "../game/level";
import { READY_AT } from "../lib/learningRules";
import { Card } from "./Card";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { useTheme, spacing, radii } from "../theme";
import { SkeletonCard, SkeletonLine, Skeleton } from "./Skeleton";

/* "Şimdilik kalsın" denen geçiş bir daha sorulmaz (aynı hedef seviye için). */
const DISMISS_KEY = "lernomi:level-advance-dismissed";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * SEVİYE İLERLEMESİ (docs/plan/level-progress.md) — Öğren ekranında.
 *
 * Bir seviye "her şeyi bitirince" değil, SABİT çekirdekte yeterlikle biter. Kart iki hâlde:
 *   hazırlık  "B1 hazırlığı %42" + kelime/Patika kırılımı; %60'ta seviye sınavı çağrısı, öncesinde
 *             de isteyene "şimdi gir" (ileri atlama: hazırlığı beklemek zorunlu değil).
 *   geçiş     seviye sınavı geçildiyse "B2'ye geçelim mi?" — seviye yalnız kabulde değişir.
 * Web karşılığı `components/learn/level-progress`.
 */
/*
 * SON DURUM BELLEKTE (kullanıcı başına). Kart sunucudan gelene kadar hiç
 * çizilmiyordu ve ~170 dp'lik kart Öğren ekranı açıldıktan sonra araya
 * girip günün görevlerini, öne çıkanları ve ızgarayı aşağı itiyordu
 * (QA F-0070 sınıfı). Artık ikinci açılıştan itibaren son durum hemen
 * çiziliyor (arkada tazeleniyor); ilk açılışta yeri iskelet tutuyor.
 */
let lastStatus: { uid: string; st: LevelStatus } | null = null;

export function LevelProgress() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const bump = useStatsBump();
  const [st, setSt] = useState<LevelStatus | null>(() => (user && lastStatus?.uid === user.id ? lastStatus.st : null));
  /* İstek düştüyse kart (ve iskeleti) kalkıyor: kart opsiyonel. */
  const [failed, setFailed] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    fetchLevelStatus()
      .then((s) => { lastStatus = { uid: user.id, st: s }; if (alive) { setSt(s); setFailed(false); } })
      .catch(() => { if (alive) setFailed(true); /* kart opsiyonel */ });
    AsyncStorage.getItem(DISMISS_KEY).then((v) => { if (alive) setDismissed(v); }).catch(() => {});
    return () => { alive = false; };
  }, [user, bump]);

  if (!st) {
    if (!user || failed) return null;
    /* Hazırlık kartının iskeleti: başlık + yüzde, çubuk, iki satır, bağlantı. */
    return (
      <SkeletonCard label={t("common.loading")} style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <SkeletonLine variant="h3" width="55%" />
          <SkeletonLine variant="bodyStrong" width={40} />
        </View>
        <Skeleton height={8} radius={4} />
        <SkeletonLine variant="caption" width="70%" />
        <SkeletonLine variant="caption" width="90%" />
        <SkeletonLine variant="caption" width="50%" style={{ marginVertical: spacing.xs }} />
      </SkeletonCard>
    );
  }

  if (st.advance && st.advance !== dismissed) {
    const passed = LEVELS[LEVELS.indexOf(st.advance) - 1] ?? st.level;
    const later = () => { setDismissed(st.advance); void AsyncStorage.setItem(DISMISS_KEY, st.advance!).catch(() => {}); };
    const yes = async () => {
      setBusy(true);
      try { await advanceLevel(st.advance!); bumpStats(); } catch { /* kart kalır */ }
      setBusy(false);
    };
    return (
      <Card padded style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
        <View accessibilityLiveRegion="polite">
          <Text variant="h3">{t("lvl.advance_title", { level: passed })}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("lvl.advance_body", { to: st.advance })}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs }}>
          <PressableScale disabled={busy} onPress={later} style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("lvl.advance_later")}</Text>
          </PressableScale>
          <PressableScale disabled={busy} onPress={() => void yes()} style={{ flex: 1, alignItems: "center", paddingVertical: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("lvl.advance_yes", { to: st.advance })}</Text>
          </PressableScale>
        </View>
      </Card>
    );
  }

  const r = st.readiness;
  const exam = () => nav.navigate("Exam", { level: st.level, module: null });
  return (
    <Card padded style={{ gap: spacing.sm, marginBottom: spacing.lg }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
        <Text variant="h3">{t("lvl.ready_title", { level: st.level })}</Text>
        <Text variant="bodyStrong" color={r.ready ? colors.successText : colors.text}>{formatPercent(r.total)}</Text>
      </View>
      <View accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: r.total }} style={{ height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
        <View style={{ width: `${Math.max(2, r.total)}%`, height: "100%", borderRadius: 4, backgroundColor: r.ready ? colors.success : colors.primary }} />
      </View>
      <Text variant="caption" color={colors.textMuted}>{t("lvl.ready_parts", { vocab: formatPercent(r.vocab), path: formatPercent(r.path) })}</Text>
      {r.ready ? (
        <PressableScale onPress={exam} style={{ alignItems: "center", paddingVertical: spacing.md, borderRadius: radii.lg, backgroundColor: colors.primary, marginTop: spacing.xs }}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("lvl.ready_now", { level: st.level })}</Text>
        </PressableScale>
      ) : (
        <>
          <Text variant="caption" color={colors.textMuted}>{t("lvl.ready_hint", { pct: formatPercent(READY_AT), level: st.level })}</Text>
          <PressableScale onPress={exam} hitSlop={6} style={{ paddingVertical: spacing.xs }}>
            <Text variant="caption" color={colors.primaryText}>{t("lvl.skip_ahead")} · {t("lvl.take_exam", { level: st.level })}</Text>
          </PressableScale>
        </>
      )}
    </Card>
  );
}
