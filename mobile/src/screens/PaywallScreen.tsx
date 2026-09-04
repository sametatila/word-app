import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView, ActivityIndicator, Linking } from "react-native";
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
 * ekran açılsa bile satın alma vaadi vermez. Play Abonelikler politikası: fiyat, süre ve
 * deneme yalnız mağazadan (PurchasesPackage); sabit fiyat, uydurma avantaj ("reklamsız"),
 * gizli geri yükleme yok. Yalnız gerçekten kilitli olan şey listelenir.
 */
const PLAY_SUBSCRIPTIONS_URL = "https://play.google.com/store/account/subscriptions";

/** Gerçekten premium'a bağlı özellikler — ExamPrep'teki kilitle birebir. */
const COMPARE: { key: string; free: string; premium: string }[] = [
  { key: "paywall.schreiben_alistirmalari", free: "—", premium: "Var" },
  { key: "paywall.kelime_turlari_dersler_yuruyus", free: "Var", premium: "Var" },
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
  if (pkg.packageType === "ANNUAL") return t("paywall.yillik");
  if (pkg.packageType === "MONTHLY") return t("paywall.aylik");
  return pkg.product.title;
}

/** Mağazanın bildirdiği ücretsiz deneme (giriş fiyatı 0) — yoksa deneme vaadi yok. */
function freeTrialOf(pkg: PurchasesPackage | undefined): string | null {
  const intro = pkg?.product.introPrice;
  if (!intro || intro.price !== 0) return null;
  return `${intro.periodNumberOfUnits} ${intro.periodUnit === "DAY" ? t("paywall.gun") : intro.periodUnit === "WEEK" ? t("paywall.hafta") : t("paywall.ay")}`;
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
    else setError(t("paywall.satin_alma_tamamlanmadi"));
  }

  async function doRestore() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const ok = await restore();
    setBusy(false);
    if (ok) nav.goBack();
    else setError(t("paywall.geri_yuklenecek_satin_alma_yok"));
  }

  const close = (
    <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
      <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityRole="button" accessibilityLabel={t("common.kapat")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
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
          <Text variant="h2" style={{ textAlign: "center" }}>{t("paywall.premium_su_an_satista_degil")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>{t("paywall.tum_ucretsiz_ozellikler_acik")}</Text>
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
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{t("paywall.sinirsiz_ogren_sinavina_tam_hazirlan")}</Text>
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: spacing.sm, borderBottomWidth: 1.5, borderBottomColor: colors.border }}>
            <Text variant="micro" color={colors.textMuted} style={{ flex: 1.5 }}>{t("paywall.ozellik")}</Text>
            <Text variant="micro" color={colors.textFaint} style={{ flex: 1, textAlign: "center" }}>{t("paywall.ucretsiz")}</Text>
            <Text variant="micro" color={colors.primary} style={{ flex: 1, textAlign: "center" }}>PREMIUM</Text>
          </View>
          {COMPARE.map((r, i) => <CompareRow key={r.key} row={r} colors={colors} last={i === COMPARE.length - 1} />)}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl, paddingHorizontal: 4 }}>
          <ExamIcon color={colors.accent} size={22} />
          {/* Sınav vaadi yalnız sınavı olan kursta: İngilizce kursunda Goethe/telc
              karşılığı yok, orada CEFR vaadi tek başına doğru olanı. */}
          <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>
            {t(hasExams(currentCourseId()) ? "paywall.icerik_cefr_a1c1_ve_goethe_telc" : "paywall.icerik_cefr_a1c1")}
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
                    <Text variant="caption" color={colors.textMuted}>{tr ? t("paywall.ilk_sure_ucretsiz", { sure: tr }) : t("paywall.istedigin_zaman_iptal")}</Text>
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
        <PressableScale onPress={start} disabled={busy || !pkg} accessibilityRole="button" accessibilityLabel={trial ? t("paywall.ucretsiz_denemeyi_baslat") : t("paywall.abone_ol")} style={[{ borderRadius: radii.lg, backgroundColor: pkg ? colors.primary : colors.surface2, paddingVertical: 17, alignItems: "center" }, pkg ? softShadow(colors.primary, 12) : {}]}>
          {busy ? <ActivityIndicator color="#fff" /> : <Text variant="h3" color={pkg ? "#fff" : colors.textFaint}>{trial ? t("paywall.ucretsiz_denemeyi_baslat") : t("paywall.abone_ol")}</Text>}
        </PressableScale>
        {/* Play Abonelikler politikası: süre, fiyat, yenileme ve iptal yolu satın almadan önce görünür. */}
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm, lineHeight: 16 }}>
          {pkg ? (trial ? t("paywall.deneme_sonra_ucret", { sure: trial, fiyat: pkg.product.priceString }) : t("paywall.fiyat_donem", { fiyat: pkg.product.priceString })) : ""}
          {" · "}{t("paywall.otomatik_yenilenir_play_iptal")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.lg, marginTop: spacing.xs }}>
          <PressableScale onPress={doRestore} hitSlop={6} accessibilityLabel={t("paywall.satin_almayi_geri_yukle")} style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.satin_almayi_geri_yukle")}</Text>
          </PressableScale>
          <PressableScale onPress={() => Linking.openURL(PLAY_SUBSCRIPTIONS_URL).catch(() => {})} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("paywall.aboneligi_yonet")}</Text>
          </PressableScale>
          <PressableScale onPress={() => openLegal("terms")} hitSlop={6} accessibilityRole="link" style={{ paddingVertical: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.kullanim_sartlari")}</Text>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}
