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
import { AlertIcon, MicIcon, SpeakerIcon, XIcon } from "@/components/icons";
import { Mascot } from "@/components/mascot";
import { parseReply } from "@/lib/chat-format";
import { Confetti } from "@/components/celebrate";
import { fx, reducedMotion } from "@/lib/fx";
import { cueListen, startThinking } from "@/lib/lessons/cues";
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

/**
 * Anlatım akışındaki bir baloncuk.
 *
 * `pending` baloncuğun "yazıyor" hâli: içerik hazır ama ses henüz
 * hazırlanıyor. Metin, ses başlamadan bir nefes önce açılıyor — indirme ve
 * çözme gecikmesi kullanıcıya boş bir bekleme olarak değil, karşı tarafın
 * yazması olarak görünüyor. `id` çizim anahtarı: dizin anahtarıyla liste
 * güncellemeleri giriş animasyonlarını şaşırtabiliyordu.
 */
type FeedItem =
  | { id: number; role: "assistant"; segments: Segment[]; tone?: "hint"; pending?: boolean }
  | { id: number; role: "user"; text: string };

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
 * Cümle İÇİNDEKİ duraklamaya tanınan pay.
 *
 * Tanıyıcı tek atışlık kipte ilk duraklamada kapanıyordu ve düşünerek konuşan
 * öğrenci cümlesini yetiştiremiyordu — dil öğrenen herkes düşünerek konuşur.
 * Artık dinleme sürekli: her tanınan parçadan sonra bu kadar süre daha
 * bekleniyor; öğrenci es verip devam edebiliyor. Süre dolunca birikenler tek
 * cevap olarak gönderiliyor. Mikrofona dokunmak beklemeden gönderir.
 */
const PAUSE_MS = 2600;

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

