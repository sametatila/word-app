import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { reduceMotion } from "../lib/reduceMotion";

/**
 * Nomi (maskot) — 3B Nomi'nin iskelet animasyonlarından çizilmiş klipler
 * (2026-09-29; web ikizi `components/mascot`). Alfa kanallı animasyonlu WebP,
 * 192x288, 24 fps; Android'de Fresco animated-webp eklentisiyle oynar. Boy =
 * en × 1.5.
 *
 * ANİMASYON YALNIZ GÜNLÜK TURDA (2026-09-18, Samet'in kararı): tek yer Öğren
 * sekmesinin günlük tur kutusu. Kapı: `check:parity` "maskot yalnız günlük
 * turda".
 *
 * DİKİŞSİZ ZİNCİR: bütün klipler BİREBİR aynı nötr karede başlayıp bitiyor
 * (baş ve son altı kare bekleme karesiyle harmanlandı). Boşta bekleme ile
 * hareketler sırayla oynar: bekleme → rastgele hareket → bekleme…; takas
 * klip süresi dolunca nötr karede yapılır, yeni klip çözülene kadar eskisi
 * altta kalır (çift tampon), geçiş görünmez.
 */
const CLIP = {
  idle: require("../assets/mascot/nomi-bekleme.webp"),
  happy: require("../assets/mascot/nomi-gulumse.webp"),
  thumbsup: require("../assets/mascot/nomi-el.webp"),
  sad: require("../assets/mascot/nomi-uzgun.webp"),
  celebrate: require("../assets/mascot/nomi-zipla.webp"),
  wow: require("../assets/mascot/nomi-saskin.webp"),
} as const;

export type Mood = keyof typeof CLIP;

/** Boşta zincir (web `IDLE_CLIPS` ile aynı sıra ve kural); ilk eleman bekleme. */
const IDLE_CLIPS: { name: string; src: number; ms: number }[] = [
  { name: "nomi-bekleme", src: CLIP.idle, ms: 6000 },
  { name: "nomi-kafa", src: require("../assets/mascot/nomi-kafa.webp"), ms: 5000 },
  { name: "nomi-gozcu", src: require("../assets/mascot/nomi-gozcu.webp"), ms: 5000 },
  { name: "nomi-el", src: CLIP.thumbsup, ms: 2792 },
  { name: "nomi-gulumse", src: CLIP.happy, ms: 2000 },
  { name: "nomi-zipla", src: CLIP.celebrate, ms: 1583 },
];
/** Duygu kliplerinin süresi (kare / 24 fps). */
const MOOD_MS: Record<Mood, number> = { idle: 6000, happy: 2000, thumbsup: 2792, sad: 2000, celebrate: 1583, wow: 2000 };

/** Azaltılmış harekette Nomi DURUR: bütün kliplerin ortak nötr karesi. */
const STILL = require("../assets/mascot/still/nomi-durgun.webp");

/**
 * Nomi'nin boyu — TEK sayı, çünkü Nomi'nin tek yeri var: Öğren ekranının
 * günlük tur kutusu (2026-09-22, Samet'in kararı). Önce `ui/flow` içindeydi
 * (şablonlar maskotu kendisi çiziyordu), sonra iki sayı olarak buraya taşındı
 * (sonuç bandı 80, durum ekranı 96); tur içindeki bütün yüzeyler kalkınca
 * geriye kutu kaldı. Web ikizi `components/mascot`.
 */
export const MASCOT_CARD = 96;

export function Mascot({
  mood = "idle",
  size = 88,
}: {
  mood?: Mood;
  size?: number;
}) {
  const still = reduceMotion();
  /* Gösterilen klip: boşta zincirin sırası (0 = bekleme), duyguda duygunun klibi.
     `n` her takasta artar: aynı klip yeniden oynasın diye görsel yeniden kurulur. */
  const [idle, setIdle] = useState(0);
  const [n, setN] = useState(0);
  const lastMove = useRef(0);
  const [prev, setPrev] = useState<{ src: number; key: string } | null>(null);
  const clip = mood === "idle" ? IDLE_CLIPS[idle] : { name: mood, src: CLIP[mood], ms: MOOD_MS[mood] };
  const key = `${clip.name}-${n}`;

  useEffect(() => {
    if (still || mood !== "idle") return;
    const t = setTimeout(() => {
      setPrev({ src: clip.src, key });
      setIdle((cur) => {
        if (cur !== 0) return 0;
        const moves = IDLE_CLIPS.map((_, i) => i).filter((i) => i !== 0 && i !== lastMove.current);
        const next = moves[Math.floor(Math.random() * moves.length)];
        lastMove.current = next;
        return next;
      });
      setN((x) => x + 1);
    }, clip.ms + 60);
    return () => clearTimeout(t);
  }, [key, mood, still, clip.ms, clip.src]);

  // Çift tampon: eski klibin donmuş nötr karesi, yenisi çözülene kadar 500 ms altta.
  useEffect(() => {
    if (!prev) return;
    const t = setTimeout(() => setPrev(null), 500);
    return () => clearTimeout(t);
  }, [prev]);

  const box = { position: "absolute" as const, bottom: 0, width: size, height: size * 1.5 };
  return (
    <View style={{ width: size, height: size * 1.5, alignItems: "center", justifyContent: "flex-end" }}>
      {still ? (
        <Image source={STILL} style={box} resizeMode="contain" fadeDuration={0} />
      ) : (
        <>
          {prev ? <Image key={prev.key} source={prev.src} style={box} resizeMode="contain" fadeDuration={0} /> : null}
          <Image key={key} source={clip.src} style={box} resizeMode="contain" fadeDuration={0} />
        </>
      )}
    </View>
  );
}
