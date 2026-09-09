import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal-shell";
import { LEGAL_DEFAULT_LOCALE, isLegalLocale, legalPath, type LegalLocale } from "@/lib/legal";

export const dynamic = "force-dynamic";

/** Çeviriler alt yolda: /support/en, /support/de. Türkçe kanonik yolda kalıyor. */
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLegalLocale(locale) || locale === LEGAL_DEFAULT_LOCALE) return {};
  return legalMetadata("support", locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === LEGAL_DEFAULT_LOCALE) redirect(legalPath("support"));
  if (!isLegalLocale(locale)) notFound();
  return <LegalPage doc="support" locale={locale as LegalLocale} />;
}
