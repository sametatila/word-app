"use client";

/**
 * Paylaşılan WebAudio bağlamı.
 *
 * İki tüketicisi var: dersin işitsel işaretleri (lib/lessons/cues) ve ders
 * seslendirmesinin boşluksuz oynatıcısı (components/speak-button). Tarayıcılar
 * sekme başına bağlam sayısını sınırladığı için ikisinin ayrı bağlam açması
 * hem israf hem risk olurdu.
 *
 * Bağlam kullanıcı hareketi olmadan askıda başlayabilir; ilk harekette
 * uyandırılıyor ve her erişimde uyandırma yeniden deneniyor. Çağıran taraf
 * `state === "running"` kontrolünü kendi yapmalı: askıdaki bağlama iş
 * planlamak, ses hiç açılmazsa sonsuza dek bekleyen bir zincir bırakır.
 */

let ctx: AudioContext | null = null;

export function sharedAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === "suspended") void ctx.resume().catch(() => {});
  return ctx;
}

if (typeof window !== "undefined") {
  // `once` YOK ve `touchend`/`click` de dinleniyor.
  //
  // İki sebep: (1) WebKit medya/ses etkinleşmesini `pointerdown` ile değil
  // `touchend`/`click` ile veriyor; (2) bağlam bir kez uyandıktan SONRA da
  // yeniden askıya alınabiliyor — yüklü PWA arka plana atıldığında ya da bir
  // telefon/çağrı kesintisinde. Dinleyici kaldırılmış olsaydı ses o oturumda
  // bir daha hiç açılmazdı.
  const wake = () => {
    const ctx = sharedAudioContext();
    if (ctx && ctx.state === "running") {
      for (const ev of EVENTS) window.removeEventListener(ev, wake);
    }
  };
  const EVENTS = ["touchend", "click", "keydown", "pointerup"] as const;
  for (const ev of EVENTS) window.addEventListener(ev, wake);

  // Uygulama öne döndüğünde bağlam askıdaysa uyandırma yeniden armanmalı:
  // PWA arka plandan geldiğinde ilk dokunuş yine sesi açsın.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    if (ctx && ctx.state !== "running") {
      for (const ev of EVENTS) window.addEventListener(ev, wake);
    }
  });
}
