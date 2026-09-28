import React from "react";
import { useWindowDimensions, View, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { reduceMotion } from "../lib/reduceMotion";

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
/* İlk değer brand-400 (`orange[400]`); eskiden emekli kehribar #eda45d
   yazılıydı ve hiçbir rampanın basamağı değildi - web `celebrate` ile aynı
   düzeltme, aynı sebep. */
const CONFETTI = ["#fb8f2a", "#ddb62c", "#45b87a", "#35b2cc", "#ae79d4", "#ee6b7c"];

/**
 * Kutlama konfetisi — BÜYÜK anlarda bir kez patlar. Saf JS (Animated), native
 * modül yok. pointerEvents kapalı: altındaki butonları engellemez.
 *
 * AZ VE ANLAMLI. Yüz on parça vardı ve konfeti neredeyse her sonuç ekranında
 * çıkıyordu (ünite quizi, konuşma, beceri alıştırması); her geçişte patlayan
 * kutlama kutlama olmaktan çıkıyor. Şimdi yalnız: başarım
 * (`AchievementUnlock`), özellik/Premium açılışı (`UnlockCelebration`), lig
 * atlama (`LeagueBoardUp`), sınav geçti ve tur sonu mükemmel (`ui/flow`
 * `FlowScreen celebrate`).
 *
 * 40 parça: web `components/celebrate.tsx` `Confetti` varsayılanı 34 (rozet ve
 * lig 30). Birkaç fazlası, çünkü bu top ekranın tepesinden tek noktadan
 * patlıyor ve parçaların bir kısmı hemen ekran dışına savruluyor; webde
 * parçalar kartın ortasından yelpaze açıyor, hepsi görünür kalıyor.
 */
const CONFETTI_COUNT = 40;
export function Celebrate({ show }: { show: boolean }) {
  // Döndürme/yeniden boyutlanmada (tablet, yatay) güncel genişlik.
  const { width } = useWindowDimensions();
  /* "Hareketi azalt" açıkken konfeti HİÇ çizilmiyor - web `celebrate.tsx` de
     aynı kararı veriyor (`if (!fire || reducedMotion()) return`). Uçuşan
     parçacıklar bu ayarın kapatmayı istediği şeyin ta kendisi. */
  if (!show || reduceMotion()) return null;
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <ConfettiCannon
        count={CONFETTI_COUNT}
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
