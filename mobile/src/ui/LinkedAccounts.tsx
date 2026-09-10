import React, { useEffect, useState } from "react";
import { View, Platform } from "react-native";
import { t } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { spacing, radii, type Palette } from "../theme";
import { listAccounts, unlinkAccount, type LinkedAccount } from "../lib/accountLinks";
import { googleLink, googleSupported } from "../lib/googleAuth";
import { appleLink, appleSupported } from "../lib/appleAuth";
import { useAuth } from "../lib/AuthContext";

const AD: Record<string, string> = { credential: "links.credential", google: "Google", apple: "Apple" };
const etiket = (p: string) => (AD[p] && AD[p].includes(".") ? t(AD[p]) : (AD[p] ?? p));

/**
 * Giriş yöntemleri — bağlı hesapları gösterir, ekler, kaldırır.
 *
 * Aynı e-postayla hem parola hem sosyal giriş kullanan kişi tek hesapta
 * olmalı. Sağlayıcı e-postayı doğrulanmış bildirirse bağlama girişte
 * kendiliğinden oluyor; doğrulanmamışsa bilerek olmuyor (doğrulanmamış adrese
 * güvenmek hesap devralma yolu açar) ve tek çıkış burası.
 *
 * SON YÖNTEM SÖKÜLEMEZ: sunucu da reddediyor ama düğme hiç gösterilmiyor —
 * yapılamayacak bir şeyi teklif edip hatayla geri çevirmek daha kötü.
 */
export function LinkedAccounts({ colors }: { colors: Palette }) {
  const { user, refresh } = useAuth();
  const [accounts, setAccounts] = useState<LinkedAccount[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    listAccounts().then((a) => { if (alive) setAccounts(a); });
    return () => { alive = false; };
  }, []);

  async function bagla(provider: "google" | "apple") {
    setBusy(provider);
    setMsg(null);
    // Kıyas için hesabın e-postası: seçilen sosyal hesap başkasınınsa çağrı
    // hiç kurulmuyor (bkz. accountLinks.tokenEmail).
    const r = provider === "google" ? await googleLink(user?.email ?? null) : await appleLink(user?.email ?? null);
    setBusy(null);
    if (r.ok) {
      setAccounts(await listAccounts());
      await refresh();
      setMsg(t("links.linked"));
      return;
    }
    if (r.code === "CANCELLED") return; // sessiz
    setMsg(r.code === "EMAIL_MISMATCH" ? r.message : t("links.failed"));
  }

  async function kaldir(provider: string) {
    setBusy(provider);
    setMsg(null);
    const r = await unlinkAccount(provider);
    setBusy(null);
    if (r === "ok") {
      setAccounts(await listAccounts());
      setMsg(t("links.unlinked"));
      return;
    }
    setMsg(r === "fresh" ? t("links.need_fresh") : t("links.failed"));
  }

  if (!accounts) return null;

  const bagliMi = (p: string) => accounts.some((a) => a.providerId === p);
  const sonYontem = accounts.length <= 1;
  // Teklif edilenler platforma göre: Apple yalnız iOS'ta native olarak var.
  const teklif = [...(googleSupported() ? ["google"] : []), ...(Platform.OS === "ios" && appleSupported() ? ["apple"] : [])];
  const satirlar = [...new Set([...accounts.map((a) => a.providerId), ...teklif])];

  return (
    <View style={{ gap: spacing.sm }}>
      {satirlar.map((p, i) => {
        const bagli = bagliMi(p);
        const calisiyor = busy === p;
        return (
          <View key={p} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingTop: i ? spacing.md : 0, borderTopWidth: i ? 1 : 0, borderTopColor: colors.hairline }}>
            <View style={{ flex: 1 }}>
              <Text variant="bodyStrong">{etiket(p)}</Text>
              {!bagli && <Text variant="caption" color={colors.textMuted}>{t("links.not_linked")}</Text>}
            </View>
            {bagli ? (
              sonYontem ? (
                <Text variant="caption" color={colors.textMuted}>{t("links.only_method")}</Text>
              ) : (
                <PressableScale onPress={() => void kaldir(p)} disabled={calisiyor} accessibilityRole="button"
                  style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.surface2 }}>
                  <Text variant="caption" color={colors.dangerText}>{calisiyor ? "…" : t("links.unlink")}</Text>
                </PressableScale>
              )
            ) : (
              <PressableScale onPress={() => void bagla(p as "google" | "apple")} disabled={calisiyor} accessibilityRole="button"
                style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.primarySoft }}>
                <Text variant="caption" color={colors.primary}>{calisiyor ? "…" : t("links.link")}</Text>
              </PressableScale>
            )}
          </View>
        );
      })}
      <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{t("links.hint")}</Text>
      {msg ? <Text variant="caption" color={colors.text}>{msg}</Text> : null}
    </View>
  );
}
