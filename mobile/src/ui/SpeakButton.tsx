import React from "react";
import { PressableScale } from "./PressableScale";
import { SpeakerIcon } from "./icons";
import { useTheme, radii } from "../theme";
import { speakGerman } from "../lib/tts";

/**
 * Hoparlör düğmesi — Almanca metni kullanıcının seçtiği sesle okur.
 *
 * Web'deki SpeakButton'ın mobil karşılığı; kelime, cümle, şık — Almanca metin
 * gösteren her yerde bir dokunuşla dinlemek için. Ses/hız `lib/tts` üzerinden
 * kullanıcı tercihinden gelir.
 */
export function SpeakButton({
  text,
  size = 40,
  slow = false,
  tone,
}: {
  text: string;
  size?: number;
  slow?: boolean;
  tone?: string;
}) {
  const { colors } = useTheme();
  if (!text?.trim()) return null;
  const color = tone ?? colors.primary;
  return (
    <PressableScale
      accessibilityLabel="Sesli oku"
      hitSlop={8}
      onPress={() => speakGerman(text, { slow })}
      style={{
        width: size,
        height: size,
        borderRadius: radii.pill,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primarySoft,
        borderWidth: 1,
        borderColor: colors.hairline,
      }}
    >
      <SpeakerIcon color={color} size={Math.round(size * 0.52)} />
    </PressableScale>
  );
}
