import { Platform, PermissionsAndroid } from "react-native";
import notifee, { AndroidImportance, AuthorizationStatus } from "@notifee/react-native";
import { getApps } from "@react-native-firebase/app";
import {
  AuthorizationStatus as FcmAuthorizationStatus,
  getInitialNotification,
  getMessaging,
  getToken,
  onMessage,
  onNotificationOpenedApp,
  onTokenRefresh,
  requestPermission,
  type RemoteMessage,
} from "@react-native-firebase/messaging";
import { api } from "../api/client";
import { t } from "./i18n";
import { navigateFromPush } from "./pushRoute";
import { setPushDevice } from "./pushState";
import { cancelLocalReminders } from "./notifications";

/**
 * Uzak bildirim (FCM) — uygulamanın geri çağırma kanalı.
 *
 * Buraya kadar mobilde YALNIZ cihazda zamanlanan yerel bildirim vardı
 * (notifications.ts). Yani arkadaşlık isteği, dürtme, ortak görev daveti,
 * "görev tamamlandı" ve lig yükselişi gelen kutusuna yazılıyor ama kullanıcı
 * uygulamayı kendiliğinden açana kadar kimseye ulaşmıyordu. Sosyal katmanın
 * en pahalı eksiği buydu.
 *
 * YAPILANDIRMA YOKSA SESSİZCE KAPALI. Firebase dosyaları (Android
 * google-services.json, iOS GoogleService-Info.plist) sır ve repoda değil;
 * yoksa `getApps()` boş döner, bu modüldeki her şey erkenden çıkar ve
 * uygulama push'suz ama sağlam çalışır.
 */
function ready(): boolean {
  try {
    return getApps().length > 0;
  } catch {
    return false;
  }
}

/**
 * Bildirim izni. Android 13+ çalışma zamanı izni istiyor; iOS'ta izni FCM'in
 * kendisi soruyor. notifee'nin izin akışıyla çakışmıyor: ikisi de aynı sistem
 * iznini soruyor, ikinci soru kullanıcıya görünmüyor.
 */
