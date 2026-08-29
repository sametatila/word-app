import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, CheckIcon, BoltIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { fetchQuests, type Quest } from "../game/quests";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

function QuestRow({ q, colors }: { q: Quest; colors: Palette }) {
  const pct = q.target ? Math.min(100, Math.round((q.done / q.target) * 100)) : 0;
  const complete = q.done >= q.target;
  return (
    <Card padded style={{ marginBottom: spacing.md, opacity: complete ? 1 : 0.98, borderWidth: 1, borderColor: complete ? colors.success : colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 42, height: 42, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: complete ? colors.success : colors.primarySoft }, complete ? softShadow(colors.success, 6) : {}]}>
          {complete ? <CheckIcon color="#fff" size={22} /> : <BoltIcon color={colors.primary} size={20} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">{q.label}</Text>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 6 }}>
            <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: complete ? colors.success : colors.primary, borderRadius: 3 }} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{Math.min(q.done, q.target)}/{q.target}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="bodyStrong" color={complete ? colors.success : colors.primary}>+{q.xp}</Text>
          <Text variant="micro" color={colors.textMuted}>XP</Text>
        </View>
      </View>
    </Card>
  );
}

export function QuestsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    fetchQuests()
      .then((b) => { if (alive) { setQuests(b.quests ?? []); setPhase("ready"); } })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user]);

  const doneCount = (quests ?? []).filter((q) => q.done >= q.target).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">Günün görevleri</Text>
          {quests ? <Text variant="caption" color={colors.textMuted}>{doneCount}/{quests.length} tamam</Text> : null}
        </View>
      </View>
      {phase === "loading" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator color={colors.primary} /></View>
      ) : phase === "error" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Görevler için giriş yap ve turlarını oyna — hedefler burada birikir.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {(quests ?? []).map((q) => <QuestRow key={q.id} q={q} colors={colors} />)}
        </ScrollView>
      )}
    </View>
  );
}
