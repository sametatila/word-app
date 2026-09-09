import Link from "next/link";
import { DocHeader, EntityBlock, LegalStyles, Ph } from "@/components/legal-shell";
import { LEGAL_ENTITY, LEGAL_LOCALES, hasIos, legalPath, type LegalLocale } from "@/lib/legal";

/**
 * Destek ve iletişim sayfası — /support, /support/en, /support/de.
 *
 * NEDEN VAR. İki ayrı zorunluluğu aynı yüzey karşılıyor:
 *
 *   1. App Store Connect'in **Support URL** alanı zorunlu ve inceleyen o adresi
 *      açıp destek bilgisi arıyor. Alan bugüne kadar ana sayfayı gösteriyordu
 *      (`docs/appstore/listing.md` §5) ama ana sayfada iletişim bilgisi YOKTU;
 *      adres yalnız gizlilik politikası ve şartların içinde geçiyordu.
 *   2. **Guidelines 1.2**, kullanıcı içeriği taşıyan uygulamalardan filtreleme,
 *      bildirme ve engellemenin YANINDA "yayımlanmış iletişim bilgisi" de
 *      istiyor. Bildirme ve engelleme uygulamada vardı, dördüncüsü eksikti.
 *
 * NEDEN HUKUKİ SAYFA DEĞİL. `LegalShell` kullanılmıyor: o kabuk yürürlük
 * tarihi, sürüm numarası ve sürüm geçmişi basıyor — destek sayfasının hiçbiri
 * yok, çünkü bu bir sözleşme değil. Ortak olan yalnız üst şerit, dil seçici ve
 * tipografi; üçü de `legal-shell`ten alınıyor.
 *
 * METİN ÜÇ DİLDE BURADA. Gizlilik ve şartlar gibi ayrı dosyalara bölünmedi:
 * sayfa kısa ve satırların çoğu ortak (aynı adresler, aynı yollar). Bölmek,
 * bir adres değiştiğinde üç dosyayı birden hatırlamayı gerektirirdi.
 */

type Row = { need: string; answer: React.ReactNode };

type Copy = {
  title: string;
  description: string;
  intro: string;
  contactLabel: string;
  responseNote: string;
  routeTitle: string;
  rows: Row[];
  whoTitle: string;
  whoNote: string;
  inAppTitle: string;
  inApp: React.ReactNode[];
  languageLabel: string;
  names: Record<LegalLocale, string>;
};

