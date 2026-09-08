"use client";

import { useEffect, useRef } from "react";

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
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Onayla",
  cancelLabel = "Vazgeç",
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
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
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
      className="card m-auto w-[min(25rem,calc(100vw-2rem))] p-5 backdrop:bg-black/55"
      style={{ color: "var(--text)" }}
    >
      <h2 className="text-h2">{title}</h2>
      {message ? <p className="muted mt-1 text-body">{message}</p> : null}
      <div className="mt-4 flex gap-3">
        <button type="button" onClick={onCancel} className="btn flex-1 py-3.5" style={{ background: "var(--surface-2)", color: "var(--text)" }}>
          {cancelLabel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn flex-1 py-3.5 text-white"
          style={{
            background: destructive ? "var(--color-rose-600)" : "var(--color-brand-500)",
            boxShadow: "var(--shadow-soft-sm)",
          }}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}
