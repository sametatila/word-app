import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { studioGate } from "@/lib/studio-auth";
import { getEpisode, postsFor } from "@/lib/studio";
import { requestsForEpisode } from "@/lib/studio-requests";
import { instagramStatus, postView } from "@/lib/social-posts";
import { AdminDenied } from "../../admin/_ui/ui";
import { StudioEditor } from "./editor";

export const metadata: Metadata = { title: "Bölüm" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio/<bölüm> — metin düzenleme, canlı önizleme, onay ve sunucuda video üretimi; `?sekme=paylasim` paylaşım sekmesi. */
export default async function StudioEpisodePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ sekme?: string }> }) {
  const gate = await studioGate();
  if (!gate.ok || !gate.role) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { id } = await params;
  const { sekme } = await searchParams;
  const ep = await getEpisode(id);
  if (!ep) notFound();
  return <StudioEditor initial={ep} posts={(await postsFor([id])).map(postView)} igConnected={(await instagramStatus()).connected} role={gate.role} email={gate.email ?? ""} requests={await requestsForEpisode(id)} tab={sekme === "paylasim" || sekme === "icerik" ? sekme : undefined} />;
}
