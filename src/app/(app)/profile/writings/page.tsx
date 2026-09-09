import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { WritingsCard } from "@/components/writings-card";
import { getT } from "@/lib/i18n/server";

export const generateMetadata = titleMeta("writings.my_writing");
/** Değerlendirilmiş serbest yazılar (WP-30) — kendi sayfasında. */
export default async function WritingsPage() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      <PageBack fallback="/profile" title={t("writings.my_writing")} subtitle={t("writ.sub")} />
      <WritingsCard showEmpty />
    </div>
  );
}
