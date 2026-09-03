import React, { useEffect, useMemo, useRef, useState } from "react";
import { t as tx, targetLangName } from "../lib/i18n";
import { View, ScrollView, TextInput, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { ReportSheet } from "../ui/ReportSheet";
import { Skeleton, SkeletonLine } from "../ui/Skeleton";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, ArrowRightIcon, SpeakerIcon, CheckIcon, XIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { findLesson, scoredSteps, type Lesson, type Segment, type Expectation, type LectureStep } from "../data/lessons";
import { sendRoleplay, parseReply, type ChatMsg } from "../game/roleplay";
import { markItemDone, loadLessonResume, saveLessonResume, clearLessonResume } from "../game/lessonProgress";
import { speakTarget } from "../lib/tts";
import { haptic } from "../lib/haptics";
import { API_BASE } from "../api/client";
import { todayStr } from "../game/session";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { sfx } from "../lib/sfx";

/**
 * Ders oynatıcısı — anlatım → konuşma → özet. Web'in lesson-player'ının mobil
 * karşılığı. Web öğrenciyi KONUŞTURUYOR (STT); mobilde güvenilir yol YAZMAK
 * (cihaz STT'si ekran kapanınca susuyor), Almanca telaffuz TTS ile duyuluyor.
 * İçerik pakette (findLesson); sonuç /api/lesson'a kaydediliyor.
 */

type Phase = "lecture" | "roleplay" | "summary";

/** Anlatım/konuşma akışındaki baloncuk. */
/** Yapay zekâ yanıtı için bildirme bilgisi: ref = "<lessonId>:<tur>", text = gösterilen metin. */
type ReportRef = { ref: string; text: string };
type BubbleData =
  | { role: "teacher"; segments: Segment[]; tone?: "hint" | "why"; fix?: string[]; report?: ReportRef }
  | { role: "student"; text: string; ok?: boolean };
type Bubble = BubbleData & { id: number };

const deText = (segs: Segment[]): string => segs.filter((s) => s.lang === "de").map((s) => s.text).join(" ").trim();

/** Almanca cevap karşılaştırması — noktalama, büyük/küçük, umlaut/ß toleranslı. */
function sn(x: string): string {
  return x.trim().toLowerCase().replace(/[.!?…,;:"'»«]/g, "").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss").replace(/\s+/g, " ").trim();
}
function matches(input: string, target: string, accept?: string[]): boolean {
  const want = new Set([target, ...(accept ?? [])].map(sn));
  return want.has(sn(input));
}

/** Adım türü → ilerleme rengi (web STEP_TONE ile aynı dil). */
function stepTone(step: LectureStep, colors: Palette): string {
  switch (step.expect?.kind) {
    case "repeat": return colors.info;
    case "produce": return colors.primary;
    case "truefalse": return colors.accent;
    case "confirm": return colors.textMuted;
    default: return colors.border;
  }
}

export function LessonScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Lesson">>();
  const lesson = useMemo<Lesson | undefined>(() => findLesson(params.id), [params.id]);
  const scrollRef = useRef<any>(null);
  const startedAt = useRef(Date.now());

  const [phase, setPhase] = useState<Phase>("lecture");
  const [feed, setFeed] = useState<Bubble[]>([]);
  const bubbleId = useRef(0);
  const [cursor, setCursor] = useState(0);        // anlatımda beklenen adım
  const [correct, setCorrect] = useState(0);
  const [tries, setTries] = useState(0);          // üretim adımında deneme sayısı
  const [answered, setAnswered] = useState(false); // doğru/yanlış cevaplandı mı
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);        // roleplay bekleme
  const [roleTurns, setRoleTurns] = useState(0);
  const [roleMsgs, setRoleMsgs] = useState<ChatMsg[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const [resumeOffer, setResumeOffer] = useState<{ cursor: number; correct: number } | null>(null);
  // Yarım kayıt okunana dek boş sohbet kabuğu çizilmez: ya "devam et" ekranı ya
  // da ilk baloncuklar geliyor, ikisi de boş kabuğun yerine geçip ekranı zıplatır.
  const [resumeChecked, setResumeChecked] = useState(false);
  const [report, setReport] = useState<ReportRef | null>(null); // "Bildir" açık olan yapay zekâ yanıtı

  const scoreTotal = lesson ? scoredSteps(lesson) : 0;
  const scrollDown = () => setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 60);
  const push = (b: BubbleData) => setFeed((f) => [...f, { ...b, id: bubbleId.current++ }]);

  // Anlatımı başlat: yarım kalan kayıt varsa devam teklif et, yoksa baştan.
  useEffect(() => {
    if (!lesson) return;
    loadLessonResume(lesson.id).then((r) => {
      if (r && r.cursor < lesson.lecture.length) setResumeOffer({ cursor: r.cursor, correct: r.correct });
      else presentFrom(0);
      setResumeChecked(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson]);

  // Anlatım ilerledikçe cihazda sakla (yarım kalırsa "devam et").
  useEffect(() => {
    if (!lesson || phase !== "lecture") return;
    if (cursor > 0 && cursor < lesson.lecture.length) void saveLessonResume(lesson.id, cursor, correct);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor, phase]);

  /** cursor'dan itibaren: anlatım baloncuklarını aç, ilk `expect`li adımda dur. */
  function presentFrom(from: number) {
    if (!lesson) return;
    let k = from;
    const add: Bubble[] = [];
    while (k < lesson.lecture.length) {
      const step = lesson.lecture[k];
      add.push({ id: bubbleId.current++, role: "teacher", segments: step.say });
      if (step.expect) break; // her beklenti (confirm/repeat/produce/truefalse) burada bekletir
      k++;
    }
    if (add.length) setFeed((f) => [...f, ...add]);
    setCursor(k);
    setTries(0);
    setAnswered(false);
    const spoken = add.map((b) => (b.role === "teacher" ? deText(b.segments) : "")).filter(Boolean).join(". ");
    if (spoken) speakTarget(spoken);
    if (k >= lesson.lecture.length) enterRoleplay();
    scrollDown();
  }

  const current = lesson && cursor < lesson.lecture.length ? lesson.lecture[cursor] : null;
  const expect = current?.expect;

  function advance() { presentFrom(cursor + 1); }

  function onConfirm() { advance(); }

  function onRepeatDone() {
    if (expect?.kind === "repeat") speakTarget(expect.target);
    advance();
  }

  function submitProduce() {
    if (expect?.kind !== "produce") return;
    const text = input.trim();
    if (!text) return;
    const ok = matches(text, expect.target, expect.accept);
    push({ role: "student", text, ok });
    setInput("");
    if (ok) {
      haptic("correct");
      setCorrect((c) => c + 1);
      push({ role: "teacher", segments: [{ lang: "tr", text: tx(PRAISE_KEYS[correct % PRAISE_KEYS.length]) }] });
      speakTarget(expect.target);
      setTimeout(advance, 500);
    } else {
      haptic("wrong");
      const t = tries + 1;
      setTries(t);
      if (t >= 3) {
        push({ role: "teacher", segments: [{ lang: "tr", text: tx("common.answer_is") }, { lang: "de", text: expect.target }], tone: "hint" });
        speakTarget(expect.target);
        setTimeout(advance, 900);
      } else if (expect.hint?.length) {
        push({ role: "teacher", segments: expect.hint, tone: "hint" });
      }
    }
    scrollDown();
  }

  function answerTrueFalse(pick: boolean) {
    if (expect?.kind !== "truefalse" || answered) return;
    setAnswered(true);
    const ok = pick === expect.answer;
    push({ role: "student", text: tx(pick ? "common.correct" : "common.wrong"), ok });
    haptic(ok ? "correct" : "wrong");
    if (ok) setCorrect((c) => c + 1);
    push({ role: "teacher", segments: expect.why, tone: "why" });
    setTimeout(advance, 1100);
    scrollDown();
  }

  // ---- Konuşma (roleplay) ----
  function enterRoleplay() {
    if (!lesson) return;
    setPhase("roleplay");
    void clearLessonResume(lesson.id);
    const opening = lesson.roleplay.opening;
    setFeed([]);
    push({ role: "teacher", segments: [{ lang: "tr", text: tx("lesson.scene", { sahne: lesson.roleplay.scene }) }] });
    if (opening) {
      push({ role: "teacher", segments: [{ lang: "de", text: opening }, ...(lesson.roleplay.openingTr ? [{ lang: "tr" as const, text: lesson.roleplay.openingTr }] : [])] });
      setRoleMsgs([{ role: "assistant", content: opening }]);
      speakTarget(opening);
    }
    scrollDown();
  }

  async function sendRole(textArg?: string) {
    if (!lesson || busy) return;
    const text = (textArg ?? input).trim();
    if (!text) return;
    push({ role: "student", text });
    setInput("");
    setSuggestions([]);
    setBusy(true);
    const next: ChatMsg[] = [...roleMsgs, { role: "user", content: text }];
    setRoleMsgs(next);
    const turn = roleTurns + 1;
    setRoleTurns(turn);
    scrollDown();
    try {
      const reply = await sendRoleplay(lesson.id, next);
      const parsed = parseReply(reply || "…");
      const bodyText = parsed.body || reply || "…";
      setRoleMsgs([...next, { role: "assistant", content: bodyText }]);
      push({ role: "teacher", segments: [{ lang: "de", text: bodyText }], fix: parsed.corrections.length ? parsed.corrections : undefined, report: { ref: `${lesson.id}:${turn}`, text: reply } });
      setSuggestions(parsed.suggestions);
      if (bodyText) speakTarget(bodyText);
    } catch {
      push({ role: "teacher", segments: [{ lang: "tr", text: tx("lesson.connection_problem") }], tone: "hint" });
    } finally {
      setBusy(false);
      scrollDown();
    }
  }

  const minTurns = lesson?.roleplay.minTurns ?? 6;
  const roleplayReady = roleTurns >= minTurns;

  // ---- Özet + kayıt ----
  async function finish(roleDone: boolean) {
    if (!lesson) return;
    setPhase("summary");
    if (saved) return;
    setSaved(true);
    sfx("finish"); // tamamlanma sesi (özet; saved koruması sayesinde bir kez)
    void markItemDone(lesson.id);
    void clearLessonResume(lesson.id);
    const seconds = Math.round((Date.now() - startedAt.current) / 1000);
    try {
      await fetch(`${API_BASE}/api/lesson`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, correct, roleplayDone: roleDone, day: todayStr(), seconds }),
      });
    } catch { /* çevrimdışı: yerel işaret yeterli, sunucu sonra */ }
  }

  const nextLesson = useMemo(() => {
    if (!lesson) return null;
    const list = require("../data/lessons").lessonsForLevel(lesson.level) as Lesson[];
    const i = list.findIndex((l) => l.id === lesson.id);
    return i >= 0 && i + 1 < list.length ? list[i + 1] : null;
  }, [lesson]);

  if (!lesson) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("lesson.bu_ders_bulunamadi")}</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primary}>{tx("lesson.geri_don")}</Text></PressableScale>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
      {/* Başlık + ilerleme */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={tx("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{lesson.title}</Text>
          <Text variant="caption" color={colors.textMuted} numberOfLines={1}>
            {tx(phase === "lecture" ? "lesson.phase_lecture" : phase === "roleplay" ? "lesson.phase_roleplay" : "lesson.phase_summary")} · {lesson.titleTr}
          </Text>
        </View>
      </View>
      {phase === "lecture" && (
        <View style={{ flexDirection: "row", gap: 3, paddingHorizontal: spacing.lg, marginBottom: spacing.xs }}>
          {lesson.lecture.map((s, i) => (
            <View key={i} style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: i < cursor ? colors.success : i === cursor ? stepTone(s, colors) : colors.surface2 }} />
          ))}
        </View>
      )}

      {!resumeChecked ? (
        // Sohbet kabuğunun iskeleti: öğretmen baloncukları + alt eylem alanı.
        <>
          <View style={{ flex: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.sm }}>
            {["78%", "62%", "88%"].map((w, i) => (
              <View key={i} style={{ alignSelf: "flex-start", width: w, marginBottom: spacing.md }}>
                <Skeleton height={22 + 2 + 18 * 2} radius={radii.lg} />
                <SkeletonLine variant="micro" width={54} style={{ marginTop: 4, marginLeft: 4 }} />
              </View>
            ))}
          </View>
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            <Skeleton height={53} radius={radii.lg} />
          </View>
        </>
      ) : phase === "summary" ? (
        <Summary lesson={lesson} correct={correct} total={scoreTotal} next={nextLesson} colors={colors} insets={insets}
          onBack={() => nav.goBack()}
          onNext={nextLesson ? () => nav.replace("Lesson", { id: nextLesson.id }) : undefined} />
      ) : resumeOffer ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <Mascot mood="wave" size={90} />
          <Text variant="h2" style={{ textAlign: "center" }}>{tx("lesson.kaldigin_yerden_devam")}</Text>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{tx("lesson.bu_derse_ara_vermistin_kaldigin_adimdan")}</Text>
          <View style={{ alignSelf: "stretch", gap: spacing.sm }}>
            <BigButton label={tx("lesson.kaldigin_yerden_devam_et")} onPress={() => { const r = resumeOffer; setResumeOffer(null); setCorrect(r.correct); presentFrom(r.cursor); }} colors={colors} />
            <PressableScale onPress={() => { setResumeOffer(null); void clearLessonResume(lesson.id); presentFrom(0); }}>
              <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, alignItems: "center" }}>
                <Text variant="h3" color={colors.text}>{tx("lesson.bastan_basla")}</Text>
              </View>
            </PressableScale>
          </View>
        </View>
      ) : (
        <>
          <ScrollView ref={scrollRef} automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.lg }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}>
            {feed.map((b) => <BubbleView key={b.id} b={b} colors={colors} onReport={setReport} />)}
            {busy && (
              <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                <ActivityIndicator color={colors.primary} size="small" /><Text variant="caption" color={colors.textMuted}>{tx("lesson.yaziyor")}</Text>
              </View>
            )}
          </ScrollView>

          {/* Alt eylem alanı — tek el için ekranın altında. */}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.bg }}>
            {phase === "lecture" ? (
              <LectureControls expect={expect} tries={tries} input={input} setInput={setInput}
                onConfirm={onConfirm} onRepeatDone={onRepeatDone} onProduce={submitProduce} onTrueFalse={answerTrueFalse}
                colors={colors} />
            ) : (
              <RoleplayControls input={input} setInput={setInput} busy={busy} onSend={() => sendRole()}
                suggestions={suggestions} onSuggest={(s) => sendRole(s)}
                ready={roleplayReady} turns={roleTurns} minTurns={minTurns} onFinish={() => finish(true)} colors={colors} />
            )}
          </View>
        </>
      )}
      <ReportSheet visible={!!report} kind="roleplay" refId={report?.ref ?? ""} content={report?.text ?? ""} onClose={() => setReport(null)} />
    </View>
  );
}

