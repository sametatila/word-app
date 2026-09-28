import type { ReactNode } from "react";

/**
 * Ayar sayfalarının çerçevesi: masaüstünde solda liste (yapışık), sağda grup;
 * telefonda yalnız içerik (liste `/profile/settings`in kendisi).
 */
export function SettingsFrame({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl md:grid md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)] md:items-start md:gap-8">
      <aside className="hidden md:sticky md:top-4 md:block">{nav}</aside>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
