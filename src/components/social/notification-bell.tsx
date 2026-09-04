"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BellIcon } from "@/components/icons";

/**
 * Başlıktaki zil: okunmamış sayısı. Dakikada bir ve sekme görünür olunca
 * tazelenir; gelen kutusu açılınca `nomi:inbox-read` ile sıfırlanır. Sayı 9'u
 * geçince "9+" — rozet genişleyip başlığı itmesin.
 */
export function NotificationBell({ className = "" }: { className?: string }) {
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    let alive = true;
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/social/notifications?cursor=", { cache: "no-store", credentials: "same-origin" });
        if (!res.ok) return;
        const data = (await res.json()) as { unread?: number };
        if (alive) setUnread(data.unread ?? 0);
      } catch {
        /* ağ yoksa rozet eski kalır */
      }
    };
    void fetchCount();
    const timer = setInterval(() => void fetchCount(), 60_000);
    const onVisible = () => {
      if (document.visibilityState === "visible") void fetchCount();
    };
    const onRead = () => setUnread(0);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("lernomi:inbox-read", onRead);
    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("lernomi:inbox-read", onRead);
    };
  }, []);
  return (
    <Link href="/notifications" prefetch={false} aria-label={unread ? `Bildirimler, ${unread} okunmamış` : "Bildirimler"} className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${className}`}>
      <BellIcon size={20} />
      {unread > 0 ? (
        <span
          className="absolute -right-0.5 -top-0.5 min-w-[16px] rounded-full px-1 text-center text-[10px] font-black leading-4"
          style={{ background: "var(--color-flame)", color: "#fff" }}
        >
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}
