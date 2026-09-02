import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { social, errorText, formatXp, type FriendRow } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { FlameIcon, HandshakeIcon, TargetIcon } from "../ui/icons";
import { useTheme, spacing, radii } from "../theme";
import { PersonRow } from "./common";

/** Arkadaş listesi — kimlik, bu haftaki emek, ortak seri, dürt/görev/çıkar. */
export function FriendRows({ friends, nudgedToday, onChanged }: { friends: FriendRow[]; nudgedToday: string[]; onChanged: () => void }) {
  if (!friends.length) return null;
  return (
    <Card padded={false}>
      {friends.map((f, i) => (
        <FriendItem key={f.userId} f={f} nudged={nudgedToday.includes(f.userId)} onChanged={onChanged} last={i === friends.length - 1} />
      ))}
    </Card>
  );
}

function FriendItem({ f, nudged, onChanged, last }: { f: FriendRow; nudged: boolean; onChanged: () => void; last: boolean }) {
  const { colors } = useTheme();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [sent, setSent] = useState(nudged);
  const [msg, setMsg] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
      setMsg(done);
      setOk(true);
    } catch (e) {
      setMsg(errorText(e));
      setOk(false);
    } finally {
      setBusy(false);
    }
  }
  const open = () => { if (f.username) nav.navigate("User", { username: f.username }); };
  const chip = (label: string, onPress: () => void, disabled?: boolean, icon?: React.ReactNode) => (
    <PressableScale onPress={onPress} disabled={disabled} style={{ opacity: disabled ? 0.45 : 1, flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 7, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
      {icon}
      <Text variant="micro" color={colors.text} style={{ fontWeight: "700" }}>{label}</Text>
    </PressableScale>
  );
  return (
    <PersonRow
      colors={colors}
      last={last}
      onPress={open}
      avatar={<PersonAvatar userId={f.userId} name={f.name} size={42} />}
      title={<Text variant="bodyStrong" numberOfLines={1}>{f.name ?? "İsimsiz öğrenci"} <Text variant="micro" color={colors.textMuted}>{f.username ? `@${f.username}` : ""}</Text></Text>}
      subtitle={
        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
          <Text variant="micro" color={colors.primary} style={{ fontWeight: "700" }}>{formatXp(f.weeklyXp)} XP bu hafta</Text>
          {f.currentStreak > 0 ? <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><FlameIcon color={colors.streak} size={12} /><Text variant="micro" color={colors.streak}>{f.currentStreak}</Text></View> : null}
          {f.friendStreak > 0 ? <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}><HandshakeIcon color={colors.success} size={12} /><Text variant="micro" color={colors.success}>{f.friendStreak} gün birlikte</Text></View> : null}
          <Text variant="micro" color={colors.textFaint}>{f.level}</Text>
        </View>
      }
      note={
        <View>
          <View style={{ flexDirection: "row", gap: 6, marginTop: 6 }}>
            {chip(sent ? "Dürtüldü" : "Dürt", () => void act(async () => { await social.nudge(f.userId, "remind"); setSent(true); }, "Dürttün"), busy || sent)}
            {chip("Görev", () => void act(() => social.inviteQuest(f.userId), "Görev daveti gitti"), busy, <TargetIcon color={colors.text} size={13} />)}
            {chip("Çıkar", () => Alert.alert("Arkadaşlıktan çıkar", `${f.name ?? "Bu kişi"} çıkarılsın mı? Bildirim gitmez.`, [
              { text: "Vazgeç", style: "cancel" },
              { text: "Çıkar", style: "destructive", onPress: () => void act(async () => { await social.remove(f.userId); onChanged(); }, "Çıkarıldı") },
            ]), busy)}
          </View>
          {msg ? <Text variant="micro" color={ok ? colors.success : colors.danger} style={{ marginTop: 4 }}>{msg}</Text> : null}
        </View>
      }
    />
  );
}
