import Link from "next/link";
import type { ReactNode } from "react";
import type { QueryIssue } from "@/lib/admin-query";
import { AdminPage, BTN, Notice, PageHeader } from "./ui";
import { PANEL_RANGES } from "../_data-shared";

/**
 * Ortak veri yükünü (`_data` `loadPanel`) kullanan sayfaların çerçevesi:
 * başlık, veri yaşı, "Tazele" ve başarısız sorgu şeridi. Altı sayfada aynı
 * satırlar kopyalanmasın diye.
 */
export function PanelPage({ title, description, href, at, issues, days, children }: {
  title: string;
  description: string;
  /** Bu sayfanın adresi: "Tazele" `?taze=1` ile ona dönüyor. */
  href: string;
  at: number;
  issues: QueryIssue[];
  /** Seçili aralık; verilmezse sayfada aralık seçici yok. */
  days?: number;
  children: ReactNode;
}) {
  const q = (d: number | undefined, taze = false) => {
    const p = new URLSearchParams();
    if (d && d !== 30) p.set("aralik", String(d));
    if (taze) p.set("taze", "1");
    const s = p.toString();
    return s ? `${href}?${s}` : href;
  };
  const ageSec = Math.max(0, Math.round((Date.now() - at) / 1000));
  return (
    <AdminPage>
      <PageHeader
        title={title}
        description={description}
        meta={ageSec < 2 ? "Veri şimdi hesaplandı" : `Veri ${ageSec} sn önce hesaplandı (60 sn önbellek)`}
        actions={
          <>
            {days ? (
              <div role="group" aria-label="Tarih aralığı" className="inline-flex gap-0.5 rounded-tile p-0.5" style={{ background: "var(--surface-2)" }}>
                {PANEL_RANGES.map((d) => (
                  <Link
                    key={d}
                    href={q(d)}
                    aria-current={days === d ? "page" : undefined}
                    className="inline-flex h-8 items-center rounded-chip px-3 text-caption"
                    style={days === d ? { background: "var(--surface)", color: "var(--text)", boxShadow: "var(--shadow-soft)" } : { color: "var(--text-muted)" }}
                  >
                    {d} gün
                  </Link>
                ))}
              </div>
            ) : null}
            <a href={q(days, true)} className={BTN.secondary}>Tazele</a>
          </>
        }
      />
      {/* SESSİZ KIRILMA GÖRÜNÜR: başarısız sorgu varsa o bölümler "veri yok"
          değil, bozuk. */}
      {issues.length ? (
        <Notice tone="bad" title={`${issues.length} sorgu başarısız — ilgili bölümler eksik görünür`}>
          <ul className="list-disc pl-5 text-caption">{issues.slice(0, 6).map((i, n) => <li key={n}>{i.source}: {i.message}</li>)}</ul>
        </Notice>
      ) : null}
      {children}
    </AdminPage>
  );
}
