"use client";

import { motion } from "framer-motion";
import { HeadphonesIcon } from "@/components/icons";

/**
 * Başlangıç ekranındaki "yürürken" kartı.
 *
 * Uygulamanın tamamı ekrana bakmayı gerektiriyordu; bu mod o zorunluluğu
 * kaldırdığı için bir oyun değil bir KULLANIM ANI açıyor — yürürken, bulaşık
 * yıkarken, otobüste. Kart bunu tek cümlede söylüyor, çünkü "sesli mod"
 * yazsaydı kimse ne olduğunu anlamazdı.
 *
 * Arena ve günün turunun altında: ikisi bir OLAY, bu ise turun başka bir
 * yoldan oynanması. Oyun seçicinin hemen üstünde duruyor çünkü ona en yakın
 * akraba o.
 */
export function WalkCard({ onPlay }: { onPlay: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mx-auto mt-3 w-full max-w-md overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "color-mix(in srgb, var(--color-mint-500) 16%, transparent)",
            color: "var(--color-mint-500)",
          }}
        >
          <HeadphonesIcon size={22} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Yürürken</p>
          <p className="muted mt-0.5 text-xs">
            Türkçesini duy, Almancasını söyle · ekrana bakmadan
          </p>
        </div>

        <button onClick={onPlay} className="btn btn-ghost shrink-0 px-4 py-2.5 text-sm">
          Başla
        </button>
      </div>
    </motion.section>
  );
}
