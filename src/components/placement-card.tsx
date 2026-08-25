import Link from "next/link";
import { describePerSkill } from "@/lib/placement-score";
import type { PlacementRecord } from "@/lib/placement";

/**
 * Profildeki seviye testi kartı (WP-40): son sonuç ve "yeniden al" ya da
 * ilk kez "seviyeni ölç". Sunucu bileşeni; veri profil sayfasından gelir.
 */
export function PlacementCard({ last, canRetake, retakeDays, level }: { last: PlacementRecord | null; canRetake: boolean; retakeDays: number; level: string }) {
  return (
    <section className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-bold">Seviye testi</h2>
          {last ? (
            <p className="muted mt-1 text-xs">
              {last.at.slice(0, 10)} · öneri <strong>{last.suggested}</strong>
              {last.accepted ? ` · seçtiğin ${last.accepted}` : ""} · {describePerSkill(last.perSkill)}
            </p>
          ) : (
            <p className="muted mt-1 text-xs">Henüz alınmadı — 15 dakikada dört beceride seviye önerisi.</p>
          )}
        </div>
        {canRetake ? (
          <Link href="/placement" className="btn btn-primary shrink-0 px-3.5 py-2 text-xs">
            {last ? "Yeniden al" : "Seviyeni ölç"}
          </Link>
        ) : (
          <span className="muted shrink-0 text-xs">{retakeDays} günde bir</span>
        )}
      </div>
      {/* Seviye sınavı (WP-41): 45 dk, beş bölüm, sertifika. */}
      <p className="muted mt-3 text-xs">
        Seviyeni belgelemek için{" "}
        <Link href={`/exam/${level}`} className="font-semibold underline-offset-2 hover:underline">
          {level} seviye sınavı
        </Link>
        {" "}(45 dk, beş bölüm, sertifika).
      </p>
    </section>
  );
}
