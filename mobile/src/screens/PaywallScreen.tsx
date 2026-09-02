import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { PurchasesPackage } from "react-native-purchases";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon, CrownIcon, ExamIcon } from "../ui/icons";
import { track } from "../lib/track";
import { haptic } from "../lib/haptics";
import { billingAvailable, getPackages, purchase, restore } from "../lib/billing";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Paywall (§4 — premium katman). Konuşma sınırsız + Goethe/telc tam sınav
 * hazırlığı premium'da. Mağaza entegrasyonu henüz yok (web ile aynı, bilinçli);
 * bu yüzden "başla" gerçek satın alma yapmaz ama ARTIK sessiz değil: ilgiyi
 * kaydedip net bir dönüt verir (huni ölçümü + kullanıcıya geri bildirim).
 */
const COMPARE: { label: string; free: string; premium: string }[] = [
  { label: "Kelime turu", free: "Günlük limit", premium: "Sınırsız" },
  { label: "Konuşma alıştırması", free: "Sınırlı", premium: "Sınırsız" },
  { label: "Goethe & telc tam sınav", free: "—", premium: "Var" },
  { label: "Reklamsız deneyim", free: "—", premium: "Var" },
  { label: "Yeni içeriklere erken erişim", free: "—", premium: "Var" },
];

const PLANS = [
  { key: "yearly", label: "Yıllık", price: "₺79/ay", note: "₺948 yıllık — 2 ay bedava", badge: "En avantajlı", trial: 7 },
  { key: "monthly", label: "Aylık", price: "₺99/ay", note: "İstediğin zaman iptal", badge: null, trial: 0 },
] as const;

function CompareRow({ row, colors, last }: { row: (typeof COMPARE)[number]; colors: Palette; last: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 11, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <Text variant="caption" style={{ flex: 1.5 }}>{row.label}</Text>
      <Text variant="caption" color={colors.textFaint} style={{ flex: 1, textAlign: "center" }}>{row.free}</Text>
      <View style={{ flex: 1, alignItems: "center" }}>
        {row.premium === "Var" ? <CheckIcon color={colors.success} size={17} /> : <Text variant="bodyStrong" color={colors.primary}>{row.premium}</Text>}
      </View>
    </View>
  );
}

