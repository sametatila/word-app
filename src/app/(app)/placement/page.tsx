import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { lastPlacement, RETAKE_DAYS } from "@/lib/placement";
import { PlacementTest } from "@/components/placement/placement-test";

export const metadata = { title: "Seviye testi" };
export const dynamic = "force-dynamic";

/** Yerleştirme testi sayfası (WP-40). Son alma sunucuda okunur; test istemcide akar. */
export default async function PlacementPage() {
  const userId = await getUserId();
  if (!userId) redirect("/login");
  let last = null;
  try {
    last = await lastPlacement(userId);
  } catch (err) {
    console.error("[placement page]", err);
  }
  const canRetake = !last || Date.now() - new Date(last.at).getTime() >= RETAKE_DAYS * 86400000;
  return (
    <div className="mx-auto w-full max-w-2xl">
      <PlacementTest initialLast={last} canRetake={canRetake} retakeDays={RETAKE_DAYS} />
    </div>
  );
}
