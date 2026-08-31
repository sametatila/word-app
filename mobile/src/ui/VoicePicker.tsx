import React from "react";
import { View } from "react-native";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { SpeakerIcon } from "./icons";
import { useTheme, spacing, radii } from "../theme";
import { voicesFor, resolveVoice, type VoiceId } from "../lib/voices";
import { speakWithVoice } from "../lib/tts";

/**
 * Ses seçimi — web VoicePicker'ın mobil karşılığı. Kurs başına iki ses
 * (Katja/Conrad ya da Leni/Jan); kart seçer, hoparlör dinletir (seçmez).
 */
const SAMPLE: Record<string, string> = {
  "gsw-zh": "De nöi Vertrag gilt für alli Bschäftigte.",
  de: "Der neue Vertrag gilt für alle Beschäftigten.",
};

export function VoicePicker({
  course,
  value,
  onChange,
}: {
  course: string;
  value: VoiceId;
  onChange: (v: VoiceId) => void;
}) {
  const { colors } = useTheme();
  const options = voicesFor(course);
  const selected = resolveVoice(course, value);
  const sample = SAMPLE[course === "gsw-zh" ? "gsw-zh" : "de"];

  return (
    <View style={{ flexDirection: "row", gap: spacing.sm }}>
      {options.map((v) => {
        const on = v.id === selected;
        return (
          <PressableScale
            key={v.id}
            onPress={() => onChange(v.id)}
            style={{
              flex: 1,
              padding: spacing.md,
              borderRadius: radii.lg,
              borderWidth: on ? 2 : 1,
              borderColor: on ? colors.primary : colors.border,
              backgroundColor: on ? colors.primarySoft : colors.surface,
              gap: spacing.xs,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text variant="bodyStrong" color={on ? colors.primary : colors.text}>{v.label}</Text>
              <PressableScale
                accessibilityLabel={`${v.label} sesini dinle`}
                hitSlop={8}
                onPress={() => speakWithVoice(sample, v.id)}
                style={{ padding: 4 }}
              >
                <SpeakerIcon color={colors.primary} size={20} />
              </PressableScale>
            </View>
            <Text variant="caption" color={colors.textMuted}>{v.gender}</Text>
            <Text variant="caption" color={colors.textFaint}>{v.note}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
}
