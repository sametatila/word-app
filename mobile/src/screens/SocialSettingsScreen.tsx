import React, { useEffect, useState } from "react";
import { t as tx } from "../lib/i18n";
import { Switch, TextInput, View } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { social, errorText, type PublicUser, type SocialMe, type Visibility } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton, SkeletonCard, SkeletonLine } from "../ui/Skeleton";
import { Avatar } from "../ui/Avatar";
import { PressableScale } from "../ui/PressableScale";
import { RadioDot } from "../ui/RadioDot";
import { useTheme, spacing, radii } from "../theme";
import { EmptyCard, Pill, ScreenHeader, SectionTitle } from "../social/common";
import { AlertIcon } from "../ui/icons";
import { SOCIAL_LIMITS } from "../lib/profileDefaults";
import { GuestAccountCard } from "../ui/GuestAccountCard";

/** Görünürlük seçenekleri — anahtar tutar, çeviri render sırasında çözülür. */
const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "socialsettings.vis_public", sub: "socialsettings.vis_public_sub" },
  { key: "friends", label: "social.tab_friends", sub: "socialsettings.vis_friends_sub" },
  { key: "private", label: "socialsettings.vis_private", sub: "socialsettings.vis_private_sub" },
];

/** Bölüm: ortak `SectionTitle` (büyük harf, başlık rolü) + kart. */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <SectionTitle title={title} />
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
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);
  /* Açılış yüklemesi düşerse iskelet sonsuza dek dönüyor ve altında kırmızı
     bir satır kalıyordu; artık hata kartı ve "Tekrar dene". */
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!user || user.guest) return;
    social.me().then((m) => { setMe(m); setUsername(m.username); }).catch((e) => setLoadErr(errorText(e)));
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, [user, attempt]);

  async function save(patch: Record<string, unknown>, done = tx("settings.saved")) {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try { const next = await social.updateMe(patch); setMe(next); setUsername(next.username); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }

  const input = { backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 } as const;
  const toggle = (title: string, sub: string, value: boolean, onChange: (v: boolean) => void, first?: boolean) => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: first ? 0 : 1, borderTopColor: colors.hairline }}>
      <View style={{ flex: 1 }}>
        <Text variant="bodyStrong">{title}</Text>
        <Text variant="caption" color={colors.textMuted}>{sub}</Text>
      </View>
      {/* Anahtarın ADI satırın başlığı: ekran okuyucu onu yanındaki metinle
          kendiliğinden ilişkilendirmiyor, "açık/kapalı anahtar" diye okuyup
          neyin anahtarı olduğunu söylemiyordu. */}
      <Switch value={value} onValueChange={onChange} disabled={busy} accessibilityLabel={title} trackColor={{ true: colors.primary, false: colors.surface2 }} thumbColor="#fff" />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={tx("socialsettings.social_and_privacy")} />
      <KeyboardAwareScroll automaticallyAdjustKeyboardInsets contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {user?.guest ? (
          <View style={{ marginTop: spacing.sm }}>
            <GuestAccountCard title={tx("guest.social_title")} text={tx("guest.social_body")} />
          </View>
        ) : !me && loadErr ? (
          <View style={{ marginTop: spacing.sm }}>
            <EmptyCard live="assertive" icon={AlertIcon} tint={colors.danger} title={tx("socialsettings.social_and_privacy")} text={loadErr} action={tx("common.try_again")} onAction={() => { setLoadErr(null); setAttempt((n) => n + 1); }} />
          </View>
        ) : !me ? (
          // Bölüm bölüm iskelet: kart tek parça gelince ekran boyu zıplamasın.
          <>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={{ marginTop: spacing.lg }}>
                <SkeletonLine variant="caption" width={116} style={{ marginBottom: spacing.sm, marginLeft: spacing.xs }} />
                <SkeletonCard padded>
                  <Skeleton height={48} radius={radii.md} />
                  <SkeletonLine variant="caption" width="70%" style={{ marginTop: spacing.sm }} />
                </SkeletonCard>
              </View>
            ))}
          </>
        ) : (
          <>
            <Section title={tx("socialsettings.username")}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <TextInput returnKeyType="done" value={username} onChangeText={(t) => setUsername(t.toLowerCase())} maxLength={SOCIAL_LIMITS.usernameMax} autoCapitalize="none" autoCorrect={false} placeholder={tx("socialsettings.username_2")}
                accessibilityLabel={tx("socialsettings.username_2")} placeholderTextColor={colors.textFaint} style={[input, { flex: 1 }]} />
                <Pill label={tx("common.save")} small disabled={busy || username.trim() === me.username || me.usernameChangeAvailableIn > 0} onPress={() => void save({ username: username.trim() }, tx("socialsettings.username_updated"))} />
              </View>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm }}>{tx("socialsettings.username_rule")} {me.usernameChangeAvailableIn > 0 ? tx("socialsettings.username_wait", { n: me.usernameChangeAvailableIn }) : tx("socialsettings.username_cooldown", { n: SOCIAL_LIMITS.changeCooldownDays })}</Text>
              <Text variant="caption" color={colors.textMuted}>{tx("socialsettings.profile_link", { path: `/u/${me.username}` })}</Text>
            </Section>

            {/* Gorunurluk gercek bir radyo grubu - yanindaki nokta da onu
                ciziyor - ama rol bilgisi yoktu: secili satir yalnizca yazi
                renginden ve noktadan okunuyordu. Webde `aria-pressed` var. */}
            <Section title={tx("socialsettings.visibility")}>
              {VIS.map((v, i) => {
                const active = me.visibility === v.key;
                return (
                  <PressableScale key={v.key} accessibilityRole="radio" accessibilityState={{ selected: active, disabled: busy }} onPress={() => void save({ visibility: v.key })} disabled={busy} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodyStrong" color={active ? colors.primaryText : colors.text}>{tx(v.label)}</Text>
                      <Text variant="caption" color={colors.textMuted}>{tx(v.sub)}</Text>
                    </View>
                    <RadioDot selected={active} />
                  </PressableScale>
                );
              })}
            </Section>

            <Section title={tx("socialsettings.permissions")}>
              {toggle(tx("socialsettings.perm_requests"), tx("socialsettings.perm_requests_sub"), me.allowRequests, (v) => void save({ allowRequests: v }), true)}
              {toggle(tx("socialsettings.perm_suggest"), tx("socialsettings.perm_suggest_sub"), me.showInSuggestions, (v) => void save({ showInSuggestions: v }))}
              {toggle(tx("socialsettings.perm_activity"), tx("socialsettings.perm_activity_sub"), me.showActivity, (v) => void save({ showActivity: v }))}
            </Section>

            <Section title={tx("socialsettings.blocked_title")}>
              {blocked === null ? <SkeletonLine variant="caption" width="60%" /> : blocked.length ? blocked.map((b, i) => (
                <View key={b.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
                  <Avatar userId={b.userId} name={b.name} avatar={b.avatar} size={36} />
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
        {/* HATA `assertive`, BASARI `polite` (bkz. `PaywallScreen`). */}
        {msg ? <Text accessibilityLiveRegion={ok ? "polite" : "assertive"} variant="caption" color={ok ? colors.successText : colors.dangerText} style={{ marginTop: spacing.lg, textAlign: "center" }}>{msg}</Text> : null}
      </KeyboardAwareScroll>
    </View>
  );
}