async function permitted(): Promise<boolean> {
  try {
    if (Platform.OS === "android") {
      if (Platform.Version >= 33) {
        const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        return res === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    }
    const status = await requestPermission(getMessaging());
    return status === FcmAuthorizationStatus.AUTHORIZED || status === FcmAuthorizationStatus.PROVISIONAL;
  } catch {
    return false;
  }
}

async function sendToken(token: string): Promise<void> {
  await api("/api/push/device", {
    method: "POST",
    body: JSON.stringify({ token, platform: Platform.OS === "ios" ? "ios" : "android" }),
  });
}

/** Son gönderilen jeton — çıkışta silmek ve aynı jetonu iki kez yazmamak için. */
let current: string | null = null;

/**
 * Sunucu bu cihaza bildirim gönderebiliyor mu.
 *
 * Hatırlatmaların YEREL kopyası buna bakıyor: jeton varsa hatırlatmayı sunucu
 * gönderiyor ve aynısını cihazda ikinci kez zamanlamak, kullanıcıya aynı şeyi
 * iki kez söylemek olurdu (bkz. `lib/notifications`).
 */
export function hasPushDevice(): boolean {
  return current !== null;
}

/**
 * Girişten sonra çağrılır: izin ister, jetonu alır ve sunucuya yazar.
 * Sessizce başarısız olur — bildirim kurulamaması uygulamayı bozmamalı.
 */
export async function registerPushDevice(): Promise<void> {
  if (!ready()) return;
  try {
    if (!(await permitted())) return;
    const token = await getToken(getMessaging());
    if (!token || token === current) return;
    await sendToken(token);
    current = token;
    setPushDevice(true);
    /*
     * YEREL KOPYALAR İPTAL EDİLİYOR.
     *
     * Jeton yazıldığı andan itibaren üç hatırlatmayı da sunucu gönderiyor
     * (`lib/push` `runReminders`/`runStreakAlerts`/`runWeeklyReminders`) ve
     * sunucunun mesajı kişiselleştirilmiş: ad, seri, bekleyen kelime sayısı,
     * haftalık rakip. Cihazdaki zamanlama aynı saatte genel bir cümleyle
     * ikinci kez çalıyordu — kullanıcı aynı hatırlatmayı iki kez alıyordu.
     * Tercihler duruyor: kullanıcı kapatırsa sunucu da göndermiyor.
     */
    await cancelLocalReminders();
  } catch {
    /* jeton alınamadı ya da sunucuya yazılamadı: bir sonraki açılışta yeniden denenir */
  }
}

/** Çıkışta: cihaz artık bu hesabın bildirimini almasın. */
export async function unregisterPushDevice(): Promise<void> {
  if (!ready() || !current) return;
  const token = current;
  current = null;
  setPushDevice(false);
  try {
    await api("/api/push/device", { method: "DELETE", body: JSON.stringify({ token }) });
  } catch {
    /* silinemezse sunucu ilk başarısız gönderimde zaten düşürür */
  }
}

/**
 * Uygulama ömrü boyunca duran dinleyiciler. Bir kez kuruluyor; dönen işlev
 * hepsini birden söküyor.
 *
 * Üç iş: jeton yenilenince yeniden yaz, uygulama ÖN PLANDAYKEN gelen bildirimi
 * kendimiz çiz (sistem ön planda çizmez), ve bildirime dokunulunca doğru
 * ekrana git.
 */
export function attachPushListeners(): () => void {
  if (!ready()) return () => {};
  /*
    Kanal AÇILIŞTA kuruluyor, ilk hatırlatma kurulurken değil. Android 8+
    var olmayan bir kanala gelen bildirimi sessizce düşürüyor: yerel
    hatırlatma hiç açmamış bir kullanıcıya gelen ilk sosyal bildirim
    kayboluyor olurdu.
  */
  void notifee.createChannel({ id: "reminder", name: t("notif.channel"), importance: AndroidImportance.HIGH }).catch(() => {});
  const fcm = getMessaging();
  const offToken = onTokenRefresh(fcm, (token: string) => {
    current = token;
    /* Jeton yenilendi: uzak push hâlâ çalışıyor demek. */
    setPushDevice(true);
    void sendToken(token).catch(() => {});
  });

  const offMessage = onMessage(fcm, async (msg: RemoteMessage) => {
    const title = msg.notification?.title ?? "Lernomi";
    const body = msg.notification?.body ?? "";
    if (!body) return;
    try {
      await notifee.displayNotification({
        title,
        body,
        data: { url: String(msg.data?.url ?? "") },
        android: { channelId: "reminder", smallIcon: "ic_notification", tag: String(msg.data?.tag ?? ""), pressAction: { id: "default" } },
      });
    } catch {
      /* çizilemezse gelen kutusu zaten satırı taşıyor */
    }
  });

  // Arka plandan dokunuş.
  const offOpen = onNotificationOpenedApp(fcm, (msg: RemoteMessage) => {
    navigateFromPush(String(msg.data?.url ?? ""));
  });
  // Ön plandayken kendi çizdiğimiz bildirime dokunuş.
  const offForeground = notifee.onForegroundEvent(({ type, detail }) => {
    if (type !== 1 /* PRESS */) return;
    navigateFromPush(String(detail.notification?.data?.url ?? ""));
  });

  // Uygulama kapalıyken gelen bildirime dokunulup açıldıysa.
  getInitialNotification(fcm)
    .then((msg: RemoteMessage | null) => {
      if (msg) navigateFromPush(String(msg.data?.url ?? ""));
    })
    .catch(() => {});

  return () => {
    offToken();
    offMessage();
    offOpen();
    offForeground();
  };
}

/**
 * Bildirim izni AÇIKÇA REDDEDİLMİŞ mi.
 *
 * Ölçüt bilerek "verilmiş mi" değil: iOS'ta henüz sorulmamış durum da
 * "verilmemiş" sayılır ve ekran açılışında "bildirimler kapalı" demek, hiç
 * sorulmamış kullanıcıya yanlış bir şey söylemek olurdu. Yalnız REDDEDİLMİŞ
 * hâl bir çıkmazdır ve kullanıcıya sistem ayarlarını göstermek gerekir.
 *
 * Web karşılığı `lib/push-client.ts` `permissionDenied()` ve ölçütü aynı.
 */
export async function pushPermissionDenied(): Promise<boolean> {
  try {
    const settings = await notifee.getNotificationSettings();
    return settings.authorizationStatus === AuthorizationStatus.DENIED;
  } catch {
    return false;
  }
}
