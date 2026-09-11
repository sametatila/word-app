"use client";

import { motion } from "framer-motion";
import type { PronounceScore } from "@/lib/pronounce";
import { PASS_SCORE } from "@/lib/pronounce";
import { speakGerman } from "@/components/speak-button";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";

/**
 * Telaffuz kartı (WP-20): hedef cümle kelime ısı haritası — yeşil tam,
 * sarı yakın, kırmızı yanlış/eksik; kelimeye dokununca doğru telaffuz
 * okunur. Altında puan, akıcılık ve bilinen sapma ipucu. Kart "kelime
 * düzeyi" der: fonem notu değil, anlaşıldı-mı ölçüsü.
 */
export function PronounceCard({ score, audioUrl, compact = false }: { score: PronounceScore; audioUrl?: string | null; compact?: boolean }) {
  const course = useCourse();
  const t = useT();
  const tone = (s: PronounceScore["words"][number]["status"]) =>
    s === "ok" ? "var(--color-mint)" : s === "near" ? "var(--color-flame)" : "var(--color-rose)";
  const hint = score.words.find((w) => w.hint)?.hint;
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="rounded-panel px-4 py-3 surface-2" role="status">
      <div className="flex items-center justify-between gap-3">
        <span className="text-micro uppercase tracking-wide" style={{ color: score.passed ? "var(--color-mint)" : "var(--color-flame)" }}>
          {t("pron.headline", { pct: t("common.pct", { n: score.overall }) })}{" "}
          {score.passed ? t("pron.passed") : t("pron.target", { n: PASS_SCORE })}
        </span>
        {!compact ? (
          <span className="muted text-micro tabular-nums">
            {t("pron.breakdown", {
              words: t("common.pct", { n: score.wordAccuracy }),
              completeness: t("common.pct", { n: score.completeness }),
              fluency: t("common.pct", { n: score.fluency }),
            })}
          </span>
        ) : null}
      </div>
      <p className="mt-2 flex flex-wrap gap-1.5" lang={course}>
        {score.words.map((w, i) => (
          <button
            key={`${w.word}-${i}`}
            type="button"
            onClick={() => speakGerman(w.word)}
            /* KELİMENİN HÜKMÜ erişilebilir addan da okunuyor. Metin yalnız
               `title=` ipucu balonundaydı: dokunmatikte hiç açılmıyor, yani
               "duyulmadı" ya da "duyulan: X" bilgisi telefondan bakan
               kullanıcıya ulaşmıyordu. */
            aria-label={
              w.status === "ok"
                ? t("pron.word_ok")
                : w.heard
                  ? t("pron.word_heard", { heard: w.heard })
                  : t("pron.word_missing")
            }
            title={
              w.status === "ok"
                ? t("pron.word_ok")
                : w.heard
                  ? t("pron.word_heard", { heard: w.heard })
                  : t("pron.word_missing")
            }
            className="rounded-chip px-2 py-0.5 text-strong"
            style={{ background: `color-mix(in srgb, ${tone(w.status)} 18%, transparent)`, color: tone(w.status), textDecoration: w.status === "missing" ? "line-through" : undefined }}
          >
            {w.word}
          </button>
        ))}
      </p>
      {score.extra.length ? (
        <p className="muted mt-1 text-micro">{t("pron.extra", { words: score.extra.join(", ") })}</p>
      ) : null}
      {hint ? <p className="mt-2 text-caption leading-relaxed">{hint}</p> : null}
      {!compact ? (
        <p className="muted mt-2 text-micro">
          {score.rate ? t("pron.rate", { n: score.rate }) : t("pron.rate_unknown")}
          {score.pauses ? ` · ${t("pron.pauses", { n: score.pauses })}` : ""} · {t("pron.word_level_note")}
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
