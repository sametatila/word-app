import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { social, errorText, formatXp, type FriendRow, type QuestView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing } from "../theme";
import { EmptyCard, ErrorText, PrimaryButton } from "./common";

export function Quests({ friends, me, onChanged }: { friends: FriendRow[]; me: string; onChanged?: () => void }) {
  const { colors } = useTheme();
  const [quests, setQuests] = useState<QuestView[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState(false);

  async function load() {
    try { setQuests((await social.quests()).quests); } catch (e) { setErr(errorText(e)); setQuests([]); }
  }
  useEffect(() => { void load(); }, []);
  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try { await fn(); await load(); onChanged?.(); setPick(false); } catch (e) { setErr(errorText(e)); } finally { setBusy(false); }
  }
  if (quests === null) return <View style={{ gap: spacing.sm }}><Skeleton height={110} /><Skeleton height={60} /></View>;
  const current = quests.filter((q) => q.status === "invited" || q.status === "active");
  const past = quests.filter((q) => q.status === "completed" || q.status === "failed");
  return (
    <View style={{ gap: spacing.md }}>
      {current.map((q) => <QuestCard key={q.id} q={q} me={me} busy={busy} onAct={act} />)}
      {!current.length ? (
        <View>
          <EmptyCard
            title="Bu hafta ortak görev yok"
            text={friends.length ? "Bir arkadaşınla bu hafta birlikte hedef XP topla. Hedef, geçen haftanızın biraz üstü." : "Önce bir arkadaş ekle; sonra birlikte hedef XP toplarsınız."}
            action={friends.length ? (pick ? "Vazgeç" : "Arkadaş seç") : undefined}
            onAction={friends.length ? () => setPick((p) => !p) : undefined}
          />
          {pick ? (
            <Card padded={false} style={{ marginTop: spacing.sm }}>
              {friends.map((f, i) => (
                <View key={f.userId} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md, borderBottomWidth: i === friends.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
                  <PersonAvatar userId={f.userId} name={f.name} size={34} />
                  <Text variant="bodyStrong" style={{ flex: 1 }} numberOfLines={1}>{f.name ?? "İsimsiz öğrenci"}</Text>
                  <PrimaryButton label="Davet et" small disabled={busy} onPress={() => void act(() => social.inviteQuest(f.userId))} />
                </View>
              ))}
            </Card>
          ) : null}
        </View>
      ) : null}
      <ErrorText text={err} />
      {past.length ? (
        <View>
          <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, fontWeight: "700" }}>GEÇMİŞ HAFTALAR</Text>
          <Card padded={false}>
            {past.map((q, i) => (
              <View key={q.id} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md, borderBottomWidth: i === past.length - 1 ? 0 : 1, borderBottomColor: colors.hairline }}>
                <PersonAvatar userId={q.partner.userId} name={q.partner.name} size={30} />
                <Text variant="body" style={{ flex: 1 }} numberOfLines={1}><Text variant="bodyStrong">{q.partner.name ?? "İsimsiz"}</Text> ile {formatXp(q.targetXp)} XP</Text>
                <Text variant="caption" color={q.status === "completed" ? colors.success : colors.textMuted} style={{ fontWeight: "700" }}>{q.status === "completed" ? "Tamamlandı" : `${q.pct}%`}</Text>
              </View>
            ))}
          </Card>
        </View>
      ) : null}
    </View>
  );
}

export function QuestCard({ q, me, busy, onAct }: { q: QuestView; me: string; busy: boolean; onAct: (fn: () => Promise<unknown>) => Promise<void> }) {
  const { colors } = useTheme();
  const invited = q.status === "invited";
  const myShare = q.totalXp ? Math.round((q.myXp / q.totalXp) * 100) : 0;
  return (
    <Card padded>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flexDirection: "row" }}>
          <PersonAvatar userId={me} name={null} size={36} ring={colors.primary} />
          <View style={{ marginLeft: -10 }}><PersonAvatar userId={q.partner.userId} name={q.partner.name} size={36} ring={colors.info} /></View>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">{invited ? "Ortak görev daveti" : "Bu haftanın ortak görevi"}</Text>
          <Text variant="micro" color={colors.textMuted}>{q.partner.name ?? "Arkadaşın"} ile birlikte {formatXp(q.targetXp)} XP · {q.daysLeft === 1 ? "son gün" : `${q.daysLeft} gün kaldı`}</Text>
        </View>
      </View>
      {invited ? (
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.md, alignItems: "center" }}>
          {q.invitedByMe ? (
            <>
              <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>Cevap bekleniyor</Text>
              <PrimaryButton label="İptal" small tone="ghost" disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "cancel"))} />
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}><PrimaryButton label="Kabul et" disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "accept"))} /></View>
              <PrimaryButton label="Reddet" tone="ghost" disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "decline"))} />
            </>
          )}
        </View>
      ) : (
        <View style={{ marginTop: spacing.md }}>
          <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", flexDirection: "row" }}>
            <View style={{ width: `${Math.round((q.pct * myShare) / 100)}%`, backgroundColor: colors.primary }} />
            <View style={{ width: `${Math.round((q.pct * (100 - myShare)) / 100)}%`, backgroundColor: colors.info }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
            <Text variant="micro" color={colors.primary}>Sen {formatXp(q.myXp)}</Text>
            <Text variant="micro" color={colors.text} style={{ fontWeight: "700" }}>{formatXp(q.totalXp)} / {formatXp(q.targetXp)}</Text>
            <Text variant="micro" color={colors.info}>{q.partner.name?.split(" ")[0] ?? "O"} {formatXp(q.partnerXp)}</Text>
          </View>
          <PressableScale onPress={() => Alert.alert("Görevi bırak", "İkiniz için de iptal olur.", [{ text: "Vazgeç", style: "cancel" }, { text: "Bırak", style: "destructive", onPress: () => void onAct(() => social.questAction(q.id, "cancel")) }])} style={{ alignSelf: "flex-end", marginTop: 6 }}>
            <Text variant="micro" color={colors.textFaint}>Görevi bırak</Text>
          </PressableScale>
        </View>
      )}
    </Card>
  );
}
