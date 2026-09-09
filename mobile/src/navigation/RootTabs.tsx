import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import { contentColumnLayout, wideColumnLayout } from "../ui/ContentColumn";
import { t } from "../lib/i18n";
import { LearnScreen } from "../screens/LearnScreen";
import { PathScreen } from "../screens/PathScreen";
import { SkillsScreen } from "../screens/SkillsScreen";

const Tab = createBottomTabNavigator();
/**
 * Sekme çubuğu render-prop'u MODÜL düzeyinde: bileşen içinde `(p) => <TabBar/>`
 * yazılınca her çizimde yeni bir bileşen kimliği doğuyor ve React eskisini
 * söküp yenisini takıyor (durum sıfırlanır, gereksiz yeniden çizim).
 */
const renderTabBar = (p: React.ComponentProps<typeof TabBar>) => <TabBar {...p} />;

export function RootTabs() {
  return (
    // `screenLayout` yalnız EKRAN içeriğini sarmalıyor; `tabBar` dışarıda kaldığı
    // için sekme çubuğu geniş ekranda tam genişlikte duruyor.
    <Tab.Navigator tabBar={renderTabBar} screenOptions={{ headerShown: false }} screenLayout={contentColumnLayout}>
      <Tab.Screen name="Learn" component={LearnScreen} options={{ title: t("nav.learn") }} layout={wideColumnLayout} />
      <Tab.Screen name="Path" component={PathScreen} options={{ title: t("nav.path") }} layout={wideColumnLayout} />
      <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: t("nav.skills") }} layout={wideColumnLayout} />
    </Tab.Navigator>
  );
}
