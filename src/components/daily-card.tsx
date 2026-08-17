"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, TrophyIcon } from "@/components/icons";

/**
 * Ana ekrandaki "günün turu" kartı.
 *
 * Durumu kendisi çekiyor çünkü iki farklı şey söylemesi gerekiyor: tur
 * oynanmadıysa bir davet, oynandıysa sonuç ve sıra. Aynı kartın iki hâli
 * olması, "bugün oynadım mı" sorusunun cevabını ekranda tutuyor — kaçırılan
 * günün fark edilmesi de böyle oluyor.
 */

type State = {
  loading: boolean;
  played: { score: number; correct: number; total: number } | null;
  rank: number | null;
  players: number;
  level: string;
};

function localDay(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

export function DailyCard({ onPlay }: { onPlay: () => void }) {
  const [state, setState] = useState<State>({
    loading: true,
    played: null,
    rank: null,
    players: 0,
    level: "",
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(`/api/daily?day=${localDay()}`, { cache: "no-store" });
        if (!res.ok) return alive && setState((s) => ({ ...s, loading: false }));
        const d = (await res.json()) as {
          level: string;
          rounds: unknown[];
          played: { score: number; correct: number; total: number } | null;
          board: { rank: number; isMe: boolean }[];
        };
        if (!alive) return;
        // Tur kurulamıyorsa (seviyede yeterli kelime yok) kart hiç görünmesin.
        if (!d.played && !d.rounds.length) return setState((s) => ({ ...s, loading: false }));
        setState({
          loading: false,
          played: d.played,
          rank: d.board.find((r) => r.isMe)?.rank ?? null,
          players: d.board.length,
          level: d.level,
        });
      } catch {
        if (alive) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (state.loading || (!state.played && !state.level)) return null;

  const done = Boolean(state.played);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card mx-auto mt-4 w-full max-w-md overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: done
              ? "color-mix(in srgb, var(--color-mint-500) 16%, transparent)"
              : "color-mix(in srgb, var(--color-brand-500) 14%, transparent)",
            color: done ? "var(--color-mint-500)" : "var(--color-brand-500)",
          }}
        >
          {done ? <CheckIcon size={22} /> : <TrophyIcon size={22} />}
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-bold">Bugünün turu</p>
          <p className="muted mt-0.5 text-xs">
            {done
              ? `${state.played!.score.toLocaleString("tr-TR")} puan · ${state.played!.correct}/${state.played!.total} doğru` +
                (state.rank ? ` · ${state.rank}. sıra` : "")
              : `${state.level} seviyesindeki herkes aynı kelimeler · tek hak`}
          </p>
        </div>

        <button
          onClick={onPlay}
          className={`btn shrink-0 px-4 py-2.5 text-sm ${done ? "btn-ghost" : "btn-primary"}`}
        >
          {done ? "Tabloyu gör" : "Oyna"}
        </button>
      </div>
    </motion.section>
  );
}
