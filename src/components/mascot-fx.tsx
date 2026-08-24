"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useStill } from "@/lib/use-still";

/**
 * Erdi'nin ortam sürprizleri — oyun oynanırken araya giren eğlence anları.
 *
 * İki sürpriz var ve ikisi de SEYREK: sürpriz sık tekrar ederse süs olmaktan
 * çıkıp gürültüye dönüşüyor.
 *
 *   YÜRÜYÜŞ   Rastgele bir anda ekranın altından bir uçtan girip öbür uçtan
 *             çıkıyor. Süre hıza değil EKRAN GENİŞLİĞİNE bağlı: dar telefonda
 *             kısa, geniş ekranda uzun yürüyor ama adımlarının hızı hep aynı —
 *             süreyi sabitlemek geniş ekranda karakteri kaydırak gibi
 *             kaydırıyordu. Klipler yerinde yürüme döngüsü; yer değiştirmeyi
 *             bu bileşen veriyor. walk-left klibi 3. saniyeden, walk-right
 *             2. saniyeden başlar; baştaki "öne dönük durup profile dönme"
 *             girişi paketleme sırasında atıldı ve döngü, başlangıç karesine
 *             en çok benzeyen karede kesildiği için dikişsiz.
 *
 *   DİKİZLEME Daha da seyrek: ekranın yan kenarından, gövdesinin yarısı
 *             dışarıda kalacak şekilde uzanıp "aa, bu ne yapıyormuş?" diye
 *             bakıp kayboluyor. Klip sağ kenara göre üretildi; sol kenar
 *             aynalanmış kopyayı kullanıyor.
 *
 * Her ikisi de `pointer-events-none`: mirket ekrandan geçerken hiçbir dokunma
 * hedefini PERDELEMEZ — cevap vermeye çalışan kullanıcının tıklamasını yiyen
 * bir süs, süs değil tuzaktır. Aynı nedenle nav çubuğunun üstünde ama diyalog
 * katmanlarının altında (z-30) duruyorlar.
 *
 * Hareket azaltma tercihinde ikisi de hiç çıkmıyor: bunlar bilgi taşımayan,
 * salt hareketten ibaret süsler.
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

/** ms cinsinden rastgele aralık. */
const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Yürüme hızı (CSS px/sn) — süre ekran genişliğinden türetiliyor. */
const WALK_SPEED = 95;
const WALK_H = 76; // görüntülenen yükseklik (px); klipler 300px, retina payı bol

function Walker() {
  const [walk, setWalk] = useState<{ dir: "ltr" | "rtl"; dur: number; w: number } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const schedule = (first: boolean) => {
      timer = setTimeout(() => {
        // Sekme arka plandaysa sürprizi harcama; kısa süre sonra tekrar bak.
        if (document.hidden) {
          schedule(false);
          return;
        }
        const w = window.innerWidth;
        setWalk({
          dir: Math.random() < 0.5 ? "ltr" : "rtl",
          dur: (w + 2 * 140) / WALK_SPEED,
          w,
        });
      }, rand(first ? 45_000 : 100_000, first ? 150_000 : 260_000));
    };
    schedule(true);
    return () => clearTimeout(timer);
  }, []);

  // Yürüyüş bitince kaybol ve bir sonrakini bekle (effect yeniden kurulur).
  useEffect(() => {
    if (!walk) return;
    const t = setTimeout(() => setWalk(null), walk.dur * 1000 + 400);
    return () => clearTimeout(t);
  }, [walk]);

  if (!walk) return null;
  const fromX = walk.dir === "ltr" ? -140 : walk.w + 140;
  const toX = walk.dir === "ltr" ? walk.w + 140 : -140;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-30"
      style={{ bottom: "calc(var(--nav-h, 4.5rem) + 0.25rem)", left: 0 }}
      initial={{ x: fromX }}
      animate={{ x: toX }}
      transition={{ duration: walk.dur, ease: "linear" }}
    >
      <img
        src={walk.dir === "ltr" ? "/anim/walk-right.webp" : "/anim/walk-left.webp"}
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
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      timer = setTimeout(() => {
        if (document.hidden) {
          schedule();
          return;
        }
        setSide(Math.random() < 0.5 ? "left" : "right");
      }, rand(240_000, 540_000));
    };
    schedule();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!side) return;
    const t = setTimeout(() => setSide(null), PEEK_MS);
    return () => clearTimeout(t);
  }, [side]);

  return (
    <AnimatePresence>
      {side ? (
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
            src={side === "right" ? "/anim/peek.webp" : "/anim/peek-mirror.webp"}
            alt=""
            style={{ height: 190, width: "auto" }}
            draggable={false}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
