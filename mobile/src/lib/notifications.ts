import notifee, { TriggerType, RepeatFrequency, AndroidImportance, AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "./i18n";
import { hasPushDevice } from "./pushState";
import { PROFILE_DEFAULTS, PUSH_PRIME_SNOOZE_DAYS } from "./profileDefaults";
import { api } from "../api/client";

/**
 * Yerel bildirimler (§4 — push yeniden-etkileşim). Üç bağımsız kategori cihazda
 * zamanlanır (FCM/sunucu gerekmez), her biri KENDİ bildirim kimliğiyle — biri
 * diğerini iptal etmesin:
 *  - daily  : günlük hatırlatma (kullanıcının seçtiği saat, her gün)
 *  - streak : seri koruma (akşam, her gün) — "bugün henüz çalışmadıysan"
 *  - weekly : haftalık sınav (her Pazar)
 * Tercihler AsyncStorage'da; notifee tekrarlayan TIMESTAMP tetikleyici.
 */
/**
 * Bildirim kanalinin kimligi — TEK KAYNAK.
 *
 * Dort kopyasi vardi: burasi, `pushDevice`in acilista kurdugu kanal, ayni
 * dosyadaki on plan `displayNotification` cagrisi ve `AndroidManifest`taki
 * `default_notification_channel_id` (XML, ice aktarilamiyor - o kopya
 * `check:parity` ile bu sabite karsi olculuyor).
 *
 * Kimlik tek basina da yetmiyordu: kanalin TANIMI (`name`, `importance`) iki
 * yerde yaziliydi ve Android bir kanal kurulduktan sonra ozelliklerini
 * DEGISTIRMIYOR - ilk kuran kazaniyor. Iki tanim ayrisirsa kanalin gercek
 * onceligi hangi yolun once calistigina bagli kaliyordu. Tanim artik yalniz
 * `ensureChannel`da.
 */
export const CHANNEL_ID = "reminder";

/**
 * SUNUCUDAKİ AYNI TERCİH DE YAZILIYOR.
 *
 * Bu anahtarların cihazdaki kopyası yalnız yerel zamanlamayı yönetiyordu ve
 * sunucudaki `profiles.streak_alert` / `weekly_reminder` / `reminders_enabled`
 * alanlarına HİÇ dokunmuyordu. O alanlar VARSAYILAN OLARAK AÇIK ve sunucunun
 * cron'u onlara bakıp FCM'e push atıyor (`lib/push` `runStreakAlerts`); mobil
 * de cihaz kaydını `/api/push/device` ile bırakıyor. Sonuç iki yönlü bozuktu:
 *
 *   - anahtar KAPALIYKEN sunucu yine push atıyordu — düğme söylediği şeyi
 *     yapmıyordu;
 *   - anahtar AÇIKKEN kullanıcı aynı hatırlatmayı İKİ KEZ alıyordu (yerel
 *     bildirim + sunucu push'u).
 *
 * Web aynı tercihleri baştan beri `/api/notifications/prefs` ile yazıyor
 * (`components/notification-settings`); mobil de artık aynı ucu çağırıyor.
 * Hata YUTULUYOR: ağ yoksa yerel zamanlama yine kurulmalı, tercih bir sonraki
 * açılışta tekrar gönderilir (aşağıdaki `loadPrefs`).
 */
type ServerPrefs = { daily: boolean; hour: number; streak: boolean; weekly: boolean };
type PrefPatch = { daily?: boolean; hour?: number; streak?: boolean; weekly?: boolean };

async function syncPrefs(patch: PrefPatch): Promise<void> {
  try {
    await api("/api/notifications/prefs", { method: "POST", body: JSON.stringify(patch) });
  } catch { /* ağ yok: yerel zamanlama yine geçerli, bir sonraki `loadPrefs` tekrar dener */ }
}

/**
 * Anahtar HİÇ yazılmamış mı — yani kullanıcı bu kategoride bir karar verdi mi.
 *
 * Kapatmak boş dizi yazıyor, silmiyor: `""` "kullanıcı kapattı" demek, `null`
 * "hiç dokunmadı" demek. Ayrım gerekli çünkü sunucudaki üç alan da VARSAYILAN
 * OLARAK AÇIK; hiç dokunulmamış bir anahtarı yerel `false` sanıp sunucuya
 * yazmak, kullanıcının hiç istemediği bir kapatma olurdu.
 */
async function decided(key: string): Promise<boolean> {
  try { return (await AsyncStorage.getItem(key)) !== null; } catch { return false; }
}

const hhmmOf = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

/** Şemanın varsayılanı (`profiles.reminder_hour`) — ağ yokken de aynı saat. */
const DEFAULT_HOUR = PROFILE_DEFAULTS.reminderHour;

export type ReminderPrefs = {
  daily: string | null;
  /**
   * SAAT, ANAHTAR KAPALIYKEN DE BİLİNİYOR.
   *
   * Ekran kapalı anahtarda saati kod içindeki sabitten çiziyordu ("19:00"),
   * sunucu ise kullanıcının kayıtlı saatini tutuyor (varsayılan 12). Yani
   * hiçbir şeye dokunmamış bir kullanıcı anahtarı Android'de açınca 19:00,
   * webde 12:00 alıyordu — aynı hesap, aynı durum, iki farklı saat. Sunucunun
   * değeri artık kapalıyken de taşınıyor.
   */
  hour: string;
  streak: boolean;
  weekly: boolean;
};

/**
 * Ekranın göstereceği üç değer — yerel karar varsa o, yoksa sunucudaki.
 *
 * Yerel anahtarlar zamanlamanın kaynağı, ama tek başına ekrana ÇİZİLECEK
 * gerçeği vermiyorlardı: uygulamayı ilk kez açan kullanıcı üç anahtarı da
 * kapalı görüyor, oysa sunucu tarafı açık ve günlük hatırlatma cron'u
 * (`lernomi-cron-reminders`) mobil cihaz jetonuna zaten push atıyor. Ekran
 * "kapalı" derken bildirim geliyordu. Karar verilmemiş kategoride artık
 * sunucunun değeri gösteriliyor - web de aynısını yapıyor
 * (`components/notification-settings` açılışta uçtan okuyor).
 *
 * Ters yön de burada onarılıyor: kullanıcının verdiği kararlar her açılışta
 * sunucuya tekrar yazılıyor, böylece kayıt sırasında ağ yoksa tercih kaybolmuyor.
 */
export async function loadPrefs(): Promise<ReminderPrefs> {
  const [daily, streak, weekly] = await Promise.all([getReminder(), getStreakAlert(), getWeeklyReminder()]);
  const [hasDaily, hasStreak, hasWeekly] = await Promise.all([decided(KEY_DAILY), decided(KEY_STREAK), decided(KEY_WEEKLY)]);

  let srv: ServerPrefs | null = null;
  if (!hasDaily || !hasStreak || !hasWeekly) {
    try { srv = await api<ServerPrefs>("/api/notifications/prefs"); } catch { /* ağ yok: yerel değerlerle çiziliyor */ }
  }
  const out: ReminderPrefs = {
    daily: hasDaily || !srv ? daily : srv.daily ? hhmmOf(srv.hour) : null,
    /* Sıra: yerel karar → sunucunun kayıtlı saati → şemanın varsayılanı. */
    hour: daily ?? (srv ? hhmmOf(srv.hour) : hhmmOf(DEFAULT_HOUR)),
    streak: hasStreak || !srv ? streak : srv.streak,
    weekly: hasWeekly || !srv ? weekly : srv.weekly,
  };

  const patch: PrefPatch = {};
  if (hasDaily) {
    patch.daily = out.daily !== null;
    if (out.daily) patch.hour = Number(out.daily.slice(0, 2));
  }
  if (hasStreak) patch.streak = out.streak;
  if (hasWeekly) patch.weekly = out.weekly;
  if (Object.keys(patch).length) await syncPrefs(patch);

  return out;
}

// Her kategori ayrı adreslenir (cancelTriggerNotification(id) ile tek tek iptal).
const ID_DAILY = "lernomi-daily";
const ID_STREAK = "lernomi-streak";
const ID_WEEKLY = "lernomi-weekly";

const KEY_DAILY = "lernomi:reminder"; // "HH:MM" açık, "" kapalı (geri uyumlu)
const KEY_STREAK = "lernomi:notif:streak"; // "1" | ""
const KEY_WEEKLY = "lernomi:notif:weekly"; // "1" | ""

/*
 * YEREL HATIRLATMA SAATLERİ — sunucunun push kuralıyla AYNI ANI anlatmalı.
 *
 * Bu iki bildirim İKİ yoldan gidiyor: uzak push varsa sunucudan
 * (`lib/push` `runStreakAlerts` / `runWeeklyReminders`, kullanıcının kendi
 * saatine göre), yoksa buradan yerel olarak (`hasPushDevice()` kapısı —
 * ikisi birden gitmiyor). Aynı hatırlatmanın hangi yoldan gittiğine göre
 * BAŞKA bir saatte gelmesi, aynı ürünün iki ayrı davranışı demek.
 *
 * Seri koruması baştan beri eşleşiyordu ve sunucu tarafında bunu söyleyen bir
 * yorum da vardı ("Akşam: mobilde 20:30, burada … 20'den sonra"). HAFTALIK
 * SINAV EŞLEŞMİYORDU: burası Pazar **11:00**, sunucu ise Pazar yerel saat
 * **18'den sonra** diyordu — aynı hatırlatma, yedi saat arayla. Kimse
 * uzlaştırmamıştı: seri çiftinin yanında karşılıklı yorum varken haftalık
 * çiftinin yanında yoktu.
 *
 * 18:00'e çekildi, çünkü sunucunun değeri HER platforma ulaşan yol
 * (web yalnız push alıyor) ve sunucudaki systemd timer penceresi de ona göre
 * kurulu (Pazar 15-19 UTC; İstanbul için yerel 18:00 = 15:00 UTC).
 */
const STREAK_TIME = "20:30";
const WEEKLY_DAY = 0; // 0 = Pazar
const WEEKLY_TIME = "18:00";

/** Kanali kurar (yinelenebilir). `pushDevice` de acilista bunu cagiriyor. */
export async function ensureChannel(): Promise<void> {
  await notifee.createChannel({ id: CHANNEL_ID, name: t("notif.channel"), importance: AndroidImportance.HIGH });
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

/**
 * HATIRLATMAYI KİM GÖNDERİYOR.
 *
 * Uzak push bağlı bir cihazda üç hatırlatmayı da sunucu gönderiyor ve mesajı
 * kişiselleştirilmiş (ad, seri, bekleyen kelime, haftalık rakip). Cihazdaki
 * zamanlama aynı saatte genel bir cümleyle ikinci kez çalıyordu: kullanıcı
 * aynı hatırlatmayı İKİ KEZ alıyordu. Yerel zamanlama artık yalnız jeton
 * yokken kuruluyor — yani uzak push çalışmıyorsa hatırlatma yine geliyor.
 */
/** Jeton yazılınca çağrılır: yerel kopyalar artık ikinci nüsha. */
export async function cancelLocalReminders(): Promise<void> {
  for (const id of [ID_DAILY, ID_STREAK, ID_WEEKLY]) {
    try { await notifee.cancelTriggerNotification(id); } catch { /* yut */ }
  }
}

/*
 * iOS SESSİZ KALIYORDU.
 *
 * Android'de kanal `AndroidImportance.HIGH`: bildirim ses çıkarıyor ve
 * heads-up geliyor. iOS'ta karşılığı bildirimin kendi `ios.sound` alanı ve
 * VERİLMEDİĞİNDE bildirim SESSİZ düşüyor (notifee: `sound` tanımsızsa ses
 * yok) — banner geliyor, kullanıcı duymuyor. Yani aynı hatırlatma Android'de
 * duyulup iOS'ta duyulmuyordu; hatırlatma da elde tutmanın ana kaldıracı.
 *
 * Değer sunucunun kendi seçimi: uzak bildirimde APNs yükü baştan beri
 * `aps.sound = "default"` yazıyor (`lib/fcm.ts`). Cihazda kurulan kopya da
 * aynı sesi kullanıyor, yoksa aynı bildirim iki yoldan iki farklı şekilde
 * gelirdi.
 */
const IOS_SES = { sound: "default" } as const;

async function schedule(id: string, body: string, timestamp: number, freq: RepeatFrequency): Promise<void> {
  /* Uzak push varsa yerel kopya kurulmuyor: çağıranların hepsi bu tek
     kapıdan geçiyor, yani yeni bir hatırlatma türü eklendiğinde kural
     kendiliğinden uygulanıyor. */
  if (hasPushDevice()) return;
  await notifee.createTriggerNotification(
    { id, title: "Lernomi", body, android: { channelId: CHANNEL_ID, smallIcon: "ic_notification", pressAction: { id: "default" } }, ios: IOS_SES },
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
  await schedule(ID_DAILY, t("notif.daily_body"), nextDaily(hhmm), RepeatFrequency.DAILY);
  try { await AsyncStorage.setItem(KEY_DAILY, hhmm); } catch { /* depolama kapalı */ }
  await syncPrefs({ daily: true, hour: Number(hhmm.slice(0, 2)) });
  return true;
}

export async function disableReminder(): Promise<void> {
  try { await notifee.cancelTriggerNotification(ID_DAILY); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_DAILY, ""); } catch { /* yut */ }
  await syncPrefs({ daily: false });
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
    await schedule(ID_STREAK, t("notif.streak_body"), nextDaily(STREAK_TIME), RepeatFrequency.DAILY);
    try { await AsyncStorage.setItem(KEY_STREAK, "1"); } catch { /* yut */ }
    await syncPrefs({ streak: true });
    return true;
  }
  try { await notifee.cancelTriggerNotification(ID_STREAK); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_STREAK, ""); } catch { /* yut */ }
  await syncPrefs({ streak: false });
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
    await schedule(ID_WEEKLY, t("notif.weekly_body"), nextWeekly(WEEKLY_DAY, WEEKLY_TIME), RepeatFrequency.WEEKLY);
    try { await AsyncStorage.setItem(KEY_WEEKLY, "1"); } catch { /* yut */ }
    await syncPrefs({ weekly: true });
    return true;
  }
  try { await notifee.cancelTriggerNotification(ID_WEEKLY); } catch { /* yut */ }
  try { await AsyncStorage.setItem(KEY_WEEKLY, ""); } catch { /* yut */ }
  await syncPrefs({ weekly: false });
  return true;
}

