import { LoadingRegion } from "@/components/loading-region";
import { COVERS, CoverSkeleton } from "@/components/flow-skeleton";

/**
 * Deneme sınavı bölümü gelene kadar iskelet — oynatıcının İLK karesi olan
 * kapak (`MockExamPlayer` `phase === "cover"`): ikon karosu, kâğıt · bölüm,
 * tema, yönerge, beş kural, ana dildeki karşılık notu, Başla / Listeye dön.
 *
 * Eskiden görev ekranını çiziyordu (ilerleme şeridi, metin, şıklar); oysa
 * bölüm kapakla açılıyor ve görev ancak "Başla"dan sonra geliyor. Kâğıt
 * sunucuda yerelleştiriliyor (dört istek); Android `MockExamScreen` kâğıt
 * inerken aynı kapağı `CoverSkeleton`la çiziyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="flex w-full flex-1 flex-col">
      <CoverSkeleton {...COVERS.mock} />
    </LoadingRegion>
  );
}
