import React, { useEffect, useState } from "react";
import { Animated, PixelRatio, View, type TextLayoutEvent, type ViewStyle } from "react-native";
import { Card } from "./Card";
import { Text } from "./Text";
import { useTheme, radii, spacing, typography, lineHeightRatio } from "../theme";
import { minLineRatioNow } from "./fontFit";
import { reduceMotion } from "../lib/reduceMotion";

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
 * Bir metin satırının kapladığı yükseklik — `ui/Text`in çizdiğiyle AYNI hesap.
 *
 * Eskiden RN varsayılanı sayılıyordu (× 1,2). Oysa `Text` satırı ölçeğin
 * kendi oranıyla çiziyor (`lineHeightRatio`: caption 1,6, body 1,5) ve
 * altına yazı tipi tabanını koyuyor (`fontFit`, en az 1,25). İskelet satırı
 * gerçeğinden ~%25 kısa kalıyor, içerik gelince ekran aşağı kayıyordu
 * (2026-09-25, Beceriler iskeletinde görüldü; her ekranda aynıydı). Web
 * `components/skeleton` textHeight zaten gerçek oranı kullanıyor.
 *
 * Sistem yazı ölçeği de hesaba katılır: gerçek Text ölçekle büyüyor (ui/Text
 * 1.5 katla sınırlar), iskelet sabit kalsaydı büyük yazı ayarındaki
 * kullanıcıda kayma geri gelirdi.
 */
export function textHeight(variant: Variant): number {
  const scale = Math.min(PixelRatio.getFontScale(), MAX_FONT_SCALE);
  const punto = (typography[variant].fontSize as number) * scale;
  return Math.round(punto * Math.max(lineHeightRatio[variant], minLineRatioNow()));
}

const pulse = new Animated.Value(0);
const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] });
let loop: Animated.CompositeAnimation | null = null;
let alive = 0;

