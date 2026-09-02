"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { social } from "@/lib/social/client";
import type { QuestView } from "@/lib/social/types";

/**
 * Öğren ekranındaki tek satırlık nabız: bu haftanın ortak görevi varsa
 * ilerlemesi, davet varsa "cevapla". Yoksa HİÇ çizilmez — öğren ekranı
 * pazarlama panosu değil; görev yoksa görev satırı da yok.
 */
export function FriendPulse() {
  const [q, setQ] = useState<QuestView | null | undefined>(undefined);
  useEffect(() => {
    social
      .quests()
      .then((r) => setQ(r.quests.find((x) => x.status === "active" || x.status === "invited") ?? null))
      .catch(() => setQ(null));
  }, []);
  if (!q) return null;
  const invited = q.status === "invited";
  return (
    <Link href="/friends?tab=quests" prefetch={false} className="card mx-auto mt-4 flex w-full max-w-md items-center gap-3 px-4 py-3">
      <div className="flex -space-x-2">
        <Avatar userId={q.partner.userId} name={q.partner.name} size={32} ring="var(--color-sky)" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {invited ? (q.invitedByMe ? "Görev daveti bekliyor" : `${q.partner.name ?? "Arkadaşın"} seni göreve çağırdı`) : `${q.partner.name ?? "Arkadaşın"} ile ortak görev`}
        </p>
        {invited ? (
          <p className="muted text-xs">Hedef birlikte {q.targetXp.toLocaleString("tr-TR")} XP · {q.invitedByMe ? "cevap bekleniyor" : "kabul et"}</p>
        ) : (
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
            <div className="h-full" style={{ width: `${q.pct}%`, background: "var(--color-brand)" }} />
          </div>
        )}
      </div>
      {!invited ? (
        <span className="shrink-0 text-xs font-bold tabular-nums" style={{ color: "var(--color-brand)" }}>
          {q.pct}%
        </span>
      ) : null}
    </Link>
  );
}
