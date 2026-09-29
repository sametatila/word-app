import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton, SkeletonLine, SkeletonPill, SkeletonText, textHeight } from "../ui/Skeleton";
import { Card } from "../ui/Card";
import { useTheme, spacing, radii, cardShadow, ds } from "../theme";
import { t } from "../lib/i18n";
import { COACH_LINES, fillCoachLine, type CoachMoment } from "./coachLines";

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
        {/* Tek kelime; değeri turla geliyor, ~8 harflik dolgu ölçülüyor: yüzde genişlik tablette (kart ~900dp) 600dp'lik çubuk oluyordu. */}
        <SkeletonText variant="display" chars={8} align="center" style={{ marginTop: spacing.sm }} />
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
 * Kapağın metinleri — gerçek kapağın (`CoverBody`) GÖSTERECEĞİ çevrilmiş
 * cümleler; satırlar onlardan ölçülüyor (`SkeletonText`). Değeri veriyle gelen
 * alanlarda (konuşma adı, sahne, tema) çağıran `skeletonFiller` ile tahmini
 * uzunlukta dolgu veriyor.
 */
export type CoverText = {
  /** Kapağın üstündeki koç cümlesi (`CoachLine`); yoksa çizilmez. */
  coach?: string | null;
  eyebrow: string;
  title: string;
  /** Tanıtım cümlesi; yoksa çizilmez. */
  pitch?: string | null;
  rules?: string[];
  /** Kuralların altındaki not (caption, `\n` paragraf). */
  note?: string | null;
  /** Kapağın dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: string | null;
  /** `DetailCard`: başlığı ve satır sayısı. */
  detail?: { title: string; rows: number } | null;
  secondary?: boolean;
  tertiary?: boolean;
};

/**
 * Koç cümlesinin iskeletteki yeri. Kapak cümleyi RASTGELE seçiyor (ve seçimi
 * hatırlıyor; `pickCoachLine` burada çağrılmaz, yoksa iskelet bir cümleyi
 * "gösterilmiş" sayardı). Hangisinin geleceği bilinmediği için o anın
 * cümlelerinden uzunluğu ortanca olan, arayüz dilinde: satır sayısı çoğu
 * zaman tutuyor, tutmadığında fark bir satır.
 */
export function coverCoach(moment: CoachMoment): string {
  const lines = COACH_LINES[moment].map((k) => fillCoachLine(t(k))).sort((a, b) => a.length - b.length);
  return lines[Math.floor(lines.length / 2)] ?? "";
}

/**
 * Kapak iskeleti — `FlowScreen` + `CoverBody` + `FlowActions`, aynı sırayla:
 * (üst çubuk), (koç cümlesi), ikon karosu, üst satır, başlık, tanıtım, kural
 * kartı, not, (ayrıntı kartı), dipte düğmeler.
 *
 * Seviye testi, sınav, meydan okuma, patron, haftalık sınav, deneme sınavı
 * bölümü ve puanlı konuşma yüklenince KAPAKLA açılıyor. Kaplar gerçeğinin
 * dolguları; satırlar gerçek metnin o kolondaki ölçülmüş sarılmasından
 * (`SkeletonText`), telefonla tablet farkı kendiliğinden.
 * Web karşılığı `components/flow-skeleton` `CoverSkeleton`.
 *
 * Bekleme kendini duyuruyor: kök "meşgul" bir ilerleme bölgesi, adı `label`.
 */
export function CoverSkeleton({
  label, top = false, coach, eyebrow, title, pitch, rules = [], note, footnote, detail, secondary = false, tertiary = true,
}: CoverText & {
  label: string;
  /** `FlowTopBar` (kapat/geri karosu). */
  top?: boolean;
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
        {coach ? <SkeletonText variant="body" text={coach} /> : null}
        <View style={{ gap: spacing.md, paddingTop: spacing.md }}>
          <Skeleton height={ds(56)} width={ds(56)} radius={radii.lg} />
          <View style={{ gap: spacing.xs }}>
            <SkeletonText variant="micro" text={eyebrow} caps />
            <SkeletonText variant="h1" text={title} />
            {pitch ? <SkeletonText variant="body" text={pitch} /> : null}
          </View>
          {rules.length ? (
            <Card padded style={{ gap: spacing.md }}>
              {rules.map((text, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                  <Skeleton height={28} width={28} radius={radii.sm} />
                  <SkeletonText variant="body" text={text} style={{ flex: 1, paddingTop: 2 }} />
                </View>
              ))}
            </Card>
          ) : null}
          {note ? <SkeletonText variant="caption" text={note} /> : null}
          {detail ? (
            <Card padded style={{ gap: spacing.sm }}>
              <SkeletonText variant="micro" text={detail.title} caps />
              {Array.from({ length: detail.rows }, (_, i) => (
                <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.md }}>
                  <SkeletonLine variant="bodyStrong" width="42%" />
                  <SkeletonLine variant="caption" width="30%" />
                </View>
              ))}
            </Card>
          ) : null}
          {footnote ? <SkeletonText variant="micro" text={footnote} /> : null}
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
