import React, { useEffect, useState } from "react";
import { ScrollView, Switch, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { social, errorText, type PublicUser, type SocialMe, type Visibility } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing, radii } from "../theme";
import { ErrorText, PrimaryButton, ScreenHeader } from "../social/common";

const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "Herkese açık", sub: "Profil ve kilometre taşları herkese görünür" },
  { key: "friends", label: "Arkadaşlar", sub: "İstatistik ve akış yalnız arkadaşlarına" },
  { key: "private", label: "Gizli", sub: "Yalnız adın; aramada tam kullanıcı adıyla" },
];

/** Sosyal ve gizlilik ayarları — web'deki SocialSettings ile aynı alanlar ve kurallar. */
export function SocialSettingsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [me, setMe] = useState<SocialMe | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);

  useEffect(() => {
    if (!user) return;
    social.me().then((m) => { setMe(m); setUsername(m.username); setBio(m.bio ?? ""); }).catch((e) => setMsg(errorText(e)));
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, [user]);

  async function save(patch: Record<string, unknown>, done = "Kaydedildi") {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try { const next = await social.updateMe(patch); setMe(next); setUsername(next.username); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }

  const row = (title: string, sub: string, value: boolean, onChange: (v: boolean) => void, last?: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.hairline }}>
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{title}</Text>
        <Text variant="micro" color={colors.textMuted}>{sub}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} disabled={busy} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
    </View>
  );
  const input = { borderWidth: 1, borderColor: colors.hairline, borderRadius: radii.md, paddingHorizontal: 12, paddingVertical: 10, color: colors.text, backgroundColor: colors.surface2, fontSize: 15 } as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Sosyal ve gizlilik" subtitle="Arkadaşların seni nasıl bulur, ne görür" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.md }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {!me ? <Skeleton height={200} /> : (
          <>
            <Card padded>
              <Text variant="bodyStrong">Kullanıcı adı</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: 6 }}>
                <Text variant="body" color={colors.textMuted}>@</Text>
                <TextInput value={username} onChangeText={(t) => setUsername(t.toLowerCase())} maxLength={20} autoCapitalize="none" autoCorrect={false} style={[input, { flex: 1 }]} />
                <PrimaryButton label="Kaydet" small disabled={busy || username.trim() === me.username || me.usernameChangeAvailableIn > 0} onPress={() => void save({ username: username.trim() }, "Kullanıcı adı güncellendi")} />
              </View>
              <Text variant="micro" color={colors.textMuted} style={{ marginTop: 6 }}>3-20 karakter; küçük harf, rakam, alt çizgi. {me.usernameChangeAvailableIn > 0 ? `${me.usernameChangeAvailableIn} gün sonra değiştirilebilir.` : "14 günde bir değişir."}</Text>
            </Card>
            <Card padded>
              <Text variant="bodyStrong">Kısa tanıtım</Text>
              <TextInput value={bio} onChangeText={(t) => setBio(t.slice(0, 140))} multiline placeholder="Neden Almanca? Bir cümle yeter." placeholderTextColor={colors.textFaint} style={[input, { marginTop: 6, minHeight: 60, textAlignVertical: "top" }]} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <Text variant="micro" color={colors.textMuted}>{bio.length}/140</Text>
                <PrimaryButton label="Kaydet" small tone="ghost" disabled={busy || (bio.trim() || "") === (me.bio ?? "")} onPress={() => void save({ bio: bio.trim() || null })} />
              </View>
            </Card>
            <Card padded>
              <Text variant="bodyStrong" style={{ marginBottom: spacing.sm }}>Görünürlük</Text>
              {VIS.map((v) => {
                const active = me.visibility === v.key;
                return (
                  <PressableScale key={v.key} onPress={() => void save({ visibility: v.key })} disabled={busy} style={{ padding: spacing.md, borderRadius: radii.md, marginBottom: 6, backgroundColor: active ? colors.primarySoft : colors.surface2, borderWidth: 1, borderColor: active ? colors.primary : "transparent" }}>
                    <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{v.label}</Text>
                    <Text variant="micro" color={colors.textMuted}>{v.sub}</Text>
                  </PressableScale>
                );
              })}
            </Card>
            <Card padded>
              {row("Arkadaşlık isteği kabul et", "Kapalıysa seni kimse ekleyemez; sen ekleyebilirsin", me.allowRequests, (v) => void save({ allowRequests: v }))}
              {row("Önerilerde görün", "Ortak arkadaşı olanlara ve aynı seviyedekilere önerilirsin", me.showInSuggestions, (v) => void save({ showInSuggestions: v }))}
              {row("Kilometre taşlarımı paylaş", "Seri, rozet ve görev haberlerin arkadaşlarının akışına düşer", me.showActivity, (v) => void save({ showActivity: v }), true)}
            </Card>
            {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger}>{msg}</Text> : null}
            <Card padded>
              <Text variant="bodyStrong" style={{ marginBottom: 6 }}>Engellenenler</Text>
              {blocked === null ? <Skeleton height={40} /> : blocked.length ? blocked.map((b, i) => (
                <View key={b.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 8, borderBottomWidth: i === blocked.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
                  <PersonAvatar userId={b.userId} name={b.name} size={30} />
                  <Text variant="body" style={{ flex: 1 }} numberOfLines={1}>{b.name ?? "İsimsiz"} <Text variant="micro" color={colors.textMuted}>{b.username ? `@${b.username}` : ""}</Text></Text>
                  <PrimaryButton label="Kaldır" small tone="ghost" disabled={busy} onPress={() => { setBusy(true); social.unblock(b.userId).then(() => setBlocked((p) => (p ?? []).filter((x) => x.userId !== b.userId))).catch((e) => setMsg(errorText(e))).finally(() => setBusy(false)); }} />
                </View>
              )) : <Text variant="micro" color={colors.textMuted}>Kimseyi engellemedin.</Text>}
            </Card>
          </>
        )}
        <ErrorText text={!me && msg ? msg : null} />
      </ScrollView>
    </View>
  );
}
