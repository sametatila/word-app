"use client";

import { apiFetch } from "@/lib/api-fetch";
import { BOSS_SECONDS } from "@/lib/lessons/boss-const";
import { PASS_SECTION, PASS_TOTAL } from "@/lib/exam-types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, DetailRow, CoverBody, StateBody, type CoverRule } from "@/components/flow";
import { AnimatePresence, motion } from "framer-motion";
import { GameSwitch } from "@/components/game-switch";
import { NoHints } from "@/components/games/no-hints";
import { FitBox } from "@/components/fit-box";
import { speakGerman, stopSpeaking } from "@/components/speak-button";
import { SpeakerIcon, MicIcon, CheckIcon, ExamIcon, ClockIcon, LockIcon, TargetIcon, PenIcon, AlertIcon } from "@/components/icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { RoundExit } from "@/components/round-exit";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { TokenDiff } from "@/components/feedback/diff-text";
import { askAssess, fallbackAssessment, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import type { GameResult } from "@/components/games/types";
import type { ExamPaper, ExamResult, ExamSectionId, ProduceExamItem, TextItem } from "@/lib/exam-types";
import { SECTION_ORDER, SECTION_TITLE_KEYS, SECTION_TITLE_TARGET, SECTION_WORD_TARGET } from "@/lib/exam-types";
import { useLang, useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { targetLangOf } from "@/lib/courses";
import { matchSentence } from "@/lib/sentence-match";
import type { Round } from "@/lib/types";
import type { CefrLevel } from "@/lib/skills/types";
import { CoachLine } from "@/components/coach-line";
import { PronounceCard } from "@/components/feedback/pronounce-card";
import { askPronounce, captureClip, type Capture } from "@/lib/pronounce-client";
import type { PronounceScore } from "@/lib/pronounce";
import { localDay } from "@/lib/day";
import { MIN_ASSESS_WORDS, MIN_FREE_WORDS } from "@/lib/assess-const";
import { formatPercent } from "@/lib/i18n/dict";

/**
 * Sınav oynatıcısı (WP-41 v3).
 *
 * Üç şey bir sınavı sınav yapıyor ve üçü de burada: **kapak** (ne ölçülüyor,
 * kaç bölüm, kaç dakika, geçme kuralı), **bölüm arası** (Teil 3 · Satzbau —
 * kaç madde, ne isteniyor) ve **döküm** (hangi maddeyi kaçırdın, doğrusu
 * neydi). Ortadaki akışta geri dönüş, ipucu ve anında geri bildirim YOK:
 * cevabın doğru olup olmadığını sınav bitmeden öğrenmiyorsun. Alıştırma
 * turlarından ayrıldığı yer tam olarak burası.
 *
 * Süre dolunca kalan bölümler 0 sayılır ve kâğıt gönderilir — "süre bitti,
 * hiçbir şey kaydedilmedi" yaşanmasın.
 */

type Phase = "cover" | "loading" | "intro" | "run" | "finishing" | "result" | "error";

/**
 * Konuşma maddesinde en uzun kayıt.
 *
 * Mobil aynı maddede 8 saniye dinliyordu (`ExamScreen`, `listenOnce`): aynı
 * sınav, aynı soru, farklı süre — ve konuşma cevabı kesilen kullanıcı puan
 * kaybediyordu. İki taraf da artık 12 saniye ve sayı AYNI ADLA yazılı, o
 * yüzden "ortak sayısal sabitler" kapısı ayrışmayı kendiliğinden yakalıyor
 * (alt çizgili `12_000` o taramaya girmiyordu, bu yüzden düz yazılı).
 */
const SPEAK_MAX_MS = 12000;

/**
 * KÖR MOD (airtight, F7): sunucudan nesnel cevapları GİZLENMİŞ kâğıt istiyoruz.
 * İstemci cevapları görmüyor → değiştirilmiş bir istemci "cevabı oku + doğru
 * gönder" yapamaz; puanı sunucu ham seçimlerden veriyor. Nesnel döküm sınav
 * BİTİNCE sunucunun döndürdüğü `review`'dan kuruluyor (aşağıda).
 */
const BLIND = true;

/** Nesnel döküm anahtarı — finish yanıtından gelir (cevaplar sınav bitince açılır). */
type Review = {
  grammar: ({ kind: "cell"; answer: number } | { kind: "judge"; answer: boolean })[];
  reading: number[][];
  listening: number[][];
  produce: string[];
};

/** Bölümün öğrenciye ne yaptıracağı — bölüm arası kartında okunur. */
const SECTION_BRIEF_KEYS: Record<ExamSectionId, string> = {
  vocab: "exam.brief_vocab",
  grammar: "exam.brief_grammar",
  produce: "exam.brief_produce",
  reading: "exam.brief_reading",
  listening: "exam.brief_listening",
  speaking: "exam.brief_speaking",
  writing: "exam.brief_writing",
};

type Miss = {
  section: ExamSectionId;
  /** Soru — Türkçe ya da Almanca, maddeye göre. */
  prompt: string;
  /** Doğru cevap. */
  answer: string;
  /** Öğrencinin verdiği cevap (varsa). */
  given?: string;
  /** Gerekçe — hüküm maddelerinde dersin kendi açıklaması. */
  why?: string;
};

function sectionCount(p: ExamPaper, id: ExamSectionId): number {
  const s = p.sections;
  if (id === "vocab") return s.vocab.length;
  if (id === "grammar") return s.grammar.length;
  if (id === "produce") return s.produce.length;
  if (id === "reading") return s.reading.reduce((a, t) => a + t.questions.length, 0);
  if (id === "listening") return s.listening.reduce((a, t) => a + t.questions.length, 0);
  if (id === "speaking") return s.speaking.length;
  return s.writing.length;
}

function present(p: ExamPaper): ExamSectionId[] {
  return SECTION_ORDER.filter((id) => sectionCount(p, id) > 0);
}

const empty = () => ({ correct: 0, total: 0 });

export function ExamPlayer({ level, module }: { level: CefrLevel; module: number | null }) {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("cover");
  const [paper, setPaper] = useState<ExamPaper | null>(null);
  const [section, setSection] = useState<ExamSectionId>("vocab");
  const [left, setLeft] = useState(0);
  /** Sınavdan çıkış onayı açık mı. */
  const [quit, setQuit] = useState(false);
  const [idx, setIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  /* Ayrilmanin oteki yollari da ayni onaya bagli (yenileme, sekme, kenar
     cubugu bagalantilari). Android'de kosul `phase === "bolum" ||
     phase === "bolumGiris"`; burada karsiliklari. */
  const ayril = useLeaveGuard(phase === "run" || phase === "intro");
  const [picked, setPicked] = useState<number | null>(null);
  // Cümle kurma bölümü
  const [typed, setTyped] = useState("");
  const [chunks, setChunks] = useState<number[]>([]);
  // Yazma bölümü
  const [writingText, setWritingText] = useState("");
  const [writingResult, setWritingResult] = useState<Assessment | FallbackAssessment | null>(null);
  /* Yedek puanın SEBEBİ kartta yazıyor (mobil `ExamScreen` yazma adımı da
     söylüyor). Sebepsiz kart her yedeğe "servis kapalı" diyordu; yapay zekâya
     izin vermeyen kullanıcı için bu yanlış teşhis. */
  const [writingFailure, setWritingFailure] = useState<AssessFailure | null>(null);
  // Konuşma bölümü (WP-20 + WP-41)
  const [spk, setSpk] = useState<"idle" | "rec" | "scoring" | "done" | "failed">("idle");
  const [spkResult, setSpkResult] = useState<PronounceScore | null>(null);
  const [spkTries, setSpkTries] = useState(0);
  /* Söyleyiş maddesi izin verilmediği için puanlanmadı: klip gönderilmedi.
     "Ses alınamadı, bir daha dene" demek yanlış teşhis olurdu — yeniden
     denemek aynı cevabı alır. Madde yine 0 sayılıyor ve sınav sürüyor. */
  const [spkConsent, setSpkConsent] = useState(false);
  const [showMisses, setShowMisses] = useState(false);
  const capture = useRef<Capture | null>(null);
  const speakingScores = useRef<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ExamResult | null>(null);
  /** Gönderilemeyen sonucun yerel özeti — hata ekranında gösteriliyor. */
  const [offline, setOffline] = useState<{ pct: number; sections: { id: ExamSectionId; pct: number }[] } | null>(null);
  const score = useRef<Record<ExamSectionId, { correct: number; total: number }>>({
    vocab: empty(), grammar: empty(), produce: empty(), reading: empty(), listening: empty(), speaking: empty(), writing: empty(),
  });
  const vocabAnswers = useRef<Record<string, unknown>[]>([]);
  // F7: nesnel bölümlerin HAM seçimleri — finish'te keyToken ile birlikte
  // gönderilir, sunucu bunlarla puanlar (istemci sayısına güvenilmez).
  const keyToken = useRef<string | null>(null);
  const responses = useRef<{ grammar: number[]; reading: number[][]; listening: number[][]; produce: string[] }>({
    grammar: [], reading: [], listening: [], produce: [],
  });
  // F7 kalıntısı: yazma/konuşma için sunucunun imzaladığı skor jetonları —
  // finish'te relay edilir, sunucu istemci skoru yerine imzalı skoru kullanır.
  const writingScoreToken = useRef<string | null>(null);
  const speakingScoreTokens = useRef<(string | null)[]>([]);
  const writingScore = useRef<number | null>(null);
  const misses = useRef<Miss[]>([]);
  const startedAt = useRef(Date.now());
  const finished = useRef(false);

  useEffect(() => () => stopSpeaking(), []);

  async function start() {
    setPhase("loading");
    try {
      const res = await apiFetch("/api/exam", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "start", level, module, day: localDay(), blind: BLIND }) });
      if (!res.ok) throw new Error(String(res.status));
      const { paper: p, keyToken: kt } = (await res.json()) as { paper: ExamPaper; keyToken?: string };
      keyToken.current = kt ?? null;
      responses.current = { grammar: [], reading: [], listening: [], produce: [] };
      writingScoreToken.current = null;
      speakingScoreTokens.current = [];
      setPaper(p);
      setLeft(p.seconds);
      startedAt.current = Date.now();
      for (const id of SECTION_ORDER) score.current[id] = { correct: 0, total: sectionCount(p, id) };
      const first = present(p)[0];
      if (!first) return void finishNow();
      openSection(first);
    } catch {
      setPhase("error");
    }
  }

  function openSection(id: ExamSectionId) {
    stopSpeaking();
    setSection(id);
    setIdx(0);
    setQIdx(0);
    setPicked(null);
    setTyped("");
    setChunks([]);
    setPhase("intro");
  }

  function nextSection() {
    const list = present(paper!);
    const at = list.indexOf(section);
    if (at + 1 < list.length) openSection(list[at + 1]);
    else void finishNow();
  }

  // Zamanlayıcı
  useEffect(() => {
    if (!paper || phase === "cover" || phase === "loading" || phase === "result" || phase === "finishing" || phase === "error") return;
    const t = setInterval(() => {
      const remain = paper.seconds - Math.floor((Date.now() - startedAt.current) / 1000);
      setLeft(Math.max(0, remain));
      if (remain <= 0) {
        clearInterval(t);
        void finishNow();
      }
    }, 1000);
    return () => clearInterval(t);
  }, [paper, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  async function finishNow() {
    if (finished.current || !paper) return;
    finished.current = true;
    stopSpeaking();
    setPhase("finishing");
    const sections = SECTION_ORDER.map((id) => ({ id, ...score.current[id] })).filter((s) => s.total > 0);
    try {
      const res = await apiFetch("/api/exam", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          action: "finish",
          level,
          module,
          trial: paper.trial,
          sections,
          keyToken: keyToken.current,
          responses: responses.current,
          writingScoreToken: writingScoreToken.current,
          speakingScoreTokens: speakingScoreTokens.current.filter((x) => x),
          vocabAnswers: vocabAnswers.current,
          writingScore: writingScore.current,
          speakingScore: speakingScores.current.length ? Math.round(speakingScores.current.reduce((a, b) => a + b, 0) / speakingScores.current.length) : null,
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
          day: localDay(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as ExamResult & { review?: Review };
      // Kör modda nesnel döküm sunucunun döndürdüğü doğru cevaplardan kurulur
      // (sınav bitti; cevapların açılması artık sömürüye yaramaz).
      if (BLIND && data.review) buildObjectiveMisses(data.review);
      setResult(data);
      setPhase("result");
    } catch {
      /* SONUÇ GÖNDERİLEMEDİ AMA SINAV YAPILDI. Eskiden burada yalnız bir hata
         kartı çiziliyordu ve yirmi dakikalık emek ekrandan silinip gidiyordu.
         Puan zaten istemcide hesaplanmış durumda; Android de tam bunu yapıyor:
         yüzdeyi gösterip "sonuç gönderilemedi" diyor. Geçti/kaldı YAZILMIYOR,
         o kararı sunucu veriyor. */
      // Kör modda nesnel bölümleri istemci puanlayamaz (cevap yok); onları
      // çevrimdışı özetten çıkar ki yanıltıcı düşük yüzde görünmesin.
      const OBJECTIVE = new Set<ExamSectionId>(["grammar", "reading", "listening", "produce"]);
      const shown = BLIND ? sections.filter((x) => !OBJECTIVE.has(x.id)) : sections;
      const total = shown.reduce((a, x) => a + x.total, 0);
      const correct = shown.reduce((a, x) => a + x.correct, 0);
      setOffline({
        pct: total ? Math.round((correct / total) * 100) : 0,
        sections: shown.map((x) => ({ id: x.id, pct: x.total ? Math.round((x.correct / x.total) * 100) : 0 })),
      });
      setPhase("error");
    }
  }

  /* ---------------------------------------------------------------- bölümler */

  function onVocabDone(round: Round, results: GameResult[]) {
    for (const r of results) {
      if (r.correct) score.current.vocab.correct++;
      else misses.current.push({ section: "vocab", prompt: wordPrompt(round, t), answer: wordAnswer(round) });
      vocabAnswers.current.push({ ...r, game: round.game });
    }
    if (idx + 1 < paper!.sections.vocab.length) setIdx(idx + 1);
    else nextSection();
  }

  function pickGrammar(chosen: number) {
    const g = paper!.sections.grammar[idx];
    responses.current.grammar[idx] = chosen;
    const correct = g.kind === "cell" ? chosen === g.answer : chosen === (g.answer ? 0 : 1);
    if (correct) score.current.grammar.correct++;
    // Kör modda nesnel döküm finish'te review'dan kurulur (kâğıtta cevap yok).
    else if (!BLIND && g.kind === "cell")
      misses.current.push({ section: "grammar", prompt: `${g.key} · ${g.label}`, answer: g.options[g.answer], given: g.options[chosen] });
    else if (!BLIND && g.kind === "judge")
      misses.current.push({
        section: "grammar",
        prompt: g.statement,
        answer: t(g.answer ? "common.correct" : "common.wrong"),
        given: t(chosen === 0 ? "common.correct" : "common.wrong"),
        why: g.why.map((s) => s.text).join(" "),
      });
    setPicked(null);
    if (idx + 1 < paper!.sections.grammar.length) setIdx(idx + 1);
    else nextSection();
  }

  function submitProduce() {
    const item = paper!.sections.produce[idx];
    const answer = item.mode === "order" ? chunks.map((i) => item.chunks![i]).join(" ") : typed.trim();
    if (!answer) return;
    responses.current.produce[idx] = answer;
    const m = matchSentence(answer, item.de, item.accept, targetLangOf(course));
    // Sınavda sıra hatası doğru sayılmaz: ölçülen şey tam olarak sıra.
    const correct = m.verdict === "exact" || m.verdict === "spelling";
    if (correct) score.current.produce.correct++;
    else if (!BLIND) misses.current.push({ section: "produce", prompt: item.prompt, answer: item.de, given: answer });
    setTyped("");
    setChunks([]);
    if (idx + 1 < paper!.sections.produce.length) setIdx(idx + 1);
    else nextSection();
  }

  function pickText(kind: "reading" | "listening", chosen: number) {
    const list = kind === "reading" ? paper!.sections.reading : paper!.sections.listening;
    const item = list[idx];
    const q = item.questions[qIdx];
    (responses.current[kind][idx] ??= [])[qIdx] = chosen;
    if (chosen === q.answer) score.current[kind].correct++;
    else if (!BLIND) misses.current.push({ section: kind, prompt: q.textTr ?? q.text, answer: q.options[q.answer], given: q.options[chosen] });
    setPicked(null);
    if (qIdx + 1 < item.questions.length) setQIdx(qIdx + 1);
    else if (idx + 1 < list.length) {
      setIdx(idx + 1);
      setQIdx(0);
    } else nextSection();
  }

  /**
   * Kör modda nesnel dökümü sunucunun döndürdüğü `review` (doğru cevaplar) +
   * kaydedilmiş ham seçimlerden kurar. Kâğıt render için sağlam (yalnız cevaplar
   * sıyrılmıştı), o yüzden soru metni/şıklar buradan okunuyor.
   */
  function buildObjectiveMisses(review: Review) {
    const p = paper;
    if (!p) return;
    p.sections.grammar.forEach((g, i) => {
      const key = review.grammar[i];
      if (!key) return;
      const chosen = responses.current.grammar[i];
      if (g.kind === "cell" && key.kind === "cell") {
        if (chosen === key.answer) return;
        misses.current.push({ section: "grammar", prompt: `${g.key} · ${g.label}`, answer: g.options[key.answer], given: typeof chosen === "number" ? g.options[chosen] : "—" });
      } else if (g.kind === "judge" && key.kind === "judge") {
        if (chosen === (key.answer ? 0 : 1)) return;
        misses.current.push({ section: "grammar", prompt: g.statement, answer: t(key.answer ? "common.correct" : "common.wrong"), given: t(chosen === 0 ? "common.correct" : "common.wrong"), why: g.why.map((s) => s.text).join(" ") });
      }
    });
    (["reading", "listening"] as const).forEach((kind) => {
      p.sections[kind].forEach((item, ti) => {
        item.questions.forEach((q, qi) => {
          const correct = review[kind][ti]?.[qi];
          if (correct === undefined) return;
          const chosen = responses.current[kind][ti]?.[qi];
          if (chosen === correct) return;
          misses.current.push({ section: kind, prompt: q.textTr ?? q.text, answer: q.options[correct], given: typeof chosen === "number" ? q.options[chosen] : "—" });
        });
      });
    });
    p.sections.produce.forEach((item, i) => {
      const de = review.produce[i];
      if (!de) return;
      const given = responses.current.produce[i] ?? "";
      const m = matchSentence(given, de, [], targetLangOf(course));
      if (m.verdict === "exact" || m.verdict === "spelling") return;
      misses.current.push({ section: "produce", prompt: item.prompt, answer: de, given });
    });
  }

  async function evaluateWriting() {
    const item = paper!.sections.writing[0];
    const text = writingText.trim();
    if (!text || busy) return;
    setBusy(true);
    const req: AssessRequest = {
      kind: "writing",
      level: level as AssessLevel,
      // exerciseId: imzalı skor jetonu bu sınav maddesine bağlansın (F7).
      exerciseId: item.id,
      task: { prompt: item.task.prompt, constraints: [...item.task.checklist, `en az ${item.task.minWords} kelime`] },
      answer: { text },
      // Hedef dil: verilmezse uç Almancaya düşüyor (bkz. `api/assess`).
      lang: targetLangOf(course),
    };
    const ai = await askAssess(req, { examToken: keyToken.current ?? undefined });
    const out = ai.ok ? ai.result : fallbackAssessment(req, t);
    setWritingResult(out);
    setWritingFailure(ai.ok ? null : ai.reason);
    writingScoreToken.current = ai.ok ? (ai.scoreToken ?? null) : null;
    writingScore.current = out.score.overall;
    score.current.writing.correct = (writingScore.current ?? 0) >= 60 ? 1 : 0;
    setBusy(false);
  }

  /* ------------------------------------------------------------------ ekranlar */

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");
  const cover = paper?.cover ?? null;
  const title =
    module === null
      ? t("exam.level_exam", { level })
      : cover
        ? `${cover.code} · ${cover.titleTr}`
        : t("exam.module_exam", { level, n: module + 1 });

  if (phase === "cover") return <Cover level={level} module={module} onStart={() => void start()} />;

  /* BEKLEME KENDINI DUYURUYOR. Bu dal ekranin TAMAMINI kaplayip "hazirlaniyor"
     yaziyor ama canli bolge degildi: ekran okuyucu kullanan biri dugmeye
     basip hicbir sey duymuyor, ekranin dondugunu mu yoksa hazirlandigini mi
     bilemiyordu. `aria-busy` tek basina yetmez - o "bu bolge guncelleniyor"
     der, MONTE EDILDIGINDE hicbir sey okutmaz; okutan `role="status"`.
     Android karsiligi `accessibilityLiveRegion="polite"`. */
  if (phase === "loading" || phase === "finishing") {
    return (
      <section role="status" aria-busy="true" className="card mx-auto w-full max-w-md p-4">
        <p className="muted text-body">{t(phase === "loading" ? "exam.preparing" : "item.mono_scoring")}</p>
        <div className="mt-3 h-10 animate-pulse rounded-tile surface-2" />
      </section>
    );
  }

  if (phase === "error") {
    /* Kâğıt ALINAMADIYSA durum şablonu; cevaplar çevrimdışı toplandıysa
       aşağıdaki sonuç bandı. */
    if (!offline) {
      return (
        /* DURUM ŞABLONU. Hata DUYURULUYOR (`alert`): ekrani kaplayan bir hata
           metni canli bolge degilse ekran okuyucu kullanan biri hicbir sey
           duymuyor. YERINDE TEKRAR DENEME - kagit ALINAMADIGINDA haftanin kagidi
           gecici bir ag kesintisiyle harcanabiliyordu (Android `setAttempt`). */
        <FlowColumn>
          <StateBody alert title={t("exam.load_or_save_failed")} />
          <FlowActions primary={{ label: t("common.try_again"), onClick: () => void start() }} tertiary={{ label: t("exam.back_to_path"), href: "/immersion" }} />
        </FlowColumn>
      );
    }
    /* SONUÇ GÖNDERİLEMEDİ AMA SINAV YAPILDI: sonuç şablonu, sessiz band.
       Geçti/kaldı yazılmıyor (o kararı sunucu veriyor); maskot düşünüyor,
       üzgün değil — kötü bir şey olmadı, kayıt bekliyor. Android aynı
       durumu aynı bandla çiziyor (`ExamScreen` `offline`). */
    return (
      <FlowColumn>
        <ResultHero eyebrow={title} title={t("exam.saved_offline")} figure={formatPercent(offline.pct, lang)} quiet />
        {/* Kırılım SONUÇ KARTIYLA AYNI çiziliyor (yüzde + şerit): aynı veri
            iki durumda iki ayrı biçimde okunuyordu, oysa tek fark kaydın
            gitmemiş olması. Ağırlık yok - onu sunucu veriyor. */}
        <DetailCard title={t("exam.sections")}>
          <ul className="space-y-2">
            {offline.sections.map((x) => (
              <li key={x.id}>
                <div className="flex items-center justify-between text-body">
                  <span>
                    <span lang={course} className="font-semibold">{SECTION_TITLE_TARGET[targetLangOf(course)][x.id]}</span>
                    <span className="muted"> · {t(SECTION_TITLE_KEYS[x.id])}</span>
                  </span>
                  <span className="tabular-nums" style={{ color: x.pct >= 50 ? "var(--color-success)" : "var(--color-danger)" }}>
                    {formatPercent(x.pct, lang)}
                  </span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
                  <div className="h-full rounded-full" style={{ width: `${x.pct}%`, background: x.pct >= 50 ? "var(--color-brand)" : "var(--color-danger)" }} />
                </div>
              </li>
            ))}
          </ul>
        </DetailCard>
        {/* Cevaplar çevrimdışı kaydedildiyse tekrar denemek kâğıdı baştan
            açıyor ve o kaydı çöpe atardı; burada tek doğru çıkış Patika. */}
        <FlowActions primary={{ label: t("exam.back_to_path"), href: "/immersion" }} />
      </FlowColumn>
    );
  }

  if (phase === "result" && result) {
    return (
      <Result
        result={result}
        level={level}
        moduleIndex={module}
        title={title}
        cando={cover?.canDo ?? []}
        focus={cover?.focus ?? []}
        misses={misses.current}
        showMisses={showMisses}
        onToggleMisses={() => setShowMisses((v) => !v)}
        writingSample={paper?.sections.writing[0]?.task.sample ?? null}
      />
    );
  }

  const list = present(paper!);
  const teil = list.indexOf(section) + 1;

  if (phase === "intro") {
    /* ETAP ŞABLONU: sonuç bandının küçük hâli, dibinde bölüm şeridi. Band
       CANLI BÖLGE DEĞİL: kalan süre her saniye değişiyor ve `role="status"`
       ekran okuyucuya her saniyeyi okuturdu. */
    return (
      <FlowColumn>
        <ResultHero
          live={false}
          /* Kâğıdın kendi dili: "Teil" Almanca kursta, "Part" İngilizcede.
             `lang` büyük harf dönüşümünü de doğru yapıyor: Türkçe yerelde
             `uppercase` "Teil"i "TEİL" yapıyordu. */
          eyebrow={<span lang={course}>{SECTION_WORD_TARGET[targetLangOf(course)]} {teil} / {list.length}</span>}
          title={<span lang={course}>{SECTION_TITLE_TARGET[targetLangOf(course)][section]}</span>}
          sub={t("exam.items_and_time", { n: sectionCount(paper!, section), time: `${mm}:${ss}` })}
          segments={{ done: teil, total: list.length }}
        />
        <DetailCard title={t(SECTION_TITLE_KEYS[section])}>
          <p className="muted text-body leading-relaxed">{t(SECTION_BRIEF_KEYS[section])}</p>
        </DetailCard>
        <FlowActions primary={{ label: t("exam.start_section"), onClick: () => setPhase("run") }} />
      </FlowColumn>
    );
  }

  const doneItems = section === "reading" || section === "listening" ? qIdx : idx;
  const header = (
    <div className="mb-3">
      {/* ÇIKIŞ YOLU YOKTU: sınav başlayınca kullanıcı bitirene kadar kapana
          kısılıyordu, tek çıkış tarayıcının geri düğmesiydi -- deneme
          sınavında kapatılan aynı kapan (bkz. `mock-exam-player`). Android'de
          başlıkta kapat düğmesi var ve "cevapların kaydedilmiyor" diye
          soruyor; metin sözlükte duruyordu, web'de onu kullanan yoktu.
          Burada uyarı DOĞRU: deneme sınavının tersine bu sınav ara kayıt
          tutmuyor, çıkan baştan başlar. */}
      <ConfirmDialog
        open={quit || ayril.pending !== null}
        title={t("exam.quit_title")}
        message={t("exam.quit_body")}
        confirmLabel={t("common.exit")}
        destructive
        onConfirm={() => { setQuit(false); if (ayril.pending) ayril.leave(); else router.push("/immersion"); }}
        onCancel={() => { setQuit(false); ayril.stay(); }}
      />
      <div className="flex items-center justify-between gap-3 text-caption">
        <span>
          {SECTION_WORD_TARGET[targetLangOf(course)]} {teil}/{list.length} · <span lang={course}>{SECTION_TITLE_TARGET[targetLangOf(course)][section]}</span>
        </span>
        <span className="tabular-nums" style={{ color: left < 120 ? "var(--color-rose)" : undefined }}>
          {mm}:{ss}
        </span>
        {/* ÖLÇÜ ANDROID'DEN. Karo 32 px, simge 16 idi; Android'in yedi
            kapatma karosu da 44 px ve simgesi 22 (`ExamScreen`). Dokunma
            hedefi `hit-8` ile ölçüde geçiyordu ama GÖRÜNEN düğme küçüktü ve
            aynı uygulamada üç farklı kapatma karosu vardı (32 / 36 / 44).
            Ortak bileşen Android'in ölçüsünü taşıyor. */}
        <RoundExit onExit={() => setQuit(true)} labelKey="exam.quit_title" />
      </div>
      <div className="mt-1.5 h-1 overflow-hidden rounded-full surface-2">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${Math.round((100 * doneItems) / Math.max(1, sectionCount(paper!, section)))}%`, background: "var(--color-brand)" }}
        />
      </div>
    </div>
  );

  const options = (opts: string[], onPick: (i: number) => void, soru?: string) => (
    /* TEK SEÇİMLİK ŞIK LİSTESİ RADYO GRUBUDUR. `aria-pressed` bir aç/kapa
       düğmesi anlatıyor; Android aynı şıkları `accessibilityRole="radio"` ile
       veriyor (`ExamScreen`) ve TalkBack "radyo düğmesi, 4 ögeden 2., seçili"
       diyor. */
    <div role="radiogroup" aria-label={soru} className="grid gap-2">
      {opts.map((o, i) => (
        <button
          key={`${o}-${i}`}
          type="button"
          /* Seçili durum RENKTEN başka bir şeyle de söyleniyor: ekran okuyucu
         kullanan kişi hangi seçeneğin işaretli olduğunu yalnız zeminden
         anlayamaz (bkz. parity §154). */
          role="radio"
          aria-checked={picked === i}
          disabled={picked !== null}
          onClick={() => {
            setPicked(i);
            setTimeout(() => onPick(i), 140);
          }}
          className={`option px-3.5 py-3 text-left text-strong ${picked === i ? "option-correct" : ""}`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  if (section === "vocab") {
    const round = paper!.sections.vocab[idx];
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
        {header}
        <AnimatePresence mode="wait">
          <motion.div key={round.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }} className="flex min-h-0 flex-1 flex-col">
            <FitBox>
              {/* Kâğıdın kuralı: ipucu yok. */}
              <NoHints>
                <GameSwitch round={round} onDone={(res) => onVocabDone(round, res)} />
              </NoHints>
            </FitBox>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (section === "grammar") {
    const g = paper!.sections.grammar[idx];
    return (
      <section className="card mx-auto w-full max-w-md p-4">
        {header}
        {g.kind === "cell" ? (
          <>
            <p className="muted text-caption">
              {g.sheet} · {g.label}
            </p>
            <p className="mb-4 mt-1 text-strong" lang={course}>
              {g.key} <span className="muted">→ ?</span>
            </p>
            {options(g.options, pickGrammar, g.key)}
          </>
        ) : (
          <>
            <p className="muted text-caption">Richtig oder falsch? · {t("exam.is_sentence_right")}</p>
            <p className="mb-4 mt-1 text-strong leading-snug" lang={course}>
              {g.statement}
            </p>
            {options([`Richtig · ${t("common.correct")}`, `Falsch · ${t("common.wrong")}`], pickGrammar, g.statement)}
          </>
        )}
        <p className="muted mt-3 text-center text-caption">
          {idx + 1} / {paper!.sections.grammar.length}
        </p>
      </section>
    );
  }

  if (section === "produce") {
    const item = paper!.sections.produce[idx];
    return (
      <ProduceCard
        header={header}
        item={item}
        index={idx}
        total={paper!.sections.produce.length}
        typed={typed}
        onTyped={setTyped}
        chunks={chunks}
        onChunks={setChunks}
        onSubmit={submitProduce}
      />
    );
  }

  if (section === "reading" || section === "listening") {
    const items: TextItem[] = section === "reading" ? paper!.sections.reading : paper!.sections.listening;
    const item = items[idx];
    const q = item.questions[qIdx];
    return (
      <section className="card mx-auto w-full max-w-md p-4">
        {header}
        <p className="muted text-caption">
          {item.genre ?? item.situation ?? ""} {item.titleTr ? `· ${item.titleTr}` : ""}
        </p>
        <p className="mb-2 text-strong" lang={course}>
          {item.title}
        </p>
        {item.text ? (
          <div lang={course} className="mb-3 max-h-56 overflow-y-auto whitespace-pre-line rounded-panel px-3.5 py-3 text-body leading-relaxed surface-2">
            {item.text}
          </div>
        ) : null}
        {item.segments ? <DialogPlayer segments={item.segments} /> : null}
        <p className="mt-3 text-strong" lang={course}>
          {q.text}
        </p>
        {q.textTr ? <p className="muted mb-3 text-caption">{q.textTr}</p> : <div className="mb-3" />}
        {options(q.options, (i) => pickText(section, i), q.text)}
        <p className="muted mt-3 text-center text-caption">
          {t("exam.question_of", { n: qIdx + 1, total: item.questions.length })}
        </p>
      </section>
    );
  }

  if (section === "speaking") {
    const item = paper!.sections.speaking[idx];
    const last = idx + 1 >= paper!.sections.speaking.length;
    const startRec = async () => {
      if (spk !== "idle" && spk !== "failed") return;
      const cap = await captureClip(SPEAK_MAX_MS);
      if (!cap) return setSpk("failed");
      capture.current = cap;
      setSpk("rec");
      setTimeout(() => void stopRec(), SPEAK_MAX_MS + 50);
    };
    const stopRec = async () => {
      const cap = capture.current;
      if (!cap) return;
      capture.current = null;
      setSpk("scoring");
      const blob = await cap.stop();
      const res = blob ? await askPronounce(blob, item.de, { exerciseId: item.id, examToken: keyToken.current ?? undefined, confusions: item.confusions, language: targetLangOf(course) }) : ({ ok: false, reason: "failed" } as const);
      if (res.ok) {
        speakingScores.current[idx] = res.score.overall;
        speakingScoreTokens.current[idx] = res.score.scoreToken ?? null;
        score.current.speaking.correct += res.score.passed ? 1 : 0;
        setSpkResult(res.score);
        setSpk("done");
      } else {
        setSpkConsent(res.reason === "consent");
        setSpkTries((n) => n + 1);
        setSpk("failed");
      }
    };
    const advance = () => {
      if (spk !== "done" && spk !== "failed") return;
      // Teknik arıza iki denemede de sürdüyse madde 0 sayılır ama sınav durmaz.
      if (spk === "failed" && speakingScores.current[idx] === undefined) speakingScores.current[idx] = 0;
      if (!speakingScores.current[idx] || speakingScores.current[idx] < 60)
        misses.current.push({ section: "speaking", prompt: item.situation ?? t("exam.pronunciation"), answer: item.de });
      setSpk("idle");
      setSpkResult(null);
      setSpkTries(0);
      setSpkConsent(false);
      if (!last) setIdx(idx + 1);
      else nextSection();
    };
    return (
      <section className="card mx-auto w-full max-w-md p-4">
        {header}
        <p className="muted text-caption">
          {idx + 1}/{paper!.sections.speaking.length} · {item.situation ?? t("exam.read_aloud")}
        </p>
        <p className="mt-3 text-strong leading-snug" lang={course}>
          {item.de}
        </p>
        <p className="muted text-body">{item.tr}</p>
        {spk === "idle" || spk === "rec" ? (
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => (spk === "rec" ? void stopRec() : void startRec())}
              aria-label={t(spk === "rec" ? "exam.stop_recording" : "exam.start_recording")}
              className="flex h-20 w-20 items-center justify-center rounded-full on-fill"
              style={{ background: spk === "rec" ? "var(--color-rose)" : "var(--color-brand)" }}
            >
              <MicIcon size={30} />
            </button>
            <span className="muted text-caption">{t(spk === "rec" ? "exam.recording_tap_done" : "exam.tap_mic_read")}</span>
          </div>
        ) : null}
        {spk === "scoring" ? <p className="muted mt-5 text-center text-body">{t("item.mono_scoring")}</p> : null}
        {spk === "done" && spkResult ? (
          <div className="mt-4">
            <PronounceCard score={spkResult} compact />
          </div>
        ) : null}
        {spk === "failed" ? (
          /* Ses alınamadı satırı YERİNDE çıkıyor (ekran değişmiyor): mikrofon
             düğmesine basan kullanıcı odağı düğmede tutuyor ve kutunun geldiğini
             ekran okuyucu söylemiyordu. Hata olduğu için `alert`. */
          <p role="alert" className="mt-4 rounded-panel px-3 py-2 text-body" style={{ background: "color-mix(in srgb, var(--color-rose) 10%, transparent)" }}>
            {spkConsent
              ? `${t("aiconsent.voice_without")} ${t("aiconsent.change_later")}`
              : t(spkTries < 2 ? "exam.audio_failed_retry" : "exam.audio_failed_skip")}
          </p>
        ) : null}
        {spk === "failed" && spkTries < 2 && !spkConsent ? (
          <button type="button" onClick={() => void startRec()} className="btn btn-ghost mt-3 w-full px-5 py-3 text-body">
            {t("common.try_again")}
          </button>
        ) : null}
        {spk === "done" || spk === "failed" ? (
          <button type="button" onClick={advance} className="btn btn-primary mt-3 w-full px-5 py-3 text-body">
            {t(last ? "exam.finish_section" : "exam.next_sentence")}
          </button>
        ) : null}
      </section>
    );
  }

  // writing
  const w = paper!.sections.writing[0];
  const examWords = writingText.trim() ? writingText.trim().split(/\s+/).length : 0;
  return (
    <section className="card mx-auto w-full max-w-md p-4">
      {header}
      <p className="text-strong leading-relaxed">{w.task.prompt}</p>
      {w.task.stimulus ? (
        <div lang={course} className="mt-2 whitespace-pre-line rounded-panel px-3.5 py-3 text-body leading-relaxed surface-2">
          {w.task.stimulus}
        </div>
      ) : null}
      <ul className="muted mt-2 list-disc pl-5 text-caption">
        {w.task.checklist.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
        <li>{t("exam.min_words", { n: w.task.minWords })}</li>
      </ul>
      {writingResult ? (
        <div className="mt-3 flex flex-col gap-3">
          <AssessmentCard answer={writingText.trim()} result={writingResult} failure={writingFailure} />
          <button type="button" onClick={() => void finishNow()} className="btn btn-primary px-5 py-3 text-body">
            {t("exam.finish_exam")}
          </button>
        </div>
      ) : (
        <>
          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            rows={7}
            lang={course}
            spellCheck={false}
            /* Cümle başı büyük ve düzeltme kapalı — Android aynı alanda
               `autoCapitalize="sentences"` diyor (`ExamScreen`). Buradaki
               alan hiçbirini söylemiyordu ve tarayıcı varsayılanı otomatik
               düzeltme AÇIK: İngilizce klavye Almanca sözcükleri
               "düzeltiyor". */
            autoCapitalize="sentences"
            autoCorrect="off"
            /* Sabit Almanca yazıyordu; kurs İngilizce olabiliyor ve arayüzün
               üç dili var. Android aynı yerde `exam.write_text` kullanıyor. */
            placeholder={t("exam.write_text")}
            aria-label={t("exam.write_text")}
            className="card mt-3 w-full resize-none px-4 py-3 text-body outline-none"
          />
          <p className="muted mt-1 text-right text-caption tabular-nums">
            {t("exam.word_count", { n: examWords, min: w.task.minWords })}
          </p>
          {/* SEBEP YAZIYOR. Düğme kapalıysa kullanıcı neden kapalı olduğunu
              bilmiyordu: üstteki sayaç görevin alt sınırını söylüyor (40-120
              kelime olabiliyor) ama düğmenin uyduğu sayı BAŞKA — yapay zekâ
              çağrısının tabanı. İki sayının aynı ekranda farklı olması
              "yazdım, niye açılmıyor" sorusunu doğuruyordu. Sayı da artık
              elle yazılı değil (`MIN_ASSESS_WORDS`, mobille aynı kaynak). */}
          {examWords < MIN_ASSESS_WORDS ? (
            <p className="muted mt-2 text-caption">{t("assess.gate_min_words", { n: MIN_ASSESS_WORDS })}</p>
          ) : null}
          <button
            type="button"
            disabled={busy || examWords < MIN_ASSESS_WORDS}
            onClick={() => void evaluateWriting()}
            className="btn btn-primary mt-2 w-full px-5 py-3 text-body disabled:opacity-60"
          >
            {t(busy ? "exam.evaluating" : "exam.submit_and_score")}
          </button>
        </>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ parçalar */

/** Kâğıdın kapağı: ne ölçülüyor, kaç bölüm, kural ne. */
function Cover({ level, module, onStart }: { level: CefrLevel; module: number | null; onStart: () => void }) {
  const course = useCourse();
  const t = useT();
  const [cover, setCover] = useState<{ code: string | null; titleDe: string | null; titleTr: string | null; focus: { de: string; tr: string }[]; trial?: boolean; seconds?: number; counts?: Record<string, number> } | null>(null);
  useEffect(() => {
    let alive = true;
    /* SEVIYE SINAVININ DA KAPAGI VAR. Bolumler ve sure modul sinavinda
       yaziyordu, seviye sinavinda hic yazmiyordu: ayni soru ("kac dakika,
       neler sorulacak") iki sinav turunde iki farkli cevap aliyordu. Uc
       seviye icin de sabitlerden kapak donduruyor -- kagit uretilmiyor. */
    void apiFetch(module === null ? `/api/exam?level=${level}&kind=level` : `/api/exam?level=${level}&module=${module}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { cover?: typeof cover } | null) => {
        if (alive && d?.cover) setCover(d.cover);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [level, module]);

  /*
    KAPAK ŞABLONU: ikon karosu · sınavın adı · başlık · tek cümle · ikonlu
    kural satırları · Başla / Vazgeç.

    KÂĞIDIN KENDİ BAŞLIĞI ile UYDURULMUŞ Almanca ayrı şeyler. Kâğıt varsa
    başlığı gerçekten hedef dilde (`cover.titleDe`) ve `lang` niteliği de onu
    söylüyor. Kâğıt YOKSA başlık sözlükten: eskiden "Niveauprüfung",
    "Modulprüfung" diye Almanca dizgiler KODA GÖMÜLÜYDÜ ve İngilizce kursta
    da Almanca görünüyordu. Sınavın adı artık her durumda sözlükten, üst satırda.

    KURALLAR tek paragraftı: geri dönüş, ipucu, eşik ve ağırlık aynı cümle
    yığınında birbirini örtüyordu. Her kural kendi satırında.
  */
  const rules: CoverRule[] = [
    { icon: <ClockIcon size={16} />, text: t(module === null ? "exam.rules_level" : "exam.rules_module") },
    { icon: <LockIcon size={16} />, text: t("exam.rule_no_return") },
    { icon: <TargetIcon size={16} />, text: t("exam.rules_body", { total: PASS_TOTAL, section: PASS_SECTION }) },
    { icon: <PenIcon size={16} />, text: t("exam.rule_weight") },
    { icon: <AlertIcon size={16} />, text: t("exam.rule_quit") },
  ];
  return (
    <FlowColumn>
      {/* Erdi koç (WP-66): sınav girişinde düşünceli, tek cümle. */}
      <CoachLine moment="exam_intro" />
      <CoverBody
        icon={<ExamIcon size={28} />}
        tint="var(--color-brand-500)"
        eyebrow={module === null ? t("exam.level_exam", { level }) : t("exam.module_exam", { level, n: module + 1 })}
        title={cover?.titleDe ? <span lang={course}>{cover.titleDe}</span> : t(module === null ? "exam.cover_title_level" : "exam.cover_title_module")}
        /* Deneme sınavı sertifika vermiyor: "geçersen sertifika" sözü orada
           yanlış olurdu, yerine aşağıdaki deneme notu konuşuyor. Kapak
           gelmeden cümle çizilmiyor ki denemede bir an görünüp kaybolmasın. */
        pitch={cover ? (cover.titleDe ? cover.titleTr : cover.trial ? null : t("exam.cover_pitch")) : null}
        rules={rules}
      >
        {/* SONUCUN SAYILMAYACAĞI BAŞLAMADAN ÖNCE SÖYLENİYOR. Web bunu yalnız
            sonuç satırında söylüyordu, yani kullanıcı yirmi dakikayı harcadıktan
            SONRA öğreniyordu. */}
        {cover?.trial ? <FlowNote tone="warn" icon={<AlertIcon size={16} />} text={t("exam.trial_notice")} /> : null}
        {cover?.focus.length ? (
          <DetailCard title={t("exam.measures_these")}>
            {cover.focus.map((f, i) => (
              <DetailRow key={i} left={f.de} right={f.tr} lang={course} />
            ))}
          </DetailCard>
        ) : null}
        {/*
          BÖLÜMLER VE SÜRE. "Ne kadar sürecek, neler sorulacak" sorusu sınava
          GİRMEDEN cevaplanmalı. Sayılar kâğıttan değil sabit plandan geliyor
          (uç kapağı üretirken kâğıdı hazırlamıyor).
        */}
        {cover?.counts ? (
          <DetailCard
            title={t("exam.sections")}
            right={cover.seconds ? <span className="muted text-caption">{t("exam.minutes", { n: Math.round(cover.seconds / 60) })}</span> : null}
          >
            {SECTION_ORDER.filter((id) => (cover.counts?.[id === "reading" || id === "listening" ? "text" : id] ?? 0) > 0).map((id) => (
              <DetailRow
                key={id}
                left={SECTION_TITLE_TARGET[targetLangOf(course)][id]}
                lang={course}
                right={`${t(SECTION_TITLE_KEYS[id])} (${cover.counts?.[id === "reading" || id === "listening" ? "text" : id]})`}
              />
            ))}
          </DetailCard>
        ) : null}
      </CoverBody>
      <FlowActions primary={{ label: t("exam.start"), onClick: onStart }} tertiary={{ label: t("common.discard"), href: "/immersion" }} />
    </FlowColumn>
  );
}

/** Dinleme diyaloğu: tek düğme bütün replikleri sırayla çalar. */
function DialogPlayer({ segments }: { segments: { speaker?: string; text: string }[] }) {
  const t = useT();
  const [at, setAt] = useState<number | null>(null);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      stopSpeaking();
    };
  }, []);

  function playFrom(i: number) {
    if (i >= segments.length) return setAt(null);
    setAt(i);
    speakGerman(segments[i].text, () => {
      if (alive.current) playFrom(i + 1);
    });
  }

  return (
    <div className="mt-1 flex flex-col gap-2">
      <button
        type="button"
        onClick={() => (at === null ? playFrom(0) : (stopSpeaking(), setAt(null)))}
        className="btn btn-primary flex items-center justify-center gap-2 px-4 py-2.5 text-body"
      >
        <SpeakerIcon size={16} />
        {at === null ? `Dialog abspielen · ${t("exam.listen_dialog")}` : t("exam.stop")}
      </button>
      <div className="flex flex-wrap gap-1.5">
        {segments.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => playFrom(i)}
            className="chip px-2.5 py-1 text-caption"
            style={at === i ? { borderColor: "var(--color-brand)", color: "var(--color-brand)" } : undefined}
          >
            {s.speaker ?? `Teil ${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Cümle kurma maddesi: yazarak ya da parçaları sıralayarak. */
function ProduceCard({
  header,
  item,
  index,
  total,
  typed,
  onTyped,
  chunks,
  onChunks,
  onSubmit,
}: {
  header: React.ReactNode;
  item: ProduceExamItem;
  index: number;
  total: number;
  typed: string;
  onTyped: (v: string) => void;
  chunks: number[];
  onChunks: (v: number[]) => void;
  onSubmit: () => void;
}) {
  const course = useCourse();
  const t = useT();
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [item.id]);

  /* Sayi elle yazili degil (`MIN_FREE_WORDS`, mobille ayni kaynak). Kapali
     dugmenin SEBEBI de yaziyor: siralama kipinde kalan parcalar ekranda
     goruldugu icin ayri bir cumle gerekmiyor, yazma kipinde gerekiyordu. */
  const yazilanKelime = typed.trim() ? typed.trim().split(/\s+/).filter(Boolean).length : 0;
  const ready = item.mode === "order" ? chunks.length === (item.chunks?.length ?? 0) : yazilanKelime >= MIN_FREE_WORDS;

  return (
    <section className="card mx-auto w-full max-w-md p-4">
      {header}
      <p className="muted text-caption">
        {item.mode === "order"
          ? `Bringen Sie den Satz in die richtige Reihenfolge · ${t("exam.order_the_sentence")}`
          : `Schreiben Sie den Satz auf Deutsch · ${t("exam.write_in_target")}`}
      </p>
      <p className="mt-2 text-strong leading-snug">{item.prompt}</p>

      {item.mode === "order" ? (
        <>
          <div className="mt-4 min-h-[3.25rem] rounded-panel px-3 py-2.5 text-h3 surface-2" lang={course}>
            {chunks.length ? (
              <span className="flex flex-wrap gap-1.5">
                {chunks.map((c, i) => (
                  <button key={`${c}-${i}`} type="button" onClick={() => onChunks(chunks.filter((_, k) => k !== i))} className="chip px-2.5 py-1 text-body">
                    {item.chunks![c]}
                  </button>
                ))}
              </span>
            ) : (
              <span className="muted text-body">{t("exam.tap_chunks")}</span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.chunks!.map((c, i) =>
              chunks.includes(i) ? null : (
                <button key={`${c}-${i}`} type="button" onClick={() => onChunks([...chunks, i])} className="option px-3 py-2 text-strong" lang={course}>
                  {c}
                </button>
              ),
            )}
          </div>
        </>
      ) : (
        <textarea
          ref={ref}
          value={typed}
          onChange={(e) => onTyped(e.target.value)}
          /* Tek cümle: Enter = cevapla (uzun yazma bölümü alt satıra inmeye devam ediyor). */
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (ready) onSubmit();
            }
          }}
          enterKeyHint="done"
          rows={3}
          lang={course}
          spellCheck={false}
          autoCapitalize="sentences"
          autoCorrect="off"
          /* Android: `exam.write_sentence`. */
          placeholder={t("exam.write_sentence")}
          aria-label={t("exam.write_sentence")}
          className="card mt-3 w-full resize-none px-4 py-3 text-body outline-none"
        />
      )}

      {item.mode !== "order" && yazilanKelime < MIN_FREE_WORDS ? (
        <p className="muted mt-2 text-caption">{t("assess.gate_min_words", { n: MIN_FREE_WORDS })}</p>
      ) : null}
      <button type="button" disabled={!ready} onClick={onSubmit} className="btn btn-primary mt-4 w-full px-5 py-3 text-body disabled:opacity-60">
        {t(index + 1 === total ? "exam.finish_section" : "exam.answer_and_next")}
      </button>
      <p className="muted mt-2 text-center text-caption">
        {index + 1} / {total} · {t("exam.answers_at_end")}
      </p>
    </section>
  );
}

/** Sonuç: puan, bölüm dökümü, yapabilirlik listesi, kaçırılan maddeler. */
function Result({
  result,
  level,
  moduleIndex,
  title,
  cando,
  focus,
  misses,
  showMisses,
  onToggleMisses,
  writingSample,
}: {
  result: ExamResult;
  level: CefrLevel;
  /** Modül sınavıysa modülün sırası; seviye sınavında null. */
  moduleIndex: number | null;
  title: string;
  cando: { de: string; tr: string; en: string }[];
  focus: { de: string; tr: string }[];
  misses: Miss[];
  showMisses: boolean;
  onToggleMisses: () => void;
  writingSample: string | null;
}) {
  const course = useCourse();
  const t = useT();
  const lang = useLang();
  /*
    SONUÇ ŞABLONU: band → üç sayı → notlar → ayrıntı kartları → tek birincil
    düğme. Eskiden koç balonu, yüzde, hüküm, bölüm listesi, yapabilirlik,
    döküm ve üç düğme tek kartta aynı ağırlıkta diziliyordu.

    Band `role="status"` taşıyor: TURUN SONUCU DUYURULUYOR (bkz. 11.337).
    Sınavın TEK sonucu bu; bölüm geçişleri ayrı bir sonuç değil.
  */
  const rows = result.sections;
  const byPct = [...rows].sort((a, b) => a.pct - b.pct);
  const weakest = byPct[0];
  const strongest = byPct[byPct.length - 1];
  const cleared = rows.filter((s) => s.pct >= PASS_SECTION).length;
  /* Geçilmediyse NEDEN: toplam mı eşiğin altında, yoksa tek bir bölüm mü. */
  const pill = result.passed
    ? result.trial
      ? null
      : { text: t("exam.cert_ready"), tone: "ok" as const }
    : result.total < PASS_TOTAL
      ? { text: t("exam.pill_total_low", { pct: formatPercent(PASS_TOTAL, lang) }), tone: "bad" as const }
      : weakest && weakest.pct < PASS_SECTION
        ? { text: t("exam.pill_section_low", { section: t(SECTION_TITLE_KEYS[weakest.id]), pct: formatPercent(PASS_SECTION, lang) }), tone: "bad" as const }
        : null;
  const certificate = result.passed && !result.trial;
  const back = { label: t("exam.back_to_path"), href: "/immersion" };
  return (
    /* KUTLAMA yalnız geçince (Android `FlowScreen celebrate`). */
    <FlowColumn celebrate={result.passed}>
      <ResultHero
        eyebrow={title}
        title={result.passed ? t("exam.passed") : t("exam.not_passed")}
        figure={formatPercent(result.total, lang)}
        sub={t("exam.rules_body", { total: PASS_TOTAL, section: PASS_SECTION })}
        /* Erdi bandın ALTINDA konuşuyor (koç balonu); bandda ikinci maskot yok. */
        pill={pill}
        quiet={!result.passed}
      />
      <CoachLine
        moment={result.passed ? "exam_pass" : "exam_fail"}
        vars={{ pct: result.total, level }}
      />
      {strongest ? (
        <StatRow
          items={[
            { value: formatPercent(strongest.pct, lang), label: t(SECTION_TITLE_KEYS[strongest.id]), tone: strongest.pct >= PASS_SECTION ? "ok" : "bad" },
            ...(weakest && weakest.id !== strongest.id
              ? [{ value: formatPercent(weakest.pct, lang), label: t(SECTION_TITLE_KEYS[weakest.id]), tone: weakest.pct < PASS_SECTION ? ("bad" as const) : null }]
              : []),
            { value: `${cleared}/${rows.length}`, label: t("exam.stat_sections_cleared") },
          ]}
        />
      ) : null}
      {/* DENEME CUMLESI ORTAK ANAHTARDAN; sebebi de soyluyor (%80 esigi). */}
      {result.trial ? <FlowNote tone="warn" icon={<AlertIcon size={16} />} text={t("exam.trial_notice")} /> : null}
      {certificate ? null : <FlowNote icon={<TargetIcon size={16} />} text={t("exam.weak_section_hint")} />}

      <DetailCard title={t("exam.sections")}>
        <ul className="space-y-1.5">
          {rows.map((s) => (
            <li key={s.id}>
              <div className="flex items-center justify-between text-body">
                <span>
                  <span lang={course} className="font-semibold">
                    {SECTION_TITLE_TARGET[targetLangOf(course)][s.id]}
                  </span>
                  <span className="muted"> · {t(SECTION_TITLE_KEYS[s.id])}</span>
                  <span className="muted text-caption"> {t("exam.weight", { pct: formatPercent(s.weight, lang) })}</span>
                </span>
                {/* Geçen bölüm YEŞİL: nötr metin rengi, geçen ve kalan bölümü
                    yalnız kırmızının varlığıyla ayırıyordu. */}
                <span className="tabular-nums" style={{ color: s.pct >= 50 ? "var(--color-success)" : "var(--color-danger)" }}>
                  {formatPercent(s.pct, lang)}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full surface-2">
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.pct >= 50 ? "var(--color-brand)" : "var(--color-danger)" }} />
              </div>
            </li>
          ))}
        </ul>
      </DetailCard>

      {misses.length ? (
        <DetailCard title={t("exam.misses_title")}>
          <button type="button" onClick={onToggleMisses} className="self-start text-strong" style={{ color: "var(--color-brand)" }}>
            {showMisses ? t("exam.hide_breakdown") : t("exam.missed_n", { n: misses.length })}
          </button>
          {showMisses ? (
            <ul className="space-y-2.5">
              {misses.map((m, i) => (
                <li key={i} className="border-t pt-2 text-body" style={{ borderColor: "var(--hairline)" }}>
                  <p className="muted text-caption">
                    <span lang={course}>{SECTION_TITLE_TARGET[targetLangOf(course)][m.section]}</span> · {t(SECTION_TITLE_KEYS[m.section])}
                  </p>
                  <p className="mt-0.5">{m.prompt}</p>
                  <p className="mt-1 font-semibold" lang={course} style={{ color: "var(--color-mint)" }}>
                    {m.answer}
                  </p>
                  {m.given ? (
                    <p className="muted text-caption">
                      {t("exam.your_answer")} <span lang={course}>{m.given}</span>
                    </p>
                  ) : null}
                  {m.section === "produce" && m.given ? (
                    <p className="mt-1 text-caption">
                      <TokenDiff tokens={matchSentence(m.given, m.answer, [], targetLangOf(course)).target} />
                    </p>
                  ) : null}
                  {m.why ? <p className="muted mt-1 text-caption">{m.why}</p> : null}
                </li>
              ))}
            </ul>
          ) : null}
          {showMisses && writingSample ? (
            <div className="rounded-panel px-3 py-2.5 text-body surface-2">
              <p className="muted text-caption">{t("exam.writing_sample")}</p>
              <p className="mt-1 whitespace-pre-line text-caption" lang={course}>
                {writingSample}
              </p>
            </div>
          ) : null}
        </DetailCard>
      ) : null}

      {cando.length ? (
        <DetailCard title={t(result.passed ? "exam.now_you_can" : "exam.this_measured")}>
          <ul className="space-y-2">
            {cando.map((c, i) => (
              <li key={i} className="flex gap-2 text-body">
                <span className="mt-0.5 shrink-0" style={{ color: result.passed ? "var(--color-mint)" : "var(--text-muted)" }}>
                  <CheckIcon size={14} />
                </span>
                <span>
                  <span className="block font-semibold" lang={course}>
                    {c.de}
                  </span>
                  <span className="muted block text-caption">{c.tr}</span>
                  <span className="muted block text-caption opacity-70" lang="en">
                    {c.en}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </DetailCard>
      ) : focus.length ? (
        <FlowNote text={t("exam.structures_measured", { list: focus.map((f) => f.de).join(", ") })} />
      ) : null}

      <FlowActions
        /* Sertifika yeni sekmede açılıyor (uç bir belge döndürüyor, uygulama
           sayfası değil); `Link` istemci içi gezinmeye çalışırdı. */
        primary={certificate ? { label: t("exam.open_certificate"), onClick: () => void window.open(`/api/certificate/${result.id}`, "_blank", "noopener,noreferrer") } : back}
        secondary={certificate ? back : null}
        /*
          Hız turunun tek girişi burası. Eskiden yol haritasında, modül
          sınavının hemen altındaydı ve orada ikinci bir sınav gibi okunuyordu —
          oysa altmış saniyede on beş kelime bir şey KANITLAMIYOR. Sınavdan
          SONRA ise yeri doğru: ölçüm bitti, bu bir oyun.
        */
        tertiary={moduleIndex !== null ? { label: t("exam.speed_round_link", { n: BOSS_SECONDS }), href: `/lessons/boss/${level}/${moduleIndex}` } : null}
      />
    </FlowColumn>
  );
}

/* Kelime turunda kaçırılan maddenin dökümde görünecek hâli. */
function wordPrompt(round: Round, t: (k: string) => string): string {
  if ("word" in round && round.word) return round.game === "translate" && "sentence" in round ? round.sentence.tr : round.word.tr;
  // Kelimesiz bir kelime turu üretilmiyor; yine de sabit Türkçe bırakmamak
  // için yedek de sözlükten geliyor (zayıf nokta kartında görünebilir).
  return t("exam.sec_vocab");
}
function wordAnswer(round: Round): string {
  if (round.game === "translate" && "sentence" in round) return round.sentence.de;
  if ("word" in round && round.word) return round.word.artikel ? `${round.word.artikel} ${round.word.de}` : round.word.de;
  return "";
}
