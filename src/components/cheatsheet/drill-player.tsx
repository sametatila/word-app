"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { matchSentence, type SentenceMatch } from "@/lib/sentence-match";
import { ERROR_LABELS } from "@/lib/errors";
import { DRILL_KIND_LABELS, type Drill } from "@/lib/cheatsheet/drills";
import { TokenDiff, TypedTokens } from "@/components/feedback/diff-text";
import { Mascot } from "@/components/mascot";
import { track } from "@/lib/track";

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type Done = { drill: Drill; match: SentenceMatch; typed: string; latencyMs: number };

/**
 * Drill oynatıcı (WP-11): tek tablonun maddeleri, yazılı cevap, WP-10
 * eşleştirmesi ile fark vurgusu, "neden" satırı, tabloya geri bağlantı.
 *
 * Doğru sayımı: `exact` ve `spelling` doğru (yazım sapması ≤2 harf, kural
 * doğru işlemiş), `order` ve `wrong` yanlış — drill kuralı ölçüyor, klavyeyi
 * değil. Sonuçlar `/api/cheat`'e madde başına gider (tekrar planı kelime
 * hücreleriyle aynı motor); yanlışların hata tipi olay olarak da düşer ki
 * profildeki "zayıf noktaların" drill'i de görsün.
 */
export function DrillPlayer({ drills, tableId, tableTitle }: { drills: Drill[]; tableId: string; tableTitle: string }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<Done | null>(null);
  const [done, setDone] = useState<Done[]>([]);
  const startedAt = useRef(Date.now());
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const drill = drills[index];
  const finished = index >= drills.length;

  useEffect(() => {
    if (!finished && !result) {
      startedAt.current = Date.now();
      inputRef.current?.focus();
    }
  }, [index, result, finished]);

  function submit() {
    if (!drill || !typed.trim() || result) return;
    const match = matchSentence(typed, drill.answer, drill.alternatives ?? []);
    const entry: Done = { drill, match, typed, latencyMs: Date.now() - startedAt.current };
    setResult(entry);
    const correct = match.verdict === "exact" || match.verdict === "spelling";
    track("drill", correct ? 1 : 0, drill.errorType);
  }

  function next() {
    if (!result) return;
    const all = [...done, result];
    setDone(all);
    setResult(null);
    setTyped("");
    if (index + 1 >= drills.length) void save(all);
    setIndex(index + 1);
  }

  async function save(all: Done[]) {
    try {
      await fetch("/api/cheat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          day: localDay(),
          seconds: Math.round(all.reduce((s, x) => s + x.latencyMs, 0) / 1000),
          results: all.map((x) => ({
            itemId: x.drill.id,
            correct: x.match.verdict === "exact" || x.match.verdict === "spelling",
            latencyMs: x.latencyMs,
            kind: "typing",
          })),
        }),
      });
    } catch {
      /* çevrimdışı: sonuç kaydedilmedi, tur yine bitti */
    }
  }

  if (finished) {
    const ok = done.filter((x) => x.match.verdict === "exact" || x.match.verdict === "spelling").length;
    const byType = new Map<string, number>();
    for (const x of done) if (!(x.match.verdict === "exact" || x.match.verdict === "spelling")) byType.set(x.drill.errorType, (byType.get(x.drill.errorType) ?? 0) + 1);
    const pct = Math.round((ok / Math.max(1, done.length)) * 100);
    return (
      <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="card mx-auto w-full max-w-md p-5">
        <div className="flex items-center gap-3">
          <Mascot mood={pct >= 80 ? "cheer" : pct >= 50 ? "happy" : "sad"} size={64} />
          <div>
            <h1 className="text-lg font-bold">Drill bitti</h1>
            <p className="muted text-sm">
              {tableTitle} · {ok} / {done.length} doğru · %{pct}
            </p>
          </div>
        </div>
        {byType.size ? (
          <p className="muted mt-3 text-xs">
            Yanlışlar: {[...byType].map(([t, n]) => `${ERROR_LABELS[t as keyof typeof ERROR_LABELS]} ×${n}`).join(", ")}
          </p>
        ) : (
          <p className="mt-3 text-xs" style={{ color: "var(--color-mint)" }}>
            Hepsi doğru — kural oturmuş.
          </p>
        )}
        <ul className="mt-3 space-y-1.5">
          {done.filter((x) => x.match.verdict !== "exact").map((x) => (
            <li key={x.drill.id} className="rounded-xl px-3 py-2 text-xs surface-2">
              <TokenDiff tokens={x.match.target} />
              <span className="muted block">{x.drill.why}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => location.reload()} className="btn btn-primary flex-1 py-3 text-sm">
            Tekrar
          </button>
          <Link href={`/cheatsheet#sheet-${tableId}`} className="btn btn-ghost flex-1 py-3 text-center text-sm">
            Tabloya dön
          </Link>
        </div>
      </motion.section>
    );
  }

  const correct = result && (result.match.verdict === "exact" || result.match.verdict === "spelling");
  return (
    <section className="card mx-auto w-full max-w-md p-5">
      <div className="flex items-center justify-between text-xs">
        <Link href={`/cheatsheet#sheet-${tableId}`} className="muted font-semibold underline-offset-2 hover:underline">
          ← {tableTitle}
        </Link>
        <span className="muted tabular-nums">
          {index + 1} / {drills.length}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full surface-2">
        <div className="brand-gradient h-full rounded-full transition-all" style={{ width: `${Math.round((index / drills.length) * 100)}%` }} />
      </div>

      <p className="muted mt-4 text-[11px] font-bold uppercase tracking-wide">{DRILL_KIND_LABELS[drill.kind]}</p>
      <p className="mt-1 text-sm">{drill.prompt.tr}</p>
      {drill.prompt.de ? (
        <p className="mt-2 rounded-xl px-3 py-2 text-base font-semibold surface-2" lang="de">
          {drill.prompt.de}
        </p>
      ) : null}

      {!result ? (
        <div className="mt-3 flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            rows={2}
            lang="de"
            placeholder="Almanca yaz…"
            className="input flex-1 resize-none py-2 text-sm"
          />
          <button type="button" onClick={submit} disabled={!typed.trim()} className="btn btn-primary px-4 py-2.5 text-sm">
            Kontrol
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2" role="status">
          <p className="text-sm font-bold" style={{ color: correct ? "var(--color-mint)" : "var(--color-rose)" }}>
            {result.match.verdict === "exact" ? "Doğru!" : result.match.verdict === "spelling" ? "Doğru — yazımda küçük sapma" : result.match.verdict === "order" ? "Kelimeler doğru, sıra yanlış" : "Olmadı"}
          </p>
          {result.match.verdict !== "exact" ? (
            <div className="rounded-xl px-3 py-2 text-sm surface-2">
              <p className="muted text-[11px]">Senin yazdığın</p>
              <TypedTokens tokens={result.match.typed} />
              <p className="muted mt-1.5 text-[11px]">Doğrusu</p>
              <TokenDiff tokens={result.match.target} />
            </div>
          ) : null}
          <p className="text-xs leading-relaxed">
            <span className="muted font-semibold">Neden · {ERROR_LABELS[drill.errorType]}:</span> {drill.why}
          </p>
          <button type="button" onClick={next} className="btn btn-primary w-full py-3 text-sm">
            {index + 1 >= drills.length ? "Bitir" : "Sonraki"}
          </button>
        </motion.div>
      )}
    </section>
  );
}
