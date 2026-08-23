"use client";

import { motion } from "framer-motion";
import { SparkIcon } from "@/components/icons";

/**
 * Başlangıç ekranındaki arena kartı.
 *
 * Hayatta kalma turuna tek giriş, oturum ÖZET ekranındaki bir düğmeydi:
 * yani turu görebilmek için önce 20 turluk bir oturumu bitirmek gerekiyordu.
 * Uygulamanın en gergin, en "oyun" olan parçası, ona en çok ihtiyacı olan
 * kişiden — henüz bir tur bitirmemiş kişiden — saklanıyordu.
 *
 * Kart rekorun kendisini gösteriyor çünkü tek başına "hayatta kalma turu"
 * bir başlık; "rekorun 1.240" ise bir davet. Rekoru olmayan için de metin
 * farklı: kırılacak bir rekor yoksa kurulacak bir rekor vardır.
 */
export function ChallengeCard({ best, onPlay }: { best: number; onPlay: () => void }) {
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
            background: "color-mix(in srgb, var(--color-flame-500) 16%, transparent)",
            color: "var(--color-flame-500)",
          }}
        >
          <SparkIcon size={22} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Hayatta kalma turu</p>
          <p className="muted mt-0.5 text-xs">
            {best > 0
              ? `Rekorun ${best.toLocaleString("tr-TR")} puan · süre bitene kadar`
              : "40 saniye · her doğru süre kazandırır, her yanlış yakar"}
          </p>
        </div>

        <button onClick={onPlay} className="btn btn-ghost shrink-0 px-4 py-2.5 text-sm">
          {best > 0 ? "Rekoru kır" : "Dene"}
        </button>
      </div>
    </motion.section>
  );
}
