import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { CHEATSHEETS } from "@/lib/cheatsheet/index";
import { drillsFor } from "@/lib/cheatsheet/drills";
import { DrillPlayer } from "@/components/cheatsheet/drill-player";

export const dynamic = "force-dynamic";

/**
 * Bir dilbilgisi tablosunun drill'i (WP-11): /cheatsheet/[table]/drill.
 * Maddeler sabit sırada değil karışık — kural her seferinde başka cümlede
 * çıksın; sıra sunucuda çekilir ki hidrasyon uyuşmazlığı olmasın.
 */
export default async function DrillPage({ params }: { params: Promise<{ table: string }> }) {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  const { table } = await params;
  const sheet = CHEATSHEETS.find((s) => s.id === table);
  const drills = drillsFor(table);
  if (!sheet || !drills.length) notFound();
  const shuffled = [...drills];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return <DrillPlayer drills={shuffled} tableId={sheet.id} tableTitle={sheet.title} />;
}
