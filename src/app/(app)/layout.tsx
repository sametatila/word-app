import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserInfo();
  if (!user) redirect(authEnabled ? "/giris" : "/");

  let streak = 0;
  let xp = 0;
  let course = "de";
  let needsOnboarding = false;
  try {
    const profile = await ensureProfile(user.id, user.name);
    streak = profile?.currentStreak ?? 0;
    xp = profile?.totalXp ?? 0;
    course = profile?.course ?? "de";
    // Kurs hiç seçilmediyse (yeni kullanıcı) önce kurs/seviye ekranı gelir.
    needsOnboarding = Boolean(profile) && !profile.courseChosenAt;
  } catch (err) {
    // Veritabanı henüz kurulmadıysa arayüz yine de açılsın.
    console.error("[layout] profil okunamadı", err);
  }
  if (needsOnboarding) redirect("/kurs-sec");

  return (
    <AppShell streak={streak} xp={xp} course={course}>
      {children}
    </AppShell>
  );
}
