import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { MockExamPlayer } from "@/components/mock-exam-player";
import { mockPaperById, type MockSkill } from "@/lib/mock-exams";

export const metadata = { title: "Deneme sınavı" };
export const dynamic = "force-dynamic";

const SKILLS: MockSkill[] = ["reading", "listening", "writing", "speaking"];

/** Deneme sınavının tek bölümü — kâğıt kimliği ve beceri yoldan geliyor. */
export default async function MockExamPartPage({ params }: { params: Promise<{ paper: string; skill: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { paper: paperId, skill } = await params;
  const paper = mockPaperById(paperId);
  const part = paper?.parts.find((p) => p.skill === skill);
  if (!paper || !part || !SKILLS.includes(skill as MockSkill)) notFound();
  return (
    <div className="flex w-full flex-1 flex-col">
      <MockExamPlayer paper={paper} part={part} />
    </div>
  );
}
