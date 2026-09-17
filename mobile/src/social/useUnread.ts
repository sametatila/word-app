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

function pull() {
  if (!enabled || AppState.currentState !== "active") return;
  social.unreadCount().then((r) => setUnreadGlobal(r.unread)).catch(() => undefined);
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
