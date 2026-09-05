import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { t } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, SpeakerIcon } from "../ui/icons";
import { RoundView } from "../game/rounds";
import { written } from "../game/skillQuiz";
import { speakTarget } from "../lib/tts";
import { ensureMicPermission, listenOnce } from "../lib/stt";
import { spokenMatches } from "../lib/voiceMatch";
import { currentTargetLocale } from "../lib/courses";
import { api } from "../api/client";
import { todayStr } from "../game/session";
import type { Round } from "../game/session";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

/* ── sunucu sözleşmesi (src/lib/exam-types.ts ile aynı) ────────────────── */

type SectionId = "vocab" | "grammar" | "produce" | "reading" | "listening" | "speaking" | "writing";
const SECTION_ORDER: SectionId[] = ["vocab", "grammar", "produce", "reading", "listening", "speaking", "writing"];
const SECTION_DE: Record<SectionId, string> = {
  vocab: "Wortschatz", grammar: "Grammatik", produce: "Satzbau",
  reading: "Lesen", listening: "Hören", speaking: "Sprechen", writing: "Schreiben",
};
const SECTION_KEY: Record<SectionId, string> = {
  vocab: "exam.sec_vocab", grammar: "exam.sec_grammar", produce: "exam.sec_produce",
  reading: "exam.sec_reading", listening: "exam.sec_listening", speaking: "exam.sec_speaking", writing: "exam.sec_writing",
};

type GrammarItem =
  | { kind: "cell"; id: string; sheet: string; key: string; label: string; options: string[]; answer: number }
  | { kind: "judge"; id: string; statement: string; answer: boolean };
type ProduceItem = { id: string; prompt: string; de: string; accept: string[]; mode: "type" | "order"; chunks?: string[] };
type TextItem = {
  id: string; title: string; titleTr?: string; genre?: string; situation?: string;
  text?: string; segments?: { speaker?: string; text: string }[];
  questions: { text: string; textTr?: string; options: string[]; answer: number }[];
};
type SpeakingItem = { id: string; de: string; tr: string; situation?: string; hint?: string; confusions?: { heard: string[]; fix: string }[] };
type WritingItem = { id: string; task: { prompt: string; checklist: string[]; minWords: number; sample: string } };

type Paper = {
  kind: "module" | "level";
  level: string;
  module: number | null;
  trial: boolean;
  seconds: number;
  cover: { code: string; titleDe: string; titleTr: string; focus: { de: string; tr: string }[] } | null;
  sections: {
    vocab: Round[]; grammar: GrammarItem[]; produce: ProduceItem[];
    reading: TextItem[]; listening: TextItem[]; speaking: SpeakingItem[]; writing: WritingItem[];
  };
};

type Result = { total: number; passed: boolean; trial: boolean; sections: { id: SectionId; pct: number; weight: number }[] };

/**
 * Sınav ekranı — modül ve seviye sınavı.
 *
 * NEDEN VAR: bu ekran mobilde HİÇ yoktu. Sunucu tarafı (kâğıt üretimi,
 * puanlama, geçme eşiği) aylardır çalışıyor ve web'den girilebiliyordu;
 * mobilde `ExamPrepScreen` yalnız beceri egzersizi açıyordu, adı "sınav
 * hazırlık" olduğu hâlde sınavın kendisine giden yol yoktu.
 *
 * Kâğıt sunucudan geliyor (`POST /api/exam {action:"start"}`), bölümler
 * sunucudaki SECTION_ORDER ile aynı sırada yürüyor, sonuç yine sunucuda
 * puanlanıyor (`action:"finish"`). Yani puanlama iki uçta iki kez yazılmadı;
 * mobil yalnız cevapları toplayıp gönderiyor.
 *
 * Bölümler mevcut parçalarla kuruldu: kelime turu için oyunun kendi
 * `RoundView`'ı, konuşma için cihazdaki tanıyıcı + `spokenMatches` (ses
 * sunucuya gitmiyor), yazma için `/api/assess` rubriği. Boş gelen bölüm hiç
 * çizilmiyor — sunucu zaten eksik bölümün ağırlığını kalanlara dağıtıyor.
 */
