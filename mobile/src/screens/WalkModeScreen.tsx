import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, ChevronRightIcon, WalkIcon } from "../ui/icons";
import { DEMO_WORDS, withArtikel } from "../data/demoWords";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Yürüyüş modu (§4 — manşet özellik). Eller serbest, kulakla öğren: kelimeler
 * sırayla sesli okunur (gerçek TTS native modülle sonra bağlanacak). Şimdilik
 * oynat/duraklat + ileri/geri ile akış ve nabız animasyonu; ekran cebe konsa
 * da dinleme sürer mesajı.
 */
export function WalkModeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const [playing, setPlaying] = useState(true);
  const [idx, setIdx] = useState(0);
  const pulse = useRef(new Animated.Value(0)).current;
  const word = DEMO_WORDS[idx % DEMO_WORDS.length];

  useEffect(() => {
    if (!playing) { pulse.stopAnimation(); return; }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [playing]);

  // Oynatılırken kelimeler kendiliğinden ilerler (sesli okuma temsili).
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIdx((i) => i + 1), 3200);
    return () => clearInterval(t);
  }, [playing]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] });
  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Yürüyüş modu</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.info + "1e", borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
          <WalkIcon color={colors.info} size={16} />
          <Text variant="caption" color={colors.info}>Eller serbest · kulakla öğren</Text>
        </View>

        {/* okunmakta olan kelime */}
        <View style={{ alignItems: "center", marginTop: spacing.xxxl, marginBottom: spacing.xxxl }}>
          <Text variant="caption" color={colors.textMuted}>kelime {(idx % DEMO_WORDS.length) + 1}/{DEMO_WORDS.length}</Text>
          <Text variant="display" color={colors.text} style={{ marginTop: spacing.sm }}>{withArtikel(word)}</Text>
          <Text variant="h3" color={colors.textMuted} style={{ marginTop: 4 }}>{word.tr}</Text>
        </View>

        {/* oynat/duraklat — nabız halkası */}
        <View style={{ alignItems: "center", justifyContent: "center", height: 140 }}>
          <Animated.View style={{ position: "absolute", width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primary, opacity: ringOpacity, transform: [{ scale: ringScale }] }} />
          <Animated.View style={{ transform: [{ scale }] }}>
            <PressableScale onPress={() => setPlaying((p) => !p)} style={[{ width: 96, height: 96, borderRadius: 48, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 14)]}>
              {playing
                ? <View style={{ flexDirection: "row", gap: 7 }}><View style={{ width: 8, height: 30, borderRadius: 3, backgroundColor: "#fff" }} /><View style={{ width: 8, height: 30, borderRadius: 3, backgroundColor: "#fff" }} /></View>
                : <View style={{ width: 0, height: 0, borderTopWidth: 16, borderBottomWidth: 16, borderLeftWidth: 26, borderTopColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "#fff", marginLeft: 6 }} />}
            </PressableScale>
          </Animated.View>
        </View>

        {/* ileri/geri */}
        <View style={{ flexDirection: "row", gap: spacing.xxl, marginTop: spacing.xl }}>
          <PressableScale onPress={() => setIdx((i) => (i - 1 + DEMO_WORDS.length) % DEMO_WORDS.length)} style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}>
            <View style={{ transform: [{ rotate: "180deg" }] }}><ChevronRightIcon color={colors.text} size={24} /></View>
          </PressableScale>
          <PressableScale onPress={() => setIdx((i) => i + 1)} style={{ width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }}>
            <ChevronRightIcon color={colors.text} size={24} />
          </PressableScale>
        </View>
      </View>

      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", paddingHorizontal: spacing.xxl, paddingBottom: insets.bottom + spacing.xl }}>
        Ekranı cebine koy — dinleme sürer, ellerin serbest kalır.
      </Text>
    </View>
  );
}
