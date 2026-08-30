import React, { useState } from "react";
import { View, TextInput, ScrollView, Modal, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { WebView, type WebViewNavigation } from "react-native-webview";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, ChevronLeftIcon, BoltIcon, GoogleIcon, AppleIcon, FacebookIcon, MailIcon } from "../ui/icons";
import { useAuth } from "../lib/AuthContext";
import { signInSocial } from "../lib/auth";
import { notifPrimeNeeded } from "../lib/notifications";
import { translateAuthError } from "../lib/authErrors";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";

type Mode = "signin" | "signup";
type View2 = "options" | "email";

/** OAuth bitişinde gidilen adres — WebView buraya ulaşınca akış tamamdır. */
const SOCIAL_CALLBACK = "https://www.exfe.me/learn";

/**
 * Giriş / kayıt. Önce sağlayıcı listesi (Google / Apple / Facebook / E-posta);
 * e-posta formu DOĞRUDAN açık değil, "E-posta ile devam et"e basınca gelir.
 * Sosyal akış WebView'de yürür (Android'de WebView ↔ fetch aynı çerez kavanozu).
 *
 * `enabled:false` sağlayıcılar Neon Console'da henüz etkin değil ("yakında");
 * konsolda açılınca tek satırla (enabled:true) aktifleşir — aynı akış çalışır.
 */
const PROVIDERS = [
  { id: "google", label: "Google", enabled: true },
  { id: "apple", label: "Apple", enabled: false },
  { id: "facebook", label: "Facebook", enabled: false },
] as const;

function providerIcon(id: string, colors: Palette) {
  if (id === "google") return <GoogleIcon size={22} />;
  if (id === "apple") return <AppleIcon color={colors.text} size={22} />;
  if (id === "facebook") return <FacebookIcon size={22} />;
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
  const [socialUrl, setSocialUrl] = useState<string | null>(null);
  const [socialBusy, setSocialBusy] = useState<string | null>(null);

  async function submit() {
    if (busy) return;
    setBusy(true);
    setError(null);
    const r = mode === "signin" ? await signIn(email.trim(), password) : await signUp(name, email.trim(), password);
    setBusy(false);
    if (r.ok) { void toApp(); return; }
    setError(translateAuthError(r.code, r.message));
  }

  async function startSocial(provider: string) {
    if (socialBusy) return;
    setSocialBusy(provider);
    setError(null);
    const url = await signInSocial(provider, SOCIAL_CALLBACK);
    setSocialBusy(null);
    if (url) setSocialUrl(url);
    else setError("Bu sağlayıcı şu an kullanılamıyor. Google ya da e-posta ile girebilirsin.");
  }

  async function onWebNav(navState: WebViewNavigation) {
    if (!socialUrl || !navState.url.startsWith(SOCIAL_CALLBACK)) return;
    setSocialUrl(null);
    const ok = await socialComplete();
    if (ok) void toApp();
    else setError("Giriş tamamlanamadı. Tekrar dener misin?");
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
          <PressableScale onPress={() => { setView("options"); setError(null); }} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
            <ChevronLeftIcon color={colors.text} size={24} />
          </PressableScale>
        )}
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.xl }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <BoltIcon color="#fff" size={38} />
          </View>
          <Text variant="display" style={{ marginTop: spacing.md }}>
            {view === "options" ? "Giriş yap" : mode === "signin" ? "Tekrar hoş geldin" : "Hesap oluştur"}
          </Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: 4, textAlign: "center" }}>
            {view === "options" ? "İlerlemen kaydolur, cihazlar arası devam eder." : mode === "signin" ? "Serini kaldığın yerden sürdür." : "Birkaç saniye sürer, ilerlemen kaydedilir."}
          </Text>
        </View>

        {view === "options" ? (
          <View style={{ gap: spacing.md }}>
            {PROVIDERS.map((p) => (
              <PressableScale key={p.id} onPress={p.enabled ? () => startSocial(p.id) : undefined}
                style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg, opacity: p.enabled ? 1 : 0.55 }}>
                <View style={{ width: 24, alignItems: "center" }}>
                  {socialBusy === p.id ? <ActivityIndicator color={colors.textMuted} /> : providerIcon(p.id, colors)}
                </View>
                <Text variant="h3" color={colors.text} style={{ flex: 1 }}>{p.label} ile devam et</Text>
                {!p.enabled && (
                  <View style={{ backgroundColor: colors.surface2, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 }}>
                    <Text variant="micro" color={colors.textMuted}>yakında</Text>
                  </View>
                )}
              </PressableScale>
            ))}

            {/* E-posta — form doğrudan açık değil; basınca açılır */}
            <PressableScale onPress={() => { setView("email"); setError(null); }}
              style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border, backgroundColor: colors.surface, paddingVertical: 15, paddingHorizontal: spacing.lg }}>
              <View style={{ width: 24, alignItems: "center" }}><MailIcon color={colors.text} size={22} /></View>
              <Text variant="h3" color={colors.text} style={{ flex: 1 }}>E-posta ile devam et</Text>
            </PressableScale>

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.danger}>{error}</Text>
              </View>
            )}
          </View>
        ) : (
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
        )}
      </ScrollView>

      {/* Sosyal giriş WebView'i */}
      <Modal visible={!!socialUrl} animationType="slide" onRequestClose={() => setSocialUrl(null)}>
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm }}>
            <PressableScale onPress={() => setSocialUrl(null)} style={{ width: 40, height: 40, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
              <XIcon color={colors.text} size={22} />
            </PressableScale>
            <Text variant="h3">Sosyal giriş</Text>
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
