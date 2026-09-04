import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView, ActivityIndicator, Linking, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { PurchasesPackage } from "react-native-purchases";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon, CrownIcon, ExamIcon } from "../ui/icons";
import { SkeletonLine, SkeletonTile } from "../ui/Skeleton";
import { track } from "../lib/track";
import { haptic } from "../lib/haptics";
import { billingAvailable, getPackages, purchase, restore } from "../lib/billing";
import { openLegal } from "../lib/legal";
import { hasExams } from "../data/exams";
import { currentCourseId } from "../lib/courses";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Paywall — YALNIZ mağaza entegrasyonu canlıyken (RevenueCat anahtarı) anlamlı; canlı
 * değilken hiçbir giriş noktası buraya gelmez (Profil bandı ve sınav kilidi gizli) ve
 * ekran açılsa bile satın alma vaadi vermez. Play ve App Store abonelik politikaları aynı
 * şeyi istiyor: fiyat, süre ve deneme yalnız mağazadan (PurchasesPackage); sabit fiyat,
 * uydurma avantaj ("reklamsız"), gizli geri yükleme yok. Yalnız gerçekten kilitli olan
 * şey listelenir.
 */
/** "Aboneliği yönet" — abonelik hangi mağazadan alındıysa oranın abonelik ekranı. */
const SUBSCRIPTIONS_URL = Platform.OS === "ios"
  ? "https://apps.apple.com/account/subscriptions"
  : "https://play.google.com/store/account/subscriptions";

/** Gerçekten premium'a bağlı özellikler — ExamPrep'teki kilitle birebir. */
const COMPARE: { key: string; free: string; premium: string }[] = [
  { key: "paywall.schreiben_alistirmalari", free: "—", premium: "Var" },
  { key: "paywall.word_rounds_lessons_walk_mode", free: "Var", premium: "Var" },
];

function CompareRow({ row, colors, last }: { row: (typeof COMPARE)[number]; colors: Palette; last: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 11, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <Text variant="caption" style={{ flex: 1.5 }}>{t(row.key)}</Text>
      <View style={{ flex: 1, alignItems: "center" }}>{row.free === "Var" ? <CheckIcon color={colors.textMuted} size={17} /> : <Text variant="caption" color={colors.textFaint}>—</Text>}</View>
      <View style={{ flex: 1, alignItems: "center" }}><CheckIcon color={colors.success} size={17} /></View>
    </View>
  );
}

function planLabel(pkg: PurchasesPackage): string {
  if (pkg.packageType === "ANNUAL") return t("paywall.yearly");
  if (pkg.packageType === "MONTHLY") return t("paywall.monthly");
  return pkg.product.title;
}

