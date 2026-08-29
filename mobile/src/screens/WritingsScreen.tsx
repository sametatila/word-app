import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon, WriteIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { fetchWritings, type Writing } from "../game/writings";
import { useTheme, spacing, radii, type Palette } from "../theme";

const KIND_LABEL: Record<string, string> = { writing: "Yazma", speaking: "Konuşma" };

function scoreTone(score: number | null, colors: Palette): string {
  if (score === null) return colors.textMuted;
  return score >= 70 ? colors.success : score >= 40 ? colors.streak : colors.danger;
}

function WritingCard({ w, colors }: { w: Writing; colors: Palette }) {
  const [open, setOpen] = useState(false);
  const score = w.result?.score?.overall ?? null;
  const tone = scoreTone(score, colors);
  return (
    <PressableScale onPress={() => setOpen((o) => !o)}>
      <Card padded style={{ marginBottom: spacing.md }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ width: 48, height: 48, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: score === null ? colors.surface2 : tone + "22" }}>
            <Text variant="h3" color={tone}>{score ?? "…"}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{KIND_LABEL[w.kind] ?? w.kind} · {w.level}</Text>
            <Text variant="caption" color={colors.textMuted} numberOfLines={open ? undefined : 2}>{w.answer}</Text>
          </View>
        </View>
        {open && score === null ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>Puanlanacak.</Text> : null}
        <Text variant="micro" color={colors.textFaint} style={{ marginTop: spacing.sm }}>{w.day}</Text>
      </Card>
    </PressableScale>
  );
}

export function WritingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [items, setItems] = useState<Writing[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    fetchWritings().then((it) => { if (alive) { setItems(it); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Yazılarım</Text>
      </View>
      {phase === "loading" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator color={colors.primary} /></View>
      ) : phase === "error" || (items && items.length === 0) ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg, paddingHorizontal: spacing.xl }}>
          <View style={{ width: 80, height: 80, borderRadius: 24, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" }}><WriteIcon color={colors.primary} size={36} /></View>
          <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Henüz değerlendirilmiş yazın yok. Yazma alıştırması yapıp değerlendirt — buraya gelir.</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {(items ?? []).map((w) => <WritingCard key={w.id} w={w} colors={colors} />)}
        </ScrollView>
      )}
    </View>
  );
}
