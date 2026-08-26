"use client";

import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/skeleton";
import type { GrowthReport, WeekPoint } from "@/lib/growth";

/**
 * Profil "Gelişim" (WP-52): 8 haftalık çizgiler (yazma, konuşma, kullanım
 * skoru, cevap sayısı), yetkinlik değişimi okları, kilometre taşları.
 * Grafikler satır içi SVG — kütüphane yok, tema renkleri `currentColor`
 * ve CSS değişkenlerinden; hareket yok (hareket azaltmada sorun çıkmaz).
 * Veri olmayan hafta çizgide boşluk: sıfır çizmek "kötü hafta" demek olurdu.
 */
export function GrowthCard() {
  const [data, setData] = useState<GrowthReport | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/growth", { cache: "no-store" });
        if (!res.ok) return setData(null);
        const d = (await res.json()) as GrowthReport;
        if (alive) setData(d);
      } catch {
        setData(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (data === undefined) return <CardSkeleton height={240} label="Gelişim yükleniyor" />;
  if (!data) return null;
  const hasAny = Object.values(data.series).some((s) => s.some((p) => p.value !== null));
  if (!hasAny && !data.milestones.length) return null;

  return (
    <section id="growth" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold">Gelişim</h2>
        <span className="muted text-xs font-semibold">son {data.weeks.length} hafta</span>
      </div>
      <p className="mt-1 text-sm">{data.summary.text}</p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <Spark title="Yazma puanı" points={data.series.writing} max={100} color="var(--color-brand)" />
        <Spark title="Konuşma puanı" points={data.series.speaking} max={100} color="var(--color-mint)" />
        <Spark title="Kullanım skoru" points={data.series.usage} max={100} color="var(--color-flame)" />
        <Spark title="Cevap sayısı" points={data.series.answers} color="var(--text-muted)" />
      </div>

      {data.proficiency.some((p) => p.now !== null || p.before !== null) ? (
        <div className="mt-4">
          <p className="muted text-[11px] font-bold uppercase tracking-wide">Yetkinlik · 4 haftaya göre</p>
          <ul className="mt-1.5 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {data.proficiency.map((p) => {
              const delta = p.now !== null && p.before !== null ? p.now - p.before : null;
              return (
                <li key={p.skill} className="flex items-center justify-between">
                  <span>{p.label}</span>
                  <span className="muted tabular-nums text-xs">
                    {p.now ?? "—"}
                    {delta !== null ? (
                      <span style={{ color: delta > 0 ? "var(--color-mint)" : delta < 0 ? "var(--color-rose)" : undefined }}>
                        {" "}
                        {delta > 0 ? "▲" : delta < 0 ? "▼" : "•"} {Math.abs(delta)}
                      </span>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {data.milestones.length ? (
        <div className="mt-4">
          <p className="muted text-[11px] font-bold uppercase tracking-wide">Kilometre taşları</p>
          <ul className="mt-1.5 space-y-1 text-sm">
            {data.milestones.map((m) => (
              <li key={`${m.at}-${m.text}`} className="flex items-baseline gap-2">
                <span className="muted shrink-0 text-xs tabular-nums">{m.at}</span>
                <span>{m.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function Spark({ title, points, max, color }: { title: string; points: WeekPoint[]; max?: number; color: string }) {
  const values = points.map((p) => p.value);
  const top = max ?? Math.max(1, ...values.map((v) => v ?? 0));
  const W = 120;
  const H = 36;
  const step = W / Math.max(1, points.length - 1);
  const coords = values.map((v, i) => (v === null ? null : [i * step, H - (Math.min(v, top) / top) * (H - 4) - 2] as const));
  let d = "";
  let open = false;
  coords.forEach((c) => {
    if (!c) {
      open = false;
      return;
    }
    d += `${open ? "L" : "M"}${c[0].toFixed(1)},${c[1].toFixed(1)} `;
    open = true;
  });
  const last = [...values].reverse().find((v) => v !== null) ?? null;
  const label = points.map((p, i) => `${p.week}: ${values[i] ?? "—"}`).join(", ");
  return (
    <figure className="rounded-xl px-3 py-2 surface-2">
      <figcaption className="flex items-baseline justify-between text-xs">
        <span className="font-semibold">{title}</span>
        <span className="muted tabular-nums">{last ?? "—"}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-1 h-9 w-full" role="img" aria-label={`${title}: ${label}`}>
        <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => (c ? <circle key={i} cx={c[0]} cy={c[1]} r="2" fill={color} /> : null))}
      </svg>
    </figure>
  );
}
