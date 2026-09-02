import React, { useState } from "react";
import { View } from "react-native";
import { REACTION_KINDS, REACTION_LABELS, social, errorText, type ReactionKind, type ReactionSummary } from "../api/social";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { useTheme, spacing, radii, softShadow } from "../theme";
import { ErrorText, ReactionGlyph, reactionTone } from "./common";
import { haptic } from "../lib/haptics";

/** Tepkiler: mevcut olanlar pill rozet (tint+22); "+" ile altı ikon karosu. Benimki dolu renk. */
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
    <View style={{ marginTop: spacing.md }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
        {present.map((k) => {
          const mine = s.mine === k;
          const tone = reactionTone(k, colors);
          return (
            <PressableScale key={k} onPress={() => void pick(k)} disabled={disabled || busy} accessibilityLabel={`${REACTION_LABELS[k]} ${s.counts[k]}`} style={[{ flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: mine ? tone : tone + "22" }, mine ? softShadow(tone, 4) : {}]}>
              <ReactionGlyph kind={k} size={14} colors={colors} color={mine ? "#fff" : undefined} />
              <Text variant="caption" color={mine ? "#fff" : tone}>{s.counts[k]}</Text>
            </PressableScale>
          );
        })}
        {!disabled ? (
          <PressableScale onPress={() => setOpen((o) => !o)} disabled={busy} accessibilityLabel="Tepki ver" style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: radii.pill, backgroundColor: colors.surface2 }}>
            <Text variant="caption" color={colors.textMuted}>{s.mine ? "Değiştir" : "Tepki ver"}</Text>
          </PressableScale>
        ) : null}
      </View>
      {who ? <Text variant="micro" color={colors.textFaint} style={{ marginTop: 6 }}>{who}</Text> : null}
      {open ? (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: spacing.sm }}>
          {REACTION_KINDS.map((k) => {
            const tone = reactionTone(k, colors);
            const mine = s.mine === k;
            return (
              <PressableScale hitSlop={4} key={k} onPress={() => void pick(k)} accessibilityLabel={REACTION_LABELS[k]} style={[{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: mine ? tone : tone + "22" }, mine ? softShadow(tone, 6) : {}]}>
                <ReactionGlyph kind={k} size={22} colors={colors} color={mine ? "#fff" : undefined} />
              </PressableScale>
            );
          })}
        </View>
      ) : null}
      <ErrorText text={err} />
    </View>
  );
}