export function LessonPlayer({
  lesson,
  character,
}: {
  lesson: Lesson;
  /** Rol yapma muhatabının adı — sunucuda türetiliyor (lib/lessons/characters). */
  character: { name: string; note: string };
}) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("lecture");

  // ── Anlatım durumu ──
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const feedSeq = useRef(0);
  /** Şu an sesli okunan baloncuk — yanında canlı ses çubukları görünüyor. */
  const [speakingId, setSpeakingId] = useState<number | null>(null);
  /** Konuşma fazında okunan tur — aynı işaret orada da var. */
  const [speakingTurn, setSpeakingTurn] = useState<number | null>(null);
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
  /** Dinlerken o ana kadar tanınan metin — kullanıcı duyulduğunu görmeli. */
  const [partial, setPartial] = useState("");
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
  const scroller = useRef<HTMLDivElement>(null);
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
  /**
   * Yeni baloncukta liste en alta iner.
   *
   * `scrollIntoView` değil doğrudan `scrollTop`: kaydırma hedefi belli bir
   * öğe değil kabın dibi, ve scrollIntoView bunu en yakın kaydırılabilir
   * ataya bırakıyor — sayfa/kap yarışında ilk kullanıcı kaydırmasına kadar
   * hiçbir şey olmuyordu. Çizimden sonra (rAF) kabın dibine inmek koşulsuz
   * çalışıyor; akan cevapta her parça turns'ü yenilediği için liste yazarken
   * de dipte kalıyor.
   */
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
    return () => cancelAnimationFrame(id);
  }, [feed, turns, phase, awaiting, error, typing]);

  /**
   * Sesler önceden iniyor: geçerli adım ve sonraki iki adım, her biri
   * OYNATILACAĞI biçimde. Bu ayrım önbelleğin kendisi: doğru cevaptan sonra
   * sıradaki cümle övgüyle birleşik okunuyor ("Çok iyi! İkinci kelimemiz…"),
   * yani indirilecek metin övgülü olan. Övgü adım numarasından türediği için
   * (rastgele değil) bu metin belirli — ilk indiren herkes için ısıtıyor.
   * Övgüsüz varyant da iniyor: atlanan ya da üç denemede geçilen adım övgüsüz
   * okunuyor. Üretim ipuçları ve doğru/yanlış gerekçeleri de aynı pencerede.
   */
  useEffect(() => {
    for (let i = stepIndex; i < Math.min(stepIndex + 3, lesson.lecture.length); i++) {
      const s = lesson.lecture[i];
      prefetchSegments(s.say);
      const prev = lesson.lecture[i - 1]?.expect?.kind;
      if (prev === "repeat" || prev === "produce") {
        prefetchSegments([trSeg(PRAISE[(i - 1) % PRAISE.length]), ...s.say]);
      }
      const e = s.expect;
      if (e?.kind === "produce") prefetchSegments(e.hint);
      if (e?.kind === "truefalse") {
        prefetchSegments([trSeg(PRAISE[i % PRAISE.length]), ...e.why]);
        prefetchSegments([trSeg("Olmadı."), ...e.why]);
      }
    }
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
   * Dinleme SÜREKLİ kipte: tanıyıcı ilk duraklamada kapanmıyor. Her tanınan
   * parçadan sonra `PAUSE_MS` bekleniyor; öğrenci es verip cümlesine devam
   * edebiliyor. Süre dolunca (ya da mikrofona dokununca) o ana kadar birikmiş
   * parçalar TEK cevap olarak teslim ediliyor.
   *
   * Cevap tek parçadan oluştuysa tanıyıcının n-best adayları korunuyor:
   * değerlendirme (judgeSpeech) ilk adaydan doğruluk, alt adaylardan teşhis
   * çıkarıyor. Çok parçalı cevapta adaylar birleştirilemeyeceği için yalnızca
   * en iyi okuma gönderiliyor.
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
      rec.continuous = true;
      rec.maxAlternatives = 3;

      let collected: string[] = [];
      let firstAlternatives: string[] | null = null;
      let delivered = false;
      let pauseTimer: ReturnType<typeof setTimeout> | null = null;
      const clearPause = () => {
        if (pauseTimer) clearTimeout(pauseTimer);
        pauseTimer = null;
      };
      /**
       * Birikeni bir kez teslim eder. Hem `onend` hem `onerror` buradan
       * geçiyor: tarayıcı sürekli kipte bile kendi kararıyla kapanabiliyor
       * ve o ana kadar duyulanı düşürmek kullanıcının sözünü silmek olurdu.
       */
      const deliver = () => {
        if (delivered) return;
        delivered = true;
        clearSilence();
        clearPause();
        setPartial("");
        const joined = collected.join(" ").trim();
        if (!joined) return;
        setHint(null);
        onHeard(collected.length === 1 && firstAlternatives?.length ? firstAlternatives : [joined]);
      };

      rec.onresult = (e) => {
        collected = [];
        for (let i = 0; i < e.results.length; i++) {
          const t = e.results[i]?.[0]?.transcript?.trim();
          if (t) collected.push(t);
        }
        if (e.results.length === 1) {
          const r = e.results[0];
          firstAlternatives = [];
          for (let j = 0; j < (r?.length ?? 0); j++) {
            const t = r[j]?.transcript?.trim();
            if (t) firstAlternatives.push(t);
          }
        } else {
          firstAlternatives = null;
        }
        setPartial(collected.join(" "));
        // Konuşma başladı: genel sessizlik sayacı kalkıyor, duraklama payı kuruluyor.
        clearSilence();
        clearPause();
        pauseTimer = setTimeout(() => rec.stop(), PAUSE_MS);
      };
      rec.onerror = () => {
        setListening(false);
        deliver();
      };
      rec.onend = () => {
        setListening(false);
        deliver();
      };
      setListening(true);
      setHint(null);
      setPartial("");
      try {
        rec.start();
        // Mikrofonun açıldığı kulağa da söyleniyor: eller serbest akışta
        // kullanıcı ekrana bakmıyor ve işaretsiz açılan mikrofon ya boşluğa
        // konuşturuyor ya da sessiz bekletiyordu.
        cueListen();
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
        clearPause();
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
      setSpeakingId(null);
      const segments = [...(prefix ?? []), ...s.say];
      const id = ++feedSeq.current;
      // Baloncuk "yazıyor" olarak doğuyor; metin sesten bir nefes önce
      // açılıyor (speakSegments onStart). Öncekilerden askıda kalan varsa
      // (atlama, mikrofona dokunma) burada açığa çıkarılıyor — yazıyor
      // görünümünde donmuş baloncuk kalmamalı.
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, pending: ttsAvailable },
      ]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const reveal = () => {
        if (speechToken.current !== token) return;
        setFeed((f) => f.map((it) => (it.id === id ? { ...it, pending: false } : it)));
        setSpeakingId(id);
      };
      const after = () => {
        if (speechToken.current !== token) return;
        setSpeakingId(null);
        if (s.expect) {
          setAwaiting(true);
          if (handsFreeRef.current && asrAvailable) {
            void capture(langFor(s.expect), (alts) => evaluateRef.current(alts), true);
          }
        } else {
          runStepRef.current(index + 1);
        }
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after, reveal);
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
      setSpeakingId(null);
      const id = ++feedSeq.current;
      setFeed((f) => [
        ...f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
        { id, role: "assistant", segments, tone, pending: ttsAvailable },
      ]);
      const token = ++speechToken.current;
      cancelSpeech.current?.();
      const reveal = () => {
        if (speechToken.current !== token) return;
        setFeed((f) => f.map((it) => (it.id === id ? { ...it, pending: false } : it)));
        setSpeakingId(id);
      };
      const after = () => {
        if (speechToken.current !== token) return;
        setSpeakingId(null);
        then?.();
      };
      if (ttsAvailable) cancelSpeech.current = speakSegments(segments, after, reveal);
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
      setFeed((f) => [...f, { id: ++feedSeq.current, role: "user", text: said }]);
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
    if (ttsAvailable) {
      setSpeakingTurn(0);
      speakGerman(lesson.roleplay.opening, () => {
        if (speechToken.current !== token) return;
        setSpeakingTurn(null);
        if (!handsFreeRef.current) return;
        void listenRoleplay();
      });
    } else if (handsFreeRef.current) void listenRoleplay();
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
      // Bekleme sessiz geçmiyor: yumuşak tık "çalışıyorum" diyor. İlk parça
      // ekrana düştüğünde susuyor — akan metin zaten kendi işareti.
      const stopThinking = startThinking();

      // Alt sınıra ulaşan cevaba sunucu kapanış talimatı veriyor (bkz.
      // lib/lessons/roleplay); okuma bitince ders kendiliğinden özete geçiyor.
      const closing = next.filter((m) => m.role === "user").length >= lesson.roleplay.minTurns;

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
          if (!acc) stopThinking();
          acc += decoder.decode(value, { stream: true });
          setTurns([...next, { role: "assistant", content: acc }]);
        }
        const { body } = parseReply(acc);
        if (ttsAvailable && body.trim()) {
          const token = ++speechToken.current;
          setSpeakingTurn(next.length);
          speakGerman(body, () => {
            if (speechToken.current !== token) return;
            setSpeakingTurn(null);
            if (closing) {
              void finishRef.current();
              return;
            }
            if (!handsFreeRef.current) return;
            if (draftRef.current.trim()) return;
            void listenRoleplay();
          });
        } else if (closing) {
          // Ses yoksa kapanış cevabını okuyacak kadar bekle, sonra özete geç.
          setTimeout(() => void finishRef.current(), 2500);
        }
      } catch {
        setTurns(next);
        setError("İnternet bağlantısı kurulamadı.");
      } finally {
        stopThinking();
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

  /**
   * `finish` her çizimde tazelenen bir ref üzerinden çağrılıyor: kapanış
   * cevabının okuması bittiğinde çalışacak kapanış, o anki skorları görmeli —
   * `send`in eski kapanışı eski `correctCount`u kaydederdi.
   */
  const finishRef = useRef<() => void>(() => {});
  useEffect(() => {
    finishRef.current = () => void finish();
  });

  // ─────────────────────────── bitiş ───────────────────────────

  async function finish() {
    recognition.current?.abort();
    cancelSpeech.current?.();
    stopSpeaking();
    setSpeakingId(null);
    setSpeakingTurn(null);
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
      if (res.ok) {
        const data = (await res.json()) as {
          passed: boolean;
          nextDays: number;
          xpGained: number;
          currentStreak: number;
          totalXp: number;
        };
        setSaved(data);
        // Üst bardaki XP/seri rozetleri ve rozet kontrolü bu olayı dinliyor.
        // Ders bölümü bunu dispatch etmiyordu: puan kazanılıyor ama ekranda
        // hiçbir şey değişmiyordu.
        window.dispatchEvent(
          new CustomEvent("wortspiel:stats", {
            detail: { xp: data.totalXp, streak: data.currentStreak },
          }),
        );
      }
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
      ? partial
        ? `“${partial}”`
        : "Dinliyorum — es versen de beklerim"
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

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {feed.map((item) => (
                <LectureBubble
                  key={item.id}
                  item={item}
                  ttsAvailable={ttsAvailable}
                  speaking={speakingId === item.id}
                />
              ))}
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
                      // İzin en baştan, kullanıcı hareketiyle isteniyor: ilk
                      // eller serbest açılış izin istemine takılıp gecikmesin.
                      if (handsFree) void requestMicrophone();
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
                      setSpeakingId(null);
                      setFeed((f) =>
                        f.map((it) => ("pending" in it && it.pending ? { ...it, pending: false } : it)),
                      );
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
                      ? partial
                        ? `“${partial}”`
                        : expect.kind === "truefalse"
                          ? "Dinliyorum — 'doğru' ya da 'yanlış' de"
                          : "Dinliyorum — es versen de beklerim"
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
              <p className="text-sm font-bold">
                {character.name}
                <span className="muted ml-1.5 font-semibold">· {lesson.roleplay.partner}</span>
              </p>
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

            <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4">
              <AsrNote visible={!asrAvailable} />
              {turns.map((turn, i) => (
                <Bubble
                  key={i}
                  turn={turn}
                  pending={busy && i === turns.length - 1}
                  speaking={speakingTurn === i && turn.role === "assistant"}
                  ttsAvailable={ttsAvailable}
                />
              ))}
              {/* Hata akışın İÇİNDE: kullanıcı cevabını yazdı, gözü konuşmada.
                  Alt köşedeki küçük bir satır fark edilmiyor ve konuşma
                  "takıldı" gibi görünüyordu — cevabın gelmeme SEBEBİ, cevabın
                  geleceği yerde durmalı. */}
              {error ? (
                <div
                  className="flex max-w-[85%] items-start gap-1.5 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm"
                  style={{
                    background: "color-mix(in srgb, var(--color-flame-500) 12%, transparent)",
                    color: "var(--color-flame-500)",
                  }}
                >
                  <AlertIcon size={15} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}
            </div>

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
                      setSpeakingTurn(null);
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
            className="card relative p-5"
          >
            {/* Geçilen ders küçük bir kutlamayı hak ediyor — sonuç sunucudan
                dönünce patlıyor, kalan her durumda hiç çizilmiyor. */}
            <Confetti fire={saved?.passed ? 1 : 0} />
            {/* Ders kapanışında da Erdi: geçilen derste kutluyor, yarım kalanda
                düşünüyor. Kelime turu, etap kartı, oyun içindeki sonuç şeridi ve
                beceri egzersizi aynı karakterle kapanıyor — kapanış anını her
                bölümde başka bir simgeyle karşılamak, aynı uygulamada birkaç
                ayrı dil konuşmak olurdu. */}
            <div className="flex items-center gap-2">
              <Mascot mood={saved?.passed ? "cheer" : "think"} size={54} className="-my-2 shrink-0" />
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

/** Baloncukların ortak giriş animasyonu — hareket azaltma tercihine saygılı. */
function bubbleEntrance() {
  return reducedMotion()
    ? {}
    : {
        initial: { opacity: 0, y: 10, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { type: "spring" as const, stiffness: 360, damping: 26 },
      };
}

/**
 * "Yazıyor" animasyonu — ses hazırlanırken baloncuğu dolduran üç nokta.
 *
 * Amacı estetik değil algı: indirme/çözme gecikmesi boş bir bekleme olarak
 * değil, karşı tarafın yazması olarak görünüyor. Metin, ses başlamadan bir
 * nefes önce bu noktaların yerine geçiyor.
 */
function TypingDots() {
  const still = reducedMotion();
  return (
    <span className="flex items-center gap-1 px-0.5 py-1.5" aria-label="hazırlanıyor">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--text-muted)", opacity: 0.6 }}
          animate={still ? undefined : { y: [0, -3, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.14, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/** Okunmakta olan baloncuğun canlı ses çubukları — hoparlör simgesinin yerine. */
function SpeakingBars({ inline = false }: { inline?: boolean }) {
  const still = reducedMotion();
  return (
    <span
      className={`${inline ? "ml-1 inline-flex align-middle" : "flex"} h-7 w-7 shrink-0 items-center justify-center gap-0.5`}
      aria-label="okunuyor"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full"
          style={{ background: "var(--color-brand-500)", height: 11, originY: 0.5 }}
          animate={still ? undefined : { scaleY: [0.35, 1, 0.5, 0.85, 0.35] }}
          transition={{ repeat: Infinity, duration: 1, delay: i * 0.16, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

/**
 * Anlatım baloncuğu.
 *
 * Almanca parçalar görsel olarak da ayrı: öğrenci hedefi cümlenin içinde
 * aramamalı. Okunurken hoparlör düğmesinin yerinde canlı ses çubukları
 * duruyor; okuma bitince düğme geri geliyor ve baloncuğu yeniden okutuyor.
 */
function LectureBubble({
  item,
  ttsAvailable,
  speaking,
}: {
  item: FeedItem;
  ttsAvailable: boolean;
  speaking: boolean;
}) {
  if (item.role === "user") {
    return (
      <motion.div {...bubbleEntrance()} className="flex justify-end">
        <p
          className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white"
          style={{ background: "var(--color-brand-500)" }}
        >
          {item.text}
        </p>
      </motion.div>
    );
  }
  const hint = item.tone === "hint";
  return (
    <motion.div {...bubbleEntrance()} className="flex items-end gap-1.5">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm leading-relaxed"
        style={{
          background: hint
            ? "color-mix(in srgb, var(--color-flame-500) 10%, transparent)"
            : "var(--surface-2)",
        }}
      >
        {item.pending ? (
          <TypingDots />
        ) : (
          <motion.span
            className="inline"
            {...(reducedMotion()
              ? {}
              : {
                  initial: { opacity: 0, y: 4 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.22, ease: "easeOut" as const },
                })}
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
          </motion.span>
        )}
      </div>
      {item.pending ? null : speaking ? (
        <SpeakingBars />
      ) : ttsAvailable ? (
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
    </motion.div>
  );
}

/** Konuşma baloncuğu — düzeltme satırı gövdeden ayrı gösteriliyor. */
function Bubble({
  turn,
  pending,
  speaking,
  ttsAvailable,
}: {
  turn: Turn;
  pending: boolean;
  speaking: boolean;
  ttsAvailable: boolean;
}) {
  if (turn.role === "user") {
    return (
      <motion.div {...bubbleEntrance()} className="flex justify-end">
        <p
          className="max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm text-white"
          style={{ background: "var(--color-brand-500)" }}
        >
          {turn.content}
        </p>
      </motion.div>
    );
  }

  const { body, corrections } = parseReply(turn.content);
  return (
    <motion.div {...bubbleEntrance()} className="flex flex-col items-start gap-1.5">
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm"
        style={{ background: "var(--surface-2)" }}
      >
        {body.trim() ? body : pending ? <TypingDots /> : ""}
        {ttsAvailable && body.trim() ? (
          speaking ? (
            <SpeakingBars inline />
          ) : (
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => speakGerman(body)}
              aria-label="Yeniden dinle"
              className="btn btn-ghost ml-1 h-7 w-7 shrink-0 align-middle"
            >
              <SpeakerIcon size={13} />
            </motion.button>
          )
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
    </motion.div>
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
