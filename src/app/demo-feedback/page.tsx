import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { adminGate } from "@/lib/admin";
import DemoFeedback from "./demo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { robots: { index: false, follow: false } };

/**
 * Geliştirme vitrini — ÜRETİMDE YALNIZ ADMİNE (teknik denetim TEC-12).
 * Sayfa herkese 200 dönüyordu ve indekslenebiliyordu; içerik sahte veri ama
 * uygulamanın iç bileşenlerini dışarıya sergiliyordu. Yerelde herkese açık,
 * canlıda admin değilse gerçek 404 (`notFound()` hiçbir Suspense sınırından
 * önce).
 */
export default async function Page() {
  if (process.env.NODE_ENV === "production" && !(await adminGate()).ok) notFound();
  return <DemoFeedback />;
}
