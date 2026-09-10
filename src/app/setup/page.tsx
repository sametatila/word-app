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
        /*
          SABİT KÖŞE, sihirbazın altında DEĞİL. İlk deneme `<CourseOnboarding>`
          sonrasına konmuştu ama o bileşen `min-h-dvh` ile ekranı dolduruyor:
          bağlantı ilk ekranda hiç görünmüyor, kullanıcı kaydırmak zorunda
          kalıyordu — yani çıkış yine pratikte yoktu.
        */
        <div className="pointer-events-none fixed inset-x-0 top-0 z-10">
          {/*
            SİHİRBAZIN SÜTUNUNA HİZALI. Önce `fixed right-0` idi ve görünüm
            alanının köşesine yapışıyordu: geniş ekranda içerik sütununun çok
            dışına düşüyor, sayfanın hiçbir şeyiyle hizalanmıyordu. Ölçüler
            `CourseOnboarding`in kendi kabıyla aynı (`max-w-xl px-4`).

            Şerit tam genişlikte ama `pointer-events-none`: görünmez bir bant
            sihirbazın üst kısmındaki tıklamaları yutmasın. Yalnız düğmenin
            kendisi tıklanabilir.
          */}
          <div className="mx-auto flex w-full max-w-xl justify-end px-4 py-3">
            <span className="pointer-events-auto">
              <SignOutLink email={user.email} />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
