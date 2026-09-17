import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking, Platform, View } from "react-native";
import { FlowActions, FlowScreen, StateBody } from "./flow";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";
import { spacing, radii, useTheme } from "../theme";
import { currentLang, t } from "../lib/i18n";
import { fetchServerConfig, type AppControl } from "../lib/serverConfig";
import { syncContentPointer } from "../content/store";
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
  const lastRead = useRef(0);

  const refresh = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastRead.current < MIN_REFRESH_MS) return;
    lastRead.current = now;
    const c = await fetchServerConfig(true).catch(() => null);
    if (c) setControl(c.app);
    /* İÇERİK GÖSTERGESİ de burada tazeleniyor: uygulama zaten "bakım var mı,
       güncellemem gerekiyor mu" diye soruyor; "yeni içerik var mı, kapatılmış
       madde var mı" aynı anın sorusu. Ayrı bir uç, çünkü ömrü farklı
       (yarım dakika / beş dakika) ama tetiği aynı. Kendi hatalarını yutuyor:
       içerik yoklaması bakım kapısını hiçbir zaman düşürmemeli. */
    void syncContentPointer();
  }, []);

  useEffect(() => {
    void refresh(true);
    const sub = AppState.addEventListener("change", (s) => {
      if (s === "active") void refresh();
    });
    return () => sub.remove();
  }, [refresh]);

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
          <StateBody alert mood="sad" title={t("appgate.maintenance_title")} body={custom || t("appgate.maintenance_body")} />
        </FlowScreen>
      </View>
    );
  }

  const build = APP_VERSION_CODE;
  if (build > 0 && build < control.minBuild[PLATFORM]) {
    return (
      <View style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}>
        <FlowScreen center actions={<FlowActions primary={{ label: t("appgate.update_button"), onPress: openStore }} />}>
          <StateBody alert mood="wave" title={t("appgate.update_title")} body={t("appgate.update_body")} />
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
