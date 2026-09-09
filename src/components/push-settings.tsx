"use client";

import { useEffect, useState } from "react";
import { SettingRow, Switch } from "@/components/setting-row";
import {
  currentSubscription,
  iosNeedsInstall,
  permissionDenied,
  pushSupported,
  subscribeToPush,
  unsubscribeFromPush,
  vapidKey,
} from "@/lib/push-client";
import { useT } from "@/lib/i18n/client";

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

export function PushSettings({
  bare = false,
  onState,
}: {
  bare?: boolean;
  /**
   * İzin durumu değiştiğinde haber verir.
   *
   * Bildirimler ekranındaki üç hatırlatma anahtarı buna bakıyor: izin yokken
   * onları göstermek, çevrildiğinde hiçbir şey yapmayan bir düğme göstermek
   * olurdu.
   */
  onState?: (on: boolean) => void;
} = {}) {
  const t = useT();
  const [state, setState] = useState<State>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!vapidKey) return setState("unsupported");
    if (iosNeedsInstall()) return setState("ios");
    if (!pushSupported()) return setState("unsupported");
    if (permissionDenied()) return setState("denied");
    void currentSubscription().then((sub) => setState(sub ? "on" : "off"));
  }, []);

  useEffect(() => {
    if (state === "loading" || state === "busy") return;
    onState?.(state === "on");
  }, [state, onState]);

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
      setError(t("pushw.change_failed"));
      setState(wasOn ? "on" : "off");
    }
  }

  if (state === "loading") return null;

  /*
    Engelli durumlarda metin bir açıklama değil, bir TALİMAT: kullanıcı bu
    anahtarı arıyor ve bulamıyor, tek merak ettiği ne yapması gerektiği.
    Sebep kısmı ("bu tarayıcı desteklemiyor", "izin reddedilmiş") atıldı —
    durum zaten anahtarın olmamasından belli; geriye yapılacak iş kaldı.
  */
  const blocked =
    state === "unsupported"
      ? t("pushw.add_to_home")
      : state === "ios"
        ? t("pushw.follow_install")
        : state === "denied"
          ? t("pushw.allow_in_browser")
          : null;

  /* `bare`: kendi kartını bırakıp uygulama ayarları kartının bir bölümü oluyor. */
  const body = (
    <div>
      <SettingRow
        title={t("notif.channel")}
        // Açıkken kaç bildirim geleceği yazıyla söylenmesi GEREKEN şey: izni
        // veren kişinin tek sorusu bu ve deneyerek öğrenilmiyor.
        sub={blocked ?? t("pushw.one_a_day")}
      >
        {blocked ? null : (
          <Switch
            on={state === "on"}
            onChange={() => void toggle()}
            disabled={state === "busy"}
            label={t("notif.channel")}
          />
        )}
      </SettingRow>
      {error ? (
        <p className="px-4 pb-3 text-xs font-semibold" style={{ color: "var(--color-flame)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );

  return bare ? body : <section className="card">{body}</section>;
}
