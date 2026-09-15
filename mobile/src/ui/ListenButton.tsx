import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import { PressableScale } from "./PressableScale";
import { RefreshIcon, SpeakerIcon, StopIcon } from "./icons";
import { reduceMotion } from "../lib/reduceMotion";
import { useTheme, softShadow } from "../theme";

/**
 * Dinleme oynatıcısının durumu — web `components/listen-button` ile aynı dört
 * durum ve aynı çizim:
 *
 *   - `idle`    hiç dinlenmedi: hoparlör.
 *   - `loading` basıldı, ses henüz başlamadı: hoparlörün çevresinde dönen
 *               halka. Nöral ses ilk dinlemede bir-iki saniye sürebiliyor.
 *   - `playing` çalıyor: durdur işareti + dışa yayılan halkalar.
 *   - `done`    en az bir kez dinlendi: tekrar dinle işareti.
 *
 * Eskiden düğme her durumda aynı hoparlördü; çalıp çalmadığı yalnız altındaki
 * yazıdan anlaşılıyordu ve "durdur" hiçbir yerde görünmüyordu.
 */
export type ListenState = "idle" | "loading" | "playing" | "done";

export function ListenButton({ state, onPress, label, size = 64 }: { state: ListenState; onPress: () => void; label: string; size?: number }) {
  const { colors } = useTheme();
  const still = reduceMotion();
  const pulse = useRef([new Animated.Value(0), new Animated.Value(0)]).current;
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (still || state !== "playing") { pulse.forEach((v) => v.setValue(0)); return; }
    const loops = pulse.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 800),
          Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [state, still, pulse]);

  useEffect(() => {
    if (still || state !== "loading") { spin.setValue(0); return; }
    const l = Animated.loop(Animated.timing(spin, { toValue: 1, duration: 900, easing: Easing.linear, useNativeDriver: true }));
    l.start();
    return () => l.stop();
  }, [state, still, spin]);

  const icon = Math.round(size * 0.42);
  return (
    <View style={{ width: size, height: size }}>
      {state === "playing" && !still
        ? pulse.map((v, i) => (
            <Animated.View
              key={i}
              pointerEvents="none"
              style={{
                position: "absolute", top: 0, left: 0, width: size, height: size, borderRadius: size / 2, backgroundColor: colors.primary,
                opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0] }),
                transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] }) }],
              }}
            />
          ))
        : null}
      {state === "loading" ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute", top: -4, left: -4, width: size + 8, height: size + 8, borderRadius: (size + 8) / 2,
            borderWidth: 3, borderColor: colors.primary, borderTopColor: "transparent",
            transform: [{ rotate: spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }],
          }}
        />
      ) : null}
      <PressableScale
        accessibilityLabel={label}
        accessibilityState={{ busy: state === "loading" }}
        onPress={onPress}
        style={[{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 10)]}
      >
        {state === "playing" ? (
          <StopIcon color={colors.onPrimary} size={Math.round(icon * 0.8)} />
        ) : state === "done" ? (
          <RefreshIcon color={colors.onPrimary} size={icon} />
        ) : (
          <View style={{ opacity: state === "loading" ? 0.7 : 1 }}><SpeakerIcon color={colors.onPrimary} size={icon} /></View>
        )}
      </PressableScale>
    </View>
  );
}
