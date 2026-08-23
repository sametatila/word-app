import { notFound, redirect } from "next/navigation";
import { getUserId } from "@/lib/auth/server";
import { BossPlayer } from "@/components/boss-player";

export const dynamic = "force-dynamic";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Modül sınavı sayfası.
 *
 * Ayrı bir adres, `/lessons/[id]` ile çakışmıyor (üç parça, tek parçaya karşı)
 * ve paylaşılabilir: "A1 üçüncü modül sınavı" bir bağlantıyla açılabiliyor.
 * Sınavın kendisi istemcide kuruluyor çünkü süre ve akış oradan yönetiliyor.
 */
export default async function BossPage({
  params,
}: {
  params: Promise<{ level: string; module: string }>;
}) {
  const userId = await getUserId();
  if (!userId) redirect("/login");

  const { level, module: mod } = await params;
  const index = Number(mod);
  if (!LEVELS.includes(level) || !Number.isInteger(index) || index < 0 || index > 20) notFound();

  return <BossPlayer level={level} moduleIndex={index} onExitHref="/lessons" />;
}
