import Link from "next/link";
import type { ExamResult } from "@/lib/exam";

type WeeklyRow = { week: string; score: number; correct: number | null; total: number | null };

/**
 * Profil "Sınavlarım" (WP-64): seviye/modül sınavları (WP-41) ve haftalık
 * kullanım sınavları (WP-42) tek arşivde; geçilen sınavın sertifikası
 * buradan açılır. Sunucu bileşeni; veri profil sayfasından gelir.
 * Hiç sınav yoksa kart yine görünür — giriş bağlantısı burada.
 */
export function ExamsCard({ history, weekly, level }: { history: ExamResult[]; weekly: WeeklyRow[]; level: string }) {
  const passed = history.filter((e) => e.passed && !e.trial).length;
  return (
    <section id="exams" className="card p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-bold">Sınavlarım</h2>
          <p className="muted mt-1 text-xs">
            {history.length ? `${history.length} sınav · ${passed} sertifika` : "Henüz sınav yok"}
            {weekly.length ? ` · ${weekly.length} haftalık` : ""}
          </p>
        </div>
        <Link href={`/exam/${level}`} className="btn btn-primary shrink-0 px-3.5 py-2 text-xs">
          {level} sınavı
        </Link>
      </div>

      {history.length ? (
        <ul className="mt-3 divide-y" style={{ borderColor: "var(--border)" }}>
          {history.map((e) => (
            <li key={e.id} className="flex items-center gap-3 py-2 text-sm" style={{ borderColor: "var(--border)" }}>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">
                  {e.kind === "level" ? `${e.level} seviye sınavı` : `${e.level} · Modül ${(e.module ?? 0) + 1}`}
                  {e.trial ? <span className="muted font-normal"> · deneme</span> : null}
                </span>
                <span className="muted block text-xs">
                  {e.at.slice(0, 10)} · {e.passed ? "geçti" : "geçmedi"}
                </span>
              </span>
              <span className="tabular-nums font-bold" style={{ color: e.passed ? "var(--color-mint)" : "var(--color-rose)" }}>
                %{e.total}
              </span>
              {e.passed && !e.trial ? (
                <a href={`/api/certificate/${e.id}`} target="_blank" rel="noreferrer" className="btn btn-ghost shrink-0 px-2.5 py-1 text-xs">
                  Sertifika
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}

      {weekly.length ? (
        <div className="mt-3">
          <p className="muted text-[11px] font-bold uppercase tracking-wide">Haftalık kullanım</p>
          {/* Hafta başına tek puan; yeni hafta en solda. Çubuk yüksekliği puan. */}
          <div className="mt-1.5 flex items-end gap-1.5" aria-label="Haftalık kullanım sınavı puanları">
            {[...weekly].reverse().map((w) => (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-1" title={`${w.week}: %${w.score}`}>
                <div className="flex h-12 w-full items-end overflow-hidden rounded-md surface-2">
                  <div
                    className="w-full rounded-md"
                    style={{ height: `${Math.max(4, w.score)}%`, background: w.score >= 70 ? "var(--color-mint)" : "var(--color-flame)" }}
                  />
                </div>
                <span className="muted text-[10px] tabular-nums">%{w.score}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <p className="muted mt-3 text-xs">
        <Link href="/learn/haftalik" className="font-semibold underline-offset-2 hover:underline">
          Haftalık kullanım sınavı
        </Link>
        {" "}(15 tur, pekişmiş kelimeler cümle içinde) ve{" "}
        <Link href="/skills" className="font-semibold underline-offset-2 hover:underline">
          beceri merkezi
        </Link>
        'nin Sınav sekmesi.
      </p>
    </section>
  );
}
