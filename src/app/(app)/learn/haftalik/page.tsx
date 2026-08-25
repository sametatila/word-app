import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { WeeklyPlayer } from "@/components/weekly-player";

export const metadata = { title: "Haftalık kullanım sınavı" };
export const dynamic = "force-dynamic";

/** Haftalık kullanım sınavı (WP-42) — oynatıcı istemcide, durum ve sorular /api/weekly'den. */
export default async function WeeklyPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col">
      <WeeklyPlayer />
    </div>
  );
}
