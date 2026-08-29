import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootTabs } from "./RootTabs";
import { GameScreen } from "../screens/GameScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ExamPrepScreen } from "../screens/ExamPrepScreen";
import { WalkModeScreen } from "../screens/WalkModeScreen";
import { PaywallScreen } from "../screens/PaywallScreen";
import { OnboardingScreen } from "../screens/OnboardingScreen";
import { UnitScreen } from "../screens/UnitScreen";
import { AuthScreen } from "../screens/AuthScreen";
import { WordsScreen } from "../screens/WordsScreen";
import { AchievementsScreen } from "../screens/AchievementsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { PlacementScreen } from "../screens/PlacementScreen";
import { LeaderboardScreen } from "../screens/LeaderboardScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ItemScreen } from "../screens/ItemScreen";
import { DailyScreen } from "../screens/DailyScreen";
import { WeeklyScreen } from "../screens/WeeklyScreen";

/** Kök yığın: onboarding + sekmeler + üzerine tam ekran açılan akış ekranları. */
export type RootStackParams = {
  Onboarding: undefined;
  Tabs: undefined;
  Game: undefined;
  Profile: undefined;
  ExamPrep: undefined;
  Walk: undefined;
  Paywall: undefined;
  Unit: { index: number; theme: string; items?: { id: string; kind: string; title: string; done: boolean; playable: boolean }[] };
  Auth: undefined;
  Words: undefined;
  Achievements: undefined;
  Settings: undefined;
  Placement: undefined;
  Leaderboard: undefined;
  Notifications: undefined;
  Daily: undefined;
  Weekly: undefined;
  Item: { id: string; kind: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack({ initialRoute }: { initialRoute: keyof RootStackParams }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={RootTabs} />
      <Stack.Screen name="Game" component={GameScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ExamPrep" component={ExamPrepScreen} />
      <Stack.Screen name="Walk" component={WalkModeScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Paywall" component={PaywallScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Unit" component={UnitScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Words" component={WordsScreen} />
      <Stack.Screen name="Achievements" component={AchievementsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Placement" component={PlacementScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Daily" component={DailyScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Weekly" component={WeeklyScreen} options={{ animation: "slide_from_bottom" }} />
    </Stack.Navigator>
  );
}
