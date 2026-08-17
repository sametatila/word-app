/**
 * Tarayıcı tarafındaki push abonelik işleri.
 *
 * Hem oturum sonundaki izin kartı hem profildeki anahtar aynı adımları
 * yürütüyor (service worker'ı kaydet, izin iste, abone ol, sunucuya bildir).
 * İki kopya olduğunda birinde yapılan düzeltme diğerine geçmiyordu.
 */

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? "";

/** iPhone'da web push yalnızca ana ekrana eklenmiş uygulamada çalışır. */
export function iosNeedsInstall() {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  const isIos = /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true;
  return isIos && !standalone;
}

export function pushSupported() {
  return (
    typeof window !== "undefined" &&
    Boolean(vapidKey) &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

/** İzin bir kez reddedildiyse tarayıcı ayarları dışında geri açılamaz. */
export function permissionDenied() {
  return pushSupported() && Notification.permission === "denied";
}

export async function currentSubscription(): Promise<PushSubscription | null> {
  if (!pushSupported()) return null;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    return (await reg?.pushManager.getSubscription()) ?? null;
  } catch {
    return null;
  }
}

/**
 * Abone olur ve sunucuya kaydeder.
 *
 * `sendTest` verildiğinde izin alındığı anda tek bir bildirim gidiyor: bu bir
 * gösteri değil, kullanıcının neye evet dediğini yarın değil şimdi görmesi.
 */
export async function subscribeToPush({ sendTest = true } = {}): Promise<boolean> {
  if (!pushSupported()) return false;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return false;

  const reg = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
  await navigator.serviceWorker.ready;

  // Zaten abonelik varsa yeniden abone olmak gereksiz; sunucuya bildirmek ise
  // gerekli — kullanıcı hesabı değişmiş ya da kayıt düşmüş olabilir.
  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey) as BufferSource,
    }));

  const json = sub.toJSON() as { endpoint?: string; keys?: Record<string, string> };
  const res = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      endpoint: json.endpoint,
      keys: json.keys,
      // Sunucu "bugün çalışmadın" kararını kullanıcının kendi gününe göre
      // vermeli; saat dilimini yalnızca tarayıcı biliyor.
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  });
  if (!res.ok) throw new Error(`abonelik kaydedilemedi (${res.status})`);

  if (sendTest) void fetch("/api/push/subscribe", { method: "PUT" });
  return true;
}

/**
 * Aboneliği kaldırır.
 *
 * Sıra önemli: önce sunucu, sonra tarayıcı. Tersi olsaydı ve sunucu isteği
 * düşseydi, tarayıcıda aboneliği kalmayan bir kullanıcıya sunucu bildirim
 * göndermeye devam ederdi — kapatılamayan bir bildirim.
 */
export async function unsubscribeFromPush(): Promise<void> {
  const sub = await currentSubscription();
  await fetch("/api/push/subscribe", {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ endpoint: sub?.endpoint ?? null }),
  });
  await sub?.unsubscribe().catch(() => null);
}
