"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { reducedMotion } from "@/lib/fx";

/** Görünür olunca yumuşakça beliren sarmalayıcı — uzun, kaydırılan sayfalar için. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Ortak yumuşama eğrisi — her açılış aynı hızlanmayla başlasın. */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Sıralı açılma.
 *
 * `Reveal` kaydırılan sayfalar için: öğe görüş alanına girince beliriyor.
 * Kart ekranlarında (tur özeti, etap kartı) kaydırma yok — her şey aynı anda
 * ekranda ve aynı anda beliriyordu. Bir kerede beliren yedi öğe tek bir blok
 * gibi okunuyor; hangisinin ne olduğu ancak durup bakınca ayrılıyor.
 *
 * Burada öğeler ARDI ARDINA açılıyor ve sıra, okunma sırasıyla aynı: önce
 * başlık, sonra sayılar, sonra ayrıntı. Göz zaten o sırayla gezecekti;
 * animasyon onu yönlendiriyor, ona yeni bir iş çıkarmıyor.
 *
 * Gecikme bilerek kısa (60 ms). Uzun aralık ekranı "yüklenirken" gösteriyor;
 * amaç bekletmek değil, sıra duygusu vermek.
 *
 * Hareket azaltma tercihinde her şey anında ve yerinde beliriyor: sıra bir
 * süslemedir, bilgi değil.
 */
export function Stagger({
  children,
  gap = 0.06,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** İki öğe arası gecikme, saniye. */
  gap?: number;
  /** Zincirin başlamasından önceki bekleme, saniye. */
  delay?: number;
  className?: string;
}) {
  const still = reducedMotion();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: still ? 0 : gap, delayChildren: still ? 0 : delay } },
  };
  return (
    <motion.div variants={container} initial="hidden" animate="show" className={className}>
      {children}
    </motion.div>
  );
}

/** `Stagger` içindeki tek bir öğe. */
export function StaggerItem({
  children,
  className = "",
  style,
  /** Yukarıdan mı aşağıdan mı gelsin — üstteki öğeler yukarıdan düşmeli. */
  from = "below",
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  from?: "below" | "above" | "scale";
}) {
  // Sıra kalkarken açılışın kendisi de kalkıyor: hareket azaltma tercihinde
  // öğe yerinde ve anında görünmeli, yarım saniyelik bir solma bile hareket.
  const still = reducedMotion();
  const item: Variants = {
    hidden: still
      ? { opacity: 1, y: 0, scale: 1 }
      : from === "scale"
        ? { opacity: 0, scale: 0.9 }
        : { opacity: 0, y: from === "above" ? -12 : 12 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: still ? 0 : 0.34, ease: EASE },
    },
  };
  return (
    <motion.div variants={item} className={className} style={style}>
      {children}
    </motion.div>
  );
}
