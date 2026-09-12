"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Yarım kalan bir oturumdan AYRILMA onaya bağlanır — mobil
 * `lib/useBackConfirm.ts`ın web karşılığı.
 *
 * Android'de tur, modül sınavı, yerleştirme ve yürüyüş ekranlarında donanım
 * geri tuşu onay diyaloğuna bağlı ve o ekranlarda hiç gezinme yüzeyi yok
 * (yığın sayfası, sekme çubuğu çizilmiyor). Web'de ikisi de yoktu:
 *
 *  1. YENİLEME / SEKMEYİ KAPATMA / ADRES ÇUBUĞU. Süreli bir sınavın
 *     ortasında F5'e basmak cevapları sessizce bırakıyordu; tarayıcının
 *     "siteden ayrılınsın mı" kutusu ancak `beforeunload` dinleyicisi varsa
 *     çıkar ve hiçbir oyuncuda yoktu.
 *  2. UYGULAMANIN KENDİ GEZİNMESİ. Web'de kenar çubuğu HER `(app)` rotasında
 *     çiziliyor — turun ve sınavın içinde de. Oyuncunun iki santim ötedeki
 *     kapatma düğmesi "çıkılsın mı" diye soruyor, aynı ekranın solundaki
 *     "Profil" bağlantısı ise hiçbir şey sormadan çıkıyordu. Android'de o
 *     bağlantılar ekranda YOK, yani orada böyle bir kaçak yol da yok.
 *
 * Yakalama `capture` evresinde ve yalnız `active` iken: bağlantı tıklanınca
 * varsayılan durduruluyor, hedef `pending`e yazılıyor ve çağıran kendi onay
 * diyaloğunu açıyor. Onaylanırsa `leave()` yolculuğu sürdürüyor, vazgeçilirse
 * `stay()` işareti siliyor — kullanıcı turun içinde kalıyor.
 *
 * Tarayıcı geri tuşu (aynı belge içinde geçmişte geri gitme) BU KAPSAMDA
 * DEĞİL: onu durdurmak geçmişe sahte kayıt eklemekle olur ve o kayıt
 * kullanıcının geçmişinde kalıcı bir çöp bırakır. Ayrılmanın öteki üç yolu
 * (yenileme, sekme, uygulama içi bağlantı) kapandı.
 */
export function useLeaveGuard(active: boolean) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return undefined;

    const onUnload = (e: BeforeUnloadEvent) => {
      /* Metin YAZILMIYOR: tarayıcılar 2017'den beri kendi cümlesini
         kullanıyor ve verilen metni yok sayıyor. Gereken tek şey olayın
         iptal edilmesi. */
      e.preventDefault();
      e.returnValue = "";
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      // Yeni sekmede açma niyeti (Ctrl/Cmd/Shift/orta tuş) engellenmiyor:
      // o tıklama bu sayfadan ayrılmıyor.
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const hedef = e.target;
      if (!(hedef instanceof Element)) return;
      const a = hedef.closest("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Aynı sayfaya bağlantı (çapa) ayrılma değil.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      e.preventDefault();
      e.stopPropagation();
      setPending(url.pathname + url.search + url.hash);
    };

    
    window.addEventListener("beforeunload", onUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [active]);

  /* Yolculuk GUNCELLEYICININ ICINDE surdurulmuyor: React katı kipte
     guncelleyiciyi iki kez cagirabilir ve `router.push` iki kez calisirdi. */
  const leave = useCallback(() => {
    setPending(null);
    if (pending) router.push(pending);
  }, [pending, router]);

  return { pending, leave, stay: useCallback(() => setPending(null), []) };
}
