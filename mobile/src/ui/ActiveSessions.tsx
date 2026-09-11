import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { t, currentLang } from "../lib/i18n";
import { Text } from "./Text";
import { PressableScale } from "./PressableScale";
import { listSessions, revokeOtherSessions, revokeSession, type ActiveSession, type SessionsResult } from "../lib/sessions";
import { spacing, radii, type Palette } from "../theme";

/**
 * Etkin oturumlar — web'deki bölümün eşi.
 *
 * `session` tablosu ipAddress ve userAgent'ı baştan tutuyordu ve better-auth'un
 * uçları hazırdı, ama hiçbir ekran göstermiyordu: telefonunu kaybeden ya da
 * "birisi girmiş olabilir" diyen kullanıcının parolayı değiştirmek dışında
 * yapabileceği bir şey yoktu.
 *
 * ASIL DÜĞME LİSTEYE BAĞLI DEĞİL. `/list-sessions` 24 saatten taze oturum
 * istiyor, `/revoke-other-sessions` istemiyor; liste görünmese bile çıkış
 * çalışıyor ve güvenlik açısından değerli olan yarı o.
 */
export function ActiveSessions({ colors }: { colors: Palette }) {
  const [result, setResult] = useState<SessionsResult | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const yukle = () => { void listSessions().then(setResult); };
  useEffect(yukle, []);

  async function cikar(token: string) {
    setBusy(token);
    setMsg(null);
    const ok = await revokeSession(token);
    setBusy(null);
    setMsg(t(ok ? "sessions.revoked" : "sessions.load_failed"));
    if (ok) yukle();
  }

  async function digerleri() {
    setBusy("others");
    setMsg(null);
    const ok = await revokeOtherSessions();
    setBusy(null);
    setMsg(t(ok ? "sessions.revoked_others" : "sessions.load_failed"));
    if (ok) yukle();
  }

  if (!result) return null;

  const satirlar: ActiveSession[] = result.state === "ok" ? result.rows : [];

  return (
    <View style={{ gap: spacing.sm }}>
      {satirlar.map((s, i) => (
        <View
          key={s.id}
          style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: 10, borderTopWidth: i === 0 ? 0 : 1, borderTopColor: colors.hairline }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="bodyStrong">{cihazAdi(s.userAgent)}</Text>
            <Text variant="caption" color={colors.textMuted}>
              {t("sessions.since", { date: new Date(s.createdAt).toLocaleDateString(currentLang()) })}
              {s.ipAddress ? ` · ${s.ipAddress}` : ""}
            </Text>
          </View>
          <PressableScale
            onPress={() => void cikar(s.token)} disabled={busy === s.token} accessibilityRole="button"
            accessibilityLabel={t("sessions.revoke")}
            style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.surface2 }}
          >
            <Text variant="caption" color={colors.dangerText}>{busy === s.token ? "…" : t("sessions.revoke")}</Text>
          </PressableScale>
        </View>
      ))}

      {/* İKİ DURUM SATIRI DA DUYURULUYOR. "Oturumu tazele" ve "liste
          yüklenemedi" bir eylemin cevabı: kullanıcı düğmeye basıyor, odak
          düğmede kalıyor ve ekran yalnız renkle cevap veriyordu. Webde ikisi
          de ortak bildirim kutusundan geçiyor (`AuthNotice`, `role="alert"`);
          mobilde düz metindi. §157 bu bileşenin `msg` satırını kapatmıştı ama
          bu iki dal `msg` değil, DURUM nesnesinin alanı — aynı kusur, başka
          kalıpta (bkz. §11.272). */}
      {result.state === "stale" ? (
        <Text accessibilityLiveRegion="polite" variant="caption" color={colors.textMuted}>{t("sessions.need_fresh")}</Text>
      ) : null}
      {result.state === "failed" ? (
        <Text accessibilityLiveRegion="polite" variant="caption" color={colors.dangerText}>{t("sessions.load_failed")}</Text>
      ) : null}

      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <Text variant="caption" color={colors.textMuted} style={{ flex: 1 }}>{t("sessions.sub")}</Text>
        <PressableScale
          onPress={() => void digerleri()} disabled={busy === "others"} accessibilityRole="button"
          accessibilityLabel={t("sessions.revoke_others")}
          style={{ paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radii.md, backgroundColor: colors.primarySoft }}
        >
          <Text variant="caption" color={colors.primaryText}>{busy === "others" ? "…" : t("sessions.revoke_others")}</Text>
        </PressableScale>
      </View>

      {/* Sonuç duyuruluyor — bkz. `profile-form` içindeki not. */}
      {msg ? <Text accessibilityLiveRegion="polite" variant="caption" color={colors.text}>{msg}</Text> : null}
    </View>
  );
}

/**
 * Kaba cihaz etiketi — web'deki `deviceLabel` ile aynı kural. Amaç kullanıcının
 * SATIRI TANIMASI; tam bir user-agent ayrıştırıcısı bu iş için gereğinden ağır
 * ve zaten yanılıyor.
 */
function cihazAdi(ua: string | null | undefined): string {
  if (!ua) return t("sessions.unknown_device");
  const platform =
    /android/i.test(ua) ? "Android"
      : /iphone/i.test(ua) ? "iPhone"
        : /ipad/i.test(ua) ? "iPad"
          : /macintosh|mac os/i.test(ua) ? "Mac"
            : /windows/i.test(ua) ? "Windows"
              : /linux/i.test(ua) ? "Linux"
                : null;
  const browser =
    /edg\//i.test(ua) ? "Edge"
      : /opr\/|opera/i.test(ua) ? "Opera"
        : /chrome\//i.test(ua) ? "Chrome"
          : /firefox\//i.test(ua) ? "Firefox"
            : /safari\//i.test(ua) ? "Safari"
              : null;
  const parts = [platform, browser].filter(Boolean);
  return parts.length ? parts.join(" · ") : t("sessions.unknown_device");
}
