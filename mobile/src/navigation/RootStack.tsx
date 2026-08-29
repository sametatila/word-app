import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootTabs } from "./RootTabs";
import { GameScreen } from "../screens/GameScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

/** Kök yığın: sekmeler + üzerine tam ekran açılan oyun/oturum ve profil ekranları. */
export type RootStackParams = {
  Tabs: undefined;
  Game: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParams>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={RootTabs} />
      <Stack.Screen name="Game" component={GameScreen} options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
