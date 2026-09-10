"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SkeletonBar, SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { social } from "@/lib/social/client";
import type { QuestView } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber, formatPercent } from "@/lib/i18n/dict";

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
  /* YÜKLENİRKEN AYNI YÜKSEKLİKTE İSKELET. `!q` yüklemeyi (undefined) ve
     "görev yok"u (null) aynı sayıyordu: cevap gelince satır araya girip
     altındaki bölümleri aşağı itiyordu. Android bunu bilerek ayırıyor
     (`FriendPulse`), akış ve gelen kutusu da öyle. */
  if (q === undefined)
    return (
      <div aria-hidden className="card mx-auto mt-4 flex w-full max-w-md items-center gap-3 px-4 py-3">
        <SkeletonTile size={32} className="rounded-full" />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="bodyStrong" width="72%" />
          <SkeletonBar height={8} className="mt-1" />
          <SkeletonLine variant="micro" width="45%" className="mt-1" />
        </div>
        <SkeletonLine variant="bodyStrong" width={34} />
      </div>
    );
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
              ? t("friendpulse.waiting")
              : t("friendpulse.invited_you", { name: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })
            : t("friendpulse.shared", { name: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })}
        </p>
        {invited ? (
          <p className="muted text-xs">
            {/* Mobil hedefi ve durumu tek cümlede yazıyor; web ikisini elle
                birleştiriyordu ve aradaki ayraç dile göre değişemiyordu. */}
            {t("friendpulse.target", {
              xp: formatNumber(q.targetXp, lang),
              status: t(q.invitedByMe ? "friendpulse.awaiting" : "friendpulse.accept"),
            })}
          </p>
        ) : (
          <>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }}>
              <div className="h-full" style={{ width: `${q.pct}%`, background: "var(--color-brand)" }} />
            </div>
            {/* ÇUBUĞUN ALTINDAKİ SAYILAR. Web yalnız çubuğu çiziyordu: kaç XP
                toplandığı, hedefin ne olduğu ve kaç gün kaldığı hiçbir yerde
                yazmıyordu — çubuk tek başına "ne kadar kaldı" sorusunu
                cevaplamıyor. Anahtar taban sözlükte hazırdı. */}
            <p className="muted mt-1 text-micro tabular-nums">
              {t("friendpulse.progress", {
                current: formatNumber(q.totalXp, lang),
                target: formatNumber(q.targetXp, lang),
                n: q.daysLeft,
              })}
            </p>
          </>
        )}
      </div>
      {!invited ? (
        <span className="shrink-0 text-xs font-bold tabular-nums" style={{ color: "var(--color-brand)" }}>
          {formatPercent(q.pct, lang)}
        </span>
      ) : null}
    </Link>
  );
}
