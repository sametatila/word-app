import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { changePassword } from "../lib/auth";
import { translateAuthError } from "../lib/authErrors";
import { checkPassword, MIN_PASSWORD_LENGTH } from "../lib/passwordPolicy";
import { spacing, radii, type Palette } from "../theme";

/**
 * Ayarlarda parola değiştirme — web'deki formun eşi.
 *
 * Uç sunucuda baştan hazırdı ama iki platformda da çağıran yoktu: parolasını
 * değiştirmek isteyen kullanıcının tek yolu çıkış yapıp "parolamı unuttum"
 * akışından geçmekti.
 *
 * YALNIZ PAROLASI OLAN HESAPTA çiziliyor; kararı çağıran veriyor (bkz.
 * LinkedAccounts, `credential` satırı). Yalnız Google/Apple ile girmiş birine
 * "şu anki parolan" sormak olmayan bir şeyi istemek olurdu.
 *
 * Kapalı başlıyor: ayarlar ekranı zaten uzun ve bu, günlük kullanılan bir
 * şey değil — açılınca alanlar geliyor.
 */
export function ChangePassword({ colors }: { colors: Palette }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sunucudaki kuralın kopyası, yalnız anında geri bildirim için (kapı sunucuda).
  const problem = checkPassword(next);

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 16,
  } as const;

  function kapat() {
    setOpen(false);
    setCurrent("");
    setNext("");
    setConfirm("");
    setError(null);
  }

  async function kaydet() {
    if (busy) return;
    if (next !== confirm) { setError(t("auth.passwords_dont_match")); return; }
    setBusy(true);
    setError(null);
    const r = await changePassword(current, next);
    setBusy(false);
    if (!r.ok) { setError(translateAuthError(r.code, r.message, r.status)); return; }
    setDone(true);
    kapat();
  }

  if (!open) {
    return (
      <View style={{ gap: spacing.xs }}>
        {done ? (
          <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
            <Text variant="caption" color={colors.successText}>{t("changepw.done")}</Text>
          </View>
        ) : null}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Text variant="caption" color={colors.textMuted}>{t("changepw.sub")}</Text>
          </View>
          <PressableScale
            onPress={() => { setOpen(true); setDone(false); }}
            accessibilityRole="button"
            accessibilityLabel={t("changepw.title")}
            style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.primarySoft }}
          >
            <Text variant="caption" color={colors.primaryText}>{t("changepw.open")}</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  return (
    <View style={{ gap: spacing.sm }}>
      {/* Şifre yöneticisi ipuçları — bkz. `screens/AuthScreen` içindeki not.
          Mevcut parola `current-password`, yeni parola `new-password`: iki
          farklı ipucu, yoksa yönetici yeni parolayı eskisinin üstüne yazmayı
          önerir. */}
      <TextInput
        autoComplete="current-password" textContentType="password"
        value={current} onChangeText={setCurrent} secureTextEntry
        placeholder={t("changepw.current")} placeholderTextColor={colors.textFaint} style={input}
      />
      <TextInput
        autoComplete="new-password" textContentType="newPassword"
        value={next} onChangeText={setNext} secureTextEntry
        placeholder={t("changepw.new")} placeholderTextColor={colors.textFaint} style={input}
      />
      <TextInput
        autoComplete="new-password" textContentType="newPassword"
        value={confirm} onChangeText={setConfirm} secureTextEntry returnKeyType="go"
        onSubmitEditing={() => { if (!busy) void kaydet(); }}
        placeholder={t("changepw.again")} placeholderTextColor={colors.textFaint} style={input}
      />

      {next.length > 0 && (
        <Text
          variant="caption"
          color={problem ? colors.dangerText : colors.successText}
          accessibilityLiveRegion="polite"
        >
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
        <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.dangerText}>{error}</Text>
        </View>
      ) : null}

      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <PressableScale
          onPress={kaydet} accessibilityRole="button" accessibilityLabel={t("changepw.save")}
          style={{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 14, alignItems: "center" }}
        >
          <Text variant="bodyStrong" color={colors.onPrimary}>{busy ? t("changepw.saving") : t("changepw.save")}</Text>
        </PressableScale>
        <PressableScale
          onPress={kapat} accessibilityRole="button" accessibilityLabel={t("changepw.cancel")}
          style={{ borderRadius: radii.lg, backgroundColor: colors.surface2, paddingVertical: 14, paddingHorizontal: spacing.lg, alignItems: "center" }}
        >
          <Text variant="bodyStrong" color={colors.text}>{t("changepw.cancel")}</Text>
        </PressableScale>
      </View>
    </View>
  );
}
