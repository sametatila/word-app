import React, { useEffect, useMemo } from "react";
import { Text } from "./Text";
import { pickCoachLine, type CoachMoment, type CoachVars } from "../game/coachLines";
import { track } from "../lib/track";
import { useTheme } from "../theme";

/**
 * KOÇUN CÜMLESİ — maskotsuz.
 *
 * Koç balonu (`ui/CoachBubble`) Nomi + balon demek ve Nomi artık yalnız
 * günlük turda oynuyor (bkz. `ui/Mascot` dosya başı). Ama cümlenin kendisi
 * animasyon değil İÇERİK: kırk cümlelik tablo sözlükte duruyor (`coach.*`) ve
 * sınav girişinde "hazırsan başlayalım", sonucunda "bunu hak ettin" demek
 * ekranın işine yarıyor. Bu yüzden balon turda kaldı, cümle dışarı çıktı.
 *
 * Canlı bölge: cümle geçici değil kalıcı olduğu için `polite` yeterli —
 * balonun dört saniyelik hâlinde de aynı karar verilmişti.
 */
export function CoachLine({ moment, vars, text, tone = "muted" }: {
  moment: CoachMoment;
  vars?: CoachVars;
  /** Verilirse listeden seçim yapılmaz, bu cümle söylenir. */
  text?: string;
  tone?: "muted" | "strong";
}) {
  const { colors } = useTheme();
  // Cümle AN değişince seçilir; `vars` her çizimde yeni bir nesne olduğu için
  // bağımlılığa girmiyor (`CoachBubble` ile aynı kural).
  const line = useMemo(() => text ?? pickCoachLine(moment, vars), [moment, text]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { track("coach_show", 0, moment); }, [moment]);
  if (!line) return null;
  return (
    <Text accessibilityRole="text" accessibilityLiveRegion="polite" variant="body" color={tone === "strong" ? colors.text : colors.textMuted}>
      {line}
    </Text>
  );
}
