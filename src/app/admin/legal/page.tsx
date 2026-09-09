import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
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
  if (!gate.ok) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl font-extrabold">Hukuki metinler</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
          {gate.email ? `Bu hesap (${gate.email}) yönetim yetkisine sahip değil.` : "Önce admin e-postasıyla giriş yap."}
        </p>
      </div>
    );
  }
  const [config, documents] = await Promise.all([legalConfig(), allLegalDocuments()]);
  return <LegalAdmin config={config} documents={documents} tokens={knownTokens()} />;
}
