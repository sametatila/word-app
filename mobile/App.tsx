import React, { useEffect, useRef, useState } from "react";
import { StatusBar, View, Linking } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider, useTheme } from "./src/theme";
import { AuthProvider, useAuth } from "./src/lib/AuthContext";
import { RootStack } from "./src/navigation/RootStack";
import { ONBOARDED_KEY } from "./src/lib/onboarding";
import { migrateLegacyKeys, sweepDeadKeys } from "./src/lib/storageMigration";
import { migrateReminderIds, notifPrimeNeeded } from "./src/lib/notifications";
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
import { flushPendingLessons, flushPendingPathItems, pruneLessonResumes } from "./src/game/lessonProgress";
import { flushPendingPush, navigationRef } from "./src/lib/pushRoute";
import { parseDeepLink, type DeepLinkAction } from "./src/lib/deepLink";
import { completeEmailVerification, verifyOneTimeToken } from "./src/lib/auth";
import { consumeHandoff } from "./src/lib/handoff";
import { applyPendingReferral, attachReferral, savePendingReferral, type ReferralResult } from "./src/lib/pendingReferral";
import { t } from "./src/lib/i18n";
import { Text } from "./src/ui/Text";
import { AchievementUnlock } from "./src/ui/AchievementUnlock";
import { GuestClaimNotice } from "./src/ui/GuestClaimNotice";
import { TermsUpdateNotice } from "./src/ui/TermsUpdateNotice";
import { GuestMergeDialog } from "./src/ui/GuestMergeDialog";
import { AiConsentHost } from "./src/ui/AiConsentSheet";
import { AppGate } from "./src/ui/AppGate";
import { ErrorBoundary } from "./src/ui/ErrorBoundary";
import { NavBarBackdrop } from "./src/ui/NavBarBackdrop";
import { FontMetricsProbe } from "./src/ui/fontFit";

