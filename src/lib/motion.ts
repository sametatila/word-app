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
  /** Sekmesiz oturan kutlama yayı: sönüm oranı 0.81, taşma %2'nin altında. */
  celebrate: { stiffness: 320, damping: 29 },
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

/**
 * ÇUBUĞUN GÖRÜNEN YÜZDESİ — sıfır boş, sıfırın üstü en az `floor`.
 *
 * Çubuklar `Math.max(3, pct)` ile sıfırda bile bir dilim bırakıyordu; hiç
 * başlanmamış bir hedef "biraz yapılmış" gibi görünüyordu (2026-09-30 Samet:
 * 0 → tamamen boş iz). Taban yalnız sıfırın üstünde kalıyor: 1/120 gibi bir
 * değer yuvarlak ucun altında kaybolmasın. `NaN` (0/0) da boş sayılıyor.
 * Mobil karşılığı `ui/Bar.tsx` `barPct`; `check:parity` ikisini ölçüyor.
 */
export const BAR_FLOOR = 3;
export const barPct = (pct: number, floor: number = BAR_FLOOR) => {
  const p = Math.min(100, pct);
  return p > 0 ? Math.max(floor, p) : 0;
};

/** CSS geçişli dolgu için satır içi stil (`.bar-fill` ile). */
export const fillStyle = (pct: number) => ({ transform: `translateX(${fillX(pct)})` });