function TimelineStep({ when, what, colors, dim }: { when: string; what: string; colors: Palette; dim?: boolean }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
      <View style={{ alignItems: "center" }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: dim ? colors.border : colors.primary, marginTop: 3 }} />
      </View>
      <View style={{ flex: 1, paddingBottom: spacing.md }}>
        <Text variant="bodyStrong" color={dim ? colors.textMuted : colors.text}>{when}</Text>
        <Text variant="caption" color={colors.textMuted}>{what}</Text>
      </View>
    </View>
  );
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [plan, setPlan] = useState<string>("yearly");
  const [started, setStarted] = useState(false);
  const [pkgs, setPkgs] = useState<PurchasesPackage[]>([]);
  const [busy, setBusy] = useState(false);
  const selected = PLANS.find((p) => p.key === plan) ?? PLANS[0];
  const hasTrial = selected.trial > 0;
  const live = billingAvailable(); // RevenueCat anahtarı var mı → gerçek satın alma

  // §4 funnel: paywall görüldü. Anahtar varsa gerçek paketleri (fiyatları) çek.
  useEffect(() => {
    track("paywall_view", 0, "mobile");
    if (live) void getPackages().then(setPkgs);
  }, [live]);

  const pkgFor = (key: string): PurchasesPackage | undefined =>
    pkgs.find((p) => (key === "yearly" ? p.packageType === "ANNUAL" : p.packageType === "MONTHLY"));

  async function start() {
    track("purchase_start", 0, plan);
    haptic("correct");
    if (!live) { setStarted(true); return; } // anahtar yok → huni modu (dönüt)
    const pkg = pkgFor(plan);
    if (!pkg) { setStarted(true); return; }
    setBusy(true);
    const ok = await purchase(pkg);
    setBusy(false);
    if (ok) { haptic("correct"); nav.goBack(); } // premium aktif → gating usePremium ile güncellenir
  }

  async function doRestore() {
    if (!live || busy) return;
    setBusy(true);
    const ok = await restore();
    setBusy(false);
    if (ok) nav.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityRole="button" accessibilityLabel="Kapat" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 84, height: 84, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <CrownIcon color="#fff" size={44} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>Nomi Premium</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>Sınırsız öğren, sınavına tam hazırlan</Text>
        </View>

        {/* ücretsiz deneme şeridi */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg }}>
          <View style={{ width: 44, height: 44, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
            <CheckIcon color="#fff" size={22} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong" color={colors.success}>7 gün ücretsiz dene</Text>
            <Text variant="caption" color={colors.textMuted}>Deneme boyunca ücret alınmaz; dilediğin zaman iptal et.</Text>
          </View>
        </View>

        {/* ücretsiz vs premium karşılaştırma tablosu */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
          <View style={{ flexDirection: "row", alignItems: "center", paddingBottom: spacing.sm, borderBottomWidth: 1.5, borderBottomColor: colors.border }}>
            <Text variant="micro" color={colors.textMuted} style={{ flex: 1.5 }}>ÖZELLİK</Text>
            <Text variant="micro" color={colors.textFaint} style={{ flex: 1, textAlign: "center" }}>ÜCRETSİZ</Text>
            <Text variant="micro" color={colors.primary} style={{ flex: 1, textAlign: "center" }}>PREMIUM</Text>
          </View>
          {COMPARE.map((r, i) => <CompareRow key={r.label} row={r} colors={colors} last={i === COMPARE.length - 1} />)}
        </View>

        {/* deneme zaman çizelgesi — kaygıyı azaltır (ne zaman ücret alınır) */}
        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.md, marginLeft: 4 }}>NASIL İŞLER</Text>
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
          <TimelineStep when="Bugün" what="Tam erişim açılır; tüm premium özellikler senin." colors={colors} />
          <TimelineStep when="5. gün" what="“2 gün kaldı” hatırlatması göndeririz." colors={colors} />
          <TimelineStep when="7. gün" what="Ücret başlar — istersen öncesinde tek dokunuşla iptal." colors={colors} dim />
        </View>

        {/* güven — Goethe/telc hizası (uydurma yorum/sayı yok) */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl, paddingHorizontal: 4 }}>
          <ExamIcon color={colors.accent} size={22} />
          <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>İçerik CEFR A1–C1 ve Goethe/telc sınav formatlarına göre hazırlanır.</Text>
        </View>

        {/* planlar */}
        <View style={{ gap: spacing.md }}>
          {PLANS.map((p) => {
            const active = plan === p.key;
            return (
              <PressableScale key={p.key} onPress={() => setPlan(p.key)} accessibilityRole="radio" accessibilityState={{ selected: active }} accessibilityLabel={`${p.label} plan, ${p.price}`} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                  {active && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary }} />}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text variant="h3">{p.label}</Text>
                    {p.badge && (
                      <View style={{ backgroundColor: colors.success, borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Text variant="micro" color="#fff">{p.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text variant="caption" color={colors.textMuted}>{p.note}</Text>
                </View>
                <Text variant="h3" color={active ? colors.primary : colors.text}>{p.price}</Text>
              </PressableScale>
            );
          })}
        </View>
      </ScrollView>

      {/* alt CTA — basılınca sessiz kalmaz: net onay verir */}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm }}>
        {started ? (
          <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <View style={{ width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
              <CheckIcon color="#fff" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" color={colors.success}>İlgin kaydedildi 🙌</Text>
              <Text variant="caption" color={colors.textMuted}>Premium çok yakında; hazır olduğunda ilk sen haberdar olacaksın.</Text>
            </View>
          </View>
        ) : (
          <>
            <PressableScale onPress={start} disabled={busy} accessibilityRole="button" accessibilityLabel={hasTrial ? "7 gün ücretsiz başla" : "Premium'a başla"} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center" }, softShadow(colors.primary, 12)]}>
              {busy ? <ActivityIndicator color="#fff" /> : <Text variant="h3" color="#fff">{hasTrial ? "7 gün ücretsiz başla" : "Premium'a başla"}</Text>}
            </PressableScale>
            <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>
              {hasTrial ? `7 gün ücretsiz, sonra ${(live ? pkgFor(plan)?.product.priceString : null) ?? selected.price} · ` : `${(live ? pkgFor(plan)?.product.priceString : null) ?? selected.price} · `}İstediğin zaman iptal · Otomatik yenilenir
            </Text>
            {live && (
              <PressableScale onPress={doRestore} accessibilityLabel="Satın almayı geri yükle" style={{ alignItems: "center", paddingVertical: spacing.sm, marginTop: 2 }}>
                <Text variant="caption" color={colors.textMuted}>Satın almayı geri yükle</Text>
              </PressableScale>
            )}
          </>
        )}
      </View>
    </View>
  );
}
