import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

/**
 * Menü satırı — mobil `ui/MenuRow.tsx` karşılığı: renkli ikon karosu, etiket,
 * sağda şevron.
 *
 * TEK SATIR, ÜÇ KOPYA DEĞİL. Web'de aynı satır üç ayrı yerde elle kuruluydu ve
 * üçü de başka ölçüdeydi: profil menüsü 38 px karo / %13 tint / 20 şevron,
 * davet satırı 40 / %14 / 20, Gelişim sayfasının satırı 40 / %16 / 18. Mobilde
 * bir tane var (`MenuRow`) ve dosyasındaki yorum bunu neden böyle yaptığını
 * yazıyor: "iki listenin satır yüksekliği, ayraç çizgisi ve dokunma alanı tek
 * yerden geliyor, biri değişince öteki geride kalmıyor." Ölçüler Android'den.
 *
 * İKON MÜREKKEBİ 600, ZEMİN 500. Sabit 500'ü kendi %13 tinti üstünde ölçtüm
 * (açık tema): mint 3.07, sky 3.11, violet 4.14, rose 3.60 — ve **flame 2.55,
 * brand 2.43**, yani grafik eşiği 3.0'ın altında. Rol takma adı (`--color-x`,
 * açık temada 600) aynı zeminde 4.59–5.77 veriyor. Android bunu `onTint` ile
 * yapıyor: zemin rol rengi, ikon o rengin `*Text` (600) türevi. Davet satırı
 * bu kararı zaten taşıyordu ve yorumu yerinde duruyordu; kardeş satırlar 500
 * ile kalmıştı — aynı listede iki ayrı karar.
 *
 * `href` verilirse bağlantı, `onClick` verilirse düğme olur (davet satırı
 * düğme: paylaşım sayfası açıyor, bir yere gitmiyor).
 */
export type MenuTone = "brand" | "mint" | "sky" | "violet" | "flame" | "rose";

export function MenuRow({
  icon,
  tone,
  label,
  last,
  href,
  onClick,
}: {
  icon: ReactNode;
  tone: MenuTone;
  label: string;
  /** Son satırda alt çizgi çizilmez. */
  last?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span
        className="flex shrink-0 items-center justify-center rounded-tile"
        style={{
          width: 38,
          height: 38,
          background: `color-mix(in srgb, var(--color-${tone}-500) 13%, transparent)`,
          color: `var(--color-${tone})`,
        }}
      >
        {icon}
      </span>
      <span className="flex-1 text-strong">{label}</span>
      <ChevronRightIcon size={20} className="shrink-0" style={{ color: "var(--text-faint)" }} />
    </>
  );
  const cls = "pressable flex w-full items-center gap-3 py-3 text-left";
  const style = last ? undefined : { borderBottom: "1px solid var(--hairline)" };
  if (href) {
    return (
      <Link href={href} prefetch={false} className={cls} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}
