import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { t } from "../lib/i18n";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { ArrowBackIcon, SpeakerIcon, CheckIcon, XIcon } from "../ui/icons";
import { speakAndWaitVoiced } from "../lib/tts";
import { voicesFor } from "../lib/voices";
import { foldCompare } from "../lib/textFold";
import { currentCourseId } from "../lib/courses";
import {
  mockPaperById,
  MOCK_PASS_PCT,
  type MockItem,
  type MockPart,
  type MockStimulus,
  type MockTask,
} from "../data/exams";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, type Palette } from "../theme";

/**
 * Deneme sınavı oynatıcısı — TEK BÖLÜM.
 *
 * NEDEN BÖLÜM BÖLÜM. Bir A1 kâğıdı 80, bir C1 kâğıdı 205 dakika sürüyor.
 * Telefonda tek oturumda çözülecek bir şey değil ve gerçek sınavlar da
 * modüler: bölümler ayrı ayrı alınabiliyor. Bu yüzden ekran her seferinde tek
 * bir bölümü (Lesen / Hören / Schreiben / Sprechen) çalıştırıyor ve süre o
 * bölümün kendi süresi.
 *
 * ÜÇ AŞAMA: `kapak` (yönerge + başla), `sinav` (görev görev), `sonuc`
 * (puan + çözümler). Açıklamalar sınav SIRASINDA gösterilmiyor; her maddenin
 * `explain` alanı yalnız son ekranda okunuyor. Ölçme sırasında geri bildirim
 * vermek ölçümü bozar.
 *
 * DİNLEME. Kayıt yok; metin cihazın/köprünün sesiyle okunuyor. Konuşmacılar
 * kursun iki sesi arasında dönüşümlü dağıtılıyor, böylece diyalogda kimin
 * konuştuğu duyulabiliyor. `plays` alanı gerçek sınavın "bir kez / iki kez"
 * ayrımını taşıyor ve oynatıcı bunu SINIR olarak uyguluyor — hakkı biten
 * düğme kapanıyor.
 *
 * PUANLAMA yerelde ve yalnız nesnel maddeler için. Yazma ve konuşma bölümleri
 * ölçüt listesi ve örnek cevapla birlikte gösteriliyor; makine puanı yok ve
 * bu ekranda uydurulmuyor. Sonuç sunucuya YAZILMIYOR: deneme sınavı sonucu
 * için henüz bir tablo yok, sahte bir kayıt üretmektense sonuç oturumda kalıyor.
 */

type Answers = Record<string, string>;

/** Boşluk işaretlerini okunur bir yer tutucuya çevirir: "{{3}}" → " (3) ______ ". */
function withBlanks(body: string): string {
  return body.replace(/\{\{(\d+)\}\}/g, (_m, n) => ` (${n}) ______ `);
}

function isCorrect(item: MockItem, ans: string | undefined): boolean {
  if (ans == null || ans.trim() === "") return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldCompare(a, "de") === foldCompare(ans, "de"));
}

/** Maddenin doğru cevabının okunur hâli — sonuç ekranı için. */
function correctLabel(item: MockItem, task: MockTask, boolLabels: [string, string]): string {
  if (item.kind === "mcq") return item.options[item.answer] ?? "";
  if (item.kind === "bool") return item.answer ? boolLabels[0] : boolLabels[1];
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === item.answer);
    return o ? `${o.key}) ${o.label}` : item.answer;
  }
  return item.accept[0];
}

function givenLabel(item: MockItem, task: MockTask, ans: string | undefined, boolLabels: [string, string]): string {
  if (ans == null || ans.trim() === "") return t("mockexam.blank");
  if (item.kind === "mcq") return item.options[Number(ans)] ?? ans;
  if (item.kind === "bool") return ans === "true" ? boolLabels[0] : boolLabels[1];
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === ans);
    return o ? `${o.key}) ${o.label}` : ans;
  }
  return ans;
}

/** Yazma/konuşma görevi mi — puanlanmayan görevler. */
const isOpen = (task: MockTask) => task.format === "writing" || task.format === "speaking";

