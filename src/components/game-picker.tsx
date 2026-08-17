"use client";

import { motion } from "framer-motion";
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
} from "@/components/icons";

/**
 * Oyun seçici.
 *
 * Oyunlar daha önce yalnızca sistemin seçtiği sırada karşıya çıkıyordu.
 * Ölçümde bir oturumda 7–11 farklı oyun görülüyordu, yani çeşitlilik vardı —
 * eksik olan **tercih**ti: sevdiği oyunu oynamak isteyen kullanıcının onu
 * isteyebileceği bir yer yoktu.
 *
 * Seçim öğrenme planının dışına çıkarmıyor: kelimeler yine tekrar kuyruğundan
 * ve gün kontenjanındaki yenilerden geliyor, yeni kelime yine tanıtım kartıyla
 * açılıyor (bkz. session.ts composeRounds). Değişen tek şey hangi oyunun
 * sorulduğu.
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
};

/** Neyi ölçtüğü — hangi oyunun ne işe yaradığı seçim anında görünsün. */
const WHAT: Record<PlayableGame, string> = {
  match: "hızlı tanıma",
  choice: "anlam ayırt etme",
  artikel: "der / die / das",
  cloze: "cümle içinde kullanım",
  scramble: "yazım",
  typing: "sıfırdan hatırlama",
  order: "söz dizimi",
  plural: "çoğul biçim",
  listen: "dinleme",
  truefalse: "hızlı karar",
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
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mx-auto mt-4 w-full max-w-md overflow-hidden"
    >
      <div
        className="flex items-baseline justify-between border-b px-5 py-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="font-bold">Tek oyun oyna</h2>
        <span className="muted text-xs">20 tur · aynı tekrar planı</span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {PLAYABLE_GAMES.map((game) => {
          const Icon = ICONS[game];
          const on = active === game;
          return (
            <button
              key={game}
              disabled={busy}
              onClick={() => onPick(on ? null : game)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors disabled:opacity-50"
              style={{
                background: on
                  ? "color-mix(in srgb, var(--color-brand-500) 14%, transparent)"
                  : "var(--surface-2)",
                outline: on ? "1px solid var(--color-brand-500)" : "none",
              }}
            >
              <span
                className="shrink-0"
                style={{ color: on ? "var(--color-brand-500)" : "var(--text-muted)" }}
              >
                <Icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{GAME_LABELS[game]}</span>
                <span className="muted block truncate text-[11px]">{WHAT[game]}</span>
              </span>
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
    </motion.section>
  );
}
