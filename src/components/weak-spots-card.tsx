"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ErrorReport } from "@/lib/error-analytics";

/**
 * Profil "Zayıf noktaların" (WP-51): son 30 günün ilk üç hata tipi, her
 * birine tek dokunuşla hedefli tur; karıştırılan kelime çiftleri; dersteki
 * zayıf kurallar. Hata yoksa kart görünmez — boş bir "zayıf nokta yok" kartı
 * ne bilgi verir ne motive eder.
 */
export function WeakSpotsCard() {
  const [report, setReport] = useState<ErrorReport | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/errors", { cache: "no-store" });
        if (!res.ok) return;
        const d = (await res.json()) as ErrorReport;
        if (alive) setReport(d);
      } catch {
        /* kart görünmez */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!report || (!report.types.length && !report.weakRules.length)) return null;
  const top = report.types.slice(0, 3);

  return (
    <section id="weak-spots" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold">Zayıf noktaların</h2>
        <span className="muted text-xs font-semibold">son {report.days} gün · {report.totalWrong} yanlış</span>
      </div>
      {top.length ? (
        <ul className="mt-3 space-y-2">
          {top.map((t) => (
            <li key={t.type} className="flex items-center gap-3">
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{t.label}</span>
                  <span className="muted text-xs tabular-nums">
                    {t.n} · %{t.pct}
                  </span>
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full surface-2">
                  <span className="block h-full rounded-full" style={{ width: `${t.pct}%`, background: "var(--color-rose)" }} />
                </span>
              </span>
              {t.href ? (
                <Link href={t.href} className="btn btn-ghost shrink-0 px-3 py-1.5 text-xs" title={`${t.gameLabel} turu`}>
                  Çalış
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {report.confusions.length ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide muted">Karıştırdıkların</p>
          <ul className="mt-1.5 flex flex-wrap gap-2">
            {report.confusions.slice(0, 5).map((c) => (
              <li key={`${c.wordId}-${c.with}`} className="chip px-3 py-1.5 text-xs" title={`${c.n} kez`}>
                <strong lang="de">
                  {c.artikel ? `${c.artikel} ` : ""}
                  {c.de}
                </strong>
                <span className="muted"> = {c.tr}, </span>
                <s className="opacity-70">{c.with}</s>
                <span className="muted"> değil</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {report.weakRules.length ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide muted">Zayıf kurallar</p>
          <ul className="mt-1.5 space-y-1">
            {report.weakRules.slice(0, 3).map((r) => (
              <li key={r} className="flex items-center justify-between text-sm">
                <span>{r}</span>
                <Link href="/lessons" className="btn btn-ghost px-3 py-1 text-xs">
                  Derse git
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
