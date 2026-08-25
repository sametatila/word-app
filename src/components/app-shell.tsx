"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { TopProgress } from "./top-progress";
import { InstallPrompt } from "./install-prompt";
import { SessionKeeper } from "./session-keeper";
import { AchievementUnlock } from "./achievement-unlock";
import { track } from "@/lib/track";
import { CardsIcon, CompassIcon, FlameIcon, ListIcon, SparkIcon, UserIcon, ChatIcon } from "./icons";

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
   * Alt gezinmenin GERÇEK yüksekliği — `--nav-h`.
   *
   * İçeriğin altında kalmaması için artık gerekmiyor: gezinme akışta duruyor
   * ve kendi yerini kendisi açıyor. Ama çubuğun ÜSTÜNDE duran serbest öğeler
   * hâlâ bu ölçüye bakıyor — mirketin açılır balonu, ders yolundaki "kaldığın
   * yer" düğmesi ve alt şerit. Sabit bir değer yazılamaz: yükseklik cihazın
   * güvenli alanına ve kullanıcının yazı tipi ölçeğine göre değişiyor.
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

  /**
   * Alt güvenli alan payı — ÖLÇÜLEREK veriliyor, varsayılarak değil.
   *
   * Sorun şu: `env(safe-area-inset-bottom)` cihazın fiziksel payını bildiriyor
   * ama sayfanın o paya UZANIP uzanmadığını söylemiyor. İkisi ayrı şeyler:
   *
   *   - Sayfa ekranın dibine kadar uzanıyorsa (edge-to-edge) payı biz koymak
   *     ZORUNDAYIZ, yoksa gezinme etiketleri parmak hareketi çubuğunun altında
   *     kalır.
   *   - Uzanmıyorsa (iOS'ta çoğu zaman böyle; tarayıcı sekmesinde her zaman)
   *     pay zaten sistem tarafından ayrılmış demektir ve bir kez daha koymak
   *     onu İKİYE katlar.
   *
   * İkinci durum ölçüldü: donanım tuşu olmayan bir iPhone'da gezinme
   * etiketlerinin altında 71 CSS piksel boşluk vardı — 34 sistemin, 34 bizim.
   *
   * Ayrım tek bir karşılaştırmayla yapılabiliyor: sayfanın görünen yüksekliği
   * ekranın yüksekliğine eşitse sayfa gerçekten dibe uzanıyordur. Pay o zaman
   * bizim, değilse sistemin.
   *
   * Donanım gezinme tuşu olan Android'i etkilemesi mümkün değil: orada
   * `env(safe-area-inset-bottom)` zaten 0, yani hangi dala girilirse girilsin
   * sonuç aynı taban değer.
   */
  useEffect(() => {
    // env() değeri JS'ten okunamıyor; ölçmek için görünmez bir sonda gerekiyor.
    const probe = document.createElement("div");
    probe.style.cssText =
      "position:fixed;left:0;bottom:0;width:0;height:env(safe-area-inset-bottom);visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);

    const apply = () => {
      const inset = probe.getBoundingClientRect().height;
      // Uygulama dikey kilitli (manifest), o yüzden ekranın uzun kenarı esas.
      const screenH = Math.max(window.screen?.height ?? 0, window.screen?.width ?? 0);
      // Birkaç pikselik pay: tarayıcılar yüksekliği kesirli bildirebiliyor.
      const reaches = screenH > 0 && Math.abs(window.innerHeight - screenH) <= 12;
      document.documentElement.style.setProperty("--safe-b", reaches ? `${inset}px` : "0px");
    };

    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
      probe.remove();
    };
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
      {/* Rozet kutlaması kabukta: rozet altı ayrı yerde kazanılabiliyor
          (kelime turu, ders, beceri, görev, günün turu, hayatta kalma) ve
          altısına ayrı kutlama koymak altı yerde unutulacak bir şey demekti.
          Tetikleyici zaten var olan `wortspiel:stats` olayı. */}
      <AchievementUnlock />
      <TopProgress />
      <InstallPrompt />
      {/* Masaüstü kenar çubuğu */}
      <aside
        className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r p-5 md:flex"
        style={{ borderColor: "var(--border)" }}
      >
        <Link href="/learn" className="mb-8 flex items-center gap-2">
          {/*
            Marka = maskotun kafası, uygulama simgesiyle BİREBİR aynı görsel.
            Önce gradyan bir kutuda geometrik bir "W" vardı; kullanıcı ana
            ekranda bir mirket, uygulamanın içinde bir harf görüyordu.
          */}
          <img src="/logo-mark.png" alt="" width={36} height={36} className="rounded-xl" />
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
                  active ? "text-[color:#2f1911]" : "muted hover:text-[color:var(--text)]"
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
            <img src="/logo-mark.png" alt="" width={32} height={32} className="rounded-lg" />
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
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 py-4 md:px-8 md:py-8">
          {children}
        </main>

        {/*
          Mobil alt gezinme — AKIŞTA, sabit konumlu değil.

          Önce `fixed bottom-0` idi ve içeriğin altında kalmaması için `main`
          içine gezinme yüksekliğinde bir dolgu öğesi konuyordu. İki ayrı ölçü
          aynı şeyi anlatmaya çalışıyordu ve donanım gezinme tuşu olmayan
          telefonlarda ikisi tutmuyordu: sabit konumun dayandığı düzen alanı
          ile ekranın gerçek dibi aynı yer değil, çubuk boşlukta kalıyordu.

          Kabuk zaten tam ekran yüksekliğinde (`h-dvh`) ve içeride yalnızca
          `main` kayıyor. Gezinme o sütunun son öğesi olunca ekranın dibine
          kendiliğinden oturuyor: ölçülecek bir şey, telafi edilecek bir dolgu
          ve çakışacak bir katman kalmıyor.

          `--nav-h` yine ölçülüyor: mirket açılır balonu ve "kaldığın yer"
          düğmesi çubuğun üstünde durmak için onu kullanıyor.
        */}
        <nav
          ref={navRef}
          className="safe-bottom flex shrink-0 border-t md:hidden"
          style={{ borderColor: "var(--border)", background: "var(--bg)" }}
        >
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-1 flex-col items-center gap-0.5 pt-2.5 text-xs font-semibold"
                style={{ color: active ? "var(--color-brand)" : "var(--text-muted)" }}
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
        style={{ background: "color-mix(in srgb, var(--color-flame) 16%, transparent)", color: "var(--color-flame)" }}
      >
        <FlameIcon size={15} /> {streak}
      </span>
      <span
        className="flex items-center gap-1 rounded-full px-2.5 py-1"
        style={{ background: "color-mix(in srgb, var(--color-brand) 14%, transparent)", color: "var(--color-brand)" }}
      >
        <SparkIcon size={15} /> {xp}
      </span>
    </div>
  );
}
