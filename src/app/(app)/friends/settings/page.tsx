import { getUserId } from "@/lib/auth/server";
import { titleMeta } from "@/lib/page-meta";
import { socialMe } from "@/lib/social/profile";
import { ensureProfile } from "@/lib/session";
import { BackButton } from "@/components/page-back";
import { SocialSettings } from "@/components/social/social-settings";
import { getT } from "@/lib/i18n/server";
import { RetryButton } from "@/components/retry-button";

export const dynamic = "force-dynamic";
export const generateMetadata = titleMeta("socialsettings.social_and_privacy");
/**
 * Sosyal ve gizlilik — KENDİ ADRESİ, mobildeki `SocialSettingsScreen` gibi.
 *
 * Web'de bu kart uygulama ayarlarının en altındaydı ve Arkadaşlar ekranından
 * `#social` çapasıyla gidiliyordu. İki sorunu vardı: mobilin ayarlar
 * ekranında sosyal diye bir bölüm YOK (kullanıcı adı, görünürlük ve engel
 * listesi Arkadaşlar'a ait), ve çapa bağlantısı kullanıcıyı başka bir
 * ekranın ortasına bırakıp geri dönüşü kendi başına bulmaya bırakıyordu.
 */
export default async function SocialSettingsPage() {
  const t = await getT();
  const userId = await getUserId();
  if (!userId) return null;
  try {
    /* ensureProfile YAN ETKİSİ İÇİN duruyor: profil satırı yoksa burada
       doğuyor. Dönen değer artık kullanılmıyor (kurs yalnız kaldırılan kısa
       tanıtımın yer tutucusunda geçiyordu). */
    const [me] = await Promise.all([socialMe(userId), ensureProfile(userId, null)]);
    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <BackButton fallback="/friends" />
          {/* `min-w-0 break-words`: esnek satırdaki başlık dar ekranda en uzun
              kelimesinden daralamıyor ve satırı taşırıyordu. `truncate` bilerek
              yok (öteki `PageBack` başlıkları gibi): Almancası ("Soziales und
              Datenschutz") uzun, sarılması kesilmesinden iyi. */}
          <h1 className="min-w-0 flex-1 break-words text-h2">{t("socialsettings.social_and_privacy")}</h1>
        </div>
        <SocialSettings initial={me} bare />
      </div>
    );
  } catch (err) {
    console.error("[social settings page]", err);
    return (
      <div role="alert" className="card mx-auto w-full max-w-md p-4 text-center">
        <h2 className="text-h2">{t("socialw.friends_load_failed")}</h2>
        <p className="muted mt-2 text-body">{t("socialw.try_in_a_moment")}</p>
        <RetryButton />
      </div>
    );
  }
}
