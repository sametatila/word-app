import Link from "next/link";
import type { ReactNode } from "react";
import { DocHeader } from "@/components/legal-shell";
import { getLang, getT } from "@/lib/i18n/server";
import {
  LEGAL_DEFAULT_LOCALE,
  isLegalLocale,
  isLegalOmitted,
  isLegalPlaceholder,
  legalPath,
  type LegalLocale,
} from "@/lib/legal";
import { legalConfig } from "@/lib/legal/config";
import { DeleteLanguageRow } from "./language-row";

/**
 * /account/delete — GİRİŞ YAPMAMIŞ ziyaretçinin gördüğü sayfa.
 *
 * NEDEN BU KADAR UZUN. Bu adres Play Console'a "hesap silme web kaynağı" olarak
 * veriliyor ve inceleyici onu oturumsuz açıyor. Sayfa eskiden yalnız "önce
 * giriş yap" ve uygulama içi yolu gösteriyordu; Play'in kuralı ise daha
 * fazlasını istiyor (mağaza ön inceleme raporu B17): uygulamanın ya da
 * geliştiricinin adı, silme yolunun belirgin adımları, silinen ve saklanan veri
 * türleri ile saklama süreleri, abonelik iptali gibi ek adımlar ve giriş
 * yapamayan kullanıcı için bir destek yolu. Sırası da o kuralın sırası: önce
 * adımlar, sonra ek adım, sonra veri.
 *
 * İÇERİK UYDURULMUYOR, üç kaynaktan geliyor:
 *
 *   - Silinenler `lib/account/purge.ts`in gerçekten sildiği tabloların
 *     kullanıcının tanıyacağı kümeleri (aşağıdaki `DELETED` notu). Gizlilik
 *     politikası §11'in saydıklarının (hesap, ilerleme, yazılar, konuşma
 *     kayıtları, kullanım olayları, sosyal izler) hepsi burada da var.
 *   - Saklananlar purge.ts'in anonimleştirdikleri ve politika §9 ile §11'in
 *     süreleri; e-posta başvurusunun kanalı ve süresi politika §10.
 *   - E-posta adresleri, yedek süresi, kimlik ve platformlar hukuki
 *     yapılandırmadan (`legalConfig`). `LEGAL_ENTITY`yi doğrudan okumak
 *     yetmiyordu: panelden bir alan değişirse gizlilik politikası yeni değeri,
 *     bu sayfa kodun eski değerini basardı. `legalConfig` panel kaydı yoksa
 *     zaten `LEGAL_ENTITY`ye düşüyor ve veritabanı okunamazsa patlamıyor —
 *     Play'e verilmiş bir adresin 500 vermemesi burada da şart.
 *
 * DİL, sitenin girişsiz yüzeyleri gibi çerezden ya da tarayıcının dilinden
 * (`getLang`). /privacy ve /support'un alt yol düzeni burada yok, çünkü
 * silme adresi her dilde tek (`legalPath("deleteAccount", …)`); dil satırı
 * aynı çerezi yazıyor (bkz. `language-row`).
 */

/**
 * Google Play aboneliklerinin web adresi. Destek sayfasının metni
 * (`content/legal/defaults/support.ts`) kullanıcıyı aynı adrese yolluyor; iki
 * yüzeyin iki ayrı yer göstermemesi için aynı adres.
 */
const PLAY_SUBSCRIPTIONS_URL = "https://play.google.com/store/account/subscriptions";

type Row = { titleKey: string; descKey: string };

