"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { useStill } from "@/lib/use-still";

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
 * Gecikme bilerek kısa (45 ms). Ölçüldü: yedi bölümlü tur özetinde 70 ms
 * aralık zinciri 800 ms'ye çıkarıyordu ve ekran "yükleniyor" gibi
 * görünüyordu; amaç bekletmek değil, sıra duygusu vermek.
 *
 * ## Çocukları neden kendisi sarıyor
 *
 * Önce her bölümü elle `StaggerItem` ile sarmak gerekiyordu ve tur özetinde
 * dokuz bölümün yalnızca üçü sarılmıştı. Sonuç sıranın kendisini bozuyordu:
 * sarılmayan bölümler animasyona hiç katılmadığı için ANINDA görünüyor, yani
 * kartın ortası başlığından önce beliriyordu. Sarmayı unutmak mümkün olduğu
 * sürece bu hata tekrar eder; artık sarmayı bileşen yapıyor.
 *
 ## Hareket azaltma neden CSS ile kapatılıyor
 *
 * Tercihi JavaScript'te okumak yetmiyor. `useStill` doğru değeri ancak ilk
 * boyamadan SONRA verebiliyor (öncesinde sunucuyla aynı cevabı vermek
 * zorunda, yoksa hydration uyuşmuyor) — o ana kadar animasyon çoktan
 * başlamış oluyor. Ölçümde tercih açıkken bölümler yine sırayla açılıyordu.
 *
 * CSS ilk kareden itibaren geçerli ve sunucu/istemci ayrımı yok: aşağıdaki
 * `data-stagger` işaretine bağlı kural (bkz. globals.css) framer-motion'ın
 * satır içi stilini eziyor ve bölümler yerinde, anında görünüyor. JS tarafı
 * yine de tercihi okuyor — gecikmeleri sıfırlayıp gereksiz iş yapmasın diye.
 */
export function Stagger({
  children,
  gap = 0.045,
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
  const still = useStill();
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: still ? 0 : gap, delayChildren: still ? 0 : delay } },
  };
  const item: Variants = {
    hidden: still ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: still ? 0 : 0.34, ease: EASE } },
  };
  return (
    <motion.div
      data-stagger
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {Children.map(children, (child) =>
        isValidElement(child) ? <motion.div variants={item}>{child}</motion.div> : child,
      )}
    </motion.div>
  );
}
