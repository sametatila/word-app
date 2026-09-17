import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { contentAdminData } from "@/lib/admin-content";
import { AdminDenied } from "../_ui/ui";
import { ContentAdmin } from "./content-admin";

export const metadata: Metadata = { title: "İçerik sürümü" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/content — içerik teslim hattının panel yüzü.
 *
 * AGENTS.md panelin bu hatta tek yazma yetkisini "bozuk maddeyi kapatmak ve
 * sürüm çevirmek" diye tanımlıyordu ama ikisinin de sayfası yoktu: kapatmak
 * ya da geri almak için sunucuya bağlanıp SQL yazmak gerekiyordu.
 */
export default async function AdminContentPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="İçerik sürümü" email={gate.email} />;
  return <ContentAdmin data={await contentAdminData()} />;
}
