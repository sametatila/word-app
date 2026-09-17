"use client";

import { apiFetch } from "@/lib/api-fetch";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RoundExit } from "@/components/round-exit";
import { SpeakButton } from "@/components/speak-button";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, CoverBody, StateBody } from "@/components/flow";
import { AlertIcon, CalendarIcon, CheckIcon, ExamIcon, LockIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { useLang, useT } from "@/lib/i18n/client";
import { formatPercent } from "@/lib/i18n/dict";

/**
 * Haftalık quiz oynatıcısı.
 *
 * SINAV DEĞİL. Eski haftalık sınav on beş üretim turuydu ve yalnız sözcük
 * geri çağırmayı ölçüyordu; quiz on madde, beş yetkinlik ve her yanlıştan
 * sonra bir açıklama. Ekran bu yüzden "kaç doğru" ile değil, "hangi
 * yetkinlikte neredesin" ile bitiyor.
 *
 * CEVAP ANAHTARI EKRANA BİTENE KADAR İNMİYOR. Maddeler sunucudan `answer` ve
 * `why` alanları DÜŞÜRÜLMÜŞ olarak geliyor (bkz. `weekly-quiz/scoring`
 * `toClient`); doğruluk ancak gönderimden sonra, sunucunun döndürdüğü dökümle
 * öğreniliyor. İstemci hiçbir yerde "doğru mu" kararı vermiyor.
 *
 * DOSYA ADI KORUNDU. Yol (`/learn/weekly`), telemetri ekran anahtarı, push
 * derin bağlantısı ve giriş noktaları bu ada bağlı; içerik değişti, adres
 * değişmedi.
 */

type ClientItem = {
  id: string;
  block: "read" | "listen" | "grammar" | "vocab" | "personal";
  ref?: string;
  stem: string;
  options: string[];
  targets: string[];
};
type Stimulus =
  | { kind: "text"; id: string; genre: string; genreTr: string; title?: string; body: string }
  | { kind: "audio"; id: string; genre: string; genreTr: string; segments: { speaker?: string; text: string }[]; plays: 1 | 2 };
type Quiz = { id: string; theme: string; themeTr: string; level: string; stimuli: Stimulus[]; items: ClientItem[] };
type ScoredItem = { itemId: string; block: ClientItem["block"]; chosen: number | null; answer: number; correct: boolean; why: string; targets: string[] };
type Score = { correct: number; total: number; pct: number; byBlock: { block: ClientItem["block"]; correct: number; total: number }[]; items: ScoredItem[]; band: string };
type Payload = { week: string; done: boolean; empty?: boolean; quiz: Quiz | null; score?: Score };

type Phase = "loading" | "ready" | "playing" | "submitting" | "done" | "empty" | "error" | "auth";

const BLOCK_KEY: Record<ClientItem["block"], string> = {
  read: "wquiz.block_read",
  listen: "wquiz.block_listen",
  grammar: "wquiz.block_grammar",
  vocab: "wquiz.block_vocab",
  personal: "wquiz.block_personal",
};

export function WeeklyPlayer() {
  const t = useT();
  const lang = useLang();
  const [phase, setPhase] = useState<Phase>("loading");
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [score, setScore] = useState<Score | null>(null);
  /** Sonuç sunucuya yazılamadı: cevaplar ekranda, kayıt yok. */
  const [notSent, setNotSent] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setPhase("loading");
    (async () => {
      try {
        const res = await apiFetch("/api/quiz", { cache: "no-store" });
        if (res.status === 401) {
          if (alive) setPhase("auth");
          return;
        }
        if (!res.ok) throw new Error(String(res.status));
        const p = (await res.json()) as Payload;
        if (!alive) return;
        if (p.done && p.score) {
          setScore(p.score);
          setPhase("done");
        } else if (p.empty || !p.quiz?.items.length) {
          setPhase("empty");
        } else {
          setQuiz(p.quiz);
          setPhase("ready");
        }
      } catch {
        if (alive) setPhase("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  const submit = useCallback(
    async (answers: Record<string, number>) => {
      setPhase("submitting");
      try {
        const res = await apiFetch("/api/quiz", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ answers }),
        });
        if (!res.ok) throw new Error(String(res.status));
        const out = (await res.json()) as { score: Score };
        setScore(out.score);
        setNotSent(false);
      } catch {
        setNotSent(true);
      } finally {
        setPhase("done");
        track("session_done", 0, "weekly");
      }
    },
    [],
  );

  function choose(item: ClientItem, option: number) {
    const next = { ...picked, [item.id]: option };
    setPicked(next);
    const last = index >= (quiz?.items.length ?? 0) - 1;
    if (last) void submit(next);
    else setIndex((i) => i + 1);
  }

  /* ── Durumlar ───────────────────────────────────────────────────────── */

  if (phase === "loading" || phase === "submitting") {
    return (
      <FlowColumn>
        <StateBody title={t(phase === "loading" ? "wquiz.preparing" : "wquiz.saving")} />
      </FlowColumn>
    );
  }

  if (phase === "auth") {
    return (
      <FlowColumn>
        <StateBody title={t("weekly.sign_in_for_weekly_quiz")} body={t("weekly.test_what_you_ve_learned_once")} icon={<LockIcon size={40} />} />
        <FlowActions primary={{ label: t("weekly.sign_in_sign_up"), href: "/login" }} secondary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
      </FlowColumn>
    );
  }

  if (phase === "error") {
    return (
      <FlowColumn>
        <StateBody alert title={t("weekly.couldn_t_load_weekly_quiz")} icon={<AlertIcon size={40} />} />
        <FlowActions primary={{ label: t("weekly.try_again"), onClick: () => setAttempt((a) => a + 1) }} secondary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
      </FlowColumn>
    );
  }

  if (phase === "empty") {
    return (
      <FlowColumn>
        <StateBody title={t("wquiz.none_title")} body={t("wquiz.none_sub")} icon={<CalendarIcon size={40} />} />
        <FlowActions primary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
      </FlowColumn>
    );
  }

  /* ── Kapak ──────────────────────────────────────────────────────────── */

  if (phase === "ready" && quiz) {
    return (
      <FlowColumn>
        <CoverBody
          icon={<ExamIcon size={28} />}
          tint="var(--color-brand-500)"
          eyebrow={t("learn.weekly_quiz")}
          title={quiz.themeTr || quiz.theme}
          pitch={t("wquiz.pitch")}
          rules={[
            { icon: <CheckIcon size={16} />, text: t("wquiz.rule_count", { n: quiz.items.length }) },
            { icon: <CalendarIcon size={16} />, text: t("wquiz.rule_once") },
            { icon: <ExamIcon size={16} />, text: t("wquiz.rule_explain") },
          ]}
          note={t("wquiz.no_pass_mark")}
        />
        <FlowActions
          primary={{ label: t("wquiz.start"), onClick: () => { setPhase("playing"); track("session_start", 0, "weekly"); } }}
          secondary={{ label: t("weekly.back_to_learn"), href: "/learn" }}
        />
      </FlowColumn>
    );
  }

  /* ── Oynama ─────────────────────────────────────────────────────────── */

  if (phase === "playing" && quiz) {
    const item = quiz.items[index];
    const stim = item.ref ? quiz.stimuli.find((s) => s.id === item.ref) : null;
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pb-10 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-micro uppercase tracking-eyebrow muted">{t(BLOCK_KEY[item.block])}</span>
          <span className="text-caption muted tabular-nums">{index + 1}/{quiz.items.length}</span>
          <RoundExit href="/learn" />
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--color-brand)" }}
            animate={{ width: `${((index + 1) / quiz.items.length) * 100}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-4"
          >
            {stim ? <Stim stim={stim} t={t} /> : null}

            <p className="text-h3" style={{ textWrap: "balance" }}>{item.stem}</p>

            <div className="flex flex-col gap-2">
              {item.options.map((o, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => choose(item, i)}
                  className="card w-full px-4 py-3 text-left text-body transition-colors hover:brightness-[0.98]"
                  style={{ borderColor: "var(--border)" }}
                >
                  {o}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  /* ── Sonuç ──────────────────────────────────────────────────────────── */

  if (phase === "done" && score) {
    const wrong = score.items.filter((i) => !i.correct);
    return (
      <FlowColumn celebrate={score.pct >= 90}>
        <ResultHero
          eyebrow={t("learn.weekly_quiz")}
          title={t(score.band)}
          figure={formatPercent(score.pct, lang)}
          sub={t("wquiz.done_sub", { correct: score.correct, total: score.total })}
        />
        <StatRow
          items={[
            { value: score.correct, label: t("wquiz.correct"), tone: "ok" },
            { value: score.total - score.correct, label: t("wquiz.wrong"), tone: score.correct === score.total ? null : "bad" },
          ]}
        />

        <DetailCard title={t("wquiz.by_block")}>
          <div className="flex flex-col gap-2">
            {score.byBlock.map((b) => (
              <div key={b.block} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-caption muted">{t(BLOCK_KEY[b.block])}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${b.total ? (b.correct / b.total) * 100 : 0}%`, background: b.correct === b.total ? "var(--color-mint)" : "var(--color-brand)" }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-caption muted tabular-nums">{b.correct}/{b.total}</span>
              </div>
            ))}
          </div>
        </DetailCard>

        {wrong.length ? (
          <DetailCard title={t("wquiz.review_title")}>
            <div className="flex flex-col gap-3">
              {wrong.map((w) => (
                <div key={w.itemId} className="flex flex-col gap-1 border-b pb-3 last:border-b-0 last:pb-0" style={{ borderColor: "var(--hairline)" }}>
                  <span className="text-micro uppercase tracking-eyebrow muted">{t(BLOCK_KEY[w.block])}</span>
                  <p className="text-body">{w.why}</p>
                </div>
              ))}
            </div>
          </DetailCard>
        ) : (
          <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={t("wquiz.all_correct")} />
        )}

        {notSent ? <FlowNote tone="bad" icon={<AlertIcon size={16} />} text={t("wquiz.not_sent")} /> : null}
        <FlowNote icon={<CalendarIcon size={16} />} text={t("wquiz.once_a_week")} />
        <FlowActions primary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
      </FlowColumn>
    );
  }

  return null;
}

