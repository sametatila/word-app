"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStill } from "@/lib/use-still";
import { claimStage, releaseStage } from "@/lib/mascot-stage";
import { useClipUrl } from "@/lib/mascot-clips";

/**
 * Erdi'nin ortam sürprizleri — oyun oynanırken araya giren eğlence anları.
 *
 *   YÜRÜYÜŞ   Rastgele bir anda ekranın altından bir uçtan girip öbür uçtan
 *             çıkıyor. Süre hıza değil EKRAN GENİŞLİĞİNE bağlı: dar telefonda
 *             kısa, geniş ekranda uzun yürüyor ama adım hızı hep aynı.
 *             Klipler yerinde yürüme döngüsü; yer değiştirmeyi bu bileşen verir.
 *
 *   DİKİZLEME Daha seyrek: yan kenardan, gövdesinin yarısı dışarıda kalacak
 *             şekilde uzanıp "aa, bu ne yapıyormuş?" diye bakıp kayboluyor.
 *
 * ## Zamanlama neden modül kapsamında
 *
 * İlk sürüm geri sayımı bileşen state'inde tutuyordu ve kullanıcı sürprizleri
 * HİÇ göremedi: oyun ekranları tur/durum geçişlerinde bileşeni yeniden kuruyor
 * ve her kuruluş sayacı sıfırlıyordu — sayaç hiçbir zaman dolmuyordu. Üstelik
 * ilk yürüyüşten sonra yenisi de planlanmıyordu. Randevu zamanları artık modül
 * değişkeninde: yeniden kuruluş geri sayımı ETKİLEMEZ, her olay bitince
 * sıradaki randevu kurulur. Bileşen saniyede bir "randevu geldi mi?" diye
 * bakar; sekme arka plandaysa randevu bir sonraki bakışa sarkar.
 *
 * Her ikisi de `pointer-events-none`: mirket ekrandan geçerken hiçbir dokunma
 * hedefini PERDELEMEZ. Nav çubuğunun üstünde ama diyalog katmanlarının
 * altında (z-30) dururlar. Hareket azaltma tercihinde hiç çıkmazlar.
 */
export function MascotFx() {
  const still = useStill();
  if (still) return null;
  return (
    <>
      <Walker />
      <Peeker />
    </>
  );
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/* Randevular — bileşen yeniden kurulsa da yaşamaya devam eder. */
let walkNextAt = 0;
let peekNextAt = 0;

/** Yürüme hızı (CSS px/sn) — süre ekran genişliğinden türetiliyor. */
const WALK_SPEED = 95;
const WALK_H = 76;

function Walker() {
  const [walk, setWalk] = useState<{
    dir: "ltr" | "rtl";
    /* "walk": normal yürüyüş; "stroll": patiler ensede rahat gezinti — çeşitlilik. */
    kind: "walk" | "stroll";
    dur: number;
    w: number;
  } | null>(null);

  useEffect(() => {
    if (walkNextAt === 0) walkNextAt = Date.now() + rand(15_000, 60_000);
    const tick = setInterval(() => {
      if (walk || document.hidden || Date.now() < walkNextAt) return;
      const w = window.innerWidth;
      const dur = (w + 2 * 140) / WALK_SPEED;
      // Sahne doluysa (şerit çekiliyor, kutlama sürüyor) bir sonraki saniyede yine bak.
      if (!claimStage("walk", dur * 1000 + 400)) return;
      walkNextAt = Date.now() + dur * 1000 + rand(90_000, 210_000);
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
    const t = setTimeout(() => setWalk(null), walk.dur * 1000 + 400);
    return () => {
      clearTimeout(t);
      releaseStage("walk");
    };
  }, [walk]);

  const walkUrl = useClipUrl(
    walk ? `${walk.kind}-${walk.dir === "ltr" ? "right" : "left"}` : null,
  );
  if (!walk || !walkUrl) return null;
  const fromX = walk.dir === "ltr" ? -140 : walk.w + 140;
  const toX = walk.dir === "ltr" ? walk.w + 140 : -140;
  return (
    <motion.div
      aria-hidden
      /* Ayaklar klipte alt kenara basıyor (işlemede alt pay kırpıldı); bottom
         tam nav yüksekliği - 2px: mirket navigasyonun ÜSTÜNDE yürüyor hissi. */
      className="pointer-events-none fixed z-30"
      style={{ bottom: "calc(var(--nav-h, 4.5rem) - 2px)", left: 0 }}
      initial={{ x: fromX }}
      animate={{ x: toX }}
      transition={{ duration: walk.dur, ease: "linear" }}
    >
      <img
        src={walkUrl}
        alt=""
        style={{ height: WALK_H, width: "auto" }}
        draggable={false}
      />
    </motion.div>
  );
}

const PEEK_MS = 4600; // klip bir tur "uzan-bak-geri çekil" süresi

function Peeker() {
  const [side, setSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (peekNextAt === 0) peekNextAt = Date.now() + rand(60_000, 150_000);
    const tick = setInterval(() => {
      if (side || document.hidden || Date.now() < peekNextAt) return;
      if (!claimStage("peek", PEEK_MS + 400)) return;
      peekNextAt = Date.now() + PEEK_MS + rand(150_000, 330_000);
      setSide(Math.random() < 0.5 ? "left" : "right");
    }, 1000);
    return () => clearInterval(tick);
  }, [side]);

  useEffect(() => {
    if (!side) return;
    const t = setTimeout(() => setSide(null), PEEK_MS);
    return () => {
      clearTimeout(t);
      releaseStage("peek");
    };
  }, [side]);

  const peekUrl = useClipUrl(side ? (side === "right" ? "peek" : "peek-mirror") : null);
  return (
    <AnimatePresence>
      {side && peekUrl ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed z-30"
          style={{
            bottom: "30%",
            /* Gövdenin yarısı kadraj dışında: klip ~250px genişlikte görünüyor. */
            ...(side === "right" ? { right: -125 } : { left: -125 }),
          }}
          initial={{ opacity: 0, x: side === "right" ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: side === "right" ? 40 : -40 }}
          transition={{ duration: 0.3 }}
        >
          {/* Klip sağa yaslanıp sola sarkıyor: sağ kenar için doğal, sol kenar aynalı. */}
          <img
            src={peekUrl}
            alt=""
            style={{ height: 190, width: "auto" }}
            draggable={false}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
