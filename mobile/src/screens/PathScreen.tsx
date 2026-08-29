import React from "react";
import { View } from "react-native";
import { Screen } from "../ui/Screen";
import { Card } from "../ui/Card";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ListenIcon, CheckIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";

// demo veri (gerçek: API + immersion track)
const STATES = ["done", "done", "done", "cur", "rest", "rest", "rest", "rest", "rest", "rest", "rest", "rest", "rest"];
const UNITS = [
  { th: "Selamlaşma & sen", st: "done", n: 1 }, { th: "Tanışma ve ben", st: "cur", n: 2 },
  { th: "Şehirde", st: "lock", n: 3 }, { th: "Yeme-içme", st: "lock", n: 4 },
];

export function PathScreen() {
  const { colors } = useTheme();
  return (
    <Screen>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md }}>
        <Text variant="display">Patika</Text>
        <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 14, paddingVertical: 7 }}>
          <Text variant="caption" color={colors.textMuted}>A1</Text>
        </View>
      </View>
      <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", marginBottom: 6 }}>
        <View style={{ height: "100%", width: "32%", borderRadius: 5, backgroundColor: colors.success }} />
      </View>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.lg }}>A1 · 8/25 ünite tamam</Text>

      {/* öne çıkan aktif ünite */}
      <Card style={{ marginBottom: spacing.lg, borderColor: colors.primary, borderWidth: 2 }}>
        <View style={{ flexDirection: "row", gap: spacing.md, alignItems: "center" }}>
          <View style={[{ width: 54, height: 54, borderRadius: radii.md, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }, softShadow(colors.primary, 8)]}>
            <Text variant="h1" color="#fff">2</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.primary}>ŞU AN · ÜNİTE 2</Text>
            <Text variant="h2">Tanışma ve ben</Text>
            <Text variant="caption" color={colors.textMuted}>3/13 adım</Text>
          </View>
        </View>
        {/* segment çubuğu */}
        <View style={{ flexDirection: "row", gap: 4, marginTop: spacing.md }}>
          {STATES.map((s, i) => (
            <View key={i} style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: s === "done" ? colors.success : s === "cur" ? colors.primary : colors.surface2 }} />
          ))}
        </View>
        {/* sıradaki */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.md, padding: spacing.md, borderRadius: radii.lg, backgroundColor: colors.surface2 }}>
          <View style={{ width: 40, height: 40, borderRadius: radii.md, backgroundColor: colors.info, alignItems: "center", justifyContent: "center" }}>
            <ListenIcon color="#fff" size={20} />
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="micro" color={colors.textMuted}>SIRADAKİ · DİNLEME</Text>
            <Text variant="bodyStrong">Ich heiße Emma</Text>
          </View>
        </View>
        <PressableScale style={{ marginTop: spacing.md }}>
          <View style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 15, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>Devam et →</Text>
          </View>
        </PressableScale>
      </Card>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {UNITS.map((u) => (
          <Card key={u.n} padded style={{ width: "47.5%", minHeight: 116, opacity: u.st === "lock" ? 0.6 : 1 }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 3, borderColor: u.st === "done" ? colors.success : u.st === "cur" ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
              {u.st === "done" ? <CheckIcon color={colors.success} size={18} /> : <Text variant="bodyStrong" color={u.st === "cur" ? colors.primary : colors.textMuted}>{u.n}</Text>}
            </View>
            <Text variant="bodyStrong" style={{ marginTop: 8 }}>{u.th}</Text>
            <Text variant="micro" color={u.st === "done" ? colors.success : colors.textMuted} style={{ marginTop: 2 }}>{u.st === "done" ? "Tamamlandı" : u.st === "lock" ? "Kilitli" : "Devam ediyor"}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