/** Doğru/yanlış etiketleri görevin biçiminden gelir: Richtig/Falsch ya da Ja/Nein. */
function boolLabelsFor(task: MockTask): [string, string] {
  return task.format === "yesno" ? [t("mockexam.ja"), t("mockexam.nein")] : [t("mockexam.richtig"), t("mockexam.falsch")];
}

function mmss(sec: number): string {
  const s = Math.max(0, sec);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function MockExamScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParams, "MockExam">>();
  const paper = mockPaperById(route.params.paperId);
  const part = paper?.parts.find((p) => p.skill === route.params.skill) ?? null;

  const [phase, setPhase] = useState<"kapak" | "sinav" | "sonuc">("kapak");
  const [taskIx, setTaskIx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [essays, setEssays] = useState<Record<string, string>>({});
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [speaking, setSpeaking] = useState<string | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [left, setLeft] = useState(0);
  const [quit, setQuit] = useState(false);
  const scroller = useRef<React.ComponentRef<typeof ScrollView> | null>(null);
  // Ekrandan çıkılınca yarım kalan okuma sürsün istemiyoruz.
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false; }, []);

  useEffect(() => {
    if (phase !== "sinav") return;
    const id = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [phase]);
  useEffect(() => {
    if (phase === "sinav" && left === 0) setPhase("sonuc");
  }, [left, phase]);

  const play = useCallback(
    async (st: Extract<MockStimulus, { kind: "audio" }>) => {
      if (speaking) return;
      const used = plays[st.id] ?? 0;
      if (used >= st.plays) return;
      setPlays((p) => ({ ...p, [st.id]: used + 1 }));
      setSpeaking(st.id);
      // Konuşmacılar kursun iki sesine dönüşümlü dağıtılıyor; tek sesli
      // metinde herkes ilk sesi kullanır.
      const vs = voicesFor(currentCourseId());
      const who: string[] = [];
      for (const seg of st.segments) if (seg.speaker && !who.includes(seg.speaker)) who.push(seg.speaker);
      for (const seg of st.segments) {
        if (!alive.current) break;
        const ix = seg.speaker ? who.indexOf(seg.speaker) : 0;
        await speakAndWaitVoiced(seg.text, (vs[ix % vs.length] ?? vs[0]).id);
      }
      if (alive.current) setSpeaking(null);
    },
    [plays, speaking],
  );

  const scored = useMemo(() => {
    if (!part) return { correct: 0, total: 0 };
    let correct = 0;
    let total = 0;
    for (const task of part.tasks) {
      if (isOpen(task)) continue;
      for (const it of task.items) {
        total++;
        if (isCorrect(it, answers[it.id])) correct++;
      }
    }
    return { correct, total };
  }, [part, answers]);

  if (!paper || !part) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.lg, paddingTop: insets.top + spacing.xl }}>
        <Text variant="body">{t("mockexams.none_for_level", { level: paper?.level ?? "" })}</Text>
      </View>
    );
  }

  const pct = scored.total ? Math.round((100 * scored.correct) / scored.total) : 0;
  const passed = scored.total > 0 && pct >= MOCK_PASS_PCT;
  const blanks = part.tasks
    .filter((x) => !isOpen(x))
    .reduce((a, x) => a + x.items.filter((i) => !(answers[i.id] ?? "").trim()).length, 0);

  const head = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingTop: insets.top + spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.sm,
      }}
    >
      <PressableScale
        hitSlop={4}
        onPress={() => (phase === "sinav" ? setQuit(true) : nav.goBack())}
        accessibilityLabel={t("common.back")}
        style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}
      >
        <ArrowBackIcon color={colors.text} size={24} />
      </PressableScale>
      <View style={{ flex: 1 }}>
        <Text variant="micro" color={colors.textMuted}>
          {paper.level} · {t("mockexams.paper", { n: paper.no })}
        </Text>
        <Text variant="h3">{t(`mockexam.skill_${part.skill}`)}</Text>
      </View>
      {phase === "sinav" ? (
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.time_left")}</Text>
          <Text variant="bodyStrong" color={left < 60 ? colors.danger : colors.text}>{mmss(left)}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {head}
      <ScrollView
        ref={(r) => { scroller.current = r; }}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {phase === "kapak" ? (
          <>
            <Card padded style={{ marginBottom: spacing.md }}>
              <Text variant="micro" color={colors.textMuted}>{t("mockexam.instructions")}</Text>
              <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{part.instruction}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm, lineHeight: 20 }}>
                {part.instructionTr}
              </Text>
            </Card>
            <Card padded style={{ marginBottom: spacing.lg }}>
              <Text variant="bodyStrong">{paper.theme}</Text>
              <Text variant="caption" color={colors.textMuted}>{paper.themeTr}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>
                {t("mockexams.part_summary", { minutes: part.minutes, n: part.tasks.reduce((a, x) => a + (isOpen(x) ? 0 : x.items.length), 0) })}
              </Text>
            </Card>
            <Primary
              colors={colors}
              label={t("mockexam.start")}
              onPress={() => { setLeft(part.minutes * 60); setPhase("sinav"); }}
            />
          </>
        ) : phase === "sinav" ? (
          <TaskView
            task={part.tasks[taskIx]}
            index={taskIx}
            total={part.tasks.length}
            answers={answers}
            essays={essays}
            plays={plays}
            speaking={speaking}
            colors={colors}
            onAnswer={(id, v) => setAnswers((a) => ({ ...a, [id]: v }))}
            onEssay={(id, v) => setEssays((e) => ({ ...e, [id]: v }))}
            onPlay={play}
          />
        ) : (
          <ResultView
            part={part}
            answers={answers}
            essays={essays}
            reveal={reveal}
            colors={colors}
            correct={scored.correct}
            total={scored.total}
            passed={passed}
            timeUp={left === 0}
            onReveal={(id) => setReveal((r) => ({ ...r, [id]: true }))}
          />
        )}
      </ScrollView>

      {phase === "sinav" ? (
        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.sm,
            paddingBottom: insets.bottom + spacing.sm,
            backgroundColor: colors.bg,
            borderTopWidth: 1,
            borderTopColor: colors.surface2,
          }}
        >
          {taskIx > 0 ? (
            <Secondary
              colors={colors}
              label={t("mockexam.prev_task")}
              onPress={() => { setTaskIx((i) => i - 1); scroller.current?.scrollTo({ y: 0, animated: false }); }}
            />
          ) : null}
          {taskIx < part.tasks.length - 1 ? (
            <Primary
              colors={colors}
              label={t("mockexam.next_task")}
              onPress={() => { setTaskIx((i) => i + 1); scroller.current?.scrollTo({ y: 0, animated: false }); }}
            />
          ) : (
            <Primary colors={colors} label={t("mockexam.submit")} onPress={() => setPhase("sonuc")} />
          )}
        </View>
      ) : phase === "sonuc" ? (
        <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.sm, backgroundColor: colors.bg }}>
          <Primary colors={colors} label={t("mockexam.back_to_list")} onPress={() => nav.goBack()} />
        </View>
      ) : null}

      <ConfirmDialog
        visible={quit}
        title={t("mockexam.quit_title")}
        message={blanks ? `${t("mockexam.quit_body")} ${t("mockexam.unanswered", { n: blanks })}` : t("mockexam.quit_body")}
        confirmLabel={t("mockexam.quit_ok")}
        destructive
        onConfirm={() => { setQuit(false); nav.goBack(); }}
        onCancel={() => setQuit(false)}
      />
    </View>
  );
}

