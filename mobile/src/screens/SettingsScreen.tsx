import React, { useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ChevronLeftIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { useMe } from "../lib/useMe";
import { updateProfile } from "../lib/updateProfile";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const GOALS = [10, 20, 30, 50];
const LEVELS = ["A1", "A2", "B1", "B2", "C1"];

function Chip({ label, active, onPress, colors }: { label: string; active: boolean; onPress: () => void; colors: Palette }) {
  return (
    <PressableScale onPress={onPress} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: active ? colors.primary : colors.border, backgroundColor: active ? colors.primarySoft : colors.surface }}>
      <Text variant="bodyStrong" color={active ? colors.primary : colors.textMuted}>{label}</Text>
    </PressableScale>
  );
}

export function SettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { user, refresh } = useAuth();
  const { me } = useMe();

  const [name, setName] = useState(me?.name ?? user?.name ?? "");
  const [goal, setGoal] = useState<number>(me?.dailyGoal ?? 20);
  const [level, setLevel] = useState<string>(me?.level ?? "A1");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save() {
    if (busy) return;
    if (!user) { nav.navigate("Auth"); return; }
    setBusy(true);
    setMsg(null);
    const ok = await updateProfile({ displayName: name.trim() || undefined, dailyGoal: goal, level });
    setBusy(false);
    if (ok) { await refresh(); setMsg("Kaydedildi ✓"); setTimeout(() => nav.goBack(), 600); }
    else setMsg("Kaydedilemedi, tekrar dene.");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ChevronLeftIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">Ayarlar</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md, marginBottom: spacing.sm, marginLeft: 4 }}>PROFİL</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Görünen ad"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="words"
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 14, color: colors.text, fontSize: 16 }}
        />

        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl, marginBottom: spacing.sm, marginLeft: 4 }}>GÜNLÜK HEDEF (tekrar / gün)</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {GOALS.map((g) => <Chip key={g} label={String(g)} active={goal === g} onPress={() => setGoal(g)} colors={colors} />)}
        </View>

        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl, marginBottom: spacing.sm, marginLeft: 4 }}>SEVİYE</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {LEVELS.map((l) => <Chip key={l} label={l} active={level === l} onPress={() => setLevel(l)} colors={colors} />)}
        </View>

        {!user && (
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xl }}>
            Ayarların hesabına kaydedilir. Kaydetmek için giriş yap.
          </Text>
        )}
        {msg && <Text variant="bodyStrong" color={msg.includes("✓") ? colors.success : colors.danger} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text>}

        <PressableScale onPress={save} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.xl }, softShadow(colors.primary, 10)]}>
          <Text variant="h3" color="#fff">{busy ? "..." : user ? "Kaydet" : "Giriş yap ve kaydet"}</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
