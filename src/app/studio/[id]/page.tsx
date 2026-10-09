import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studioGate } from "@/lib/studio-auth";
import { getEpisode, postsFor } from "@/lib/studio";
import { requestsForEpisode } from "@/lib/studio-requests";
import type { SocialPlatform, SocialPost, SocialStatus } from "@/lib/social-posts";
import { AdminDenied } from "../../admin/_ui/ui";
import { StudioEditor } from "./editor";

export const metadata: Metadata = { title: "Bölüm" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio/<bölüm> — metin düzenleme, canlı önizleme, onay ve sunucuda video üretimi. */
export default async function StudioEpisodePage({ params }: { params: Promise<{ id: string }> }) {
  const gate = await studioGate();
  if (!gate.ok || !gate.role) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { id } = await params;
  const ep = await getEpisode(id);
  if (!ep) notFound();
  const posts: SocialPost[] = (await postsFor([id])).map((r) => ({
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
  return <StudioEditor initial={ep} posts={posts} role={gate.role} email={gate.email ?? ""} requests={await requestsForEpisode(id)} />;
}
