"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PLAYABLE_GAMES, GAME_LABELS, type PlayableGame } from "@/lib/types";
import {
  BookIcon,
  CheckIcon,
  HeadphonesIcon,
  KeyboardIcon,
  LinkIcon,
  ListIcon,
  PenIcon,
  PuzzleIcon,
  TagIcon,
  TargetIcon,
  XIcon,
  ChevronIcon,
  GlobeIcon,
} from "@/components/icons";

/**
 * Oyun seçici.
 *
 * Oyunlar daha önce yalnızca sistemin seçtiği sırada karşıya çıkıyordu.
 * Ölçümde bir oturumda 7–11 farklı oyun görülüyordu, yani çeşitlilik vardı —
 * eksik olan **tercih**ti: sevdiği oyunu oynamak isteyen kullanıcının onu
 * isteyebileceği bir yer yoktu.
 *
 * Tek oyun modu bir PEKİŞTİRME aracı: turu yalnızca daha önce öğrenilmiş
 * kelimeler dolduruyor, yeni kelime alınmıyor (bkz. session.ts buildSession).
 * Yeni bir kelimeyi tek bir oyunla tanıştırmak öğretmiyor — kelime önce
 * tanıtılmalı, sonra kolaydan zora birkaç farklı oyunla dokunulmalı; o iş
 * karışık turun işi.
 *
 * Seçim kalıcı: kullanıcı değiştirene kadar her açılışta seçtiği modda
 * devam ediyor.
 */

const ICONS: Record<PlayableGame, typeof LinkIcon> = {
  match: LinkIcon,
  choice: TargetIcon,
  artikel: TagIcon,
  cloze: PenIcon,
  scramble: PuzzleIcon,
  typing: KeyboardIcon,
  order: ListIcon,
  plural: BookIcon,
  listen: HeadphonesIcon,
  truefalse: CheckIcon,
  translate: GlobeIcon,
};

export function GamePicker({
  active,
  onPick,
  busy,
}: {
  /** Seçili oyun; karışık turda null. */
  active: PlayableGame | null;
  onPick: (game: PlayableGame | null) => void;
  busy?: boolean;
}) {
  // Seçili oyun varsa açık: o zaman ızgara bir seçenek listesi değil, ekranda
  // görünmesi gereken bir durum.
  const [open, setOpen] = useState(active != null);
  return (
    <section
      /* Giriş animasyonu YOK: bu kart başlangıç ekranında bir zincirin halkası
         ve zinciri `Stagger` yönetiyor (bkz. components/reveal). Kendi başına
         belirdiğinde altı kart aynı anda ama farklı mesafelerle (kimi 8, kimi
         14 piksel) açılıyordu — hepsi birden oynayan ama aynı ritmi tutmayan
         bir hareket. */
      className="card mx-auto mt-4 w-full max-w-md overflow-hidden"
    >
      {/*
        Kapalı açılıyor.

        On oyunluk ızgara her açılışta 240 pikselden fazla yer kaplıyordu ve
        başlangıç ekranının en uzun parçasıydı — ama tek oyun modu her gün
        kullanılan bir şey değil, ara sıra yapılan bir SEÇİM. Kapalıyken bölüm
        tek satır; seçili bir oyun varsa kendiliğinden açık geliyor, çünkü o
        zaman seçim ekranda görünmesi gereken bir DURUM.
      */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="font-bold">
          {active ? GAME_LABELS[active] : "Tek oyun oyna"}
        </span>
        <span className="muted flex items-center gap-1.5 text-xs">
          {active ? "seçili" : "20 tur · yalnızca tekrar"}
          <ChevronIcon size={16} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t"
            style={{ borderColor: "var(--border)" }}
          >
      <div className="grid grid-cols-2 gap-2 p-3">
        {PLAYABLE_GAMES.map((game) => {
          const Icon = ICONS[game];
          const on = active === game;
          return (
            <button
              key={game}
              disabled={busy}
              onClick={() => onPick(on ? null : game)}
              className="flex min-h-12 items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-colors disabled:opacity-50"
              style={{
                background: on
                  ? "color-mix(in srgb, var(--color-brand) 14%, transparent)"
                  : "var(--surface-2)",
                outline: on ? "1px solid var(--color-brand)" : "none",
              }}
            >
              <span
                className="shrink-0"
                style={{ color: on ? "var(--color-brand)" : "var(--text-muted)" }}
              >
                <Icon size={18} />
              </span>
              {/* Yalnızca oyunun adı. Altında "hızlı tanıma", "söz dizimi" gibi
                  birer açıklama satırı vardı; on oyunda on satır ediyordu ve
                  adlar zaten kendilerini anlatıyor — Çoğul Bilmece'nin neyi
                  ölçtüğünü söylemek için ikinci bir satır gerekmiyor. */}
              {/* Ad kırpılmıyor, sarıyor. İki sütuna sığmayan adlar ("Doğru mu
                  Yanlış mı") üç noktayla kesiliyordu ve kesik bir oyun adı,
                  seçim listesinde tanınmıyor. Buton yüksekliği sabit tutuluyor
                  ki ızgara satırları eşit kalsın. */}
              <span className="min-w-0 text-sm font-semibold leading-tight">{GAME_LABELS[game]}</span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="px-3 pb-3">
          <button
            onClick={() => onPick(null)}
            disabled={busy}
            className="btn btn-ghost flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm disabled:opacity-50"
          >
            <XIcon size={15} /> Karışık tura dön
          </button>
        </div>
      ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
