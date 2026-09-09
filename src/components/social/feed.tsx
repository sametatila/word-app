"use client";

import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { SparkIcon } from "@/components/icons";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, feedText, social, timeAgo } from "@/lib/social/client";
import type { FeedItem } from "@/lib/social/types";
import { ReactionBar } from "./reaction-bar";
import { useT, useLang } from "@/lib/i18n/client";

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

  if (items === null) return <RowSkeleton rows={4} height={84} />;
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
    <div className="flex flex-col gap-2">
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
  return (
    <article className="card px-4 py-3">
      <div className="flex items-start gap-3">
        {item.user.username ? (
          /* Avatar `aria-hidden`, ad da burada bağlantı DEĞİL: bu bağlantının
             erişilebilir bir adı hiç yoktu ve ekran okuyucu yalnız "bağlantı"
             diyordu. Profile giden tek yol da bu. */
          <Link href={`/u/${item.user.username}`} prefetch={false} aria-label={name} className="shrink-0">
            <Avatar userId={item.user.userId} name={item.user.name} size={40} />
          </Link>
        ) : (
          <Avatar userId={item.user.userId} name={item.user.name} size={40} />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <span className="font-bold">{item.isMine ? t("social.you") : name}</span> {feedText(item, lang)}
          </p>
          <p className="muted mt-0.5 text-[11px]">{timeAgo(item.createdAt, lang)}</p>
          <ReactionBar eventId={item.id} summary={item.reactions} disabled={item.isMine} />
        </div>
      </div>
    </article>
  );
}