/**
 * Silinen veri — `purgeUserData`in tablo tablo sildiklerinin kümelenmiş hâli.
 * Tablo adı kullanıcıya bir şey söylemiyor; kümeler söylüyor. Eşleme:
 *
 *   hesap ve giriş       Better Auth `user`, FK ile `session` (IP, cihaz
 *                        tanımı), `account` (parola özeti, Google/Apple bağı)
 *   profil ve tercihler  `profiles` (görünen ad, avatar, seviye, kurs, hedef,
 *                        sosyal profil, hatırlatma tercihleri, saat dilimi)
 *   öğrenme verisi       `user_words`, `reviews`, `daily_stats`, `user_skills`,
 *                        `user_path_items`, `session_state`, `daily_scores`,
 *                        `quest_claims`, `achievements`, `module_clears`,
 *                        `user_lessons`, `placements`, `exams`,
 *                        `mock_exam_attempts`, `league_members`
 *   yazılanlar           `assessments`, `roleplay_logs`
 *   kullanım kayıtları   `events`, `ai_usage`, `usage_counters`, `rate_limits`
 *   sosyal izler         `friendships`, `user_blocks`, `user_reports`,
 *                        `event_reactions`, `activity_events`, `nudges`,
 *                        `friend_quests`, `social_notifications`
 *   bildirim ve izinler  `device_tokens`, `push_subscriptions`, `user_consents`
 *   premium              `entitlements`, `promo_redemptions`
 *
 * purge.ts'e yeni bir tablo girerse (`check:purge` bunu zorunlu kılıyor) ve
 * bu kümelerin hiçbirine oturmuyorsa buraya da bir satır gerekir.
 */
const DELETED: Row[] = [
  { titleKey: "del.d_account", descKey: "del.d_account_body" },
  { titleKey: "del.d_profile", descKey: "del.d_profile_body" },
  { titleKey: "del.d_learning", descKey: "del.d_learning_body" },
  { titleKey: "del.d_texts", descKey: "del.d_texts_body" },
  { titleKey: "del.d_usage", descKey: "del.d_usage_body" },
  { titleKey: "del.d_social", descKey: "del.d_social_body" },
  { titleKey: "del.d_devices", descKey: "del.d_devices_body" },
  { titleKey: "del.d_premium", descKey: "del.d_premium_body" },
];

/**
 * Panelden gelen alan sayfaya basılabilir mi. Yer tutucu (`[[…]]`) hukuki
 * sayfalarda yayın öncesi gözden kaçmasın diye vurguyla basılıyor; bu sayfa
 * ise kullanıcıya bir SÖZ veriyor ve "en geç [[…]] gün" ya da tıklanamayan bir
 * adres sözün kendisini bozar. Dolmamış alanın satırı hiç basılmıyor.
 */
function usable(value: string): boolean {
  return !isLegalOmitted(value) && !isLegalPlaceholder(value);
}

