import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FriendsBoard } from "../social/FriendsBoard";
import { LeagueBoard } from "../social/LeagueBoard";
import { ScreenHeader } from "../social/common";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { useAuth } from "../lib/AuthContext";
import { useTheme, spacing, radii } from "../theme";

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
  const [mode, setMode] = useState<"league" | "friends">("league");

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={t("leaderboard.leaderboard")} subtitle={t("leaderboard.this_week")} />

      {/* Ayarlar'daki Chip dili: kenarlıklı, radius md; pill değil. */}
      <View style={{ flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
        {([["league", "leaderboard.league"], ["friends", "social.tab_friends"]] as const).map(([k, label]) => (
          <PressableScale key={k} onPress={() => setMode(k)} style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: radii.md, borderWidth: 1.5, borderColor: mode === k ? colors.primary : colors.border, backgroundColor: mode === k ? colors.primarySoft : colors.surface }}>
            <Text variant="bodyStrong" color={mode === k ? colors.primary : colors.textMuted}>{t(label)}</Text>
          </PressableScale>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: insets.bottom + spacing.xxl }} showsVerticalScrollIndicator={false}>
        {!user ? (
          <Text variant="body" color={colors.textMuted}>{t("leaderboard.sign_in_for_friends_board")}</Text>
        ) : mode === "league" ? (
          <LeagueBoard />
        ) : (
          <FriendsBoard compact />
        )}
      </ScrollView>
    </View>
  );
}
