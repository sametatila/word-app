"use client";

import { useEffect, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { CANDO_LEVELS, CANDO_SKILL_LABELS, type Cando } from "@/lib/cando";
import type { CefrLevel } from "@/lib/skills/types";

type Item = { cando: Cando; state: "proven" | "progressing" | "none"; done: number; total: number };
type Data = { level: string; items: Item[]; byLevel: Record<CefrLevel, { proven: number; total: number }> };

/**
 * "Yapabildiklerim" (WP-43): seviye sekmesi, beceri başına ifadeler; kanıtlı
 * tik, gelişiyor yarım, henüz yok soluk. Kullanıcının seviyesi açık gelir.
 * İfade dili "…yapabilirim": burası bir ölçek değil, bir ayna.
 */
export function CandoCard() {
  const [data, setData] = useState<Data | null>(null);
  const [level, setLevel] = useState<CefrLevel | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/cando", { cache: "no-store" });
        if (!res.ok) return;
        const d = (await res.json()) as Data;
        if (!alive) return;
        setData(d);
        setLevel((CANDO_LEVELS as string[]).includes(d.level) ? (d.level as CefrLevel) : "A1");
      } catch {
        /* kart görünmez */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!data || !level) return null;
  const shown = data.items.filter((i) => i.cando.level === level);
  const skills = [...new Set(shown.map((i) => i.cando.skill))];
  const provenTotal = data.items.filter((i) => i.state === "proven").length;

  return (
    <section id="cando" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold">Yapabildiklerim</h2>
        <span className="muted text-xs font-semibold">{provenTotal} kanıtlı</span>
      </div>
      <p className="muted mt-1 text-xs">Bir ifade, ona bağlı en az iki ders ya da egzersizi tamamlayınca kanıtlı sayılır.</p>
      <div className="mt-3 flex gap-1.5">
        {CANDO_LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLevel(l)}
            className={`chip px-3 py-1 text-xs font-bold ${l === level ? "chip-active" : ""}`}
            aria-pressed={l === level}
          >
            {l}
            <span className="muted ml-1 font-semibold">
              {data.byLevel[l].proven}/{data.byLevel[l].total}
            </span>
          </button>
        ))}
      </div>
      {skills.map((sk) => (
        <div key={sk} className="mt-3">
          <p className="muted text-[11px] font-bold uppercase tracking-wide">{CANDO_SKILL_LABELS[sk]}</p>
          <ul className="mt-1 space-y-1">
            {shown
              .filter((i) => i.cando.skill === sk)
              .map((i) => (
                <li key={i.cando.id} className="flex items-start gap-2 text-sm">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                    style={{
                      background: i.state === "proven" ? "var(--color-mint)" : i.state === "progressing" ? "color-mix(in srgb, var(--color-flame) 25%, transparent)" : "var(--surface-2)",
                      color: i.state === "proven" ? "white" : "var(--text-muted)",
                    }}
                    title={i.state === "proven" ? "kanıtlı" : i.state === "progressing" ? "gelişiyor" : "henüz değil"}
                    aria-hidden
                  >
                    {i.state === "proven" ? <CheckIcon size={12} /> : i.state === "progressing" ? "½" : ""}
                  </span>
                  <span className={i.state === "none" ? "opacity-60" : ""}>
                    {i.cando.tr}
                    {i.total ? <span className="muted ml-1 text-xs">({i.done}/{i.total})</span> : null}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