export function ExamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParams, "Exam">>();
  const level = route.params?.level ?? "A1";
  const moduleIx = route.params?.module ?? null;

  const [paper, setPaper] = useState<Paper | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [phase, setPhase] = useState<"yukleniyor" | "kapak" | "bolum" | "sonuc">("yukleniyor");
  const [secIdx, setSecIdx] = useState(0);
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const score = useRef<Record<SectionId, { correct: number; total: number }>>({
    vocab: { correct: 0, total: 0 }, grammar: { correct: 0, total: 0 }, produce: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 }, listening: { correct: 0, total: 0 }, speaking: { correct: 0, total: 0 }, writing: { correct: 0, total: 0 },
  });
  const speakScores = useRef<number[]>([]);
  const writeScore = useRef<number | null>(null);
  const startedAt = useRef(Date.now());
  const sent = useRef(false);

  useEffect(() => {
    let cancelled = false;
    api<{ paper: Paper }>("/api/exam", {
      method: "POST",
      body: JSON.stringify({ action: "start", level, module: moduleIx, day: todayStr() }),
    })
      .then((d) => {
        if (cancelled) return;
        // Bölüm TOPLAMLARI kâğıt gelince yazılır, bölüm bitince değil. Yoksa
        // süre dolduğunda ulaşılmamış bölüm total=0 gider, sunucu onu atlar ve
        // ağırlığını kalanlara dağıtır — yani sınavı yarıda bırakmak puanı
        // YÜKSELTİRDİ. Web de kâğıt gelince dolduruyor (exam-player).
        for (const id of SECTION_ORDER) score.current[id] = { correct: 0, total: d.paper.sections[id]?.length ?? 0 };
        score.current.reading.total = d.paper.sections.reading.reduce((a, x) => a + x.questions.length, 0);
        score.current.listening.total = d.paper.sections.listening.reduce((a, x) => a + x.questions.length, 0);
        setPaper(d.paper);
        setLeft(d.paper.seconds);
        setPhase("kapak");
      })
      .catch((e: Error) => !cancelled && setErr(e.message || t("exam.could_not_load")));
    return () => { cancelled = true; };
  }, [level, moduleIx]);

  // Süre yalnız sınav sürerken işler; kapakta ve sonuçta durur.
  useEffect(() => {
    if (phase !== "bolum") return;
    const id = setInterval(() => setLeft((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "bolum" && left === 0) void finishExam();
  }, [left, phase]);

  const filledSections = (): SectionId[] =>
    paper ? SECTION_ORDER.filter((s) => (paper.sections[s]?.length ?? 0) > 0) : [];

  async function finishExam() {
    if (sent.current || !paper) return;
    sent.current = true;
    const sections = SECTION_ORDER.map((id) => ({ id, ...score.current[id] })).filter((x) => x.total > 0);
    const sp = speakScores.current.length
      ? Math.round(speakScores.current.reduce((a, b) => a + b, 0) / speakScores.current.length)
      : null;
    try {
      const d = await api<{ result: Result }>("/api/exam", {
        method: "POST",
        body: JSON.stringify({
          action: "finish", level, module: moduleIx, day: todayStr(),
          sections, speakingScore: sp, writingScore: writeScore.current,
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
        }),
      });
      setResult(d.result);
    } catch {
      setResult(null);
    }
    setPhase("sonuc");
  }

  function sectionDone(id: SectionId, correct: number) {
    score.current[id].correct = correct;
    const list = filledSections();
    const i = list.indexOf(id);
    if (i + 1 < list.length) setSecIdx(i + 1);
    else void finishExam();
  }

  const mm = Math.floor(left / 60);
  const ss = String(left % 60).padStart(2, "0");

  const header = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="micro" color={colors.textMuted}>
          {paper?.cover ? `${paper.cover.code} · ${paper.cover.titleTr}` : t("exam.level_exam", { level })}
        </Text>
        <Text variant="h3">{phase === "bolum" ? `${mm}:${ss}` : t("examprep.exam_prep")}</Text>
      </View>
    </View>
  );

  if (err) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{err}</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primary}>{t("item.go_back")}</Text></PressableScale>
      </View>
    );
  }

  if (phase === "yukleniyor" || !paper) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (phase === "kapak") {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }}>
          {paper.cover ? (
            <Card padded style={{ gap: spacing.sm }}>
              <Text variant="h2" style={{ lineHeight: 30 }}>{paper.cover.titleDe}</Text>
              <Text variant="body" color={colors.textMuted}>{paper.cover.titleTr}</Text>
              {paper.cover.focus.map((f, i) => (
                <Text key={i} variant="caption" color={colors.textMuted}>· {f.de} — {f.tr}</Text>
              ))}
            </Card>
          ) : null}
          <Card padded style={{ gap: spacing.xs }}>
            <Text variant="bodyStrong">{t("exam.sections")}</Text>
            {filledSections().map((s) => (
              <Text key={s} variant="caption" color={colors.textMuted}>
                {SECTION_DE[s]} · {t(SECTION_KEY[s])} ({paper.sections[s].length})
              </Text>
            ))}
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>
              {t("exam.minutes", { n: Math.round(paper.seconds / 60) })}
            </Text>
          </Card>
          {paper.trial ? (
            <Card padded><Text variant="caption" color={colors.textMuted}>{t("exam.trial_notice")}</Text></Card>
          ) : null}
          <PressableScale onPress={() => { startedAt.current = Date.now(); setPhase("bolum"); }} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("exam.start")}</Text>
          </PressableScale>
        </ScrollView>
      </View>
    );
  }

  if (phase === "sonuc") {
    const pct = result?.total ?? 0;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {header}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }}>
          <Card padded style={{ alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={!!result?.passed} />
            <Mascot mood={result?.passed ? "celebrate" : "idle"} size={90} />
            <Text variant="h1">%{pct}</Text>
            <Text variant="bodyStrong" color={result?.passed ? colors.success : colors.textMuted}>
              {result ? (result.passed ? t("exam.passed") : t("exam.not_passed")) : t("exam.saved_offline")}
            </Text>
            {result?.trial ? <Text variant="caption" color={colors.textMuted}>{t("exam.trial_notice")}</Text> : null}
          </Card>
          {result?.sections.map((s) => (
            <Card key={s.id} padded style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text variant="body">{SECTION_DE[s.id]} · {t(SECTION_KEY[s.id])}</Text>
              <Text variant="bodyStrong" color={s.pct >= 50 ? colors.success : colors.danger}>%{s.pct}</Text>
            </Card>
          ))}
          <PressableScale onPress={() => nav.goBack()} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.go_back")}</Text>
          </PressableScale>
        </ScrollView>
      </View>
    );
  }

  const list = filledSections();
  const active = list[secIdx];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {header}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>
          {secIdx + 1}/{list.length} · {SECTION_DE[active]} · {t(SECTION_KEY[active])}
        </Text>
      </View>
      <SectionBody
        key={active}
        id={active}
        paper={paper}
        colors={colors}
        insets={insets}
        onSpeakScore={(p) => speakScores.current.push(p)}
        onWriteScore={(p) => { writeScore.current = p; }}
        onTick={(c) => { score.current[active].correct = c; }}
        onDone={(c) => sectionDone(active, c)}
      />
    </View>
  );
}

