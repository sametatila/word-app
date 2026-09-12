import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { reduceMotion } from "../lib/reduceMotion";
import { claimStage, releaseStage } from "../lib/mascotStage";

/**
 * Erdi'nin ortam sürprizleri — web `components/mascot-fx` karşılığı.
 *
 *   YÜRÜYÜŞ   Rastgele bir anda ekranın altından bir uçtan girip öbür uçtan
 *             çıkıyor. Süre hıza değil EKRAN GENİŞLİĞİNE bağlı: dar telefonda
 *             kısa, geniş ekranda uzun yürüyor ama adım hızı hep aynı.
 *             Klipler yerinde yürüme döngüsü; yer değiştirmeyi bu bileşen verir.
 *
 *   DİKİZLEME Daha seyrek: yan kenardan, gövdesinin yarısı dışarıda kalacak
 *             şekilde uzanıp bakıp kayboluyor.
 *
 * MOBİLDE YÜRÜYÜŞ HİÇ YOKTU ve dikizleme ruh hâli klibiyle yapılıyordu (bkz.
 * web-parity §11.471, §11.472): altı klip pakete kopyalandı — dosyalar webin
 * `public/anim` altındakilerle birebir aynı, mevcut sekiz klipte olduğu gibi.
 *
 * Randevu zamanları MODÜL kapsamında: oyun ekranları tur/durum geçişlerinde
 * bileşeni yeniden kuruyor ve bileşen state'indeki bir geri sayım hiçbir zaman
 * dolmuyordu — webde bu kusur bulunup aynı çözümle giderilmişti.
 *
 * İkisi de `pointerEvents="none"`: mirket ekrandan geçerken hiçbir dokunma
 * hedefini perdelemez. "Hareketi azalt" tercihinde hiç çıkmazlar.
 */
const CLIP = {
  peek: require("../assets/mascot/peek.webp"),
  "peek-mirror": require("../assets/mascot/peek-mirror.webp"),
  "walk-left": require("../assets/mascot/walk-left.webp"),
  "walk-right": require("../assets/mascot/walk-right.webp"),
  "stroll-left": require("../assets/mascot/stroll-left.webp"),
  "stroll-right": require("../assets/mascot/stroll-right.webp"),
} as const;

const rastgele = (min: number, max: number) => min + Math.random() * (max - min);

/* Randevular — bileşen yeniden kurulsa da yaşamaya devam eder. */
let walkNextAt = 0;
let peekNextAt = 0;

/** Yürüme hızı (px/sn) — süre ekran genişliğinden türetiliyor. Web ile aynı. */
const WALK_SPEED = 95;
const WALK_H = 76;
/** Klibin bir tur "uzan-bak-geri çekil" süresi. Web `PEEK_MS` ile aynı. */
const PEEK_MS = 4600;
/** Kadraj dışına taşan pay: gövdenin yarısı dışarıda kalıyor. */
const PEEK_OUT = 125;
const PEEK_H = 190;

export function MascotFx() {
  if (reduceMotion()) return null;
  return (
    <>
      <Walker />
      <Peeker />
    </>
  );
}

function Walker() {
  const insets = useSafeAreaInsets();
  const [walk, setWalk] = useState<{
    dir: "ltr" | "rtl";
    /* "walk": normal yürüyüş; "stroll": patiler ensede rahat gezinti. */
    kind: "walk" | "stroll";
    dur: number;
    w: number;
  } | null>(null);
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (walkNextAt === 0) walkNextAt = Date.now() + rastgele(15_000, 60_000);
    const tick = setInterval(() => {
      if (walk || Date.now() < walkNextAt) return;
      const w = Dimensions.get("window").width;
      const dur = (w + 2 * 140) / WALK_SPEED;
      // Sahne doluysa (dikizleme, kutlama) bir sonraki saniyede yine bak.
      if (!claimStage("walk", dur * 1000 + 400)) return;
      walkNextAt = Date.now() + dur * 1000 + rastgele(90_000, 210_000);
      setWalk({
        dir: Math.random() < 0.5 ? "ltr" : "rtl",
        kind: Math.random() < 0.35 ? "stroll" : "walk",
        dur,
        w,
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [walk]);

  useEffect(() => {
    if (!walk) return;
    const fromX = walk.dir === "ltr" ? -140 : walk.w + 140;
    const toX = walk.dir === "ltr" ? walk.w + 140 : -140;
    x.setValue(fromX);
    Animated.timing(x, { toValue: toX, duration: walk.dur * 1000, easing: (t) => t, useNativeDriver: true }).start();
    const t = setTimeout(() => setWalk(null), walk.dur * 1000 + 400);
    return () => {
      clearTimeout(t);
      releaseStage("walk");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walk]);

  if (!walk) return null;
  const ad = `${walk.kind}-${walk.dir === "ltr" ? "right" : "left"}` as keyof typeof CLIP;
  return (
    <Animated.View
      pointerEvents="none"
      /* Ayaklar klipte alt kenara basıyor; güvenli alanın hemen üstünde
         yürüyor (webde nav çubuğunun üstü). */
      style={{ position: "absolute", left: 0, bottom: insets.bottom, transform: [{ translateX: x }] }}
    >
      <Image source={CLIP[ad]} style={{ height: WALK_H, width: WALK_H * 1.4 }} resizeMode="contain" fadeDuration={0} />
    </Animated.View>
  );
}

function Peeker() {
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (peekNextAt === 0) peekNextAt = Date.now() + rastgele(60_000, 150_000);
    const tick = setInterval(() => {
      if (side || Date.now() < peekNextAt) return;
      if (!claimStage("peek", PEEK_MS + 400)) return;
      peekNextAt = Date.now() + PEEK_MS + rastgele(150_000, 330_000);
      setSide(Math.random() < 0.5 ? "left" : "right");
    }, 1000);
    return () => clearInterval(tick);
  }, [side]);

  useEffect(() => {
    if (!side) return;
    const gizli = side === "right" ? 40 : -40;
    x.setValue(gizli);
    Animated.timing(x, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    const t = setTimeout(() => {
      Animated.timing(x, { toValue: gizli, duration: 300, useNativeDriver: true }).start(({ finished }) => {
        if (finished) setSide(null);
      });
    }, PEEK_MS - 300);
    return () => {
      clearTimeout(t);
      releaseStage("peek");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [side]);

  if (!side) return null;
  /* Klip sağa yaslanıp sola sarkıyor: sağ kenar için doğal, sol kenar aynalı. */
  return (
    <Animated.View
      pointerEvents="none"
      style={{ position: "absolute", bottom: "30%", [side]: -PEEK_OUT, transform: [{ translateX: x }] }}
    >
      <Image
        source={side === "right" ? CLIP.peek : CLIP["peek-mirror"]}
        style={{ height: PEEK_H, width: PEEK_H * 1.4 }}
        resizeMode="contain"
        fadeDuration={0}
      />
    </Animated.View>
  );
}
