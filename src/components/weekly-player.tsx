"use client";

import Link from "next/link";
import { MIN_MASTERED } from "@/lib/weekly-const";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Answer, Round } from "@/lib/types";
import type { GameResult } from "@/components/games/types";
import { GameSwitch } from "@/components/game-switch";
import { FitBox } from "@/components/fit-box";
import { RoundExit } from "@/components/round-exit";
import { Mascot } from "@/components/mascot";
import { track } from "@/lib/track";
import type { WeeklyStatus } from "@/lib/weekly";
import { useLang, useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { localDay } from "@/lib/day";
import { formatPercent } from "@/lib/i18n/dict";

type Payload = { status: WeeklyStatus; rounds: Round[] };
/* `auth` AYRI BIR HAL (bkz. `daily-player`): 401 "tekrar dene" ile
   cozulmez. Android `WeeklyScreen` da bunu ayiriyor. */
type Phase = "loading" | "ready" | "playing" | "saving" | "done" | "empty" | "error" | "auth";

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
        const res = await fetch(`/api/weekly?day=${localDay()}`, { cache: "no-store" });
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
    setPhase("saving");
    try {
      const res = await fetch("/api/weekly", {
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
  if (phase === "loading" || phase === "saving") {
    return (
      <section role="status" aria-busy="true" className="card mx-auto w-full max-w-md p-5">
        <p className="muted text-body">{t(phase === "loading" ? "weekly.preparing" : "weekly.saving")}</p>
        <div className="mt-3 h-10 animate-pulse rounded-tile surface-2" />
      </section>
    );
  }
  if (phase === "auth") {
    return (
      <section role="alert" className="card mx-auto w-full max-w-md p-5 text-center">
        <p className="text-h3">{t("weekly.sign_in_for_weekly_quiz")}</p>
        <p className="muted mt-2 text-body leading-relaxed">{t("weekly.test_what_you_ve_learned_once")}</p>
        <Link href="/login" prefetch={false} className="btn btn-primary mt-4 block w-full px-4 py-3 text-body">
          {t("weekly.sign_in_sign_up")}
        </Link>
        <Link href="/learn" prefetch={false} className="btn btn-ghost mt-2 block px-4 py-2 text-center text-body">
          {t("common.close")}
        </Link>
      </section>
    );
  }

  if (phase === "error") {
    return (
      <section role="alert" className="card mx-auto w-full max-w-md p-5">
        <p className="text-body">{t("weekly.load_failed")}</p>
        {/* YERİNDE TEKRAR DENEME — Android'deki sıra: birincil "tekrar dene",
            ikincil çıkış. Yalnız çıkış sunmak geçici bir ağ hatasında
            kullanıcıyı ekrandan atıyordu. */}
        <button
          type="button"
          onClick={() => setAttempt((n) => n + 1)}
          className="btn btn-primary mt-3 w-full px-4 py-2 text-body"
        >
          {t("weekly.try_again")}
        </button>
        <Link href="/learn" className="btn btn-ghost mt-2 block px-4 py-2 text-center text-body">
          {t("weekly.back_to_learn")}
        </Link>
      </section>
    );
  }
  if (phase === "empty") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-h3">{t("weekly.none_title")}</h1>
        <p className="muted mt-2 text-body">{t("weekly.none_sub")}</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-body">
          {t("weekly.start_round")}
        </Link>
      </section>
    );
  }
  if (phase === "ready" && data) {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <div className="flex items-start gap-3">
          <Mascot mood="think" size={64} />
          <div>
            <h1 className="text-h3">{t(data.status.short ? "plan.weekly_short" : "plan.weekly_exam")}</h1>
            <p className="muted mt-1 text-body">
              {t("weekly.pitch", { n: data.rounds.length })}{" "}
              {data.status.short
                ? t("weekly.pitch_short", { n: data.status.mastered, min: MIN_MASTERED })
                : t("weekly.pitch_full", { n: data.status.mastered })}
            </p>
            <p className="muted mt-1 text-caption">{t("weekly.honest_note")}</p>
          </div>
        </div>
        <button type="button" onClick={start} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-h3">
          {t("common.start")}
        </button>
        <Link href="/learn" className="btn btn-ghost mt-2 w-full px-5 py-3 text-body">
          {t("common.later")}
        </Link>
      </section>
    );
  }
  if (phase === "done" && result) {
    const byWord = new Map<number, boolean>();
    for (const a of answers.current) byWord.set(a.wordId, (byWord.get(a.wordId) ?? true) && a.correct);
    const wrong = (data?.rounds ?? []).map(wordOf).filter((w) => byWord.get(w.id) === false);
    return (
      /*
        YERLESIM ANDROID'DEKI GIBI. Iki ekran ayni sonucu iki bicimde
        ciziyordu: Android buyuk bir halkayi ORTADA gosterip altina basligi ve
        "{total} sorudan {correct} dogru" satirini yaziyor; web 64 px'lik
        kucuk bir halkayi yanda tutup "Kullanim skorun" diye BASKA bir baslik
        ve "hafta {n}" diye bir satir yaziyordu.

        O "hafta {n}" satiri ayrica HATALIYDI: `{n}` sayi bekliyor ama
        `status.week` bir dizge ("2026-W37"), yani ekranda "hafta 2026-W37"
        yaziyordu. Android'de bu satir hic yok; yerlesim esitlenirken hata da
        kapaniyor.

        Halkanin rengi de Android'den: puana gore uc renk degil, MARKA rengi -
        "yuzde kac" bilgisini halkanin dolulugu tasiyor, rengi degil.
      */
      <section role="status" className="card mx-auto w-full max-w-md p-5 text-center">
        {result.total > 0 ? (
          <div
            className="relative mx-auto h-32 w-32 rounded-full"
            style={{ background: `conic-gradient(var(--color-brand-500) ${result.score}%, var(--surface-2) ${result.score}% 100%)` }}
          >
            <div className="absolute inset-[15px] flex flex-col items-center justify-center rounded-full" style={{ background: "var(--surface)" }}>
              <span className="text-display tabular-nums" style={{ color: "var(--color-brand)" }}>
                {formatPercent(result.score, lang)}
              </span>
              <span className="muted text-micro">{t("weekly.score")}</span>
            </div>
          </div>
        ) : null}
        <h1 className="mt-5 text-h1">{t("weekly.done_title")}</h1>
        <p className="muted mt-1 text-body">
          {t("weekly.done_sub", { total: result.total, correct: result.correct })}
        </p>
        {notSent ? (
          <p className="mt-3 text-strong" style={{ color: "var(--color-danger)" }}>
            {t("weekly.not_sent")}
          </p>
        ) : null}
        {wrong.length ? (
          <div className="mt-4">
            <p className="text-strong">{t("weekly.back_in_queue")}</p>
            <ul className="mt-1 flex flex-wrap gap-2">
              {wrong.map((w) => (
                <li key={w.id} className="chip px-3 py-1 text-caption" lang={course}>
                  {w.artikel ? `${w.artikel} ` : ""}
                  {w.de} <span className="muted ml-1">{w.tr}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : answers.current.length ? (
          <p className="mt-4 text-body" style={{ color: "var(--color-mint)" }}>
            {t("weekly.all_correct")}
          </p>
        ) : null}
        <p className="muted mt-3 text-caption">{t("weekly.once_a_week")}</p>
        <Link href="/learn" className="btn btn-primary mt-4 w-full px-5 py-3 text-body">
          {t("weekly.back_to_learn")}
        </Link>
      </section>
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
