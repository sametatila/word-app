"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { track, resetOnce } from "@/lib/track";
import { screenKey } from "@/lib/screens";

/**
 * Ekran ölçümü — uygulama kabuğuna bir kez takılır (WP-80).
 *
 * Dört soruya tek yerden cevap veriyor; her bileşene ayrı ayrı kanca koymak
 * yerine yol değişimini dinliyor:
 *
 *   page_view   hangi ekran açıldı (sekme dışı ekranlar dâhil — profil, kelimeler,
 *               sınav, ayarlar; alt gezinmeden çıkarıldıklarında "kimse
 *               açmıyor mu" sorusu ancak böyle cevaplanır)
 *   time_spent  ekranda GÖRÜNÜR geçen saniye; sekme arkaya atılınca sayaç durur,
 *               ekran değişince ya da sayfa kapanırken yazılır (keepalive)
 *   app_open    günün ilk açılışı: platform ve görünüm (ana ekrana eklenmiş mi)
 *   client_error yakalanmamış hata / reddedilmiş promise — dakikada en çok bir
 *
 * Üç saniyeden kısa kalışlar yazılmıyor: yanlışlıkla dokunulan sekme veri
 * değil gürültüdür.
 */
const MIN_SECONDS = 3;
const ERROR_THROTTLE_MS = 60_000;
const OPEN_KEY = "nomi-app-open";

export function Telemetry() {
  const pathname = usePathname();
  const screen = useRef(screenKey(pathname));
  const visibleSince = useRef<number | null>(null);
  const acc = useRef(0);

  useEffect(() => {
    const flush = () => {
      if (visibleSince.current !== null) {
        acc.current += (Date.now() - visibleSince.current) / 1000;
        visibleSince.current = null;
      }
      const seconds = Math.round(acc.current);
      acc.current = 0;
      if (seconds >= MIN_SECONDS) track("time_spent", seconds, screen.current);
    };
    const resume = () => {
      if (document.visibilityState === "visible" && visibleSince.current === null) visibleSince.current = Date.now();
    };
    const pause = () => {
      if (visibleSince.current !== null) {
        acc.current += (Date.now() - visibleSince.current) / 1000;
        visibleSince.current = null;
      }
    };
    const onVisibility = () => (document.visibilityState === "visible" ? resume() : pause());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    resume();
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);

  // Ekran değişti: öncekinin süresini yaz, yenisini say.
  useEffect(() => {
    const next = screenKey(pathname);
    if (next !== screen.current) {
      if (visibleSince.current !== null) {
        acc.current += (Date.now() - visibleSince.current) / 1000;
        visibleSince.current = document.visibilityState === "visible" ? Date.now() : null;
      }
      const seconds = Math.round(acc.current);
      acc.current = 0;
      if (seconds >= MIN_SECONDS) track("time_spent", seconds, screen.current);
      screen.current = next;
    }
    resetOnce();
    track("page_view", 0, next);
  }, [pathname]);

  // Nereden gelindi: bildirim (`src=push`, sw.js ekler) ya da davet bağlantısı.
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      if (q.get("src") === "push") track("push_open");
      if (q.has("invite") || q.get("src") === "invite") track("invite_open");
    } catch {
      /* yoksay */
    }
  }, []);

  // Günün ilk açılışı — cihaz karışımı.
  useEffect(() => {
    try {
      const d = new Date();
      const day = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (localStorage.getItem(OPEN_KEY) === day) return;
      localStorage.setItem(OPEN_KEY, day);
    } catch {
      /* depolama kapalı: her açılış yazılır, yine de bilgi */
    }
    const ua = navigator.userAgent;
    const platform = /iPad|iPhone|iPod/.test(ua) ? "ios" : /Android/.test(ua) ? "android" : "desktop";
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
    track("app_open", window.innerWidth, `${platform}:${standalone ? "standalone" : "browser"}`);
  }, []);

  // Yakalanmamış hatalar.
  useEffect(() => {
    let last = 0;
    const report = () => {
      const now = Date.now();
      if (now - last < ERROR_THROTTLE_MS) return;
      last = now;
      track("client_error", 0, screen.current);
    };
    const onError = (e: ErrorEvent) => {
      // Uzantı ve çapraz kaynak betiklerinin "Script error." gürültüsü değil.
      if (!e.message || /^Script error/.test(e.message) || /ResizeObserver loop/.test(e.message)) return;
      report();
    };
    const onReject = () => report();
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onReject);
    };
  }, []);

  // Katlı bölümler: aria-expanded taşıyan düğmeye dokunuş. Anahtar
  // `data-panel`ten; yoksa bilinen başlıklardan (sahibin bileşenlerine
  // dokunmadan ölçmek için — yeni bölüm eklerken data-panel ver).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("[aria-expanded]") as HTMLElement | null;
      if (!el) return;
      const key = el.dataset.panel ?? panelKeyFromText(el.textContent ?? "");
      if (!key) return;
      track("panel_open", el.getAttribute("aria-expanded") === "true" ? 0 : 1, key);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

const PANEL_TEXT: [RegExp, string][] = [
  [/Nerede zayıfım|Ayrıntıyı kapat/, "weak_detail"],
  [/Tek oyuna odaklan/, "single_game"],
  [/Sıradaki|SIRADAKİ/, "plan"],
  [/İlerleme|Pekişen|grafik/i, "words_progress"],
];

function panelKeyFromText(text: string): string | null {
  const t = text.trim();
  if (!t) return null;
  for (const [re, key] of PANEL_TEXT) if (re.test(t)) return key;
  return null;
}
