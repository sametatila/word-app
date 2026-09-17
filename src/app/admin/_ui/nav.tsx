"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Yönetim gezinmesi — tek yerde, hangi sayfada olunduğunu söyleyerek.
 *
 * Eskiden iki ayrı şerit vardı (düzenin çipleri ve panonun başlığındaki
 * çipler), ikisi de seçili sayfayı göstermiyordu ve alt sayfalar ayrıca
 * "← Yönetim" bağlantısı taşıyordu. Dar ekranda şerit yana kayıyor, satır
 * satır sarılmıyor.
 */
const ITEMS: { href: string; label: string; badge?: "reports" }[] = [
  { href: "/admin", label: "Pano" },
  { href: "/admin/users", label: "Kullanıcılar" },
  { href: "/admin/app", label: "Uygulama" },
  { href: "/admin/errors", label: "Hatalar" },
  { href: "/admin/moderation", label: "Moderasyon", badge: "reports" },
  { href: "/admin/reviews", label: "Mağaza" },
  { href: "/admin/premium", label: "Premium" },
  { href: "/admin/quiz", label: "Haftalık quiz" },
  { href: "/admin/legal", label: "Hukuki metinler" },
  { href: "/admin/audit", label: "İşlem kaydı" },
];

export function AdminNav({ openReports }: { openReports: number }) {
  const path = usePathname() ?? "/admin";
  const isOn = (href: string) => (href === "/admin" ? path === "/admin" : path === href || path.startsWith(href + "/"));
  return (
    <nav aria-label="Yönetim" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-2">
      {ITEMS.map((it) => {
        const on = isOn(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            aria-current={on ? "page" : undefined}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-tile px-3 text-caption whitespace-nowrap"
            style={on ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { color: "var(--text-muted)" }}
          >
            {it.label}
            {it.badge === "reports" && openReports > 0 ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-micro" style={{ background: "var(--color-rose)", color: "var(--on-fill)" }}>
                {openReports}
              </span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