function isEmail(value: string): boolean {
  return usable(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Numaralı adım listesi — kurulum rehberinin (`install-guide`) adım görünümüyle
 * aynı. Numara ekran okuyucudan GİZLENMİYOR: liste işareti kapalı olunca
 * Safari listenin kendisini liste saymayabiliyor ve sıra yalnız bu rakamla
 * duyuluyor.
 */
function Steps({ steps }: { steps: ReactNode[] }) {
  return (
    <ol className="mt-3 space-y-2.5">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-2.5 text-body">
          <span className="surface-2 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-micro tabular-nums">
            {i + 1}
          </span>
          <span className="min-w-0">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export async function DeleteAccountInfo() {
  const [t, lang, cfg] = await Promise.all([getT(), getLang(), legalConfig()]);
  const locale: LegalLocale = isLegalLocale(lang) ? lang : LEGAL_DEFAULT_LOCALE;
  const e = cfg.entity;

  /*
    KİMLİK: Play kuralı mağaza listesindeki uygulama ya da geliştirici adını
    istiyor. Uygulama adı başlıkta; yayıncı mağaza hesabının sahibi, veri
    sorumlusu silme kararının sahibi. İkisi de gizlilik politikası §1'de aynı
    rollerle yazılı.
  */
  const identity = [
    { label: t("del.publisher"), value: e.publisherName },
    { label: t("del.controller"), value: e.controllerName },
  ].filter((x) => usable(x.value));

  /*
    SON ADIM İKİ YOLDA DA AYNI ve düğmenin adı ARAYÜZÜN KENDİ ETİKETİNDEN
    geliyor: metin "Kalıcı olarak sil"e bas derken düğme başka bir şey
    yazıyorsa inceleyici yolu izleyemez. Web formu da Android ekranı da aynı
    anahtarı basıyor.
  */
  const confirmStep = t("del.step_confirm", { button: t("deleteaccount.permanently_delete_my_account") });

  /*
    E-POSTA YOLU politika §10'un başvuru kanalı: KVKK talepleri bir adrese,
    GDPR talepleri ötekine; kimlik doğrulaması için hesaptaki adresten yazmak
    yeterli. Sıra hukuki metinlerle aynı: Türkçe sayfa KVKK adresini, İngilizce
    ve Almanca sayfa GDPR adresini öne alıyor (`LEGAL_ENTITY` notu). İki adres
    de kullanılamaz hâldeyse destek adresi tek başına kalıyor; giriş
    yapamayanın hiç yolu kalmaması, Play kuralının tam olarak yasakladığı şey.
  */
  const kvkk = { label: t("del.help_kvkk"), email: e.privacyEmailTr.trim() };
  const gdpr = { label: t("del.help_gdpr"), email: e.privacyEmailEu.trim() };
  let addresses = (locale === "tr" ? [kvkk, gdpr] : [gdpr, kvkk]).filter((a) => isEmail(a.email));
  if (!addresses.length && isEmail(e.supportEmail)) {
    addresses = [{ label: t("land.support"), email: e.supportEmail.trim() }];
  }
  const subject = encodeURIComponent(t("del.help_subject"));

  /*
    MAĞAZA ADI İKİSİ BİRDEN yazılıyor. Web aboneliğin hangi mağazadan
    alındığını bilmiyor (bu yüzden girişli formdaki uyarı mağaza adsız); bu
    sayfa ise hiç oturum görmüyor, yani iki yolu da adıyla göstermek doğru.
    Cümleler mobil sözlükten: uygulamadaki silme ekranı aynı cümleyi basıyor.
    App Store satırı hukuki metinlerin iOS bayrağına bağlı.
  */
  const stores = [
    cfg.platforms.android ? { key: "play", text: t("deleteaccount.subscription_cancel_play"), href: PLAY_SUBSCRIPTIONS_URL } : null,
    cfg.platforms.ios ? { key: "appstore", text: t("deleteaccount.subscription_cancel_appstore"), href: null } : null,
  ].filter((s) => s !== null);

  /*
    SAKLANANLAR — silmeden sonra kalan her şey, süresiyle:
      mali kayıtlar     purge `premium_grants`i anonimleştiriyor; süre §9
      içerik bildirimi  purge AÇIK bildirimi anonimleştiriyor, kapanmışı siliyor;
                        süre §3 ("inceleme kapanana kadar")
      yedekler          süre yapılandırmadan, cümle §9
      yazışmalar        e-postayla gelen talep veritabanında değil, posta
                        kutusunda; süre §3 ve §9
    Yedek süresi alanı boş ya da yer tutucuysa satır basılmıyor (bkz. `usable`).

    `referrals` BURADA YOK ve bilerek: purge o satırda yalnız bu kullanıcının
    tarafını boşaltıyor, kalan kayıt karşı tarafın ödülü ve silinen kişiye
    bağlanmıyor. Politikada da bir saklama kalemi olarak geçmiyor; buraya
    süresiz bir satır yazmak politikada olmayan bir söz vermek olurdu.
  */
  const kept = [
    { title: t("del.k_financial"), body: t("del.k_financial_body") },
    { title: t("del.k_reports"), body: t("del.k_reports_body") },
    ...(usable(e.backupRetentionDays)
      ? [{ title: t("del.k_backups"), body: t("del.k_backups_body", { days: e.backupRetentionDays }) }]
      : []),
    { title: t("del.k_mail"), body: t("del.k_mail_body") },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <DocHeader locale={locale} />
      <main>
        <h1 className="text-display tracking-tight">{t("del.title")}</h1>
        {identity.length ? (
          <dl className="muted mt-2 flex flex-wrap gap-x-4 gap-y-1 text-body">
            {identity.map((x) => (
              <div key={x.label} className="flex gap-1.5">
                <dt>{x.label}:</dt>
                <dd className="font-semibold text-[var(--text)]">{x.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <DeleteLanguageRow />
        <p className="mt-5 text-body">{t("del.intro")}</p>

        <section className="mt-10">
          <h2 className="text-h2">{t("del.how_title")}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="card p-4">
              <h3 className="text-h3">{t("del.in_app_title")}</h3>
              <Steps
                steps={[
                  t("del.app_step_open"),
                  <>
                    {t("del.app_step_path")} <strong>{t("del.in_app_path")}</strong>
                  </>,
                  confirmStep,
                ]}
              />
            </div>

            <div className="card flex flex-col p-4">
              <h3 className="text-h3">{t("del.on_web_title")}</h3>
              <Steps steps={[t("del.web_step_sign_in"), t("del.web_step_return"), confirmStep]} />
              {/* Düğme kartın dibinde: iki kart aynı boyda duruyor ve adımlar
                  yan yana okunurken düğme adımların arasına girmiyor. Dönüş
                  adresi aynı sayfa — giriş formu yalnız site içi yolu kabul
                  ediyor (`auth-form` `next`). */}
              <div className="mt-auto pt-4">
                <Link href={`/login?next=${legalPath("deleteAccount")}`} className="btn btn-primary w-full px-5 py-4">
                  {t("del.sign_in_cta")}
                </Link>
              </div>
            </div>

            <div className="card p-4 sm:col-span-2">
              <h3 className="text-h3">{t("del.help_title")}</h3>
              <p className="mt-2 text-body">
                {t("del.help_forgot")}{" "}
                <Link href="/forgot-password" prefetch={false} className="font-semibold underline underline-offset-4">
                  {t("del.help_reset_link")}
                </Link>
              </p>
              {addresses.length ? (
                <>
                  <p className="mt-3 text-body">{t("del.help_email")}</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {addresses.map((a) => (
                      <li key={a.email} className="surface-2 rounded-panel px-4 py-3">
                        <p className="muted text-caption">{a.label}</p>
                        <a href={`mailto:${a.email}?subject=${subject}`} className="text-strong break-all underline underline-offset-4">
                          {a.email}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="muted mt-3 text-body">{t("del.help_deadline")}</p>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {stores.length ? (
          <section className="mt-10">
            <h2 className="text-h2">{t("del.subs_title")}</h2>
            <ul className="card mt-3 divide-y divide-[color:var(--border)] overflow-hidden">
              {stores.map((s) => (
                <li key={s.key} className="px-4 py-3">
                  <p className="text-body">{s.text}</p>
                  {s.href ? (
                    <a href={s.href} rel="noopener noreferrer" className="mt-1 inline-block text-strong underline underline-offset-4">
                      {t("del.subs_play_link")}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-h2">{t("del.deleted_title")}</h2>
          <p className="muted mt-1 text-body">{t("del.deleted_sub")}</p>
          <ul className="card mt-3 divide-y divide-[color:var(--border)] overflow-hidden">
            {DELETED.map((row) => (
              <li key={row.titleKey} className="px-4 py-3">
                <p className="text-strong">{t(row.titleKey)}</p>
                <p className="muted mt-0.5 text-body">{t(row.descKey)}</p>
              </li>
            ))}
          </ul>
          <p className="muted mt-3 text-body">{t("del.d_local")}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-h2">{t("del.kept_title")}</h2>
          <ul className="card mt-3 divide-y divide-[color:var(--border)] overflow-hidden">
            {kept.map((row) => (
              <li key={row.title} className="px-4 py-3">
                <p className="text-strong">{row.title}</p>
                <p className="muted mt-0.5 text-body">{row.body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Politikadaki başlıkların çapası yok (`lib/legal/markdown` başlığa
            kimlik vermiyor), bu yüzden bağlantı sayfanın başına gidiyor ve
            bölüm numaraları metinde yazılı. Dil, bu sayfanın diliyle aynı. */}
        <p className="muted mt-10 text-body">
          {t("del.policy_note")}{" "}
          <Link
            href={legalPath("privacy", locale)}
            prefetch={false}
            className="font-semibold text-[var(--text)] underline underline-offset-4"
          >
            {t("del.policy_link")}
          </Link>
        </p>
      </main>
    </div>
  );
}