/** Okuma metni ya da dinleme diyaloğu. */
function Stim({ stim, t }: { stim: Stimulus; t: (k: string, p?: Record<string, string | number>) => string }) {
  if (stim.kind === "text") {
    return (
      <div className="card flex flex-col gap-2 px-4 py-4">
        <span className="text-micro uppercase tracking-eyebrow muted">{stim.genreTr || stim.genre}</span>
        {stim.title ? <p className="text-strong">{stim.title}</p> : null}
        <p className="whitespace-pre-line text-body leading-relaxed">{stim.body}</p>
      </div>
    );
  }
  return (
    <div className="card flex flex-col gap-2 px-4 py-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-micro uppercase tracking-eyebrow muted">{stim.genreTr || stim.genre}</span>
        <span className="text-micro muted">{t("wquiz.listen_hint")}</span>
      </div>
      {/* Her replik ayrı çalınıyor: konuşmacı değişimi duyulabilsin ve
          öğrenci tek bir satırı yeniden dinleyebilsin. Metin GÖRÜNMÜYOR —
          görünse madde dinleme değil okuma ölçerdi. */}
      <div className="flex flex-col gap-1.5">
        {stim.segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-2">
            <SpeakButton text={seg.text} size="sm" />
            <span className="text-caption muted">{seg.speaker ?? `${i + 1}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
