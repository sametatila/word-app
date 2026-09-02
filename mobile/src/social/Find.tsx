import React, { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, type SearchHit, type Suggestion } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { FlameIcon, SearchIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { ErrorText, PersonRow } from "./common";
import { UserActionButton } from "./UserActionButton";

/** Bul: arama (350 ms beklemeli, 2+ karakter) + öneriler. */
export function Find({ onChanged }: { onChanged?: () => void }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [sugg, setSugg] = useState<Suggestion[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { social.suggestions().then((r) => setSugg(r.suggestions)).catch(() => setSugg([])); }, []);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const text = q.trim();
    if (text.length < 2) { setHits(null); setErr(null); return; }
    timer.current = setTimeout(() => {
      social.search(text).then((r) => { setHits(r.hits); setErr(null); }).catch((e) => setErr(errorText(e)));
    }, 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [q]);

  const open = (username: string | null) => { if (username) nav.navigate("User", { username }); };
  const row = (u: { userId: string; name: string | null; username: string | null }, note: string, streak: number, right: React.ReactNode, last: boolean) => (
    <PersonRow
      key={u.userId}
      colors={colors}
      last={last}
      onPress={() => open(u.username)}
      avatar={<PersonAvatar userId={u.userId} name={u.name} size={42} />}
      title={<Text variant="bodyStrong" numberOfLines={1}>{u.name ?? "İsimsiz öğrenci"} <Text variant="micro" color={colors.textMuted}>{u.username ? `@${u.username}` : ""}</Text></Text>}
      subtitle={
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text variant="micro" color={colors.textMuted}>{note}</Text>
          {streak > 0 ? <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><FlameIcon color={colors.streak} size={11} /><Text variant="micro" color={colors.streak}>{streak}</Text></View> : null}
        </View>
      }
      right={right}
    />
  );

  return (
    <View style={{ gap: spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, paddingHorizontal: spacing.md }}>
        <SearchIcon color={colors.textMuted} size={18} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Kullanıcı adı ya da isim"
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          autoCorrect={false}
          style={{ flex: 1, paddingVertical: 12, color: colors.text, fontSize: 15 }}
          accessibilityLabel="Kullanıcı ara"
        />
      </View>
      <ErrorText text={err} />
      {q.trim().length >= 2 ? (
        hits === null ? <Skeleton height={64} /> : hits.length ? (
          <Card padded={false}>{hits.map((h, i) => row(h, h.level, h.currentStreak, <UserActionButton userId={h.userId} relation={h.relation} onChange={onChanged} />, i === hits.length - 1))}</Card>
        ) : <Text variant="body" color={colors.textMuted}>Sonuç yok. Gizli profiller yalnız tam kullanıcı adıyla bulunur.</Text>
      ) : (
        <View>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, fontWeight: "700" }}>TANIYOR OLABİLİRSİN</Text>
          {sugg === null ? <Skeleton height={64} /> : sugg.length ? (
            <Card padded={false}>{sugg.map((s, i) => row(s, s.reason === "mutual" ? `${s.mutual} ortak arkadaş` : s.reason === "level" ? `Aynı seviye (${s.level})` : "Bu hafta aktif", s.currentStreak, <UserActionButton userId={s.userId} relation="none" onChange={onChanged} />, i === sugg.length - 1))}</Card>
          ) : <Text variant="body" color={colors.textMuted}>Şimdilik öneri yok. Kullanıcı adıyla ara ya da davet bağlantını paylaş.</Text>}
        </View>
      )}
    </View>
  );
}
