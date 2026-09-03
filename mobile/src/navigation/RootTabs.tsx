import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import { t } from "../lib/i18n";
import { LearnScreen } from "../screens/LearnScreen";
import { PathScreen } from "../screens/PathScreen";
import { SkillsScreen } from "../screens/SkillsScreen";

const Tab = createBottomTabNavigator();
export function RootTabs() {
  return (
    <Tab.Navigator tabBar={(p) => <TabBar {...p} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Learn" component={LearnScreen} options={{ title: t("nav.learn") }} />
      <Tab.Screen name="Path" component={PathScreen} options={{ title: t("nav.path") }} />
      <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: t("nav.skills") }} />
    </Tab.Navigator>
  );
}
