import React, { useEffect, useMemo, useState } from "react";
import { t, nativeLangName, targetLangName, formatNumber } from "../lib/i18n";
import { useMe } from "../lib/useMe";
import { View, TextInput, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon } from "../ui/icons";
import { SpeakButton } from "../ui/SpeakButton";
import { useLayout } from "../lib/useLayout";
import { Skeleton, SkeletonLine, SkeletonTile, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { STATUS_KEY, statusOf, dueLabelKey, type WordRow, type WordStatus } from "../data/words";
import { grammarLine } from "../game/wordGrammar";
import { useTheme, spacing, radii, type Palette } from "../theme";

/** Filtreler — etiket ANAHTAR tutar (durum etiketleriyle aynı sözlük girdileri). */
const FILTERS: { key: "" | WordStatus; label: string }[] = [
  { key: "", label: "words.filter_all" },
  { key: "new", label: "words.status_new" },
  { key: "learning", label: "words.status_learning" },
  { key: "mastered", label: "words.status_mastered" },
];

/** Seviye süzgeci — boş "hepsi" demek; uç aynı beş değeri kabul ediyor. */
const LEVELS = ["", "A1", "A2", "B1", "B2", "C1"];

/* Renkler web `word-list` `statusOf` tonlarıyla aynı rolde: mastered mint,
   familiar sky, learning flame, leech rose, new soluk. */
function statusColor(s: WordStatus, colors: Palette): string {
  if (s === "leech") return colors.danger;
  if (s === "mastered") return colors.success;
  if (s === "familiar") return colors.info;
  if (s === "learning") return colors.streak;
  return colors.textMuted;
}

export function WordsScreen() {
  // Tablette satır listesi iki sütuna bölünüyor: görünen kelime sayısı ikiye
  // katlanıyor, satırın kendi genişliği okunur kalıyor (bkz. useLayout).
  const { listColumns } = useLayout();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  /* Seviye süzgeci: uç `?level=` destekliyordu (web listesi kullanıyor) ama
     mobil hiç göndermiyordu - kullanıcı yalnız seviyesindeki kelimeleri
     ayıramıyordu. */
  const [level, setLevel] = useState("");
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
    if (level) params.set("level", level);
    api<{ words: WordRow[] }>(`/api/words?${params.toString()}`)
      .then((d) => { if (alive) { setRemote(d.words ?? []); setPhase("ready"); } })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, q, filter, level, attempt]);

  const list = useMemo(() => remote ?? [], [remote]);
  const { me } = useMe();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text variant="h2">{t("words.my_words")}</Text>
          {/* İLERLEME ÖZETİ — web listesi başlığın altında yazıyor. Sayılar
              zaten `useMe` içinde geliyordu (`mastered`, `totalWords`,
              `dueCount`); mobil hiçbirini göstermiyordu, yani liste "kaç
              kelime pekişti, kaçı tekrar sırasında" sorusuna cevap
              vermiyordu. Ek istek yok. */}
          {me ? (
            <Text variant="caption" color={colors.textMuted}>
              {t("words.progress_summary", {
                mastered: formatNumber(me.mastered),
                seen: formatNumber(me.totalWords),
                due: me.dueCount ?? 0,
              })}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.md }}>
        {/* Liste CANLI süzülüyor; return tuşunun işi klavyeyi kapatmak. */}
        <TextInput
          returnKeyType="done"
          value={q}
          onChangeText={setQ}
          placeholder={t("words.search", { target: targetLangName(), nativeLang: nativeLangName() })}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 15 }}
        />
        {/* Seviye şeridi — web listesindeki seviye süzgecinin karşılığı. */}
        <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
          {LEVELS.map((lv) => {
            const active = level === lv;
            return (
              <PressableScale key={lv || "all"} onPress={() => setLevel(lv)} style={{ paddingHorizontal: 12, paddingVertical: 7, borderRadius: radii.pill, backgroundColor: active ? colors.info : colors.surface2 }}>
                <Text variant="caption" color={active ? colors.onFill : colors.textMuted}>{lv || t("words.filter_level")}</Text>
              </PressableScale>
            );
          })}
        </View>
        <View style={{ flexDirection: "row", gap: spacing.sm }}>
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <PressableScale key={f.key || "all"} onPress={() => setFilter(f.key)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: active ? colors.primary : colors.surface2 }}>
                <Text variant="caption" color={active ? colors.onPrimary : colors.textMuted}>{t(f.label)}</Text>
              </PressableScale>
            );
          })}
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(w) => String(w.id)}
        // `key` sütun sayısıyla değişmeli: FlatList numColumns'un çalışırken
        // değişmesine izin vermiyor, döndürmede hata fırlatırdı.
        key={listColumns}
        numColumns={listColumns}
        columnWrapperStyle={listColumns > 1 ? { gap: spacing.sm } : undefined}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.sm }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          phase === "loading" ? (
            // Spinner yerine satır iskeleti: liste dolunca yükseklik değişmiyor.
            <View style={{ gap: spacing.sm }}>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, paddingHorizontal: spacing.lg, paddingVertical: 12 }}>
                  <View style={{ flex: 1 }}>
                    <SkeletonLine variant="bodyStrong" width="55%" />
                    <SkeletonLine variant="caption" width="35%" />
                  </View>
                  <SkeletonTile size={34} radius={17} />
                  <Skeleton height={textHeight("micro") + 4} width={30} radius={radii.sm} />
                  <Skeleton height={9} width={9} radius={5} />
                  <SkeletonLine variant="micro" width={40} />
                </View>
              ))}
            </View>
          ) : phase === "error" ? (
            <View style={{ alignItems: "center", gap: spacing.md, marginTop: spacing.xxl }}>
              <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("words.couldn_t_load_your_words")}</Text>
              <PressableScale onPress={() => setAttempt((n) => n + 1)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border }}>
                <Text variant="bodyStrong" color={colors.primaryText}>{t("common.try_again")}</Text>
              </PressableScale>
            </View>
          ) : (
            <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.xxl }}>{t("words.no_words_found")}</Text>
          )
        }
        renderItem={({ item: w }) => {
          const st = statusOf(w);
          const sc = statusColor(st, colors);
          const due = dueLabelKey(w.dueAt);
          return (
            // Çok sütunda satır paydan payını alsın; tek sütunda `flex` VERİLMEZ,
            // FlatList'in dikey kabında yüksekliği doldurmaya çalışırdı.
            <View style={{ flex: listColumns > 1 ? 1 : undefined, flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, paddingHorizontal: spacing.lg, paddingVertical: 12 }}>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{w.artikel ? `${w.artikel} ${w.de}` : w.de}</Text>
                <Text variant="caption" color={colors.textMuted}>{w.tr}</Text>
                {/* Tür ve çoğul — web listesi de aynı satırı yazıyor. */}
                <Text variant="micro" color={colors.textFaint}>{grammarLine(w, w.tr)}</Text>
                {/* TEKRAR TAKVİMİ: ne zaman geleceği ve kaç kez zorlanıldığı.
                    Web listesi ikisini de yazıyor; mobil yalnız durumu
                    gösteriyordu, yani "bu kelime beni zorluyor" bilgisi
                    hiçbir yerde yoktu. */}
                <Text variant="micro" color={colors.textFaint}>
                  {t(due.key, due.n === undefined ? undefined : { n: due.n })}
                  {w.lapses ? ` · ${t("words.n_lapses", { n: w.lapses })}` : ""}
                </Text>
              </View>
              <SpeakButton text={w.artikel ? `${w.artikel} ${w.de}` : w.de} size={34} />
              <View style={{ backgroundColor: colors.surface2, borderRadius: radii.sm, paddingHorizontal: 7, paddingVertical: 2 }}>
                <Text variant="micro" color={colors.textMuted}>{w.niveau}</Text>
              </View>
              <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: sc }} />
              <Text variant="micro" color={sc}>{t(STATUS_KEY[st])}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
