import Link from "next/link";
import { LEGAL_LOCALES, isLegalOmitted, isLegalPlaceholder, legalPath, type LegalLocale } from "./index";
import type { LegalConfig } from "./shape";

/**
 * Künye (Impressum) — hizmet sağlayıcının kimliği ve GDPR m.27 AB temsilcisi.
 *
 * NEDEN HÂLÂ VAR (1.7, 2026-09-24). Sayfa 2026-09-23'te §5 DDG için açıldı
 * (denetim LEG-5): o gün hizmet sağlayıcı Dortmund'daydı. Artık sağlayıcı
 * Türkiye'de yerleşik ve §5 DDG'nin Almanya dışındaki, AB dışındaki bir
 * sağlayıcıya uygulanıp uygulanmadığı tartışmalı. Sayfa yine de KALIYOR:
 *   - AB'deki kullanıcı sağlayıcıyı adıyla ve çağrılabilir adresiyle
 *     tanıyabilsin (tüketici hukukunun genel bilgi yükümlülükleri);
 *   - mağazalardaki DSA tüccar beyanı (ad, adres, e-posta, telefon AB
 *     mağazasında herkese açık) ile aynı kimliği söylesin;
 *   - GDPR m.27 temsilcisinin iletişim bilgisi aranan bir yerde dursun.
 *
 * YANLIŞ DAYANAK İDDİA EDİLMİYOR. Eski başlık "Angaben gemäß § 5 DDG" idi;
 * uygulanıp uygulanmadığı belirsiz bir kanunu dayanak göstermek yerine nötr
 * "Anbieterkennzeichnung" diyor. Sayfanın adresi ve adı ("Impressum")
 * Almanca konuşulan ülkelerde aranan sözcük olduğu için aynı kaldı.
 *
 * §18 ABS. 2 MStV SATIRI KALDIRILDI. O hüküm yalnız gazetecilik-redaksiyonel
 * nitelikli tekliflere (haber, görüş, periyodik yayın) bir "içerikten sorumlu"
 * kişi istiyor; Lernomi'nin konuşmaları ve alıştırmaları bir öğrenme ürününün
 * parçası, kamuoyu oluşumuna yönelik redaksiyonel içerik değil. Üstelik
 * §18(2) o kişinin yurt içinde ikametini istiyor; satırı Samet'le doldurmak
 * sağlayıcı olmayan birini içerikten sorumlu göstermek olurdu. Siteye blog ya
 * da haber gibi redaksiyonel içerik eklenirse bu karar yeniden ele alınır.
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
 *   - USt-IdNr.: sağlayıcının AB'de KDV kaydı yok; satışı mağazalar yapıyor.
 *     Vergi kimliği olarak yalnız bağlı olunan vergi dairesi basılıyor
 *     (VKN/TCKN yayımlanmaz, `LEGAL_ENTITY` notu).
 *   - Telefon / iletişim formu: yok. DSA tüccar beyanı için mağazalara bir
 *     telefon numarası girilecek ve AB mağazasında herkese açık görünecek.
 *     TODO(Musa): o numara belli olunca `LEGAL_ENTITY`ye ekle, satır buraya
 *     eklenir (künye ile mağaza aynı kanalları söylesin).
 *   - Tüketici uyuşmazlık (§36 VSBG) beyanı: YOK ve gerekmiyor. VSBG'nin
 *     bilgi yükümlülüğü Almanya'da yerleşik girişimcilere yönelik; eski TODO
 *     (katılma/katılmama kararı) sağlayıcı değişince düştü.
 *   - AB ODR platformu bağlantısı: platform 20.07.2025'te kapatıldı
 *     (Tüzük (AB) 2024/3228); bağlantı artık istenmiyor.
 */

