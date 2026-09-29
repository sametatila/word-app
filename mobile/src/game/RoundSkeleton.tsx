import React from "react";
import { PixelRatio, View, useWindowDimensions, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Skeleton, SkeletonLine, SkeletonPill, textHeight } from "../ui/Skeleton";
import { Card } from "../ui/Card";
import { useLayout } from "../lib/useLayout";
import { useTheme, spacing, radii, cardShadow, ds, typography } from "../theme";

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
        {/* Tek kelime (~8 harf) harf boyuyla: yüzde genişlik tablette (kart ~900dp) 600dp'lik çubuk oluyordu. */}
        <TextLines variant="display" chars={8} inset={spacing.lg * 4 + 2} align="center" style={{ marginTop: spacing.sm }} />
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

/*
 * METNİN SARILMASI — telefonla tablet arasındaki asıl fark.
 *
 * Kapak ekranı her genişlikte aynı dikey yığın (`FlowScreen` kolonun içinde,
 * kırılım yok); değişen tek şey metnin kaç satıra sarıldığı. Aynı kural cümlesi
 * (~45 harf) telefonda iki satır, tablette (kolon 700-1120dp) tek satır.
 * Sabit tek çubuk telefonda kısa, iki çubuk tablette uzun kalıyordu: kapak
 * gelince düğmelere kadar her şey kayıyordu. Satır sayısı burada gerçek metnin
 * uzunluğundan (`COVERS`) ve kolonun genişliğinden hesaplanıyor.
 *
 * Harf genişliği sistem yazısının (SF, Roboto) karışık metindeki ortalaması,
 * punto başına; web aynı sayıları tarayıcıya ölçtürüyor (`flow-skeleton`
 * `TextSlot`) ve 430px'te 15 pt gövdede satıra ~47 harf düşüyor: 0,47.
 */
type Variant = keyof typeof typography;
const GLYPH: Record<Variant, number> = { display: 0.56, h1: 0.56, h2: 0.54, h3: 0.52, body: 0.47, bodyStrong: 0.5, caption: 0.48, micro: 0.5 };
/** Büyük harfli üst satır (`uppercase` + `letterSpacing: 1`) küçük harften ~%30 geniş. */
const CAPS = 1.3;
/** Kelime uzunlukları — greedy sarılma gerçeğindeki gibi satır sonunda boşluk bırakıyor. */
const WORDS = [5, 7, 3, 9, 4, 6, 2, 8, 5, 4, 10, 3, 6, 7, 4];
/** `Text`in kendi tavanı (`maxFontSizeMultiplier` 1,5). */
const MAX_FONT_SCALE = 1.5;

/** `chars` harflik metnin `width` genişlikte satır satır harf sayısı. */
function wrap(chars: number, width: number, variant: Variant, caps: boolean): { perLine: number; lines: number[] } {
  const punto = (typography[variant].fontSize as number) * Math.min(PixelRatio.getFontScale(), MAX_FONT_SCALE);
  const tracking = ((typography[variant].letterSpacing as number | undefined) ?? 0) + (caps ? 1 : 0);
  const perLine = Math.max(6, Math.floor(width / (punto * GLYPH[variant] * (caps ? CAPS : 1) + tracking)));
  const lines: number[] = [];
  let line = 0;
  let left = chars;
  for (let i = 0; left > 0; i++) {
    const w = Math.min(WORDS[i % WORDS.length], left);
    left -= w + 1;
    const next = line ? line + 1 + w : w;
    if (next > perLine && line) {
      lines.push(line);
      line = Math.min(w, perLine);
    } else line = Math.min(next, perLine);
  }
  if (line) lines.push(line);
  return { perLine, lines };
}

/** Sarılmış metnin kutusu: satır sayısı ve en uzun satırın genişliği (dp) — baloncuk gibi içeriğe göre daralan kaplar için. */
export function textBox(chars: number, width: number, variant: Variant): { lines: number; width: number } {
  const { perLine, lines } = wrap(chars, width, variant, false);
  return { lines: lines.length, width: Math.round((width * Math.max(...lines)) / perLine) };
}

/** Ekranın içerik kolonunun genişliği: telefonda ekran, tablette `contentWidth` (bkz. `ContentColumn`). */
export function useColumnWidth(): number {
  const { width } = useWindowDimensions();
  const { contentWidth } = useLayout();
  return Math.min(width, contentWidth);
}

/**
 * Metin yeri: gerçek metnin satır sayısı kadar `SkeletonLine`, sonuncusu kısa.
 * `width` verilmezse kolon eksi `inset` (ekranın iki yan dolgusu, kart dolgusu).
 */
export function TextLines({ variant, chars, width, inset = 0, caps = false, align = "flex-start", style }: {
  variant: Variant; chars: number; width?: number; inset?: number;
  /** Büyük harf + `letterSpacing: 1` (üst satırlar). */
  caps?: boolean;
  align?: "flex-start" | "center"; style?: ViewStyle;
}) {
  const column = useColumnWidth();
  const { perLine, lines } = wrap(chars, width ?? column - inset, variant, caps);
  const w = width ?? column - inset;
  return (
    <View style={[{ alignItems: align }, style]}>
      {lines.map((n, i) => <SkeletonLine key={i} variant={variant} width={Math.round((w * n) / perLine)} />)}
    </View>
  );
}

