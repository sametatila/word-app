import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootTabs } from "./RootTabs";
import { GameScreen } from "../screens/GameScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { ExamPrepScreen } from "../screens/ExamPrepScreen";
import { WalkModeScreen } from "../screens/WalkModeScreen";

/** Kök yığın: sekmeler + üzerine tam ekran açılan akış ekranları. */
export type RootStackParams = {
  Tabs: undefined;
  Game: undefined;
  Profile: undefined;
  ExamPrep: undefined;
  Walk: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={RootTabs} />
      <Stack.Screen name="Game" component={GameScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ExamPrep" component={ExamPrepScreen} />
      <Stack.Screen name="Walk" component={WalkModeScreen} options={{ animation: "slide_from_bottom" }} />
    </Stack.Navigator>
  );
}
