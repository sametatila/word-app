import { LoadingRegion } from "@/components/loading-region";
import { PageSkeleton } from "@/components/skeleton";

/**
 * Beceriler gelene kadar iskelet.
 *
 * Sayfa sunucuda profil ve ilerleme okuyor; o sürede ekran bomboş kalıyordu.
 * Ana ekrana eklenmiş uygulamada tarayıcının kendi yükleme göstergesi de yok,
 * yani sekmeye basınca hiçbir şey olmuyormuş gibi görünüyordu. Mobilde aynı
 * ekran (`SkillsScreen`) beklerken iskelet çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <PageSkeleton rows={6} />
    </LoadingRegion>
  );
}
