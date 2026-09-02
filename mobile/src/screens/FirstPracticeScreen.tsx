import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { SpeakerIcon, CheckIcon } from "../ui/icons";
import { Mascot } from "../ui/Mascot";
import { speakTarget } from "../lib/tts";
import { haptic } from "../lib/haptics";
import { track } from "../lib/track";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Hesap açmadan önce kısa bir ISINMA — "Sıfırdan" ve "Seviyeni seç" yolları
 * buradan geçer (Testle belirle kendi sınavını gösterir). Böylece giriş duvarı
 * öncesi her yola bir ilk-değer tadı verilir. Kelimeler SEVİYEYE göre gelir
 * (A1–C1): birkaç kelime sesli + anlam + örnek; bitince giriş duvarına (Auth).
 */
type W = { de: string; artikel: string | null; tr: string; ex: string; exTr: string };
const SETS: Record<string, W[]> = {
  A1: [
    { de: "Hallo", artikel: null, tr: "Merhaba", ex: "Hallo, ich bin Emma.", exTr: "Merhaba, ben Emma." },
    { de: "Tag", artikel: "der", tr: "gün", ex: "Guten Tag!", exTr: "İyi günler!" },
    { de: "Wasser", artikel: "das", tr: "su", ex: "Ich trinke Wasser.", exTr: "Su içiyorum." },
    { de: "Haus", artikel: "das", tr: "ev", ex: "Das Haus ist groß.", exTr: "Ev büyük." },
    { de: "danke", artikel: null, tr: "teşekkürler", ex: "Danke schön!", exTr: "Çok teşekkürler!" },
  ],
  A2: [
    { de: "Termin", artikel: "der", tr: "randevu", ex: "Ich habe einen Termin.", exTr: "Bir randevum var." },
    { de: "Rechnung", artikel: "die", tr: "fatura, hesap", ex: "Die Rechnung, bitte.", exTr: "Hesap, lütfen." },
    { de: "einladen", artikel: null, tr: "davet etmek", ex: "Ich lade dich ein.", exTr: "Seni davet ediyorum." },
    { de: "Wetter", artikel: "das", tr: "hava (durumu)", ex: "Das Wetter ist schön.", exTr: "Hava güzel." },
    { de: "vielleicht", artikel: null, tr: "belki", ex: "Vielleicht komme ich.", exTr: "Belki gelirim." },
  ],
  B1: [
    { de: "Erfahrung", artikel: "die", tr: "deneyim", ex: "Ich habe viel Erfahrung.", exTr: "Çok deneyimim var." },
    { de: "sich bewerben", artikel: null, tr: "başvurmak", ex: "Ich bewerbe mich um die Stelle.", exTr: "İş için başvuruyorum." },
    { de: "Umwelt", artikel: "die", tr: "çevre", ex: "Wir schützen die Umwelt.", exTr: "Çevreyi koruyoruz." },
    { de: "obwohl", artikel: null, tr: "-mesine rağmen", ex: "Obwohl es regnet, gehe ich.", exTr: "Yağmura rağmen gidiyorum." },
    { de: "empfehlen", artikel: null, tr: "tavsiye etmek", ex: "Ich empfehle dieses Buch.", exTr: "Bu kitabı tavsiye ederim." },
  ],
  B2: [
    { de: "Voraussetzung", artikel: "die", tr: "önkoşul", ex: "Deutsch ist eine Voraussetzung.", exTr: "Almanca bir önkoşuldur." },
    { de: "berücksichtigen", artikel: null, tr: "dikkate almak", ex: "Wir berücksichtigen deine Meinung.", exTr: "Görüşünü dikkate alıyoruz." },
    { de: "Zusammenhang", artikel: "der", tr: "bağlam, ilişki", ex: "In diesem Zusammenhang…", exTr: "Bu bağlamda…" },
    { de: "nachhaltig", artikel: null, tr: "sürdürülebilir", ex: "Wir leben nachhaltig.", exTr: "Sürdürülebilir yaşıyoruz." },
    { de: "zweifellos", artikel: null, tr: "kuşkusuz", ex: "Das ist zweifellos richtig.", exTr: "Bu kuşkusuz doğru." },
  ],
  C1: [
    { de: "Auseinandersetzung", artikel: "die", tr: "tartışma, irdeleme", ex: "eine kritische Auseinandersetzung", exTr: "eleştirel bir irdeleme" },
    { de: "gewährleisten", artikel: null, tr: "garanti etmek, sağlamak", ex: "Wir gewährleisten Qualität.", exTr: "Kaliteyi garanti ederiz." },
    { de: "unerlässlich", artikel: null, tr: "vazgeçilmez", ex: "Übung ist unerlässlich.", exTr: "Pratik vazgeçilmezdir." },
    { de: "Vorreiterrolle", artikel: "die", tr: "öncü rol", ex: "Sie übernimmt eine Vorreiterrolle.", exTr: "Öncü rolü üstleniyor." },
    { de: "infolgedessen", artikel: null, tr: "bunun sonucunda", ex: "…, infolgedessen stieg der Preis.", exTr: "…, bunun sonucunda fiyat arttı." },
  ],
};
const withArtikel = (w: W) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

export function FirstPracticeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "FirstPractice">>();
  const level = (params?.level && SETS[params.level]) ? params.level : "A1";
  const words = SETS[level];
  const [idx, setIdx] = useState(0);
  const [seen, setSeen] = useState(false);
  const w = words[idx];
  const last = idx + 1 >= words.length;
  const kicker = level === "A1" ? "İlk kelimelerin" : `${level} · kısa ısınma`;

  useEffect(() => { track("first_practice", idx, level); speakTarget(withArtikel(w)); setSeen(false); /* eslint-disable-next-line */ }, [idx]);

  function primary() {
    haptic("tap");
    if (!seen) { setSeen(true); return; }
    if (last) { nav.reset({ index: 0, routes: [{ name: "Auth" }] }); return; }
    setIdx((n) => n + 1);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        <View style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${((idx + (seen ? 1 : 0)) / words.length) * 100}%`, borderRadius: 4, backgroundColor: colors.primary }} />
        </View>
        <Text variant="caption" color={colors.textMuted}>{idx + 1}/{words.length}</Text>
      </View>

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg }}>
        <Text variant="caption" color={colors.primary} style={{ letterSpacing: 1, textTransform: "uppercase" }}>{kicker}</Text>
        <Text variant="display" style={{ textAlign: "center" }}>{withArtikel(w)}</Text>

        <PressableScale onPress={() => speakTarget(withArtikel(w))} accessibilityRole="button" accessibilityLabel={`${w.de} kelimesini dinle`} style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.primarySoft, borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 9 }}>
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

      <PressableScale onPress={primary} accessibilityRole="button" accessibilityLabel={!seen ? "Anlamını gör" : last ? "Hesabımı aç ve kaydet" : "Sonraki kelime"} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 17, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 }, softShadow(colors.primary, 10)]}>
        {seen && last && <CheckIcon color="#fff" size={20} />}
        <Text variant="h3" color="#fff">{!seen ? "Anlamını gör" : last ? "Hesabımı aç ve kaydet" : "Sonraki kelime"}</Text>
      </PressableScale>
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md }}>
        Öğrendiklerini kaydetmek için birazdan hesabını açacaksın.
      </Text>
    </View>
  );
}
