import React, { useEffect, useState } from "react";
import { t as tx } from "../lib/i18n";
import { TextInput, View } from "react-native";
import { social, errorText, type PublicUser, type SocialMe, type Visibility } from "../api/social";
import { useAuth } from "../lib/AuthContext";
import { Text } from "../ui/Text";
import { Skeleton, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { Avatar } from "../ui/Avatar";
import { PressableScale } from "../ui/PressableScale";
import { RadioDot } from "../ui/RadioDot";
import { useTheme, spacing, radii } from "../theme";
import { EmptyCard, Pill } from "../social/common";
import { WarningIcon } from "../ui/icons";
import { SOCIAL_LIMITS } from "../lib/profileDefaults";
import { GuestAccountCard } from "../ui/GuestAccountCard";
import { FIELD, Field, insetEdge } from "../ui/Field";
import { Group, Row } from "../ui/SettingsGroup";
import { SwitchRow } from "../ui/SwitchRow";

/** Görünürlük seçenekleri — anahtar tutar, çeviri render sırasında çözülür. */
const VIS: { key: Visibility; label: string; sub: string }[] = [
  { key: "public", label: "socialsettings.vis_public", sub: "socialsettings.vis_public_sub" },
  { key: "friends", label: "social.tab_friends", sub: "socialsettings.vis_friends_sub" },
  { key: "private", label: "socialsettings.vis_private", sub: "socialsettings.vis_private_sub" },
];

/**
 * SOSYAL AYARLAR ARTIK AYARLAR'IN İÇİNDE (2026-09-28, Samet'in kararı;
 * `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Bu dosya eskiden kendi ekranıydı ve arkadaş kartındaki dişliyle açılıyordu:
 * iki dişli, iki hedef. Kullanıcı "engellediklerim" ya da "profilimi kim
 * görür" sorusunu Ayarlar › Gizlilik'te arıyor ve bulamıyordu. Şimdi iki
 * parça olarak Ayarlar'a gömülüyor:
 *
 *   - `SocialUsername` — Ayarlar › Hesap (kullanıcı adı bir hesap bilgisi).
 *   - `SocialPrivacy`  — Ayarlar › Gizlilik (görünürlük, izinler, engellenenler).
 *
 * `SocialSettings` rotası duruyor (eski bildirim ve derin bağlantılar), ama
 * doğrudan Ayarlar › Gizlilik'i açıyor (bkz. navigation/RootStack).
 */
function useSocialMe() {
  const { user } = useAuth();
  const [me, setMe] = useState<SocialMe | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);
  /* Açılış yüklemesi düşerse iskelet sonsuza dek dönüyor ve altında kırmızı
     bir satır kalıyordu; artık hata kartı ve "Tekrar dene". */
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!user || user.guest) return;
    social.me().then(setMe).catch((e) => setLoadErr(errorText(e)));
  }, [user, attempt]);
  async function save(patch: Record<string, unknown>, done = tx("settings.saved")) {
    if (busy) return null;
    setBusy(true);
    setMsg(null);
    try { const next = await social.updateMe(patch); setMe(next); setMsg(done); setOk(true); return next; } catch (e) { setMsg(errorText(e)); setOk(false); return null; } finally { setBusy(false); }
  }
  const retry = () => { setLoadErr(null); setAttempt((n) => n + 1); };
  return { me, msg, ok, busy, setBusy, setMsg, setOk, loadErr, retry, save };
}

/** Kayıt iletisi: HATA `assertive`, BAŞARI `polite` (bkz. `PaywallScreen`). */
function SaveLine({ msg, ok }: { msg: string | null; ok: boolean }) {
  const { colors } = useTheme();
  return <>{msg ? <Text accessibilityLiveRegion={ok ? "polite" : "assertive"} variant="caption" color={ok ? colors.successText : colors.dangerText} style={{ marginTop: spacing.sm }}>{msg}</Text> : null}</>;
}

/**
 * Yükleme ve hata hâli. İskelet gerçeğin şekli: tek grup, üç bölüm
 * (Görünürlük üç radyo satırı, İzinler üç anahtar satırı, Engellenenler tek
 * satır) ve `children` (veri ve onaylar) gerçek hâliyle — o bölüm sosyal
 * profile bağlı değil, beklemesi gerekmiyor.
 */
