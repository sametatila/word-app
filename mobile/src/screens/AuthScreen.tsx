import React, { useState } from "react";
import { t } from "../lib/i18n";
import { View, TextInput, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { ArrowBackIcon, BoltIcon, GoogleIcon, MailIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { requestPasswordReset } from "../lib/auth";
import { openLegal } from "../lib/legal";
import { googleSignIn } from "../lib/googleAuth";
import { notifPrimeNeeded } from "../lib/notifications";
import { translateAuthError } from "../lib/authErrors";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

type Mode = "signin" | "signup";
type View2 = "options" | "email" | "forgot";

/**
 * Giriş / kayıt. Önce sağlayıcı listesi (Google / E-posta); e-posta formu "E-posta ile
 * devam et"e basınca gelir. Google NATIVE akışta (cihaz hesap seçici → idToken → better-auth).
 * Apple/Facebook: sunucuda açılmadığı için listede YOK — çalışmayan "yakında" düğmesi
 * Play "bozuk işlevsellik" sayılır; sağlayıcı eklenince buraya geri gelir.
 */
const PROVIDERS = [{ id: "google", label: "Google" }] as const;

function providerIcon(id: string, colors: Palette) {
  if (id === "google") return <GoogleIcon size={22} />;
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
  const [view, setView] = useState<View2>("options");
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socialBusy, setSocialBusy] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetBusy, setResetBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const r = mode === "signin" ? await signIn(email.trim(), password) : await signUp(name, email.trim(), password);
    setBusy(false);
    if (r.ok) { void toApp(); return; }
    setError(translateAuthError(r.code, r.message));
  }

  async function doReset() {
    if (resetBusy || !email.trim()) return;
    setResetBusy(true);
    setError(null);
    await requestPasswordReset(email.trim());
    setResetBusy(false);
    setResetSent(true); // güvenlik: e-posta kayıtlı olmasa da aynı onay
  }

  async function startSocial(provider: string) {
    if (socialBusy || provider !== "google") return;
    setSocialBusy(provider);
    setError(null);
    // NATIVE Google: cihaz hesap seçici → idToken → better-auth. WebView yok
    // (Google embedded WebView OAuth'u engelliyor + cihaz hesaplarını göstermiyordu).
    const r = await googleSignIn();
    if (r.ok) {
      const done = await socialComplete(); // oturumu tazele + onboarding prefs
      setSocialBusy(null);
      if (done) void toApp();
      else setError("Giriş tamamlanamadı. Tekrar dener misin?");
    } else {
      setSocialBusy(null);
      if (r.code !== "CANCELLED") setError(r.message);
    }
  }

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 14, color: colors.text, fontSize: 16,
  } as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Zorunlu giriş duvarı: seçenekler ekranında kapatma YOK (misafir modu yok).
          Yalnız e-posta formundan sağlayıcı listesine geri dönülür. */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, minHeight: 44 }}>
        {view === "email" && (
          <PressableScale hitSlop={4} onPress={() => { setView("options"); setError(null); }} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <ArrowBackIcon color={colors.text} size={24} />
          </PressableScale>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <BoltIcon color="#fff" size={38} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>
            {view === "forgot" ? "Parolanı mı unuttun?" : view === "options" ? "Giriş yap" : mode === "signin" ? "Tekrar hoş geldin" : "Hesap oluştur"}
          </Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>
            {view === "forgot" ? "E-postanı gir, sıfırlama bağlantısı gönderelim." : view === "options" ? "İlerlemen kaydolur, cihazlar arası devam eder." : mode === "signin" ? "Serini kaldığın yerden sürdür." : "Birkaç saniye sürer, ilerlemen kaydedilir."}
          </Text>
        </View>

        {view === "options" ? (
          <View style={{ gap: spacing.md }}>
            {PROVIDERS.map((p) => (
              <PressableScale key={p.id} onPress={() => startSocial(p.id)} accessibilityLabel={`${p.label} ile devam et`}
                style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg }}>
                <View style={{ width: 24, alignItems: "center" }}>
                  {socialBusy === p.id ? <ActivityIndicator color={colors.textMuted} /> : providerIcon(p.id, colors)}
                </View>
                <Text variant="h3" color={colors.text} style={{ flex: 1 }}>{p.label} ile devam et</Text>
              </PressableScale>
            ))}

            {/* E-posta — form doğrudan açık değil; basınca açılır */}
            <PressableScale onPress={() => { setView("email"); setError(null); }}
              style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg }}>
              <View style={{ width: 24, alignItems: "center" }}><MailIcon color={colors.text} size={22} /></View>
              <Text variant="h3" color={colors.text} style={{ flex: 1 }}>{t("auth.e_posta_ile_devam_et")}</Text>
            </PressableScale>

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.danger}>{error}</Text>
              </View>
            )}
          </View>
        ) : view === "forgot" ? (
          <View style={{ gap: spacing.md }}>
            {resetSent ? (
              <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg, gap: 6 }}>
                <Text variant="bodyStrong" color={colors.success}>{t("auth.baglanti_gonderildi")}</Text>
                <Text variant="caption" color={colors.textMuted}>{email.trim() || "E-postana"} adresine bir sıfırlama bağlantısı gönderdik (adres kayıtlıysa). Gelen kutunu kontrol et.</Text>
              </View>
            ) : (
              <>
                <TextInput value={email} onChangeText={setEmail} placeholder={t("auth.e_posta")} placeholderTextColor={colors.textFaint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={input} />
                {error && (<View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}><Text variant="caption" color={colors.danger}>{error}</Text></View>)}
                <PressableScale onPress={doReset} accessibilityLabel={t("auth.sifirlama_baglantisi_gonder")} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 10)]}>
                  <Text variant="h3" color="#fff">{resetBusy ? "..." : "Sıfırlama bağlantısı gönder"}</Text>
                </PressableScale>
              </>
            )}
            <PressableScale onPress={() => { setView("email"); setResetSent(false); setError(null); }} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" color={colors.primary}>{t("auth.girise_don")}</Text>
            </PressableScale>
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            {mode === "signup" && (
              <TextInput value={name} onChangeText={setName} placeholder="Adın (isteğe bağlı)" placeholderTextColor={colors.textFaint} autoCapitalize="words" style={input} />
            )}
            <TextInput value={email} onChangeText={setEmail} placeholder={t("auth.e_posta")} placeholderTextColor={colors.textFaint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={input} />
            <TextInput value={password} onChangeText={setPassword} placeholder="Parola (en az 8 karakter)" placeholderTextColor={colors.textFaint} secureTextEntry style={input} />

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.danger}>{error}</Text>
              </View>
            )}

            <PressableScale onPress={submit} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color="#fff">{busy ? "..." : mode === "signin" ? "Giriş yap" : "Hesap oluştur"}</Text>
            </PressableScale>

            {mode === "signin" && (
              <PressableScale onPress={() => { setView("forgot"); setError(null); setResetSent(false); }} style={{ alignItems: "center", paddingVertical: spacing.xs }}>
                <Text variant="caption" color={colors.textMuted}>{t("auth.parolani_mi_unuttun")}</Text>
              </PressableScale>
            )}

            <PressableScale onPress={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="body" color={colors.textMuted}>
                {mode === "signin" ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
                <Text variant="bodyStrong" color={colors.primary}>{mode === "signin" ? "Kayıt ol" : "Giriş yap"}</Text>
              </Text>
            </PressableScale>
          </View>
        )}
      </ScrollView>

      {/* Hukuki kabul: Play, politikanın uygulama içinden erişilebilir olmasını ister. */}
      <View style={{ paddingHorizontal: spacing.xl, paddingBottom: insets.bottom + spacing.md }}>
        <Text variant="micro" color={colors.textFaint} style={{ textAlign: "center", lineHeight: 18 }}>
          Devam ederek{" "}
          <Text variant="micro" color={colors.textMuted} style={{ textDecorationLine: "underline" }} onPress={() => openLegal("terms")}>{t("auth.kullanim_sartlari")}</Text>
          {"'nı ve "}
          <Text variant="micro" color={colors.textMuted} style={{ textDecorationLine: "underline" }} onPress={() => openLegal("privacy")}>{t("auth.gizlilik_politikasi")}</Text>
          {"'nı kabul etmiş olursun."}
        </Text>
      </View>
    </View>
  );
}
