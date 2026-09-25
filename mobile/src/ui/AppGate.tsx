import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking, Platform, View } from "react-native";
import { FlowActions, FlowScreen, StateBody } from "./flow";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";
import { spacing, radii, useTheme } from "../theme";
import { currentLang, t } from "../lib/i18n";
import { fetchServerConfig, type AppControl } from "../lib/serverConfig";
import { diagnoseNetwork } from "../lib/reachability";
import { recheckPrimary } from "../api/base";
import { useAuth } from "../lib/AuthContext";
import { syncContentPointer } from "../content/store";
import { ensureNativeDict } from "../lib/nativeContent";
import { APP_VERSION_CODE } from "../version";

/**
 * UYGULAMA KAPISI — panelden yönetilen üç karar (web `lib/app-control-shared`).
 *
 *   BAKIM       tam ekran; "tekrar dene" yapılandırmayı taze okur.
 *   ZORUNLU     build en düşüğün altındaysa tam ekran, mağaza bağlantısıyla.
 *               Kapatılamıyor: eski build'in sunucuyla uyumsuz olduğu karar
 *               verilmiş demektir.
 *   ÖNERİLEN    build en sonun altındaysa alt şerit; "sonra" o oturumda kapatır.
 *
 * Yapılandırma açılışta ve uygulama ön plana her dönüşte taze okunuyor (en
 * sık dakikada bir): bakım açıldığında uygulamayı kapatmayan kullanıcıya da
 * ulaşmalı. Okuma düşerse kapı hiçbir şeyi engellemiyor — ağ hatası bakım
 * ekranına dönüşmemeli.
 *
 * SINIR: bu kapı yalnız KENDİSİNİ TAŞIYAN build'lerde çalışıyor. Ondan önce
 * yayımlanmış sürümler zorunlu güncellemeyi göremez; panel bunu yazıyor.
 */

const PLATFORM: "ios" | "android" = Platform.OS === "ios" ? "ios" : "android";
const MIN_REFRESH_MS = 60_000;

export function AppGate() {
  const { colors } = useTheme();
  const [control, setControl] = useState<AppControl | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [busy, setBusy] = useState(false);
  /*
    AĞ ENGELİ ŞERİDİ. Yapılandırma okunamadı ve teşhis "internet var, Lernomi'ye
    ulaşılamıyor" diyor (bkz. lib/reachability): okul/iş ağı yeni alan adını
    engelliyor olabilir. Yalnız oturum varken; giriş ekranı aynı notu kendisi
    gösteriyor (AuthScreen), iki kez görünmesin.
  */
  const { user } = useAuth();
  const [blocked, setBlocked] = useState(false);
  const [blockedDismissed, setBlockedDismissed] = useState(false);
  const lastRead = useRef(0);

  const refresh = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastRead.current < MIN_REFRESH_MS) return;
    lastRead.current = now;
    /* Yedek adresteysek (engelli ağ, bkz. api/base) ana adres açıldı mı:
       açıldıysa önce oraya dönülüyor, yapılandırma da oradan okunuyor. */
    await recheckPrimary(force).catch(() => undefined);
    const c = await fetchServerConfig(true).catch(() => null);
    if (c) setControl(c.app);
    if (c?.offline) setBlocked((await diagnoseNetwork()) === "blocked");
    else setBlocked(false);
    /* İÇERİK GÖSTERGESİ de burada tazeleniyor: uygulama zaten "bakım var mı,
       güncellemem gerekiyor mu" diye soruyor; "yeni içerik var mı, kapatılmış
       madde var mı" aynı anın sorusu. Ayrı bir uç, çünkü ömrü farklı
       (yarım dakika / beş dakika) ama tetiği aynı. Kendi hatalarını yutuyor:
       içerik yoklaması bakım kapısını hiçbir zaman düşürmemeli. */
    void syncContentPointer();
    /* ANADİL SÖZLÜĞÜ de burada: artık ikilide değil, indiriliyor
       (`lib/nativeContent`). Türkçe kullanan için hiçbir şey yapmıyor.
       Göstergeden SONRA çağrılıyor ki paket sürümü taze olsun. */
    void ensureNativeDict();
  }, []);

  useEffect(() => {
    void refresh(true);
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") void refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  if (blocked && !blockedDismissed && user) {
    return (
      <View
        accessibilityLiveRegion="polite"
        style={{
          position: "absolute",
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.xl * 3,
          borderRadius: radii.lg,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          padding: spacing.md,
          gap: spacing.sm,
        }}
      >
        <Text variant="body">{t("common.network_blocked")}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: spacing.md }}>
          <PressableScale accessibilityRole="button" onPress={() => setBlockedDismissed(true)} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={colors.textMuted}>{t("appgate.later")}</Text>
          </PressableScale>
          <PressableScale
            accessibilityRole="button"
            disabled={busy}
            onPress={async () => {
              setBusy(true);
              await refresh(true);
              setBusy(false);
            }}
            style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}
          >
            <Text variant="h3" color={colors.primary}>{t("common.try_again")}</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  if (!control) return null;

  const openStore = () => {
    const url = control.store[PLATFORM].url;
    if (url) void Linking.openURL(url).catch(() => undefined);
  };

  if (control.maintenance.enabled) {
    const custom = control.maintenance.message[currentLang()] || control.maintenance.message.tr;
    return (
      <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        <FlowScreen
          center
          actions={
            <FlowActions
              primary={{
                label: t("appgate.check_again"),
                busy,
                onPress: async () => {
                  setBusy(true);
                  await refresh(true);
                  setBusy(false);
                },
              }}
            />
          }
        >
          <StateBody alert title={t("appgate.maintenance_title")} body={custom || t("appgate.maintenance_body")} />
        </FlowScreen>
      </View>
    );
  }

  const build = APP_VERSION_CODE;
  if (build > 0 && build < control.minBuild[PLATFORM]) {
    return (
      <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        <FlowScreen center actions={<FlowActions primary={{ label: t("appgate.update_button"), onPress: openStore }} />}>
          <StateBody alert title={t("appgate.update_title")} body={t("appgate.update_body")} />
        </FlowScreen>
      </View>
    );
  }

  if (!dismissed && build > 0 && build < control.latestBuild[PLATFORM]) {
    return (
      <View
        accessibilityLiveRegion="polite"
        style={{
          position: "absolute",
          left: spacing.lg,
          right: spacing.lg,
          bottom: spacing.xl * 3,
          borderRadius: radii.lg,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          padding: spacing.md,
          gap: spacing.sm,
        }}
      >
        <Text variant="body">{t("appgate.update_suggested")}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: spacing.md }}>
          <PressableScale accessibilityRole="button" onPress={() => setDismissed(true)} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={colors.textMuted}>{t("appgate.later")}</Text>
          </PressableScale>
          <PressableScale accessibilityRole="button" onPress={openStore} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
            <Text variant="h3" color={colors.primary}>{t("appgate.update_button")}</Text>
          </PressableScale>
        </View>
      </View>
    );
  }

  return null;
}
