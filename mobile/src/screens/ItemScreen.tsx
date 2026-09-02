import React, { useRef, useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { Mascot } from "../ui/Mascot";
import { Celebrate } from "../ui/Celebrate";
import { XIcon, ReadIcon, ListenIcon, WriteIcon, SpeakerIcon } from "../ui/icons";
import { KIND_LABEL, type ItemKind } from "../data/demoUnit";
import { getExercise, type ListeningSegment } from "../data/skills";
import { QuestionList, GlossPanel, WritingList, type WritingTask } from "../game/skillQuiz";
import { markItemDone } from "../game/lessonProgress";
import { speakTarget } from "../lib/tts";
import { API_BASE } from "../api/client";
import { todayStr } from "../game/session";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { sfx } from "../lib/sfx";

const KIND_ICON: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  read: (p) => <ReadIcon {...p} />, listen: (p) => <ListenIcon {...p} />, write: (p) => <WriteIcon {...p} />,
};
const KIND_TINT: Record<string, keyof Palette> = { read: "info", listen: "accent", write: "success" };

/** Okuma metni — paragraflar \n\n ile ayrılır (web reading-player gibi). */
function ReadingText({ text, colors }: { text: string; colors: Palette }) {
  return (
    <Card style={{ marginTop: spacing.md }}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: spacing.xs }}>
        <PressableScale onPress={() => speakTarget(text)} hitSlop={8} accessibilityLabel="Metni sesli oku"
          style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 6 }}>
          <SpeakerIcon color={colors.primary} size={18} />
          <Text variant="caption" color={colors.primary}>Sesli oku</Text>
        </PressableScale>
      </View>
      {text.split("\n\n").map((p, i) => (
        <Text key={i} variant="body" style={{ lineHeight: 25, marginTop: i > 0 ? spacing.md : 0 }}>{p}</Text>
      ))}
    </Card>
  );
}

