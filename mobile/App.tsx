import React, { useEffect, useRef, useState } from "react";
import { StatusBar, View, Dimensions, Platform, Linking } from "react-native";
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
import { attachTelemetry, screenChanged } from "./src/lib/telemetry";
import { loadSoundPref } from "./src/lib/sfx";
import { loadReduceMotion } from "./src/lib/reduceMotion";
import { loadCoachSeen } from "./src/game/coachLines";
import { loadLang, useLang } from "./src/lib/i18n";
import { attachPushListeners } from "./src/lib/pushDevice";
import { flushPendingAnswers } from "./src/game/session";
import { flushPendingLessons } from "./src/game/lessonProgress";
import { navigationRef } from "./src/lib/pushRoute";
import { parseDeepLink, type DeepLinkAction } from "./src/lib/deepLink";
import { completeEmailVerification, verifyOneTimeToken } from "./src/lib/auth";
import { t } from "./src/lib/i18n";
import { Text } from "./src/ui/Text";
import { AchievementUnlock } from "./src/ui/AchievementUnlock";

function Nav() {
  const { colors, isDark } = useTheme();
  const { user, loading, refresh } = useAuth();
  /** Doğrulama bağlantısı işlenirken gösterilen örtü (bkz. aşağıdaki derin bağlantı kancası). */
  const [verifying, setVerifying] = useState(false);
  /** Gezgin hazır olmadan gelen derin bağlantı (bkz. onReady). */
  const pending = useRef<DeepLinkAction>(null);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  // Arayüz dili: değiştiğinde tüm ağaç yeniden render edilsin diye tepede
  // dinleniyor (t() modül düzeyinde okuduğu için tek başına tetiklemez).
  useLang();

  /*
    DERİN BAĞLANTI — e-postadaki iki bağlantı uygulamada açıldığında.

    Sunucu yalnız uygulamanın karşılayabildiği iki yolu iddia ediyor
    (bkz. .well-known dosyaları): sıfırlama ve doğrulama. Burada da yalnız
    o ikisi tanınıyor; tanınmayan adres sessizce yok sayılıyor ve uygulama
    normal açılışını sürdürüyor.

    Köken denetimi `parseDeepLink`te: bağlantı DIŞARIDAN geliyor ve yabancı
    bir adresten gelen "doğrula" çağrısı, uygulamanın bizim olmayan bir
    sunucuya oturum açtırması demek olurdu.

    İki giriş noktası var ve ikisi de gerekli: uygulama KAPALIYKEN gelen
    bağlantı `getInitialURL`den, AÇIKKEN gelen olay dinleyicisinden.
  */
  useEffect(() => {
    let alive = true;

    /*
      SOĞUK AÇILIŞ YARIŞI. `getInitialURL` gezgin daha kurulmadan çözülüyor;
      ilk yazımda `isReady()` koruması bağlantıyı sessizce düşürüyordu ve
      uygulama giriş ekranında kalıyordu (cihazda görüldü). Hazır değilse
      eylem BEKLETİLİYOR, `NavigationContainer.onReady` onu işliyor.
    */
    const goReset = (token: string) => {
      if (!navigationRef.isReady()) { pending.current = { kind: "reset-password", token }; return; }
      try {
        (navigationRef.navigate as (n: string, p?: object) => void)("ResetPassword", { token });
      } catch { /* gezgin bir şekilde hazır değilse bağlantı uygulamayı açmakla kalır */ }
    };

    const handle = async (raw: string | null | undefined) => {
      const action = parseDeepLink(raw);
      if (!action || !alive) return;

      if (action.kind === "reset-password") { goReset(action.token); return; }

      /*
        TARAYICIDAN DEVİR. Android'de Apple girişi sistem tarayıcısında
        tamamlanıyor ve oturum çerezi oraya yazılıyor; uygulamanın kavanozu
        ayrı. Sunucu o oturumdan tek kullanımlık bir token üretip bizi buraya
        yolluyor, token da burada uygulamanın kendi oturumuna çevriliyor.

        Aynı bekleme perdesi kullanılıyor (`setVerifying`): kullanıcı
        tarayıcıdan dönüyor ve uygulama bir an boş görünmemeli.
      */
      if (action.kind === "auth-handoff") {
        setVerifying(true);
        await verifyOneTimeToken(action.token);
        await refresh();
        if (alive) setVerifying(false);
        return;
      }

      // Doğrulamayı uygulama tamamlıyor: better-auth yönlendirme boyunca oturum
      // çerezini RN'in kavanozuna yazıyor, yani kullanıcı burada girmiş oluyor.
      setVerifying(true);
      await completeEmailVerification(action.url);
      await refresh();
      if (alive) setVerifying(false);
    };

    void Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener("url", (e) => { void handle(e.url); });
    return () => { alive = false; sub.remove(); };
  }, [refresh]);

  /*
    Uzak bildirim dinleyicileri (FCM): jeton yenileme, ön planda gelen bildirimi
    kendimiz çizme, dokunuşta doğru ekrana gitme. Firebase yapılandırması yoksa
    kurulum sessizce boş döner. Jeton KAYDI burada değil AuthContext'te: jeton
    bir hesaba yazılıyor ve o hesap giriş yapılana kadar belli değil.
  */
  useEffect(() => attachPushListeners(), []);

  /* Ekran ölçümü (açılan ekran, ekranda geçen süre, yakalanmamış hata) —
     web `Telemetry` bileşeninin karşılığı. */
  useEffect(() => attachTelemetry(), []);

  /*
    ÇEVRİMDIŞI KALAN CEVAPLAR. Ağ yokken bitirilen turun cevapları cihazda
    kuyruğa alınıyor (`session` `queueAnswers`); bir sonraki tur atılana kadar
    orada beklerdi. Giriş yapılmış her açılışta kuyruk boşaltılıyor: kullanıcı
    ikinci turu hiç oynamasa da metroda çözdüğü tur sunucuya ulaşıyor.
    Oturum yoksa denenmiyor - 401 kuyruğu silmiyor ama boşuna istek de atmayalım.
  */
  useEffect(() => { if (user) { void flushPendingAnswers(); void flushPendingLessons(); } }, [user]);

  // İlk açılış akışı bir kez gösterilir; görüldüğü yerelde tutulur.
  useEffect(() => {
    migrateLegacyKeys()
      .then(() => loadLang())
      // Anahtar göçünden SONRA (tercihler yeni önekten okunur) ve loadLang'den
      // SONRA (hatırlatma metni kullanıcının dilinde kurulsun).
      .then(() => migrateReminderIds())
      .then(() => loadVoicePref())
      .then(() => loadAnalyticsPref())
      /* Oyun sesleri tercihi — ilk sesten ÖNCE okunmalı. */
      .then(() => loadSoundPref())
      // "Hareketi azalt" sistem tercihi — animasyon kararı veren her yer bunu
      // senkron okuyor, o yüzden ilk çizimden önce yüklenmesi gerekiyor.
      .then(() => loadReduceMotion())
      /* Koçun "son söyledikleri" — cümle seçimi çizim sırasında ve SENKRON
         yapılıyor, o yüzden kayıt önceden belleğe alınıyor. */
      .then(() => loadCoachSeen())
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
    <NavigationContainer
      ref={navigationRef}
      theme={navTheme}
      onStateChange={() => screenChanged(navigationRef.getCurrentRoute()?.name)}
      onReady={() => {
        screenChanged(navigationRef.getCurrentRoute()?.name); // ilk ekran da sayılıyor
        const p = pending.current;
        pending.current = null;
        if (p?.kind === "reset-password") {
          try {
            (navigationRef.navigate as (n: string, o?: object) => void)("ResetPassword", { token: p.token });
          } catch { /* yut */ }
        }
      }}
    >
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
      {/* Rozet kutlaması TEK YERDE, kökte: rozet altı ayrı yerde kazanılıyor
          ve altısına ayrı kutlama koymak altı yerde unutulur (web de kabukta
          tek kart tutuyor). Kendisi akış ekranlarını kesmiyor. */}
      <AchievementUnlock />
      {/* Doğrulama sürerken ekranı bir an boş bırakmamak için örtü: ağ çağrısı
          ve oturum tazelemesi bitene kadar duruyor. */}
      {verifying ? (
        <View style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
          <Text variant="h3">{t("verify.checking")}</Text>
        </View>
      ) : null}
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
