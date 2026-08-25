"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckIcon, ChevronIcon } from "@/components/icons";
import { track } from "@/lib/track";
import type { Plan, PlanItem } from "@/lib/plan";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/**
 * "Bugünkü planın" kartı (WP-60).
 *
 * Başlangıç ekranının ilk kartı: 3–4 öğe, tahmini süre, tek "Başla". Başla
 * ilk bitmemiş öğeyi açar — tur ise oturumu başlatır, ders/egzersiz ise
 * sayfaya gider. Öğeler dokunulabilir: kullanıcı sırayı seçebilir.
 *
 * Durumu kendisi çeker (`/api/plan`), günün turu kartı gibi: plan sunucuda
 * hesaplanıyor ve oturum başladıktan sonra ekran değişiyor. Yüklenene kadar
 * iskelet; sunucu ulaşılmazsa kart hiç görünmez — planın yokluğu turu
 * engellemez.
 */
export function PlanCard({ onStartSession }: { onStartSession: () => void }) {
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null | undefined>(undefined);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/plan?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) return alive && setPlan(null);
        const data = (await res.json()) as Plan;
        if (alive) setPlan(data);
      } catch {
        if (alive) setPlan(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (plan === null) return null;

  function go(item: PlanItem, index: number) {
    track("plan_start", index, item.id);
    if (item.action === "session") onStartSession();
    else if (item.href) router.push(item.href);
  }

  const next = plan?.items.find((i) => !i.done);
  // Haftanın başında (Pzt–Sal) geçen haftanın tek satırlık özeti (WP-52).
  const dow = new Date().getDay();
  const showSummary = plan?.summary && (dow === 1 || dow === 2);

  return (
    <section className="card mx-auto w-full max-w-md p-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold">Bugünkü planın</h2>
        {plan ? (
          <span className="muted text-xs font-semibold">
            {plan.complete ? "bugünlük tamam" : `~${plan.minutes} dk`}
          </span>
        ) : null}
      </div>

      {!plan ? (
        <ul className="mt-3 space-y-2" aria-busy>
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-10 animate-pulse rounded-xl surface-2" />
          ))}
        </ul>
      ) : (
        <ol className="mt-3 space-y-1.5">
          {plan.items.map((item, i) => {
            const inner = (
              <>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    background: item.done ? "var(--color-mint)" : "color-mix(in srgb, var(--color-brand) 14%, transparent)",
                    color: item.done ? "white" : "var(--color-brand)",
                  }}
                  aria-hidden
                >
                  {item.done ? <CheckIcon size={13} /> : i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-semibold leading-tight ${item.done ? "line-through opacity-60" : ""}`}>
                    {item.title}
                  </span>
                  <span className="muted block text-xs">
                    {item.detail} · {item.minutes} dk
                  </span>
                </span>
                {!item.done ? <ChevronIcon size={14} className="muted shrink-0" /> : null}
              </>
            );
            const cls = "flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition hover:bg-[color:var(--surface-2)]";
            return (
              <li key={item.id}>
                {item.done ? (
                  <div className={cls}>{inner}</div>
                ) : item.action === "session" ? (
                  <button type="button" onClick={() => go(item, i)} className={cls}>
                    {inner}
                  </button>
                ) : (
                  <Link href={item.href ?? "#"} onClick={() => track("plan_start", i, item.id)} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {showSummary ? (
        <Link href="/profile#growth" className="muted mt-3 block rounded-xl px-3 py-2 text-xs surface-2">
          {plan!.summary}
        </Link>
      ) : null}
      {plan && next ? (
        <button type="button" onClick={() => go(next, plan.items.indexOf(next))} className="btn btn-primary mt-3 w-full px-5 py-3 text-sm">
          Başla: {next.title.replace(/^(Ders tekrarı|Ders|Zayıf nokta): /, "")}
        </button>
      ) : plan?.complete ? (
        <p className="mt-3 text-center text-sm" style={{ color: "var(--color-mint)" }}>
          Bugünün planı tamam — istersen aşağıdan fazladan oyna.
        </p>
      ) : null}
    </section>
  );
}
