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
  const wake = () => {
    sharedAudioContext();
    window.removeEventListener("pointerdown", wake);
    window.removeEventListener("keydown", wake);
  };
  window.addEventListener("pointerdown", wake, { once: true });
  window.addEventListener("keydown", wake, { once: true });
}
