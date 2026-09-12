"use client";

import { useId, useState } from "react";
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
  /*
   * SEKME ŞERİDİ, BAĞLANTI ŞERİDİ DEĞİL.
   *
   * İki çip `aria-current="page"` taşıyordu ve o, "bir bağlantı kümesindeki
   * GEÇERLİ SAYFA" demek: burada ne bağlantı var ne sayfa değişiyor — aynı
   * ekranın iki görünümü arasında geçiliyor. Ekran okuyucu "geçerli sayfa"
   * diyerek yanlış bir zihin haritası kuruyordu ve `<nav>` da gereksiz bir
   * gezinme dönüm noktası açıyordu.
   *
   * Doğrusu `tablist`/`tab`/`tabpanel`: "sekme, 2 ögeden 1., seçili" ve
   * panelin adı seçili sekmeden geliyor. Android'de aynısı
   * (`LeaderboardScreen`, `accessibilityRole="tablist"` + `tab`).
   */
  const kok = useId();
  const sekmeId = (k: string) => `${kok}-${k}`;
  const panelId = `${kok}-panel`;
  return (
    <div className="mt-3">
      <div role="tablist" aria-label={t("lb.weekly")} className="mb-3 flex gap-1.5">
        {(["league", "friends"] as const).map((k) => (
          <button
            key={k}
            id={sekmeId(k)}
            role="tab"
            type="button"
            aria-selected={tab === k}
            aria-controls={panelId}
            className={`chip px-3.5 py-2 text-caption ${tab === k ? "chip-active" : ""}`}
            onClick={() => setTab(k)}
          >
            {t(k === "league" ? "leaderboard.league" : "social.tab_friends")}
          </button>
        ))}
      </div>
      <div id={panelId} role="tabpanel" aria-labelledby={sekmeId(tab)} tabIndex={0}>
        {tab === "league" ? <LeagueBoard /> : <FriendsBoard />}
      </div>
    </div>
  );
}
