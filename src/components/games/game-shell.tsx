"use client";

import type { ReactNode } from "react";

/**
 * Her oyunun ortak çerçevesi.
 *
 * Giriş/çıkış animasyonu üstteki tur sarmalayıcısına aittir; burada tekrar
 * animasyon yapılmaz, yoksa iki hareket üst üste binip titrek görünür.
 * Dikey ölçüler dar tutulur: oyun ekranlarında kaydırma istemiyoruz.
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
}: {
  label: string;
  /** Sorunun kendisi. Oyunun içeriği zaten yeterince açıksa boş bırakılabilir. */
  prompt?: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col">
      <div className="text-center">
        <span className="brand-gradient inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {label}
        </span>
        {prompt ? <div className="mt-2.5 text-lg font-medium sm:text-xl">{prompt}</div> : null}
        {hint ? <div className="muted mt-1 text-sm">{hint}</div> : null}
      </div>
      <div className="mt-5">{children}</div>
      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
}
