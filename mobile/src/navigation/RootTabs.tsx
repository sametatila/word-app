import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import { contentColumnLayout, wideColumnLayout } from "../ui/ContentColumn";
import { t, useLang } from "../lib/i18n";
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
  /**
   * DİL ABONELİĞİ BURADA OLMAK ZORUNDA — App.tsx'teki useLang() yetmiyor.
   *
   * Sekme başlıkları `t()` ile kuruluyor ve `t()` modül düzeyinde okuyor, yani
   * dil değişince kendiliğinden yeniden hesaplanmıyor. App.tsx tepede useLang()
   * çağırıyor ama o yalnız `Nav`'ı yeniden çiziyor: RootTabs, React Navigation'ın
   * bir EKRANI ve gezgin onu kendi belleğinde tutuyor, üstteki render aşağı inmiyor.
   *
   * Cihazda ölçüldü (2026-09-09, SM-S942B): cihaz dili İngilizceyken giriş
   * yapılınca profil dili Türkçeye geçiyor, içerik Türkçe çiziliyor ama sekme
   * çubuğu "Learn / Path / Skills" olarak kalıyordu — aynı ekranda iki dil.
   * Uygulama yeniden başlatılınca düzeliyordu, yani kalıcı değil ama görünür;
   * mağaza incelemesinin ilk yakaladığı şeylerden.
   */
  useLang();
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
