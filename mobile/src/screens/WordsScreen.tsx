import React, { useEffect, useMemo, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon } from "../ui/icons";
import { SpeakButton } from "../ui/SpeakButton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { STATUS_LABEL, type WordRow, type WordStatus } from "../data/words";
import { useTheme, spacing, radii, type Palette } from "../theme";

const FILTERS: { key: "" | WordStatus; label: string }[] = [
  { key: "", label: "Tümü" },
  { key: "new", label: "Yeni" },
  { key: "learning", label: "Öğreniyor" },
  { key: "mastered", label: "Pekişti" },
];

function statusColor(s: WordStatus, colors: Palette): string {
  return s === "mastered" ? colors.success : s === "learning" ? colors.info : colors.textMuted;
}

export function WordsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"" | WordStatus>("");
  const [remote, setRemote] = useState<WordRow[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  // Sunucudan getir (arama/süzgeç değişince). Hata: uydurma liste yok, "tekrar dene".
  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    setPhase("loading");
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (filter) params.set("status", filter);
    api<{ words: WordRow[] }>(`/api/words?${params.toString()}`)
      .then((d) => { if (alive) { setRemote(d.words ?? []); setPhase("ready"); } })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, q, filter, attempt]);

  const list = useMemo(() => remote ?? [], [remote]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.geri")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <Text variant="h2">{t("words.kelimelerim")}</Text>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.md }}>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Kelime ara (Almanca / Türkçe)"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 15 }}
        />
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <PressableScale key={f.key || "all"} onPress={() => setFilter(f.key)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: active ? colors.primary : colors.surface2 }}>
                <Text variant="caption" color={active ? "#fff" : colors.textMuted}>{f.label}</Text>
              </PressableScale>
            );
          })}
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(w) => String(w.id)}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.sm }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          phase === "loading" ? (
            <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.xxl }} />
          ) : phase === "error" ? (
            <View style={{ alignItems: "center", gap: spacing.md, marginTop: spacing.xxl }}>
              <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("words.yuklenemedi")}</Text>
              <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
                <Text variant="bodyStrong" color={colors.primary}>{t("common.tekrar_dene")}</Text>
              </PressableScale>
            </View>
          ) : (
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.xxl }}>{t("words.kelime_bulunamadi")}</Text>
          )
        }
        renderItem={({ item: w }) => {
          const sc = statusColor(w.status, colors);
          return (
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, paddingHorizontal: spacing.lg, paddingVertical: 12 }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{w.artikel ? `${w.artikel} ${w.de}` : w.de}</Text>
                <Text variant="caption" color={colors.textMuted}>{w.tr}</Text>
              </View>
              <SpeakButton text={w.artikel ? `${w.artikel} ${w.de}` : w.de} size={34} />
              <View style={{ backgroundColor: colors.surface2, borderRadius: radii.sm, paddingHorizontal: 7, paddingVertical: 2 }}>
                <Text variant="micro" color={colors.textMuted}>{w.niveau}</Text>
              </View>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: sc }} />
              <Text variant="micro" color={sc}>{STATUS_LABEL[w.status]}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
