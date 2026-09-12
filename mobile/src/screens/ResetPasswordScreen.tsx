import React, { useRef, useState } from "react";
import { View, TextInput, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { BoltIcon } from "../ui/icons";
import { resetPassword } from "../lib/auth";
import { translateAuthError } from "../lib/authErrors";
import { checkPassword, MIN_PASSWORD_LENGTH } from "../lib/passwordPolicy";
import { useTheme, spacing, radii, softShadow } from "../theme";

/**
 * Parola sıfırlama — e-postadaki bağlantı UYGULAMADA açıldığında.
 *
 * Eskiden bu bağlantı tarayıcıya gidiyordu: kullanıcı parolayı orada
 * belirliyor, sonra uygulamaya dönüp bir de giriş yapıyordu. Derin bağlantı
 * açıldığından beri aynı işi burada bitiriyor.
 *
 * Sıfırlama BİR OTURUM AÇMIYOR: sunucu başarı hâlinde kullanıcının bütün
 * oturumlarını düşürüyor (revokeSessionsOnPasswordReset). Bu bilinçli ve
 * doğru — sıfırlamanın sebebi çoğu zaman "başkası girmiş olabilir". Bu yüzden
 * ekran sonunda girişe yönlendiriyor, uygulamaya değil.
 */
export function ResetPasswordScreen({ route }: { route: { params?: { token?: string } } }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const token = route.params?.token ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tekrarRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  // Sunucudaki kuralın kopyası; kimlik verilmiyor çünkü sıfırlama gövdesi
  // yalnız jetonu ve yeni parolayı taşıyor (web formuyla aynı karar).
  const problem = checkPassword(password);

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 14, color: colors.text, fontSize: 16,
  } as const;

  const toAuth = () => nav.reset({ index: 0, routes: [{ name: "Auth" }] });

  async function kaydet() {
    if (busy) return;
    if (password !== confirm) { setError(t("auth.passwords_dont_match")); return; }
    setBusy(true);
    setError(null);
    const r = await resetPassword(token, password);
    setBusy(false);
    if (!r.ok) { setError(translateAuthError(r.code, r.message, r.status)); return; }
    setDone(true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: insets.top + spacing.xxl, paddingBottom: insets.bottom + spacing.xxl }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: "center", marginBottom: spacing.xl }}>
          <View style={[{ width: 72, height: 72, borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
            <BoltIcon color={colors.onPrimary} size={38} />
          </View>
          <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("resetpw.title")}</Text>
        </View>

        {!token ? (
          <View style={{ gap: spacing.md }}>
            <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
              <Text variant="caption" color={colors.dangerText}>{t("resetpw.invalid")}</Text>
            </View>
            <PressableScale onPress={toAuth} accessibilityRole="button" accessibilityLabel={t("auth.back_to_sign_in")}
              style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color={colors.onPrimary}>{t("auth.back_to_sign_in")}</Text>
            </PressableScale>
          </View>
        ) : done ? (
          <View style={{ gap: spacing.md }}>
            <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.lg, padding: spacing.lg }}>
              <Text variant="bodyStrong" color={colors.successText}>{t("resetpw.done")}</Text>
            </View>
            <PressableScale onPress={toAuth} accessibilityRole="button" accessibilityLabel={t("auth.sign_in")}
              style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color={colors.onPrimary}>{t("auth.sign_in")}</Text>
            </PressableScale>
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            {/* Yeni parola ipucu — bkz. `screens/AuthScreen` içindeki not. */}
            {/* Dönüş tuşu zinciri — bkz. `ui/ChangePassword`. Webde iki alan
                bir `<form>` içinde: ilkinde Enter da gönderiyor. */}
            <TextInput
              autoComplete="new-password" textContentType="newPassword"
              value={password} onChangeText={setPassword} secureTextEntry autoFocus
              returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => tekrarRef.current?.focus()}
              placeholder={t("changepw.new")}
              accessibilityLabel={t("changepw.new")} placeholderTextColor={colors.textFaint} style={input}
            />
            <TextInput
              ref={tekrarRef}
              autoComplete="new-password" textContentType="newPassword"
              value={confirm} onChangeText={setConfirm} secureTextEntry returnKeyType="go"
              onSubmitEditing={() => { if (!busy) void kaydet(); }}
              placeholder={t("changepw.again")}
              accessibilityLabel={t("changepw.again")} placeholderTextColor={colors.textFaint} style={input}
            />

            {password.length > 0 && (
              <Text variant="caption" color={problem ? colors.dangerText : colors.successText} accessibilityLiveRegion="polite">
                {problem
                  ? t(
                      problem === "too_short"
                        ? "autherror.password_min_length"
                        : problem === "too_common"
                          ? "autherror.password_too_common"
                          : "autherror.password_contains_identity",
                      { n: MIN_PASSWORD_LENGTH },
                    )
                  : t("auth.password_ok")}
              </Text>
            )}

            {error && (
              <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
                <Text variant="caption" color={colors.dangerText}>{error}</Text>
              </View>
            )}

            <PressableScale onPress={kaydet} accessibilityRole="button" accessibilityLabel={t("resetpw.save")}
              style={[{ borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }, softShadow(colors.primary, 10)]}>
              <Text variant="h3" color={colors.onPrimary}>{busy ? "…" : t("resetpw.save")}</Text>
            </PressableScale>

            <PressableScale onPress={toAuth} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("auth.back_to_sign_in")}</Text>
            </PressableScale>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
