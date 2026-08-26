"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementWall } from "@/components/achievement-wall";
import { WritingsCard } from "@/components/writings-card";
import { ChartIcon, ChevronIcon, ListIcon } from "@/components/icons";

/**
 * Profilin arşiv bölümü — ve ölçümlerin yeni adresi.
 *
 * İki iş görüyor. Birincisi: bir kez bakılıp bırakılan şeyleri (rozetler,
 * değerlendirilmiş yazılar) katlanmış tutmak. İkincisi ve daha önemlisi,
 * profilden TAŞINAN ölçümlerin nereye gittiğini söylemek.
 *
 * Bir kartı sessizce kaldırmak, kullanıcıya "kayboldu" dedirtir. İki satırlık
 * bir yön tabelası bunu önlüyor ve taşımanın kendisini de anlatıyor: ölçüm
 * Becerilerde, kelime ilerlemesi Kelimelerde.
 */
export function ArchiveCard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-4">
      <section className="card divide-y divide-[color:var(--border)] overflow-hidden">
        <Link href="/skills" prefetch={false} className="flex items-center gap-3 px-5 py-3.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "color-mix(in srgb, var(--color-violet) 16%, transparent)",
              color: "var(--color-violet)",
            }}
          >
            <ChartIcon size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">Yetkinlik ve gelişim</span>
            <span className="muted block truncate text-xs">
              Zayıf noktalar, gelişim, sınavlar
            </span>
          </span>
          <span className="muted shrink-0">
            <ChevronIcon size={16} />
          </span>
        </Link>

        <Link href="/words" prefetch={false} className="flex items-center gap-3 px-5 py-3.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: "color-mix(in srgb, var(--color-mint) 16%, transparent)",
              color: "var(--color-mint)",
            }}
          >
            <ListIcon size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">Kelime ilerlemen</span>
            <span className="muted block truncate text-xs">
              Kapsam, haftalık grafik, tekrar kuyruğu
            </span>
          </span>
          <span className="muted shrink-0">
            <ChevronIcon size={16} />
          </span>
        </Link>
      </section>

      <section className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 px-5 py-3.5 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="block font-bold">Arşiv</span>
            <span className="muted block text-xs">Rozetler ve değerlendirilmiş yazıların</span>
          </span>
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="muted shrink-0"
          >
            <ChevronIcon size={18} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div
                className="space-y-4 border-t px-5 pb-5 pt-4"
                style={{ borderColor: "var(--border)" }}
              >
                <AchievementWall />
                <WritingsCard />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </div>
  );
}
