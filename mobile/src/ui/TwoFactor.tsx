import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { disableTwoFactor, enableTwoFactor, getTwoFactorEnabled } from "../lib/auth";
import { translateAuthError } from "../lib/authErrors";
import { spacing, radii, type Palette } from "../theme";

/**
 * İki adımlı doğrulama — aç / kapat. Web'deki kartın eşi.
 *
 * Açıkken giriş, parolaya EK OLARAK e-posta kutusuna gelen bir kodu şart
 * koşuyor. Parola tek başına yeterli olduğu sürece sızmış bir parola hesabın
 * tamamı demek; bu adım araya posta kutusunu koyuyor.
 *
 * PAROLA İSTİYOR, hem açarken hem kapatırken (better-auth zorunlu tutuyor):
 * oturumu ele geçiren biri ikinci adımı sessizce kaldıramasın.
 *
 * BEDELİ AÇIKÇA YAZIYOR: kod e-postaya gidiyor, yani posta kutusunu kaybeden
 * kullanıcı hesabını da kaybediyor. Parola sıfırlama da aynı kutuya bağlı
 * olduğundan durum bugünkünden kötü değil — ama açmadan ÖNCE söylenmeli.
 */
export function TwoFactor({ colors }: { colors: Palette }) {
  /** null: durum henüz bilinmiyor — kart hiçbir şey iddia etmiyor. */
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    void getTwoFactorEnabled().then((v) => { if (alive) setEnabled(v ?? false); });
    return () => { alive = false; };
  }, []);

  const input = {
    backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border,
    paddingHorizontal: spacing.lg, paddingVertical: 12, color: colors.text, fontSize: 16,
  } as const;

  function kapat() {
    setOpen(false);
    setPassword("");
    setError(null);
  }

  async function kaydet() {
    if (busy || enabled === null) return;
    setBusy(true);
    setError(null);
    const r = enabled ? await disableTwoFactor(password) : await enableTwoFactor(password);
    setBusy(false);
    if (!r.ok) { setError(translateAuthError(r.code, r.message, r.status)); return; }
    setEnabled(!enabled);
    setNote(t(enabled ? "twofa.disabled_note" : "twofa.enabled_note"));
    kapat();
  }

  if (!open) {
    return (
      <View style={{ gap: spacing.xs }}>
        {note ? (
          <View style={{ backgroundColor: colors.successSoft, borderRadius: radii.md, padding: spacing.md }}>
            <Text variant="caption" color={colors.successText}>{note}</Text>
          </View>
        ) : null}
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <Text variant="caption" color={colors.textMuted}>
              {t(enabled ? "twofa.on_sub" : "twofa.off_sub")}
            </Text>
          </View>
          <PressableScale
            onPress={() => { setOpen(true); setNote(null); }}
            disabled={enabled === null}
            accessibilityRole="button"
            accessibilityLabel={t("twofa.title")}
            style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.primarySoft, opacity: enabled === null ? 0.6 : 1 }}
          >
            <Text variant="caption" color={colors.primaryText}>{t(enabled ? "twofa.disable" : "twofa.enable")}</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  return (
    <View style={{ gap: spacing.sm }}>
      {enabled ? null : (
        <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.dangerText}>{t("twofa.mail_warning")}</Text>
        </View>
      )}
      <TextInput
        value={password} onChangeText={setPassword} secureTextEntry returnKeyType="go"
        onSubmitEditing={() => { if (!busy) void kaydet(); }}
        placeholder={t("twofa.password_label")} placeholderTextColor={colors.textFaint} style={input}
      />
      {error ? (
        <View style={{ backgroundColor: colors.dangerSoft, borderRadius: radii.md, padding: spacing.md }}>
          <Text variant="caption" color={colors.dangerText}>{error}</Text>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <PressableScale
          onPress={kaydet}
          accessibilityRole="button"
          accessibilityLabel={t(enabled ? "twofa.disable" : "twofa.enable")}
          style={{ flex: 1, borderRadius: radii.lg, backgroundColor: colors.primary, paddingVertical: 14, alignItems: "center" }}
        >
          <Text variant="bodyStrong" color={colors.onPrimary}>
            {busy ? "..." : t(enabled ? "twofa.disable" : "twofa.enable")}
          </Text>
        </PressableScale>
        <PressableScale
          onPress={kapat}
          accessibilityRole="button"
          accessibilityLabel={t("changepw.cancel")}
          style={{ borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: 14, alignItems: "center" }}
        >
          <Text variant="bodyStrong" color={colors.text}>{t("changepw.cancel")}</Text>
        </PressableScale>
      </View>
    </View>
  );
}