/** Övgü satırları — t() çağrı anında (dil modül yüklenirken hazır değil). */
const PRAISE_KEYS = ["lesson.praise_1", "lesson.praise_2", "lesson.praise_3", "lesson.praise_4", "lesson.praise_5"];

function BubbleView({ b, colors, onReport }: { b: Bubble; colors: Palette; onReport?: (r: ReportRef) => void }) {
  if (b.role === "student") {
    return (
      <View style={{ alignSelf: "flex-end", maxWidth: "84%", marginBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: 6 }}>
        <View style={[{ borderRadius: radii.lg, paddingVertical: 11, paddingHorizontal: spacing.md, backgroundColor: b.ok === false ? colors.danger : colors.primary }, softShadow(colors.primary, 6)]}>
          <Text variant="body" color="#fff">{b.text}</Text>
        </View>
      </View>
    );
  }
  const bg = b.tone === "hint" ? colors.surface2 : b.tone === "why" ? colors.primarySoft : colors.surface;
  return (
    <View style={{ alignSelf: "flex-start", maxWidth: "88%", marginBottom: spacing.md }}>
      <View style={{ borderRadius: radii.lg, paddingVertical: 11, paddingHorizontal: spacing.md, backgroundColor: bg, borderWidth: 1, borderColor: colors.hairline }}>
        <Text variant="body">
          {b.segments.map((s, i) => (
            <Text key={i} variant="body" color={s.lang === "de" ? colors.text : colors.textMuted} style={s.lang === "de" ? { fontWeight: "700" } : undefined}>
              {s.text}{i < b.segments.length - 1 ? " " : ""}
            </Text>
          ))}
        </Text>
        {b.fix?.length ? (
          <View style={{ marginTop: 8, gap: 2, borderTopWidth: 1, borderTopColor: colors.hairline, paddingTop: 6 }}>
            {b.fix.map((f, i) => <Text key={i} variant="micro" color={colors.textMuted}>{tx("lesson.fix", { metin: f })}</Text>)}
          </View>
        ) : null}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: 4, marginLeft: 4 }}>
        {deText(b.segments) ? (
          <PressableScale onPress={() => speakTarget(deText(b.segments))} hitSlop={8} style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <SpeakerIcon color={colors.textMuted} size={15} /><Text variant="micro" color={colors.textMuted}>{tx("lesson.dinle")}</Text>
          </PressableScale>
        ) : null}
        {b.report && onReport ? (
          <PressableScale onPress={() => onReport(b.report!)} hitSlop={8} accessibilityLabel={tx("lesson.bu_yaniti_bildir")}>
            <Text variant="micro" color={colors.textFaint}>{tx("lesson.bildir")}</Text>
          </PressableScale>
        ) : null}
      </View>
    </View>
  );
}

