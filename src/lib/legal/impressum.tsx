import Link from "next/link";
import { LEGAL_LOCALES, isLegalOmitted, isLegalPlaceholder, legalPath, type LegalLocale } from "./index";
import type { LegalConfig } from "./shape";

/**
 * Künye (Impressum) — §5 DDG ve §18 Abs. 2 MStV.
 *
 * NEDEN VAR. Veri sorumlusu Dortmund'da yerleşik ve Premium ücretli; yani
 * Almanya'dan sunulan, ticari ("geschäftsmäßig") bir dijital hizmet. §5 DDG
 * böyle bir hizmetten "kolay tanınır, doğrudan erişilebilir ve sürekli mevcut"
 * bir künye istiyor: ad, çağrılabilir adres, e-posta ve hızlı ikinci bir
 * iletişim yolu. 2026-09-23'e kadar yoktu (/impressum 404, denetim LEG-5).
 *
 * VERİ KODDA YAZILMIYOR. Ad ve adresler `LEGAL_ENTITY`den, panelden
 * değiştirilmişse oradan (`legalConfig().entity`) geliyor; gizlilik
 * politikasıyla künyenin farklı adres söylemesinin tek yolu iki kopya
 * tutmaktı. Buradaki metinler yalnız ETİKET.
 *
 * NEDEN MARKDOWN DEĞİL. Öteki üç belge panelden düzenlenen markdown; künye
 * bir metin değil, alanlardan kurulan bir kimlik beyanı ve alanlar zaten
 * panelde düzenleniyor. Serbest metin olsaydı panelden adres silinip sayfada
 * eski adres kalabilirdi.
 *
 * BİLEREK YAZILMAYANLAR (uydurma veri yok):
 *   - USt-IdNr.: depoda yok. TODO(Samet): varsa `LEGAL_ENTITY`ye ekle, satır
 *     buraya eklenir. Küçük işletme (§19 UStG) ise gerekmez.
 *   - Telefon / iletişim formu: yok. §5(1) Nr.2 DDG e-postanın YANINDA hızlı,
 *     doğrudan ikinci bir iletişim yolu istiyor (ABAD C-298/07: form da
 *     olabilir). Destek sayfası yalnız aynı e-postayı veriyor.
 *     TODO(Samet): telefon numarası ya da destek sayfasına iletişim formu.
 *   - Tüketici uyuşmazlık (§36 VSBG) beyanı: katılma/katılmama kararı
 *     Samet'in. 10'dan az çalışanlı işletmede beyan zorunlu değil.
 *     TODO(Samet): karar verilirse buraya bir paragraf.
 *   - AB ODR platformu bağlantısı: platform 20.07.2025'te kapatıldı
 *     (Tüzük (AB) 2024/3228); bağlantı artık istenmiyor.
 */

type Labels = {
  title: string;
  description: string;
  lead: string;
  provider: string;
  contact: string;
  email: string;
  privacyEmail: string;
  supportPage: string;
  supportPageText: string;
  responsible: string;
  publisher: string;
  publisherNote: string;
  playName: string;
  more: string;
  privacy: string;
  terms: string;
  languageLabel: string;
  names: Record<LegalLocale, string>;
  translation: string;
};

export const IMPRESSUM_TEXT: Record<LegalLocale, Labels> = {
  de: {
    title: "Impressum",
    description: "Anbieterkennzeichnung von Lernomi nach § 5 DDG und § 18 MStV.",
    lead: "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)",
    provider: "Diensteanbieter",
    contact: "Kontakt",
    email: "E-Mail",
    privacyEmail: "Datenschutzanfragen",
    supportPage: "Support",
    supportPageText: "Support- und Kontaktseite",
    responsible: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    publisher: "Veröffentlichung der App in den App-Stores",
    playName: "Entwicklername bei Google Play",
    publisherNote: "Der Herausgeber veröffentlicht die App bei Google Play und im App Store und vereinnahmt die Abonnementzahlungen; Diensteanbieter ist der oben Genannte.",
    more: "Weitere Angaben",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    languageLabel: "Sprache",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    translation: "",
  },
  en: {
    title: "Imprint (Impressum)",
    description: "Lernomi's provider identification under § 5 DDG and § 18 MStV (German law).",
    lead: "Information pursuant to § 5 of the German Digital Services Act (DDG)",
    provider: "Service provider",
    contact: "Contact",
    email: "E-mail",
    privacyEmail: "Data protection requests",
    supportPage: "Support",
    supportPageText: "Support and contact page",
    responsible: "Responsible for content under § 18(2) MStV",
    publisher: "Publication of the app in the app stores",
    playName: "Developer name on Google Play",
    publisherNote: "The publisher publishes the app on Google Play and the App Store and collects the subscription payments; the service provider is the person named above.",
    more: "More information",
    privacy: "Privacy policy",
    terms: "Terms of use",
    languageLabel: "Language",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    translation: "This is an informational translation of the German imprint.",
  },
  tr: {
    title: "Künye (Impressum)",
    description: "Lernomi'nin Alman hukuku (§5 DDG, §18 MStV) uyarınca hizmet sağlayıcı bilgileri.",
    lead: "Almanya Dijital Hizmetler Kanunu (DDG) §5 uyarınca bilgiler",
    provider: "Hizmet sağlayıcı",
    contact: "İletişim",
    email: "E-posta",
    privacyEmail: "Veri koruma başvuruları",
    supportPage: "Destek",
    supportPageText: "Destek ve iletişim sayfası",
    responsible: "İçerikten sorumlu kişi (§18(2) MStV)",
    publisher: "Uygulamanın mağazalarda yayımlanması",
    playName: "Google Play'deki geliştirici adı",
    publisherNote: "Yayıncı uygulamayı Google Play'de ve App Store'da yayımlar ve abonelik ödemelerini tahsil eder; hizmet sağlayıcı yukarıda adı geçen kişidir.",
    more: "Diğer bilgiler",
    privacy: "Gizlilik politikası",
    terms: "Kullanım şartları",
    languageLabel: "Dil",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    translation: "Bu, Almanca künyenin bilgi amaçlı çevirisidir.",
  },
};

