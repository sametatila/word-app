import React from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

/*
 * Konfeti renkleri — web `components/celebrate.tsx` `COLORS` ile BİREBİR:
 * paletin altı ailesinin (marka, kehribar, mint, turkuaz, mor, gül) en canlı
 * basamakları. Üstünde yazı yok, o yüzden kontrast eşiği aranmıyor.
 *
 * Liste elle yazılı Tailwind varsayılanlarıydı (#fbbf24 amber-400, #34d399
 * emerald-400, #60a5fa blue-400, #f472b6 pink-400, #a78bfa violet-400) - yani
 * uygulamanın paletinde olmayan, hatta farklı renk AİLELERİNDEN değerler:
 * webin turkuazı yerine düz mavi, gülü yerine pembe. Kutlama kullanıcının
 * ekran görüntüsü aldığı an ve iki uygulama farklı renklerle kutluyordu.
 */
const CONFETTI = ["#eda45d", "#ddb62c", "#45b87a", "#35b2cc", "#ae79d4", "#ee6b7c"];

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
        colors={CONFETTI}
      />
    </View>
  );
}
