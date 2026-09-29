import { AppHeaderSkeleton, SkeletonLine, TextBox } from "@/components/skeleton";
import { BoardSkeleton } from "@/components/social/league-board";

/**
 * Topluluk iskeleti — sayfanın ilk karesi: sekme başlığı (`AppHeader`), üç
 * sekmeli şerit, ilk açılan Lig sekmesinin "Grubum / Arkadaşlar" çipleri ve
 * lig tablosu (`FriendsHub` + `LeagueBoard`). `friends/loading` ve eski
 * `/leaderboard` adresinin yedeği (oraya yönleniyor) aynı şekli çiziyor.
 *
 * Eskisi genel `PageSkeleton`dı (küçük başlık + dört düz blok): sekme
 * başlığının boyu, sekme şeridi ve tablo satırlarının hiçbiri yoktu.
 */
export function FriendsSkeleton() {
  return (
    <>
      <AppHeaderSkeleton titleWidth={150} />

      {/* Sekme şeridi: `surface-2` kap, `p-1`, üç eşit sekme (`py-2` + `text-strong`). */}
      <div aria-hidden className="flex gap-1 rounded-panel p-1" style={{ background: "var(--surface-2)" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-1 justify-center rounded-tile px-3 py-2" style={i === 0 ? { background: "var(--surface)" } : undefined}>
            <SkeletonLine variant="strong" width="50%" />
          </div>
        ))}
      </div>

      <div className="mt-4">
        {/* Grubum / Arkadaşlar çipleri: `chip px-3.5 py-2 text-caption`. */}
        <div aria-hidden className="mb-3 flex gap-1.5">
          {[84, 92].map((w) => (
            <TextBox key={w} variant="caption" className="animate-pulse rounded-tile border border-transparent py-2" style={{ width: w, background: "var(--surface-2)" }} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <BoardSkeleton rows={6} league />
        </div>
      </div>
    </>
  );
}
