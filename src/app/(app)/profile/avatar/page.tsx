import { AvatarEditor } from "@/components/avatar-editor";
import { titleMeta } from "@/lib/page-meta";
import { getUserId } from "@/lib/auth/server";
import { unlockedAchievementIds } from "@/lib/achievements";

export const generateMetadata = titleMeta("avatar.your_avatar");
export const dynamic = "force-dynamic";

/**
 * Avatar düzenleme — mobil `AvatarScreen`in karşılığı; web'de hiç yoktu.
 *
 * KAZANILMIŞ ROZETLER BURADA OKUNUYOR, düzenleyicide değil. Düzenleyici bir
 * istemci bileşeni; rozetleri kendisi çekseydi ekran bir yükleme durumu daha
 * taşır ve kilitli aksesuarlar bir an açık görünürdü. Sayfa zaten sunucuda,
 * tek sorgu yeter.
 *
 * Bu liste yalnız NE GÖSTERİLECEĞİNİ belirliyor; kaydı `api/profile` eliyor.
 */
export default async function AvatarPage() {
  const userId = await getUserId();
  const unlocked = userId ? await unlockedAchievementIds(userId).catch(() => new Set<string>()) : new Set<string>();
  return <AvatarEditor unlocked={[...unlocked]} />;
}