function LoadState({ loadErr, retry, children }: { loadErr: string | null; retry: () => void; children?: React.ReactNode }) {
  const { colors } = useTheme();
  if (loadErr) {
    return (
      <>
        <View style={{ marginTop: spacing.sm }}>
          <EmptyCard live="assertive" icon={WarningIcon} tint={colors.danger} title={tx("socialsettings.social_and_privacy")} text={loadErr} action={tx("common.try_again")} onAction={retry} />
        </View>
        {children ? <Group>{children}</Group> : null}
      </>
    );
  }
  const row = (i: number, trailing: React.ReactNode) => (
    <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: FIELD.row, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
      <View style={{ flex: 1 }}>
        <SkeletonLine variant="bodyStrong" width={`${50 - i * 8}%`} />
        <SkeletonLine variant="caption" width="80%" />
      </View>
      {trailing}
    </View>
  );
  return (
    <Group>
      <Row label={tx("socialsettings.visibility")}>
        <View style={insetEdge}>{[0, 1, 2].map((i) => row(i, <SkeletonTile size={22} radius={radii.pill} />))}</View>
      </Row>
      <Row label={tx("socialsettings.permissions")}>
        <View style={insetEdge}>{[0, 1, 2].map((i) => row(i, <SkeletonPill width={51} height={31} />))}</View>
      </Row>
      <Row label={tx("socialsettings.blocked_title")}>
        <SkeletonLine variant="caption" width="60%" />
      </Row>
      {children}
    </Group>
  );
}

/** Kullanıcı adı — Ayarlar › Hesap kartının içinde bir satır (kart dışarıda). */
export function SocialUsername() {
  const { colors } = useTheme();
  const { me, msg, ok, busy, loadErr, retry, save } = useSocialMe();
  const [username, setUsername] = useState("");
  useEffect(() => { if (me) setUsername(me.username); }, [me]);
  const input = { backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.lg, paddingVertical: 13, color: colors.text, fontSize: 16 } as const;
  if (!me) return loadErr ? <Text variant="caption" color={colors.dangerText}>{loadErr}</Text> : <Skeleton height={48} radius={radii.md} />;
  return (
    /* Alan bloğu (`ui/Field`): kutu → yardım 8; kural ve profil bağlantısı
       tek yardım satırı (web aynı), ikinci satır payısız yapışıyordu. */
    <Field help={`${tx("socialsettings.username_rule")} ${me.usernameChangeAvailableIn > 0 ? tx("socialsettings.username_wait", { n: me.usernameChangeAvailableIn }) : tx("socialsettings.username_cooldown", { n: SOCIAL_LIMITS.changeCooldownDays })} ${tx("socialsettings.profile_link", { path: `/u/${me.username}` })}`}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
        <TextInput returnKeyType="done" value={username} onChangeText={(t) => setUsername(t.toLowerCase())} maxLength={SOCIAL_LIMITS.usernameMax} autoCapitalize="none" autoCorrect={false} placeholder={tx("socialsettings.username_2")}
        accessibilityLabel={tx("socialsettings.username_2")} placeholderTextColor={colors.textFaint} style={[input, { flex: 1 }]} />
        <Pill label={tx("common.save")} small disabled={busy || username.trim() === me.username || me.usernameChangeAvailableIn > 0} onPress={() => void save({ username: username.trim() }, tx("socialsettings.username_updated")).then((n) => { if (n) setUsername(n.username); })} />
      </View>
      <SaveLine msg={msg} ok={ok} />
      {loadErr ? <Pill label={tx("common.try_again")} small tone="ghost" onPress={retry} /> : null}
    </Field>
  );
}

/** Görünürlük, izinler ve engellenenler — Ayarlar › Gizlilik'in üst kısmı. */
/**
 * GİZLİLİK TEK GRUP (2026-09-30, Samet: ayar kutuları aynı dili konuşmuyordu).
 * Üç bölüm üç ayrı kartta, kartın DIŞINDA büyük harfli başlıkla duruyordu;
 * "Veri ve onaylar" da başlıklı dördüncü bir kutuydu. Artık standart grup:
 * tek kart, bölümler çizgiyle ayrılmış, her bölüm küçük sönük etiket +
 * içerik. `children` grubun sonuna eklenen bölümler (veri ve onaylar). Web
 * `SocialSettings part="privacy"` aynı.
 */
