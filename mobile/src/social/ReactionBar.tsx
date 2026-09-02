import React, { useState } from "react";
import { View } from "react-native";
import { REACTION_KINDS, REACTION_LABELS, social, errorText, type ReactionKind, type ReactionSummary } from "../api/social";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing, radii } from "../theme";
import { ErrorText, ReactionGlyph, reactionTone } from "./common";
import { haptic } from "../lib/haptics";

/** Tepki çubuğu — web'dekiyle aynı davranış: sayılar, "+" ile altı seçenek, aynı ikona ikinci dokunuş geri alır. */
export function ReactionBar({ eventId, summary, disabled }: { eventId: number; summary: ReactionSummary; disabled?: boolean }) {
  const { colors } = useTheme();
  const [s, setS] = useState(summary);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pick(kind: ReactionKind) {
    if (busy || disabled) return;
    setBusy(true);
    setErr(null);
    try {
      haptic("tap");
      const next = s.mine === kind ? await social.unreact(eventId) : await social.react(eventId, kind);
      setS(next);
      setOpen(false);
    } catch (e) {
      setErr(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  const present = REACTION_KINDS.filter((k) => (s.counts[k] ?? 0) > 0);
  const who = s.names.length ? `${s.names.join(", ")}${s.total > s.names.length ? ` ve ${s.total - s.names.length} kişi` : ""}` : "";
  return (
    <View style={{ marginTop: spacing.sm }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
        {present.map((k) => {
          const mine = s.mine === k;
          const tone = reactionTone(k, colors);
          return (
            <PressableScale key={k} onPress={() => void pick(k)} disabled={disabled || busy} accessibilityLabel={`${REACTION_LABELS[k]} ${s.counts[k]}`} style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 9, paddingVertical: 5, borderRadius: radii.pill, backgroundColor: mine ? tone + "2a" : colors.surface2, borderWidth: 1, borderColor: mine ? tone : colors.hairline }}>
              <ReactionGlyph kind={k} size={14} colors={colors} />
              <Text variant="micro" color={mine ? tone : colors.textMuted}>{s.counts[k]}</Text>
            </PressableScale>
          );
        })}
        {!disabled ? (
          <PressableScale onPress={() => setOpen((o) => !o)} disabled={busy} accessibilityLabel="Tepki ver" style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: radii.pill, backgroundColor: colors.surface2, borderWidth: 1, borderColor: colors.hairline }}>
            <Text variant="micro" color={colors.textMuted}>{s.mine ? "Değiştir" : "Tepki ver"}</Text>
          </PressableScale>
        ) : null}
        {who ? <Text variant="micro" color={colors.textFaint}>{who}</Text> : null}
      </View>
      {open ? (
        <View style={{ flexDirection: "row", gap: 6, marginTop: spacing.sm, padding: 6, borderRadius: radii.lg, backgroundColor: colors.surface2, alignSelf: "flex-start" }}>
          {REACTION_KINDS.map((k) => (
            <PressableScale key={k} onPress={() => void pick(k)} accessibilityLabel={REACTION_LABELS[k]} style={{ width: 38, height: 38, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: s.mine === k ? reactionTone(k, colors) + "2a" : "transparent" }}>
              <ReactionGlyph kind={k} size={20} colors={colors} />
            </PressableScale>
          ))}
        </View>
      ) : null}
      <ErrorText text={err} />
    </View>
  );
}
