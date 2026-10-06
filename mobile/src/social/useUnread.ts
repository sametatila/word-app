import { useEffect, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import { social } from "../api/social";
import { useAuth } from "../lib/AuthContext";

/**
 * Okunmamış bildirim sayısı — push izni reddedilmiş olabileceği için gelen kutusu
 * ayrıca yoklanıyor. Rozet kişiye özel sayıdır.
 *
 * TEK YOKLAYICI. Eskiden kancayı kullanan HER bileşen (her ekranın başlığındaki
 * zil) kendi dakikalık zamanlayıcısını kuruyordu ve uygulama arka plandayken
 * de sayıyordu: ölçümde tek bir cihaz 14 günde 5.584 istek atmıştı
 * (2026-09-17). Artık modül düzeyinde tek zamanlayıcı, abone sayısıyla
 * açılıp kapanıyor, yalnız uygulama ÖN PLANDAYKEN çalışıyor ve yalnız sayıyı
 * istiyor (`?only=unread`).
 */

/** Web `notification-bell` ile AYNI AD ve değer (parite: ortak sayısal sabitler). */
export const UNREAD_POLL_MS = 300000;

const listeners = new Set<(n: number) => void>();
let last = 0;
let timer: ReturnType<typeof setInterval> | null = null;
let appSub: { remove: () => void } | null = null;
let enabled = false;

export function setUnreadGlobal(n: number) {
  last = n;
  for (const l of listeners) l(n);
}

let lastPull = 0;
function pull() {
  if (!enabled || AppState.currentState !== "active") return;
  lastPull = Date.now();
  social.unreadCount().then((r) => setUnreadGlobal(r.unread)).catch(() => undefined);
}

/**
 * SAYAÇ GEÇ KALIYORDU (Samet, 2026-10-07): uygulama açıkken düşen bildirim (şikâyet
 * sonucu push'suz; sürüm beklemesi onu tam açılışta, ilk sayımdan SONRA yazıyor) beş
 * dakikalık yoklamaya kadar zilde görünmüyordu. Zilli bir ekrana gelince ve ön planda
 * push gelince yeniden sorulur; art arda ekran geçişinde en çok 20 sn'de bir.
 */
export const UNREAD_REFRESH_MIN_MS = 20000;
export function refreshUnread(force = false): void {
  if (!force && Date.now() - lastPull < UNREAD_REFRESH_MIN_MS) return;
  pull();
}

function start() {
  if (timer) return;
  pull();
  timer = setInterval(pull, UNREAD_POLL_MS);
  appSub = AppState.addEventListener("change", (s: AppStateStatus) => {
    if (s === "active") pull();
  });
}

function stop() {
  if (timer) clearInterval(timer);
  timer = null;
  appSub?.remove();
  appSub = null;
}

export function useUnread(): number {
  const { user } = useAuth();
  const [n, setN] = useState(last);
  const account = Boolean(user && !user.guest);

  useEffect(() => {
    // Bildirim kutusu hesaba bağlı: misafirde sorulmuyor (sunucu 403 dönerdi).
    enabled = account;
    if (!account) setUnreadGlobal(0);
    listeners.add(setN);
    if (account) start();
    return () => {
      listeners.delete(setN);
      if (listeners.size === 0) stop();
    };
  }, [account]);

  return n;
}
