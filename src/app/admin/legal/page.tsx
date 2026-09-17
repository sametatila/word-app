import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { AdminDenied } from "../_ui/ui";
import { legalConfig } from "@/lib/legal/config";
import { allLegalDocuments } from "@/lib/legal/documents";
import { knownTokens } from "@/lib/legal/markdown";
import { LegalAdmin } from "./legal-admin";

export const metadata: Metadata = { title: "Hukuki metinler" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/legal — gizlilik politikası, kullanım şartları ve destek
 * sayfasının metni ile bunları besleyen bilgilerin yönetildiği yer.
 *
 * Metnin panelde durmasının sebebi premium sınırlarındakiyle aynı: bunlar
 * deneyerek değil ama SIK ve KÜÇÜK değişen şeyler — bir adres, bir sağlayıcı,
 * bir sürüm numarası, bir yazım hatası. Kodda kalsalardı her düzeltme bir
 * commit ve bir deploy demek olurdu; pratikte de düzeltilmeden kalırlardı.
 */
export default async function AdminLegalPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Hukuki metinler" email={gate.email} />;
  const [config, documents] = await Promise.all([legalConfig(), allLegalDocuments()]);
  return <LegalAdmin config={config} documents={documents} tokens={knownTokens()} />;
}
