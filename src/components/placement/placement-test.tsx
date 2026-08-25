"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { speakGerman } from "@/components/speak-button";
import { SpeakerIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { describePerSkill, nextLevel, PLACEMENT_LEVELS, type PlacementAnswer, type PlacementStage } from "@/lib/placement-score";
import type { PlacementRecord, PlacementTest as Test, TextItem } from "@/lib/placement";
import type { CefrLevel } from "@/lib/skills/types";

type Phase = "intro" | "loading" | "vocab" | "grammar" | "reading" | "listening" | "finishing" | "result" | "error";

const STAGE_TITLE: Record<PlacementStage, string> = { vocab: "Kelime", grammar: "Dilbilgisi", reading: "Okuma", listening: "Dinleme" };
const STAGE_HINT: Record<PlacementStage, string> = {
  vocab: "Almanca kelimenin Türkçesini seç. Bilmiyorsan tahmin etme, 'bilmiyorum' de — test o zaman doğru ölçer.",
  grammar: "Tablodaki boşluğa hangi biçim gelir? Bilmiyorsan 'bilmiyorum'.",
  reading: "Metni oku, üç soruyu cevapla.",
  listening: "Bölümü dinle (istediğin kadar), sonra soruları cevapla.",
};

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

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
  const router = useRouter();
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
      setPhase("error");
    }
  }

  async function accept() {
    if (!result || !chosen) return;
    try {
      await fetch("/api/placement", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "accept", id: result.id, level: chosen }) });
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
        <h1 className="text-xl font-bold">Seviyeni ölçelim</h1>
        <p className="muted mt-2 text-sm leading-relaxed">
          Dört kısa aşama — kelime, dilbilgisi, okuma, dinleme — en çok 15 dakika. Sonunda bir seviye önerisi ve beceri profili alırsın; seviyeyi yine sen seçersin.
        </p>
        {initialLast ? (
          <p className="mt-3 rounded-xl px-3 py-2 text-xs surface-2">
            Son alma: {initialLast.at.slice(0, 10)} · öneri <strong>{initialLast.suggested}</strong>
            {initialLast.accepted ? ` · seçtiğin ${initialLast.accepted}` : ""} · {describePerSkill(initialLast.perSkill)}
          </p>
        ) : null}
        {canRetake ? (
          <button type="button" onClick={() => void start()} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
            Başla
          </button>
        ) : (
          <p className="muted mt-4 text-sm">Test {retakeDays} günde bir alınabiliyor. Bu arada plan seni yönlendirir.</p>
        )}
        <Link href="/profile" className="btn btn-ghost mt-2 w-full px-5 py-3 text-sm">
          Vazgeç
        </Link>
      </section>
    );
  }
  if (phase === "loading" || phase === "finishing") {
    return (
      <section className="card mx-auto w-full max-w-md p-5" aria-busy>
        <p className="muted text-sm">{phase === "loading" ? "Test hazırlanıyor…" : "Sonuç hesaplanıyor…"}</p>
        <div className="mt-3 h-10 animate-pulse rounded-xl surface-2" />
      </section>
    );
  }
  if (phase === "error") {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <p className="text-sm">Test şu an yüklenemedi. Biraz sonra tekrar dene.</p>
        <button type="button" onClick={() => setPhase("intro")} className="btn btn-ghost mt-3 px-4 py-2 text-sm">
          Geri
        </button>
      </section>
    );
  }
  if (phase === "result" && result) {
    return (
      <section className="card mx-auto w-full max-w-md p-5">
        <h1 className="text-xl font-bold">Önerimiz: {result.suggested}</h1>
        <p className="muted mt-1 text-sm">{describePerSkill(result.perSkill)} · doğru %{result.score} · {minutes} dk</p>
        <p className="mt-3 text-sm leading-relaxed">
          Öneri, dört aşamanın ortanca seviyesi: tek bir güçlü ya da zayıf beceri sonucu tek başına belirlemez. İstersen farklı bir seviye seç — karar senin.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {PLACEMENT_LEVELS.map((l) => (
            <button key={l} type="button" onClick={() => setChosen(l)} className={`chip px-3 py-1.5 text-sm font-bold ${chosen === l ? "chip-active" : ""}`} aria-pressed={chosen === l}>
              {l}
              {l === result.suggested ? <span className="muted ml-1 text-xs font-semibold">öneri</span> : null}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => void accept()} className="btn btn-primary mt-4 w-full px-5 py-3.5 text-base">
          {chosen === result.suggested ? `${chosen} ile devam et` : `${chosen} seç ve devam et`}
        </button>
      </section>
    );
  }

  // Aşama ekranları
  const stage = phase as PlacementStage;
  const header = (
    <div className="mb-3 flex items-center justify-between text-xs font-semibold">
      <span>
        {STAGE_TITLE[stage]} · <span className="muted">{stage === "vocab" || stage === "grammar" ? level : ""}</span>
      </span>
      <button type="button" onClick={() => leaveStage(stage)} className="muted underline-offset-2 hover:underline">
        Bu aşamayı atla
      </button>
    </div>
  );
  const dontKnow = (onPick: () => void) => (
    <button type="button" onClick={onPick} className="btn btn-ghost mt-2 w-full px-4 py-2.5 text-sm">
      Bilmiyorum
    </button>
  );
  const options = (opts: string[], answer: number, onPick: (correct: boolean) => void) => (
    <div className="grid gap-2">
      {opts.map((o, i) => (
        <motion.button
          key={`${o}-${i}`}
          type="button"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
          disabled={picked !== null}
          onClick={() => {
            setPicked(i);
            setTimeout(() => onPick(i === answer), 180);
          }}
          className={`option px-3.5 py-3 text-left text-sm font-semibold ${picked === i ? "option-correct" : ""}`}
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
        {header}
        <p className="muted mb-3 text-xs">{STAGE_HINT[stage]}</p>
        {"de" in item ? (
          <p className="brand-text mb-4 text-2xl font-bold" lang="de">
            {item.artikel ? `${item.artikel} ` : ""}
            {item.de}
          </p>
        ) : (
          <p className="mb-4 text-base" lang="de">
            <span className="muted text-xs">{item.sheet} · {item.label}</span>
            <br />
            <strong>{item.key}</strong> → ?
          </p>
        )}
        {options(item.options, item.answer, (c) => answerLeveled(stage, c, item.id))}
        {dontKnow(() => answerLeveled(stage, false, item.id))}
        <p className="muted mt-3 text-center text-xs">
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
      {header}
      <p className="muted mb-2 text-xs">{STAGE_HINT[stage]} · {item.level}</p>
      {item.text ? (
        <div lang="de" className="mb-3 max-h-56 overflow-y-auto rounded-xl px-3.5 py-3 text-sm leading-relaxed surface-2">
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
            <button key={i} type="button" onClick={() => speakGerman(s.text)} className="chip flex items-center gap-1.5 px-3 py-1.5 text-xs">
              <SpeakerIcon size={13} />
              {s.speaker ? `${s.speaker} · ` : ""}Bölüm {i + 1}
            </button>
          ))}
        </div>
      ) : null}
      <p className="mb-3 text-sm font-semibold" lang="de">
        {q.text}
      </p>
      {options(q.options, q.answer, (c) => answerText(stage, item, qIndex, c))}
      {dontKnow(() => answerText(stage, item, qIndex, false))}
      <p className="muted mt-3 text-center text-xs">
        Metin {textIndex + 1} / {list.length} · Soru {qIndex + 1} / {item.questions.length}
      </p>
    </section>
  );
}