/* ── düğmeler ─────────────────────────────────────────────────────────────── */

function Primary({ colors, label, onPress }: { colors: Palette; label: string; onPress: () => void }) {
  return (
    <PressableScale
      onPress={onPress}
      style={{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.md, alignItems: "center" }}
    >
      <Text variant="bodyStrong" color={colors.onPrimary}>{label}</Text>
    </PressableScale>
  );
}

function Secondary({ colors, label, onPress }: { colors: Palette; label: string; onPress: () => void }) {
  return (
    <PressableScale
      onPress={onPress}
      style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: spacing.md, alignItems: "center" }}
    >
      <Text variant="bodyStrong">{label}</Text>
    </PressableScale>
  );
}

/* ── görev ────────────────────────────────────────────────────────────────── */

function TaskView({
  task, index, total, answers, essays, plays, speaking, colors, onAnswer, onEssay, onPlay,
}: {
  task: MockTask;
  index: number;
  total: number;
  answers: Answers;
  essays: Record<string, string>;
  plays: Record<string, number>;
  speaking: string | null;
  colors: Palette;
  onAnswer: (id: string, v: string) => void;
  onEssay: (id: string, v: string) => void;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  const bools = boolLabelsFor(task);
  // Maddeler metne bağlıysa metin–madde–metin sırasıyla çizilir; bağlı
  // değilse (ör. "bunu hangi kişi söylüyor") önce bütün metinler gelir.
  const grouped = (task.texts ?? []).length > 1 && task.items.some((i) => i.ref);

  const itemsOf = (ref?: string) => (grouped ? task.items.filter((i) => i.ref === ref) : task.items);

  return (
    <View>
      <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>
        {t("mockexam.task_of", { n: index + 1, total })}
      </Text>
      <Card padded style={{ marginBottom: spacing.md }}>
        <Text variant="body" style={{ lineHeight: 22 }}>{task.prompt}</Text>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{task.promptTr}</Text>
      </Card>

      {task.options?.length ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          {task.options.map((o) => (
            <View key={o.key} style={{ marginBottom: spacing.sm }}>
              <Text variant="bodyStrong">{o.key}) {o.label}</Text>
              {o.body ? <Text variant="caption" color={colors.textMuted} style={{ lineHeight: 20 }}>{o.body}</Text> : null}
            </View>
          ))}
        </Card>
      ) : null}

      {(task.texts ?? []).map((st) => (
        <View key={st.id}>
          <StimulusView st={st} colors={colors} plays={plays} speaking={speaking} onPlay={onPlay} />
          {grouped
            ? itemsOf(st.id).map((it) => (
                <ItemView key={it.id} item={it} task={task} bools={bools} value={answers[it.id]} colors={colors} onAnswer={onAnswer} />
              ))
            : null}
        </View>
      ))}

      {!grouped
        ? task.items.map((it) => (
            <ItemView key={it.id} item={it} task={task} bools={bools} value={answers[it.id]} colors={colors} onAnswer={onAnswer} />
          ))
        : null}

      {isOpen(task) && task.rubric ? (
        <Card padded style={{ marginTop: spacing.sm }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.content_points")}</Text>
          {task.rubric.points.map((p, i) => (
            <View key={i} style={{ marginTop: spacing.xs }}>
              <Text variant="body">• {p.de}</Text>
              <Text variant="caption" color={colors.textMuted}>{p.tr}</Text>
            </View>
          ))}
          {task.format === "writing" ? (
            <>
              {task.rubric.minWords ? (
                <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>
                  {t("mockexam.min_words", { n: task.rubric.minWords })}
                </Text>
              ) : null}
              <TextInput
                value={essays[task.id] ?? ""}
                onChangeText={(v) => onEssay(task.id, v)}
                multiline
                placeholder={t("mockexam.write_here")}
                placeholderTextColor={colors.textFaint}
                style={{
                  marginTop: spacing.xs,
                  minHeight: 160,
                  borderRadius: radii.md,
                  backgroundColor: colors.surface2,
                  color: colors.text,
                  padding: spacing.md,
                  textAlignVertical: "top",
                }}
              />
            </>
          ) : null}
        </Card>
      ) : null}
    </View>
  );
}

