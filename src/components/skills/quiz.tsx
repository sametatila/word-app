"use client";

import { useState } from "react";
import { foldCompare } from "@/components/games/types";
import { useTargetLang } from "./player-context";
import { motion } from "framer-motion";
import type { Gloss, SkillQuestion } from "@/lib/skills/types";
import { GlossEntry } from "./gloss-entry";
import { speakGerman } from "@/components/speak-button";
import { CheckIcon, InfoIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { levenshtein } from "@/lib/errors";
import { useT } from "@/lib/i18n/client";

/**
 * Anlama soruları — sınav kâğıdı gibi hepsi alt alta. Şık seçilince kilitlenir,
 * doğru/yanlış anında boyanır ve Türkçe açıklama açılır. Tüm sorular
 * cevaplanınca üst bileşene toplam doğru sayısı bildirilir.
 *
 * Soru türleri (WP-31): `mcq`/`truefalse` şıklı; `gapfill`, `short_answer`,
 * `dictation` yazılı (toleranslı eşleşme, bkz. `written`); `order` sıralama
 * (dokun-taşı). Yazılı türler anlamayı ÜRETİMLE ölçer: dört şıktan tanımak
 * ile metinden kelimeyi çıkarıp yazmak aynı şey değil.
 */
export function QuestionList({
  questions,
  onAllAnswered,
}: {
  questions: SkillQuestion[];
  onAllAnswered: (correct: number) => void;
}) {
  const t = useT();
  /** Soru başına sonuç: null = cevaplanmadı; true/false = doğru/yanlış. */
  const [results, setResults] = useState<(boolean | null)[]>(() => questions.map(() => null));

  function settle(qi: number, ok: boolean) {
    if (results[qi] !== null) return;
    const next = [...results];
    next[qi] = ok;
    setResults(next);
    if (next.every((r) => r !== null)) onAllAnswered(next.filter(Boolean).length);
  }

  return (
    <div className="mt-5 space-y-4">
      <h2 className="px-1 font-bold">{t("skillquiz.questions")}</h2>
      {questions.map((q, qi) => {
        const kind = q.kind ?? "mcq";
        const done = results[qi] !== null;
        const wasCorrect = results[qi] === true;
        return (
          <section key={qi} className="card p-4">
            <p className="text-strong leading-relaxed">
              <span className="muted mr-1.5">{qi + 1}.</span>
              {q.text}
            </p>
            {kind === "order" ? (
              <OrderInput q={q} done={done} onSettle={(ok) => settle(qi, ok)} />
            ) : kind === "gapfill" || kind === "short_answer" || kind === "dictation" ? (
              <WrittenInput q={q} kind={kind} done={done} onSettle={(ok) => settle(qi, ok)} />
            ) : (
              <ChoiceInput q={q} done={done} onSettle={(ok) => settle(qi, ok)} />
            )}
            {done ? (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 rounded-panel px-3 py-2 text-caption leading-relaxed"
                style={{
                  background: wasCorrect
                    ? "color-mix(in srgb, var(--color-mint) 10%, transparent)"
                    : "color-mix(in srgb, var(--color-rose) 9%, transparent)",
                  color: "var(--text)",
                }}
              >
                {q.explain}
              </motion.p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}

/* ───────────── şıklı ───────────── */

function ChoiceInput({ q, done, onSettle }: { q: SkillQuestion; done: boolean; onSettle: (ok: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  function choose(oi: number) {
    if (done) return;
    setPick(oi);
    onSettle(oi === q.answer);
  }
  return (
    <div className="mt-3 grid gap-2">
      {q.options.map((opt, oi) => {
        const cls = !done ? "" : oi === q.answer ? "option-correct" : pick === oi ? "option-wrong animate-shake" : "opacity-55";
        return (
          <button
            key={oi}
            type="button"
            /* Seçili durum renkten başka bir şeyle de söyleniyor: alıştırma
               şıkkı seçilince yalnız zemin değişiyordu (bkz. parity §154). */
            aria-pressed={pick === oi}
            disabled={done}
            onClick={() => choose(oi)}
            className={`option flex items-center justify-between gap-2 px-3.5 py-2.5 text-left text-strong ${cls}`}
          >
            <span>{opt}</span>
            {done && oi === q.answer ? (
              <CheckIcon size={16} className="shrink-0 text-[color:var(--color-mint)]" />
            ) : done && pick === oi ? (
              <XIcon size={16} className="shrink-0 text-[color:var(--color-rose)]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────── yazılı ───────────── */

/**
 * Sabit `de-DE` küçültme + koşulsuz umlaut katlaması yazılıydı, yani İngilizce
 * beceri egzersizlerinde de Almanca kuralı işliyordu; sayı katlaması da yoktu
 * ("two" ↔ "2" mobilde kabul ediliyor, burada edilmiyordu). Ortak katlama
 * hedef dile bakıyor — mobil `game/skillQuiz` aynı düzeltmeyi taşıyor.
 */
function fold(s: string): string {
  return foldCompare(s);
}

/**
 * Yazılı cevap kabulü: kabul listesindeki bir biçime umlaut/büyük-küçük
 * harf/noktalama bağımsız eşitlik; 5 harften uzun cevapta tek harflik
 * yazım sapması da kabul — soru anlamayı ölçüyor, yazımı değil (yazım
 * kelime oyunlarının işi).
 */
export function written(typed: string, accept: string[]): boolean {
  const t = fold(typed);
  if (!t) return false;
  return accept.some((a) => {
    const f = fold(a);
    if (f === t) return true;
    return f.length >= 5 && levenshtein(f, t) <= 1;
  });
}

function WrittenInput({
  q,
  kind,
  done,
  onSettle,
}: {
  q: SkillQuestion;
  kind: "gapfill" | "short_answer" | "dictation";
  done: boolean;
  onSettle: (ok: boolean) => void;
}) {
  const t = useT();
  const lang = useTargetLang();
  const [typed, setTyped] = useState("");
  const accept = q.accept ?? [];
  const ok = done && written(typed, accept);
  function check() {
    if (done || !typed.trim()) return;
    onSettle(written(typed, accept));
  }
  return (
    <div className="mt-3">
      {kind === "dictation" ? (
        <button
          type="button"
          onClick={() => speakGerman(accept[0] ?? "")}
          className="btn btn-ghost mb-2 flex items-center gap-1.5 px-3 py-1.5 text-caption"
        >
          <SpeakerIcon size={14} /> {t("skillquiz.listen_to_sentence")}
        </button>
      ) : null}
      <div className="flex items-end gap-2">
        <input
          type="text"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              check();
            }
          }}
          disabled={done}
          lang={lang}
          spellCheck={false}
          placeholder={t(kind === "dictation" ? "skillquiz.ph_dictation" : kind === "gapfill" ? "skillquiz.ph_gapfill" : "skillquiz.ph_short")}
          aria-label={t(kind === "dictation" ? "skillquiz.ph_dictation" : kind === "gapfill" ? "skillquiz.ph_gapfill" : "skillquiz.ph_short")}
          className="input flex-1 py-2 text-body"
          style={done ? { borderColor: ok ? "var(--color-mint)" : "var(--color-rose)" } : undefined}
        />
        {!done ? (
          <button type="button" onClick={check} disabled={!typed.trim()} className="btn btn-primary px-3.5 py-2 text-body">
            {t("skillquiz.check")}
          </button>
        ) : null}
      </div>
      {done && !ok ? (
        <p className="mt-2 text-caption">
          <span className="muted">{t("rounds.answer_is")}</span>
          <strong lang={lang}>{accept[0]}</strong>
        </p>
      ) : null}
    </div>
  );
}

/* ───────────── sıralama ───────────── */

function OrderInput({ q, done, onSettle }: { q: SkillQuestion; done: boolean; onSettle: (ok: boolean) => void }) {
  const t = useT();
  const lang = useTargetLang();
  const items = q.items ?? [];
  // Sabit karışıklık (dizin tersine + orta çevirme): sunucu ve istemci aynı sırayı üretsin.
  const [order, setOrder] = useState<number[]>(() => {
    const idx = items.map((_, i) => i);
    const rotated = [...idx.slice(1), idx[0]].reverse();
    return rotated.every((v, i) => v === i) ? idx.reverse() : rotated;
  });
  const [picked, setPicked] = useState<number | null>(null);
  const correct = order.every((v, i) => v === i);

  function tap(pos: number) {
    if (done) return;
    if (picked === null) return setPicked(pos);
    const next = [...order];
    [next[picked], next[pos]] = [next[pos], next[picked]];
    setOrder(next);
    setPicked(null);
  }

  return (
    <div className="mt-3">
      <p className="muted text-caption">{t("skillquiz.put_these_in_right_order_tap_two")}</p>
      <ol className="mt-2 space-y-1.5">
        {order.map((v, pos) => (
          <li key={v}>
            <button
              type="button"
              /* Sıralama şıkkının seçili hâli renkten başka bir şeyle de
                 söyleniyor (bkz. parity §154). */
              aria-pressed={picked === pos}
              disabled={done}
              onClick={() => tap(pos)}
              className={`option flex w-full items-center gap-2 px-3 py-2 text-left text-body ${picked === pos ? "option-correct" : ""} ${done ? (v === pos ? "option-correct" : "option-wrong") : ""}`}
            >
              <span className="muted w-5 shrink-0 text-caption">{pos + 1}.</span>
              <span lang={lang}>{items[v]}</span>
            </button>
          </li>
        ))}
      </ol>
      {!done ? (
        <button type="button" onClick={() => onSettle(correct)} className="btn btn-primary mt-2 px-3.5 py-2 text-body">
          {t("skillquiz.check")}
        </button>
      ) : null}
    </div>
  );
}

/** Egzersize özel mini sözlükçe — kapalı başlar, tek dokunuşla açılır. */
export function GlossPanel({ gloss }: { gloss: Gloss[] }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  if (!gloss.length) return null;
  return (
    <section className="card mt-4 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="flex items-center gap-2 text-strong">
          <InfoIcon size={16} className="text-[color:var(--color-brand)]" />
          {t("skillquiz.glossary")}
          <span className="muted font-semibold">{t("skillquiz.word_count", { n: gloss.length })}</span>
        </span>
        <span className="muted text-caption">{t(open ? "skillq.hide" : "common.show")}</span>
      </button>
      {open ? (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {gloss.map((g) => (
              <button
                key={g.de}
                type="button"
                onClick={() => speakGerman(g.de)}
                /* Erişilebilir ad da veriliyor: `title` yalnız fareyle açılır. */
                aria-label={t("common.listen_pronunciation")}
                title={t("common.listen_pronunciation")}
                className="chip px-3 py-1.5 text-caption"
              >
                <GlossEntry g={g} />
              </button>
            ))}
          </div>
          <p className="muted mt-2 text-micro">{t("skillq.tap_word_hint")}</p>
        </>
      ) : null}
    </section>
  );
}
