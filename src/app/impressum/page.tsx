import type { Metadata } from "next";
import { ImpressumPage, impressumMetadata } from "./impressum-page";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return impressumMetadata("de");
}

/**
 * Künye — kanonik yol ALMANCA (öteki hukuki sayfalardan farklı; gerekçe
 * `lib/legal` `legalCanonicalLocale`). Çeviriler /impressum/tr ve /impressum/en.
 */
export default function Page() {
  return <ImpressumPage locale="de" />;
}
