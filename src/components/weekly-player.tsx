"use client";

import { apiFetch } from "@/lib/api-fetch";
import { MIN_MASTERED } from "@/lib/weekly-const";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { RoundExit } from "@/components/round-exit";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, CoverBody, StateBody } from "@/components/flow";
import { AlertIcon, CalendarIcon, CheckIcon, ExamIcon, KeyboardIcon, LockIcon } from "@/components/icons";
import { track } from "@/lib/track";
import type { WeeklyStatus } from "@/lib/weekly";
import { useLang, useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { localDay } from "@/lib/day";
import { formatPercent } from "@/lib/i18n/dict";

type Payload = { status: WeeklyStatus; rounds: Round[] };
/* `auth` AYRI BIR HAL (bkz. `daily-player`): 401 "tekrar dene" ile
   cozulmez. Android `WeeklyScreen` da bunu ayiriyor. */
/* "submitting" — `daily-player` ve mobilin iki karşılığı baştan beri o adı
   kullanıyor; burada "saving" yazılıydı, yani aynı durumun dördüncü bir adı. */
type Phase = "loading" | "ready" | "playing" | "submitting" | "done" | "empty" | "error" | "auth";

/**
 * Haftalık kullanım sınavı oynatıcısı (WP-42): tek hak, ipuçsuz, yalnız
 * üretim oyunları. Günün turu deseninde ama tablo yok — rakip yok, ölçülen
 * şey kişinin kendi pekişmiş kelimeleri. Sonuçta kelime kelime doğru/yanlış
 * ve "yanlışlar tekrar kuyruğuna döndü" notu: pekişmiş sayılan kelime
 * düştüyse bunu saklamamak gerekir.
 */
export function WeeklyPlayer() {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  const [phase, setPhase] = useState<Phase>("loading");
  const [data, setData] = useState<Payload | null>(null);
  const [index, setIndex] = useState(0);
  const answers = useRef<Answer[]>([]);
  const [result, setResult] = useState<{ score: number; correct: number; total: number } | null>(null);
  /** Sonuç sunucuya yazılamadı: puan ekranda, kayıt yok. */
  const [notSent, setNotSent] = useState(false);
  const startedAt = useRef(Date.now());
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    setPhase("loading");
    (async () => {
      try {
        const res = await apiFetch(`/api/weekly?day=${localDay()}`, { cache: "no-store" });
        if (res.status === 401) { if (alive) setPhase("auth"); return; }
        if (!res.ok) throw new Error(String(res.status));
        const p = (await res.json()) as Payload;
        if (!alive) return;
        setData(p);
        if (p.status.done) {
          setResult({ score: p.status.score ?? 0, correct: p.status.correct ?? 0, total: p.status.total ?? 0 });
          setPhase("done");
        } else if (!p.rounds.length) setPhase("empty");
        else setPhase("ready");
      } catch {
        if (alive) setPhase("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [attempt]);

  function start() {
    /*
     * HAFTALIK SINAV OTURUM OLARAK ÖLÇÜLÜYOR, `exam_start` olarak DEĞİL.
     *
     * Burada `track("exam_start", 0, "usage")` yazıyordu ve iki şeyi birden
     * bozuyordu: (1) sözlüğün sözleşmesi `exam_start` için "kind = sınav
     * türü:seviye" diyor ("level:B1"), "usage" o biçime hiç uymuyor;
     * (2) gerçek sınav `exam_start`ı SUNUCUDA yazıyor (`api/exam`), yani
     * haftalık test aynı seride gerçek sınavlarla karışıyordu. Mobil
     * `WeeklyScreen` baştan beri `session_start`/`session_done` + kind
     * "weekly" yazıyor; web de aynı şeyi yazıyor (bkz. web-parity §11.29).
     */
    track("session_start", 0, "weekly");
    answers.current = [];
    startedAt.current = Date.now();
    setIndex(0);
    setPhase("playing");
  }

  async function handleDone(round: Round, results: GameResult[]) {
    answers.current.push(...results.map((r) => ({ ...r, game: round.game })));
    if (index + 1 < data!.rounds.length) return setIndex(index + 1);
    setPhase("submitting");
    try {
      const res = await apiFetch("/api/weekly", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ answers: answers.current, day: localDay(), seconds: Math.round((Date.now() - startedAt.current) / 1000) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const r = (await res.json()) as { score: number; correct: number; total: number };
      setResult(r);
      track("session_done", r.correct, "weekly");
      setPhase("done");
    } catch {
      /* SINAV YAPILDI AMA GÖNDERİLEMEDİ. Eskiden burada "yüklenemedi" hata
         kartı çiziliyordu: on dakikalık sınavın puanı ekrandan siliniyordu.
         Puan zaten istemcide; Android tam bunu yapıyor - yerel doğrulukla
         gösterip kaydedilmediğini SÖYLÜYOR. Söylemek şart: haftada tek hak
         var ve kaydedilmemiş bir sınav "yapıldı" görünürse kullanıcı hakkını
         harcadığını sanır. */
      const total = answers.current.length;
      const correct = answers.current.filter((a) => a.correct).length;
      setResult({ score: total ? Math.round((100 * correct) / total) : 0, correct, total });
      setNotSent(true);
      setPhase("done");
    }
  }

  const wordOf = (r: Round) => (r.game === "match" ? r.words[0] : r.word);

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (phase === "loading" || phase === "submitting") {
    return (
      <section role="status" aria-busy="true" className="card mx-auto w-full max-w-md p-5">
        <p className="muted text-body">{t(phase === "loading" ? "weekly.preparing" : "weekly.saving")}</p>
        <div className="mt-3 h-10 animate-pulse rounded-tile surface-2" />
      </section>
    );
  }
  if (phase === "auth") {
    return (
      <FlowColumn>
        <StateBody alert mood="wave" title={t("weekly.sign_in_for_weekly_quiz")} body={t("weekly.test_what_you_ve_learned_once")}>
          <FlowActions primary={{ label: t("weekly.sign_in_sign_up"), href: "/login" }} tertiary={{ label: t("common.close"), href: "/learn" }} />
        </StateBody>
      </FlowColumn>
    );
  }

  if (phase === "error") {
    return (
      <FlowColumn>
        {/* YERİNDE TEKRAR DENEME — Android'deki sıra: birincil "tekrar dene",
            ikincil çıkış. Yalnız çıkış sunmak geçici bir ağ hatasında
            kullanıcıyı ekrandan atıyordu. */}
        <StateBody alert mood="sad" title={t("weekly.couldn_t_load_weekly_quiz")} body={t("game.check_your_connection_and_try")}>
          <FlowActions primary={{ label: t("weekly.try_again"), onClick: () => setAttempt((n) => n + 1) }} tertiary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
        </StateBody>
      </FlowColumn>
    );
  }
  if (phase === "empty") {
    return (
      <FlowColumn>
        <StateBody mood="think" title={t("weekly.none_title")} body={t("weekly.none_sub")}>
          <FlowActions primary={{ label: t("weekly.start_round"), href: "/learn" }} />
        </StateBody>
      </FlowColumn>
    );
  }
  if (phase === "ready" && data) {
    /*
     * KAPAK ŞABLONU (`flow`). Kurallar eskiden tek bir "·" dizisiydi
     * ("25 soru · yalnız yazarak · ipucu yok · tek hak"); artık her kural
     * kendi ikonlu satırında. Mobil `WeeklyScreen` aynı sırada.
     */
    return (
      <FlowColumn>
        <CoverBody
          icon={<ExamIcon size={28} />}
          tint="var(--color-brand-500)"
          eyebrow={t("learn.weekly_quiz")}
          title={t(data.status.short ? "plan.weekly_short" : "plan.weekly_exam")}
          pitch={
            data.status.short
              ? t("weekly.pitch_short", { n: data.status.mastered, min: MIN_MASTERED })
              : t("weekly.pitch_full", { n: data.status.mastered })
          }
          rules={[
            { icon: <KeyboardIcon size={16} />, text: t("weekly.rule_count", { n: data.rounds.length }) },
            { icon: <LockIcon size={16} />, text: t("weekly.rule_no_hints") },
            { icon: <CalendarIcon size={16} />, text: t("weekly.rule_once") },
          ]}
          note={t("weekly.honest_note")}
        />
        <FlowActions primary={{ label: t("common.start"), onClick: start }} tertiary={{ label: t("common.later"), href: "/learn" }} />
      </FlowColumn>
    );
  }
  if (phase === "done" && result) {
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = (data?.rounds ?? []).map(wordOf).filter((w) => byWord.get(w.id) === false);
    /* Konfeti yalnız olumlu sonuçta ve kayıt yazıldıysa: gönderilemeyen bir
       sınavı kutlamak "hakkın kullanıldı" izlenimini güçlendirirdi. */
    const good = result.score >= 80;
    return (
      /*
        SONUÇ ŞABLONU (`flow`): band → üç sayı → notlar → ayrıntı kartı →
        tek birincil düğme. Halka kalktı: bandın ana sayısı aynı yüzdeyi
        veriyor. Mobil `WeeklyScreen` aynı alanları aynı sırayla çiziyor.
      */
      <FlowColumn celebrate={good && !notSent}>
        <ResultHero
          eyebrow={t("learn.weekly_quiz")}
          title={t("weekly.done_title")}
          figure={formatPercent(result.score, lang)}
          sub={t("weekly.done_sub", { total: result.total, correct: result.correct })}
          mood={good ? "celebrate" : result.score >= 50 ? "happy" : "sad"}
        />
        <StatRow
          items={[
            { value: `${result.correct}/${result.total}`, label: t("common.correct"), tone: "ok" },
            { value: String(Math.max(0, result.total - result.correct)), label: t("weekly.wrong_count"), tone: result.total > result.correct ? "bad" : null },
            { value: "1", label: t("weekly.per_week") },
          ]}
        />
        {/* Haftada tek hak var: kaydedilmemiş bir sınav "yapıldı" görünürse
            kullanıcı hakkını harcadığını sanır - bu yüzden kırmızı not. */}
        {notSent ? <FlowNote tone="bad" icon={<AlertIcon size={16} />} text={t("weekly.not_sent")} /> : null}
        {result.total > 0 && result.correct === result.total ? <FlowNote tone="ok" icon={<CheckIcon size={16} />} text={t("weekly.all_correct")} /> : null}
        <FlowNote icon={<CalendarIcon size={16} />} text={t("weekly.once_a_week")} />
        {wrong.length ? (
          <DetailCard title={t("weekly.back_in_queue")}>
            <ul className="flex flex-wrap gap-2">
              {wrong.map((w) => (
                <li key={w.id} className="chip px-3 py-1 text-caption" lang={course}>
                  {w.artikel ? `${w.artikel} ` : ""}
                  {w.de} <span className="muted ml-1">{w.tr}</span>
                </li>
              ))}
            </ul>
          </DetailCard>
        ) : null}
        <FlowActions primary={{ label: t("weekly.back_to_learn"), href: "/learn" }} />
      </FlowColumn>
    );
  }

  const round = data!.rounds[index];
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
      {/* ÇIKIŞ YOLU YOKTU: sınav başlayınca başlıkta hiçbir düğme yoktu ve
          tek çıkış tarayıcının geri düğmesiydi. Android'de aynı yerde 44
          px'lik kapat karosu var (`WeeklyScreen`). */}
      <div className="mb-3 shrink-0">
        <div className="mb-1.5 flex items-center justify-between gap-3 text-caption">
          <RoundExit href="/learn" labelKey="common.back" />
          <span className="muted flex-1">
            {index + 1} / {data!.rounds.length} · {t("weekly.usage_exam")}
          </span>
          <span className="muted">{t("weekly.no_hints")}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
          <motion.div className="brand-gradient h-full rounded-full" animate={{ width: `${((index + 1) / data!.rounds.length) * 100}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={round.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18, ease: "easeOut" }} className="flex min-h-0 flex-1 flex-col">
          <FitBox>
            <GameSwitch round={round} onDone={(res) => void handleDone(round, res)} />
          </FitBox>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
