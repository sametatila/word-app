import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { LEGAL_DEFAULT_LOCALE, isLegalLocale, legalPath } from "@/lib/legal";
import { TERMS_EN_DESCRIPTION, TERMS_EN_SUMMARY, TERMS_EN_TITLE, TermsEnBody } from "@/content/legal/terms-en";
import { TERMS_DE_DESCRIPTION, TERMS_DE_SUMMARY, TERMS_DE_TITLE, TermsDeBody } from "@/content/legal/terms-de";

/**
 * Kullanım şartlarının çevirileri: /terms/en, /terms/de. Türkçe kanonik yolda
 * (/terms) durduğu için buraya gelen "tr" oraya yönlendirilir — aynı metnin iki
 * adresten servis edilmesi hem arama hem Play bağlantısı için gereksiz.
 *
 * Çeviriler bilgi amaçlıdır; bağlayıcı metin Türkçe olan (şartlar §12b).
 */
const DOCS = {
  en: { title: TERMS_EN_TITLE, description: TERMS_EN_DESCRIPTION, summary: TERMS_EN_SUMMARY, Body: TermsEnBody },
  de: { title: TERMS_DE_TITLE, description: TERMS_DE_DESCRIPTION, summary: TERMS_DE_SUMMARY, Body: TermsDeBody },
} as const;

export function generateStaticParams() {
  return Object.keys(DOCS).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const doc = locale in DOCS ? DOCS[locale as keyof typeof DOCS] : null;
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: legalPath("terms", locale as keyof typeof DOCS), languages: { tr: legalPath("terms"), en: legalPath("terms", "en"), de: legalPath("terms", "de") } },
  };
}

export default async function TermsLocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === LEGAL_DEFAULT_LOCALE) redirect(legalPath("terms"));
  if (!isLegalLocale(locale) || !(locale in DOCS)) notFound();
  const doc = DOCS[locale as keyof typeof DOCS];
  return (
    <LegalShell doc="terms" locale={locale as keyof typeof DOCS} title={doc.title} summary={doc.summary}>
      <doc.Body />
    </LegalShell>
  );
}
