import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { ExamPlayer } from "@/components/exam-player";
import type { CefrLevel } from "@/lib/skills/types";

export const metadata = { title: "Modül sınavı" };
export const dynamic = "force-dynamic";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/** Modül sınavı v2 (WP-41): 20 dk, beş bölüm; ön koşul modül derslerinin %80'i. */
export default async function ModuleExamPage({ params }: { params: Promise<{ level: string; module: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { level, module: mod } = await params;
  const index = Number(mod);
  if (!LEVELS.includes(level) || !Number.isInteger(index) || index < 0 || index > 20) notFound();
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <ExamPlayer level={level as CefrLevel} module={index} />
    </div>
  );
}