/**
 * Adres alanları `LEGAL_ENTITY`de Türkçe yazılı ("…, Almanya"). Künye
 * Almanca ve İngilizce de basıldığı için yalnız sondaki ülke adı çevriliyor;
 * adresin geri kalanı posta adresi olduğu için olduğu gibi kalıyor.
 */
const COUNTRY: Record<LegalLocale, Record<string, string>> = {
  tr: {},
  en: { Almanya: "Germany", Türkiye: "Türkiye" },
  de: { Almanya: "Deutschland", Türkiye: "Türkei" },
};

function localizeAddress(address: string, locale: LegalLocale): string {
  return address.replace(/, (Almanya|Türkiye)$/, (_m, c: string) => `, ${COUNTRY[locale][c] ?? c}`);
}

/** Boş alan satırı düşürür; yer tutucu vurguyla görünür (öteki belgelerle aynı kural). */
function Value({ v }: { v: string }) {
  return isLegalPlaceholder(v) ? <span className="ph">{v}</span> : <>{v}</>;
}

export function ImpressumBody({ cfg, locale }: { cfg: LegalConfig; locale: LegalLocale }) {
  const t = IMPRESSUM_TEXT[locale];
  const e = cfg.entity;
  const has = (v: string) => !isLegalOmitted(v);

  return (
    <>
      <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-body">
        <span>{t.languageLabel}:</span>
        {(["de", ...LEGAL_LOCALES.filter((l) => l !== "de")] as LegalLocale[]).map((l) =>
          l === locale ? (
            <span key={l} className="font-semibold text-[var(--text)]">{t.names[l]}</span>
          ) : (
            <Link key={l} href={legalPath("impressum", l)} hrefLang={l} className="underline-offset-4 hover:underline">
              {t.names[l]}
            </Link>
          ),
        )}
      </p>
      {t.translation ? <p className="muted mt-2 text-caption">{t.translation}</p> : null}

      <article className="legal mt-8">
        <p>{t.lead}</p>

        <h2>{t.provider}</h2>
        <p>
          <Value v={e.controllerName} />
          {has(e.controllerAddress) ? (<><br /><Value v={localizeAddress(e.controllerAddress, locale)} /></>) : null}
        </p>

        <h2>{t.contact}</h2>
        <dl className="entity">
          {has(e.supportEmail) ? (
            <>
              <dt>{t.email}</dt>
              <dd><a href={`mailto:${e.supportEmail}`}>{e.supportEmail}</a></dd>
            </>
          ) : null}
          {has(e.privacyEmailEu) ? (
            <>
              <dt>{t.privacyEmail}</dt>
              <dd>
                <a href={`mailto:${e.privacyEmailEu}`}>{e.privacyEmailEu}</a>
                {has(e.privacyEmailTr) ? <> · <a href={`mailto:${e.privacyEmailTr}`}>{e.privacyEmailTr}</a> (KVKK)</> : null}
              </dd>
            </>
          ) : null}
          <dt>{t.supportPage}</dt>
          <dd><Link href={legalPath("support", locale)}>{t.supportPageText}</Link></dd>
        </dl>

        <h2>{t.responsible}</h2>
        <p>
          <Value v={e.controllerName} />
          {has(e.controllerAddress) ? (<><br /><Value v={localizeAddress(e.controllerAddress, locale)} /></>) : null}
        </p>

        {has(e.publisherName) ? (
          <>
            <h2>{t.publisher}</h2>
            <p>
              <Value v={e.publisherName} />
              {has(e.publisherAddress) ? (<><br /><Value v={localizeAddress(e.publisherAddress, locale)} /></>) : null}
              {has(e.publisherPlayName) ? (<><br />{t.playName}: <Value v={e.publisherPlayName} /></>) : null}
            </p>
            <p className="muted">{t.publisherNote}</p>
          </>
        ) : null}

        <h2>{t.more}</h2>
        <ul>
          <li><Link href={legalPath("privacy", locale)}>{t.privacy}</Link></li>
          <li><Link href={legalPath("terms", locale)}>{t.terms}</Link></li>
        </ul>
      </article>
    </>
  );
}
