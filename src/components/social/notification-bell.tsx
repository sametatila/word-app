"use client";

import Link from "next/link";
import { apiFetch } from "@/lib/api-fetch";
import { useEffect, useState } from "react";
import { InboxIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Başlıktaki zil: okunmamış sayısı. Dakikada bir ve sekme görünür olunca
 * tazelenir; gelen kutusu açılınca `lernomi:inbox-read` ile sıfırlanır. Sayı 9'u
 * geçince "9+" — rozet genişleyip başlığı itmesin.
 *
 * Hedefi `/inbox`: rozet gelen kutusunun sayacı ve artık gelen kutusunun kendi
 * adresi var. Önce `/notifications`e gidiyordu — orası bildirim AYARLARI değil
 * ama aynı listeyi ikinci kez çiziyordu; mobilde zil `InboxScreen`e götürüyor.
 *
 * İKON VE KAP ANDROID'İN (`social/InboxBell`): gelen kutusu ikonu 44'lük bir
 * `surface-2` karonun içinde. Web zil ikonu kullanıyordu ve düğme 32 piksel,
 * kapsız, soluk renkteydi — hem başlıktaki öteki iki hedefle (seri rozeti,
 * avatar) aynı ağırlıkta değildi hem de 44'lük dokunma hedefinin altındaydı.
 * Zil ikonu ayrıca yanlış şeyi söylüyor: burası hatırlatma ayarı değil, gelen
 * kutusu.
 */
export function NotificationBell({ className = "" }: { className?: string }) {
  const t = useT();
  const [unread, setUnread] = useState(0);
  useEffect(() => {
    let alive = true;
    const fetchCount = async () => {
      try {
        const res = await apiFetch("/api/social/notifications?cursor=", { cache: "no-store", credentials: "same-origin" });
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
    <Link
      href="/inbox"
      prefetch={false}
      aria-label={unread ? t("inbox.bell_unread", { n: unread }) : t("inbox.bell")}
      className={`pressable relative flex h-11 w-11 shrink-0 items-center justify-center ${className}`}
      style={{ borderRadius: "var(--radius-tile)", background: "var(--surface-2)", color: "var(--text)" }}
    >
      <InboxIcon size={20} />
      {unread > 0 ? (
        <span
          className="absolute -right-[3px] -top-[3px] min-w-[18px] rounded-full px-1 text-center text-micro leading-[18px]"
          /* Sayaç rozeti: parlak kehribar zemin + mürekkep yazı (6.04).
             Beyaz yazı açık temada 5.20 veriyordu ama koyu temada
             `--color-flame` 300'e düşüyor ve 1.49'a iniyordu - okunmuyordu. */
          style={{ background: "var(--color-flame-500)", color: "var(--color-ink-900)" }}
        >
          {unread > 9 ? "9+" : unread}
        </span>
      ) : null}
    </Link>
  );
}
