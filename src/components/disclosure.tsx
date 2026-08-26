"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRightIcon } from "@/components/icons";

/**
 * Açılır kutu.
 *
 * Uygulamada dört ayrı yerde elle yazılmış açılır bölüm vardı ve dördü de
 * farklı davranıyordu: biri ok döndürüyor, biri döndürmüyor, biri animasyonsuz
 * açılıyordu. Aynı jest her yerde aynı görünmeli, yoksa kullanıcı her seferinde
 * yeniden öğreniyor.
 *
 * Ok SAĞA bakıyor ve açılınca aşağı dönüyor. Kapalıyken aşağı ok göstermek —
 * eski hâli — yönlendirme oklarıyla karışıyordu: uygulamada aşağı ok "burada
 * bir şey açılır", sağ ok "başka bir ekrana gider" demek. İkisi karışınca
 * kullanıcı hangisinin sayfa değiştireceğini kestiremiyor.
 *
 * İçerik kapalıyken DOM'da yok. `hidden` ile saklamak, ekran okuyucuya
 * görünmez ama sekmeyle gezilebilir bir alan bırakıyordu.
 */
export function Disclosure({
  title,
  hint,
  defaultOpen = false,
  children,
  className = "",
}: {
  title: string;
  /** Başlığın sağındaki kısa özet — açmadan önce içeride ne olduğunu söyler. */
  hint?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 py-1 text-left"
      >
        <span className="flex-1 text-sm font-bold">{title}</span>
        {hint ? <span className="muted shrink-0 text-xs font-semibold">{hint}</span> : null}
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.18 }}
          className="muted shrink-0"
        >
          <ChevronRightIcon size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
