import type { Metadata } from "next";
import { studioGate } from "@/lib/studio-auth";
import { listRequests } from "@/lib/studio-requests";
import { AdminDenied } from "../../admin/_ui/ui";
import { RequestsView } from "./requests";

export const metadata: Metadata = { title: "Talepler" };
export const dynamic = "force-dynamic";

/** lernomi.app/studio/requests — Defne sesi talepleri (süreç: lib/studio-requests). */
export default async function StudioRequestsPage() {
  const gate = await studioGate();
  if (!gate.ok || !gate.role) return <AdminDenied title="Stüdyo" email={gate.email} />;
  const requests = await listRequests(gate.email ?? "", gate.role);
  return <RequestsView requests={requests} role={gate.role} email={gate.email ?? ""} />;
}
