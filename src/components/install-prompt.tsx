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
      dismissed = localStorage.getItem(DISMISS_KEY) === "1";
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
      localStorage.setItem(DISMISS_KEY, "1");
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
            <span className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
              <LogoMark size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold">Ana ekrana ekle</p>
              <p className="muted mt-0.5 text-xs">
                {iosHint
                  ? "Paylaş düğmesine dokun, ardından “Ana Ekrana Ekle”yi seç."
                  : "Uygulama gibi tam ekran açılır, tek dokunuşla girersin."}
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
