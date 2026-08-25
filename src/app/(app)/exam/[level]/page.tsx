import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { ExamPlayer } from "@/components/exam-player";
import type { CefrLevel } from "@/lib/skills/types";

export const metadata = { title: "Seviye sınavı" };
export const dynamic = "force-dynamic";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/** Seviye sınavı (WP-41): 45 dk, beş bölüm. */
export default async function LevelExamPage({ params }: { params: Promise<{ level: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { level } = await params;
  if (!LEVELS.includes(level)) notFound();
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <ExamPlayer level={level as CefrLevel} module={null} />
    </div>
  );
}
