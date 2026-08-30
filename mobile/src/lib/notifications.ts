import notifee, { TriggerType, RepeatFrequency, AndroidImportance, AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Yerel bildirimler (§4 — push yeniden-etkileşim). Günlük hatırlatma + seri
 * tehlikesi, cihazda zamanlanır (FCM/sunucu gerekmez). notifee ile tekrarlayan
 * TIMESTAMP tetikleyici. Seçilen saat AsyncStorage'da tutulur.
 */
const REMINDER_KEY = "wortspiel:reminder"; // "HH:MM" açık, "" kapalı
const CHANNEL_ID = "reminder";

export async function getReminder(): Promise<string | null> {
  try {
    const v = await AsyncStorage.getItem(REMINDER_KEY);
    return v && v.includes(":") ? v : null;
  } catch {
    return null;
  }
}

async function ensureChannel(): Promise<void> {
  await notifee.createChannel({ id: CHANNEL_ID, name: "Hatırlatmalar", importance: AndroidImportance.HIGH });
}

/** Günlük hatırlatmayı verilen saate kurar. İzin reddedilirse false. */
export async function enableDailyReminder(hhmm: string): Promise<boolean> {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) return false;
  await ensureChannel();
  await notifee.cancelTriggerNotifications();

  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  const next = new Date();
  next.setHours(h, m, 0, 0);
  if (next.getTime() <= Date.now()) next.setDate(next.getDate() + 1);

  await notifee.createTriggerNotification(
    {
      title: "Wortspiel",
      body: "Bugünkü turunu unutma — serini koru!",
      android: { channelId: CHANNEL_ID, smallIcon: "ic_launcher", pressAction: { id: "default" } },
    },
    { type: TriggerType.TIMESTAMP, timestamp: next.getTime(), repeatFrequency: RepeatFrequency.DAILY },
  );

  try { await AsyncStorage.setItem(REMINDER_KEY, hhmm); } catch { /* depolama kapalı */ }
  return true;
}

export async function disableReminder(): Promise<void> {
  try { await notifee.cancelTriggerNotifications(); } catch { /* yut */ }
  try { await AsyncStorage.setItem(REMINDER_KEY, ""); } catch { /* yut */ }
}

/** Hemen bir örnek bildirim gösterir (test/önizleme). */
export async function showTestNotification(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  if (settings.authorizationStatus === AuthorizationStatus.DENIED) return false;
  await ensureChannel();
  await notifee.displayNotification({
    title: "Wortspiel",
    body: "Bildirimler açık — her gün nazikçe hatırlatacağız.",
    android: { channelId: CHANNEL_ID, smallIcon: "ic_launcher", pressAction: { id: "default" } },
  });
  return true;
}
