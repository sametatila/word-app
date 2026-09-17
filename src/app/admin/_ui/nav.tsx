"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Yönetim gezinmesi — altı grup, iki satır.
 *
 * On düz öğe yan yanaydı: her gün bakılanlarla (durum, hatalar, şikâyet)
 * ayda bir açılanlar (hukuki metin, işlem kaydı) aynı seviyede duruyor, dar
 * ekranda yarısı görünmüyordu. Artık üst satır GRUP, alt satır o grubun
 * sayfaları; ikisi de hangi sayfada olunduğunu `aria-current` ile söylüyor.
 */
export type NavGroup = { label: string; items: { href: string; label: string; badge?: "reports" | "alerts" }[] };

export const NAV: NavGroup[] = [
  { label: "Durum", items: [{ href: "/admin", label: "Genel durum", badge: "alerts" }] },
  {
    label: "Kullanıcılar",
    items: [
      { href: "/admin/users", label: "Liste" },
      { href: "/admin/growth", label: "Büyüme ve sosyal" },
      { href: "/admin/experience", label: "Deneyim" },
      { href: "/admin/moderation", label: "Moderasyon", badge: "reports" },
    ],
  },
  { label: "Gelir", items: [{ href: "/admin/revenue", label: "Gelir ve huniler" }, { href: "/admin/premium", label: "Premium ayarları" }] },
  {
    label: "İçerik",
    items: [
      { href: "/admin/learning", label: "Öğrenme ve madde analizi" },
      { href: "/admin/quiz", label: "Haftalık quiz" },
      { href: "/admin/content", label: "İçerik sürümü" },
    ],
  },
  {
    label: "İşletim",
    items: [
      { href: "/admin/ops", label: "Sunucu" },
      { href: "/admin/errors", label: "Hatalar" },
      { href: "/admin/reviews", label: "Mağaza" },
      { href: "/admin/app", label: "Uygulama" },
    ],
  },
  { label: "Ayarlar", items: [{ href: "/admin/legal", label: "Hukuki metinler" }, { href: "/admin/audit", label: "İşlem kaydı" }] },
];

const isOn = (path: string, href: string) => (href === "/admin" ? path === "/admin" : path === href || path.startsWith(href + "/"));

function Count({ n, tone }: { n: number; tone: string }) {
  if (n <= 0) return null;
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-micro" style={{ background: tone, color: "var(--on-fill)" }}>
      {n}
    </span>
  );
}

export function AdminNav({ openReports, alerts }: { openReports: number; alerts: { critical: number; warning: number } }) {
  const path = usePathname() ?? "/admin";
  const group = NAV.find((g) => g.items.some((i) => isOn(path, i.href))) ?? NAV[0];
  const badge = (b?: "reports" | "alerts") =>
    b === "reports" ? <Count n={openReports} tone="var(--color-rose)" />
      : b === "alerts" ? <Count n={alerts.critical + alerts.warning} tone={alerts.critical ? "var(--color-rose)" : "var(--color-flame)"} />
        : null;
  return (
    <nav aria-label="Yönetim">
      <div className="-mx-1 flex gap-1 overflow-x-auto px-1">
        {NAV.map((g) => {
          const on = g === group;
          const groupBadge = g.items.map((i) => i.badge).find(Boolean);
          return (
            <Link
              key={g.label}
              href={g.items[0].href}
              aria-current={on ? "true" : undefined}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-tile px-3 text-strong whitespace-nowrap"
              style={on ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { color: "var(--text-muted)" }}
            >
              {g.label}
              {badge(groupBadge)}
            </Link>
          );
        })}
      </div>
      {group.items.length > 1 ? (
        <div className="-mx-1 mt-1 flex gap-1 overflow-x-auto border-t px-1 pt-1" style={{ borderColor: "var(--hairline)" }}>
          {group.items.map((i) => {
            const on = isOn(path, i.href);
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={on ? "page" : undefined}
                className="inline-flex h-8 shrink-0 items-center gap-1.5 border-b-2 px-2.5 text-caption whitespace-nowrap"
                style={on ? { borderColor: "var(--color-brand)", color: "var(--text)" } : { borderColor: "transparent", color: "var(--text-muted)" }}
              >
                {i.label}
                {badge(i.badge)}
              </Link>
            );
          })}
        </div>
      ) : null}
    </nav>
  );
}
