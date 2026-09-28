/**
 * Hareket jetonları, framer-motion için. Mobil `theme/tokens.ts` `motion` ve
 * `globals.css` `--motion-*` / `--ease-*` ile birebir; `check:tokens` üçünü
 * karşılaştırıyor. framer süreyi SANİYE istiyor, tablo milisaniye tutuyor.
 */
export const MOTION = {
  instant: 120,
  short: 200,
  medium: 320,
  stagger: 30,
  ease: [0.2, 0, 0.2, 1],
  emphasized: [0.2, 0, 0, 1],
  celebrate: { stiffness: 320, damping: 20 },
} as const;

/** framer `transition` kalıpları. */
export const T = {
  instant: { duration: MOTION.instant / 1000, ease: MOTION.ease },
  short: { duration: MOTION.short / 1000, ease: MOTION.emphasized },
  medium: { duration: MOTION.medium / 1000, ease: MOTION.emphasized },
  celebrate: { type: "spring", ...MOTION.celebrate },
} as const;

/** Sıralı girişte i. ögenin gecikmesi (saniye). */
export const staggerDelay = (i: number) => (i * MOTION.stagger) / 1000;

/**
 * İlerleme dolgusunun kayması: dolgu izin tam genişliğinde, `pct` kadarı
 * görünsün diye sola `pct - 100` yüzde kayıyor (genişlik canlandırılmıyor;
 * bkz. globals.css `.bar-fill`, mobil `ui/Bar.tsx`). framer `x` için dize.
 */
export const fillX = (pct: number) => `${Math.min(100, Math.max(0, pct)) - 100}%`;

/** CSS geçişli dolgu için satır içi stil (`.bar-fill` ile). */
export const fillStyle = (pct: number) => ({ transform: `translateX(${fillX(pct)})` });
