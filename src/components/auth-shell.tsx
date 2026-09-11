"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { LogoMark } from "./icons";

/** Giriş, kayıt, parola sıfırlama ve doğrulama ekranlarının ortak çerçevesi. */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <LogoMark size={40} />
        <span className="text-h3">Lernomi</span>
      </Link>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h1 className="text-h2">{title}</h1>
        {subtitle ? <p className="muted mt-1 text-body">{subtitle}</p> : null}
        <div className="mt-5">{children}</div>
      </motion.div>

      <div className="muted mt-6 text-center text-body">{footer}</div>
    </div>
  );
}

export function AuthNotice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const color = tone === "error" ? "var(--color-rose)" : "var(--color-mint)";
  return (
    <p
      /* SONUÇ DUYURULUYOR. Bu kutu bir eylemin cevabı (giriş hatası, oturum
         kapatıldı, hesap bağlandı) ve yalnız GÖRSEL bir değişiklikti: odak
         düğmede kalıyor, ekran okuyucu hiçbir şey söylemiyordu. Düzeltme
         KÖKTE — bu bileşenden geçen her bildirim kazanıyor. Hata `alert`,
         başarı `status`: ilki sözü keser, ikincisi sırasını bekler. */
      role={tone === "error" ? "alert" : "status"}
      className="rounded-panel px-3 py-2 text-body"
      style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
    >
      {children}
    </p>
  );
}

export const authInputClass =
  "option w-full px-4 py-3 text-body outline-none focus:border-[color:var(--color-brand)]";
