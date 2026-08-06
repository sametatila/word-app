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
  let knownName = "";
  try {
    const profile = await ensureProfile(user.id, user.name);
    // Kurs seçilmiş olsa bile ismi olmayan hesap buraya gelir; ikisi birden
    // tamamlanmadan uygulamaya geçilmiyor.
    alreadyChosen = Boolean(profile?.courseChosenAt) && Boolean(profile?.displayName);
    // Kimlik sağlayıcısından ad geldiyse alan dolu başlasın — kullanıcı
    // bildiğimiz bir şeyi yeniden yazmak zorunda kalmamalı.
    knownName = profile?.displayName ?? user.name ?? "";
  } catch {
    // Veritabanına ulaşılamıyorsa da ekran açılır; kayıt sonrasında yapılır.
  }
  // redirect() try içinde çağrılmaz: fırlattığı NEXT_REDIRECT catch'e takılır.
  if (alreadyChosen) redirect("/learn");

  return <CourseOnboarding initialName={knownName} />;
}
