import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUserId } from "@/lib/auth/server";
import { SignOutLink } from "@/components/sign-out-link";
import { Reveal } from "@/components/reveal";
import { Mascot } from "@/components/mascot";
import { InstallGuide } from "@/components/install-guide";
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
import { getT, getLang } from "@/lib/i18n/server";
import { courseName, courseSub, onboardingCoursesFor } from "@/lib/courses";
import { legalPath } from "@/lib/legal";

/* Adlar oyunların kendi anahtarlarından: tanıtım sayfası ile turun içi aynı
   sözcüğü kullanmalı, yoksa ziyaretçi gördüğü oyunu uygulamada tanımıyor. */
const GAMES = [
  { Icon: LinkIcon, name: "games.match", desc: "land.game_match" },
  { Icon: TargetIcon, name: "games.choice", desc: "land.game_choice" },
  { Icon: TagIcon, name: "games.article_race", desc: "land.game_artikel" },
  { Icon: PuzzleIcon, name: "games.scramble", desc: "land.game_scramble" },
  { Icon: PenIcon, name: "games.cloze", desc: "land.game_cloze" },
  { Icon: KeyboardIcon, name: "games.typing", desc: "land.game_typing" },
  { Icon: HeadphonesIcon, name: "games.listen", desc: "land.game_listen" },
  { Icon: ListIcon, name: "games.order", desc: "land.game_order" },
  { Icon: BookIcon, name: "games.plural", desc: "land.game_plural" },
  { Icon: CheckIcon, name: "games.truefalse", desc: "land.game_truefalse" },
];

/*
  Vitrin kursları da KAYIT DEFTERİNDEN ve ziyaretçinin diline göre süzülüyor.
  Liste elle yazılıydı; İngilizce kursu tanıtımda hiç görünmüyordu ve alt
  başlık `c.id === "de" ? "Hochdeutsch" : "Züritüütsch"` üçlüsüyle
  üretiliyordu — kayıt defterinin tam olarak uyardığı desen: üçüncü bir kurs
  sessizce Züritüütsch etiketi alırdı.

  Alamayacağı bir kursu ziyaretçiye tanıtmıyoruz: arayüzü Almanca olan biri
  Almanca kursunu göremez, çünkü seçemez de.
*/
const COURSE_BODY: Record<string, string> = {
  de: "land.course_de",
  "gsw-zh": "land.course_gsw",
  en: "land.course_en",
};

const FEATURES = [
  { title: "land.f_srs_title", body: "land.f_srs_body" },
  { title: "land.f_skills_title", body: "land.f_skills_body" },
  { title: "land.f_level_title", body: "land.f_level_body" },
  { title: "land.f_variety_title", body: "land.f_variety_body" },
  { title: "land.f_survival_title", body: "land.f_survival_body" },
  { title: "land.f_courses_title", body: "land.f_courses_body" },
];

