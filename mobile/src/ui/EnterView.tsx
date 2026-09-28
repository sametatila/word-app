import React, { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";
import { reduceMotion } from "../lib/reduceMotion";

/**
 * SORU KARTI GİRİŞİ — solarak ve hafifçe aşağıdan kayarak.
 *
 * Yalnız `ChoiceGame` böyle giriyordu; `game/rounds`taki öteki turlar
 * (yazma, eşleştirme, sıralama, boşluk, doğru/yanlış, dinleme, artikel,
 * çoğul…) bir anda beliriyordu. Değerler `ChoiceGame`in eski değerleri:
 * 260 ms solma + 12 px'ten yay (speed 14, bounciness 6). Web karşılığı
 * `components/session-player.tsx` ~949 `AnimatePresence` (opacity + x 20,
 * 180 ms): öğrenci "yeni soruya geçtim" diyor. Mobil dikey kayıyor, çünkü
 * yatay kayma kenardan kaydırma (geri) hareketiyle karışıyor.
 *
 * `enterKey` değişince giriş yeniden oynuyor (aynı bileşen yeni tura
 * geçtiğinde). "Hareketi azalt"ta kart yerinde, anında.
 */
export const ENTER_FROM = 12;

export function useEnterAnim(enterKey: unknown): { opacity: Animated.Value; translateY: Animated.Value } {
  const opacity = useRef(new Animated.Value(reduceMotion() ? 1 : 0)).current;
  const translateY = useRef(new Animated.Value(reduceMotion() ? 0 : ENTER_FROM)).current;
  useEffect(() => {
    if (reduceMotion()) { opacity.setValue(1); translateY.setValue(0); return; }
    opacity.setValue(0);
    translateY.setValue(ENTER_FROM);
    const a = Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 260, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]);
    a.start();
    return () => a.stop();
  }, [enterKey, opacity, translateY]);
  return { opacity, translateY };
}

/** Girişi taşıyan kap; `style` verilmezse `flex: 1` (verilirse yerine geçer). */
export function EnterView({ enterKey, style, children }: { enterKey: unknown; style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const { opacity, translateY } = useEnterAnim(enterKey);
  return <Animated.View style={[style ?? { flex: 1 }, { opacity, transform: [{ translateY }] }]}>{children}</Animated.View>;
}
