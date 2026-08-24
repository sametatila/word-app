"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Sayfa geçişlerinde üstte ince bir ilerleme çizgisi.
 * Uygulama içi bir bağlantıya tıklanınca başlar, yeni yol yüklendiğinde biter —
 * böylece tıklama ile içeriğin gelmesi arasındaki boşlukta ekran ölü kalmaz.
 */
export function TopProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function start() {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      setVisible(true);
      setValue(12);
      if (timer.current) clearInterval(timer.current);
      // Gerçek ilerlemeyi bilemeyiz; sona yaklaşırken yavaşlayarak ilerler.
      timer.current = setInterval(() => {
        setValue((v) => (v >= 90 ? v : v + Math.max(0.6, (92 - v) / 12)));
      }, 120);
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");
      if (!href || !href.startsWith("/") || (target && target !== "_self")) return;
      if (href === window.location.pathname + window.location.search) return;
      start();
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => {
      document.removeEventListener("click", onClick, { capture: true });
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  // Yol değişti: çizgiyi tamamla ve gizle.
  useEffect(() => {
    if (!visible) return;
    if (timer.current) clearInterval(timer.current);
    setValue(100);
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      setValue(0);
    }, 320);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-50 h-[3px]"
      style={{
        // Ana ekrana eklenmiş uygulamada sayfanın en üstü durum çubuğunun
        // altında kalıyor; çizgiyi güvenli alanın hemen altına indiriyoruz,
        // yoksa hiç görünmüyor.
        top: "env(safe-area-inset-top, 0px)",
        opacity: visible ? 1 : 0,
        transition: "opacity .25s ease",
      }}
    >
      <div
        className="brand-gradient h-full"
        style={{
          width: `${value}%`,
          transition: "width .18s ease-out",
          boxShadow: "0 0 8px color-mix(in srgb, var(--color-brand) 60%, transparent)",
        }}
      />
    </div>
  );
}