function StimulusView({
  st, colors, plays, speaking, onPlay,
}: {
  st: MockStimulus;
  colors: Palette;
  plays: Record<string, number>;
  speaking: string | null;
  onPlay: (st: Extract<MockStimulus, { kind: "audio" }>) => void;
}) {
  if (st.kind === "text") {
    return (
      <Card padded style={{ marginBottom: spacing.md }}>
        <Text variant="micro" color={colors.textMuted}>{st.genre} · {st.genreTr}</Text>
        {st.title ? <Text variant="bodyStrong" style={{ marginTop: spacing.xs }}>{st.title}</Text> : null}
        <Text variant="body" style={{ marginTop: spacing.sm, lineHeight: 24 }}>{withBlanks(st.body)}</Text>
      </Card>
    );
  }
  const used = plays[st.id] ?? 0;
  const rest = st.plays - used;
  const busy = speaking === st.id;
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <Text variant="micro" color={colors.textMuted}>{st.genre} · {st.genreTr}</Text>
      {st.title ? <Text variant="bodyStrong" style={{ marginTop: spacing.xs }}>{st.title}</Text> : null}
      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{st.situation}</Text>
      <PressableScale
        onPress={() => onPlay(st)}
        disabled={rest <= 0 || busy}
        style={{
          marginTop: spacing.sm,
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          alignSelf: "flex-start",
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          borderRadius: radii.pill,
          backgroundColor: rest > 0 ? colors.primarySoft : colors.surface2,
          opacity: rest > 0 ? 1 : 0.6,
        }}
      >
        <SpeakerIcon color={rest > 0 ? colors.primary : colors.textMuted} size={20} />
        <Text variant="bodyStrong" color={rest > 0 ? colors.primary : colors.textMuted}>
          {rest <= 0 ? t("mockexam.plays_done") : used === 0 ? t("mockexam.listen") : t("mockexam.listen_again")}
        </Text>
      </PressableScale>
      {rest > 0 ? (
        <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("mockexam.plays_left", { n: rest })}</Text>
      ) : null}
    </Card>
  );
}

