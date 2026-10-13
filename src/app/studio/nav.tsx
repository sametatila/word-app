"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Seçili menü öğesi: performans sayfası Genel bakışa, bölüm editörü takvime ait (ikisinin geri bağlantısı da oraya). */
function current(path: string): "overview" | "calendar" | "requests" {
  if (path.startsWith("/studio/requests")) return "requests";
  if (path === "/studio" || path.endsWith("/performans")) return "overview";
  return "calendar";
}

export function StudioNav({ badge }: { badge: number }) {
  const on = current(usePathname() ?? "/studio");
  const items = [
    { key: "overview", href: "/studio", label: "Genel bakış" },
    { key: "calendar", href: "/studio/takvim", label: "Takvim" },
    { key: "requests", href: "/studio/requests", label: "Talepler" },
  ] as const;
  return (
    <nav aria-label="Stüdyo" className="flex min-w-0 items-center gap-1 overflow-x-auto text-caption whitespace-nowrap">
      {items.map((i) => {
        const active = i.key === on;
        return (
          <Link
            key={i.key}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className="flex items-center gap-1.5 rounded-tile px-3 py-1.5 transition-colors hover:bg-[var(--surface-2)] hover:text-[var(--text)]"
            style={active ? { background: "var(--brand-soft)", color: "var(--on-brand-soft)" } : { color: "var(--text-muted)" }}
          >
            {i.label}
            {i.key === "requests" && badge ? <span className="grid h-5 min-w-5 place-items-center rounded-full px-1 text-micro on-fill" style={{ background: "var(--color-flame)" }}>{badge}</span> : null}
          </Link>
        );
      })}
    </nav>
  );
}
