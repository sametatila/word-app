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
  const modul = route.params?.module ?? null;

  const [paper, setPaper] = useState<Paper | null>(null);
  const [hata, setHata] = useState<string | null>(null);
  const [faz, setFaz] = useState<"yukleniyor" | "kapak" | "bolum" | "sonuc">("yukleniyor");
  const [secIdx, setSecIdx] = useState(0);
  const [kalan, setKalan] = useState(0);
  const [sonuc, setSonuc] = useState<Result | null>(null);
  const skor = useRef<Record<SectionId, { correct: number; total: number }>>({
    vocab: { correct: 0, total: 0 }, grammar: { correct: 0, total: 0 }, produce: { correct: 0, total: 0 },
    reading: { correct: 0, total: 0 }, listening: { correct: 0, total: 0 }, speaking: { correct: 0, total: 0 }, writing: { correct: 0, total: 0 },
  });
  const konusmaPuan = useRef<number[]>([]);
  const yazmaPuan = useRef<number | null>(null);
  const basladi = useRef(Date.now());
  const gonderildi = useRef(false);

  useEffect(() => {
    let iptal = false;
    api<{ paper: Paper }>("/api/exam", {
      method: "POST",
      body: JSON.stringify({ action: "start", level, module: modul, day: todayStr() }),
    })
      .then((d) => {
        if (iptal) return;
        setPaper(d.paper);
        setKalan(d.paper.seconds);
        setFaz("kapak");
      })
      .catch((e: Error) => !iptal && setHata(e.message || t("exam.could_not_load")));
    return () => { iptal = true; };
  }, [level, modul]);

  // Süre yalnız sınav sürerken işler; kapakta ve sonuçta durur.
  useEffect(() => {
    if (faz !== "bolum") return;
    const id = setInterval(() => setKalan((n) => Math.max(0, n - 1)), 1000);
    return () => clearInterval(id);
  }, [faz]);

  useEffect(() => {
    if (faz === "bolum" && kalan === 0) void bitir();
  }, [kalan, faz]);

  const dolu = (): SectionId[] =>
    paper ? SECTION_ORDER.filter((s) => (paper.sections[s]?.length ?? 0) > 0) : [];

  async function bitir() {
    if (gonderildi.current || !paper) return;
    gonderildi.current = true;
    const sections = dolu().map((id) => ({ id, correct: skor.current[id].correct, total: skor.current[id].total }));
    const sp = konusmaPuan.current.length
      ? Math.round(konusmaPuan.current.reduce((a, b) => a + b, 0) / konusmaPuan.current.length)
      : null;
    try {
      const d = await api<{ result: Result }>("/api/exam", {
        method: "POST",
        body: JSON.stringify({
          action: "finish", level, module: modul, day: todayStr(),
          sections, speakingScore: sp, writingScore: yazmaPuan.current,
          seconds: Math.round((Date.now() - basladi.current) / 1000),
        }),
      });
      setSonuc(d.result);
    } catch {
      setSonuc(null);
    }
    setFaz("sonuc");
  }

  function bolumBitti(id: SectionId, correct: number, total: number) {
    skor.current[id] = { correct, total };
    const list = dolu();
    const i = list.indexOf(id);
    if (i + 1 < list.length) setSecIdx(i + 1);
    else void bitir();
  }

  const dk = Math.floor(kalan / 60);
  const sn = String(kalan % 60).padStart(2, "0");

  const baslik = (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
      <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
        <XIcon color={colors.textMuted} size={22} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="micro" color={colors.textMuted}>
          {paper?.cover ? `${paper.cover.code} · ${paper.cover.titleTr}` : t("exam.level_exam", { level })}
        </Text>
        <Text variant="h3">{faz === "bolum" ? `${dk}:${sn}` : t("examprep.exam_prep")}</Text>
      </View>
    </View>
  );

  if (hata) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{hata}</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primary}>{t("item.go_back")}</Text></PressableScale>
      </View>
    );
  }

  if (faz === "yukleniyor" || !paper) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (faz === "kapak") {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {baslik}
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
            {dolu().map((s) => (
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
          <PressableScale onPress={() => { basladi.current = Date.now(); setFaz("bolum"); }} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("exam.start")}</Text>
          </PressableScale>
        </ScrollView>
      </View>
    );
  }

  if (faz === "sonuc") {
    const pct = sonuc?.total ?? 0;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        {baslik}
        <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }}>
          <Card padded style={{ alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={!!sonuc?.passed} />
            <Mascot mood={sonuc?.passed ? "celebrate" : "idle"} size={90} />
            <Text variant="h1">%{pct}</Text>
            <Text variant="bodyStrong" color={sonuc?.passed ? colors.success : colors.textMuted}>
              {sonuc ? (sonuc.passed ? t("exam.passed") : t("exam.not_passed")) : t("exam.saved_offline")}
            </Text>
            {sonuc?.trial ? <Text variant="caption" color={colors.textMuted}>{t("exam.trial_notice")}</Text> : null}
          </Card>
          {sonuc?.sections.map((s) => (
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

  const list = dolu();
  const aktif = list[secIdx];
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {baslik}
      <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <Text variant="micro" color={colors.textMuted}>
          {secIdx + 1}/{list.length} · {SECTION_DE[aktif]} · {t(SECTION_KEY[aktif])}
        </Text>
      </View>
      <SectionBody
        key={aktif}
        id={aktif}
        paper={paper}
        colors={colors}
        insets={insets}
        onSpeakScore={(p) => konusmaPuan.current.push(p)}
        onWriteScore={(p) => { yazmaPuan.current = p; }}
        onDone={(c, tot) => bolumBitti(aktif, c, tot)}
      />
    </View>
  );
}

/* ─────────────────────────── bölümler ─────────────────────────── */

function SectionBody({
  id, paper, colors, insets, onDone, onSpeakScore, onWriteScore,
}: {
  id: SectionId; paper: Paper; colors: Palette; insets: { bottom: number };
  onDone: (correct: number, total: number) => void;
  onSpeakScore: (p: number) => void;
  onWriteScore: (p: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const dogru = useRef(0);
  const pad = { paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md };

  function ilerle(ok: boolean, toplam: number) {
    if (ok) dogru.current += 1;
    if (idx + 1 < toplam) setIdx(idx + 1);
    else onDone(dogru.current, toplam);
  }

  if (id === "vocab") {
    const r = paper.sections.vocab[idx];
    return (
      <View style={{ flex: 1 }}>
        <RoundView key={r.id} round={r} onDone={(ok) => ilerle(ok, paper.sections.vocab.length)} />
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
            soru={`${it.sheet} · ${it.label}`}
            secenekler={it.options}
            dogruIdx={it.answer}
            colors={colors}
            onPick={(ok) => ilerle(ok, paper.sections.grammar.length)}
          />
        ) : (
          <Choice
            key={it.id}
            soru={it.statement}
            secenekler={[t("common.true"), t("common.false")]}
            dogruIdx={it.answer ? 0 : 1}
            colors={colors}
            onPick={(ok) => ilerle(ok, paper.sections.grammar.length)}
          />
        )}
      </ScrollView>
    );
  }

  if (id === "produce") {
    const it = paper.sections.produce[idx];
    return <Produce key={it.id} it={it} colors={colors} pad={pad} onDone={(ok) => ilerle(ok, paper.sections.produce.length)} />;
  }

  if (id === "reading" || id === "listening") {
    const items = paper.sections[id];
    return <TextSection key={items[idx].id} it={items[idx]} spoken={id === "listening"} colors={colors} pad={pad}
      onDone={(c, tot) => { dogru.current += c; if (idx + 1 < items.length) setIdx(idx + 1); else onDone(dogru.current, items.reduce((a, x) => a + x.questions.length, 0)); }} />;
  }

  if (id === "speaking") {
    const it = paper.sections.speaking[idx];
    return <Speak key={it.id} it={it} colors={colors} pad={pad}
      onDone={(ok, puan) => { onSpeakScore(puan); ilerle(ok, paper.sections.speaking.length); }} />;
  }

  const w = paper.sections.writing[0];
  return <Write w={w} level={paper.level} colors={colors} pad={pad}
    onDone={(ok, puan) => { onWriteScore(puan); onDone(ok ? 1 : 0, 1); }} />;
}

function Choice({ soru, secenekler, dogruIdx, colors, onPick }: { soru: string; secenekler: string[]; dogruIdx: number; colors: Palette; onPick: (ok: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <Card padded style={{ gap: spacing.sm }}>
      <Text variant="bodyStrong" style={{ lineHeight: 24 }}>{soru}</Text>
      {secenekler.map((o, i) => {
        const secildi = pick !== null;
        const renk = !secildi ? colors.surface : i === dogruIdx ? colors.success : pick === i ? colors.danger : colors.surface;
        return (
          <PressableScale key={i} disabled={secildi} onPress={() => { setPick(i); setTimeout(() => onPick(i === dogruIdx), 550); }}
            style={{ backgroundColor: renk, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 13, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={secildi && (i === dogruIdx || pick === i) ? "#fff" : colors.text}>{o}</Text>
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
  const kalanParca = (it.chunks ?? []).filter((c, i) => !parts.includes(`${i}:${c}`));
  const cevap = it.mode === "order" ? parts.map((p) => p.split(":").slice(1).join(":")).join(" ") : typed;
  const ok = written(cevap, [it.de, ...it.accept]);

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
                const anahtar = `${i}:${c}`;
                if (parts.includes(anahtar)) return null;
                return (
                  <PressableScale key={anahtar} disabled={done} onPress={() => setParts([...parts, anahtar])}
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
          disabled={!cevap.trim() && !done}
          onPress={() => (done ? onDone(ok) : setDone(true))}
          style={{ backgroundColor: cevap.trim() || done ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
          <Text variant="bodyStrong" color={cevap.trim() || done ? colors.onPrimary : colors.textFaint}>
            {done ? t("common.next") : t("skillquiz.check")}
          </Text>
        </PressableScale>
      </Card>
      {kalanParca.length === 0 && it.mode === "order" ? null : null}
    </ScrollView>
  );
}

function TextSection({ it, spoken, colors, pad, onDone }: { it: TextItem; spoken: boolean; colors: Palette; pad: object; onDone: (correct: number, total: number) => void }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => it.questions.map(() => null));
  const bitti = answers.every((a) => a !== null);
  const dogru = answers.filter((a, i) => a === it.questions[i].answer).length;
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
            const secildi = answers[qi] !== null;
            const renk = !secildi ? colors.surface : oi === q.answer ? colors.success : answers[qi] === oi ? colors.danger : colors.surface;
            return (
              <PressableScale key={oi} disabled={secildi} onPress={() => setAnswers(answers.map((a, i) => (i === qi ? oi : a)))}
                style={{ backgroundColor: renk, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingVertical: 12, paddingHorizontal: spacing.md }}>
                <Text variant="body" color={secildi && (oi === q.answer || answers[qi] === oi) ? "#fff" : colors.text}>{o}</Text>
              </PressableScale>
            );
          })}
        </Card>
      ))}
      {bitti ? (
        <PressableScale onPress={() => onDone(dogru, it.questions.length)} style={[{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
        </PressableScale>
      ) : null}
    </ScrollView>
  );
}

function Speak({ it, colors, pad, onDone }: { it: SpeakingItem; colors: Palette; pad: object; onDone: (ok: boolean, puan: number) => void }) {
  const [durum, setDurum] = useState<"idle" | "rec" | "done" | "err">("idle");
  const [duyulan, setDuyulan] = useState("");
  const [ipucu, setIpucu] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function dinle() {
    if (durum === "rec") return;
    if (!(await ensureMicPermission())) { setIpucu(t("speak.mic_needed")); setDurum("err"); return; }
    setDurum("rec"); setIpucu(null);
    const heard = await listenOnce(currentTargetLocale(), 8000);
    if (!heard?.length) { setIpucu(t("speak.not_heard")); setDurum("err"); return; }
    setDuyulan(heard[0]);
    const gecti = spokenMatches(heard, [it.de]);
    setOk(gecti);
    if (!gecti) {
      const düz = heard.map((h) => h.toLowerCase());
      setIpucu((it.confusions ?? []).find((c) => c.heard.some((x) => düz.some((h) => h.includes(x.toLowerCase()))))?.fix ?? it.hint ?? null);
    }
    setDurum("done");
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
        {duyulan ? <Text variant="caption" color={colors.textMuted}>{t("speak.heard")}: {duyulan}</Text> : null}
        {durum === "done" ? (
          <Text variant="bodyStrong" color={ok ? colors.success : colors.danger}>{ok ? t("speak.correct") : t("exam.speak_missed")}</Text>
        ) : null}
        {ipucu ? <Text variant="body" style={{ backgroundColor: colors.surface2, borderRadius: radii.md, padding: spacing.sm, lineHeight: 20 }}>{ipucu}</Text> : null}
        {durum === "rec" ? (
          <Text variant="bodyStrong" color={colors.primary} style={{ textAlign: "center", paddingVertical: 14 }}>{t("speak.listening")}</Text>
        ) : durum === "done" ? (
          <PressableScale onPress={() => onDone(ok, ok ? 100 : 40)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.next")}</Text>
          </PressableScale>
        ) : (
          <PressableScale onPress={() => void dinle()} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={colors.onPrimary}>{t("speak.record")}</Text>
          </PressableScale>
        )}
      </Card>
    </ScrollView>
  );
}

function Write({ w, level, colors, pad, onDone }: { w: WritingItem; level: string; colors: Palette; pad: object; onDone: (ok: boolean, puan: number) => void }) {
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [puan, setPuan] = useState<number | null>(null);
  const kelime = typed.trim() ? typed.trim().split(/\s+/).length : 0;

  async function degerlendir() {
    if (busy || kelime < 5) return;
    setBusy(true);
    try {
      const d = await api<{ result: { score?: { overall?: number } } }>("/api/assess", {
        method: "POST",
        body: JSON.stringify({
          kind: "writing", level,
          task: { prompt: w.task.prompt, constraints: [...w.task.checklist, `en az ${w.task.minWords} kelime`] },
          answer: { text: typed.trim() }, locale: "tr",
        }),
      });
      setPuan(d.result?.score?.overall ?? null);
    } catch {
      // Sağlayıcı yoksa ya da ağ yoksa sınav durmaz: kelime sayısı ölçütüyle
      // geçici puan verilir, sunucu yine kendi sınırlarını uygular.
      setPuan(kelime >= w.task.minWords ? 70 : 40);
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
        <TextInput value={typed} onChangeText={setTyped} editable={puan === null} multiline autoCapitalize="sentences"
          placeholder={t("exam.write_text")} placeholderTextColor={colors.textFaint}
          style={{ minHeight: 140, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.md, paddingVertical: 10, color: colors.text, fontSize: 15 }} />
        <Text variant="caption" color={colors.textMuted}>{kelime} / {w.task.minWords}</Text>
        {puan !== null ? (
          <>
            <Text variant="bodyStrong" color={puan >= 60 ? colors.success : colors.danger}>%{puan}</Text>
            <PressableScale onPress={() => onDone(puan >= 60, puan)} style={{ backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.onPrimary}>{t("item.finish")}</Text>
            </PressableScale>
          </>
        ) : (
          <PressableScale disabled={busy || kelime < 5} onPress={() => void degerlendir()}
            style={{ backgroundColor: kelime >= 5 && !busy ? colors.primary : colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
            <Text variant="bodyStrong" color={kelime >= 5 && !busy ? colors.onPrimary : colors.textFaint}>
              {busy ? t("exam.evaluating") : t("skillquiz.check")}
            </Text>
          </PressableScale>
        )}
      </Card>
    </ScrollView>
  );
}
