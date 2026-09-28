import React, { useEffect, useRef } from "react";
import { Animated, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { t } from "../lib/i18n";
import { haptic } from "../lib/haptics";
import { reduceMotion } from "../lib/reduceMotion";
import { Text } from "./Text";
import { FlameIcon } from "./icons";
import { useTheme, spacing, softShadow, fillOf, ds } from "../theme";

/** Sahnenin ekranda kaldığı süre — web `streak-moment` `STREAK_MOMENT_MS` ile aynı. */
export const STREAK_MOMENT_MS = 1200;
/** Eski sayı bu kadar durup yerini yenisine bırakıyor (web `SWAP_MS`). */
const SWAP_MS = 380;

/**
 * SERİ ANI — günün ilk turu bitince, sonuç ekranından ÖNCE kısa bir sahne.
 * Web karşılığı `components/streak-moment`: aynı sıra, aynı süre, aynı metinler.
 *
 * Yalnız serinin o turun kaydında arttığı günde oynuyor (sunucu
 * `/api/answers` `streakUp`); günün ikinci turunda oynamıyor. Alev ölçek
 * yayıyla büyüyor, sayı eski değerden yeniye kayıyor, "streak" sesi ve
 * titreşimi tek çağrı (`haptic` sesi de çalıyor). `STREAK_MOMENT_MS` sonra
 * kendiliğinden, dokununca hemen geçiyor. "Hareketi azalt" açıkken hareket
 * yok: yeni sayı doğrudan yazılı, bilgi aynı.
 *
 * Canlandırılan yalnız dönüşüm ve saydamlık (yerel sürücü).
 */
export function StreakMoment({ streak, onDone }: { streak: number; onDone: () => void }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const still = reduceMotion();
  /* Seri kırılıp yeniden başladıysa (1) önceki değer 0: "yeni başladı" da bir artış. */
  const from = Math.max(0, streak - 1);
  const flame = useRef(new Animated.Value(still ? 1 : 0.4)).current;
  /* 0 → eski sayı yerinde; 1 → eski yukarı çıkıp söndü, yeni alttan geldi. */
  const swap = useRef(new Animated.Value(still ? 1 : 0)).current;
  const done = useRef(onDone);
  useEffect(() => { done.current = onDone; });

  useEffect(() => {
    haptic("streak");
    if (!still) {
      Animated.spring(flame, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
    }
    const s = setTimeout(() => {
      if (!still) Animated.spring(swap, { toValue: 1, friction: 7, tension: 140, useNativeDriver: true }).start();
    }, SWAP_MS);
    const end = setTimeout(() => done.current(), STREAK_MOMENT_MS);
    return () => { clearTimeout(s); clearTimeout(end); };
    // Yalnız açılışta bir kez: sahne kendi zamanlamasıyla oynuyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const numH = ds(40);
  const flameFill = fillOf("streak");
  return (
    <Pressable
      onPress={() => done.current()}
      accessibilityRole="button"
      accessibilityLabel={`${t("streak_moment.title", { n: streak })}. ${t("streak_moment.sub", { n: streak + 1 })}`}
      accessibilityHint={t("achu.tap_to_continue")}
      style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, paddingTop: insets.top, paddingBottom: insets.bottom, paddingHorizontal: spacing.xl }}
    >
      <Animated.View
        style={[
          { width: ds(96), height: ds(96), borderRadius: ds(48), alignItems: "center", justifyContent: "center", backgroundColor: flameFill, transform: [{ scale: flame }], opacity: flame.interpolate({ inputRange: [0.4, 1], outputRange: [0, 1], extrapolate: "clamp" }) },
          softShadow(flameFill, 14),
        ]}
      >
        <FlameIcon color="#fff" size={ds(52)} />
      </Animated.View>

      {/* SAYI: eski değer yukarı kayıp sönüyor, yenisi alttan geliyor. */}
      <View style={{ height: numH, overflow: "hidden", alignItems: "center" }} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {still ? (
          <Text variant="display" style={{ lineHeight: numH, fontVariant: ["tabular-nums"] }}>{String(streak)}</Text>
        ) : (
          <>
            <Animated.View style={{ transform: [{ translateY: swap.interpolate({ inputRange: [0, 1], outputRange: [0, -numH] }) }], opacity: swap.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }}>
              <Text variant="display" style={{ lineHeight: numH, fontVariant: ["tabular-nums"] }}>{String(from)}</Text>
            </Animated.View>
            <Animated.View style={{ position: "absolute", transform: [{ translateY: swap.interpolate({ inputRange: [0, 1], outputRange: [numH, 0] }) }], opacity: swap }}>
              <Text variant="display" style={{ lineHeight: numH, fontVariant: ["tabular-nums"] }}>{String(streak)}</Text>
            </Animated.View>
          </>
        )}
      </View>

      <Text variant="h2" style={{ textAlign: "center" }}>{t("streak_moment.title", { n: streak })}</Text>
      <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("streak_moment.sub", { n: streak + 1 })}</Text>
    </Pressable>
  );
}
