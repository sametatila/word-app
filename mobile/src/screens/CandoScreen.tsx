import React, { useEffect, useMemo, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, CheckIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { fetchCando, type CandoData, type CandoItem } from "../game/cando";
import { useTheme, spacing, radii, type Palette } from "../theme";

const LEVELS = ["A1", "A2", "B1", "B2", "C1"];
const SKILL_LABEL: Record<string, string> = { reading: "Okuma", listening: "Dinleme", writing: "Yazma", speaking: "Konuşma", grammar: "Dil bilgisi", vocab: "Kelime" };

function Row({ it, colors }: { it: CandoItem; colors: Palette }) {
  const tint = it.state === "proven" ? colors.success : it.state === "progressing" ? colors.primary : colors.textFaint;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10 }}>
      <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: it.state === "proven" ? colors.successSoft : colors.surface2 }}>
        {it.state === "proven" ? <CheckIcon color={colors.success} size={15} /> : <Text variant="micro" color={tint}>{it.total ? `${it.done}/${it.total}` : ""}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <Text variant="body" color={it.state === "none" ? colors.textMuted : colors.text}>{it.cando.tr}</Text>
        <Text variant="micro" color={colors.textFaint}>{SKILL_LABEL[it.cando.skill] ?? it.cando.skill}</Text>
      </View>
    </View>
  );
}

export function CandoScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [data, setData] = useState<CandoData | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    fetchCando().then((d) => { if (alive) { setData(d); setPhase("ready"); } }).catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user]);

  const byLevel = useMemo(() => {
    const g: Record<string, CandoItem[]> = {};
    for (const it of data?.items ?? []) (g[it.cando.level] ??= []).push(it);
    return g;
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel="Geri" style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Neler yapabilirim</Text>
      </View>
      {phase === "loading" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator color={colors.primary} /></View>
      ) : phase === "error" ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xl }}><Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>Giriş yapıp ders ve alıştırmaları bitirdikçe "yapabilirim" ifadelerin burada kanıtlanır.</Text></View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
          {/* seviye özeti */}
          <Card style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
            {LEVELS.filter((lv) => data?.byLevel?.[lv]?.total).map((lv) => {
              const b = data!.byLevel[lv]; const pct = b.total ? Math.round((b.proven / b.total) * 100) : 0;
              return (
                <View key={lv} style={{ marginBottom: spacing.sm }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 4 }}>
                    <Text variant="bodyStrong">{lv}</Text>
                    <Text variant="caption" color={colors.textMuted}>{b.proven}/{b.total} ifade</Text>
                  </View>
                  <View style={{ height: 7, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
                    <View style={{ height: "100%", width: `${Math.max(2, pct)}%`, backgroundColor: colors.success, borderRadius: 4 }} />
                  </View>
                </View>
              );
            })}
          </Card>
          {LEVELS.filter((lv) => byLevel[lv]?.length).map((lv) => (
            <View key={lv} style={{ marginBottom: spacing.lg }}>
              <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.xs, marginLeft: 4 }}>{lv}</Text>
              <Card padded>
                {byLevel[lv].map((it, i) => (
                  <View key={it.cando.id}>
                    {i > 0 ? <View style={{ height: 1, backgroundColor: colors.hairline }} /> : null}
                    <Row it={it} colors={colors} />
                  </View>
                ))}
              </Card>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
