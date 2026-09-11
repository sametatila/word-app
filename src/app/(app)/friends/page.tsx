import Link from "next/link";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { WrenchIcon } from "@/components/icons";
import { socialMe } from "@/lib/social/profile";
import { FriendsHub } from "@/components/social/friends-hub";
import { hubTab } from "@/lib/social/hub-tab";
import { getT } from "@/lib/i18n/server";
import { RetryButton } from "@/components/retry-button";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("friends.friends");
export default async function FriendsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const t = await getT();
  const userId = await getUserId();
  if (!userId) return null;
  const { tab } = await searchParams;
  try {
    const me = await socialMe(userId);
    return (
      <div className="mx-auto w-full max-w-3xl">
        {/* Ayarlar başlığın SAĞ ÜSTÜNDE — mobil `ScreenHeader`in `right`
            yuvası. Kimlik kartının içinde bir çipti; kart kimliği söylüyor,
            ayarlar ise ekranın kendi eylemi. */}
        {/* Geri düğmesi YOK: burası artık bir sekme, bir yığın sayfası değil —
            geri gidilecek yer yok, sekme çubuğu zaten altta duruyor. */}
        <div className="mb-4 flex items-center gap-3">
          <h1 className="min-w-0 flex-1 truncate text-h2">{t("friends.friends")}</h1>
          <Link
            href="/friends/settings"
            prefetch={false}
            aria-label={t("friends.social_settings")}
            className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
            style={{ background: "var(--surface-2)" }}
          >
            <WrenchIcon size={20} />
          </Link>
        </div>
        <FriendsHub me={me} initialTab={hubTab(tab)} />
      </div>
    );
  } catch (err) {
    console.error("[friends page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">{t("socialw.friends_load_failed")}</h2>
        <p className="muted mt-2 text-sm">{t("socialw.try_in_a_moment")}</p>
        <RetryButton />
      </div>
    );
  }
}
