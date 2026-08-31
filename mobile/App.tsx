import React, { useEffect, useState } from "react";
import { StatusBar, View, Dimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "./src/theme";
import { AuthProvider, useAuth } from "./src/lib/AuthContext";
import { RootStack } from "./src/navigation/RootStack";
import { ONBOARDED_KEY } from "./src/lib/onboarding";
import { migrateLegacyKeys } from "./src/lib/storageMigration";
import { loadVoicePref } from "./src/lib/tts";
import { TtsBridge } from "./src/lib/ttsBridge";
import { track } from "./src/lib/track";

function Nav() {
  const { colors, isDark } = useTheme();
  const { user, loading } = useAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);

  // İlk açılış akışı bir kez gösterilir; görüldüğü yerelde tutulur.
  useEffect(() => {
    migrateLegacyKeys()
      .then(() => loadVoicePref())
      .then(() => AsyncStorage.getItem(ONBOARDED_KEY))
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(false));
    // Günün ilk açılışı (§4 funnel) — kind platform:görünüm, value ekran genişliği.
    track("app_open", Math.round(Dimensions.get("window").width), "android:standalone");
  }, []);

  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border } };

  // Bayrak + oturum okunana dek düz zemin — tema rengiyle, zıplama olmasın.
  if (onboarded === null || loading) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;

  // Misafir modu YOK: onboarding bitince hesap zorunlu. Onboarding görülmemişse
  // ilk akış; görülmüş ama oturum yoksa giriş duvarı; oturum varsa uygulama.
  const initialRoute = !onboarded ? "Onboarding" : !user ? "Auth" : "Tabs";

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <TtsBridge />
      {/* Telefon-öncelikli düzen: geniş ekranda (tablet) içerik ortalı bir
          sütuna sığdırılır — yoksa kartlar/metin tüm genişliğe yayılıp gerilir.
          Telefonda maxWidth kısıtlamaz (ekran zaten daha dar). */}
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center" }}>
        <View style={{ flex: 1, width: "100%", maxWidth: 520 }}>
          <RootStack initialRoute={initialRoute} />
        </View>
      </View>
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
