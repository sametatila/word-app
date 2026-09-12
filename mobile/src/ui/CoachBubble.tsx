import React, { useEffect, useMemo, useState } from "react";
import { View, Animated, Easing } from "react-native";
import { Text } from "./Text";
import { Mascot } from "./Mascot";
import { pickCoachLine, type CoachMoment, type CoachVars } from "../game/coachLines";
import { reduceMotion } from "../lib/reduceMotion";
import { track } from "../lib/track";
import { useTheme, spacing, radii } from "../theme";

/**
 * KOÇ BALONU — web `components/coach-bubble` karşılığı.
 *
 * Erdi'nin yanında tek cümle: balon dört saniye durur, sonra kaybolur, Erdi
 * kalır. Metin bilgi değil EŞLİK — kalıcı bilgi kartın kendi metninde.
 *
 * Androidde Erdi yalnız duruyordu: sınav başlarken, sonucunda ve zayıf nokta
 * turunun özetinde web bir cümle söylüyor, mobil sessizdi. Kırk cümlelik
 * tablo webin kendi sözlüğünde duruyordu (`coach.*`), yani Android
 * kullanıcısı hiç duymuyordu.
 *
 * Hareket azaltmada balon yok, yalnız düz metin: kalıcı ve sade.
 */
export function CoachBubble({
  moment,
  mood,
  vars,
  text,
  size = 56,
  hold = 4000,
  tone = "card",
}: {
  moment: CoachMoment;
  mood: "idle" | "happy" | "thumbsup" | "sad" | "celebrate" | "wave" | "sleep" | "think";
  vars?: CoachVars;
  /** Verilirse listeden seçim yapılmaz, bu cümle söylenir. */
  text?: string;
  size?: number;
  /** Balonun ekranda kalma süresi (ms); 0 = kalıcı. */
  hold?: number;
  /** Koyu zeminde (sonuç başlığı) balon açık kalır, metin koyu. */
  tone?: "card" | "dark";
}) {
  const { colors } = useTheme();
  const still = reduceMotion();
  // Cümle AN değişince seçilir; `vars` her çizimde yeni bir nesne olduğu için
  // bağımlılığa girmiyor (web `coach-bubble` de öyle).
  const line = useMemo(() => text ?? pickCoachLine(moment, vars), [moment, text]); // eslint-disable-line react-hooks/exhaustive-deps
  const [open, setOpen] = useState(true);
  const fade = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    track("coach_show", 0, moment);
    setOpen(true);
    if (still) { fade.setValue(1); return; }
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
  }, [moment, line, still, fade]);

  useEffect(() => {
    if (!hold || still || !line) return;
    const timer = setTimeout(() => {
      Animated.timing(fade, { toValue: 0, duration: 220, useNativeDriver: true }).start(() => setOpen(false));
    }, hold);
    return () => clearTimeout(timer);
  }, [hold, still, line, fade]);

  if (!line) return null;

  if (still) {
    return (
      /* CÜMLE DUYURULUYOR. Erdi'nin cümlesi dört saniye durup kayboluyor:
         ekran okuyucu kullanan biri onu HİÇ duymuyordu, çünkü ne odakta ne de
         canlı bir bölgedeydi. Web aynı cümleyi `role="status"` ile duyuruyor
         (`coach-bubble`, iki dalda da). Geçici metin, canlı bölgenin tam
         tanımı. */
      <Text accessibilityRole="text" accessibilityLiveRegion="polite" variant="body" color={tone === "dark" ? colors.text : colors.textMuted}>
        {line}
      </Text>
    );
  }

  /* Koyu zeminde balon hep açık; metin rengi temadan BAĞIMSIZ koyu, yoksa
     gece temasında açık metin açık balona düşer. */
  const bg = tone === "dark" ? "rgba(255,255,255,0.94)" : colors.surface2;
  const fg = tone === "dark" ? "#2b1d12" : colors.text;

  return (
    <View style={{ flexDirection: "row", alignItems: "flex-end", gap: spacing.sm }}>
      <Mascot mood={mood} size={size} />
      {open ? (
        <Animated.View
          style={{
            opacity: fade,
            transform: [{ translateY: fade.interpolate({ inputRange: [0, 1], outputRange: [6, 0] }) }],
            flex: 1, marginBottom: spacing.md,
            backgroundColor: bg, borderRadius: radii.lg, borderBottomLeftRadius: radii.sm,
            paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
          }}
        >
          <Text accessibilityLiveRegion="polite" variant="body" color={fg}>{line}</Text>
        </Animated.View>
      ) : null}
    </View>
  );
}
