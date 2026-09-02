import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { SocialError } from "@/lib/social/errors";
import { ensureUsername, publicProfile } from "@/lib/social/profile";
import { BackButton } from "@/components/page-back";
import { PublicProfile } from "@/components/social/public-profile";

export const dynamic = "force-dynamic";

/** /u/<kullanıcıadı> — davet bağlantısının açıldığı yer. Oturum yoksa (app) düzeni girişe yollar. */
export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const userId = await getUserId();
  if (!userId) return null;
  const { username } = await params;
  try {
    await ensureUsername(userId);
    const data = await publicProfile(userId, username);
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="mb-3 flex items-center gap-2">
          <BackButton fallback="/friends" />
          <h1 className="text-lg font-bold">Profil</h1>
        </div>
        <PublicProfile data={data} me={userId} />
      </div>
    );
  } catch (err) {
    if (err instanceof SocialError && err.code === "not_found") notFound();
    console.error("[u page]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Profil yüklenemedi</h2>
        <p className="muted mt-2 text-sm">Birkaç saniye sonra tekrar dene.</p>
      </div>
    );
  }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  return { title: `@${username.replace(/[^a-z0-9_]/gi, "").slice(0, 20)}` };
}