type Labels = {
  title: string;
  description: string;
  lead: string;
  provider: string;
  taxOffice: string;
  playName: string;
  contact: string;
  email: string;
  privacyEmail: string;
  supportPage: string;
  supportPageText: string;
  euRep: string;
  euRepContact: string;
  euRepNote: string;
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
    description: "Anbieterkennzeichnung von Lernomi und EU-Vertreter nach Art. 27 DSGVO.",
    lead: "Anbieterkennzeichnung",
    provider: "Anbieter",
    taxOffice: "Zuständiges Finanzamt (Türkei)",
    playName: "Entwicklername bei Google Play",
    contact: "Kontakt",
    email: "E-Mail",
    privacyEmail: "Datenschutzanfragen",
    supportPage: "Support",
    supportPageText: "Support- und Kontaktseite",
    euRep: "EU-Vertreter nach Art. 27 DSGVO",
    euRepContact: "Kontakt",
    euRepNote: "Der Anbieter ist nicht in der Europäischen Union niedergelassen. Betroffene Personen und Aufsichtsbehörden in der EU und im EWR können sich in allen Fragen des Datenschutzes auch an den Vertreter wenden. Der Vertreter ist weder Anbieter noch Verantwortlicher des Dienstes.",
    more: "Weitere Angaben",
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
    languageLabel: "Sprache",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    translation: "",
  },
  en: {
    title: "Imprint (Impressum)",
    description: "Lernomi's provider identification and EU representative under Art. 27 GDPR.",
    lead: "Provider identification",
    provider: "Provider",
    taxOffice: "Tax office (Türkiye)",
    playName: "Developer name on Google Play",
    contact: "Contact",
    email: "E-mail",
    privacyEmail: "Data protection requests",
    supportPage: "Support",
    supportPageText: "Support and contact page",
    euRep: "EU representative under Art. 27 GDPR",
    euRepContact: "Contact",
    euRepNote: "The provider is not established in the European Union. Data subjects and supervisory authorities in the EU and EEA may also contact the representative on all data protection matters. The representative is neither the provider nor the controller of the service.",
    more: "More information",
    privacy: "Privacy policy",
    terms: "Terms of use",
    languageLabel: "Language",
    names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    translation: "This is an informational translation of the German imprint.",
  },
  tr: {
    title: "Künye (Impressum)",
    description: "Lernomi'nin hizmet sağlayıcı bilgileri ve GDPR m.27 AB temsilcisi.",
    lead: "Hizmet sağlayıcıya ilişkin bilgiler",
    provider: "Hizmet sağlayıcı",
    taxOffice: "Vergi dairesi (Türkiye)",
    playName: "Google Play'deki geliştirici adı",
    contact: "İletişim",
    email: "E-posta",
    privacyEmail: "Veri koruma başvuruları",
    supportPage: "Destek",
    supportPageText: "Destek ve iletişim sayfası",
    euRep: "AB temsilcisi (GDPR m.27)",
    euRepContact: "İletişim",
    euRepNote: "Hizmet sağlayıcı Avrupa Birliği'nde yerleşik değildir. AB ve AEA'daki ilgili kişiler ve denetim otoriteleri veri korumaya ilişkin her konuda temsilciye de başvurabilir. Temsilci hizmetin sağlayıcısı ya da veri sorumlusu değildir.",
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
 * adresin geri kalanı posta adresi olduğu için olduğu gibi kalıyor. Gizlilik
 * politikası ve şartlardaki kimlik blokları da bunu kullanıyor (`markdown.tsx`).
 */
const COUNTRY: Record<LegalLocale, Record<string, string>> = {
  tr: {},
  en: { Almanya: "Germany", Türkiye: "Türkiye" },
  de: { Almanya: "Deutschland", Türkiye: "Türkei" },
};

export function localizeAddress(address: string, locale: LegalLocale): string {
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
          <Value v={e.providerName} />
          {has(e.providerAddress) ? (<><br /><Value v={localizeAddress(e.providerAddress, locale)} /></>) : null}
        </p>
        {has(e.providerTaxOffice) || has(e.providerPlayName) ? (
          <dl className="entity">
            {has(e.providerTaxOffice) ? (<><dt>{t.taxOffice}</dt><dd><Value v={e.providerTaxOffice} /></dd></>) : null}
            {has(e.providerPlayName) ? (<><dt>{t.playName}</dt><dd><Value v={e.providerPlayName} /></dd></>) : null}
          </dl>
        ) : null}

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

        {has(e.euRepresentativeName) ? (
          <>
            <h2>{t.euRep}</h2>
            <p>
              <Value v={e.euRepresentativeName} />
              {has(e.euRepresentativeAddress) ? (<><br /><Value v={localizeAddress(e.euRepresentativeAddress, locale)} /></>) : null}
            </p>
            {has(e.privacyEmailEu) ? (
              <dl className="entity">
                <dt>{t.euRepContact}</dt>
                <dd><a href={`mailto:${e.privacyEmailEu}`}>{e.privacyEmailEu}</a></dd>
              </dl>
            ) : null}
            <p className="muted">{t.euRepNote}</p>
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
