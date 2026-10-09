import type { Metadata } from "next";
import { studioGate } from "@/lib/studio-auth";
import { listEpisodes, postsFor } from "@/lib/studio";
import type { SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
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
  const posts: SocialPost[] = rows.map((r) => ({
    episodeId: r.episodeId,
    platform: r.platform as SocialPlatform,
    status: r.status as SocialStatus,
    url: r.url,
    externalId: r.externalId,
    publishedAt: r.publishedAt ? r.publishedAt.toISOString() : null,
    metrics: r.metrics ?? null,
    metricsAt: r.metricsAt ? r.metricsAt.toISOString() : null,
    note: r.note,
    updatedBy: r.updatedBy,
    updatedAt: r.updatedAt.toISOString(),
  }));
  return <StudioCalendar episodes={episodes} posts={posts} missing={missing} now={new Date().toISOString()} />;
}
