"use client";

import Link from "next/link";
import { MyAvatar } from "@/components/my-avatar";
import { FlameIcon } from "@/components/icons";
import { NotificationBell } from "@/components/social/notification-bell";
import { useShell } from "@/components/app-shell";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName } from "@/lib/courses";

/**
 * Sekmelerin ortak üst başlığı — mobil `M/src/ui/AppHeader.tsx`'in karşılığı.
 *
 * NEDEN SAYFANIN İÇİNDE, KABUKTA DEĞİL: web'de tüm sekmelerin üstünde TEK bir
 * uygulama çubuğu vardı (logo + "Lernomi" + iki minik rozet + zil + arma) ve
 * hangi sekmede olduğunu söylemiyordu; sayfanın kendi adı da onun altında
 * ikinci bir başlık olarak duruyordu. Mobilde öyle değil: başlığın kendisi
 * ekranın adı, 32 puntoda, ve her sekme onu kendi yazıyor.
 *
 * Sonuç kabuktan bir katman siliyor — çubuk + sayfa başlığı yerine tek satır.
 *
 * ALT SATIR BOŞKEN DE YER AYIRIYOR (`subtitle ?? " "`). Sebep hizalama: Öğren
 * selamlama yazıyor, Beceriler açıklama yazıyor, Patika hiçbir şey yazmıyor.
 * Ayrılmasaydı sekme değiştikçe başlık ve sağdaki seri/profil dikeyde
 * zıplardı.
 */
/**
 * Öğren sekmesinin başlığı — "Almanca öğren" + selamlama.
 *
 * Üç şey de dile bağlı: kursun ADI (mobil `targetLangName()`), başlığın kalıbı
 * ("{lang} öğren") ve selamlama. Kurs adı sabit yazılıydı, yani arayüz
 * İngilizceye alındığında bile "Almanca öğren" diyordu.
 */
export function LearnHeader() {
  const { name, course } = useShell();
  const t = useT();
  const lang = useLang();
  const first = name?.trim().split(" ")[0];
  return (
    <AppHeader
      title={t("learn.learn", { lang: courseName(course, lang) })}
      subtitle={first ? t("learn.greeting_named", { name: first }) : t("learn.greeting")}
    />
  );
}

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { streak } = useShell();
  const t = useT();
  return (
    <header className="mb-4 flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        <p className="muted truncate text-caption">{subtitle ?? " "}</p>
        <h1 className="truncate text-display">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {/*
          Seri rozeti yalnız seri VARKEN. Sıfır bir seri, kullanıcıya
          hatırlatılacak bir şey değil; mobilde de çizilmiyor.

          Dokununca ilerlemeye gidiyor: seri bir sayı değil bir geçmiş, ve
          "kaç gün" sorusunun devamı hep "hangi günler" oluyor.
        */}
        {streak > 0 ? (
          <Link
            href="/profile/progress"
            prefetch={false}
            aria-label={t("appheader.progress")}
            className="pressable flex items-center gap-1.5 rounded-full px-3 py-2 text-strong"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 13%, transparent)",
              color: "var(--color-flame)",
            }}
          >
            <FlameIcon size={16} />
            {streak}
          </Link>
        ) : null}
        <NotificationBell className="muted" />
        <Link
          href="/profile"
          prefetch={false}
          aria-label={t("appheader.profile")}
          className="pressable shrink-0 rounded-full"
          style={{ boxShadow: "var(--shadow-soft-sm)" }}
        >
          <MyAvatar size={44} />
        </Link>
      </div>
    </header>
  );
}
