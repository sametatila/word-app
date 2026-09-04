import Link from "next/link";
import type { ReactNode } from "react";
import { LogoMark } from "@/components/icons";
import { LEGAL_EFFECTIVE_DATE, LEGAL_ENTITY, LEGAL_LOCALES, LEGAL_VERSION, isLegalOmitted, isLegalPlaceholder, legalPath, type LegalField, type LegalLocale } from "@/lib/legal";

/** Çerçevenin kendi metinleri — belge gövdesi değil, kabuk (gezinme, etiketler). */
const CHROME: Record<LegalLocale, {
  privacy: string; terms: string; deleteAccount: string;
  effective: string; version: string; inBrief: string;
  languageLabel: string; names: Record<LegalLocale, string>;
  binding: string;
}> = {
  tr: {
    privacy: "Gizlilik politikası", terms: "Kullanım şartları", deleteAccount: "Hesabını sil",
    effective: "Yürürlük", version: "Sürüm", inBrief: "Kısaca",
    languageLabel: "Dil", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "",
  },
  en: {
    privacy: "Privacy policy", terms: "Terms of use", deleteAccount: "Delete your account",
    effective: "Effective", version: "Version", inBrief: "In brief",
    languageLabel: "Language", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "This is an informational translation. The binding text is the Turkish version.",
  },
  de: {
    privacy: "Datenschutzerklärung", terms: "Nutzungsbedingungen", deleteAccount: "Konto löschen",
    effective: "Gültig ab", version: "Version", inBrief: "Kurz gefasst",
    languageLabel: "Sprache", names: { tr: "Türkçe", en: "English", de: "Deutsch" },
    binding: "Dies ist eine informative Übersetzung. Verbindlich ist die türkische Fassung.",
  },
};

/**
 * Hukuki sayfaların ortak çerçevesi (/privacy, /terms): okunur satır genişliği,
 * yürürlük tarihi, sayfalar arası geçiş. Uygulama kabuğu yok — bu sayfalar
 * oturumsuz da açılır (Play Console bağlantısı, mağaza listesi).
 *
 * `doc` ve `locale`, dil değiştiricinin AYNI belgenin öteki dilini göstermesi
 * için gerekiyor; gezinme bağlantıları da okunan dilde kalıyor, yoksa İngilizce
 * şartlardan Türkçe gizlilik politikasına düşülüyordu.
 */
export function LegalShell({ title, summary, children, doc, locale = "tr" }: {
  title: string; summary: string; children: ReactNode;
  doc: "privacy" | "terms"; locale?: LegalLocale;
}) {
  const c = CHROME[locale];
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-10">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <LogoMark size={32} />
        <span className="text-base font-bold">Nomi</span>
      </Link>
      <nav className="muted mb-6 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link href={legalPath("privacy", locale)} className="underline-offset-4 hover:underline">{c.privacy}</Link>
        <Link href={legalPath("terms", locale)} className="underline-offset-4 hover:underline">{c.terms}</Link>
        <Link href={legalPath("deleteAccount", locale)} className="underline-offset-4 hover:underline">{c.deleteAccount}</Link>
      </nav>
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="muted mt-2 text-sm">
        {c.effective}: {LEGAL_EFFECTIVE_DATE} · {c.version} {LEGAL_VERSION}
      </p>
      <p className="muted mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span>{c.languageLabel}:</span>
        {LEGAL_LOCALES.map((l) => (
          l === locale
            ? <span key={l} className="font-semibold text-[var(--text)]">{c.names[l]}</span>
            : <Link key={l} href={legalPath(doc, l)} hrefLang={l} className="underline-offset-4 hover:underline">{c.names[l]}</Link>
        ))}
      </p>
      {c.binding ? <p className="muted mt-2 text-xs">{c.binding}</p> : null}
      <div className="card mt-6 p-5">
        <p className="text-sm font-semibold">{c.inBrief}</p>
        <p className="muted mt-1 text-sm leading-relaxed">{summary}</p>
      </div>
      <article className="legal mt-8">{children}</article>
      <style>{`
        .legal h2 { font-size: 1.125rem; font-weight: 800; margin: 2rem 0 0.5rem; letter-spacing: -0.01em; }
        .legal h3 { font-size: 1rem; font-weight: 700; margin: 1.25rem 0 0.35rem; }
        .legal p, .legal li { font-size: 0.95rem; line-height: 1.65; }
        .legal p { margin: 0.5rem 0; }
        .legal ul { margin: 0.5rem 0 0.5rem 1.25rem; list-style: disc; }
        .legal li { margin: 0.25rem 0; }
        .legal table { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 0.75rem 0 1rem; }
        .legal th, .legal td { text-align: left; vertical-align: top; padding: 0.45rem 0.5rem; border-bottom: 1px solid var(--border); }
        .legal th { font-weight: 700; color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.04em; }
        .legal .tablewrap { overflow-x: auto; }
        .legal a { text-decoration: underline; text-underline-offset: 4px; }
        .legal code { font-size: 0.85em; background: var(--surface-2); padding: 0.05em 0.35em; border-radius: 0.35rem; }
        .legal .ph { font-family: ui-monospace, monospace; font-size: 0.85em; padding: 0.05em 0.4em; border-radius: 0.35rem; background: color-mix(in srgb, var(--color-flame-400) 22%, transparent); color: var(--text); white-space: nowrap; }
        .legal .entity { margin: 0.75rem 0 1rem; }
        .legal .entity dt { font-weight: 700; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.5rem; }
        .legal .entity dd { margin: 0.1rem 0 0; font-size: 0.95rem; }
      `}</style>
    </div>
  );
}

