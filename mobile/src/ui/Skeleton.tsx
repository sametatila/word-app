import React, { useEffect } from "react";
import { Animated, PixelRatio, View, type ViewStyle } from "react-native";
import { Card } from "./Card";
import { useTheme, radii, spacing, typography } from "../theme";

/**
 * Yükleme iskeletleri — düz spinner yerine içeriğin ŞEKLİNİ ve YÜKSEKLİĞİNİ
 * gösterir. Amaç yalnız algılanan hız değil, düzen kayması (layout shift) da:
 * her parça yüklenirken gerçek halinin kapladığı yeri kaplar, veri gelince
 * ekran aşağı/yukarı zıplamaz.
 *
 * Kural: iskeleti gerçek bileşenle AYNI kaplardan kur (Card, spacing, satır
 * yükseklikleri). Böylece dolgu/tipografi değişse bile iki taraf birlikte kayar.
 *
 * Tüm iskeletler tek bir nabız sürücüsü paylaşır: bir ekranda yirmi parça olsa
 * da tek Animated döngüsü çalışır (native driver, ucuz).
 */

type Variant = keyof typeof typography;

/** ui/Text ile aynı sınır: sistem yazı ölçeği en fazla 1.5 kat uygulanır. */
const MAX_FONT_SCALE = 1.5;

/**
 * Bir metin satırının kapladığı yükseklik (RN varsayılan satır aralığı ~1.2).
 *
 * Sistem yazı ölçeği de hesaba katılır: gerçek Text ölçekle büyüyor (ui/Text
 * 1.5 katla sınırlar), iskelet sabit kalsaydı büyük yazı ayarındaki
 * kullanıcıda kayma geri gelirdi.
 */
export function textHeight(variant: Variant): number {
  const scale = Math.min(PixelRatio.getFontScale(), MAX_FONT_SCALE);
  return Math.round((typography[variant].fontSize as number) * scale * 1.2);
}

const pulse = new Animated.Value(0);
const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] });
let loop: Animated.CompositeAnimation | null = null;
let alive = 0;

function usePulse(): Animated.AnimatedInterpolation<number> {
  useEffect(() => {
    alive += 1;
    if (alive === 1) {
      loop = Animated.loop(Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 850, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 850, useNativeDriver: true }),
      ]));
      loop.start();
    }
    return () => {
      alive -= 1;
      if (alive <= 0) { alive = 0; loop?.stop(); loop = null; pulse.setValue(0); }
    };
  }, []);
  return pulseOpacity;
}

/** Tek iskelet bloğu. */
export function Skeleton({ height = 16, width = "100%", radius = radii.md, style }: {
  height?: number; width?: ViewStyle["width"]; radius?: number; style?: ViewStyle;
}) {
  const { colors } = useTheme();
  const opacity = usePulse();
  return <Animated.View style={[{ height, width, borderRadius: radius, backgroundColor: colors.surface2, opacity }, style]} />;
}

/**
 * Metin satırı iskeleti. Dış kap gerçek satırın TAM yüksekliğini kaplar, çubuk
 * onun içinde 4px daha kısadır: satırlar boşluksuz üst üste dizilse bile blok
 * yüksekliği gerçek metinle birebir aynı olur, arada görsel boşluk da kalır.
 */
export function SkeletonLine({ variant = "body", width = "100%", style }: {
  variant?: Variant; width?: ViewStyle["width"]; style?: ViewStyle;
}) {
  const h = textHeight(variant);
  const bar = Math.max(6, h - 4);
  return (
    <View style={[{ width, height: h, justifyContent: "center" }, style]}>
      <Skeleton height={bar} radius={Math.min(radii.sm, bar / 2)} />
    </View>
  );
}

/** Kare ikon karosu (Card içindeki renkli karoların yerine). */
export function SkeletonTile({ size = 44, radius = radii.md, style }: { size?: number; radius?: number; style?: ViewStyle }) {
  return <Skeleton height={size} width={size} radius={radius} style={style} />;
}

/** İlerleme çubuğu yer tutucusu — gerçek çubukla aynı yükseklik. */
export function SkeletonBar({ height = 8, style }: { height?: number; style?: ViewStyle }) {
  return <Skeleton height={height} radius={height / 2} style={style} />;
}

/** Yuvarlak rozet/pill yer tutucusu (seri, XP gibi). */
export function SkeletonPill({ width = 96, height = 28, style }: { width?: ViewStyle["width"]; height?: number; style?: ViewStyle }) {
  return <Skeleton height={height} width={width} radius={radii.pill} style={style} />;
}

/**
 * Kart kabuğu — gerçek Card'ın kendisi, içi iskelet. Kenarlık, köşe, gölge ve
 * dolgu birebir aynı olduğu için yükseklik gerçeğiyle eşleşir.
 */
export function SkeletonCard({ children, style, padded = true }: { children?: React.ReactNode; style?: ViewStyle; padded?: boolean }) {
  return <Card padded={padded} style={style}>{children}</Card>;
}

/** Alt alta eşit yükseklikte bloklar (sıralama satırları, kelime satırları). */
export function SkeletonRows({ count = 6, height = 66, gap = spacing.sm, radius = radii.lg, style }: {
  count?: number; height?: number; gap?: number; radius?: number; style?: ViewStyle;
}) {
  return (
    <View style={[{ gap }, style]}>
      {Array.from({ length: count }, (_, i) => <Skeleton key={i} height={height} radius={radius} />)}
    </View>
  );
}