/** Kapağın şekli — alanların Türkçe metin uzunluğu (harf). Web `flow-skeleton` `COVERS` ile aynı sayılar. */
export type CoverShape = {
  /** Kapağın üstündeki koç cümlesi (`CoachLine`); 0 = yok. */
  coach?: number;
  eyebrow?: number;
  title?: number;
  /** Tanıtım cümlesi; 0 = yok. */
  pitch?: number;
  rules?: number[];
  /** Kuralların altındaki not, paragraf paragraf (caption). */
  note?: number[];
  /** Kapağın dibindeki küçük bağımsızlık satırı (`exam.independent_note`). */
  footnote?: number;
  /** `DetailCard` satır sayısı (0 = kart yok). */
  detailRows?: number;
  secondary?: boolean;
  tertiary?: boolean;
};

export const COVERS = {
  placement: { eyebrow: 12, title: 27, pitch: 46, rules: [44, 50, 44, 48, 47] },
  challenge: { eyebrow: 13, title: 18, pitch: 126, rules: [32, 32, 78] },
  boss: { eyebrow: 13, title: 27, rules: [34, 34, 57, 43] },
  weekly: { eyebrow: 13, title: 22, pitch: 57, rules: [20, 20, 37], note: [64], secondary: true, tertiary: false },
  scored: { coach: 56, eyebrow: 40, title: 14, pitch: 162, rules: [46, 53, 88], detailRows: 3 },
  mock: { eyebrow: 22, title: 24, pitch: 97, rules: [16, 80, 60, 24, 75], note: [23, 84], footnote: 109 },
  exam: { coach: 56, eyebrow: 21, title: 24, pitch: 34, rules: [22, 55, 56, 54, 41], detailRows: 5, footnote: 109 },
} satisfies Record<string, CoverShape>;

/**
 * Kapak iskeleti — `FlowScreen` + `CoverBody` + `FlowActions`, aynı sırayla:
 * (üst çubuk), (koç cümlesi), ikon karosu, üst satır, başlık, tanıtım, kural
 * kartı, not, (ayrıntı kartı), dipte düğmeler.
 *
 * Seviye testi, sınav, meydan okuma, patron, haftalık sınav, deneme sınavı
 * bölümü ve puanlı konuşma yüklenince KAPAKLA açılıyor. Kaplar gerçeğinin
 * dolguları; ekran `ContentColumn`un içinde (telefonda ekran, tablette
 * `contentWidth`), satır sayıları o genişlikten (`TextLines`).
 * Web karşılığı `components/flow-skeleton` `CoverSkeleton`.
 *
 * Bekleme kendini duyuruyor: kök "meşgul" bir ilerleme bölgesi, adı `label`.
 */
export function CoverSkeleton({
  label, top = false, coach = 0, eyebrow = 14, title = 22, pitch = 0, rules = [], note = [], footnote = 0, detailRows = 0, secondary = false, tertiary = true,
}: CoverShape & {
  label: string;
  /** `FlowTopBar` (kapat/geri karosu). */
  top?: boolean;
}) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  /* Kolon (`ContentColumn`) eksi `FlowScreen`in iki yan dolgusu; kural metni
     bir de kartın dolgusu + kenarlığı, 28'lik ikon ve aradaki `md` kadar dar. */
  const body = useColumnWidth() - spacing.lg * 2;
  const ruleText = body - spacing.lg * 2 - 2 - 28 - spacing.md;
  const cardText = body - spacing.lg * 2 - 2;
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
        {coach ? <TextLines variant="body" chars={coach} width={body} /> : null}
        <View style={{ gap: spacing.md, paddingTop: spacing.md }}>
          <Skeleton height={ds(56)} width={ds(56)} radius={radii.lg} />
          <View style={{ gap: spacing.xs }}>
            <TextLines variant="micro" chars={eyebrow} width={body} caps />
            <TextLines variant="h1" chars={title} width={body} />
            {pitch ? <TextLines variant="body" chars={pitch} width={body} /> : null}
          </View>
          {rules.length ? (
            <Card padded style={{ gap: spacing.md }}>
              {rules.map((chars, i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.md }}>
                  <Skeleton height={28} width={28} radius={radii.sm} />
                  <TextLines variant="body" chars={chars} width={ruleText} style={{ paddingTop: 2 }} />
                </View>
              ))}
            </Card>
          ) : null}
          {note.length ? (
            <View>
              {note.map((chars, i) => <TextLines key={i} variant="caption" chars={chars} width={body} />)}
            </View>
          ) : null}
          {detailRows ? (
            <Card padded style={{ gap: spacing.sm }}>
              <TextLines variant="micro" chars={24} width={cardText} caps />
              {Array.from({ length: detailRows }, (_, i) => (
                <View key={i} style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.md }}>
                  <SkeletonLine variant="bodyStrong" width="42%" />
                  <SkeletonLine variant="caption" width="30%" />
                </View>
              ))}
            </Card>
          ) : null}
          {footnote ? <TextLines variant="micro" chars={footnote} width={body} /> : null}
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
