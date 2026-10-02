import Link from "next/link";
import localFont from "next/font/local";
import { ThemeToggle } from "@/components/theme-toggle";
import { getAccountUserId } from "@/lib/auth/server";
import { SignOutLink } from "@/components/sign-out-link";
import { InstallGuide } from "@/components/install-guide";
import { LandingMotion } from "@/components/landing/landing-motion";
import s from "@/components/landing/landing.module.css";
import { getT, getLang } from "@/lib/i18n/server";
import { legalPath } from "@/lib/legal";
import { appControl } from "@/lib/app-control";
import { LandingLangButton } from "@/components/landing/landing-lang";
import { LANG_LABEL, NATIVE_LANGS } from "@/lib/i18n/dict";
import { offeredNativeLangs } from "@/lib/courses";
import type { Metadata } from "next";
import { translate } from "@/lib/i18n/dict";
import { courseList, shareMeta } from "@/lib/og/langs";
import { SITE_URL } from "@/lib/site";
import { landingLanguages, landingPath } from "@/lib/landing-path";
import { LANDING, PAIRS, SCREEN_FALLBACK, SCREEN_SET, SWITCH_LABEL, type LandingCopy, type Pillar, type ScreenId } from "@/content/landing";

/*
  TANITIM SAYFASI (2026-09-28, yeniden yazıldı).

  Eski sayfa "oynayarak öğren" diyordu ve on bir kelime oyununu sayıyordu;
  uygulama o sırada Patika, konuşma, deneme sınavı ve yürüyüş moduyla bambaşka
  bir ürün olmuştu. Yeni sayfa MAĞAZA VİTRİNİNİN kendisi: aynı konumlandırma,
  aynı cümle ("Konuş, anla, sınava hazırlan"), aynı sütun sırası ve aynı sayılar
  (`docs/store/README.md` "Vitrin kararları"). Metin `src/content/landing.ts`te.

  Ekranlar GERÇEK: iPhone 6.9" simülatöründe, üretimdeki `screenshots@lernomi.app`
  hesabıyla çekildi, açık ve koyu tema ayrı, dil çifti başına (`public/landing/<çift>/`, yöntem `docs/store/screenshots.md`). Sayfa hangi
  temadaysa telefon da o temanın ekranını gösteriyor.

  Tasarım: tek yazı tipi (Bricolage Grotesque; genişlik ekseni başlıkları
  sıkıştırıyor, optik boyut ekseni gövdeyi okunur tutuyor), tek hareket fikri
  (kaydırdıkça çizilen iz + masaüstünde yapışkan telefon, `LandingMotion`).
*/
/*
  YAZI TİPİ SİTEDE, KIRPILMIŞ (2026-10-02, mobil performans). Google'dan iki
  dosya geliyordu (latin 131 KB + latin-ext 54 KB), ilk çizimden önce iniyordu
  ve mobil Lighthouse'ta JavaScript'ten sonra en büyük kalemdi. Şimdi tek dosya,
  91 KB: yalnız sayfanın kullandığı aralıklar (ağırlık 400–750, genişlik
  %80–100) ve Türkçe + Almanca harfler; optik boyut 32'de sabit (otomatikle yan
  yana ekran görüntüsünde fark yok). Lisans OFL, ayrılmış ad yok
  (`fonts/OFL-BricolageGrotesque.txt`). Yeniden üretmek için kaynak
  `BricolageGrotesque[opsz,wdth,wght].ttf` (google/fonts) ve fontTools:
    fonttools varLib.instancer KAYNAK.ttf opsz=32 wght=400:750 wdth=80:100 -o f.ttf
    pyftsubset f.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+0100-017F,U+0192,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+2044,U+20AC,U+2122,U+2190-2193,U+2212,U+2215,U+FEFF,U+FFFD" \
      --layout-features='*' --flavor=woff2 --output-file=bricolage-grotesque-lernomi.woff2
  Sayfaya yeni ağırlık ya da genişlik eklenirse aralık da genişletilir.
*/
const display = localFont({
  src: "./fonts/bricolage-grotesque-lernomi.woff2",
  weight: "400 750",
  style: "normal",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "80% 100%" }],
});

const SCOPE_ID = "landing-trail";

