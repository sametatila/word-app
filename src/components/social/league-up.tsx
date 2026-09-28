"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrophyIcon } from "@/components/icons";
import { Confetti } from "@/components/celebrate";
import { TIER_COLOR } from "@/components/achievement-badge";
import { tierKey } from "@/lib/social/client";
import { LEAGUE_TIERS } from "@/lib/social/types";
import { play } from "@/lib/sfx";
import { useT } from "@/lib/i18n/client";

/** Kutlamanın ekranda kaldığı süre — tek rozet açılışıyla aynı (`achievement-unlock` SOLO_MS). */
const LEAGUE_UP_MS = 2600;
/**
 * Cihazda son görülen lig; kutlama bununla bir kez oynuyor. HESABA AİT: önek
 * `lernomi:cache:` hesap değişince ve çıkışta siliniyor (`session-keeper`).
 * Mobil `social/LeagueBoardUp` aynı fikir (AsyncStorage, kullanıcı başına).
 */
const LEAGUE_SEEN_KEY = "lernomi:cache:league-seen-tier";

/**
 * Lig rozetinin rengi — başarım kademelerinin sabit dolguları (beyaz ikon
 * taşıyor, temayla dönmüyor; bkz. `achievement-badge` `TIER_COLOR`). Safir
 * turkuazın dolgu basamağı, elmas efsane moru. Mobil aynı beş değer.
 */
const LEAGUE_COLOR: Record<(typeof LEAGUE_TIERS)[number], string> = {
  bronze: TIER_COLOR.bronze,
  silver: TIER_COLOR.silver,
  gold: TIER_COLOR.gold,
  sapphire: "var(--color-sky-500)",
  diamond: TIER_COLOR.legend,
};

/**
 * Bu lig için kutlama gerekiyor mu — ve cihazdaki "son görülen lig"i günceller.
 *
 * Kıyas CİHAZDA: sunucunun "sonuç görüldü" işareti (`leagueSeen`) sonuç
 * KARTINA ait ve kart "Devam"a basılana kadar duruyor; kutlama ise ilk
 * girişte bir kez. İlk okumada (kayıt yok) yalnız sunucu "yükseldin" diyorsa
 * kutlanıyor — yoksa her yeni cihazda bronzdan yukarıdaki herkes bir kez
 * kutlama görürdü. Lig düşerse kayıt da düşüyor: yeniden çıkınca yine kutlanır.
 */
export function leagueUpFor(tier: number, promoted: boolean): boolean {
  let prev: number | null = null;
  try {
    const raw = window.localStorage.getItem(LEAGUE_SEEN_KEY);
    prev = raw === null ? null : Number(raw);
    if (prev !== null && !Number.isFinite(prev)) prev = null;
  } catch {
    /* depolama kapalı: ilk okuma sayılır */
  }
  try {
    window.localStorage.setItem(LEAGUE_SEEN_KEY, String(tier));
  } catch {
    /* yazılamadı: sonraki girişte yine sorulur */
  }
  return prev === null ? promoted : tier > prev;
}

/**
 * LİG ATLAMA KUTLAMASI — başarım açılış kartının dilinde (`achievement-unlock`):
 * yeni ligin rozeti yaylanarak geliyor, "unlock" sesi, başarı titreşimi,
 * konfeti. Dokununca / tıklayınca / Esc-Enter-boşlukla kapanıyor, yoksa
 * `LEAGUE_UP_MS` sonra kendiliğinden. Konfeti "Hareketi azalt"ta çizilmiyor, yay
 * `MotionConfig` ile kapanıyor; bilgi aynı.
 *
 * Ses ve titreşim ayrı çağrı: `vibrate()` kendi adının sesini de çalıyor,
 * burada ses "unlock" olmalı.
 */
export function LeagueUp({ tier, rank, onDone }: { tier: number; rank?: string | null; onDone: () => void }) {
  const t = useT();
  const box = useRef<HTMLDivElement>(null);
  const done = useRef(onDone);
  useEffect(() => {
    done.current = onDone;
  });
  const name = LEAGUE_TIERS[Math.max(0, Math.min(LEAGUE_TIERS.length - 1, tier))];
  const color = LEAGUE_COLOR[name];

  useEffect(() => {
    play("unlock");
    try {
      navigator.vibrate?.([0, 20, 40, 30]);
    } catch {
      /* tarayıcı izin vermeyebilir */
    }
    const geri = document.activeElement as HTMLElement | null;
    box.current?.focus();
    const end = setTimeout(() => done.current(), LEAGUE_UP_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" && e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      done.current();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(end);
      window.removeEventListener("keydown", onKey);
      geri?.focus?.();
    };
  }, []);

  return (
    <motion.div
      ref={box}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={t("league.result_promoted", { league: t(tierKey(tier)) })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={() => done.current()}
      className="fixed inset-0 z-50 flex items-center justify-center px-6 outline-none"
      style={{ background: "color-mix(in srgb, var(--bg) 72%, transparent)", backdropFilter: "blur(4px)" }}
    >
      <Confetti fire={1} count={30} />
      <motion.div
        initial={{ scale: 0.7, y: 18, rotate: -4 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="card w-full max-w-xs px-4 py-5 text-center"
        style={{ boxShadow: `0 24px 60px -20px ${color}` }}
      >
        <p className="muted text-micro uppercase tracking-eyebrow">{t("league.up_eyebrow")}</p>
        {/* Rozet kartın içinde ikinci kez yaylanıyor: kart oturduktan hemen sonra. */}
        <div className="my-4 flex justify-center">
          <motion.span
            initial={{ scale: 0.3 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 10, delay: 0.12 }}
            className="flex h-[92px] w-[92px] items-center justify-center rounded-full text-white"
            style={{ background: color, boxShadow: `0 10px 26px -10px ${color}` }}
          >
            <TrophyIcon size={46} />
          </motion.span>
        </div>
        <h2 className="text-h2">{t("league.result_promoted", { league: t(tierKey(tier)) })}</h2>
        {rank ? <p className="muted mt-1 text-body">{rank}</p> : null}
        <p className="muted mt-4 text-micro uppercase tracking-eyebrow opacity-70">{t("achuw.click_to_continue")}</p>
      </motion.div>
    </motion.div>
  );
}