/* -------------------------------------------------------------- kimlik göçü */

/** Eski marka adlarıyla zamanlanmış tetikleyiciler (Wortspiel, Nomi dönemleri). */
const LEGACY_IDS = [
  "wortspiel-daily", "wortspiel-streak", "wortspiel-weekly",
  "nomi-daily", "nomi-streak", "nomi-weekly",
] as const;
const IDS_MIGRATED_KEY = "lernomi:notif-ids-v1";

/**
 * Bildirim kimlikleri marka adını taşıyor; ad değişince eski kimlikle
 * zamanlanmış tetikleyici ÖKSÜZ kalır. İptal edilmezse kullanıcı hem eskisini
 * hem yenisini alır; sadece iptal edilse bu kez hatırlatması sessizce kaybolur.
 * Bu yüzden ikisi birden yapılır: eskiler iptal edilir, AÇIK olan kategoriler
 * yeni kimlikle yeniden kurulur.
 *
 * İzin İSTEMEZ: tetikleyici zaten varsa izin de verilmişti. Kullanıcı izni
 * sonradan kapattıysa notifee sessizce kurmaz, ayarlardan tekrar açılır.
 * Bir kez çalışır (bayrak), yoksa her açılışta tetikleyiciler yeniden kurulurdu.
 */
export async function migrateReminderIds(): Promise<void> {
  try {
    if ((await AsyncStorage.getItem(IDS_MIGRATED_KEY)) === "1") return;
    for (const id of LEGACY_IDS) {
      try { await notifee.cancelTriggerNotification(id); } catch { /* yut */ }
    }
    const daily = await getReminder();
    const streak = await getStreakAlert();
    const weekly = await getWeeklyReminder();
    if (daily || streak || weekly) await ensureChannel();
    if (daily) await schedule(ID_DAILY, t("notif.daily_body"), nextDaily(daily), RepeatFrequency.DAILY);
    if (streak) await schedule(ID_STREAK, t("notif.streak_body"), nextDaily(STREAK_TIME), RepeatFrequency.DAILY);
    if (weekly) await schedule(ID_WEEKLY, t("notif.weekly_body"), nextWeekly(WEEKLY_DAY, WEEKLY_TIME), RepeatFrequency.WEEKLY);
    await AsyncStorage.setItem(IDS_MIGRATED_KEY, "1");
  } catch {
    // sessiz: göç başarısızsa kullanıcı en kötü ihtimalle hatırlatmayı elle açar
  }
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
    title: "Lernomi",
    body: t("notif.test_body"),
    android: { channelId: CHANNEL_ID, smallIcon: "ic_notification", pressAction: { id: "default" } },
    ios: IOS_SES,
  });
  return true;
}

