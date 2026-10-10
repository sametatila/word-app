import type { Metadata } from "next";
import { studioGate } from "@/lib/studio-auth";
import { listEpisodes, postsFor } from "@/lib/studio";
import { instagramStatus, postView } from "@/lib/social-posts";
import { AdminDenied } from "../admin/_ui/ui";
import { StudioCalendar } from "./calendar";

export const metadata: Metadata = { title: "Takvim" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio — sosyal medya takvimi (bölümler social_episodes, platform durumları social_posts). */
export default async function StudioPage() {
  const gate = await studioGate();
  if (!gate.ok) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { episodes, missing } = await listEpisodes();
  const rows = missing ? [] : await postsFor(episodes.map((e) => e.id));
  return <StudioCalendar episodes={episodes} posts={rows.map(postView)} missing={missing} now={new Date().toISOString()} ig={await instagramStatus()} />;
}
