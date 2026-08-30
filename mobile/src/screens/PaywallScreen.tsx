import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, CheckIcon, CrownIcon } from "../ui/icons";
import { track } from "../lib/track";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/**
 * Paywall (§4 — premium katman). Konuşma sınırsız + Goethe/telc tam sınav
 * hazırlığı premium'da. Şimdilik satın alma yok (mağaza entegrasyonu sonra);
 * ekran huniyi ölçmek ve premium'u konumlandırmak için. paywall_view /
 * purchase olayları ileride ölçüm hattına bağlanacak.
 */
const BENEFITS = [
  "Sınırsız konuşma alıştırması",
  "Goethe & telc tam sınav hazırlığı",
  "Sınırsız kelime turu — günlük limit yok",
  "Reklamsız, dikkat dağıtmayan deneyim",
  "Yeni içeriklere erken erişim",
];

const PLANS = [
  { key: "yearly", label: "Yıllık", price: "₺79/ay", note: "₺948 yıllık — 2 ay bedava", badge: "En avantajlı", trial: 7 },
  { key: "monthly", label: "Aylık", price: "₺99/ay", note: "İstediğin zaman iptal", badge: null, trial: 0 },
] as const;

function Benefit({ text, colors }: { text: string; colors: Palette }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 7 }}>
      <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: colors.successSoft }}>
        <CheckIcon color={colors.success} size={16} />
      </View>
      <Text variant="body" style={{ flex: 1 }}>{text}</Text>
    </View>
  );
}

export function PaywallScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [plan, setPlan] = useState<string>("yearly");
  const selected = PLANS.find((p) => p.key === plan) ?? PLANS[0];
  const hasTrial = selected.trial > 0;

  // §4 funnel: paywall görüldü (kaynak sonra route param'la gelebilir).
  useEffect(() => { track("paywall_view", 0, "mobile"); }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.md }} showsVerticalScrollIndicator={false}>
        {/* hero */}
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 84, height: 84, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <CrownIcon color="#fff" size={44} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>Wortspiel Premium</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>Sınırsız öğren, sınavına tam hazırlan</Text>
        </View>

        {/* ücretsiz deneme şeridi (plan: fiyat psikolojisi — ücretsiz deneme) */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg, marginBottom: spacing.lg }}>
          <View style={{ width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.success }}>
            <CheckIcon color="#fff" size={22} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong" color={colors.success}>7 gün ücretsiz dene</Text>
            <Text variant="caption" color={colors.textMuted}>Deneme boyunca ücret alınmaz; dilediğin zaman iptal et.</Text>
          </View>
        </View>

        {/* avantajlar */}
        <View style={{ backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.xl }}>
          {BENEFITS.map((b) => <Benefit key={b} text={b} colors={colors} />)}
        </View>

        {/* planlar */}
        <View style={{ gap: spacing.md }}>
          {PLANS.map((p) => {
            const active = plan === p.key;
            return (
              <PressableScale key={p.key} onPress={() => setPlan(p.key)} style={{ borderRadius: radii.lg, borderWidth: 2, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
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

      {/* alt CTA */}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm }}>
        <PressableScale onPress={() => track("purchase_start", 0, plan)} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center" }, softShadow(colors.primary, 12)]}>
          <Text variant="h3" color="#fff">{hasTrial ? "7 gün ücretsiz başla" : "Premium'a başla"}</Text>
        </PressableScale>
        <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.sm }}>
          {hasTrial ? `7 gün ücretsiz, sonra ${selected.price} · ` : `${selected.price} · `}İstediğin zaman iptal · Otomatik yenilenir
        </Text>
      </View>
    </View>
  );
}