function BigButton({ label, onPress, tint, colors, disabled }: { label: string; onPress: () => void; tint?: string; colors: Palette; disabled?: boolean }) {
  const bg = disabled ? colors.surface2 : tint ?? colors.primary;
  return (
    <PressableScale onPress={disabled ? () => {} : onPress}>
      <View style={[{ borderRadius: radii.lg, backgroundColor: bg, paddingVertical: 15, alignItems: "center" }, disabled ? {} : softShadow(bg, 10)]}>
        <Text variant="h3" color={disabled ? colors.textFaint : colors.onPrimary}>{label}</Text>
      </View>
    </PressableScale>
  );
}

function LectureControls({ expect, tries, input, setInput, onConfirm, onRepeatDone, onProduce, onTrueFalse, colors }: {
  expect: Expectation | undefined; tries: number; input: string; setInput: (s: string) => void;
  onConfirm: () => void; onRepeatDone: () => void; onProduce: () => void; onTrueFalse: (b: boolean) => void; colors: Palette;
}) {
  if (!expect) return <BigButton label={tx("lesson.devam")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "confirm") return <BigButton label={tx("lesson.hazirim")} onPress={onConfirm} colors={colors} />;
  if (expect.kind === "repeat") {
    return (
      <View style={{ gap: spacing.sm }}>
        <PressableScale onPress={() => speakTarget(expect.target)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 10, borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
          <SpeakerIcon color={colors.primary} size={20} /><Text variant="bodyStrong" color={colors.primary}>{expect.target}</Text>
        </PressableScale>
        <BigButton label={tx("lesson.soyledim")} onPress={onRepeatDone} tint={colors.info} colors={colors} />
      </View>
    );
  }
  if (expect.kind === "truefalse") {
    return (
      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(true)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.success, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.success, 8)]}>
              <CheckIcon color="#fff" size={22} /><Text variant="h3" color="#fff">{tx("lesson.dogru")}</Text>
            </View>
          </PressableScale>
        </View>
        <View style={{ flex: 1 }}>
          <PressableScale onPress={() => onTrueFalse(false)}>
            <View style={[{ borderRadius: radii.lg, backgroundColor: colors.danger, paddingVertical: 15, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.danger, 8)]}>
              <XIcon color="#fff" size={22} /><Text variant="h3" color="#fff">{tx("lesson.yanlis")}</Text>
            </View>
          </PressableScale>
        </View>
      </View>
    );
  }
  // produce
  return (
    <View style={{ gap: spacing.sm }}>
      {tries > 0 && <Text variant="caption" color={colors.danger}>Tekrar dene ({tries}/3)</Text>}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
        <TextInput value={input} onChangeText={setInput} placeholder={tx("lesson.hedef_cevabini_yaz", { lang: targetLangName() })} placeholderTextColor={colors.textFaint}
          multiline autoCapitalize="sentences" onSubmitEditing={onProduce}
          style={{ flex: 1, maxHeight: 120, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 16 }} />
        <PressableScale onPress={onProduce} disabled={!input.trim()} style={[{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: input.trim() ? colors.primary : colors.surface2 }, input.trim() ? softShadow(colors.primary, 8) : {}]}>
          <ArrowRightIcon color={input.trim() ? "#fff" : colors.textFaint} size={22} />
        </PressableScale>
      </View>
    </View>
  );
}

