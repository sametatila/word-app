import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, CheckIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { speakGerman } from "../lib/tts";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * "Sıfırdan" başlayanlar için ilk kelime çalışması — hesap açmadan önce kısa bir
 * ısınma. Birkaç A1 kelimesi sesli okunur, anlamı ve örneği görülür; bitince
 * giriş duvarına (Auth) geçilir. Misafir modu yok: buradan çıkış hesap açmaktır.
 */
type W = { de: string; artikel: string | null; tr: string; ex: string; exTr: string };
const A1: W[] = [
  { de: "Hallo", artikel: null, tr: "Merhaba", ex: "Hallo, ich bin Emma.", exTr: "Merhaba, ben Emma." },
  { de: "Tag", artikel: "der", tr: "gün", ex: "Guten Tag!", exTr: "İyi günler!" },
  { de: "Wasser", artikel: "das", tr: "su", ex: "Ich trinke Wasser.", exTr: "Su içiyorum." },
  { de: "Haus", artikel: "das", tr: "ev", ex: "Das Haus ist groß.", exTr: "Ev büyük." },
  { de: "danke", artikel: null, tr: "teşekkürler", ex: "Danke schön!", exTr: "Çok teşekkürler!" },
];
const withArtikel = (w: W) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

export function FirstPracticeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState(false); // anlam görüldü mü
  const w = A1[idx];
  const last = idx + 1 >= A1.length;

  useEffect(() => { track("first_practice", idx); speakGerman(withArtikel(w)); setSeen(false); /* eslint-disable-next-line */ }, [idx]);

  function primary() {
    if (!seen) { setSeen(true); return; }        // önce anlamı aç
    if (last) { nav.reset({ index: 0, routes: [{ name: "Auth" }] }); return; } // sonra hesap
    setIdx((n) => n + 1);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      {/* ilerleme */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${((idx + (seen ? 1 : 0)) / A1.length) * 100}%`, borderRadius: 4, backgroundColor: colors.primary }} />
        </View>
        <Text variant="caption" color={colors.textMuted}>{idx + 1}/{A1.length}</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
        <Text variant="caption" color={colors.primary} style={{ letterSpacing: 1, textTransform: "uppercase" }}>İlk kelimelerin</Text>
        <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(w)}</Text>

        <PressableScale onPress={() => speakGerman(withArtikel(w))} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 9 }}>
          <SpeakerIcon color={colors.primary} size={18} /><Text variant="bodyStrong" color={colors.primary}>Dinle</Text>
        </PressableScale>

        {seen ? (
          <View style={{ alignItems: "center", gap: 6, marginTop: spacing.sm }}>
            <Text variant="h2" color={colors.text}>{w.tr}</Text>
            <View style={{ backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radii.lg, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, alignItems: "center", marginTop: 4 }}>
              <Text variant="bodyStrong">{w.ex}</Text>
              <Text variant="caption" color={colors.textMuted} style={{ marginTop: 2 }}>{w.exTr}</Text>
            </View>
          </View>
        ) : (
          <Mascot mood="idle" size={96} />
        )}
      </View>

      <PressableScale onPress={primary} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.primary, 10)]}>
        {seen && last && <CheckIcon color="#fff" size={20} />}
        <Text variant="h3" color="#fff">{!seen ? "Anlamını gör" : last ? "Hesabımı aç ve kaydet" : "Sonraki kelime"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Öğrendiklerini kaydetmek için birazdan hesabını açacaksın.
      </Text>
    </View>
  );
}
