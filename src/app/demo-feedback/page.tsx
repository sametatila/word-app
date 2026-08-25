"use client";

import { FeedbackLine } from "@/components/feedback/feedback-line";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { CharDiff, DiffLegend, TokenDiff, TypedTokens } from "@/components/feedback/diff-text";
import { ERROR_TYPES } from "@/lib/errors";
import { matchSentence } from "@/lib/sentence-match";
import { charDiff, whyFor } from "@/lib/why";
import type { Assessment } from "@/lib/assess-prompts";
import { fallbackAssessment } from "@/lib/assess-client";

/**
 * Geri bildirim hikâye sayfası (WP-61) — `demo-games` deseninde, yalnız
 * geliştirme kontrolü: bütün geri bildirim bileşenleri tek sayfada, gerçek
 * verilerle. Şerit, çeviri, drill ve yazma değerlendirmesi burada görülen
 * dilin dışına çıkmaz.
 */
const WORD = { de: "Wohnung", artikel: "die", tr: "daire", formen: "-en" };
const T = "Ich gehe heute ins Kino.";

const SAMPLE: Assessment = {
  score: { task: 3, grammar: 2, vocab: 3, structure: 3, overall: 66 },
  errors: [
    { span: [11, 21], wrong: "ein Kaffee", type: "article", fix: "einen Kaffee", why_tr: "„Kaffee“ eril; Akkusativ nesne „einen“ alır." },
    { span: [22, 37], wrong: "mit mein Freund", type: "case", fix: "mit meinem Freund", why_tr: "„mit“ her zaman Dativ ister." },
  ],
  corrected: "Ich trinke einen Kaffee mit meinem Freund.",
  praise_tr: "Cümle yapısı ve fiil çekimi doğru.",
  next_tip_tr: "Akkusativ/Dativ artikellerini bir kez daha gözden geçir.",
};
const SAMPLE_ANSWER = "Ich trinke ein Kaffee mit mein Freund.";

export default function DemoFeedback() {
  const fb = fallbackAssessment({
    kind: "sentence",
    level: "A1",
    task: { prompt: "cümle kur", targets: ["Kaffee", "trinken"] },
    answer: { text: "Ich trinke Kaffee." },
  });
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-6">
      <section className="card p-5">
        <h2 className="muted mb-3 text-xs font-bold uppercase">FeedbackLine — her hata tipi</h2>
        <ul className="space-y-2">
          {ERROR_TYPES.map((type) => (
            <li key={type} className="rounded-xl px-3 py-2 surface-2">
              <FeedbackLine
                why={whyFor({
                  type,
                  word: WORD,
                  detail: type === "spelling" ? "Wonung" : type === "article" ? "der" : type === "plural" ? "Wohnungs" : "köpek",
                  answer: T.replace(".", "").split(" "),
                  tail: ".",
                })}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="muted mb-3 text-xs font-bold uppercase">CharDiff — harf farkı</h2>
        <p className="text-sm">
          <CharDiff diff={charDiff("Katse", "Katze")} /> · <CharDiff diff={charDiff("Strase", "Straße")} /> ·{" "}
          <CharDiff diff={charDiff("arbaiten", "arbeiten")} />
        </p>
      </section>

      <section className="card p-5">
        <h2 className="muted mb-3 text-xs font-bold uppercase">TokenDiff — cümle farkı</h2>
        <DiffLegend />
        <ul className="mt-3 space-y-3 text-sm">
          {["Heute ich gehe ins Kino", "Ich gehe heute ins Kinno", "Ich gehe ins Kino", "Ich gehe heute abend ins Kino", "Ich bin heute müde"].map((typed) => {
            const m = matchSentence(typed, T);
            return (
              <li key={typed} className="rounded-xl px-3 py-2 surface-2">
                <span className="muted mr-2 text-xs uppercase">{m.verdict} · kalite {m.quality}</span>
                <TokenDiff tokens={m.target} />
                <span className="muted block text-xs">
                  Yazdığın: <TypedTokens tokens={m.typed} />
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="card p-5">
        <h2 className="muted mb-3 text-xs font-bold uppercase">AssessmentCard — AI sonucu</h2>
        <AssessmentCard answer={SAMPLE_ANSWER} result={SAMPLE} example="Ich trinke jeden Morgen einen Kaffee." />
      </section>

      <section className="card p-5">
        <h2 className="muted mb-3 text-xs font-bold uppercase">AssessmentCard — sağlayıcı kapalı (yedek)</h2>
        <AssessmentCard answer="Ich trinke Kaffee." result={fb} failure="not_configured" />
      </section>
    </div>
  );
}