/** Mağazanın bildirdiği ücretsiz deneme (giriş fiyatı 0) — yoksa deneme vaadi yok. */
function freeTrialOf(pkg: PurchasesPackage | undefined): string | null {
  const intro = pkg?.product.introPrice;
  if (!intro || intro.price !== 0) return null;
  return `${intro.periodNumberOfUnits} ${intro.periodUnit === "DAY" ? t("paywall.days") : intro.periodUnit === "WEEK" ? t("paywall.weeks") : t("paywall.ay")}`;
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const live = billingAvailable();
  const [pkgs, setPkgs] = useState<PurchasesPackage[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("paywall_view", 0, "mobile");
    if (!live) { setPkgs([]); return; }
    let alive = true;
    void getPackages().then((p) => {
      if (!alive) return;
      const sorted = [...p].sort((a, b) => (a.packageType === "ANNUAL" ? -1 : b.packageType === "ANNUAL" ? 1 : 0));
      setPkgs(sorted);
      setSelected(sorted[0]?.identifier ?? null);
    });
    return () => { alive = false; };
  }, [live]);

  const pkg = pkgs?.find((p) => p.identifier === selected);
  const trial = freeTrialOf(pkg);

  async function start() {
    if (!pkg || busy) return;
    track("purchase_start", 0, pkg.packageType);
    setBusy(true);
    setError(null);
    const ok = await purchase(pkg);
    setBusy(false);
    if (ok) { haptic("correct"); track("purchase_done", 0, pkg.packageType); nav.goBack(); }
    else setError(t("paywall.purchase_wasn_t_completed"));
  }

  async function doRestore() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const ok = await restore();
    setBusy(false);
    if (ok) nav.goBack();
    else setError(t("paywall.no_purchase_to_restore_on_this"));
  }

  const close = (
    <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
      <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityRole="button" accessibilityLabel={t("common.close")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
    </View>
  );

  // Mağaza bağlı değil ya da paket gelmedi: satın alma vaadi yok, dürüst durum.
  if (!live || (pkgs && pkgs.length === 0)) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {close}
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl, gap: spacing.md }}>
          <View style={{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <CrownIcon color={colors.textFaint} size={36} />
          </View>
          <Text variant="h2" style={{ textAlign: "center" }}>{t("paywall.premium_isn_t_on_sale_right_now")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>{t("paywall.all_features_are_free_to_use_for")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {close}
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }} showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 84, height: 84, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <CrownIcon color="#fff" size={44} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>{t("paywall.nomi_premium")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{t("paywall.unlimited_learning_full_exam")}</Text>
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: spacing.sm, borderBottomWidth: 1.5, borderBottomColor: colors.border }}>
            <Text variant="micro" color={colors.textMuted} style={{ flex: 1.5 }}>{t("paywall.feature")}</Text>
            <Text variant="micro" color={colors.textFaint} style={{ flex: 1, textAlign: "center" }}>{t("paywall.free")}</Text>
            <Text variant="micro" color={colors.primary} style={{ flex: 1, textAlign: "center" }}>PREMIUM</Text>
          </View>
          {COMPARE.map((r, i) => <CompareRow key={r.key} row={r} colors={colors} last={i === COMPARE.length - 1} />)}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl, paddingHorizontal: 4 }}>
          <ExamIcon color={colors.accent} size={22} />
          {/* Sınav vaadi yalnız sınavı olan kursta: İngilizce kursunda Goethe/telc
              karşılığı yok, orada CEFR vaadi tek başına doğru olanı. */}
          <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>
            {t(hasExams(currentCourseId()) ? "paywall.content_is_built_around_cefr_a1" : "paywall.content_is_built_around_cefr")}
          </Text>
        </View>

        {pkgs === null ? (
          // Plan satırları gelene dek aynı boyda iskelet: liste dolunca kaydırma
          // konumu ve alttaki düğme yerinden oynamıyor.
          <View style={{ gap: spacing.md }}>
            {[0, 1].map((i) => (
              <View key={i} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: colors.border, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <SkeletonTile size={24} radius={12} />
                <View style={{ flex: 1 }}>
                  <SkeletonLine variant="h3" width="45%" />
                  <SkeletonLine variant="caption" width="65%" />
                </View>
                <SkeletonLine variant="h3" width={72} />
              </View>
            ))}
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            {pkgs.map((p) => {
              const active = selected === p.identifier;
              const tr = freeTrialOf(p);
              return (
                <PressableScale key={p.identifier} onPress={() => setSelected(p.identifier)} accessibilityRole="radio" accessibilityState={{ selected: active }} accessibilityLabel={`${planLabel(p)}, ${p.product.priceString}`} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                    {active && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="h3">{planLabel(p)}</Text>
                    <Text variant="caption" color={colors.textMuted}>{tr ? t("paywall.first_free", { duration: tr }) : t("paywall.cancel_anytime")}</Text>
                  </View>
                  <Text variant="h3" color={active ? colors.primary : colors.text}>{p.product.priceString}</Text>
                </PressableScale>
              );
            })}
          </View>
        )}
      </ScrollView>

      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm }}>
        {error ? <Text variant="caption" color={colors.danger} style={{ textAlign: "center", marginBottom: spacing.sm }}>{error}</Text> : null}
        <PressableScale onPress={start} disabled={busy || !pkg} accessibilityRole="button" accessibilityLabel={trial ? t("paywall.start_free_trial") : t("paywall.subscribe")} style={[{ borderRadius: radii.lg, backgroundColor: pkg ? colors.primary : colors.surface2, paddingVertical: 17, alignItems: "center" }, pkg ? softShadow(colors.primary, 12) : {}]}>
          {busy ? <ActivityIndicator color="#fff" /> : <Text variant="h3" color={pkg ? "#fff" : colors.textFaint}>{trial ? t("paywall.start_free_trial") : t("paywall.subscribe")}</Text>}
        </PressableScale>
        {/* Abonelik politikası (Play ve App Store): süre, fiyat, yenileme ve iptal yolu
            satın almadan önce görünür. İptal yolu mağazaya göre ayrı metin. */}
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, lineHeight: 16 }}>
          {pkg ? (trial ? t("paywall.free_then", { duration: trial, price: pkg.product.priceString }) : t("paywall.fiyat_donem", { price: pkg.product.priceString })) : ""}
          {" · "}{t(Platform.OS === "ios" ? "paywall.renew_cancel_appstore" : "paywall.renew_cancel_play")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.lg, marginTop: spacing.xs }}>
          <PressableScale onPress={doRestore} hitSlop={6} accessibilityLabel={t("paywall.restore_purchase")} style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.restore_purchase")}</Text>
          </PressableScale>
          <PressableScale onPress={() => Linking.openURL(SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.manage_subscription")}</Text>
          </PressableScale>
          <PressableScale onPress={() => openLegal("terms")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.terms_of_use")}</Text>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}
