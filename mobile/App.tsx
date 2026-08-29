import React, { useEffect, useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "./src/theme";
import { AuthProvider } from "./src/lib/AuthContext";
import { RootStack } from "./src/navigation/RootStack";
import { ONBOARDED_KEY } from "./src/lib/onboarding";

function Nav() {
  const { colors, isDark } = useTheme();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  // İlk açılış akışı bir kez gösterilir; görüldüğü yerelde tutulur.
  useEffect(() => {
    AsyncStorage.getItem(ONBOARDED_KEY)
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(false));
  }, []);

  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border } };

  // Flag okunana dek düz zemin — tema rengiyle, zıplama olmasın.
  if (onboarded === null) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <RootStack initialRoute={onboarded ? "Tabs" : "Onboarding"} />
    </NavigationContainer>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
