"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Her oyunun ortak çerçevesi.
 * İçerik başlığın hemen altından başlar (dikey ortalama yok) — böylece
 * tur değiştiğinde bileşenler ekranda yukarı aşağı zıplamaz.
 */
export function GameShell({
  label,
  prompt,
  hint,
  children,
  footer,
}: {
  label: string;
  prompt: ReactNode;
  hint?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-md flex-col"
    >
      <div className="min-h-28 text-center">
        <span className="inline-block rounded-full brand-gradient px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {label}
        </span>
        <div className="mt-3 text-lg font-medium sm:text-xl">{prompt}</div>
        {hint ? <div className="muted mt-1 text-sm">{hint}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </motion.div>
  );
}
