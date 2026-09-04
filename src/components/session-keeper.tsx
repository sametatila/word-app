"use client";

import { useEffect } from "react";

/**
 * Oturumu ayakta tutan ve hesap değişiminde cihazı temizleyen görünmez bileşen.
 *
 * İki ayrı iş yapıyor, ikisi de "kullanıcı bir kere giriş yaptıysa bir daha
 * giriş yapmasın" cümlesinin parçası:
 *
 *   1. **Oturumu tazeleme.** Oturum jetonu çerezinin bir son kullanma tarihi
 *      var ve yukarıdaki auth sunucusu onu yalnızca oturum SORULDUĞUNDA
 *      uzatıyor. Uygulamanın normal akışında oturum, imzalı bir önbellek
 *      çerezinden okunuyor (hızlı yol) — yani asıl sunucuya haftalarca hiç
 *      gidilmiyor ve jeton, kullanıcı uygulamayı her gün açsa bile sessizce
 *      son kullanma tarihine yürüyor. Ana ekrana eklenmiş uygulamada bu,
 *      "birkaç günde bir yeniden giriş yapmak" olarak görünüyor.
 *
 *      Burada önbellek bilerek atlanıyor (`disableCookieCache`) ve oturum
 *      doğrudan sorulup çerez yeni son kullanma tarihiyle geri yazılıyor.
 *      Böylece oturum yuvarlanıyor: uygulamayı açmak oturumu uzatıyor.
 *
 *   2. **Hesap değişiminde temizlik.** Cihazda hesaba ait kopyalar var
 *      (kurs, ses, beceri ilerlemesi, yarım kalan ders, yazma taslakları).
 *      Başka bir hesapla giriş yapıldığında bunlar önceki kullanıcıya ait
 *      kalıyor ve yeni hesabın verisiyle karışıyordu. Kimlik değişince
 *      hesaba ait anahtarlar siliniyor; cihaza ait olanlar (tema, kurulum
 *      uyarısı) korunuyor — onlar hesabın değil telefonun tercihi.
 */

/** Son tazelemenin zamanı — her açılışta sunucuya gitmemek için. */
const REFRESHED_KEY = "lernomi-session-refreshed";
/** Cihazdaki kopyaların hangi hesaba ait olduğu. */
const ACCOUNT_KEY = "lernomi-account";

/**
 * İki tazeleme arası en kısa süre.
 *
 * Oturum uzatması gün ölçeğinde bir iş; her açılışta sormak gereksiz ağ
 * trafiği olurdu. Altı saat, günde birkaç kez açan kullanıcıda tek istek
 * demek ve jetonun ömrünün yanında fazlasıyla sık.
 */
const REFRESH_EVERY_MS = 6 * 60 * 60 * 1000;

/**
 * Hesaba ait cihaz anahtarlarının önekleri.
 *
 * Tema (`lernomi-theme`), kurulum/bildirim uyarılarının kapatılması
 * (`lernomi:*-dismissed`) ve ders anlatımının eller serbest tercihi bilerek
 * dışarıda: bunlar telefonun tercihi, hesabın değil.
 */
const ACCOUNT_SCOPED_PREFIXES = [
  "lernomi-course",
  "lernomi-voice",
  "lernomi-skills",
  "lernomi-lesson-progress",
  "lernomi-draft-",
  "lernomi-game",
  "lernomi-session-refreshed",
  // Başlangıç ekranının önbelleği (bkz. lib/use-cached): plan ve görevler
  // kişiye ait, ortak cihazda diğer hesaba görünmemeli.
  "lernomi:cache:",
];

function forgetPreviousAccount() {
  const doomed: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && ACCOUNT_SCOPED_PREFIXES.some((p) => key.startsWith(p))) doomed.push(key);
  }
  for (const key of doomed) localStorage.removeItem(key);
}

export function SessionKeeper({ userId }: { userId: string }) {
  useEffect(() => {
    // Temizlik, kurs/ses aynasının yazılmasından ÖNCE olmalı — bu bileşen
    // kabuğun içinde durduğu için etkisi kabuğunkinden önce çalışıyor.
    try {
      if (localStorage.getItem(ACCOUNT_KEY) !== userId) {
        forgetPreviousAccount();
        localStorage.setItem(ACCOUNT_KEY, userId);
      }
    } catch {
      /* depolama kapalıysa temizlenecek bir kopya da yok */
    }
  }, [userId]);

  useEffect(() => {
    const refresh = () => {
      let last = 0;
      try {
        last = Number(localStorage.getItem(REFRESHED_KEY) ?? 0);
      } catch {
        /* depolama kapalıysa her seferinde tazelenir; zararsız */
      }
      if (Date.now() - last < REFRESH_EVERY_MS) return;
      // Zaman damgası istekten ÖNCE yazılıyor: istek asılı kalırsa ya da
      // başarısız olursa aynı saniyede tekrar tekrar denenmesin.
      try {
        localStorage.setItem(REFRESHED_KEY, String(Date.now()));
      } catch {
        /* yok sayılır */
      }
      void fetch("/api/auth/get-session?disableCookieCache=true", {
        credentials: "same-origin",
        cache: "no-store",
      }).catch(() => {
        /* çevrimdışıysa oturum zaten duruyor; bir sonraki açılışta denenir */
      });
    };

    refresh();
    // Ana ekrana eklenmiş uygulama günlerce arka planda durabiliyor; öne
    // döndüğü an tazelemek, uygulamayı açmayı oturumu uzatan hareket yapıyor.
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [userId]);

  return null;
}
