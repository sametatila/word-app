import React, { useEffect, useState } from "react";
import { StatusBar, View, Dimensions, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "./src/theme";
import { AuthProvider, useAuth } from "./src/lib/AuthContext";
import { RootStack } from "./src/navigation/RootStack";
import { ONBOARDED_KEY } from "./src/lib/onboarding";
import { migrateLegacyKeys } from "./src/lib/storageMigration";
import { migrateReminderIds } from "./src/lib/notifications";
import { loadVoicePref } from "./src/lib/tts";
import { TtsBridge } from "./src/lib/ttsBridge";
import { track, loadAnalyticsPref } from "./src/lib/track";
import { loadReduceMotion } from "./src/lib/reduceMotion";
import { loadLang, useLang } from "./src/lib/i18n";
import { attachPushListeners } from "./src/lib/pushDevice";
import { navigationRef } from "./src/lib/pushRoute";

function Nav() {
  const { colors, isDark } = useTheme();
  const { user, loading } = useAuth();
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  // Arayüz dili: değiştiğinde tüm ağaç yeniden render edilsin diye tepede
  // dinleniyor (t() modül düzeyinde okuduğu için tek başına tetiklemez).
  useLang();

  /*
    Uzak bildirim dinleyicileri (FCM): jeton yenileme, ön planda gelen bildirimi
    kendimiz çizme, dokunuşta doğru ekrana gitme. Firebase yapılandırması yoksa
    kurulum sessizce boş döner. Jeton KAYDI burada değil AuthContext'te: jeton
    bir hesaba yazılıyor ve o hesap giriş yapılana kadar belli değil.
  */
  useEffect(() => attachPushListeners(), []);

  // İlk açılış akışı bir kez gösterilir; görüldüğü yerelde tutulur.
  useEffect(() => {
    migrateLegacyKeys()
      .then(() => loadLang())
      // Anahtar göçünden SONRA (tercihler yeni önekten okunur) ve loadLang'den
      // SONRA (hatırlatma metni kullanıcının dilinde kurulsun).
      .then(() => migrateReminderIds())
      .then(() => loadVoicePref())
      .then(() => loadAnalyticsPref())
      // "Hareketi azalt" sistem tercihi — animasyon kararı veren her yer bunu
      // senkron okuyor, o yüzden ilk çizimden önce yüklenmesi gerekiyor.
      .then(() => loadReduceMotion())
      // Günün ilk açılışı (§4 funnel) — kind platform:görünüm, value ekran genişliği.
      // Görünüm native pakette her zaman "standalone"; web tarafı (components/telemetry)
      // aynı kalıbı display-mode'dan üretiyor ve yönetim panosu ikisini de tanıyor
      // (app/admin/dashboard.tsx PLATFORM_LABEL: ios|android|desktop : standalone|browser).
      // Platform sabit yazılıydı; iOS açılışları Android sayılıyordu.
      // Analitik tercihi yüklendikten SONRA: kullanıcı kapattıysa bu olay da gitmez.
      .then(() => track("app_open", Math.round(Dimensions.get("window").width), `${Platform.OS}:standalone`))
      .then(() => AsyncStorage.getItem(ONBOARDED_KEY))
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(false));
  }, []);

  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border } };

  // Bayrak + oturum okunana dek düz zemin — tema rengiyle, zıplama olmasın.
  if (onboarded === null || loading) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;

  // Misafir modu YOK: onboarding bitince hesap zorunlu. Oturum ÖNCE bakılıyor —
  // açık oturum "bu kullanıcı yeni değil" demek, cihaz bayrağı ne derse desin.
  // Sıra tersken bayrağı silinmiş (depolama temizliği, geri yükleme) ama oturumu
  // duran kullanıcı ilk açılış akışına düşüyor, kendi ayarı olmayan sorulara
  // yanıt veriyordu. Oturum yoksa: akış görülmemişse ilk akış, görülmüşse giriş.
  const initialRoute = user ? "Tabs" : !onboarded ? "Onboarding" : "Auth";

  return (
    /* Gezgin başvurusu bileşen ağacının dışından gezinmek için: bildirime
       dokunuş bir React olayı değil, sistemden gelen bir çağrı. */
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <TtsBridge />
      {/* Zemin TAM GENİŞLİK; okunabilir sütun ekran başına uygulanıyor
          (ui/ContentColumn, gezginlerin `screenLayout`'u). Sütun eskiden burada,
          gezginin tamamının çevresindeydi ve sekme çubuğunu da içine alıyordu:
          yatay tablette uygulama, iki yanı boş bir telefon şeridi gibi
          duruyordu. */}
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <RootStack initialRoute={initialRoute} />
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