/** Dinleme — cihaz TTS'i (audio dosyaları /public'te, çevrimdışı yok); metin gizli başlar. */
function ListeningBody({ segments, colors }: { segments: ListeningSegment[]; colors: Palette }) {
  const [reveal, setReveal] = useState(false);
  const full = segments.map((s) => s.text).join("  ");
  return (
    <>
      <Card style={{ alignItems: "center", marginTop: spacing.md, paddingVertical: spacing.xl }}>
        <PressableScale onPress={() => speakTarget(full)} style={[{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" }, softShadow(colors.accent, 12)]}>
          <SpeakerIcon color="#fff" size={34} />
        </PressableScale>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>Dinle ve anla</Text>
      </Card>
      <PressableScale onPress={() => setReveal((v) => !v)} style={{ marginTop: spacing.md, alignSelf: "flex-start" }}>
        <Text variant="bodyStrong" color={colors.primary}>{reveal ? "Metni gizle" : "Metni göster"}</Text>
      </PressableScale>
      {reveal ? (
        <Card style={{ marginTop: spacing.sm }}>
          {segments.map((s, i) => (
            <View key={i} style={{ marginTop: i > 0 ? spacing.md : 0, flexDirection: "row", alignItems: "flex-start", gap: spacing.sm }}>
              <PressableScale onPress={() => speakTarget(s.text)} hitSlop={6} style={{ marginTop: 2 }}><SpeakerIcon color={colors.textMuted} size={16} /></PressableScale>
              <View style={{ flex: 1 }}>
                {s.speaker ? <Text variant="micro" color={colors.textMuted}>{s.speaker}</Text> : null}
                <Text variant="body" style={{ lineHeight: 24 }}>{s.text}</Text>
              </View>
            </View>
          ))}
        </Card>
      ) : null}
    </>
  );
}

export function ItemScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { params } = useRoute<RouteProp<RootStackParams, "Item">>();
  const exercise = getExercise(params.id);
  const startedAt = useRef(Date.now());
  const saved = useRef(false);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [round, setRound] = useState(0);

  const kind = params.kind as ItemKind;
  const tint = colors[(KIND_TINT[kind] ?? "primary")] as string;
  const Icon = KIND_ICON[kind];

  async function recordAndFinish(c: number) {
    setCorrect(c);
    setFinished(true);
    setTimeout(() => sfx("finish"), 600); // son cevabın sesinden sonra tamamlanma sesi
    if (!exercise || saved.current) return;
    saved.current = true;
    void markItemDone(exercise.id);
    try {
      await fetch(`${API_BASE}/api/skills`, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: exercise.id, correct: c, day: todayStr(), seconds: Math.round((Date.now() - startedAt.current) / 1000) }),
      });
    } catch { /* çevrimdışı: yerel işaret yeterli */ }
  }

  function retry() {
    saved.current = false;
    setFinished(false);
    setCorrect(0);
    setRound((r) => r + 1);
  }

  if (!exercise) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.lg, padding: spacing.xl }}>
        <Mascot mood="sad" size={90} />
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Bu içerik yayına alınınca burada açılacak.</Text>
        <PressableScale onPress={() => nav.goBack()}><Text variant="bodyStrong" color={colors.primary}>Geri dön</Text></PressableScale>
      </View>
    );
  }

  const total = exercise.skill === "writing" ? (exercise.tasks?.length ?? 0) : (exercise.questions?.length ?? 0);
  const pct = total ? Math.round((correct / total) * 100) : 100;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
          {Icon && <View style={{ width: 34, height: 34, borderRadius: radii.sm, backgroundColor: tint, alignItems: "center", justifyContent: "center" }}>{Icon({ color: "#fff", size: 18 })}</View>}
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>{KIND_LABEL[kind] ?? "İçerik"} · {exercise.genre}</Text>
            <Text variant="h3" numberOfLines={1}>{exercise.title}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="body" color={colors.textMuted} style={{ lineHeight: 22 }}>{exercise.intro}</Text>

        {exercise.skill === "reading" && exercise.text ? <ReadingText text={exercise.text} colors={colors} /> : null}
        {exercise.skill === "listening" && exercise.segments ? <ListeningBody segments={exercise.segments} colors={colors} /> : null}

        <GlossPanel gloss={exercise.gloss} colors={colors} />

        {exercise.skill === "writing" ? (
          <WritingList key={round} tasks={(exercise.tasks ?? []) as WritingTask[]} onAllDone={recordAndFinish} colors={colors} />
        ) : (
          <QuestionList key={round} questions={exercise.questions ?? []} onAllAnswered={recordAndFinish} colors={colors} />
        )}

        {finished ? (
          <Card padded style={{ marginTop: spacing.lg, alignItems: "center", gap: spacing.sm }}>
            <Celebrate show={pct >= 70} />
            <Mascot mood={pct >= 70 ? "celebrate" : pct >= 40 ? "happy" : "idle"} size={84} />
            <Text variant="h2">{exercise.skill === "writing" ? "Görevler bitti" : `${correct}/${total} doğru`}</Text>
            {exercise.skill !== "writing" ? <Text variant="caption" color={colors.textMuted}>%{pct} başarı</Text> : null}
            <View style={{ flexDirection: "row", gap: spacing.sm, alignSelf: "stretch", marginTop: spacing.sm }}>
              <PressableScale onPress={retry} style={{ flex: 1, backgroundColor: colors.surface2, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }}>
                <Text variant="bodyStrong" color={colors.text}>Tekrar dene</Text>
              </PressableScale>
              <PressableScale onPress={() => nav.goBack()} style={[{ flex: 1, backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 14, alignItems: "center" }, softShadow(colors.primary, 10)]}>
                <Text variant="bodyStrong" color={colors.onPrimary}>Patika'ya dön</Text>
              </PressableScale>
            </View>
          </Card>
        ) : null}
      </ScrollView>
    </View>
  );
}
