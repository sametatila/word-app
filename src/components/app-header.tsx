"use client";

import Link from "next/link";
import { MyAvatar } from "@/components/avatar";
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
 * TEK SATIR, ÜST KÜNYE YOK (2026-09-29, Samet): başlığın üstündeki küçük
 * satır (selamlama, açıklama; boşken de yer ayrılıyordu) ekranı iki katmanlı
 * gösteriyor, tasarımı bozuyordu; kaldırıldı. Başlık da ~%20 küçüldü:
 * display 32 → h1 26. Mobil `AppHeader` ile aynı.
 */
/**
 * Öğren sekmesinin başlığı — "Almanca öğren".
 *
 * İki şey de dile bağlı: kursun ADI (mobil `targetLangName()`) ve başlığın
 * kalıbı ("{lang} öğren"). Kurs adı sabit yazılıydı, yani arayüz İngilizceye
 * alındığında bile "Almanca öğren" diyordu.
 */
export function LearnHeader() {
  const { course } = useShell();
  const t = useT();
  const lang = useLang();
  return <AppHeader title={t("learn.learn", { lang: courseName(course, lang) })} />;
}

export function AppHeader({ title }: { title: string }) {
  const { streak, userId, name, avatar } = useShell();
  const t = useT();
  return (
    <header className="mb-4 flex items-center justify-between gap-3">
      <div className="min-w-0 flex-1">
        {/* SARILIYOR, KESİLMİYOR. `truncate` 320-375 piksellik telefonda
            başlığı "Almanca ö…" ya da seri rozeti görününce "Almanca…"ya
            indiriyordu — ekranın adı, yani en önemli sözcük, üç noktaya
            gidiyordu. Sağdaki düğmeler sabit genişlikte; başlık onlara yer
            bırakıp ikinci satıra iniyor. */}
        <h1 className="text-h1 text-balance break-words">{title}</h1>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {/*
          ALEV HEP GÖRÜNÜR (2026-09-28, Samet'in kararı): seri 0 olunca
          kayboluyordu ve Gelişim'e giden tek yol oydu. Sıfırda sönük; dokununca
          yine Gelişim. Mobil `AppHeader` ile aynı.
        */}
        <Link
          href="/profile/progress"
          prefetch={false}
          aria-label={t("appheader.progress")}
          className="pressable flex items-center gap-1.5 rounded-full px-3 py-2 text-strong"
          style={
            streak > 0
              ? { background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)", color: "var(--color-flame)" }
              : { background: "var(--surface-2)", color: "var(--text-faint)" }
          }
        >
          <FlameIcon size={16} />
          {streak}
        </Link>
        <NotificationBell />
        <Link
          href="/profile"
          prefetch={false}
          aria-label={t("appheader.profile")}
          className="pressable glow-tint-sm shrink-0 rounded-full"
          /* Android `AppHeader`: `softShadow(colors.primary, 6)` - avatarın
             altındaki hâle marka renginde. */
          style={{ "--tint-fill": "var(--color-brand)" } as React.CSSProperties}
        >
          <MyAvatar userId={userId} name={name} serverAvatar={avatar} size={44} />
        </Link>
      </div>
    </header>
  );
}
