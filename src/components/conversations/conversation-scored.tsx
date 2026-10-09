"use client";

import { ReportFlag, ReportLink, snapshot } from "@/components/report-flag";
import { UnlockProgress } from "@/components/unlock-progress";
import type { SurfaceView } from "@/lib/premium/unlock-copy";
import { apiFetch, CHAT_TIMEOUT_MS } from "@/lib/api-fetch";
import { isAiConsentDeclined } from "@/lib/ai-consent-client";
import { AiNotice } from "@/components/ai-notice";
import { ReportDialog } from "@/components/report-dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Conversation } from "@/lib/conversations/types";
import { parseReply } from "@/lib/chat-format";
import { SCORED_PASS_SCORE, SCORED_SECONDS, SCORED_TURNS } from "@/lib/conversations/chat-const";
import { askAssess, fallbackAssessment, ASSESS_CHAT_TIMEOUT_MS, type AssessFailure, type FallbackAssessment } from "@/lib/assess-client";
import type { Assessment, AssessLevel, AssessRequest } from "@/lib/assess-prompts";
import { AssessmentCard } from "@/components/feedback/assessment-card";
import { ERROR_LABEL_KEYS, type ErrorType } from "@/lib/errors";
import { useT, useLang } from "@/lib/i18n/client";
import { courseName, speechLocaleOf, targetLangOf } from "@/lib/courses";
import { recognitionCtor, requestMicrophone, type Recognition } from "@/components/microphone";
import { speakGerman, stopSpeaking } from "@/components/speak-button";
import { ConversationIcon, CorrectIcon, DurationIcon, NoGoingBackIcon, ScoreTargetIcon, SkillSpeakingIcon, WarningIcon } from "@/components/icons";
import { FlowColumn, FlowActions, FlowNote, ResultHero, StatRow, DetailCard, DetailRow, CoverBody, StateBody } from "@/components/flow";
import { CoachLine } from "@/components/coach-line";
import { track } from "@/lib/track";
import { formatPercent } from "@/lib/i18n/dict";
import { reducedMotion } from "@/lib/fx";

type Turn = { role: "user" | "assistant"; content: string };
type Phase = "intro" | "talk" | "scoring" | "result" | "error";

/**
 * Puanlı kısım (WP-22): aynı sahne, yardım yok, 5 tur, 3 dakika.
 *
 * Alıştırmadan farkı ölçüm: muhatap düzeltmez, öneri vermez, Türkçe
 * konuşmaz (bkz. `scoredPrompt`); konuşma bitince öğrencinin bütün turları tek
 * seferde rubrikle puanlanır (`kind: "chat"`) ve `assessments`'a yazılır.
 * Sonuç: rubrik kartı, en iyi iki cümle (hatasız ve en uzun), en sık iki
 * hata tipi, konuşmanın can-do etiketi.
 *
 * Mikrofon tek atış: dokun, konuş, sus — tanıyıcı kapanınca metin gönderilir.
 * Tanıyıcı yoksa ya da izin verilmezse yazarak; sınavda ikisi eşdeğer
 * sayılır (telaffuz puanı WP-20 ile gelecek).
 */
