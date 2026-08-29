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

/** Kök yığın: onboarding + sekmeler + üzerine tam ekran açılan akış ekranları. */
export type RootStackParams = {
  Onboarding: undefined;
  Tabs: undefined;
  Game: undefined;
  Profile: undefined;
  ExamPrep: undefined;
  Walk: undefined;
  Paywall: undefined;
  Unit: { index: number; theme: string };
  Auth: undefined;
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
    </Stack.Navigator>
  );
}
