import notifee, { TriggerType, RepeatFrequency, AndroidImportance, AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Yerel bildirimler (§4 — push yeniden-etkileşim). Üç bağımsız kategori cihazda
 * zamanlanır (FCM/sunucu gerekmez), her biri KENDİ bildirim kimliğiyle — biri
 * diğerini iptal etmesin:
 *  - daily  : günlük hatırlatma (kullanıcının seçtiği saat, her gün)
 *  - streak : seri koruma (akşam, her gün) — "bugün henüz çalışmadıysan"
 *  - weekly : haftalık sınav (her Pazar)
 * Tercihler AsyncStorage'da; notifee tekrarlayan TIMESTAMP tetikleyici.
 */
const CHANNEL_ID = "reminder";

// Her kategori ayrı adreslenir (cancelTriggerNotification(id) ile tek tek iptal).
const ID_DAILY = "nomi-daily";
const ID_STREAK = "nomi-streak";
const ID_WEEKLY = "nomi-weekly";

const KEY_DAILY = "nomi:reminder"; // "HH:MM" açık, "" kapalı (geri uyumlu)
const KEY_STREAK = "nomi:notif:streak"; // "1" | ""
const KEY_WEEKLY = "nomi:notif:weekly"; // "1" | ""

// Seri koruma akşam, haftalık sınav Pazar öğlen — sabit, sade tutuldu.
const STREAK_TIME = "20:30";
const WEEKLY_DAY = 0; // 0 = Pazar
const WEEKLY_TIME = "11:00";

async function ensureChannel(): Promise<void> {
  await notifee.createChannel({ id: CHANNEL_ID, name: "Hatırlatmalar", importance: AndroidImportance.HIGH });
}

async function requirePermission(): Promise<boolean> {
  const settings = await notifee.requestPermission();
  return settings.authorizationStatus !== AuthorizationStatus.DENIED;
}

/** Verilen HH:MM için bir sonraki günlük zaman damgası (geçmişse yarın). */
function nextDaily(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  const d = new Date();
  d.setHours(h, m, 0, 0);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
  return d.getTime();
}

/** Verilen hafta günü (0=Pazar) + saat için bir sonraki haftalık zaman damgası. */
function nextWeekly(weekday: number, hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  const d = new Date();
  d.setHours(h, m, 0, 0);
  const delta = (weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + delta);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 7);
  return d.getTime();
}

async function schedule(id: string, body: string, timestamp: number, freq: RepeatFrequency): Promise<void> {
  await notifee.createTriggerNotification(
    { id, title: "Nomi", body, android: { channelId: CHANNEL_ID, smallIcon: "ic_launcher", pressAction: { id: "default" } } },
    { type: TriggerType.TIMESTAMP, timestamp, repeatFrequency: freq },
  );
}

/* ------------------------------------------------------------------ daily */

export async function getReminder(): Promise<string | null> {
  try {
    const v = await AsyncStorage.getItem(KEY_DAILY);
    return v && v.includes(":") ? v : null;
  } catch {
    return null;
  }
}

/** Günlük hatırlatmayı verilen saate kurar. İzin reddedilirse false. */
export async function enableDailyReminder(hhmm: string): Promise<boolean> {
  if (!(await requirePermission())) return false;
  await ensureChannel();
  await notifee.cancelTriggerNotification(ID_DAILY);
  await schedule(ID_DAILY, "Bugünkü turunu unutma — serini koru!", nextDaily(hhmm), RepeatFrequency.DAILY);
  try { await AsyncStorage.setItem(KEY_DAILY, hhmm); } catch { /* depolama kapalı */ }
  return true;
}

export async function disableReminder(): Promise<void> {
  try { await notifee.cancelTriggerNotification(ID_DAILY); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_DAILY, ""); } catch { /* yut */ }
}

/* ----------------------------------------------------------------- streak */

export async function getStreakAlert(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(KEY_STREAK)) === "1"; } catch { return false; }
}

/** Seri koruma (her akşam). İzin reddedilirse false. */
export async function setStreakAlert(on: boolean): Promise<boolean> {
  if (on) {
    if (!(await requirePermission())) return false;
    await ensureChannel();
    await notifee.cancelTriggerNotification(ID_STREAK);
    await schedule(ID_STREAK, "Serini kaybetme! Kısa bir tur bugünü kurtarır.", nextDaily(STREAK_TIME), RepeatFrequency.DAILY);
    try { await AsyncStorage.setItem(KEY_STREAK, "1"); } catch { /* yut */ }
    return true;
  }
  try { await notifee.cancelTriggerNotification(ID_STREAK); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_STREAK, ""); } catch { /* yut */ }
  return true;
}

/* ----------------------------------------------------------------- weekly */

export async function getWeeklyReminder(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(KEY_WEEKLY)) === "1"; } catch { return false; }
}

/** Haftalık sınav hatırlatması (her Pazar). İzin reddedilirse false. */
export async function setWeeklyReminder(on: boolean): Promise<boolean> {
  if (on) {
    if (!(await requirePermission())) return false;
    await ensureChannel();
    await notifee.cancelTriggerNotification(ID_WEEKLY);
    await schedule(ID_WEEKLY, "Haftalık sınav zamanı — bu hafta ne kadar ilerledin?", nextWeekly(WEEKLY_DAY, WEEKLY_TIME), RepeatFrequency.WEEKLY);
    try { await AsyncStorage.setItem(KEY_WEEKLY, "1"); } catch { /* yut */ }
    return true;
  }
  try { await notifee.cancelTriggerNotification(ID_WEEKLY); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_WEEKLY, ""); } catch { /* yut */ }
  return true;
}

/* ------------------------------------------------------------------- misc */

/** OS bildirim ayarlarını açar (kullanıcı sistemden kapatmışsa). */
export async function openNotificationSettings(): Promise<void> {
  try { await notifee.openNotificationSettings(); } catch { /* yut */ }
}

/** Hemen bir örnek bildirim gösterir (test/önizleme). */
export async function showTestNotification(): Promise<boolean> {
  if (!(await requirePermission())) return false;
  await ensureChannel();
  await notifee.displayNotification({
    title: "Nomi",
    body: "Bildirimler açık — her gün nazikçe hatırlatacağız.",
    android: { channelId: CHANNEL_ID, smallIcon: "ic_launcher", pressAction: { id: "default" } },
  });
  return true;
}

/**
 * İlk giriş sonrası bildirim izni "priming"i (§4 — elde tutmanın #1 kaldıracı).
 * Bir kez gösterilir; hatırlatma zaten kuruluysa ya da daha önce sorulduysa atlanır.
 */
const PRIMED_KEY = "nomi:notif-primed";

export async function notifPrimeNeeded(): Promise<boolean> {
  try {
    if ((await AsyncStorage.getItem(PRIMED_KEY)) === "1") return false;
    return !(await getReminder()); // hatırlatma zaten varsa gerekmez
  } catch {
    return false;
  }
}

export async function markNotifPrimed(): Promise<void> {
  try { await AsyncStorage.setItem(PRIMED_KEY, "1"); } catch { /* yut */ }
}
