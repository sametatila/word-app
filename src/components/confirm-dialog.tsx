"use client";

import { useEffect, useRef, useId } from "react";
import { useT } from "@/lib/i18n/client";

/**
 * Onay diyaloğu — tarayıcının `confirm()`ü yerine uygulamanın kendi kartı.
 *
 * Mobilde bu bileşen (`M/src/ui/ConfirmDialog.tsx`) yıkıcı her eylemin
 * önünde duruyor; web'de böyle bir şey yoktu ve yıkıcı eylemler ya doğrudan
 * ya da tarayıcının sistem kutusuyla soruluyordu. Sistem kutusunun iki sorunu
 * var: uygulamanın diline ve tasarımına ait değil, ve iOS'ta "İptal"in yeri
 * bizim düzenimizin tersi — yani kas hafızası yanlış düğmeye basıyor.
 *
 * `<dialog>` ÜSTÜNDE kuruluyor: odak tuzağı, Esc ile kapanma ve arka planın
 * etkisizleşmesi tarayıcının kendi işi. Elle yazılmış bir modalda bu üçü de
 * ayrı ayrı unutulan şeyler.
 */
/** Düğme etiketi bundan uzunsa iki düğme alt alta — mobil
 *  `lib/useLayout` `DIALOG_INLINE_LABEL_MAX` ile aynı sayı (`check:parity`). */
const INLINE_LABEL_MAX = 16;

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel,
  destructive,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  /* DİYALOĞUN ADI. `<dialog>` açıldığında ekran okuyucu "diyalog" diyor ama
     ADINI söylemiyordu: kutunun ne sorduğu yalnız içeriği okunmaya
     başlayınca anlaşılıyordu. Başlık zaten ekranda; `aria-labelledby` onu
     kutunun adı yapıyor. Mobil karşılığı `accessibilityRole="alert"` +
     etiket (bkz. `ui/ConfirmDialog`). */
  const basligId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const t = useT();
  const vazgec = cancelLabel ?? t("common.discard");
  const onay = confirmLabel ?? t("common.confirm");
  /* UZUN ETİKETTE ALT ALTA — mobil `ConfirmDialog` ile aynı kural: yarım
     genişlikte uzun etiket iki satıra kırılıyordu. */
  const altAlta = vazgec.length > INLINE_LABEL_MAX || onay.length > INLINE_LABEL_MAX;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={basligId}
      onCancel={(e) => {
        // Esc: tarayıcı varsayılanı kapatmak, ama durumu da bildirmeliyiz —
        // yoksa `open` true kalır ve diyalog bir daha açılmaz.
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => {
        // Zemine dokunuş kapatır, karta dokunuş kapatmaz. `<dialog>`ta olay
        // hedefi zeminde diyaloğun kendisi olur; kart bir çocuk.
        if (e.target === ref.current) onCancel();
      }}
      className="card m-auto w-[min(27.5rem,calc(100vw-2rem))] p-5 backdrop:bg-black/55"
      style={{ color: "var(--text)" }}
    >
      <h2 id={basligId} className="text-h2">{title}</h2>
      {message ? <p className="muted mt-1 text-body">{message}</p> : null}
      <div className={altAlta ? "mt-4 flex flex-col gap-2" : "mt-4 flex gap-3"}>
        <button type="button" onClick={onCancel} className="btn flex-1 py-3.5" style={{ background: "var(--surface-2)", color: "var(--text)" }}>
          {vazgec}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn glow-tint-sm flex-1 py-3.5 text-white"
          /* Gölge düğmenin KENDİ rengiyle - Android `ConfirmDialog`
             `softShadow(accent, 8)` ile aynı. */
          style={{
            background: destructive ? "var(--color-rose-600)" : "var(--color-brand-500)",
            "--tint-fill": destructive ? "var(--color-rose-600)" : "var(--color-brand-500)",
          } as React.CSSProperties}
        >
          {onay}
        </button>
      </div>
    </dialog>
  );
}
