"use client";

import { useEffect, useState } from "react";
import { BellIcon } from "@/components/icons";
import {
  currentSubscription,
  iosNeedsInstall,
  permissionDenied,
  pushSupported,
  subscribeToPush,
  unsubscribeFromPush,
  vapidKey,
} from "@/lib/push-client";

/**
 * Profildeki hatırlatma anahtarı.
 *
 * Oturum sonundaki kart bir kez soruyor ve kapatılırsa üç hafta susuyor.
 * Kalıcı yer burası: sonradan açmak isteyenin ya da kapatmak isteyenin
 * arayacağı yer. Kapatma yolu olmayan bir bildirim, kullanıcının elinde
 * kalan tek çare olarak tarayıcı izninin tamamen reddedilmesini bırakır —
 * ve o karar geri alınamaz.
 */

type State = "loading" | "off" | "on" | "busy" | "unsupported" | "ios" | "denied";

export function PushSettings() {
  const [state, setState] = useState<State>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vapidKey) return setState("unsupported");
    if (iosNeedsInstall()) return setState("ios");
    if (!pushSupported()) return setState("unsupported");
    if (permissionDenied()) return setState("denied");
    void currentSubscription().then((sub) => setState(sub ? "on" : "off"));
  }, []);

  async function toggle() {
    const wasOn = state === "on";
    setState("busy");
    setError(null);
    try {
      if (wasOn) {
        await unsubscribeFromPush();
        setState("off");
      } else {
        // Profilden açarken deneme bildirimi göndermiyoruz: kullanıcı zaten
        // bu ekranda ve anahtarın durumunu görüyor.
        const ok = await subscribeToPush({ sendTest: false });
        if (!ok) {
          setState(permissionDenied() ? "denied" : "off");
          return;
        }
        setState("on");
      }
    } catch (err) {
      console.error("[push] ayar değiştirilemedi", err);
      setError("Değiştirilemedi. Birazdan tekrar dene.");
      setState(wasOn ? "on" : "off");
    }
  }

  if (state === "loading") return null;

  return (
    <section className="card p-5">
      <h2 className="mb-2 flex items-center gap-2 font-bold">
        <BellIcon size={18} /> Hatırlatmalar
      </h2>

      {state === "unsupported" ? (
        <p className="muted text-sm">
          Bu tarayıcı bildirim göndermeyi desteklemiyor. Uygulamayı ana ekrana ekleyip
          oradan açarsan çalışır.
        </p>
      ) : state === "ios" ? (
        <p className="muted text-sm">
          iPhone&apos;da bildirim yalnızca ana ekrana eklenmiş uygulamada çalışıyor. Yukarıdaki
          “Uygulama olarak kur” adımlarını izleyip uygulamayı oradan açtığında bu anahtar
          görünecek.
        </p>
      ) : state === "denied" ? (
        <p className="muted text-sm">
          Bildirim izni bu tarayıcıda reddedilmiş. Açmak için tarayıcının site ayarlarından
          Wortspiel&apos;e bildirim izni vermen gerekiyor.
        </p>
      ) : (
        <>
          <p className="muted text-sm">
            Çalışmadığın günlerde günde en fazla bir bildirim: serin tehlikedeyse ya da
            tekrar zamanı gelen kelimen varsa. Başka hiçbir şey için gönderilmez.
          </p>
          <button
            onClick={() => void toggle()}
            disabled={state === "busy"}
            className={`btn mt-3 px-4 py-2.5 text-sm disabled:opacity-60 ${
              state === "on" ? "btn-ghost" : "btn-primary"
            }`}
          >
            {state === "busy" ? "Bekle…" : state === "on" ? "Hatırlatmaları kapat" : "Hatırlatmaları aç"}
          </button>
          {state === "on" ? (
            <p className="mt-2 text-xs font-semibold" style={{ color: "var(--color-mint-500)" }}>
              Bu cihazda açık.
            </p>
          ) : null}
        </>
      )}

      {error ? (
        <p className="mt-2 text-xs font-semibold" style={{ color: "var(--color-flame-500)" }}>
          {error}
        </p>
      ) : null}
    </section>
  );
}
