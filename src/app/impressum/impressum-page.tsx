import type { Metadata } from "next";
import { DocHeader } from "@/components/legal-shell";
import { legalPath, type LegalLocale } from "@/lib/legal";
import { legalConfig } from "@/lib/legal/config";
import { IMPRESSUM_TEXT, ImpressumBody } from "@/lib/legal/impressum";
import { LegalStyles } from "@/lib/legal/markdown";

/**
 * Künye sayfasının kabuğu — öteki hukuki sayfalarla aynı üst şerit ve biçem.
 *
 * `LegalPage` kullanılmıyor çünkü o markdown belge + sürüm geçmişi basıyor;
 * künye bir sözleşme değil, sürümü de yok. Alanlar panelden düzenlenebilen
 * yapılandırmadan geliyor (`legalConfig`), yani adres tek yerde değişiyor.
 */
export async function ImpressumPage({ locale }: { locale: LegalLocale }) {
  const cfg = await legalConfig();
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <DocHeader locale={locale} />
      <h1 className="text-display tracking-tight">{IMPRESSUM_TEXT[locale].title}</h1>
      <ImpressumBody cfg={cfg} locale={locale} />
      <LegalStyles />
    </div>
  );
}

export function impressumMetadata(locale: LegalLocale): Metadata {
  const t = IMPRESSUM_TEXT[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: legalPath("impressum", locale),
      languages: { de: legalPath("impressum"), tr: legalPath("impressum", "tr"), en: legalPath("impressum", "en") },
    },
  };
}
