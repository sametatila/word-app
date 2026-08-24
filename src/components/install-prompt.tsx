"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, LogoMark } from "@/components/icons";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DISMISS_KEY = "wortspiel:install-dismissed";

/**
 * Kapatmanın ömrü.
 *
 * Önce süresizdi: bir kez "hayır" diyen kullanıcı öneriyi bir daha hiç
 * görmüyordu ve uygulamayı elle nasıl kuracağını da bilmiyordu. Artık öneri
 * bir süre sonra geri geliyor; ayrıca adımlar ana sayfada ve profilde kalıcı
 * olarak duruyor (bkz. install-guide.tsx), yani bu bildirim tek yol değil.
 */
const DISMISS_DAYS = 21;

/**
 * "Ana ekrana ekle" önerisi.
 * Android/Chrome'da tarayıcının kendi kurulum akışını tetikler; iOS'ta tarayıcı
 * böyle bir API sunmadığı için adımlar yazıyla anlatılır. Zaten uygulama olarak
 * açılmışsa ya da kullanıcı kapattıysa görünmez.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [iosHint, setIosHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    let dismissed = false;
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      // Eski sürüm "1" yazıyordu; o kayıt da süresi dolmuş sayılıyor.
      const at = raw && raw !== "1" ? Number(raw) : 0;
      dismissed = raw === "1" ? false : at > Date.now() - DISMISS_DAYS * 86400000;
    } catch {
      /* depolama kapalı olabilir */
    }
    if (standalone || dismissed) return;

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);

    // iOS Safari: beforeinstallprompt yok, elle anlatmak gerekiyor.
    const ua = window.navigator.userAgent;
    const isIos = /iPad|iPhone|iPod/.test(ua) && !/CriOS|FxiOS/.test(ua);
    if (isIos) {
      const t = setTimeout(() => {
        setIosHint(true);
        setVisible(true);
      }, 4000);
      return () => {
        clearTimeout(t);
        window.removeEventListener("beforeinstallprompt", onPrompt);
      };
    }
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function close() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      /* yoksay */
    }
  }

  async function install() {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice.catch(() => null);
    close();
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="safe-bottom fixed inset-x-3 bottom-16 z-40 md:bottom-4 md:left-auto md:right-4 md:w-80"
        >
          <div className="card flex items-start gap-3 p-3.5 shadow-lg">
            <LogoMark size={40} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Ana ekrana ekle</p>
              <p className="muted mt-0.5 text-xs">
                {iosHint
                  ? "Paylaş düğmesine dokun, ardından “Ana Ekrana Ekle”yi seç."
                  : "Uygulama gibi tam ekran açılır, tek dokunuşla girersin."}
              </p>
              <p className="muted mt-1 text-[11px]">
                Adımların tamamı Profil → “Uygulama olarak kur” altında duruyor.
              </p>
              {!iosHint ? (
                <button onClick={() => void install()} className="btn btn-primary mt-2.5 px-4 py-2 text-xs">
                  Ekle
                </button>
              ) : null}
            </div>
            <button
              onClick={close}
              aria-label="Kapat"
              className="muted shrink-0 rounded-lg p-1 hover:text-[color:var(--text)]"
            >
              <XIcon size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
