import { LoadingRegion } from "@/components/loading-region";
import { AppHeaderSkeleton, SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { TextSlot, TileSlot } from "@/components/flow-skeleton";
import { SKILL_LABEL_KEYS, SKILL_ORDER } from "@/lib/skills/meta";

/**
 * Beceriler gelene kadar iskelet — sayfanın KENDİ düzeni.
 *
 * Genel `PageSkeleton` (başlık + altı düz blok) kullanılıyordu; beceri
 * karoları gelince sayfanın şekli değişti ve iskelet onunla hiçbir yerde
 * örtüşmüyordu: öneri kartının ve karoların yeri yoktu, içerik gelince her
 * şey aşağı kayıyordu. Artık her parça gerçeğin kabını (aynı sınıflar, aynı
 * dolgu ve kenarlık) kullanıyor ve yüksekliği içinden çıkıyor. Mobilde aynı
 * ekran (`SkillsScreen`) aynı sırayı çiziyor.
 *
 * Genişlik: sayfa her genişlikte tek sütun (`max-w-3xl`), duyarlı tek sınıf
 * karo aralığı (`sm:gap-2`) ve karo adının dar ekranda iki satıra kırılması;
 * ikisi de burada aynı. Karo adları gerçek etiketin görünmez hâli: hangi adın
 * hangi dilde ve genişlikte kırıldığını tarayıcı buluyor.
 */
export default function Loading() {
  return (
    <LoadingRegion className="mx-auto w-full max-w-3xl">
      <AppHeaderSkeleton titleWidth={160} />

      {/* Seviye etiketi + sayaç, beş eşit sekme. */}
      <div className="mb-2 ml-1 flex items-center justify-between">
        <TextSlot k="skills.level" className="text-caption tracking-wide" />
        <TextSlot k="skills.done_of" v={{ done: 12, total: 60 }} className="text-caption" />
      </div>
      <div className="mb-4 flex gap-2">
        {/* Gerçek sekmenin kendi `chip` sınıfı: kenarlık, zemin, yarıçap ondan. */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="chip flex-1 py-2.5">
            <SkeletonLine variant="strong" width="40%" className="mx-auto" />
          </div>
        ))}
      </div>

      {/* Öneri kartı: 40 px karo, üst satır, egzersiz adı (tek satır, `truncate`),
          gerekçe (`line-clamp-2`, gerçek cümleyle), ok. */}
      <div className="card mb-4 flex items-center gap-3 p-4">
        <TileSlot className="size-10" />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="micro" width="35%" />
          <SkeletonLine variant="strong" width="60%" />
          <TextSlot k="skills.next_behind" v={{ pct: 40 }} vk={{ skill: SKILL_LABEL_KEYS.writing }} className="line-clamp-2 text-caption" />
        </div>
        <div className="w-5 shrink-0" />
      </div>

      {/* Beş beceri karosu — `SkillBrowser` karosuyla aynı kap. */}
      <div className="mb-4 grid grid-cols-5 gap-1.5 sm:gap-2">
        {SKILL_ORDER.map((skill) => (
          <div
            key={skill}
            className="flex min-w-0 flex-col items-center gap-1 rounded-tile px-0.5 pb-2 pt-2.5"
            style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          >
            <SkeletonTile size={20} />
            {/* Karo adı gerçeğinin sınıfıyla (`line-clamp-2 … leading-tight`)
                ve gerçek etiketle: dar karoda iki satıra kırılan ad (ör. "Dil
                bilgisi") satırdaki beş karoyu uzatıyor, iskeletinki de. */}
            <TextSlot as="span" k={SKILL_LABEL_KEYS[skill]} className="line-clamp-2 w-full text-center text-caption leading-tight" />
            <SkeletonLine variant="micro" width="40%" className="mt-auto" />
            <SkeletonBar height={4} className="w-4/5" />
          </div>
        ))}
      </div>

      {/* Seçili becerinin başlığı ve listesi. */}
      <div className="mb-2 ml-1 flex items-center gap-2">
        <SkeletonTile size={18} />
        <TextSlot as="span" k={SKILL_LABEL_KEYS[SKILL_ORDER[0]]} className="text-h3" />
        <TextSlot as="span" text="0/12" className="text-caption" />
      </div>
      <ul className="card divide-y divide-[color:var(--hairline)] px-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--surface-2)" }} />
            <span className="min-w-0 flex-1">
              <SkeletonLine variant="strong" width="65%" />
              <SkeletonLine variant="caption" width="40%" />
            </span>
            <SkeletonTile size={20} />
          </li>
        ))}
      </ul>
    </LoadingRegion>
  );
}