export function SocialPrivacy({ children }: { children?: React.ReactNode }) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { me, msg, ok, busy, setBusy, setMsg, setOk, loadErr, retry, save } = useSocialMe();
  const [blocked, setBlocked] = useState<(PublicUser & { since: string })[] | null>(null);
  useEffect(() => {
    if (!user || user.guest) return;
    social.blocks().then((r) => setBlocked(r.blocked)).catch(() => setBlocked([]));
  }, [user]);

  const toggle = (title: string, sub: string, value: boolean, onChange: (v: boolean) => void, first?: boolean) => (
    /* Satırın tamamı anahtar ve adı satırın başlığı (`ui/SwitchRow`, QA F-0051):
       ekran okuyucu anahtarı yanındaki metinle kendiliğinden ilişkilendirmiyordu. */
    <SwitchRow title={title} sub={sub} value={value} onValueChange={onChange} disabled={busy} style={{ paddingVertical: spacing.md, borderTopWidth: first ? 0 : 1, borderTopColor: colors.hairline }} />
  );

  if (user?.guest) {
    return (
      <>
        <View style={{ marginTop: spacing.sm }}>
          <GuestAccountCard title={tx("guest.social_title")} text={tx("guest.social_body")} />
        </View>
        {children ? <Group>{children}</Group> : null}
      </>
    );
  }
  if (!me) return <LoadState loadErr={loadErr} retry={retry}>{children}</LoadState>;
  return (
    <Group>
      {/* Gorunurluk gercek bir radyo grubu - yanindaki nokta da onu
          ciziyor - ama rol bilgisi yoktu: secili satir yalnizca yazi
          renginden ve noktadan okunuyordu. Webde `aria-pressed` var. */}
      {/* Üç bölüm de basılabilir kutu içi liste (`ui/Field`): ilk satırın
          üstünde fazladan 12 vardı, kartın kenarında 28 oluyordu. */}
      <Row label={tx("socialsettings.visibility")}>
        <View style={insetEdge}>
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
        </View>
      </Row>

      <Row label={tx("socialsettings.permissions")}>
        <View style={insetEdge}>
        {toggle(tx("socialsettings.perm_requests"), tx("socialsettings.perm_requests_sub"), me.allowRequests, (v) => void save({ allowRequests: v }), true)}
        {toggle(tx("socialsettings.perm_suggest"), tx("socialsettings.perm_suggest_sub"), me.showInSuggestions, (v) => void save({ showInSuggestions: v }))}
        {toggle(tx("socialsettings.perm_activity"), tx("socialsettings.perm_activity_sub"), me.showActivity, (v) => void save({ showActivity: v }))}
        </View>
        <SaveLine msg={msg} ok={ok} />
      </Row>

      <Row label={tx("socialsettings.blocked_title")}>
        {blocked === null ? <SkeletonLine variant="caption" width="60%" /> : blocked.length ? <View style={insetEdge}>{blocked.map((b, i) => (
          <View key={b.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: FIELD.row, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}>
            <Avatar userId={b.userId} name={b.name} avatar={b.avatar} size={36} />
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong" numberOfLines={1}>{b.name ?? tx("social.unnamed_short")}</Text>
              {b.username ? <Text variant="caption" color={colors.textMuted}>@{b.username}</Text> : null}
            </View>
            <Pill label={tx("socialsettings.remove")} small tone="ghost" disabled={busy} onPress={() => { setBusy(true); social.unblock(b.userId).then(() => setBlocked((p) => (p ?? []).filter((x) => x.userId !== b.userId))).catch((e) => { setMsg(errorText(e)); setOk(false); }).finally(() => setBusy(false)); }} />
          </View>
        ))}</View> : <Text variant="caption" color={colors.textMuted}>{tx("socialsettings.you_haven_t_blocked_anyone")}</Text>}
      </Row>
      {children}
    </Group>
  );
}
