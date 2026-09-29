import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton, SkeletonLine, SkeletonPill, textHeight } from "../ui/Skeleton";
import { Card } from "../ui/Card";
import { useTheme, spacing, radii, cardShadow, ds } from "../theme";

/**
 * Tur ekranı iskeleti — `GameScreen`in oynama kabuğu, aynı sırayla:
 * `FlowProgress` satırı (çıkış + çubuk + yeni/tekrar çipi + sayaç), tek oyun
 * etiketi, soru kartı (`rounds` `Prompt`) ve şıklar (`OptionButton`).
 *
 * Ortalanmış spinner yerine bu çiziliyor: spinner ekranın ortasındayken tur
 * gelince her şey birden yukarı sıçrıyordu; iskelet gerçek düzenin yerinde
 * durduğu için geçiş yerinde oluyor.
 *
 * Ölçüler gerçek bileşenden: soru kartının dikey dolgusu `xxl` ve altı `md`
 * (eskiden `xxxl`/`xl` yazıyordu, `Prompt` küçülünce burası kalmıştı), şık
 * kenarlığı 1. Seviye testi, meydan okuma ve patron artık bunu KULLANMIYOR:
 * yüklenince onlarda gelen ekran tur değil kapak (`CoverSkeleton`).
 * Web karşılığı `components/flow-skeleton` `RoundSkeleton`.
 */
export function RoundSkeleton({ options = 4, label = false }: { options?: number; label?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, minHeight: 44, marginBottom: spacing.xl }}>
        <Skeleton height={44} width={44} radius={radii.md} />
        <View style={{ flex: 1 }}><Skeleton height={10} radius={5} /></View>
        {/* yeni/tekrar çipi: micro + dikey 3 dolgu */}
        <SkeletonPill width={48} height={textHeight("micro") + 6} />
        <SkeletonLine variant="bodyStrong" width={38} />
      </View>
      {label ? <SkeletonLine variant="caption" width={140} style={{ alignSelf: "center", marginBottom: spacing.md }} /> : null}
      <View style={[{ backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: spacing.xxl, paddingHorizontal: spacing.lg, alignItems: "center", borderWidth: 1, borderColor: colors.hairline, marginBottom: spacing.md }, cardShadow(colors, 10)]}>
        <SkeletonLine variant="micro" width={104} />
        <SkeletonLine variant="display" width="65%" style={{ marginTop: spacing.sm }} />
        {/* dinle düğmesi: 22'lik ikon + `xs` dolgu */}
        <View style={{ marginTop: spacing.sm, padding: spacing.xs }}>
          <Skeleton height={22} width={22} radius={11} />
        </View>
      </View>
      <View style={{ gap: spacing.md }}>
        {Array.from({ length: options }, (_, i) => (
          <Skeleton key={i} height={textHeight("bodyStrong") + spacing.lg * 2 + 2} radius={radii.lg} />
        ))}
      </View>
    </View>
  );
}

/**
 * Kapak iskeleti — `FlowScreen` + `CoverBody` + `FlowActions`, aynı sırayla:
 * (üst çubuk), (koç cümlesi), ikon karosu, üst satır, başlık, tanıtım, kural
 * kartı, not, (ayrıntı kartı), dipte düğmeler.
 *
 * Seviye testi, sınav, meydan okuma, patron, haftalık sınav, deneme sınavı
 * bölümü ve puanlı konuşma yüklenince KAPAKLA açılıyor; bekleme ise ya tur
 * iskeleti ya da tek satırlık bir "hazırlanıyor" çiziyordu — kapak gelince
 * ekran baştan kuruluyordu. Web karşılığı `components/flow-skeleton`
 * `CoverSkeleton`.
 *
 * Bekleme kendini duyuruyor: kök "meşgul" bir ilerleme bölgesi, adı `label`.
 */
export function CoverSkeleton({
  label, top = false, coach = false, rules = 3, pitch = true, note = 0, footnote = false, detailRows = 0, secondary = false, tertiary = true,
}: {
  label: string;
  /** `FlowTopBar` (kapat/geri karosu). */
  top?: boolean;
  /** Kapağın üstündeki koç cümlesi (`CoachLine`). */
  coach?: boolean;
  rules?: number;
  pitch?: boolean;
  /** Kuralların altındaki not satırı sayısı (caption). */
  note?: number;
  /** Kapağın dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: boolean;
  /** `DetailCard` satır sayısı (0 = kart yok). */
  detailRows?: number;
  secondary?: boolean;
  tertiary?: boolean;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      accessible
      accessibilityLiveRegion="polite"
      accessibilityRole="progressbar"
      accessibilityState={{ busy: true }}
      accessibilityLabel={label}
      style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}
    >
      {top ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
          <View style={{ flexDirection: "row", alignItems: "center", minHeight: 44 }}>
            <Skeleton height={44} width={44} radius={radii.md} />
          </View>
        </View>
      ) : null}
      <View style={{ flex: 1, overflow: "hidden", paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, gap: spacing.md }}>
        {coach ? <SkeletonLine variant="body" width="78%" /> : null}
        <View style={{ gap: spacing.md, paddingTop: spacing.md }}>
          <Skeleton height={ds(56)} width={ds(56)} radius={radii.lg} />
          <View style={{ gap: spacing.xs }}>
            <SkeletonLine variant="micro" width="38%" />
            <SkeletonLine variant="h1" width="72%" />
            {pitch ? (
              <View>
                <SkeletonLine variant="body" width="94%" />
                <SkeletonLine variant="body" width="58%" />
              </View>
            ) : null}
          </View>
          {rules ? (
            <Card padded style={{ gap: spacing.md }}>
              {Array.from({ length: rules }, (_, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                  <Skeleton height={28} width={28} radius={radii.sm} />
                  <SkeletonLine variant="body" width={`${80 - (i % 3) * 14}%`} style={{ paddingTop: 2 }} />
                </View>
              ))}
            </Card>
          ) : null}
          {note ? (
            <View>
              {Array.from({ length: note }, (_, i) => <SkeletonLine key={i} variant="caption" width={`${70 - i * 12}%`} />)}
            </View>
          ) : null}
          {detailRows ? (
            <Card padded style={{ gap: spacing.sm }}>
              <SkeletonLine variant="micro" width="34%" />
              {Array.from({ length: detailRows }, (_, i) => (
                <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.md }}>
                  <SkeletonLine variant="bodyStrong" width="42%" />
                  <SkeletonLine variant="caption" width="30%" />
                </View>
              ))}
            </Card>
          ) : null}
          {footnote ? <SkeletonLine variant="micro" width="84%" /> : null}
        </View>
      </View>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.md, gap: spacing.sm }}>
        {/* `PrimaryButton` lg: h3 + dikey `lg` dolgu */}
        <Skeleton height={textHeight("h3") + spacing.lg * 2} radius={radii.lg} />
        {secondary ? <Skeleton height={textHeight("bodyStrong") + spacing.lg * 2 + 2} radius={radii.lg} /> : null}
        {tertiary ? (
          <View style={{ alignItems: "center", paddingVertical: spacing.sm }}>
            <SkeletonLine variant="bodyStrong" width={96} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
