import React, { useState } from "react";
import { View, TextInput, ScrollView, Modal, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { WebView, type WebViewNavigation } from "react-native-webview";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, BoltIcon, GoogleIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { signInSocial } from "../lib/auth";
import { translateAuthError } from "../lib/authErrors";
import { useTheme, spacing, radii, softShadow } from "../theme";

type Mode = "signin" | "signup";

/** OAuth bitişinde gidilen adres — WebView buraya ulaşınca akış tamamdır. */
const SOCIAL_CALLBACK = "https://www.exfe.me/learn";

/**
 * Giriş / kayıt (web'deki auth-form'un mobil karşılığı). E-posta/parola + sosyal
 * (Google) giriş. Sosyal akış WebView'de yürür: Android'de WebView ile fetch aynı
 * çerez kavanozunu paylaştığı için OAuth bitince oturum çerezi uygulamaya da geçer.
 */
export function AuthScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<{ goBack: () => void }>();
  const { signIn, signUp, socialComplete } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socialUrl, setSocialUrl] = useState<string | null>(null);
  const [socialBusy, setSocialBusy] = useState(false);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const r = mode === "signin" ? await signIn(email.trim(), password) : await signUp(name, email.trim(), password);
    setBusy(false);
    if (r.ok) { nav.goBack(); return; }
    setError(translateAuthError(r.code, r.message));
  }

  async function startSocial(provider: string) {
    if (socialBusy) return;
    setSocialBusy(true);
    setError(null);
    const url = await signInSocial(provider, SOCIAL_CALLBACK);
    setSocialBusy(false);
    if (url) setSocialUrl(url);
    else setError("Sosyal giriş şu an kullanılamıyor. E-posta ile deneyebilirsin.");
  }

  async function onWebNav(navState: WebViewNavigation) {
    if (!socialUrl || !navState.url.startsWith(SOCIAL_CALLBACK)) return;
    setSocialUrl(null);
    const ok = await socialComplete();
    if (ok) nav.goBack();
    else setError("Giriş tamamlanamadı. Tekrar dener misin?");
  }

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 14, color: colors.text, fontSize: 16,
  } as const;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ alignItems: "flex-end", paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }}>
        <PressableScale onPress={() => nav.goBack()} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <BoltIcon color="#fff" size={38} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>{mode === "signin" ? "Tekrar hoş geldin" : "Hesap oluştur"}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>
            {mode === "signin" ? "Serini kaldığın yerden sürdür." : "Birkaç saniye sürer, ilerlemen kaydedilir."}
          </Text>
        </View>

        {/* Sosyal giriş */}
        <PressableScale onPress={() => startSocial("google")} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15 }}>
          {socialBusy ? <ActivityIndicator color={colors.textMuted} /> : <GoogleIcon size={22} />}
          <Text variant="h3" color={colors.text}>Google ile devam et</Text>
        </PressableScale>

        {/* ayırıcı */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginVertical: spacing.lg }}>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline }} />
          <Text variant="caption" color={colors.textMuted}>ya da e-posta ile</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline }} />
        </View>

        <View style={{ gap: spacing.md }}>
          {mode === "signup" && (
            <TextInput value={name} onChangeText={setName} placeholder="Adın (isteğe bağlı)" placeholderTextColor={colors.textFaint} autoCapitalize="words" style={input} />
          )}
          <TextInput value={email} onChangeText={setEmail} placeholder="E-posta" placeholderTextColor={colors.textFaint} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} style={input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Parola (en az 8 karakter)" placeholderTextColor={colors.textFaint} secureTextEntry style={input} />

          {error && (
            <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
              <Text variant="caption" color={colors.danger}>{error}</Text>
            </View>
          )}

          <PressableScale onPress={submit} style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 16, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color="#fff">{busy ? "..." : mode === "signin" ? "Giriş yap" : "Hesap oluştur"}</Text>
          </PressableScale>

          <PressableScale onPress={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); }} style={{ alignItems: "center", paddingVertical: spacing.md }}>
            <Text variant="body" color={colors.textMuted}>
              {mode === "signin" ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
              <Text variant="bodyStrong" color={colors.primary}>{mode === "signin" ? "Kayıt ol" : "Giriş yap"}</Text>
            </Text>
          </PressableScale>
        </View>
      </ScrollView>

      {/* Sosyal giriş WebView'i */}
      <Modal visible={!!socialUrl} animationType="slide" onRequestClose={() => setSocialUrl(null)}>
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
            <PressableScale onPress={() => setSocialUrl(null)} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
              <XIcon color={colors.text} size={22} />
            </PressableScale>
            <Text variant="h3">Google ile giriş</Text>
          </View>
          {socialUrl ? (
            <WebView
              source={{ uri: socialUrl }}
              onNavigationStateChange={onWebNav}
              javaScriptEnabled
              domStorageEnabled
              thirdPartyCookiesEnabled
              sharedCookiesEnabled
              startInLoadingState
              renderLoading={() => (
                <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, alignItems: "center", justifyContent: "center" }}>
                  <ActivityIndicator color={colors.primary} size="large" />
                </View>
              )}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