/*
  ARAMA MOTORU KÜNYESİ (2026-10-02). Ana sayfada `canonical` ve `hreflang`
  yoktu; hukuki sayfalarda ikisi de vardı ve Google marka aramasında onları
  öne çıkarıyordu. Kanonik adres GÖSTERİLEN dilin sabit adresi: `/` İngilizce
  çizildiyse kanonik `/en`. Başlık ve açıklama kök düzenden (aynı dil);
  `openGraph` alt segmentte birleşmeyip yerine geçtiği için tam veriliyor.
  Sayfa `/en` ve `/de`de de aynen kullanılıyor (bkz. `lib/landing-path`).
*/
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  const path = landingPath(lang);
  const description = translate(lang, "meta.description", { langs: courseList(lang) });
  return {
    alternates: { canonical: path, languages: landingLanguages() },
    ...shareMeta(lang, `Lernomi — ${translate(lang, "meta.tagline")}`, description, path === "/" ? SITE_URL : `${SITE_URL}${path}`),
  };
}

/*
  Yapısal veri: Google sonuçta site adını ("Lernomi") `WebSite`tan, logoyu
  `Organization`dan alıyor. Yalnız gerçek olan yazılıyor: puan, yorum, fiyat
  yok; mağaza bağlantısı yalnız yayındaki mağaza için.
*/
function StructuredData({ lang, stores }: { lang: string; stores: string[] }) {
  const home = `${SITE_URL}/`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${home}#website`, name: "Lernomi", url: home, inLanguage: lang, publisher: { "@id": `${home}#org` } },
      {
        "@type": "Organization",
        "@id": `${home}#org`,
        name: "Lernomi",
        url: home,
        logo: `${SITE_URL}/icon-512.png`,
        ...(stores.length ? { sameAs: stores } : {}),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // `<` kaçırılıyor: metin içinde `</script>` betiği erken kapatamasın.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Masaüstündeki yapışkan telefonun ekran sırası: açılış, sonra sütunlar. */
const DOCK: ScreenId[] = ["path", "unit", "conversation", "mock-task", "walk-intro", "home", "skills"];

const MOTION_CLASSES = {
  lit: s.lit,
  on: s.frameOn,
  past: s.framePast,
  base: s.trailBase,
  walk: s.trailWalk,
  dock: s.dock,
  cap: s.dockCap,
};

function Shot({ locale, id, alt, eager = false }: { locale: string; id: ScreenId; alt: string; eager?: boolean }) {
  const src = (theme: "light" | "dark", w: 480 | 720) => `/landing/${locale}/${id}-${theme}-${w}.webp`;
  const set = (theme: "light" | "dark") => `${src(theme, 480)} 480w, ${src(theme, 720)} 720w`;
  const sizes = "(min-width: 960px) 340px, 280px";
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- iki tema için elle hazırlanmış WebP srcset; sunucuda görsel işleme yok */}
      <img className={`${s.shot} ${s.shotLight}`} src={src("light", 720)} srcSet={set("light")} sizes={sizes} width={720} height={1564} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element -- aynı sebep, koyu tema */}
      <img className={`${s.shot} ${s.shotDark}`} src={src("dark", 720)} srcSet={set("dark")} sizes={sizes} width={720} height={1564} alt={alt} loading="lazy" decoding="async" />
    </>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.phone}>
      <div className={s.screen}>{children}</div>
    </div>
  );
}

