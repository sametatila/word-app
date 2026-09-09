"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, useRef } from "react";
import { TopProgress } from "./top-progress";
import { ScreenDiag } from "@/components/screen-diag";
import { InstallPrompt } from "./install-prompt";
import { SessionKeeper } from "./session-keeper";
import { Telemetry } from "./telemetry";
import { AchievementUnlock } from "./achievement-unlock";
import { OnboardingAdopt } from "./onboarding-adopt";
import { track } from "@/lib/track";
import { useT } from "@/lib/i18n/client";
import { BellIcon, FlameIcon, HandshakeIcon, LearnIcon, ListIcon, PathIcon, SkillsIcon, SparkIcon, UserIcon } from "./icons";

/**
 * Alt gezinme: ÜÇ sekme.
 *
 * Üç öğrenme yüzeyi:
 *   - Öğren — kelime turu (SRS/oyun çekirdeği).
 *   - Patika (immersion) — ders iskeleti + okuma/dinleme/yazma harmanı (üretim).
 *   - Beceriler — patikanın DIŞINDAKİ serbest çalışma yüzeyi: seviyedeki tüm
 *     okuma/dinleme/yazma/ses çalışmaları ve sınavlar (bkz. /skills).
 *
 * Eskiden üç sekmeydi (Öğren / Dersler / Beceriler); "Dersler" ve "Beceriler"
 * aynı yolun iki parçasıydı ve Immersion ikisini tek moda (Patika) birleştirdi
 * (bkz. docs/plan/immersion.md). Yeni "Beceriler" o eskiyle aynı DEĞİL: Patika
 * sıradaki adımı seçer, burası kütüphane — patikanın yuvalarına sığmayan
 * içerik ve sınavlar buradan açılır.
 *
 * Kelimeler ve Profil alt gezinmede değil: Kelimeler bir hedef değil sonuç
 * (tura girip zorlanılan kelimeye bakılır), Profil günde bir bile açılmaz —
 * ikisi de üst başlıktan/ikincil gruptan ulaşılır. Üç sekme 320 px'de sığıyor.
 */
const NAV = [
  { href: "/learn", labelKey: "nav.learn", Icon: LearnIcon, key: "learn" },
  { href: "/immersion", labelKey: "nav.path", Icon: PathIcon, key: "immersion" },
  { href: "/skills", labelKey: "nav.skills", Icon: SkillsIcon, key: "skills" },
];

/**
 * Sekme çubuğu YALNIZ sekmelerde görünüyor — mobildeki gibi.
 *
 * Mobilde üç sekme bir `BottomTabNavigator`da duruyor ve onun ÜSTÜNE açılan
 * her şey (Profil, Kelimeler, Ayarlar, oyun, sınav) tam ekran bir yığın
 * ekranı: orada sekme çubuğu yok, geri düğmesi var. Web'de çubuk her sayfada
 * duruyordu ve iki ayrı geri yolu üretiyordu — kullanıcı Ayarlar'dan çıkmak
 * için ya geri düğmesine ya "Öğren"e basıyor, ikisi farklı yere götürüyordu.
 *
 * Ölçüt TAM EŞLEŞME, `startsWith` değil: `/learn/practice` mobilde ayrı bir
 * yığın ekranı (Practice), `/immersion/skill/[id]` de öyle (Item).
 */
const TAB_PATHS = new Set(NAV.map((n) => n.href));

/**
 * Kabuğun sekmelere açtığı veri — seri, XP ve kimlik.
 *
 * Sunucudan bir kez okunuyor (bkz. `(app)/layout.tsx`) ama iki yerde birden
 * gerekiyor: kabuğun kendi rozetlerinde ve her sekmenin kendi başlığında
 * (`AppHeader`). Başlık sayfanın içinde çizildiği için prop olarak geçmesi
 * her sayfaya aynı üç parametreyi taşımak demekti.
 */
type ShellData = { streak: number; xp: number; userId: string; name: string | null; course: string };
const ShellContext = createContext<ShellData | null>(null);

export function useShell(): ShellData {
  const v = useContext(ShellContext);
  if (!v) throw new Error("useShell yalnız AppShell içinde kullanılabilir");
  return v;
}

