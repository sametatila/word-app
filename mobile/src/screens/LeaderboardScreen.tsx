import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { FriendsBoard } from "../social/FriendsBoard";
import { LeagueBoard } from "../social/LeagueBoard";
import { EmptyCard, ScreenHeader } from "../social/common";
import { Chip } from "../ui/Chip";
import { useAuth } from "../lib/AuthContext";
import { useTheme, spacing } from "../theme";
import { GuestAccountCard } from "../ui/GuestAccountCard";
import { LockedIcon, LeagueIcon } from "../ui/icons";

/**
 * Sıralama — iki küme, tek ekran: LİG ve ARKADAŞLAR.
 *
 * Üçüncü bir "Herkes" tablosu yok, çünkü lig zaten o. Düz genel tablo
 * kaldırıldı: on iki kullanıcıda iyi çalışıyordu ama büyüdükçe yalnız ilk onu
 * motive edip geri kalanı kırardı. Lig aynı XP'yi otuz kişilik gruplara
 * bölüyor — kullanıcı hep yenebileceği bir tabloya bakıyor.
 */
export function LeaderboardScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const [mode, setMode] = useState<"league" | "friends">("league");

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("leaderboard.leaderboard")} subtitle={t("leaderboard.this_week")} />

      {/* Ayarlar'daki Chip dili: kenarlıklı, radius md; pill değil.

          SEKME ŞERİDİ: aynı haftanın iki GÖRÜNÜMÜ arasında geçiş, bir
          seçenek listesi değil. Rol `tablist` + `tab` deyince TalkBack
          "sekme, 2 ögeden 1., seçili" diyor; önce ikisi de düz "düğme"ydi.
          Web karşılığı `role="tablist"` + `role="tab"` (bkz. parity 258). */}
      <View accessibilityRole="tablist" style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        {([["league", "leaderboard.league"], ["friends", "social.tab_friends"]] as const).map(([k, label]) => (
          <Chip key={k} role="tab" label={t(label)} active={mode === k} onPress={() => setMode(k)} />
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {user?.guest ? (
          <GuestAccountCard icon={LeagueIcon} title={t("guest.social_title")} text={t("guest.social_body")} />
        ) : !user ? (
          <EmptyCard icon={LockedIcon} title={t("leaderboard.leaderboard")} text={t("leaderboard.sign_in_for_friends_board")} action={t("auth.sign_in")} onAction={() => nav.navigate("Auth")} />
        ) : mode === "league" ? (
          <LeagueBoard />
        ) : (
          <FriendsBoard compact />
        )}
      </ScrollView>
    </View>
  );
}
