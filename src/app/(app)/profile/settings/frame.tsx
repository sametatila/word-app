"use client";

import type { ReactNode } from "react";
import { useT } from "@/lib/i18n/client";

/**
 * AYARLAR DÜZENİ (2026-09-29 Samet: web ayarlar masaüstü düzeni).
 *
 * Masaüstünde (≥md) gerçek bir web ayarlar sayfası: üstte sayfanın başlığı
 * ("Ayarlar", `text-h1`; sekmelerin `AppHeader`ıyla aynı 44'lük satır ve
 * altında 16), altında iki sütun — solda yapışık menü, sağda açık grubun
 * paneli (grup adı düz `h2`, geri oku yok). Telefonda başlık ve menü yok:
 * her sayfa kendi `PageBack`ini çiziyor, liste `/profile/settings`in kendisi.
 *
 * `layout.tsx` bunu bir kez çiziyor: gruplar arasında gezerken başlık ve
 * menü yeniden kurulmuyor, yalnız panel değişiyor (yükleme iskeleti de yalnız
 * paneli çiziyor). Düzen dışında kalan tek iskelet (`/friends/settings`)
 * aynı çerçeveyi `SettingsPageSkeleton` ile çiziyor.
 *
 * YAPIŞIKLIK `top-0`. `top-4`tü ve menü, panel menüden uzun olan her grupta
 * yerinde durmadan 16 px aşağıda duruyordu: Chrome yapışık öğenin eşiğini
 * kaydırma kabının İÇ kenarından (dolgu dahil) ölçüyor; `main`in üst dolgusu
 * 12 olduğu için eşik 12+16 = 28, öğenin kendi yeri 12 — kaydırılmadan bile
 * 16 aşağı itiliyordu. Kısa grupta (Destek ve hakkında) ızgara menüden kısa,
 * itecek yer yok: menü 12'de. Sonuç gruptan gruba 16 px zıplayan bir menü.
 * `top-0` eşiği öğenin kendi yerine koyuyor; kaydırınca kabın iç kenarına
 * yapışıyor. `items-start` iki sütunu içerik boyunda tutuyor.
 */
export function SettingsFrame({ nav, children }: { nav: ReactNode; children: ReactNode }) {
  const t = useT();
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-4 hidden min-h-11 items-center md:flex">
        <h1 className="text-h1">{t("settings.settings")}</h1>
      </header>
      <div className="md:grid md:grid-cols-[16rem_minmax(0,1fr)] md:items-start md:gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="hidden md:sticky md:top-0 md:block">{nav}</aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