/** Masaüstünde kenar çubuğunun ikinci grubu — telefonda başlıktan ulaşılıyor. */
const SECONDARY = [
  { href: "/words", labelKey: "profile.my_words", Icon: ListIcon },
  { href: "/friends", labelKey: "profile.friends", Icon: HandshakeIcon },
  { href: "/notifications", labelKey: "profile.notifications", Icon: BellIcon },
  { href: "/profile", labelKey: "profile.profile", Icon: UserIcon },
];

export function AppShell({
  children,
  streak,
  xp,
  course = "de",
  voice = null,
  userId,
  name = null,
}: {
  children: ReactNode;
  streak: number;
  xp: number;
  course?: string;
  voice?: string | null;
  /** Oturumdaki hesap — oturumu tazeleyen ve hesap değişimini fark eden bileşen için. */
  userId: string;
  /** Görünen ad — başlıktaki armanın baş harfleri için. */
  name?: string | null;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ streak, xp });
  const showTabs = TAB_PATHS.has(pathname);
  const t = useT();
  // Kimlik değişmiyor, sayaçlar değişiyor: nesne her render'da yeniden
  // kurulursa bağlama abone olan her başlık boşuna yeniden çiziliyor.
  const shellData = useMemo(
    () => ({ streak: stats.streak, xp: stats.xp, userId, name, course }),
    [stats.streak, stats.xp, userId, name, course],
  );

  // Oyun sırasında kazanılan XP/seri anında rozetlere yansısın.
  useEffect(() => setStats({ streak, xp }), [streak, xp]);

  // Telaffuz doğru sesi seçebilsin diye kurs ve ses cihazda tutulur.
  // Kaynak yine veritabanı; buradaki yalnızca bir ayna. Gerekçesi zamanlama:
  // ses çalınacağı anda eşzamanlı okunabilmeli, o an sunucuya sorulamaz.
  useEffect(() => {
    try {
      localStorage.setItem("lernomi-course", course);
      if (voice) localStorage.setItem("lernomi-voice", voice);
      else localStorage.removeItem("lernomi-voice");
    } catch {
      /* depolama kapalıysa kursun varsayılan sesi kullanılır */
    }
  }, [course, voice]);
  /**
   * Alt gezinmenin GERÇEK yüksekliği — `--nav-h`.
   *
   * İki şey buna bakıyor. Biri `main`in alt dolgusu: çubuk artık içeriğin
   * üstünde YÜZDÜĞÜ için son kart onun altında kalmasın. Diğeri çubuğun
   * üstünde duran serbest öğeler — mirketin açılır balonu, ders yolundaki
   * "kaldığın yer" düğmesi ve alt şerit. Sabit bir değer yazılamaz: yükseklik
   * cihazın güvenli alanına ve kullanıcının yazı tipi ölçeğine göre değişiyor.
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
    // Çubuk yığın sayfalarında hiç çizilmiyor; `showTabs` değişince ölçüm
    // yeniden bağlanmalı, yoksa `--nav-h` kalkmış bir çubuğun boyunda kalır.
  }, [showTabs]);

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
      // Düzen alanının gerçek yüksekliği — kabuk buna göre kuruluyor.
      document.documentElement.style.setProperty("--app-h", `${window.innerHeight}px`);

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
    // `kind` sekmenin ADI: sıra değişince (beş sekmeden üçe indi) eski
    // satırların anlamı kaymasın diye sayıya güvenilmiyor (WP-80).
    if (i >= 0) track("nav", i, NAV[i].key);
  }, [pathname]);

  useEffect(() => {
    const onStats = (e: Event) => {
      const detail = (e as CustomEvent<{ xp: number; streak: number }>).detail;
      if (detail) setStats({ streak: detail.streak, xp: detail.xp });
    };
    window.addEventListener("lernomi:stats", onStats);
    return () => window.removeEventListener("lernomi:stats", onStats);
  }, []);

  return (
    // h-dvh + iç kaydırma: sayfa gövdesi kaymaz, yalnızca içerik alanı kayar.
    // Böylece oyun ekranları kalan alanı tam olarak bilir ve taşma olmaz.
    <div
      ref={shellRef}
      className="mx-auto flex w-full max-w-6xl overflow-hidden"
      /*
        Yükseklik ÖLÇÜLÜYOR; `100dvh` yalnızca yedek.

        `dvh` iOS'ta ana ekrandan açılan uygulamada görünen alanla her zaman
        aynı gelmiyor ve aradaki fark doğrudan alt gezinmenin altında boşluk
        olarak beliriyor: kabuk erken bitiyor, çubuk onunla birlikte yukarıda
        kalıyor, altta gövde zemini görünüyor. `innerHeight` düzen alanının
        gerçek yüksekliği ve ölçülebiliyor — varsaymak yerine ölçmek, iki
        turdur yanlış teşhis edilen şeyi kesin olarak kapatıyor.

        Klavye açılınca iOS'ta `innerHeight` değişmiyor (yalnızca
        `visualViewport` küçülüyor), Android'de ise `dvh` ile aynı biçimde
        küçülüyor — yani mevcut davranış korunuyor.
      */
      style={{ height: "var(--app-h, 100dvh)" }}
    >
      <ShellContext.Provider value={shellData}>
      {/* Kurs/ses aynasının yazılmasından önce çalışması gerekiyor: hesap
          değiştiyse eski hesabın kopyaları önce siliniyor. Çocuk bileşenin
          etkisi ebeveyninkinden önce çalıştığı için sıra buradan geliyor. */}
      <SessionKeeper userId={userId} />
      {/* Misafirken verilen kararlar (kurs, seviye, ad, günlük hedef) hesaba
          taşınır — mobilde `adoptAccount`ın yaptığı iş. */}
      <OnboardingAdopt />
      <Telemetry />
      {/* Rozet kutlaması kabukta: rozet altı ayrı yerde kazanılabiliyor
          (kelime turu, ders, beceri, görev, günün turu, hayatta kalma) ve
          altısına ayrı kutlama koymak altı yerde unutulacak bir şey demekti.
          Tetikleyici zaten var olan `lernomi:stats` olayı. */}
      <AchievementUnlock />
      <ScreenDiag />
      <TopProgress />
      <InstallPrompt />
      {/* Masaüstü kenar çubuğu */}
      <aside
        className="sticky top-0 hidden h-full w-60 shrink-0 flex-col border-r p-5 md:flex"
        style={{ borderColor: "var(--border)" }}
      >
        <Link href="/learn" className="mb-8 flex items-center gap-2">
          {/*
            Marka = maskotun kafası, uygulama simgesiyle BİREBİR aynı görsel.
            Önce gradyan bir kutuda geometrik bir "W" vardı; kullanıcı ana
            ekranda bir mirket, uygulamanın içinde bir harf görüyordu.
          */}
          <Image src="/logo-mark.png" alt="" width={36} height={36} className="rounded-xl" />
          <span className="text-lg font-bold">Lernomi</span>
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
                <span className="relative">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        {/*
          Kelimeler ve Profil alt sekmelerden çıktı ama masaüstünde kenar
          çubuğu boş yer dolu: ikisi de burada, ana üçlüden ayrı ve daha sönük
          bir ikinci grup olarak duruyor. Sıralama aynı fikri anlatıyor —
          üstte gidilen yerler, altta bakılan yerler.
        */}
        <nav className="mt-4 flex flex-col gap-1 border-t pt-4" style={{ borderColor: "var(--border)" }}>
          {SECONDARY.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-[color:var(--text)]" : "muted hover:text-[color:var(--text)]"
                }`}
              >
                <item.Icon size={17} />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <StatPills streak={stats.streak} xp={stats.xp} />
        </div>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        {/*
          MOBİL ÜST ÇUBUK KALKTI (2026-09-08).

          Her sekmenin üstünde aynı çubuk duruyordu — logo + "Lernomi" + iki
          minik rozet + zil + 32px arma — ve hangi sekmede olunduğunu
          söylemiyordu; sayfanın kendi başlığı onun ALTINDA ikinci bir satır
          olarak geliyordu. Mobilde iki satır değil bir satır var: başlığın
          kendisi ekranın adı, 32 puntoda, sağında seri + gelen kutusu +
          profil. Onu artık her sekme kendi çiziyor (`components/app-header`).

          `safe-top` buradan `main`e taşındı: durum çubuğu payını karşılayan
          öğe artık kaydırılan alanın kendisi.
        */}

        {/* Kaydırma yalnızca burada olur: uzun listeler kayar, oyun ekranları
            kalan alanı tam olarak bilir ve taşmaz.
            `overscroll-contain` elastik kaydırmanın sayfa gövdesine zincirlenip
            kaymıyormuş gibi durmasını engelliyor. */}
        <main
          className="safe-top flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-4 pb-4 md:px-8 md:pb-8 md:pt-8"
          /*
            Çubuk artık içeriğin ÜSTÜNDE yüzüyor, akışta değil — o yüzden son
            kartın çubuğun altında kalmaması için alt dolgu gerekiyor. Ölçü
            mobildeki `Screen`in kendi payıyla aynı fikirde: çubuğun ölçülen
            yüksekliği + bir nefes. `--nav-h` yoksa (masaüstü, ilk boyama)
            yalnız normal dolgu kalıyor.
          */
          style={showTabs ? { paddingBottom: "calc(var(--nav-h, 0px) + 1.5rem)" } : undefined}
        >
          {children}
        </main>

        {/*
          TUR SONUCU KATMANININ KABI.

          Oyun turlarında cevaptan sonra alttan çıkan şerit + "Devam" buraya
          çiziliyor (porta ile; bkz. games/round-sheet). Kap boş dururken
          yüksekliği yok ve `pointer-events-none` olduğu için altındaki
          içeriğe dokunmayı engellemiyor.

          Neden ekrana değil de SÜTUNA bağlı: masaüstünde kabuk solda 240
          piksel kenar çubuğu tutuyor; ekrana göre ortalanan bir katman oyun
          kartıyla hizasız kalırdı. `bottom-0` + kendi yüksekliği: kap
          içeriğiyle YUKARI doğru büyüyor, dip kenarı sabit kalıyor.
        */}
        <div id="round-sheet-host" className="pointer-events-none absolute inset-x-0 bottom-0 z-40" />

        {/*
          Alt gezinme — mobildeki YÜZEN HAP (`M/src/navigation/TabBar.tsx`).

          Önceki hali ekranın dibine yapışık, üst kenarlıklı düz bir banttı ve
          akışta duruyordu; o karar bir çift sayma hatasını çözmek için
          alınmıştı (sabit konumun dayandığı düzen alanı ile ekranın gerçek
          dibi aynı yer değil). Çözümün kendisi kalıyor, yalnız dayanağı
          değişiyor: kabuk ölçülen yükseklikte (`--app-h`) ve çubuk O KABIN
          içinde mutlak konumlu, ekranın değil. Yani hâlâ ölçülmüş bir dibe
          oturuyor, ama içeriğin üstünde yüzüyor.

          `--nav-h` yine ölçülüyor — hem `main`in alt dolgusu hem de çubuğun
          ÜSTÜNDE duran serbest öğeler (mirketin balonu, "kaldığın yer"
          düğmesi) ona bakıyor.

          Sarmalayıcı `pointer-events-none`: hap dışında kalan boşluk altındaki
          içeriğe dokunmayı engellemesin.
        */}
        {showTabs ? (
          <div
            ref={navRef}
            className="safe-bottom pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-4 md:hidden"
          >
            <nav className="pointer-events-auto flex w-full max-w-lg gap-1 rounded-float border p-[7px] shadow-soft-lg"
              style={{ borderColor: "var(--hairline)", background: "var(--surface)" }}
            >
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="pressable relative flex flex-1 flex-col items-center gap-[3px] rounded-panel py-2.5 text-micro"
                    style={{ color: active ? "var(--color-brand)" : "var(--text-muted)" }}
                  >
                    {active && (
                      <motion.span
                        layoutId="tab-active"
                        className="absolute inset-0 rounded-panel"
                        style={{ background: "color-mix(in srgb, var(--color-brand-500) 14%, transparent)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <item.Icon size={23} className="relative" />
                    <span className="relative">{t(item.labelKey)}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ) : null}
      </div>
      </ShellContext.Provider>
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
