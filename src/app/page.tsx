import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import { Mascot } from "@/components/mascot";
import { InstallGuide } from "@/components/install-guide";
import { AppDownload } from "@/components/app-download";
import {
  KeyboardIcon,
  LinkIcon,
  LogoMark,
  PenIcon,
  PuzzleIcon,
  TagIcon,
  TargetIcon,
  HeadphonesIcon,
  ListIcon,
  BookIcon,
  CheckIcon,
} from "@/components/icons";

const GAMES = [
  { Icon: LinkIcon, name: "Eşleştirme", desc: "Almanca–Türkçe çiftleri hızlıca eşle" },
  { Icon: TargetIcon, name: "Doğru Anlam", desc: "Dört şık arasından doğru karşılığı seç" },
  { Icon: TagIcon, name: "Artikel Yarışı", desc: "der / die / das refleksini geliştir" },
  { Icon: PuzzleIcon, name: "Harf Bulmacası", desc: "Karışık harflerden kelimeyi kur" },
  { Icon: PenIcon, name: "Cümleyi Tamamla", desc: "Gerçek örnek cümledeki boşluğu doldur" },
  { Icon: KeyboardIcon, name: "Yazarak Hatırla", desc: "Kelimeyi sıfırdan yazarak pekiştir" },
  { Icon: HeadphonesIcon, name: "Kulaktan Tanı", desc: "Sesli okunan kelimeyi duyarak bul" },
  { Icon: ListIcon, name: "Cümleyi Diz", desc: "Karışık kelimelerden cümleyi kur" },
  { Icon: BookIcon, name: "Çoğul Bilmece", desc: "İsmin çoğul biçimini hatırla" },
  { Icon: CheckIcon, name: "Doğru mu Yanlış mı", desc: "Verilen karşılık doğru mu, hızlıca karar ver" },
];

const COURSES = [
  {
    name: "Almanca",
    sub: "Hochdeutsch",
    body: "A1–B1 resmî Goethe listelerinden, B2–C1 alan bazlı hazırlanmış 7.392 kelime; her biri artikel, çoğul, örnek cümle ve cümlenin Türkçe çevirisiyle.",
  },
  {
    name: "Zürih Almancası",
    sub: "Züritüütsch",
    body: "Listenin tamamının Zürih lehçesindeki karşılığı: 7.392 madde, de/d/s artikelleri, Zürihçe örnek cümleler ve her kelimede Hochdeutsch köprüsü. İsviçre'de yaşayanın günlük duyduğu dil.",
  },
];

