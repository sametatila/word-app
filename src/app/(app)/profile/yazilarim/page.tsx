import { PageBack } from "@/components/page-back";
import { WritingsCard } from "@/components/writings-card";

export const metadata = { title: "Yazılarım" };

/** Değerlendirilmiş serbest yazılar (WP-30) — kendi sayfasında. */
export default function WritingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <PageBack fallback="/profile" title="Yazılarım" subtitle="Değerlendirilmiş serbest yazıların" />
      <WritingsCard showEmpty />
    </div>
  );
}
