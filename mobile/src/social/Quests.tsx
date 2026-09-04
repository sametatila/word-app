import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { Alert, View } from "react-native";
import { social, errorText, formatXp, type FriendRow, type QuestView } from "../api/social";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { SkeletonBar, SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "../ui/Skeleton";
import { PersonAvatar } from "../ui/PersonAvatar";
import { PressableScale } from "../ui/PressableScale";
import { TargetIcon, CheckIcon } from "../ui/icons";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { EmptyCard, ErrorText, IconTile, Pill, SectionTitle } from "./common";

export function Quests({ friends, me, onChanged }: { friends: FriendRow[]; me: string; onChanged?: () => void }) {
  const { colors } = useTheme();
  const [quests, setQuests] = useState<QuestView[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState(false);

  async function load() { try { setQuests((await social.quests()).quests); } catch (e) { setErr(errorText(e)); setQuests([]); } }
  useEffect(() => { void load(); }, []);
  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try { await fn(); await load(); onChanged?.(); setPick(false); } catch (e) { setErr(errorText(e)); } finally { setBusy(false); }
  }
  if (quests === null) return <QuestsSkeleton />;
  const current = quests.filter((q) => q.status === "invited" || q.status === "active");
  const past = quests.filter((q) => q.status === "completed" || q.status === "failed");
  return (
    <View>
      {current.map((q) => <QuestCard key={q.id} q={q} me={me} busy={busy} onAct={act} />)}
      {!current.length ? (
        <View>
          <EmptyCard icon={TargetIcon} title={t("quests.no_shared_quest_this_week")} text={t(friends.length ? "quests.empty_with_friends" : "quests.empty_no_friends")} action={friends.length ? t(pick ? "common.discard" : "quests.choose_friend") : undefined} onAction={friends.length ? () => setPick((p) => !p) : undefined} />
          {pick ? (
            <View style={{ marginTop: spacing.md }}>
              <SectionTitle title={t("quests.with")} />
              {friends.map((f) => (
                <Card key={f.userId} padded style={{ marginBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                  <PersonAvatar userId={f.userId} name={f.name} size={44} />
                  <View style={{ flex: 1 }}>
                    <Text variant="h3" numberOfLines={1}>{f.name ?? t("social.unnamed")}</Text>
                    <Text variant="caption" color={colors.textMuted}>{t("social.xp_this_week", { xp: formatXp(f.weeklyXp) })}</Text>
                  </View>
                  <Pill label={t("quests.invite")} small disabled={busy} onPress={() => void act(() => social.inviteQuest(f.userId))} />
                </Card>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
      <ErrorText text={err} />
      {past.length ? (
        <View>
          <SectionTitle title={t("quests.past_weeks")} />
          {past.map((q) => {
            const done = q.status === "completed";
            return (
              <Card key={q.id} padded style={{ marginBottom: spacing.md, flexDirection: "row", alignItems: "center", gap: spacing.md, borderColor: done ? colors.success : colors.hairline }}>
                <IconTile icon={done ? CheckIcon : TargetIcon} tint={done ? colors.success : colors.textMuted} solid={done} />
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong" numberOfLines={1}>{t("quests.past_row", { name: q.partner.name ?? t("social.unnamed_short"), xp: formatXp(q.targetXp) })}</Text>
                  <Text variant="micro" color={colors.textMuted}>{done ? t("quests.completed") : `${q.pct}% · ${formatXp(q.totalXp)} XP`}</Text>
                </View>
                <PersonAvatar userId={q.partner.userId} name={q.partner.name} size={32} />
              </Card>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

/** QuestCard iskeleti — iki arma, başlık, hedef, iki paylı çubuk; aynı yükseklik. */
export function QuestsSkeleton() {
  const { colors } = useTheme();
  return (
    <SkeletonCard style={{ marginBottom: spacing.md, borderWidth: 1.5, borderColor: colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flexDirection: "row" }}>
          <SkeletonTile size={44} radius={22} />
          <SkeletonTile size={44} radius={22} style={{ marginLeft: -12 }} />
        </View>
        <View style={{ flex: 1 }}>
          <SkeletonLine variant="h3" width="80%" />
          <SkeletonLine variant="caption" width="60%" />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <SkeletonLine variant="h2" width={48} />
          <SkeletonLine variant="micro" width={54} />
        </View>
      </View>
      <View style={{ marginTop: spacing.lg }}>
        <SkeletonBar height={10} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
          <SkeletonLine variant="caption" width={62} />
          <SkeletonLine variant="bodyStrong" width={78} />
          <SkeletonLine variant="caption" width={62} />
        </View>
        <SkeletonPill width={84} height={21} style={{ alignSelf: "flex-end", marginTop: spacing.sm }} />
      </View>
    </SkeletonCard>
  );
}

/** Bu haftanın görevi: hero kart — iki arma, hedef, iki paylı çubuk, pill düğmeler. */
export function QuestCard({ q, me, busy, onAct }: { q: QuestView; me: string; busy: boolean; onAct: (fn: () => Promise<unknown>) => Promise<void> }) {
  const { colors } = useTheme();
  const invited = q.status === "invited";
  const myShare = q.totalXp ? q.myXp / q.totalXp : 0;
  return (
    <Card padded style={[{ marginBottom: spacing.md, borderColor: colors.primary, borderWidth: 1.5 }, softShadow(colors.primary, 8)]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flexDirection: "row" }}>
          <PersonAvatar userId={me} name={null} size={44} ring={colors.primary} />
          <View style={{ marginLeft: -12 }}><PersonAvatar userId={q.partner.userId} name={q.partner.name} size={44} ring={colors.info} /></View>
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="h3">{t(invited ? "quests.invite_title" : "quests.week_title")}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("quests.with_partner", { name: q.partner.name ?? t("social.your_friend"), remaining: q.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: q.daysLeft }) })}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="h2" color={colors.primary}>{formatXp(q.targetXp)}</Text>
          <Text variant="micro" color={colors.textMuted}>{t("quests.target_xp")}</Text>
        </View>
      </View>
      {invited ? (
        <View style={{ flexDirection: "row", gap: spacing.sm, marginTop: spacing.lg, alignItems: "center" }}>
          {q.invitedByMe ? (
            <>
              <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{t("quests.awaiting_reply")}</Text>
              <Pill label={t("common.cancel")} tone="ghost" small disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "cancel"))} />
            </>
          ) : (
            <>
              <View style={{ flex: 1 }}><Pill label={t("quests.accept")} block disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "accept"))} /></View>
              <Pill label={t("quests.decline")} tone="ghost" disabled={busy} onPress={() => void onAct(() => social.questAction(q.id, "decline"))} />
            </>
          )}
        </View>
      ) : (
        <View style={{ marginTop: spacing.lg }}>
          <View style={{ height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden", flexDirection: "row" }}>
            <View style={{ width: `${Math.round(q.pct * myShare)}%`, backgroundColor: colors.primary }} />
            <View style={{ width: `${Math.round(q.pct * (1 - myShare))}%`, backgroundColor: colors.info }} />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
            <Text variant="caption" color={colors.primary}>{t("quests.my_xp", { xp: formatXp(q.myXp) })}</Text>
            <Text variant="bodyStrong">{formatXp(q.totalXp)} / {formatXp(q.targetXp)}</Text>
            <Text variant="caption" color={colors.info}>{q.partner.name?.split(" ")[0] ?? t("quests.partner_short")} {formatXp(q.partnerXp)}</Text>
          </View>
          <PressableScale onPress={() => Alert.alert(t("quests.leave_title"), t("quests.leave_text"), [{ text: t("common.discard"), style: "cancel" }, { text: t("quests.leave"), style: "destructive", onPress: () => void onAct(() => social.questAction(q.id, "cancel")) }])} style={{ alignSelf: "flex-end", marginTop: spacing.sm, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
            <Text variant="micro" color={colors.textMuted}>{t("quests.leave_quest")}</Text>
          </PressableScale>
        </View>
      )}
    </Card>
  );
}