export function ConversationScored({
  conversation,
  cando,
  quota = null,
}: {
  conversation: Conversation;
  cando: string[];
  /**
   * Konuşma adımının hakkı (2026-09-25). Puanlı kısım adımın KENDİ hakkını
   * kullanıyor, ayrı hak düşmüyor; adım sahiplenilmemiş ve hak bitmişse sınav
   * da kilitli — anlatılır, "bağlantı sorunu" denmez.
   */
  quota?: { locked: boolean; view: SurfaceView } | null;
}) {
  const t = useT();
  const [locked, setLocked] = useState(Boolean(quota?.locked));
  useEffect(() => {
    if (locked) track("premium_gate", 0, "conversation");
  }, [locked]);
  const lang = useLang();
  const targetName = courseName(conversation.course, lang);
  const [phase, setPhase] = useState<Phase>("intro");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [asr, setAsr] = useState<boolean>(false);
  const [left, setLeft] = useState(SCORED_SECONDS);
  const [result, setResult] = useState<Assessment | FallbackAssessment | null>(null);
  const [failure, setFailure] = useState<AssessFailure | null>(null);
  /**
   * Muhatap cevap vermedi çünkü yapay zekâya izin verilmedi — servis kapalı
   * DEĞİL. Sınav senaryoyla yürüyemiyor (sayılmazdı), ama sebep doğru
   * söylenmeli ve nereden açılacağı belli olmalı.
   */
  const [consentOff, setConsentOff] = useState(false);
  /** Bildirilen muhatap yanıtı (içerik denetimi CNT-6; konuşma sohbetiyle aynı yol). */
  const [reported, setReported] = useState<{ ref: string; text: string } | null>(null);
  const rec = useRef<Recognition | null>(null);
  /*
   * GEÇ GELEN SONUÇLAR İÇİN REF'LER. Mikrofonun `onend`i ve muhatabın cevabı
   * çizimden bağımsız zamanda geliyor; eskiden ikisi de kendi çizimlerinin
   * `phase`/`busy`/`turns`unu görüyordu: süre dolup puanlama başlamışken tur
   * yine gönderiliyor, dinlerken "Gönder"e basılınca iki sohbet isteği aynı
   * anda gidiyor ve biri ötekinin turunu siliyordu.
   *   turnsRef  son turlar (gönderim bunun üstüne kuruluyor)
   *   phaseRef  geçerli faz
   *   inFlight  gönderim sürüyor — `busy`nin eşzamanlı kopyası
   *   attempt   sınavın kaçıncı kurulumu: "Tekrar dene" önceki denemenin
   *             cevabını, okumasını ve 6 sn'lik yedek sayacını geçersiz kılıyor
   *   micToken  dinleme oturumu: kesilen dinlemenin sözü gönderilmiyor
   *   fallback  son turdan sonra okuma bitmezse puanlamayı başlatan sayaç
   */
  const turnsRef = useRef<Turn[]>([]);
  const phaseRef = useRef<Phase>("intro");
  const inFlight = useRef(false);
  const attempt = useRef(0);
  const micToken = useRef(0);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const userTurns = turns.filter((t) => t.role === "user").length;

  useEffect(() => {
    setAsr(Boolean(recognitionCtor()));
  }, []);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  /** Tur listesini ref'le birlikte yazar. */
  const putTurns = (v: Turn[]) => {
    turnsRef.current = v;
    setTurns(v);
  };

  /** Süren dinlemeyi keser; duyduğu gönderilmez (bkz. `micToken`). */
  const stopMic = () => {
    micToken.current++;
    const r = rec.current;
    rec.current = null;
    r?.abort();
    setListening(false);
  };

  const clearFallback = () => {
    if (fallback.current) clearTimeout(fallback.current);
    fallback.current = null;
  };

  // Sökülürken mikrofon ve yedek sayaç da bırakılıyor.
  useEffect(
    () => () => {
      micToken.current++;
      attempt.current++;
      rec.current?.abort();
      if (fallback.current) clearTimeout(fallback.current);
    },
    [],
  );

  /*
   * Süre: konuşma fazında saniyede bir; sıfırda konuşma biter ve puanlanır.
   *
   * DUVAR SAATİNDEN, SAYICIDAN DEĞİL. Sekme gizlendiğinde tarayıcı
   * `setInterval`i kısıyor (mobilde uygulama arka plana alınınca tamamen
   * duruyor), yani üç dakikalık ölçüm istenildiği kadar uzatılabiliyordu.
   * Aynı hata iki platformda da vardı; hayatta kalma turu bunu baştan beri
   * doğru yapıyor (`challenge-player` `deadline`).
   */
  const deadline = useRef(0);
  useEffect(() => {
    if (phase !== "talk") return;
    if (!deadline.current) deadline.current = Date.now() + SCORED_SECONDS * 1000;
    const tick = () => setLeft(Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [phase]);
  useEffect(() => {
    if (phase === "talk" && left <= 0) void score(turnsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, phase]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "end" });
  }, [turns]);

  function start() {
    track("nav", 0, "conversation_scored:start");
    const opening: Turn = { role: "assistant", content: conversation.chat.opening };
    putTurns([opening]);
    setPhase("talk");
    speakGerman(conversation.chat.opening);
  }

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || inFlight.current || scored.current || phaseRef.current !== "talk") return;
    // Dinlerken "Gönder"e basıldıysa tanıyıcının sözü ikinci tur olmasın.
    stopMic();
    const run = attempt.current;
    setDraft("");
    inFlight.current = true;
    setBusy(true);
    const next: Turn[] = [...turnsRef.current, { role: "user", content: clean }];
    putTurns(next);
    const n = next.filter((t) => t.role === "user").length;
    try {
      const res = await apiFetch("/api/chat", {
        method: "POST",
        /* Tekrarı zararsız: sunucu cevabı kaydetmiyor, ikinci kopya yalnız
           günlük tur sayacından bir tur düşüyor (bkz. lib/api-fetch `send`). */
        replay: true,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ conversationId: conversation.id, messages: next, mode: "scored" }),
        /* Üretim uzun: genel tavan (25 sn) bu çağrıyı kesiyordu. Android
           kırk beş saniye bekliyor, aynı sabit adıyla. */
        timeoutMs: CHAT_TIMEOUT_MS,
      });
      /* İzin diyaloğunda "hayır" dendiyse ya da daha önce denmişse cümle
         sağlayıcıya gitmedi. Akış öteki arızalarla aynı (iki turdan sonra
         eldeki puanlanır, önce ise sınav kurulamaz); değişen yalnız cümle. */
      if (res.status === 403 && (await res.clone().json().catch(() => null))?.error === "premium_required") {
        inFlight.current = false;
        setBusy(false);
        setLocked(true);
        return;
      }
      if (await isAiConsentDeclined(res)) setConsentOff(true);
      if (!res.ok || !res.body) throw new Error(`chat ${res.status}`);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
      }
      /* Sınav isteminde işaret satırı olmamalı; olursa yine de ayıklanır. Gövde
         boşsa ham metne DÜŞÜLMÜYOR (QA F-0002: balonda "[SAY] …" görünüyordu):
         işaretsiz istemde işaretli satır rolün kendi cümlesi, işaretsiz alınıyor.
         Mobil `ConversationScoredScreen` aynı kural. */
      const parsedAcc = parseReply(acc);
      const body = parsedAcc.body.trim() || parsedAcc.suggestions.join(" ").trim();
      inFlight.current = false;
      setBusy(false);
      // Cevap gelene kadar sınav yeniden kurulduysa ya da puanlama başladıysa bu cevap artık yok.
      if (attempt.current !== run || scored.current) return;
      const all: Turn[] = [...next, { role: "assistant", content: body }];
      putTurns(all);
      if (n >= SCORED_TURNS) {
        speakGerman(body, () => {
          if (attempt.current === run) void score(all);
        });
        clearFallback();
        fallback.current = setTimeout(() => {
          fallback.current = null;
          if (attempt.current === run) void score(all);
        }, 6000);
      } else speakGerman(body);
    } catch (err) {
      console.error("[conversation-scored]", err);
      inFlight.current = false;
      setBusy(false);
      if (attempt.current !== run || scored.current) return;
      if (n >= 2) void score(next);
      else setPhase("error");
    }
  }

  const scored = useRef(false);

  /*
   * SINAVI BASTAN KURAN TEK YER.
   *
   * `deadline` REF'I DE SIFIRLANMALI. Sayac `left`ten degil `deadline.current`
   * tan okuyor (`if (!deadline.current)` bir kez kuruyor); yalnizca
   * `setLeft(SCORED_SECONDS)` yazmak ilk tik'te ezilir ve sinav ANINDA biter.
   * Android sonuc ekranindaki "Tekrar dene" tam bu yuzden bozuktu: dokunan
   * kullanici sifir turluk, aninda bitmis bir sinav aliyordu. Web ayni yerde
   * `location.reload()` cagiriyordu - bozuk degil ama sayfanin tamamini
   * yeniden yukleyen bir cekic. Iki yuzey de artik ayni sifirlamayi kullaniyor
   * (hata dali ve sonuc ekrani).
   */
  const restart = useCallback(() => {
    // Önceki denemenin geç gelen cevabı, okuması ve yedek sayacı yeni denemeye karışmasın.
    attempt.current++;
    micToken.current++;
    rec.current?.abort();
    rec.current = null;
    setListening(false);
    if (fallback.current) clearTimeout(fallback.current);
    fallback.current = null;
    inFlight.current = false;
    setBusy(false);
    turnsRef.current = [];
    scored.current = false;
    deadline.current = 0;
    setResult(null);
    setFailure(null);
    setConsentOff(false);
    setTurns([]);
    setDraft("");
    setLeft(SCORED_SECONDS);
    setPhase("intro");
  }, []);

  async function score(all: Turn[]) {
    if (scored.current) return;
    scored.current = true;
    const run = attempt.current;
    clearFallback();
    // Puanlama başladıktan sonra söylenen tur gönderilmiyor.
    stopMic();
    stopSpeaking();
    setPhase("scoring");
    const said = all.filter((t) => t.role === "user").map((t) => t.content);
    const req: AssessRequest = {
      kind: "chat",
      level: conversation.level as AssessLevel,
      task: {
        prompt: t("assess.ai_scored_chat", { scene: conversation.chat.scene, partner: conversation.chat.partner }),
        targets: conversation.patterns.map((p) => p.de),
        constraints: [t("assess.ai_turns", { n: SCORED_TURNS }), t("assess.ai_no_help")],
      },
      answer: { text: said.join("\n"), transcript: said },
      exerciseId: `${conversation.id}:scored`,
      /* Hedef dil: verilmezse uç Almancaya düşüyor ve seviye beklentileri
         Almanca rubriğinden geliyor — İngilizce konuşmanın puanlı kısım
         yanlış ölçütle puanlanırdı (bkz. `api/assess`). */
      lang: targetLangOf(conversation.course),
    };
    /* Konuşmanın tamamı gönderiliyor: tavan tek cümlelik değerlendirmeden
       uzun (bkz. `lib/assess-client`). */
    const ai = await askAssess(req, { timeoutMs: ASSESS_CHAT_TIMEOUT_MS });
    if (attempt.current !== run) return; // puanlanırken sayfadan çıkıldı
    if (ai.ok) setResult(ai.result);
    else {
      setResult(fallbackAssessment(req, t));
      setFailure(ai.reason);
    }
    track("nav", said.length, "conversation_scored:done");
    setPhase("result");
  }

  async function listen() {
    if (listening || inFlight.current || phaseRef.current !== "talk") return;
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    const token = ++micToken.current;
    if ((await requestMicrophone()) !== "granted") {
      setAsr(false);
      return;
    }
    if (micToken.current !== token) return; // izin beklenirken kesildi ya da ikinci dokunuş
    const r = new Ctor();
    // Yerel kod kurs kayıt defterinden: elle yazılan ternary İngilizce kursta
    // tanıyıcıyı Almancaya kuruyordu (bkz. `lib/courses` `speechLocale`).
    r.lang = speechLocaleOf(conversation.course);
    r.interimResults = true;
    r.maxAlternatives = 1;
    r.continuous = false;
    let finalText = "";
    r.onresult = (e) => {
      if (micToken.current !== token) return;
      let s = "";
      for (let i = 0; i < e.results.length; i++) s += e.results[i][0].transcript + " ";
      finalText = s.trim();
      setDraft(finalText);
    };
    r.onerror = () => {
      if (micToken.current === token) setListening(false);
    };
    r.onend = () => {
      // Kesilen dinleme (Gönder, puanlama, tekrar dene) sözünü göndermiyor.
      if (micToken.current !== token) return;
      setListening(false);
      rec.current = null;
      if (finalText) void send(finalText);
    };
    rec.current = r;
    stopSpeaking();
    setListening(true);
    r.start();
  }

  const mm = Math.floor(Math.max(0, left) / 60);
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");

  if (locked) {
    return (
      <FlowColumn>
        <UnlockProgress copy={quota?.view.copy ?? null} title={{ key: "unlock.locked_conv" }} />
        {/* Tek çıkış metin bağlantısı "Kapat" (`FlowActions` `close`), öteki bilgi ekranlarıyla aynı. */}
        <FlowActions close="/immersion" />
      </FlowColumn>
    );
  }

  if (phase === "intro") {
    return (
      /* KAPAK ŞABLONU: ikon karosu · konuşmanın adı · sınavın adı · sahne · ikonlu
         kurallar · kalıplar kartı · Başla / Kapat. Kurallar "·" ile başlayan
         soluk satırlardı ve kalıplar o listenin dördüncü "kuralı" gibi okunuyordu. */
      <FlowColumn>
        <CoachLine moment="scored_intro" />
        <CoverBody
          icon={<ConversationIcon size={28} />}
          tint="var(--color-brand-500)"
          /* `lang`: üst satır büyük harf; Türkçe yerelde "i" → "İ" olmasın. */
          eyebrow={
            <>
              <span lang={conversation.course}>{conversation.title}</span> · {conversation.titleTr}
            </>
          }
          title={t("scored.title")}
          pitch={conversation.chat.scene}
          rules={[
            { icon: <DurationIcon size={16} />, text: t("scored.rule_time", { turns: SCORED_TURNS, minutes: SCORED_SECONDS / 60 }) },
            { icon: <NoGoingBackIcon size={16} />, text: t("scored.rule_partner") },
            { icon: <ScoreTargetIcon size={16} />, text: t("scored.rule_scoring") },
          ]}
        >
          {conversation.patterns.length ? (
            <DetailCard title={t("scored.patterns_title")}>
              {conversation.patterns.map((p) => (
                <DetailRow key={p.de} left={p.de} right={p.tr} lang={conversation.course} />
              ))}
            </DetailCard>
          ) : null}
        </CoverBody>
        <FlowActions primary={{ label: t("scored.start"), onClick: start }} close={`/conversations/${conversation.id}`} />
      </FlowColumn>
    );
  }

  if (phase === "scoring") {
    return (
      /* DURUM ŞABLONU: düşünen maskot + dönen gösterge. Android aynı dalda
         `ActivityIndicator` çiziyor; webde bekleme hareketsizdi. */
      <FlowColumn>
        <div aria-busy="true">
          <StateBody title={t("item.mono_scoring")} body={t("scored.scoring_note", { n: userTurns })}>
            <span
              aria-hidden
              className="mx-auto block h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"
              style={{ borderColor: "var(--color-brand)", borderTopColor: "transparent" }}
            />
          </StateBody>
        </div>
      </FlowColumn>
    );
  }

  if (phase === "error") {
    return (
      /* YERINDE TEKRAR DENEME. Bu dala yalniz muhatap servisi ILK iki turda
         dusunce giriliyor (`send`: `n >= 2` ise konusma puanlaniyor), yani
         olculmus hicbir sey YOK - sinav bastan baslayabilir. Tek cikis
         "konusmaya don"du ve o, gecici bir ag kesintisinde girisi
         kaybettiriyordu. İzin verilmediyse servis kapalı DEĞİL: sebep kendi
         cümlesiyle söyleniyor (bkz. `consentOff`). Hata `alert` ile duyuruluyor. */
      <FlowColumn>
        <StateBody alert title={t("scored.cant_run")} body={!consentOff ? t("scored.service_down") : t("assess.fail_consent")} />
        <FlowActions primary={{ label: t("common.try_again"), onClick: restart }} close={`/conversations/${conversation.id}`} />
      </FlowColumn>
    );
  }

  if (phase === "result" && result) {
    const said = turns.filter((t) => t.role === "user").map((t) => t.content);
    const errorTexts = new Set(result.errors.map((e) => e.wrong.trim().toLowerCase()).filter(Boolean));
    const best = said
      .filter((s) => ![...errorTexts].some((w) => s.toLowerCase().includes(w)))
      .sort((a, b) => b.length - a.length)
      .slice(0, 2);
    const byType = new Map<ErrorType, number>();
    for (const e of result.errors) byType.set(e.type, (byType.get(e.type) ?? 0) + 1);
    const topErrors = [...byType].sort((a, b) => b[1] - a[1]).slice(0, 2);
    const passed = result.score.overall >= SCORED_PASS_SCORE;
    /* Eşiğin altındaysa birincil düğme "Tekrar dene". */
    const retry = { label: t("common.try_again"), onClick: restart };
    const leave = { label: t("common.close"), href: `/conversations/${conversation.id}` };
    return (
      /*
        SONUÇ ŞABLONU: band → üç sayı → notlar → ayrıntı kartları → tek
        birincil düğme. PUAN HALKASI KALKTI: bandın ana sayısı aynı bilgiyi
        veriyor (Android aynı yerde aynı bandı çiziyor). Band `role="status"`
        taşıyor, sonuç duyuruluyor. Konfeti yalnız geçince.
      */
      <FlowColumn celebrate={passed}>
        <ResultHero
          eyebrow={t("scored.title")}
          title={t(passed ? "exam.passed" : "exam.not_passed")}
          figure={formatPercent(result.score.overall, lang)}
          sub={
            <>
              <span lang={conversation.course}>{conversation.title}</span> · {t("conversationp.n_turns", { n: userTurns })}
            </>
          }
          /* Nomi bandın ALTINDA konuşuyor (koç balonu). */
          pill={{ text: t("scored.below_threshold", { n: SCORED_PASS_SCORE }), tone: passed ? "ok" : "bad" }}
          quiet={!passed}
        />
        <CoachLine moment={passed ? "scored_pass" : "scored_fail"} vars={{ pct: result.score.overall, level: conversation.level }} />
        <StatRow
          items={[
            { value: String(userTurns), label: t("scored.stat_turns") },
            { value: `${result.score.task}/4`, label: t("assess.task") },
            { value: String(result.errors.length), label: t("scored.stat_errors"), tone: result.errors.length ? null : "ok" },
          ]}
        />
        {topErrors.length ? (
          <FlowNote
            icon={<WarningIcon size={16} />}
            text={`${t("scored.most_common")} ${topErrors.map(([type, n]) => `${t(ERROR_LABEL_KEYS[type])} ×${n}`).join(", ")}`}
          />
        ) : (
          <FlowNote tone="ok" icon={<CorrectIcon size={16} />} text={t("scored.no_errors")} />
        )}
        {cando.length ? (
          <FlowNote
            tone={passed ? "ok" : "neutral"}
            icon={passed ? <CorrectIcon size={16} /> : <ScoreTargetIcon size={16} />}
            text={`${passed ? t("conversationp.i_can") : t("scored.goal")} ${cando.join(" · ")}`}
          />
        ) : null}
        <DetailCard title={t("scored.assessment_title")}>
          <AssessmentCard answer={said.join("\n")} result={result} failure={failure} example={null} reportRef={`scored:${conversation.id}`} />
        </DetailCard>
        {best.length ? (
          <DetailCard title={t("scored.best_sentences")}>
            <ul className="space-y-1">
              {best.map((s) => (
                <li key={s} className="rounded-panel px-3 py-2 text-body surface-2" lang={conversation.course}>
                  {s}
                </li>
              ))}
            </ul>
          </DetailCard>
        ) : null}
        {/* Geçtiyse asıl eylem çıkmak: tek birincil "Kapat", tekrar metin
            bağlantısı. Kaldıysa birincil "Tekrar dene", çıkış "Kapat". */}
        <FlowActions primary={passed ? leave : retry} tertiary={passed ? retry : null} close={passed ? null : leave.href} />
      </FlowColumn>
    );
  }

  return (
    <section className="card mx-auto flex w-full max-w-md flex-col p-4">
      <div className="flex items-center justify-between text-caption">
        <span className="muted">
          {t("scored.turn_of", { n: Math.min(userTurns + 1, SCORED_TURNS), total: SCORED_TURNS })}
        </span>
        <span className="flex items-center gap-1">
          <span className="tabular-nums" style={{ color: left <= 30 ? "var(--color-rose)" : "var(--text-muted)" }}>
            {mm}:{ss}
          </span>
        </span>
      </div>
      <AiNotice variant="character" className="mt-3" />
      <div className="mt-3 space-y-2">
        {turns.map((turn, i) => (
          <div key={i}>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[88%] rounded-panel px-3 py-2.5 text-body leading-relaxed ${turn.role === "user" ? "ml-auto rounded-br-chip brand-gradient text-white" : "rounded-bl-chip surface-2"}`}
              lang={conversation.course}
            >
              {turn.content}
            </motion.p>
            {/* Bildir — konuşma sohbetindeki gibi her yapay zekâ yanıtının altında.
                İlk tur (i = 0) konuşmanın yazılı açılış cümlesi, model çıktısı değil. */}
            {/* İçerik bildirimi: sahne ve yazılı açılış, açılış baloncuğunun
                altında — yapay zekâ yanıtlarının "Bildir"iyle aynı yer ve biçim.
                Başlıktaki bayrak kalktı. Hedef konuşma + kullanıcı tur sayısı. */}
            {turn.role === "assistant" && i === 0 ? (
              <ReportFlag
                className="mt-1"
                surface="scored"
                target={{ type: "conversation", id: conversation.id, sub: String(userTurns) }}
                content={() => snapshot({ scene: conversation.chat.scene, opening: turns[0]?.content })}
              />
            ) : null}
            {turn.role === "assistant" && i > 0 ? (
              <ReportLink
                className="mt-1"
                label={t("conversation.report_this_answer")}
                onClick={() => setReported({ ref: `${conversation.id}:scored:${i}`, text: turn.content })}
              />
            ) : null}
          </div>
        ))}
        {busy ? <p className="muted text-caption">…</p> : null}
        <div ref={endRef} />
      </div>
      <div className="mt-4 flex items-end gap-2">
        {asr ? (
          <button
            type="button"
            onClick={() => void listen()}
            disabled={busy || listening}
            aria-label={t("conversation.mic_talk")}
            className="brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow disabled:opacity-60"
          >
            <SkillSpeakingIcon size={20} />
          </button>
        ) : null}
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          enterKeyHint="send"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault();
              void send(draft);
            }
          }}
          rows={1}
          lang={conversation.course}
          /* Cümle başı büyük, düzeltme kapalı (bkz. `conversation-player`).
             Android tarafında bu alanda da hiçbiri yoktu; iki taraf
             birlikte düzeltildi. */
          autoCapitalize="sentences"
          autoCorrect="off"
          spellCheck={false}
          placeholder={
            listening
              ? t("speak.listening")
              : asr
                ? t("scored.speak_or_type")
                : t("conversation.type_in", { lang: targetName })
          }
          aria-label={
            listening
              ? t("speak.listening")
              : asr
                ? t("scored.speak_or_type")
                : t("conversation.type_in", { lang: targetName })
          }
          disabled={busy}
          className="input max-h-24 min-w-0 flex-1 resize-none py-2 text-body"
        />
        <button type="button" onClick={() => void send(draft)} disabled={busy || !draft.trim()} className="btn btn-primary px-3.5 py-2.5 text-body">
          {t("common.send")}
        </button>
      </div>
      <ReportDialog
        open={reported !== null}
        kind="chat"
        refId={reported?.ref ?? ""}
        content={reported?.text ?? ""}
        onClose={() => setReported(null)}
      />
    </section>
  );
}
