import { getUserId } from "@/lib/auth/server";
import { socialMe } from "@/lib/social/profile";
import { BackButton } from "@/components/page-back";
import { FriendsHub, type HubTab } from "@/components/social/friends-hub";

export const dynamic = "force-dynamic";
export const metadata = { title: "Arkadaşlar" };

const TABS: HubTab[] = ["friends", "feed", "quests", "requests", "find"];

export default async function FriendsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const userId = await getUserId();
  if (!userId) return null;
  const { tab } = await searchParams;
  const initialTab: HubTab = TABS.includes(tab as HubTab) ? (tab as HubTab) : "friends";
  try {
    const me = await socialMe(userId);
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="mb-3 flex items-center gap-2">
          <BackButton fallback="/profile" />
          <h1 className="text-lg font-bold">Arkadaşlar</h1>
        </div>
        <FriendsHub me={me} initialTab={initialTab} />
      </div>
    );
  } catch (err) {
    console.error("[friends page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Arkadaşlar yüklenemedi</h2>
        <p className="muted mt-2 text-sm">Birkaç saniye sonra tekrar dene.</p>
      </div>
    );
  }
}