function RoleplayControls({ input, setInput, busy, onSend, suggestions, onSuggest, ready, turns, minTurns, onFinish, colors }: {
  input: string; setInput: (s: string) => void; busy: boolean; onSend: () => void;
  suggestions: string[]; onSuggest: (s: string) => void;
  ready: boolean; turns: number; minTurns: number; onFinish: () => void; colors: Palette;
}) {
  return (
    <View style={{ gap: spacing.sm }}>
      {!busy && suggestions.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.xs }}>
          {suggestions.map((s, i) => (
            <PressableScale key={i} onPress={() => onSuggest(s)} style={{ backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: spacing.md, paddingVertical: 8, borderWidth: 1, borderColor: colors.primary }}>
              <Text variant="caption" color={colors.primary}>{s}</Text>
            </PressableScale>
          ))}
        </View>
      )}
      {ready ? (
        <BigButton label={tx("lesson.konusmayi_bitir_ozet")} onPress={onFinish} tint={colors.success} colors={colors} />
      ) : (
        <Text variant="caption" color={colors.textMuted}>{tx("lesson.keep_talking", { n: turns, hedef: minTurns })}</Text>
      )}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
        <TextInput value={input} onChangeText={setInput} editable={!busy} placeholder={tx("lesson.hedef_dilde_yaz", { lang: targetLangName() })} placeholderTextColor={colors.textFaint}
          multiline autoCapitalize="sentences"
          style={{ flex: 1, maxHeight: 120, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 16 }} />
        <PressableScale onPress={onSend} disabled={busy || !input.trim()} style={[{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: input.trim() && !busy ? colors.primary : colors.surface2 }, input.trim() && !busy ? softShadow(colors.primary, 8) : {}]}>
          <ArrowRightIcon color={input.trim() && !busy ? "#fff" : colors.textFaint} size={22} />
        </PressableScale>
      </View>
    </View>
  );
}

