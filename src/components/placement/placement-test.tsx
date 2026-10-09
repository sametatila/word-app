"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { T, fillX, staggerDelay } from "@/lib/motion";
import { apiFetch } from "@/lib/api-fetch";
import { RoundExit } from "@/components/round-exit";
import { FlowColumn, FlowActions, FlowNote, ResultHero, DetailCard, CoverBody, StateBody } from "@/components/flow";
import { CorrectIcon, DontGuessIcon, DurationIcon, GamePluralIcon, PlacementIcon, SpeakerIcon, WarningIcon } from "@/components/icons";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useLeaveGuard } from "@/lib/use-leave-guard";
import { dialogueSegments, speakSegments } from "@/components/speak-button";
import { useT } from "@/lib/i18n/client";
import { useCourse } from "@/components/app-shell";
import { courseOrDefault } from "@/lib/courses";
import { readOnboardingPrefs, saveOnboardingPrefs } from "@/lib/onboarding-prefs";
import { formatDay, type NativeLang } from "@/lib/i18n/dict";
import { useLang } from "@/lib/i18n/client";
import { localDay } from "@/lib/day";
import { track } from "@/lib/track";
import { play } from "@/lib/sfx";
import { PLACEMENT_BANK, type PlacementItem } from "@/lib/placement-bank";
import type { PlacementRecord } from "@/lib/placement";
import { LEVELS, adjustable, newSession, nextItem, result, sampleCards, shouldStop, type Level, type Result, type Session } from "@/lib/placement-engine";

/**
 * SEVİYE TESTİ v2 (docs/plan/placement-v2.md) — mobil `PlacementScreen` ile aynı akış:
 * kendini değerlendirme → kelime kartları → uyarlanabilir sorular → sonuç (±1 seçim).
 * Misafir (`/level-test`) ve hesaplı kullanıcı (`/placement`) aynı testi çözer. Sonuç sunucuda
 * aynı motorla yeniden hesaplanıp kaydedilir (`/api/placement` `record`); misafirin cevapları
 * onboarding tercihlerinde bekler, hesap açılınca `OnboardingAdopt` gönderir.
 */
type Phase = "cover" | "self" | "cards" | "items" | "result" | "zero";

/* Anahtarlar AÇIK yazılı: çeviri kapısı dinamik kurulan anahtarı göremez. */
const SELF_KEY: Record<Level, string> = {
  A1: "plc2.self_A1", A2: "plc2.self_A2", B1: "plc2.self_B1", B2: "plc2.self_B2", C1: "plc2.self_C1",
};
const CAN_DO_KEYS: Record<Level, [string, string, string]> = {
  A1: ["plc2.cando_A1_1", "plc2.cando_A1_2", "plc2.cando_A1_3"],
  A2: ["plc2.cando_A2_1", "plc2.cando_A2_2", "plc2.cando_A2_3"],
  B1: ["plc2.cando_B1_1", "plc2.cando_B1_2", "plc2.cando_B1_3"],
  B2: ["plc2.cando_B2_1", "plc2.cando_B2_2", "plc2.cando_B2_3"],
  C1: ["plc2.cando_C1_1", "plc2.cando_C1_2", "plc2.cando_C1_3"],
};

export type PlacementTestProps = {
  /** Hesaplı kullanıcı: sonuç sunucuya; misafir: tercihlere, sonra kayıt. */
  signedIn: boolean;
  /** Bekleme süresi (30 gün) dolmadıysa test açılmaz. */
  canRetake?: boolean;
  retakeDays?: number;
  last?: PlacementRecord | null;
  onClose?: () => void;
};

