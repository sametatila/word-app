import { redirect } from "next/navigation";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { WeeklyPlayer } from "@/components/weekly-player";

export const generateMetadata = titleMeta("learn.weekly_quiz");
export const dynamic = "force-dynamic";

/** Haftalık quiz — oynatıcı istemcide, durum ve maddeler `/api/quiz` ucundan. */
export default async function WeeklyPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <WeeklyPlayer />
    </div>
  );
}
