"use client";

import { FeedbackLine } from "@/components/feedback/feedback-line";
import { ASSESS_FAILURE_KEYS, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment } from "@/lib/assess-prompts";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { scoreBand } from "@/lib/score-bands";

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
  const course = useCourse();
  const t = useT();
  const offline = "offline" in result && result.offline;
  const s = result.score;
  /* Bantlar tek kaynaktan (`lib/score-bands`) - ayni 70/40. */
  const band = scoreBand(s.overall);
  const tone = band === "good" ? "var(--color-mint)" : band === "mid" ? "var(--color-flame)" : "var(--color-rose)";

  return (
    <section className="card p-4">
      {/*
        YEDEĞİN YEDEK OLDUĞU YAZIYOR.

        Buradaki satır yalnız SEBEBİ söylüyordu ("servis yanıt vermedi") ve
        hemen altında bir PUAN duruyordu — kullanıcı o puanı gerçek bir
        değerlendirme sanabilir. Android aynı yerde ikinci bir cümle daha
        yazıyor: "bu puan kelime sayısından çıkarılmış geçici bir tahmin,
        gerçek değerlendirme değil" (`assess.fail_offline`; `ExamScreen` ve
        `game/rounds`).

        Koşul PUANIN KENDİSİNDE: `result.offline` yedek hesabın işareti. Sebep
        satırı olmadan da (kota kapısında olduğu gibi) yedek gösterilebiliyor
        ve o durumda da söylenmesi gerekiyor.
      */}
      {failure && failure !== "aborted" ? (
        <p className="mb-3 rounded-panel px-3 py-2 text-caption" style={{ background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)", color: "var(--color-flame)" }}>
          {t(ASSESS_FAILURE_KEYS[failure])}
          {offline ? ` ${t("assess.fail_offline")}` : ""}
        </p>
      ) : offline ? (
        <p className="mb-3 rounded-panel px-3 py-2 text-caption" style={{ background: "color-mix(in srgb, var(--color-flame-500) 14%, transparent)", color: "var(--color-flame)" }}>
          {t("assess.fail_offline")}
        </p>
      ) : null}

      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-h2 text-white"
          style={{ background: tone }}
          aria-label={t("assess.overall_score", { n: s.overall })}
        >
          {s.overall}
        </div>
        <dl className="grid flex-1 grid-cols-2 gap-x-3 gap-y-1.5 text-caption">
          <Bar label={t("assess.task")} value={s.task} />
          <Bar label={t("assess.structure")} value={s.structure} />
          <Bar label={t("assess.grammar")} value={s.grammar} muted={offline} />
          <Bar label={t("assess.vocab")} value={s.vocab} muted={offline} />
        </dl>
      </div>

      {offline ? (
        <ul className="mt-3 space-y-1 text-caption">
          {(result as FallbackAssessment).checks.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              <span aria-hidden style={{ color: c.ok ? "var(--color-mint)" : "var(--color-rose)" }}>{c.ok ? "✓" : "✗"}</span>
              <span className={c.ok ? "" : "opacity-80"}>{t(c.key, c.vars)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p className="mt-3 text-body leading-relaxed" lang={course}>
            <Highlighted answer={answer} errors={result.errors} />
          </p>
          {result.errors.length ? (
            <ul className="mt-2 space-y-1.5">
              {result.errors.map((e, i) => (
                <li key={i} className="text-caption">
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
            <p className="mt-3 rounded-panel px-3 py-2 text-body surface-2" lang={course}>
              <span className="muted mr-1 text-caption">{t("assess.corrected")}</span>
              <strong>{result.corrected}</strong>
            </p>
          ) : null}
        </>
      )}

      {result.praise_tr ? (
        <p className="mt-3 text-body" style={{ color: "var(--color-mint)" }}>
          {result.praise_tr}
        </p>
      ) : null}
      {result.next_tip_tr ? <p className="muted mt-1 text-body">{result.next_tip_tr}</p> : null}
      {example ? (
        <p className="mt-3 text-caption" lang={course}>
          <span className="muted mr-1 font-semibold">{t("assess.example")}</span>
          {example}
        </p>
      ) : null}
    </section>
  );
}

function Bar({ label, value, muted = false }: { label: string; value: number; muted?: boolean }) {
  const t = useT();
  return (
    <>
      <dt className="flex items-center justify-between">
        <span className={muted ? "opacity-60" : ""}>{label}</span>
        <span className="muted tabular-nums">{muted ? t("assess.not_measured") : `${value}/4`}</span>
      </dt>
      <dd className="col-span-2 -mt-0.5 h-1.5 overflow-hidden rounded-full surface-2">
        <div className="h-full rounded-full" style={{ width: muted ? "0%" : `${(value / 4) * 100}%`, background: "var(--color-brand)" }} />
      </dd>
    </>
  );
}

/** Metinde hata aralıklarını vurgular; çakışan/boş span'ler atlanır. */
function Highlighted({ answer, errors }: { answer: string; errors: Assessment["errors"] }) {
  /* İŞARETİN İPUCU BALONU KALKTI. Hata tipi ve düzeltmesi `title=`de
     duruyordu; aynı bilgi ALTTAKİ listede zaten görünür yazılı
     („yanlış" → „doğru" — neden) ve Android aynı listeyi aynı biçimde
     çiziyor (`ui/AssessmentCard`). Balon yalnız fareyle açılıyordu, yani
     bir şey eklemiyor gizliyordu. */
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
