import type { ReactNode } from "react";
import type { QueryIssue } from "@/lib/admin-query";
import { AdminPage, BTN, Notice, PageHeader } from "./ui";

/**
 * Ortak veri yükünü (`_data` `loadPanel`) kullanan sayfaların çerçevesi:
 * başlık, veri yaşı, "Tazele" ve başarısız sorgu şeridi. Altı sayfada aynı
 * satırlar kopyalanmasın diye.
 */
export function PanelPage({ title, description, href, at, issues, children }: {
  title: string;
  description: string;
  /** Bu sayfanın adresi: "Tazele" `?taze=1` ile ona dönüyor. */
  href: string;
  at: number;
  issues: QueryIssue[];
  children: ReactNode;
}) {
  const ageSec = Math.max(0, Math.round((Date.now() - at) / 1000));
  return (
    <AdminPage>
      <PageHeader
        title={title}
        description={description}
        meta={ageSec < 2 ? "Veri şimdi hesaplandı" : `Veri ${ageSec} sn önce hesaplandı (60 sn önbellek)`}
        actions={<a href={`${href}?taze=1`} className={BTN.secondary}>Tazele</a>}
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
