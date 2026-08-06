import { redirect } from "next/navigation";
import { getUserInfo, authEnabled } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { CourseOnboarding } from "@/components/course-onboarding";

export const dynamic = "force-dynamic";

/**
 * İlk giriş ekranı: kurs (Almanca / Zürih Almancası) ve başlangıç seviyesi.
 * Kurs zaten seçilmişse doğrudan uygulamaya geçilir; ayarlar sonradan
 * profilden değiştirilebilir.
 */
export default async function CourseSelectPage() {
  const user = await getUserInfo();
  if (!user) redirect(authEnabled ? "/login" : "/");

  let alreadyChosen = false;
  try {
    const profile = await ensureProfile(user.id, user.name);
    alreadyChosen = Boolean(profile?.courseChosenAt);
  } catch {
    // Veritabanına ulaşılamıyorsa da ekran açılır; kayıt sonrasında yapılır.
  }
  // redirect() try içinde çağrılmaz: fırlattığı NEXT_REDIRECT catch'e takılır.
  if (alreadyChosen) redirect("/learn");

  return <CourseOnboarding />;
}
