"use client";

import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/skeleton";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import type { Assessment } from "@/lib/assess-prompts";

type Item = {
  id: number;
  kind: string;
  level: string;
  day: string;
  answer: string;
  result: Assessment | null;
  createdAt: string;
};

const KIND_LABEL: Record<string, string> = {
  writing: "Yazma",
  sentence: "Cümle",
  speaking: "Konuşma",
  roleplay: "Rol yapma",
};

/**
 * "Yazılarım" (WP-30/64): profilde değerlendirme arşivi. Metin kullanıcının;
 * silme buradan. Bekleyen (kuyruktaki) kayıtlar "puanlanacak" diye görünür.
 * Açınca aynı değerlendirme kartı — geri bildirim dili her yerde aynı.
 */
export function WritingsCard() {
  const [items, setItems] = useState<Item[] | null | undefined>(undefined);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/assessments", { cache: "no-store" });
        if (!res.ok) return setItems(null);
        const data = (await res.json()) as { items: Item[] };
        if (alive) setItems(data.items);
      } catch {
        setItems(null);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function remove(id: number) {
    if (!confirm("Bu yazı ve değerlendirmesi silinsin mi?")) return;
    try {
      const res = await fetch(`/api/assessments?id=${id}`, { method: "DELETE" });
      if (res.ok) setItems((list) => (list ?? []).filter((i) => i.id !== id));
    } catch {
      setItems(null);
    }
  }

  if (items === undefined) return <CardSkeleton height={160} label="Yazıların yükleniyor" />;
  if (!items || !items.length) return null;

  return (
    <section id="writings" className="card p-5">
      <h2 className="font-bold">Yazılarım</h2>
      <p className="muted mt-1 text-xs">Değerlendirilen cümle ve metinlerin. Metinler yalnız sana görünür; istediğini silebilirsin.</p>
      <ul className="mt-3 divide-y divide-[color:var(--border)]">
        {items.map((it) => {
          const score = it.result?.score.overall ?? null;
          const tone = score === null ? "var(--text-muted)" : score >= 70 ? "var(--color-mint)" : score >= 40 ? "var(--color-flame)" : "var(--color-rose)";
          return (
            <li key={it.id} className="py-2.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white" style={{ background: tone }}>
                  {score ?? "…"}
                </span>
                <button type="button" onClick={() => setOpen(open === it.id ? null : it.id)} className="min-w-0 flex-1 text-left">
                  <span className="block truncate text-sm font-semibold" lang="de">
                    {it.answer}
                  </span>
                  <span className="muted block text-xs">
                    {KIND_LABEL[it.kind] ?? it.kind} · {it.level} · {it.day}
                    {score === null ? " · puanlanacak" : ""}
                  </span>
                </button>
                <button type="button" onClick={() => void remove(it.id)} className="btn btn-ghost shrink-0 px-2 py-1 text-xs">
                  Sil
                </button>
              </div>
              {open === it.id && it.result ? (
                <div className="mt-2">
                  <AssessmentCard answer={it.answer} result={it.result} />
                </div>
              ) : open === it.id ? (
                <p className="muted mt-2 text-xs" lang="de">
                  {it.answer}
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
