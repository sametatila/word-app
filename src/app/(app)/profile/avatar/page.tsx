import { AvatarEditor } from "@/components/avatar-editor";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { lockedAvatarParts } from "@/lib/avatar-items";
import { getLang } from "@/lib/i18n/server";

export const generateMetadata = titleMeta("avatar.your_avatar");
export const dynamic = "force-dynamic";

/**
 * Avatar düzenleme — mobil `AvatarScreen`in karşılığı; web'de hiç yoktu.
 *
 * KİLİTLER BURADA OKUNUYOR, düzenleyicide değil. Düzenleyici bir istemci
 * bileşeni; kilitleri kendisi çekseydi ekran bir yükleme durumu daha taşır ve
 * kilitli parçalar bir an açık görünürdü. Sayfa zaten sunucuda. Kilidin
 * tanımı `lib/avatar-unlocks`ta; gelen, bu kullanıcı için kilitli parçalar ve
 * nasıl açılacakları (kullanıcının dilinde).
 *
 * Bu liste yalnız NE GÖSTERİLECEĞİNİ belirliyor; kaydı `api/profile` eliyor.
 */
export default async function AvatarPage() {
  const userId = await getUserId();
  const locked = userId ? await lockedAvatarParts(userId, await getLang()).catch(() => ({})) : {};
  return <AvatarEditor locked={locked} />;
}
