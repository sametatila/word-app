import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { learningAnalysis, MIN_ANSWERS } from "@/lib/admin-content";
import { cached } from "@/lib/admin-query";
import { loadPanel, panelIssues } from "../_data";
import { LearningSection } from "../dashboard";
import { AdminDenied } from "../_ui/ui";
import { PanelPage } from "../_ui/panel-page";
import { LearningAnalysis } from "./learning-analysis";

export const metadata: Metadata = { title: "Öğrenme ve madde analizi" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/learning — öğrenme içeriğinin gerçekte nasıl çalıştığı.
 *
 * ÜSTTE MADDE ANALİZİ: eyleme dönen tek görünüm (hangi ders, egzersiz,
 * deneme sorusu öğrencileri düşürüyor; kapatma düğmesiyle). Altında genel
 * öğrenme metrikleri. Haftalık quiz'in kendi analizi kendi sayfasında.
 */
export default async function AdminLearningPage({ searchParams }: { searchParams: Promise<{ taze?: string }> }) {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Öğrenme ve madde analizi" email={gate.email} />;
  const fresh = (await searchParams).taze === "1";
  const [{ value, at }, analysis] = await Promise.all([loadPanel(fresh), cached("admin:learning-analysis", 60_000, fresh, learningAnalysis)]);
  const a = analysis.value;
  return (
    <PanelPage title="Öğrenme ve madde analizi" description="Hangi madde öğrencileri düşürüyor (kapatılabilir), altında dersler, beceriler, sınavlar ve oyunların genel metrikleri." href="/admin/learning" at={at} issues={[...panelIssues(value), ...a.issues]}>
      <LearningAnalysis lessons={a.lessons} skills={a.skills} path={a.path} mockItems={a.mockItems} mockScanned={a.mockScanned} minAnswers={MIN_ANSWERS} />
      <LearningSection data={value.data} coverage={value.coverage} />
    </PanelPage>
  );
}
