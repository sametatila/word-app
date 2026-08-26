"use client";

import { motion } from "framer-motion";
import type { PronounceScore } from "@/lib/pronounce";
import { PASS_SCORE } from "@/lib/pronounce";
import { speakGerman } from "@/components/speak-button";

/**
 * Telaffuz kartı (WP-20): hedef cümle kelime ısı haritası — yeşil tam,
 * sarı yakın, kırmızı yanlış/eksik; kelimeye dokununca doğru telaffuz
 * okunur. Altında puan, akıcılık ve bilinen sapma ipucu. Kart "kelime
 * düzeyi" der: fonem notu değil, anlaşıldı-mı ölçüsü.
 */
export function PronounceCard({ score, audioUrl, compact = false }: { score: PronounceScore; audioUrl?: string | null; compact?: boolean }) {
  const tone = (s: PronounceScore["words"][number]["status"]) =>
    s === "ok" ? "var(--color-mint)" : s === "near" ? "var(--color-flame)" : "var(--color-rose)";
  const hint = score.words.find((w) => w.hint)?.hint;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl px-4 py-3 surface-2" role="status">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: score.passed ? "var(--color-mint)" : "var(--color-flame)" }}>
          Telaffuz · %{score.overall} {score.passed ? "· geçti" : `· hedef ${PASS_SCORE}`}
        </span>
        {!compact ? (
          <span className="muted text-[11px] tabular-nums">
            kelime %{score.wordAccuracy} · bütünlük %{score.completeness} · akıcılık %{score.fluency}
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex flex-wrap gap-1.5" lang="de">
        {score.words.map((w, i) => (
          <button
            key={`${w.word}-${i}`}
            type="button"
            onClick={() => speakGerman(w.word)}
            title={w.status === "ok" ? "doğru — dinle" : w.heard ? `duyulan: ${w.heard} — doğrusunu dinle` : "duyulmadı — dinle"}
            className="rounded-lg px-2 py-0.5 text-sm font-semibold"
            style={{ background: `color-mix(in srgb, ${tone(w.status)} 18%, transparent)`, color: tone(w.status), textDecoration: w.status === "missing" ? "line-through" : undefined }}
          >
            {w.word}
          </button>
        ))}
      </p>
      {score.extra.length ? <p className="muted mt-1 text-[11px]">fazladan duyulan: {score.extra.join(", ")}</p> : null}
      {hint ? <p className="mt-2 text-xs leading-relaxed">{hint}</p> : null}
      {!compact ? (
        <p className="muted mt-2 text-[11px]">
          {score.rate ? `${score.rate} hece/sn` : "hız ölçülemedi"}
          {score.pauses ? ` · ${score.pauses} duraklama` : ""} · kelime düzeyi ölçüm, fonem notu değil
        </p>
      ) : null}
      {audioUrl ? (
        <audio controls src={audioUrl} className="mt-2 h-8 w-full">
          <track kind="captions" />
        </audio>
      ) : null}
    </motion.div>
  );
}