/**
 * Kimlik alanı: dolduruldu ise düz metin, henüz [[YER_TUTUCU]] ise vurgulu etiket.
 * Yayın öncesi gözden kaçmasın diye; doldurulunca vurgu kendiliğinden kalkar.
 */
export function Ph({ k }: { k: LegalField }) {
  const v = LEGAL_ENTITY[k];
  return isLegalPlaceholder(v) ? <span className="ph">{v}</span> : <>{v}</>;
}

/**
 * Kimlik bloklarının etiketleri — değerler dile bağlı değil, etiketler bağlı.
 * İki taraf var: veri sorumlusu (AB'de yerleşik gerçek kişi) ve yayıncı
 * (Play hesabı, tahsilat ve veri işleyen; Türkiye'de yerleşik gerçek kişi).
 * Bkz. lib/legal.ts kimlik notu.
 */
type EntityLabelKey =
  | "controller" | "publisher" | "name" | "address" | "taxOffice"
  | "trRep" | "privacy" | "privacyEu" | "support" | "kep";

const ENTITY_LABELS: Record<LegalLocale, Record<EntityLabelKey, string>> = {
  tr: {
    controller: "Veri sorumlusu", publisher: "Yayıncı ve veri işleyen",
    name: "Ad soyad", address: "Yazışma adresi", taxOffice: "Vergi dairesi",
    trRep: "Türkiye veri sorumlusu temsilcisi (KVKK)",
    privacy: "KVKK başvuruları", privacyEu: "GDPR başvuruları",
    support: "Destek", kep: "KEP",
  },
  en: {
    controller: "Data controller", publisher: "Publisher and processor",
    name: "Name", address: "Postal address", taxOffice: "Tax office",
    trRep: "Representative in Türkiye (KVKK)",
    privacy: "KVKK requests (Türkiye)", privacyEu: "GDPR / UK GDPR requests",
    support: "Support", kep: "Registered e-mail (KEP)",
  },
  de: {
    controller: "Verantwortlicher", publisher: "Herausgeber und Auftragsverarbeiter",
    name: "Name", address: "Postanschrift", taxOffice: "Finanzamt",
    trRep: "Vertreter in der Türkei (KVKK)",
    privacy: "KVKK-Anträge (Türkei)", privacyEu: "DSGVO- / UK-GDPR-Anträge",
    support: "Support", kep: "Registrierte E-Mail (KEP)",
  },
};

/**
 * Kimlik bloğu (KVKK aydınlatma ve 6563 tanıtıcı bilgi zorunlu unsuru).
 *
 * `party` hangi tarafın basılacağını söyler; `contact` iletişim satırlarını da
 * ekler (gizlilik politikasında veri sorumlusunun altında). Uygulanmayan alan
 * (boş dize, ör. KEP'i olmayan gerçek kişi) hiç basılmıyor: boş bir satır
 * olmayan bir yükümlülüğü varmış gibi gösterir.
 */
export function EntityBlock({ party, contact = false, locale = "tr" }: {
  party: "controller" | "publisher";
  contact?: boolean;
  locale?: LegalLocale;
}) {
  const l = ENTITY_LABELS[locale];
  const row = (label: string, k: LegalField) =>
    isLegalOmitted(LEGAL_ENTITY[k]) ? null : <><dt>{label}</dt><dd><Ph k={k} /></dd></>;
  return (
    <dl className="entity">
      <dt>{party === "controller" ? l.controller : l.publisher}</dt>
      <dd><Ph k={party === "controller" ? "controllerName" : "publisherName"} /></dd>
      {row(l.address, party === "controller" ? "controllerAddress" : "publisherAddress")}
      {party === "publisher" ? row(l.taxOffice, "publisherTaxOffice") : null}
      {party === "controller" ? row(l.trRep, "trRepresentative") : null}
      {contact ? (
        <>
          {row(l.privacy, "privacyEmailTr")}
          {row(l.privacyEu, "privacyEmailEu")}
          {row(l.support, "supportEmail")}
          {row(l.kep, "kep")}
        </>
      ) : null}
    </dl>
  );
}
