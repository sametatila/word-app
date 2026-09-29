import { LoadingRegion } from "@/components/loading-region";
import { CardGrid } from "@/components/layout";
import { SkeletonTile } from "@/components/skeleton";
import { TextSlot, TileSlot } from "@/components/flow-skeleton";
import { GAME_LABEL_KEYS, type GameId } from "@/lib/types";

/* Sayfanın `TILES` sırasındaki ilk altı oyun (Almanca kurs; artikel yalnız
   orada). Karo adı ve ipucu anahtarı gerçeğinin kendisi. */
const FIRST: GameId[] = ["choice", "artikel", "cloze", "typing", "listen", "truefalse"];

/**
 * Pratik iskeleti — sayfanın sırasıyla: geri satırı (`PageBack`), karışık tur
 * kahramanı, "tek oyun" başlığı ve oyun karoları, en altta not.
 *
 * Eskisi geri düğmesini çizmiyordu, karoları sabit iki/üç sütunda ve gerçek
 * karodan (min 8.25rem) kısa çiziyordu; sayfa ise `CardGrid min={150}` ile
 * genişliğe göre sütun açıyor. İskelet aynı ızgarayı kullanıyor. Karo sayısı
 * kursa göre değişiyor (Almanca 11); ilk ekranı dolduran altısı çiziliyor:
 * iki sütunda (telefon, md) üç tam satır, üç sütunda (sm, lg+) iki tam satır.
 *
 * Metinler gerçek cümlenin görünmez hâli (`TextSlot`): karo ipucunun ve
 * alttaki notun satır sayısını her dilde ve genişlikte tarayıcı buluyor.
 * Eskiden Türkçeden ölçülmüş kırılım gizlemeleri vardı (`md:hidden`,
 * `lg:hidden`); İngilizce ve Almancada tutmuyordu.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl space-y-5">
      <div aria-hidden className="mb-4 flex items-center gap-3">
        <SkeletonTile size={44} />
        <div className="min-w-0 flex-1">
          <TextSlot k="practice.practice" className="line-clamp-2 break-words text-h2" />
          <TextSlot k="practice.practice_one_game_with_your_own" className="truncate text-caption" />
        </div>
      </div>

      {/* Karışık tur: p-5, 48 px karo + h3/caption iki satır. */}
      <div aria-hidden className="flex animate-pulse items-center gap-3 rounded-card p-5 surface-2">
        <div className="h-12 w-12 shrink-0" />
        <div className="min-w-0 flex-1">
          <TextSlot k="practice.mixed_round" ghost className="text-h3" />
          <TextSlot k="practice.all_game_types_in_one" ghost className="text-caption" />
        </div>
        <div className="w-5 shrink-0" />
      </div>

      <section aria-hidden className="space-y-3">
        <TextSlot k="practice.single_game" className="text-micro uppercase tracking-eyebrow" />
        <CardGrid min={150}>
          {FIRST.map((game) => (
            <div key={game} className="card flex min-h-[8.25rem] flex-col justify-between gap-3 p-4">
              <TileSlot className="h-11 w-11" />
              <div>
                <TextSlot k={GAME_LABEL_KEYS[game]} className="text-h3" />
                <TextSlot k={`prac.${game}`} className="text-caption" />
              </div>
            </div>
          ))}
        </CardGrid>
      </section>

      <TextSlot k="prac.note" className="px-1 text-caption leading-relaxed" />
    </LoadingRegion>
  );
}
