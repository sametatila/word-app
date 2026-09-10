"use client";

import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget'ı (web).
 *
 * Sunucu, kayıt/giriş/sıfırlama uçlarında `x-captcha-response` başlığını ŞART
 * koşuyor (bkz. lib/auth/captcha.ts) — bu bileşen o başlığın içeriğini
 * üretiyor. Anahtar tanımlı değilken sayfa bileşeni hiç çizmiyor ve sunucu da
 * başlığı hiç aramıyor: ikisi tek env değişkenine bağlı.
 *
 * JETON TEK KULLANIMLIK. Gönderim bittiğinde (başarılı ya da değil) widget
 * sıfırlanmalı, yoksa ikinci deneme harcanmış bir jetonla gidiyor ve 403
 * alıyor. Sıfırlama `resetSignal` üzerinden: ana bileşen sayacı artırıyor.
 */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    onloadTurnstileCallback?: () => void;
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Betik sayfa başına BİR kez yükleniyor; iki form aynı anda açık olabilir. */
let scriptReady: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (scriptReady) return scriptReady;
  scriptReady = new Promise<void>((resolve, reject) => {
    if (window.turnstile) return resolve();
    window.onloadTurnstileCallback = () => resolve();
    const el = document.createElement("script");
    el.src = SCRIPT_SRC;
    el.async = true;
    el.defer = true;
    el.onerror = () => reject(new Error("turnstile script failed"));
    document.head.appendChild(el);
  });
  return scriptReady;
}

export function Turnstile({
  siteKey,
  action,
  resetSignal,
  onToken,
}: {
  siteKey: string;
  action: string;
  resetSignal: number;
  onToken: (token: string | null) => void;
}) {
  const box = useRef<HTMLDivElement | null>(null);
  const widget = useRef<string | null>(null);
  /*
    Geri çağrı her render'da yeni bir işlev oluyor; efektin bağımlılığına
    girseydi widget her tuş vuruşunda yeniden kurulurdu. Referansta tutulup
    efektin dışında güncelleniyor.
  */
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    let alive = true;
    void loadScript()
      .then(() => {
        if (!alive || !box.current || !window.turnstile || widget.current) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: siteKey,
          action,
          theme: "auto",
          callback: (token: string) => cb.current(token),
          "expired-callback": () => cb.current(null),
          "error-callback": () => {
            cb.current(null);
            // `true`: hatayı Turnstile'ın kendi arayüzü göstersin, sayfa çökmesin.
            return true;
          },
        });
      })
      .catch(() => {
        /* Betik gelmediyse jeton da gelmiyor; gönderim düğmesi kapalı kalır. */
      });
    return () => {
      alive = false;
      const id = widget.current;
      widget.current = null;
      if (id !== null && window.turnstile) {
        try { window.turnstile.remove(id); } catch { /* zaten gitmiş */ }
      }
    };
  }, [siteKey, action]);

  useEffect(() => {
    // İlk render'da sıfırlama yok: sayaç 0'ken widget zaten taze.
    if (resetSignal === 0) return;
    const id = widget.current;
    if (id !== null && window.turnstile) {
      cb.current(null);
      try { window.turnstile.reset(id); } catch { /* widget kaldırılmış */ }
    }
  }, [resetSignal]);

  return <div ref={box} className="flex justify-center" />;
}
