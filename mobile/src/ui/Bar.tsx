import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, type LayoutChangeEvent } from "react-native";
import { useTheme, motion } from "../theme";
import { reduceMotion } from "../lib/reduceMotion";

/**
 * Kart içi ilerleme çubuğu — İKİ BOY.
 *
 * Elle çizilen çubuklar dört ayrı yükseklikteydi (4, 6, 8, 10) ve aynı
 * ekranda iki boy yan yana geliyordu. Boy rolden geliyor:
 *   - `inline` (6): liste satırı, kart içindeki ikincil ölçü.
 *   - `hero` (10): ekranın ya da kartın ana ölçüsü.
 * Yuvarlak ilerleme satırları (`FlowProgress`) bunun dışında.
 *
 * `extra`: ana dolgunun arkasından gelen açık ikinci bölüm (ör. "görülmüş"
 * kısmı, koyu bölüm "pekişmiş"). Verildiğinde oranlar olduğu gibi çiziliyor.
 */
export const BAR_HEIGHT = { inline: 6, hero: 10 } as const;

/**
 * DOLGU YUMUŞAK İLERLİYOR. Genişlik bir anda sıçrıyordu; webde tur çubuğu
 * yayla doluyor (`components/session-player.tsx` ~880, `motion.div` width
 * yayı). Burada genişlik canlandırılmıyor (yerel sürücü width'i taşımaz):
 * dolgu tam genişlikte çiziliyor ve sola `translateX` ile kaydırılıyor, iz
 * `overflow: hidden` ile maske. `scaleX` değil, çünkü ölçek yuvarlak ucu
 * yassılaştırıyordu. Süre ve eğri hareket jetonundan: `motion.medium` (320 ms)
 * + `motion.emphasized` (`cubic-bezier(.2,0,0,1)`, webin `--motion-medium` /
 * `--ease-emphasized`; `lib/motion` `T.medium`).
 *
 * İlk çizimde animasyon YOK: çubuk ekrana olduğu değerle geliyor, yalnız
 * sonraki değişimler kayıyor. "Hareketi azalt"ta değişim de anında.
 */
const FILL_MS = motion.medium;
const FILL_EASE = Easing.bezier(...motion.emphasized);

/** 0..1 hedefe yumuşak giden değer; ilk değer olduğu gibi. */
function useFillValue(target: number): Animated.Value {
  const v = useRef(new Animated.Value(target)).current;
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; v.setValue(target); return; }
    if (reduceMotion()) { v.stopAnimation(); v.setValue(target); return; }
    const a = Animated.timing(v, { toValue: target, duration: FILL_MS, easing: FILL_EASE, useNativeDriver: true });
    a.start();
    return () => a.stop();
  }, [target, v]);
  return v;
}

/**
 * Dolgu katmanı: izin içinde tam genişlik, `frac` (0..1) kadarı görünür.
 * İz ölçülene kadar çizilmiyor — ölçüsüz ilk karede dolgu tam dolu görünürdü.
 */
function Fill({ frac, width, tint, radius }: { frac: number; width: number; tint: string; radius?: number }) {
  const v = useFillValue(frac);
  if (width <= 0) return null;
  const translateX = v.interpolate({ inputRange: [0, 1], outputRange: [-width, 0], extrapolate: "clamp" });
  return (
    <Animated.View
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, width, backgroundColor: tint, borderRadius: radius, transform: [{ translateX }] }}
    />
  );
}

/** İzin genişliğini ölçen küçük kanca (dolgu piksel cinsinden kayıyor). */
function useTrackWidth(): [number, (e: LayoutChangeEvent) => void] {
  const [w, setW] = useState(0);
  return [w, (e) => { const n = e.nativeEvent.layout.width; if (Math.abs(n - w) > 0.5) setW(n); }];
}

/**
 * Yuvarlak uçlu ilerleme izi + yumuşak dolgu — `Bar` ve `FlowProgress`
 * (`ui/flow`) aynı parçayı kullanıyor. `pct` 0..100.
 */
export function ProgressTrack({ pct, tint, height, track, minPct = 0 }: { pct: number; tint: string; height: number; track: string; minPct?: number }) {
  const [w, onLayout] = useTrackWidth();
  const p = Math.max(minPct, Math.max(0, Math.min(100, pct)));
  return (
    <View onLayout={onLayout} style={{ height, borderRadius: height / 2, backgroundColor: track, overflow: "hidden" }}>
      <Fill frac={p / 100} width={w} tint={tint} radius={height / 2} />
    </View>
  );
}

export function Bar({ pct, tint, size = "inline", extra }: { pct: number; tint: string; size?: keyof typeof BAR_HEIGHT; extra?: { pct: number; tint: string } }) {
  const { colors } = useTheme();
  const height = BAR_HEIGHT[size];
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const [w, onLayout] = useTrackWidth();
  if (!extra) {
    // Sıfırda da ince bir uç: çubuğun boş değil "başlamamış" olduğu görünsün.
    return <ProgressTrack pct={pct} tint={tint} height={height} track={colors.surface2} minPct={3} />;
  }
  /* İki bölüm üst üste: açık bölüm ana + ek kadar, koyu ana bölüm önünde.
     Yan yana iki genişlik yerine böyle, çünkü ikisi de aynı kaydırmayla
     canlanıyor ve aralarında boşluk açılmıyor. */
  const main = clamp(pct);
  const both = clamp(main + clamp(extra.pct));
  return (
    <View onLayout={onLayout} style={{ height, borderRadius: height / 2, backgroundColor: colors.surface2, overflow: "hidden" }}>
      <Fill frac={both / 100} width={w} tint={extra.tint} />
      <Fill frac={main / 100} width={w} tint={tint} />
    </View>
  );
}
