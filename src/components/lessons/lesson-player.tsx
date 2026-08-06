"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  prefetchGerman,
  prefetchSegments,
  speakGerman,
  speakSegments,
  stopSpeaking,
  useSpeechAvailable,
} from "@/components/speak-button";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { AlertIcon, CheckIcon, MicIcon, SparkIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { parseReply } from "@/lib/chat-format";
import { fx } from "@/lib/fx";
import { judgeSpeech } from "@/lib/speech";
import { tr as trSeg, type Expectation, type Lesson, type Segment } from "@/lib/lessons/types";

/**
 * Ders oynatıcısı — anlatım, konuşma pratiği, özet.
 *
 * Anlatım bir sohbet gibi akıyor ama senaryosu yazılı: öğretmen söylüyor,
 * öğrenci KONUŞARAK cevap veriyor, senaryo ilerliyor. Model beklenmediği için
 * akışta hiç "cevap geliyor…" yok; tek bekleme sesin kendisi ve o da önceden
 * indiriliyor.
 *
 * İki dilin sınırı her an kesin: anlatım parçaları Türkçe sesle, hedefler
 * Almanca sesle okunuyor; beklenen cevap Almancaysa tanıyıcı Almanca,
 * Türkçeyse (onay, doğru/yanlış) Türkçe dinliyor. Yanlış dilde dinlemek
 * tanıyıcıya en yakın kelimeyi uydurtmak demek — bu yüzden dil, adımın
 * beklentisinden türetiliyor ve asla tahmin edilmiyor.
 */

type Phase = "lecture" | "roleplay" | "summary";
type Turn = { role: "user" | "assistant"; content: string };

/** Anlatım akışındaki bir baloncuk. */
type FeedItem =
  | { role: "assistant"; segments: Segment[]; tone?: "hint" }
  | { role: "user"; text: string };

const HANDSFREE_KEY = "wortspiel-lesson-handsfree";

/**
 * Eller serbestken mikrofonun boşuna açık kalabileceği süre.
 *
 * Tanıyıcı hiç ses duymazsa kendiliğinden kapanmıyor; süre dolunca mikrofon
 * kapanıyor ve ne yapılacağı yazılıyor. On iki saniye gözlemle seçildi: bir
 * cümleyi düşünmek birkaç saniye, on saniyeyi geçen sessizlik takılma.
 */
const SILENCE_MS = 12000;

/**
 * Yarım kalan dersin cihazda saklanması.
 *
 * Anlatım uzun bir akış ve konuşma daha da uzun; ortasında çıkan öğrenci
 * döndüğünde baştan başlamamalı. Sunucuda değil cihazda: yarım bir akışın
 * adım sayacı kalıcı bir kayıt değil ve her adımda sunucuya yazmak akışa
 * bekleme eklerdi. Bedeli açık — başka cihazda devam edilemiyor.
 */
const RESUME_KEY = "wortspiel-lesson-progress";
const RESUME_DAYS = 3;

type Saved = {
  phase: Phase;
  stepIndex: number;
  correctCount: number;
  turns: Turn[];
  at: number;
};

function readSaved(lesson: Lesson): Saved | null {
  try {
    const raw = localStorage.getItem(`${RESUME_KEY}:${lesson.id}`);
    if (!raw) return null;
    const v = JSON.parse(raw) as Saved;
    if (!v || typeof v.at !== "number") return null;
    if (Date.now() - v.at > RESUME_DAYS * 86400000) return null;
    if (v.phase !== "lecture" && v.phase !== "roleplay") return null;
    if (v.phase === "lecture" && (v.stepIndex <= 0 || v.stepIndex >= lesson.lecture.length))
      return null;
    return v;
  } catch {
    return null;
  }
}

/**
 * Övgüler dönüşümlü: her doğruda aynı kelimeyi duymak övgüyü görünmez yapıyor.
 * Sıra adım numarasından geliyor ki aynı adımın tekrarında bile değişsin.
 */
const PRAISE = ["Çok iyi!", "Harika!", "Süper!", "Çok güzel söyledin!", "Mükemmel!"];

/** Türkçe hükmün ayrıştırılması — doğru mu dedi, yanlış mı? */
function parseJudgment(text: string): boolean | null {
  const t = text.toLocaleLowerCase("tr-TR");
  const yes = /doğru|dogru/.test(t);
  const no = /yanlış|yanlıs|yanlis/.test(t);
  if (yes === no) return null; // ikisi birden ya da hiçbiri: hüküm yok
  return yes;
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("lecture");

  // ── Anlatım durumu ──
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  /** Geçerli adımda kaç deneme yapıldı — ipucu merdiveni buna bakıyor. */
  const attempts = useRef(0);
  /** Bu adımda cevap bekleniyor mu (ses bitti, sıra öğrencide). */
  const [awaiting, setAwaiting] = useState(false);

  // ── Konuşma durumu ──
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [handsFree, setHandsFree] = useState(true);
  /** Yazarak cevaplama — varsayılan değil, takılınca açılan çıkış yolu. */
  const [typing, setTyping] = useState(false);

  const [saved, setSaved] = useState<{ passed: boolean; nextDays: number } | null>(null);
  const [resumed, setResumed] = useState(false);

  const ttsAvailable = useSpeechAvailable();
  const [asrAvailable, setAsrAvailable] = useState(false);
  useEffect(() => setAsrAvailable(recognitionCtor() !== null), []);

  const recognition = useRef<Recognition | null>(null);
  const silence = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const handsFreeRef = useRef(true);
  const draftRef = useRef("");
  /** Süren okumayı iptal eden işlev — adım değişince ya da sökülünce. */
  const cancelSpeech = useRef<(() => void) | null>(null);
  const speechToken = useRef(0);
  const sendRef = useRef<(text: string) => void>(() => {});

  const step = lesson.lecture[stepIndex];
  const expect = step?.expect;

  /**
   * İlk çizimde kayıt okunmuyor: sunucu ile tarayıcının farklı şey çizmesi
   * hidrasyonu bozar. Kayıt yüklenene kadar akış başlamıyor.
   */
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = readSaved(lesson);
    setReady(true);
    if (!v) return;
    setStepIndex(v.stepIndex);
    setCorrectCount(v.correctCount);
    setTurns(v.turns);
    setPhase(v.phase);
    setResumed(true);
  }, [lesson]);

  useEffect(() => {
    if (!ready) return;
    try {
      if (phase === "summary" || (phase === "lecture" && stepIndex === 0)) {
        localStorage.removeItem(`${RESUME_KEY}:${lesson.id}`);
        return;
      }
      const v: Saved = { phase, stepIndex, correctCount, turns, at: Date.now() };
      localStorage.setItem(`${RESUME_KEY}:${lesson.id}`, JSON.stringify(v));
    } catch {
      /* depolama kapalıysa devam etme özelliği yok sayılıyor */
    }
  }, [ready, lesson.id, phase, stepIndex, correctCount, turns]);

  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);
  useEffect(() => {
    handsFreeRef.current = handsFree;
  }, [handsFree]);
  useEffect(() => {
    try {
      setHandsFree(localStorage.getItem(HANDSFREE_KEY) !== "0");
    } catch {
      setHandsFree(true);
    }
  }, []);
  useEffect(
    () => () => {
      recognition.current?.abort();
      cancelSpeech.current?.();
      stopSpeaking();
      if (silence.current) clearTimeout(silence.current);
    },
    [],
  );
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [feed, turns, phase, awaiting]);

  /**
   * Sesler önceden iniyor: geçerli adım ve sonraki iki adım. Öğretmen
   * konuşurken sıradaki cümleler indiği için akışta ağ hiç hissedilmiyor.
   * Konuşmanın açılış repliği de anlatım sırasında hazırlanıyor.
   */
  useEffect(() => {
    const ahead = lesson.lecture.slice(stepIndex, stepIndex + 3).flatMap((s) => s.say);
    prefetchSegments(ahead);
    prefetchGerman(lesson.roleplay.opening);
  }, [lesson, stepIndex]);

  // ─────────────────────────── anlatım motoru ───────────────────────────

  const clearSilence = () => {
    if (silence.current) clearTimeout(silence.current);
    silence.current = null;
  };

  /**
   * Tanımayı başlatır — dil, adımın beklentisinden geliyor.
   *
   * Almanca hedef beklenirken üç aday isteniyor: değerlendirme (judgeSpeech)
   * ilk adaydan doğruluk, alt adaylardan teşhis çıkarıyor. Türkçe hükümde tek
   * aday yeter.
   */
  const capture = useCallback(
    async (lang: string, onHeard: (alternatives: string[]) => void, auto: boolean) => {
      const Ctor = recognitionCtor();
      if (!Ctor) return;
      const permission = await requestMicrophone();
      if (permission === "denied") {
        setError("Mikrofon izni verilmedi. Yazarak da devam edebilirsin.");
        return;
      }
      recognition.current?.abort();
      const rec = new Ctor();
      recognition.current = rec;
      rec.lang = lang;
      rec.interimResults = false;
      rec.continuous = false;
      rec.maxAlternatives = 3;
      rec.onresult = (e) => {
        clearSilence();
        const result = e.results[0];
        const alternatives: string[] = [];
        for (let i = 0; i < (result?.length ?? 0); i++) {
          const t = result[i]?.transcript?.trim();
          if (t) alternatives.push(t);
        }
        if (!alternatives.length) return;
        setHint(null);
        onHeard(alternatives);
      };
      rec.onerror = () => {
        clearSilence();
        setListening(false);
      };
      rec.onend = () => {
        clearSilence();
        setListening(false);
      };
      setListening(true);
      setHint(null);
      try {
        rec.start();
        // Sessizlik sayacı yalnızca kendiliğinden açılan mikrofon için:
        // kullanıcı kendi dokunduysa ne yaptığını biliyor.
        if (auto) {
          clearSilence();
          silence.current = setTimeout(() => {
            rec.stop();
            setListening(false);
            setHint("Sesini duyamadım. Hazır olunca mikrofona dokun ya da yazarak devam et.");
          }, SILENCE_MS);
        }
      } catch {
        clearSilence();
        setListening(false);
      }
    },
    [],
  );

  /** Beklentinin tanıma dili. Almanca hedefler kursun diliyle dinleniyor. */
  const langFor = useCallback(
    (e: Expectation): string =>
      e.kind === "confirm" || e.kind === "truefalse"
        ? "tr-TR"
        : lesson.course === "gsw-zh"
          ? "de-CH"
          : "de-DE",
    [lesson.course],
  );

  /**
   * Bir anlatım adımını oynatır: baloncuğu ekler, sesleri okur; beklenti
   * varsa mikrofonu açar, yoksa sıradaki adıma geçer.
   *
   * `prefix` bir önceki cevabın övgüsü — ayrı bir baloncuk yerine sıradaki
   * cümlenin başına ekleniyor: "Çok iyi! İkinci kelimemiz…" Learna'nın da
   * yaptığı bu ve sebebi ekran düzeni değil ritim: övgü tek başına bir tur
   * değil, geçişin yakıtı.
   */
  const runStep = useCallback(
    (index: number, prefix?: Segment[]) => {
      const s = lesson.lecture[index];
      if (!s) {
        startRoleplay();
        return;
      }
      attempts.current = 0;
      setAwaiting(false);
      setStepIndex(index);
      setTyping(false);
      const segments = [...(prefix ?? []), ...s.say];
      setFeed((f) => [...f, { role: "assistant", segments }]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const after = () => {
        if (speechToken.current !== token) return;
        if (s.expect) {
          setAwaiting(true);
          if (handsFreeRef.current && asrAvailable) {
            void capture(langFor(s.expect), (alts) => evaluateRef.current(alts), true);
          }
        } else {
          runStepRef.current(index + 1);
        }
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after);
      else after();
    },
    // startRoleplay aşağıda tanımlı; ref üzerinden çağrılıyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lesson, ttsAvailable, asrAvailable, capture, langFor],
  );
  const runStepRef = useRef(runStep);
  useEffect(() => {
    runStepRef.current = runStep;
  }, [runStep]);

  /** Yalnızca konuşan bir ara baloncuk: ipucu, düzeltme, teselli. */
  const interject = useCallback(
    (segments: Segment[], then?: () => void, tone: "hint" | undefined = "hint") => {
      setAwaiting(false);
      setFeed((f) => [...f, { role: "assistant", segments, tone }]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const after = () => {
        if (speechToken.current !== token) return;
        then?.();
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after);
      else after();
    },
    [ttsAvailable],
  );

  /** Aynı adım için mikrofonu yeniden açar (ipucundan sonra). */
  const reopen = useCallback(() => {
    setAwaiting(true);
    const e = lesson.lecture[stepIndexRef.current]?.expect;
    if (!e) return;
    if (handsFreeRef.current && asrAvailable) {
      void capture(langFor(e), (alts) => evaluateRef.current(alts), true);
    }
  }, [asrAvailable, capture, langFor, lesson]);
  const stepIndexRef = useRef(0);
  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  /**
   * Öğrencinin cevabını değerlendirir — anlatımın kalbi.
   *
   * İpucu merdiveni: ilk yanlışta hedefe özgü ipucu, ikincisinde doğrusu
   * söylenip bir kez daha isteniyor, üçüncüsünde ders takılmadan devam ediyor
   * — takılan adım konuşma pratiğinde zaten tekrar karşına çıkacak. Amaç
   * sınamak değil söyletmek; üç denemeden sonra dördüncüyü istemek öğretmeyi
   * bırakıp sınava dönüşmek olurdu.
   */
  const evaluate = useCallback(
    (alternatives: string[]) => {
      const s = lesson.lecture[stepIndexRef.current];
      const e = s?.expect;
      if (!e) return;
      const said = alternatives[0] ?? "";
      if (!said.trim()) return;
      setFeed((f) => [...f, { role: "user", text: said }]);
      const praise = trSeg(PRAISE[stepIndexRef.current % PRAISE.length]);
      const next = () => runStepRef.current(stepIndexRef.current + 1, [praise]);
      const isFirstTry = attempts.current === 0;

      if (e.kind === "confirm") {
        runStepRef.current(stepIndexRef.current + 1);
        return;
      }

      if (e.kind === "truefalse") {
        const judgment = parseJudgment(said);
        if (judgment === null) {
          interject([trSeg("Lütfen yalnızca 'doğru' ya da 'yanlış' de.")], reopen);
          return;
        }
        const ok = judgment === e.answer;
        if (ok && isFirstTry) setCorrectCount((n) => n + 1);
        fx(ok ? "correct" : "wrong", 900);
        interject(
          [trSeg(ok ? PRAISE[stepIndexRef.current % PRAISE.length] : "Olmadı."), ...e.why],
          () => runStepRef.current(stepIndexRef.current + 1),
          ok ? undefined : "hint",
        );
        return;
      }

      // repeat | produce — Almanca hedefle karşılaştırma.
      const targets = [e.target, ...(e.kind === "produce" ? (e.accept ?? []) : [])];
      const verdicts = targets.map((t) => judgeSpeech(t, alternatives));
      const best = verdicts.find((v) => v.kind === "correct") ?? verdicts[0];

      if (best.kind === "correct") {
        if (e.kind === "produce" && isFirstTry) setCorrectCount((n) => n + 1);
        fx("correct", 900);
        next();
        return;
      }

      if (best.kind === "uncertain") {
        interject(
          [trSeg("Tam duyamadım. Bir kez daha söyler misin:"), { lang: "de", text: e.target }],
          reopen,
        );
        return;
      }

      attempts.current += 1;
      fx("wrong", 900);

      if (attempts.current >= 3) {
        interject(
          [trSeg("Sorun değil — bu, konuşmada tekrar karşına çıkacak. Devam edelim.")],
          () => runStepRef.current(stepIndexRef.current + 1),
        );
        return;
      }

      if (attempts.current === 2) {
        interject(
          [trSeg("Doğrusu:"), { lang: "de", text: e.target }, trSeg("Lütfen tekrar et.")],
          reopen,
        );
        return;
      }

      // İlk yanlış: üretimde içerikteki hedefe özgü ipucu; tekrarla eksik
      // kelimeler söyleniyor — "yanlış" demek öğretmez, neyin eksik olduğu öğretir.
      if (e.kind === "produce") {
        interject(e.hint, reopen);
      } else {
        const missing =
          best.kind === "partial" || best.kind === "different" ? best.missing : [];
        interject(
          missing.length
            ? [
                trSeg("Neredeyse! Eksik kalan:"),
                { lang: "de", text: missing.join(", ") },
                trSeg("Bir kez daha:"),
                { lang: "de", text: e.target },
              ]
            : [trSeg("Bir kez daha deneyelim:"), { lang: "de", text: e.target }],
          reopen,
        );
      }
    },
    [interject, lesson, reopen],
  );
  const evaluateRef = useRef(evaluate);
  useEffect(() => {
    evaluateRef.current = evaluate;
  }, [evaluate]);

  /** Anlatımı başlat — ilk adım, kayıttan dönülüyorsa kaldığı adım. */
  useEffect(() => {
    if (!ready || started || phase !== "lecture") return;
    setStarted(true);
    runStepRef.current(stepIndexRef.current);
    // İlk adım yalnızca bir kez oynatılmalı.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, started, phase]);

  /** Adımı atla — takılan öğrencinin çıkışı; puan almadan ilerler. */
  function skipStep() {
    recognition.current?.abort();
    attempts.current = 0;
    runStep(stepIndex + 1);
  }

  /** Yazılan cevap da sesli cevapla aynı kapıdan geçiyor. */
  function submitTyped() {
    const clean = draft.trim();
    if (!clean) return;
    setDraft("");
    evaluate([clean]);
  }

  // ─────────────────────────── konuşma pratiği ───────────────────────────

  function startRoleplay() {
    recognition.current?.abort();
    cancelSpeech.current?.();
    setAwaiting(false);
    setPhase("roleplay");
    if (turns.length) return; // kayıttan dönüldü, konuşma zaten kurulu
    setTurns([{ role: "assistant", content: lesson.roleplay.opening }]);
    const token = ++speechToken.current;
    if (ttsAvailable)
      speakGerman(lesson.roleplay.opening, () => {
        if (speechToken.current !== token) return;
        if (!handsFreeRef.current) return;
        void listenRoleplay();
      });
    else if (handsFreeRef.current) void listenRoleplay();
  }

  const send = useCallback(
    async (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      setDraft("");
      setError(null);
      const next: Turn[] = [...turns, { role: "user", content: clean }];
      setTurns([...next, { role: "assistant", content: "" }]);
      setBusy(true);

      try {
        const res = await fetch("/api/roleplay", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lessonId: lesson.id, messages: next }),
        });
        if (!res.ok || !res.body) {
          setTurns(next);
          setError(
            res.status === 503
              ? "Konuşma servisi şu an kapalı. Dersin diğer bölümleri çalışıyor."
              : "Cevap alınamadı. Tekrar dener misin?",
          );
          return;
        }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setTurns([...next, { role: "assistant", content: acc }]);
        }
        const { body } = parseReply(acc);
        if (ttsAvailable && body.trim()) {
          const token = ++speechToken.current;
          speakGerman(body, () => {
            if (speechToken.current !== token) return;
            if (!handsFreeRef.current) return;
            if (draftRef.current.trim()) return;
            void listenRoleplay();
          });
        }
      } catch {
        setTurns(next);
        setError("İnternet bağlantısı kurulamadı.");
      } finally {
        setBusy(false);
      }
    },
    // `listenRoleplay` aşağıda tanımlı; bağımlılığa alınırsa döngü oluşur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [turns, busy, lesson.id, ttsAvailable],
  );
  useEffect(() => {
    sendRef.current = (t: string) => void send(t);
  }, [send]);

  const listenRoleplay = useCallback(async () => {
    await capture(
      lesson.course === "gsw-zh" ? "de-CH" : "de-DE",
      (alts) => sendRef.current(alts[0] ?? ""),
      true,
    );
  }, [capture, lesson.course]);

  function stopListening() {
    recognition.current?.stop();
    setListening(false);
  }

  async function toggleHandsFree() {
    const next = !handsFree;
    setHandsFree(next);
    try {
      localStorage.setItem(HANDSFREE_KEY, next ? "1" : "0");
    } catch {
      /* depolama kapalı */
    }
    if (!next) {
      stopListening();
      return;
    }
    await requestMicrophone();
    if (busy || listening) return;
    // Açmak, mikrofona dokunmakla aynı şey — hangi fazdaysak orada dinle.
    if (phase === "roleplay") void listenRoleplay();
    else if (awaiting && expect) void capture(langFor(expect), (a) => evaluate(a), true);
  }

  const userTurns = turns.filter((t) => t.role === "user").length;
  const roleplayDone = userTurns >= lesson.roleplay.minTurns;

  // ─────────────────────────── bitiş ───────────────────────────

  async function finish() {
    recognition.current?.abort();
    cancelSpeech.current?.();
    stopSpeaking();
    setPhase("summary");
    try {
      const res = await fetch("/api/lesson", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          correct: correctCount,
          roleplayDone,
        }),
      });
      if (res.ok) setSaved((await res.json()) as { passed: boolean; nextDays: number });
    } catch {
      // Kayıt başarısızsa özet yine gösteriliyor.
    }
  }

  const corrections = turns
    .filter((t) => t.role === "assistant")
    .flatMap((t) => parseReply(t.content).corrections);

  const suggestions =
    !busy && turns.at(-1)?.role === "assistant"
      ? parseReply(turns.at(-1)!.content).suggestions
      : [];

  const scoredTotal = lesson.lecture.filter(
    (s) => s.expect?.kind === "produce" || s.expect?.kind === "truefalse",
  ).length;

  // ─────────────────────────── görünüm ───────────────────────────

  const micLabel = busy
    ? "Cevap geliyor…"
    : listening
      ? "Dinliyorum — bitince dokun"
      : (hint ?? "Konuşmak için dokun");

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-4">
      <Steps phase={phase} />

      {phase === "lecture" ? (
        <LectureProgress at={stepIndex} total={lesson.lecture.length} />
      ) : null}

      {resumed && phase !== "summary" ? (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs"
          style={{ background: "color-mix(in srgb, var(--color-brand-500) 10%, transparent)" }}
        >
          <span className="flex-1" style={{ color: "var(--color-brand-500)" }}>
            {phase === "roleplay"
              ? "Konuşmaya kaldığın yerden devam ediyorsun."
              : "Derse kaldığın yerden devam ediyorsun."}
          </span>
          <button
            type="button"
            onClick={() => setResumed(false)}
            aria-label="Kapat"
            className="muted shrink-0"
          >
            <XIcon size={14} />
          </button>
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.removeItem(`${RESUME_KEY}:${lesson.id}`);
              } catch {
                /* yoksay */
              }
              setResumed(false);
              setTurns([]);
              setFeed([]);
              setCorrectCount(0);
              attempts.current = 0;
              setPhase("lecture");
              runStep(0);
            }}
            className="btn btn-ghost shrink-0 px-2 py-0.5 text-xs"
          >
            Baştan başla
          </button>
        </div>
      ) : null}

      <AnimatePresence mode="wait">
        {phase === "lecture" ? (
          <motion.section
            key="lecture"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="shrink-0 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">{lesson.title}</p>
                  <p className="muted truncate text-xs">{lesson.titleTr}</p>
                </div>
                {ttsAvailable || asrAvailable ? (
                  <button
                    type="button"
                    onClick={() => void toggleHandsFree()}
                    aria-pressed={handsFree}
                    className="btn btn-ghost flex shrink-0 items-center gap-1.5 px-2 py-1 text-xs"
                    style={{ color: handsFree ? "var(--color-brand-500)" : undefined }}
                  >
                    <MicIcon size={13} />
                    {handsFree ? "Eller serbest: açık" : "Eller serbest"}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {feed.map((item, i) => (
                <LectureBubble key={i} item={item} ttsAvailable={ttsAvailable} />
              ))}
              <div ref={bottom} />
            </div>

            {error ? (
              <p className="shrink-0 px-4 pb-2 text-xs" style={{ color: "var(--color-flame-500)" }}>
                {error}
              </p>
            ) : null}

            {/* Cevap alanı beklentiye göre şekil değiştiriyor: onayda tek
                düğme, doğru/yanlışta iki düğme, Almanca hedefte mikrofon.
                Düğmeler mikrofona alternatif — konuşmak her zaman mümkün. */}
            <div className="shrink-0 border-t p-4" style={{ borderColor: "var(--border)" }}>
              {awaiting && expect?.kind === "confirm" ? (
                <div className="flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      recognition.current?.abort();
                      runStep(stepIndex + 1);
                    }}
                    className="btn btn-primary w-full py-3 text-sm"
                  >
                    Hazırım, başlayalım
                  </button>
                  {asrAvailable ? (
                    <p className="muted text-center text-xs">…ya da sesli cevap ver.</p>
                  ) : null}
                </div>
              ) : null}

              {awaiting && expect?.kind === "truefalse" ? (
                <div className="mb-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      recognition.current?.abort();
                      evaluate(["doğru"]);
                    }}
                    className="option px-4 py-3 text-center text-sm font-semibold"
                  >
                    Doğru
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      recognition.current?.abort();
                      evaluate(["yanlış"]);
                    }}
                    className="option px-4 py-3 text-center text-sm font-semibold"
                  >
                    Yanlış
                  </button>
                </div>
              ) : null}

              {expect && expect.kind !== "confirm" && asrAvailable ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (listening) {
                        stopListening();
                        return;
                      }
                      // Dokunmak okumayı bekletmez: ses kesilir, dinleme başlar.
                      cancelSpeech.current?.();
                      stopSpeaking();
                      setAwaiting(true);
                      void capture(langFor(expect), (a) => evaluate(a), false);
                    }}
                    aria-label={listening ? "Kaydı bitir" : "Konuşmaya başla"}
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg"
                    style={{
                      background: listening ? "var(--color-rose-500)" : "var(--color-brand-500)",
                    }}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
                    >
                      <MicIcon size={24} />
                    </motion.span>
                  </motion.button>
                  <p
                    className="text-center text-xs"
                    style={{
                      color:
                        hint && !listening ? "var(--color-flame-500)" : "var(--text-muted)",
                    }}
                  >
                    {listening
                      ? expect.kind === "truefalse"
                        ? "Dinliyorum — 'doğru' ya da 'yanlış' de"
                        : "Dinliyorum — bitince dokun"
                      : (hint ?? "Konuşmak için dokun")}
                  </p>
                  <div className="flex items-center gap-2">
                    {expect.kind !== "truefalse" ? (
                      <button
                        type="button"
                        onClick={() => setTyping((v) => !v)}
                        className="btn btn-ghost px-3 py-1 text-xs"
                      >
                        {typing ? "Yazmayı kapat" : "Yazarak cevapla"}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      onClick={skipStep}
                      className="btn btn-ghost px-3 py-1 text-xs"
                    >
                      Bu adımı atla
                    </button>
                  </div>
                </div>
              ) : null}

              {expect && expect.kind !== "confirm" && !asrAvailable ? (
                <p className="muted mb-2 text-center text-xs">
                  Bu tarayıcı konuşma tanımayı desteklemiyor; yazarak devam et.
                </p>
              ) : null}

              {expect &&
              (expect.kind === "repeat" || expect.kind === "produce") &&
              (typing || !asrAvailable) ? (
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submitTyped();
                      }
                    }}
                    rows={1}
                    placeholder="Almanca yaz…"
                    className="input max-h-28 flex-1 resize-none py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={submitTyped}
                    disabled={!draft.trim()}
                    className="btn btn-primary h-10 shrink-0 px-4 text-sm disabled:opacity-50"
                  >
                    Gönder
                  </button>
                </div>
              ) : null}

              {!expect && stepIndex >= lesson.lecture.length - 1 && feed.length ? (
                <button
                  type="button"
                  onClick={startRoleplay}
                  className="btn btn-primary w-full py-3 text-sm"
                >
                  Konuşmaya geç
                </button>
              ) : null}
            </div>
          </motion.section>
        ) : null}

        {phase === "roleplay" ? (
          <motion.section
            key="roleplay"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card flex min-h-0 flex-1 flex-col overflow-hidden"
          >
            <div className="shrink-0 border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-bold">{lesson.roleplay.partner}</p>
              <p className="muted mt-0.5 text-xs leading-relaxed">{lesson.roleplay.scene}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="muted text-xs tabular-nums">
                  {userTurns} / {lesson.roleplay.minTurns} tur
                </span>
                {ttsAvailable || asrAvailable ? (
                  <button
                    type="button"
                    onClick={() => void toggleHandsFree()}
                    aria-pressed={handsFree}
                    className="btn btn-ghost flex items-center gap-1.5 px-2 py-1 text-xs"
                    style={{ color: handsFree ? "var(--color-brand-500)" : undefined }}
                  >
                    <MicIcon size={13} />
                    {handsFree ? "Eller serbest: açık" : "Eller serbest"}
                  </button>
                ) : null}
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {turns.map((turn, i) => (
                <Bubble
                  key={i}
                  turn={turn}
                  pending={busy && i === turns.length - 1}
                  ttsAvailable={ttsAvailable}
                />
              ))}
              <div ref={bottom} />
            </div>

            {error ? (
              <p className="shrink-0 px-4 pb-2 text-xs" style={{ color: "var(--color-flame-500)" }}>
                {error}
              </p>
            ) : null}

            {suggestions.length ? (
              <div className="flex shrink-0 flex-wrap gap-2 px-4 pb-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="chip px-3 py-1.5 text-xs"
                  >
                    {s}
                  </button>
                ))}
              </div>
            ) : null}

            <div className="shrink-0 border-t p-4" style={{ borderColor: "var(--border)" }}>
              {asrAvailable ? (
                <div className="flex flex-col items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      if (listening) {
                        stopListening();
                        return;
                      }
                      stopSpeaking();
                      void listenRoleplay();
                    }}
                    disabled={busy}
                    aria-label={listening ? "Kaydı bitir" : "Konuşmaya başla"}
                    className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-lg disabled:opacity-50"
                    style={{
                      background: listening ? "var(--color-rose-500)" : "var(--color-brand-500)",
                    }}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ repeat: listening ? Infinity : 0, duration: 1.1 }}
                    >
                      <MicIcon size={24} />
                    </motion.span>
                  </motion.button>
                  <p
                    className="text-center text-xs"
                    style={{
                      color:
                        hint && !listening && !busy
                          ? "var(--color-flame-500)"
                          : "var(--text-muted)",
                    }}
                  >
                    {micLabel}
                  </p>
                  <button
                    type="button"
                    onClick={() => setTyping((v) => !v)}
                    className="btn btn-ghost px-3 py-1 text-xs"
                  >
                    {typing ? "Yazmayı kapat" : "Yazarak cevapla"}
                  </button>
                </div>
              ) : (
                <p className="muted mb-2 text-center text-xs">
                  Bu tarayıcı konuşma tanımayı desteklemiyor; yazarak devam et.
                </p>
              )}

              {typing || !asrAvailable ? (
                <div className="mt-3 flex items-end gap-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(draft);
                      }
                    }}
                    rows={1}
                    placeholder="Almanca yaz…"
                    className="input max-h-28 flex-1 resize-none py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => void send(draft)}
                    disabled={busy || !draft.trim()}
                    className="btn btn-primary h-10 shrink-0 px-4 text-sm disabled:opacity-50"
                  >
                    Gönder
                  </button>
                </div>
              ) : null}
            </div>

            <div className="shrink-0 border-t p-3" style={{ borderColor: "var(--border)" }}>
              <button
                type="button"
                onClick={() => void finish()}
                className="btn btn-ghost w-full py-2.5 text-sm"
              >
                {roleplayDone ? "Dersi bitir" : "Şimdilik bırak"}
              </button>
            </div>
          </motion.section>
        ) : null}

        {phase === "summary" ? (
          <motion.section
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{
                  background: saved?.passed ? "var(--color-mint-500)" : "var(--color-flame-500)",
                }}
              >
                {saved?.passed ? <CheckIcon size={18} /> : <SparkIcon size={18} />}
              </span>
              <div>
                <h2 className="text-base font-bold">
                  {saved?.passed ? "Ders tamam" : "Ders yarım kaldı"}
                </h2>
                <p className="muted text-xs">
                  {lesson.title} · {lesson.titleTr}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="Alıştırma" value={`${correctCount} / ${scoredTotal}`} />
              <Stat
                label="Konuşma"
                value={`${userTurns} tur`}
                tone={roleplayDone ? "ok" : "warn"}
              />
            </dl>

            {/* Öğrenilen kelimeler özette bir kez daha: dersin dili kapanışta
                toplu görünmeli — Learna bunu yapmıyor, biz yapıyoruz. */}
            <div className="mt-4">
              <p className="muted text-xs font-semibold">Bu dersin kelimeleri</p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {lesson.vocab.map((v) => (
                  <span key={v.de} className="chip px-2 py-1 text-xs">
                    <b>{v.de}</b> · {v.tr}
                  </span>
                ))}
              </div>
            </div>

            {corrections.length ? (
              <div className="mt-4">
                <p className="muted text-xs font-semibold">Konuşmadaki düzeltmeler</p>
                <ul className="mt-1.5 space-y-1">
                  {corrections.map((c, i) => (
                    <li key={i} className="text-xs leading-relaxed">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ) : turns.length > 1 ? (
              <p className="mt-4 text-xs" style={{ color: "var(--color-mint-500)" }}>
                Konuşmada hiç düzeltme gerekmedi.
              </p>
            ) : null}

            {!roleplayDone ? (
              <p className="muted mt-4 text-xs leading-relaxed">
                Dersin sayılması için konuşmada en az {lesson.roleplay.minTurns} kez söz alman
                gerekiyor — kalıplar ancak kullanılınca oturuyor.
              </p>
            ) : saved ? (
              <p className="muted mt-4 text-xs leading-relaxed">
                Bu ders {saved.nextDays} gün sonra tekrar karşına çıkacak.
              </p>
            ) : null}

            <div className="mt-5 flex gap-2">
              {!roleplayDone ? (
                <button
                  type="button"
                  onClick={() => setPhase("roleplay")}
                  className="btn btn-primary flex-1 py-3 text-sm"
                >
                  Konuşmaya dön
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => router.push("/lessons")}
                className={`btn flex-1 py-3 text-sm ${roleplayDone ? "btn-primary" : "btn-ghost"}`}
              >
                Derslere dön
              </button>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Steps({ phase }: { phase: Phase }) {
  const steps: { id: Phase; label: string }[] = [
    { id: "lecture", label: "Anlatım" },
    { id: "roleplay", label: "Konuşma" },
    { id: "summary", label: "Özet" },
  ];
  const at = steps.findIndex((s) => s.id === phase);
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {steps.map((s, i) => (
        <div key={s.id} className="flex flex-1 flex-col gap-1">
          <span
            className="h-1 rounded-full"
            style={{ background: i <= at ? "var(--color-brand-500)" : "var(--border)" }}
          />
          <span
            className="text-[11px] font-semibold"
            style={{ color: i <= at ? "var(--color-brand-500)" : "var(--text-muted)" }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Anlatımın ince ilerleme çizgisi — kaç adımdan kaçındayız. */
function LectureProgress({ at, total }: { at: number; total: number }) {
  const pct = total ? Math.round(((at + 1) / total) * 100) : 0;
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full surface-2">
      <motion.div
        className="brand-gradient h-full rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 150, damping: 24 }}
      />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "ok" | "warn" }) {
  return (
    <div className="rounded-xl px-3 py-2.5" style={{ background: "var(--surface-2)" }}>
      <dt className="muted text-xs">{label}</dt>
      <dd
        className="mt-0.5 text-sm font-bold tabular-nums"
        style={{
          color:
            tone === "warn"
              ? "var(--color-flame-500)"
              : tone === "ok"
                ? "var(--color-mint-500)"
                : undefined,
        }}
      >
        {value}
      </dd>
    </div>
  );
}

/**
 * Anlatım baloncuğu.
 *
 * Almanca parçalar görsel olarak da ayrı: öğrenci hedefi cümlenin içinde
 * aramamalı. Hoparlör düğmesi baloncuğun tamamını yeniden okuyor — her parça
 * kendi diliyle.
 */
function LectureBubble({ item, ttsAvailable }: { item: FeedItem; ttsAvailable: boolean }) {
  if (item.role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white"
          style={{ background: "var(--color-brand-500)" }}
        >
          {item.text}
        </p>
      </div>
    );
  }
  const hint = item.tone === "hint";
  return (
    <div className="flex items-end gap-1.5">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm leading-relaxed"
        style={{
          background: hint
            ? "color-mix(in srgb, var(--color-flame-500) 10%, transparent)"
            : "var(--surface-2)",
        }}
      >
        {item.segments.map((seg, i) => (
          <span key={i}>
            {seg.lang === "de" ? (
              <span className="brand-text font-bold">{seg.text}</span>
            ) : (
              seg.text
            )}
            {i < item.segments.length - 1 ? " " : null}
          </span>
        ))}
      </div>
      {ttsAvailable ? (
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => speakSegments(item.segments)}
          aria-label="Yeniden dinle"
          className="btn btn-ghost h-7 w-7 shrink-0"
        >
          <SpeakerIcon size={13} />
        </motion.button>
      ) : null}
    </div>
  );
}

/** Konuşma baloncuğu — düzeltme satırı gövdeden ayrı gösteriliyor. */
function Bubble({
  turn,
  pending,
  ttsAvailable,
}: {
  turn: Turn;
  pending: boolean;
  ttsAvailable: boolean;
}) {
  if (turn.role === "user") {
    return (
      <div className="flex justify-end">
        <p
          className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white"
          style={{ background: "var(--color-brand-500)" }}
        >
          {turn.content}
        </p>
      </div>
    );
  }

  const { body, corrections } = parseReply(turn.content);
  return (
    <div className="flex flex-col items-start gap-1.5">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm"
        style={{ background: "var(--surface-2)" }}
      >
        {body.trim() || (pending ? "…" : "")}
        {ttsAvailable && body.trim() ? (
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => speakGerman(body)}
            aria-label="Yeniden dinle"
            className="btn btn-ghost ml-1 h-7 w-7 shrink-0 align-middle"
          >
            <SpeakerIcon size={13} />
          </motion.button>
        ) : null}
      </div>
      {corrections.map((c, i) => (
        <p
          key={i}
          className="flex max-w-[85%] items-start gap-1.5 rounded-xl px-3 py-1.5 text-xs"
          style={{
            background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <XIcon size={13} className="mt-0.5 shrink-0" />
          <span>{c}</span>
        </p>
      ))}
    </div>
  );
}

/** Tanıyıcı yoksa kullanıcıya sebebini söylemek gerekiyor. */
function AsrNote({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div
      className="flex items-start gap-2 rounded-xl px-3 py-2.5 text-xs"
      style={{
        background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
        color: "var(--color-flame-500)",
      }}
    >
      <AlertIcon size={14} className="mt-0.5 shrink-0" />
      <span>Bu tarayıcı konuşma tanımayı desteklemiyor; yazarak devam edebilirsin.</span>
    </div>
  );
}