/**
 * Bildirim izni "priming"i (§4 — elde tutmanın #1 kaldıracı).
 *
 * KALICI DEĞİL, ERTELENİR. Bayrak eskiden `"1"` yazılıyordu ve bir daha hiç
 * silinmiyordu: "Belki sonra"ya basan kullanıcıya günlük hatırlatma bir daha
 * HİÇ teklif edilmiyordu — oysa webde aynı kullanıcıya kart üç hafta sonra
 * yeniden geliyor (`components/push-optin` `DISMISS_KEY`). Elde tutmanın en
 * güçlü kaldıracı tek bir dokunuşla kalıcı olarak kapanıyordu.
 *
 * Bayrak artık bir ZAMAN DAMGASI ve pencere `PUSH_PRIME_SNOOZE_DAYS`
 * (web ile aynı sayı, tek kaynak `lib/profileDefaults`). Eski `"1"` de bir
 * sayıya çözülüyor (1 ms, yani 1970) — o kurulumlarda pencere dolmuş
 * sayılıyor ve soru bir kez daha geliyor; kaybedilen teklif geri veriliyor.
 *
 * İzin VERİLDİYSE soru zaten gelmiyor: hatırlatma kurulu olduğu sürece
 * `getReminder()` dolu döner ve pencere hiç okunmaz.
 */
const PRIMED_KEY = "lernomi:notif-primed";

export async function notifPrimeNeeded(): Promise<boolean> {
  try {
    if (await getReminder()) return false; // hatırlatma zaten varsa gerekmez
    const raw = await AsyncStorage.getItem(PRIMED_KEY);
    if (!raw) return true; // hiç sorulmamış
    const at = Number(raw);
    if (!Number.isFinite(at)) return true; // bozuk kayıt: sorulmamış say
    return at <= Date.now() - PUSH_PRIME_SNOOZE_DAYS * 86400000;
  } catch {
    return false;
  }
}

/** Soru soruldu — pencere bugünden başlıyor (kalıcı bayrak DEĞİL). */
export async function markNotifPrimed(): Promise<void> {
  try { await AsyncStorage.setItem(PRIMED_KEY, String(Date.now())); } catch { /* yut */ }
}
