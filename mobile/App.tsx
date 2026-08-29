import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "./src/theme";
import { RootTabs } from "./src/navigation/RootTabs";

function Nav() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border } };
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <RootTabs />
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Nav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
