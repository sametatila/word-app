import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronNextIcon } from "@/components/icons";

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
 *
 * İKİ BİÇİM (2026-09-29 Samet: web ayarlar masaüstü düzeni). `list` telefon
 * listesi: kart içinde, 38'lik karo, sağda değer ve şevron, altta ayraç —
 * mobil `MenuRow`un birebir karşılığı. `sidebar` masaüstü ayarlar menüsü:
 * kartsız, şevronsuz, değersiz; her satır tam genişlik, sabit 44 yükseklik,
 * 32'lik karo. Açık satır bütün satırı kaplayan yuvarlak zemin — kabuğun sol
 * menüsündeki öğeyle aynı geometri (`rounded-panel px-3`, bkz. `app-shell`)
 * ve telefon sekme hapının rengi (`--brand-soft` zemin, üstünde okunan marka
 * yazısı `--on-brand-soft`; koyu temada zemin nötr, seçim B). Eski hâli
 * listenin satırını `-mx-2 px-2` ile taşırıyordu: zemin kartın 16'lık iç
 * boşluğuyla hizalanmıyor, şevron açık satırda 8 px kayıyordu.
 */
export type MenuTone = "brand" | "mint" | "sky" | "violet" | "flame" | "rose";

export function MenuRow({
  icon,
  tone,
  label,
  last,
  href,
  onClick,
  value,
  active,
  danger,
  variant = "list",
}: {
  icon: ReactNode;
  tone: MenuTone;
  label: string;
  /** Son satırda alt çizgi çizilmez. */
  last?: boolean;
  href?: string;
  onClick?: () => void;
  /** Sağda, şevronun önünde sönük değer (Ayarlar listesi: "Almanca · B1"). */
  value?: string | null;
  /** Masaüstü ayarlar menüsünde açık olan grup (yalnız `sidebar`). */
  active?: boolean;
  /** Yıkıcı satır: etiket tehlike renginde. */
  danger?: boolean;
  /** `list` telefon listesi (kart + şevron), `sidebar` masaüstü menüsü. */
  variant?: "list" | "sidebar";
}) {
  /* Marka tinti koyu temada nötr (`--brand-tint`; 2026-09-29 Samet: seçim B). */
  const tileBg = tone === "brand" ? "var(--brand-tint)" : `color-mix(in srgb, var(--color-${tone}-500) 13%, transparent)`;
  if (variant === "sidebar") {
    const side = (
      <>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-chip" style={{ background: tileBg, color: `var(--color-${tone})` }}>
          {icon}
        </span>
        <span className="min-w-0 flex-1 truncate">{label}</span>
      </>
    );
    /* Açık satırın zemini ve yazısı; ötekilerde üstüne gelince yalnız nötr
       zemin (kabuk menüsü de üstüne gelince zemin değil yazı rengi değiştiriyor,
       ama burada yazı zaten tam renk). Yükseklik sabit: yazı ölçeği büyürse
       `min-h` satırı uzatır, taşırmaz. */
    const sideCls = `flex min-h-11 w-full items-center gap-3 rounded-panel px-3 py-1.5 text-left text-strong transition-colors ${
      active ? "" : "hover:bg-[color:var(--surface-2)]"
    }`;
    const sideStyle = active
      ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" }
      : danger
        ? { color: "var(--color-rose)" }
        : undefined;
    return href ? (
      <Link href={href} prefetch={false} className={sideCls} style={sideStyle} aria-current={active ? "page" : undefined}>
        {side}
      </Link>
    ) : (
      <button type="button" onClick={onClick} className={sideCls} style={sideStyle}>
        {side}
      </button>
    );
  }
  const inner = (
    <>
      <span
        className="flex shrink-0 items-center justify-center rounded-tile"
        style={{
          width: 38,
          height: 38,
          background: tileBg,
          color: `var(--color-${tone})`,
        }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-strong" style={danger ? { color: "var(--color-rose)" } : undefined}>{label}</span>
      {value ? <span className="muted max-w-[45%] shrink truncate text-caption">{value}</span> : null}
      <ChevronNextIcon size={20} className="shrink-0" style={{ color: "var(--text-faint)" }} />
    </>
  );
  const cls = "pressable flex w-full items-center gap-3 py-3 text-left";
  const style = last ? {} : { borderBottom: "1px solid var(--hairline)" };
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
