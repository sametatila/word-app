import React, { useState } from "react";
import { t } from "../lib/i18n";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, formatXp, type FriendRow } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, HandshakeIcon, TargetIcon, BoltIcon, BellIcon, XIcon, ChevronRightIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { StatPill, type IconCmp } from "./common";

/** Her arkadaş kendi kartı (Sıralama/Günün görevleri gibi): kimlik + pill rozetler + ikon karolu eylemler. */
export function FriendRows({ friends, nudgedToday, onChanged }: { friends: FriendRow[]; nudgedToday: string[]; onChanged: () => void }) {
  if (!friends.length) return null;
  return <View>{friends.map((f) => <FriendCard key={f.userId} f={f} nudged={nudgedToday.includes(f.userId)} onChanged={onChanged} />)}</View>;
}

function ActionTile({ icon: Icon, label, tint, onPress, disabled }: { icon: IconCmp; label: string; tint: string; onPress: () => void; disabled?: boolean }) {
  const { colors } = useTheme();
  return (
    <PressableScale onPress={onPress} disabled={disabled} accessibilityLabel={label} style={{ alignItems: "center", gap: 4, opacity: disabled ? 0.4 : 1 }}>
      <View style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint + "22" }}>
        <Icon color={tint} size={20} />
      </View>
      <Text variant="micro" color={colors.textMuted}>{label}</Text>
    </PressableScale>
  );
}

function FriendCard({ f, nudged, onChanged }: { f: FriendRow; nudged: boolean; onChanged: () => void }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [sent, setSent] = useState(nudged);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    try { await fn(); setMsg(done); setOk(true); } catch (e) { setMsg(errorText(e)); setOk(false); } finally { setBusy(false); }
  }
  const open = () => { if (f.username) nav.navigate("User", { username: f.username }); };
  return (
    <Card padded style={{ marginBottom: spacing.md }}>
      <PressableScale onPress={open} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <PersonAvatar userId={f.userId} name={f.name} size={48} />
        <View style={{ flex: 1 }}>
          <Text variant="h3" numberOfLines={1}>{f.name ?? "İsimsiz öğrenci"}</Text>
          <Text variant="caption" color={colors.textMuted} numberOfLines={1}>{f.username ? `@${f.username} · ` : ""}{f.level}</Text>
        </View>
        <ChevronRightIcon color={colors.textFaint} size={20} />
      </PressableScale>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: spacing.md }}>
        <StatPill icon={BoltIcon} label={`${formatXp(f.weeklyXp)} XP bu hafta`} tint={colors.primary} soft={colors.primarySoft} />
        {f.currentStreak > 0 ? <StatPill icon={FlameIcon} label={`${f.currentStreak} gün`} tint={colors.streak} /> : null}
        {f.friendStreak > 0 ? <StatPill icon={HandshakeIcon} label={`${f.friendStreak} gün birlikte`} tint={colors.success} soft={colors.successSoft} /> : null}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <ActionTile icon={BellIcon} label={sent ? "Dürtüldü" : "Dürt"} tint={colors.streak} disabled={busy || sent} onPress={() => void act(async () => { await social.nudge(f.userId, "remind"); setSent(true); }, "Dürttün")} />
        <ActionTile icon={TargetIcon} label={t("friendrows.gorev")} tint={colors.primary} disabled={busy} onPress={() => void act(() => social.inviteQuest(f.userId), "Görev daveti gitti")} />
        <ActionTile icon={XIcon} label={t("friendrows.cikar")} tint={colors.danger} disabled={busy} onPress={() => Alert.alert("Arkadaşlıktan çıkar", `${f.name ?? "Bu kişi"} çıkarılsın mı? Bildirim gitmez.`, [
          { text: "Vazgeç", style: "cancel" },
          { text: "Çıkar", style: "destructive", onPress: () => void act(async () => { await social.remove(f.userId); onChanged(); }, "Çıkarıldı") },
        ])} />
      </View>
      {msg ? <Text variant="caption" color={ok ? colors.success : colors.danger} style={{ marginTop: spacing.sm, textAlign: "center" }}>{msg}</Text> : null}
    </Card>
  );
}
