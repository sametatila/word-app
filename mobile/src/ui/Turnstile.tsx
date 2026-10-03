import React, { useEffect, useRef, useState } from "react";
import { Linking, View } from "react-native";
import { WebView } from "react-native-webview";
import { useApiBase } from "../api/useApiBase";
import { t } from "../lib/i18n";
import { useTheme, spacing } from "../theme";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";

/**
 * Cloudflare Turnstile — mobil.
 *
 * Sunucu kayıt, giriş ve sıfırlama uçlarında `x-captcha-response` başlığını
 * ŞART koşuyor (bkz. web'de lib/auth/captcha.ts). Turnstile bir tarayıcı
 * bileşeni olduğu için jetonu üreten tek yol bir WebView.
 *
 * WIDGET KENDİ ALAN ADIMIZDAN GELİYOR (`/api/turnstile`), gömülü HTML'den
 * değil: Turnstile jetonu hangi kökende üretildiğini de imzalıyor ve gömülü
 * HTML'in kökeni `about:blank` olurdu — Cloudflare panelindeki alan adı
 * listesine takılırdı. Sayfanın kaynağı orada, gerekçesiyle birlikte.
 *
 * GÖRÜNÜR duruyor. Turnstile çoğu ziyaretçide hiçbir şey sormuyor ama gerektiğinde
 * bir soru sorabiliyor; sıfır yükseklikte bir WebView'de o soru çizilecek yer
 * bulamaz ve kullanıcı sebebini göremeden giriş yapamaz hâle gelirdi.
 *
 * ALTINDAKİ SATIR DURUMU SÖYLÜYOR (IOS-8). iPad simülatöründe widget kendiliğinden
 * geçmedi, "Gerçek kişi olduğunuzu doğrulayın" kutusunu gösterdi; altında ise
 * "doğrulama sürüyor" yazıyordu, yani kullanıcıya (ve App Store inceleyicisine)
 * beklemesi söyleniyordu. Artık: kutu çıkınca "kutuyu işaretle"; hata gelirse,
 * sayfa yüklenemezse ya da {@link STUCK_MS} içinde jeton gelmezse "tamamlanamadı"
 * ve widget'ı baştan yükleyen bir "Yeniden dene". Sunucu tarafı değişmedi:
 * jetonsuz istek yine reddediliyor, bu yalnız istemcinin kilitli kalmaması.
 */

/**
 * Jetonsuz bu kadar beklenince "Yeniden dene" çıkıyor. Kendiliğinden geçen
 * doğrulama ölçümde gerçek Chrome'da ~1,3 sn, XCUITest altındaki iPhone
 * simülatöründe ~6 sn sürdü; 15 sn olağan gecikmeyi kesmeyecek kadar uzun.
 * Kutu gösterilirken sayılmıyor: orada beklenen kullanıcının dokunuşu.
 */
const STUCK_MS = 15_000;

type Phase = "loading" | "interactive" | "ok" | "stuck";

/** Köprüde kullandığımız tek yöntem — WebView tipinin jeneriğine takılmamak için yapısal. */
type Injectable = { injectJavaScript: (script: string) => void };

type Message =
  | { type: "token"; token: string }
  | { type: "expired" }
  | { type: "error" }
  | { type: "interactive" }
  | { type: "interactive-done" };

