import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getUserInfo, stackEnabled } from "@/lib/auth";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserInfo();
  if (!user) redirect(stackEnabled ? "/handler/sign-in" : "/");

  let streak = 0;
  let xp = 0;
  try {
    const profile = await ensureProfile(user.id, user.name);
    streak = profile?.currentStreak ?? 0;
    xp = profile?.totalXp ?? 0;
  } catch (err) {
    // Veritabanı henüz kurulmadıysa arayüz yine de açılsın.
    console.error("[layout] profil okunamadı", err);
  }

  return (
    <AppShell streak={streak} xp={xp}>
      {children}
    </AppShell>
  );
}
