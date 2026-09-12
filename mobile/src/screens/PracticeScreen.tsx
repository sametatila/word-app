import React from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { Card } from "../ui/Card";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, BoltIcon, QuizIcon, WriteIcon, ListenIcon, CheckIcon, KeyboardIcon, PuzzleIcon, TagIcon, CardsIcon, SortIcon, TranslateIcon, StackIcon, ArrowRightIcon } from "../ui/icons";
import { Skeleton } from "../ui/Skeleton";
import { practiceGamesFor } from "../game/session";
import { useMe } from "../lib/useMe";
import { useTheme, spacing, radii, softShadow, type Palette, fillOf } from "../theme";
import { useLayout } from "../lib/useLayout";

/** Oyun → ikon + renk (görsel çeşitlilik). */
/*
  Her oyunun ikonu ne yaptığını söylemeli. Eskiden söylemiyordu: yazma oyununda
  "öğren" ikonu, eşleştirmede Beceriler sekmesinin yıldızı, çeviride "okuma"
  vardı; üstelik üç çift oyun aynı ikonu paylaşıyordu (typing/scramble,
  artikel/order, choice/plural), yani ızgarada iki karo aynı görünüyordu.
*/
const META: Record<string, { icon: (p: { color: string; size: number }) => React.ReactElement; tint: keyof Palette }> = {
  choice: { icon: (p) => <QuizIcon {...p} />, tint: "primary" },
  artikel: { icon: (p) => <TagIcon {...p} />, tint: "streak" },
  cloze: { icon: (p) => <WriteIcon {...p} />, tint: "info" },
  typing: { icon: (p) => <KeyboardIcon {...p} />, tint: "success" },
  listen: { icon: (p) => <ListenIcon {...p} />, tint: "accent" },
  truefalse: { icon: (p) => <CheckIcon {...p} />, tint: "primary" },
  match: { icon: (p) => <CardsIcon {...p} />, tint: "info" },
  scramble: { icon: (p) => <PuzzleIcon {...p} />, tint: "streak" },
  order: { icon: (p) => <SortIcon {...p} />, tint: "accent" },
  plural: { icon: (p) => <StackIcon {...p} />, tint: "success" },
  translate: { icon: (p) => <TranslateIcon {...p} />, tint: "primary" },
};

/** META'da olmayan bir oyun için yedek: modül düzeyinde, her çizimde yeniden doğmasın. */
const FALLBACK_META = {
  icon: (p: { color: string; size: number }) => <QuizIcon {...p} />,
  tint: "primary" as keyof Palette,
};

export function PracticeScreen() {
  const { colors } = useTheme();
  const { gridItemWidth } = useLayout();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  // Tek-oyun listesi kursa göre eleniyor: artikel/çoğul yalnız artikelli
  // dillerde anlamlı (bkz. game/session.ts practiceGamesFor).
  const { me, loading: meLoading } = useMe();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        <PressableScale hitSlop={4} onPress={() => nav.goBack()} accessibilityLabel={t("common.back")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <ArrowBackIcon color={colors.text} size={24} />
        </PressableScale>
        <View style={{ flex: 1 }}>
          <Text accessibilityRole="header" variant="h2">{t("practice.practice")}</Text>
          <Text variant="caption" color={colors.textMuted}>{t("practice.practice_one_game_with_your_own")}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {/* Karışık taze tur */}
        <PressableScale onPress={() => nav.navigate("Game", {})} style={{ marginTop: spacing.sm, marginBottom: spacing.lg }}>
          <View style={[{ borderRadius: radii.xl, overflow: "hidden", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <View style={{ padding: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.md }}>
              <View style={{ width: 46, height: 46, borderRadius: radii.md, backgroundColor: "#ffffff2e", alignItems: "center", justifyContent: "center" }}>
                <BoltIcon color="#fff" size={24} />
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="h3" color="#fff">{t("practice.mixed_round")}</Text>
                <Text variant="caption" color="#ffffffdd">{t("practice.all_game_types_in_one")}</Text>
              </View>
              <ArrowRightIcon color="#fff" size={20} />
            </View>
          </View>
        </PressableScale>

        <Text variant="caption" color={colors.textMuted} style={{ marginBottom: spacing.sm, marginLeft: 4, textTransform: "uppercase", letterSpacing: 1 }}>{t("practice.single_game")}</Text>
        {/* Oyun listesi kursa bağlı: kurs bilinmeden çizilirse karo sayısı
            sonradan değişip ızgara boyunu oynatıyor. Önce aynı boyda iskelet. */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {meLoading ? [0, 1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height={116} width={gridItemWidth} radius={radii.xl} />
          )) : practiceGamesFor(me?.course).map((g) => {
            const m = META[g.game] ?? FALLBACK_META;
            /* Zemin TEMAYA DUYARSIZ (`theme` `fillOf`): koyu temada rol
               renkleri pastele dönüyor ve beyaz glif görünmüyordu; gerekçe ve
               ölçümler `theme/colors`ta. Web de bu karoyu sabit 500 ile
               çiziyor. */
            const tint = fillOf(m.tint);
            return (
              <PressableScale key={g.game} onPress={() => nav.navigate("Game", { game: g.game })} style={{ width: gridItemWidth }}>
                <Card padded style={{ minHeight: 116, justifyContent: "space-between" }}>
                  <View style={[{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: tint }, softShadow(tint, 6)]}>
                    {m.icon({ color: "#fff", size: 22 })}
                  </View>
                  {/* `label` bir SÖZLÜK ANAHTARI (bkz. game/session.ts PRACTICE_GAMES):
                      liste modül yüklenirken kuruluyor, dil tercihi o an okunmamış
                      oluyor. Çeviri bu yüzden burada, çizim anında yapılır — ham
                      basılınca ekranda "games.choice" görünüyordu. */}
                  <View style={{ marginTop: spacing.md }}>
                    <Text variant="bodyStrong">{t(g.label)}</Text>
                    {/* NE YAPTIRDIĞINI SÖYLEYEN SATIR. Kart yalnız adı
                        gösteriyordu: "Cümleyi Diz" ile "Cümleyi Çevir"
                        arasındaki farkı bilmeyen kullanıcı oyunu açmadan
                        seçemiyordu. Web kartın altında bu satırı baştan beri
                        yazıyor (`learn/practice`). */}
                    <Text variant="micro" color={colors.textMuted} style={{ marginTop: 2, lineHeight: 16 }}>{t(g.hint)}</Text>
                  </View>
                </Card>
              </PressableScale>
            );
          })}
        </View>
        {/* NE OLDUĞUNU SÖYLEYEN SATIR. Turun kendi kelimelerinden kurulduğu,
            oyun türünün sabit kaldığı ve pratiğin kaldığı yerden SÜRMEDİĞİ
            yalnız webde yazıyordu (`learn/practice`); üçü de mobilde
            uygulanan davranış (bkz. `GameScreen` yükleme yorumu). */}
        <Text variant="micro" color={colors.textMuted} style={{ marginTop: spacing.lg, lineHeight: 18 }}>{t("prac.note")}</Text>
      </ScrollView>
    </View>
  );
}
