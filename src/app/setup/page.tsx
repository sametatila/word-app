import { redirect } from "next/navigation";
import { SignOutLink } from "@/components/sign-out-link";
import { getUserInfo } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { CourseOnboarding } from "@/components/course-onboarding";
import { OnboardingAdopt } from "@/components/onboarding-adopt";
import { titleMeta } from "@/lib/page-meta";

export const dynamic = "force-dynamic";

/**
 * İlk giriş ekranı: kurs (Almanca / Zürih Almancası) ve başlangıç seviyesi.
 * Kurs zaten seçilmişse doğrudan uygulamaya geçilir; ayarlar sonradan
 * profilden değiştirilebilir.
 */
export const generateMetadata = titleMeta("onboarding.welcome_to_lernomi");

export default async function CourseSelectPage() {
  /*
    OTURUM ARTIK ŞART DEĞİL.

    Akış "önce hesap, sonra kurulum"du: kullanıcı değer görmeden kayıt olmak
    zorundaydı ve açılış sayfasının bütün çağrıları giriş duvarına gidiyordu.
    Mobilde sıra tersine ve bilerek öyle — Onboarding → ilk kelimeler → Auth.

    Oturum varsa kararlar doğrudan profile yazılıyor (eski davranış). Yoksa
    cihazda saklanıp giriş sonrası profile taşınıyor (bkz. lib/onboarding-prefs
    ve components/onboarding-adopt).
  */
  const user = await getUserInfo();

  let alreadyChosen = false;
  let knownName = "";
  try {
    if (!user) throw new Error("misafir");
    const profile = await ensureProfile(user.id, user.name);
    // Kurs seçilmiş olsa bile ismi olmayan hesap buraya gelir; ikisi birden
    // tamamlanmadan uygulamaya geçilmiyor.
    alreadyChosen = Boolean(profile?.courseChosenAt) && Boolean(profile?.displayName);
    // Kimlik sağlayıcısından ad geldiyse alan dolu başlasın — kullanıcı
    // bildiğimiz bir şeyi yeniden yazmak zorunda kalmamalı.
    knownName = profile?.displayName ?? user.name ?? "";
  } catch {
    // Misafir ya da veritabanına ulaşılamıyor — ekran yine açılır.
  }
  // redirect() try içinde çağrılmaz: fırlattığı NEXT_REDIRECT catch'e takılır.
  if (alreadyChosen) redirect("/learn");

  return (
    <>
      {/*
        Misafirken onboarding'i bitirip hesap açan kullanıcı BURAYA düşüyor:
        `(app)` düzeni kursu seçilmemiş profili `/setup`e yolluyor. Kararlar
        cihazda duruyor ve bu bileşen onları profile taşıyor; taşındığı anda
        `courseChosenAt` doluyor, sayfa tazeleniyor ve yukarıdaki yönlendirme
        kullanıcıyı `/learn`e alıyor. Yani sihirbaz ikinci kez sorulmuyor.
      */}
      {user ? <OnboardingAdopt /> : null}
      <CourseOnboarding initialName={knownName} signedIn={Boolean(user)} />
      {/*
        ÇIKIŞ KAPISI. Buraya düşen giriş yapmış kullanıcının başka çıkışı yoktu:
        Profil ekranı `(app)` düzeninin arkasında ve o düzen kursu seçilmemiş
        profili buraya geri yolluyor. Ana sayfadaki her düğme de `/learn`e,
        `/learn` de buraya atıyor — kapalı bir döngü. Yanlış hesapla giren ya da
        vazgeçen kullanıcı kilitleniyordu.
      */}
      {user ? (
        <SignOutLink email={user.email} className="mx-auto mt-8 max-w-md px-5 pb-10 text-center text-sm" />
      ) : null}
    </>
  );
}
