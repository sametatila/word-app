import React, { useEffect, useMemo, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon } from "../ui/icons";
import { SpeakButton } from "../ui/SpeakButton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { DEMO_WORD_LIST, STATUS_LABEL, type WordRow, type WordStatus } from "../data/demoWordList";
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

  // Authed: sunucudan getir (arama/süzgeç değişince). Misafir/hata: demo yerelde süzülür.
  useEffect(() => {
    if (!user) { setRemote(null); return; }
    let alive = true;
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (filter) params.set("status", filter);
    api<{ words: WordRow[] }>(`/api/words?${params.toString()}`)
      .then((d) => { if (alive) setRemote(d.words ?? []); })
      .catch(() => { if (alive) setRemote(null); });
    return () => { alive = false; };
  }, [user, q, filter]);

  const list = useMemo(() => {
    if (remote) return remote;
    // yerel (demo) süzme
    const ql = q.trim().toLowerCase();
    return DEMO_WORD_LIST.filter((w) =>
      (!filter || w.status === filter) &&
      (!ql || w.de.toLowerCase().includes(ql) || w.tr.toLowerCase().includes(ql)),
    );
  }, [remote, q, filter]);

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
        ListEmptyComponent={<Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.xxl }}>{t("words.kelime_bulunamadi")}</Text>}
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
