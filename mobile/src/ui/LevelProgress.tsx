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
import { CheckIcon, ChevronNextIcon } from "./icons";

/* "Şimdilik kalsın" denen geçiş bir daha sorulmaz (aynı hedef seviye için). */
const DISMISS_KEY = "lernomi:level-advance-dismissed";
/* Son durum cihazda da (kullanıcı başına): soğuk açılışta da kart beklemeden çiziliyor. */
const STATUS_KEY = "lernomi:level-status:";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * SEVİYE İLERLEMESİ (docs/plan/level-progress.md).
 *
 * Bir seviye "her şeyi bitirince" değil, SABİT çekirdekte yeterlikle biter. İki yerde (Samet,
 * 2026-10-17: "Öğren'de içeriği gereksiz yere genişletiyor"):
 *   Gelişim (`place="progress"`)  hazırlık kartı: "B1 hazırlığı %42" + kelime/Patika kırılımı;
 *             %60'ta seviye sınavı çağrısı, öncesinde de isteyene "şimdi gir".
 *   Öğren (`place="learn"`)  yalnız bir şey yapılacaksa: hazırlık %60'ı geçince tek satır
 *             "sınava hazırsın", seviye sınavı geçildiyse "B2'ye geçelim mi?" kararı (seviye
 *             yalnız kabulde değişir). Öncesinde hiçbir şey çizilmez.
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

export function LevelProgress({ place }: { place: "learn" | "progress" }) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const bump = useStatsBump();
  const [st, setSt] = useState<LevelStatus | null>(() => (user && lastStatus?.uid === user.id ? lastStatus.st : null));
  /* İstek düştüyse kart (ve iskeleti) kalkıyor: kart opsiyonel. */
  const [failed, setFailed] = useState(false);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  /* Cihazdaki son durum okundu mu: okunana dek (birkaç ms) iskelet de çizilmiyor. */
  const [stored, setStored] = useState(() => st !== null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    let fresh = false;
    if (!lastStatus || lastStatus.uid !== user.id) {
      AsyncStorage.getItem(STATUS_KEY + user.id)
        .then((v) => {
          if (!alive) return;
          const s = v ? (JSON.parse(v) as LevelStatus) : null;
          if (s && !fresh) { lastStatus = { uid: user.id, st: s }; setSt(s); }
        })
        .catch(() => {})
        .finally(() => { if (alive) setStored(true); });
    }
    fetchLevelStatus()
      .then((s) => {
        fresh = true;
        lastStatus = { uid: user.id, st: s };
        void AsyncStorage.setItem(STATUS_KEY + user.id, JSON.stringify(s)).catch(() => {});
        if (alive) { setSt(s); setFailed(false); }
      })
      .catch(() => { if (alive) setFailed(true); /* kart opsiyonel */ });
    AsyncStorage.getItem(DISMISS_KEY).then((v) => { if (alive) setDismissed(v); }).catch(() => {});
    return () => { alive = false; };
  }, [user, bump]);

  const exam = () => st && nav.navigate("Exam", { level: st.level, module: null });

  if (!st) {
    if (!user || failed || !stored) return null;
    /* Öğren'de yalnız tek satırın yeri (ilk açılışta; sonra cihazdaki son durum çiziliyor). */
    if (place === "learn") {
      return (
        <SkeletonCard label={t("common.loading")} padded={false} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, padding: spacing.md, marginBottom: spacing.lg }}>
          <Skeleton width={22} height={22} radius={11} />
          <SkeletonLine variant="bodyStrong" width="60%" />
        </SkeletonCard>
      );
    }
    /* Hazırlık kartının iskeleti: başlık + yüzde, çubuk, iki satır, bağlantı. */
    return (
      <SkeletonCard label={t("common.loading")} style={{ gap: spacing.sm }}>
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

  if (place === "learn" && st.advance && st.advance !== dismissed) {
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
  if (place === "learn") {
    if (!r.ready) return null;
    return (
      <PressableScale onPress={exam} accessibilityRole="button" accessibilityLabel={`${t("lvl.ready_now", { level: st.level })}. ${t("lvl.take_exam", { level: st.level })}`}
        style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, backgroundColor: colors.surface, padding: spacing.md, marginBottom: spacing.lg }}>
        <CheckIcon color={colors.successText} size={22} />
        <Text variant="bodyStrong" style={{ flex: 1 }}>{t("lvl.ready_now", { level: st.level })}</Text>
        <ChevronNextIcon color={colors.textFaint} size={20} />
      </PressableScale>
    );
  }
  return (
    <Card padded style={{ gap: spacing.sm }}>
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
