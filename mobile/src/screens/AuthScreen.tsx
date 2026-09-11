import React, { useEffect, useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { AppleIcon, ArrowBackIcon, BoltIcon, GoogleIcon, MailIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { requestPasswordReset, sendVerificationEmail } from "../lib/auth";
import { fetchServerConfig } from "../lib/serverConfig";
import { Turnstile } from "../ui/Turnstile";
import { sendTwoFactorOtp, verifyTwoFactorOtp } from "../lib/auth";
import { TWO_FACTOR_CODE_DIGITS, TWO_FACTOR_CODE_MINUTES } from "../lib/twoFactor";
import { openLegal } from "../lib/legal";
import { googleSignIn, googleSupported } from "../lib/googleAuth";
import { appleSignIn, appleSupported, appleWebSignIn } from "../lib/appleAuth";
import { notifPrimeNeeded } from "../lib/notifications";
import { isEmailNotVerified, translateAuthError } from "../lib/authErrors";
import { checkPassword } from "../lib/passwordPolicy";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { PROFILE_LIMITS } from "../lib/profileDefaults";

type Mode = "signin" | "signup";
type View2 = "options" | "email" | "forgot" | "verify" | "twofactor";
/** Doğrulama ekranına hangi yoldan gelindi: yeni kayıt mı, girişi kesilen hesap mı. */
type VerifyReason = "new" | "blocked";

/** İki gönderim arası bekleme. Web'deki `RESEND_COOLDOWN` ile aynı (saniye). */
const RESEND_COOLDOWN = 60;

/**
 * Giriş / kayıt. Önce sağlayıcı listesi (Apple / Google / E-posta); e-posta formu
 * "E-posta ile devam et"e basınca gelir. İkisi de NATIVE akışta (sistem ekranı →
 * idToken → better-auth), WebView yok.
 *
 * Sağlayıcı listesi SUNUCUDAN kapılıyor (`/api/config`): kapalı bir sağlayıcının
 * düğmesi hiç çizilmez, çünkü çalışmayan düğme her iki mağazada da "bozuk
 * işlevsellik" sayılıyor. Apple ayrıca cihaz kapısından da geçiyor (iOS 13+);
 * Android'de `appleSupported()` false döndüğü için liste bugünküyle aynı kalır.
 * Facebook hâlâ yok — sağlayıcı eklenince buraya geri gelir.
 *
 * Sıra bilinçli: Apple'ın kendi yönergesi "Apple ile Giriş düğmesi öteki giriş
 * düğmelerinin ÜSTÜNDE dursun" diyor.
 */
const PROVIDERS = [
  { id: "apple", label: "Apple" },
  { id: "google", label: "Google" },
] as const;

function providerIcon(id: string, colors: Palette) {
  if (id === "google") return <GoogleIcon size={22} />;
  // Apple logosu tek renk: koyu temada beyaz, açıkta siyah. Apple'ın izin verdiği
  // "çerçeveli beyaz düğme" görünümü bu (renkli logo yasak).
  if (id === "apple") return <AppleIcon color={colors.text} size={22} />;
  return <MailIcon color={colors.text} size={22} />;
}

export function AuthScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const toApp = async () => {
    // İlk giriş sonrası bir kez bildirim priming; sonra uygulama.
    const prime = await notifPrimeNeeded().catch(() => false);
    nav.reset({ index: 0, routes: [{ name: prime ? "NotifPrime" : "Tabs" }] });
  };
  const { signIn, signUp, socialComplete } = useAuth();
  /*
    İKİNCİ ADIM. Parola kabul edildiğinde sunucu oturumu açmıyor; kimliği
    kısa ömürlü imzalı bir çerez taşıyor ve kod e-postaya gidiyor (bkz.
    lib/auth sendTwoFactorOtp). Doğrulama bitince oturumu `socialComplete`
    kuruyor — adı sosyal girişten kalma ama yaptığı iş tam olarak bu:
    oturumu sunucudan oku, kullanıcıyı yaz, hesabın ayarlarını devral.
  */
  const [code, setCode] = useState("");
  const [trustDevice, setTrustDevice] = useState(false);
  const [codeBusy, setCodeBusy] = useState(false);
  const [view, setView] = useState<View2>("options");
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /*
    Sunucudaki kuralın kopyası (lib/passwordPolicy) — burada yalnız anında geri
    bildirim için, kapı sunucuda. Web ile aynı listeyi taşıdığı `check:parity`
    ile ölçülüyor; ayrışırsa alan yeşil görünür ve gönderince sunucu reddeder.
  */
  const passwordProblem = checkPassword(password, { email, name });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socialBusy, setSocialBusy] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);
  /*
    Doğrulama ekranı. Adres AYRI tutuluyor: kullanıcı bu ekranda dururken
    e-posta alanını değiştirebiliyor ve "tekrar gönder" o an yazılı olana değil,
    kaydın yapıldığı adrese gitmeli.
  */
  const [verifyReason, setVerifyReason] = useState<VerifyReason>("new");
  const [verifyEmail, setVerifyEmail] = useState("");
  const [resendBusy, setResendBusy] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  // Geri sayım: art arda basış sunucunun hız sınırına takılmasın (web ile aynı).
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);
  // Sunucuda kapalı olan sağlayıcının düğmesi hiç çizilmez (çalışmayan düğme yok).
  // Cevap gelene dek de çizilmez; yalnız e-posta görünür — ekran hiçbir an "bozuk"
  // değildir. İkisinin de ayrıca bir CİHAZ kapısı var: sunucu açık dese bile Apple
  // iOS 13 altında/Android'de, Google da iOS istemcisi koda girmemişken çizilmez.
  const [providersOn, setProvidersOn] = useState({ google: false, apple: false });
  /*
    BOT KORUMASI. Sunucudaki anahtarla birlikte açılıp kapanıyor: açıkken kayıt,
    giriş ve sıfırlama isteği jetonsuz reddediliyor, kapalıyken widget hiç
    çizilmiyor. Jeton TEK KULLANIMLIK — her denemeden sonra `captchaNonce`
    artıyor ve widget sıfırlanıyor.
  */
  const [captchaOn, setCaptchaOn] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaNonce, setCaptchaNonce] = useState(0);
  useEffect(() => {
    let alive = true;
    void fetchServerConfig().then((c) => {
      if (!alive) return;
      setProvidersOn({
        google: c.providers.google && googleSupported(),
        /*
          İKİ AYRI KAPI. iOS'ta native akış var ve sunucudaki `apple` bayrağına
          bakıyor. Android'de native yol YOK; oradaki düğme tarayıcı akışına
          gidiyor ve o da ayrı bir sunucu kapısı istiyor (`appleWeb` — Services
          ID + client secret). Tek bayrağa bakılsaydı Android'de Apple'ın hata
          sayfasına götüren bir düğme çizilirdi.
        */
        apple: appleSupported() ? c.providers.apple : c.providers.appleWeb,
      });
      setCaptchaOn(Boolean(c.turnstileSiteKey));
    });
    return () => { alive = false; };
  }, []);

  /** Doğrulama bekleniyorsa gönderim düğmeleri kapalı. */
  const captchaBlocked = captchaOn && !captchaToken;

  /** Doğrulama ekranına geç. Adres dondurulur, geri sayım ve bildirimler sıfırlanır. */
  function toVerify(address: string, reason: VerifyReason) {
    setVerifyEmail(address);
    setVerifyReason(reason);
    setResendSent(false);
    setCooldown(0);
    setError(null);
    setView("verify");
  }

  /** İkinci adıma geç: kodu iste ve ekranı aç. */
  async function toTwoFactor() {
    setCode("");
    setTrustDevice(false);
    setResendSent(false);
    setCooldown(RESEND_COOLDOWN);
    setError(null);
    setView("twofactor");
    const r = await sendTwoFactorOtp();
    if (!r.ok) setError(t("twofa.expired"));
  }

  async function doVerifyCode() {
    if (codeBusy || !code.trim()) return;
    setCodeBusy(true);
    setError(null);
    setResendSent(false);
    const r = await verifyTwoFactorOtp(code, trustDevice);
    setCodeBusy(false);
    if (!r.ok) { setError(translateAuthError(r.code, r.message, r.status)); return; }
    // Oturum artık var; kullanıcıyı ve hesabın ayarlarını yükle.
    const done = await socialComplete();
    if (done) { setPassword(""); void toApp(); return; }
    setError(t("auth.sign_in_could_not_be_completed"));
  }

  async function resendCode() {
    if (codeBusy || cooldown > 0) return;
    setCodeBusy(true);
    setError(null);
    setResendSent(false);
    const r = await sendTwoFactorOtp();
    setCodeBusy(false);
    if (!r.ok) { setError(t("twofa.expired")); return; }
    setResendSent(true);
    setCooldown(RESEND_COOLDOWN);
  }

  async function submit() {
    if (busy || captchaBlocked) return;
    const address = email.trim();
    setBusy(true);
    setError(null);
    const r = mode === "signin"
      ? await signIn(address, password, captchaToken)
      : await signUp(name, address, password, captchaToken);
    setBusy(false);
    setCaptchaNonce((n) => n + 1);

    if (r.ok) {
      // İkinci adım bekleniyorsa oturum YOK ve bu bir hata değil.
      if (r.twoFactor) { void toTwoFactor(); return; }
      /*
        Kayıt 200 döndü ama oturum açılmadıysa e-posta doğrulaması bekleniyor
        (bkz. lib/auth AuthOutcome.session). Uygulamaya geçmek yerine doğrulama
        ekranına — web de aynı ayrımı yapıyor (components/auth-form).
      */
      if (r.session) { void toApp(); return; }
      toVerify(address, "new");
      return;
    }

    // Doğrulanmamış hesap bir hata değil, eksik bir adım: kullanıcıyı oraya al.
    if (isEmailNotVerified(r.code, r.message)) { toVerify(address, "blocked"); return; }
    setError(translateAuthError(r.code, r.message, r.status));
  }

  async function doResend() {
    if (resendBusy || cooldown > 0 || !verifyEmail) return;
    setResendBusy(true);
    setError(null);
    setResendSent(false);
    const r = await sendVerificationEmail(verifyEmail);
    setResendBusy(false);
    if (!r.ok) { setError(translateAuthError(r.code, r.message, r.status)); return; }
    setResendSent(true);
    setCooldown(RESEND_COOLDOWN);
  }

  async function doReset() {
    if (resetBusy || captchaBlocked || !email.trim()) return;
    setResetBusy(true);
    setError(null);
    await requestPasswordReset(email.trim(), captchaToken);
    setResetBusy(false);
    setCaptchaNonce((n) => n + 1);
    setResetSent(true); // güvenlik: e-posta kayıtlı olmasa da aynı onay
  }

  async function startSocial(provider: string) {
    if (socialBusy || (provider !== "google" && provider !== "apple")) return;
    setSocialBusy(provider);
    setError(null);
    /*
      ANDROID'DE APPLE: TARAYICI YOLU ve sonucu BURADAN DÖNMÜYOR.

      Apple'ın Android SDK'sı olmadığı için giriş sistem tarayıcısında
      tamamlanıyor; uygulamaya dönüş `/auth/app?ott=…` derin bağlantısıyla
      oluyor ve oturumu App.tsx kuruyor. Burada `socialComplete()` çağırmak,
      kullanıcı daha tarayıcıya bile geçmeden "giriş tamamlanamadı" demek
      olurdu. Düğme yalnız serbest bırakılıyor: kullanıcı tarayıcıya gidiyor,
      döndüğünde uygulama zaten girmiş oluyor.
    */
    if (provider === "apple" && !appleSupported()) {
      const opened = await appleWebSignIn();
      setSocialBusy(null);
      if (!opened.ok) setError(opened.message);
      return;
    }
    // Kalan ikisi NATIVE: sistem ekranı → idToken → better-auth. WebView yok (Google
    // embedded WebView OAuth'u engelliyor + cihaz hesaplarını göstermiyordu; Apple
    // tarafında da sistem ekranı zorunlu).
    const r = provider === "apple" ? await appleSignIn() : await googleSignIn();
    if (r.ok) {
      const done = await socialComplete(); // oturumu tazele + onboarding prefs
      setSocialBusy(null);
      if (done) void toApp();
      else setError(t("auth.sign_in_could_not_be_completed"));
    } else {
      setSocialBusy(null);
      if (r.code !== "CANCELLED") setError(r.message);
    }
  }

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 14, color: colors.text, fontSize: 16,
  } as const;

  /*
    Başlık ve alt başlık dört görünüm × iki kip boyunca ayrışıyor. Satır içi
    üçlü koşul dördüncü dalda okunmaz hâle geldiği için burada hesaplanıyor.
  */
  const headTitle =
    view === "twofactor" ? t("twofa.verify_title")
      : view === "verify" ? t(verifyReason === "blocked" ? "verify.title_blocked" : "verify.title")
      : view === "forgot" ? t("auth.forgot_your_password")
        : view === "options" ? t("auth.sign_in")
          : mode === "signin" ? t("auth.welcome_back") : t("auth.create_account");

  const headSub =
    view === "twofactor" ? t("twofa.verify_sub", { n: TWO_FACTOR_CODE_MINUTES })
      : view === "verify"
      ? verifyReason === "blocked"
        ? (verifyEmail ? t("verify.blocked_with_email", { email: verifyEmail }) : t("verify.blocked"))
        : (verifyEmail ? t("verify.sent_with_email", { email: verifyEmail }) : t("verify.sent"))
      : view === "forgot" ? t("auth.enter_your_email_and_we_ll_send")
        : view === "options" ? t("auth.your_progress_is_saved_and")
          : mode === "signin" ? t("auth.pick_your_streak_up_where_you") : t("auth.it_takes_few_seconds_and_your");

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Zorunlu giriş duvarı: seçenekler ekranında kapatma YOK (misafir modu yok).
          Yalnız e-posta formundan sağlayıcı listesine geri dönülür. */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, minHeight: 44 }}>
        {(view === "email" || view === "verify" || view === "twofactor") && (
          <PressableScale accessibilityLabel={t("common.back")} hitSlop={4} onPress={() => { setView(view === "email" ? "options" : "email"); setError(null); }} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <ArrowBackIcon color={colors.text} size={24} />
          </PressableScale>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <BoltIcon color={colors.onPrimary} size={38} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>{headTitle}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>{headSub}</Text>
        </View>

        {view === "options" ? (
          <View style={{ gap: spacing.md }}>
            {PROVIDERS.filter((p) => providersOn[p.id]).map((p) => (
              <PressableScale key={p.id} onPress={() => startSocial(p.id)} accessibilityLabel={t("auth.continue_with", { provider: p.label })}
                style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg }}>
                <View style={{ width: 24, alignItems: "center" }}>
                  {socialBusy === p.id ? <ActivityIndicator color={colors.textMuted} /> : providerIcon(p.id, colors)}
                </View>
                <Text variant="h3" color={colors.text} style={{ flex: 1 }}>{t("auth.continue_with", { provider: p.label })}</Text>
              </PressableScale>
            ))}

            {/* E-posta — form doğrudan açık değil; basınca açılır */}
            <PressableScale onPress={() => { setView("email"); setError(null); }}
              style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg }}>
              <View style={{ width: 24, alignItems: "center" }}><MailIcon color={colors.text} size={22} /></View>
              <Text variant="h3" color={colors.text} style={{ flex: 1 }}>{t("auth.continue_with_email")}</Text>
            </PressableScale>

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.dangerText}>{error}</Text>
              </View>
            )}
          </View>
        ) : view === "forgot" ? (
          <View style={{ gap: spacing.md }}>
            {resetSent ? (
              <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg, gap: 6 }}>
                <Text variant="bodyStrong" color={colors.successText}>{t("auth.link_sent")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("auth.we_sent_reset_link_to_if_that", { email: email.trim() || t("auth.your_email_address") })}</Text>
              </View>
            ) : (
              <>
                <TextInput returnKeyType="go" onSubmitEditing={() => { if (!resetBusy) void doReset(); }} value={email} onChangeText={setEmail} placeholder={t("auth.email")} placeholderTextColor={colors.textFaint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" textContentType="emailAddress" style={input} />
                {error && (<View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}><Text variant="caption" color={colors.dangerText}>{error}</Text></View>)}
                {captchaOn && (
                  <>
                    <Turnstile resetSignal={captchaNonce} onToken={setCaptchaToken} />
                    {!captchaToken && (
                      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }} accessibilityLiveRegion="polite">
                        {t("auth.captcha_wait")}
                      </Text>
                    )}
                  </>
                )}
                <PressableScale onPress={doReset} disabled={captchaBlocked} accessibilityLabel={t("auth.send_reset_link")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.sm, opacity: captchaBlocked ? 0.6 : 1 }, softShadow(colors.primary, 10)]}>
                  <Text variant="h3" color={colors.onPrimary}>{resetBusy ? "..." : t("auth.send_reset_link")}</Text>
                </PressableScale>
              </>
            )}
            <PressableScale onPress={() => { setView("email"); setResetSent(false); setError(null); }} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("auth.back_to_sign_in")}</Text>
            </PressableScale>
          </View>
        ) : view === "twofactor" ? (
          <View style={{ gap: spacing.md }}>
            <TextInput
              value={code}
              onChangeText={setCode}
              autoFocus
              /*
                `keyboardType="number-pad"` + `textContentType="oneTimeCode"`:
                sayı tuş takımı açılıyor ve iOS gelen postadaki kodu kendisi
                öneriyor (Android'de karşılığı `autoComplete="sms-otp"`, ama
                kod e-postayla geldiği için orada öneri çıkmaz).
              */
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              maxLength={TWO_FACTOR_CODE_DIGITS}
              returnKeyType="go"
              onSubmitEditing={() => { void doVerifyCode(); }}
              placeholder={t("twofa.code")}
              placeholderTextColor={colors.textFaint}
              style={[input, { textAlign: "center", fontSize: 26, letterSpacing: 10 }]}
            />

            <PressableScale
              onPress={() => setTrustDevice(!trustDevice)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: trustDevice }}
              accessibilityLabel={t("twofa.trust")}
              style={{ flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, paddingVertical: spacing.xs }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: trustDevice ? colors.primary : colors.border, backgroundColor: trustDevice ? colors.primary : "transparent", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                {trustDevice && <Text variant="caption" color={colors.onPrimary}>✓</Text>}
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="bodyStrong">{t("twofa.trust")}</Text>
                <Text variant="caption" color={colors.textMuted}>{t("twofa.trust_note")}</Text>
              </View>
            </PressableScale>

            {resendSent && (
              <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.successText} accessibilityLiveRegion="polite">{t("twofa.resent")}</Text>
              </View>
            )}
            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.dangerText}>{error}</Text>
              </View>
            )}

            <PressableScale
              onPress={doVerifyCode}
              accessibilityLabel={t("twofa.verify")}
              style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}
            >
              <Text variant="h3" color={colors.onPrimary}>{codeBusy ? "..." : t("twofa.verify")}</Text>
            </PressableScale>

            <PressableScale
              onPress={resendCode}
              disabled={codeBusy || cooldown > 0}
              accessibilityLabel={t("twofa.resend")}
              accessibilityState={{ disabled: codeBusy || cooldown > 0 }}
              style={{ alignItems: "center", paddingVertical: spacing.md, opacity: codeBusy || cooldown > 0 ? 0.6 : 1 }}
            >
              <Text variant="bodyStrong" color={colors.primaryText}>
                {cooldown > 0 ? t("verify.resend_in", { n: cooldown }) : t("twofa.resend")}
              </Text>
            </PressableScale>
          </View>
        ) : view === "verify" ? (
          <View style={{ gap: spacing.md }}>
            {/* E-posta gelmediğinde kullanıcının tek başına deneyebileceği üç şey.
                Web'deki ipucu kutusunun eşi (components/verify-email-notice). */}
            <View style={{ backgroundColor: colors.surface2, borderRadius: radii.lg, padding: spacing.lg, gap: 6 }}>
              <Text variant="bodyStrong">{t("verify.tips_title")}</Text>
              <Text variant="caption" color={colors.textMuted}>· {t("verify.tip_spam")}</Text>
              <Text variant="caption" color={colors.textMuted}>· {t("verify.tip_contacts")}</Text>
              <Text variant="caption" color={colors.textMuted}>· {t("verify.tip_wrong_address")}</Text>
            </View>

            {resendSent && (
              <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.successText} accessibilityLiveRegion="polite">{t("verify.resent")}</Text>
              </View>
            )}
            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.dangerText}>{error}</Text>
              </View>
            )}

            <PressableScale
              onPress={doResend}
              disabled={resendBusy || cooldown > 0}
              accessibilityLabel={t("verify.resend")}
              accessibilityState={{ disabled: resendBusy || cooldown > 0 }}
              style={{ borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, alignItems: "center", opacity: resendBusy || cooldown > 0 ? 0.6 : 1 }}
            >
              <Text variant="h3" color={colors.text}>
                {resendBusy ? "..." : cooldown > 0 ? t("verify.resend_in", { n: cooldown }) : t("verify.resend")}
              </Text>
            </PressableScale>

            {/* Doğrulama tarayıcıda bitiyor (uygulamanın derin bağlantısı henüz
                yok); kullanıcı dönüp kendi parolasıyla giriyor. Kip bilerek
                "signin"e çekiliyor — bu ekrana kayıt kipinden gelinmiş olabilir
                ve parola alanı da temizleniyor. */}
            <PressableScale
              onPress={() => { setMode("signin"); setPassword(""); setView("email"); setError(null); }}
              accessibilityLabel={t("verify.verified_sign_in")}
              style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center" }, softShadow(colors.primary, 10)]}
            >
              <Text variant="h3" color={colors.onPrimary}>{t("verify.verified_sign_in")}</Text>
            </PressableScale>
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            {/* ŞİFRE YÖNETİCİSİ DOLDURABİLİYOR. Alanlar hiçbir otomatik
                doldurma ipucu taşımıyordu: Android'de kayıtlı parolası olan
                kullanıcıya öneri HİÇ çıkmıyor ve giriş elle yazılıyordu. Web
                aynı formda on üç alanda ipucu veriyor (`autoComplete`);
                buradaki karşılığı `autoComplete` (Android) + `textContentType`
                (iOS). Parola ipucu KİPE bağlı: kayıtta yeni parola, girişte
                mevcut parola — yanlışını vermek yöneticiye yanlış kayıt
                önerir. */}
            {mode === "signup" && (
              <TextInput value={name} onChangeText={setName} placeholder={t("auth.your_name_optional")} placeholderTextColor={colors.textFaint} autoCapitalize="words" maxLength={PROFILE_LIMITS.displayNameMax} autoComplete="name" textContentType="name" style={input} />
            )}
            <TextInput value={email} onChangeText={setEmail} placeholder={t("auth.email")} placeholderTextColor={colors.textFaint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" textContentType="emailAddress" style={input} />
            <TextInput returnKeyType="go" onSubmitEditing={() => { if (!busy) void submit(); }} value={password} onChangeText={setPassword} placeholder={t("auth.password_min_hint")} placeholderTextColor={colors.textFaint} secureTextEntry autoComplete={mode === "signup" ? "new-password" : "current-password"} textContentType={mode === "signup" ? "newPassword" : "password"} style={input} />
            {/* Canlı geri bildirim YALNIZ kayıtta: girişte var olan bir parolayı
                yargılamak anlamsız ve "parolan zayıf" demek orada yanlış mesaj.
                Aynı ayrım webde de var. `accessibilityLiveRegion` ekran
                okuyucunun değişimi duyurmasını sağlıyor. */}
            {mode === "signup" && password.length > 0 && (
              <Text
                variant="caption"
                color={passwordProblem ? colors.dangerText : colors.successText}
                accessibilityLiveRegion="polite"
                style={{ marginTop: -spacing.xs }}
              >
                {passwordProblem
                  ? t(
                      passwordProblem === "too_short"
                        ? "autherror.password_min_length"
                        : passwordProblem === "too_common"
                          ? "autherror.password_too_common"
                          : "autherror.password_contains_identity",
                    )
                  : t("auth.password_ok")}
              </Text>
            )}

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.dangerText}>{error}</Text>
              </View>
            )}

            {captchaOn && (
              <>
                <Turnstile resetSignal={captchaNonce} onToken={setCaptchaToken} />
                {!captchaToken && (
                  <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }} accessibilityLiveRegion="polite">
                    {t("auth.captcha_wait")}
                  </Text>
                )}
              </>
            )}
            <PressableScale onPress={submit} disabled={captchaBlocked} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.sm, opacity: captchaBlocked ? 0.6 : 1 }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color={colors.onPrimary}>{busy ? "..." : mode === "signin" ? t("auth.sign_in") : t("auth.create_account")}</Text>
            </PressableScale>

            {mode === "signin" && (
              <PressableScale onPress={() => { setView("forgot"); setError(null); setResetSent(false); }} style={{ alignItems: "center", paddingVertical: spacing.xs }}>
                <Text variant="caption" color={colors.textMuted}>{t("auth.forgot_your_password")}</Text>
              </PressableScale>
            )}

            <PressableScale onPress={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="body" color={colors.textMuted}>
                {mode === "signin" ? t("auth.no_account_yet") : t("auth.already_have_account")}
                <Text variant="bodyStrong" color={colors.primaryText}>{mode === "signin" ? t("auth.sign_up") : t("auth.sign_in")}</Text>
              </Text>
            </PressableScale>
          </View>
        )}
      </ScrollView>

      {/* Hukuki kabul: Play, politikanın uygulama içinden erişilebilir olmasını ister.
          Bağlantılar satır içi <Text onPress> idi: 18 dp yüksekliğinde dokunma hedefi
          (ölçüldü) ve Text hitSlop almıyor. Ayrı düğmelere çıkarıldı — hem 48 dp
          tabanını tutuyor hem cümle Türkçe eke bağlı kalmadan çevrilebiliyor. */}
      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.xs, gap: 2 }}>
        <Text variant="micro" color={colors.textFaint} style={{ textAlign: "center", lineHeight: 18 }}>
          {t("auth.legal_notice")}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <PressableScale onPress={() => openLegal("terms")} accessibilityRole="link" accessibilityLabel={t("auth.terms_of_use")}
            style={{ minHeight: 48, justifyContent: "center", paddingHorizontal: spacing.md }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.terms_of_use")}</Text>
          </PressableScale>
          <Text variant="caption" color={colors.textFaint}>·</Text>
          <PressableScale onPress={() => openLegal("privacy")} accessibilityRole="link" accessibilityLabel={t("auth.privacy_policy")}
            style={{ minHeight: 48, justifyContent: "center", paddingHorizontal: spacing.md }}>
            <Text variant="caption" color={colors.textMuted} style={{ textDecorationLine: "underline" }}>{t("auth.privacy_policy")}</Text>
          </PressableScale>
        </View>
      </View>
    </View>
  );
}
