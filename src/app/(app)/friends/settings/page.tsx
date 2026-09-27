import { getUserId } from "@/lib/auth/server";
import { titleMeta } from "@/lib/page-meta";
import { socialMe } from "@/lib/social/profile";
import { ensureProfile } from "@/lib/session";
import { PageBack } from "@/components/page-back";
import { SocialSettings } from "@/components/social/social-settings";
import { getT } from "@/lib/i18n/server";
import { RetryButton } from "@/components/retry-button";
import { FlowColumn, StateBody } from "@/components/flow";

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
        {/* `PageBack` başlığı sarıyor, kesmiyor: Almancası ("Soziales und
            Datenschutz") uzun, sarılması kesilmesinden iyi. */}
        <PageBack fallback="/friends" title={t("socialsettings.social_and_privacy")} />
        <SocialSettings initial={me} bare />
      </div>
    );
  } catch (err) {
    console.error("[social settings page]", err);
    return (
      <FlowColumn>
        <StateBody alert title={t("socialw.friends_load_failed")} body={t("socialw.try_in_a_moment")}>
          <RetryButton className="btn btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 disabled:opacity-60" />
        </StateBody>
      </FlowColumn>
    );
  }
}
