"use client";

import Link from "next/link";
import { SkeletonBar, SkeletonLine } from "@/components/skeleton";
import { useEffect, useState } from "react";
import type { ErrorReport } from "@/lib/error-analytics";
import { useT, useLang } from "@/lib/i18n/client";
import { formatPercent } from "@/lib/i18n/dict";

/**
 * Profildeki "Zayıf noktalar" kartı (WP-51): son 30 günün ilk üç hata tipi, her
 * birine tek dokunuşla hedefli tur; karıştırılan kelime çiftleri; dersteki
 * zayıf kurallar. Hata yoksa kart görünmez — boş bir "zayıf nokta yok" kartı
 * ne bilgi verir ne motive eder.
 */
export function WeakSpotsCard({ bare = false }: { bare?: boolean } = {}) {
  /* Kanca `tx`: aşağıdaki map değişkeni de `t` ve `t()` çağrısını gölgeliyor. */
  const tx = useT();
  const lang = useLang();
  const [report, setReport] = useState<ErrorReport | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/errors", { cache: "no-store" });
        if (!res.ok) return setReport(null);
        // Gövde doğrulanıyor. Kör dönüşümde, 200 dönen ama biçimi tutmayan bir
        // cevap `report.types.length` üzerinde patlıyor ve hata sınırı kartı
        // değil BÜTÜN ekranı indiriyordu.
        const d = (await res.json()) as Partial<ErrorReport>;
        if (alive) setReport(Array.isArray(d?.types) && Array.isArray(d?.weakRules) ? (d as ErrorReport) : null);
      } catch {
        setReport(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  /* İskelet kartın gerçek yapısında: başlık + pencere bilgisi, altında üç
     satır (etiket, sayı ve altında ince ilerleme çizgisi). Yükseklik göz
     kararı yazılıyordu ve tutmadığında kart veri gelince zıplıyordu. */
  if (report === undefined)
    return (
      <section
        role="status"
        aria-busy="true"
        aria-label={tx("weak.loading")}
        className={bare ? "" : "card p-5"}
      >
        <div className="flex items-baseline justify-between gap-3">
          <SkeletonLine variant={bare ? "micro" : "bodyStrong"} width={120} />
          <SkeletonLine variant="caption" width={96} />
        </div>
        <ul className="mt-2 space-y-2">
          {[0, 1, 2].map((i) => (
            <li key={i} style={{ opacity: 1 - i * 0.12 }}>
              <div className="flex items-center justify-between gap-3">
                <SkeletonLine variant="body" width={`${52 - i * 6}%`} />
                <SkeletonLine variant="caption" width={56} />
              </div>
              <SkeletonBar height={6} className="mt-1" />
            </li>
          ))}
        </ul>
      </section>
    );
  if (!report || (!report.types.length && !report.weakRules.length)) return null;
  const top = report.types.slice(0, 3);

  /* `bare`: kendi kartını bırakıp gelişim kutusunun bir bölümü oluyor. */
  return (
    <section id="weak-spots" className={bare ? "" : "card p-5"}>
      <div className="flex items-baseline justify-between">
        <h2 className={bare ? "text-[11px] font-bold uppercase tracking-wide muted" : "font-bold"}>
          {tx("weak.title")}
        </h2>
        <span className="muted text-xs font-semibold">{tx("weak.window", { days: report.days, wrong: report.totalWrong })}</span>
      </div>
      {top.length ? (
        <ul className="mt-2 space-y-2">
          {top.map((t) => (
            <li key={t.type} className="flex items-center gap-3">
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{t.label}</span>
                  <span className="muted text-xs tabular-nums">
                    {t.n} · {formatPercent(t.pct, lang)}
                  </span>
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full surface-2">
                  <span className="block h-full rounded-full" style={{ width: `${t.pct}%`, background: "var(--color-rose)" }} />
                </span>
              </span>
              {t.href ? (
                <Link
                  href={t.href}
                  className="btn btn-ghost shrink-0 px-3 py-1.5 text-xs"
                  title={tx("weakw.round_of", { game: t.gameLabel ?? "" })}
                >
                  {tx("weakw.study")}
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
      {report.confusions.length ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide muted">{tx("weak.confusions")}</p>
          <ul className="mt-1.5 flex flex-wrap gap-2">
            {report.confusions.slice(0, 5).map((c) => (
              <li key={`${c.wordId}-${c.with}`} className="chip px-3 py-1.5 text-xs" title={tx("weakw.n_times", { n: c.n })}>
                <strong lang="de">
                  {c.artikel ? `${c.artikel} ` : ""}
                  {c.de}
                </strong>
                <span className="muted"> = {c.tr}, </span>
                <s className="opacity-70">{c.with}</s>
                <span className="muted"> {tx("weak.not")}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {report.weakRules.length ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide muted">{tx("weak.rules")}</p>
          <ul className="mt-1.5 space-y-1">
            {report.weakRules.slice(0, 3).map((r) => (
              <li key={r} className="flex items-center justify-between text-sm">
                <span>{r}</span>
                <Link href="/immersion" className="btn btn-ghost px-3 py-1 text-xs">
                  {tx("weak.go_to_lesson")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
