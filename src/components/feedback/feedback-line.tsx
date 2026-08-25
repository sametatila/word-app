"use client";

import Link from "next/link";
import { track } from "@/lib/track";
import { whyLabel, type DiffSeg, type Why } from "@/lib/why";

/**
 * "Neden" satırı (plan WP-13/61): [hata etiketi] [gerekçe] [Kural ↗].
 *
 * Şeridin ikinci satırı olarak da, soru kartının altında da aynı bileşen —
 * geri bildirim her yerde aynı dili konuşsun. Şeritte yer dar: tek satır,
 * küçük yazı, taşarsa sarar; şeridin dokunma bölgesini itmemesi için üstte
 * boşluk yok (game-shell notu).
 *
 * "Anladım" düğmesi yok: otomatik ilerleme korunuyor; bağlantıya dokunmak
 * `feedback_why_opened` olayı üretiyor — kaç kişinin gerekçeyi gerçekten
 * kurcaladığı KPI'da izleniyor.
 */
export function FeedbackLine({ why, compact = false }: { why: Why; compact?: boolean }) {
  return (
    <span className={`${compact ? "text-xs" : "text-sm"} block font-normal leading-snug opacity-90`}>
      <span
        className="mr-1.5 inline-block rounded-md px-1.5 py-px text-[10px] font-bold uppercase tracking-wide"
        style={{ background: "color-mix(in srgb, currentColor 14%, transparent)" }}
      >
        {whyLabel(why.type)}
      </span>
      {why.diff ? (
        <>
          <DiffText diff={why.diff} /> — {why.text}
        </>
      ) : (
        why.text
      )}
      {why.href ? (
        <Link
          href={why.href}
          onClick={() => track("feedback_why_opened", 0, why.type)}
          className="ml-1.5 whitespace-nowrap font-semibold underline decoration-dotted underline-offset-2"
        >
          Kural ↗
        </Link>
      ) : null}
    </span>
  );
}

/**
 * Harf düzeyinde fark: yazılanda fazla harfler üstü çizili, doğrusunda eksik
 * harfler altı çizili ve kalın. Ekran okuyucu için düz metin de var.
 */
function DiffText({ diff }: { diff: { typed: DiffSeg[]; target: DiffSeg[] } }) {
  const plain = `${diff.typed.map((s) => s.text).join("")} → ${diff.target.map((s) => s.text).join("")}`;
  return (
    <span aria-label={plain}>
      <span aria-hidden lang="de">
        {diff.typed.map((s, i) =>
          s.kind === "extra" ? (
            <s key={i} className="opacity-70">
              {s.text}
            </s>
          ) : (
            <span key={i}>{s.text}</span>
          ),
        )}
        {" → "}
        {diff.target.map((s, i) =>
          s.kind === "missing" ? (
            <strong key={i} className="underline decoration-2 underline-offset-2">
              {s.text}
            </strong>
          ) : (
            <span key={i}>{s.text}</span>
          ),
        )}
      </span>
    </span>
  );
}
