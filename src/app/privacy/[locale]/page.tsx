import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { LegalShell } from "@/components/legal-shell";
import { LEGAL_DEFAULT_LOCALE, isLegalLocale, legalPath } from "@/lib/legal";
import { PRIVACY_EN_DESCRIPTION, PRIVACY_EN_SUMMARY, PRIVACY_EN_TITLE, PrivacyEnBody } from "@/content/legal/privacy-en";
import { PRIVACY_DE_DESCRIPTION, PRIVACY_DE_SUMMARY, PRIVACY_DE_TITLE, PrivacyDeBody } from "@/content/legal/privacy-de";

/**
 * Gizlilik politikasının çevirileri: /privacy/en, /privacy/de. Türkçe kanonik
 * yolda (/privacy) durduğu için buraya gelen "tr" oraya yönlendirilir.
 *
 * Çeviriler bilgi amaçlıdır; bağlayıcı metin Türkçe olan (şartlar §12b).
 */
const DOCS = {
  en: { title: PRIVACY_EN_TITLE, description: PRIVACY_EN_DESCRIPTION, summary: PRIVACY_EN_SUMMARY, Body: PrivacyEnBody },
  de: { title: PRIVACY_DE_TITLE, description: PRIVACY_DE_DESCRIPTION, summary: PRIVACY_DE_SUMMARY, Body: PrivacyDeBody },
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
    alternates: { canonical: legalPath("privacy", locale as keyof typeof DOCS), languages: { tr: legalPath("privacy"), en: legalPath("privacy", "en"), de: legalPath("privacy", "de") } },
  };
}

export default async function PrivacyLocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === LEGAL_DEFAULT_LOCALE) redirect(legalPath("privacy"));
  if (!isLegalLocale(locale) || !(locale in DOCS)) notFound();
  const doc = DOCS[locale as keyof typeof DOCS];
  return (
    <LegalShell doc="privacy" locale={locale as keyof typeof DOCS} title={doc.title} summary={doc.summary}>
      <doc.Body />
    </LegalShell>
  );
}
