import { PageBack } from "@/components/page-back";
import { titleMeta } from "@/lib/page-meta";
import { getT } from "@/lib/i18n/server";
import { Inbox } from "@/components/social/inbox";

export const generateMetadata = titleMeta("inbox.inbox");
/**
 * Gelen kutusu — istek, tepki, dürtme.
 *
 * Bileşen (`components/social/inbox`) aylardır duruyordu ama kendi ADRESİ
 * yoktu: yalnız `/notifications` içinden çiziliyordu ve profilden ona giden
 * bir satır da yoktu. Mobilde ayrı bir ekran (`InboxScreen`) ve Profil'den
 * açılıyor.
 */
export default async function InboxPage() {
  const t = await getT();
  return (
    <div className="mx-auto w-full max-w-md">
      <PageBack fallback="/profile" title={t("inbox.inbox")} />
      <Inbox />
    </div>
  );
}
