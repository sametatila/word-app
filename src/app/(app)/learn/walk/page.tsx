import { ModeScreen } from "@/components/learn/mode-screen";
import { titleMeta } from "@/lib/page-meta";
import { getUserInfo } from "@/lib/auth/server";
import { walkQuota } from "@/lib/premium/unlock-view";

export const generateMetadata = titleMeta("learn.walk_mode");
export const dynamic = "force-dynamic";
/**
 * Yürüyüş modu — dinle ve söyle, ekrana bakmadan (bkz. docs/plan/walk-stt.md).
 *
 * Bugünkü oturum hakkı (2026-09-25: ücretsizde günde 3, ekran açık) sunucuda
 * okunup kapağa iniyor: kullanıcı başlamadan kaç oturumu kaldığını görüyor.
 * Kapıyı yine `/api/session?walk=1` tutuyor.
 */
export default async function WalkPage() {
  const walk = await walkQuota(await getUserInfo());
  return <ModeScreen mode="walk" walk={walk} />;
}
