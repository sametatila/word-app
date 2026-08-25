"use client";

import { FeedbackLine } from "@/components/feedback/feedback-line";
import { ASSESS_FAILURE_TEXT, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment } from "@/lib/assess-prompts";
import { ERROR_LABELS } from "@/lib/errors";
import { whyLabel } from "@/lib/why";

/**
 * Değerlendirme kartı (WP-12; WP-30 yazma ile ortak).
 *
 * `/api/assess` sonucunu ya da sağlayıcı kapalıyken kural tabanlı yedeği
 * aynı yüzle gösterir: dört ölçüt çubuğu, hata vurgulu metin, düzeltilmiş
 * hâl, övgü ve sıradaki ipucu. Yedek hiçbir zaman gerçek değerlendirme gibi
 * sunulmaz: üstte "AI kapalı" satırı, dilbilgisi/kelime çubukları nötr ve
 * "ölçülmedi" etiketli.
 *
 * Geri bildirim üç katman (WP-61 ilkesi): sonuç (renk + puan) → gerekçe
 * (her hata için `why_tr`, FeedbackLine) → derinleşme (Kural ↗).
 */
export function AssessmentCard({
  answer,
  result,
  failure,
  example,
}: {
  /** Öğrencinin metni — span'ler bunun üstünde vurgulanır. */
  answer: string;
  result: Assessment | FallbackAssessment;
  /** Yedek gösteriliyorsa neden (kota, kapalı, zaman aşımı…). */
  failure?: AssessFailure | null;
  /** Kelimenin gerçek örnek cümlesi — "böyle de kurulabilirdi". */
  example?: string | null;
}) {
  const offline = "offline" in result && result.offline;
  const s = result.score;
  const tone = s.overall >= 70 ? "var(--color-mint)" : s.overall >= 40 ? "var(--color-flame)" : "var(--color-rose)";

  return (
    <section className="card p-4">
      {failure && failure !== "aborted" ? (
        <p className="mb-3 rounded-xl px-3 py-2 text-xs font-semibold" style={{ background: "color-mix(in srgb, var(--color-flame) 12%, transparent)", color: "var(--color-flame)" }}>
          {ASSESS_FAILURE_TEXT[failure]}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-black text-white"
          style={{ background: tone }}
          aria-label={`Genel puan ${s.overall}`}
        >
          {s.overall}
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
          <Bar label="Görev" value={s.task} />
          <Bar label="Yapı" value={s.structure} />
          <Bar label="Dilbilgisi" value={s.grammar} muted={offline} />
          <Bar label="Kelime" value={s.vocab} muted={offline} />
        </dl>
      </div>

      {offline ? (
        <ul className="mt-3 space-y-1 text-xs">
          {(result as FallbackAssessment).checks.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden style={{ color: c.ok ? "var(--color-mint)" : "var(--color-rose)" }}>{c.ok ? "✓" : "✗"}</span>
              <span className={c.ok ? "" : "opacity-80"}>{c.label}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed" lang="de">
            <Highlighted answer={answer} errors={result.errors} />
          </p>
          {result.errors.length ? (
            <ul className="mt-2 space-y-1.5">
              {result.errors.map((e, i) => (
                <li key={i} className="text-xs">
                  <FeedbackLine
                    why={{
                      type: e.type,
                      text: `${e.wrong ? `„${e.wrong}“ → „${e.fix}“` : e.fix}${e.why_tr ? ` — ${e.why_tr}` : ""}`,
                      href: null,
                    }}
                    compact
                  />
                </li>
              ))}
            </ul>
          ) : null}
          {result.corrected && result.corrected.trim() !== answer.trim() ? (
            <p className="mt-3 rounded-xl px-3 py-2 text-sm surface-2" lang="de">
              <span className="muted mr-1 text-xs font-semibold">Düzeltilmiş:</span>
              <strong>{result.corrected}</strong>
            </p>
          ) : null}
        </>
      )}

      {result.praise_tr ? (
        <p className="mt-3 text-sm" style={{ color: "var(--color-mint)" }}>
          {result.praise_tr}
        </p>
      ) : null}
      {result.next_tip_tr ? <p className="muted mt-1 text-sm">{result.next_tip_tr}</p> : null}
      {example ? (
        <p className="mt-3 text-xs" lang="de">
          <span className="muted mr-1 font-semibold">Örnek cümle:</span>
          {example}
        </p>
      ) : null}
    </section>
  );
}

function Bar({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  return (
    <>
      <dt className="flex items-center justify-between">
        <span className={muted ? "opacity-60" : ""}>{label}</span>
        <span className="muted tabular-nums">{muted ? "ölçülmedi" : `${value}/4`}</span>
      </dt>
      <dd className="col-span-2 -mt-0.5 h-1.5 overflow-hidden rounded-full surface-2">
        <div className="h-full rounded-full" style={{ width: muted ? "0%" : `${(value / 4) * 100}%`, background: "var(--color-brand)" }} />
      </dd>
    </>
  );
}

/** Metinde hata aralıklarını vurgular; çakışan/boş span'ler atlanır. */
function Highlighted({ answer, errors }: { answer: string; errors: Assessment["errors"] }) {
  const spans = errors
    .filter((e) => e.span[1] > e.span[0] && e.span[1] <= answer.length)
    .sort((a, b) => a.span[0] - b.span[0]);
  const out: React.ReactNode[] = [];
  let at = 0;
  for (const e of spans) {
    if (e.span[0] < at) continue;
    if (e.span[0] > at) out.push(answer.slice(at, e.span[0]));
    out.push(
      <mark
        key={`${e.span[0]}-${e.span[1]}`}
        title={`${ERROR_LABELS[e.type] ?? whyLabel(e.type)}: ${e.fix}`}
        className="rounded px-0.5 underline decoration-2 underline-offset-2"
        style={{ background: "color-mix(in srgb, var(--color-rose) 18%, transparent)", color: "inherit" }}
      >
        {answer.slice(e.span[0], e.span[1])}
      </mark>,
    );
    at = e.span[1];
  }
  if (at < answer.length) out.push(answer.slice(at));
  return <>{out}</>;
}
