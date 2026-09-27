import React, { useRef, useState } from "react";
import { View, TextInput } from "react-native";
import { KeyboardAwareScroll } from "../ui/KeyboardAwareScroll";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParams } from "../navigation/RootStack";
import { t } from "../lib/i18n";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { PrimaryButton } from "../ui/PrimaryButton";
import { FlowTopBar, FlowActions, FlowNote, StateBody } from "../ui/flow";
import { BoltIcon } from "../ui/icons";
import { resetPassword } from "../lib/auth";
import { translateAuthError } from "../lib/authErrors";
import { checkPassword, MIN_PASSWORD_LENGTH } from "../lib/passwordPolicy";
import { useTheme, spacing, radii, softShadow, ds } from "../theme";

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

  const tile = (
    <View style={[{ width: ds(72), height: ds(72), borderRadius: radii.xl, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 12)]}>
      <BoltIcon color={colors.onPrimary} size={38} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm }}>
      {/* Kapat, "Girişe dön" ile aynı yere: öteki akış ekranları gibi üstte bir çıkış. */}
      <View style={{ paddingHorizontal: spacing.lg }}>
        <FlowTopBar onClose={toAuth} />
      </View>
      <KeyboardAwareScroll automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: insets.bottom + spacing.xxl }}
        keyboardShouldPersistTaps="handled"
      >
        {!token ? (
          <View style={{ gap: spacing.md }}>
            <StateBody icon={tile} title={t("resetpw.title")} body={t("resetpw.invalid")} alert />
            <FlowActions primary={{ label: t("auth.back_to_sign_in"), onPress: toAuth }} />
          </View>
        ) : done ? (
          <View style={{ gap: spacing.md }}>
            <StateBody icon={tile} title={t("resetpw.title")} body={t("resetpw.done")} />
            <FlowActions primary={{ label: t("auth.sign_in"), onPress: toAuth }} />
          </View>
        ) : (
          <View style={{ gap: spacing.md }}>
            <View style={{ alignItems: "center", marginBottom: spacing.md }}>
              {tile}
              <Text accessibilityRole="header" variant="display" style={{ marginTop: spacing.md }}>{t("resetpw.title")}</Text>
            </View>
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
              onSubmitEditing={() => { if (!busy && !problem) void kaydet(); }}
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

            {error ? (
              <View accessibilityLiveRegion="polite">
                <FlowNote tone="bad" text={error} />
              </View>
            ) : null}

            <PrimaryButton label={t("resetpw.save")} onPress={() => void kaydet()} busy={busy} disabled={!!problem} style={{ marginTop: spacing.sm }} />

            <PressableScale onPress={toAuth} style={{ alignItems: "center", paddingVertical: spacing.md }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("auth.back_to_sign_in")}</Text>
            </PressableScale>
          </View>
        )}
      </KeyboardAwareScroll>
    </View>
  );
}
