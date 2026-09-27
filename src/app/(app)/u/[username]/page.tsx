import { notFound } from "next/navigation";
import { getT } from "@/lib/i18n/server";
import { getUserId } from "@/lib/auth/server";
import { SocialError } from "@/lib/social/errors";
import { ensureUsername, publicProfile } from "@/lib/social/profile";
import { PageBack } from "@/components/page-back";
import { PublicProfile } from "@/components/social/public-profile";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";

export const dynamic = "force-dynamic";

/** /u/<kullanıcıadı> — davet bağlantısının açıldığı yer. Oturum yoksa (app) düzeni girişe yollar. */
export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const t = await getT();
  const userId = await getUserId();
  if (!userId) return null;
  const { username } = await params;
  try {
    await ensureUsername(userId);
    const data = await publicProfile(userId, username);
    return (
      <div className="mx-auto w-full max-w-3xl">
        <PageBack fallback="/friends" title={t("user.profile")} />
        <PublicProfile data={data} me={userId} />
      </div>
    );
  } catch (err) {
    if (err instanceof SocialError && err.code === "not_found") notFound();
    console.error("[u page]", err);
    return (
      <FlowColumn>
        <StateBody alert title={t("profw.load_failed")} body={t("socialw.try_in_a_moment")}>
          <RetryButton className="btn btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 disabled:opacity-60" />
        </StateBody>
      </FlowColumn>
    );
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return { title: `@${username.replace(/[^a-z0-9_]/gi, "").slice(0, 20)}` };
}
