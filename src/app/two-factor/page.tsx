import { Suspense } from "react";
import { TwoFactorForm } from "@/components/two-factor-form";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

export const generateMetadata = titleMeta("twofa.verify_title");

/**
 * Girişin ikinci adımı. Buraya YALNIZ giriş formu yönlendiriyor; doğrudan
 * gelen ziyaretçinin imzalı çerezi olmadığı için ekran "süresi doldu" deyip
 * girişe yolluyor (bkz. TwoFactorForm).
 */
export default function TwoFactorPage() {
  // TwoFactorForm useSearchParams okuyor (?next=): Suspense sınırı gerekir.
  return <Suspense fallback={null}><TwoFactorForm /></Suspense>;
}
