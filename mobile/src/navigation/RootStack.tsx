import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";
import { contentColumnLayout, wideColumnLayout } from "../ui/ContentColumn";
import { RootTabs, type RootTabParams } from "./RootTabs";
import { GameScreen } from "../screens/GameScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { AvatarScreen } from "../screens/AvatarScreen";
import { MockExamsScreen } from "../screens/MockExamsScreen";
import { MockExamScreen } from "../screens/MockExamScreen";
import { MockStatsScreen } from "../screens/MockStatsScreen";
import { ExamScreen } from "../screens/ExamScreen";
import { WalkModeScreen } from "../screens/WalkModeScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { FirstPracticeScreen } from "../screens/FirstPracticeScreen";
import { NotifPrimeScreen } from "../screens/NotifPrimeScreen";
import { UnitScreen } from "../screens/UnitScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { ResetPasswordScreen } from "../screens/ResetPasswordScreen";
import { WordsScreen } from "../screens/WordsScreen";
import { AchievementsScreen } from "../screens/AchievementsScreen";
import { ProgressScreen } from "../screens/ProgressScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { DeleteAccountScreen } from "../screens/DeleteAccountScreen";
import { PlacementScreen } from "../screens/PlacementScreen";
import { LeaderboardScreen } from "../screens/LeaderboardScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { UserScreen } from "../screens/UserScreen";
import { InboxScreen } from "../screens/InboxScreen";
import { SocialSettingsScreen } from "../screens/SocialSettingsScreen";
import { ItemScreen } from "../screens/ItemScreen";
import { DailyScreen } from "../screens/DailyScreen";
import { WeeklyScreen } from "../screens/WeeklyScreen";
import { BossScreen } from "../screens/BossScreen";
import { PracticeScreen } from "../screens/PracticeScreen";
import { CandoScreen } from "../screens/CandoScreen";
import { WritingsScreen } from "../screens/WritingsScreen";
import { RoleplayExamScreen } from "../screens/RoleplayExamScreen";
import { LessonScreen } from "../screens/LessonScreen";
import { QuizScreen } from "../screens/QuizScreen";

/** Kök yığın: onboarding + sekmeler + üzerine tam ekran açılan akış ekranları. */
export type RootStackParams = {
  Onboarding: undefined;
  FirstPractice: { level?: string } | undefined;
  NotifPrime: undefined;
  /** Sekmeler; `{ screen, params }` ile içindeki bir sekmeye doğrudan gidilebilir. */
  Tabs: NavigatorScreenParams<RootTabParams> | undefined;
  Game: { game?: string } | undefined;
  Profile: undefined;
  Avatar: undefined;
  MockExams: undefined;
  /** Deneme sınavının TEK bölümü — kâğıt kimliği + hangi beceri. */
  MockExam: { paperId: string; skill: "reading" | "listening" | "writing" | "speaking" };
  /** Deneme sınavı istatistiği — bölüm, seviye ve geçmiş kırılımı. */
  MockStats: undefined;
  /** Sınav: modül (module = 0..) ya da seviye sınavı (module = null). */
  Exam: { level: string; module: number | null };
  /** Modul patronu - sureli tur; modulun derslerindeki kelimelerden kuruluyor. */
  Boss: { level: string; moduleIndex: number };
  Walk: undefined;
  Paywall: undefined;
  Unit: { index: number; level: string; theme: string; items?: { id: string; kind: string; title: string; titleTr?: string | null; done: boolean; playable: boolean; attempted?: boolean; open?: boolean; ref?: string | null }[] };
  Lesson: { id: string };
  /** Rol yapma sınavı (WP-22): aynı sahne, yardım yok, 5 tur, puanlı. */
  RoleplayExam: { id: string };
  Quiz: { itemId: string; level: string; unitIndex: number; kind: string; theme: string };
  Auth: undefined;
  /** E-postadaki sıfırlama bağlantısı uygulamada açıldığında (bkz. lib/deepLink). */
  ResetPassword: { token?: string };
  Words: undefined;
  Achievements: undefined;
  Progress: undefined;
  Settings: undefined;
  /** Hesap silme (Play zorunluluğu) — Ayarlar › Hesap. */
  DeleteAccount: undefined;
  Placement: { onboarding?: boolean } | undefined;
  Leaderboard: undefined;
  Notifications: undefined;
  Daily: undefined;
  Weekly: undefined;
  Practice: undefined;
  Cando: undefined;
  Writings: undefined;
  /** `from`: "skills" → bitiş kartı Beceriler'e döner (Patika'ya değil). */
  Item: { id: string; kind: string; title: string; from?: string };
  /** Sosyal katman: herkese açık profil, gelen kutusu, sosyal ayarlar.
      Arkadaş merkezinin kendisi artık bir SEKME (bkz. RootTabs). */
  User: { username: string };
  Inbox: undefined;
  SocialSettings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack({ initialRoute }: { initialRoute: keyof RootStackParams }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      {/* Sekmeler DIŞARIDA: kendi ekranlarını kendi içinde sütuna alıyor
          (RootTabs). Burada sarmalansaydı sekme çubuğu da sütuna girer ve geniş
          ekranda ortada asılı kalırdı. */}
      <Stack.Screen name="Tabs" component={RootTabs} />
      {/* Varsayılan: dar (okunabilir) sütun. `layout` ile ezilen ekranlar ızgara
          sistemine girmiş olanlar — yatay tablette geniş kaba çıkıyorlar. */}
      <Stack.Group screenLayout={contentColumnLayout}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="FirstPractice" component={FirstPracticeScreen} />
      <Stack.Screen name="NotifPrime" component={NotifPrimeScreen} />
      <Stack.Screen name="Game" component={GameScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} layout={wideColumnLayout} />
      <Stack.Screen name="Avatar" component={AvatarScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="MockExams" component={MockExamsScreen} layout={wideColumnLayout} />
      <Stack.Screen name="MockExam" component={MockExamScreen} layout={contentColumnLayout} />
      <Stack.Screen name="MockStats" component={MockStatsScreen} layout={contentColumnLayout} />
      <Stack.Screen name="Exam" component={ExamScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Walk" component={WalkModeScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Paywall" component={PaywallScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Unit" component={UnitScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="RoleplayExam" component={RoleplayExamScreen} options={{ animation: "slide_from_bottom" }} layout={contentColumnLayout} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Words" component={WordsScreen} layout={wideColumnLayout} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} layout={wideColumnLayout} />
      <Stack.Screen name="Progress" component={ProgressScreen} options={{ animation: "slide_from_bottom" }} layout={wideColumnLayout} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Stack.Screen name="Placement" component={PlacementScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Daily" component={DailyScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Weekly" component={WeeklyScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Boss" component={BossScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Practice" component={PracticeScreen} options={{ animation: "slide_from_bottom" }} layout={wideColumnLayout} />
      <Stack.Screen name="Cando" component={CandoScreen} layout={wideColumnLayout} />
      <Stack.Screen name="Writings" component={WritingsScreen} layout={wideColumnLayout} />
      <Stack.Screen name="User" component={UserScreen} layout={wideColumnLayout} />
      <Stack.Screen name="Inbox" component={InboxScreen} />
      <Stack.Screen name="SocialSettings" component={SocialSettingsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