function ItemView({
  item, task, bools, value, colors, onAnswer,
}: {
  item: MockItem;
  task: MockTask;
  bools: [string, string];
  value?: string;
  colors: Palette;
  onAnswer: (id: string, v: string) => void;
}) {
  const chip = (label: string, active: boolean, onPress: () => void, key?: string) => (
    <PressableScale
      key={key ?? label}
      onPress={onPress}
      style={{
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.md,
        backgroundColor: active ? colors.primarySoft : colors.surface2,
        borderWidth: 1,
        borderColor: active ? colors.primary : "transparent",
        marginBottom: spacing.xs,
      }}
    >
      <Text variant="body" color={active ? colors.primary : colors.text}>{label}</Text>
    </PressableScale>
  );

  return (
    <Card padded style={{ marginBottom: spacing.sm }}>
      <Text variant="bodyStrong" style={{ lineHeight: 22 }}>{item.no}. {item.text}</Text>
      <View style={{ marginTop: spacing.sm }}>
        {item.kind === "mcq"
          ? item.options.map((o, ix) => chip(`${"abcd"[ix] ?? ix + 1}) ${o}`, value === String(ix), () => onAnswer(item.id, String(ix)), String(ix)))
          : item.kind === "bool"
            ? (
              <View style={{ flexDirection: "row", gap: spacing.sm }}>
                {chip(bools[0], value === "true", () => onAnswer(item.id, "true"))}
                {chip(bools[1], value === "false", () => onAnswer(item.id, "false"))}
              </View>
            )
            : item.kind === "match"
              ? (
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
                  {(task.options ?? []).map((o) => chip(o.key, value === o.key, () => onAnswer(item.id, o.key), o.key))}
                </View>
              )
              : (
                <TextInput
                  value={value ?? ""}
                  onChangeText={(v) => onAnswer(item.id, v)}
                  placeholder={t("mockexam.write_here")}
                  placeholderTextColor={colors.textFaint}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ borderRadius: radii.md, backgroundColor: colors.surface2, color: colors.text, paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
                />
              )}
      </View>
    </Card>
  );
}

/* ── sonuç ────────────────────────────────────────────────────────────────── */