/* ─────────────────────────── bölümler ─────────────────────────── */

function SectionBody({
  id, paper, colors, insets, onDone, onTick, onSpeakScore, onWriteScore,
}: {
  id: SectionId; paper: Paper; colors: Palette; insets: { bottom: number };
  onDone: (correct: number) => void;
  /** Her maddeden sonra: süre dolarsa yarım bölümün doğruları da sayılsın. */
  onTick: (correct: number) => void;
  onSpeakScore: (p: number) => void;
  onWriteScore: (p: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const correctRef = useRef(0);
  const pad = { paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md };

  function advance(ok: boolean, count: number) {
    if (ok) correctRef.current += 1;
    onTick(correctRef.current);
    if (idx + 1 < count) setIdx(idx + 1);
    else onDone(correctRef.current);
  }

  if (id === "vocab") {
    const r = paper.sections.vocab[idx];
    return (
      <View style={{ flex: 1 }}>
        <RoundView key={r.id} round={r} onDone={(ok) => advance(ok, paper.sections.vocab.length)} />
      </View>
    );
  }

  if (id === "grammar") {
    const it = paper.sections.grammar[idx];
    return (
      <ScrollView contentContainerStyle={pad}>
        {it.kind === "cell" ? (
          <Choice
            key={it.id}
            prompt={`${it.sheet} · ${it.label}`}
            options={it.options}
            answerIdx={it.answer}
            colors={colors}
            onPick={(ok) => advance(ok, paper.sections.grammar.length)}
          />
        ) : (
          <Choice
            key={it.id}
            prompt={it.statement}
            options={[t("common.true"), t("common.false")]}
            answerIdx={it.answer ? 0 : 1}
            colors={colors}
            onPick={(ok) => advance(ok, paper.sections.grammar.length)}
          />
        )}
      </ScrollView>
    );
  }

  if (id === "produce") {
    const it = paper.sections.produce[idx];
    return <Produce key={it.id} it={it} colors={colors} pad={pad} onDone={(ok) => advance(ok, paper.sections.produce.length)} />;
  }

  if (id === "reading" || id === "listening") {
    const items = paper.sections[id];
    return <TextSection key={items[idx].id} it={items[idx]} spoken={id === "listening"} colors={colors} pad={pad}
      onDone={(c) => { correctRef.current += c; onTick(correctRef.current); if (idx + 1 < items.length) setIdx(idx + 1); else onDone(correctRef.current); }} />;
  }

  if (id === "speaking") {
    const it = paper.sections.speaking[idx];
    return <Speak key={it.id} it={it} colors={colors} pad={pad}
      onDone={(ok, score) => { onSpeakScore(score); advance(ok, paper.sections.speaking.length); }} />;
  }

  const w = paper.sections.writing[0];
  return <Write w={w} level={paper.level} colors={colors} pad={pad}
    onDone={(ok, sc) => { onWriteScore(sc); onTick(ok ? 1 : 0); onDone(ok ? 1 : 0); }} />;
}

function Choice({ prompt, options, answerIdx, colors, onPick }: { prompt: string; options: string[]; answerIdx: number; colors: Palette; onPick: (ok: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <Card padded style={{ gap: spacing.sm }}>
      <Text variant="bodyStrong" style={{ lineHeight: 24 }}>{prompt}</Text>
      {options.map((o, i) => {
        const picked = pick !== null;
        const bg = !picked ? colors.surface : i === answerIdx ? colors.success : pick === i ? colors.danger : colors.surface;
        return (
          <PressableScale key={i} disabled={picked} onPress={() => { setPick(i); setTimeout(() => onPick(i === answerIdx), 550); }}
            style={{ backgroundColor: bg, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 13, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={picked && (i === answerIdx || pick === i) ? "#fff" : colors.text}>{o}</Text>
          </PressableScale>
        );
      })}
    </Card>
  );
}

function Produce({ it, colors, pad, onDone }: { it: ProduceItem; colors: Palette; pad: object; onDone: (ok: boolean) => void }) {
  const [typed, setTyped] = useState("");
  const [parts, setParts] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const answer = it.mode === "order" ? parts.map((p) => p.split(":").slice(1).join(":")).join(" ") : typed;
  const ok = written(answer, [it.de, ...it.accept]);

  return (
    <ScrollView contentContainerStyle={pad} keyboardShouldPersistTaps="handled">
      <Card padded style={{ gap: spacing.sm }}>
        <Text variant="bodyStrong" style={{ lineHeight: 24 }}>{it.prompt}</Text>
        {it.mode === "order" ? (
          <>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs, minHeight: 44, backgroundColor: colors.surface, borderRadius: radii.md, padding: spacing.sm }}>
              {parts.map((p, i) => (
                <PressableScale key={p} disabled={done} onPress={() => setParts(parts.filter((_, j) => j !== i))}
                  style={{ backgroundColor: colors.primarySoft, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 6 }}>
                  <Text variant="body" color={colors.primary}>{p.split(":").slice(1).join(":")}</Text>
                </PressableScale>
              ))}
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
              {(it.chunks ?? []).map((c, i) => {
                const key = `${i}:${c}`;
                if (parts.includes(key)) return null;
                return (
                  <PressableScale key={key} disabled={done} onPress={() => setParts([...parts, key])}
                    style={{ backgroundColor: colors.surface2, borderRadius: radii.sm, paddingHorizontal: 10, paddingVertical: 8 }}>
                    <Text variant="body">{c}</Text>
                  </PressableScale>
                );
              })}
            </View>
          </>
        ) : (
          <TextInput value={typed} onChangeText={setTyped} editable={!done} multiline autoCapitalize="sentences"
            placeholder={t("exam.write_sentence")} placeholderTextColor={colors.textFaint}
            style={{ minHeight: 52, backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: done ? (ok ? colors.success : colors.danger) : colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        )}
        {done ? (
          <Text variant="caption" color={colors.textMuted}>{t("common.answer_is")} <Text variant="caption" style={{ fontWeight: "700" }}>{it.de}</Text></Text>
        ) : null}
        <PressableScale
          disabled={!answer.trim() && !done}
          onPress={() => (done ? onDone(ok) : setDone(true))}
          style={{ backgroundColor: answer.trim() || done ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
          <Text variant="bodyStrong" color={answer.trim() || done ? colors.onPrimary : colors.textFaint}>
            {done ? t("common.next") : t("skillquiz.check")}
          </Text>
        </PressableScale>
      </Card>
    </ScrollView>
  );
}

function TextSection({ it, spoken, colors, pad, onDone }: { it: TextItem; spoken: boolean; colors: Palette; pad: object; onDone: (correct: number, total: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => it.questions.map(() => null));
  const allAnswered = answers.every((a) => a !== null);
  const correctRef = answers.filter((a, i) => a === it.questions[i].answer).length;
  return (
    <ScrollView contentContainerStyle={pad}>
      <Card padded style={{ gap: spacing.xs }}>
        <Text variant="bodyStrong">{it.title}</Text>
        {it.genre || it.situation ? <Text variant="caption" color={colors.textMuted}>{it.situation ?? it.genre}</Text> : null}
        {it.text ? <Text variant="body" style={{ lineHeight: 23, marginTop: spacing.xs }}>{it.text}</Text> : null}
        {it.segments?.map((s, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginTop: spacing.xs }}>
            <PressableScale onPress={() => void speakTarget(s.text)} hitSlop={6}><SpeakerIcon color={colors.textMuted} size={18} /></PressableScale>
            <Text variant="body" style={{ flex: 1, lineHeight: 22 }}>{spoken ? (s.speaker ? `${s.speaker}: ` : "") + s.text : s.text}</Text>
          </View>
        ))}
      </Card>
      {it.questions.map((q, qi) => (
        <Card key={qi} padded style={{ gap: spacing.sm }}>
          <Text variant="bodyStrong" style={{ lineHeight: 23 }}>{q.textTr ?? q.text}</Text>
          {q.options.map((o, oi) => {
            const picked = answers[qi] !== null;
            const bg = !picked ? colors.surface : oi === q.answer ? colors.success : answers[qi] === oi ? colors.danger : colors.surface;
            return (
              <PressableScale key={oi} disabled={picked} onPress={() => setAnswers(answers.map((a, i) => (i === qi ? oi : a)))}
                style={{ backgroundColor: bg, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 12, paddingHorizontal: spacing.md }}>
                <Text variant="body" color={picked && (oi === q.answer || answers[qi] === oi) ? "#fff" : colors.text}>{o}</Text>
              </PressableScale>
            );
          })}
        </Card>
      ))}
      {allAnswered ? (
        <PressableScale onPress={() => onDone(correctRef, it.questions.length)} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
        </PressableScale>
      ) : null}
    </ScrollView>
  );
}

function Speak({ it, colors, pad, onDone }: { it: SpeakingItem; colors: Palette; pad: object; onDone: (ok: boolean, score: number) => void }) {
  const [phase, setPhase] = useState<"idle" | "rec" | "done" | "err">("idle");
  const [heard, setHeard] = useState("");
  const [tip, setTip] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function listen() {
    if (phase === "rec") return;
    if (!(await ensureMicPermission())) { setTip(t("speak.mic_needed")); setPhase("err"); return; }
    setPhase("rec"); setTip(null);
    const heard = await listenOnce(currentTargetLocale(), 8000);
    if (!heard?.length) { setTip(t("speak.not_heard")); setPhase("err"); return; }
    setHeard(heard[0]);
    const ok = spokenMatches(heard, [it.de]);
    setOk(ok);
    if (!ok) {
      const lowered = heard.map((h) => h.toLowerCase());
      setTip((it.confusions ?? []).find((c) => c.heard.some((x) => lowered.some((h) => h.includes(x.toLowerCase()))))?.fix ?? it.hint ?? null);
    }
    setPhase("done");
  }

  return (
    <ScrollView contentContainerStyle={pad}>
      <Card padded style={{ gap: spacing.sm }}>
        {it.situation ? <Text variant="caption" color={colors.textMuted}>{it.situation}</Text> : null}
        <View style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
          <Text variant="h3" style={{ flex: 1 }}>{it.de}</Text>
          <PressableScale onPress={() => void speakTarget(it.de)} hitSlop={6}><SpeakerIcon color={colors.textMuted} size={20} /></PressableScale>
        </View>
        <Text variant="body" color={colors.textMuted}>{it.tr}</Text>
        {heard ? <Text variant="caption" color={colors.textMuted}>{t("speak.heard")}: {heard}</Text> : null}
        {phase === "done" ? (
          <Text variant="bodyStrong" color={ok ? colors.success : colors.danger}>{ok ? t("speak.correct") : t("exam.speak_missed")}</Text>
        ) : null}
        {tip ? <Text variant="body" style={{ backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.sm, lineHeight: 20 }}>{tip}</Text> : null}
        {phase === "rec" ? (
          <Text variant="bodyStrong" color={colors.primary} style={{ textAlign: "center", paddingVertical: 14 }}>{t("speak.listening")}</Text>
        ) : phase === "done" ? (
          <PressableScale onPress={() => onDone(ok, ok ? 100 : 0)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
          </PressableScale>
        ) : (
          <PressableScale onPress={() => void listen()} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("speak.record")}</Text>
          </PressableScale>
        )}
      </Card>
    </ScrollView>
  );
}

function Write({ w, level, colors, pad, onDone }: { w: WritingItem; level: string; colors: Palette; pad: object; onDone: (ok: boolean, score: number) => void }) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const wordCount = typed.trim() ? typed.trim().split(/\s+/).length : 0;

  async function evaluate() {
    if (busy || wordCount < 5) return;
    setBusy(true);
    try {
      const d = await api<{ result: { score?: { overall?: number } } }>("/api/assess", {
        method: "POST",
        body: JSON.stringify({
          kind: "writing", level,
          task: { prompt: w.task.prompt, constraints: [...w.task.checklist, `en az ${w.task.minWords} wordCount`] },
          answer: { text: typed.trim() }, locale: "tr",
        }),
      });
      setScore(d.result?.score?.overall ?? null);
    } catch {
      // Sağlayıcı yoksa ya da ağ yoksa sınav durmaz: kelime sayısı ölçütüyle
      // geçici puan verilir, sunucu yine kendi sınırlarını uygular.
      setScore(wordCount >= w.task.minWords ? 70 : 40);
    }
    setBusy(false);
  }

  return (
    <ScrollView contentContainerStyle={pad} keyboardShouldPersistTaps="handled">
      <Card padded style={{ gap: spacing.sm }}>
        <Text variant="bodyStrong" style={{ lineHeight: 23 }}>{w.task.prompt}</Text>
        {w.task.checklist.map((c, i) => (
          <Text key={i} variant="caption" color={colors.textMuted}>· {c}</Text>
        ))}
        <TextInput value={typed} onChangeText={setTyped} editable={score === null} multiline autoCapitalize="sentences"
          placeholder={t("exam.write_text")} placeholderTextColor={colors.textFaint}
          style={{ minHeight: 140, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        <Text variant="caption" color={colors.textMuted}>{wordCount} / {w.task.minWords}</Text>
        {score !== null ? (
          <>
            <Text variant="bodyStrong" color={score >= 60 ? colors.success : colors.danger}>%{score}</Text>
            <PressableScale onPress={() => onDone(score >= 60, score)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.finish")}</Text>
            </PressableScale>
          </>
        ) : (
          <PressableScale disabled={busy || wordCount < 5} onPress={() => void evaluate()}
            style={{ backgroundColor: wordCount >= 5 && !busy ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={wordCount >= 5 && !busy ? colors.onPrimary : colors.textFaint}>
              {busy ? t("exam.evaluating") : t("skillquiz.check")}
            </Text>
          </PressableScale>
        )}
      </Card>
    </ScrollView>
  );
}
