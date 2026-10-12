import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studioGate } from "@/lib/studio-auth";
import { postPerformance } from "@/lib/social-stats";
import { AdminDenied } from "../../../admin/_ui/ui";
import { PostPerformanceView } from "../../stats-ui";

export const metadata: Metadata = { title: "Performans" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio/<bölüm>/performans — bir videonun üç platformdaki sonucu, büyüme eğrisi ve kıyas. */
export default async function StudioPerformancePage({ params }: { params: Promise<{ id: string }> }) {
  const gate = await studioGate();
  if (!gate.ok) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { id } = await params;
  const perf = await postPerformance(id);
  if (!perf) notFound();
  return <PostPerformanceView perf={perf} />;
}