function InlinePhone({ locale, copy, id, caption }: { locale: string; copy: LandingCopy; id: ScreenId; caption: string }) {
  return (
    <figure className={s.inline}>
      <Phone>
        <Shot locale={locale} id={id} alt={copy.alt[id]} />
      </Phone>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function PillarHead({ p }: { p: Pillar }) {
  return (
    <div className={s.head}>
      <span className={s.node} data-node aria-hidden />
      <h2 className={s.pillar} id={`h-${p.id}`}>
        {p.title}
      </h2>
    </div>
  );
}

function StoreBadges({ copy, ios, android }: { copy: LandingCopy; ios: string | null; android: string | null }) {
  return (
    <>
      {ios ? (
        <a className={s.badge} href={ios} rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9.2 16.8 13.4 7.6M14.8 16.8 10.6 7.6M7.4 13.6h9.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
          </svg>
          <span>
            <small>{copy.cta.appStoreSmall}</small>
            <b>{copy.cta.appStoreLabel}</b>
          </span>
        </a>
      ) : null}
      {android ? (
        <a className={s.badge} href={android} rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3.2v17.6c0 .6.6.9 1.1.6l14.5-8.3c.5-.3.5-1 0-1.3L6.1 3.6C5.6 3.3 5 3.6 5 4.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M5.4 3.6 15.3 12 5.4 20.4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span>
            <small>{copy.cta.playSmall}</small>
            <b>{copy.cta.playLabel}</b>
          </span>
        </a>
      ) : null}
    </>
  );
}

export default async function Home() {
  /*
    "Başla" oturuma göre iki yere gidiyor: girişli kullanıcı kaldığı yere
    (`/learn`), misafir kuruluma (`/setup`). Önce hepsi `/learn`e gidiyordu ve
    girişi olmayan ziyaretçi oradan doğrudan giriş duvarına düşüyordu:
    uygulamayı görmeden hesap açması isteniyordu.
  */
  const t = await getT();
  const lang = await getLang();
  const copy = LANDING[lang];
  /* Ekranlar ziyaretçinin dil çiftinden (arayüz + kendi kursu); seti henüz
     çekilmemiş dil yedeğe düşüyor (bkz. SCREEN_SET). */
  const locale = SCREEN_SET[lang] ?? SCREEN_FALLBACK;
  const signedIn = Boolean(await getAccountUserId());
  const startHref = signedIn ? "/learn" : "/setup";
  const startLabel = signedIn ? copy.cta.webSignedIn : copy.cta.web;

  /* Mağaza rozetleri yalnız panelde "yayında" işaretli mağaza için: yayında
     olmayan bir mağaza sayfasına göndermek kırık bir kapı olurdu. İkisi de
     kapalıyken tarayıcıya ekleme adımları (PWA) açılabilir kalıyor. */
  const store = (await appControl()).store;
  const ios = store.ios.live ? store.ios.url : null;
  const android = store.android.live ? store.android.url : null;
  const anyStore = Boolean(ios || android);

  const actions = (
    <div className={s.actions}>
      <StoreBadges copy={copy} ios={ios} android={android} />
      <Link className={s.cta} href={startHref}>
        {startLabel}
      </Link>
      {signedIn ? null : <p className={s.actionsNote}>{copy.hero.noAccount}</p>}
    </div>
  );

  const { path, talk, exam, walk, daily, skills } = copy;
  /* Önce ziyaretçinin kendi yolları, sonra ötekiler; yalnız anadili gerçekten
     sunulan yollar (`PAIR_READY`). */
  const offered = new Set(offeredNativeLangs());
  const open = PAIRS.filter((p) => offered.has(p.native));
  const pairs = [...open.filter((p) => p.native === lang), ...open.filter((p) => p.native !== lang)];

  return (
    <div className={`${display.className} ${s.root}`}>
      <StructuredData lang={lang} stores={[ios, android].filter((u): u is string => Boolean(u))} />
      <header className={`${s.top} ${s.wrap}`}>
        <Link className={s.brand} href={landingPath(lang)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- küçük sabit PNG simge */}
          <img src="/logo-mark-68.png" width={34} height={34} alt="" />
          Lernomi
        </Link>
        <div className={s.topActions}>
          <span className={s.hideNarrow}>
            <ThemeToggle />
          </span>
          {signedIn ? (
            <SignOutLink />
          ) : (
            <Link className={s.topPlain} href="/login">
              {t("auth.sign_in")}
            </Link>
          )}
          <Link className={s.topLink} href={startHref}>
            {signedIn ? t("land.cta_continue") : copy.cta.top}
          </Link>
        </div>
      </header>

      <main>
        <div className={s.trailScope} id={SCOPE_ID}>
          <svg className={s.trail} data-trail aria-hidden="true" focusable="false">
            <path className={s.trailBase} d="" />
            <path className={s.trailWalk} d="" />
          </svg>

          <div className={`${s.journey} ${s.wrap}`}>
            <div className={s.legs}>
              {/* Açılış */}
              <section className={`${s.leg} ${s.hero}`} data-show="path" aria-labelledby="h-hero">
                <h1 className={s.h1} id="h-hero">
                  <span>{copy.hero.line1}</span> <span>{copy.hero.line2}</span>
                </h1>
                <p className={s.intro}>{copy.hero.intro}</p>
                {actions}
                {anyStore ? null : (
                  <details className={s.install}>
                    <summary>{copy.cta.install}</summary>
                    <p className={s.muted}>{copy.cta.soon}</p>
                    <div className={s.installBody}>
                      <InstallGuide />
                    </div>
                  </details>
                )}
                <div className={s.heroFoot} data-leg>
                  <span className={s.node} data-node aria-hidden />
                  <ul className={s.stats}>
                    {copy.stats.map((st) => (
                      <li key={st.label}>
                        <b>{st.value}</b>
                        <span>{st.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={s.statsNote}>{copy.statsNote}</p>
                </div>
              </section>

              {/* Dil yolları: vitrin Almancayı öne alıyor ama Lernomi tek dil
                  uygulaması değil. Ziyaretçinin kendi yolları önde; ötekilerde
                  sayfayı o dilde açan düğme (etiketi o dilde). */}
              <section className={s.leg} data-leg data-show="path" aria-labelledby="h-diller" id="diller">
                <div className={s.head}>
                  <span className={s.node} data-node aria-hidden />
                  <h2 className={s.pillar} id="h-diller">
                    {copy.langs.title}
                  </h2>
                </div>
                <div className={s.body}>
                  <p className={s.lede}>{copy.langs.lede}</p>
                </div>
                <ul className={s.pairs}>
                  {pairs.map((p) => {
                    const mine = p.native === lang;
                    return (
                      <li key={`${p.native}-${p.course}`} className={`${s.pair} ${mine ? s.pairMine : ""}`}>
                        <span className={s.pairFrom}>{copy.langs.explained[p.native]}</span>
                        <b className={s.pairTo}>{copy.langs.course[p.course]}</b>
                        <span className={s.pairMeta}>A1–C1 · {copy.langs.words[p.course]}</span>
                        {mine ? (
                          <span className={s.pairYours}>{copy.langs.yours}</span>
                        ) : (
                          <LandingLangButton lang={p.native} className={s.pairSwitch}>
                            {SWITCH_LABEL[p.native]}
                          </LandingLangButton>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* 1 · A1'den C1'e adım adım */}
              <section className={`${s.leg} ${s.swing}`} data-leg data-show={path.screen} aria-labelledby={`h-${path.id}`} id={path.id}>
                <PillarHead p={path} />
                <div className={s.body}>
                  <p className={s.lede}>{path.lede}</p>
                  <div className={s.steps}>
                    <p className={s.stepsLabel}>{path.stepsLabel}</p>
                    <ul className={s.chips}>
                      {path.steps.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  {path.more?.map((m) => <p key={m}>{m}</p>)}
                </div>
                <InlinePhone locale={locale} copy={copy} id={path.screen} caption={path.caption} />
              </section>

              {/* 2 · Konuşarak öğren */}
              <section className={s.leg} data-leg data-show={talk.screen} aria-labelledby={`h-${talk.id}`} id={talk.id}>
                <PillarHead p={talk} />
                <div className={s.body}>
                  <p className={s.lede}>{talk.lede}</p>
                  {talk.more?.map((m) => <p key={m}>{m}</p>)}
                  <figure className={s.talk}>
                    <figcaption className={s.talkHead}>
                      <span>{talk.label}</span>
                      <span>{talk.scene}</span>
                    </figcaption>
                    <ol className={s.talkList}>
                      <li className={s.fromAi}>
                        <p className={s.who}>
                          {talk.aiName} <span className={s.aiTag}>{talk.aiTag}</span>
                        </p>
                        <div className={s.bubble}>
                          <span lang={talk.lang}>{talk.ai1}</span>
                          <span className={s.gloss}>{talk.ai1Gloss}</span>
                        </div>
                      </li>
                      <li className={s.fromMe}>
                        <p className={s.who}>{talk.me}</p>
                        <div className={s.bubble}>
                          <span lang={talk.lang}>
                            {talk.mine.before}
                            <del>{talk.mine.wrong}</del> <ins>{talk.mine.right}</ins>
                            {talk.mine.after}
                            {talk.mine.wrong2 ? (
                              <>
                                <del>{talk.mine.wrong2}</del> <ins>{talk.mine.right2}</ins>
                                {talk.mine.after2}
                              </>
                            ) : null}
                          </span>
                          <span className={s.fix}>{talk.fix}</span>
                        </div>
                      </li>
                      <li className={s.fromAi}>
                        <p className={s.who}>
                          {talk.aiName} <span className={s.aiTag}>{talk.aiTag}</span>
                        </p>
                        <div className={s.bubble} lang={talk.lang}>
                          {talk.ai2}
                        </div>
                      </li>
                      <li className={s.hints}>
                        <p>{talk.hintsLabel}</p>
                        <ul lang={talk.lang}>
                          {talk.hints.map((h) => (
                            <li key={h}>{h}</li>
                          ))}
                        </ul>
                      </li>
                    </ol>
                  </figure>
                </div>
                <InlinePhone locale={locale} copy={copy} id={talk.screen} caption={talk.caption} />
              </section>

              {/* 3 · Deneme sınavları */}
              <section className={`${s.leg} ${s.swing}`} data-leg data-show={exam.screen} aria-labelledby={`h-${exam.id}`} id={exam.id}>
                <PillarHead p={exam} />
                <div className={s.body}>
                  <p className={s.lede}>{exam.lede}</p>
                  <div className={`${s.tableScroll} overflow-x-auto`}>
                  <table className={s.table}>
                    <thead>
                      <tr>
                        <th scope="col">{exam.head[0]}</th>
                        <th scope="col">{exam.head[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.rows.map((r) => (
                        <tr key={r.name}>
                          <th scope="row">
                            <span lang={r.nameLang}>{r.name}</span>
                            <span>{r.local}</span>
                          </th>
                          <td>{r.how}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                </div>
                <InlinePhone locale={locale} copy={copy} id={exam.screen} caption={exam.caption} />
              </section>

              {/* 4 · Cepte yürüyüş */}
              <section className={s.leg} data-leg data-show={walk.screen} aria-labelledby={`h-${walk.id}`} id={walk.id}>
                <PillarHead p={walk} />
                <div className={s.body}>
                  <p className={s.lede}>{walk.lede}</p>
                  <div className={s.cue} role="img" aria-label={walk.cueLabel}>
                    <div>
                      <small>{walk.heardLabel}</small>
                      <b>{walk.heard}</b>
                    </div>
                    <span className={s.cueGap} aria-hidden />
                    <div className={s.said}>
                      <small>{walk.saidLabel}</small>
                      <b lang={walk.saidLang}>{walk.said}</b>
                    </div>
                  </div>
                  <dl className={s.modes}>
                    {walk.modes.map((m) => (
                      <div key={m.when}>
                        <dt>{m.when}</dt>
                        <dd className={m.premium ? s.prem : undefined}>{m.what}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <InlinePhone locale={locale} copy={copy} id={walk.screen} caption={walk.caption} />
              </section>

              {/* 5 · Her gün birkaç dakika */}
              <section className={`${s.leg} ${s.swing}`} data-leg data-show={daily.screen} aria-labelledby={`h-${daily.id}`} id={daily.id}>
                <PillarHead p={daily} />
                <div className={s.body}>
                  <p className={s.lede}>{daily.lede}</p>
                  <p className={s.wordsLabel}>{daily.wordsLabel}</p>
                  <ul className={s.words} lang={daily.wordsLang}>
                    {daily.words.map((w) => (
                      <li key={w.word}>
                        {w.article ? <span className={s[w.article]}>{w.article} </span> : null}
                        {w.word}
                        <span className={s.wordGloss} lang={lang}>
                          {w.gloss}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {daily.wordsNote ? <p className={s.muted}>{daily.wordsNote}</p> : null}
                  {daily.more?.map((m) => <p key={m}>{m}</p>)}
                </div>
                <InlinePhone locale={locale} copy={copy} id={daily.screen} caption={daily.caption} />
              </section>

              {/* 6 · Beceriler */}
              <section className={s.leg} data-leg data-show={skills.screen} aria-labelledby={`h-${skills.id}`} id={skills.id}>
                <PillarHead p={skills} />
                <div className={s.body}>
                  <p className={s.lede}>{skills.lede}</p>
                  <ul className={s.chips}>
                    {skills.list.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <InlinePhone locale={locale} copy={copy} id={skills.screen} caption={skills.caption} />
              </section>
            </div>

            <aside className={s.dock} aria-label={copy.dockLabel}>
              <div className={s.dockInner}>
                <figure style={{ margin: 0 }}>
                  <Phone>
                    {DOCK.map((id, i) => {
                      const cap = id === "path" ? copy.heroCaption : [path, talk, exam, walk, daily, skills].find((p) => p.screen === id)?.caption ?? "";
                      return (
                        <div key={id} className={`${s.frame} ${i === 0 ? s.frameOn : ""}`} data-screen={id} data-cap={cap} aria-hidden={i === 0 ? "false" : "true"}>
                          <Shot locale={locale} id={id} alt={copy.alt[id]} eager={i === 0} />
                        </div>
                      );
                    })}
                  </Phone>
                  <figcaption className={s.dockCap}>{copy.heroCaption}</figcaption>
                </figure>
              </div>
            </aside>
          </div>
        </div>

        <section className={`${s.startGrid} ${s.wrap}`} aria-labelledby="h-start">
          <h2 className={s.startTitle} id="h-start">
            {copy.start.title}
          </h2>
          <div>
            <p className={s.startBody}>{copy.start.body}</p>
            {actions}
          </div>
        </section>

        <section className={`${s.plans} ${s.wrap}`} aria-labelledby="h-plans">
          <div className={s.plansHead}>
            <h2 id="h-plans">{copy.plans.title}</h2>
            <p>{copy.plans.sub}</p>
          </div>
          <div className={s.planGrid}>
            <div className={`${s.plan} ${s.planFree}`}>
              <h3>{copy.plans.freeTitle}</h3>
              <ul>
                {copy.plans.free.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className={s.earn}>{copy.plans.earn}</p>
            </div>
            <div className={`${s.plan} ${s.planPrem}`}>
              <h3>{copy.plans.premiumTitle}</h3>
              <p className={s.planSub}>{copy.plans.premiumSub}</p>
              <ul>
                {copy.plans.premium.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className={s.packs}>{copy.plans.packs}</p>
              <p className={s.trial}>{copy.plans.trial}</p>
            </div>
          </div>
        </section>

        <section className={`${s.fine} ${s.wrap}`}>
          <div>
            <h3>{copy.fine.accountTitle}</h3>
            {copy.fine.account.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
          <div>
            <h3>{copy.fine.certTitle}</h3>
            <p>{copy.fine.cert}</p>
            <p className={s.small}>{copy.fine.disclaimer}</p>
          </div>
        </section>
      </main>

      <footer className={s.footer}>
        <div className={`${s.wrap} ${s.foot}`}>
          <Link className={s.brand} href={landingPath(lang)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- küçük sabit PNG simge */}
            <img src="/logo-mark-68.png" width={34} height={34} alt="" loading="lazy" />
            Lernomi
          </Link>
          {/* Künye (LEG-5): ana sayfadan doğrudan erişilebilir; adı her dilde
              "Impressum". Hesap silme bağlantısı mağaza kuralı (Play hesap
              silme adresi). */}
          <ul className={s.footNav}>
            <li>
              <Link href={legalPath("privacy", lang)} prefetch={false}>
                {t("auth.privacy_policy")}
              </Link>
            </li>
            <li>
              <Link href={legalPath("terms", lang)} prefetch={false}>
                {t("auth.terms_of_use")}
              </Link>
            </li>
            <li>
              <Link href={legalPath("support", lang)} prefetch={false}>
                {t("land.support")}
              </Link>
            </li>
            <li>
              <Link href="/account/delete" prefetch={false}>
                {t("land.delete_account")}
              </Link>
            </li>
            <li>
              <Link href={legalPath("impressum", lang)} prefetch={false}>
                Impressum
              </Link>
            </li>
          </ul>
          {/* Sayfanın dili: diller KENDİ adlarıyla (LangSetting ile aynı). */}
          <div className={s.langs} role="group" aria-label={copy.langs.langNav}>
            {NATIVE_LANGS.filter((l) => offered.has(l)).map((l) =>
              l === lang ? (
                <span key={l} lang={l} aria-current="true" className={s.langOn}>
                  {LANG_LABEL[l]}
                </span>
              ) : (
                <LandingLangButton key={l} lang={l} className={s.langBtn}>
                  {LANG_LABEL[l]}
                </LandingLangButton>
              ),
            )}
          </div>
          <p className={s.copy}>© Lernomi</p>
        </div>
      </footer>

      <LandingMotion scopeId={SCOPE_ID} classes={MOTION_CLASSES} />
    </div>
  );
}
