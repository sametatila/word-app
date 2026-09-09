"use client";

import { useState } from "react";
import { FriendsBoard } from "./friends-board";
import { LeagueBoard } from "./league-board";
import { useT } from "@/lib/i18n/client";

/**
 * Sıralamanın iki kümesi. Aynı hafta, aynı XP kaynağı; fark yalnız kiminle
 * karşılaştırıldığın: ligdeki otuz yabancı ya da kendi arkadaşların.
 * Mobildeki `LeaderboardScreen` çipleriyle birebir aynı ikili.
 */
export function LeaderboardTabs() {
  const t = useT();
  const [tab, setTab] = useState<"league" | "friends">("league");
  return (
    <div className="mt-3">
      <nav className="mb-3 flex gap-1.5" aria-label={t("lb.weekly")}>
        {(["league", "friends"] as const).map((k) => (
          <button
            key={k}
            className={`chip px-3.5 py-2 text-caption ${tab === k ? "chip-active" : ""}`}
            aria-current={tab === k ? "page" : undefined}
            onClick={() => setTab(k)}
          >
            {t(k === "league" ? "league.league" : "social.tab_friends")}
          </button>
        ))}
      </nav>
      {tab === "league" ? <LeagueBoard /> : <FriendsBoard />}
    </div>
  );
}
