import React, { useEffect, useRef, useState } from "react";
import { t } from "../lib/i18n";
import { TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, type SearchHit, type Suggestion } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, SearchIcon, XIcon, HandshakeIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { ErrorText, SectionTitle, StatPill } from "./common";
import { UserActionButton } from "./UserActionButton";

/** Bul: Ayarlar'daki giriş kutusu + her sonuç kendi kartı (kimlik + rozet + pill düğme). */
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
    timer.current = setTimeout(() => { social.search(text).then((r) => { setHits(r.hits); setErr(null); }).catch((e) => setErr(errorText(e))); }, 350);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [q]);

  const open = (username: string | null) => { if (username) nav.navigate("User", { username }); };
  const card = (u: { userId: string; name: string | null; username: string | null; level: string }, note: { label: string; tint: string; icon?: typeof FlameIcon } | null, streak: number, right: React.ReactNode) => (
    <Card key={u.userId} padded style={{ marginBottom: spacing.md }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <PressableScale onPress={() => open(u.username)}><PersonAvatar userId={u.userId} name={u.name} size={48} /></PressableScale>
        <PressableScale onPress={() => open(u.username)} style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{u.name ?? "İsimsiz öğrenci"}</Text>
          <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{u.username ? `@${u.username} · ` : ""}{u.level}</Text>
        </PressableScale>
        {right}
      </View>
      {note || streak > 0 ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.md }}>
          {note ? <StatPill icon={note.icon} label={note.label} tint={note.tint} /> : null}
          {streak > 0 ? <StatPill icon={FlameIcon} label={`${streak} gün seri`} tint={colors.streak} /> : null}
        </View>
      ) : null}
    </Card>
  );

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg }}>
        <SearchIcon color={colors.textMuted} size={20} />
        <TextInput value={q} onChangeText={setQ} placeholder={t("find.kullanici_adi_ya_da_isim")} placeholderTextColor={colors.textFaint} autoCapitalize="none" autoCorrect={false} style={{ flex: 1, paddingVertical: 13, color: colors.text, fontSize: 16 }} accessibilityLabel={t("find.kullanici_ara")} />
        {q ? <PressableScale onPress={() => setQ("")} accessibilityLabel={t("find.temizle")}><XIcon color={colors.textMuted} size={18} /></PressableScale> : null}
      </View>
      <ErrorText text={err} />
      {q.trim().length >= 2 ? (
        <View style={{ marginTop: spacing.lg }}>
          {hits === null ? <Skeleton height={96} radius={26} /> : hits.length ? hits.map((h) => card(h, null, h.currentStreak, <UserActionButton userId={h.userId} relation={h.relation} onChange={onChanged} />)) : (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>{t("find.sonuc_yok_gizli_profiller_yalniz_tam")}</Text>
          )}
        </View>
      ) : (
        <View>
          <SectionTitle title={t("find.taniyor_olabilirsin")} />
          {sugg === null ? <Skeleton height={96} radius={26} /> : sugg.length ? sugg.map((s) => card(s, s.reason === "mutual" ? { label: `${s.mutual} ortak arkadaş`, tint: colors.success, icon: HandshakeIcon } : s.reason === "level" ? { label: `Aynı seviye · ${s.level}`, tint: colors.info } : { label: "Bu hafta aktif", tint: colors.primary }, s.currentStreak, <UserActionButton userId={s.userId} relation="none" onChange={onChanged} />)) : (
            <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }}>{t("find.simdilik_oneri_yok_kullanici_adiyla_ara")}</Text>
          )}
        </View>
      )}
    </View>
  );
}
