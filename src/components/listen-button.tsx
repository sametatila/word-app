"use client";

import { motion } from "framer-motion";
import { RefreshIcon, SpeakerIcon, StopIcon } from "@/components/icons";
import { useStill } from "@/lib/use-still";

/**
 * Dinleme oynatıcısının durumu — düğmenin ÇİZİMİ buna göre değişiyor.
 *
 *   - `idle`    hiç dinlenmedi: hoparlör.
 *   - `loading` basıldı, ses henüz başlamadı (indirme/sentez): hoparlörün
 *               çevresinde dönen halka. Nöral ses ilk dinlemede bir-iki saniye
 *               sürebiliyor; düğme o sürede "hiçbir şey olmadı" gibi durmamalı.
 *   - `playing` çalıyor: durdur işareti + dışa yayılan halkalar. Aynı düğme
 *               durdurur, işaret bunu söylüyor.
 *   - `done`    en az bir kez dinlendi: tekrar dinle işareti.
 *
 * Eskiden düğme her durumda aynı hoparlördü (mobil) ya da çalarken bir çarpı
 * oluyordu (web) — "kapat" gibi okunuyordu. Mobil karşılığı `ui/ListenButton`.
 */
export type ListenState = "idle" | "loading" | "playing" | "done";

export function ListenButton({
  state,
  onPress,
  label,
  disabled = false,
  size = 64,
}: {
  state: ListenState;
  onPress: () => void;
  label: string;
  disabled?: boolean;
  size?: number;
}) {
  const still = useStill();
  const icon = Math.round(size * 0.42);
  return (
    <span className="relative inline-flex shrink-0" style={{ width: size, height: size }}>
      {state === "playing" && !still
        ? [0, 1].map((i) => (
            <motion.span
              key={i}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "var(--color-brand)" }}
              initial={{ scale: 1, opacity: 0.32 }}
              animate={{ scale: 1.55, opacity: 0 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", delay: i * 0.8 }}
            />
          ))
        : null}
      {state === "loading" ? (
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-1 rounded-full border-[3px] ${still ? "" : "animate-spin"}`}
          style={{ borderColor: "var(--color-brand)", borderTopColor: "transparent" }}
        />
      ) : null}
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={onPress}
        disabled={disabled}
        aria-label={label}
        aria-busy={state === "loading"}
        className="brand-gradient relative flex h-full w-full items-center justify-center rounded-full shadow-lg disabled:opacity-60"
      >
        {state === "playing" ? (
          <StopIcon size={Math.round(icon * 0.8)} />
        ) : state === "done" ? (
          <RefreshIcon size={icon} />
        ) : (
          <SpeakerIcon size={icon} style={{ opacity: state === "loading" ? 0.7 : 1 }} />
        )}
      </motion.button>
    </span>
  );
}