const FEATURES = [
  {
    title: "Tekrarı sen planlamıyorsun",
    body: "Ayrı bir “tekrar” bölümü yok. Her cevabın hızı ve doğruluğu ölçülür; kelime tam unutulmadan önce oyunun içinde tekrar karşına çıkar.",
  },
  {
    title: "Okuma, dinleme, yazma",
    body: "Kelimenin yanında beceri bölümü: her kursta A1–C1 için mesajdan köşe yazısına, anonstan panele uzanan alıştırmalar. Yazmada önce cümle kurar, sonra kendi metnini yazarsın.",
  },
  {
    title: "Seviyeni sen seçersin",
    body: "CEFR seviyeni profilden belirlersin ve orada kalırsın — sistem seni sınayıp yukarı taşımaz, aşağı da indirmez. Gösterilen tek ölçü, o seviyenin kaç kelimesini pekiştirdiğin.",
  },
  {
    title: "Sıkılmadan devam",
    body: "Oyun türü kelimenin ne kadar oturduğuna göre değişir. Yeni kelimede tanıma, pekişende yazma — aynı ekran arka arkaya gelmez.",
  },
  {
    title: "Hayatta kalma turu",
    body: "Tur sonunda süreye karşı oynarsın: 40 saniyeyle başlar, her doğru sana süre kazandırır, her yanlış yakar. Üst üste doğrular puanı üç katına çıkarır, sorular üç dalgada sertleşir.",
  },
  {
    title: "İki kurs, tek ilerleme",
    body: "Kursu istediğin zaman değiştirirsin; diğerindeki ilerlemen silinmez, beklemeye geçer. Geri döndüğünde kaldığın yerden devam edersin.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-brand), transparent 65%)" }}
      />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <LogoMark size={36} />
          <span className="text-lg font-bold">Lernomi</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/learn" className="btn btn-primary px-4 py-2.5 text-sm">
            Başla
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-24">
        <section className="py-14 text-center sm:py-20">
          <Reveal>
            <span className="muted inline-block rounded-full border px-3 py-1 text-xs font-semibold" style={{ borderColor: "var(--border)" }}>
              2 kurs · A1 → C1 · 14.784 kelime · 10 oyun
            </span>
          </Reveal>
          {/* Erdi başlığın üstünde ve büyük. Karakter uygulamanın her kapanış
              ekranında, oyun içindeki sonuç şeridinde ve seri kutlamasında var
              ama ilk karşılaşılan yerde — ana sayfada — hiç yoktu; yani
              uygulamayı açmadan önce kimse onu görmüyordu. */}
          <Reveal delay={0.04}>
            <Mascot mood="wave" size={132} className="mx-auto mt-6" />
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-2 text-4xl font-black leading-tight sm:text-6xl">
              Almanca kelimeleri <span className="brand-text">oynayarak</span> öğren
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            {/* İkinci cümle ("neyi ne zaman tekrar edeceğine uygulama karar
                verir") aşağıdaki özellik kartlarında zaten anlatılıyordu;
                başlığın hemen altında sistemin çalışma mantığını anlatmak,
                daha ne olduğu söylenmeden nasıl çalıştığını anlatmak oluyor. */}
            <p className="muted mx-auto mt-5 max-w-xl text-base sm:text-lg">
              Hochdeutsch ya da Zürih Almancası — kursunu seç, on kelime oyunu ve beceri
              alıştırmaları tek akışta gelsin.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/learn" className="btn btn-primary w-full px-7 py-4 text-base sm:w-auto">
                Hemen başla — ücretsiz
              </Link>
              <Link href="/immersion" className="btn btn-ghost w-full px-7 py-4 text-base sm:w-auto">
                Okuma · Dinleme · Yazma
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          {COURSES.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <span className="text-xs font-semibold text-[color:var(--color-brand)]">
                    {c.sub}
                  </span>
                </div>
                <p className="muted mt-2 text-sm leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="brand-gradient mb-4 h-1.5 w-10 rounded-full" />
                <h3 className="font-bold">{f.title}</h3>
                <p className="muted mt-2 text-sm leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="mt-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">On oyun, tek akış</h2>
            <p className="muted mx-auto mt-3 max-w-lg text-center text-sm">
              Kelimenin ne kadar oturduğuna göre oyun otomatik seçilir.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.06}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span className="surface-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[color:var(--color-brand)]">
                    <g.Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{g.name}</h3>
                    <p className="muted mt-1 text-sm">{g.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Kurulum adımları giriş yapılmadan da görünüyor: tarayıcının kendi
            önerisi bir kez çıkıyor ve reddedilirse bir daha gelmiyor, iOS'ta
            ise hiç gelmiyor. Uygulamayı telefonuna almak isteyen birinin önce
            hesap açması gerekmemeli. */}
        <section className="mt-20">
          <Reveal>
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Telefonuna kur</h2>
            <p className="muted mx-auto mt-3 max-w-lg text-center text-sm">
              Android için native uygulamayı indir ya da tarayıcıdan ana ekrana ekle — mağazaya gerek yok.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 max-w-xl space-y-5">
              {/* Native Android APK — GitHub release, sürüm kontrollü kalıcı bağlantı */}
              <div className="rounded-2xl px-5 py-6 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <p className="text-base font-bold">Android uygulaması</p>
                <p className="muted mx-auto mt-1.5 max-w-sm text-sm">
                  Native APK — tam ekran, çevrimdışı, en hızlı. Güncellemeler uygulama içinde bildirilir.
                </p>
                <div className="mt-4 flex justify-center">
                  <AppDownload />
                </div>
                <p className="muted mt-3 text-xs">
                  Kurarken “bilinmeyen kaynak” izni gerekebilir (bu tek uygulama için).
                </p>
              </div>
              {/* Tarayıcıdan (PWA) — iOS ve alternatif */}
              <div>
                <p className="muted mb-2 text-center text-xs font-semibold uppercase tracking-wide">ya da tarayıcıdan (PWA)</p>
                <InstallGuide />
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mt-20">
          <Reveal>
            <div className="card brand-gradient-deep p-8 text-center text-white sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Bugün 5 dakika ayır</h2>
              <p className="mx-auto mt-3 max-w-md text-sm opacity-90">
  Serini başlat, ilk kelimelerini öğren. Neyi ne zaman tekrar edeceğini uygulama takip ediyor.
              </p>
              <Link
                href="/learn"
                className="btn mt-6 bg-white px-7 py-3.5 text-base text-[color:var(--color-brand-600)]"
              >
                Öğrenmeye başla
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="muted border-t px-5 py-8 text-center text-xs" style={{ borderColor: "var(--border)" }}>
        Kelime kaynağı: A1–B1 Goethe-Institut resmî Wortliste; B2–C1 konu bazlı hazırlanmış set.
        <br />
        Zürih kursu, aynı listenin Züritüütsch karşılığıdır (Dieth temelli sadeleştirilmiş yazım).
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href="/privacy" prefetch={false} className="underline-offset-4 hover:underline">Gizlilik politikası</Link>
          <Link href="/terms" prefetch={false} className="underline-offset-4 hover:underline">Kullanım şartları</Link>
          <Link href="/account/delete" prefetch={false} className="underline-offset-4 hover:underline">Hesabını sil</Link>
        </div>
      </footer>
    </div>
  );
}
