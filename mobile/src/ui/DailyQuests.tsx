import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { Card } from "./Card";
import { CheckIcon, BoltIcon } from "./icons";
import { useAuth } from "../lib/AuthContext";
import { fetchQuests, type Quest } from "../game/quests";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

function QuestRow({ q, colors }: { q: Quest; colors: Palette }) {
  const pct = q.target ? Math.min(100, Math.round((q.done / q.target) * 100)) : 0;
  const complete = q.done >= q.target;
  return (
    <Card padded style={{ marginBottom: spacing.md, borderWidth: 1, borderColor: complete ? colors.success : colors.hairline }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={[{ width: 42, height: 42, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: complete ? colors.success : colors.primarySoft }, complete ? softShadow(colors.success, 6) : {}]}>
          {complete ? <CheckIcon color="#fff" size={22} /> : <BoltIcon color={colors.primary} size={20} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyStrong">{q.label}</Text>
          <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.surface2, overflow: "hidden", marginTop: 6 }}>
            <View style={{ height: "100%", width: `${Math.max(3, pct)}%`, backgroundColor: complete ? colors.success : colors.primary, borderRadius: 3 }} />
          </View>
          <Text variant="micro" color={colors.textMuted} style={{ marginTop: 3 }}>{Math.min(q.done, q.target)}/{q.target}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text variant="bodyStrong" color={complete ? colors.success : colors.primary}>+{q.xp}</Text>
          <Text variant="micro" color={colors.textMuted}>XP</Text>
        </View>
      </View>
    </Card>
  );
}

/**
 * Günün görevleri — Learn'e GÖMÜLÜ kutular (ayrı ekran yok). Giriş yoksa / görev
 * yoksa hiç render etmez ki Learn kalabalıklaşmasın. Web'deki görev panosunun
 * mobil karşılığı, ana ekranın içinde.
 */
export function DailyQuests() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[] | null>(null);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    fetchQuests().then((b) => { if (alive) setQuests(b.quests ?? []); }).catch(() => {});
    return () => { alive = false; };
  }, [user]);

  if (!quests || quests.length === 0) return null;
  const doneCount = quests.filter((q) => q.done >= q.target).length;
  return (
    <View style={{ marginBottom: spacing.xl }}>
      <View style={{ flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", marginBottom: spacing.md }}>
        <Text variant="h3" color={colors.textMuted}>Günün görevleri</Text>
        <Text variant="caption" color={colors.textMuted}>{doneCount}/{quests.length} tamam</Text>
      </View>
      {quests.map((q) => <QuestRow key={q.id} q={q} colors={colors} />)}
    </View>
  );
}
