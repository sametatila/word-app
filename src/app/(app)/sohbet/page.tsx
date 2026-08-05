import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { chatConfigured } from "@/lib/chat-providers";
import { ChatPlayer } from "@/components/chat-player";

export const dynamic = "force-dynamic";

/** Serbest sohbet: seviyeye göre konuşan, hatayı akışı bölmeden düzelten partner. */
export default async function ChatPage() {
  const userId = await getUserId();
  if (!userId) redirect("/giris");
  const profile = await ensureProfile(userId);

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      <div className="mb-3 shrink-0">
        <h1 className="text-lg font-bold">Sohbet</h1>
        <p className="muted text-xs">
          {profile.level} seviyesinde Almanca konuşma partneri — çalıştığın kelimeleri
          konuşmaya kendiliğinden katar.
        </p>
      </div>
      <ChatPlayer configured={chatConfigured()} level={profile.level} />
    </div>
  );
}
