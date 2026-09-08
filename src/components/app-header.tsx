"use client";

import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { FlameIcon } from "@/components/icons";
import { NotificationBell } from "@/components/social/notification-bell";
import { useShell } from "@/components/app-shell";

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
 * Kursun ADI, öğrenilen dil olarak. Mobilde `targetLangName()` aynı işi
 * yapıyor; web'de kurs kaydı henüz tek yerden okunmadığı için burada duruyor
 * (Şerit I ile `lib/courses`e taşınacak).
 */
const COURSE_LANG: Record<string, string> = {
  de: "Almanca",
  "gsw-zh": "Zürih Almancası",
  en: "İngilizce",
};

/**
 * Öğren sekmesinin başlığı — mobildeki "Almanca öğren" + selamlama.
 *
 * Ayrı bir bileşen çünkü başlığın iki satırı da veriden türüyor: üstte kursun
 * dili, altta kullanıcının ADI. Sayfanın her yerinden aynı iki değeri
 * geçirmek yerine bağlamdan okunuyor.
 */
export function LearnHeader() {
  const { name, course } = useShell();
  const first = name?.trim().split(" ")[0];
  return (
    <AppHeader
      title={`${COURSE_LANG[course] ?? "Dil"} öğren`}
      subtitle={first ? `Merhaba ${first}` : "Hoş geldin"}
    />
  );
}

export function AppHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const { streak, userId, name } = useShell();
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
            href="/profile"
            prefetch={false}
            aria-label={`${streak} günlük seri — ilerlemeni gör`}
            className="pressable flex items-center gap-1.5 rounded-full px-3 py-2 text-strong"
            style={{
              background: "color-mix(in srgb, var(--color-flame) 16%, transparent)",
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
          aria-label="Profil ve ayarlar"
          className="pressable shrink-0 rounded-full"
          style={{ boxShadow: "var(--shadow-soft-sm)" }}
        >
          <Avatar userId={userId} name={name} size={44} />
        </Link>
      </div>
    </header>
  );
}
