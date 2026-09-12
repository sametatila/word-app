"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { speakGerman } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { RoundExit } from "@/components/round-exit";
import { track } from "@/lib/track";
import { describePerSkill, nextLevel, PLACEMENT_LEVELS, scorePlacement, type PlacementAnswer, type PlacementStage } from "@/lib/placement-score";
import type { PlacementRecord, PlacementTest as Test, TextItem } from "@/lib/placement";
import type { CefrLevel } from "@/lib/skills/types";
import { useT, useLang } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { formatPercent, localeOf } from "@/lib/i18n/dict";
import { localDay } from "@/lib/day";

type Phase = "intro" | "loading" | "vocab" | "grammar" | "reading" | "listening" | "finishing" | "result" | "error";

/** Aşama başlıkları sınav bölüm adlarıyla aynı — ikinci bir metin yazılmadı. */
const STAGE_TITLE_KEYS: Record<PlacementStage, string> = { vocab: "exam.sec_vocab", grammar: "exam.sec_grammar", reading: "exam.sec_reading", listening: "exam.sec_listening" };
const STAGE_HINT: Record<PlacementStage, string> = {
  vocab: "plc.vocab",
  grammar: "plc.grammar",
  reading: "plc.reading",
  listening: "plc.listening",
};

/**
 * Yerleştirme testi (WP-40): dört aşama, ≤ 15 dakika, sonunda öneri +
 * beceri profili; kullanıcı kabul eder ya da kendi seviyesini seçer.
 *
 * Kelime ve dilbilgisi uyarlanabilir: A1'den başlar, seviyenin %75'i doğruysa
 * bir üst seviye gelir, değilse aşama biter (`nextLevel`). "Bilmiyorum"
 * yanlış sayılır ama tahmin etmekten iyidir: tahmin bir seviyeyi şansla
 * geçirebilir, "bilmiyorum" geçiremez. Her aşama atlanabilir.
 */
