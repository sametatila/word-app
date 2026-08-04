import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Reveal } from "@/components/reveal";
import {
  KeyboardIcon,
  LinkIcon,
  LogoMark,
  PenIcon,
  PuzzleIcon,
  TagIcon,
  TargetIcon,
} from "@/components/icons";

const GAMES = [
  { Icon: LinkIcon, name: "Eşleştirme", desc: "Almanca–Türkçe çiftleri hızlıca eşle" },
  { Icon: TargetIcon, name: "Doğru Anlam", desc: "Dört şık arasından doğru karşılığı seç" },
  { Icon: TagIcon, name: "Artikel Yarışı", desc: "der / die / das refleksini geliştir" },
  { Icon: PuzzleIcon, name: "Harf Bulmacası", desc: "Karışık harflerden kelimeyi kur" },
  { Icon: PenIcon, name: "Cümleyi Tamamla", desc: "Gerçek örnek cümledeki boşluğu doldur" },
  { Icon: KeyboardIcon, name: "Yazarak Hatırla", desc: "Kelimeyi sıfırdan yazarak pekiştir" },
];

const FEATURES = [
  {
    title: "Tekrarı sen planlamıyorsun",
    body: "Ayrı bir “tekrar” bölümü yok. Her cevabın hızı ve doğruluğu ölçülür; kelime tam unutulmadan önce oyunun içinde tekrar karşına çıkar.",
  },
  {
    title: "Goethe A1–B1 kelime listesi",
    body: "3.192 kelime, artikel ve çoğul bilgisiyle, resmî Goethe listelerinden çıkarılmış örnek cümlelerle birlikte.",
  },
  {
    title: "Sıkılmadan devam",
    body: "Oyun türü kelimenin ne kadar oturduğuna göre değişir. Yeni kelimede tanıma, pekişende yazma — aynı ekran arka arkaya gelmez.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-brand-500), transparent 65%)" }}
      />

      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="brand-gradient flex h-9 w-9 items-center justify-center rounded-xl text-white">
            <LogoMark size={20} />
          </span>
          <span className="text-lg font-bold">Wortspiel</span>
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
              Goethe A1 · A2 · B1 · 3.192 kelime
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
              Almanca kelimeleri <span className="brand-text">oynayarak</span> öğren
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="muted mx-auto mt-5 max-w-xl text-base sm:text-lg">
              Altı farklı kelime oyunu, tek bir akış. Neyi ne zaman tekrar edeceğine uygulama karar
              verir; sen sadece günde birkaç dakika oyna.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/learn" className="btn btn-primary w-full px-7 py-4 text-base sm:w-auto">
                Hemen başla — ücretsiz
              </Link>
              <Link href="/progress" className="btn btn-ghost w-full px-7 py-4 text-base sm:w-auto">
                İlerleme ekranını gör
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
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
            <h2 className="text-center text-2xl font-bold sm:text-3xl">Altı oyun, tek akış</h2>
            <p className="muted mx-auto mt-3 max-w-lg text-center text-sm">
              Kelimenin durumuna göre uygun oyun otomatik seçilir.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.06}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span className="surface-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[color:var(--color-brand-500)]">
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

        <section className="mt-20">
          <Reveal>
            <div className="card brand-gradient p-8 text-center text-white sm:p-12">
              <h2 className="text-2xl font-bold sm:text-3xl">Bugün 5 dakika ayır</h2>
              <p className="mx-auto mt-3 max-w-md text-sm opacity-90">
                Serini başlat, ilk 8 kelimeni öğren. Gerisini uygulama takip ediyor.
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
        Kelime kaynağı: Goethe-Institut resmî Wortliste (A1 · A2 · B1).
      </footer>
    </div>
  );
}
