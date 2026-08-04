"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SpeakButton } from "@/components/speak-button";
import { grammarNote, typLabel } from "@/components/games/types";

export type WordRow = {
  id: number;
  de: string;
  artikel: string | null;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string | null;
  formen: string | null;
  intervalDays: number | null;
  dueAt: string | null;
  lapses: number | null;
};

const ARTIKEL_TONE: Record<string, string> = {
  der: "var(--color-sky-400)",
  die: "var(--color-rose-400)",
  das: "var(--color-mint-400)",
};

const LEVELS = [
  { id: "", label: "Tümü" },
  { id: "A1", label: "A1" },
  { id: "A2", label: "A2" },
  { id: "B1", label: "B1" },
];

const STATUSES = [
  { id: "", label: "Hepsi" },
  { id: "new", label: "Görülmemiş" },
  { id: "learning", label: "Öğreniliyor" },
  { id: "mastered", label: "Pekişmiş" },
];

function statusOf(r: WordRow): { label: string; tone: string } {
  if (r.intervalDays == null) return { label: "yeni", tone: "var(--text-muted)" };
  if (r.intervalDays >= 21) return { label: "pekişmiş", tone: "var(--color-mint-500)" };
  if (r.intervalDays >= 3) return { label: "tanıdık", tone: "var(--color-sky-400)" };
  return { label: "öğreniliyor", tone: "var(--color-flame-500)" };
}

function dueLabel(dueAt: string | null): string | null {
  if (!dueAt) return null;
  const days = Math.round((new Date(dueAt).getTime() - Date.now()) / 86400000);
  if (days <= 0) return "tekrar zamanı geldi";
  if (days === 1) return "yarın tekrar";
  return `${days} gün sonra tekrar`;
}

export function WordList({
  rows,
  total,
  page,
  hasMore,
  query,
}: {
  rows: WordRow[];
  total: number;
  page: number;
  hasMore: boolean;
  query: { q: string; level: string; status: string };
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [term, setTerm] = useState(query.q);
  const [open, setOpen] = useState<number | null>(null);

  // Arama kutusu yazarken adres çubuğunu geciktirerek günceller
  useEffect(() => {
    if (term === query.q) return;
    const t = setTimeout(() => {
      const next = new URLSearchParams(params.toString());
      if (term) next.set("q", term);
      else next.delete("q");
      next.delete("page");
      router.replace(`/words?${next.toString()}`);
    }, 350);
    return () => clearTimeout(t);
  }, [term, query.q, params, router]);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.replace(`/words?${next.toString()}`);
  }

  function goPage(p: number) {
    const next = new URLSearchParams(params.toString());
    if (p > 0) next.set("page", String(p));
    else next.delete("page");
    router.replace(`/words?${next.toString()}`);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Kelimelerim</h1>
        <p className="muted mt-1 text-sm">
          {total.toLocaleString("tr-TR")} kelime · en yaygın kelimeler başta
        </p>
      </header>

      <div className="space-y-3">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Almanca veya Türkçe ara…"
          className="option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand-400)]"
        />
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id || "all"}
              onClick={() => setFilter("level", l.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                query.level === l.id ? "brand-gradient text-white" : "surface-2 muted"
              }`}
            >
              {l.label}
            </button>
          ))}
          <span className="mx-1 w-px" style={{ background: "var(--border)" }} />
          {STATUSES.map((s) => (
            <button
              key={s.id || "any"}
              onClick={() => setFilter("status", s.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                query.status === s.id ? "brand-gradient text-white" : "surface-2 muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="muted text-sm">Bu filtreye uyan kelime yok.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {rows.map((r, i) => {
            const st = statusOf(r);
            const isOpen = open === r.id;
            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.015, 0.3) }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">
                      {r.artikel ? (
                        <span style={{ color: ARTIKEL_TONE[r.artikel] }}>{r.artikel} </span>
                      ) : null}
                      {r.de}
                    </p>
                    <p className="muted truncate text-sm">{r.tr}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold" style={{ color: st.tone }}>
                    {st.label}
                  </span>
                  <span className="muted shrink-0 text-xs">{r.niveau}</span>
                </button>

                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="border-t px-4 py-3 text-sm"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="flex items-center gap-2">
                      <SpeakButton
                        text={r.artikel ? `${r.artikel} ${r.de}` : r.de}
                        size="sm"
                        
                      />
                      <span className="muted">
                        {typLabel(r.typ, r.tr)}
                        {grammarNote({
                          id: r.id,
                          de: r.de,
                          artikel: r.artikel,
                          tr: r.tr,
                          typ: r.typ,
                          niveau: r.niveau,
                          beispiel: r.beispiel,
                          formen: r.formen,
                          isNew: false,
                        })
                          ? ` · ${grammarNote({
                              id: r.id,
                              de: r.de,
                              artikel: r.artikel,
                              tr: r.tr,
                              typ: r.typ,
                              niveau: r.niveau,
                              beispiel: r.beispiel,
                              formen: r.formen,
                              isNew: false,
                            })}`
                          : ""}
                      </span>
                    </div>
                    {r.beispiel ? (
                      <p className="muted mt-2 italic">{r.beispiel.split(/(?<=[.!?])\s+/)[0]}</p>
                    ) : null}
                    <p className="muted mt-2 text-xs">
                      {dueLabel(r.dueAt) ?? "henüz çalışılmadı"}
                      {r.lapses ? ` · ${r.lapses} kez zorlandın` : ""}
                    </p>
                  </motion.div>
                ) : null}
              </motion.li>
            );
          })}
        </ul>
      )}

      {(page > 0 || hasMore) && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => goPage(page - 1)}
            disabled={page === 0}
            className="btn btn-ghost px-4 py-2 text-sm disabled:opacity-40"
          >
            ← Önceki
          </button>
          <span className="muted text-xs">sayfa {page + 1}</span>
          <button
            onClick={() => goPage(page + 1)}
            disabled={!hasMore}
            className="btn btn-ghost px-4 py-2 text-sm disabled:opacity-40"
          >
            Sonraki →
          </button>
        </div>
      )}
    </div>
  );
}