function usePulse(): Animated.AnimatedInterpolation<number> {
  useEffect(() => {
    /* "Hareketi azalt" açıkken nabız hiç başlamıyor: iskelet SABİT opaklıkta
       duruyor (aşağıdaki `pulse` başlangıç değeri 0 → 0.45). İskeletin işi
       şekli ve yüksekliği göstermek; nabız yalnız süsleme. */
    if (reduceMotion()) return;
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
  /** Yüzde de olabilir: içeriğe göre büyüyen kabı dolduran blok (baloncuk). */
  height?: ViewStyle["height"]; width?: ViewStyle["width"]; radius?: number; style?: ViewStyle;
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

/*
 * METİN YERİ ÖLÇÜLEREK — tahminle değil.
 *
 * Satır sayısı eskiden harf sayısı × ortalama harf genişliğinden tahmin
 * ediliyordu (Türkçe harf sayıları, yazı tipi başına ortalama genişlik tablosu).
 * Kırılım sınırında bir satır şaşıyor, İngilizce/Almanca arayüzde metin başka
 * uzunlukta olduğu için hiç tutmuyordu: gerçek metin gelince ekran bir satır
 * kayıyordu. Artık GERÇEK metin aynı `Text` varyantıyla görünmez çiziliyor,
 * sistem onu gerçekte nasıl sarıyorsa öyle sarıyor (yazı ölçeği, `fontFit`
 * tabanı, yazı tipi dahil) ve `onTextLayout`un bildirdiği her satıra o
 * satırın genişliğinde bir çubuk konuyor. İlk ölçüm gelene kadar görünmez
 * metin yeri zaten doğru yükseklikte tutuyor: çubuklar gelince bir şey kaymıyor.
 */
type LineBox = { x: number; y: number; width: number; height: number };

/*
 * Değeri henüz bilinmeyen VERİ metni (katalog başlığı, sahne, kullanıcı cümlesi)
 * için dolgu: gerçek dilde yazılmış sıradan bir cümle. Harf sayısı tahmin
 * (ortanca uzunluk) ama sarılma yine gerçek yazı tipiyle ölçülüyor —
 * sözlükten gelen metinler için dolgu KULLANILMAZ, `text` verilir.
 */
/* Web `components/flow-skeleton` `FILLER` ile aynı cümle (parity: ortak dizge sabitleri). */
const FILLER = "Hangi seviyeden başlaman gerektiğini gösterir ve her kural kendi satırında durur; bitince sonuç ve beceri profili gelir, istediğin aşamayı atlayabilirsin. ";

/** `chars` harflik dolgu metni (veri metninin tahmini uzunluğu). */
export function skeletonFiller(chars: number): string {
  let s = "";
  while (s.length < chars) s += FILLER;
  return s.slice(0, Math.max(1, chars)).trimEnd();
}

/** Üst satır biçimi (`CoverBody` eyebrow, `DetailCard` başlığı): büyük harf + 1 aralık. */
const CAPS = { textTransform: "uppercase", letterSpacing: 1 } as const;

/**
 * Metin iskeleti: `text` (gerçek, çevrilmiş metin) ya da `chars` harflik dolgu
 * görünmez çiziliyor; her satırına ölçülen genişlikte bir çubuk.
 * Dış kap `style`ı taşıyor (dolgu, flex); ölçüm iç kapta, çubukların
 * konumu dolgudan etkilenmesin.
 */
export function SkeletonText({ text, chars = 40, variant = "body", caps = false, align = "left", numberOfLines, style }: {
  text?: string | null;
  /** `text` yokken dolgunun uzunluğu — yalnız veri metni için. */
  chars?: number;
  variant?: Variant;
  caps?: boolean;
  align?: "left" | "center";
  /** Gerçek metin satır sınırlıysa (ör. başlık altı 2 satır) aynı sınır. */
  numberOfLines?: number;
  style?: ViewStyle;
}) {
  const [lines, setLines] = useState<LineBox[] | null>(null);
  const onTextLayout = (e: TextLayoutEvent) => {
    const next = e.nativeEvent.lines.map(({ x, y, width, height }) => ({ x, y, width, height }));
    /* Her düzen geçişinde tetikleniyor; aynı ölçüde yeniden çizmiyoruz. */
    setLines((prev) => (prev && prev.length === next.length && prev.every((p, i) => p.x === next[i].x && p.y === next[i].y && p.width === next[i].width && p.height === next[i].height) ? prev : next));
  };
  return (
    <View style={style} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View>
        <Text variant={variant} accessible={false} numberOfLines={numberOfLines} onTextLayout={onTextLayout} style={[{ opacity: 0, textAlign: align }, caps ? CAPS : null]}>
          {text ?? skeletonFiller(chars)}
        </Text>
        {lines?.map((l, i) => {
          if (l.width <= 0) return null;
          const bar = Math.max(6, Math.round(l.height) - 4);
          return (
            <View key={i} style={{ position: "absolute", left: l.x, top: l.y, width: l.width, height: l.height, justifyContent: "center" }}>
              <Skeleton height={bar} radius={Math.min(radii.sm, bar / 2)} />
            </View>
          );
        })}
      </View>
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
 *
 * EKRAN OKUYUCUYA "MEŞGUL" DİYOR. İskelet yalnız GÖRSEL bir işaretti: sesli
 * okuyucu kullanan biri boş bir ekran duyuyor, uygulamanın çalışıp
 * çalışmadığını bilemiyordu. Webin aynı bileşeni bunu baştan beri söylüyor
 * (`components/skeleton` `SkeletonCard`: `role="status" aria-busy`); düzeltme
 * KÖKTE, çünkü on iki yükleme ekranı bu iki bileşenden geçiyor — tek tek
 * etiket koymak on iki ayrı unutma fırsatı demekti.
 */
export function SkeletonCard({ children, style, padded = true, label }: { children?: React.ReactNode; style?: ViewStyle; padded?: boolean; label?: string }) {
  return (
    <Card padded={padded} style={style} accessibilityRole="progressbar" accessibilityState={{ busy: true }} accessibilityLabel={label}>
      {children}
    </Card>
  );
}

/** Alt alta eşit yükseklikte bloklar (sıralama satırları, kelime satırları). */
export function SkeletonRows({ count = 6, height = 66, gap = spacing.sm, radius = radii.lg, style }: {
  count?: number; height?: number; gap?: number; radius?: number; style?: ViewStyle;
}) {
  return (
    <View
      style={[{ gap }, style]}
      /* SÜS OLAN GİZLENİYOR, DUYURAN KAP. Satırların kendisi okunacak bir şey
         değil; "meşgul" haberini kabın (`SkeletonCard`) vermesi yeterli, her
         satırın ayrı ayrı duyurulması gürültü olurdu. Web tam bunu yapıyor:
         satır iskeletleri `aria-hidden`, kap `role="status"`. */
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {Array.from({ length: count }, (_, i) => <Skeleton key={i} height={height} radius={radius} />)}
    </View>
  );
}
