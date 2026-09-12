import React from "react";
import { Image, View } from "react-native";

/**
 * Erdi (maskot) — web ile aynı klipler (animasyonlu WebP). Android'de Fresco
 * animated-webp eklentisiyle oynar. Klipler 2:3 oranında; boy = en × 1.5.
 * Duruma göre ruh hâli: idle / happy / thumbsup (doğru) / sad (yanlış) /
 * celebrate (kutlama) / wave (selam) / sleep (hatırlatma) / think (düşünme).
 *
 * `think` SONRADAN GELDİ ve gelene kadar üç yüzey yanlış klip oynatıyordu.
 * Klip listesi `CLIP[mood] ?? CLIP.idle` ile okunuyor, yani olmayan bir kip
 * sessizce `idle`a düşüyor — sınav girişinde ve "bu oyuna kelime yok"
 * ekranında web düşünen maskotu çiziyor, Android etrafı tarayanı çiziyordu.
 * Dosya webin `public/anim/think.webp`si ile birebir (md5 aynı).
 */
const CLIP = {
  idle: require("../assets/mascot/idle-sit.webp"),
  happy: require("../assets/mascot/happy.webp"),
  thumbsup: require("../assets/mascot/thumbsup.webp"),
  sad: require("../assets/mascot/sad.webp"),
  celebrate: require("../assets/mascot/celebrate.webp"),
  wave: require("../assets/mascot/wave.webp"),
  sleep: require("../assets/mascot/sleep.webp"),
  think: require("../assets/mascot/think.webp"),
} as const;

export type Mood = keyof typeof CLIP;

export function Mascot({ mood = "idle", size = 88 }: { mood?: Mood; size?: number }) {
  return (
    <View style={{ width: size, height: size * 1.5, alignItems: "center", justifyContent: "flex-end" }}>
      <Image source={CLIP[mood] ?? CLIP.idle} style={{ width: size, height: size * 1.5 }} resizeMode="contain" fadeDuration={0} />
    </View>
  );
}
