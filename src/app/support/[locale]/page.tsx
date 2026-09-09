import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { SupportPage, supportCopy } from "@/content/legal/support";
import { LEGAL_DEFAULT_LOCALE, isLegalLocale, legalPath, type LegalLocale } from "@/lib/legal";

/**
 * Destek sayfasının çevirileri: /support/en, /support/de. Türkçe kanonik yolda
 * durduğu için buraya gelen "tr" oraya yönlendirilir — gizlilik ve şartlarla
 * aynı kural (`legalPath`).
 */
const LOCALES = ["en", "de"] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLegalLocale(locale) || locale === LEGAL_DEFAULT_LOCALE) return {};
  const c = supportCopy(locale);
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: legalPath("support", locale),
      languages: { tr: legalPath("support"), en: legalPath("support", "en"), de: legalPath("support", "de") },
    },
  };
}

export default async function SupportLocale({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === LEGAL_DEFAULT_LOCALE) redirect(legalPath("support"));
  if (!isLegalLocale(locale)) notFound();
  return <SupportPage locale={locale as LegalLocale} />;
}
