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
        <span className="text-lg font-bold">Lernomi</span>
      </Link>

      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle ? <p className="muted mt-1 text-sm">{subtitle}</p> : null}
        <div className="mt-5">{children}</div>
      </motion.div>

      <div className="muted mt-6 text-center text-sm">{footer}</div>
    </div>
  );
}

export function AuthNotice({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  const color = tone === "error" ? "var(--color-rose)" : "var(--color-mint)";
  return (
    <p
      className="rounded-xl px-3 py-2 text-sm"
      style={{ background: `color-mix(in srgb, ${color} 12%, transparent)`, color }}
    >
      {children}
    </p>
  );
}

export const authInputClass =
  "option w-full px-4 py-3 text-base outline-none focus:border-[color:var(--color-brand)]";
