"use client";

import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { CrownIcon, FlameIcon, HandshakeIcon, HeartIcon, PodiumIcon, SparkIcon, TargetIcon, TrophyIcon } from "@/components/icons";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SkeletonCard, SkeletonLine, SkeletonPill, SkeletonTile } from "@/components/skeleton";
import { errorText, feedText, social, timeAgo } from "@/lib/social/client";
import type { FeedItem } from "@/lib/social/types";
import { ReactionBar } from "./reaction-bar";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * Olay türü → ikon karosu — Android `social/FeedList` `eventTile` ile birebir
 * (streak→flame, accent→violet, success→mint, primary→brand, info→sky).
 *
 * Kart NEYİN kutlandığını hiç söylemiyordu: seri kilometre taşı, başarım, lig
 * birinciliği ve ortak görev webde tıpatıp aynı görünüyordu ve fark yalnız
 * cümlenin içindeydi. Android türü kartın sağ üstünde bir karoyla söylüyor,
 * yani akış göz gezdirilerek de okunuyor.
 */
function eventTile(type: string): { Icon: (p: { size?: number }) => React.JSX.Element; tint: string } {
  switch (type) {
    case "streak_milestone":
      return { Icon: FlameIcon, tint: "var(--color-flame)" };
    case "achievement":
      return { Icon: TrophyIcon, tint: "var(--color-violet)" };
    case "friend_joined":
      return { Icon: HandshakeIcon, tint: "var(--color-mint)" };
    case "quest_completed":
      return { Icon: TargetIcon, tint: "var(--color-brand)" };
    case "weekly_top":
      return { Icon: PodiumIcon, tint: "var(--color-sky)" };
    /* Bu ikisi `ACTIVITY_TYPES`ta var ve iki tarafta da `default`a düşüyordu:
       ortak seri ve lig yükselişi akışta genel bir kıvılcımla çiziliyor,
       yani karo türü söyleme işini tam da bu iki olayda yapmıyordu. */
    case "friend_streak":
      return { Icon: HeartIcon, tint: "var(--color-mint)" };
    case "league_up":
      return { Icon: CrownIcon, tint: "var(--color-violet)" };
    default:
      return { Icon: SparkIcon, tint: "var(--color-brand)" };
  }
}

/**
 * Arkadaş akışı. Yalnız kilometre taşları düşer; her satırda tepki çubuğu.
 * Kendi olayına tepki verilmez (bakılır). Boş akış "arkadaş ekle"ye götürür —
 * yedi kişilik toplulukta akış çoğu zaman boş olacak ve boş liste, bir
 * yönlendirme kadar bile bilgi vermez.
 */
export function Feed({ onFindFriends }: { onFindFriends?: () => void }) {
  const t = useT();
  const [items, setItems] = useState<FeedItem[] | null>(null);
  const [cursor, setCursor] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = useCallback(async (after: string | null) => {
    setBusy(true);
    setErr(null);
    try {
      const page = await social.feed(after);
      setItems((prev) => (after && prev ? [...prev, ...page.items] : page.items));
      setCursor(page.nextCursor);
    } catch (e) {
      setErr(errorText(e));
      setItems((prev) => prev ?? []);
    } finally {
      setBusy(false);
    }
  }, []);

  useEffect(() => {
    void load(null);
  }, [load]);

  /* İskelet gerçek kartın parçalarında: 44 avatar, iki metin satırı, tür
     karosu, cümle ve tepki hapları. Düz 84 piksellik bloklar veri gelince
     kartı yerinden oynatıyordu; mobil `FeedCardSkeleton` de aynı parçalar. */
  if (items === null)
    return (
      <div className="flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <SkeletonCard key={i}>
            <div className="flex items-center gap-3">
              <SkeletonTile size={44} className="rounded-full" />
              <div className="min-w-0 flex-1">
                <SkeletonLine variant="h3" width="55%" />
                <SkeletonLine variant="caption" width={64} />
              </div>
              <SkeletonTile size={40} />
            </div>
            <SkeletonLine variant="body" width="90%" className="mt-3" />
            <div className="mt-3 flex gap-1.5">
              <SkeletonPill width={62} height={27} />
              <SkeletonPill width={62} height={27} />
              <SkeletonPill width={44} height={27} />
            </div>
          </SkeletonCard>
        ))}
      </div>
    );
  if (!items.length) {
    return (
      <>
      <EmptyCard
        icon={SparkIcon}
        title={t("feedlist.your_feed_is_still_empty")}
        text={t("feedlist.empty_text")}
        action={
          onFindFriends ? (
            <button className="btn btn-primary h-9 px-4 text-xs" onClick={onFindFriends}>
              {t("friends.find_friends")}
            </button>
          ) : null
        }
      />
      {err ? <p className="mt-3 text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </>
    );
  }
  /* Boş durumda da hata görünmeli: liste yokken ağ hatası tek geri bildirim. */
  return (
    <div className="flex flex-col gap-3">
      {items.map((it) => (
        <FeedCard key={it.id} item={it} />
      ))}
      {cursor ? (
        <button className="btn btn-ghost h-9 text-xs" disabled={busy} onClick={() => void load(cursor)}>
          {t(busy ? "social.loading" : "social.older")}
        </button>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
    </div>
  );
}

export function FeedCard({ item }: { item: FeedItem }) {
  const t = useT();
  const lang = useLang();
  const name = item.user.name ?? t("social.unnamed");
  const { Icon, tint } = eventTile(item.type);
  /* Kendi olayında profil bağlantısı yok: kendi profilini açmak bir yere
     gitmek değil. Android da yalnız başkasının avatarını basılabilir yapıyor. */
  const linked = Boolean(item.user.username) && !item.isMine;
  return (
    <article className="card p-4">
      {/* Ad bu kartta bağlantı DEĞİL, profile giden tek yol avatar; bağlantının
          erişilebilir adı da o yüzden kişinin adı. */}
      <div className="flex items-center gap-3">
        {linked ? (
          <Link href={`/u/${item.user.username}`} prefetch={false} aria-label={name} className="shrink-0">
            <Avatar userId={item.user.userId} name={item.user.name} size={44} />
          </Link>
        ) : (
          <Avatar userId={item.user.userId} name={item.user.name} size={44} />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-h3">{item.isMine ? t("social.you") : name}</p>
          <p className="muted text-caption">{timeAgo(item.createdAt, lang)}</p>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center"
          style={{ borderRadius: "var(--radius-tile)", background: `color-mix(in srgb, ${tint} 13%, transparent)`, color: tint }}
        >
          <Icon size={20} />
        </span>
      </div>
      <p className="mt-3 text-body">{feedText(item, lang)}</p>
      <ReactionBar eventId={item.id} summary={item.reactions} disabled={item.isMine} />
    </article>
  );
}