function ResultView({
  part, answers, essays, reveal, colors, correct, total, passed, timeUp, onReveal,
}: {
  part: MockPart;
  answers: Answers;
  essays: Record<string, string>;
  reveal: Record<string, boolean>;
  colors: Palette;
  correct: number;
  total: number;
  passed: boolean;
  timeUp: boolean;
  onReveal: (id: string) => void;
}) {
  const pct = total ? Math.round((100 * correct) / total) : 0;
  return (
    <View>
      {timeUp ? (
        <Card padded style={{ marginBottom: spacing.md }}>
          <Text variant="body" color={colors.danger}>{t("mockexam.time_up")}</Text>
        </Card>
      ) : null}

      {total > 0 ? (
        <Card padded style={{ marginBottom: spacing.lg }}>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.result")}</Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", marginTop: spacing.xs }}>
            <Text variant="h1" color={passed ? colors.success : colors.danger}>%{pct}</Text>
            <Text variant="bodyStrong">{t("mockexam.score", { correct, total })}</Text>
          </View>
          <Text variant="bodyStrong" color={passed ? colors.success : colors.danger} style={{ marginTop: spacing.sm }}>
            {passed ? t("mockexam.passed") : t("mockexam.failed")}
          </Text>
          <Text variant="micro" color={colors.textMuted}>{t("mockexam.pass_note", { pct: MOCK_PASS_PCT })}</Text>
        </Card>
      ) : (
        <Card padded style={{ marginBottom: spacing.lg }}>
          <Text variant="body" style={{ lineHeight: 22 }}>{t("mockexam.not_scored")}</Text>
        </Card>
      )}

      <Text variant="h3" style={{ marginBottom: spacing.sm }}>{t("mockexam.review")}</Text>

      {part.tasks.map((task) => (
        <View key={task.id} style={{ marginBottom: spacing.md }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.xs }}>Teil {task.no}</Text>

          {isOpen(task) && task.rubric ? (
            <Card padded>
              {task.format === "writing" && (essays[task.id] ?? "").trim() ? (
                <>
                  <Text variant="micro" color={colors.textMuted}>{t("mockexam.your_answer")}</Text>
                  <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{essays[task.id]}</Text>
                </>
              ) : null}
              <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.criteria")}</Text>
              {task.rubric.criteria.map((c, i) => (
                <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>• {c}</Text>
              ))}
              {reveal[task.id] ? (
                <>
                  <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("mockexam.model_answer")}</Text>
                  <Text variant="body" style={{ marginTop: spacing.xs, lineHeight: 22 }}>{task.rubric.sample}</Text>
                </>
              ) : (
                <PressableScale
                  onPress={() => onReveal(task.id)}
                  style={{ marginTop: spacing.md, alignSelf: "flex-start", paddingVertical: spacing.sm, paddingHorizontal: spacing.md, borderRadius: radii.pill, backgroundColor: colors.surface2 }}
                >
                  <Text variant="bodyStrong">{t("mockexam.show_model")}</Text>
                </PressableScale>
              )}
            </Card>
          ) : (
            task.items.map((it) => {
              const ok = isCorrect(it, answers[it.id]);
              const bools = boolLabelsFor(task);
              return (
                <Card key={it.id} padded style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: "row", gap: spacing.sm }}>
                    <View style={{ width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center", backgroundColor: ok ? colors.successSoft : colors.dangerSoft }}>
                      {ok ? <CheckIcon color={colors.success} size={16} /> : <XIcon color={colors.danger} size={16} />}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong" style={{ lineHeight: 22 }}>{it.no}. {it.text}</Text>
                      {!ok ? (
                        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>
                          {t("mockexam.your_answer")}: {givenLabel(it, task, answers[it.id], bools)}
                        </Text>
                      ) : null}
                      <Text variant="caption" color={ok ? colors.success : colors.text} style={{ marginTop: spacing.xs }}>
                        {t("mockexam.correct_answer")}: {correctLabel(it, task, bools)}
                      </Text>
                      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, lineHeight: 20 }}>{it.explain}</Text>
                    </View>
                  </View>
                </Card>
              );
            })
          )}

          {(task.texts ?? []).map((st) =>
            st.kind === "audio" ? (
              <Card key={st.id} padded style={{ marginBottom: spacing.sm }}>
                <Text variant="micro" color={colors.textMuted}>{t("mockexam.transcript")} · {st.genreTr}</Text>
                {st.segments.map((s, i) => (
                  <Text key={i} variant="caption" style={{ marginTop: spacing.xs, lineHeight: 20 }}>
                    {s.speaker ? `${s.speaker}: ` : ""}{s.text}
                  </Text>
                ))}
                {st.gloss?.length ? <Glossary gloss={st.gloss} colors={colors} /> : null}
              </Card>
            ) : st.gloss?.length ? (
              <Card key={st.id} padded style={{ marginBottom: spacing.sm }}>
                <Glossary gloss={st.gloss} colors={colors} />
              </Card>
            ) : null,
          )}
        </View>
      ))}
    </View>
  );
}

function Glossary({ gloss, colors }: { gloss: { de: string; tr: string }[]; colors: Palette }) {
  return (
    <>
      <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{t("mockexam.glossary")}</Text>
      {gloss.map((g, i) => (
        <Text key={i} variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>
          {g.de} — {g.tr}
        </Text>
      ))}
    </>
  );
}
