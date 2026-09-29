"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { T } from "@/lib/motion";
import { reducedMotion, vibrate } from "@/lib/fx";
import { ComboIcon, SurvivalIcon } from "@/components/icons";

/*
 * Konfeti — üstünde yazı yok, o yüzden rampanın en canlı basamakları: altı
 * değerin altısı da ailelerin 400'ü (brand, flame, mint, sky, violet, rose).
 *
 * İLK DEĞER RAMPADA DEĞİLDİ. #eda45d, markanın kehribar olduğu dönemden
 * kalmıştı ve marka mobilden gelen turuncuya geçtiğinde (bkz. globals.css
 * `--color-brand-*`) hiçbir rampanın basamağı olmayan yetim bir değere
 * dönüştü — kutlama, kullanıcının ekran görüntüsü aldığı an, artık var
 * olmayan bir kimlikle patlıyordu. İki platformda da AYNI yetim değer
 * yazılıydı, o yüzden karşılaştırma geçiyordu (`check:colors` ikisini de
 * "birebir" diye kayda geçirmişti). Yeni değer brand-400.
 */
const COLORS = ["#fb8f2a", "#ddb62c", "#45b87a", "#35b2cc", "#ae79d4", "#ee6b7c"];

/** Deterministik olmayan ama tur boyunca sabit kalan parçacık listesi. */
function particles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * (0.12 + 0.76 * (i / count))) * -1; // yukarı doğru yelpaze
    const speed = 140 + Math.random() * 190;
    return {
      id: i,
      x: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * 0.7,
      y: Math.sin(angle) * speed - Math.random() * 90,
      rotate: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 7,
      round: Math.random() > 0.6,
      delay: Math.random() * 0.12,
    };
  });
}

/**
 * Konfeti patlaması. `fire` her arttığında yeniden patlar.
 * Hareket azaltma tercihi açıksa hiç çizilmez.
 */
export function Confetti({ fire, count = 34 }: { fire: number; count?: number }) {
  const [burst, setBurst] = useState<{ key: number; items: ReturnType<typeof particles> } | null>(
    null,
  );

  useEffect(() => {
    if (!fire || reducedMotion()) return;
    setBurst({ key: fire, items: particles(count) });
    const t = setTimeout(() => setBurst(null), 1700);
    return () => clearTimeout(t);
  }, [fire, count]);

  if (!burst) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 z-30 flex justify-center">
      {burst.items.map((p) => (
        <motion.span
          key={`${burst.key}-${p.id}`}
          initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 0.6 }}
          animate={{ opacity: [1, 1, 0], x: p.x, y: [0, p.y, p.y + 320], rotate: p.rotate, scale: 1 }}
          transition={{ duration: 1.5, delay: p.delay, ease: [0.2, 0.7, 0.4, 1] }}
          className="absolute"
          style={{
            width: p.size,
            height: p.round ? p.size : p.size * 0.42,
            borderRadius: p.round ? "50%" : 2,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Sayıyı sıfırdan (ya da `from`dan) hedefe sayarak gösterir — kazanım hissini
 * güçlendirir. Mobil karşılığı `ui/CountUp`, aynı eğri ve aynı alanlar.
 *
 * `delay`: sayma başlamadan önce beklenen süre; tur sonunda XP, doğruluk ve
 * seri sırayla gelsin diye (bkz. `session-player` `SummaryCard`). Beklerken
 * başlangıç değeri görünüyor, boşluk değil: satırın genişliği oynamasın.
 * `format`: sayının ekrandaki biçimi (yüzde, "5 gün"); ara değerler de
 * aynı biçimle yazılıyor.
 */
export function CountUp({
  value,
  duration = 900,
  delay = 0,
  from = 0,
  format,
}: {
  value: number;
  duration?: number;
  delay?: number;
  from?: number;
  format?: (n: number) => React.ReactNode;
}) {
  const [shown, setShown] = useState(from);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion() || value <= from) {
      setShown(value);
      return;
    }
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now + delay;
      const t = Math.max(0, Math.min(1, (now - start) / duration));
      // yavaşlayarak biten eğri
      setShown(Math.round(from + (value - from) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, duration, delay, from]);

  return <>{format ? format(shown) : shown}</>;
}

/** Kombo/rekor gibi anlık başarıların ekranın ortasında beliren rozeti. */
export function AchievementFlash({
  message,
  tone = "flame",
  fire,
}: {
  message: string;
  tone?: "flame" | "mint";
  fire: number;
}) {
  const [shown, setShown] = useState<{ key: number; text: string } | null>(null);
  const color = tone === "mint" ? "var(--color-mint)" : "var(--color-flame)";

  useEffect(() => {
    if (!fire) return;
    setShown({ key: fire, text: message });
    vibrate("correct");
    const t = setTimeout(() => setShown(null), 1100);
    return () => clearTimeout(t);
  }, [fire, message]);

  return (
    <AnimatePresence>
      {shown ? (
        <motion.div
          key={shown.key}
          initial={{ opacity: 0, scale: 0.94, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.02, y: -8 }}
          transition={T.celebrate}
          className="pointer-events-none absolute inset-x-0 top-24 z-40 flex justify-center"
        >
          <span
            role="status"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-strong text-white"
            style={{ background: color, boxShadow: `0 14px 34px -12px ${color}` }}
          >
            {tone === "mint" ? <SurvivalIcon size={16} /> : <ComboIcon size={16} />}
            {shown.text}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