export default async function Home() {
  /*
    "Başla" oturuma göre iki yere gidiyor.

    Önce hepsi `/learn`e gidiyordu ve girişi olmayan ziyaretçi oradan doğrudan
    giriş duvarına düşüyordu: uygulamayı görmeden hesap açması isteniyordu.
    Mobilde ilk açılış onboarding'e gider, oradan beş kelimelik ısınmaya, hesap
    en sona kalır. Web de öyle oldu.
  */
  const t = await getT();
  const lang = await getLang();
  const signedIn = Boolean(await getUserId());
  const startHref = signedIn ? "/learn" : "/setup";

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
          <span className="text-h3">Lernomi</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/*
            ÇIKIŞ BAŞLIKTA. Önce yalnız altbilgiye konmuştu ve bu yetmedi:
            çıkmak isteyen kullanıcının uzun bir vitrin sayfasını sonuna kadar
            kaydırması gerekiyordu, yani pratikte yine görünmüyordu. Hesap
            durumunun yeri başlık.
          */}
          {signedIn ? (
            <SignOutLink />
          ) : (
            /*
              GİRİŞ YAP bağlantısı YOKTU ve eksikliği çıkıştan sonra ortaya
              çıkıyordu: `startHref` oturumsuzken `/setup`e gidiyor (misafir
              onboarding'i, bilinçli), yani hesabı olan kullanıcının kendi
              hesabına dönecek hiçbir kapısı kalmıyordu.
            */
            <Link href="/login" className="btn btn-ghost px-3 py-2.5 text-body">
              {t("auth.sign_in")}
            </Link>
          )}
          <Link href={startHref} className="btn btn-primary px-4 py-2.5 text-body">
            {t(signedIn ? "land.cta_continue" : "common.start")}
          </Link>
        </div>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-5 pb-24">
        <section className="py-14 text-center sm:py-20">
          <Reveal>
            <span className="muted inline-block rounded-full border px-3 py-1 text-caption" style={{ borderColor: "var(--border)" }}>
              {t("land.badge")}
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
              {t("land.h1_before")}
              <span className="brand-text">{t("land.h1_accent")}</span>
              {t("land.h1_after")}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            {/* İkinci cümle ("neyi ne zaman tekrar edeceğine uygulama karar
                verir") aşağıdaki özellik kartlarında zaten anlatılıyordu;
                başlığın hemen altında sistemin çalışma mantığını anlatmak,
                daha ne olduğu söylenmeden nasıl çalıştığını anlatmak oluyor. */}
            <p className="muted mx-auto mt-5 max-w-xl text-body sm:text-h3">
              {t("land.hero_sub")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/*
                Giriş yapmışa "Hemen başla — ücretsiz" demek yanlış: kullanıcı
                zaten kayıtlı ve düğme onu kaldığı yere götürüyor. Etiketin
                durumla ayrışması, dönen kullanıcının kendi içeri kapısını
                tanıyamamasına yol açıyordu.
              */}
              <Link href={startHref} className="btn btn-primary w-full px-7 py-4 text-h3 sm:w-auto">
                {t(signedIn ? "land.cta_continue" : "land.cta_free")}
              </Link>
              <Link href="/immersion" className="btn btn-ghost w-full px-7 py-4 text-h3 sm:w-auto">
                {t("land.cta_skills")}
              </Link>
            </div>
          </Reveal>
        </section>

        <section className="mb-12 grid gap-4 sm:grid-cols-2">
          {/* YENİ ZİYARETÇİYE SUNULAN kurslar. Liste `coursesForNative` idi ve
              duraklatılmış lehçe kursunu da (gsw-zh) reklam ediyordu: kayıt
              olan kullanıcı onboarding'de onu bulamıyordu, çünkü orası
              `onboardingCoursesFor` kullanıyor. Sayfa "ücretsiz başla"nın hemen
              altında duruyor, yani bu kartlar bir teklif - tutulmayacak bir
              teklif olmamalı. */}
          {onboardingCoursesFor(lang).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-h3">{courseName(c.id, lang)}</h3>
                  <span className="text-caption text-[color:var(--color-brand)]">
                    {courseSub(c.id, lang)}
                  </span>
                </div>
                <p className="muted mt-2 text-body leading-relaxed">{t(COURSE_BODY[c.id] ?? "land.course_de")}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card h-full p-6">
                <div className="brand-gradient mb-4 h-1.5 w-10 rounded-full" />
                <h3 className="font-bold">{t(f.title)}</h3>
                <p className="muted mt-2 text-body leading-relaxed">{t(f.body)}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="mt-20">
          <Reveal>
            <h2 className="text-center text-h1 sm:text-display">{t("land.games_title")}</h2>
            <p className="muted mx-auto mt-3 max-w-lg text-center text-body">
              {t("land.games_sub")}
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((g, i) => (
              <Reveal key={g.name} delay={i * 0.06}>
                <div className="card flex h-full items-start gap-4 p-5">
                  <span className="surface-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-tile text-[color:var(--color-brand)]">
                    <g.Icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-semibold">{t(g.name)}</h3>
                    <p className="muted mt-1 text-body">{t(g.desc)}</p>
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
            <h2 className="text-center text-h1 sm:text-display">{t("land.install_title")}</h2>
            <p className="muted mx-auto mt-3 max-w-lg text-center text-body">
              {t("land.install_sub")}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mx-auto mt-8 max-w-xl">
              <InstallGuide />
            </div>
          </Reveal>
        </section>

        <section className="mt-20">
          <Reveal>
            <div className="card brand-gradient-deep p-8 text-center text-white sm:p-12">
              <h2 className="text-h1 sm:text-display">{t("land.cta_title")}</h2>
              <p className="mx-auto mt-3 max-w-md text-body opacity-90">
                {t("land.cta_body")}
              </p>
              <Link
                href={startHref}
                className="btn mt-6 bg-white px-7 py-3.5 text-h3 text-[color:var(--color-brand-600)]"
              >
                {t("land.cta_button")}
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="muted border-t px-5 py-8 text-center text-caption" style={{ borderColor: "var(--border)" }}>
        {t("land.footer_source")}
        <br />
        {t("land.footer_gsw")}
        <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <Link href={legalPath("privacy", lang)} prefetch={false} className="underline-offset-4 hover:underline">{t("auth.privacy_policy")}</Link>
          <Link href={legalPath("terms", lang)} prefetch={false} className="underline-offset-4 hover:underline">{t("auth.terms_of_use")}</Link>
          <Link href={legalPath("support", lang)} prefetch={false} className="underline-offset-4 hover:underline">{t("land.support")}</Link>
          <Link href="/account/delete" prefetch={false} className="underline-offset-4 hover:underline">{t("land.delete_account")}</Link>
        </div>
      </footer>
    </div>
  );
}
