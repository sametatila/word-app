import { SupportPage } from "@/content/legal/support";
import { supportCopy } from "@/content/legal/support";
import { LEGAL_PATHS, legalPath } from "@/lib/legal";

const c = supportCopy("tr");

export const metadata = {
  title: c.title,
  description: c.description,
  alternates: {
    canonical: LEGAL_PATHS.support,
    languages: { tr: legalPath("support"), en: legalPath("support", "en"), de: legalPath("support", "de") },
  },
};

/**
 * Destek sayfası, Türkçe kanonik yolda (/support) — App Store Connect'in
 * Support URL alanına girilen adres. Gerekçesi ve yapısı
 * `src/content/legal/support.tsx` başında.
 */
export default function Support() {
  return <SupportPage locale="tr" />;
}
