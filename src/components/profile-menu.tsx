"use client";

import Link from "next/link";
import { ChartIcon, ChevronRightIcon, ListIcon, PenIcon, TrophyIcon, WrenchIcon } from "@/components/icons";

/**
 * Profilin gövdesi: kimlikten sonra tek bir menü.
 *
 * Önce burada on üç bölüm vardı, sonra üçe indi ama hâlâ kalabalıktı — çünkü
 * indirilen şey sayı değil, YAPIydı. Katlanmış bir "Arşiv" başlığının altına
 * rozetleri ve yazıları koymak, iki ayrı şeyi ortak yanları olmayan bir kutuda
 * birleştiriyordu: kimse "arşivime bakayım" diye düşünmüyor, "rozetlerime
 * bakayım" diye düşünüyor.
 *
 * Menü bunu doğal biçimde çözüyor. Her satır bir yere gidiyor, her satır tek
 * satır ve sıra bir kuralı izliyor: önce en çok aranan (ayarlar), sonra
 * ölçümler, sonra biriktirilenler. Sağa bakan şevron da sözünü tutuyor —
 * burada hiçbir şey aşağı açılmıyor.
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
    href: "/skills?detail=1",
    label: "Yetkinlik ve gelişim",
    detail: "Zayıf noktalar, gelişim, sınavlar",
    Icon: ChartIcon,
    tone: "var(--color-violet)",
  },
  {
    href: "/words",
    label: "Kelime ilerlemen",
    detail: "Kapsam, haftalık grafik, tekrar kuyruğu",
    Icon: ListIcon,
    tone: "var(--color-mint)",
  },
  {
    href: "/profile/rozetler",
    label: "Rozetler",
    detail: "Kazandığın ve sıradaki başarımlar",
    Icon: TrophyIcon,
    tone: "var(--color-flame)",
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
