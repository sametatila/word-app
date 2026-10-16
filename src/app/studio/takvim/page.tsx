import type { Metadata } from "next";
import { studioGate } from "@/lib/studio-auth";
import { listEpisodes, postsFor } from "@/lib/studio";
import { instagramStatus, postView, tiktokStatus, youtubeStatus } from "@/lib/social-posts";
import { AdminDenied } from "../../admin/_ui/ui";
import { StudioCalendar } from "../calendar";

export const metadata: Metadata = { title: "Takvim" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/studio/takvim — sosyal medya takvimi (bölümler social_episodes, platform durumları social_posts).
 * `?hafta=YYYY-MM-DD` gösterilen hafta (o günün haftası): bölüme girip geri dönünce aynı hafta açılır.
 */
export default async function StudioCalendarPage({ searchParams }: { searchParams: Promise<{ hafta?: string }> }) {
  const { hafta } = await searchParams;
  const week = typeof hafta === "string" && /^\d{4}-\d{2}-\d{2}$/.test(hafta) && !Number.isNaN(Date.parse(`${hafta}T12:00:00Z`)) ? hafta : undefined;
  const gate = await studioGate();
  if (!gate.ok) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { episodes, missing } = await listEpisodes();
  const rows = missing ? [] : await postsFor(episodes.map((e) => e.id));
  return <StudioCalendar week={week} episodes={episodes} posts={rows.map(postView)} missing={missing} now={new Date().toISOString()} ig={await instagramStatus()} tt={await tiktokStatus()} yt={await youtubeStatus()} />;
}
