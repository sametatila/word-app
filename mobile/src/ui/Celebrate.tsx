import React from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

/**
 * Kutlama konfetisi — tamamlanma/başarı ekranlarında bir kez patlar. Saf JS
 * (Animated), native modül yok. pointerEvents kapalı: altındaki butonları engellemez.
 */
export function Celebrate({ show }: { show: boolean }) {
  // Döndürme/yeniden boyutlanmada (tablet, yatay) güncel genişlik.
  const { width } = useWindowDimensions();
  if (!show) return null;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <ConfettiCannon
        count={110}
        origin={{ x: width / 2, y: -20 }}
        autoStart
        fadeOut
        explosionSpeed={340}
        fallSpeed={2700}
        colors={["#f87612", "#fbbf24", "#34d399", "#60a5fa", "#f472b6", "#a78bfa"]}
      />
    </View>
  );
}
