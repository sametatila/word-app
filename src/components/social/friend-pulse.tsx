"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { ArrowRightIcon } from "@/components/icons";
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
      <div
        aria-hidden
        className="card mx-auto mt-4 flex w-full max-w-md items-center gap-3 px-4 py-3"
        style={{ borderWidth: 1.5, borderColor: "var(--hairline)" }}
      >
        <SkeletonTile size={44} className="rounded-full" />
        <div className="min-w-0 flex-1">
          <SkeletonLine variant="h3" width="72%" />
          <SkeletonBar height={6} className="mt-1.5" />
          <SkeletonLine variant="micro" width="45%" className="mt-1" />
        </div>
        <SkeletonLine variant="h3" width={34} />
      </div>
    );
  if (!q) return null;
  const invited = q.status === "invited";
  return (
    /*
      DURUM KARTIN KENDİSİNDE. Android kartı 1.5 px'lik renkli bir çerçeveyle
      çiziyor ve rengi duruma göre değişiyor: davet mavi (`info`), kabul
      edilmiş ortak görev marka rengi (`primary`). Halka da aynı rengi
      alıyor. Web'de çerçeve HİÇ yoktu ve halka duruma bakmadan her zaman
      maviydi — kabul edilmiş bir görev davet gibi görünüyordu.
    */
    <Link
      href="/friends?tab=quests"
      prefetch={false}
      className="card mx-auto mt-4 flex w-full max-w-md items-center gap-3 px-4 py-3"
      style={{ borderWidth: 1.5, borderColor: invited ? "var(--color-sky)" : "var(--color-brand)" }}
    >
      <div className="flex -space-x-2">
        {/* Avatar 44: Android ile aynı. Web'de 32'ydi ve satır aynı kartın
            içinde bir gömlek küçük duruyordu (iskelet karosu da öyle). */}
        <Avatar
          userId={q.partner.userId}
          name={q.partner.name}
          avatar={q.partner.avatar}
          size={44}
          ring={invited ? "var(--color-sky)" : "var(--color-brand)"}
        />
      </div>
      <div className="min-w-0 flex-1">
        {/* Başlık `h3` (16): Android `variant="h3"`. Web `strong` (15) idi. */}
        <p className="truncate text-h3">
          {invited
            ? q.invitedByMe
              ? t("friendpulse.waiting")
              : t("friendpulse.invited_you", { name: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })
            : t("friendpulse.shared", { name: q.partner.name?.split(" ")[0] ?? t("social.your_friend") })}
        </p>
        {invited ? (
          <p className="muted text-caption">
            {/* Mobil hedefi ve durumu tek cümlede yazıyor; web ikisini elle
                birleştiriyordu ve aradaki ayraç dile göre değişemiyordu. */}
            {t("friendpulse.target", {
              xp: formatNumber(q.targetXp, lang),
              status: t(q.invitedByMe ? "friendpulse.awaiting" : "friendpulse.accept"),
            })}
          </p>
        ) : (
          <>
            {/* Çubuk Android `Bar` ile aynı: 6 px yükseklik ve yüzde SIFIRDA
                bile üç birimlik bir dilim — sıfır ile "hiç çubuk yok" aynı
                görünmesin (mobil `Math.max(3, …)`). Web 8 px ve tabansızdı. */}
            <div className="mt-1.5 w-full overflow-hidden rounded-full" style={{ height: 6, background: "var(--surface-2)" }}>
              <div className="h-full rounded-full" style={{ width: `${Math.max(3, Math.min(100, q.pct))}%`, background: "var(--color-brand)" }} />
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
      {/* Sağ uç: yüzde `h3` (Android `variant="h3"`, web `caption` idi — aynı
          satırın en önemli sayısı en küçük puntoydu). Davet hâlinde sayı
          yerine ok: kart "cevapla" diyor ve gidilecek bir yer olduğunu
          Android orada okla söylüyor, web hiçbir şey koymuyordu. */}
      {!invited ? (
        <span className="shrink-0 text-h3 tabular-nums" style={{ color: "var(--color-brand)" }}>
          {formatPercent(q.pct, lang)}
        </span>
      ) : (
        <ArrowRightIcon size={20} className="shrink-0" style={{ color: "var(--text-faint)" }} />
      )}
    </Link>
  );
}
