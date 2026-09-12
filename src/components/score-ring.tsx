import type { ReactNode } from "react";

/**
 * Puan halkası — mobil `ui/ProgressRing.tsx` karşılığı.
 *
 * Web'de üç ayrı yerde ELLE kuruluyordu (`conic-gradient` + içine oturan bir
 * daire, dolgu payı her yerde başka: 15 px, 7 px, 2 px) ve sonuç Android'in
 * halkasıyla üç noktada ayrışıyordu:
 *
 *  - **Gradyan yoktu.** Android halkayı iki duraklı bir gradyanla çiziyor
 *    (`gradientA` = `#fb8f2a → #f87612`, yani webin `--color-brand-400 →
 *    --color-brand-500`i, 135°); web tek renk basıyordu.
 *  - **Uç yuvarlak değildi.** `conic-gradient` keskin bir dilim veriyor;
 *    Android `strokeLinecap="round"` ile halkanın iki ucunu yuvarlatıyor.
 *  - **Ölçüler ayrıydı** (web 128/96, Android 160/150) ve her çağrı yeri
 *    kendi payını taşıdığı için ortak bir ölçek de yoktu.
 *
 * SVG çizim, `conic-gradient` değil: yuvarlak uç ve gradyan ancak böyle
 * oluyor. Ortası boş — çocuklar halkanın arkasındaki zeminin üstünde durur,
 * yani "içine oturan daire" hilesine gerek kalmıyor (o hile zemin rengini
 * bilmek zorundaydı ve gradyanlı kartta ayrıca bir sınıf istiyordu).
 *
 * Sayılar Android'den: her çağrı yeri kendi ekranının ölçüsünü veriyor ve
 * kapı iki tarafı karşılaştırıyor (parity §332).
 */
export function ScoreRing({
  size,
  stroke,
  pct,
  from = "var(--color-brand-400)",
  to = "var(--color-brand-500)",
  track = "var(--surface-2)",
  id,
  className = "",
  children,
}: {
  size: number;
  stroke: number;
  /** 0-100; taşan değerler kırpılıyor (mobil halka da öyle yapıyor). */
  pct: number;
  from?: string;
  to?: string;
  track?: string;
  /** Gradyanın SVG kimliği — aynı sayfada iki halka olursa çakışmasın. */
  id: string;
  className?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, pct / 100));
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute" style={{ transform: "rotate(-90deg)" }} aria-hidden>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - p)}
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
