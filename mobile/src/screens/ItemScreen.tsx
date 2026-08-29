import React, { useState } from "react";
import { View, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ReadIcon, ListenIcon, WriteIcon, GrammarIcon, CheckIcon } from "../ui/icons";
import { KIND_LABEL, type ItemKind } from "../data/demoUnit";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

const KIND_ICON: Record<string, (p: { color: string; size: number }) => React.ReactElement> = {
  read: (p) => <ReadIcon {...p} />, listen: (p) => <ListenIcon {...p} />, write: (p) => <WriteIcon {...p} />, grammar: (p) => <GrammarIcon {...p} />,
};
const KIND_TINT: Record<string, keyof Palette> = { read: "info", listen: "accent", write: "success", grammar: "streak" };

/** Okuma metni (demo A1 — "Tanışma ve ben"). */
function ReadBody({ colors }: { colors: Palette }) {
  const [tr, setTr] = useState(false);
  return (
    <>
      <Card style={{ marginBottom: spacing.lg }}>
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>Ich heiße Emma</Text>
        <Text variant="body" style={{ lineHeight: 26 }}>
          Hallo! Ich heiße Emma. Ich komme aus der Türkei und wohne in Berlin. Ich bin
          Studentin und lerne Deutsch. Ich spreche Türkisch, Englisch und ein bisschen Deutsch.
        </Text>
      </Card>
      <PressableScale onPress={() => setTr((v) => !v)} style={{ marginBottom: spacing.md }}>
        <Text variant="bodyStrong" color={colors.primary}>{tr ? "Çeviriyi gizle" : "Türkçesini göster"}</Text>
      </PressableScale>
      {tr && (
        <Card style={{ backgroundColor: colors.surface2 }}>
          <Text variant="body" color={colors.textMuted} style={{ lineHeight: 24 }}>
            Merhaba! Benim adım Emma. Türkiye'den geliyorum ve Berlin'de yaşıyorum. Öğrenciyim
            ve Almanca öğreniyorum. Türkçe, İngilizce ve biraz Almanca konuşuyorum.
          </Text>
        </Card>
      )}
    </>
  );
}

function ListenBody({ colors }: { colors: Palette }) {
  const [playing, setPlaying] = useState(false);
  const [reveal, setReveal] = useState(false);
  return (
    <>
      <Card style={{ alignItems: "center", marginBottom: spacing.lg, paddingVertical: spacing.xxl }}>
        <PressableScale onPress={() => setPlaying((p) => !p)} style={[{ width: 88, height: 88, borderRadius: 44, backgroundColor: colors.accent, alignItems: "center", justifyContent: "center" }, softShadow(colors.accent, 12)]}>
          {playing
            ? <View style={{ flexDirection: "row", gap: 6 }}><View style={{ width: 7, height: 26, borderRadius: 3, backgroundColor: "#fff" }} /><View style={{ width: 7, height: 26, borderRadius: 3, backgroundColor: "#fff" }} /></View>
            : <View style={{ width: 0, height: 0, borderTopWidth: 14, borderBottomWidth: 14, borderLeftWidth: 22, borderTopColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "#fff", marginLeft: 5 }} />}
        </PressableScale>
        <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>Dinle ve anla</Text>
      </Card>
      <PressableScale onPress={() => setReveal((v) => !v)} style={{ marginBottom: spacing.md }}>
        <Text variant="bodyStrong" color={colors.primary}>{reveal ? "Metni gizle" : "Metni göster"}</Text>
      </PressableScale>
      {reveal && (
        <Card><Text variant="body" style={{ lineHeight: 26 }}>Hallo, ich heiße Emma. Wie heißt du? Ich komme aus Berlin.</Text></Card>
      )}
    </>
  );
}

function WriteBody({ colors }: { colors: Palette }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
      <Card style={{ marginBottom: spacing.lg }}>
        <Text variant="micro" color={colors.textMuted}>GÖREV</Text>
        <Text variant="bodyStrong" style={{ marginTop: 4 }}>Kendini Almanca tanıt (3 cümle): adın, nereden geldiğin, ne öğrendiğin.</Text>
      </Card>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Ich heiße..."
        placeholderTextColor={colors.textFaint}
        multiline
        style={{ minHeight: 120, textAlignVertical: "top", backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, color: colors.text, fontSize: 16, lineHeight: 24 }}
      />
      {sent && (
        <Card style={{ marginTop: spacing.lg, backgroundColor: colors.successSoft, borderColor: colors.success, borderWidth: 1 }}>
          <Text variant="bodyStrong" color={colors.success}>Güzel! ✓ Değerlendirme yakında sunucuda yapılacak.</Text>
        </Card>
      )}
    </>
  );
}

function GrammarBody({ colors }: { colors: Palette }) {
  const rows = [["ich", "bin"], ["du", "bist"], ["er/sie/es", "ist"], ["wir", "sind"], ["ihr", "seid"], ["sie/Sie", "sind"]];
  return (
    <>
      <Card style={{ marginBottom: spacing.lg }}>
        <Text variant="h3" style={{ marginBottom: spacing.sm }}>sein fiili (olmak)</Text>
        <Text variant="body" color={colors.textMuted} style={{ lineHeight: 24 }}>Almancanın en önemli fiili. Kişiye göre çekimi ezberlenmeli:</Text>
      </Card>
      <Card>
        {rows.map(([p, f], i) => (
          <View key={p} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: i < rows.length - 1 ? 1 : 0, borderBottomColor: colors.hairline }}>
            <Text variant="body" color={colors.textMuted}>{p}</Text>
            <Text variant="bodyStrong" color={colors.primary}>{f}</Text>
          </View>
        ))}
      </Card>
    </>
  );
}

export function ItemScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { params } = useRoute<RouteProp<RootStackParams, "Item">>();
  const kind = params.kind as ItemKind;
  const tint = colors[(KIND_TINT[kind] ?? "primary") as keyof Palette] as string;
  const Icon = KIND_ICON[kind];
  const [done, setDone] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, flex: 1 }}>
          {Icon && <View style={{ width: 34, height: 34, borderRadius: radii.sm, backgroundColor: tint, alignItems: "center", justifyContent: "center" }}>{Icon({ color: "#fff", size: 18 })}</View>}
          <View>
            <Text variant="micro" color={colors.textMuted}>{KIND_LABEL[kind] ?? "İçerik"}</Text>
            <Text variant="h3">{params.title}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {kind === "read" && <ReadBody colors={colors} />}
        {kind === "listen" && <ListenBody colors={colors} />}
        {kind === "write" && <WriteBody colors={colors} />}
        {kind === "grammar" && <GrammarBody colors={colors} />}
        {!["read", "listen", "write", "grammar"].includes(kind) && (
          <Card style={{ alignItems: "center", paddingVertical: spacing.xxl }}>
            <Text variant="body" color={colors.textMuted}>Bu adım yakında.</Text>
          </Card>
        )}

        <PressableScale onPress={() => { setDone(true); setTimeout(() => nav.goBack(), 600); }} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8, marginTop: spacing.xl }, softShadow(colors.primary, 10)]}>
          {done && <CheckIcon color="#fff" size={20} />}
          <Text variant="h3" color="#fff">{done ? "Tamamlandı" : "Tamamla →"}</Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}
