import Link from "next/link";
import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { getSessionRead, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, failed } = await getSessionRead();
  // Oturuma BAKILAMADI ile oturum YOK aynı şey değil. Auth sunucusuna bir
  // anlık erişim sorununda kullanıcıyı giriş ekranına atmak, duran bir oturumu
  // kendi elimizle bitirmek olur: çerez yerinde, kullanıcı çıkmadı, ama karşısına
  // giriş formu geliyor. Burada yalnızca "yeniden dene" gösteriliyor.
  if (!user && failed) return <SessionUnavailable />;
  if (!user) redirect(authEnabled ? "/login" : "/");

  let streak = 0;
  let xp = 0;
  let course = "de";
  let voice: string | null = null;
  let name: string | null = null;
  let needsOnboarding = false;
  try {
    const profile = await ensureProfile(user.id, user.name);
    streak = profile?.currentStreak ?? 0;
    xp = profile?.totalXp ?? 0;
    course = profile?.course ?? "de";
    voice = profile?.voice ?? null;
    name = profile?.displayName ?? user.name ?? null;
    // Kurs hiç seçilmediyse (yeni kullanıcı) önce kurs/seviye ekranı gelir.
    // İsmi olmayan hesaplar da buraya düşer: sıralamada "İsimsiz öğrenci"
    // olarak görünmek yerine bir kez isim sorulur.
    needsOnboarding = Boolean(profile) && (!profile.courseChosenAt || !profile.displayName);
  } catch (err) {
    // Veritabanı henüz kurulmadıysa arayüz yine de açılsın.
    console.error("[layout] profil okunamadı", err);
  }
  if (needsOnboarding) redirect("/setup");

  return (
    <AppShell streak={streak} xp={xp} course={course} voice={voice} userId={user.id} name={name}>
      {children}
    </AppShell>
  );
}

/** Oturum sunucusuna ulaşılamadı — çıkış değil, geçici bir kesinti. */
function SessionUnavailable() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-xl font-bold">Bağlantı kurulamadı</h1>
      <p className="muted text-sm">
        Hesabın açık, ama şu anda sunucuya ulaşılamıyor. Birkaç saniye sonra tekrar dene —
        çıkış yapmana gerek yok.
      </p>
      <Link href="/learn" prefetch={false} className="btn btn-primary px-5 py-3">
        Tekrar dene
      </Link>
    </div>
  );
}
