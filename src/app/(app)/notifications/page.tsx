import { BackButton } from "@/components/page-back";
import { Inbox } from "@/components/social/inbox";

export const dynamic = "force-dynamic";
export const metadata = { title: "Bildirimler" };

export default function NotificationsPage() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-3 flex items-center gap-2">
        <BackButton fallback="/friends" />
        <h1 className="text-lg font-bold">Bildirimler</h1>
      </div>
      <Inbox />
    </div>
  );
}
