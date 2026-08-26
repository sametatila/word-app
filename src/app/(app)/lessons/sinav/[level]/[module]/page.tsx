import Link from "next/link";
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

  return (
    <>
      {/*
        Hız turu modülü GEÇİRMİYOR: yalnızca kelimeleri baskı altında
        kullandırıyor. Modülün kapısı yedi bölümlük sınav, bu yüzden bağlantı
        sayfanın en üstünde ve ne olduğunu söylüyor.
      */}
      <div className="mx-auto mb-3 w-full max-w-2xl text-right">
        <Link href={`/exam/${level}/${index}`} className="muted text-xs font-semibold underline-offset-2 hover:underline">
          Modül sınavı (25 dk, yedi bölüm) →
        </Link>
      </div>
      <BossPlayer level={level} moduleIndex={index} onExitHref="/lessons" />
    </>
  );
}
