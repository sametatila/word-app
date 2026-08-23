"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Ekranı uyanık tutma.
 *
 * Yürürken modunun asıl sorunu buydu: telefon kilitlenince tarayıcının
 * konuşma tanıyıcısı susuyor, ama tur devam ediyordu. Her tur anında
 * "duyamadım"a düşüyor ve yirmi turluk oturum kullanıcı hiçbir şey duymadan
 * saniyeler içinde tükeniyordu.
 *
 * Tarayıcıda arka planda konuşma tanıma YOK — bu bir eksik değil, bilinçli bir
 * platform kısıtı (kilitli telefonda dinleyen bir sekme, mikrofonu görünmez
 * biçimde açık tutmak demek). Dolayısıyla tek dürüst çözüm ekranın kapanmasını
 * engellemek.
 *
 * Kilit sayfa görünmez olduğunda tarayıcı tarafından KENDİLİĞİNDEN bırakılıyor;
 * geri dönüldüğünde yeniden alınması gerekiyor. `visibilitychange` dinleyicisi
 * bunu yapıyor — yoksa kullanıcı başka bir uygulamaya bakıp döndüğünde ekran
 * bir daha kilitlenmeye devam ederdi.
 *
 * Desteklenmeyen tarayıcıda sessizce hiçbir şey yapmıyor: mod yine çalışıyor,
 * yalnızca ekranı açık tutmak kullanıcıya kalıyor.
 */

type SentinelLike = { released: boolean; release: () => Promise<void> };

export function useWakeLock() {
  const lock = useRef<SentinelLike | null>(null);
  /** Kilit İSTENİYOR mu — görünürlük dönüşünde yeniden alınsın mı diye. */
  const wanted = useRef(false);

  const acquire = useCallback(async () => {
    wanted.current = true;
    const nav = navigator as Navigator & {
      wakeLock?: { request: (type: "screen") => Promise<SentinelLike> };
    };
    if (!nav.wakeLock || lock.current) return;
    try {
      lock.current = await nav.wakeLock.request("screen");
    } catch {
      /* pil tasarrufu açıkken ya da izin verilmediğinde reddedilebilir */
    }
  }, []);

  const release = useCallback(async () => {
    wanted.current = false;
    const held = lock.current;
    lock.current = null;
    try {
      if (held && !held.released) await held.release();
    } catch {
      /* zaten bırakılmış olabilir */
    }
  }, []);

  useEffect(() => {
    const onVisible = () => {
      // Sayfa görünmez olduğunda tarayıcı kilidi kendi bırakıyor; elimizdeki
      // referans "released" hâle geliyor ve yeniden istenmesi gerekiyor.
      if (document.visibilityState === "visible" && wanted.current) {
        lock.current = null;
        void acquire();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      void release();
    };
  }, [acquire, release]);

  return { acquire, release };
}

/** Tarayıcı ekranı uyanık tutmayı destekliyor mu — arayüz bunu söyleyebilsin. */
export function wakeLockSupported(): boolean {
  return typeof navigator !== "undefined" && "wakeLock" in navigator;
}
