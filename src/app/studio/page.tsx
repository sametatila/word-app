import type { Metadata } from "next";
import { studioGate } from "@/lib/studio-auth";
import { isRange, studioOverview } from "@/lib/social-stats";
import { AdminDenied, AdminPage, Notice } from "../admin/_ui/ui";
import { StudioOverview } from "./stats-ui";

export const metadata: Metadata = { title: "Genel bakış" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio — üç platformun istatistikleri (genel + video bazında). Takvim: /studio/takvim. */
export default async function StudioHome({ searchParams }: { searchParams: Promise<{ aralik?: string }> }) {
  const gate = await studioGate();
  if (!gate.ok) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const { aralik } = await searchParams;
  const r = await studioOverview(isRange(aralik) ? aralik : "30");
  if (r.missing) return <AdminPage><Notice tone="warn" title="İstatistikler okunamadı">Tablolar henüz kurulmamış olabilir (deploy şemayı uygular).</Notice></AdminPage>;
  return <StudioOverview ov={r.data} />;
}
