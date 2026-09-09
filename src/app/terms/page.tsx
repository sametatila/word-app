import type { Metadata } from "next";
import { LegalPage, legalMetadata } from "@/components/legal-shell";

export const dynamic = "force-dynamic";

export function generateMetadata(): Promise<Metadata> {
  return legalMetadata("terms", "tr");
}

/**
 * Türkçe kanonik yol. Metnin kendisi `legal_documents` tablosunda (panelden
 * düzenleniyor); orada satır yoksa `src/content/legal/defaults/terms.ts`
 * basılıyor. Sayfanın işi yalnız hangi belgeyi ve hangi dili istediğini
 * söylemek.
 */
export default function Page() {
  return <LegalPage doc="terms" locale="tr" />;
}
