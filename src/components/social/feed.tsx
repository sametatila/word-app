"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, feedText, social, timeAgo } from "@/lib/social/client";
import type { FeedItem } from "@/lib/social/types";
import { ReactionBar } from "./reaction-bar";

/**
 * Arkadaş akışı. Yalnız kilometre taşları düşer; her satırda tepki çubuğu.
 * Kendi olayına tepki verilmez (bakılır). Boş akış "arkadaş ekle"ye götürür —
 * yedi kişilik toplulukta akış çoğu zaman boş olacak ve boş liste, bir
 * yönlendirme kadar bile bilgi vermez.
 */
export function Feed({ onFindFriends }: { onFindFriends?: () => void }) {
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
      <div className="card p-6 text-center">
        <p className="font-bold">Akış henüz boş</p>
        <p className="muted mt-1 text-sm">Arkadaşlarının seri, rozet ve görev haberleri burada görünür; sen de tepki verirsin.</p>
        {onFindFriends ? (
          <button className="btn btn-primary mt-4 h-9 px-4 text-xs" onClick={onFindFriends}>
            Arkadaş bul
          </button>
        ) : null}
        {err ? <p className="mt-3 text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      {items.map((it) => (
        <FeedCard key={it.id} item={it} />
      ))}
      {cursor ? (
        <button className="btn btn-ghost h-9 text-xs" disabled={busy} onClick={() => void load(cursor)}>
          {busy ? "Yükleniyor" : "Daha eski"}
        </button>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
    </div>
  );
}

export function FeedCard({ item }: { item: FeedItem }) {
  const name = item.user.name ?? "İsimsiz öğrenci";
  return (
    <article className="card px-4 py-3">
      <div className="flex items-start gap-3">
        {item.user.username ? (
          <Link href={`/u/${item.user.username}`} prefetch={false} className="shrink-0">
            <Avatar userId={item.user.userId} name={item.user.name} size={40} />
          </Link>
        ) : (
          <Avatar userId={item.user.userId} name={item.user.name} size={40} />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug">
            <span className="font-bold">{item.isMine ? "Sen" : name}</span> {feedText(item)}
          </p>
          <p className="muted mt-0.5 text-[11px]">{timeAgo(item.createdAt)}</p>
          <ReactionBar eventId={item.id} summary={item.reactions} disabled={item.isMine} />
        </div>
      </div>
    </article>
  );
}