function Summary({ lesson, correct, total, next, colors, insets, onBack, onNext }: {
  lesson: Lesson; correct: number; total: number; next: Lesson | null; colors: Palette;
  insets: { bottom: number }; onBack: () => void; onNext?: () => void;
}) {
  const pct = total ? Math.round((correct / total) * 100) : 100;
  const mood = pct >= 80 ? "celebrate" : pct >= 50 ? "happy" : "idle";
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xl, alignItems: "center" }} showsVerticalScrollIndicator={false}>
      <Celebrate show={pct >= 80} />
      <View style={{ marginTop: spacing.lg }}><Mascot mood={mood as never} size={110} /></View>
      <Text variant="display" style={{ marginTop: spacing.md }}>{tx("lesson.ders_bitti")}</Text>
      <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{lesson.title} · {lesson.titleTr}</Text>

      <View style={{ flexDirection: "row", gap: spacing.md, marginTop: spacing.xl, alignSelf: "stretch" }}>
        <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, alignItems: "center" }}>
          <Text variant="display" color={colors.primary}>{total ? `${correct}/${total}` : "—"}</Text>
          <Text variant="caption" color={colors.textMuted}>{tx("lesson.dogru_uretim")}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, alignItems: "center" }}>
          <Text variant="display" color={colors.success}>%{pct}</Text>
          <Text variant="caption" color={colors.textMuted}>{tx("lesson.basari")}</Text>
        </View>
      </View>

      {lesson.patterns?.length ? (
        <View style={{ alignSelf: "stretch", marginTop: spacing.lg, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg }}>
          <Text variant="micro" color={colors.textMuted} style={{ marginBottom: spacing.sm }}>{tx("lesson.ogrendigin_kaliplar")}</Text>
          {lesson.patterns.map((p, i) => (
            <View key={i} style={{ flexDirection: "row", gap: spacing.sm, marginBottom: 6, alignItems: "flex-start" }}>
              <Text variant="bodyStrong" color={colors.text}>{p.de}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{p.tr}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ alignSelf: "stretch", marginTop: spacing.xl, gap: spacing.sm }}>
        {onNext && next ? <BigButton label={`Sonraki ders: ${next.title} →`} onPress={onNext} colors={colors} /> : null}
        <PressableScale onPress={onBack}>
          <View style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 15, alignItems: "center" }}>
            <Text variant="h3" color={colors.text}>{tx("lesson.patika_ya_don")}</Text>
          </View>
        </PressableScale>
      </View>
    </ScrollView>
  );
}
