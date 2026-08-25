"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PROFICIENCY_LABELS, PROFICIENCY_SKILLS, type Proficiency, type ProficiencySkill } from "@/lib/proficiency";
import type { NextStep } from "@/lib/proficiency-data";
import type { CefrLevel } from "@/lib/skills/types";

type Data = { level: CefrLevel; proficiency: Proficiency; next: NextStep | null; evidenceCount: number };

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];

/**
 * Profil "Yetkinlik" kartı (WP-50/64): kullanıcının seviyesinde 6 beceri
 * çubuğu (kanıt puanı 0–100, bant, kanıt sayısı), seviye sekmeleri ve
 * "sıradaki en iyi adım". Kanıtı olmayan beceri boş çubuk + "ölçülmedi":
 * sıfır göstermek yalan olurdu.
 */
export function ProficiencyCard() {
  const [data, setData] = useState<Data | null>(null);
  const [level, setLevel] = useState<CefrLevel | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/profile", { cache: "no-store" });
        if (!res.ok) return;
        const d = (await res.json()) as Data;
        if (!alive) return;
        setData(d);
        setLevel(d.level);
      } catch {
        /* kart görünmez */
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!data || !level) return null;
  const tone = (score: number | null) => (score === null ? "var(--surface-2)" : score >= 85 ? "var(--color-mint)" : score >= 70 ? "var(--color-brand)" : score >= 40 ? "var(--color-flame)" : "var(--color-rose)");

  return (
    <section id="proficiency" className="card p-5">
      <div className="flex items-baseline justify-between">
        <h2 className="font-bold">Yetkinlik</h2>
        <span className="muted text-xs font-semibold">son 30 gün · {data.evidenceCount} kanıt</span>
      </div>
      <div className="mt-3 flex gap-1.5">
        {LEVELS.map((l) => (
          <button key={l} type="button" onClick={() => setLevel(l)} className={`chip px-3 py-1 text-xs font-bold ${l === level ? "chip-active" : ""}`} aria-pressed={l === level}>
            {l}
          </button>
        ))}
      </div>
      <dl className="mt-3 space-y-2">
        {PROFICIENCY_SKILLS.map((skill: ProficiencySkill) => {
          const cell = data.proficiency[skill]?.[level];
          return (
            <div key={skill}>
              <dt className="flex items-center justify-between text-sm">
                <span className="font-semibold">{PROFICIENCY_LABELS[skill]}</span>
                <span className="muted text-xs tabular-nums">{cell ? `${cell.score} · ${cell.band} · ${cell.n} kanıt` : "ölçülmedi"}</span>
              </dt>
              <dd className="mt-1 h-2 overflow-hidden rounded-full surface-2">
                <div className="h-full rounded-full transition-all" style={{ width: `${cell?.score ?? 0}%`, background: tone(cell?.score ?? null) }} />
              </dd>
            </div>
          );
        })}
      </dl>
      <p className="muted mt-2 text-[11px]">Sınav ×3, AI değerlendirme ×2, egzersiz ×1 ağırlıklı; 30 günde sönümlenir. &lt;40 başlangıç · 40–69 gelişiyor · 70–84 sağlam · ≥85 ustalaştı.</p>
      {data.next ? (
        <Link href={data.next.href} className="mt-3 flex items-center justify-between rounded-xl px-3 py-2.5 surface-2">
          <span className="min-w-0">
            <span className="block text-sm font-semibold">Sıradaki en iyi adım: {data.next.title}</span>
            <span className="muted block text-xs">{data.next.reason} · {data.next.minutes} dk</span>
          </span>
          <span className="btn btn-primary shrink-0 px-3 py-1.5 text-xs">Başla</span>
        </Link>
      ) : null}
    </section>
  );
}
