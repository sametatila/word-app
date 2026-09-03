import React, { useEffect, useState } from "react";
import { t as tx, targetLangName } from "../lib/i18n";
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
import type { Palette } from "../theme/colors";
import { Pill, ScreenHeader } from "../social/common";

const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "Herkese açık", sub: "Profil ve kilometre taşları herkese görünür" },
  { key: "friends", label: "Arkadaşlar", sub: "İstatistik ve akış yalnız arkadaşlarına" },
  { key: "private", label: "Gizli", sub: "Yalnız adın; aramada tam kullanıcı adıyla" },
];

/** Ayarlar ekranındaki Section: caption büyük-harf başlık + kart. */
function Section({ title, colors, children }: { title: string; colors: Palette; children: React.ReactNode }) {
  return (
    <View style={{ marginTop: spacing.xl }}>
      <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, letterSpacing: 0.5 }}>{title}</Text>
      <Card padded>{children}</Card>
    </View>
  );
}

/** Sosyal ve gizlilik — Ayarlar ekranıyla aynı dil: bölümler, surface2 giriş kutusu, radyo satırları, Switch satırları. */
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

  const input = { backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 } as const;
  const toggle = (title: string, sub: string, value: boolean, onChange: (v: boolean) => void, first?: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: first ? 0 : 1, borderTopColor: colors.hairline }}>
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{title}</Text>
        <Text variant="caption" color={colors.textMuted}>{sub}</Text>
      </View>
      <Switch value={value} onValueChange={onChange} disabled={busy} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={tx("socialsettings.sosyal_ve_gizlilik")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {!me ? <Skeleton height={220} radius={26} style={{ marginTop: spacing.xl }} /> : (
          <>
            <Section title={tx("socialsettings.kullanici_adi")} colors={colors}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <TextInput value={username} onChangeText={(t) => setUsername(t.toLowerCase())} maxLength={20} autoCapitalize="none" autoCorrect={false} placeholder={tx("socialsettings.kullaniciadi")} placeholderTextColor={colors.textFaint} style={[input, { flex: 1 }]} />
                <Pill label={tx("common.kaydet")} small disabled={busy || username.trim() === me.username || me.usernameChangeAvailableIn > 0} onPress={() => void save({ username: username.trim() }, "Kullanıcı adı güncellendi")} />
              </View>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>3-20 karakter; küçük harf, rakam, alt çizgi. {me.usernameChangeAvailableIn > 0 ? `${me.usernameChangeAvailableIn} gün sonra değiştirilebilir.` : "14 günde bir değişir."}</Text>
              <Text variant="caption" color={colors.textMuted}>Profil bağlantın: /u/{me.username}</Text>
            </Section>

            <Section title={tx("socialsettings.kisa_tanitim")} colors={colors}>
              <TextInput value={bio} onChangeText={(t) => setBio(t.slice(0, 140))} multiline placeholder={tx("socialsettings.neden_bu_dil", { lang: targetLangName() })} placeholderTextColor={colors.textFaint} style={[input, { minHeight: 72, textAlignVertical: "top" }]} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted}>{bio.length}/140</Text>
                <Pill label={tx("common.kaydet")} small tone="soft" disabled={busy || (bio.trim() || "") === (me.bio ?? "")} onPress={() => void save({ bio: bio.trim() || null })} />
              </View>
            </Section>

            <Section title={tx("socialsettings.gorunurluk")} colors={colors}>
              {VIS.map((v, i) => {
                const active = me.visibility === v.key;
                return (
                  <PressableScale key={v.key} onPress={() => void save({ visibility: v.key })} disabled={busy} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{v.label}</Text>
                      <Text variant="caption" color={colors.textMuted}>{v.sub}</Text>
                    </View>
                    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                      {active ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
                    </View>
                  </PressableScale>
                );
              })}
            </Section>

            <Section title={tx("socialsettings.izinler")} colors={colors}>
              {toggle("Arkadaşlık isteği kabul et", "Kapalıysa seni kimse ekleyemez; sen ekleyebilirsin", me.allowRequests, (v) => void save({ allowRequests: v }), true)}
              {toggle("Önerilerde görün", "Ortak arkadaşı olanlara ve aynı seviyedekilere önerilirsin", me.showInSuggestions, (v) => void save({ showInSuggestions: v }))}
              {toggle("Kilometre taşlarımı paylaş", "Seri, rozet ve görev haberlerin arkadaşlarının akışına düşer", me.showActivity, (v) => void save({ showActivity: v }))}
            </Section>

            <Section title="ENGELLENENLER" colors={colors}>
              {blocked === null ? <Skeleton height={40} /> : blocked.length ? blocked.map((b, i) => (
                <View key={b.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                  <PersonAvatar userId={b.userId} name={b.name} size={36} />
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyStrong" numberOfLines={1}>{b.name ?? "İsimsiz"}</Text>
                    {b.username ? <Text variant="caption" color={colors.textMuted}>@{b.username}</Text> : null}
                  </View>
                  <Pill label={tx("socialsettings.kaldir")} small tone="ghost" disabled={busy} onPress={() => { setBusy(true); social.unblock(b.userId).then(() => setBlocked((p) => (p ?? []).filter((x) => x.userId !== b.userId))).catch((e) => setMsg(errorText(e))).finally(() => setBusy(false)); }} />
                </View>
              )) : <Text variant="caption" color={colors.textMuted}>{tx("socialsettings.kimseyi_engellemedin")}</Text>}
            </Section>
          </>
        )}
        {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text> : null}
      </ScrollView>
    </View>
  );
}