export function PlacementTest({ initialLast, canRetake, retakeDays }: { initialLast: PlacementRecord | null; canRetake: boolean; retakeDays: number }) {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  /* Sonuç sunucuya yazılamadı: puan istemcide hesaplandı, seviye profile
     ayrıca yazılacak (bkz. `accept`). */
  const [notSaved, setNotSaved] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [test, setTest] = useState<Test | null>(null);
  const [level, setLevel] = useState<CefrLevel>("A1");
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const answers = useRef<PlacementAnswer[]>([]);
  const stageAnswers = useRef<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [result, setResult] = useState<PlacementRecord | null>(null);
  /** Testten çıkış onayı açık mı. */
  const [quit, setQuit] = useState(false);
  /* Ayrilmanin oteki yollari da ayni onaya bagli (yenileme, sekme, kenar
     cubugu bagalantilari). Android'de kosul `started && !done`; burada
     testin dort asamasi. */
  const ayril = useLeaveGuard(phase === "vocab" || phase === "grammar" || phase === "reading" || phase === "listening");
  const [chosen, setChosen] = useState<CefrLevel | null>(null);
  const startedAt = useRef(Date.now());

  async function start() {
    setPhase("loading");
    track("exam_start", 0, "placement:A1");
    try {
      const res = await fetch("/api/placement", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "start" }) });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { test: Test };
      setTest(data.test);
      answers.current = [];
      startedAt.current = Date.now();
      enterStage("vocab", data.test);
    } catch {
      setPhase("error");
    }
  }

  function enterStage(stage: PlacementStage, t: Test) {
    setPicked(null);
    setIndex(0);
    setTextIndex(0);
    setQIndex(0);
    setLevel("A1");
    stageAnswers.current = { correct: 0, total: 0 };
    if (stage === "vocab" && !t.vocab.A1?.length) return enterStage("grammar", t);
    if (stage === "grammar" && !t.grammar.A1?.length) return enterStage("reading", t);
    if (stage === "reading" && !t.reading.length) return enterStage("listening", t);
    if (stage === "listening" && !t.listening.length) return void finish();
    setPhase(stage);
  }

  const stageAfter: Record<PlacementStage, PlacementStage | null> = { vocab: "grammar", grammar: "reading", reading: "listening", listening: null };

  function leaveStage(stage: PlacementStage) {
    if (!test) return;
    const next = stageAfter[stage];
    if (next) enterStage(next, test);
    else void finish();
  }

  /** Kelime/dilbilgisi: seviye seviye. */
  function answerLeveled(stage: "vocab" | "grammar", correct: boolean, itemId: string) {
    if (!test) return;
    const items = stage === "vocab" ? test.vocab[level] : test.grammar[level];
    answers.current.push({ stage, level, itemId, correct });
    stageAnswers.current.total++;
    if (correct) stageAnswers.current.correct++;
    setPicked(null);
    if (index + 1 < items.length) return setIndex(index + 1);
    const up = nextLevel(level, stageAnswers.current.correct, stageAnswers.current.total);
    const upItems = up ? (stage === "vocab" ? test.vocab[up] : test.grammar[up]) : [];
    if (up && upItems.length) {
      setLevel(up);
      setIndex(0);
      stageAnswers.current = { correct: 0, total: 0 };
    } else leaveStage(stage);
  }

  /** Okuma/dinleme: metin başına 3 soru. */
  function answerText(stage: "reading" | "listening", item: TextItem, qi: number, correct: boolean) {
    answers.current.push({ stage, level: item.level, itemId: `${item.id}#${qi}`, correct });
    setPicked(null);
    const list = stage === "reading" ? test!.reading : test!.listening;
    if (qi + 1 < item.questions.length) return setQIndex(qi + 1);
    if (textIndex + 1 < list.length) {
      setTextIndex(textIndex + 1);
      setQIndex(0);
    } else leaveStage(stage);
  }

  async function finish() {
    setPhase("finishing");
    try {
      const res = await fetch("/api/placement", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "finish", answers: answers.current, day: localDay() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as PlacementRecord;
      setResult(data);
      setChosen(data.suggested);
      setPhase("result");
    } catch {
      /*
       * TEST YAPILDI AMA KAYDEDİLEMEDİ.
       *
       * Eskiden burada hata kartı çiziliyordu: on dakikalık testin sonucu
       * ekrandan siliniyor, kullanıcı seviyesini hiç öğrenmiyordu. Puanlama
       * SAF bir işlev (`scorePlacement`) ve sunucu da onu kullanıyor, yani
       * aynı sonucu istemcide hesaplamak uydurmak değil. Android bunu baştan
       * beri yapıyor (`PlacementScreen` yerel tahmine düşüyor); kayıt
       * kurtarılamadığı için seviye profile ayrıca yazılıyor.
       */
      const local = scorePlacement(answers.current);
      setResult({ id: 0, at: new Date().toISOString(), accepted: null, ...local });
      setChosen(local.suggested);
      setNotSaved(true);
      setPhase("result");
    }
  }

  async function accept() {
    if (!result || !chosen) return;
    try {
      /* Kayıt yoksa (id 0) kabul edilecek bir satır da yok: seviye doğrudan
         profile yazılıyor - Android'in aynı yerdeki yedeği (`updateProfile`). */
      await (result.id
        ? fetch("/api/placement", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "accept", id: result.id, level: chosen }) })
        : fetch("/api/profile", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ level: chosen }) }));
    } finally {
      router.push("/learn");
      router.refresh();
    }
  }

  const minutes = useMemo(() => Math.round((Date.now() - startedAt.current) / 60000), [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setPicked(null);
  }, [phase, level, index, textIndex, qIndex]);

  // ── Ekranlar ──
  if (phase === "intro") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-h2">{t("onboarding.kisa_yerlestirme_sinavi")}</h1>
        <p className="muted mt-2 text-body leading-relaxed">
          {t("plc.intro")}
        </p>
        {initialLast ? (
          <p className="mt-3 rounded-panel px-3 py-2 text-caption surface-2">
            {t("placement.last_taken", { date: new Date(initialLast.at).toLocaleDateString(localeOf(lang), { day: "numeric", month: "short", year: "numeric" }) })} <strong>{initialLast.suggested}</strong>
            {initialLast.accepted ? ` ${t("placement.you_chose", { level: initialLast.accepted })}` : ""} · {describePerSkill(initialLast.perSkill, t)}
          </p>
        ) : null}
        {canRetake ? (
          <button type="button" onClick={() => void start()} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-h3">
            {t("common.start")}
          </button>
        ) : (
          <p className="muted mt-4 text-body">{t("placement.retake_in", { n: retakeDays })}</p>
        )}
        <Link href="/profile" className="btn btn-ghost mt-2 w-full px-5 py-3 text-body">
          {t("common.discard")}
        </Link>
      </section>
    );
  }
  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (phase === "loading" || phase === "finishing") {
    return (
      <section role="status" aria-busy="true" className="card mx-auto w-full max-w-md p-5">
        <p className="muted text-body">{t(phase === "loading" ? "plc.preparing" : "placement.calculating_your_level")}</p>
        <div className="mt-3 h-10 animate-pulse rounded-tile surface-2" />
      </section>
    );
  }
  if (phase === "error") {
    return (
      <section role="alert" className="card mx-auto w-full max-w-md p-5">
        <p className="text-body">{t("placement.couldn_t_load_test")}</p>
        {/* Yerinde tekrar deneme — Android'deki sıra: birincil "tekrar dene",
            ikincil çıkış (bkz. `weekly-player`). Yalnız çıkış sunmak geçici
            bir ağ hatasında kullanıcıyı ekrandan atıyordu. */}
        <button type="button" onClick={() => void start()} className="btn btn-primary mt-3 w-full px-4 py-2 text-body">
          {t("common.try_again")}
        </button>
        <button type="button" onClick={() => setPhase("intro")} className="btn btn-ghost mt-2 w-full px-4 py-2 text-body">
          {t("common.back")}
        </button>
      </section>
    );
  }
  if (phase === "result" && result) {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-h2">{t("placew.suggestion", { level: result.suggested })}</h1>
        <p className="muted mt-1 text-body">
          {describePerSkill(result.perSkill, t)} · {t("placew.score_line", { pct: formatPercent(result.score, lang), min: minutes })}
        </p>
        {notSaved ? (
          <p className="mt-3 text-strong" style={{ color: "var(--color-danger)" }}>{t("placement.not_saved")}</p>
        ) : null}
        <p className="mt-3 text-body leading-relaxed">{t("placew.median_note")}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PLACEMENT_LEVELS.map((l) => (
            <button key={l} type="button" onClick={() => setChosen(l)} className={`chip px-3 py-1.5 text-strong ${chosen === l ? "chip-active" : ""}`} aria-pressed={chosen === l}>
              {l}
              {l === result.suggested ? <span className="muted ml-1 text-caption">{t("placement.suggested")}</span> : null}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => void accept()} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-h3">
          {chosen === result.suggested
            ? t("placement.continue_with", { level: chosen ?? "" })
            : t("placement.pick_and_continue", { level: chosen ?? "" })}
        </button>
      </section>
    );
  }

  // Aşama ekranları
  const stage = phase as PlacementStage;
  const header = (
    <div className="mb-3 flex items-center justify-between text-caption">
      <span>
        {t(STAGE_TITLE_KEYS[stage])} · <span className="muted">{stage === "vocab" || stage === "grammar" ? level : ""}</span>
      </span>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => leaveStage(stage)} className="muted hit-8 underline-offset-2 hover:underline">
          {t("plc.skip_stage")}
        </button>
        {/* ÇIKIŞ YOLU YOKTU: test başlayınca tek çıkış tarayıcının geri
            düğmesiydi -- aynı kapan sınavda da vardı (bkz. `mock-exam-player`).
            Android'de başlıkta bir kapat düğmesi var ve "cevapların
            kaydedilmiyor" diye sorup çıkıyor; metin zaten sözlükte duruyordu,
            web'de onu kullanan hiçbir şey yoktu. */}
        {/* Ölçü Android'den (bkz. `exam-player`): 44 px karo, 22 px simge. */}
        <RoundExit onExit={() => setQuit(true)} labelKey="plc.quit_title" />
      </div>
    </div>
  );
  const quitDialog = (
    <ConfirmDialog
      open={quit || ayril.pending !== null}
      title={t("plc.quit_title")}
      message={t("plc.quit_body")}
      confirmLabel={t("common.exit")}
      destructive
      onConfirm={() => { setQuit(false); if (ayril.pending) ayril.leave(); else router.push("/profile"); }}
      onCancel={() => { setQuit(false); ayril.stay(); }}
    />
  );
  const dontKnow = (onPick: () => void) => (
    <button type="button" onClick={onPick} className="btn btn-ghost mt-2 w-full px-4 py-2.5 text-body">
      {t("plc.dont_know")}
    </button>
  );
  const options = (opts: string[], answer: number, onPick: (correct: boolean) => void, soru?: string) => (
    /* TEK SEÇİMLİK ŞIK LİSTESİ RADYO GRUBUDUR — Android karşılığı `ChoiceGame`
       şıkları `accessibilityRole="radio"` ile veriyor. */
    <div role="radiogroup" aria-label={soru} className="grid gap-2">
      {opts.map((o, i) => (
        <motion.button
          key={`${o}-${i}`}
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          /* OLCUM KIPI: dogruluk aciklanmaz, bu yuzden tek bilgi SECIM ve o da
             yalnizca zemin renginden okunuyordu. Android karsiligi
             `ChoiceGame` `reveal={false}` dali. */
          role="radio"
          aria-checked={picked === i}
          transition={{ delay: i * 0.04 }}
          disabled={picked !== null}
          onClick={() => {
            setPicked(i);
            setTimeout(() => onPick(i === answer), 180);
          }}
          className={`option px-3.5 py-3 text-left text-strong ${picked === i ? "option-correct" : ""}`}
        >
          {o}
        </motion.button>
      ))}
    </div>
  );

  if (stage === "vocab" || stage === "grammar") {
    const items = stage === "vocab" ? test!.vocab[level] : test!.grammar[level];
    const item = items[index];
    if (!item) return null;
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        {quitDialog}
        {header}
        <p className="muted mb-3 text-caption">{t(STAGE_HINT[stage])}</p>
        {"de" in item ? (
          <p className="brand-text mb-4 text-h1" lang={course}>
            {item.artikel ? `${item.artikel} ` : ""}
            {item.de}
          </p>
        ) : (
          <p className="mb-4 text-body" lang={course}>
            <span className="muted text-caption">{item.sheet} · {item.label}</span>
            <br />
            <strong>{item.key}</strong> → ?
          </p>
        )}
        {options(item.options, item.answer, (c) => answerLeveled(stage, c, item.id), "de" in item ? item.de : item.key)}
        {dontKnow(() => answerLeveled(stage, false, item.id))}
        <p className="muted mt-3 text-center text-caption">
          {index + 1} / {items.length}
        </p>
      </section>
    );
  }

  const list = stage === "reading" ? test!.reading : test!.listening;
  const item = list[textIndex];
  if (!item) return null;
  const q = item.questions[qIndex];
  return (
    <section className="card mx-auto w-full max-w-md p-5">
      {quitDialog}
      {header}
      <p className="muted mb-2 text-caption">{t(STAGE_HINT[stage])} · {item.level}</p>
      {item.text ? (
        <div lang={course} className="mb-3 max-h-56 overflow-y-auto rounded-panel px-3.5 py-3 text-body leading-relaxed surface-2">
          {item.text.split("\n\n").map((p, i) => (
            <p key={i} className={i > 0 ? "mt-2" : ""}>
              {p}
            </p>
          ))}
        </div>
      ) : null}
      {item.segments ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {item.segments.map((s, i) => (
            <button key={i} type="button" onClick={() => speakGerman(s.text)} className="chip flex items-center gap-1.5 px-3 py-1.5 text-caption">
              <SpeakerIcon size={13} />
              {s.speaker ? `${s.speaker} · ` : ""}{t("placement.section_n", { n: i + 1 })}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mb-3 text-strong" lang={course}>
        {q.text}
      </p>
      {options(q.options, q.answer, (c) => answerText(stage, item, qIndex, c), q.text)}
      {dontKnow(() => answerText(stage, item, qIndex, false))}
      <p className="muted mt-3 text-center text-caption">
        {t("plc.text_of", { n: textIndex + 1, total: list.length })} ·{" "}
        {t("exam.question_of", { n: qIndex + 1, total: item.questions.length })}
      </p>
    </section>
  );
}
