import type { ReactNode } from "react";

/**
 * Boş durum kartı — mobil `social/common.tsx` `EmptyCard`ının karşılığı.
 *
 * Web'de her boş durum kendi işini görüyordu: kart + kalın başlık + sönük
 * satır, İKON YOK. Mobilde aynı yerlerde 52 px'lik dolu renkli ikon karosu
 * var ve boş ekranın ne hakkında olduğunu bir bakışta söyleyen tek şey o —
 * metin okunana kadar ekran ayırt edilemiyordu.
 *
 * Ölçüler mobilden: karo 52, yarıçap `tile`, dolu renk zemin, beyaz ikon,
 * altında `h3` başlık ve `caption` sönük satır, ortalanmış.
 */
export function EmptyCard({
  icon: Icon,
  tint = "var(--color-brand)",
  title,
  text,
  action,
  className = "",
}: {
  icon: (p: { size?: number; className?: string }) => ReactNode;
  /** Karo rengi — ekranın konusunu taşıyor (arkadaşlar yeşil, akış mavi…). */
  tint?: string;
  title: string;
  text: string;
  /** İsteğe bağlı eylem düğmesi. */
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card flex flex-col items-center gap-2 p-4 text-center ${className}`}>
      <span
        className="flex items-center justify-center rounded-tile"
        style={{ width: 52, height: 52, background: tint, color: "#ffffff" }}
      >
        <Icon size={26} />
      </span>
      <p className="mt-1 text-h3">{title}</p>
      <p className="muted text-caption">{text}</p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
