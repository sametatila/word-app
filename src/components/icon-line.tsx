import type { CSSProperties, ReactNode } from "react";

/**
 * İKON + YAZI HİZASI — mobil `ui/IconLine.tsx` karşılığı.
 *
 * Satır `items-start`, ikon bu kutunun içinde: kutu yazının BİR SATIRI kadar
 * yüksek (`1lh`), ikon onun ortasında. Böylece ikon yazının ilk satırının
 * tam ortasına oturuyor; yazı tek satırsa bu `items-center` ile aynı sonuç,
 * birkaç satırsa ikon paragrafın ortasında yüzmüyor, ilk satırda kalıyor.
 *
 * Neden: satırların çoğu `items-start` + ikonda `mt-0.5`/`mt-1` yamasıyla
 * kuruluydu. Yama bir punto için tutturulmuş sabit bir sayı; yazı sınıfı ya
 * da ikon boyu değişince kayıyordu ve yazı ikonun üst kenarına yapışık, olması
 * gerekenden YUKARIDA görünüyordu (2026-09-30 Samet).
 *
 * `1lh` kutunun KENDİ satır yüksekliği: yazı sınıfı satırın kabındaysa miras
 * geliyor; yalnız yazının kendi `span`ındaysa aynı sınıf `className` ile buraya
 * da verilir (ör. `className="text-body"`).
 *
 * `box`: ikon bir satırdan yüksek bir karo ise (kapak kuralı, numara dairesi)
 * onun boyu. Kutu en az o kadar oluyor; yazının ilk satırını karonun ortasına
 * indirmek için yazıya `lineInset(box)` verilir.
 */
export function IconLine({
  children,
  className = "",
  box,
  style,
}: {
  children: ReactNode;
  className?: string;
  /** Karo boyu (CSS uzunluğu, ör. "1.75rem"); yoksa ikon satırdan küçük sayılır. */
  box?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`flex h-[1lh] shrink-0 items-center justify-center ${className}`}
      style={box ? { height: `max(1lh, ${box})`, ...style } : style}
    >
      {children}
    </span>
  );
}

/**
 * Karonun yanındaki yazının üst boşluğu: ilk satır karonun ortasına insin.
 * `1lh` yazının kendi satırı; yazı karodan büyükse boşluk sıfır (karo o zaman
 * `IconLine` kutusunda satırın ortasına iniyor).
 */
export function lineInset(box: string): CSSProperties {
  return { paddingTop: `max(0px, calc((${box} - 1lh) / 2))` };
}
