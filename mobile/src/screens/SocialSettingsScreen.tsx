import React, { useEffect, useState } from "react";
import { t as tx, targetLangName } from "../lib/i18n";
import { ScrollView, Switch, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { social, errorText, type PublicUser, type SocialMe, type Visibility } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton, SkeletonCard, SkeletonLine } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing, radii } from "../theme";
import type { Palette } from "../theme/colors";
import { Pill, ScreenHeader } from "../social/common";

/** Görünürlük seçenekleri — anahtar tutar, çeviri render sırasında çözülür. */
const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "socialsettings.vis_public", sub: "socialsettings.vis_public_sub" },
  { key: "friends", label: "social.tab_friends", sub: "socialsettings.vis_friends_sub" },
  { key: "private", label: "socialsettings.vis_private", sub: "socialsettings.vis_private_sub" },
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
      <ScreenHeader title={tx("socialsettings.social_and_privacy")} />
      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {!me ? (
          // Bölüm bölüm iskelet: kart tek parça gelince ekran boyu zıplamasın.
          <>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={{ marginTop: spacing.xl }}>
                <SkeletonLine variant="caption" width={116} style={{ marginBottom: spacing.sm, marginLeft: 4 }} />
                <SkeletonCard padded>
                  <Skeleton height={48} radius={radii.md} />
                  <SkeletonLine variant="caption" width="70%" style={{ marginTop: spacing.sm }} />
                </SkeletonCard>
              </View>
            ))}
          </>
        ) : (
          <>
            <Section title={tx("socialsettings.username")} colors={colors}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <TextInput value={username} onChangeText={(t) => setUsername(t.toLowerCase())} maxLength={20} autoCapitalize="none" autoCorrect={false} placeholder={tx("socialsettings.username_2")} placeholderTextColor={colors.textFaint} style={[input, { flex: 1 }]} />
                <Pill label={tx("common.save")} small disabled={busy || username.trim() === me.username || me.usernameChangeAvailableIn > 0} onPress={() => void save({ username: username.trim() }, tx("socialsettings.username_updated"))} />
              </View>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{tx("socialsettings.username_rule")} {me.usernameChangeAvailableIn > 0 ? tx("socialsettings.username_wait", { n: me.usernameChangeAvailableIn }) : tx("socialsettings.username_cooldown")}</Text>
              <Text variant="caption" color={colors.textMuted}>{tx("socialsettings.profile_link", { path: `/u/${me.username}` })}</Text>
            </Section>

            <Section title={tx("socialsettings.short_bio")} colors={colors}>
              <TextInput value={bio} onChangeText={(t) => setBio(t.slice(0, 140))} multiline placeholder={tx("socialsettings.why_one_sentence_is_enough", { lang: targetLangName() })} placeholderTextColor={colors.textFaint} style={[input, { minHeight: 72, textAlignVertical: "top" }]} />
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm }}>
                <Text variant="caption" color={colors.textMuted}>{bio.length}/140</Text>
                <Pill label={tx("common.save")} small tone="soft" disabled={busy || (bio.trim() || "") === (me.bio ?? "")} onPress={() => void save({ bio: bio.trim() || null })} />
              </View>
            </Section>

            <Section title={tx("socialsettings.visibility")} colors={colors}>
              {VIS.map((v, i) => {
                const active = me.visibility === v.key;
                return (
                  <PressableScale key={v.key} onPress={() => void save({ visibility: v.key })} disabled={busy} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 12, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong" color={active ? colors.primary : colors.text}>{tx(v.label)}</Text>
                      <Text variant="caption" color={colors.textMuted}>{tx(v.sub)}</Text>
                    </View>
                    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: active ? colors.primary : colors.border, alignItems: "center", justifyContent: "center" }}>
                      {active ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} /> : null}
                    </View>
                  </PressableScale>
                );
              })}
            </Section>

            <Section title={tx("socialsettings.permissions")} colors={colors}>
              {toggle(tx("socialsettings.perm_requests"), tx("socialsettings.perm_requests_sub"), me.allowRequests, (v) => void save({ allowRequests: v }), true)}
              {toggle(tx("socialsettings.perm_suggest"), tx("socialsettings.perm_suggest_sub"), me.showInSuggestions, (v) => void save({ showInSuggestions: v }))}
              {toggle(tx("socialsettings.perm_activity"), tx("socialsettings.perm_activity_sub"), me.showActivity, (v) => void save({ showActivity: v }))}
            </Section>

            <Section title={tx("socialsettings.blocked_title")} colors={colors}>
              {blocked === null ? <SkeletonLine variant="caption" width="60%" /> : blocked.length ? blocked.map((b, i) => (
                <View key={b.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                  <PersonAvatar userId={b.userId} name={b.name} size={36} />
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyStrong" numberOfLines={1}>{b.name ?? tx("social.unnamed_short")}</Text>
                    {b.username ? <Text variant="caption" color={colors.textMuted}>@{b.username}</Text> : null}
                  </View>
                  <Pill label={tx("socialsettings.remove")} small tone="ghost" disabled={busy} onPress={() => { setBusy(true); social.unblock(b.userId).then(() => setBlocked((p) => (p ?? []).filter((x) => x.userId !== b.userId))).catch((e) => setMsg(errorText(e))).finally(() => setBusy(false)); }} />
                </View>
              )) : <Text variant="caption" color={colors.textMuted}>{tx("socialsettings.you_haven_t_blocked_anyone")}</Text>}
            </Section>
          </>
        )}
        {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text> : null}
      </ScrollView>
    </View>
  );
}
