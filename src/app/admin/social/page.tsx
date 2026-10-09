import type { Metadata } from "next";
import { adminGate } from "@/lib/admin";
import { listSocialPosts, socialPlan } from "@/lib/social-posts";
import { AdminDenied } from "../_ui/ui";
import { SocialAdmin } from "./social-admin";

export const metadata: Metadata = { title: "Sosyal medya" };
export const dynamic = "force-dynamic";

/**
 * lernomi.app/admin/social — sosyal medya takvimi (TikTok + Instagram Reels, günde 3 video).
 *
 * Plan depodan (`data/social/plan.json`, Claude üretir), durum veritabanından (`social_posts`). Panel planı
 * değiştirmez; Samet platformun zamanlayıcısına koyduğunu ve yayınlananı işaretler. Ayrıntı: `docs/social/README.md`.
 */
export default async function AdminSocialPage() {
  const gate = await adminGate();
  if (!gate.ok) return <AdminDenied title="Sosyal medya" email={gate.email} />;

  const { posts, missing } = await listSocialPosts();
  return <SocialAdmin plan={socialPlan()} posts={posts} missing={missing} now={new Date().toISOString()} />;
}