function Nav() {
  const { colors, isDark } = useTheme();
  const { user, loading, refresh, guestGone } = useAuth();
  /** Doğrulama bağlantısı işlenirken gösterilen örtü (bkz. aşağıdaki derin bağlantı kancası). */
  const [verifying, setVerifying] = useState(false);
  /** Gezgin hazır olmadan gelen derin bağlantı (bkz. onReady). */
  const pending = useRef<DeepLinkAction>(null);
  /**
   * Davet bağının SONUCU — bekletilen gezinme onu taşısın diye ayrı duruyor.
   *
   * Bekletme yolu yalnız GEZİNMEYİ erteliyor, eylemi değil (aynı ayrım
   * `profile`daki `invite` ölçümünde de yazılı): bağ bağlantı çözülür çözülmez
   * kuruluyor. Sonuç bekletilen eylemin içinde taşınsaydı, gezgin hazır
   * olmadığında istek ikinci kez atılır ve kullanıcı "zaten davetlisin"
   * görürdü — kendi ilk isteğimizin yankısı.
   */
  const refResult = useRef<ReferralResult | "pending" | null>(null);
  const [onboarded, setOnboarded] = useState<boolean | null>(null);
  /*
    BİLDİRİM İZNİ SORUSU AÇILIŞTA DA SORULUYOR.

    Ekran yalnız `AuthScreen`in girişten sonraki yönlendirmesinden
    açılabiliyordu; oturum cihazda kaldığı için o yol yılda bir kez bile
    geçilmiyor. "Belki sonra" diyen kullanıcı soruyu bir daha HİÇ görmüyordu
    (bayrak da kalıcıydı, bkz. `lib/notifications`). Webde kart her oturum
    özetinde yeniden çıkıyor ve kapatıldığında üç hafta erteleniyor.

    Artık erteleme penceresi dolmuşsa soru soğuk açılışta da geliyor —
    hatırlatma kuruluysa `notifPrimeNeeded` zaten `false` döndüğü için izin
    vermiş kullanıcı bunu hiç görmez.
  */
  const [prime, setPrime] = useState(false);
  // Arayüz dili: değiştiğinde tüm ağaç yeniden render edilsin diye tepede
  // dinleniyor (t() modül düzeyinde okuduğu için tek başına tetiklemez).
  useLang();

  /*
    AÇILIŞTAKİ OTURUM KURULUMU BEKLENİYOR (oturumu değiştiren bağlantılar için).

    Uygulama bir doğrulama bağlantısıyla SOĞUK açıldığında bağlantı, misafirin
    oturumu jetonla geri kurulmadan (`AuthContext` açılış etkisi) işlenebiliyordu.
    O anda çerez yok; sunucu "açık oturum başka bir hesaba geçmez" kuralını
    (bkz. sunucu `hooks.after` /verify-email) uygulayamıyor, bağlantının hesabına
    giriş yapılıyor ve açılış etkisi misafirin ilerlemesini o hesaba
    birleştiriyordu. Başkasının bağlantısıyla gelen saldırı tam bu yoldan
    geçer. Kurulum bitince misafirin çerezi yerinde olduğu için kural işliyor.
  */
  const loadingRef = useRef(loading);
  const authWaiters = useRef<(() => void)[]>([]);
  useEffect(() => {
    loadingRef.current = loading;
    if (!loading) for (const done of authWaiters.current.splice(0)) done();
  }, [loading]);
  const authSettled = () =>
    loadingRef.current ? new Promise<void>((resolve) => { authWaiters.current.push(resolve); }) : Promise.resolve();

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

    /* Paylaşılan profil — aynı soğuk açılış yarışına tabi, o yüzden aynı
       bekletme yolundan geçiyor. */
    const goProfile = (username: string) => {
      /* Bekletilen eylemde `invite` artık gerekmiyor: olay bağlantı ÇÖZÜLÜR
         ÇÖZÜLMEZ yazılıyor (aşağıdaki dal), gezgin yarışından önce. */
      if (!navigationRef.isReady()) { pending.current = { kind: "profile", username, invite: false }; return; }
      try {
        (navigationRef.navigate as (n: string, p?: object) => void)("User", { username });
      } catch { /* yut */ }
    };

    /* Davet sonucu paywall'da söyleniyor — web `/premium?ref=…` ile AYNI yer ve
       aynı cümleler. Ayrı bir bildirim yüzeyi açmak, aynı şeyi iki uygulamada
       iki farklı biçimde anlatmak olurdu. */
    const goPaywall = (ref: ReferralResult | "pending") => {
      refResult.current = ref;
      if (!navigationRef.isReady()) { pending.current = { kind: "referral", code: "" }; return; }
      try {
        (navigationRef.navigate as (n: string, p?: object) => void)("Paywall", { ref });
      } catch { /* yut */ }
    };

    const handle = async (raw: string | null | undefined) => {
      const action = parseDeepLink(raw);
      if (!action || !alive) return;

      if (action.kind === "reset-password") { goReset(action.token); return; }

      /* Webdeki "uygulamada Premium'a geç" (`/get/premium`): paywall açılıyor ve
         görüntüleme webden geldiği bilinerek sayılıyor (`from: "web"`). */
      if (action.kind === "paywall") {
        if (!navigationRef.isReady()) { pending.current = { kind: "paywall" }; return; }
        try {
          (navigationRef.navigate as (n: string, p?: object) => void)("Paywall", { from: "web" });
        } catch { /* yut */ }
        return;
      }

      /* GRUP KODU (`/g/<KOD>`, yalnız Android — `parseDeepLink` iOS'ta null
         döndürüyor). Hiçbir şey talep edilmiyor: paywall açılıyor ve kod
         alanı dolu geliyor, planı kullanıcı seçiyor. Misafir ve girişsiz
         kullanıcıya hesap çağrısını paywall'ın kendisi gösteriyor. */
      if (action.kind === "group") {
        if (!navigationRef.isReady()) { pending.current = action; return; }
        try {
          (navigationRef.navigate as (n: string, p?: object) => void)("Paywall", { group: action.code });
        } catch { /* yut */ }
        return;
      }

      /*
        DAVET BAĞLANTISI — bağ KODA DEĞİL DOKUNUŞA bağlı.

        Oturum kurulumu BEKLENİYOR: soğuk açılışta çerez henüz yerinde
        olmayabiliyor ve uç hesap istiyor (`requireAccount`). Beklenmezse
        girişli bir kullanıcının daveti "hesap yok" sanılıp bekletmeye
        düşerdi — sonuç yanlış değil ama gereksiz bir gecikme.

        Hesap gerçekten yoksa (girişsiz ya da MİSAFİR) kod cihazda bekliyor ve
        giriş yapılınca uygulanıyor; davet sessizce kaybolmuyor.
      */
      if (action.kind === "referral") {
        track("invite_open");
        await authSettled();
        if (!alive) return;
        const r = await attachReferral(action.code);
        if (r === null) await savePendingReferral(action.code);
        if (!alive) return;
        goPaywall(r ?? "pending");
        return;
      }

      /*
        DAVETİN VARIŞI ÖLÇÜLÜYOR — web ile aynı olay adıyla.

        Panelde davet hunisi `share` (paylaşıldı) ve `invite_open` (açıldı)
        çiftini okuyor. `invite_open`ı yalnız web yazıyordu ve orada da
        paylaşılan bağlantı işaretsiz olduğu için hiç yazılmıyordu; oysa
        davetin AÇILDIĞI yer çoğunlukla telefon — uygulaması kurulu kullanıcı
        bağlantıya dokununca tarayıcı değil bu dal çalışıyor.
      */
      if (action.kind === "profile") {
        if (action.invite) track("invite_open");
        goProfile(action.username);
        return;
      }

      /*
        TARAYICIDAN DEVİR. Android'de Apple girişi sistem tarayıcısında
        tamamlanıyor ve oturum çerezi oraya yazılıyor; uygulamanın kavanozu
        ayrı. Sunucu o oturumdan tek kullanımlık bir token üretip bizi buraya
        yolluyor, token da burada uygulamanın kendi oturumuna çevriliyor.

        Aynı bekleme perdesi kullanılıyor (`setVerifying`): kullanıcı
        tarayıcıdan dönüyor ve uygulama bir an boş görünmemeli.
      */
      if (action.kind === "auth-handoff") {
        /*
          YALNIZ BU CİHAZIN BAŞLATTIĞI DEVİR. Bağlantı dışarıdan geliyor ve
          jetonu kimin ürettiği adresten anlaşılmıyor: başkasının jetonu
          uygulamayı sessizce o kişinin hesabına geçirirdi (bkz. lib/handoff).
        */
        if (!(await consumeHandoff(action.nonce))) return;
        setVerifying(true);
        await authSettled();
        await verifyOneTimeToken(action.token);
        await refresh();
        if (alive) setVerifying(false);
        return;
      }

      // Doğrulamayı uygulama tamamlıyor: better-auth yönlendirme boyunca oturum
      // çerezini RN'in kavanozuna yazıyor, yani kullanıcı burada girmiş oluyor.
      setVerifying(true);
      await authSettled();
      await completeEmailVerification(action.url);
      await refresh();
      if (alive) setVerifying(false);
    };

    void Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener("url", (e) => { void handle(e.url); });
    return () => { alive = false; sub.remove(); };
  }, [refresh]);

  /*
    BEKLEYEN DAVET, HESAP BELİRİNCE UYGULANIYOR.

    Davet bağlantısına dokunan kişi o anda girişsiz ya da MİSAFİR olabiliyor;
    uç hesap istiyor. Kod cihazda bekletiliyor (`lib/pendingReferral`) ve
    burada, gerçek bir hesap göründüğünde uygulanıyor.

    SESSİZ: kullanıcı dokunduğu anda "giriş yapınca bağlanacak" cümlesini
    gördü, söz burada tutuluyor. Girişin hemen ardından ikinci bir bildirimle
    kesmek, verilen sözü haber diye sunmak olurdu.

    Misafir DIŞARIDA: misafir hesabı davet edilen sayılmıyor (uç da
    reddediyor), kod yerinde kalıp hesaba geçişi bekliyor.
  */
  useEffect(() => {
    if (loading || !user || user.guest) return;
    void applyPendingReferral();
  }, [loading, user]);

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
  /*
    MİSAFİR KİMLİĞİ UYGULAMA AÇIKKEN KAYBOLDU (sunucuda silinmiş, jetonla geri
    kurulamadı; bkz. AuthContext `restoreGuest`). Kullanıcı null'a düşüyor ama
    ekran yerinde kalıyordu ve her istek 401 alıyordu. Giriş ekranı nedenini
    söylüyor.
  */
  useEffect(() => {
    if (loading || user || !guestGone || !navigationRef.isReady()) return;
    const here = navigationRef.getCurrentRoute()?.name;
    if (here === "Auth" || here === "Onboarding") return;
    (navigationRef.reset as (s: object) => void)({ index: 0, routes: [{ name: "Auth" }] });
  }, [loading, user, guestGone]);

  useEffect(() => { if (user) { void flushPendingAnswers(); void flushPendingLessons(); void flushPendingPathItems(); } }, [user]);

  // İlk açılış akışı bir kez gösterilir; görüldüğü yerelde tutulur.
  useEffect(() => {
    migrateLegacyKeys()
      // Göçten SONRA: eski adlar önce yeni adlara çevrilmiş olmalı (bkz. storageMigration).
      .then(() => Promise.all([sweepDeadKeys(), pruneLessonResumes()]))
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
      /* `app_open` BURADA YAZILMIYOR. Her açılışta `:standalone`, telemetride
         (`lib/telemetry` ilkAcilis) günde bir `:native` diye İKİ kez yazılıyordu:
         native açılış web uygulaması (PWA) sayılıyordu. Web kuralı "günün ilk
         açılışı"; tek yazıcı artık telemetri. */
      /* Bildirim izni sorusu gerekiyor mu — `onboarded`DAN ÖNCE: ilk çizimi
         açan bayrak o, yani rota hesaplanırken bu yanıt hazır olmak zorunda. */
      .then(() => notifPrimeNeeded().catch(() => false))
      .then((v) => setPrime(v))
      .then(() => AsyncStorage.getItem(ONBOARDED_KEY))
      .then((v) => setOnboarded(v === "1"))
      .catch(() => setOnboarded(false));
  }, []);

  const base = isDark ? DarkTheme : DefaultTheme;
  const navTheme = { ...base, colors: { ...base.colors, background: colors.bg, card: colors.surface, text: colors.text, primary: colors.primary, border: colors.border } };

  // Bayrak + oturum okunana dek düz zemin — tema rengiyle, zıplama olmasın.
  if (onboarded === null || loading) return <View style={{ flex: 1, backgroundColor: colors.bg }} />;

  // Oturum ÖNCE bakılıyor — açık oturum "bu kullanıcı yeni değil" demek, cihaz
  // bayrağı ne derse desin. Sıra tersken bayrağı silinmiş (depolama temizliği,
  // geri yükleme) ama oturumu duran kullanıcı ilk açılış akışına düşüyor, kendi
  // ayarı olmayan sorulara yanıt veriyordu. Oturum yoksa: akış görülmemişse ilk
  // akış, görülmüşse giriş ekranı (orada "Hesapsız devam et" de var).
  //
  // MİSAFİR bildirim izni ekranına düşmüyor: hatırlatmalar hesap istiyor
  // (mağaza ön inceleme B24). Hesap açınca giriş ekranı o soruyu soruyor.
  const initialRoute = user ? (prime ? "NotifPrime" : "Tabs") : !onboarded ? "Onboarding" : "Auth";

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
        if (p?.kind === "profile") {
          try {
            (navigationRef.navigate as (n: string, o?: object) => void)("User", { username: p.username });
          } catch { /* yut */ }
        }
        /* Davet bağı zaten kuruldu (bkz. `refResult`); burada yalnız SONUÇ
           gösteriliyor, istek tekrarlanmıyor. */
        if (p?.kind === "paywall") {
          try {
            (navigationRef.navigate as (n: string, o?: object) => void)("Paywall", { from: "web" });
          } catch { /* yut */ }
        }
        if (p?.kind === "group") {
          try {
            (navigationRef.navigate as (n: string, o?: object) => void)("Paywall", { group: p.code });
          } catch { /* yut */ }
        }
        if (p?.kind === "referral" && refResult.current) {
          try {
            (navigationRef.navigate as (n: string, o?: object) => void)("Paywall", { ref: refResult.current });
          } catch { /* yut */ }
        }
        /* BİLDİRİM DOKUNUŞU DA BEKLİYOR OLABİLİR. Uygulama kapalıyken
           bildirime dokunulup açıldığında gezgin henüz kurulmamış oluyordu ve
           rota sessizce düşüyordu (bkz. pushRoute `bekleyen`). Derin bağlantı
           ile aynı yerden boşaltılıyor. */
        flushPendingPush();
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
      {/* Gezinme çubuğunun zemini — kaydırılan içerik tuşların arkasından
          akmasın (bkz. ui/NavBarBackdrop). */}
      <NavBarBackdrop />
      {/* Rozet kutlaması TEK YERDE, kökte: rozet altı ayrı yerde kazanılıyor
          ve altısına ayrı kutlama koymak altı yerde unutulur (web de kabukta
          tek kart tutuyor). Kendisi akış ekranlarını kesmiyor. */}
      <AchievementUnlock />
      {/* Misafir hesaba geçince ilerlemenin nereye gittiği — birleşme birden çok
          giriş yolundan geliyor, not bu yüzden kökte (bkz. ui/GuestClaimNotice). */}
      <GuestClaimNotice />
      {/* "Şartlar güncellendi" notu ve hesap tercihlerinin (analitik)
          eşitlenmesi — oturum açılınca bir kez (bkz. ui/TermsUpdateNotice). */}
      <TermsUpdateNotice />
      <GuestMergeDialog />
      {/* YAPAY ZEKÂ RIZASI TEK YERDE, kökte: sunucu metni ya da sesi
          sağlayıcıya göndermeden önce izin istediğinde API istemcisi bu
          ekranı açtırıyor (bkz. lib/aiConsent). Kırk çağrı yerinin her birine
          ayrı ekran koymak kırk yerde unutulurdu. */}
      <AiConsentHost />
      {/* UYGULAMA KAPISI kökte ve EN ÜSTTE: bakım ve zorunlu güncelleme her
          ekranın önüne geçmeli (bkz. ui/AppGate, panel /admin/app). */}
      <AppGate />
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
        <FontMetricsProbe />
        {/* KÖK ÇÖKME SINIRI — gezginin kendisi ya da oturum sağlayıcısı
            patlarsa. Ekran başına sınır bir düzey altta, `ContentColumn`
            içindeki `screenLayout`larda; bu ikili web'in iki `error.tsx`
            dosyasının aynısı. Tema sağlayıcısının İÇİNDE, çünkü kart kendi
            renklerini temadan okuyor. */}
        <ErrorBoundary>
          <AuthProvider>
            <Nav />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