/** Mağaza satırı iOS bayrağına bağlı: yayımlanmamış mağazayı yol olarak göstermeyiz. */
const storeAnswer = {
  tr: (
    <>
      Abonelik satın alma, yenileme, iptal ve iade işlemleri mağaza üzerinden yürür; bunları biz
      işleyemiyoruz. Android&apos;de{" "}
      <a href="https://play.google.com/store/account/subscriptions">Play &rsaquo; Abonelikler</a>
      {hasIos() ? (
        <>
          , iOS&apos;ta Ayarlar &rsaquo; Apple Hesabı &rsaquo; Abonelikler ve iade için{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>
        </>
      ) : null}
      . Mağaza tarafında çözülmeyen bir durumda bize yaz, elimizden geleni yaparız.
    </>
  ),
  en: (
    <>
      Buying, renewing, cancelling and refunding a subscription is handled by the store; we cannot
      process these ourselves. On Android:{" "}
      <a href="https://play.google.com/store/account/subscriptions">Play &rsaquo; Subscriptions</a>
      {hasIos() ? (
        <>
          ; on iOS: Settings &rsaquo; Apple Account &rsaquo; Subscriptions, and{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a> for refunds
        </>
      ) : null}
      . If the store does not resolve it, write to us and we will do what we can.
    </>
  ),
  de: (
    <>
      Kauf, Verlängerung, Kündigung und Erstattung eines Abonnements wickelt der Store ab; wir
      können das nicht selbst bearbeiten. Unter Android:{" "}
      <a href="https://play.google.com/store/account/subscriptions">Play &rsaquo; Abonnements</a>
      {hasIos() ? (
        <>
          ; unter iOS: Einstellungen &rsaquo; Apple-Account &rsaquo; Abonnements, für Erstattungen{" "}
          <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>
        </>
      ) : null}
      . Löst der Store es nicht, schreib uns — wir tun, was wir können.
    </>
  ),
} as const;

const mail = (address: string) => <a href={`mailto:${address}`}>{address}</a>;

const COPY: Record<LegalLocale, Copy> = {
  tr: {
    title: "Destek ve iletişim",
    description:
      "Lernomi'ye nasıl ulaşacağın: destek adresi, yanıt süresi, hangi konu için hangi kanal, ve uygulama içindeki bildirme ve engelleme yolları.",
    intro:
      "Bir sorun mu var, bir şey mi soracaksın? Buradan bize ulaşabilirsin. Gelen her mesaba bir insan bakıyor; otomatik yanıt kullanmıyoruz.",
    contactLabel: "Destek e-postası",
    responseNote:
      "Yanıt süresi: en geç {n} iş günü. Veri koruma başvuruları bunun dışında ve süresi kanunla belirli — aşağıdaki satıra bak.",
    routeTitle: "Ne için nereye yazmalı",
    rows: [
      {
        need: "Uygulamada bir sorun, hata ya da önerin var",
        answer: <>Destek adresine yaz. Hangi cihazı ve uygulama sürümünü kullandığını eklersen çok yardımcı olur (Profil &rsaquo; Ayarlar&apos;ın en altında yazıyor).</>,
      },
      {
        need: "Hesabını ve verilerini silmek istiyorsun",
        answer: (
          <>
            Kendin yapabilirsin: uygulamada Profil &rsaquo; Ayarlar &rsaquo; Hesap &rsaquo; Hesabı sil,
            ya da web&apos;de <Link href={legalPath("deleteAccount")}>hesap silme sayfası</Link>. Silme
            geri alınamaz ve mağaza aboneliğini ayrıca iptal etmen gerekir.
          </>
        ),
      },
      {
        need: "Verilerine erişmek, düzeltmek ya da silinmesini istemek (KVKK / GDPR)",
        answer: (
          <>
            Türkiye&apos;den KVKK başvuruları: <Ph k="privacyEmailTr" />. AB, AEA ve Birleşik
            Krallık&apos;tan GDPR başvuruları: <Ph k="privacyEmailEu" />. Hesabındaki e-posta
            adresinden yazman kimlik doğrulaması için yeterli. Süreler ve hakların{" "}
            <Link href={legalPath("privacy")}>gizlilik politikasının</Link> 10. bölümünde.
          </>
        ),
      },
      { need: "Abonelik, ödeme ya da iade", answer: storeAnswer.tr },
      {
        need: "Uygunsuz bir içeriği ya da bir kullanıcıyı bildirmek istiyorsun",
        answer: (
          <>
            En hızlısı uygulamanın içinden: yapay zekâ yanıtlarının altındaki <strong>Bildir</strong>,
            kullanıcılar için profildeki <strong>Bildir</strong> ve <strong>Engelle</strong>.
            Bildirimlere insan bakıyor. Acil ya da ciddi bir durumda doğrudan destek adresine de
            yazabilirsin.
          </>
        ),
      },
      {
        need: "Basın, iş birliği ya da hukuki bildirim",
        answer: <>Destek adresine yaz, doğru kişiye ulaştırırız. Hukuki tebligat için aşağıdaki yazışma adresi geçerlidir.</>,
      },
    ],
    whoTitle: "Kime yazıyorsun",
    whoNote:
      "Uygulamayı mağazalarda yayımlayan ve destek yükümlülüğünü taşıyan taraf. Veri sorumlusu ayrı bir kişidir ve gizlilik politikasının 1. bölümünde yazılıdır.",
    inAppTitle: "Uygulamanın içinden",
    inApp: [
      <>Bu sayfaya uygulamadan da ulaşabilirsin: Profil &rsaquo; Ayarlar &rsaquo; Destek ve iletişim.</>,
      <>Yapay zekâ karakterleri gerçek kişi değildir; bu, konuşmanın başında ve ekranda kalıcı olarak yazılıdır.</>,
      <>Engellediğin bir kullanıcıyla birbirinizi görmezsiniz; engelleme ve bildirim karşı tarafa gösterilmez.</>,
    ],
    languageLabel: "Dil",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
  },

  en: {
    title: "Support and contact",
    description:
      "How to reach Lernomi: the support address, response time, which channel for which topic, and the in-app reporting and blocking paths.",
    intro:
      "Something wrong, or a question? This is how you reach us. A person reads every message; we do not use automated replies.",
    contactLabel: "Support e-mail",
    responseNote:
      "Response time: within {n} business days. Data-protection requests are separate and have statutory deadlines — see the row below.",
    routeTitle: "What to write where",
    rows: [
      {
        need: "You hit a problem or bug, or have a suggestion",
        answer: <>Write to the support address. Telling us your device and app version helps a lot (it is at the bottom of Profile &rsaquo; Settings).</>,
      },
      {
        need: "You want to delete your account and data",
        answer: (
          <>
            You can do it yourself: in the app, Profile &rsaquo; Settings &rsaquo; Account &rsaquo;
            Delete account, or on the web the{" "}
            <Link href={legalPath("deleteAccount")}>account deletion page</Link>. Deletion cannot be
            undone, and you must cancel a store subscription separately.
          </>
        ),
      },
      {
        need: "You want to access, correct or erase your data (KVKK / GDPR)",
        answer: (
          <>
            KVKK requests from Türkiye: <Ph k="privacyEmailTr" />. GDPR and UK GDPR requests from the
            EU, EEA and the United Kingdom: <Ph k="privacyEmailEu" />. Writing from the e-mail
            address on your account is enough to verify your identity. Deadlines and your rights are
            in section 10 of the <Link href={legalPath("privacy", "en")}>privacy policy</Link>.
          </>
        ),
      },
      { need: "Subscription, payment or refund", answer: storeAnswer.en },
      {
        need: "You want to report objectionable content or a user",
        answer: (
          <>
            Fastest from inside the app: <strong>Report</strong> under AI replies, and{" "}
            <strong>Report</strong> and <strong>Block</strong> on a user&apos;s profile. Reports are
            reviewed by a person. For anything urgent or serious you can also write to support
            directly.
          </>
        ),
      },
      {
        need: "Press, partnership or legal notice",
        answer: <>Write to the support address and we will route it. For formal legal service, the postal address below applies.</>,
      },
    ],
    whoTitle: "Who you are writing to",
    whoNote:
      "The party that publishes the app in the stores and carries the support obligation. The data controller is a different person and is named in section 1 of the privacy policy.",
    inAppTitle: "From inside the app",
    inApp: [
      <>You can reach this page from the app too: Profile &rsaquo; Settings &rsaquo; Support and contact.</>,
      <>AI characters are not real people; this is stated at the start of a conversation and stays visible on screen.</>,
      <>If you block someone, neither of you sees the other; blocks and reports are never shown to the other party.</>,
    ],
    languageLabel: "Language",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
  },

  de: {
    title: "Support und Kontakt",
    description:
      "So erreichst du Lernomi: Support-Adresse, Antwortzeit, welcher Kanal für welches Thema, und die Melde- und Blockierwege in der App.",
    intro:
      "Etwas funktioniert nicht, oder du hast eine Frage? So erreichst du uns. Jede Nachricht liest ein Mensch; automatische Antworten gibt es nicht.",
    contactLabel: "Support-E-Mail",
    responseNote:
      "Antwortzeit: innerhalb von {n} Werktagen. Datenschutzanfragen sind davon ausgenommen und haben gesetzliche Fristen — siehe die Zeile unten.",
    routeTitle: "Was gehört wohin",
    rows: [
      {
        need: "Du hast ein Problem, einen Fehler oder einen Vorschlag",
        answer: <>Schreib an die Support-Adresse. Gerät und App-Version helfen sehr (sie stehen unten in Profil &rsaquo; Einstellungen).</>,
      },
      {
        need: "Du möchtest dein Konto und deine Daten löschen",
        answer: (
          <>
            Das kannst du selbst: in der App Profil &rsaquo; Einstellungen &rsaquo; Konto &rsaquo;
            Konto löschen, oder im Web über die{" "}
            <Link href={legalPath("deleteAccount")}>Seite zur Kontolöschung</Link>. Die Löschung ist
            endgültig, und ein Store-Abonnement musst du zusätzlich kündigen.
          </>
        ),
      },
      {
        need: "Du möchtest auf deine Daten zugreifen, sie berichtigen oder löschen lassen (DSGVO / KVKK)",
        answer: (
          <>
            KVKK-Anträge aus der Türkei: <Ph k="privacyEmailTr" />. DSGVO- und UK-GDPR-Anträge aus
            der EU, dem EWR und dem Vereinigten Königreich: <Ph k="privacyEmailEu" />. Es genügt,
            von der E-Mail-Adresse deines Kontos zu schreiben. Fristen und Rechte stehen in
            Abschnitt 10 der <Link href={legalPath("privacy", "de")}>Datenschutzerklärung</Link>.
          </>
        ),
      },
      { need: "Abonnement, Zahlung oder Erstattung", answer: storeAnswer.de },
      {
        need: "Du möchtest anstößige Inhalte oder eine Person melden",
        answer: (
          <>
            Am schnellsten in der App: <strong>Melden</strong> unter KI-Antworten sowie{" "}
            <strong>Melden</strong> und <strong>Blockieren</strong> im Profil einer Person. Meldungen
            prüft ein Mensch. In dringenden oder ernsten Fällen kannst du auch direkt an den Support
            schreiben.
          </>
        ),
      },
      {
        need: "Presse, Kooperation oder rechtliche Mitteilung",
        answer: <>Schreib an die Support-Adresse, wir leiten es weiter. Für förmliche Zustellungen gilt die Postanschrift unten.</>,
      },
    ],
    whoTitle: "An wen du schreibst",
    whoNote:
      "Die Partei, die die App in den Stores veröffentlicht und die Supportpflicht trägt. Der Verantwortliche im Datenschutzsinn ist eine andere Person und in Abschnitt 1 der Datenschutzerklärung genannt.",
    inAppTitle: "Aus der App heraus",
    inApp: [
      <>Diese Seite erreichst du auch aus der App: Profil &rsaquo; Einstellungen &rsaquo; Support und Kontakt.</>,
      <>KI-Figuren sind keine echten Personen; das steht zu Beginn eines Gesprächs und bleibt auf dem Bildschirm sichtbar.</>,
      <>Wenn du jemanden blockierst, seht ihr euch gegenseitig nicht mehr; Blockierungen und Meldungen werden der anderen Seite nie angezeigt.</>,
    ],
    languageLabel: "Sprache",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
  },
};

export function supportCopy(locale: LegalLocale): Copy {
  return COPY[locale];
}

export function SupportPage({ locale }: { locale: LegalLocale }) {
  const c = COPY[locale];
  const [before, after] = c.responseNote.split("{n}");
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <DocHeader locale={locale} />
      <h1 className="text-3xl font-extrabold tracking-tight">{c.title}</h1>
      <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span>{c.languageLabel}:</span>
        {LEGAL_LOCALES.map((l) =>
          l === locale ? (
            <span key={l} className="font-semibold text-[var(--text)]">{c.names[l]}</span>
          ) : (
            <Link key={l} href={legalPath("support", l)} hrefLang={l} className="underline-offset-4 hover:underline">
              {c.names[l]}
            </Link>
          ),
        )}
      </p>

      {/* İletişim kutusu sayfanın EN ÜSTÜNDE ve tek işi adresi görünür kılmak:
          inceleyen de kullanıcı da aradığı şeyi kaydırmadan bulmalı. */}
      <div className="card mt-6 p-5">
        <p className="muted text-xs font-semibold uppercase tracking-wide">{c.contactLabel}</p>
        <p className="mt-1 text-xl font-bold">
          <a href={`mailto:${LEGAL_ENTITY.supportEmail}`} className="underline-offset-4 hover:underline">
            {LEGAL_ENTITY.supportEmail}
          </a>
        </p>
        <p className="muted mt-2 text-sm">
          {before}
          <strong>{LEGAL_ENTITY.supportResponseDays}</strong>
          {after}
        </p>
      </div>

      <article className="legal mt-8">
        <p>{c.intro}</p>

        <h2>{c.routeTitle}</h2>
        <div className="tablewrap">
          <table>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.need}>
                  <th scope="row" style={{ width: "34%", textTransform: "none", fontSize: "0.9rem", color: "var(--text)" }}>
                    {r.need}
                  </th>
                  <td>{r.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>{c.whoTitle}</h2>
        <EntityBlock party="publisher" locale={locale} />
        <p>{c.whoNote}</p>
        <p>{mail(LEGAL_ENTITY.supportEmail)}</p>

        <h2>{c.inAppTitle}</h2>
        <ul>
          {c.inApp.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </article>
      <LegalStyles />
    </div>
  );
}