export function PlacementTest({ signedIn, canRetake = true, retakeDays = 30, last = null, onClose }: PlacementTestProps) {
  const t = useT();
  const ui = useLang() as NativeLang;
  const router = useRouter();
  const shellCourse = useCourse();
  /* Misafirin kursu sunucuda yok: onboarding'de seçilip tercihlere yazılmıştı. */
  const course = signedIn ? shellCourse : courseOrDefault(readOnboardingPrefs().course).id;
  const lang = courseOrDefault(course).targetLang;
  const bank = PLACEMENT_BANK[lang];

  const [phase, setPhase] = useState<Phase>("cover");
  const session = useRef<Session | null>(null);
  const cards = useRef(bank.cards);
  const [cardIdx, setCardIdx] = useState(0);
  const [item, setItem] = useState<PlacementItem | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  const [res, setRes] = useState<Result | null>(null);
  const [chosen, setChosen] = useState<Level | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notSaved, setNotSaved] = useState(false);
  const inTest = phase === "self" || phase === "cards" || phase === "items";
  const ayril = useLeaveGuard(inTest);
  const [askQuit, setAskQuit] = useState(false);

  function leave() {
    if (onClose) onClose();
    else router.push(signedIn ? "/" : "/login?mode=signup");
  }

  function say(text: string) {
    speakSegments(dialogueSegments(course, [{ text }]));
  }

  function start() {
    track("exam_start", 0, "placement:v2");
    setPhase("self");
  }

  function pickSelf(level: Level | null) {
    if (!level) { setChosen("A1"); setPhase("zero"); return; }
    cards.current = sampleCards(bank.cards);
    session.current = newSession(level, cards.current, {}, true);
    setCardIdx(0);
    setPhase("cards");
  }

  function answerCard(know: boolean) {
    const s = session.current;
    const c = cards.current[cardIdx];
    if (!s || !c) return;
    s.known[c.id] = know;
    if (cardIdx + 1 < cards.current.length) { setCardIdx(cardIdx + 1); return; }
    setPhase("items");
    advance();
  }

  function advance() {
    const s = session.current;
    if (!s) return;
    const map = new Map(bank.items.map((it) => [it.id, it]));
    const nx = shouldStop(s, map) ? null : (nextItem(s, bank.items) as PlacementItem | null);
    if (!nx) { finish(); return; }
    setPicked(null);
    setItem(nx);
    if (nx.kind === "listening" && nx.audio) say(nx.audio);
  }

  function answerItem(choice: number | "dontknow") {
    const s = session.current;
    if (!s || !item || picked !== null) return;
    if (choice === "dontknow") { s.responses.push({ id: item.id, choice }); advance(); return; }
    /* ÖLÇÜM KİPİ: yalnız seçim işaretlenir, doğruluk gösterilmez (test öğretmez, ölçer). */
    setPicked(choice);
    /* 500 ms: mobil `ChoiceGame` ölçüm kipiyle aynı bekleme (seçim görünsün, sonra geçilsin). */
    setTimeout(() => { s.responses.push({ id: item.id, choice }); advance(); }, 500);
  }

  function cantListen() {
    const s = session.current;
    if (!s) return;
    s.audio = false;
    advance();
  }

  function finish() {
    const s = session.current;
    if (!s) return;
    const r = result(s, bank.items);
    play("finish");
    setRes(r);
    setChosen(r.level);
    setItem(null);
    setPhase("result");
  }

  async function apply() {
    const level = chosen ?? "A1";
    setSaving(true);
    const s = session.current;
    const payload = s ? { lang, self: s.self, audio: s.audio, known: s.known, responses: s.responses } : null;
    if (!signedIn) {
      if (res) track("placement_finish", res.items, `v2:${res.level}`);
      saveOnboardingPrefs({ level, ...(payload ? { placement: payload } : {}) });
    } else {
      let ok = false;
      if (payload) {
        try {
          const r = await apiFetch("/api/placement", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "record", ...payload, accepted: level, day: localDay() }) });
          ok = r.ok;
        } catch { /* aşağıda not */ }
      }
      /* Profil yine yazılır: kayıt düşse de seçilen seviye uygulanmalı. */
      try { await apiFetch("/api/profile", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ level }) }); } catch { /* yut */ }
      if (payload && !ok) setNotSaved(true);
      router.refresh();
    }
    setSaving(false);
    setSaved(true);
    setTimeout(leave, 700);
  }

  if (signedIn && !canRetake) {
    return (
      <FlowColumn className="px-4 py-6">
        <StateBody title={t("placement.title")} body={t("placement.retake_in", { n: retakeDays })} />
        {last ? (
          <p className="muted text-center text-caption">
            {`${t("placement.last_taken", { date: formatDay(last.at, ui, { year: true }) })} ${last.suggested}${last.accepted ? ` ${t("placement.you_chose", { level: last.accepted })}` : ""}`}
          </p>
        ) : null}
        <FlowActions primary={{ label: t("common.close"), onClick: leave }} />
      </FlowColumn>
    );
  }

  if (phase === "cover") {
    return (
      <FlowColumn className="px-4 py-6">
        <CoverBody
          icon={<PlacementIcon size={28} />}
          tint="var(--color-brand-500)"
          eyebrow={t("placement.title")}
          title={t("plc2.cover_title")}
          pitch={t("plc2.cover_pitch")}
          rules={[
            { icon: <GamePluralIcon size={16} />, text: t("plc2.rule_parts") },
            { icon: <DurationIcon size={16} />, text: t("plc2.rule_adapt") },
            { icon: <DontGuessIcon size={16} />, text: t("plc2.rule_dont_know") },
            { icon: <CorrectIcon size={16} />, text: t("plc2.rule_choose"), tone: "ok" },
          ]}
        />
        <FlowActions primary={{ label: t("common.start"), onClick: start }} close={leave} />
      </FlowColumn>
    );
  }

  if (phase === "zero" || phase === "result") {
    const level = chosen ?? "A1";
    const options = res ? adjustable(res.level) : [];
    return (
      <FlowColumn className="px-4 py-6">
        {phase === "zero" ? (
          <ResultHero eyebrow={t("placement.title")} title={t("plc2.zero_title")} figure="A1" sub={t("plc2.zero_body")} />
        ) : (
          <ResultHero eyebrow={t("placement.title")} title={t("placement.your_level", { level: res!.level })} figure={res!.level} sub={res!.near ? t("plc2.near", { level: res!.near }) : null} />
        )}
        {notSaved ? <FlowNote tone="bad" icon={<WarningIcon size={16} />} text={t("placement.not_saved")} /> : null}
        {saved ? (
          <div role="status">
            <FlowNote tone="ok" icon={<CorrectIcon size={16} />} text={t("placement.saved")} />
          </div>
        ) : null}
        <DetailCard title={`${t("plc2.cando_title")} · ${level}`}>
          <ul className="grid gap-2">
            {CAN_DO_KEYS[level].map((k) => (
              <li key={k} className="flex items-start gap-2">
                <CorrectIcon size={16} className="mt-1 shrink-0 text-success" />
                <span>{t(k)}</span>
              </li>
            ))}
          </ul>
        </DetailCard>
        {options.length > 1 ? (
          <DetailCard title={t("plc2.adjust_title")}>
            <div role="radiogroup" aria-label={t("plc2.adjust_title")} className="grid gap-2">
              {options.map((l) => {
                const i = LEVELS.indexOf(l) - LEVELS.indexOf(res!.level);
                const label = i === 0 ? `${l} · ${t("placement.suggested")}` : t(i < 0 ? "plc2.adjust_lower" : "plc2.adjust_higher", { level: l });
                return (
                  <button key={l} type="button" role="radio" aria-checked={l === level} onClick={() => setChosen(l)} className={`option px-3.5 py-3 text-left ${l === level ? "option-picked text-strong" : ""}`}>
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="muted text-caption">{t("plc2.adjust_note")}</p>
          </DetailCard>
        ) : null}
        <FlowActions primary={{ label: t("plc2.start_with", { level }), onClick: () => void apply(), disabled: saving || saved }} close={leave} />
      </FlowColumn>
    );
  }

  const s = session.current;
  const progress = phase === "self" ? 0
    : phase === "cards" ? 40 * (cardIdx / Math.max(1, cards.current.length))
    : 40 + 60 * Math.min(1, (s?.responses.length ?? 0) / 13);
  const partLabel = phase === "items" ? t("plc2.part_questions") : phase === "cards" ? t("plc2.part_words") : "";

  return (
    <section className="mx-auto w-full max-w-md px-4 py-4">
      <div className="mb-6 flex items-center gap-3">
        <RoundExit onExit={() => setAskQuit(true)} labelKey="plc.quit_title" />
        <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full surface-2">
          <motion.div className="brand-gradient h-full w-full rounded-full" initial={false} animate={{ x: fillX(Math.round(progress)) }} transition={T.medium} />
        </div>
        <span className="muted shrink-0 text-caption">{partLabel}</span>
      </div>

      {phase === "self" ? (
        <div className="grid gap-2">
          <h1 className="text-h1">{t("plc2.self_title")}</h1>
          <p className="muted mb-2">{t("plc2.self_sub", { lang: courseOrDefault(course).label[ui] })}</p>
          {LEVELS.map((l) => (
            <button key={l} type="button" onClick={() => pickSelf(l)} className="option px-4 py-4 text-left">
              {t(SELF_KEY[l])}
            </button>
          ))}
          <button type="button" onClick={() => pickSelf(null)} className="link py-3 text-center text-strong">
            {t("plc2.self_none")}
          </button>
        </div>
      ) : null}

      {phase === "cards" && cards.current[cardIdx] ? (
        <div className="flex min-h-[50vh] flex-col">
          <h1 className="text-center text-h2">{t("plc2.cards_title")}</h1>
          <p className="muted mt-1 text-center text-caption">{t("plc2.cards_hint")}</p>
          <p className="flex flex-1 items-center justify-center text-center text-display" lang={lang}>
            {cards.current[cardIdx].word}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => answerCard(false)} className="btn btn-ghost py-4">{t("plc.dont_know")}</button>
            <button type="button" onClick={() => answerCard(true)} className="btn btn-primary py-4">{t("plc2.know")}</button>
          </div>
        </div>
      ) : null}

      {phase === "items" && item ? (
        <div className="card p-5">
          <p className="muted mb-2 text-caption">
            {t(item.kind === "cloze" ? "plc2.q_cloze" : item.kind === "reading" ? "plc2.q_reading" : "plc2.q_listening")}
          </p>
          {item.kind === "reading" && item.text ? <p className="surface-2 mb-4 rounded-panel p-4" lang={lang}>{item.text}</p> : null}
          {item.kind === "listening" && item.audio ? (
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => say(item.audio!)} className="btn btn-ghost inline-flex items-center gap-2 px-3 py-2">
                <SpeakerIcon size={20} />
                {t("plc2.listen_again")}
              </button>
              <button type="button" onClick={cantListen} className="link text-caption">{t("plc2.cant_listen")}</button>
            </div>
          ) : null}
          <p className="mb-4 text-h1" lang={lang}>{item.kind === "cloze" ? item.text : item.question}</p>
          <div role="radiogroup" aria-label={item.kind === "cloze" ? item.text : item.question} className="grid gap-2">
            {item.options.map((o, i) => (
              <motion.button
                key={`${item.id}-${o}`}
                type="button"
                role="radio"
                aria-checked={picked === i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: staggerDelay(i) }}
                disabled={picked !== null}
                onClick={() => answerItem(i)}
                className={`option px-3.5 py-3 text-left text-strong ${picked === i ? "option-picked" : ""}`}
                lang={lang}
              >
                {o}
              </motion.button>
            ))}
          </div>
          <button type="button" onClick={() => answerItem("dontknow")} disabled={picked !== null} className="btn btn-ghost mt-3 w-full px-4 py-2.5 text-body">
            {t("plc.dont_know")}
          </button>
        </div>
      ) : null}

      <ConfirmDialog
        open={askQuit || ayril.pending !== null}
        title={t("plc.quit_title")}
        message={t("plc.quit_body")}
        confirmLabel={t("common.exit")}
        destructive
        onConfirm={() => { setAskQuit(false); if (ayril.pending) ayril.leave(); else leave(); }}
        onCancel={() => { setAskQuit(false); ayril.stay(); }}
      />
    </section>
  );
}
