import React, { useEffect, useRef } from "react";
import { Animated, Easing, View, type StyleProp, type ViewStyle } from "react-native";
import { t } from "../lib/i18n";
import { reduceMotion } from "../lib/reduceMotion";
import { useTheme, radii, spacing, motion } from "../theme";

/**
 * KONUŞMA EKRANININ İKİ CANLI İŞARETİ — "yazıyor" noktaları ve dinlerken
 * nabız. Mobilde karşı tarafın beklemesi dönen bir çarktı, açık mikrofon da
 * duruk bir düğmeydi; ikisi de "takıldı mı?" dedirtiyordu.
 */

/*
 * Döngü süreleri (900 / 1100 ms) ve 140 ms'lik kaydırma jetonda YOK, bilerek:
 * bunlar geçiş değil ritim (nefes, yazma temposu); `motion.stagger` (30 ms)
 * sıralı girişin aralığı, üç noktalı dalga için fazla sık. Eğri ise iki yönlü
 * standart eğri `motion.ease` (eskiden `Easing.inOut(Easing.ease)`).
 */
const LOOP_EASE = Easing.bezier(...motion.ease);

/**
 * "Yazıyor" — üç nokta sırayla hafifçe yükselip parlıyor. Web
 * `components/conversations/conversation-player.tsx` `TypingDots` ile aynı
 * değerler: y 0→-3→0, opaklık .35→1→.35, 900 ms döngü, nokta başına 140 ms
 * gecikme. "Hareketi azalt"ta noktalar duruyor (webde `useStill`).
 */
export function TypingDots({ style }: { style?: StyleProp<ViewStyle> }) {
  const { colors } = useTheme();
  const still = reduceMotion();
  const vals = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  useEffect(() => {
    if (still) return;
    const loops = vals.map((v, i) =>
      Animated.sequence([
        Animated.delay(i * 140),
        Animated.loop(
          Animated.sequence([
            Animated.timing(v, { toValue: 1, duration: 450, easing: LOOP_EASE, useNativeDriver: true }),
            Animated.timing(v, { toValue: 0, duration: 450, easing: LOOP_EASE, useNativeDriver: true }),
          ]),
        ),
      ]),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [still, vals]);
  return (
    <View accessible accessibilityLabel={t("conversation.typing")} style={[{ flexDirection: "row", alignItems: "center", gap: spacing.xs, paddingVertical: 6, paddingHorizontal: 2 }, style]}>
      {vals.map((v, i) => (
        <Animated.View
          key={i}
          style={{
            width: 6, height: 6, borderRadius: radii.pill, backgroundColor: colors.textMuted,
            opacity: still ? 0.6 : v.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
            transform: still ? [] : [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -3] }) }],
          }}
        />
      ))}
    </View>
  );
}

/**
 * Dinlerken nabız — mikrofon simgesi 1→1.15→1, 1100 ms döngü (web
 * `conversation-player` mikrofon düğmesi, ~1475). Kapalıyken ya da "Hareketi
 * azalt"ta duruk. Döngü `ui/ListenButton` halkalarıyla aynı kalıpta.
 */
export function MicPulse({ active, children }: { active: boolean; children: React.ReactNode }) {
  const v = useRef(new Animated.Value(0)).current;
  const still = reduceMotion();
  useEffect(() => {
    if (!active || still) { v.stopAnimation(); v.setValue(0); return; }
    const l = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: 550, easing: LOOP_EASE, useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 550, easing: LOOP_EASE, useNativeDriver: true }),
      ]),
    );
    l.start();
    return () => l.stop();
  }, [active, still, v]);
  return (
    <Animated.View style={{ transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }) }] }}>
      {children}
    </Animated.View>
  );
}
