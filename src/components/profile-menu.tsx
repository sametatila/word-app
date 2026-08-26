"use client";

import Link from "next/link";
import { ChevronRightIcon, PenIcon, WrenchIcon } from "@/components/icons";

/**
 * Profilin sonundaki iki satır.
 *
 * Önce beş satırlık bir menüydü ve üçü fazlaydı. "Yetkinlik ve gelişim" zaten
 * bir sekme olan Becerileri açıyordu — bir sekmeyi menüden bir kez daha
 * sunmak, kullanıcıya iki ayrı yer varmış gibi hissettiriyor. Rozetler ve
 * ilerleme ise gidilecek yerler değil, GÖSTERİLECEK şeyler: profilin kendisi
 * onları anlatmalı, bir kapının arkasına saklamamalı.
 *
 * Geriye gerçekten başka bir ekran olan ikisi kaldı: ayarların uzun bir formu
 * var, yazılar ise ayrı bir arşiv.
 */
const ITEMS = [
  {
    href: "/profile/ayarlar",
    label: "Ayarlar",
    detail: "Hedef, seviye, kurs, ses, tema, bildirim",
    Icon: WrenchIcon,
    tone: "var(--color-brand)",
  },
  {
    href: "/profile/yazilarim",
    label: "Yazılarım",
    detail: "Değerlendirilmiş serbest yazıların",
    Icon: PenIcon,
    tone: "var(--color-sky)",
  },
];

export function ProfileMenu() {
  return (
    <nav className="card divide-y divide-[color:var(--border)] overflow-hidden" aria-label="Profil">
      {ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          prefetch={false}
          className="flex items-center gap-3 px-4 py-3.5"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `color-mix(in srgb, ${item.tone} 16%, transparent)`,
              color: item.tone,
            }}
          >
            <item.Icon size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">{item.label}</span>
            <span className="muted block truncate text-xs">{item.detail}</span>
          </span>
          <span className="muted shrink-0">
            <ChevronRightIcon size={16} />
          </span>
        </Link>
      ))}
    </nav>
  );
}
