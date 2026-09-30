import React, { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking, Platform, View } from "react-native";
import { FlowActions, FlowScreen, StateBody } from "./flow";
import { PressableScale } from "./PressableScale";
import { Text } from "./Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, radii, useTheme, cardShadow } from "../theme";
import { TAB_BAR_MAX_WIDTH } from "../lib/useLayout";
import { TAB_BAR_SPACE } from "./Screen";
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
      <GateBanner
        text={t("common.network_blocked")}
        onLater={() => setBlockedDismissed(true)}
        action={t("common.try_again")}
        busy={busy}
        onAction={async () => {
          setBusy(true);
          await refresh(true);
          setBusy(false);
        }}
      />
    );
  }

  if (!control) return null;

  const openStore = () => {
    const url = control.store[PLATFORM].url;
    if (url) void Linking.openURL(url).catch(() => undefined);
  };

  if (control.maintenance.enabled) {
    /* Kendi dilinde mesaj yoksa İngilizcesi; o da yoksa sözlüğün genel cümlesi.
       Türkçeye düşmüyor: anadili Almanca olan Türkçe bakım notu okuyamaz. */
    const msg = control.maintenance.message;
    const custom = msg[currentLang()] || (currentLang() !== "tr" ? msg.en : "");
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
    return <GateBanner text={t("appgate.update_suggested")} onLater={() => setDismissed(true)} action={t("appgate.update_button")} onAction={openStore} />;
  }

  return null;
}

/**
 * ALTTAKİ BİLGİ ŞERİDİ — ağ engeli ve "güncelleme var".
 *
 * İki kopyaydı ve ikisi de `bottom: 60` ile sabit duruyordu: güvenli alanı
 * bilmiyor, iPhone'da yüzen sekme çubuğunun üstüne biniyor, tablette kolonu
 * değil bütün ekranı kaplıyordu. Şimdi sekme çubuğunun üstünde, onunla aynı
 * genişlikte (`TAB_BAR_MAX_WIDTH`, tablette de telefon kolonu) ve kart
 * yüzeyinde (saç çizgisi + kart gölgesi).
 */
function GateBanner({ text, onLater, action, onAction, busy = false }: { text: string; onLater: () => void; action: string; onAction: () => void; busy?: boolean }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={{ position: "absolute", left: 0, right: 0, bottom: insets.bottom + TAB_BAR_SPACE, alignItems: "center" }}>
      <View style={{ width: "100%", maxWidth: TAB_BAR_MAX_WIDTH, paddingHorizontal: spacing.lg }}>
      <View
        accessibilityLiveRegion="polite"
        style={[{ borderRadius: radii.lg, backgroundColor: colors.surface, borderColor: colors.hairline, borderWidth: 1, padding: spacing.md, gap: spacing.sm }, cardShadow(colors, 16)]}
      >
        <Text variant="body">{text}</Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: spacing.md }}>
          <PressableScale accessibilityRole="button" onPress={onLater} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
            <Text variant="body" color={colors.textMuted}>{t("appgate.later")}</Text>
          </PressableScale>
          <PressableScale accessibilityRole="button" disabled={busy} onPress={onAction} style={{ paddingVertical: spacing.sm, paddingHorizontal: spacing.md }}>
            <Text variant="h3" color={colors.primary}>{action}</Text>
          </PressableScale>
        </View>
      </View>
      </View>
    </View>
  );
}
