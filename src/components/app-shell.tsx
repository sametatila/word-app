"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { TopProgress } from "./top-progress";
import { InstallPrompt } from "./install-prompt";
import { SessionKeeper } from "./session-keeper";
import { track } from "@/lib/track";
import { CardsIcon, CompassIcon, FlameIcon, ListIcon, SparkIcon, UserIcon, LogoMark, ChatIcon } from "./icons";

const NAV = [
  { href: "/learn", label: "Öğren", Icon: CardsIcon },
  { href: "/skills", label: "Beceriler", Icon: CompassIcon },
  { href: "/lessons", label: "Dersler", Icon: ChatIcon },
  { href: "/words", label: "Kelimeler", Icon: ListIcon },
  { href: "/profile", label: "Profil", Icon: UserIcon },
];

export function AppShell({
  children,
  streak,
  xp,
  course = "de",
  voice = null,
  userId,
}: {
  children: ReactNode;
  streak: number;
  xp: number;
  course?: string;
  voice?: string | null;
  /** Oturumdaki hesap — oturumu tazeleyen ve hesap değişimini fark eden bileşen için. */
  userId: string;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ streak, xp });

  // Oyun sırasında kazanılan XP/seri anında rozetlere yansısın.
  useEffect(() => setStats({ streak, xp }), [streak, xp]);

  // Telaffuz doğru sesi seçebilsin diye kurs ve ses cihazda tutulur.
  // Kaynak yine veritabanı; buradaki yalnızca bir ayna. Gerekçesi zamanlama:
  // ses çalınacağı anda eşzamanlı okunabilmeli, o an sunucuya sorulamaz.
  useEffect(() => {
    try {
      localStorage.setItem("wortspiel-course", course);
      if (voice) localStorage.setItem("wortspiel-voice", voice);
      else localStorage.removeItem("wortspiel-voice");
    } catch {
      /* depolama kapalıysa kursun varsayılan sesi kullanılır */
    }
  }, [course, voice]);
  /**
   * İçerik alanının alt boşluğu, alt gezinmenin GERÇEK yüksekliğinden geliyor.
   *
   * Önce sabit bir değer (pb-24) kullanılıyordu ve iki ayrı şikâyet üretiyordu:
   * gezinme o değerden yüksek olan telefonlarda içerik altında kalıyor, alçak
   * olanlarda ise fazladan boşluk kalıp sayfayı gereksiz yere kaydırılabilir
   * yapıyordu. Yükseklik sabit değil — cihazın alt güvenli alanı ve
   * kullanıcının yazı tipi ölçeği onu değiştiriyor.
   *
   * Ölçüm `ResizeObserver` ile: yazı tipi ölçeği ya da yönlendirme değişince
   * kendiliğinden güncelleniyor.
   */
  useEffect(() => {
    const nav = navRef.current;
    const shell = shellRef.current;
    if (!nav || !shell) return;
    const apply = () => shell.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  // Hangi sekmeye gerçekten uğranıyor. Ölçüm bunu bir kez elle yapmıştı ve
  // sonuç görevler bölümünü doğurmuştu: yedi kullanıcıdan biri becerileri,
  // üçü dersleri açmıştı. Artık her açılış kendiliğinden yazılıyor.
  useEffect(() => {
    const i = NAV.findIndex((n) => pathname.startsWith(n.href));
    if (i >= 0) track("nav", i);
  }, [pathname]);

  useEffect(() => {
    const onStats = (e: Event) => {
      const detail = (e as CustomEvent<{ xp: number; streak: number }>).detail;
      if (detail) setStats({ streak: detail.streak, xp: detail.xp });
    };
    window.addEventListener("wortspiel:stats", onStats);
    return () => window.removeEventListener("wortspiel:stats", onStats);
  }, []);

  return (
    // h-dvh + iç kaydırma: sayfa gövdesi kaymaz, yalnızca içerik alanı kayar.
    // Böylece oyun ekranları kalan alanı tam olarak bilir ve taşma olmaz.
    <div ref={shellRef} className="mx-auto flex h-dvh w-full max-w-6xl overflow-hidden">
      {/* Kurs/ses aynasının yazılmasından önce çalışması gerekiyor: hesap
          değiştiyse eski hesabın kopyaları önce siliniyor. Çocuk bileşenin
          etkisi ebeveyninkinden önce çalıştığı için sıra buradan geliyor. */}
      <SessionKeeper userId={userId} />
      <TopProgress />
      <InstallPrompt />
      {/* Masaüstü kenar çubuğu */}
      <aside
        className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r p-5 md:flex"
        style={{ borderColor: "var(--border)" }}
      >
        <Link href="/learn" className="mb-8 flex items-center gap-2">
          <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white">
            <LogoMark size={20} />
          </span>
          <span className="text-lg font-bold">Wortspiel</span>
        </Link>

        <nav className="flex flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active ? "text-white" : "muted hover:text-[color:var(--text)]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="brand-gradient absolute inset-0 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <item.Icon size={18} className="relative" />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center justify-between">
          <StatPills streak={stats.streak} xp={stats.xp} />
          <ThemeToggle />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobil başlık */}
        <header
          className="safe-top sticky top-0 z-20 flex items-center justify-between border-b px-4 pb-3 backdrop-blur md:hidden"
          style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--bg) 85%, transparent)" }}
        >
          <Link href="/learn" className="flex items-center gap-2">
            <span className="brand-gradient flex h-8 w-8 items-center justify-center rounded-lg text-white">
              <LogoMark size={18} />
            </span>
            <span className="font-bold">Wortspiel</span>
          </Link>
          <div className="flex items-center gap-2">
            <StatPills streak={stats.streak} xp={stats.xp} />
            <ThemeToggle />
          </div>
        </header>

        {/* Kaydırma yalnızca burada olur: uzun listeler kayar, oyun ekranları
            kalan alanı tam olarak bilir ve taşmaz.
            `overscroll-contain` elastik kaydırmanın sayfa gövdesine zincirlenip
            kaymıyormuş gibi durmasını engelliyor. */}
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pt-4 md:px-8 md:pb-8 md:pt-8">
          {children}
          {/* Gezinmenin altında kalan boşluk bir DOLGU değil, akıştaki gerçek
              bir öğe.
              Önce `main` üzerinde `padding-bottom` olarak duruyordu ve bir
              telefonda içerik gezinmenin altında kalıyordu: bir kaydırma
              kutusunun alt dolgusu, içindeki bir öğe TAŞTIĞINDA kaydırma
              alanına eklenmiyor. Ölçüldü — dört telefon profilinde de içeriğin
              son 96 pikseli kaydırma sonuna gelindiğinde bile gezinmenin
              altında kalıyordu. Akıştaki bir öğe ise her zaman sayılıyor.

              Yükseklik gezinmenin GERÇEK yüksekliğinden: sabit bir değer,
              cihazın alt güvenli alanı ve kullanıcının yazı tipi ölçeği
              yüzünden bazı telefonlarda az, bazılarında fazla kalıyordu.

              Üstüne bir nefes payı ekleniyor. Yalnızca gezinme yüksekliği
              kadar boşluk bırakmak içeriği tam gezinmeye DEĞDİRİYOR: son kart
              çubuğa yapışık duruyor ve sayfa bitmemiş gibi görünüyor. Pay
              sayfanın yatay boşluğuyla aynı (`px-4`), böylece alt kenar diğer
              üç kenarla aynı ritmi tutuyor. */}
          <div
            aria-hidden
            className="shrink-0 md:hidden"
            style={{ height: "calc(var(--nav-h, 6rem) + 1rem)" }}
          />
        </main>

        {/* Mobil alt gezinme */}
        <nav
          ref={navRef}
          className="safe-bottom fixed inset-x-0 bottom-0 z-30 flex border-t backdrop-blur md:hidden"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--bg) 92%, transparent)",
          }}
        >
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-1 flex-col items-center gap-0.5 pt-2.5 text-xs font-semibold"
                style={{ color: active ? "var(--color-brand-500)" : "var(--text-muted)" }}
              >
                <item.Icon size={20} />
                {item.label}
                {active && (
                  <motion.span
                    layoutId="tab-active"
                    className="brand-gradient absolute -top-px h-0.5 w-10 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function StatPills({ streak, xp }: { streak: number; xp: number }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold">
      <span
        className="flex items-center gap-1 rounded-full px-2.5 py-1"
        style={{ background: "color-mix(in srgb, var(--color-flame-500) 16%, transparent)", color: "var(--color-flame-500)" }}
      >
        <FlameIcon size={15} /> {streak}
      </span>
      <span
        className="flex items-center gap-1 rounded-full px-2.5 py-1"
        style={{ background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)", color: "var(--color-brand-500)" }}
      >
        <SparkIcon size={15} /> {xp}
      </span>
    </div>
  );
}
