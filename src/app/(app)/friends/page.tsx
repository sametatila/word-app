import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { AppHeader } from "@/components/app-header";
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
        {/* SEKME BAŞLIĞI — Öğren, Patika ve Beceriler ile AYNI (`AppHeader`):
            seri, gelen kutusu, profil. Arkadaşlar sonradan sekme oldu ve kendi
            küçük `h2` başlığıyla kalmıştı; sekmeler arasında geçerken başlık
            boyu ve sağdaki kimlik bir var bir yok oluyordu. Sosyal ayarların
            dişlisi başlığa SIĞMIYOR (dar telefonda dört düğme başlığı ezer),
            kimlik kartının köşesinde (`FriendsHub`). */}
        <AppHeader title={t("friends.friends")} />
        <FriendsHub me={me} initialTab={hubTab(tab)} />
      </div>
    );
  } catch (err) {
    console.error("[friends page]", err);
    return (
      <div role="alert" className="card mx-auto w-full max-w-md p-4 text-center">
        <h2 className="text-h2">{t("socialw.friends_load_failed")}</h2>
        <p className="muted mt-2 text-body">{t("socialw.try_in_a_moment")}</p>
        <RetryButton />
      </div>
    );
  }
}
