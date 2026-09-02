import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { social } from "../api/social";
import { useAuth } from "../lib/AuthContext";

/**
 * Okunmamış bildirim sayısı — mobilde uzak push olmadığı için gelen kutusu
 * dakikada bir ve uygulama öne gelince çekilir. Rozet kişiye özel sayıdır.
 */
let listeners = new Set<(n: number) => void>();
let last = 0;
export function setUnreadGlobal(n: number) {
  last = n;
  for (const l of listeners) l(n);
}

export function useUnread(): number {
  const { user } = useAuth();
  const [n, setN] = useState(last);
  useEffect(() => {
    listeners.add(setN);
    return () => { listeners.delete(setN); };
  }, []);
  useEffect(() => {
    if (!user) { setUnreadGlobal(0); return; }
    let alive = true;
    const pull = () => social.notifications().then((r) => { if (alive) setUnreadGlobal(r.unread); }).catch(() => undefined);
    void pull();
    const timer = setInterval(pull, 60_000);
    const sub = AppState.addEventListener("change", (s) => { if (s === "active") void pull(); });
    return () => { alive = false; clearInterval(timer); sub.remove(); };
  }, [user]);
  return n;
}