export function Turnstile({
  resetSignal,
  onToken,
}: {
  /** Her artışta widget sıfırlanır: jeton tek kullanımlık. */
  resetSignal: number;
  onToken: (token: string | null) => void;
}) {
  const { isDark, colors } = useTheme();
  /* Taban yedeğe geçerse (engelli ağ, bkz. api/base) widget yeni adresten açılsın;
     Turnstile jetonu sayfanın alan adına bağlı ve iki alan adı da panelde kayıtlı. */
  const base = useApiBase();
  const view = useRef<Injectable | null>(null);
  const cb = useRef(onToken);
  cb.current = onToken;
  const [phase, setPhase] = useState<Phase>("loading");
  /** Artınca WebView baştan kuruluyor: yüklenemeyen sayfayı reset() kurtaramaz. */
  const [mount, setMount] = useState(0);

  useEffect(() => {
    if (resetSignal === 0) return; // ilk çizimde widget zaten taze
    cb.current(null);
    setPhase("loading");
    try { view.current?.injectJavaScript("window.lernomiReset && window.lernomiReset(); true;"); } catch { /* yut */ }
  }, [resetSignal]);

  // Jeton gelmeden süre dolarsa kullanıcıya çıkış yolu göster.
  useEffect(() => {
    if (phase !== "loading") return;
    const id = setTimeout(() => setPhase("stuck"), STUCK_MS);
    return () => clearTimeout(id);
  }, [phase, mount, resetSignal]);

  function retry() {
    cb.current(null);
    setPhase("loading");
    setMount((n) => n + 1);
  }

  function fail() {
    cb.current(null);
    setPhase("stuck");
  }

  return (
    <>
    <View style={{ height: 74, overflow: "hidden" }}>
      <WebView
        key={`${mount}:${base}`}
        ref={(r) => { view.current = r; }}
        source={{ uri: `${base}/api/turnstile?theme=${isDark ? "dark" : "light"}` }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        // Turnstile sınamayı `about:srcdoc` çerçevesinde koşuyor. Kütüphane
        // listeye kendiliğinden yalnız `about:blank` ekliyor; listede olmayan
        // adresi engelleyip Linking ile dışarıda açmaya çalışıyor. iOS'ta widget
        // bu yüzden "Doğrulanıyor"da sonsuza kadar dönüyordu (TestFlight build 2).
        // Cloudflare'in mobil belgesi de about:blank + about:srcdoc istiyor.
        originWhitelist={["https://*", "about:*"]}
        // Alt çerçeveler (Cloudflare'in kendi iframe'leri) serbest. Ana çerçeve
        // yalnız widget sayfasında kalabilir; "Gizlilik/Yardım" gibi bağlantılar
        // 74 pt'lik kutunun içinde değil tarayıcıda açılsın.
        onShouldStartLoadWithRequest={(req) => {
          if (req.isTopFrame === false || req.url.startsWith("about:")) return true;
          if (req.url.startsWith(`${base}/api/turnstile`)) return true;
          Linking.openURL(req.url).catch(() => {});
          return false;
        }}
        // Sayfa saydam; uygulamanın kendi zemini görünsün.
        style={{ backgroundColor: "transparent" }}
        // Android'de varsayılan beyaz zemin saydamlığı eziyor.
        androidLayerType="software"
        onMessage={(e) => {
          let m: Message;
          try { m = JSON.parse(e.nativeEvent.data) as Message; } catch { return; }
          if (m.type === "token") { cb.current(m.token); setPhase("ok"); }
          else if (m.type === "expired") { cb.current(null); setPhase("loading"); } // widget kendisi yeniliyor
          else if (m.type === "error") fail();
          else if (m.type === "interactive") setPhase("interactive");
          else if (m.type === "interactive-done") setPhase((p) => (p === "interactive" ? "loading" : p));
        }}
        onError={fail}
        onHttpError={fail}
      />
    </View>
    {phase === "loading" && (
      <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }} accessibilityLiveRegion="polite">
        {t("auth.captcha_wait")}
      </Text>
    )}
    {phase === "interactive" && (
      <Text variant="caption" color={colors.text} style={{ textAlign: "center" }} accessibilityLiveRegion="polite">
        {t("auth.captcha_tap")}
      </Text>
    )}
    {phase === "stuck" && (
      <View style={{ alignItems: "center", gap: spacing.xs }}>
        <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center" }} accessibilityLiveRegion="polite">
          {t("auth.captcha_stuck")}
        </Text>
        <PressableScale onPress={retry} accessibilityRole="button" accessibilityLabel={t("auth.captcha_retry")} hitSlop={8} style={{ paddingVertical: spacing.xs, paddingHorizontal: spacing.md }}>
          <Text variant="bodyStrong" color={colors.primaryText}>{t("auth.captcha_retry")}</Text>
        </PressableScale>
      </View>
    )}
    </>
  );
}
