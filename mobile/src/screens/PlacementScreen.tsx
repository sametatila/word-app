import React, { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon } from "../ui/icons";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { DEMO_PLACEMENT, estimateLevel } from "../data/demoPlacement";
import { useAuth } from "../lib/AuthContext";
import { updateProfile } from "../lib/updateProfile";
import { useTheme, spacing, radii, softShadow } from "../theme";

function toRound(i: number): ChoiceRound {
  const q = DEMO_PLACEMENT[i];
  return { wordId: i, question: q.question, answer: q.answer, options: q.options, prompt: q.prompt };
}

export function PlacementScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [saved, setSaved] = useState(false);
  const total = DEMO_PLACEMENT.length;
  const done = idx >= total;
  const level = estimateLevel(correct);

  function onDone(ok: boolean) { if (ok) setCorrect((c) => c + 1); setIdx((i) => i + 1); }

  async function applyLevel() {
    if (user) { await updateProfile({ level }); setSaved(true); setTimeout(() => nav.goBack(), 700); }
    else nav.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${Math.round((Math.min(idx, total) / total) * 100)}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{Math.min(idx + (done ? 0 : 1), total)}/{total}</Text>
      </View>

      {!done ? (
        <>
          <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>Seviye testi</Text>
          <ChoiceGame key={idx} round={toRound(idx)} onDone={onDone} />
        </>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={[{ width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 14)]}>
            <Text variant="display" color="#fff" style={{ fontSize: 40 }}>{level}</Text>
          </View>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>Seviyen: {level}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, marginBottom: spacing.xxl, textAlign: "center" }}>
            {total} sorudan {correct} doğru. Bu seviyeden başlayabilirsin.
          </Text>
          {saved && <Text variant="bodyStrong" color={colors.success} style={{ marginBottom: spacing.md }}>Kaydedildi ✓</Text>}
          <PressableScale onPress={applyLevel} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{user ? "Seviyemi ayarla" : "Anladım"}</Text>
          </PressableScale>
          <PressableScale onPress={() => nav.goBack()} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>Kapat</Text>
          </PressableScale>
        </View>
      )}
    </View>
  );
}
