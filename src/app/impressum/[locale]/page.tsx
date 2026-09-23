import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { isLegalLocale, legalPath, type LegalLocale } from "@/lib/legal";
import { ImpressumPage, impressumMetadata } from "../impressum-page";

export const dynamic = "force-dynamic";

/** Çeviriler alt yolda: /impressum/tr, /impressum/en. Almanca kanonik yolda. */
export function generateStaticParams() {
  return [{ locale: "tr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLegalLocale(locale) || locale === "de") return {};
  return impressumMetadata(locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale === "de") redirect(legalPath("impressum"));
  if (!isLegalLocale(locale)) notFound();
  return <ImpressumPage locale={locale as LegalLocale} />;
}
