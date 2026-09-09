"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { social } from "@/lib/social/client";
import type { QuestView } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * Öğren ekranındaki tek satırlık nabız: bu haftanın ortak görevi varsa
 * ilerlemesi, davet varsa "cevapla". Yoksa HİÇ çizilmez — öğren ekranı
 * pazarlama panosu değil; görev yoksa görev satırı da yok.
 */
export function FriendPulse() {
  const t = useT();
  const lang = useLang();
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
          {invited
            ? q.invitedByMe
              ? t("socialw.quest_waiting")
              : t("socialw.quest_invited_you", { name: q.partner.name ?? t("social.your_friend") })
            : t("socialw.quest_with", { name: q.partner.name ?? t("social.your_friend") })}
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
